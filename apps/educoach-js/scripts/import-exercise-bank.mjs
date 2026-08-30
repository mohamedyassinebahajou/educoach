/**
 * Import points-based exercise bank → src/lib/exerciseBank/days.ts
 *
 * Usage (from apps/educoach-js):
 *   node scripts/import-exercise-bank.mjs
 *   node scripts/import-exercise-bank.mjs /path/to/bank.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inferExerciseChecks } from "./infer-exercise-checks.mjs";
import { inferOutputExamples } from "./infer-output-examples.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "..");
const defaultSource = path.join(
  appRoot,
  "../../docs/youcode-sas-js-exercise-bank.md",
);
const outFile = path.join(appRoot, "src/lib/exerciseBank/days.ts");

/** Slug → SAS day number (matches src/lib/curriculum.ts). */
const SLUG_DAY = {
  "welcome-to-javascript": 1,
  "hello-console": 1,
  "git-github-basics": 1,
  "variables-let-const": 2,
  "operators-arithmetic": 2,
  "if-else": 2,
  "for-while-loops": 3,
  "nested-loops": 3,
  "functions-basics": 4,
  "arrow-functions-scope": 4,
  "string-basics": 5,
  "string-methods": 5,
  "string-challenges": 5,
  "arrays-basics": 6,
  "array-traversal": 6,
  "array-challenges": 6,
  "objects-basics": 7,
  "array-of-objects": 7,
  "linear-search": 8,
  "sorting-basics": 8,
  "mini-project-brief": 9,
  "mini-project-checkpoints": 9,
  "core-review": 10,
  "defense-prep": 10,
};

const TIER_MAP = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
  Extreme: "extreme",
};

const TITLE_BREAK =
  /\s+(Print|Write|Given|Explain|Using|Create|Fix|Name|Put|Order|Check|Which|Fill|Complete|Adapt|Trace|Run|Build|Design|Count|Find|Reverse|Modify|Rewrite|Convert|Declare|Compute|Identify|Spot|Compare|Merge|Group|Detect|Simulate|Prepare|Time|Anticipate|Practice|List|Do|Go|Imagine|Add|Recover|Validate|Filter|Sort|Update|Without|For|Loop|Get|Stage|Clone|View|Commit|Pick|Re|If|When|What|How|Why|Is|Are|Can|You|This|A|An|The)\b/;

function splitTitlePrompt(rest) {
  const match = rest.match(TITLE_BREAK);
  if (match?.index != null && match.index >= 8) {
    return { title: rest.slice(0, match.index).trim(), prompt: rest.trim() };
  }
  const words = rest.split(/\s+/);
  const title = words.slice(0, Math.min(4, words.length)).join(" ");
  return { title, prompt: rest.trim() };
}

function parseBank(markdown) {
  const lines = markdown.split("\n");
  const exercises = [];
  let currentSlug = null;
  let seqBySlug = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (SLUG_DAY[line]) {
      currentSlug = line;
      seqBySlug[currentSlug] = 0;
      continue;
    }

    const exMatch = line.match(
      /^(?:[🟢🟡🟠🔴]\s*)?(Easy|Medium|Hard|Extreme)\s*\((\d+)\s*pts\)\s*—\s*(.+)$/u,
    );
    if (!exMatch || !currentSlug) continue;

    const [, tier, pointsStr, rest] = exMatch;
    const difficulty = TIER_MAP[tier];
    const maxPoints = Number(pointsStr);
    const { title, prompt: promptStart } = splitTitlePrompt(rest);
    const promptParts = [promptStart];

    const hints = [];
    let j = i + 1;
    while (j < lines.length) {
      const nextLine = lines[j].trim();
      if (!nextLine) {
        j++;
        continue;
      }
      const hintMatch = nextLine.match(/^Hint\s+(\d+)\s*\(-(\d+)\):\s*(.+)$/);
      if (hintMatch) {
        hints.push({ text: hintMatch[3].trim(), cost: Number(hintMatch[2]) });
        j++;
        continue;
      }
      if (
        SLUG_DAY[nextLine] ||
        /^Day \d+/.test(nextLine) ||
        /^(?:[🟢🟡🟠🔴]\s*)?(Easy|Medium|Hard|Extreme)\s*\(\d+\s*pts\)/u.test(
          nextLine,
        )
      ) {
        break;
      }
      promptParts.push(nextLine);
      j++;
    }

    const prompt = promptParts.join("\n");

    if (hints.length !== 3) {
      console.warn(
        `Expected 3 hints for ${currentSlug} / "${title}", got ${hints.length}`,
      );
    }

    seqBySlug[currentSlug] += 1;
    const n = seqBySlug[currentSlug];
    const id = `ex-${currentSlug}-${String(n).padStart(2, "0")}`;

    const meta = inferExerciseChecks({ prompt, title, lessonSlug: currentSlug });
    const outputExamples = inferOutputExamples({
      prompt,
      title,
      lessonSlug: currentSlug,
      kind: meta.kind,
      checks: meta.checks,
    });

    exercises.push({
      id,
      day: SLUG_DAY[currentSlug],
      lessonSlug: currentSlug,
      title,
      difficulty,
      maxPoints,
      prompt,
      hints,
      kind: meta.kind,
      starterCode: meta.starterCode,
      visibleTests: meta.visibleTests,
      outputExamples,
      checks: meta.checks,
    });

    i = j - 1;
  }

  return exercises;
}

function toTs(exercises) {
  return `/** Auto-imported exercise bank — 12 per lesson, points + hints (no solutions). */
/* eslint-disable */
export const exerciseDays = ${JSON.stringify(exercises, null, 2)} as const;
`;
}

function main() {
  const sourcePath = path.resolve(process.argv[2] || defaultSource);
  if (!fs.existsSync(sourcePath)) {
    console.error("Source not found:", sourcePath);
    process.exit(1);
  }

  const markdown = fs.readFileSync(sourcePath, "utf8");
  const exercises = parseBank(markdown);

  fs.writeFileSync(outFile, toTs(exercises), "utf8");

  const bySlug = {};
  const byDiff = { easy: 0, medium: 0, hard: 0, extreme: 0 };
  const byKind = { code: 0, reflect: 0 };
  for (const ex of exercises) {
    bySlug[ex.lessonSlug] = (bySlug[ex.lessonSlug] || 0) + 1;
    byDiff[ex.difficulty] += 1;
    byKind[ex.kind] = (byKind[ex.kind] || 0) + 1;
  }

  console.log("Imported", exercises.length, "exercises →", outFile);
  console.log("By difficulty:", byDiff);
  console.log("By kind:", byKind);
  const bad = Object.entries(bySlug).filter(([, c]) => c !== 12);
  if (bad.length) {
    console.warn("Lessons not at 12 exercises:", bad.map(([s, c]) => `${s}:${c}`).join(", "));
  }
}

main();
