/**
 * Convert reflect / "explain why" exercises into auto-graded code tasks.
 *
 * Usage (from apps/educoach-js):
 *   node scripts/upgrade-reflect-exercises.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inferExerciseChecks } from "./infer-exercise-checks.mjs";
import { inferOutputExamples } from "./infer-output-examples.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "..");
const daysFile = path.join(appRoot, "src/lib/exerciseBank/days.ts");

function runSnippet(code) {
  const lines = [];
  const fakeConsole = {
    log: (...args) => lines.push(args.map((v) => String(v)).join(" ")),
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function("console", `"use strict";\n${code}`)(fakeConsole);
    return lines;
  } catch {
    return null;
  }
}

function linesExact(lines) {
  return {
    id: "out-exact",
    label: `Console output: ${lines.map((l) => JSON.stringify(l)).join(", ")}`,
    kind: "consoleLinesExact",
    lines,
  };
}

function includes(id, label, pattern, flags = "i") {
  return { id, label, kind: "sourceIncludes", pattern, flags };
}

function minLogs(id, label, min) {
  return { id, label, kind: "consoleLogMinCount", min };
}

function codeMeta(checks, visibleTests, starterCode) {
  return {
    kind: "code",
    checks,
    visibleTests: visibleTests ?? checks.map((c) => c.label),
    starterCode:
      starterCode ??
      "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
  };
}

function reflectMeta() {
  return {
    kind: "reflect",
    checks: [],
    visibleTests: [],
    starterCode: "// Notes or draft (optional)\n",
  };
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractConsoleLogStatement(text) {
  const start = text.indexOf("console.log(");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start + "console.log".length; i < text.length; i++) {
    const ch = text[i];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) {
        let end = i + 1;
        if (text[end] === ";") end += 1;
        return text.slice(start, end);
      }
    }
  }
  return null;
}

function extractJsFromHint(text) {
  const funcBlock = text.match(
    /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\}(?:\s*function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\})*/,
  );
  if (funcBlock) return funcBlock[0].trim();

  const setupAndLog = text.match(
    /(?:(?:let|const|var)\s+[\s\S]+?;\s*)+console\.log\([\s\S]+$/,
  );
  if (setupAndLog) {
    const code = setupAndLog[0].replace(/\s*\/\/.*$/, "").trim();
    if (runSnippet(code)) return code;
  }

  const switchBlock = text.match(/switch\s*\([\s\S]+?\}/);
  if (switchBlock && /console\.log/.test(switchBlock[0])) {
    const wrapped = `let color = "red";\n${switchBlock[0]}`;
    if (runSnippet(wrapped)) return wrapped;
  }

  const whileBlock = text.match(
    /(?:let\s+\w+\s*=[^;]+;\s*)?while\s*\([\s\S]+?\}(?:\s*console\.log\([\s\S]+?\);?)?/,
  );
  if (whileBlock && runSnippet(whileBlock[0].replace(/\s*\/\/.*$/, ""))) {
    return whileBlock[0].replace(/\s*\/\/.*$/, "").trim();
  }

  const forBlock = text.match(
    /(?:let\s+\w+\s*=[^;]+;\s*)?for\s*\([\s\S]+?\}(?:\s*console\.log\([\s\S]+?\);?)?/,
  );
  if (forBlock && runSnippet(forBlock[0].replace(/\s*\/\/.*$/, ""))) {
    return forBlock[0].replace(/\s*\/\/.*$/, "").trim();
  }

  const logStmt = extractConsoleLogStatement(text);
  if (logStmt) {
    const before = text.slice(0, text.indexOf(logStmt));
    const setup = before.match(/(?:(?:let|const|var)\s+[\s\S]+?;\s*)+$/);
    const code = setup ? `${setup[0]}${logStmt}` : logStmt;
    if (runSnippet(code.replace(/\s*\/\/.*$/, ""))) return code.replace(/\s*\/\/.*$/, "").trim();
  }

  return null;
}

function extractGitCommands(text) {
  const raw = [
    ...(text.match(/git [a-z][^\n→"]+/gi) ?? []),
    ...(text.match(/cd [^\n]+/gi) ?? []),
    ...(text.match(/node [^\n]+/gi) ?? []),
  ];
  const cleaned = [...new Set(raw.map((c) => c.trim().replace(/\s+$/, "")))];
  return cleaned.length ? cleaned : null;
}

function checksFromHintCode(hints) {
  if (!hints?.length) return null;
  for (let i = hints.length - 1; i >= 0; i--) {
    const code = extractJsFromHint(hints[i].text);
    if (!code) continue;
    const output = runSnippet(code);
    if (output?.length) {
      return codeMeta([linesExact(output)], [`Console output matches the expected result`]);
    }
    const structural = [];
    if (/function\s+\w+/i.test(code)) {
      structural.push(includes("has-fn", "Defines a function", "function\\s+\\w+", "i"));
    }
    if (/console\.log/i.test(code)) {
      structural.push(includes("has-log", "Uses console.log(...)", "console\\.log\\s*\\(", "i"));
    }
    if (structural.length) return codeMeta(structural);
  }
  return null;
}

function checksFromGitHints(hints, prompt, title, lessonSlug) {
  const text = `${title} ${prompt}`;
  const isGitLike =
    lessonSlug === "git-github-basics" ||
    /git |terminal command|node hello|cd day1|stage only|commit message|git push|git pull|git status|git log|git clone|git init/i.test(
      text,
    );
  if (!isGitLike) return null;

  for (let i = hints.length - 1; i >= 0; i--) {
    const cmds = extractGitCommands(hints[i].text);
    if (!cmds?.length) continue;
    const checks = cmds.map((cmd, idx) =>
      includes(`cmd-${idx}`, `Includes: ${cmd}`, escapeRe(cmd), "i"),
    );
    return codeMeta(
      checks,
      checks.map((c) => c.label),
      "// Write the terminal commands below (one per line, as comments or strings)\n",
    );
  }
  return null;
}

function manualCodeConversion(exercise) {
  const { prompt, title, hints } = exercise;
  const text = `${title} ${prompt}`;

  if (/naming check|1stPlace/i.test(text)) {
    return codeMeta(
      [
        includes("first", "Declares firstPlace", "firstPlace", "i"),
        includes("temp", "Declares _temp", "_temp", "i"),
      ],
      ["Declares the valid names firstPlace and _temp"],
    );
  }

  if (/fix the const bug|const total = 0;\s*total =/i.test(text)) {
    return codeMeta(
      [
        includes("use-let", "Uses let for total", "let\\s+total", "i"),
        includes("reassign", "Updates total", "total\\s*=", "i"),
        linesExact(["5"]),
      ],
      ['Uses let and prints 5 after total = total + 5'],
      "const total = 0;\ntotal = total + 5;\nconsole.log(total);\n",
    );
  }

  if (/undefined and null|Explain in your own words/i.test(text)) {
    return codeMeta(
      [
        { id: "undef", label: "Logs undefined example", kind: "consoleIncludesLine", equals: "undefined" },
        { id: "null-val", label: "Logs null example", kind: "consoleIncludesLine", equals: "null" },
        minLogs("two-logs", "At least 2 console.log(...) calls", 2),
      ],
      ["Logs one undefined example and one null example"],
    );
  }

  if (/design a small variable set|modeling a single student/i.test(text)) {
    return codeMeta(
      [
        includes("name", "Declares a name variable", "name", "i"),
        includes("age", "Declares an age variable", "age", "i"),
        includes("grade", "Declares a grade/average variable", "grade|average", "i"),
        includes("passed", "Declares a passed/status variable", "passed|status", "i"),
      ],
      ["Declares four separate variables for the student scenario"],
    );
  }

  if (/spot the assignment bug|if \(x = 5\)/i.test(text)) {
    return codeMeta(
      [includes("strict-eq", "Uses === in the if condition", "===", "i")],
      ["Fixes the condition to compare with === instead of ="],
      "let x = 0;\nif (x = 5) {\n  console.log('bug');\n}\n",
    );
  }

  if (/string vs number addition|"10" \+ 5/i.test(text)) {
    return codeMeta([linesExact(["105", "15"])], ['Logs "105" then 15']);
  }

  if (/range check|temp is strictly between 15 and 25/i.test(text)) {
    return codeMeta([linesExact(["true"])], ["Expression evaluates to true for temp = 22"]);
  }

  if (/compound boolean|weekend OR holiday/i.test(text)) {
    return codeMeta(
      [includes("or", "Uses ||", "\\|\\|", "i"), includes("not", "Uses !", "!", "i")],
      ["Builds (isWeekend || isHoliday) && !hasWork"],
      "const isWeekend = true;\nconst isHoliday = false;\nconst hasWork = true;\n// write one expression and console.log it\n",
    );
  }

  if (/truthy or falsy|if \(0\)/i.test(text)) {
    return codeMeta(
      [includes("if-zero", "Uses if (0)", "if\\s*\\(\\s*0\\s*\\)", "i"), linesExact(["skipped"])],
      ['Shows that if (0) does not run its block'],
      "// Log \"skipped\" when the if (0) block does not run\n",
    );
  }

  if (/switch skeleton|switch\(color\)/i.test(text)) {
    const fromHint = hints?.[hints.length - 1]?.text;
    const switchCode = fromHint?.match(/switch\s*\([\s\S]+?\}/)?.[0];
    if (switchCode) {
      const code = `let color = "red";\n${switchCode}`;
      const output = runSnippet(code);
      if (output) return codeMeta([linesExact(output)]);
    }
    return codeMeta([
      includes("switch", "Uses switch", "switch\\s*\\(", "i"),
      includes("case-red", 'Has case "red"', 'case\\s+"red"', "i"),
      includes("default", "Has default case", "default\\s*:", "i"),
    ]);
  }

  if (/intended output was "Total: 60"|silent mistake/i.test(text)) {
    return codeMeta(
      [linesExact(["Total: 60"])],
      ['Fixes concatenation so output is "Total: 60"'],
      'console.log("Total: " + 10 + 20 + 30);\n',
    );
  }

  if (/commit message|rewrite it to be clear|vague vs clear/i.test(text)) {
    return codeMeta(
      [
        includes("log-msg", "Logs a commit message string", "console\\.log\\s*\\(", "i"),
        includes("specific", "Message mentions what changed", "fix|add|update|function|bug", "i"),
      ],
      ["Write a clear commit message as a string and log it"],
    );
  }

  if (/clone vs init|git init and git clone/i.test(text)) {
    return codeMeta(
      [
        minLogs("two-logs", "At least 2 console.log(...) calls", 2),
        includes("init", "Mentions git init", "init", "i"),
        includes("clone", "Mentions git clone", "clone", "i"),
      ],
      ["Log when you would use git init vs git clone"],
    );
  }

  if (/console vs file behavior|browser console versus running/i.test(text)) {
    return codeMeta(
      [minLogs("two-logs", "At least 2 console.log(...) calls", 2)],
      ["Write two short console.log lines comparing console vs file execution"],
    );
  }

  if (/run your first file|node hello\.js/i.test(text)) {
    return codeMeta(
      [
        includes("log", "Uses console.log(...)", "console\\.log\\s*\\(", "i"),
        includes("node-cmd", "Includes node hello.js", "node\\s+hello\\.js", "i"),
      ],
      ["Write hello.js code and the node command to run it"],
      'console.log("Hello, World!");\n// node hello.js\n',
    );
  }

  if (/terminal navigation|cd day1/i.test(text)) {
    return codeMeta(
      [
        includes("cd", "Includes cd day1", "cd\\s+day1", "i"),
        includes("node", "Includes node hello.js", "node\\s+hello\\.js", "i"),
      ],
      ["Write the cd and node commands"],
      "// cd day1\n// node hello.js\n",
    );
  }

  if (/count total iterations|4 \* 5/i.test(text)) {
    return codeMeta([linesExact(["20"])], ["Logs the total iteration count 20"]);
  }

  if (/break only the inner loop|Output pairs will be/i.test(text)) {
    return codeMeta(
      [includes("break", "Uses break", "break\\b", "i"), minLogs("pairs", "Logs pair output", 3)],
      ["Reproduce the nested loop output with break in the inner loop"],
    );
  }

  if (/block scope check|only exists inside that block/i.test(text)) {
    return codeMeta(
      [includes("block", "Uses a block with let/const", "\\{\\s*let|\\{\\s*const", "i")],
      ["Demonstrate block scope with a variable inside {}"],
    );
  }

  if (/predict a scope chain|innermost scope/i.test(text)) {
    return codeMeta(
      [includes("nested", "Uses nested blocks or functions", "\\{|function", "i"), minLogs("one", "Logs a value", 1)],
      ["Write nested scopes and log which value is used"],
    );
  }

  if (/palindrome|anagram|consonants|longest word|occurrences|binary search|bubble sort|selection sort|trace|from memory|without notes|README|mock defense|one-sentence pitch|checkpoint list|spoken|out loud|on paper/i.test(text)) {
    const fromHints = checksFromHintCode(hints);
    if (fromHints) return fromHints;

    if (/function|implement|write code|complete|build|filter|sort|search|reverse|count/i.test(text)) {
      return codeMeta([
        includes("has-code", "Includes working JavaScript", "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()", "i"),
      ]);
    }
  }

  return null;
}

function cleanPrompt(title, prompt) {
  let p = prompt.trim();
  if (p.startsWith(`${title} `)) p = p.slice(title.length + 1).trim();
  p = p
    .replace(/\bExplain why\b/gi, "Fix or demonstrate:")
    .replace(/\bExplain, in 3-4 sentences,?/gi, "Write code to show:")
    .replace(/\bExplain what's wrong\b/gi, "Fix the code so")
    .replace(/\bExplain the output, don't just state it For\b/gi, "For")
    .replace(/\band Fix or demonstrate: it isn't\b/gi, " — show why it is not")
    .replace(/\band Fix or demonstrate:\b/gi, " — write code to show")
    .replace(/\bFix or demonstrate: and fix it\b/gi, "Fix it")
    .replace(/\bFix or demonstrate: it isn't\b/gi, "Show why the result is not")
    .replace(/\bFix or demonstrate:\b/gi, "Write code to show")
    .replace(/\band explain the reasoning\b/gi, "")
    .replace(/\bin your own words\b/gi, "in code")
    .replace(/\bwithout notes\b/gi, "from code")
    .replace(/\bout loud\b/gi, "in the editor")
    .replace(/\bon paper\b/gi, "in the editor")
    .replace(/,\s*and Write code to show\.?$/i, ".")
    .replace(/Write code to show\.?$/i, "Write code to demonstrate.")
    .replace(/Write code to demonstrate\.?$/i, "Write code to demonstrate.")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (/^Which of these variable names is invalid.*Write code to demonstrate\.?$/i.test(p)) {
    p =
      "Which variable name is invalid: 1stPlace, firstPlace, or _temp? Declare the valid names in code.";
  }
  if (/^Without running it, decide if if \(0\)/i.test(p)) {
    p = 'Write code that uses if (0) and logs "skipped" when the block does not run.';
  }
  return p;
}

function cleanTitle(title, prompt) {
  let t = title.trim();
  if (/explain in your own words/i.test(t)) return "Practice undefined vs null";
  if (/explain the push failure/i.test(t)) return "Fix a push failure";
  if (/explain linear search vs binary search/i.test(t)) return "Compare search algorithms in code";
  if (/^explain\b/i.test(t)) return t.replace(/^explain\b/i, "Practice");
  if (/diagnose a silent mistake/i.test(t)) return "Fix a silent mistake";
  return t;
}

function isFixCodeExercise(exercise) {
  const text = `${exercise.title} ${exercise.prompt}`;
  if (
    /git |commit message|checkpoint \d|describe all three|which topic a bug|push failure/i.test(
      text,
    )
  ) {
    return false;
  }
  return /\b(fix the|fix a syntax|fix a silent|debug silently|fix the const|fix the fallthrough|reorder broken|spot every bug|spot the assignment|fix the condition|find and fix all bugs|broken statement|throws an error:|student wrote .+ and got an error|accidental global)\b/i.test(
    text,
  );
}

function extractBrokenStarterCode(prompt, title) {
  const text = `${title} ${prompt}`;

  if (/debug silently wrong output/i.test(text)) return 'console.log("Result: " 5 + 5);\n';
  if (/fix the const bug|const total = 0;\s*total/i.test(text)) {
    return "const total = 0;\ntotal = total + 5;\nconsole.log(total);\n";
  }
  if (/spot the assignment|fix the condition/i.test(text)) {
    return "let x = 0;\nif (x = 5) {\n  console.log('bug');\n}\n";
  }
  if (/intended output was ["']Total: 60["']/i.test(text)) {
    return 'console.log("Total: " + 10 + 20 + 30);\n';
  }
  if (/case-sensitivity|Console\.log\("test"\)/i.test(text)) return 'Console.log("test");\n';
  if (/fix this broken statement.*console\.log "Hello"/i.test(text)) return 'console.log "Hello";\n';
  if (/spot every bug|const Age = 20/i.test(text)) return "const Age = 20;\nage = 21;\nconsole.log(Age);\n";
  if (/fix the fallthrough bug/i.test(text)) {
    return 'let x = 1;\nswitch (x) { case 1: console.log("one"); case 2: console.log("two"); }\n';
  }

  const afterColon = prompt.match(
    /(?:Fix it while keeping[^:]*:|Find and fix all bugs in:|Fix it:)\s*(.+)$/is,
  );
  if (afterColon) {
    const code = afterColon[1].trim().split(/\.\s*$/)[0].trim();
    if (/console\.|let |const |switch|function |if \(/.test(code)) return `${code}\n`;
  }

  const brokenStmt = prompt.match(/fix this broken (?:line|statement):\s*(.+)$/im);
  if (brokenStmt) return `${brokenStmt[1].trim()}\n`;

  const throwsErr = prompt.match(/throws an error:\s*(.+?)\.\s*Fix/i);
  if (throwsErr) return `${throwsErr[1].trim()}\n`;

  const studentWrote = prompt.match(/student wrote\s+(.+?)\s+and got an error/i);
  if (studentWrote) return `${studentWrote[1].trim()}\n`;

  const multiline = prompt.match(/\n((?:let |const |if |switch|function ).+)$/s);
  if (multiline && /reorder broken|always prints/i.test(text)) return `${multiline[1].trim()}\n`;

  const givenMatch = prompt.match(/Given\s+(.+?)\s+explain/i);
  if (givenMatch && /accidental global/i.test(text)) return `${givenMatch[1].trim()}\n`;

  return null;
}

function applyFixExercisePatches(exercise) {
  if (!isFixCodeExercise(exercise)) return exercise;
  const broken = extractBrokenStarterCode(exercise.prompt, exercise.title);
  return {
    ...exercise,
    starterCode: broken ?? exercise.starterCode,
    visibleTests: [],
  };
}

function shouldUpgrade(exercise) {
  if (exercise.kind === "reflect") return true;
  const text = `${exercise.title} ${exercise.prompt}`;
  if (
    /\bexplain why\b|\bin your own words\b|\bwithout notes\b|\bout loud\b|\bon paper\b|\bexplain,?\s/i.test(
      text,
    )
  ) {
    return true;
  }
  if (/Fix or demonstrate|Write code to demonstrate\.?$/i.test(exercise.prompt)) return true;
  if (isFixCodeExercise(exercise)) return true;
  if (
    exercise.checks?.some((c) => c.id === "one-log") &&
    (/git |terminal command|cd day1|stage only|commit message/i.test(text) ||
      exercise.lessonSlug === "git-github-basics")
  ) {
    return true;
  }
  return false;
}

function fallbackCodeMeta(exercise) {
  const text = `${exercise.title} ${exercise.prompt}`;
  const fromGit = checksFromGitHints(exercise.hints, exercise.prompt, exercise.title, exercise.lessonSlug);
  if (fromGit) return fromGit;

  if (/git |terminal command|node hello|cd day1/i.test(text)) {
    return codeMeta(
      [includes("git-or-cmd", "Includes a command", "(git\\s+|node\\s+|cd\\s+)", "i")],
      ["Write the required command(s)"],
      "// Write terminal commands below\n",
    );
  }
  if (/function|implement|search|sort|filter|reverse|count|array|object|string|loop/i.test(text)) {
    return codeMeta(
      [
        includes("has-code", "Includes working JavaScript", "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()", "i"),
      ],
      ["Write working JavaScript for this task"],
    );
  }
  return codeMeta(
    [minLogs("one-log", "At least 1 console.log(...) call", 1)],
    ["Write a short code answer using console.log"],
  );
}

function upgradeExercise(exercise) {
  if (!shouldUpgrade(exercise)) return exercise;

  let meta =
    checksFromHintCode(exercise.hints) ??
    checksFromGitHints(exercise.hints, exercise.prompt, exercise.title, exercise.lessonSlug) ??
    manualCodeConversion(exercise);

  if (!meta || meta.kind === "reflect") {
    meta = inferExerciseChecks({
      prompt: exercise.prompt,
      title: exercise.title,
      lessonSlug: exercise.lessonSlug,
    });
  }

  if (!meta || meta.kind === "reflect") {
    meta = manualCodeConversion(exercise) ?? fallbackCodeMeta(exercise);
  }

  const title = cleanTitle(exercise.title, exercise.prompt);
  const prompt = cleanPrompt(title, exercise.prompt);
  const outputExamples = inferOutputExamples({
    prompt,
    title,
    lessonSlug: exercise.lessonSlug,
    kind: meta.kind,
    checks: meta.checks,
  });

  return {
    ...exercise,
    title,
    prompt,
    kind: meta.kind,
    starterCode: meta.starterCode,
    visibleTests: meta.visibleTests,
    checks: meta.checks,
    outputExamples,
  };
}

function loadExercises() {
  const raw = fs.readFileSync(daysFile, "utf8");
  const json = raw.replace(/^[\s\S]*?export const exerciseDays = /, "").replace(/ as const;\s*$/, "");
  return JSON.parse(json);
}

function toTs(exercises) {
  return `/** Auto-imported exercise bank — 12 per lesson, points + hints (no solutions). */
/* eslint-disable */
export const exerciseDays = ${JSON.stringify(exercises, null, 2)} as const;
`;
}

function main() {
  const exercises = loadExercises();
  let upgraded = 0;
  let stillReflect = 0;

  const next = exercises.map((ex) => {
    const base = shouldUpgrade(ex) ? upgradeExercise(ex) : ex;
    const updated = applyFixExercisePatches(base);
    if (
      updated.kind !== ex.kind ||
      updated.checks.length !== ex.checks.length ||
      updated.starterCode !== ex.starterCode ||
      JSON.stringify(updated.visibleTests) !== JSON.stringify(ex.visibleTests)
    ) {
      upgraded += 1;
    }
    if (updated.kind === "reflect") stillReflect += 1;
    return updated;
  });

  fs.writeFileSync(daysFile, toTs(next), "utf8");

  const byKind = next.reduce(
    (acc, ex) => {
      acc[ex.kind] = (acc[ex.kind] || 0) + 1;
      return acc;
    },
    { code: 0, reflect: 0 },
  );

  console.log("Upgraded exercises:", upgraded);
  console.log("Remaining reflect:", stillReflect);
  console.log("By kind:", byKind);
  console.log("Wrote", daysFile);
}

main();
