/**
 * Infer auto-checks for code-runnable exercises from prompt/title text.
 * Returns { kind, checks, visibleTests, starterCode } — empty checks => reflect task.
 */

function safeEvalMath(expr) {
  const trimmed = expr.trim();
  if (!/^[\d\s+\-*/().%]+$/.test(trimmed)) return null;
  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${trimmed});`)();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  } catch {
    /* ignore */
  }
  return null;
}

function linesExact(lines) {
  return {
    id: "out-exact",
    label: `Console output: ${lines.map((l) => JSON.stringify(l)).join(", ")}`,
    kind: "consoleLinesExact",
    lines,
  };
}

function minLogs(id, label, min) {
  return { id, label, kind: "consoleLogMinCount", min };
}

function includes(id, label, pattern, flags) {
  return { id, label, kind: "sourceIncludes", pattern, flags };
}

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

function extractConsoleStatements(text) {
  return text.match(/console\.log\([^;]*\)\s*;/g) ?? [];
}

function extractPredictedOutput(prompt, title) {
  const combined = `${title} ${prompt}`;
  if (!/predict|what is printed|diagnostic|given console/i.test(combined)) {
    return null;
  }

  const statements = extractConsoleStatements(prompt);
  if (!statements.length) return null;

  const lines = [];
  for (const stmt of statements) {
    const part = runSnippet(stmt);
    if (!part?.length) return null;
    lines.push(...part);
  }
  return lines.length ? lines : null;
}

function extractQuotedSequence(prompt) {
  const seqMatch = prompt.match(
    /print\s+((?:"[^"]+"\s*(?:,\s*|"and"\s+)?)+)/i,
  );
  if (!seqMatch) return null;
  const quoted = [...seqMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return quoted.length >= 2 ? quoted : null;
}

function extractPrintLines(prompt, title) {
  const text = `${title} ${prompt}`;
  const lines = [];

  const mathMatch = prompt.match(
    /print the result of\s+([^.\n]+?)(?:\s+without|\s+before|\.|$)/i,
  );
  if (mathMatch) {
    const result = safeEvalMath(mathMatch[1]);
    if (result != null) lines.push(result);
  }

  const labeledMath = prompt.match(
    /print the results? of\s+([^,]+?),\s*([^,]+?),\s*and\s+([^.\n]+)/i,
  );
  if (labeledMath) {
    const out = [];
    for (const part of labeledMath.slice(1, 4)) {
      const result = safeEvalMath(part.replace(/^.*?:\s*/, "").trim());
      if (result != null) out.push(result);
    }
    if (out.length === 3) return out;
  }

  const quotedPrints = [
    ...prompt.matchAll(/print\s+(?:the\s+text\s+)?["']([^"']+)["']/gi),
    ...prompt.matchAll(/log\s+["']([^"']+)["']/gi),
  ];
  for (const m of quotedPrints) {
    if (!lines.includes(m[1])) lines.push(m[1]);
  }

  if (/print the value\s+true\b/i.test(prompt)) {
    return ["true"];
  }

  const seq = extractQuotedSequence(prompt);
  if (seq) return seq;

  const multiWord = prompt.match(
    /print\s+["']([^"']+)["'],\s*["']([^"']+)["'],\s*and\s+["']([^"']+)["']/i,
  );
  if (multiWord) return [multiWord[1], multiWord[2], multiWord[3]];

  const twoLines = prompt.match(
    /print\s+["']([^"']+)["']\s+then\s+["']([^"']+)["']/i,
  );
  if (twoLines) return [twoLines[1], twoLines[2]];

  const labeledPair = prompt.match(
    /print\s+["']([^"']+)["']\s+followed by (?:the number )?(\d+)/i,
  );
  if (labeledPair) return [`${labeledPair[1]} ${labeledPair[2]}`];

  const countLines = prompt.match(/print numbers 1 through (\d+)/i);
  if (countLines) {
    const n = Number(countLines[1]);
    if (n >= 1 && n <= 20) {
      return Array.from({ length: n }, (_, i) => String(i + 1));
    }
  }

  if (/print three lines/i.test(text)) {
    return null; // handled by open print checks
  }

  return lines.length ? lines : null;
}

function extractOpenPrintChecks(title, prompt) {
  const text = `${title} ${prompt}`;
  const checks = [];

  if (/print three lines/i.test(text)) {
    checks.push(minLogs("three-logs", "At least 3 console.log(...) calls", 3));
  }
  if (/mini bio|mini-script|full mini-script/i.test(text)) {
    checks.push(minLogs("bio-logs", "At least 4 console.log(...) calls", 4));
  }
  if (/three computed values/i.test(text)) {
    checks.push(minLogs("sum-logs", "At least 3 console.log(...) calls", 3));
    checks.push(includes("labels", "Labels results (e.g. Sum:)", "Sum|Difference|Product", "i"));
  }
  if (/labeled values/i.test(text) && /Width/i.test(text)) {
    checks.push(includes("width", 'Logs "Width:"', "Width", "i"));
    checks.push(includes("height", 'Logs "Height:"', "Height", "i"));
  }
  if (/comment out a line/i.test(text)) {
    checks.push(includes("comment", "Uses // comment", "//", "i"));
  }
  if (/semicolon habit/i.test(text)) {
    checks.push(includes("semi", "Ends statement with ;", "console\\.log\\([^)]+\\)\\s*;", "i"));
  }
  if (/print the value true/i.test(text)) {
    return [linesExact(["true"])];
  }

  return checks.length ? checks : null;
}

function extractFunctionChecks(title, prompt) {
  const text = `${title} ${prompt}`;
  const nameMatch =
    text.match(/function\s+([a-zA-Z_$][\w$]*)\s*\(/i) ||
    text.match(/Write a function\s+([a-zA-Z_$][\w$]*)\s*\(/i) ||
    text.match(/Write\s+([a-zA-Z_$][\w$]*)\s*\(/i) ||
    text.match(/Convert\s+function\s+([a-zA-Z_$][\w$]*)/i) ||
    text.match(/Rewrite\s+function\s+([a-zA-Z_$][\w$]*)/i) ||
    text.match(/Implement\s+([a-zA-Z_$][\w$]*)\s*\(/i);

  if (!nameMatch) return null;
  const name = nameMatch[1];
  const checks = [
    includes(
      "fn-def",
      `Defines ${name}()`,
      `function\\s+${name}\\s*\\(|const\\s+${name}\\s*=\\s*(\\([^)]*\\)\\s*=>|function)`,
      "i",
    ),
  ];

  if (/return/i.test(prompt) || /returns/i.test(prompt)) {
    checks.push(includes("fn-return", "Uses return", "return\\b", "i"));
  }

  return checks;
}

function extractFixChecks(prompt, title) {
  const text = `${title} ${prompt}`;

  if (/Console\.log/.test(prompt)) {
    return [includes("fix-case", "Uses console.log (lowercase)", "console\\.log\\s*\\(", "i")];
  }

  const fixMatch = prompt.match(/fix this broken (?:line|statement):\s*(.+)$/im);
  if (fixMatch) {
    const broken = fixMatch[1].trim();
    if (/console\.log\s+"[^"]+"\s*;?\s*$/.test(broken) && !broken.includes("(")) {
      return [includes("fix-parens", "Uses console.log(...)", "console\\.log\\s*\\(", "i")];
    }
  }

  if (/debug silently wrong output/i.test(text) && /"Result: "\s*5/.test(prompt)) {
    return [includes("fix-plus", 'Adds + after "Result: "', '"Result:\\s*"\\s*\\+', "i")];
  }

  if (/case-sensitivity/i.test(text)) {
    return [includes("fix-case", "Uses console.log (lowercase)", "console\\.log\\s*\\(", "i")];
  }

  if (/console\.log\s+"[^"]+"\s+\d/.test(prompt) && /fix/i.test(text)) {
    return [includes("fix-plus", "Adds + between string and number", "\\+\\s*\\d", "i")];
  }

  return null;
}

function extractOperatorChecks(prompt) {
  const checks = [];
  if (/typeof\s+\d+/i.test(prompt) || /typeof 100/i.test(prompt)) {
    checks.push(includes("typeof-num", "Uses typeof on a number", "typeof\\s+\\d+", "i"));
  }
  if (/typeof true/i.test(prompt)) {
    checks.push(includes("typeof-bool", "Uses typeof on true", "typeof\\s+true", "i"));
  }
  if (/console\.log\(true && false\)/i.test(prompt)) {
    return [linesExact(["false"])];
  }
  if (/17 % 5/i.test(prompt)) {
    return [linesExact(["2"])];
  }
  if (/7 === "7"/i.test(prompt)) {
    return [linesExact(["false"])];
  }
  if (/temp > 15 && temp < 25/i.test(prompt)) {
    checks.push(includes("range", "Combines comparisons with &&", "&&", "i"));
  }
  return checks.length ? checks : null;
}

function extractDeclareChecks(prompt) {
  if (!/declare/i.test(prompt) && !/const pi/i.test(prompt)) return null;
  const checks = [];
  if (/const pi/i.test(prompt)) {
    checks.push(includes("const-pi", "Declares const pi", "const\\s+pi\\s*=", "i"));
  }
  if (/let radius/i.test(prompt)) {
    checks.push(includes("let-radius", "Declares let radius", "let\\s+radius\\s*=", "i"));
  }
  if (/const city/i.test(prompt)) {
    checks.push(includes("const-city", "Declares const city", "const\\s+city\\s*=", "i"));
  }
  if (/let count = 5/i.test(prompt)) {
    checks.push(includes("let-count", "Declares let count", "let\\s+count\\s*=", "i"));
    checks.push(includes("reassign", "Reassigns count", "count\\s*=", "i"));
  }
  return checks.length ? checks : null;
}

function extractExplainOutputChecks(prompt, title) {
  const statements = extractConsoleStatements(prompt);
  if (!statements.length) return null;
  if (!/explain|diagnostic|predict|output/i.test(`${title} ${prompt}`)) return null;

  const lines = [];
  for (const stmt of statements) {
    const part = runSnippet(stmt);
    if (!part?.length) return null;
    lines.push(...part);
  }
  return lines.length ? [linesExact(lines)] : null;
}

const REFLECT_RE =
  /\b(git add|git commit|git push|git status|git log|git clone|git init|git pull|git remote|commit message|terminal command|on paper|out loud|write the (?:full )?sequence of commands|state the exact terminal command|create a file .* containing|name the three core commands|which command shows|write a clear,? specific commit message|simulate,? command|README|mock defense|timed run|full checkpoint audit|design and explain without|plan out|feedback|list your own|prepare for|which command|what does git|what happened and how|rewrite it to be|without looking at notes|trace.*by hand|compare linear search and binary search from memory|without notes|recorded if possible|inventing a plausible|classmate's checkpoint|spoken intro|short honest answers|questions an instructor might ask|put these in order|true or false)\b/i;

export function inferExerciseChecks({ prompt, title, lessonSlug }) {
  if (lessonSlug === "git-github-basics") {
    return reflectMeta();
  }

  let lines = extractPredictedOutput(prompt, title);
  if (lines) return codeMeta([linesExact(lines)]);

  lines = extractPrintLines(prompt, title);
  if (lines) return codeMeta([linesExact(lines)]);

  let checks = extractExplainOutputChecks(prompt, title);
  if (checks) return codeMeta(checks, ["Console output matches the expected result"]);

  checks = extractOpenPrintChecks(title, prompt);
  if (checks) return codeMeta(checks, checks.map((c) => c.label));

  checks = extractFixChecks(prompt, title);
  if (checks) return codeMeta(checks, checks.map((c) => c.label));

  checks = extractOperatorChecks(prompt);
  if (checks) return codeMeta(checks, checks.map((c) => c.label));

  checks = extractDeclareChecks(prompt);
  if (checks) return codeMeta(checks, checks.map((c) => c.label));

  checks = extractFunctionChecks(title, prompt);
  if (checks) return codeMeta(checks, checks.map((c) => c.label));

  if (
    /\b(print|logging|console\.log)\b/i.test(`${title} ${prompt}`) &&
    !/explain one difference|console vs file|terminal navigation|run your first file/i.test(
      `${title} ${prompt}`,
    )
  ) {
    return codeMeta([includes("log", "Uses console.log(...)", "console\\.log\\s*\\(", "i")]);
  }

  if (REFLECT_RE.test(prompt) || REFLECT_RE.test(title)) {
    return reflectMeta();
  }

  if (
    /\b(function\s+[a-zA-Z_$]|const\s+[a-zA-Z_$].*=|let\s+[a-zA-Z_$].*=)\b/.test(prompt) &&
    /\b(implement|complete|write code|convert|rewrite)\b/i.test(`${title} ${prompt}`)
  ) {
    return codeMeta([
      includes("has-code", "Includes JavaScript code", "(function\\s+|return\\b|console\\.log)", "i"),
    ]);
  }

  return reflectMeta();
}

function reflectMeta() {
  return {
    kind: "reflect",
    checks: [],
    visibleTests: [],
    starterCode: "// Notes or draft (optional)\n",
  };
}

function codeMeta(checks, visibleTests) {
  const tests = visibleTests ?? checks.map((c) => c.label);
  return {
    kind: "code",
    checks,
    visibleTests: tests,
    starterCode:
      "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
  };
}
