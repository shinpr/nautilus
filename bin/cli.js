#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const MANIFEST_FILE = ".nautilus-manifest.json";
const COPY_DIRS = [".agents", ".cursor"];

function main(argv = process.argv, cwd = process.cwd()) {
  const command = argv[2];
  const targetDir = cwd;
  const sourceDir = path.resolve(__dirname, "..");

  function getVersion() {
    try {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(sourceDir, "package.json"), "utf8")
      );
      return pkg.version;
    } catch (e) {
      console.error(`Error reading package.json: ${e.message}`);
      process.exit(2);
    }
  }

  function copyDirRecursive(src, dest) {
    let copied = 0;
    if (!fs.existsSync(src)) return copied;
    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;

      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copied += copyDirRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        copied++;
      }
    }
    return copied;
  }

  function collectFiles(dir, base) {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;

      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(base, entry.name);

      if (entry.isDirectory()) {
        files.push(...collectFiles(fullPath, relPath));
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  function readManifest() {
    const manifestPath = path.join(targetDir, MANIFEST_FILE);
    if (!fs.existsSync(manifestPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch (e) {
      console.error(`Error: ${MANIFEST_FILE} is corrupt: ${e.message}`);
      console.error("Delete the file and run 'install' again, or fix it manually.");
      process.exit(2);
    }
  }

  function writeManifest(files) {
    const manifestPath = path.join(targetDir, MANIFEST_FILE);
    const manifest = {
      version: getVersion(),
      installedAt: new Date().toISOString(),
      files: files.sort(),
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  }

  function install() {
    const manifest = readManifest();
    if (manifest) {
      console.log(
        `nautilus-kit v${manifest.version} is already installed. Use 'update' to upgrade.`
      );
      process.exit(1);
    }

    const version = getVersion();
    let hasSource = false;
    for (const dir of COPY_DIRS) {
      if (fs.existsSync(path.join(sourceDir, dir))) {
        hasSource = true;
        break;
      }
    }
    if (!hasSource) {
      console.error("Error: No source directories found. Package may be corrupt.");
      process.exit(2);
    }

    console.log(`Installing nautilus-kit v${version}...\n`);

    const allFiles = [];
    let totalCopied = 0;

    for (const dir of COPY_DIRS) {
      const src = path.join(sourceDir, dir);
      const dest = path.join(targetDir, dir);
      const copied = copyDirRecursive(src, dest);
      totalCopied += copied;
      allFiles.push(...collectFiles(dest, dir));
      if (copied > 0) console.log(`  ${dir}/ — ${copied} files`);
    }

    writeManifest(allFiles);
    console.log(`\nDone. ${totalCopied} files installed.`);
  }

  function update(dryRun) {
    const manifest = readManifest();
    if (!manifest) {
      console.log("nautilus-kit is not installed. Run 'install' first.");
      process.exit(1);
    }

    const currentVersion = manifest.version;
    const newVersion = getVersion();
    console.log(
      `${dryRun ? "[DRY RUN] " : ""}Updating nautilus-kit v${currentVersion} → v${newVersion}\n`
    );

    let updated = 0;
    let added = 0;
    let skipped = 0;

    for (const dir of COPY_DIRS) {
      const src = path.join(sourceDir, dir);
      if (!fs.existsSync(src)) continue;

      const sourceFiles = collectFiles(src, dir);

      for (const relPath of sourceFiles) {
        const srcFile = path.join(sourceDir, relPath);
        const destFile = path.join(targetDir, relPath);
        const isManaged = manifest.files.includes(relPath);

        if (!fs.existsSync(destFile)) {
          if (dryRun) {
            console.log(`  + ${relPath} (new)`);
          } else {
            fs.mkdirSync(path.dirname(destFile), { recursive: true });
            fs.copyFileSync(srcFile, destFile);
          }
          added++;
          continue;
        }

        const srcContent = fs.readFileSync(srcFile);
        const destContent = fs.readFileSync(destFile);

        if (srcContent.equals(destContent)) {
          skipped++;
          continue;
        }

        if (!isManaged) {
          console.log(`  ~ ${relPath} (modified locally, skipping)`);
          skipped++;
          continue;
        }

        if (dryRun) {
          console.log(`  * ${relPath} (updated)`);
        } else {
          fs.copyFileSync(srcFile, destFile);
        }
        updated++;
      }
    }

    if (!dryRun) {
      const allFiles = [];
      for (const dir of COPY_DIRS) {
        allFiles.push(
          ...collectFiles(path.join(targetDir, dir), dir)
        );
      }
      writeManifest(allFiles);
    }

    console.log(
      `\n${dryRun ? "[DRY RUN] " : ""}${added} added, ${updated} updated, ${skipped} unchanged.`
    );
  }

  function status() {
    const manifest = readManifest();
    if (!manifest) {
      console.log("nautilus-kit is not installed.");
      return;
    }
    console.log(`Version:   ${manifest.version}`);
    console.log(`Installed: ${manifest.installedAt}`);
    console.log(`Files:     ${manifest.files.length} managed`);
  }

  function showHelp() {
    console.log(`
nautilus-kit — Product management skills & agents for AI coding assistants

Usage:
  npx nautilus-kit install              Install skills and agents
  npx nautilus-kit update               Update managed files
  npx nautilus-kit update --dry-run     Preview changes without applying
  npx nautilus-kit status               Show installation info
  npx nautilus-kit --version            Show version
  npx nautilus-kit --help               Show this help
`);
  }

  switch (command) {
    case "install":
      install();
      break;
    case "update":
      update(argv.includes("--dry-run"));
      break;
    case "status":
      status();
      break;
    case "--version":
    case "-v":
      console.log(getVersion());
      break;
    case "--help":
    case "-h":
    case undefined:
      showHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();

module.exports = { main };
