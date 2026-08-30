/**
 * Infer illustrative output examples for exercise context (not solutions).
 */

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

function consoleExample(body) {
  return { medium: "console", body };
}

function terminalExample(body) {
  return { medium: "terminal", body };
}

function textExample(body) {
  return { medium: "text", body };
}

function examplesFromChecks(checks) {
  if (!checks?.length) return null;
  for (const check of checks) {
    if (check.kind === "consoleLinesExact" && check.lines?.length) {
      return [consoleExample(check.lines.join("\n"))];
    }
    if (check.kind === "consoleLine") {
      return [consoleExample(check.equals)];
    }
  }
  return null;
}

function inferGitExample(prompt, title) {
  const text = `${title} ${prompt}`;

  if (/git add app\.js/i.test(text)) {
    return terminalExample("$ git add app.js\n(no output — file is staged)");
  }
  if (/git status/i.test(text) && /which command/i.test(text)) {
    return terminalExample(
      "$ git status\nOn branch main\nChanges to be committed:\n  modified: app.js",
    );
  }
  if (/git log/i.test(text)) {
    return terminalExample(
      "$ git log --oneline\na1b2c3d Add greeting function\n9f8e7d6 Initial commit",
    );
  }
  if (/git commit/i.test(text) && /message/i.test(text)) {
    return textExample(
      'Example shape (not your exact task):\n"add countVowels helper for string tally"',
    );
  }
  if (/git push/i.test(text)) {
    return terminalExample(
      "$ git push origin main\nEnumerating objects: 5, done.\nTo github.com:you/repo.git\n   abc123..def456  main -> main",
    );
  }
  if (/git clone/i.test(text)) {
    return terminalExample("$ git clone https://github.com/org/repo.git\nCloning into 'repo'...");
  }
  if (/git init/i.test(text)) {
    return terminalExample("$ git init\nInitialized empty Git repository in /project/.git/");
  }
  if (/git add \./i.test(text) || /stage everything/i.test(text)) {
    return terminalExample("$ git add .\n(no output — all changes staged)");
  }
  if (/name the three core commands/i.test(text)) {
    return textExample("Example format:\n1. git add\n2. git commit\n3. git push");
  }
  if (/put these in order/i.test(text)) {
    return textExample(
      "Example format:\n1. git add file.js\n2. git commit -m \"message\"\n3. git push",
    );
  }

  return terminalExample("$ git status\n# your Git command and typical output go here");
}

export function inferOutputExamples({ prompt, title, lessonSlug, kind, checks }) {
  const text = `${title} ${prompt}`;

  const fromChecks = examplesFromChecks(checks);
  if (fromChecks) return fromChecks;

  const statements = extractConsoleStatements(prompt);
  if (statements.length && /predict|output|diagnostic|given console/i.test(text)) {
    const lines = [];
    for (const stmt of statements) {
      const part = runSnippet(stmt);
      if (!part?.length) break;
      lines.push(...part);
    }
    if (lines.length) return [consoleExample(lines.join("\n"))];
  }

  if (lessonSlug === "git-github-basics") {
    return [inferGitExample(prompt, title)];
  }

  if (/node hello\.js|node file|terminal command to run/i.test(text)) {
    return [terminalExample("$ node hello.js\nHello, World!")];
  }
  if (/terminal navigation|cd day1/i.test(text)) {
    return [terminalExample("$ cd day1\n$ node hello.js\nHello from hello.js")];
  }
  if (/git status|git add|git commit|git push|git log|git clone/i.test(text)) {
    return [inferGitExample(prompt, title)];
  }

  if (kind === "code") {
    if (/print three lines/i.test(text)) {
      return [consoleExample("Alex\nCasablanca\n21")];
    }
    if (/print "One", "Two", "Three"|multiple prints, in order/i.test(text)) {
      return [consoleExample("One\nTwo\nThree")];
    }
    if (/mini bio|mini-script|full mini-script/i.test(text)) {
      return [
        consoleExample(
          "My JS Journey\n----------\nName: Sam\nAge: 20\nCity: YouCode\nHobby: chess",
        ),
      ];
    }
    if (/three computed values|labeled values/i.test(text)) {
      return [consoleExample("Sum: 10\nDifference: 4\nProduct: 21")];
    }
    if (/print numbers 1 through/i.test(text)) {
      const m = text.match(/through (\d+)/i);
      const n = m ? Math.min(Number(m[1]), 6) : 5;
      return [consoleExample(Array.from({ length: n }, (_, i) => String(i + 1)).join("\n"))];
    }
    if (/countdown/i.test(text)) {
      return [consoleExample("Countdown: 3\nCountdown: 2\nCountdown: 1\nLiftoff!")];
    }
    if (/function\s+([a-zA-Z_$][\w$]*)/i.test(text)) {
      const name = text.match(/function\s+([a-zA-Z_$][\w$]*)/i)?.[1] ?? "myFunction";
      return [
        consoleExample(`// calling ${name}(...) might print:\nresult: 42`),
      ];
    }
    if (/typeof/i.test(text)) {
      return [consoleExample("number\nboolean\nstring")];
    }
    if (/console\.log/i.test(text)) {
      return [consoleExample("(your console.log output appears here)")];
    }
    return [consoleExample("// run your code to see output here")];
  }

  if (/commit message/i.test(text)) {
    return [
      textExample(
        'Example shape:\n"fix off-by-one in binarySearch left bound"',
      ),
    ];
  }
  if (/explain|describe|why|difference between/i.test(text)) {
    return [
      textExample(
        "Example answer shape:\n2–4 sentences in your own words — what happens, then why.",
      ),
    ];
  }
  if (/true or false|which command|name the|put these in order|list your/i.test(text)) {
    return [textExample("Example format: short bullet list or numbered steps.")];
  }
  if (/README|mock defense|checkpoint|plan out|prepare for/i.test(text)) {
    return [
      textExample(
        "Example structure: short sections with headings (Setup, Usage, What I learned).",
      ),
    ];
  }

  return [
    textExample("Write your answer in the draft editor or on paper, then mark complete."),
  ];
}
