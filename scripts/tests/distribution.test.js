const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

// Keep this suite limited to Cursor/Codex drift, unsupported skill invocation metadata,
// and files missing from the npm package. Prompt wording and workflow policy are out of scope.

const REPOSITORY_ROOT = path.resolve(__dirname, "../..");
const CURSOR_AGENTS = path.join(REPOSITORY_ROOT, ".cursor/agents");
const CODEX_AGENTS = path.join(REPOSITORY_ROOT, ".codex/agents");
const SKILLS = path.join(REPOSITORY_ROOT, ".agents/skills");

function cursorPrompt(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n+/, "").trim();
}

function codexPrompt(content) {
  const match = content.match(/\ndeveloper_instructions = """\n([\s\S]*?)\n"""\s*$/);
  assert.ok(match, "Codex agent must end with a multiline developer_instructions field");
  return match[1].trim();
}

test("Cursor and Codex agents have identical prompt bodies", () => {
  const cursorFiles = fs.readdirSync(CURSOR_AGENTS)
    .filter(file => file.endsWith(".md"))
    .sort();
  const codexFiles = fs.readdirSync(CODEX_AGENTS)
    .filter(file => file.endsWith(".toml"))
    .map(file => file.replace(/\.toml$/, ".md"))
    .sort();

  assert.deepEqual(codexFiles, cursorFiles);
  for (const cursorFile of cursorFiles) {
    const cursorContent = fs.readFileSync(path.join(CURSOR_AGENTS, cursorFile), "utf8");
    const codexContent = fs.readFileSync(
      path.join(CODEX_AGENTS, cursorFile.replace(/\.md$/, ".toml")),
      "utf8"
    );
    assert.equal(codexPrompt(codexContent), cursorPrompt(cursorContent), cursorFile);
  }
});

test("skills use supported invocation contracts", () => {
  for (const entry of fs.readdirSync(SKILLS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(SKILLS, entry.name, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const skill = fs.readFileSync(skillPath, "utf8");

    assert.doesNotMatch(
      skill,
      /\$ARGUMENTS/,
      path.relative(REPOSITORY_ROOT, skillPath)
    );

    if (!/^disable-model-invocation: true$/m.test(skill)) continue;
    const metadata = fs.readFileSync(
      path.join(SKILLS, entry.name, "agents/openai.yaml"),
      "utf8"
    );
    assert.match(metadata, /allow_implicit_invocation:\s*false/);
  }
});

test("the npm tarball contains shared skills and both native agent formats", () => {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const cache = fs.mkdtempSync(path.join(os.tmpdir(), "nautilus-npm-cache-"));
  let result;
  try {
    result = spawnSync(npm, ["pack", "--dry-run", "--json", "--cache", cache], {
      cwd: REPOSITORY_ROOT,
      encoding: "utf8",
    });
  } finally {
    fs.rmSync(cache, { recursive: true, force: true });
  }
  assert.equal(result.status, 0, result.stderr);

  const packagedPaths = new Set(
    JSON.parse(result.stdout)[0].files.map(file => file.path)
  );
  for (const requiredPath of [
    ".agents/skills/recipe-validate/SKILL.md",
    ".cursor/agents/prototype-generator.md",
    ".codex/agents/prototype-generator.toml",
  ]) {
    assert.equal(packagedPaths.has(requiredPath), true, requiredPath);
  }
});
