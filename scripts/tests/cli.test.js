const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const REPOSITORY_ROOT = path.resolve(__dirname, "../..");
const CLI_PATH = path.join(REPOSITORY_ROOT, "bin/cli.js");

function temporaryDirectory(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `${prefix}-`));
}

function runCli(args, options = {}) {
  const cwd = options.cwd ?? temporaryDirectory("nautilus-project");
  const home = options.home ?? temporaryDirectory("nautilus-home");
  const env = { ...process.env, HOME: home };
  if (options.codexHome) env.CODEX_HOME = options.codexHome;
  else delete env.CODEX_HOME;

  return spawnSync(process.execPath, [options.cliPath ?? CLI_PATH, ...args], {
    cwd,
    env,
    encoding: "utf8",
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function createPackageFixture(version, files) {
  const root = temporaryDirectory("nautilus-package");
  fs.mkdirSync(path.join(root, "bin"), { recursive: true });
  fs.copyFileSync(CLI_PATH, path.join(root, "bin/cli.js"));
  fs.writeFileSync(
    path.join(root, "package.json"),
    `${JSON.stringify({ name: "nautilus-test", version })}\n`
  );
  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  return path.join(root, "bin/cli.js");
}

test("installs Cursor into the project by default", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const result = runCli(["install"], { cwd });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(cwd, ".agents/skills/recipe-validate/SKILL.md")), true);
  assert.equal(fs.existsSync(path.join(cwd, ".cursor/agents/hypothesis-verifier.md")), true);
  assert.equal(fs.existsSync(path.join(cwd, ".codex/agents/hypothesis-verifier.toml")), false);
  const manifest = readJson(path.join(cwd, ".nautilus-manifest.json"));
  assert.deepEqual(manifest.targets, ["cursor"]);
  assert.equal(Array.isArray(manifest.files), false);
});

test("installs Codex or both native agent sets when selected", () => {
  const codexProject = temporaryDirectory("nautilus-codex-project");
  const codexResult = runCli(["install", "--target", "codex"], { cwd: codexProject });
  assert.equal(codexResult.status, 0, codexResult.stderr);
  assert.equal(fs.existsSync(path.join(codexProject, ".agents/skills/recipe-validate/SKILL.md")), true);
  assert.equal(fs.existsSync(path.join(codexProject, ".codex/agents/hypothesis-verifier.toml")), true);
  assert.equal(fs.existsSync(path.join(codexProject, ".cursor/agents/hypothesis-verifier.md")), false);

  const allProject = temporaryDirectory("nautilus-all-project");
  const allResult = runCli(["install", "--target", "all"], { cwd: allProject });
  assert.equal(allResult.status, 0, allResult.stderr);
  assert.equal(fs.existsSync(path.join(allProject, ".cursor/agents/hypothesis-verifier.md")), true);
  assert.equal(fs.existsSync(path.join(allProject, ".codex/agents/hypothesis-verifier.toml")), true);
  assert.deepEqual(readJson(path.join(allProject, ".nautilus-manifest.json")).targets, ["cursor", "codex"]);
});

test("installs shared skills and selected agents at user scope", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const home = temporaryDirectory("nautilus-home");
  const codexHome = temporaryDirectory("nautilus-codex-home");
  const result = runCli(["install", "--target", "all", "--user"], {
    cwd,
    home,
    codexHome,
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(home, ".agents/skills/recipe-validate/SKILL.md")), true);
  assert.equal(fs.existsSync(path.join(home, ".cursor/agents/hypothesis-verifier.md")), true);
  assert.equal(fs.existsSync(path.join(codexHome, "agents/hypothesis-verifier.toml")), true);
  assert.equal(fs.existsSync(path.join(home, ".nautilus-kit/manifest.json")), true);
  assert.equal(fs.existsSync(path.join(cwd, ".agents")), false);
});

test("update uses recorded targets and can reconfigure them", () => {
  const cwd = temporaryDirectory("nautilus-project");
  assert.equal(runCli(["install", "--target", "codex"], { cwd }).status, 0);

  const update = runCli(["update"], { cwd });
  assert.equal(update.status, 0, update.stderr);
  assert.equal(fs.existsSync(path.join(cwd, ".cursor/agents/hypothesis-verifier.md")), false);

  const reconfigure = runCli(["update", "--target", "all"], { cwd });
  assert.equal(reconfigure.status, 0, reconfigure.stderr);
  assert.equal(fs.existsSync(path.join(cwd, ".cursor/agents/hypothesis-verifier.md")), true);
  assert.deepEqual(readJson(path.join(cwd, ".nautilus-manifest.json")).targets, ["cursor", "codex"]);

  const retireCursor = runCli(["update", "--target", "codex"], { cwd });
  assert.equal(retireCursor.status, 0, retireCursor.stderr);
  assert.equal(fs.existsSync(path.join(cwd, ".cursor/agents/hypothesis-verifier.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, ".codex/agents/hypothesis-verifier.toml")), true);
  assert.deepEqual(readJson(path.join(cwd, ".nautilus-manifest.json")).targets, ["codex"]);
});

test("updates and reconfigures a user-scoped installation", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const home = temporaryDirectory("nautilus-home");
  const codexHome = temporaryDirectory("nautilus-codex-home");
  const install = runCli(["install", "--user"], { cwd, home, codexHome });
  assert.equal(install.status, 0, install.stderr);

  const update = runCli(["update", "--target", "codex", "--user"], {
    cwd,
    home,
    codexHome,
  });

  assert.equal(update.status, 0, update.stderr);
  assert.equal(fs.existsSync(path.join(home, ".cursor/agents/hypothesis-verifier.md")), false);
  assert.equal(fs.existsSync(path.join(codexHome, "agents/hypothesis-verifier.toml")), true);
  const manifest = readJson(path.join(home, ".nautilus-kit/manifest.json"));
  assert.deepEqual(manifest.targets, ["codex"]);
});

test("update preserves local edits and leaves unrelated files untouched", () => {
  const cwd = temporaryDirectory("nautilus-project");
  assert.equal(runCli(["install"], { cwd }).status, 0);
  const managed = path.join(cwd, ".cursor/agents/hypothesis-verifier.md");
  const unrelated = path.join(cwd, ".cursor/agents/personal.md");
  fs.appendFileSync(managed, "\nlocal edit\n");
  fs.writeFileSync(unrelated, "personal\n");

  const result = runCli(["update"], { cwd });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /modified locally, preserving/);
  assert.match(fs.readFileSync(managed, "utf8"), /local edit/);
  assert.equal(fs.readFileSync(unrelated, "utf8"), "personal\n");
});

test("install conflicts fail before any file is written", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const conflict = path.join(cwd, ".cursor/agents/hypothesis-verifier.md");
  fs.mkdirSync(path.dirname(conflict), { recursive: true });
  fs.writeFileSync(conflict, "personal\n");

  const result = runCli(["install"], { cwd });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /install conflict/i);
  assert.equal(fs.existsSync(path.join(cwd, ".agents/skills/recipe-validate/SKILL.md")), false);
  assert.equal(fs.readFileSync(conflict, "utf8"), "personal\n");
});

test("update conflicts fail before earlier planned files are changed", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const oldCli = createPackageFixture("1.0.0", {
    ".agents/skills/example/SKILL.md": "old\n",
  });
  const newCli = createPackageFixture("2.0.0", {
    ".agents/skills/example/SKILL.md": "new\n",
    ".cursor/agents/conflict.md": "package\n",
  });
  assert.equal(runCli(["install"], { cwd, cliPath: oldCli }).status, 0);
  const conflict = path.join(cwd, ".cursor/agents/conflict.md");
  fs.mkdirSync(path.dirname(conflict), { recursive: true });
  fs.writeFileSync(conflict, "personal\n");

  const result = runCli(["update"], { cwd, cliPath: newCli });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /update conflict/i);
  assert.equal(fs.readFileSync(path.join(cwd, ".agents/skills/example/SKILL.md"), "utf8"), "old\n");
  assert.equal(fs.readFileSync(conflict, "utf8"), "personal\n");
});

test("dry-run reports updates without changing files or manifest", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const oldCli = createPackageFixture("1.0.0", {
    ".agents/skills/example/SKILL.md": "old\n",
    ".cursor/agents/example.md": "old agent\n",
  });
  const newCli = createPackageFixture("2.0.0", {
    ".agents/skills/example/SKILL.md": "new\n",
    ".cursor/agents/example.md": "new agent\n",
  });
  assert.equal(runCli(["install"], { cwd, cliPath: oldCli }).status, 0);
  const manifestPath = path.join(cwd, ".nautilus-manifest.json");
  const beforeManifest = fs.readFileSync(manifestPath, "utf8");

  const result = runCli(["update", "--dry-run"], { cwd, cliPath: newCli });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /DRY RUN/);
  assert.equal(fs.readFileSync(path.join(cwd, ".agents/skills/example/SKILL.md"), "utf8"), "old\n");
  assert.equal(fs.readFileSync(manifestPath, "utf8"), beforeManifest);
});

test("legacy manifests preserve changed known files and do not claim unrelated files", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const known = ".cursor/agents/example.md";
  const unrelated = ".cursor/agents/personal.md";
  fs.mkdirSync(path.join(cwd, ".cursor/agents"), { recursive: true });
  fs.writeFileSync(path.join(cwd, known), "legacy local content\n");
  fs.writeFileSync(path.join(cwd, unrelated), "personal\n");
  fs.writeFileSync(
    path.join(cwd, ".nautilus-manifest.json"),
    `${JSON.stringify({ version: "0.3.0", installedAt: new Date().toISOString(), files: [known, unrelated] })}\n`
  );
  const newCli = createPackageFixture("1.0.0", { [known]: "current package\n" });

  const result = runCli(["update"], { cwd, cliPath: newCli });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.readFileSync(path.join(cwd, known), "utf8"), "current package\n");
  assert.equal(fs.readFileSync(path.join(cwd, unrelated), "utf8"), "personal\n");
  const preserved = path.join(cwd, ".nautilus-preserved/migration-v0.3", known);
  assert.equal(fs.readFileSync(preserved, "utf8"), "legacy local content\n");
  assert.equal(Object.hasOwn(readJson(path.join(cwd, ".nautilus-manifest.json")).files, unrelated), false);
});

test("rejects invalid target and unsupported options", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const invalidTarget = runCli(["install", "--target", "claude"], { cwd });
  assert.equal(invalidTarget.status, 1);
  assert.match(invalidTarget.stderr, /target/i);

  const unknown = runCli(["install", "--global"], { cwd });
  assert.equal(unknown.status, 1);
  assert.match(unknown.stderr, /unknown option/i);
});

test("rejects unsafe managed paths before update writes", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const packageCli = createPackageFixture("1.0.0", {
    ".agents/skills/example/SKILL.md": "package\n",
  });
  fs.writeFileSync(
    path.join(cwd, ".nautilus-manifest.json"),
    `${JSON.stringify({
      manifestVersion: 2,
      version: "1.0.0",
      installedAt: new Date().toISOString(),
      scope: "project",
      targets: ["cursor"],
      files: {
        ".agents/skills/example/SKILL.md": {
          root: "project",
          destination: "../outside.md",
          hash: "a".repeat(64),
        },
      },
    })}\n`
  );

  const result = runCli(["update"], { cwd, cliPath: packageCli });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /invalid managed destination path/i);
  assert.equal(fs.existsSync(path.join(path.dirname(cwd), "outside.md")), false);
});

test("does not install through a symlink below an installation root", () => {
  const cwd = temporaryDirectory("nautilus-project");
  const outside = temporaryDirectory("nautilus-outside");
  fs.mkdirSync(path.join(cwd, ".cursor"), { recursive: true });
  fs.symlinkSync(outside, path.join(cwd, ".cursor/agents"), "dir");

  const result = runCli(["install"], { cwd });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /crosses a symbolic link/i);
  assert.equal(fs.existsSync(path.join(outside, "hypothesis-verifier.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, ".nautilus-manifest.json")), false);
});
