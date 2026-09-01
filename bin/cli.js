#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PROJECT_MANIFEST = ".nautilus-manifest.json";
const USER_MANIFEST = ".nautilus-kit/manifest.json";
const MANIFEST_VERSION = 2;
const VALID_TARGETS = new Set(["cursor", "codex", "opencode", "all"]);
const MAPPINGS = [
  {
    source: ".agents/skills",
    targets: ["cursor", "codex", "opencode"],
    project: { root: "project", destination: ".agents/skills" },
    user: { root: "shared", destination: "skills" },
  },
  {
    source: ".cursor/agents",
    targets: ["cursor"],
    project: { root: "project", destination: ".cursor/agents" },
    user: { root: "cursor", destination: "agents" },
  },
  {
    source: ".codex/agents",
    targets: ["codex"],
    project: { root: "project", destination: ".codex/agents" },
    user: { root: "codex", destination: "agents" },
  },
  {
    source: ".opencode/agents",
    targets: ["opencode"],
    project: { root: "project", destination: ".opencode/agents" },
    user: { root: "opencode", destination: "agents" },
  },
  {
    source: ".opencode/commands",
    targets: ["opencode"],
    project: { root: "project", destination: ".opencode/commands" },
    user: { root: "opencode", destination: "commands" },
  },
];

class CliError extends Error {
  constructor(message, exitCode = 1) {
    super(message);
    this.exitCode = exitCode;
  }
}

function parseCommand(argv) {
  const command = argv[2];
  const args = argv.slice(3);
  const supportsOptions = new Set(["install", "update", "status"]);
  if (!supportsOptions.has(command) && args.length > 0) {
    throw new CliError(`Unknown option: ${args[0]}`);
  }

  let dryRun = false;
  let scope = "project";
  let target = null;

  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--user") {
      scope = "user";
      continue;
    }
    if (argument === "--dry-run") {
      if (command !== "update") {
        throw new CliError(`Unknown option for '${command}': ${argument}`);
      }
      dryRun = true;
      continue;
    }
    if (argument === "--target" || argument.startsWith("--target=")) {
      if (command !== "install" && command !== "update") {
        throw new CliError(`Unknown option for '${command}': ${argument}`);
      }
      if (target !== null) throw new CliError("--target may be specified only once.");
      target = argument === "--target" ? args[++index] : argument.slice("--target=".length);
      if (!target) throw new CliError("--target requires cursor, codex, opencode, or all.");
      if (!VALID_TARGETS.has(target)) {
        throw new CliError(`Invalid target '${target}'. Expected cursor, codex, opencode, or all.`);
      }
      continue;
    }
    throw new CliError(`Unknown option for '${command}': ${argument}`);
  }

  return { command, dryRun, scope, target };
}

function expandTargets(target) {
  return target === "all" ? ["cursor", "codex", "opencode"] : [target];
}

function getVersion(sourceDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(sourceDir, "package.json"), "utf8")).version;
  } catch (error) {
    throw new CliError(`Error reading package.json: ${error.message}`, 2);
  }
}

function hashFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function toPortablePath(...segments) {
  return path.posix.join(...segments.map(segment => segment.split(path.sep).join("/")));
}

function assertRelativePath(relativePath, label) {
  if (
    typeof relativePath !== "string" ||
    relativePath.length === 0 ||
    path.posix.isAbsolute(relativePath) ||
    path.posix.normalize(relativePath) !== relativePath ||
    relativePath === ".." ||
    relativePath.startsWith("../")
  ) {
    throw new CliError(`Invalid ${label} path: ${relativePath}`, 2);
  }
}

function resolveWithinRoot(root, relativePath, label) {
  assertRelativePath(relativePath, label);
  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.resolve(resolvedRoot, ...relativePath.split("/"));
  if (resolvedPath !== resolvedRoot && !resolvedPath.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new CliError(`Invalid ${label} path: ${relativePath}`, 2);
  }
  let current = resolvedRoot;
  for (const segment of path.relative(resolvedRoot, resolvedPath).split(path.sep)) {
    if (!segment) continue;
    current = path.join(current, segment);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
      throw new CliError(`${label} path crosses a symbolic link: ${relativePath}`, 2);
    }
  }
  return resolvedPath;
}

function resolveCodexHome() {
  const configured = process.env.CODEX_HOME;
  if (!configured) return path.join(os.homedir(), ".codex");
  if (!path.isAbsolute(configured)) throw new CliError("CODEX_HOME must be an absolute path.");
  return path.resolve(configured);
}

function manifestPath(scope, cwd) {
  return scope === "user"
    ? path.join(os.homedir(), USER_MANIFEST)
    : path.join(cwd, PROJECT_MANIFEST);
}

function resolveRoots({ scope, cwd, manifest }) {
  if (scope === "project") return { project: path.resolve(cwd) };

  const stored = manifest && manifest.manifestVersion === MANIFEST_VERSION
    ? manifest.roots || {}
    : {};
  const roots = {
    shared: stored.shared || path.join(os.homedir(), ".agents"),
    cursor: stored.cursor || path.join(os.homedir(), ".cursor"),
    codex: stored.codex || resolveCodexHome(),
    opencode: stored.opencode || path.join(os.homedir(), ".config", "opencode"),
  };
  for (const [name, root] of Object.entries(roots)) {
    if (!path.isAbsolute(root)) throw new CliError(`Stored ${name} root must be absolute.`, 2);
    roots[name] = path.resolve(root);
  }
  return roots;
}

function collectRelativeFiles(directory, base = "") {
  const files = [];
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const absolutePath = path.join(directory, entry.name);
    const relativePath = toPortablePath(base, entry.name);
    if (entry.isDirectory()) files.push(...collectRelativeFiles(absolutePath, relativePath));
    else files.push(relativePath);
  }
  return files;
}

function selectedMappings(targets) {
  return MAPPINGS.filter(mapping => mapping.targets.some(target => targets.includes(target)));
}

function collectPackageFiles({ sourceDir, scope, roots, targets }) {
  const files = new Map();
  for (const mapping of selectedMappings(targets)) {
    const sourceRoot = path.join(sourceDir, ...mapping.source.split("/"));
    const destination = mapping[scope];
    const destinationRoot = roots[destination.root];
    if (!destinationRoot) throw new CliError(`Missing installation root: ${destination.root}`, 2);

    for (const relativePath of collectRelativeFiles(sourceRoot)) {
      const sourcePath = toPortablePath(mapping.source, relativePath);
      const destinationPath = toPortablePath(destination.destination, relativePath);
      const sourceFile = path.join(sourceRoot, ...relativePath.split("/"));
      files.set(sourcePath, {
        destination: destinationPath,
        destinationFile: resolveWithinRoot(destinationRoot, destinationPath, "destination"),
        hash: hashFile(sourceFile),
        root: destination.root,
        sourceFile,
        sourcePath,
      });
    }
  }
  return files;
}

function readRawManifest(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new CliError(`Error: manifest is corrupt: ${error.message}`, 2);
  }
}

function normalizeManifest({ raw, scope, roots, sourceDir }) {
  if (!raw) return null;
  if (Array.isArray(raw.files)) {
    if (scope !== "project") throw new CliError("Legacy manifests are supported only at project scope.", 2);
    const knownFiles = collectPackageFiles({
      sourceDir,
      scope,
      roots,
      targets: ["cursor", "codex", "opencode"],
    });
    const files = {};
    for (const sourcePath of raw.files) {
      if (typeof sourcePath !== "string") continue;
      const portable = sourcePath.split(path.sep).join("/");
      const known = knownFiles.get(portable);
      if (!known) continue;
      files[portable] = {
        destination: known.destination,
        hash: null,
        root: known.root,
      };
    }
    return {
      files,
      installedAt: raw.installedAt,
      legacy: true,
      roots: {},
      scope: "project",
      targets: ["cursor"],
      version: raw.version,
    };
  }

  if (raw.manifestVersion !== MANIFEST_VERSION) {
    throw new CliError(`Unsupported manifest version: ${raw.manifestVersion}`, 2);
  }
  if (raw.scope !== scope) throw new CliError(`Manifest scope is '${raw.scope}', not '${scope}'.`, 2);
  if (
    !Array.isArray(raw.targets) ||
    raw.targets.some(target => !["cursor", "codex", "opencode"].includes(target))
  ) {
    throw new CliError("Manifest contains invalid targets.", 2);
  }
  if (!raw.files || Array.isArray(raw.files) || typeof raw.files !== "object") {
    throw new CliError("Manifest files must be an object.", 2);
  }
  return { ...raw, legacy: false };
}

function manifestEntryFile(entry, roots) {
  if (!entry || typeof entry !== "object" || !roots[entry.root]) {
    throw new CliError("Manifest contains an invalid file entry.", 2);
  }
  if (entry.hash !== null && !/^[a-f0-9]{64}$/.test(entry.hash)) {
    throw new CliError("Manifest contains an invalid file hash.", 2);
  }
  return resolveWithinRoot(roots[entry.root], entry.destination, "managed destination");
}

function preservationFile({ scope, cwd, sourcePath, root, destination, label }) {
  const base = scope === "project"
    ? path.join(cwd, ".nautilus-preserved", label)
    : path.join(os.homedir(), ".nautilus-kit", "preserved", label);
  const relativePath = scope === "project" ? sourcePath : toPortablePath(root, destination);
  return resolveWithinRoot(base, relativePath, "preservation");
}

function assertPreservationAvailable(filePath) {
  if (fs.existsSync(filePath)) {
    throw new CliError(`Update conflict: preservation path already exists:\n  ${filePath}`);
  }
}

function planInstall(files) {
  const conflicts = [];
  const actions = [];
  for (const file of files.values()) {
    if (!fs.existsSync(file.destinationFile)) actions.push({ ...file, type: "add" });
    else if (hashFile(file.destinationFile) === file.hash) actions.push({ ...file, type: "skip" });
    else conflicts.push(file.destination);
  }
  if (conflicts.length > 0) {
    throw new CliError(
      `Install conflict: existing files would be overwritten:\n${conflicts.map(file => `  ${file}`).join("\n")}`
    );
  }
  return actions;
}

function planUpdate({ cwd, desiredFiles, installed, roots, scope, version }) {
  const actions = [];
  const handled = new Set();
  const label = installed.legacy ? "migration-v0.3" : `v${version}`;

  for (const [sourcePath, entry] of Object.entries(installed.files)) {
    assertRelativePath(sourcePath, "managed source");
    const installedFile = manifestEntryFile(entry, roots);
    const desired = desiredFiles.get(sourcePath);
    const sameDestination = desired && desired.root === entry.root && desired.destination === entry.destination;

    if (sameDestination) {
      handled.add(sourcePath);
      if (!fs.existsSync(installedFile)) {
        actions.push({ ...desired, type: "add" });
        continue;
      }
      const currentHash = hashFile(installedFile);
      if (currentHash === desired.hash) actions.push({ ...desired, type: "skip" });
      else if (installed.legacy) {
        const backupFile = preservationFile({
          scope,
          cwd,
          sourcePath,
          root: entry.root,
          destination: entry.destination,
          label,
        });
        assertPreservationAvailable(backupFile);
        actions.push({ ...desired, backupFile, type: "backup-update" });
      } else if (currentHash !== entry.hash) actions.push({ ...desired, type: "preserve" });
      else actions.push({ ...desired, type: "update" });
      continue;
    }

    if (!fs.existsSync(installedFile)) continue;
    const currentHash = hashFile(installedFile);
    if (!installed.legacy && currentHash === entry.hash) {
      actions.push({ destinationFile: installedFile, sourcePath, type: "remove" });
    } else {
      const backupFile = preservationFile({
        scope,
        cwd,
        sourcePath,
        root: entry.root,
        destination: entry.destination,
        label,
      });
      assertPreservationAvailable(backupFile);
      actions.push({ backupFile, destinationFile: installedFile, sourcePath, type: "preserve-retired" });
    }
  }

  const conflicts = [];
  for (const [sourcePath, desired] of desiredFiles) {
    if (handled.has(sourcePath)) continue;
    if (!fs.existsSync(desired.destinationFile)) actions.push({ ...desired, type: "add" });
    else if (hashFile(desired.destinationFile) === desired.hash) actions.push({ ...desired, type: "skip" });
    else conflicts.push(desired.destination);
  }
  if (conflicts.length > 0) {
    throw new CliError(
      `Update conflict: new managed paths contain different files:\n${conflicts.map(file => `  ${file}`).join("\n")}`
    );
  }
  return actions;
}

function executeActions(actions, dryRun) {
  const counts = { added: 0, updated: 0, preserved: 0, removed: 0, skipped: 0 };
  for (const action of actions) {
    switch (action.type) {
      case "add":
        console.log(`  + ${action.sourcePath} (new)`);
        if (!dryRun) {
          fs.mkdirSync(path.dirname(action.destinationFile), { recursive: true });
          fs.copyFileSync(action.sourceFile, action.destinationFile);
        }
        counts.added++;
        break;
      case "update":
        console.log(`  * ${action.sourcePath} (updated)`);
        if (!dryRun) fs.copyFileSync(action.sourceFile, action.destinationFile);
        counts.updated++;
        break;
      case "backup-update":
        console.log(`  * ${action.sourcePath} (legacy file preserved, then updated)`);
        if (!dryRun) {
          fs.mkdirSync(path.dirname(action.backupFile), { recursive: true });
          fs.copyFileSync(action.destinationFile, action.backupFile);
          fs.copyFileSync(action.sourceFile, action.destinationFile);
        }
        counts.updated++;
        counts.preserved++;
        break;
      case "preserve":
        console.log(`  ~ ${action.sourcePath} (modified locally, preserving)`);
        counts.preserved++;
        break;
      case "preserve-retired":
        console.log(`  ~ ${action.sourcePath} (retired local file preserved)`);
        if (!dryRun) {
          fs.mkdirSync(path.dirname(action.backupFile), { recursive: true });
          fs.copyFileSync(action.destinationFile, action.backupFile);
          fs.unlinkSync(action.destinationFile);
        }
        counts.preserved++;
        break;
      case "remove":
        console.log(`  - ${action.sourcePath} (removed)`);
        if (!dryRun) fs.unlinkSync(action.destinationFile);
        counts.removed++;
        break;
      case "skip":
        counts.skipped++;
        break;
    }
  }
  return counts;
}

function manifestFiles(files) {
  return Object.fromEntries(
    [...files.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([sourcePath, file]) => [sourcePath, {
        destination: file.destination,
        hash: file.hash,
        root: file.root,
      }])
  );
}

function writeManifest({ filePath, files, roots, scope, targets, version, installedAt }) {
  const manifest = {
    manifestVersion: MANIFEST_VERSION,
    version,
    installedAt: installedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    scope,
    targets,
    files: manifestFiles(files),
  };
  if (scope === "user") manifest.roots = roots;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function install({ cwd, scope, sourceDir, target }) {
  const filePath = manifestPath(scope, cwd);
  if (readRawManifest(filePath)) throw new CliError("nautilus-kit is already installed. Use 'update'.");
  const targets = expandTargets(target || "cursor");
  const roots = resolveRoots({ scope, cwd, manifest: null });
  const files = collectPackageFiles({ sourceDir, scope, roots, targets });
  if (files.size === 0) throw new CliError("No package files found for the selected target.", 2);
  const actions = planInstall(files);
  console.log(`Installing nautilus-kit v${getVersion(sourceDir)} (${scope}; ${targets.join(", ")})...\n`);
  const counts = executeActions(actions, false);
  writeManifest({ filePath, files, roots, scope, targets, version: getVersion(sourceDir) });
  console.log(`\nDone. ${counts.added} added, ${counts.skipped} already present.`);
}

function update({ cwd, dryRun, scope, sourceDir, target }) {
  const filePath = manifestPath(scope, cwd);
  const raw = readRawManifest(filePath);
  if (!raw) throw new CliError("nautilus-kit is not installed. Run 'install' first.");
  const roots = resolveRoots({ scope, cwd, manifest: raw });
  const installed = normalizeManifest({ raw, scope, roots, sourceDir });
  const targets = target ? expandTargets(target) : installed.targets;
  const files = collectPackageFiles({ sourceDir, scope, roots, targets });
  const version = getVersion(sourceDir);
  const actions = planUpdate({ cwd, desiredFiles: files, installed, roots, scope, version });
  const prefix = dryRun ? "[DRY RUN] " : "";
  console.log(`${prefix}Updating nautilus-kit v${installed.version} → v${version} (${targets.join(", ")})\n`);
  const counts = executeActions(actions, dryRun);
  if (!dryRun) {
    writeManifest({
      filePath,
      files,
      roots,
      scope,
      targets,
      version,
      installedAt: installed.installedAt,
    });
  }
  console.log(
    `\n${prefix}${counts.added} added, ${counts.updated} updated, ` +
    `${counts.preserved} preserved, ${counts.removed} removed, ${counts.skipped} unchanged.`
  );
}

function status({ cwd, scope }) {
  const filePath = manifestPath(scope, cwd);
  const raw = readRawManifest(filePath);
  if (!raw) {
    console.log("nautilus-kit is not installed.");
    return;
  }
  const roots = resolveRoots({ scope, cwd, manifest: raw });
  const manifest = normalizeManifest({ raw, scope, roots, sourceDir: path.resolve(__dirname, "..") });
  console.log(`Version:   ${manifest.version}`);
  console.log(`Scope:     ${scope}`);
  console.log(`Targets:   ${manifest.targets.join(", ")}`);
  console.log(`Installed: ${manifest.installedAt}`);
  console.log(`Files:     ${Object.keys(manifest.files).length} managed`);
}

function showHelp() {
  console.log(`
nautilus-kit — Repository-based product discovery for Cursor, Codex, and OpenCode

Usage:
  npx nautilus-kit install [--target cursor|codex|opencode|all] [--user]
  npx nautilus-kit update [--target cursor|codex|opencode|all] [--user] [--dry-run]
  npx nautilus-kit status [--user]
  npx nautilus-kit --version
  npx nautilus-kit --help

Install defaults to Cursor at project scope. Update defaults to the installed targets.
`);
}

function run(argv = process.argv, cwd = process.cwd()) {
  const options = parseCommand(argv);
  const sourceDir = path.resolve(__dirname, "..");
  switch (options.command) {
    case "install":
      install({ ...options, cwd, sourceDir });
      break;
    case "update":
      update({ ...options, cwd, sourceDir });
      break;
    case "status":
      status({ ...options, cwd });
      break;
    case "--version":
    case "-v":
      console.log(getVersion(sourceDir));
      break;
    case "--help":
    case "-h":
    case undefined:
      showHelp();
      break;
    default:
      throw new CliError(`Unknown command: ${options.command}`);
  }
}

function main() {
  try {
    run();
  } catch (error) {
    if (!(error instanceof CliError)) throw error;
    console.error(`Error: ${error.message}`);
    process.exitCode = error.exitCode;
  }
}

if (require.main === module) main();

module.exports = { CliError, main, parseCommand, run };
