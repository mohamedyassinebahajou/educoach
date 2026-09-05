/** Auto-imported exercise bank — 12 per lesson, points + hints (no solutions). */
/* eslint-disable */
export const exerciseDays = [
  {
    "id": "ex-welcome-to-javascript-01",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Print a greeting",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print a greeting Print \"Hello, YouCode!\" to the console.",
    "hints": [
      {
        "text": "You need exactly one function call.",
        "cost": 2
      },
      {
        "text": "The function is console.log(...).",
        "cost": 3
      },
      {
        "text": "Put the text in double or single quotes inside the parentheses.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Hello, YouCode!\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Hello, YouCode!"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Hello, YouCode!\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Hello, YouCode!"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-02",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Print three lines",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print three lines Print your first name, your city, and your age as three separate lines.",
    "hints": [
      {
        "text": "You need three separate statements.",
        "cost": 2
      },
      {
        "text": "Each statement is its own console.log(...).",
        "cost": 3
      },
      {
        "text": "Strings go in quotes, numbers don't need quotes.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "At least 3 console.log(...) calls"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Alex\nCasablanca\n21"
      }
    ],
    "checks": [
      {
        "id": "three-logs",
        "label": "At least 3 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 3
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-03",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Basic math print",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "This code throws an error: Console.log(\"test\"); Fix it.",
    "hints": [
      {
        "text": "Let JavaScript do the math for you.",
        "cost": 2
      },
      {
        "text": "Put the expression directly inside console.log(...).",
        "cost": 3
      },
      {
        "text": "console.log(12 * 4);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"48\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "48"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"48\"",
        "kind": "consoleLinesExact",
        "lines": [
          "48"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-04",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Multiple values, one line",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Multiple values, one line Print the text \"Total:\" followed by the number 100, both in a single console.log call.",
    "hints": [
      {
        "text": "console.log accepts more than one argument.",
        "cost": 2
      },
      {
        "text": "Separate the arguments with a comma.",
        "cost": 3
      },
      {
        "text": "console.log(\"Total:\", 100);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Total:\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Total:"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Total:\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Total:"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-05",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Comment out a line",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Comment out a line Given a two-line script, make the second line a comment so it doesn't run, without deleting it.",
    "hints": [
      {
        "text": "JavaScript comments start with a specific symbol.",
        "cost": 3
      },
      {
        "text": "The symbol is two characters, not one.",
        "cost": 5
      },
      {
        "text": "Prefix the line with //.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses // comment"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "comment",
        "label": "Uses // comment",
        "kind": "sourceIncludes",
        "pattern": "//",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-06",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Predict before running",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Predict before running Write down what you think this prints, before running it: console.log(\"5\" + 5); console.log(5 + 5);",
    "hints": [
      {
        "text": "One of these lines mixes a string and a number.",
        "cost": 3
      },
      {
        "text": "+ behaves differently depending on the types involved.",
        "cost": 5
      },
      {
        "text": "Text + number joins them together; number + number adds them.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"55\", \"10\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "55\n10"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"55\", \"10\"",
        "kind": "consoleLinesExact",
        "lines": [
          "55",
          "10"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-07",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Fix the case-sensitivity bug",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "This code throws an error: Console.log(\"test\");. Fix it.",
    "hints": [
      {
        "text": "JavaScript cares about uppercase vs lowercase.",
        "cost": 3
      },
      {
        "text": "Look carefully at the capital letter.",
        "cost": 5
      },
      {
        "text": "The correct object name is entirely lowercase.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "Console.log(\"test\");\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "fix-case",
        "label": "Uses console.log (lowercase)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-08",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Three computed values",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Three computed values Print the results of 7 + 3, 7 - 3, and 7 * 3, each labeled with text like \"Sum:\".",
    "hints": [
      {
        "text": "You'll need three separate console.log calls or one with several arguments.",
        "cost": 3
      },
      {
        "text": "Label each result so it's clear which is which.",
        "cost": 5
      },
      {
        "text": "console.log(\"Sum:\", 7 + 3); is one valid line.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "At least 3 console.log(...) calls",
      "Labels results (e.g. Sum:)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Sum: 10\nDifference: 4\nProduct: 21"
      }
    ],
    "checks": [
      {
        "id": "sum-logs",
        "label": "At least 3 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 3
      },
      {
        "id": "labels",
        "label": "Labels results (e.g. Sum:)",
        "kind": "sourceIncludes",
        "pattern": "Sum|Difference|Product",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-09",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Practice the output, don't just state it",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "For console.log(\"Age: \" + 20 + 5);, predict the output and show why it is not \"Age: 25\".",
    "hints": [
      {
        "text": "+ is evaluated left to right.",
        "cost": 5
      },
      {
        "text": "Once a string is involved, everything after gets joined as text, not added.",
        "cost": 8
      },
      {
        "text": "The first + joins \"Age: \" and 20 into text; the second + then joins that text with 5.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Age: 205\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Age: 205"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Age: 205\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Age: 205"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-10",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Build a mini bio using only what you know today",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Build a mini bio using only what you know today Using only console.log and text/number values (no variables yet), print a 4-line bio: name, age, city, and one hobby.",
    "hints": [
      {
        "text": "Each line needs its own console.log.",
        "cost": 5
      },
      {
        "text": "Keep every value literal (typed directly), since you haven't learned variables yet.",
        "cost": 8
      },
      {
        "text": "Structure: console.log(\"Name: ...\"); repeated for each fact.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "At least 4 console.log(...) calls"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "My JS Journey\n----------\nName: Sam\nAge: 20\nCity: YouCode\nHobby: chess"
      }
    ],
    "checks": [
      {
        "id": "bio-logs",
        "label": "At least 4 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 4
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-11",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Fix a silent mistake",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Diagnose a silent mistake Fix the code so with console.log(\"Total: \" + 10 + 20 + 30); if the intended output was \"Total: 60\".",
    "hints": [
      {
        "text": "The problem is about order, not syntax — this code runs without an error.",
        "cost": 5
      },
      {
        "text": "Once you hit the first string, every following + becomes concatenation.",
        "cost": 8
      },
      {
        "text": "To force the numbers to add first, they need to be grouped or added before joining with the string.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "console.log(\"Total: \" + 10 + 20 + 30);\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Total: 60"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Total: 60\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Total: 60"
        ]
      }
    ]
  },
  {
    "id": "ex-welcome-to-javascript-12",
    "day": 1,
    "lessonSlug": "welcome-to-javascript",
    "title": "Full diagnostic",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given console.log(\"Result: \" + 2 + 3 + \"4\" + 5);, predict the exact final string output character by character, behind every operator.",
    "hints": [
      {
        "text": "Track the running value after each +, one at a time, left to right.",
        "cost": 8
      },
      {
        "text": "Once concatenation starts, it stays text for the rest of the expression — this doesn't reverse even if a number appears later.",
        "cost": 12
      },
      {
        "text": "The intermediate values are: \"Result: \", then \"Result: 2\", then \"Result: 23\", then \"Result: 234\" — continue this pattern to the end.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Result: 2345\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Result: 2345"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Result: 2345\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Result: 2345"
        ]
      }
    ]
  },
  {
    "id": "ex-hello-console-01",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Run your first file",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Create a file hello.js containing one console.log line, and state the exact terminal command to run it.",
    "hints": [
      {
        "text": "The command starts with node.",
        "cost": 2
      },
      {
        "text": "You need the file name including its extension.",
        "cost": 3
      },
      {
        "text": "node hello.js",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: node hello.js"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ node hello.js\nHello, World!"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: node hello.js",
        "kind": "sourceIncludes",
        "pattern": "node hello\\.js",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-02",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Multiple prints, in order",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Multiple prints, in order Print \"One\", \"Two\", \"Three\" in that exact order using three console.log calls.",
    "hints": [
      {
        "text": "Order in the file matters.",
        "cost": 2
      },
      {
        "text": "JavaScript runs top to bottom.",
        "cost": 3
      },
      {
        "text": "Write the three lines in the exact order you want them to print.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"One\", \"Two\", \"Three\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "One\nTwo\nThree"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"One\", \"Two\", \"Three\"",
        "kind": "consoleLinesExact",
        "lines": [
          "One",
          "Two",
          "Three"
        ]
      }
    ]
  },
  {
    "id": "ex-hello-console-03",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Print a boolean",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print a boolean Print the value true (not the text \"true\").",
    "hints": [
      {
        "text": "Don't put quotes around it.",
        "cost": 2
      },
      {
        "text": "true is a keyword, not a string.",
        "cost": 3
      },
      {
        "text": "console.log(true);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"true\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "true"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"true\"",
        "kind": "consoleLinesExact",
        "lines": [
          "true"
        ]
      }
    ]
  },
  {
    "id": "ex-hello-console-04",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Semicolon habit",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Semicolon habit Rewrite this line to include the missing semicolon: console.log(\"done\")",
    "hints": [
      {
        "text": "Something small is missing at the very end.",
        "cost": 2
      },
      {
        "text": "It's a punctuation mark, not a letter.",
        "cost": 3
      },
      {
        "text": "Add ; right after the closing parenthesis.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Ends statement with ;"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "semi",
        "label": "Ends statement with ;",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\([^)]+\\)\\s*;",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-05",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Predict a 3-line output",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Predict a 3-line output Predict the output of: console.log(\"A\"); console.log(1+1); console.log(\"B\");",
    "hints": [
      {
        "text": "Each statement prints on its own line.",
        "cost": 3
      },
      {
        "text": "The middle line involves math, not text.",
        "cost": 5
      },
      {
        "text": "The second line prints a number, not \"1+1\".",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"A\", \"2\", \"B\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "A\n2\nB"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"A\", \"2\", \"B\"",
        "kind": "consoleLinesExact",
        "lines": [
          "A",
          "2",
          "B"
        ]
      }
    ]
  },
  {
    "id": "ex-hello-console-06",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Fix a syntax error",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Fix this broken statement: console.log \"Hello\";",
    "hints": [
      {
        "text": "Something structural is missing, not just a typo in the text.",
        "cost": 3
      },
      {
        "text": "Function calls need a specific pair of symbols around their input.",
        "cost": 5
      },
      {
        "text": "Add parentheses: console.log(\"Hello\");",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "console.log \"Hello\";\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Hello"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Hello\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Hello"
        ]
      }
    ]
  },
  {
    "id": "ex-hello-console-07",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Console vs file behavior",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Explain one difference between typing code directly into a browser console versus running a .js file with Node.",
    "hints": [
      {
        "text": "Think about how each one executes code — line by line, or all at once.",
        "cost": 3
      },
      {
        "text": "A REPL evaluates and shows a result after every single line you type.",
        "cost": 5
      },
      {
        "text": "Running a whole file executes every line in order before you see any output, unless you use console.log.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write two short console.log lines comparing console vs file execution"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "two-logs",
        "label": "At least 2 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 2
      }
    ]
  },
  {
    "id": "ex-hello-console-08",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Logging labeled values",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Logging labeled values Print two labeled values in one line: \"Width:\" with value 10, and \"Height:\" with value 5.",
    "hints": [
      {
        "text": "One console.log call can take more than two arguments.",
        "cost": 3
      },
      {
        "text": "Separate every argument with a comma.",
        "cost": 5
      },
      {
        "text": "console.log(\"Width:\", 10, \"Height:\", 5);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Logs \"Width:\"",
      "Logs \"Height:\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Sum: 10\nDifference: 4\nProduct: 21"
      }
    ],
    "checks": [
      {
        "id": "width",
        "label": "Logs \"Width:\"",
        "kind": "sourceIncludes",
        "pattern": "Width",
        "flags": "i"
      },
      {
        "id": "height",
        "label": "Logs \"Height:\"",
        "kind": "sourceIncludes",
        "pattern": "Height",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-09",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Debug silently wrong output",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "A student wrote console.log(\"Result: \" 5 + 5); and got an error. Identify and fix the mistake.",
    "hints": [
      {
        "text": "Look between the string and the number.",
        "cost": 5
      },
      {
        "text": "Two separate values next to each other without an operator will cause a syntax error.",
        "cost": 8
      },
      {
        "text": "Add a + between \"Result: \" and 5.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "console.log(\"Result: \" 5 + 5);\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "fix-plus",
        "label": "Adds + after \"Result: \"",
        "kind": "sourceIncludes",
        "pattern": "\"Result:\\s*\"\\s*\\+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-10",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Practice execution order",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Explain execution order Given a 5-line script mixing console.log and comments, explain in the editor (in writing) the exact order lines will execute and print.",
    "hints": [
      {
        "text": "Comments never execute, regardless of position.",
        "cost": 5
      },
      {
        "text": "Non-comment lines execute strictly top to bottom.",
        "cost": 8
      },
      {
        "text": "List only the non-commented lines in their original top-to-bottom order — that's your execution order.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-11",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Terminal navigation",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "You have a file day1/hello.js and your terminal is currently in the parent folder. Write the full sequence of commands needed to run it.",
    "hints": [
      {
        "text": "You'll need to change directories first.",
        "cost": 5
      },
      {
        "text": "cd moves you into a folder.",
        "cost": 8
      },
      {
        "text": "cd day1 then node hello.js",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// cd day1\n// node hello.js\n",
    "visibleTests": [
      "Write the cd and node commands"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ cd day1\n$ node hello.js\nHello from hello.js"
      }
    ],
    "checks": [
      {
        "id": "cd",
        "label": "Includes cd day1",
        "kind": "sourceIncludes",
        "pattern": "cd\\s+day1",
        "flags": "i"
      },
      {
        "id": "node",
        "label": "Includes node hello.js",
        "kind": "sourceIncludes",
        "pattern": "node\\s+hello\\.js",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-hello-console-12",
    "day": 1,
    "lessonSlug": "hello-console",
    "title": "Full mini-script from a spec",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Full mini-script from a spec Without seeing any example, write a .js file from scratch that: prints a title line, prints a blank separator using dashes, then prints 3 labeled facts about you, in a single file you could run with Node.",
    "hints": [
      {
        "text": "A \"blank separator\" can just be a string of dash characters.",
        "cost": 8
      },
      {
        "text": "You'll need at least 5 console.log calls in total.",
        "cost": 12
      },
      {
        "text": "Structure: title, console.log(\"----------\"), then three console.log(\"Label:\", value) lines.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "At least 4 console.log(...) calls"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "My JS Journey\n----------\nName: Sam\nAge: 20\nCity: YouCode\nHobby: chess"
      }
    ],
    "checks": [
      {
        "id": "bio-logs",
        "label": "At least 4 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 4
      }
    ]
  },
  {
    "id": "ex-git-github-basics-01",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Name the three core commands",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Name the three Git commands used in the everyday save-and-upload workflow, in order.",
    "hints": [
      {
        "text": "The first one prepares files.",
        "cost": 2
      },
      {
        "text": "The second one saves a snapshot with a message.",
        "cost": 3
      },
      {
        "text": "git add, git commit -m \"...\", git push.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git add, git commit -m",
      "Includes: git push."
    ],
    "outputExamples": [
      {
        "medium": "text",
        "body": "Example format:\n1. git add\n2. git commit\n3. git push"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git add, git commit -m",
        "kind": "sourceIncludes",
        "pattern": "git add, git commit -m",
        "flags": "i"
      },
      {
        "id": "cmd-1",
        "label": "Includes: git push.",
        "kind": "sourceIncludes",
        "pattern": "git push\\.",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-02",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Stage a single file",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write the command to stage only a file named app.js (not everything).",
    "hints": [
      {
        "text": "You don't need the . shortcut here.",
        "cost": 2
      },
      {
        "text": "The command takes a file name as an argument.",
        "cost": 3
      },
      {
        "text": "git add app.js",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git add app.js"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git add app.js",
        "kind": "sourceIncludes",
        "pattern": "git add app\\.js",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-03",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Write a good commit message",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write a clear, specific commit message for a commit that adds a function counting vowels.",
    "hints": [
      {
        "text": "Avoid vague words like \"update\" or \"fix\".",
        "cost": 2
      },
      {
        "text": "Mention what was added and briefly why.",
        "cost": 3
      },
      {
        "text": "Something like \"add countVowels function\".",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a clear commit message as a string and log it"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "log-msg",
        "label": "Logs a commit message string",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      },
      {
        "id": "specific",
        "label": "Message mentions what changed",
        "kind": "sourceIncludes",
        "pattern": "fix|add|update|function|bug",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-04",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Check your repo's state",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Which command shows you which files are staged, modified, or untracked?",
    "hints": [
      {
        "text": "It's not git log.",
        "cost": 2
      },
      {
        "text": "The command name matches what it reports.",
        "cost": 3
      },
      {
        "text": "git status",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git status"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git status",
        "kind": "sourceIncludes",
        "pattern": "git status",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-05",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Order the workflow",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Put these in the correct order: git commit -m \"add feature\", git push, git add feature.js.",
    "hints": [
      {
        "text": "You must stage before you can commit.",
        "cost": 3
      },
      {
        "text": "You must commit before you can push.",
        "cost": 5
      },
      {
        "text": "git add feature.js → git commit -m \"add feature\" → git push",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git add feature.js",
      "Includes: git commit -m",
      "Includes: git push"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git push origin main\nEnumerating objects: 5, done.\nTo github.com:you/repo.git\n   abc123..def456  main -> main"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git add feature.js",
        "kind": "sourceIncludes",
        "pattern": "git add feature\\.js",
        "flags": "i"
      },
      {
        "id": "cmd-1",
        "label": "Includes: git commit -m",
        "kind": "sourceIncludes",
        "pattern": "git commit -m",
        "flags": "i"
      },
      {
        "id": "cmd-2",
        "label": "Includes: git push",
        "kind": "sourceIncludes",
        "pattern": "git push",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-06",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Clone vs init",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Explain the difference between git init and git clone, and when you'd use each.",
    "hints": [
      {
        "text": "One starts tracking a brand-new folder; the other downloads an existing repo.",
        "cost": 3
      },
      {
        "text": "git clone needs a URL; git init doesn't.",
        "cost": 5
      },
      {
        "text": "Use init for a new project with no GitHub repo yet; use clone to get a copy of an existing GitHub repo.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git clone needs a URL; git init doesn't."
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git clone https://github.com/org/repo.git\nCloning into 'repo'..."
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git clone needs a URL; git init doesn't.",
        "kind": "sourceIncludes",
        "pattern": "git clone needs a URL; git init doesn't\\.",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-07",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "View history",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write the command that shows a compact, one-line-per-commit history of the repo.",
    "hints": [
      {
        "text": "It's a variation of git log.",
        "cost": 3
      },
      {
        "text": "There's a flag that shortens the output.",
        "cost": 5
      },
      {
        "text": "git log --oneline",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git log --oneline"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git log --oneline",
        "kind": "sourceIncludes",
        "pattern": "git log --oneline",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-08",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Vague vs clear commit messages",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given the message \"fix stuff\", rewrite it to be clear and specific, inventing a plausible change it describes.",
    "hints": [
      {
        "text": "Say exactly what changed, not that \"something\" changed.",
        "cost": 3
      },
      {
        "text": "Mention the function, file, or feature affected.",
        "cost": 5
      },
      {
        "text": "Example: \"fix off-by-one bug in reverseString function\".",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a clear commit message as a string and log it"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "log-msg",
        "label": "Logs a commit message string",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      },
      {
        "id": "specific",
        "label": "Message mentions what changed",
        "kind": "sourceIncludes",
        "pattern": "fix|add|update|function|bug",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-09",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Recover from a forgotten add",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "You ran git commit -m \"message\" but forgot to git add your new file first. Explain what happened and how to fix it.",
    "hints": [
      {
        "text": "The commit only includes what was staged beforehand.",
        "cost": 5
      },
      {
        "text": "Your new file was never staged, so it's not part of that commit.",
        "cost": 8
      },
      {
        "text": "Run git add on the missing file, then commit again (a new commit, or amend the previous one).",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git add on the missing file, then commit again (a new commit, or amend the previous one)."
    ],
    "outputExamples": [
      {
        "medium": "text",
        "body": "Example shape (not your exact task):\n\"add countVowels helper for string tally\""
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git add on the missing file, then commit again (a new commit, or amend the previous one).",
        "kind": "sourceIncludes",
        "pattern": "git add on the missing file, then commit again \\(a new commit, or amend the previous one\\)\\.",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-10",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Design a commit plan",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "You're about to build 4 functions today. Plan out 4 separate commit messages you would use, one per function, as you finish each.",
    "hints": [
      {
        "text": "Each message should be tied to exactly one function's completion.",
        "cost": 5
      },
      {
        "text": "Keep messages short but specific — mention the function name.",
        "cost": 8
      },
      {
        "text": "Example pattern: \"add [functionName] function and test it\".",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a clear commit message as a string and log it"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "log-msg",
        "label": "Logs a commit message string",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      },
      {
        "id": "specific",
        "label": "Message mentions what changed",
        "kind": "sourceIncludes",
        "pattern": "fix|add|update|function|bug",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-11",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Fix a push failure",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Explain the push failure git push fails with a message about the remote having work you don't have locally. What should you do first?",
    "hints": [
      {
        "text": "You need to bring the remote's changes into your local repo first.",
        "cost": 5
      },
      {
        "text": "The command to do this starts with git pull.",
        "cost": 8
      },
      {
        "text": "Run git pull first, resolve anything necessary, then try git push again.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git pull first, resolve anything necessary, then try git push again."
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git push origin main\nEnumerating objects: 5, done.\nTo github.com:you/repo.git\n   abc123..def456  main -> main"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git pull first, resolve anything necessary, then try git push again.",
        "kind": "sourceIncludes",
        "pattern": "git pull first, resolve anything necessary, then try git push again\\.",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-git-github-basics-12",
    "day": 1,
    "lessonSlug": "git-github-basics",
    "title": "Full day-one Git simulation",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Simulate, command by command, a full session: initialize a repo, create and stage a file, commit it, connect it to a GitHub remote, and push it — writing every single command in the correct order.",
    "hints": [
      {
        "text": "You'll need at least 5 distinct commands.",
        "cost": 8
      },
      {
        "text": "The remote connection command needs a URL and is only run once.",
        "cost": 12
      },
      {
        "text": "Order: git init, git add ., git commit -m \"...\", git remote add origin <url>, git push -u origin main.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git init, git add ., git commit -m",
      "Includes: git remote add origin <url>, git push -u origin main."
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git status\n# your Git command and typical output go here"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git init, git add ., git commit -m",
        "kind": "sourceIncludes",
        "pattern": "git init, git add \\., git commit -m",
        "flags": "i"
      },
      {
        "id": "cmd-1",
        "label": "Includes: git remote add origin <url>, git push -u origin main.",
        "kind": "sourceIncludes",
        "pattern": "git remote add origin <url>, git push -u origin main\\.",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-01",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Declare and print",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Declare and print Declare a const called city with your city's name, and print it.",
    "hints": [
      {
        "text": "const needs a value right away.",
        "cost": 2
      },
      {
        "text": "Strings go in quotes.",
        "cost": 3
      },
      {
        "text": "const city = \"Marrakesh\"; console.log(city);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-02",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Check a type",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print the result of `typeof 100`.",
    "hints": [
      {
        "text": "typeof goes before the value.",
        "cost": 2
      },
      {
        "text": "No parentheses are required around the value.",
        "cost": 3
      },
      {
        "text": "console.log(typeof 100);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Prints \"number\"",
      "Uses typeof on 100"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "number"
      }
    ],
    "checks": [
      {
        "id": "output-number",
        "label": "Prints \"number\"",
        "kind": "consoleLine",
        "index": 0,
        "equals": "number"
      },
      {
        "id": "typeof-num",
        "label": "Uses typeof on 100",
        "kind": "sourceIncludes",
        "pattern": "typeof\\s+100",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-03",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Update a let",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Update a let Declare let count = 5;, then change it to 10, then print it.",
    "hints": [
      {
        "text": "let allows reassignment.",
        "cost": 2
      },
      {
        "text": "Reassignment doesn't repeat the let keyword.",
        "cost": 3
      },
      {
        "text": "let count = 5; count = 10; console.log(count);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Declares let count",
      "Reassigns count"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "let-count",
        "label": "Declares let count",
        "kind": "sourceIncludes",
        "pattern": "let\\s+count\\s*=",
        "flags": "i"
      },
      {
        "id": "reassign",
        "label": "Reassigns count",
        "kind": "sourceIncludes",
        "pattern": "count\\s*=",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-04",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Naming check",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Which variable name is invalid: 1stPlace, firstPlace, or _temp? Declare the valid names in code.",
    "hints": [
      {
        "text": "Look at what each name starts with.",
        "cost": 2
      },
      {
        "text": "One rule is about starting characters.",
        "cost": 3
      },
      {
        "text": "Names cannot start with a digit, so 1stPlace is invalid.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Declares the valid names firstPlace and _temp"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "first",
        "label": "Declares firstPlace",
        "kind": "sourceIncludes",
        "pattern": "firstPlace",
        "flags": "i"
      },
      {
        "id": "temp",
        "label": "Declares _temp",
        "kind": "sourceIncludes",
        "pattern": "_temp",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-05",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Fix the const bug",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "This throws an error. Fix it while keeping the intent that the value changes: const total = 0; total = total + 5;",
    "hints": [
      {
        "text": "The variable is clearly meant to be reassigned.",
        "cost": 3
      },
      {
        "text": "const doesn't allow that.",
        "cost": 5
      },
      {
        "text": "Change const to let.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "const total = 0;\ntotal = total + 5;\nconsole.log(total);\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "5"
      }
    ],
    "checks": [
      {
        "id": "use-let",
        "label": "Uses let for total",
        "kind": "sourceIncludes",
        "pattern": "let\\s+total",
        "flags": "i"
      },
      {
        "id": "reassign",
        "label": "Updates total",
        "kind": "sourceIncludes",
        "pattern": "total\\s*=",
        "flags": "i"
      },
      {
        "id": "out-exact",
        "label": "Console output: \"5\"",
        "kind": "consoleLinesExact",
        "lines": [
          "5"
        ]
      }
    ]
  },
  {
    "id": "ex-variables-let-const-06",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "undefined vs assigned",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "undefined vs assigned What is printed by let x; console.log(x); x = 5; console.log(x);?",
    "hints": [
      {
        "text": "The first print happens before any value is assigned.",
        "cost": 3
      },
      {
        "text": "A declared-but-unassigned variable has a specific default value.",
        "cost": 5
      },
      {
        "text": "It prints undefined then 5.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-07",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Multiple declarations",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Multiple declarations Declare three const variables — name, age, isStudent — with sensible values, and print all three on one line.",
    "hints": [
      {
        "text": "Use appropriate types for each (string, number, boolean).",
        "cost": 3
      },
      {
        "text": "console.log can take multiple values separated by commas.",
        "cost": 5
      },
      {
        "text": "console.log(name, age, isStudent);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-08",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "typeof on multiple values",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "typeof on multiple values Print the typeof of a string, a number, a boolean, and an undeclared variable's value, each on its own line.",
    "hints": [
      {
        "text": "You'll need four separate console.log lines.",
        "cost": 3
      },
      {
        "text": "For \"undeclared value\", declare a variable with no assignment.",
        "cost": 5
      },
      {
        "text": "let u; console.log(typeof \"a\"); console.log(typeof 1); console.log(typeof true); console.log(typeof u);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "number\nboolean\nstring"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-09",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Spot every bug",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Find and fix all bugs in: const Age = 20; age = 21; console.log(Age);",
    "hints": [
      {
        "text": "There are two separate issues here, not one.",
        "cost": 5
      },
      {
        "text": "One issue is about const reassignment; the other is about a naming mismatch (case sensitivity).",
        "cost": 8
      },
      {
        "text": "age (lowercase) was never declared — only Age (capital A) exists, and it's a const so it can't be reassigned anyway.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "const Age = 20;\nage = 21;\nconsole.log(Age);\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-variables-let-const-10",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Practice undefined vs null",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Explain in code Write code to show: the difference between undefined and null, with one example of each.",
    "hints": [
      {
        "text": "One is automatic; the other is intentional.",
        "cost": 5
      },
      {
        "text": "undefined usually means \"not yet given a value\"; null usually means \"deliberately empty\".",
        "cost": 8
      },
      {
        "text": "Example: let x; // undefined automatically vs let y = null; // deliberately set to nothing.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Logs one undefined example and one null example"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "undefined\nnull"
      }
    ],
    "checks": [
      {
        "id": "undef",
        "label": "Logs undefined example",
        "kind": "consoleIncludesLine",
        "equals": "undefined"
      },
      {
        "id": "null-val",
        "label": "Logs null example",
        "kind": "consoleIncludesLine",
        "equals": "null"
      },
      {
        "id": "two-logs",
        "label": "At least 2 console.log(...) calls",
        "kind": "consoleLogMinCount",
        "min": 2
      }
    ]
  },
  {
    "id": "ex-variables-let-const-11",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Refactor magic values into variables",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Refactor magic values into variables Given console.log(3.14159 * 5 * 5); (area of a circle with radius 5), rewrite it using named const variables for pi and radius.",
    "hints": [
      {
        "text": "Two values in this expression deserve names.",
        "cost": 5
      },
      {
        "text": "Use const pi = ... and const radius = ....",
        "cost": 8
      },
      {
        "text": "const pi = 3.14159; const radius = 5; console.log(pi * radius * radius);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"78.53975\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "78.53975"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"78.53975\"",
        "kind": "consoleLinesExact",
        "lines": [
          "78.53975"
        ]
      }
    ]
  },
  {
    "id": "ex-variables-let-const-12",
    "day": 2,
    "lessonSlug": "variables-let-const",
    "title": "Design a small variable set for a scenario",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "You're modeling a single student's basic info (not yet as an object — just separate variables): name, age, grade average, and whether they passed. Declare all four with appropriate let/const choices and explain your choice for each.",
    "hints": [
      {
        "text": "Ask for each variable: \"will this ever be reassigned in a real program?\"",
        "cost": 8
      },
      {
        "text": "Grade average might update if new grades come in; a passed/failed status might also be recalculated.",
        "cost": 12
      },
      {
        "text": "A reasonable answer: const name and let age (rarely changes, but could), let gradeAverage, let passed — with a short justification for each based on whether reassignment is plausible.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Declares four separate variables for the student scenario"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "name",
        "label": "Declares a name variable",
        "kind": "sourceIncludes",
        "pattern": "name",
        "flags": "i"
      },
      {
        "id": "age",
        "label": "Declares an age variable",
        "kind": "sourceIncludes",
        "pattern": "age",
        "flags": "i"
      },
      {
        "id": "grade",
        "label": "Declares a grade/average variable",
        "kind": "sourceIncludes",
        "pattern": "grade|average",
        "flags": "i"
      },
      {
        "id": "passed",
        "label": "Declares a passed/status variable",
        "kind": "sourceIncludes",
        "pattern": "passed|status",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-01",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Basic modulo",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Basic modulo Print the remainder of 17 divided by 5.",
    "hints": [
      {
        "text": "Use the % operator.",
        "cost": 2
      },
      {
        "text": "It goes between the two numbers.",
        "cost": 3
      },
      {
        "text": "console.log(17 % 5);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-02",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Strict equality check",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Strict equality check Print the result of comparing 7 and \"7\" using ===.",
    "hints": [
      {
        "text": "=== checks both value and type.",
        "cost": 2
      },
      {
        "text": "One side is a number, one is a string.",
        "cost": 3
      },
      {
        "text": "console.log(7 === \"7\"); // false",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-03",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Compound assignment Start with",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Compound assignment Start with let x = 10; and use += to add 5, then print the result.",
    "hints": [
      {
        "text": "+= updates a variable based on its current value.",
        "cost": 2
      },
      {
        "text": "x += 5; is shorthand for something.",
        "cost": 3
      },
      {
        "text": "let x = 10; x += 5; console.log(x); // 15",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-04",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Logical AND",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Predict the output of console.log(2 + 3 * 4); and show why it is not 20.",
    "hints": [
      {
        "text": "AND is only true if both sides are true.",
        "cost": 2
      },
      {
        "text": "One side here is false.",
        "cost": 3
      },
      {
        "text": "console.log(true && false); // false",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-05",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Even or odd checker",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Even or odd checker Given a number n = 23, print whether it's even or odd using % and a boolean expression (no if yet).",
    "hints": [
      {
        "text": "n % 2 tells you something useful.",
        "cost": 3
      },
      {
        "text": "Compare that result to 0.",
        "cost": 5
      },
      {
        "text": "console.log(n % 2 === 0);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-06",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Combine two conditions",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Combine two conditions Given age = 20 and hasID = true, print true only if both age >= 18 AND hasID are true.",
    "hints": [
      {
        "text": "You need to combine two boolean expressions.",
        "cost": 3
      },
      {
        "text": "Use && between them.",
        "cost": 5
      },
      {
        "text": "console.log(age >= 18 && hasID);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-07",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Spot the assignment bug",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Fix the condition so it compares x to 5 with === instead of assigning with =.",
    "hints": [
      {
        "text": "One of these changes x's value; the other only checks it.",
        "cost": 3
      },
      {
        "text": "= returns the assigned value itself, which JavaScript then treats as truthy/falsy.",
        "cost": 5
      },
      {
        "text": "x = 5 sets x to 5 and the condition becomes truthy (since 5 is truthy) regardless of what x was before — this is a subtle bug.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "let x = 0;\nif (x = 5) {\n  console.log('bug');\n}\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "strict-eq",
        "label": "Uses === in the if condition",
        "kind": "sourceIncludes",
        "pattern": "===",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-08",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "String vs number addition",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Predict and explain the outputs of \"10\" + 5 and 10 + 5.",
    "hints": [
      {
        "text": "Look at the type of the left-hand value in each case.",
        "cost": 3
      },
      {
        "text": "+ with a string always concatenates, even if the other side is a number.",
        "cost": 5
      },
      {
        "text": "\"10\" + 5 is \"105\" (text); 10 + 5 is 15 (number).",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Logs \"105\" then 15"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "105\n15"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"105\", \"15\"",
        "kind": "consoleLinesExact",
        "lines": [
          "105",
          "15"
        ]
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-09",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Range check",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given temp = 22, write a single expression (no if) that is true only if temp is strictly between 15 and 25.",
    "hints": [
      {
        "text": "You need two comparisons combined.",
        "cost": 5
      },
      {
        "text": "Use && to require both to be true.",
        "cost": 8
      },
      {
        "text": "console.log(temp > 15 && temp < 25);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Expression evaluates to true for temp = 22"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "true"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"true\"",
        "kind": "consoleLinesExact",
        "lines": [
          "true"
        ]
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-10",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Precedence puzzle Predict the",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "output of console.log(2 + 3 * 4); — show why it is not 20.",
    "hints": [
      {
        "text": "Not all operators run strictly left to right.",
        "cost": 5
      },
      {
        "text": "Multiplication has higher precedence than addition.",
        "cost": 8
      },
      {
        "text": "3 * 4 is computed first (12), then 2 + 12 gives 14.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"14\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "14"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"14\"",
        "kind": "consoleLinesExact",
        "lines": [
          "14"
        ]
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-11",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Build a compound boolean",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given isWeekend = true, isHoliday = false, hasWork = true, write an expression that's true only when it's a day off — meaning weekend OR holiday, but NOT if there's work anyway.",
    "hints": [
      {
        "text": "You need ||, &&, and ! together.",
        "cost": 5
      },
      {
        "text": "Combine the \"day off\" condition first, then exclude the work condition.",
        "cost": 8
      },
      {
        "text": "console.log((isWeekend || isHoliday) && !hasWork);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "const isWeekend = true;\nconst isHoliday = false;\nconst hasWork = true;\n// write one expression and console.log it\n",
    "visibleTests": [
      "Builds (isWeekend || isHoliday) && !hasWork"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "or",
        "label": "Uses ||",
        "kind": "sourceIncludes",
        "pattern": "\\|\\|",
        "flags": "i"
      },
      {
        "id": "not",
        "label": "Uses !",
        "kind": "sourceIncludes",
        "pattern": "!",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-operators-arithmetic-12",
    "day": 2,
    "lessonSlug": "operators-arithmetic",
    "title": "Full precedence trace",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Full precedence trace Given console.log(10 - 2 * 3 + 4 / 2 === 6);, manually trace every single operation in the correct order (following operator precedence) and state the final boolean result, explaining each step.",
    "hints": [
      {
        "text": "Multiplication and division happen before addition and subtraction, and === happens last.",
        "cost": 8
      },
      {
        "text": "First compute 2 * 3 and 4 / 2 separately, then handle the - and + left to right.",
        "cost": 12
      },
      {
        "text": "Step by step: 2*3=6, 4/2=2, so 10 - 6 + 2 = 6, then 6 === 6 is true.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"true\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "true"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"true\"",
        "kind": "consoleLinesExact",
        "lines": [
          "true"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-01",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Basic if/else",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Basic if/else Given age = 16, print \"Minor\" if under 18, otherwise \"Adult\".",
    "hints": [
      {
        "text": "You need one if and one else.",
        "cost": 2
      },
      {
        "text": "The condition compares age to 18.",
        "cost": 3
      },
      {
        "text": "if (age < 18) { console.log(\"Minor\"); } else { console.log(\"Adult\"); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Minor\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Minor"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Minor\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Minor"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-02",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Single condition",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Single condition Print \"Positive\" only if n = 5 is greater than 0 (no else needed).",
    "hints": [
      {
        "text": "You don't need an else branch here.",
        "cost": 2
      },
      {
        "text": "The condition is a simple comparison.",
        "cost": 3
      },
      {
        "text": "if (n > 0) { console.log(\"Positive\"); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Positive\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Positive"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Positive\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Positive"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-03",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Truthy or falsy?",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write code that uses if (0) and logs \"skipped\" when the block does not run.",
    "hints": [
      {
        "text": "Some numbers behave as false in a condition.",
        "cost": 2
      },
      {
        "text": "0 is one of the falsy values.",
        "cost": 3
      },
      {
        "text": "No, 0 is falsy, so the block would not run.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Log \"skipped\" when the if (0) block does not run\n",
    "visibleTests": [
      "Shows that if (0) does not run its block"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "skipped"
      }
    ],
    "checks": [
      {
        "id": "if-zero",
        "label": "Uses if (0)",
        "kind": "sourceIncludes",
        "pattern": "if\\s*\\(\\s*0\\s*\\)",
        "flags": "i"
      },
      {
        "id": "out-exact",
        "label": "Console output: \"skipped\"",
        "kind": "consoleLinesExact",
        "lines": [
          "skipped"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-04",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Switch skeleton",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Fill in a switch statement that prints \"Red\" when color === \"red\", and \"Unknown\" otherwise.",
    "hints": [
      {
        "text": "You need one case and a default.",
        "cost": 2
      },
      {
        "text": "Don't forget break after the case.",
        "cost": 3
      },
      {
        "text": "switch(color) { case \"red\": console.log(\"Red\"); break; default: console.log(\"Unknown\"); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Red"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Red\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Red"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-05",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Three-way grade check",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Three-way grade check Given a score, print \"Pass\" if 50 or above, \"Borderline\" if exactly 45-49, and \"Fail\" otherwise.",
    "hints": [
      {
        "text": "You'll need if / else if / else.",
        "cost": 3
      },
      {
        "text": "Order your conditions from highest to lowest, or be careful with ranges.",
        "cost": 5
      },
      {
        "text": "Structure: if (score >= 50) ... else if (score >= 45) ... else ...",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Pass\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Pass"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Pass\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Pass"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-06",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Fix the fallthrough bug",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "This switch prints too much. Fix it: switch(x) { case 1: console.log(\"one\"); case 2: console.log(\"two\"); }",
    "hints": [
      {
        "text": "Something is missing after each case block.",
        "cost": 3
      },
      {
        "text": "Without it, execution \"falls through\" to the next case.",
        "cost": 5
      },
      {
        "text": "Add break; after each console.log line.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "let x = 1;\nswitch (x) { case 1: console.log(\"one\"); case 2: console.log(\"two\"); }\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-if-else-07",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Weekend checker with switch",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Weekend checker with switch Using switch, print \"Weekend\" for \"Saturday\" or \"Sunday\", and \"Weekday\" for anything else.",
    "hints": [
      {
        "text": "Two cases can share the same block if you stack them.",
        "cost": 3
      },
      {
        "text": "Only the last of the stacked cases needs the actual code + break.",
        "cost": 5
      },
      {
        "text": "case \"Saturday\": case \"Sunday\": console.log(\"Weekend\"); break;",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Weekend\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Weekend"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Weekend\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Weekend"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-08",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Combine conditions in an if",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Combine conditions in an if Print \"Eligible\" only if age >= 18 && hasID are both true, otherwise \"Not eligible\".",
    "hints": [
      {
        "text": "Combine both booleans with && inside the condition.",
        "cost": 3
      },
      {
        "text": "You still need an else for the failing case.",
        "cost": 5
      },
      {
        "text": "if (age >= 18 && hasID) { console.log(\"Eligible\"); } else { console.log(\"Not eligible\"); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Eligible\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Eligible"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Eligible\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Eligible"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-09",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Reorder broken conditions",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "This code always prints \"F\" even for a grade of 95. Find and fix the ordering bug.\nlet grade = 95; if (grade >= 60) { console.log(\"Pass\"); } else if (grade >= 90) { console.log(\"A\"); } else { console.log(\"F\"); }",
    "hints": [
      {
        "text": "The first matching condition wins, even if a later one would also match.",
        "cost": 5
      },
      {
        "text": "Since 95 also satisfies >= 60, it never reaches the >= 90 check.",
        "cost": 8
      },
      {
        "text": "Reorder so the more specific/higher condition (>= 90) comes first.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "let grade = 95; if (grade >= 60) { console.log(\"Pass\"); } else if (grade >= 90) { console.log(\"A\"); } else { console.log(\"F\"); }\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-if-else-10",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "FizzBuzz condition logic (no loop yet)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "FizzBuzz condition logic (no loop yet) For a single number n = 15, print \"FizzBuzz\" if divisible by both 3 and 5, \"Fizz\" if only by 3, \"Buzz\" if only by 5, otherwise the number itself.",
    "hints": [
      {
        "text": "Check the combined divisibility case first.",
        "cost": 5
      },
      {
        "text": "Use % to check divisibility, and order your else ifs carefully.",
        "cost": 8
      },
      {
        "text": "if (n % 15 === 0) ... else if (n % 3 === 0) ... else if (n % 5 === 0) ... else ...",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"FizzBuzz\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "FizzBuzz"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"FizzBuzz\"",
        "kind": "consoleLinesExact",
        "lines": [
          "FizzBuzz"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-11",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Nested conditions",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Nested conditions Given isMember = true and cartTotal = 120, print \"Free shipping\" if the person is a member AND their cart is over 100, \"Discount shipping\" if just a member, and \"Standard shipping\" otherwise.",
    "hints": [
      {
        "text": "You can nest an if inside another if's block.",
        "cost": 5
      },
      {
        "text": "Check membership first, then check the cart total inside that block.",
        "cost": 8
      },
      {
        "text": "if (isMember) { if (cartTotal > 100) {...} else {...} } else {...}",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"Free shipping\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Free shipping"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Free shipping\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Free shipping"
        ]
      }
    ]
  },
  {
    "id": "ex-if-else-12",
    "day": 2,
    "lessonSlug": "if-else",
    "title": "Full decision table",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Design and implement conditions for a ticket price system: children (under 12) pay 5, seniors (65+) pay 7, everyone else pays 10 — but if it's a \"Tuesday\", everyone gets a 2 discount regardless of age group. Implement this with a combination of if/else if/else and a nested check for the Tuesday discount.",
    "hints": [
      {
        "text": "First determine the base price using an age-based if/else if/else chain.",
        "cost": 8
      },
      {
        "text": "Then apply the Tuesday discount as a separate check afterward, subtracting from whatever base price was found.",
        "cost": 12
      },
      {
        "text": "Use a let price variable, assign it inside the age chain, then afterward: if (day === \"Tuesday\") { price -= 2; }",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-01",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Count to 10",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Count to 10 Print numbers 1 through 10 using a for loop.",
    "hints": [
      {
        "text": "Start your counter at 1.",
        "cost": 2
      },
      {
        "text": "Your condition should allow 10 to print too.",
        "cost": 3
      },
      {
        "text": "for (let i = 1; i <= 10; i++) { console.log(i); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\"",
        "kind": "consoleLinesExact",
        "lines": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ]
      }
    ]
  },
  {
    "id": "ex-for-while-loops-02",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Countdown with while",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Countdown with while Print 5, 4, 3, 2, 1 using a while loop.",
    "hints": [
      {
        "text": "Start at 5 and decrease.",
        "cost": 2
      },
      {
        "text": "Use i-- inside the loop.",
        "cost": 3
      },
      {
        "text": "let i = 5; while (i >= 1) { console.log(i); i--; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Countdown: 3\nCountdown: 2\nCountdown: 1\nLiftoff!"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-03",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Skip a number",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Skip a number Print 1 to 5, but skip the number 3, using continue.",
    "hints": [
      {
        "text": "Check for the value inside the loop.",
        "cost": 2
      },
      {
        "text": "Use continue when the check matches.",
        "cost": 3
      },
      {
        "text": "for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-04",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Stop early",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Stop early Print numbers starting from 1, but stop completely once you reach 4, using break.",
    "hints": [
      {
        "text": "Use a loop with a high or unbounded upper limit.",
        "cost": 2
      },
      {
        "text": "Check the condition to break inside the loop body.",
        "cost": 3
      },
      {
        "text": "for (let i = 1; i <= 100; i++) { if (i === 4) break; console.log(i); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-05",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Sum with a loop",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Sum with a loop Compute and print the sum of numbers from 1 to 100 using a loop (not a formula).",
    "hints": [
      {
        "text": "Start an accumulator variable at 0 before the loop.",
        "cost": 3
      },
      {
        "text": "Add the loop counter to the accumulator each pass.",
        "cost": 5
      },
      {
        "text": "let sum = 0; for (let i = 1; i <= 100; i++) { sum += i; } console.log(sum);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-06",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Print only even numbers",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Print only even numbers Print all even numbers from 1 to 20 using a loop and a condition.",
    "hints": [
      {
        "text": "Use % to check evenness inside the loop.",
        "cost": 3
      },
      {
        "text": "Combine the loop with an if.",
        "cost": 5
      },
      {
        "text": "for (let i = 1; i <= 20; i++) { if (i % 2 === 0) console.log(i); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-07",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Multiplication facts for one number",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Multiplication facts for one number Print the multiplication table for the number 6, from 6x1 to 6x10.",
    "hints": [
      {
        "text": "One loop is enough here since only one number varies.",
        "cost": 3
      },
      {
        "text": "Loop j from 1 to 10 and compute 6 * j.",
        "cost": 5
      },
      {
        "text": "for (let j = 1; j <= 10; j++) { console.log(\"6 x \" + j + \" = \" + (6 * j)); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-08",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "while loop with a condition change",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Using while, keep doubling a number starting at 1 until it exceeds 100, printing each value.",
    "hints": [
      {
        "text": "The condition should check against 100.",
        "cost": 3
      },
      {
        "text": "Double the value inside the loop body.",
        "cost": 5
      },
      {
        "text": "let n = 1; while (n <= 100) { console.log(n); n = n * 2; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "1\n2\n4\n8\n16\n32\n64"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"1\", \"2\", \"4\", \"8\", \"16\", \"32\", \"64\"",
        "kind": "consoleLinesExact",
        "lines": [
          "1",
          "2",
          "4",
          "8",
          "16",
          "32",
          "64"
        ]
      }
    ]
  },
  {
    "id": "ex-for-while-loops-09",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Count digits of a number using a loop",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given n = 4827, count how many digits it has using a while loop (no .toString() shortcuts).",
    "hints": [
      {
        "text": "Repeated division by 10 removes one digit at a time.",
        "cost": 5
      },
      {
        "text": "Use Math.floor(n / 10) to drop the last digit, and count each pass.",
        "cost": 8
      },
      {
        "text": "let count = 0; while (n > 0) { n = Math.floor(n / 10); count++; } console.log(count);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-10",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Find the first multiple",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Find the first multiple Using a loop, find and print the first number greater than 200 that is divisible by 7.",
    "hints": [
      {
        "text": "Start counting from 201 upward.",
        "cost": 5
      },
      {
        "text": "Check divisibility with % inside the loop, and break once found.",
        "cost": 8
      },
      {
        "text": "for (let i = 201; ; i++) { if (i % 7 === 0) { console.log(i); break; } }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-11",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Combine break and continue",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Combine break and continue Print numbers 1 to 30, skipping multiples of 3, but stop completely once you reach 25.",
    "hints": [
      {
        "text": "You need both continue and break in the same loop.",
        "cost": 5
      },
      {
        "text": "Check the stopping condition before the skipping condition.",
        "cost": 8
      },
      {
        "text": "for (let i = 1; i <= 30; i++) { if (i === 25) break; if (i % 3 === 0) continue; console.log(i); }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-for-while-loops-12",
    "day": 3,
    "lessonSlug": "for-while-loops",
    "title": "Simulate compound interest Starting",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Simulate compound interest Starting with 1000, apply 5% growth each round for 10 rounds using a loop, printing the value after every round, and print the final total separately at the end.",
    "hints": [
      {
        "text": "Multiply the current value by 1.05 each pass, don't recompute from the original each time.",
        "cost": 8
      },
      {
        "text": "Use a let variable that updates itself across iterations.",
        "cost": 12
      },
      {
        "text": "let value = 1000; for (let i = 1; i <= 10; i++) { value = value * 1.05; console.log(\"Round\", i, \":\", value); } console.log(\"Final:\", value);",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-01",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Basic double loop",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Basic double loop Print every pair (i, j) where i and j each go from 1 to 2.",
    "hints": [
      {
        "text": "You need a loop inside a loop.",
        "cost": 2
      },
      {
        "text": "The inner loop runs fully for each outer pass.",
        "cost": 3
      },
      {
        "text": "for (let i = 1; i <= 2; i++) { for (let j = 1; j <= 2; j++) { console.log(i, j); } }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-02",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Small multiplication table",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Small multiplication table Print a multiplication table for numbers 1 to 3 (3x3 grid of results).",
    "hints": [
      {
        "text": "Both i and j should range from 1 to 3.",
        "cost": 2
      },
      {
        "text": "The result of each cell is i * j.",
        "cost": 3
      },
      {
        "text": "for (let i=1;i<=3;i++){ for(let j=1;j<=3;j++){ console.log(i+\"x\"+j+\"=\"+(i*j)); } }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-03",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Count total iterations",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "If the outer loop runs 4 times and the inner loop runs 5 times each time, how many total inner passes happen?",
    "hints": [
      {
        "text": "Multiply the two loop counts.",
        "cost": 2
      },
      {
        "text": "It's not addition.",
        "cost": 3
      },
      {
        "text": "4 × 5 = 20.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Logs the total iteration count 20"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "20"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"20\"",
        "kind": "consoleLinesExact",
        "lines": [
          "20"
        ]
      }
    ]
  },
  {
    "id": "ex-nested-loops-04",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Simple star row builder",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Simple star row builder Print 3 rows, where row i (from 1 to 3) contains i stars.",
    "hints": [
      {
        "text": "Build a string in the inner loop.",
        "cost": 2
      },
      {
        "text": "Print the built string after the inner loop finishes.",
        "cost": 3
      },
      {
        "text": "for (let i=1;i<=3;i++){ let row=\"\"; for(let j=0;j<i;j++){row+=\"*\";} console.log(row); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-05",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Full multiplication table (1-10)",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Full multiplication table (1-10) Print the full multiplication table from 1x1 to 10x10.",
    "hints": [
      {
        "text": "Both loops should go from 1 to 10.",
        "cost": 3
      },
      {
        "text": "Format each line clearly, e.g. \"i x j = result\".",
        "cost": 5
      },
      {
        "text": "for (let i=1;i<=10;i++){ for(let j=1;j<=10;j++){ console.log(i+\" x \"+j+\" = \"+(i*j)); } }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-06",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Only even rows",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Only even rows Print the multiplication table (1-5) but only for even values of i.",
    "hints": [
      {
        "text": "Add a condition on the outer loop's value.",
        "cost": 3
      },
      {
        "text": "Use % to check if i is even before running the inner loop.",
        "cost": 5
      },
      {
        "text": "for (let i=1;i<=5;i++){ if(i%2!==0) continue; for(let j=1;j<=5;j++){ console.log(i,j); } }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-07",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Inverted triangle",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Inverted triangle Print a triangle of stars where the first row has 5 stars and each row has one fewer, down to 1.",
    "hints": [
      {
        "text": "The outer loop should count downward, or you invert the inner loop's bound.",
        "cost": 3
      },
      {
        "text": "Try for (let i = 5; i >= 1; i--).",
        "cost": 5
      },
      {
        "text": "for(let i=5;i>=1;i--){ let row=\"\"; for(let j=0;j<i;j++){row+=\"*\";} console.log(row); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-08",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Break only the inner loop",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given nested loops where i and j both go 0 to 2, add a break so that whenever j === 1, only the inner loop stops (not the outer one). Predict the full output.",
    "hints": [
      {
        "text": "break inside the inner loop only affects that loop.",
        "cost": 3
      },
      {
        "text": "The outer loop will still complete all of its passes.",
        "cost": 5
      },
      {
        "text": "Output pairs will be: (0,0), (1,0), (2,0) — since j never gets past 0 before breaking each time.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Reproduce the nested loop output with break in the inner loop"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "break",
        "label": "Uses break",
        "kind": "sourceIncludes",
        "pattern": "break\\b",
        "flags": "i"
      },
      {
        "id": "pairs",
        "label": "Logs pair output",
        "kind": "consoleLogMinCount",
        "min": 3
      }
    ]
  },
  {
    "id": "ex-nested-loops-09",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Coordinate grid with a condition",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Coordinate grid with a condition Print every coordinate pair (x, y) from 0 to 4 (both directions) where x + y is exactly 4.",
    "hints": [
      {
        "text": "Nest two loops from 0 to 4 each.",
        "cost": 5
      },
      {
        "text": "Add an if inside the inner loop checking the sum.",
        "cost": 8
      },
      {
        "text": "for(let x=0;x<=4;x++){ for(let y=0;y<=4;y++){ if(x+y===4) console.log(x,y); } }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-10",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Diamond shape",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Diamond shape Print a simple diamond shape made of asterisks using nested loops (upper triangle growing, lower triangle shrinking) for a total height tied to a size of 3.",
    "hints": [
      {
        "text": "You'll need two separate loop blocks: one for the top half (including the middle), one for the bottom half.",
        "cost": 5
      },
      {
        "text": "The top half grows the star count each row; the bottom half shrinks it.",
        "cost": 8
      },
      {
        "text": "Top: for(let i=1;i<=3;i++) building i stars. Bottom: for(let i=2;i>=1;i--) building i stars.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-11",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Compare every pair in an array (without duplicates)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Compare every pair in an array (without duplicates) Given [3, 1, 4], print every unique pair of values (not comparing an item to itself, and not repeating a pair in reverse order).",
    "hints": [
      {
        "text": "The inner loop shouldn't restart from 0 each time.",
        "cost": 5
      },
      {
        "text": "Start the inner loop's index at i + 1 instead of 0.",
        "cost": 8
      },
      {
        "text": "for(let i=0;i<arr.length;i++){ for(let j=i+1;j<arr.length;j++){ console.log(arr[i], arr[j]); } }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-nested-loops-12",
    "day": 3,
    "lessonSlug": "nested-loops",
    "title": "Build a full coordinate map with labels",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Build a full coordinate map with labels For a 4x4 grid (rows and columns numbered 0-3), print a label for each cell: \"corner\" if it's in one of the four corners, \"edge\" if it's on the border but not a corner, and \"inside\" otherwise — using nested loops and conditions.",
    "hints": [
      {
        "text": "A corner has both its row and column equal to either 0 or the max index (3).",
        "cost": 8
      },
      {
        "text": "An edge (non-corner) has exactly one of row or column equal to 0 or 3, not both.",
        "cost": 12
      },
      {
        "text": "Check corners first with a combined condition, then check if row or column is 0/3 for edges, otherwise label \"inside\".",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-01",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Simple add function",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Simple add function Write a function add(a, b) that returns their sum, then call it and print the result.",
    "hints": [
      {
        "text": "Use the function keyword and return.",
        "cost": 2
      },
      {
        "text": "Call the function inside console.log.",
        "cost": 3
      },
      {
        "text": "function add(a, b) { return a + b; } console.log(add(2, 3));",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines add()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Simple(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines add()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+add\\s*\\(|const\\s+add\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-02",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Function with one parameter",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Function with one parameter Write a function triple(n) that returns n * 3.",
    "hints": [
      {
        "text": "One parameter, one return line.",
        "cost": 2
      },
      {
        "text": "Multiply the parameter by 3.",
        "cost": 3
      },
      {
        "text": "function triple(n) { return n * 3; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines triple()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling with(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines triple()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+triple\\s*\\(|const\\s+triple\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-03",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "No return means undefined",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "No return means undefined Write a function logOnly() that prints \"done\" but returns nothing, then show what console.log(logOnly()) prints.",
    "hints": [
      {
        "text": "The function itself only contains a console.log.",
        "cost": 2
      },
      {
        "text": "Without return, calling it still gives a value when logged.",
        "cost": 3
      },
      {
        "text": "It prints \"done\" then undefined.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines logOnly()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling logOnly(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines logOnly()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+logOnly\\s*\\(|const\\s+logOnly\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-04",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Default parameter",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Default parameter Write a function greet(name = \"guest\") that returns \"Hello, \" + name.",
    "hints": [
      {
        "text": "The default goes right in the parameter list.",
        "cost": 2
      },
      {
        "text": "Use = inside the parentheses.",
        "cost": 3
      },
      {
        "text": "function greet(name = \"guest\") { return \"Hello, \" + name; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines greet()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling greet(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines greet()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+greet\\s*\\(|const\\s+greet\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-05",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Boolean-returning function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Boolean-returning function Write isPositive(n) that returns true if n > 0, false otherwise.",
    "hints": [
      {
        "text": "The comparison itself is already a boolean.",
        "cost": 3
      },
      {
        "text": "You can return the comparison directly, no if needed.",
        "cost": 5
      },
      {
        "text": "function isPositive(n) { return n > 0; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines isPositive()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Boolean(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines isPositive()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+isPositive\\s*\\(|const\\s+isPositive\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-06",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Function using a loop inside",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Function using a loop inside Write sumUpTo(n) that returns the sum of all numbers from 1 to n using a loop inside the function.",
    "hints": [
      {
        "text": "Declare an accumulator inside the function.",
        "cost": 3
      },
      {
        "text": "Loop from 1 to n, adding each value.",
        "cost": 5
      },
      {
        "text": "function sumUpTo(n) { let sum = 0; for (let i = 1; i <= n; i++) sum += i; return sum; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines sumUpTo()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling using(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines sumUpTo()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+sumUpTo\\s*\\(|const\\s+sumUpTo\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-07",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Function calling another function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Function calling another function Write square(n) and then sumOfSquares(a, b) that calls square twice and adds the results.",
    "hints": [
      {
        "text": "Write square first, fully working on its own.",
        "cost": 3
      },
      {
        "text": "Inside sumOfSquares, call square(a) and square(b).",
        "cost": 5
      },
      {
        "text": "function square(n){return n*n;} function sumOfSquares(a,b){return square(a)+square(b);}",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines square()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling calling(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines square()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+square\\s*\\(|const\\s+square\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-08",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Three-parameter max",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Three-parameter max Write maxOfThree(a, b, c) that returns the largest of three numbers, without Math.max.",
    "hints": [
      {
        "text": "Compare two at a time.",
        "cost": 3
      },
      {
        "text": "First find the max of a and b, then compare that result to c.",
        "cost": 5
      },
      {
        "text": "function maxOfThree(a,b,c){ let m = a>b?a:b; return m>c?m:c; } (or with plain ifs).",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines maxOfThree()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines maxOfThree()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+maxOfThree\\s*\\(|const\\s+maxOfThree\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-09",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Validate input before computing",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Validate input before computing Write safeDivide(a, b) that returns the division result, but returns \"Cannot divide by zero\" if b is 0.",
    "hints": [
      {
        "text": "Check the risky condition before doing the operation.",
        "cost": 5
      },
      {
        "text": "Use an if at the very start of the function body.",
        "cost": 8
      },
      {
        "text": "function safeDivide(a,b){ if(b===0) return \"Cannot divide by zero\"; return a/b; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines safeDivide()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines safeDivide()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+safeDivide\\s*\\(|const\\s+safeDivide\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-10",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Refactor repeated logic",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Refactor repeated logic Given two separate blocks of code that each check if a number is between 1 and 100, refactor them into a single reusable function isInRange(n).",
    "hints": [
      {
        "text": "Identify exactly what varies between the two blocks (likely just the number itself).",
        "cost": 5
      },
      {
        "text": "Turn that varying part into a parameter.",
        "cost": 8
      },
      {
        "text": "function isInRange(n) { return n >= 1 && n <= 100; } then call it wherever the check was duplicated.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines isInRange()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling isInRange(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines isInRange()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+isInRange\\s*\\(|const\\s+isInRange\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-11",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Function returning a formatted string",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Function returning a formatted string Write formatPrice(name, price) that returns a string like \"Book: $15\" — combining a label and value neatly.",
    "hints": [
      {
        "text": "Use a template literal or string concatenation.",
        "cost": 5
      },
      {
        "text": "Include the $ symbol directly in the string.",
        "cost": 8
      },
      {
        "text": "function formatPrice(name, price) { return \\${name}: $${price}`; }`",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines formatPrice()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling returning(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines formatPrice()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+formatPrice\\s*\\(|const\\s+formatPrice\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-functions-basics-12",
    "day": 4,
    "lessonSlug": "functions-basics",
    "title": "Build a small function toolkit",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Write three functions that work together: isEven(n), isOdd(n) (using isEven internally, not repeating the logic), and describeParity(n) that returns \"even\" or \"odd\" by calling one of the first two.",
    "hints": [
      {
        "text": "isOdd should be the exact opposite of isEven — reuse it with !.",
        "cost": 8
      },
      {
        "text": "describeParity should call isEven(n) and choose its return string based on that.",
        "cost": 12
      },
      {
        "text": "function isEven(n){return n%2===0;} function isOdd(n){return !isEven(n);} function describeParity(n){return isEven(n)?\"even\":\"odd\";}",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling toolkit(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-01",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Convert to arrow",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Convert to arrow Convert function double(n) { return n * 2; } into an arrow function.",
    "hints": [
      {
        "text": "Replace function and the name with const name = .",
        "cost": 2
      },
      {
        "text": "Use => after the parameters.",
        "cost": 3
      },
      {
        "text": "const double = (n) => n * 2;",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines double() as arrow",
      "Uses => syntax"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling double(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines double() as arrow",
        "kind": "sourceIncludes",
        "pattern": "const\\s+double\\s*=\\s*(\\([^)]*\\)|[a-zA-Z_$][\\w$]*)\\s*=>",
        "flags": "i"
      },
      {
        "id": "fn-arrow",
        "label": "Uses => syntax",
        "kind": "sourceIncludes",
        "pattern": "=>",
        "flags": ""
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-02",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Implicit return",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Implicit return Write an arrow function isNegative(n) using implicit return (no curly braces).",
    "hints": [
      {
        "text": "No return keyword is needed for a single expression.",
        "cost": 2
      },
      {
        "text": "The expression itself is the comparison.",
        "cost": 3
      },
      {
        "text": "const isNegative = (n) => n < 0;",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines isNegative()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling isNegative(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines isNegative()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+isNegative\\s*\\(|const\\s+isNegative\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-03",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Block scope check",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Declare let x = 1; inside an if (true) { } block. Can you access x right after the block, outside of it?",
    "hints": [
      {
        "text": "Think about where let variables \"live\".",
        "cost": 2
      },
      {
        "text": "The block's curly braces define the boundary.",
        "cost": 3
      },
      {
        "text": "No — x only exists inside that block and causes an error if accessed outside.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Demonstrate block scope with a variable inside {}"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "block",
        "label": "Uses a block with let/const",
        "kind": "sourceIncludes",
        "pattern": "\\{\\s*let|\\{\\s*const",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-04",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Arrow with two parameters",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Arrow with two parameters Write an arrow function multiply(a, b) that returns their product.",
    "hints": [
      {
        "text": "Two parameters need parentheses around them.",
        "cost": 2
      },
      {
        "text": "Implicit return works here too.",
        "cost": 3
      },
      {
        "text": "const multiply = (a, b) => a * b;",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines multiply()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling multiply(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines multiply()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+multiply\\s*\\(|const\\s+multiply\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-05",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Multi-statement arrow function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Multi-statement arrow function Write an arrow function describeAge(age) that declares a local variable for category (\"minor\"/\"adult\") and returns a sentence using it.",
    "hints": [
      {
        "text": "You'll need curly braces since there's more than one statement.",
        "cost": 3
      },
      {
        "text": "Don't forget an explicit return this time.",
        "cost": 5
      },
      {
        "text": "const describeAge = (age) => { let cat = age>=18?\"adult\":\"minor\"; return \"You are a(n) \"+cat; };",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines describeAge()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Multi(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines describeAge()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+describeAge\\s*\\(|const\\s+describeAge\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-06",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Scope error prediction Predict",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Scope error prediction Predict what happens when this runs: function calc(){ let result = 10; return result; } console.log(result);",
    "hints": [
      {
        "text": "result is declared inside the function.",
        "cost": 3
      },
      {
        "text": "The last line tries to access it from outside.",
        "cost": 5
      },
      {
        "text": "It throws a ReferenceError: result is not defined.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines calc()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling calc(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines calc()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+calc\\s*\\(|const\\s+calc\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-07",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Loop variable scope",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write code to show console.log(i) after a for (let i = 0; i < 5; i++) {...} loop causes an error.",
    "hints": [
      {
        "text": "let inside a for loop's header is scoped to the loop itself.",
        "cost": 3
      },
      {
        "text": "The loop's block (and header) forms its own scope boundary.",
        "cost": 5
      },
      {
        "text": "i doesn't exist outside the loop when declared with let, so accessing it afterward throws an error.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-08",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Arrow function inside a function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write code that shows why console.log(i) after a for (let i = 0; i < 5; i++) {...} loop causes an error.",
    "hints": [
      {
        "text": "The outer function's return value is the arrow function itself, not a call to it.",
        "cost": 3
      },
      {
        "text": "You then need a second set of parentheses to actually call the returned function.",
        "cost": 5
      },
      {
        "text": "function makeGreeter(){ return () => \"Hi!\"; } console.log(makeGreeter()());",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines makeGreeter()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling inside(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines makeGreeter()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+makeGreeter\\s*\\(|const\\s+makeGreeter\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-09",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Rewrite a multi-line function as an arrow function",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Rewrite a multi-line function as an arrow function Convert this into an arrow function, keeping identical behavior: function classify(n) { if (n > 0) return \"positive\"; return \"non-positive\"; }",
    "hints": [
      {
        "text": "You'll need braces and an explicit return since there are two possible return paths.",
        "cost": 5
      },
      {
        "text": "The structure inside the braces can stay almost the same.",
        "cost": 8
      },
      {
        "text": "const classify = (n) => { if (n > 0) return \"positive\"; return \"non-positive\"; };",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines classify()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling as(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines classify()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+classify\\s*\\(|const\\s+classify\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-10",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Predict a scope chain",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given three nested blocks each declaring a variable with the same technique (let value = ...) at different levels, explain which value is used inside the innermost block if you don't redeclare it there.",
    "hints": [
      {
        "text": "Look outward from the innermost block if a name isn't found there.",
        "cost": 5
      },
      {
        "text": "JavaScript searches from the innermost scope outward until it finds the variable.",
        "cost": 8
      },
      {
        "text": "The innermost block will use the closest enclosing value it can find, not the outermost or the very first one automatically.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write nested scopes and log which value is used"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "nested",
        "label": "Uses nested blocks or functions",
        "kind": "sourceIncludes",
        "pattern": "\\{|function",
        "flags": "i"
      },
      {
        "id": "one",
        "label": "Logs a value",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-11",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Fix an accidental global",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given function setScore(){ score = 100; } setScore(); console.log(score); explain what's happening and why it's risky, then fix it.",
    "hints": [
      {
        "text": "score was never declared with let/const inside the function.",
        "cost": 5
      },
      {
        "text": "Assigning to an undeclared variable creates an accidental global variable (in non-strict mode), which is a bad practice.",
        "cost": 8
      },
      {
        "text": "Fix by declaring it properly, e.g. passing/returning it: function setScore(){ let score = 100; return score; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "function setScore(){ score = 100; } setScore(); console.log(score);\n",
    "visibleTests": [],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling setScore(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrow-functions-scope-12",
    "day": 4,
    "lessonSlug": "arrow-functions-scope",
    "title": "Build a scoped counter using functions only",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Build a scoped counter using functions only Without using classes, write a function makeCounter() that returns an arrow function; each time you call the returned function, it should increase and return an internal count, starting from 0 — relying on scope to \"remember\" the count between calls.",
    "hints": [
      {
        "text": "The count variable needs to live in the outer function's scope, not inside the arrow function itself.",
        "cost": 8
      },
      {
        "text": "Every call to the returned arrow function should both update and return that outer variable.",
        "cost": 12
      },
      {
        "text": "function makeCounter(){ let count = 0; return () => { count++; return count; }; } const counter = makeCounter(); console.log(counter()); console.log(counter());",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines makeCounter()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling makeCounter(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines makeCounter()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+makeCounter\\s*\\(|const\\s+makeCounter\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-01",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Get the length",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Get the length Print the length of the string \"JavaScript\".",
    "hints": [
      {
        "text": "Use the .length property.",
        "cost": 2
      },
      {
        "text": "No parentheses are needed for .length.",
        "cost": 3
      },
      {
        "text": "console.log(\"JavaScript\".length); // 10",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-02",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "First and last character",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "First and last character Given let word = \"Bootcamp\";, print its first and last characters.",
    "hints": [
      {
        "text": "Index 0 gives the first character.",
        "cost": 2
      },
      {
        "text": "The last index is length - 1.",
        "cost": 3
      },
      {
        "text": "console.log(word[0], word[word.length - 1]);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-03",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Template literal basics",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Template literal basics Using a template literal, print \"I am 20 years old\" from a variable age = 20.",
    "hints": [
      {
        "text": "Use backticks, not regular quotes.",
        "cost": 2
      },
      {
        "text": "Insert the variable using ${}.",
        "cost": 3
      },
      {
        "text": "console.log(`I am ${age} years old`);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"I am 20 years old\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "I am 20 years old"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"I am 20 years old\"",
        "kind": "consoleLinesExact",
        "lines": [
          "I am 20 years old"
        ]
      }
    ]
  },
  {
    "id": "ex-string-basics-04",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Loop through a short word",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Loop through a short word Print each character of \"cat\" on its own line using a loop.",
    "hints": [
      {
        "text": "Loop from 0 to text.length - 1.",
        "cost": 2
      },
      {
        "text": "Use text[i] inside the loop.",
        "cost": 3
      },
      {
        "text": "for (let i=0;i<\"cat\".length;i++) console.log(\"cat\"[i]);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-05",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Immutability check Predict the",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Immutability check Predict the output: let s = \"dog\"; s[0] = \"l\"; console.log(s);",
    "hints": [
      {
        "text": "Think about whether strings can be changed in place.",
        "cost": 3
      },
      {
        "text": "Assigning to an index of a string silently does nothing.",
        "cost": 5
      },
      {
        "text": "It still prints \"dog\", unchanged.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-06",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Build a sentence with multiple variables",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Using a template literal, combine name, age, and city variables into one readable sentence.",
    "hints": [
      {
        "text": "You can use ${} multiple times in one template literal.",
        "cost": 3
      },
      {
        "text": "Structure the sentence naturally, e.g. \"My name is X, I am Y, and I live in Z.\"",
        "cost": 5
      },
      {
        "text": "console.log(`My name is ${name}, I am ${age}, and I live in ${city}.`);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-string-basics-07",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Case-sensitive comparison Predict the",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "output of console.log(\"Apple\" === \"apple\"); and Write code to demonstrate.",
    "hints": [
      {
        "text": "String comparison checks every character exactly.",
        "cost": 3
      },
      {
        "text": "Uppercase and lowercase letters are different characters to JavaScript.",
        "cost": 5
      },
      {
        "text": "It prints false, because \"A\" and \"a\" are not the same character.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"false\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "false"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"false\"",
        "kind": "consoleLinesExact",
        "lines": [
          "false"
        ]
      }
    ]
  },
  {
    "id": "ex-string-basics-08",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Find the middle character",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find the middle character Given a string with an odd length, print its middle character using its length and index math.",
    "hints": [
      {
        "text": "The middle index relates to half of the length.",
        "cost": 3
      },
      {
        "text": "Use Math.floor(text.length / 2).",
        "cost": 5
      },
      {
        "text": "let text = \"level\"; console.log(text[Math.floor(text.length / 2)]); // \"v\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-09",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Build your own .length-like counter",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Without using .length, count the characters of a string by looping until text[i] becomes undefined.",
    "hints": [
      {
        "text": "Use a while loop with a counter starting at 0.",
        "cost": 5
      },
      {
        "text": "Keep looping while text[count] !== undefined.",
        "cost": 8
      },
      {
        "text": "let count = 0; while (text[count] !== undefined) count++; console.log(count);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-10",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Print every other character",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Print every other character Given a word, print only the characters at even indexes (0, 2, 4, ...).",
    "hints": [
      {
        "text": "Use a loop with a step of 2 instead of 1.",
        "cost": 5
      },
      {
        "text": "Modify the loop's update expression.",
        "cost": 8
      },
      {
        "text": "for (let i = 0; i < word.length; i += 2) console.log(word[i]);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-11",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Build a string manually in reverse using a loop",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Without using any built-in reverse trick, build the reverse of a string character by character using a for loop and concatenation.",
    "hints": [
      {
        "text": "Loop backward from the last index to 0.",
        "cost": 5
      },
      {
        "text": "Add each character to a growing result string.",
        "cost": 8
      },
      {
        "text": "let result=\"\"; for(let i=text.length-1;i>=0;i--){ result+=text[i]; } console.log(result);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-basics-12",
    "day": 5,
    "lessonSlug": "string-basics",
    "title": "Character frequency map (without objects yet)",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Character frequency map (without objects yet) Given a word, print each unique character it contains along with how many times it appears, using only loops, strings, and .includes() (no objects — you'll use objects for this next week, this is a manual first pass).",
    "hints": [
      {
        "text": "You'll need to track which characters you've already reported, perhaps in a separate \"seen\" string.",
        "cost": 8
      },
      {
        "text": "For each character not yet in \"seen\", count its occurrences with a nested loop, then add it to \"seen\".",
        "cost": 12
      },
      {
        "text": "Outer loop over each character; if !seen.includes(char), run an inner loop to count matches in the whole word, print the result, then seen += char.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-01",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Uppercase a word",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Uppercase a word Print \"javascript\" converted to uppercase.",
    "hints": [
      {
        "text": "Use a string method.",
        "cost": 2
      },
      {
        "text": "The method name describes exactly what it does.",
        "cost": 3
      },
      {
        "text": "console.log(\"javascript\".toUpperCase());",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output: \"javascript\""
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "javascript"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"javascript\"",
        "kind": "consoleLinesExact",
        "lines": [
          "javascript"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-02",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Check for a substring",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Check if \"hello world\" includes the word \"world\".",
    "hints": [
      {
        "text": "Use .includes().",
        "cost": 2
      },
      {
        "text": "Pass the substring as the argument.",
        "cost": 3
      },
      {
        "text": "console.log(\"hello world\".includes(\"world\")); // true",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "true"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"true\"",
        "kind": "consoleLinesExact",
        "lines": [
          "true"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-03",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Trim whitespace",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Trim whitespace Given \" hi \", print it trimmed, with quotes around it so you can see the exact result.",
    "hints": [
      {
        "text": "Use .trim().",
        "cost": 2
      },
      {
        "text": "Wrap the result with extra quote characters for clarity, or just print it plainly.",
        "cost": 3
      },
      {
        "text": "console.log(\" hi \".trim()); // \"hi\"",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-04",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Slice the first 3 characters",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Slice the first 3 characters Given \"JavaScript\", print only the first 3 characters using .slice().",
    "hints": [
      {
        "text": ".slice(start, end) — think about what end value gives you 3 characters.",
        "cost": 2
      },
      {
        "text": "Starting from 0.",
        "cost": 3
      },
      {
        "text": "console.log(\"JavaScript\".slice(0, 3)); // \"Jav\"",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-05",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Chain two methods",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Chain two methods Given \" HELLO \", print it trimmed AND lowercase, in a single chained expression.",
    "hints": [
      {
        "text": "You can call .trim() then immediately call another method on the result.",
        "cost": 3
      },
      {
        "text": "Order matters less here, but try .trim().toLowerCase().",
        "cost": 5
      },
      {
        "text": "console.log(\" HELLO \".trim().toLowerCase()); // \"hello\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-06",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Find and report a position",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find and report a position Given \"banana\", find and print the index of the first \"n\".",
    "hints": [
      {
        "text": "Use .indexOf().",
        "cost": 3
      },
      {
        "text": "Pass the character you're looking for.",
        "cost": 5
      },
      {
        "text": "console.log(\"banana\".indexOf(\"n\")); // 2",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-07",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Split a sentence into words",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Split a sentence into words Given \"core javascript is fun\", split it into an array of words and print the array.",
    "hints": [
      {
        "text": "Use .split() with a space as the separator.",
        "cost": 3
      },
      {
        "text": "The result is an array, printable directly.",
        "cost": 5
      },
      {
        "text": "console.log(\"core javascript is fun\".split(\" \"));",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-methods-08",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Extract a file extension",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given \"photo.png\", use .slice() and .indexOf() together to extract just \"png\".",
    "hints": [
      {
        "text": "Find the position of the \".\" first.",
        "cost": 3
      },
      {
        "text": "Slice starting just after that position.",
        "cost": 5
      },
      {
        "text": "let name=\"photo.png\"; let dot=name.indexOf(\".\"); console.log(name.slice(dot+1));",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "png"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"png\"",
        "kind": "consoleLinesExact",
        "lines": [
          "png"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-09",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Case-insensitive includes check",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given \"Hello World\", check if it includes \"WORLD\" regardless of case (a direct .includes(\"WORLD\") would fail).",
    "hints": [
      {
        "text": "Convert both sides to the same case before comparing.",
        "cost": 5
      },
      {
        "text": "Lowercase the main string and the search term.",
        "cost": 8
      },
      {
        "text": "console.log(\"Hello World\".toLowerCase().includes(\"world\".toLowerCase()));",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "true"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"true\"",
        "kind": "consoleLinesExact",
        "lines": [
          "true"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-10",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Count words in a sentence",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given a sentence, count how many words it has using .split() and .length (assume single spaces between words, no extra punctuation).",
    "hints": [
      {
        "text": "Split first, then check the resulting array's size.",
        "cost": 5
      },
      {
        "text": ".length on an array works the same way as on a string.",
        "cost": 8
      },
      {
        "text": "let sentence=\"core javascript rocks\"; console.log(sentence.split(\" \").length); // 3",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "3"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"3\"",
        "kind": "consoleLinesExact",
        "lines": [
          "3"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-11",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Capitalize the first letter",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given \"javascript\", produce \"Javascript\" (only the first letter capitalized) using .slice() and .toUpperCase().",
    "hints": [
      {
        "text": "You need to handle the first character separately from the rest.",
        "cost": 5
      },
      {
        "text": "Uppercase just the first character, then append the rest unchanged.",
        "cost": 8
      },
      {
        "text": "let word=\"javascript\"; console.log(word[0].toUpperCase() + word.slice(1));",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Javascript"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"Javascript\"",
        "kind": "consoleLinesExact",
        "lines": [
          "Javascript"
        ]
      }
    ]
  },
  {
    "id": "ex-string-methods-12",
    "day": 5,
    "lessonSlug": "string-methods",
    "title": "Clean and normalize messy input",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given \" HeLLo WoRLD!! \", write code that: trims it, lowercases it, and removes the exclamation marks, ending with a clean, normal-looking sentence (you may use .split() and .join() creatively, or repeated .replace()-like logic using only allowed methods — note: .replace() is fine to use here even though it's beyond the core list, OR do it manually with a loop rebuilding the string character by character, skipping \"!\" characters).",
    "hints": [
      {
        "text": "Start with .trim().toLowerCase() to handle the easy part first.",
        "cost": 8
      },
      {
        "text": "For removing \"!\" manually, loop through the string and only append characters that aren't \"!\".",
        "cost": 12
      },
      {
        "text": "let s = \" HeLLo WoRLD!! \".trim().toLowerCase(); let clean=\"\"; for(let i=0;i<s.length;i++){ if(s[i] !== \"!\") clean += s[i]; } console.log(clean);",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "hello world"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"hello world\"",
        "kind": "consoleLinesExact",
        "lines": [
          "hello world"
        ]
      }
    ]
  },
  {
    "id": "ex-string-challenges-01",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Count one vowel type",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Count how many times the letter \"a\" appears in \"banana\" (not all vowels, just \"a\").",
    "hints": [
      {
        "text": "Loop through and compare each character to \"a\".",
        "cost": 2
      },
      {
        "text": "Increase a counter on each match.",
        "cost": 3
      },
      {
        "text": "let count=0; for(let i=0;i<\"banana\".length;i++){ if(\"banana\"[i]===\"a\") count++; } console.log(count);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "3"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"3\"",
        "kind": "consoleLinesExact",
        "lines": [
          "3"
        ]
      }
    ]
  },
  {
    "id": "ex-string-challenges-02",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Reverse a short word",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Reverse the word \"cat\" using a loop (don't just type \"tac\").",
    "hints": [
      {
        "text": "Loop backward from the last index.",
        "cost": 2
      },
      {
        "text": "Build a new string by appending each character.",
        "cost": 3
      },
      {
        "text": "let r=\"\"; for(let i=2;i>=0;i--){ r+=\"cat\"[i]; } console.log(r);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "tac"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"tac\"",
        "kind": "consoleLinesExact",
        "lines": [
          "tac"
        ]
      }
    ]
  },
  {
    "id": "ex-string-challenges-03",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Check a simple palindrome",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Check if \"level\" is a palindrome using a reverse function you write.",
    "hints": [
      {
        "text": "Reverse the string first, then compare.",
        "cost": 2
      },
      {
        "text": "Use === for the comparison.",
        "cost": 3
      },
      {
        "text": "Reverse \"level\" and compare it to the original — they should match.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling you(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-04",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Count all vowels in a short word",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Count all vowels (a, e, i, o, u) in \"orange\".",
    "hints": [
      {
        "text": "Check each character against a string of vowels.",
        "cost": 2
      },
      {
        "text": "Use .includes() on the vowels string.",
        "cost": 3
      },
      {
        "text": "For each character, check \"aeiou\".includes(char.toLowerCase()).",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-05",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Case-insensitive palindrome",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Check if \"Level\" (capital L) is a palindrome, accounting for case.",
    "hints": [
      {
        "text": "Lowercase the string before checking.",
        "cost": 3
      },
      {
        "text": "Reverse the lowercase version, not the original.",
        "cost": 5
      },
      {
        "text": "function isPal(t){ let l=t.toLowerCase(); /* reverse l and compare */ }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-06",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Count consonants",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Count how many consonants (non-vowel letters) are in \"programming\".",
    "hints": [
      {
        "text": "A consonant is a letter that is NOT a vowel.",
        "cost": 3
      },
      {
        "text": "Use ! with your vowel check.",
        "cost": 5
      },
      {
        "text": "For each letter, if !\"aeiou\".includes(char.toLowerCase()), count it.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-07",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Find the longest word in a sentence",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given a sentence, split it into words and find the longest one using the max-value loop pattern.",
    "hints": [
      {
        "text": "Split the sentence into an array first.",
        "cost": 3
      },
      {
        "text": "Compare each word's .length to find the biggest.",
        "cost": 5
      },
      {
        "text": "Use the same \"start with first, replace if bigger\" pattern from array traversal, but on .length of each word.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-08",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Count a specific word's occurrences",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given \"the cat sat on the mat with the hat\", count how many times the word \"the\" appears (not the letter \"t\").",
    "hints": [
      {
        "text": "Split the sentence into words first.",
        "cost": 3
      },
      {
        "text": "Compare each whole word to \"the\", not each character.",
        "cost": 5
      },
      {
        "text": "Loop through the split array and use === on each word.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-09",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Palindrome ignoring spaces",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Check if \"race car\" is a palindrome once spaces are ignored (this should return true).",
    "hints": [
      {
        "text": "You need to remove spaces before checking.",
        "cost": 5
      },
      {
        "text": "Build a new string manually, skipping any space characters, then lowercase and reverse it.",
        "cost": 8
      },
      {
        "text": "Loop through, skip \" \" characters while building a cleaned string, then apply your normal palindrome check to that cleaned string.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-string-challenges-10",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Find all indexes of a letter",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Find all indexes of a letter Given \"mississippi\", find and print every index where the letter \"s\" appears (not just the first one).",
    "hints": [
      {
        "text": "Loop through every character, don't stop at the first match.",
        "cost": 5
      },
      {
        "text": "Push or log each matching index as you find it.",
        "cost": 8
      },
      {
        "text": "for(let i=0;i<word.length;i++){ if(word[i]===\"s\") console.log(i); }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-11",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Check if two words are anagrams",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given \"listen\" and \"silent\", determine if they're anagrams (contain exactly the same letters, possibly in a different order) — without sorting (sorting isn't in Core JS scope here), using counting instead.",
    "hints": [
      {
        "text": "First check if both words have the same length — a quick early exit.",
        "cost": 5
      },
      {
        "text": "For each letter in the first word, count its occurrences in both words and compare.",
        "cost": 8
      },
      {
        "text": "If lengths match, loop through each character of word 1, count its occurrences in word 1 and in word 2 using your countLetter function — they must be equal for every character.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-string-challenges-12",
    "day": 5,
    "lessonSlug": "string-challenges",
    "title": "Longest palindromic word in a sentence",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Longest palindromic word in a sentence Given a sentence, split it into words, and find the longest word that is ALSO a palindrome — if none exist, print a clear message saying so.",
    "hints": [
      {
        "text": "Combine three earlier ideas: .split(), your isPalindrome function, and the max-length search pattern.",
        "cost": 8
      },
      {
        "text": "Loop through the words, filtering to keep only palindromes first (mentally or with a temporary array), then find the longest among just those.",
        "cost": 12
      },
      {
        "text": "Track a let longest = null; variable; for each word, if isPalindrome(word) and (longest === null or word.length > longest.length), update longest; print longest or a \"no palindrome found\" message if it's still null.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-01",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Create and print an array",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Create and print an array Create an array with your 3 favorite foods and print it.",
    "hints": [
      {
        "text": "Use square brackets.",
        "cost": 2
      },
      {
        "text": "Separate items with commas.",
        "cost": 3
      },
      {
        "text": "let foods = [\"pizza\", \"sushi\", \"tacos\"]; console.log(foods);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-02",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Access by index",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Access by index Given let nums = [10, 20, 30];, print the second item.",
    "hints": [
      {
        "text": "Indexes start at 0.",
        "cost": 2
      },
      {
        "text": "The second item is at index 1.",
        "cost": 3
      },
      {
        "text": "console.log(nums[1]); // 20",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-03",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Push a new item",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Push a new item Given let arr = [1, 2];, add 3 to the end and print the result.",
    "hints": [
      {
        "text": "Use .push().",
        "cost": 2
      },
      {
        "text": "It modifies the array directly, no reassignment needed.",
        "cost": 3
      },
      {
        "text": "arr.push(3); console.log(arr); // [1, 2, 3]",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-04",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Pop the last item",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Pop the last item Given let arr = [5, 6, 7];, remove the last item and print both the removed value and the remaining array.",
    "hints": [
      {
        "text": "Use .pop(), which returns the removed value.",
        "cost": 2
      },
      {
        "text": "Store the returned value in a variable before printing.",
        "cost": 3
      },
      {
        "text": "let last = arr.pop(); console.log(last, arr);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-05",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Change an item by index",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Change an item by index Given let colors = [\"red\", \"green\", \"blue\"];, change \"green\" to \"yellow\" and print the array.",
    "hints": [
      {
        "text": "Access the item by its index, not its value.",
        "cost": 3
      },
      {
        "text": "Assign a new value directly to that index.",
        "cost": 5
      },
      {
        "text": "colors[1] = \"yellow\"; console.log(colors);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-06",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Access the last item generically",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Access the last item generically Without knowing the array's exact size in advance, print its last item using .length.",
    "hints": [
      {
        "text": "The last valid index is always length - 1.",
        "cost": 3
      },
      {
        "text": "This works no matter how many items the array has.",
        "cost": 5
      },
      {
        "text": "console.log(arr[arr.length - 1]);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-07",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "const array mutation",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Explain, with an example, why this code works even though arr is declared with const: const arr = [1, 2]; arr.push(3);",
    "hints": [
      {
        "text": "const protects the variable binding, not the array's contents.",
        "cost": 3
      },
      {
        "text": ".push() doesn't reassign arr to a new array — it mutates the existing one.",
        "cost": 5
      },
      {
        "text": "This only breaks if you try arr = [4, 5]; (reassignment), which const truly forbids.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-08",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Build an array with a loop",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Using a loop and .push(), build an array containing the squares of 1 through 5 ([1, 4, 9, 16, 25]).",
    "hints": [
      {
        "text": "Start with an empty array before the loop.",
        "cost": 3
      },
      {
        "text": "Push i * i on each pass.",
        "cost": 5
      },
      {
        "text": "let squares=[]; for(let i=1;i<=5;i++){ squares.push(i*i); } console.log(squares);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Console output matches the expected result"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "1,4,9,16,25"
      }
    ],
    "checks": [
      {
        "id": "out-exact",
        "label": "Console output: \"1,4,9,16,25\"",
        "kind": "consoleLinesExact",
        "lines": [
          "1,4,9,16,25"
        ]
      }
    ]
  },
  {
    "id": "ex-arrays-basics-09",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Swap two items in an array",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given let arr = [1, 2, 3, 4];, swap the values at index 0 and index 3, resulting in [4, 2, 3, 1].",
    "hints": [
      {
        "text": "You'll need a temporary variable, just like swapping regular variables.",
        "cost": 5
      },
      {
        "text": "Store one value before overwriting it.",
        "cost": 8
      },
      {
        "text": "let temp = arr[0]; arr[0] = arr[3]; arr[3] = temp; console.log(arr);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-10",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Remove an item by value (not index)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given let arr = [10, 20, 30, 40];, remove the value 30 (wherever it is) by rebuilding a new array that excludes it, without using .filter() or .splice().",
    "hints": [
      {
        "text": "Loop through and build a new array, skipping the target value.",
        "cost": 5
      },
      {
        "text": "Use .push() for everything except the matching value.",
        "cost": 8
      },
      {
        "text": "let result=[]; for(let i=0;i<arr.length;i++){ if(arr[i]!==30) result.push(arr[i]); } console.log(result);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-11",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Insert a value at a specific index manually",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given let arr = [1, 2, 4, 5];, insert 3 between 2 and 4 by building a new array manually (no .splice()).",
    "hints": [
      {
        "text": "Loop through and copy items, but insert the new value at the right point.",
        "cost": 5
      },
      {
        "text": "You'll need to track the position where insertion should happen.",
        "cost": 8
      },
      {
        "text": "let result=[]; for(let i=0;i<arr.length;i++){ if(i===2) result.push(3); result.push(arr[i]); } console.log(result);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-arrays-basics-12",
    "day": 6,
    "lessonSlug": "arrays-basics",
    "title": "Rotate an array manually",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given let arr = [1, 2, 3, 4, 5];, produce a \"rotated\" array where the first item moves to the end: [2, 3, 4, 5, 1] — without using any built-in shift/rotate methods.",
    "hints": [
      {
        "text": "Save the first item in a separate variable before building the rest.",
        "cost": 8
      },
      {
        "text": "Build a new array starting from index 1 through the end, then push the saved first item at the very end.",
        "cost": 12
      },
      {
        "text": "let first = arr[0]; let result=[]; for(let i=1;i<arr.length;i++){ result.push(arr[i]); } result.push(first); console.log(result);",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-01",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Print every item",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print every item Given let arr = [4, 8, 15];, print each item on its own line using a loop.",
    "hints": [
      {
        "text": "Loop from 0 to arr.length - 1.",
        "cost": 2
      },
      {
        "text": "Use arr[i] inside the loop.",
        "cost": 3
      },
      {
        "text": "for (let i=0;i<arr.length;i++) console.log(arr[i]);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-02",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Basic sum",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Compute the sum of [2, 4, 6, 8] using a loop.",
    "hints": [
      {
        "text": "Start an accumulator at 0.",
        "cost": 2
      },
      {
        "text": "Add each item during the loop.",
        "cost": 3
      },
      {
        "text": "let sum=0; for(let i=0;i<arr.length;i++) sum+=arr[i]; console.log(sum);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-03",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Basic average",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Compute the average of [10, 20, 30] using your sum logic divided by the array's length.",
    "hints": [
      {
        "text": "First compute the sum, then divide.",
        "cost": 2
      },
      {
        "text": "Divide by .length, not a hardcoded number.",
        "cost": 3
      },
      {
        "text": "console.log(sum / arr.length); (after computing sum with a loop)",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-04",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Basic max",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Find the maximum value in [3, 9, 1, 7] using a loop.",
    "hints": [
      {
        "text": "Start max as the first item.",
        "cost": 2
      },
      {
        "text": "Compare and update inside the loop.",
        "cost": 3
      },
      {
        "text": "let max=arr[0]; for(let i=1;i<arr.length;i++){ if(arr[i]>max) max=arr[i]; } console.log(max);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-05",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Basic min",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find the minimum value in [3, 9, 1, 7] using the same pattern as max, but flipped.",
    "hints": [
      {
        "text": "Start min as the first item too.",
        "cost": 3
      },
      {
        "text": "Flip the comparison operator.",
        "cost": 5
      },
      {
        "text": "let min=arr[0]; for(let i=1;i<arr.length;i++){ if(arr[i]<min) min=arr[i]; } console.log(min);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-array-traversal-06",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Count positive numbers",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given [-3, 5, -1, 8, 0], count how many values are strictly positive.",
    "hints": [
      {
        "text": "Use a counter and an if inside the loop.",
        "cost": 3
      },
      {
        "text": "\"Positive\" means strictly greater than 0, so 0 doesn't count.",
        "cost": 5
      },
      {
        "text": "let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]>0) count++; } console.log(count);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-07",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Range of an array",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Range of an array Write a function range(arr) that returns the difference between the max and the min of the array.",
    "hints": [
      {
        "text": "You'll need both a max and min calculation.",
        "cost": 3
      },
      {
        "text": "You can reuse maxArray and minArray functions if you already wrote them.",
        "cost": 5
      },
      {
        "text": "function range(arr){ return maxArray(arr) - minArray(arr); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines range()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling range(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines range()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+range\\s*\\(|const\\s+range\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-08",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Average excluding one value",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Compute the average of an array while excluding the maximum value.",
    "hints": [
      {
        "text": "Find the max first, then sum everything except it.",
        "cost": 3
      },
      {
        "text": "Skip the max value with an if inside your sum loop — but be careful if the max appears more than once.",
        "cost": 5
      },
      {
        "text": "For simplicity, assume the max appears only once: sum all values except the first occurrence equal to max, then divide by length - 1.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-09",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Weighted-feel average (manual)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given an array of numbers, compute the average but round it to 2 decimal places without using .toFixed() beyond basic math (you may use .toFixed(), it's a simple built-in, or use Math.round(value * 100) / 100).",
    "hints": [
      {
        "text": "Compute the plain average first.",
        "cost": 5
      },
      {
        "text": "Multiply by 100, round, then divide by 100 to get 2 decimals.",
        "cost": 8
      },
      {
        "text": "let avg = sum/arr.length; let rounded = Math.round(avg*100)/100; console.log(rounded);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-10",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Find the index of the maximum (not just the value)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given [4, 9, 2, 9, 1], find the index of the FIRST occurrence of the maximum value.",
    "hints": [
      {
        "text": "Track both the max value AND its index as you loop.",
        "cost": 5
      },
      {
        "text": "Update both together whenever you find something bigger — never update on a tie.",
        "cost": 8
      },
      {
        "text": "let max=arr[0], maxIndex=0; for(let i=1;i<arr.length;i++){ if(arr[i]>max){ max=arr[i]; maxIndex=i; } } console.log(maxIndex);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-array-traversal-11",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Sum only even-indexed items",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given an array, sum only the values at even indexes (0, 2, 4, ...), not even-valued items.",
    "hints": [
      {
        "text": "This is about the index, not the value.",
        "cost": 5
      },
      {
        "text": "Use a loop step of 2, or check i % 2 === 0.",
        "cost": 8
      },
      {
        "text": "let sum=0; for(let i=0;i<arr.length;i+=2){ sum+=arr[i]; } console.log(sum);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-traversal-12",
    "day": 6,
    "lessonSlug": "array-traversal",
    "title": "Compute sum, average, min, and max in a single pass",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Compute sum, average, min, and max in a single pass Write one function stats(arr) that returns an object-like summary (you can just print four labeled values for now, since objects come next week) using only ONE loop through the array, not four separate loops.",
    "hints": [
      {
        "text": "Initialize all four accumulators/candidates before the loop starts.",
        "cost": 8
      },
      {
        "text": "Update sum, max, and min all inside the same loop body, on the same pass.",
        "cost": 12
      },
      {
        "text": "let sum=arr[0], max=arr[0], min=arr[0]; for(let i=1;i<arr.length;i++){ sum+=arr[i]; if(arr[i]>max) max=arr[i]; if(arr[i]<min) min=arr[i]; } sum+=0; /* adjust sum init properly */ console.log(\"sum\",sum,\"avg\",sum/arr.length,\"max\",max,\"min\",min); (Be careful to initialize sum correctly — start at 0 and loop from index 0, while max/min start at arr[0] and loop from index 1.)",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines stats()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "Sum: 10\nDifference: 4\nProduct: 21"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines stats()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+stats\\s*\\(|const\\s+stats\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-01",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Find an index",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given [5, 8, 2, 9], find the index of the value 2 using a loop.",
    "hints": [
      {
        "text": "Compare each item to the target.",
        "cost": 2
      },
      {
        "text": "Return as soon as you find a match.",
        "cost": 3
      },
      {
        "text": "function findIndex(arr,t){ for(let i=0;i<arr.length;i++){ if(arr[i]===t) return i; } return -1; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-02",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Count even numbers",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given [1, 2, 3, 4, 5, 6], count how many are even.",
    "hints": [
      {
        "text": "Use % to check evenness.",
        "cost": 2
      },
      {
        "text": "Increment a counter on each match.",
        "cost": 3
      },
      {
        "text": "let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) count++; } console.log(count);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-03",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Reverse an array",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Reverse [1, 2, 3] manually using a backward loop and .push().",
    "hints": [
      {
        "text": "Start a new empty array.",
        "cost": 2
      },
      {
        "text": "Loop from the last index down to 0, pushing each item.",
        "cost": 3
      },
      {
        "text": "let r=[]; for(let i=arr.length-1;i>=0;i--) r.push(arr[i]); console.log(r);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-04",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Filter values above a limit",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given [4, 15, 8, 23, 1], build a new array of only values greater than 10.",
    "hints": [
      {
        "text": "Loop through and check the condition.",
        "cost": 2
      },
      {
        "text": "Push matches into a new array.",
        "cost": 3
      },
      {
        "text": "let r=[]; for(let i=0;i<arr.length;i++){ if(arr[i]>10) r.push(arr[i]); } console.log(r);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-05",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Count occurrences of a specific value",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given [1, 2, 2, 3, 2, 4], count how many times 2 appears.",
    "hints": [
      {
        "text": "Similar to counting even numbers, but comparing to a fixed value.",
        "cost": 3
      },
      {
        "text": "Use === inside your loop's condition.",
        "cost": 5
      },
      {
        "text": "let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]===2) count++; } console.log(count);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-06",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Check if a value exists (boolean, not index)",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Check if a value exists (boolean, not index) Write contains(arr, value) that returns true/false instead of an index.",
    "hints": [
      {
        "text": "You can build this on top of your findIndex logic.",
        "cost": 3
      },
      {
        "text": "Compare the result of findIndex to -1.",
        "cost": 5
      },
      {
        "text": "function contains(arr,v){ return findIndex(arr,v) !== -1; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines contains()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines contains()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+contains\\s*\\(|const\\s+contains\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-07",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Find all indexes of a value",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find all indexes of a value Given [3, 7, 3, 9, 3], find and print every index where 3 appears (not just the first).",
    "hints": [
      {
        "text": "Don't return on the first match — collect all matches instead.",
        "cost": 3
      },
      {
        "text": "Push matching indexes into a results array.",
        "cost": 5
      },
      {
        "text": "let result=[]; for(let i=0;i<arr.length;i++){ if(arr[i]===3) result.push(i); } console.log(result);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-08",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Remove duplicates manually",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given [1, 2, 2, 3, 1, 4], build a new array with duplicates removed, keeping only the first occurrence of each value (no Set).",
    "hints": [
      {
        "text": "For each item, check if it's already in your result array before adding it.",
        "cost": 3
      },
      {
        "text": "You'll need a helper check like your own contains function.",
        "cost": 5
      },
      {
        "text": "let result=[]; for(let i=0;i<arr.length;i++){ if(!contains(result, arr[i])) result.push(arr[i]); } console.log(result);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-09",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Find the second largest value",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given [4, 9, 2, 9, 7], find the second largest DISTINCT value (so if the max repeats, skip the duplicate).",
    "hints": [
      {
        "text": "Find the max first, then look for the largest value that is strictly smaller than the max.",
        "cost": 5
      },
      {
        "text": "You'll essentially run the max-finding pattern twice, with an added exclusion condition the second time.",
        "cost": 8
      },
      {
        "text": "First pass finds max. Second pass: let second = -Infinity; for(...){ if(arr[i] < max && arr[i] > second) second = arr[i]; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-array-challenges-10",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Merge two arrays without duplicates",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given [1, 2, 3] and [3, 4, 5], build a single array containing all unique values from both, in order encountered.",
    "hints": [
      {
        "text": "Combine the arrays conceptually by looping through both, one after another.",
        "cost": 5
      },
      {
        "text": "Use your duplicate-check logic (contains) before adding each value.",
        "cost": 8
      },
      {
        "text": "Loop through array 1 pushing everything (they're all unique to start), then loop through array 2, pushing only values not already in the result.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-11",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Group numbers by even/odd (two arrays)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given [1, 2, 3, 4, 5, 6], build two separate arrays: one containing only the even numbers, one containing only the odd numbers.",
    "hints": [
      {
        "text": "Start two empty arrays before the loop.",
        "cost": 5
      },
      {
        "text": "Inside the loop, decide which array to push into based on % 2.",
        "cost": 8
      },
      {
        "text": "let evens=[], odds=[]; for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) evens.push(arr[i]); else odds.push(arr[i]); }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-challenges-12",
    "day": 6,
    "lessonSlug": "array-challenges",
    "title": "Find the longest run of consecutive equal values",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given [1, 1, 2, 2, 2, 3, 1, 1, 1, 1], find the length of the longest run of the same value repeated consecutively (in this case, four 1's at the end, so the answer is 4).",
    "hints": [
      {
        "text": "Track a \"current run length\" and a \"longest run so far\" as you loop.",
        "cost": 8
      },
      {
        "text": "Compare each item to the previous one; if equal, extend the current run; if not, reset it to 1.",
        "cost": 12
      },
      {
        "text": "let longest=1, current=1; for(let i=1;i<arr.length;i++){ if(arr[i]===arr[i-1]) current++; else current=1; if(current>longest) longest=current; } console.log(longest);",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-objects-basics-01",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Create and access",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Create and access Create an object person with name and age, then print the name.",
    "hints": [
      {
        "text": "Use curly braces and key: value pairs.",
        "cost": 2
      },
      {
        "text": "Access with dot notation.",
        "cost": 3
      },
      {
        "text": "let person = {name:\"Sara\", age:20}; console.log(person.name);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-02",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Update a property",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Update a property Given let car = {brand:\"Toyota\"};, change brand to \"Honda\" and print the object.",
    "hints": [
      {
        "text": "Assign directly to the existing key.",
        "cost": 2
      },
      {
        "text": "No need to recreate the whole object.",
        "cost": 3
      },
      {
        "text": "car.brand = \"Honda\"; console.log(car);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-03",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Add a new property",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given let book = {title:\"JS Basics\"};, add a price property of 20.",
    "hints": [
      {
        "text": "You can add a property that doesn't exist yet the same way you'd update one.",
        "cost": 2
      },
      {
        "text": "Use dot notation with the new key name.",
        "cost": 3
      },
      {
        "text": "book.price = 20; console.log(book);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-objects-basics-04",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Bracket notation basics",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Bracket notation basics Given let key = \"age\"; let user = {age: 25};, print user's age using bracket notation and the key variable.",
    "hints": [
      {
        "text": "You can't use dot notation with a variable key.",
        "cost": 2
      },
      {
        "text": "Use square brackets with key inside (no quotes, since it's a variable).",
        "cost": 3
      },
      {
        "text": "console.log(user[key]); // 25",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-05",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Check property existence",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given let item = {name:\"Pen\"};, check if it has a price property using the in operator.",
    "hints": [
      {
        "text": "The property name goes in quotes on the left of in.",
        "cost": 3
      },
      {
        "text": "The object goes on the right.",
        "cost": 5
      },
      {
        "text": "console.log(\"price\" in item); // false",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-objects-basics-06",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Delete a property",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Delete a property Given let user = {name:\"Sara\", temp:\"remove me\"};, delete the temp property and print the result.",
    "hints": [
      {
        "text": "Use the delete keyword.",
        "cost": 3
      },
      {
        "text": "It goes right before the property access.",
        "cost": 5
      },
      {
        "text": "delete user.temp; console.log(user);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-07",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Nested access",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Nested access Given let car = {brand:\"Toyota\", specs:{year:2022, color:\"blue\"}};, print just the color.",
    "hints": [
      {
        "text": "You need two levels of dot notation.",
        "cost": 3
      },
      {
        "text": "Go through specs first.",
        "cost": 5
      },
      {
        "text": "console.log(car.specs.color); // \"blue\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-08",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Build an object from separate variables",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given let name=\"Omar\", age=22;, build an object using these variables as the values for name and age keys.",
    "hints": [
      {
        "text": "You can reuse variable names as key names directly.",
        "cost": 3
      },
      {
        "text": "{name: name, age: age} works, though there's a shorthand.",
        "cost": 5
      },
      {
        "text": "let person = {name, age}; console.log(person); (shorthand works when key and variable names match)",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-09",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Dynamic key access with a loop",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Dynamic key access with a loop Given let scores = {math:90, art:70, sport:85}; and an array of subject names, print each score using bracket notation inside a loop.",
    "hints": [
      {
        "text": "Loop over the array of subject names, not the object directly.",
        "cost": 5
      },
      {
        "text": "Use bracket notation with the loop variable as the key.",
        "cost": 8
      },
      {
        "text": "let subjects=[\"math\",\"art\",\"sport\"]; for(let i=0;i<subjects.length;i++){ console.log(subjects[i], scores[subjects[i]]); }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-10",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Compare two objects' properties",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given let a={x:1,y:2}; let b={x:1,y:3};, write code that checks if their x properties are equal AND their y properties are equal, printing true/false for the whole comparison.",
    "hints": [
      {
        "text": "Compare each shared property individually.",
        "cost": 5
      },
      {
        "text": "Combine both comparisons with &&.",
        "cost": 8
      },
      {
        "text": "console.log(a.x === b.x && a.y === b.y); // false",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-objects-basics-11",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Update a nested property conditionally",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given let product = {name:\"Shoe\", stock:{quantity:5}};, write code that decreases stock.quantity by 1, but only if it's greater than 0.",
    "hints": [
      {
        "text": "Check the nested property inside an if.",
        "cost": 5
      },
      {
        "text": "Update it the same way you'd update any nested value.",
        "cost": 8
      },
      {
        "text": "if (product.stock.quantity > 0) { product.stock.quantity -= 1; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-objects-basics-12",
    "day": 7,
    "lessonSlug": "objects-basics",
    "title": "Build and validate a small profile object",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Build and validate a small profile object Create an object representing a user profile with name, age, email (fake is fine), and isActive. Then write a function isValidProfile(profile) that returns true only if name is a non-empty string, age is a number greater than 0, and isActive is a boolean — checking each with typeof and appropriate comparisons.",
    "hints": [
      {
        "text": "Check each field's type separately using typeof, combined with &&.",
        "cost": 8
      },
      {
        "text": "For \"non-empty string\", also check .length > 0 in addition to typeof === \"string\".",
        "cost": 12
      },
      {
        "text": "function isValidProfile(p){ return typeof p.name===\"string\" && p.name.length>0 && typeof p.age===\"number\" && p.age>0 && typeof p.isActive===\"boolean\"; }",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines isValidProfile()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling isValidProfile(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines isValidProfile()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+isValidProfile\\s*\\(|const\\s+isValidProfile\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-01",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Access a field in the first record",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Access a field in the first record Given an array of 2 student objects, print the name of the first one.",
    "hints": [
      {
        "text": "Access by index first, then by property.",
        "cost": 2
      },
      {
        "text": "students[0] gives the object; add .name after it.",
        "cost": 3
      },
      {
        "text": "console.log(students[0].name);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-02",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Loop and print all names",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Loop and print all names Given an array of student objects, print every student's name using a loop.",
    "hints": [
      {
        "text": "Loop through the array by index.",
        "cost": 2
      },
      {
        "text": "Access .name on each item inside the loop.",
        "cost": 3
      },
      {
        "text": "for(let i=0;i<students.length;i++){ console.log(students[i].name); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-03",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Print two fields per record",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print two fields per record Given an array of product objects with name and price, print both fields for every product, on one line each.",
    "hints": [
      {
        "text": "Use console.log with two arguments per line.",
        "cost": 2
      },
      {
        "text": "Access both properties inside the same loop iteration.",
        "cost": 3
      },
      {
        "text": "for(let i=0;i<products.length;i++){ console.log(products[i].name, products[i].price); }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-04",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Count how many records exist",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Count how many records exist Print how many items are in an array of objects, without hardcoding the number.",
    "hints": [
      {
        "text": "Use .length on the array itself, not on any object inside it.",
        "cost": 2
      },
      {
        "text": "This works the same as with any other array.",
        "cost": 3
      },
      {
        "text": "console.log(students.length);",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-05",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Find a record by exact match",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find a record by exact match Write findById(list, id) that returns the whole matching object, or null if not found.",
    "hints": [
      {
        "text": "Loop and compare list[i].id to the target.",
        "cost": 3
      },
      {
        "text": "Return the object itself, not just true.",
        "cost": 5
      },
      {
        "text": "function findById(list,id){ for(let i=0;i<list.length;i++){ if(list[i].id===id) return list[i]; } return null; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines findById()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines findById()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+findById\\s*\\(|const\\s+findById\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-06",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Sum a numeric field across records",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given an array of product objects with price, compute the total price of all products.",
    "hints": [
      {
        "text": "This is the same sum pattern as arrays of numbers, just reading a property.",
        "cost": 3
      },
      {
        "text": "Add list[i].price each time, not list[i] itself.",
        "cost": 5
      },
      {
        "text": "let total=0; for(let i=0;i<list.length;i++){ total+=list[i].price; } console.log(total);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-07",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Filter records by a boolean field",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given products with an inStock boolean, build a new array with only the ones currently in stock.",
    "hints": [
      {
        "text": "Use the manual-filter pattern from arrays, reading a property this time.",
        "cost": 3
      },
      {
        "text": "The condition is simply list[i].inStock (already a boolean, no need for === true).",
        "cost": 5
      },
      {
        "text": "let result=[]; for(let i=0;i<list.length;i++){ if(list[i].inStock) result.push(list[i]); } console.log(result);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-08",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Find the youngest student",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Find the youngest student Given an array of student objects with age, find and print the object of the youngest student.",
    "hints": [
      {
        "text": "This is the min pattern, but comparing .age instead of raw values.",
        "cost": 3
      },
      {
        "text": "Start with the first student as your candidate.",
        "cost": 5
      },
      {
        "text": "let youngest=list[0]; for(let i=1;i<list.length;i++){ if(list[i].age<youngest.age) youngest=list[i]; } console.log(youngest);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-09",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Update a specific record's field",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given an array of products, find the one named \"Pen\" and increase its quantity by 10, leaving others unchanged.",
    "hints": [
      {
        "text": "Find the record first (or update it directly while looping).",
        "cost": 5
      },
      {
        "text": "Once found, modify its property directly — no need to rebuild the whole array.",
        "cost": 8
      },
      {
        "text": "for(let i=0;i<products.length;i++){ if(products[i].name===\"Pen\"){ products[i].quantity += 10; } }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-10",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Count records matching a condition",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given an array of student objects, count how many students have an age of 20 or older.",
    "hints": [
      {
        "text": "Same counting pattern as before, but the condition checks a property.",
        "cost": 5
      },
      {
        "text": "list[i].age >= 20 is your condition.",
        "cost": 8
      },
      {
        "text": "let count=0; for(let i=0;i<list.length;i++){ if(list[i].age>=20) count++; } console.log(count);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-11",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Find the record with the highest value AND its index",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given an array of product objects with price, find both the most expensive product's object and its index in the array.",
    "hints": [
      {
        "text": "Track both the best object and its index as you loop, just like the \"index of max\" array exercise.",
        "cost": 5
      },
      {
        "text": "Update both together whenever a new max is found.",
        "cost": 8
      },
      {
        "text": "let best=products[0], bestIndex=0; for(let i=1;i<products.length;i++){ if(products[i].price>best.price){ best=products[i]; bestIndex=i; } } console.log(best, bestIndex);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-array-of-objects-12",
    "day": 7,
    "lessonSlug": "array-of-objects",
    "title": "Build a mini leaderboard",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given an array of player objects with name and score, write a function that returns a NEW array of just the names, ordered from highest to lowest score, without using .sort() (use your own simple approach — repeatedly finding the current max and removing it conceptually, or building a sorted copy manually with nested loops similar to selection sort, but comparing .score).",
    "hints": [
      {
        "text": "Think of this as selection sort, but the \"value\" you're comparing is .score, and what you actually collect at the end is .name.",
        "cost": 8
      },
      {
        "text": "Make a copy of the array first (so you don't damage the original), then repeatedly find the remaining max-score player, record their name, and mark them as \"used\" somehow (e.g., set their score to -Infinity after picking them, or track used indexes).",
        "cost": 12
      },
      {
        "text": "let copy=[...players]; let leaderboard=[]; for(let i=0;i<copy.length;i++){ let maxIndex=0; for(let j=1;j<copy.length;j++){ if(copy[j].score>copy[maxIndex].score) maxIndex=j; } leaderboard.push(copy[maxIndex].name); copy[maxIndex].score=-Infinity; } console.log(leaderboard);",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling that(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-01",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Find a value's index",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Find the index of 15 in [4, 8, 15, 16, 23] using linear search.",
    "hints": [
      {
        "text": "Loop through comparing each item.",
        "cost": 2
      },
      {
        "text": "Return the index as soon as you find a match.",
        "cost": 3
      },
      {
        "text": "function linearSearch(arr,t){ for(let i=0;i<arr.length;i++){ if(arr[i]===t) return i; } return -1; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-02",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search for a missing",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "value Search for 99 in [1, 2, 3] and confirm your function correctly returns -1.",
    "hints": [
      {
        "text": "The loop should complete without ever matching.",
        "cost": 2
      },
      {
        "text": "Make sure -1 is returned AFTER the loop, not inside it.",
        "cost": 3
      },
      {
        "text": "Running linearSearch([1,2,3], 99) should print -1.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling correctly(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-03",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search on unsorted data",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Confirm linear search works correctly on [23, 4, 16, 8] by finding the index of 16.",
    "hints": [
      {
        "text": "Order doesn't matter for linear search.",
        "cost": 2
      },
      {
        "text": "It checks every item regardless of position.",
        "cost": 3
      },
      {
        "text": "linearSearch([23,4,16,8], 16) should return 2.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-04",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search a string array",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Adapt linear search to find the index of \"banana\" in [\"apple\", \"banana\", \"cherry\"].",
    "hints": [
      {
        "text": "The comparison logic (===) works the same for strings.",
        "cost": 2
      },
      {
        "text": "No changes needed to the function itself.",
        "cost": 3
      },
      {
        "text": "linearSearch([\"apple\",\"banana\",\"cherry\"], \"banana\") returns 1.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-05",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search with a boolean result",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Search with a boolean result Write existsInArray(arr, target) that returns true/false instead of an index.",
    "hints": [
      {
        "text": "Build this on top of your existing search function.",
        "cost": 3
      },
      {
        "text": "Compare its result to -1.",
        "cost": 5
      },
      {
        "text": "function existsInArray(arr,t){ return linearSearch(arr,t) !== -1; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines existsInArray()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines existsInArray()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+existsInArray\\s*\\(|const\\s+existsInArray\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-06",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Count matches with linear search logic",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Modify linear search's idea to count ALL occurrences of a target instead of stopping at the first.",
    "hints": [
      {
        "text": "Don't return immediately on a match.",
        "cost": 3
      },
      {
        "text": "Use a counter instead, incremented on each match.",
        "cost": 5
      },
      {
        "text": "function countOccurrences(arr,t){ let c=0; for(let i=0;i<arr.length;i++){ if(arr[i]===t) c++; } return c; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-07",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Binary search trace",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given the sorted array [2, 4, 8, 15, 16, 23], trace binarySearch looking for 8 step by step: what is mid on each iteration?",
    "hints": [
      {
        "text": "Start with low=0, high=5.",
        "cost": 3
      },
      {
        "text": "mid = Math.floor((low+high)/2) each time.",
        "cost": 5
      },
      {
        "text": "First mid is index 2 (Math.floor((0+5)/2)), which is 8 — found immediately in this case.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-08",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Why binary search fails here",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Explain, using a concrete unsorted example, why running binarySearch on unsorted data can give a wrong (or missed) result.",
    "hints": [
      {
        "text": "Binary search eliminates half the array based on a comparison to the middle.",
        "cost": 3
      },
      {
        "text": "If the array isn't sorted, the eliminated half might actually contain the target.",
        "cost": 5
      },
      {
        "text": "Example: binarySearch([23,4,16,8], 8) may incorrectly discard the half containing 8 because the ordering assumption is broken.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-09",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search for the first even number",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Using the linear search pattern, find the index of the FIRST even number in [1, 3, 5, 8, 9, 10] (not searching for a specific value, but a condition).",
    "hints": [
      {
        "text": "Change the comparison from === to a condition check.",
        "cost": 5
      },
      {
        "text": "arr[i] % 2 === 0 is your new \"match\" condition.",
        "cost": 8
      },
      {
        "text": "function findFirstEven(arr){ for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) return i; } return -1; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-10",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Search an array of objects by a property",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Adapt linear search to find the index of the student object with name === \"Omar\" in an array of student objects.",
    "hints": [
      {
        "text": "Compare a property of each item, not the item itself.",
        "cost": 5
      },
      {
        "text": "arr[i].name === target is your condition.",
        "cost": 8
      },
      {
        "text": "function findIndexByName(list,name){ for(let i=0;i<list.length;i++){ if(list[i].name===name) return i; } return -1; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-11",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Manual binary search implementation from scratch",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Manual binary search implementation from scratch Without looking at any example, implement binarySearch(sortedArr, target) yourself, including the low, high, mid logic.",
    "hints": [
      {
        "text": "You need a loop that keeps narrowing low and high until they cross.",
        "cost": 5
      },
      {
        "text": "On each iteration, compare sortedArr[mid] to the target to decide which half to discard.",
        "cost": 8
      },
      {
        "text": "The loop condition is while (low <= high), and you adjust low = mid + 1 or high = mid - 1 depending on the comparison.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines binarySearch()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines binarySearch()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+binarySearch\\s*\\(|const\\s+binarySearch\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-linear-search-12",
    "day": 8,
    "lessonSlug": "linear-search",
    "title": "Compare search cost between linear and binary",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "For a sorted array of 16 elements, manually count (by tracing) how many comparisons linear search would need in the worst case, versus how many binary search would need in the worst case, and explain the pattern you notice.",
    "hints": [
      {
        "text": "Linear search's worst case checks every single element once.",
        "cost": 8
      },
      {
        "text": "Binary search's worst case is related to how many times you can divide 16 by 2 before reaching 1.",
        "cost": 12
      },
      {
        "text": "Linear search: up to 16 comparisons. Binary search: about 4 comparisons (since 16 → 8 → 4 → 2 → 1, roughly log2(16) = 4) — the pattern is that binary search's cost grows much more slowly as the array size increases.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-01",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Trace one bubble sort pass",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given [3, 1, 2], manually trace just the FIRST full pass of bubble sort and write the resulting array.",
    "hints": [
      {
        "text": "Compare index 0 and 1 first, then 1 and 2.",
        "cost": 2
      },
      {
        "text": "Swap whenever the left value is bigger than the right.",
        "cost": 3
      },
      {
        "text": "After comparing (3,1)→swap→[1,3,2], then (3,2)→swap→[1,2,3]. Result after pass 1: [1,2,3].",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-02",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Identify a swap In [5, 2], should bubble sort swap these two values?",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Why or why not?",
    "hints": [
      {
        "text": "Compare the two values directly.",
        "cost": 2
      },
      {
        "text": "Bubble sort swaps when the left is greater than the right.",
        "cost": 3
      },
      {
        "text": "Yes, since 5 > 2, they should be swapped to [2, 5].",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-03",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Run bubbleSort on a tiny array",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Run bubbleSort on a tiny array Using the bubbleSort function, sort [4, 2] and print the result.",
    "hints": [
      {
        "text": "Call the function with the array as an argument.",
        "cost": 2
      },
      {
        "text": "Print the returned value.",
        "cost": 3
      },
      {
        "text": "console.log(bubbleSort([4, 2])); // [2, 4]",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-04",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Run selectionSort on a tiny array",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Run selectionSort on a tiny array Using selectionSort, sort [9, 3, 6] and print the result.",
    "hints": [
      {
        "text": "Same calling pattern as bubbleSort.",
        "cost": 2
      },
      {
        "text": "Print the function's return value.",
        "cost": 3
      },
      {
        "text": "console.log(selectionSort([9, 3, 6])); // [3, 6, 9]",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-05",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Trace selection sort's first pass",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given [6, 2, 9, 1], trace the first pass of selection sort: what is minIndex found, and what does the array look like after the swap?",
    "hints": [
      {
        "text": "Scan the whole array for the smallest value first.",
        "cost": 3
      },
      {
        "text": "Swap that smallest value into position 0.",
        "cost": 5
      },
      {
        "text": "The minimum is 1 at index 3; after swapping with index 0: [1, 2, 9, 6].",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-06",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Sort strings alphabetically (adapt the logic)",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Adapt bubbleSort to sort an array of strings alphabetically (hint: > and < also work on strings in JavaScript).",
    "hints": [
      {
        "text": "The comparison operators work the same way, just applied to strings.",
        "cost": 3
      },
      {
        "text": "No structural changes needed to the algorithm itself.",
        "cost": 5
      },
      {
        "text": "bubbleSort([\"banana\",\"apple\",\"cherry\"]) should give [\"apple\",\"banana\",\"cherry\"].",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-07",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Count the number of swaps",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Count the number of swaps Modify bubbleSort to also count and print how many swaps it performed in total while sorting [5, 1, 4, 2, 8].",
    "hints": [
      {
        "text": "Add a counter variable before the loops.",
        "cost": 3
      },
      {
        "text": "Increment it every time an actual swap happens.",
        "cost": 5
      },
      {
        "text": "Inside the if (a[j] > a[j+1]) block, add swaps++; alongside the swap code.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-08",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Sort in descending order",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Modify bubbleSort (or selectionSort) to sort in descending order instead of ascending.",
    "hints": [
      {
        "text": "Only one comparison operator needs to change.",
        "cost": 3
      },
      {
        "text": "Flip > to < (or vice versa) in the swap condition.",
        "cost": 5
      },
      {
        "text": "For bubble sort descending: if (a[j] < a[j+1]) { /* swap */ }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-09",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Sort an array of objects by a numeric field",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Adapt bubbleSort to sort an array of product objects by their price, ascending.",
    "hints": [
      {
        "text": "The comparison should look at .price instead of the raw item.",
        "cost": 5
      },
      {
        "text": "The swap itself still swaps whole objects, not just prices.",
        "cost": 8
      },
      {
        "text": "if (a[j].price > a[j+1].price) { let temp=a[j]; a[j]=a[j+1]; a[j+1]=temp; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-10",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Detect an already-sorted array early",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Modify bubbleSort to stop early (using a flag) if a full pass makes zero swaps, since that means the array is already sorted.",
    "hints": [
      {
        "text": "Add a boolean flag before each outer pass, e.g. let swapped = false;.",
        "cost": 5
      },
      {
        "text": "Set it to true whenever an actual swap happens, and check it after the inner loop.",
        "cost": 8
      },
      {
        "text": "if (!swapped) break; placed right after the inner for loop, inside the outer loop.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-11",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Verify a sort function's correctness",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Verify a sort function's correctness Write a function isSorted(arr) that checks whether an array is fully sorted in ascending order, then use it to verify your bubbleSort output.",
    "hints": [
      {
        "text": "Compare each item to the next one in a loop.",
        "cost": 5
      },
      {
        "text": "If any item is greater than the one right after it, it's not sorted.",
        "cost": 8
      },
      {
        "text": "function isSorted(arr){ for(let i=0;i<arr.length-1;i++){ if(arr[i]>arr[i+1]) return false; } return true; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines isSorted()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling isSorted(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines isSorted()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+isSorted\\s*\\(|const\\s+isSorted\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-sorting-basics-12",
    "day": 8,
    "lessonSlug": "sorting-basics",
    "title": "Combine search and sort into one task",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Given an unsorted array of numbers, write code that: sorts it using bubbleSort or selectionSort, then uses binarySearch on the sorted result to find a target value — printing whether it was found and at what index (in the sorted array).",
    "hints": [
      {
        "text": "The order matters: you must sort BEFORE running binary search.",
        "cost": 8
      },
      {
        "text": "Store the sorted result in a new variable, then pass that variable (not the original) into binarySearch.",
        "cost": 12
      },
      {
        "text": "let sorted = bubbleSort(unsorted); let index = binarySearch(sorted, target); console.log(index !== -1 ? \\Found at index ${index}` : \"Not found\");`",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-01",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Define your sample data",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Create an array of at least 3 objects representing your chosen project theme (products, students, books, etc.) with at least 3 fields each.",
    "hints": [
      {
        "text": "Keep field names consistent across all objects.",
        "cost": 2
      },
      {
        "text": "Print the array afterward to visually confirm it looks right.",
        "cost": 3
      },
      {
        "text": "Example shape: [{name:\"...\", price:..., quantity:...}, ...]",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-02",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Write one simple read function",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write a function that returns a single property from the first item in your array (e.g. the name of the first product).",
    "hints": [
      {
        "text": "This is just index + property access, no loop needed.",
        "cost": 2
      },
      {
        "text": "Return the value, don't just print it inside the function.",
        "cost": 3
      },
      {
        "text": "function firstItemName(list){ return list[0].name; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Write(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-03",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Print all records with a loop",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Print all records with a loop Write a function that logs every item in your array, one per line, with a readable label.",
    "hints": [
      {
        "text": "Loop through the array by index.",
        "cost": 2
      },
      {
        "text": "Format each line so it's easy to read, not just a raw object dump.",
        "cost": 3
      },
      {
        "text": "function printAll(list){ for(let i=0;i<list.length;i++){ console.log(list[i]); } }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling that(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-04",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Count your records",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Count your records Write a function countItems(list) that returns how many items are in your array.",
    "hints": [
      {
        "text": "This uses a property you already know about arrays.",
        "cost": 2
      },
      {
        "text": "No loop is required.",
        "cost": 3
      },
      {
        "text": "function countItems(list){ return list.length; }",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines countItems()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling countItems(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines countItems()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+countItems\\s*\\(|const\\s+countItems\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-05",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Search function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a search function for your data that finds one record by a key field (like name or id), returning the object or null.",
    "hints": [
      {
        "text": "Reuse the array-of-objects search pattern from Day 7.",
        "cost": 3
      },
      {
        "text": "Return the whole object, not just true.",
        "cost": 5
      },
      {
        "text": "Loop through, compare the key field with ===, return on match, return null after the loop.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Write(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-06",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Statistic function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a function that computes a meaningful total or average across a numeric field in your data (e.g. total price, average score).",
    "hints": [
      {
        "text": "This is the sum/average pattern applied to a property.",
        "cost": 3
      },
      {
        "text": "Don't forget to divide by .length if computing an average.",
        "cost": 5
      },
      {
        "text": "function totalPrice(list){ let t=0; for(let i=0;i<list.length;i++){ t+=list[i].price; } return t; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Write(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-07",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Filter function",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a function that returns a subset of your data matching a condition you choose (e.g. price above a limit, students above a certain age).",
    "hints": [
      {
        "text": "This is the manual-filter pattern from arrays of objects.",
        "cost": 3
      },
      {
        "text": "Build and return a new array, don't mutate the original.",
        "cost": 5
      },
      {
        "text": "Loop, check the condition on a property, .push() matches into a result array, then return it.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Write(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-08",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Sort your data",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Adapt bubble or selection sort to order your array of objects by one numeric field.",
    "hints": [
      {
        "text": "Copy the array first with [...list] before sorting, so the original stays intact.",
        "cost": 3
      },
      {
        "text": "Compare and swap based on a property, not the whole object directly.",
        "cost": 5
      },
      {
        "text": "Reuse your Day 8 sorting function, changing the comparison to a[j].fieldName > a[j+1].fieldName.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-09",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Combine search + statistic",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Write a function that finds all records matching a search AND immediately computes a statistic on just that filtered subset (e.g. \"average price of all in-stock items\").",
    "hints": [
      {
        "text": "First filter, then run your statistic function on the filtered result, not the original list.",
        "cost": 5
      },
      {
        "text": "You can call your filter function and your statistic function together, passing one's output into the other.",
        "cost": 8
      },
      {
        "text": "function averagePriceInStock(list){ let filtered = inStockOnly(list); return totalPrice(filtered) / filtered.length; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling that(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-10",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Add a validation function",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Write a function that checks if a new record (before adding it to your array) has all required fields filled in correctly (right types, non-empty strings, positive numbers).",
    "hints": [
      {
        "text": "Check each field's type with typeof, similar to the Day 7 profile validation exercise.",
        "cost": 5
      },
      {
        "text": "Combine all checks with && into a single boolean return.",
        "cost": 8
      },
      {
        "text": "function isValidRecord(item){ return typeof item.name===\"string\" && item.name.length>0 && typeof item.price===\"number\" && item.price>0; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Write(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-11",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Build an \"add record\" function safely",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Build an \"add record\" function safely Write a function addItem(list, newItem) that only pushes newItem into list if it passes your validation function, and returns true/false indicating success.",
    "hints": [
      {
        "text": "Call your validation function first, before doing anything else.",
        "cost": 5
      },
      {
        "text": "Only .push() if validation passes.",
        "cost": 8
      },
      {
        "text": "function addItem(list,newItem){ if(!isValidRecord(newItem)) return false; list.push(newItem); return true; }",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines addItem()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling safely(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines addItem()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+addItem\\s*\\(|const\\s+addItem\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-brief-12",
    "day": 9,
    "lessonSlug": "mini-project-brief",
    "title": "Full mini pipeline function",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Full mini pipeline function Write one function generateReport(list) that internally: filters your data by some meaningful condition, sorts the filtered result by a numeric field, and returns both the sorted filtered array AND a computed statistic on it — all using functions you've already written, combined together.",
    "hints": [
      {
        "text": "Think of this as a \"conductor\" function that just calls your other functions in sequence, passing results along.",
        "cost": 8
      },
      {
        "text": "You'll likely return either an array with two items [sortedFiltered, stat], or (once you know objects well) an object with named fields.",
        "cost": 12
      },
      {
        "text": "function generateReport(list){ let filtered = inStockOnly(list); let sorted = sortByPrice(filtered); let avg = totalPrice(filtered)/filtered.length; return [sorted, avg]; }",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines generateReport()",
      "Uses return"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling Full(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines generateReport()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+generateReport\\s*\\(|const\\s+generateReport\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      },
      {
        "id": "fn-return",
        "label": "Uses return",
        "kind": "sourceIncludes",
        "pattern": "return\\b",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-01",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Write your checkpoint list",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write out your own 4-5 checkpoints for your specific project, in the order you plan to tackle them.",
    "hints": [
      {
        "text": "Start with data, end with the demo/Git history.",
        "cost": 2
      },
      {
        "text": "Keep each checkpoint testable — something you can verify with console.log.",
        "cost": 3
      },
      {
        "text": "Example: data ready → read functions → search/sort → demo script → final commit.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-02",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Commit your first checkpoint",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Once your sample data is ready and printed correctly, write and run the Git commands to commit it.",
    "hints": [
      {
        "text": "Stage, then commit, then push.",
        "cost": 2
      },
      {
        "text": "Use a message describing exactly this checkpoint.",
        "cost": 3
      },
      {
        "text": "git add . && git commit -m \"checkpoint 1: sample data ready\" && git push",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write the terminal commands below (one per line, as comments or strings)\n",
    "visibleTests": [
      "Includes: git add",
      "Includes: git commit -m",
      "Includes: git push"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "cmd-0",
        "label": "Includes: git add",
        "kind": "sourceIncludes",
        "pattern": "git add",
        "flags": "i"
      },
      {
        "id": "cmd-1",
        "label": "Includes: git commit -m",
        "kind": "sourceIncludes",
        "pattern": "git commit -m",
        "flags": "i"
      },
      {
        "id": "cmd-2",
        "label": "Includes: git push",
        "kind": "sourceIncludes",
        "pattern": "git push",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-03",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Test a function in isolation",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Pick one function from your project and call it with two different inputs, printing both results to confirm it behaves correctly.",
    "hints": [
      {
        "text": "Choose inputs that are meaningfully different (e.g. found vs not found).",
        "cost": 2
      },
      {
        "text": "Compare the printed output to what you expect by hand.",
        "cost": 3
      },
      {
        "text": "For a search function: test once with a name that exists, once with one that doesn't.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling in(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-04",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Identify an untested edge case",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "For one of your functions, name one edge case you haven't tested yet (e.g. empty array, missing field, zero value).",
    "hints": [
      {
        "text": "Think about what happens if your array has 0 items.",
        "cost": 2
      },
      {
        "text": "Or what happens if a numeric field is exactly 0.",
        "cost": 3
      },
      {
        "text": "Example: \"I haven't tested what my average function does with an empty array — it would divide by 0.\"",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-05",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Fix a checkpoint that's actually broken",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Run your Checkpoint 2 functions again after adding Checkpoint 3 code — confirm nothing from Checkpoint 2 broke. If something did, identify exactly what changed.",
    "hints": [
      {
        "text": "Compare your Checkpoint 2 test outputs before and after adding new code.",
        "cost": 3
      },
      {
        "text": "Check if you accidentally renamed a variable or function that Checkpoint 2 relied on.",
        "cost": 5
      },
      {
        "text": "Look specifically at any shared data (like your main array) — did a new function accidentally mutate it?",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-06",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Write a demo script section",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a demo script section Write the \"demo script\" part of your project: a labeled sequence of console.log calls exercising at least 4 of your functions.",
    "hints": [
      {
        "text": "Add a clear header like console.log(\"=== DEMO ===\"); at the top.",
        "cost": 3
      },
      {
        "text": "Label each function's output so a reader understands what they're seeing.",
        "cost": 5
      },
      {
        "text": "Structure: header, then one labeled block per function, e.g. console.log(\"Search result:\", ...);",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Uses console.log(...)"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "(your console.log output appears here)"
      }
    ],
    "checks": [
      {
        "id": "log",
        "label": "Uses console.log(...)",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-07",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Verify your Git history tells a story",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Run git log --oneline and check: do your commit messages, read in order, describe a clear progression of work? Rewrite any that don't.",
    "hints": [
      {
        "text": "Vague messages like \"fix\" or \"update\" don't tell a story.",
        "cost": 3
      },
      {
        "text": "You can't edit old commit messages easily as a beginner — instead, make your NEXT commit message clearer.",
        "cost": 5
      },
      {
        "text": "Going forward, always mention the specific function or feature completed.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a clear commit message as a string and log it"
    ],
    "outputExamples": [
      {
        "medium": "terminal",
        "body": "$ git log --oneline\na1b2c3d Add greeting function\n9f8e7d6 Initial commit"
      }
    ],
    "checks": [
      {
        "id": "log-msg",
        "label": "Logs a commit message string",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      },
      {
        "id": "specific",
        "label": "Message mentions what changed",
        "kind": "sourceIncludes",
        "pattern": "fix|add|update|function|bug",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-08",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Test with unusual data",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Add one deliberately unusual record to your sample data (e.g. price of 0, an empty name) and see how your functions handle it. Report what happens.",
    "hints": [
      {
        "text": "Focus on functions that do math (average, total) or comparisons.",
        "cost": 3
      },
      {
        "text": "An empty name might break a search that assumes non-empty strings.",
        "cost": 5
      },
      {
        "text": "Document any function that produces a confusing or wrong result with this edge case — that's useful information for polishing your project.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-09",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Refactor a checkpoint's function for reuse",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Find one function in your project that could be reused inside another (e.g., your average function reused inside a report function). Refactor to remove any duplicated logic.",
    "hints": [
      {
        "text": "Look for any place where you copy-pasted similar loop logic instead of calling an existing function.",
        "cost": 5
      },
      {
        "text": "Replace the duplicated block with a direct call to the existing function.",
        "cost": 8
      },
      {
        "text": "If you wrote sum logic twice, keep only one sumOf(list, field) -style function and call it from both places.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling for(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-10",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Design a checkpoint for a feature you haven't built yet",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Design a checkpoint for a feature you haven't built yet Pick one function you haven't written yet, and write out (in plain English) exactly how you'll test it as a checkpoint before writing any code.",
    "hints": [
      {
        "text": "Decide what inputs you'll test with, and what output you expect for each.",
        "cost": 5
      },
      {
        "text": "Include at least one \"normal\" case and one \"edge\" case in your plan.",
        "cost": 8
      },
      {
        "text": "Example: \"For findCheapest, I'll test with a normal array (expect the lowest price object), and with an array of 1 item (expect that single item back).\"",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines out()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling you(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines out()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+out\\s*\\(|const\\s+out\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-11",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Simulate reviewing someone else's checkpoint",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Simulate reviewing someone else's checkpoint Imagine a classmate's Checkpoint 2 only prints raw objects with no labels. Write feedback (in plain English) on how to improve their console output for readability, with a concrete example line.",
    "hints": [
      {
        "text": "Focus on clarity: what would a reader NOT understand from a bare object dump?",
        "cost": 5
      },
      {
        "text": "Suggest adding string labels before each printed value.",
        "cost": 8
      },
      {
        "text": "Example fix: instead of console.log(result);, suggest console.log(\"Search result:\", result);",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines feedback()"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "fn-def",
        "label": "Defines feedback()",
        "kind": "sourceIncludes",
        "pattern": "function\\s+feedback\\s*\\(|const\\s+feedback\\s*=\\s*(\\([^)]*\\)\\s*=>|function)",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-mini-project-checkpoints-12",
    "day": 9,
    "lessonSlug": "mini-project-checkpoints",
    "title": "Full checkpoint audit",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Go through every checkpoint (data, read functions, search/sort, demo, Git) for your ACTUAL project right now, and for each one, write: (1) is it done, partially done, or not started, (2) one specific test you ran or will run to confirm it, and (3) the exact commit message tied to it.",
    "hints": [
      {
        "text": "Be honest about \"partially done\" — this audit is more useful if accurate.",
        "cost": 8
      },
      {
        "text": "For each checkpoint, the \"test\" should be something you can actually run right now, not a vague plan.",
        "cost": 12
      },
      {
        "text": "Structure your audit as a short table or list: Checkpoint | Status | Test performed | Commit message — filled in truthfully for your current project state.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a clear commit message as a string and log it"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "log-msg",
        "label": "Logs a commit message string",
        "kind": "sourceIncludes",
        "pattern": "console\\.log\\s*\\(",
        "flags": "i"
      },
      {
        "id": "specific",
        "label": "Message mentions what changed",
        "kind": "sourceIncludes",
        "pattern": "fix|add|update|function|bug",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-01",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Write one example per topic (basic)",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write one line of code demonstrating: a variable declaration, a condition, and a loop (three separate lines).",
    "hints": [
      {
        "text": "Pick the simplest possible example for each.",
        "cost": 2
      },
      {
        "text": "They don't need to relate to each other.",
        "cost": 3
      },
      {
        "text": "E.g. let x = 5; / if (x > 0) {...} / for(let i=0;i<3;i++){...}",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-02",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Name the four data shapes",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Name the four \"shapes\" of data covered in this SAS training (primitives, strings, arrays, objects) with one example value for each.",
    "hints": [
      {
        "text": "Think about what you learned week by week.",
        "cost": 2
      },
      {
        "text": "One of them is really \"text\", one is a \"list\", one is \"key-value pairs\".",
        "cost": 3
      },
      {
        "text": "Number/boolean (primitive), \"hi\" (string), [1,2,3] (array), {a:1} (object).",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-03",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Identify the odd one out",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Given let, const, function, if — which one is NOT used to declare a variable?",
    "hints": [
      {
        "text": "Two of these declare variables.",
        "cost": 2
      },
      {
        "text": "Two of these do something else entirely (control flow / functions).",
        "cost": 3
      },
      {
        "text": "function and if are not variable declarations; let/const are.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-04",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Recall the two sorts",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Name the two sorting algorithms taught in this SAS training.",
    "hints": [
      {
        "text": "Both use nested loops.",
        "cost": 2
      },
      {
        "text": "One repeatedly swaps neighbors; the other picks the minimum each round.",
        "cost": 3
      },
      {
        "text": "Bubble sort and selection sort.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-05",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Rewrite from memory",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Without looking at notes, write a function that returns the sum of an array of numbers.",
    "hints": [
      {
        "text": "You'll need an accumulator and a loop.",
        "cost": 3
      },
      {
        "text": "Start the accumulator at 0 before the loop.",
        "cost": 5
      },
      {
        "text": "function sumArray(arr){ let sum=0; for(let i=0;i<arr.length;i++){ sum+=arr[i]; } return sum; }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Defines a function"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling that(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-fn",
        "label": "Defines a function",
        "kind": "sourceIncludes",
        "pattern": "function\\s+\\w+",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-06",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Combine 3 topics in one snippet",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a snippet combining an array of objects, a loop, and a condition — printing only the names of objects meeting some criteria.",
    "hints": [
      {
        "text": "Think of this as a simplified filter, but just printing instead of collecting into a new array.",
        "cost": 3
      },
      {
        "text": "Loop through, check a property with if, and console.log the name when it matches.",
        "cost": 5
      },
      {
        "text": "for(let i=0;i<list.length;i++){ if(list[i].age>18) console.log(list[i].name); }",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-07",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Spot which topic a bug belongs to",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Given a snippet that throws \"x is not defined\", is this a scope issue, a type issue, or a syntax issue? Explain briefly.",
    "hints": [
      {
        "text": "Think about what that specific error message usually means.",
        "cost": 3
      },
      {
        "text": "It's about where a variable can be accessed from.",
        "cost": 5
      },
      {
        "text": "It's a scope issue — the variable was likely declared inside a block or function and accessed outside of it.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-core-review-08",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Compare search algorithms in code",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Explain linear search vs binary search from memory from code, write 2-3 sentences comparing linear and binary search.",
    "hints": [
      {
        "text": "Mention what each requires about the data's order.",
        "cost": 3
      },
      {
        "text": "Mention how each one decides where to look next.",
        "cost": 5
      },
      {
        "text": "Linear search checks every item in order and works on any array; binary search needs sorted data and repeatedly halves the search range.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-09",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Build a tiny multi-concept program from scratch",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Without any starter code, write a program that: creates an array of 3 number objects (each with a value field), finds their sum using a function, and prints a message saying whether the sum is even or odd.",
    "hints": [
      {
        "text": "Break it into three steps: data, sum function, and even/odd check.",
        "cost": 5
      },
      {
        "text": "You can reuse your sumArray idea, adapted to read .value from each object.",
        "cost": 8
      },
      {
        "text": "Build the array, write a sum function reading .value, then use sum % 2 === 0 to decide the message.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-10",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Debug a multi-bug snippet",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Given a snippet with 3 intentional bugs (a const reassignment, a missing break in a switch, and an off-by-one loop), find and describe all three without being told where they are.",
    "hints": [
      {
        "text": "Check variable declarations, switch statements, and loop boundaries separately — one bug type each.",
        "cost": 5
      },
      {
        "text": "Off-by-one bugs usually show up as <= vs < mistakes.",
        "cost": 8
      },
      {
        "text": "Go through the snippet line by line, asking \"could this specific line be one of the three named bug types?\"",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-11",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Practice a full program's behavior out loud (in writing)",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Explain a full program's behavior in the editor (in writing) Given a 10-15 line program combining a loop, a function, and an array of objects, write a paragraph explaining exactly what it does and what it will print, without running it first.",
    "hints": [
      {
        "text": "Trace the code top to bottom, tracking variable values as they change.",
        "cost": 5
      },
      {
        "text": "Pay special attention to what the loop does on each pass.",
        "cost": 8
      },
      {
        "text": "Write your explanation as: \"First, ... then, ... then the loop repeats until ..., finally it prints ...\" — then run the code to check your explanation was correct.",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-core-review-12",
    "day": 10,
    "lessonSlug": "core-review",
    "title": "Full concept map from memory",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Without any notes, write a short program (15+ lines) that uses AT LEAST 6 different Core JS concepts from this SAS training (e.g. variables, a condition, a loop, a function, an array, an object, a search or sort) working together toward one small, coherent goal of your choosing.",
    "hints": [
      {
        "text": "Pick a simple goal first (e.g. \"manage a small todo list\" or \"grade a few students\"), then figure out which concepts naturally fit.",
        "cost": 8
      },
      {
        "text": "Build it piece by piece, testing each part with console.log before combining everything.",
        "cost": 12
      },
      {
        "text": "A reasonable skeleton: an array of objects (data) → a function that filters or searches it (function + array + object + condition) → a loop that prints results → maybe a small sort at the end.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-defense-prep-01",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Write your one-sentence pitch",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write a single sentence describing what your mini-project does, suitable as the opening line of your defense.",
    "hints": [
      {
        "text": "Keep it under 20 words.",
        "cost": 2
      },
      {
        "text": "Focus on what it does, not how it's built.",
        "cost": 3
      },
      {
        "text": "Example: \"My project is a small product inventory tool that can search, total, and sort items.\"",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-02",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "List your project's 3 main functions",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Name the three functions in your project you consider most important to explain during your defense.",
    "hints": [
      {
        "text": "Pick functions that show different skills (e.g. one search, one calculation, one sort).",
        "cost": 2
      },
      {
        "text": "Avoid picking three nearly-identical functions.",
        "cost": 3
      },
      {
        "text": "A balanced set often includes: a search/find function, a statistic function, and a sort or filter function.",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-defense-prep-03",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Write your README's \"How to run\" section",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "Write the exact section of your README explaining how to run your project.",
    "hints": [
      {
        "text": "Include the terminal command, not just a description.",
        "cost": 2
      },
      {
        "text": "Mention the exact file name.",
        "cost": 3
      },
      {
        "text": "## How to run\\n\\node yourfilename.js``",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-04",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Prepare for the \"why this loop\" question",
    "difficulty": "easy",
    "maxPoints": 10,
    "prompt": "For one loop in your project, write a one-sentence explanation of why you chose a for loop (or while) instead of the other.",
    "hints": [
      {
        "text": "Think about whether you knew the number of repetitions in advance.",
        "cost": 2
      },
      {
        "text": "for is common when looping through an array by index.",
        "cost": 3
      },
      {
        "text": "Example: \"I used a for loop because I needed to visit every index of the array exactly once.\"",
        "cost": 5
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-defense-prep-05",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Anticipate an edge-case question",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write one likely question about what your project does with empty or missing data, and a short, honest answer.",
    "hints": [
      {
        "text": "Think about your statistic functions specifically — what happens with an empty array?",
        "cost": 3
      },
      {
        "text": "If you haven't handled it, it's fine to say so honestly as part of your answer.",
        "cost": 5
      },
      {
        "text": "Example Q: \"What happens if the product list is empty?\" A: \"My average function would currently divide by zero — that's something I'd improve next.\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-06",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Practice explaining one function line by line",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Pick your most complex function and write out, line by line, what each line does in plain English (not just what the code says).",
    "hints": [
      {
        "text": "Avoid simply restating the code — explain the purpose of each line.",
        "cost": 3
      },
      {
        "text": "Group related lines together (e.g. \"these three lines find the minimum value\").",
        "cost": 5
      },
      {
        "text": "For a search function: \"First we start assuming nothing is found (-1). Then we check each item one by one. If we find a match, we return its position immediately.\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// calling line(...) might print:\nresult: 42"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-defense-prep-07",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Prepare for a live demo failure",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Write a short plan for what you'll say and do if your live demo crashes or shows an unexpected error during the defense.",
    "hints": [
      {
        "text": "Staying calm and diagnosing out loud is better than panicking silently.",
        "cost": 3
      },
      {
        "text": "Mention that you'd check the error message and explain what you think it means, live.",
        "cost": 5
      },
      {
        "text": "Example: \"If it crashes, I'll read the error message aloud, explain what I think caused it, and either fix it live or explain how I'd fix it afterward.\"",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-08",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Time your demo",
    "difficulty": "medium",
    "maxPoints": 20,
    "prompt": "Do a full timed run of your live demo (just the code running, not the full presentation) and report how many seconds/minutes it takes.",
    "hints": [
      {
        "text": "Use a phone timer or stopwatch.",
        "cost": 3
      },
      {
        "text": "Include the time to actually run the command, not just narrate.",
        "cost": 5
      },
      {
        "text": "If it takes longer than your allotted slot allows, look for which console.log sections could be trimmed for the defense.",
        "cost": 8
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-09",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Write 3 tough questions for yourself",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Write three challenging questions an instructor might ask about your specific project's logic (not generic training questions), and short honest answers.",
    "hints": [
      {
        "text": "Look at your own trickiest function and ask \"why did I do it this way, and not another way?\"",
        "cost": 5
      },
      {
        "text": "Consider asking yourself about a specific edge case your code might not fully handle.",
        "cost": 8
      },
      {
        "text": "Example: \"Why did you choose selection sort over bubble sort for this?\" — answer honestly, even if the answer is \"I didn't have a strong reason, they're similar in this context.\"",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-10",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Simplify a complex explanation",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Take your most complicated function's explanation and rewrite it so a complete beginner (someone who just started Day 1) could understand it, without using any jargon from later days.",
    "hints": [
      {
        "text": "Avoid words like \"iterate\", \"parameter\", or \"traversal\" — use plain language instead.",
        "cost": 5
      },
      {
        "text": "Use a small concrete example with real numbers instead of abstract descriptions.",
        "cost": 8
      },
      {
        "text": "Example: instead of \"it traverses the array comparing adjacent elements\", say \"it looks at each pair of neighboring numbers, one at a time, and swaps them if they're in the wrong order.\"",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write working JavaScript for this task"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(console\\.log|function\\s+|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  },
  {
    "id": "ex-defense-prep-11",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Prepare a \"what I'd do differently\" reflection",
    "difficulty": "hard",
    "maxPoints": 35,
    "prompt": "Write 3-4 sentences honestly reflecting on what you would improve or do differently if you rebuilt this project from scratch.",
    "hints": [
      {
        "text": "Think about scope — did you build too much, too little, or about right?",
        "cost": 5
      },
      {
        "text": "Think about testing — were there edge cases you skipped?",
        "cost": 8
      },
      {
        "text": "A strong answer names something SPECIFIC (a function, a missing test, a messy piece of logic), not just a vague \"I'd do better.\"",
        "cost": 12
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Write a short code answer using console.log"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "one-log",
        "label": "At least 1 console.log(...) call",
        "kind": "consoleLogMinCount",
        "min": 1
      }
    ]
  },
  {
    "id": "ex-defense-prep-12",
    "day": 10,
    "lessonSlug": "defense-prep",
    "title": "Full mock defense",
    "difficulty": "extreme",
    "maxPoints": 60,
    "prompt": "Do a complete timed mock defense in the editor (recorded if possible): 1-sentence pitch, live demo, explanation of your 3 main functions, and answers to at least 2 of your own prepared tough questions — all without reading directly from a script.",
    "hints": [
      {
        "text": "Practice this at least once in full before doing the \"real\" timed version.",
        "cost": 8
      },
      {
        "text": "Notice where you hesitate or get stuck — those are the spots to practice more.",
        "cost": 12
      },
      {
        "text": "Structure: Pitch (10-15 sec) → Data explanation (15-20 sec) → Live demo (1-2 min) → Function walkthroughs (1-2 min) → Q&A practice (1-2 min) — aim for a natural, conversational tone throughout, not a memorized recitation.",
        "cost": 20
      }
    ],
    "kind": "code",
    "starterCode": "// Write your solution below\n// Run → try it · Run tests → check · Submit when tests pass\n",
    "visibleTests": [
      "Includes working JavaScript"
    ],
    "outputExamples": [
      {
        "medium": "console",
        "body": "// run your code to see output here"
      }
    ],
    "checks": [
      {
        "id": "has-code",
        "label": "Includes working JavaScript",
        "kind": "sourceIncludes",
        "pattern": "(function\\s+|console\\.log|for\\s*\\(|while\\s*\\()",
        "flags": "i"
      }
    ]
  }
] as const;
