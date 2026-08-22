const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

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

function read(relativePath) {
  return fs.readFileSync(path.join(REPOSITORY_ROOT, relativePath), "utf8");
}

function jsonCodeBlocks(content) {
  return [...content.matchAll(/```json\n([\s\S]*?)\n```/g)]
    .map(match => JSON.parse(match[1]));
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

test("prototype validation keeps source, scope, and evidence boundaries", () => {
  const recipe = read(".agents/skills/recipe-validate/SKILL.md");
  const quality = read(".agents/skills/prototype-guide/references/prototype-quality.md");
  const guide = read(".agents/skills/prototype-guide/SKILL.md");
  const designPerspective = read(".agents/skills/design-perspective/SKILL.md");
  const generator = read(".cursor/agents/prototype-generator.md");

  assert.match(recipe, /Invoke `prototype-generator` in a separate context/);
  assert.match(recipe, /hypo-\{id\}-\{variant\}-prototype\.html/);
  assert.match(recipe, /Collect the observations defined by the confirmed validation design/);
  assert.ok(
    quality.indexOf("Approved target-state decisions") <
      quality.indexOf("Existing product UI and in-repository components")
  );
  assert.match(quality, /Set `visual_verification\.status: "passed"` only after those rendered checks run/);
  assert.match(guide, /Implement the states that can occur and affect the validation decision/);
  assert.doesNotMatch(guide, /states that can occur or change the validation decision/);
  assert.match(designPerspective, /states that can occur and affect the acceptance decision/);

  assert.match(generator, /default `hypo-\{id\}-prototype\.html` covers the complete interaction/);
  assert.match(generator, /`hypo-\{id\}-\{variant\}-prototype\.html` covers only that named variant/);
  assert.match(generator, /variant is not defined by the hypothesis is blocked/);
  assert.match(generator, /loaded `prototype-guide` skill's `references\/prototype-quality\.md`/);

  const [completed, blocked] = jsonCodeBlocks(generator);
  assert.equal(completed.status, "completed");
  assert.equal(Object.hasOwn(completed, "unresolved"), false);
  assert.equal(blocked.status, "blocked");
  assert.equal(Array.isArray(blocked.unresolved), true);
  assert.deepEqual(
    Object.keys(blocked.unresolved[0]).sort(),
    ["condition", "evidence_or_action_needed"].sort()
  );
});

test("external prototype prompts are explicit and self-contained", () => {
  const recipe = read(".agents/skills/recipe-prototype-prompt/SKILL.md");
  const guide = read(".agents/skills/prototype-guide/references/prototype-prompt-guide.md");

  assert.match(recipe, /^disable-model-invocation: true$/m);
  assert.match(recipe, /prototype-prompt-guide\.md/);
  assert.match(recipe, /docs\/discovery\/prototypes\/hypo-\{id\}-\{platform\}-prompt\.md/);
  assert.match(recipe, /Materialize the decision-relevant product, design, component, and data context/);
  assert.match(recipe, /verified repository access/);
  assert.match(recipe, /does not generate the HTML prototype/i);
  assert.match(guide, /Source Acquisition in `prototype-quality\.md`/);
  assert.doesNotMatch(guide, /### Source Selection Rule/);
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
