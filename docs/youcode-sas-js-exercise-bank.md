YouCode SAS — JavaScript Exercise Bank (Points & Hints, No Solutions)
This is a companion exercise bank to the lesson content. Each lesson has 12 exercises across four difficulty tiers. No solutions are provided — only hints, and each hint you use permanently reduces the points you can earn on that exercise.
Scoring Rubric
Tier Points Hint 1 Hint 2 Hint 3 🟢 Easy 10 -2 -3 -5 🟡 Medium 20 -3 -5 -8 🟠 Hard 35 -5 -8 -12 🔴 Extreme 60 -8 -12 -20
Rule: Solve without hints to earn full points. Each hint you reveal subtracts its cost from that exercise's points (minimum 0 points remaining — you can never go negative on a single exercise). Track your running total across the SAS training on your own scoreboard or spreadsheet.
Day 1 — Welcome & first JavaScript
welcome-to-javascript
🟢 Easy (10 pts) — Print a greeting Print "Hello, YouCode!" to the console.
Hint 1 (-2): You need exactly one function call.
Hint 2 (-3): The function is console.log(...).
Hint 3 (-5): Put the text in double or single quotes inside the parentheses.
🟢 Easy (10 pts) — Print three lines Print your first name, your city, and your age as three separate lines.
Hint 1 (-2): You need three separate statements.
Hint 2 (-3): Each statement is its own console.log(...).
Hint 3 (-5): Strings go in quotes, numbers don't need quotes.
🟢 Easy (10 pts) — Basic math print Print the result of 12 * 4 without calculating it yourself.
Hint 1 (-2): Let JavaScript do the math for you.
Hint 2 (-3): Put the expression directly inside console.log(...).
Hint 3 (-5): console.log(12 * 4);
🟢 Easy (10 pts) — Multiple values, one line Print the text "Total:" followed by the number 100, both in a single console.log call.
Hint 1 (-2): console.log accepts more than one argument.
Hint 2 (-3): Separate the arguments with a comma.
Hint 3 (-5): console.log("Total:", 100);
🟡 Medium (20 pts) — Comment out a line Given a two-line script, make the second line a comment so it doesn't run, without deleting it.
Hint 1 (-3): JavaScript comments start with a specific symbol.
Hint 2 (-5): The symbol is two characters, not one.
Hint 3 (-8): Prefix the line with //.
🟡 Medium (20 pts) — Predict before running Write down what you think this prints, before running it: console.log("5" + 5); console.log(5 + 5);
Hint 1 (-3): One of these lines mixes a string and a number.
Hint 2 (-5): + behaves differently depending on the types involved.
Hint 3 (-8): Text + number joins them together; number + number adds them.
🟡 Medium (20 pts) — Fix the case-sensitivity bug This code throws an error: Console.log("test");. Explain why and fix it.
Hint 1 (-3): JavaScript cares about uppercase vs lowercase.
Hint 2 (-5): Look carefully at the capital letter.
Hint 3 (-8): The correct object name is entirely lowercase.
🟡 Medium (20 pts) — Three computed values Print the results of 7 + 3, 7 - 3, and 7 * 3, each labeled with text like "Sum:".
Hint 1 (-3): You'll need three separate console.log calls or one with several arguments.
Hint 2 (-5): Label each result so it's clear which is which.
Hint 3 (-8): console.log("Sum:", 7 + 3); is one valid line.
🟠 Hard (35 pts) — Explain the output, don't just state it For console.log("Age: " + 20 + 5);, predict the output AND explain why it isn't "Age: 25".
Hint 1 (-5): + is evaluated left to right.
Hint 2 (-8): Once a string is involved, everything after gets joined as text, not added.
Hint 3 (-12): The first + joins "Age: " and 20 into text; the second + then joins that text with 5.
🟠 Hard (35 pts) — Build a mini bio using only what you know today Using only console.log and text/number values (no variables yet), print a 4-line bio: name, age, city, and one hobby.
Hint 1 (-5): Each line needs its own console.log.
Hint 2 (-8): Keep every value literal (typed directly), since you haven't learned variables yet.
Hint 3 (-12): Structure: console.log("Name: ..."); repeated for each fact.
🟠 Hard (35 pts) — Diagnose a silent mistake Explain what's wrong with console.log("Total: " + 10 + 20 + 30); if the intended output was "Total: 60".
Hint 1 (-5): The problem is about order, not syntax — this code runs without an error.
Hint 2 (-8): Once you hit the first string, every following + becomes concatenation.
Hint 3 (-12): To force the numbers to add first, they need to be grouped or added before joining with the string.
🔴 Extreme (60 pts) — Full diagnostic Given console.log("Result: " + 2 + 3 + "4" + 5);, predict the exact final string output character by character, and explain the reasoning behind every operator.
Hint 1 (-8): Track the running value after each +, one at a time, left to right.
Hint 2 (-12): Once concatenation starts, it stays text for the rest of the expression — this doesn't reverse even if a number appears later.
Hint 3 (-20): The intermediate values are: "Result: ", then "Result: 2", then "Result: 23", then "Result: 234" — continue this pattern to the end.
hello-console
🟢 Easy (10 pts) — Run your first file Create a file hello.js containing one console.log line, and state the exact terminal command to run it.
Hint 1 (-2): The command starts with node.
Hint 2 (-3): You need the file name including its extension.
Hint 3 (-5): node hello.js
🟢 Easy (10 pts) — Multiple prints, in order Print "One", "Two", "Three" in that exact order using three console.log calls.
Hint 1 (-2): Order in the file matters.
Hint 2 (-3): JavaScript runs top to bottom.
Hint 3 (-5): Write the three lines in the exact order you want them to print.
🟢 Easy (10 pts) — Print a boolean Print the value true (not the text "true").
Hint 1 (-2): Don't put quotes around it.
Hint 2 (-3): true is a keyword, not a string.
Hint 3 (-5): console.log(true);
🟢 Easy (10 pts) — Semicolon habit Rewrite this line to include the missing semicolon: console.log("done")
Hint 1 (-2): Something small is missing at the very end.
Hint 2 (-3): It's a punctuation mark, not a letter.
Hint 3 (-5): Add ; right after the closing parenthesis.
🟡 Medium (20 pts) — Predict a 3-line output Predict the output of: console.log("A"); console.log(1+1); console.log("B");
Hint 1 (-3): Each statement prints on its own line.
Hint 2 (-5): The middle line involves math, not text.
Hint 3 (-8): The second line prints a number, not "1+1".
🟡 Medium (20 pts) — Fix a syntax error Fix this broken statement: console.log "Hello";
Hint 1 (-3): Something structural is missing, not just a typo in the text.
Hint 2 (-5): Function calls need a specific pair of symbols around their input.
Hint 3 (-8): Add parentheses: console.log("Hello");
🟡 Medium (20 pts) — Console vs file behavior Explain one difference between typing code directly into a browser console versus running a .js file with Node.
Hint 1 (-3): Think about how each one executes code — line by line, or all at once.
Hint 2 (-5): A REPL evaluates and shows a result after every single line you type.
Hint 3 (-8): Running a whole file executes every line in order before you see any output, unless you use console.log.
🟡 Medium (20 pts) — Logging labeled values Print two labeled values in one line: "Width:" with value 10, and "Height:" with value 5.
Hint 1 (-3): One console.log call can take more than two arguments.
Hint 2 (-5): Separate every argument with a comma.
Hint 3 (-8): console.log("Width:", 10, "Height:", 5);
🟠 Hard (35 pts) — Debug silently wrong output A student wrote console.log("Result: " 5 + 5); and got an error. Identify and fix the mistake.
Hint 1 (-5): Look between the string and the number.
Hint 2 (-8): Two separate values next to each other without an operator will cause a syntax error.
Hint 3 (-12): Add a + between "Result: " and 5.
🟠 Hard (35 pts) — Explain execution order Given a 5-line script mixing console.log and comments, explain out loud (in writing) the exact order lines will execute and print.
Hint 1 (-5): Comments never execute, regardless of position.
Hint 2 (-8): Non-comment lines execute strictly top to bottom.
Hint 3 (-12): List only the non-commented lines in their original top-to-bottom order — that's your execution order.
🟠 Hard (35 pts) — Terminal navigation You have a file day1/hello.js and your terminal is currently in the parent folder. Write the full sequence of commands needed to run it.
Hint 1 (-5): You'll need to change directories first.
Hint 2 (-8): cd moves you into a folder.
Hint 3 (-12): cd day1 then node hello.js
🔴 Extreme (60 pts) — Full mini-script from a spec Without seeing any example, write a .js file from scratch that: prints a title line, prints a blank separator using dashes, then prints 3 labeled facts about you, in a single file you could run with Node.
Hint 1 (-8): A "blank separator" can just be a string of dash characters.
Hint 2 (-12): You'll need at least 5 console.log calls in total.
Hint 3 (-20): Structure: title, console.log("----------"), then three console.log("Label:", value) lines.
git-github-basics
🟢 Easy (10 pts) — Name the three core commands Name the three Git commands used in the everyday save-and-upload workflow, in order.
Hint 1 (-2): The first one prepares files.
Hint 2 (-3): The second one saves a snapshot with a message.
Hint 3 (-5): git add, git commit -m "...", git push.
🟢 Easy (10 pts) — Stage a single file Write the command to stage only a file named app.js (not everything).
Hint 1 (-2): You don't need the . shortcut here.
Hint 2 (-3): The command takes a file name as an argument.
Hint 3 (-5): git add app.js
🟢 Easy (10 pts) — Write a good commit message Write a clear, specific commit message for a commit that adds a function counting vowels.
Hint 1 (-2): Avoid vague words like "update" or "fix".
Hint 2 (-3): Mention what was added and briefly why.
Hint 3 (-5): Something like "add countVowels function".
🟢 Easy (10 pts) — Check your repo's state Which command shows you which files are staged, modified, or untracked?
Hint 1 (-2): It's not git log.
Hint 2 (-3): The command name matches what it reports.
Hint 3 (-5): git status
🟡 Medium (20 pts) — Order the workflow Put these in the correct order: git commit -m "add feature", git push, git add feature.js.
Hint 1 (-3): You must stage before you can commit.
Hint 2 (-5): You must commit before you can push.
Hint 3 (-8): git add feature.js → git commit -m "add feature" → git push
🟡 Medium (20 pts) — Clone vs init Explain the difference between git init and git clone, and when you'd use each.
Hint 1 (-3): One starts tracking a brand-new folder; the other downloads an existing repo.
Hint 2 (-5): git clone needs a URL; git init doesn't.
Hint 3 (-8): Use init for a new project with no GitHub repo yet; use clone to get a copy of an existing GitHub repo.
🟡 Medium (20 pts) — View history Write the command that shows a compact, one-line-per-commit history of the repo.
Hint 1 (-3): It's a variation of git log.
Hint 2 (-5): There's a flag that shortens the output.
Hint 3 (-8): git log --oneline
🟡 Medium (20 pts) — Vague vs clear commit messages Given the message "fix stuff", rewrite it to be clear and specific, inventing a plausible change it describes.
Hint 1 (-3): Say exactly what changed, not that "something" changed.
Hint 2 (-5): Mention the function, file, or feature affected.
Hint 3 (-8): Example: "fix off-by-one bug in reverseString function".
🟠 Hard (35 pts) — Recover from a forgotten add You ran git commit -m "message" but forgot to git add your new file first. Explain what happened and how to fix it.
Hint 1 (-5): The commit only includes what was staged beforehand.
Hint 2 (-8): Your new file was never staged, so it's not part of that commit.
Hint 3 (-12): Run git add on the missing file, then commit again (a new commit, or amend the previous one).
🟠 Hard (35 pts) — Design a commit plan You're about to build 4 functions today. Plan out 4 separate commit messages you would use, one per function, as you finish each.
Hint 1 (-5): Each message should be tied to exactly one function's completion.
Hint 2 (-8): Keep messages short but specific — mention the function name.
Hint 3 (-12): Example pattern: "add [functionName] function and test it".
🟠 Hard (35 pts) — Explain the push failure git push fails with a message about the remote having work you don't have locally. What should you do first?
Hint 1 (-5): You need to bring the remote's changes into your local repo first.
Hint 2 (-8): The command to do this starts with git pull.
Hint 3 (-12): Run git pull first, resolve anything necessary, then try git push again.
🔴 Extreme (60 pts) — Full day-one Git simulation Simulate, command by command, a full session: initialize a repo, create and stage a file, commit it, connect it to a GitHub remote, and push it — writing every single command in the correct order.
Hint 1 (-8): You'll need at least 5 distinct commands.
Hint 2 (-12): The remote connection command needs a URL and is only run once.
Hint 3 (-20): Order: git init, git add ., git commit -m "...", git remote add origin <url>, git push -u origin main.
Day 2 — Variables, operators & conditions
variables-let-const
🟢 Easy (10 pts) — Declare and print Declare a const called city with your city's name, and print it.
Hint 1 (-2): const needs a value right away.
Hint 2 (-3): Strings go in quotes.
Hint 3 (-5): const city = "Marrakesh"; console.log(city);
🟢 Easy (10 pts) — Check a type Print the result of typeof 100.
Hint 1 (-2): typeof goes before the value.
Hint 2 (-3): No parentheses are required around the value.
Hint 3 (-5): console.log(typeof 100);
🟢 Easy (10 pts) — Update a let Declare let count = 5;, then change it to 10, then print it.
Hint 1 (-2): let allows reassignment.
Hint 2 (-3): Reassignment doesn't repeat the let keyword.
Hint 3 (-5): let count = 5; count = 10; console.log(count);
🟢 Easy (10 pts) — Naming check Which of these variable names is invalid in JavaScript: 1stPlace, firstPlace, _temp? Explain why.
Hint 1 (-2): Look at what each name starts with.
Hint 2 (-3): One rule is about starting characters.
Hint 3 (-5): Names cannot start with a digit, so 1stPlace is invalid.
🟡 Medium (20 pts) — Fix the const bug This throws an error. Fix it while keeping the intent that the value changes: const total = 0; total = total + 5;
Hint 1 (-3): The variable is clearly meant to be reassigned.
Hint 2 (-5): const doesn't allow that.
Hint 3 (-8): Change const to let.
🟡 Medium (20 pts) — undefined vs assigned What is printed by let x; console.log(x); x = 5; console.log(x);?
Hint 1 (-3): The first print happens before any value is assigned.
Hint 2 (-5): A declared-but-unassigned variable has a specific default value.
Hint 3 (-8): It prints undefined then 5.
🟡 Medium (20 pts) — Multiple declarations Declare three const variables — name, age, isStudent — with sensible values, and print all three on one line.
Hint 1 (-3): Use appropriate types for each (string, number, boolean).
Hint 2 (-5): console.log can take multiple values separated by commas.
Hint 3 (-8): console.log(name, age, isStudent);
🟡 Medium (20 pts) — typeof on multiple values Print the typeof of a string, a number, a boolean, and an undeclared variable's value, each on its own line.
Hint 1 (-3): You'll need four separate console.log lines.
Hint 2 (-5): For "undeclared value", declare a variable with no assignment.
Hint 3 (-8): let u; console.log(typeof "a"); console.log(typeof 1); console.log(typeof true); console.log(typeof u);
🟠 Hard (35 pts) — Spot every bug Find and fix all bugs in: const Age = 20; age = 21; console.log(Age);
Hint 1 (-5): There are two separate issues here, not one.
Hint 2 (-8): One issue is about const reassignment; the other is about a naming mismatch (case sensitivity).
Hint 3 (-12): age (lowercase) was never declared — only Age (capital A) exists, and it's a const so it can't be reassigned anyway.
🟠 Hard (35 pts) — Explain in your own words Explain, in 3-4 sentences, the difference between undefined and null, with one example of each.
Hint 1 (-5): One is automatic; the other is intentional.
Hint 2 (-8): undefined usually means "not yet given a value"; null usually means "deliberately empty".
Hint 3 (-12): Example: let x; // undefined automatically vs let y = null; // deliberately set to nothing.
🟠 Hard (35 pts) — Refactor magic values into variables Given console.log(3.14159 * 5 * 5); (area of a circle with radius 5), rewrite it using named const variables for pi and radius.
Hint 1 (-5): Two values in this expression deserve names.
Hint 2 (-8): Use const pi = ... and const radius = ....
Hint 3 (-12): const pi = 3.14159; const radius = 5; console.log(pi * radius * radius);
🔴 Extreme (60 pts) — Design a small variable set for a scenario You're modeling a single student's basic info (not yet as an object — just separate variables): name, age, grade average, and whether they passed. Declare all four with appropriate let/const choices and explain your choice for each.
Hint 1 (-8): Ask for each variable: "will this ever be reassigned in a real program?"
Hint 2 (-12): Grade average might update if new grades come in; a passed/failed status might also be recalculated.
Hint 3 (-20): A reasonable answer: const name and let age (rarely changes, but could), let gradeAverage, let passed — with a short justification for each based on whether reassignment is plausible.
operators-arithmetic
🟢 Easy (10 pts) — Basic modulo Print the remainder of 17 divided by 5.
Hint 1 (-2): Use the % operator.
Hint 2 (-3): It goes between the two numbers.
Hint 3 (-5): console.log(17 % 5);
🟢 Easy (10 pts) — Strict equality check Print the result of comparing 7 and "7" using ===.
Hint 1 (-2): === checks both value and type.
Hint 2 (-3): One side is a number, one is a string.
Hint 3 (-5): console.log(7 === "7"); // false
🟢 Easy (10 pts) — Compound assignment Start with let x = 10; and use += to add 5, then print the result.
Hint 1 (-2): += updates a variable based on its current value.
Hint 2 (-3): x += 5; is shorthand for something.
Hint 3 (-5): let x = 10; x += 5; console.log(x); // 15
🟢 Easy (10 pts) — Logical AND Print the result of true && false.
Hint 1 (-2): AND is only true if both sides are true.
Hint 2 (-3): One side here is false.
Hint 3 (-5): console.log(true && false); // false
🟡 Medium (20 pts) — Even or odd checker Given a number n = 23, print whether it's even or odd using % and a boolean expression (no if yet).
Hint 1 (-3): n % 2 tells you something useful.
Hint 2 (-5): Compare that result to 0.
Hint 3 (-8): console.log(n % 2 === 0);
🟡 Medium (20 pts) — Combine two conditions Given age = 20 and hasID = true, print true only if both age >= 18 AND hasID are true.
Hint 1 (-3): You need to combine two boolean expressions.
Hint 2 (-5): Use && between them.
Hint 3 (-8): console.log(age >= 18 && hasID);
🟡 Medium (20 pts) — Spot the assignment bug Explain why if (x = 5) is almost always a mistake compared to if (x === 5).
Hint 1 (-3): One of these changes x's value; the other only checks it.
Hint 2 (-5): = returns the assigned value itself, which JavaScript then treats as truthy/falsy.
Hint 3 (-8): x = 5 sets x to 5 and the condition becomes truthy (since 5 is truthy) regardless of what x was before — this is a subtle bug.
🟡 Medium (20 pts) — String vs number addition Predict and explain the outputs of "10" + 5 and 10 + 5.
Hint 1 (-3): Look at the type of the left-hand value in each case.
Hint 2 (-5): + with a string always concatenates, even if the other side is a number.
Hint 3 (-8): "10" + 5 is "105" (text); 10 + 5 is 15 (number).
🟠 Hard (35 pts) — Range check Given temp = 22, write a single expression (no if) that is true only if temp is strictly between 15 and 25.
Hint 1 (-5): You need two comparisons combined.
Hint 2 (-8): Use && to require both to be true.
Hint 3 (-12): console.log(temp > 15 && temp < 25);
🟠 Hard (35 pts) — Precedence puzzle Predict the output of console.log(2 + 3 * 4); and explain why it isn't 20.
Hint 1 (-5): Not all operators run strictly left to right.
Hint 2 (-8): Multiplication has higher precedence than addition.
Hint 3 (-12): 3 * 4 is computed first (12), then 2 + 12 gives 14.
🟠 Hard (35 pts) — Build a compound boolean Given isWeekend = true, isHoliday = false, hasWork = true, write an expression that's true only when it's a day off — meaning weekend OR holiday, but NOT if there's work anyway.
Hint 1 (-5): You need ||, &&, and ! together.
Hint 2 (-8): Combine the "day off" condition first, then exclude the work condition.
Hint 3 (-12): console.log((isWeekend || isHoliday) && !hasWork);
🔴 Extreme (60 pts) — Full precedence trace Given console.log(10 - 2 * 3 + 4 / 2 === 6);, manually trace every single operation in the correct order (following operator precedence) and state the final boolean result, explaining each step.
Hint 1 (-8): Multiplication and division happen before addition and subtraction, and === happens last.
Hint 2 (-12): First compute 2 * 3 and 4 / 2 separately, then handle the - and + left to right.
Hint 3 (-20): Step by step: 2*3=6, 4/2=2, so 10 - 6 + 2 = 6, then 6 === 6 is true.
if-else
🟢 Easy (10 pts) — Basic if/else Given age = 16, print "Minor" if under 18, otherwise "Adult".
Hint 1 (-2): You need one if and one else.
Hint 2 (-3): The condition compares age to 18.
Hint 3 (-5): if (age < 18) { console.log("Minor"); } else { console.log("Adult"); }
🟢 Easy (10 pts) — Single condition Print "Positive" only if n = 5 is greater than 0 (no else needed).
Hint 1 (-2): You don't need an else branch here.
Hint 2 (-3): The condition is a simple comparison.
Hint 3 (-5): if (n > 0) { console.log("Positive"); }
🟢 Easy (10 pts) — Truthy or falsy? Without running it, decide if if (0) would run its block, and explain why.
Hint 1 (-2): Some numbers behave as false in a condition.
Hint 2 (-3): 0 is one of the falsy values.
Hint 3 (-5): No, 0 is falsy, so the block would not run.
🟢 Easy (10 pts) — Switch skeleton Fill in a switch statement that prints "Red" when color === "red", and "Unknown" otherwise.
Hint 1 (-2): You need one case and a default.
Hint 2 (-3): Don't forget break after the case.
Hint 3 (-5): switch(color) { case "red": console.log("Red"); break; default: console.log("Unknown"); }
🟡 Medium (20 pts) — Three-way grade check Given a score, print "Pass" if 50 or above, "Borderline" if exactly 45-49, and "Fail" otherwise.
Hint 1 (-3): You'll need if / else if / else.
Hint 2 (-5): Order your conditions from highest to lowest, or be careful with ranges.
Hint 3 (-8): Structure: if (score >= 50) ... else if (score >= 45) ... else ...
🟡 Medium (20 pts) — Fix the fallthrough bug This switch prints too much. Fix it: switch(x) { case 1: console.log("one"); case 2: console.log("two"); }
Hint 1 (-3): Something is missing after each case block.
Hint 2 (-5): Without it, execution "falls through" to the next case.
Hint 3 (-8): Add break; after each console.log line.
🟡 Medium (20 pts) — Weekend checker with switch Using switch, print "Weekend" for "Saturday" or "Sunday", and "Weekday" for anything else.
Hint 1 (-3): Two cases can share the same block if you stack them.
Hint 2 (-5): Only the last of the stacked cases needs the actual code + break.
Hint 3 (-8): case "Saturday": case "Sunday": console.log("Weekend"); break;
🟡 Medium (20 pts) — Combine conditions in an if Print "Eligible" only if age >= 18 && hasID are both true, otherwise "Not eligible".
Hint 1 (-3): Combine both booleans with && inside the condition.
Hint 2 (-5): You still need an else for the failing case.
Hint 3 (-8): if (age >= 18 && hasID) { console.log("Eligible"); } else { console.log("Not eligible"); }
🟠 Hard (35 pts) — Reorder broken conditions This code always prints "F" even for a grade of 95. Find and fix the ordering bug.
let grade = 95; if (grade >= 60) { console.log("Pass"); } else if (grade >= 90) { console.log("A"); } else { console.log("F"); } 
Hint 1 (-5): The first matching condition wins, even if a later one would also match.
Hint 2 (-8): Since 95 also satisfies >= 60, it never reaches the >= 90 check.
Hint 3 (-12): Reorder so the more specific/higher condition (>= 90) comes first.
🟠 Hard (35 pts) — FizzBuzz condition logic (no loop yet) For a single number n = 15, print "FizzBuzz" if divisible by both 3 and 5, "Fizz" if only by 3, "Buzz" if only by 5, otherwise the number itself.
Hint 1 (-5): Check the combined divisibility case first.
Hint 2 (-8): Use % to check divisibility, and order your else ifs carefully.
Hint 3 (-12): if (n % 15 === 0) ... else if (n % 3 === 0) ... else if (n % 5 === 0) ... else ...
🟠 Hard (35 pts) — Nested conditions Given isMember = true and cartTotal = 120, print "Free shipping" if the person is a member AND their cart is over 100, "Discount shipping" if just a member, and "Standard shipping" otherwise.
Hint 1 (-5): You can nest an if inside another if's block.
Hint 2 (-8): Check membership first, then check the cart total inside that block.
Hint 3 (-12): if (isMember) { if (cartTotal > 100) {...} else {...} } else {...}
🔴 Extreme (60 pts) — Full decision table Design and implement conditions for a ticket price system: children (under 12) pay 5, seniors (65+) pay 7, everyone else pays 10 — but if it's a "Tuesday", everyone gets a 2 discount regardless of age group. Implement this with a combination of if/else if/else and a nested check for the Tuesday discount.
Hint 1 (-8): First determine the base price using an age-based if/else if/else chain.
Hint 2 (-12): Then apply the Tuesday discount as a separate check afterward, subtracting from whatever base price was found.
Hint 3 (-20): Use a let price variable, assign it inside the age chain, then afterward: if (day === "Tuesday") { price -= 2; }
Day 3 — Loops
for-while-loops
🟢 Easy (10 pts) — Count to 10 Print numbers 1 through 10 using a for loop.
Hint 1 (-2): Start your counter at 1.
Hint 2 (-3): Your condition should allow 10 to print too.
Hint 3 (-5): for (let i = 1; i <= 10; i++) { console.log(i); }
🟢 Easy (10 pts) — Countdown with while Print 5, 4, 3, 2, 1 using a while loop.
Hint 1 (-2): Start at 5 and decrease.
Hint 2 (-3): Use i-- inside the loop.
Hint 3 (-5): let i = 5; while (i >= 1) { console.log(i); i--; }
🟢 Easy (10 pts) — Skip a number Print 1 to 5, but skip the number 3, using continue.
Hint 1 (-2): Check for the value inside the loop.
Hint 2 (-3): Use continue when the check matches.
Hint 3 (-5): for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }
🟢 Easy (10 pts) — Stop early Print numbers starting from 1, but stop completely once you reach 4, using break.
Hint 1 (-2): Use a loop with a high or unbounded upper limit.
Hint 2 (-3): Check the condition to break inside the loop body.
Hint 3 (-5): for (let i = 1; i <= 100; i++) { if (i === 4) break; console.log(i); }
🟡 Medium (20 pts) — Sum with a loop Compute and print the sum of numbers from 1 to 100 using a loop (not a formula).
Hint 1 (-3): Start an accumulator variable at 0 before the loop.
Hint 2 (-5): Add the loop counter to the accumulator each pass.
Hint 3 (-8): let sum = 0; for (let i = 1; i <= 100; i++) { sum += i; } console.log(sum);
🟡 Medium (20 pts) — Print only even numbers Print all even numbers from 1 to 20 using a loop and a condition.
Hint 1 (-3): Use % to check evenness inside the loop.
Hint 2 (-5): Combine the loop with an if.
Hint 3 (-8): for (let i = 1; i <= 20; i++) { if (i % 2 === 0) console.log(i); }
🟡 Medium (20 pts) — Multiplication facts for one number Print the multiplication table for the number 6, from 6x1 to 6x10.
Hint 1 (-3): One loop is enough here since only one number varies.
Hint 2 (-5): Loop j from 1 to 10 and compute 6 * j.
Hint 3 (-8): for (let j = 1; j <= 10; j++) { console.log("6 x " + j + " = " + (6 * j)); }
🟡 Medium (20 pts) — while loop with a condition change Using while, keep doubling a number starting at 1 until it exceeds 100, printing each value.
Hint 1 (-3): The condition should check against 100.
Hint 2 (-5): Double the value inside the loop body.
Hint 3 (-8): let n = 1; while (n <= 100) { console.log(n); n = n * 2; }
🟠 Hard (35 pts) — Count digits of a number using a loop Given n = 4827, count how many digits it has using a while loop (no .toString() shortcuts).
Hint 1 (-5): Repeated division by 10 removes one digit at a time.
Hint 2 (-8): Use Math.floor(n / 10) to drop the last digit, and count each pass.
Hint 3 (-12): let count = 0; while (n > 0) { n = Math.floor(n / 10); count++; } console.log(count);
🟠 Hard (35 pts) — Find the first multiple Using a loop, find and print the first number greater than 200 that is divisible by 7.
Hint 1 (-5): Start counting from 201 upward.
Hint 2 (-8): Check divisibility with % inside the loop, and break once found.
Hint 3 (-12): for (let i = 201; ; i++) { if (i % 7 === 0) { console.log(i); break; } }
🟠 Hard (35 pts) — Combine break and continue Print numbers 1 to 30, skipping multiples of 3, but stop completely once you reach 25.
Hint 1 (-5): You need both continue and break in the same loop.
Hint 2 (-8): Check the stopping condition before the skipping condition.
Hint 3 (-12): for (let i = 1; i <= 30; i++) { if (i === 25) break; if (i % 3 === 0) continue; console.log(i); }
🔴 Extreme (60 pts) — Simulate compound interest Starting with 1000, apply 5% growth each round for 10 rounds using a loop, printing the value after every round, and print the final total separately at the end.
Hint 1 (-8): Multiply the current value by 1.05 each pass, don't recompute from the original each time.
Hint 2 (-12): Use a let variable that updates itself across iterations.
Hint 3 (-20): let value = 1000; for (let i = 1; i <= 10; i++) { value = value * 1.05; console.log("Round", i, ":", value); } console.log("Final:", value);
nested-loops
🟢 Easy (10 pts) — Basic double loop Print every pair (i, j) where i and j each go from 1 to 2.
Hint 1 (-2): You need a loop inside a loop.
Hint 2 (-3): The inner loop runs fully for each outer pass.
Hint 3 (-5): for (let i = 1; i <= 2; i++) { for (let j = 1; j <= 2; j++) { console.log(i, j); } }
🟢 Easy (10 pts) — Small multiplication table Print a multiplication table for numbers 1 to 3 (3x3 grid of results).
Hint 1 (-2): Both i and j should range from 1 to 3.
Hint 2 (-3): The result of each cell is i * j.
Hint 3 (-5): for (let i=1;i<=3;i++){ for(let j=1;j<=3;j++){ console.log(i+"x"+j+"="+(i*j)); } }
🟢 Easy (10 pts) — Count total iterations If the outer loop runs 4 times and the inner loop runs 5 times each time, how many total inner passes happen?
Hint 1 (-2): Multiply the two loop counts.
Hint 2 (-3): It's not addition.
Hint 3 (-5): 4 × 5 = 20.
🟢 Easy (10 pts) — Simple star row builder Print 3 rows, where row i (from 1 to 3) contains i stars.
Hint 1 (-2): Build a string in the inner loop.
Hint 2 (-3): Print the built string after the inner loop finishes.
Hint 3 (-5): for (let i=1;i<=3;i++){ let row=""; for(let j=0;j<i;j++){row+="*";} console.log(row); }
🟡 Medium (20 pts) — Full multiplication table (1-10) Print the full multiplication table from 1x1 to 10x10.
Hint 1 (-3): Both loops should go from 1 to 10.
Hint 2 (-5): Format each line clearly, e.g. "i x j = result".
Hint 3 (-8): for (let i=1;i<=10;i++){ for(let j=1;j<=10;j++){ console.log(i+" x "+j+" = "+(i*j)); } }
🟡 Medium (20 pts) — Only even rows Print the multiplication table (1-5) but only for even values of i.
Hint 1 (-3): Add a condition on the outer loop's value.
Hint 2 (-5): Use % to check if i is even before running the inner loop.
Hint 3 (-8): for (let i=1;i<=5;i++){ if(i%2!==0) continue; for(let j=1;j<=5;j++){ console.log(i,j); } }
🟡 Medium (20 pts) — Inverted triangle Print a triangle of stars where the first row has 5 stars and each row has one fewer, down to 1.
Hint 1 (-3): The outer loop should count downward, or you invert the inner loop's bound.
Hint 2 (-5): Try for (let i = 5; i >= 1; i--).
Hint 3 (-8): for(let i=5;i>=1;i--){ let row=""; for(let j=0;j<i;j++){row+="*";} console.log(row); }
🟡 Medium (20 pts) — Break only the inner loop Given nested loops where i and j both go 0 to 2, add a break so that whenever j === 1, only the inner loop stops (not the outer one). Predict the full output.
Hint 1 (-3): break inside the inner loop only affects that loop.
Hint 2 (-5): The outer loop will still complete all of its passes.
Hint 3 (-8): Output pairs will be: (0,0), (1,0), (2,0) — since j never gets past 0 before breaking each time.
🟠 Hard (35 pts) — Coordinate grid with a condition Print every coordinate pair (x, y) from 0 to 4 (both directions) where x + y is exactly 4.
Hint 1 (-5): Nest two loops from 0 to 4 each.
Hint 2 (-8): Add an if inside the inner loop checking the sum.
Hint 3 (-12): for(let x=0;x<=4;x++){ for(let y=0;y<=4;y++){ if(x+y===4) console.log(x,y); } }
🟠 Hard (35 pts) — Diamond shape Print a simple diamond shape made of asterisks using nested loops (upper triangle growing, lower triangle shrinking) for a total height tied to a size of 3.
Hint 1 (-5): You'll need two separate loop blocks: one for the top half (including the middle), one for the bottom half.
Hint 2 (-8): The top half grows the star count each row; the bottom half shrinks it.
Hint 3 (-12): Top: for(let i=1;i<=3;i++) building i stars. Bottom: for(let i=2;i>=1;i--) building i stars.
🟠 Hard (35 pts) — Compare every pair in an array (without duplicates) Given [3, 1, 4], print every unique pair of values (not comparing an item to itself, and not repeating a pair in reverse order).
Hint 1 (-5): The inner loop shouldn't restart from 0 each time.
Hint 2 (-8): Start the inner loop's index at i + 1 instead of 0.
Hint 3 (-12): for(let i=0;i<arr.length;i++){ for(let j=i+1;j<arr.length;j++){ console.log(arr[i], arr[j]); } }
🔴 Extreme (60 pts) — Build a full coordinate map with labels For a 4x4 grid (rows and columns numbered 0-3), print a label for each cell: "corner" if it's in one of the four corners, "edge" if it's on the border but not a corner, and "inside" otherwise — using nested loops and conditions.
Hint 1 (-8): A corner has both its row and column equal to either 0 or the max index (3).
Hint 2 (-12): An edge (non-corner) has exactly one of row or column equal to 0 or 3, not both.
Hint 3 (-20): Check corners first with a combined condition, then check if row or column is 0/3 for edges, otherwise label "inside".
Day 4 — Functions & scope
functions-basics
🟢 Easy (10 pts) — Simple add function Write a function add(a, b) that returns their sum, then call it and print the result.
Hint 1 (-2): Use the function keyword and return.
Hint 2 (-3): Call the function inside console.log.
Hint 3 (-5): function add(a, b) { return a + b; } console.log(add(2, 3));
🟢 Easy (10 pts) — Function with one parameter Write a function triple(n) that returns n * 3.
Hint 1 (-2): One parameter, one return line.
Hint 2 (-3): Multiply the parameter by 3.
Hint 3 (-5): function triple(n) { return n * 3; }
🟢 Easy (10 pts) — No return means undefined Write a function logOnly() that prints "done" but returns nothing, then show what console.log(logOnly()) prints.
Hint 1 (-2): The function itself only contains a console.log.
Hint 2 (-3): Without return, calling it still gives a value when logged.
Hint 3 (-5): It prints "done" then undefined.
🟢 Easy (10 pts) — Default parameter Write a function greet(name = "guest") that returns "Hello, " + name.
Hint 1 (-2): The default goes right in the parameter list.
Hint 2 (-3): Use = inside the parentheses.
Hint 3 (-5): function greet(name = "guest") { return "Hello, " + name; }
🟡 Medium (20 pts) — Boolean-returning function Write isPositive(n) that returns true if n > 0, false otherwise.
Hint 1 (-3): The comparison itself is already a boolean.
Hint 2 (-5): You can return the comparison directly, no if needed.
Hint 3 (-8): function isPositive(n) { return n > 0; }
🟡 Medium (20 pts) — Function using a loop inside Write sumUpTo(n) that returns the sum of all numbers from 1 to n using a loop inside the function.
Hint 1 (-3): Declare an accumulator inside the function.
Hint 2 (-5): Loop from 1 to n, adding each value.
Hint 3 (-8): function sumUpTo(n) { let sum = 0; for (let i = 1; i <= n; i++) sum += i; return sum; }
🟡 Medium (20 pts) — Function calling another function Write square(n) and then sumOfSquares(a, b) that calls square twice and adds the results.
Hint 1 (-3): Write square first, fully working on its own.
Hint 2 (-5): Inside sumOfSquares, call square(a) and square(b).
Hint 3 (-8): function square(n){return n*n;} function sumOfSquares(a,b){return square(a)+square(b);}
🟡 Medium (20 pts) — Three-parameter max Write maxOfThree(a, b, c) that returns the largest of three numbers, without Math.max.
Hint 1 (-3): Compare two at a time.
Hint 2 (-5): First find the max of a and b, then compare that result to c.
Hint 3 (-8): function maxOfThree(a,b,c){ let m = a>b?a:b; return m>c?m:c; } (or with plain ifs).
🟠 Hard (35 pts) — Validate input before computing Write safeDivide(a, b) that returns the division result, but returns "Cannot divide by zero" if b is 0.
Hint 1 (-5): Check the risky condition before doing the operation.
Hint 2 (-8): Use an if at the very start of the function body.
Hint 3 (-12): function safeDivide(a,b){ if(b===0) return "Cannot divide by zero"; return a/b; }
🟠 Hard (35 pts) — Refactor repeated logic Given two separate blocks of code that each check if a number is between 1 and 100, refactor them into a single reusable function isInRange(n).
Hint 1 (-5): Identify exactly what varies between the two blocks (likely just the number itself).
Hint 2 (-8): Turn that varying part into a parameter.
Hint 3 (-12): function isInRange(n) { return n >= 1 && n <= 100; } then call it wherever the check was duplicated.
🟠 Hard (35 pts) — Function returning a formatted string Write formatPrice(name, price) that returns a string like "Book: $15" — combining a label and value neatly.
Hint 1 (-5): Use a template literal or string concatenation.
Hint 2 (-8): Include the $ symbol directly in the string.
Hint 3 (-12): function formatPrice(name, price) { return \${name}: $${price}`; }`
🔴 Extreme (60 pts) — Build a small function toolkit Write three functions that work together: isEven(n), isOdd(n) (using isEven internally, not repeating the logic), and describeParity(n) that returns "even" or "odd" by calling one of the first two.
Hint 1 (-8): isOdd should be the exact opposite of isEven — reuse it with !.
Hint 2 (-12): describeParity should call isEven(n) and choose its return string based on that.
Hint 3 (-20): function isEven(n){return n%2===0;} function isOdd(n){return !isEven(n);} function describeParity(n){return isEven(n)?"even":"odd";}
arrow-functions-scope
🟢 Easy (10 pts) — Convert to arrow Convert function double(n) { return n * 2; } into an arrow function.
Hint 1 (-2): Replace function and the name with const name = .
Hint 2 (-3): Use => after the parameters.
Hint 3 (-5): const double = (n) => n * 2;
🟢 Easy (10 pts) — Implicit return Write an arrow function isNegative(n) using implicit return (no curly braces).
Hint 1 (-2): No return keyword is needed for a single expression.
Hint 2 (-3): The expression itself is the comparison.
Hint 3 (-5): const isNegative = (n) => n < 0;
🟢 Easy (10 pts) — Block scope check Declare let x = 1; inside an if (true) { } block. Can you access x right after the block, outside of it?
Hint 1 (-2): Think about where let variables "live".
Hint 2 (-3): The block's curly braces define the boundary.
Hint 3 (-5): No — x only exists inside that block and causes an error if accessed outside.
🟢 Easy (10 pts) — Arrow with two parameters Write an arrow function multiply(a, b) that returns their product.
Hint 1 (-2): Two parameters need parentheses around them.
Hint 2 (-3): Implicit return works here too.
Hint 3 (-5): const multiply = (a, b) => a * b;
🟡 Medium (20 pts) — Multi-statement arrow function Write an arrow function describeAge(age) that declares a local variable for category ("minor"/"adult") and returns a sentence using it.
Hint 1 (-3): You'll need curly braces since there's more than one statement.
Hint 2 (-5): Don't forget an explicit return this time.
Hint 3 (-8): const describeAge = (age) => { let cat = age>=18?"adult":"minor"; return "You are a(n) "+cat; };
🟡 Medium (20 pts) — Scope error prediction Predict what happens when this runs: function calc(){ let result = 10; return result; } console.log(result);
Hint 1 (-3): result is declared inside the function.
Hint 2 (-5): The last line tries to access it from outside.
Hint 3 (-8): It throws a ReferenceError: result is not defined.
🟡 Medium (20 pts) — Loop variable scope Explain why console.log(i) after a for (let i = 0; i < 5; i++) {...} loop causes an error.
Hint 1 (-3): let inside a for loop's header is scoped to the loop itself.
Hint 2 (-5): The loop's block (and header) forms its own scope boundary.
Hint 3 (-8): i doesn't exist outside the loop when declared with let, so accessing it afterward throws an error.
🟡 Medium (20 pts) — Arrow function inside a function Write a regular function makeGreeter() that returns an arrow function which itself returns "Hi!" when called.
Hint 1 (-3): The outer function's return value is the arrow function itself, not a call to it.
Hint 2 (-5): You then need a second set of parentheses to actually call the returned function.
Hint 3 (-8): function makeGreeter(){ return () => "Hi!"; } console.log(makeGreeter()());
🟠 Hard (35 pts) — Rewrite a multi-line function as an arrow function Convert this into an arrow function, keeping identical behavior: function classify(n) { if (n > 0) return "positive"; return "non-positive"; }
Hint 1 (-5): You'll need braces and an explicit return since there are two possible return paths.
Hint 2 (-8): The structure inside the braces can stay almost the same.
Hint 3 (-12): const classify = (n) => { if (n > 0) return "positive"; return "non-positive"; };
🟠 Hard (35 pts) — Predict a scope chain Given three nested blocks each declaring a variable with the same technique (let value = ...) at different levels, explain which value is used inside the innermost block if you don't redeclare it there.
Hint 1 (-5): Look outward from the innermost block if a name isn't found there.
Hint 2 (-8): JavaScript searches from the innermost scope outward until it finds the variable.
Hint 3 (-12): The innermost block will use the closest enclosing value it can find, not the outermost or the very first one automatically.
🟠 Hard (35 pts) — Fix an accidental global Given function setScore(){ score = 100; } setScore(); console.log(score); explain what's happening and why it's risky, then fix it.
Hint 1 (-5): score was never declared with let/const inside the function.
Hint 2 (-8): Assigning to an undeclared variable creates an accidental global variable (in non-strict mode), which is a bad practice.
Hint 3 (-12): Fix by declaring it properly, e.g. passing/returning it: function setScore(){ let score = 100; return score; }
🔴 Extreme (60 pts) — Build a scoped counter using functions only Without using classes, write a function makeCounter() that returns an arrow function; each time you call the returned function, it should increase and return an internal count, starting from 0 — relying on scope to "remember" the count between calls.
Hint 1 (-8): The count variable needs to live in the outer function's scope, not inside the arrow function itself.
Hint 2 (-12): Every call to the returned arrow function should both update and return that outer variable.
Hint 3 (-20): function makeCounter(){ let count = 0; return () => { count++; return count; }; } const counter = makeCounter(); console.log(counter()); console.log(counter());
Day 5 — Strings
string-basics
🟢 Easy (10 pts) — Get the length Print the length of the string "JavaScript".
Hint 1 (-2): Use the .length property.
Hint 2 (-3): No parentheses are needed for .length.
Hint 3 (-5): console.log("JavaScript".length); // 10
🟢 Easy (10 pts) — First and last character Given let word = "Bootcamp";, print its first and last characters.
Hint 1 (-2): Index 0 gives the first character.
Hint 2 (-3): The last index is length - 1.
Hint 3 (-5): console.log(word[0], word[word.length - 1]);
🟢 Easy (10 pts) — Template literal basics Using a template literal, print "I am 20 years old" from a variable age = 20.
Hint 1 (-2): Use backticks, not regular quotes.
Hint 2 (-3): Insert the variable using ${}.
Hint 3 (-5): console.log(`I am ${age} years old`);
🟢 Easy (10 pts) — Loop through a short word Print each character of "cat" on its own line using a loop.
Hint 1 (-2): Loop from 0 to text.length - 1.
Hint 2 (-3): Use text[i] inside the loop.
Hint 3 (-5): for (let i=0;i<"cat".length;i++) console.log("cat"[i]);
🟡 Medium (20 pts) — Immutability check Predict the output: let s = "dog"; s[0] = "l"; console.log(s);
Hint 1 (-3): Think about whether strings can be changed in place.
Hint 2 (-5): Assigning to an index of a string silently does nothing.
Hint 3 (-8): It still prints "dog", unchanged.
🟡 Medium (20 pts) — Build a sentence with multiple variables Using a template literal, combine name, age, and city variables into one readable sentence.
Hint 1 (-3): You can use ${} multiple times in one template literal.
Hint 2 (-5): Structure the sentence naturally, e.g. "My name is X, I am Y, and I live in Z."
Hint 3 (-8): console.log(`My name is ${name}, I am ${age}, and I live in ${city}.`);
🟡 Medium (20 pts) — Case-sensitive comparison Predict the output of console.log("Apple" === "apple"); and explain why.
Hint 1 (-3): String comparison checks every character exactly.
Hint 2 (-5): Uppercase and lowercase letters are different characters to JavaScript.
Hint 3 (-8): It prints false, because "A" and "a" are not the same character.
🟡 Medium (20 pts) — Find the middle character Given a string with an odd length, print its middle character using its length and index math.
Hint 1 (-3): The middle index relates to half of the length.
Hint 2 (-5): Use Math.floor(text.length / 2).
Hint 3 (-8): let text = "level"; console.log(text[Math.floor(text.length / 2)]); // "v"
🟠 Hard (35 pts) — Build your own .length-like counter Without using .length, count the characters of a string by looping until text[i] becomes undefined.
Hint 1 (-5): Use a while loop with a counter starting at 0.
Hint 2 (-8): Keep looping while text[count] !== undefined.
Hint 3 (-12): let count = 0; while (text[count] !== undefined) count++; console.log(count);
🟠 Hard (35 pts) — Print every other character Given a word, print only the characters at even indexes (0, 2, 4, ...).
Hint 1 (-5): Use a loop with a step of 2 instead of 1.
Hint 2 (-8): Modify the loop's update expression.
Hint 3 (-12): for (let i = 0; i < word.length; i += 2) console.log(word[i]);
🟠 Hard (35 pts) — Build a string manually in reverse using a loop Without using any built-in reverse trick, build the reverse of a string character by character using a for loop and concatenation.
Hint 1 (-5): Loop backward from the last index to 0.
Hint 2 (-8): Add each character to a growing result string.
Hint 3 (-12): let result=""; for(let i=text.length-1;i>=0;i--){ result+=text[i]; } console.log(result);
🔴 Extreme (60 pts) — Character frequency map (without objects yet) Given a word, print each unique character it contains along with how many times it appears, using only loops, strings, and .includes() (no objects — you'll use objects for this next week, this is a manual first pass).
Hint 1 (-8): You'll need to track which characters you've already reported, perhaps in a separate "seen" string.
Hint 2 (-12): For each character not yet in "seen", count its occurrences with a nested loop, then add it to "seen".
Hint 3 (-20): Outer loop over each character; if !seen.includes(char), run an inner loop to count matches in the whole word, print the result, then seen += char.
string-methods
🟢 Easy (10 pts) — Uppercase a word Print "javascript" converted to uppercase.
Hint 1 (-2): Use a string method.
Hint 2 (-3): The method name describes exactly what it does.
Hint 3 (-5): console.log("javascript".toUpperCase());
🟢 Easy (10 pts) — Check for a substring Check if "hello world" includes the word "world".
Hint 1 (-2): Use .includes().
Hint 2 (-3): Pass the substring as the argument.
Hint 3 (-5): console.log("hello world".includes("world")); // true
🟢 Easy (10 pts) — Trim whitespace Given " hi ", print it trimmed, with quotes around it so you can see the exact result.
Hint 1 (-2): Use .trim().
Hint 2 (-3): Wrap the result with extra quote characters for clarity, or just print it plainly.
Hint 3 (-5): console.log(" hi ".trim()); // "hi"
🟢 Easy (10 pts) — Slice the first 3 characters Given "JavaScript", print only the first 3 characters using .slice().
Hint 1 (-2): .slice(start, end) — think about what end value gives you 3 characters.
Hint 2 (-3): Starting from 0.
Hint 3 (-5): console.log("JavaScript".slice(0, 3)); // "Jav"
🟡 Medium (20 pts) — Chain two methods Given " HELLO ", print it trimmed AND lowercase, in a single chained expression.
Hint 1 (-3): You can call .trim() then immediately call another method on the result.
Hint 2 (-5): Order matters less here, but try .trim().toLowerCase().
Hint 3 (-8): console.log(" HELLO ".trim().toLowerCase()); // "hello"
🟡 Medium (20 pts) — Find and report a position Given "banana", find and print the index of the first "n".
Hint 1 (-3): Use .indexOf().
Hint 2 (-5): Pass the character you're looking for.
Hint 3 (-8): console.log("banana".indexOf("n")); // 2
🟡 Medium (20 pts) — Split a sentence into words Given "core javascript is fun", split it into an array of words and print the array.
Hint 1 (-3): Use .split() with a space as the separator.
Hint 2 (-5): The result is an array, printable directly.
Hint 3 (-8): console.log("core javascript is fun".split(" "));
🟡 Medium (20 pts) — Extract a file extension Given "photo.png", use .slice() and .indexOf() together to extract just "png".
Hint 1 (-3): Find the position of the "." first.
Hint 2 (-5): Slice starting just after that position.
Hint 3 (-8): let name="photo.png"; let dot=name.indexOf("."); console.log(name.slice(dot+1));
🟠 Hard (35 pts) — Case-insensitive includes check Given "Hello World", check if it includes "WORLD" regardless of case (a direct .includes("WORLD") would fail).
Hint 1 (-5): Convert both sides to the same case before comparing.
Hint 2 (-8): Lowercase the main string and the search term.
Hint 3 (-12): console.log("Hello World".toLowerCase().includes("world".toLowerCase()));
🟠 Hard (35 pts) — Count words in a sentence Given a sentence, count how many words it has using .split() and .length (assume single spaces between words, no extra punctuation).
Hint 1 (-5): Split first, then check the resulting array's size.
Hint 2 (-8): .length on an array works the same way as on a string.
Hint 3 (-12): let sentence="core javascript rocks"; console.log(sentence.split(" ").length); // 3
🟠 Hard (35 pts) — Capitalize the first letter Given "javascript", produce "Javascript" (only the first letter capitalized) using .slice() and .toUpperCase().
Hint 1 (-5): You need to handle the first character separately from the rest.
Hint 2 (-8): Uppercase just the first character, then append the rest unchanged.
Hint 3 (-12): let word="javascript"; console.log(word[0].toUpperCase() + word.slice(1));
🔴 Extreme (60 pts) — Clean and normalize messy input Given " HeLLo WoRLD!! ", write code that: trims it, lowercases it, and removes the exclamation marks, ending with a clean, normal-looking sentence (you may use .split() and .join() creatively, or repeated .replace()-like logic using only allowed methods — note: .replace() is fine to use here even though it's beyond the core list, OR do it manually with a loop rebuilding the string character by character, skipping "!" characters).
Hint 1 (-8): Start with .trim().toLowerCase() to handle the easy part first.
Hint 2 (-12): For removing "!" manually, loop through the string and only append characters that aren't "!".
Hint 3 (-20): let s = " HeLLo WoRLD!! ".trim().toLowerCase(); let clean=""; for(let i=0;i<s.length;i++){ if(s[i] !== "!") clean += s[i]; } console.log(clean);
string-challenges
🟢 Easy (10 pts) — Count one vowel type Count how many times the letter "a" appears in "banana" (not all vowels, just "a").
Hint 1 (-2): Loop through and compare each character to "a".
Hint 2 (-3): Increase a counter on each match.
Hint 3 (-5): let count=0; for(let i=0;i<"banana".length;i++){ if("banana"[i]==="a") count++; } console.log(count);
🟢 Easy (10 pts) — Reverse a short word Reverse the word "cat" using a loop (don't just type "tac").
Hint 1 (-2): Loop backward from the last index.
Hint 2 (-3): Build a new string by appending each character.
Hint 3 (-5): let r=""; for(let i=2;i>=0;i--){ r+="cat"[i]; } console.log(r);
🟢 Easy (10 pts) — Check a simple palindrome Check if "level" is a palindrome using a reverse function you write.
Hint 1 (-2): Reverse the string first, then compare.
Hint 2 (-3): Use === for the comparison.
Hint 3 (-5): Reverse "level" and compare it to the original — they should match.
🟢 Easy (10 pts) — Count all vowels in a short word Count all vowels (a, e, i, o, u) in "orange".
Hint 1 (-2): Check each character against a string of vowels.
Hint 2 (-3): Use .includes() on the vowels string.
Hint 3 (-5): For each character, check "aeiou".includes(char.toLowerCase()).
🟡 Medium (20 pts) — Case-insensitive palindrome Check if "Level" (capital L) is a palindrome, accounting for case.
Hint 1 (-3): Lowercase the string before checking.
Hint 2 (-5): Reverse the lowercase version, not the original.
Hint 3 (-8): function isPal(t){ let l=t.toLowerCase(); /* reverse l and compare */ }
🟡 Medium (20 pts) — Count consonants Count how many consonants (non-vowel letters) are in "programming".
Hint 1 (-3): A consonant is a letter that is NOT a vowel.
Hint 2 (-5): Use ! with your vowel check.
Hint 3 (-8): For each letter, if !"aeiou".includes(char.toLowerCase()), count it.
🟡 Medium (20 pts) — Find the longest word in a sentence Given a sentence, split it into words and find the longest one using the max-value loop pattern.
Hint 1 (-3): Split the sentence into an array first.
Hint 2 (-5): Compare each word's .length to find the biggest.
Hint 3 (-8): Use the same "start with first, replace if bigger" pattern from array traversal, but on .length of each word.
🟡 Medium (20 pts) — Count a specific word's occurrences Given "the cat sat on the mat with the hat", count how many times the word "the" appears (not the letter "t").
Hint 1 (-3): Split the sentence into words first.
Hint 2 (-5): Compare each whole word to "the", not each character.
Hint 3 (-8): Loop through the split array and use === on each word.
🟠 Hard (35 pts) — Palindrome ignoring spaces Check if "race car" is a palindrome once spaces are ignored (this should return true).
Hint 1 (-5): You need to remove spaces before checking.
Hint 2 (-8): Build a new string manually, skipping any space characters, then lowercase and reverse it.
Hint 3 (-12): Loop through, skip " " characters while building a cleaned string, then apply your normal palindrome check to that cleaned string.
🟠 Hard (35 pts) — Find all indexes of a letter Given "mississippi", find and print every index where the letter "s" appears (not just the first one).
Hint 1 (-5): Loop through every character, don't stop at the first match.
Hint 2 (-8): Push or log each matching index as you find it.
Hint 3 (-12): for(let i=0;i<word.length;i++){ if(word[i]==="s") console.log(i); }
🟠 Hard (35 pts) — Check if two words are anagrams Given "listen" and "silent", determine if they're anagrams (contain exactly the same letters, possibly in a different order) — without sorting (sorting isn't in Core JS scope here), using counting instead.
Hint 1 (-5): First check if both words have the same length — a quick early exit.
Hint 2 (-8): For each letter in the first word, count its occurrences in both words and compare.
Hint 3 (-12): If lengths match, loop through each character of word 1, count its occurrences in word 1 and in word 2 using your countLetter function — they must be equal for every character.
🔴 Extreme (60 pts) — Longest palindromic word in a sentence Given a sentence, split it into words, and find the longest word that is ALSO a palindrome — if none exist, print a clear message saying so.
Hint 1 (-8): Combine three earlier ideas: .split(), your isPalindrome function, and the max-length search pattern.
Hint 2 (-12): Loop through the words, filtering to keep only palindromes first (mentally or with a temporary array), then find the longest among just those.
Hint 3 (-20): Track a let longest = null; variable; for each word, if isPalindrome(word) and (longest === null or word.length > longest.length), update longest; print longest or a "no palindrome found" message if it's still null.
Day 6 — Arrays
arrays-basics
🟢 Easy (10 pts) — Create and print an array Create an array with your 3 favorite foods and print it.
Hint 1 (-2): Use square brackets.
Hint 2 (-3): Separate items with commas.
Hint 3 (-5): let foods = ["pizza", "sushi", "tacos"]; console.log(foods);
🟢 Easy (10 pts) — Access by index Given let nums = [10, 20, 30];, print the second item.
Hint 1 (-2): Indexes start at 0.
Hint 2 (-3): The second item is at index 1.
Hint 3 (-5): console.log(nums[1]); // 20
🟢 Easy (10 pts) — Push a new item Given let arr = [1, 2];, add 3 to the end and print the result.
Hint 1 (-2): Use .push().
Hint 2 (-3): It modifies the array directly, no reassignment needed.
Hint 3 (-5): arr.push(3); console.log(arr); // [1, 2, 3]
🟢 Easy (10 pts) — Pop the last item Given let arr = [5, 6, 7];, remove the last item and print both the removed value and the remaining array.
Hint 1 (-2): Use .pop(), which returns the removed value.
Hint 2 (-3): Store the returned value in a variable before printing.
Hint 3 (-5): let last = arr.pop(); console.log(last, arr);
🟡 Medium (20 pts) — Change an item by index Given let colors = ["red", "green", "blue"];, change "green" to "yellow" and print the array.
Hint 1 (-3): Access the item by its index, not its value.
Hint 2 (-5): Assign a new value directly to that index.
Hint 3 (-8): colors[1] = "yellow"; console.log(colors);
🟡 Medium (20 pts) — Access the last item generically Without knowing the array's exact size in advance, print its last item using .length.
Hint 1 (-3): The last valid index is always length - 1.
Hint 2 (-5): This works no matter how many items the array has.
Hint 3 (-8): console.log(arr[arr.length - 1]);
🟡 Medium (20 pts) — const array mutation Explain, with an example, why this code works even though arr is declared with const: const arr = [1, 2]; arr.push(3);
Hint 1 (-3): const protects the variable binding, not the array's contents.
Hint 2 (-5): .push() doesn't reassign arr to a new array — it mutates the existing one.
Hint 3 (-8): This only breaks if you try arr = [4, 5]; (reassignment), which const truly forbids.
🟡 Medium (20 pts) — Build an array with a loop Using a loop and .push(), build an array containing the squares of 1 through 5 ([1, 4, 9, 16, 25]).
Hint 1 (-3): Start with an empty array before the loop.
Hint 2 (-5): Push i * i on each pass.
Hint 3 (-8): let squares=[]; for(let i=1;i<=5;i++){ squares.push(i*i); } console.log(squares);
🟠 Hard (35 pts) — Swap two items in an array Given let arr = [1, 2, 3, 4];, swap the values at index 0 and index 3, resulting in [4, 2, 3, 1].
Hint 1 (-5): You'll need a temporary variable, just like swapping regular variables.
Hint 2 (-8): Store one value before overwriting it.
Hint 3 (-12): let temp = arr[0]; arr[0] = arr[3]; arr[3] = temp; console.log(arr);
🟠 Hard (35 pts) — Remove an item by value (not index) Given let arr = [10, 20, 30, 40];, remove the value 30 (wherever it is) by rebuilding a new array that excludes it, without using .filter() or .splice().
Hint 1 (-5): Loop through and build a new array, skipping the target value.
Hint 2 (-8): Use .push() for everything except the matching value.
Hint 3 (-12): let result=[]; for(let i=0;i<arr.length;i++){ if(arr[i]!==30) result.push(arr[i]); } console.log(result);
🟠 Hard (35 pts) — Insert a value at a specific index manually Given let arr = [1, 2, 4, 5];, insert 3 between 2 and 4 by building a new array manually (no .splice()).
Hint 1 (-5): Loop through and copy items, but insert the new value at the right point.
Hint 2 (-8): You'll need to track the position where insertion should happen.
Hint 3 (-12): let result=[]; for(let i=0;i<arr.length;i++){ if(i===2) result.push(3); result.push(arr[i]); } console.log(result);
🔴 Extreme (60 pts) — Rotate an array manually Given let arr = [1, 2, 3, 4, 5];, produce a "rotated" array where the first item moves to the end: [2, 3, 4, 5, 1] — without using any built-in shift/rotate methods.
Hint 1 (-8): Save the first item in a separate variable before building the rest.
Hint 2 (-12): Build a new array starting from index 1 through the end, then push the saved first item at the very end.
Hint 3 (-20): let first = arr[0]; let result=[]; for(let i=1;i<arr.length;i++){ result.push(arr[i]); } result.push(first); console.log(result);
array-traversal
🟢 Easy (10 pts) — Print every item Given let arr = [4, 8, 15];, print each item on its own line using a loop.
Hint 1 (-2): Loop from 0 to arr.length - 1.
Hint 2 (-3): Use arr[i] inside the loop.
Hint 3 (-5): for (let i=0;i<arr.length;i++) console.log(arr[i]);
🟢 Easy (10 pts) — Basic sum Compute the sum of [2, 4, 6, 8] using a loop.
Hint 1 (-2): Start an accumulator at 0.
Hint 2 (-3): Add each item during the loop.
Hint 3 (-5): let sum=0; for(let i=0;i<arr.length;i++) sum+=arr[i]; console.log(sum);
🟢 Easy (10 pts) — Basic average Compute the average of [10, 20, 30] using your sum logic divided by the array's length.
Hint 1 (-2): First compute the sum, then divide.
Hint 2 (-3): Divide by .length, not a hardcoded number.
Hint 3 (-5): console.log(sum / arr.length); (after computing sum with a loop)
🟢 Easy (10 pts) — Basic max Find the maximum value in [3, 9, 1, 7] using a loop.
Hint 1 (-2): Start max as the first item.
Hint 2 (-3): Compare and update inside the loop.
Hint 3 (-5): let max=arr[0]; for(let i=1;i<arr.length;i++){ if(arr[i]>max) max=arr[i]; } console.log(max);
🟡 Medium (20 pts) — Basic min Find the minimum value in [3, 9, 1, 7] using the same pattern as max, but flipped.
Hint 1 (-3): Start min as the first item too.
Hint 2 (-5): Flip the comparison operator.
Hint 3 (-8): let min=arr[0]; for(let i=1;i<arr.length;i++){ if(arr[i]<min) min=arr[i]; } console.log(min);
🟡 Medium (20 pts) — Count positive numbers Given [-3, 5, -1, 8, 0], count how many values are strictly positive.
Hint 1 (-3): Use a counter and an if inside the loop.
Hint 2 (-5): "Positive" means strictly greater than 0, so 0 doesn't count.
Hint 3 (-8): let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]>0) count++; } console.log(count);
🟡 Medium (20 pts) — Range of an array Write a function range(arr) that returns the difference between the max and the min of the array.
Hint 1 (-3): You'll need both a max and min calculation.
Hint 2 (-5): You can reuse maxArray and minArray functions if you already wrote them.
Hint 3 (-8): function range(arr){ return maxArray(arr) - minArray(arr); }
🟡 Medium (20 pts) — Average excluding one value Compute the average of an array while excluding the maximum value.
Hint 1 (-3): Find the max first, then sum everything except it.
Hint 2 (-5): Skip the max value with an if inside your sum loop — but be careful if the max appears more than once.
Hint 3 (-8): For simplicity, assume the max appears only once: sum all values except the first occurrence equal to max, then divide by length - 1.
🟠 Hard (35 pts) — Weighted-feel average (manual) Given an array of numbers, compute the average but round it to 2 decimal places without using .toFixed() beyond basic math (you may use .toFixed(), it's a simple built-in, or use Math.round(value * 100) / 100).
Hint 1 (-5): Compute the plain average first.
Hint 2 (-8): Multiply by 100, round, then divide by 100 to get 2 decimals.
Hint 3 (-12): let avg = sum/arr.length; let rounded = Math.round(avg*100)/100; console.log(rounded);
🟠 Hard (35 pts) — Find the index of the maximum (not just the value) Given [4, 9, 2, 9, 1], find the index of the FIRST occurrence of the maximum value.
Hint 1 (-5): Track both the max value AND its index as you loop.
Hint 2 (-8): Update both together whenever you find something bigger — never update on a tie.
Hint 3 (-12): let max=arr[0], maxIndex=0; for(let i=1;i<arr.length;i++){ if(arr[i]>max){ max=arr[i]; maxIndex=i; } } console.log(maxIndex);
🟠 Hard (35 pts) — Sum only even-indexed items Given an array, sum only the values at even indexes (0, 2, 4, ...), not even-valued items.
Hint 1 (-5): This is about the index, not the value.
Hint 2 (-8): Use a loop step of 2, or check i % 2 === 0.
Hint 3 (-12): let sum=0; for(let i=0;i<arr.length;i+=2){ sum+=arr[i]; } console.log(sum);
🔴 Extreme (60 pts) — Compute sum, average, min, and max in a single pass Write one function stats(arr) that returns an object-like summary (you can just print four labeled values for now, since objects come next week) using only ONE loop through the array, not four separate loops.
Hint 1 (-8): Initialize all four accumulators/candidates before the loop starts.
Hint 2 (-12): Update sum, max, and min all inside the same loop body, on the same pass.
Hint 3 (-20): let sum=arr[0], max=arr[0], min=arr[0]; for(let i=1;i<arr.length;i++){ sum+=arr[i]; if(arr[i]>max) max=arr[i]; if(arr[i]<min) min=arr[i]; } sum+=0; /* adjust sum init properly */ console.log("sum",sum,"avg",sum/arr.length,"max",max,"min",min); (Be careful to initialize sum correctly — start at 0 and loop from index 0, while max/min start at arr[0] and loop from index 1.)
array-challenges
🟢 Easy (10 pts) — Find an index Given [5, 8, 2, 9], find the index of the value 2 using a loop.
Hint 1 (-2): Compare each item to the target.
Hint 2 (-3): Return as soon as you find a match.
Hint 3 (-5): function findIndex(arr,t){ for(let i=0;i<arr.length;i++){ if(arr[i]===t) return i; } return -1; }
🟢 Easy (10 pts) — Count even numbers Given [1, 2, 3, 4, 5, 6], count how many are even.
Hint 1 (-2): Use % to check evenness.
Hint 2 (-3): Increment a counter on each match.
Hint 3 (-5): let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) count++; } console.log(count);
🟢 Easy (10 pts) — Reverse an array Reverse [1, 2, 3] manually using a backward loop and .push().
Hint 1 (-2): Start a new empty array.
Hint 2 (-3): Loop from the last index down to 0, pushing each item.
Hint 3 (-5): let r=[]; for(let i=arr.length-1;i>=0;i--) r.push(arr[i]); console.log(r);
🟢 Easy (10 pts) — Filter values above a limit Given [4, 15, 8, 23, 1], build a new array of only values greater than 10.
Hint 1 (-2): Loop through and check the condition.
Hint 2 (-3): Push matches into a new array.
Hint 3 (-5): let r=[]; for(let i=0;i<arr.length;i++){ if(arr[i]>10) r.push(arr[i]); } console.log(r);
🟡 Medium (20 pts) — Count occurrences of a specific value Given [1, 2, 2, 3, 2, 4], count how many times 2 appears.
Hint 1 (-3): Similar to counting even numbers, but comparing to a fixed value.
Hint 2 (-5): Use === inside your loop's condition.
Hint 3 (-8): let count=0; for(let i=0;i<arr.length;i++){ if(arr[i]===2) count++; } console.log(count);
🟡 Medium (20 pts) — Check if a value exists (boolean, not index) Write contains(arr, value) that returns true/false instead of an index.
Hint 1 (-3): You can build this on top of your findIndex logic.
Hint 2 (-5): Compare the result of findIndex to -1.
Hint 3 (-8): function contains(arr,v){ return findIndex(arr,v) !== -1; }
🟡 Medium (20 pts) — Find all indexes of a value Given [3, 7, 3, 9, 3], find and print every index where 3 appears (not just the first).
Hint 1 (-3): Don't return on the first match — collect all matches instead.
Hint 2 (-5): Push matching indexes into a results array.
Hint 3 (-8): let result=[]; for(let i=0;i<arr.length;i++){ if(arr[i]===3) result.push(i); } console.log(result);
🟡 Medium (20 pts) — Remove duplicates manually Given [1, 2, 2, 3, 1, 4], build a new array with duplicates removed, keeping only the first occurrence of each value (no Set).
Hint 1 (-3): For each item, check if it's already in your result array before adding it.
Hint 2 (-5): You'll need a helper check like your own contains function.
Hint 3 (-8): let result=[]; for(let i=0;i<arr.length;i++){ if(!contains(result, arr[i])) result.push(arr[i]); } console.log(result);
🟠 Hard (35 pts) — Find the second largest value Given [4, 9, 2, 9, 7], find the second largest DISTINCT value (so if the max repeats, skip the duplicate).
Hint 1 (-5): Find the max first, then look for the largest value that is strictly smaller than the max.
Hint 2 (-8): You'll essentially run the max-finding pattern twice, with an added exclusion condition the second time.
Hint 3 (-12): First pass finds max. Second pass: let second = -Infinity; for(...){ if(arr[i] < max && arr[i] > second) second = arr[i]; }
🟠 Hard (35 pts) — Merge two arrays without duplicates Given [1, 2, 3] and [3, 4, 5], build a single array containing all unique values from both, in order encountered.
Hint 1 (-5): Combine the arrays conceptually by looping through both, one after another.
Hint 2 (-8): Use your duplicate-check logic (contains) before adding each value.
Hint 3 (-12): Loop through array 1 pushing everything (they're all unique to start), then loop through array 2, pushing only values not already in the result.
🟠 Hard (35 pts) — Group numbers by even/odd (two arrays) Given [1, 2, 3, 4, 5, 6], build two separate arrays: one containing only the even numbers, one containing only the odd numbers.
Hint 1 (-5): Start two empty arrays before the loop.
Hint 2 (-8): Inside the loop, decide which array to push into based on % 2.
Hint 3 (-12): let evens=[], odds=[]; for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) evens.push(arr[i]); else odds.push(arr[i]); }
🔴 Extreme (60 pts) — Find the longest run of consecutive equal values Given [1, 1, 2, 2, 2, 3, 1, 1, 1, 1], find the length of the longest run of the same value repeated consecutively (in this case, four 1's at the end, so the answer is 4).
Hint 1 (-8): Track a "current run length" and a "longest run so far" as you loop.
Hint 2 (-12): Compare each item to the previous one; if equal, extend the current run; if not, reset it to 1.
Hint 3 (-20): let longest=1, current=1; for(let i=1;i<arr.length;i++){ if(arr[i]===arr[i-1]) current++; else current=1; if(current>longest) longest=current; } console.log(longest);
Day 7 — Objects & arrays of objects
objects-basics
🟢 Easy (10 pts) — Create and access Create an object person with name and age, then print the name.
Hint 1 (-2): Use curly braces and key: value pairs.
Hint 2 (-3): Access with dot notation.
Hint 3 (-5): let person = {name:"Sara", age:20}; console.log(person.name);
🟢 Easy (10 pts) — Update a property Given let car = {brand:"Toyota"};, change brand to "Honda" and print the object.
Hint 1 (-2): Assign directly to the existing key.
Hint 2 (-3): No need to recreate the whole object.
Hint 3 (-5): car.brand = "Honda"; console.log(car);
🟢 Easy (10 pts) — Add a new property Given let book = {title:"JS Basics"};, add a price property of 20.
Hint 1 (-2): You can add a property that doesn't exist yet the same way you'd update one.
Hint 2 (-3): Use dot notation with the new key name.
Hint 3 (-5): book.price = 20; console.log(book);
🟢 Easy (10 pts) — Bracket notation basics Given let key = "age"; let user = {age: 25};, print user's age using bracket notation and the key variable.
Hint 1 (-2): You can't use dot notation with a variable key.
Hint 2 (-3): Use square brackets with key inside (no quotes, since it's a variable).
Hint 3 (-5): console.log(user[key]); // 25
🟡 Medium (20 pts) — Check property existence Given let item = {name:"Pen"};, check if it has a price property using the in operator.
Hint 1 (-3): The property name goes in quotes on the left of in.
Hint 2 (-5): The object goes on the right.
Hint 3 (-8): console.log("price" in item); // false
🟡 Medium (20 pts) — Delete a property Given let user = {name:"Sara", temp:"remove me"};, delete the temp property and print the result.
Hint 1 (-3): Use the delete keyword.
Hint 2 (-5): It goes right before the property access.
Hint 3 (-8): delete user.temp; console.log(user);
🟡 Medium (20 pts) — Nested access Given let car = {brand:"Toyota", specs:{year:2022, color:"blue"}};, print just the color.
Hint 1 (-3): You need two levels of dot notation.
Hint 2 (-5): Go through specs first.
Hint 3 (-8): console.log(car.specs.color); // "blue"
🟡 Medium (20 pts) — Build an object from separate variables Given let name="Omar", age=22;, build an object using these variables as the values for name and age keys.
Hint 1 (-3): You can reuse variable names as key names directly.
Hint 2 (-5): {name: name, age: age} works, though there's a shorthand.
Hint 3 (-8): let person = {name, age}; console.log(person); (shorthand works when key and variable names match)
🟠 Hard (35 pts) — Dynamic key access with a loop Given let scores = {math:90, art:70, sport:85}; and an array of subject names, print each score using bracket notation inside a loop.
Hint 1 (-5): Loop over the array of subject names, not the object directly.
Hint 2 (-8): Use bracket notation with the loop variable as the key.
Hint 3 (-12): let subjects=["math","art","sport"]; for(let i=0;i<subjects.length;i++){ console.log(subjects[i], scores[subjects[i]]); }
🟠 Hard (35 pts) — Compare two objects' properties Given let a={x:1,y:2}; let b={x:1,y:3};, write code that checks if their x properties are equal AND their y properties are equal, printing true/false for the whole comparison.
Hint 1 (-5): Compare each shared property individually.
Hint 2 (-8): Combine both comparisons with &&.
Hint 3 (-12): console.log(a.x === b.x && a.y === b.y); // false
🟠 Hard (35 pts) — Update a nested property conditionally Given let product = {name:"Shoe", stock:{quantity:5}};, write code that decreases stock.quantity by 1, but only if it's greater than 0.
Hint 1 (-5): Check the nested property inside an if.
Hint 2 (-8): Update it the same way you'd update any nested value.
Hint 3 (-12): if (product.stock.quantity > 0) { product.stock.quantity -= 1; }
🔴 Extreme (60 pts) — Build and validate a small profile object Create an object representing a user profile with name, age, email (fake is fine), and isActive. Then write a function isValidProfile(profile) that returns true only if name is a non-empty string, age is a number greater than 0, and isActive is a boolean — checking each with typeof and appropriate comparisons.
Hint 1 (-8): Check each field's type separately using typeof, combined with &&.
Hint 2 (-12): For "non-empty string", also check .length > 0 in addition to typeof === "string".
Hint 3 (-20): function isValidProfile(p){ return typeof p.name==="string" && p.name.length>0 && typeof p.age==="number" && p.age>0 && typeof p.isActive==="boolean"; }
array-of-objects
🟢 Easy (10 pts) — Access a field in the first record Given an array of 2 student objects, print the name of the first one.
Hint 1 (-2): Access by index first, then by property.
Hint 2 (-3): students[0] gives the object; add .name after it.
Hint 3 (-5): console.log(students[0].name);
🟢 Easy (10 pts) — Loop and print all names Given an array of student objects, print every student's name using a loop.
Hint 1 (-2): Loop through the array by index.
Hint 2 (-3): Access .name on each item inside the loop.
Hint 3 (-5): for(let i=0;i<students.length;i++){ console.log(students[i].name); }
🟢 Easy (10 pts) — Print two fields per record Given an array of product objects with name and price, print both fields for every product, on one line each.
Hint 1 (-2): Use console.log with two arguments per line.
Hint 2 (-3): Access both properties inside the same loop iteration.
Hint 3 (-5): for(let i=0;i<products.length;i++){ console.log(products[i].name, products[i].price); }
🟢 Easy (10 pts) — Count how many records exist Print how many items are in an array of objects, without hardcoding the number.
Hint 1 (-2): Use .length on the array itself, not on any object inside it.
Hint 2 (-3): This works the same as with any other array.
Hint 3 (-5): console.log(students.length);
🟡 Medium (20 pts) — Find a record by exact match Write findById(list, id) that returns the whole matching object, or null if not found.
Hint 1 (-3): Loop and compare list[i].id to the target.
Hint 2 (-5): Return the object itself, not just true.
Hint 3 (-8): function findById(list,id){ for(let i=0;i<list.length;i++){ if(list[i].id===id) return list[i]; } return null; }
🟡 Medium (20 pts) — Sum a numeric field across records Given an array of product objects with price, compute the total price of all products.
Hint 1 (-3): This is the same sum pattern as arrays of numbers, just reading a property.
Hint 2 (-5): Add list[i].price each time, not list[i] itself.
Hint 3 (-8): let total=0; for(let i=0;i<list.length;i++){ total+=list[i].price; } console.log(total);
🟡 Medium (20 pts) — Filter records by a boolean field Given products with an inStock boolean, build a new array with only the ones currently in stock.
Hint 1 (-3): Use the manual-filter pattern from arrays, reading a property this time.
Hint 2 (-5): The condition is simply list[i].inStock (already a boolean, no need for === true).
Hint 3 (-8): let result=[]; for(let i=0;i<list.length;i++){ if(list[i].inStock) result.push(list[i]); } console.log(result);
🟡 Medium (20 pts) — Find the youngest student Given an array of student objects with age, find and print the object of the youngest student.
Hint 1 (-3): This is the min pattern, but comparing .age instead of raw values.
Hint 2 (-5): Start with the first student as your candidate.
Hint 3 (-8): let youngest=list[0]; for(let i=1;i<list.length;i++){ if(list[i].age<youngest.age) youngest=list[i]; } console.log(youngest);
🟠 Hard (35 pts) — Update a specific record's field Given an array of products, find the one named "Pen" and increase its quantity by 10, leaving others unchanged.
Hint 1 (-5): Find the record first (or update it directly while looping).
Hint 2 (-8): Once found, modify its property directly — no need to rebuild the whole array.
Hint 3 (-12): for(let i=0;i<products.length;i++){ if(products[i].name==="Pen"){ products[i].quantity += 10; } }
🟠 Hard (35 pts) — Count records matching a condition Given an array of student objects, count how many students have an age of 20 or older.
Hint 1 (-5): Same counting pattern as before, but the condition checks a property.
Hint 2 (-8): list[i].age >= 20 is your condition.
Hint 3 (-12): let count=0; for(let i=0;i<list.length;i++){ if(list[i].age>=20) count++; } console.log(count);
🟠 Hard (35 pts) — Find the record with the highest value AND its index Given an array of product objects with price, find both the most expensive product's object and its index in the array.
Hint 1 (-5): Track both the best object and its index as you loop, just like the "index of max" array exercise.
Hint 2 (-8): Update both together whenever a new max is found.
Hint 3 (-12): let best=products[0], bestIndex=0; for(let i=1;i<products.length;i++){ if(products[i].price>best.price){ best=products[i]; bestIndex=i; } } console.log(best, bestIndex);
🔴 Extreme (60 pts) — Build a mini leaderboard Given an array of player objects with name and score, write a function that returns a NEW array of just the names, ordered from highest to lowest score, without using .sort() (use your own simple approach — repeatedly finding the current max and removing it conceptually, or building a sorted copy manually with nested loops similar to selection sort, but comparing .score).
Hint 1 (-8): Think of this as selection sort, but the "value" you're comparing is .score, and what you actually collect at the end is .name.
Hint 2 (-12): Make a copy of the array first (so you don't damage the original), then repeatedly find the remaining max-score player, record their name, and mark them as "used" somehow (e.g., set their score to -Infinity after picking them, or track used indexes).
Hint 3 (-20): let copy=[...players]; let leaderboard=[]; for(let i=0;i<copy.length;i++){ let maxIndex=0; for(let j=1;j<copy.length;j++){ if(copy[j].score>copy[maxIndex].score) maxIndex=j; } leaderboard.push(copy[maxIndex].name); copy[maxIndex].score=-Infinity; } console.log(leaderboard);
Day 8 — Search & sorting
linear-search
🟢 Easy (10 pts) — Find a value's index Find the index of 15 in [4, 8, 15, 16, 23] using linear search.
Hint 1 (-2): Loop through comparing each item.
Hint 2 (-3): Return the index as soon as you find a match.
Hint 3 (-5): function linearSearch(arr,t){ for(let i=0;i<arr.length;i++){ if(arr[i]===t) return i; } return -1; }
🟢 Easy (10 pts) — Search for a missing value Search for 99 in [1, 2, 3] and confirm your function correctly returns -1.
Hint 1 (-2): The loop should complete without ever matching.
Hint 2 (-3): Make sure -1 is returned AFTER the loop, not inside it.
Hint 3 (-5): Running linearSearch([1,2,3], 99) should print -1.
🟢 Easy (10 pts) — Search on unsorted data Confirm linear search works correctly on [23, 4, 16, 8] by finding the index of 16.
Hint 1 (-2): Order doesn't matter for linear search.
Hint 2 (-3): It checks every item regardless of position.
Hint 3 (-5): linearSearch([23,4,16,8], 16) should return 2.
🟢 Easy (10 pts) — Search a string array Adapt linear search to find the index of "banana" in ["apple", "banana", "cherry"].
Hint 1 (-2): The comparison logic (===) works the same for strings.
Hint 2 (-3): No changes needed to the function itself.
Hint 3 (-5): linearSearch(["apple","banana","cherry"], "banana") returns 1.
🟡 Medium (20 pts) — Search with a boolean result Write existsInArray(arr, target) that returns true/false instead of an index.
Hint 1 (-3): Build this on top of your existing search function.
Hint 2 (-5): Compare its result to -1.
Hint 3 (-8): function existsInArray(arr,t){ return linearSearch(arr,t) !== -1; }
🟡 Medium (20 pts) — Count matches with linear search logic Modify linear search's idea to count ALL occurrences of a target instead of stopping at the first.
Hint 1 (-3): Don't return immediately on a match.
Hint 2 (-5): Use a counter instead, incremented on each match.
Hint 3 (-8): function countOccurrences(arr,t){ let c=0; for(let i=0;i<arr.length;i++){ if(arr[i]===t) c++; } return c; }
🟡 Medium (20 pts) — Binary search trace Given the sorted array [2, 4, 8, 15, 16, 23], trace binarySearch looking for 8 step by step: what is mid on each iteration?
Hint 1 (-3): Start with low=0, high=5.
Hint 2 (-5): mid = Math.floor((low+high)/2) each time.
Hint 3 (-8): First mid is index 2 (Math.floor((0+5)/2)), which is 8 — found immediately in this case.
🟡 Medium (20 pts) — Why binary search fails here Explain, using a concrete unsorted example, why running binarySearch on unsorted data can give a wrong (or missed) result.
Hint 1 (-3): Binary search eliminates half the array based on a comparison to the middle.
Hint 2 (-5): If the array isn't sorted, the eliminated half might actually contain the target.
Hint 3 (-8): Example: binarySearch([23,4,16,8], 8) may incorrectly discard the half containing 8 because the ordering assumption is broken.
🟠 Hard (35 pts) — Search for the first even number Using the linear search pattern, find the index of the FIRST even number in [1, 3, 5, 8, 9, 10] (not searching for a specific value, but a condition).
Hint 1 (-5): Change the comparison from === to a condition check.
Hint 2 (-8): arr[i] % 2 === 0 is your new "match" condition.
Hint 3 (-12): function findFirstEven(arr){ for(let i=0;i<arr.length;i++){ if(arr[i]%2===0) return i; } return -1; }
🟠 Hard (35 pts) — Search an array of objects by a property Adapt linear search to find the index of the student object with name === "Omar" in an array of student objects.
Hint 1 (-5): Compare a property of each item, not the item itself.
Hint 2 (-8): arr[i].name === target is your condition.
Hint 3 (-12): function findIndexByName(list,name){ for(let i=0;i<list.length;i++){ if(list[i].name===name) return i; } return -1; }
🟠 Hard (35 pts) — Manual binary search implementation from scratch Without looking at any example, implement binarySearch(sortedArr, target) yourself, including the low, high, mid logic.
Hint 1 (-5): You need a loop that keeps narrowing low and high until they cross.
Hint 2 (-8): On each iteration, compare sortedArr[mid] to the target to decide which half to discard.
Hint 3 (-12): The loop condition is while (low <= high), and you adjust low = mid + 1 or high = mid - 1 depending on the comparison.
🔴 Extreme (60 pts) — Compare search cost between linear and binary For a sorted array of 16 elements, manually count (by tracing) how many comparisons linear search would need in the worst case, versus how many binary search would need in the worst case, and explain the pattern you notice.
Hint 1 (-8): Linear search's worst case checks every single element once.
Hint 2 (-12): Binary search's worst case is related to how many times you can divide 16 by 2 before reaching 1.
Hint 3 (-20): Linear search: up to 16 comparisons. Binary search: about 4 comparisons (since 16 → 8 → 4 → 2 → 1, roughly log2(16) = 4) — the pattern is that binary search's cost grows much more slowly as the array size increases.
sorting-basics
🟢 Easy (10 pts) — Trace one bubble sort pass Given [3, 1, 2], manually trace just the FIRST full pass of bubble sort and write the resulting array.
Hint 1 (-2): Compare index 0 and 1 first, then 1 and 2.
Hint 2 (-3): Swap whenever the left value is bigger than the right.
Hint 3 (-5): After comparing (3,1)→swap→[1,3,2], then (3,2)→swap→[1,2,3]. Result after pass 1: [1,2,3].
🟢 Easy (10 pts) — Identify a swap In [5, 2], should bubble sort swap these two values? Why or why not?
Hint 1 (-2): Compare the two values directly.
Hint 2 (-3): Bubble sort swaps when the left is greater than the right.
Hint 3 (-5): Yes, since 5 > 2, they should be swapped to [2, 5].
🟢 Easy (10 pts) — Run bubbleSort on a tiny array Using the bubbleSort function, sort [4, 2] and print the result.
Hint 1 (-2): Call the function with the array as an argument.
Hint 2 (-3): Print the returned value.
Hint 3 (-5): console.log(bubbleSort([4, 2])); // [2, 4]
🟢 Easy (10 pts) — Run selectionSort on a tiny array Using selectionSort, sort [9, 3, 6] and print the result.
Hint 1 (-2): Same calling pattern as bubbleSort.
Hint 2 (-3): Print the function's return value.
Hint 3 (-5): console.log(selectionSort([9, 3, 6])); // [3, 6, 9]
🟡 Medium (20 pts) — Trace selection sort's first pass Given [6, 2, 9, 1], trace the first pass of selection sort: what is minIndex found, and what does the array look like after the swap?
Hint 1 (-3): Scan the whole array for the smallest value first.
Hint 2 (-5): Swap that smallest value into position 0.
Hint 3 (-8): The minimum is 1 at index 3; after swapping with index 0: [1, 2, 9, 6].
🟡 Medium (20 pts) — Sort strings alphabetically (adapt the logic) Adapt bubbleSort to sort an array of strings alphabetically (hint: > and < also work on strings in JavaScript).
Hint 1 (-3): The comparison operators work the same way, just applied to strings.
Hint 2 (-5): No structural changes needed to the algorithm itself.
Hint 3 (-8): bubbleSort(["banana","apple","cherry"]) should give ["apple","banana","cherry"].
🟡 Medium (20 pts) — Count the number of swaps Modify bubbleSort to also count and print how many swaps it performed in total while sorting [5, 1, 4, 2, 8].
Hint 1 (-3): Add a counter variable before the loops.
Hint 2 (-5): Increment it every time an actual swap happens.
Hint 3 (-8): Inside the if (a[j] > a[j+1]) block, add swaps++; alongside the swap code.
🟡 Medium (20 pts) — Sort in descending order Modify bubbleSort (or selectionSort) to sort in descending order instead of ascending.
Hint 1 (-3): Only one comparison operator needs to change.
Hint 2 (-5): Flip > to < (or vice versa) in the swap condition.
Hint 3 (-8): For bubble sort descending: if (a[j] < a[j+1]) { /* swap */ }
🟠 Hard (35 pts) — Sort an array of objects by a numeric field Adapt bubbleSort to sort an array of product objects by their price, ascending.
Hint 1 (-5): The comparison should look at .price instead of the raw item.
Hint 2 (-8): The swap itself still swaps whole objects, not just prices.
Hint 3 (-12): if (a[j].price > a[j+1].price) { let temp=a[j]; a[j]=a[j+1]; a[j+1]=temp; }
🟠 Hard (35 pts) — Detect an already-sorted array early Modify bubbleSort to stop early (using a flag) if a full pass makes zero swaps, since that means the array is already sorted.
Hint 1 (-5): Add a boolean flag before each outer pass, e.g. let swapped = false;.
Hint 2 (-8): Set it to true whenever an actual swap happens, and check it after the inner loop.
Hint 3 (-12): if (!swapped) break; placed right after the inner for loop, inside the outer loop.
🟠 Hard (35 pts) — Verify a sort function's correctness Write a function isSorted(arr) that checks whether an array is fully sorted in ascending order, then use it to verify your bubbleSort output.
Hint 1 (-5): Compare each item to the next one in a loop.
Hint 2 (-8): If any item is greater than the one right after it, it's not sorted.
Hint 3 (-12): function isSorted(arr){ for(let i=0;i<arr.length-1;i++){ if(arr[i]>arr[i+1]) return false; } return true; }
🔴 Extreme (60 pts) — Combine search and sort into one task Given an unsorted array of numbers, write code that: sorts it using bubbleSort or selectionSort, then uses binarySearch on the sorted result to find a target value — printing whether it was found and at what index (in the sorted array).
Hint 1 (-8): The order matters: you must sort BEFORE running binary search.
Hint 2 (-12): Store the sorted result in a new variable, then pass that variable (not the original) into binarySearch.
Hint 3 (-20): let sorted = bubbleSort(unsorted); let index = binarySearch(sorted, target); console.log(index !== -1 ? \Found at index ${index}` : "Not found");`
Day 9 — Mini project SAS
mini-project-brief
🟢 Easy (10 pts) — Define your sample data Create an array of at least 3 objects representing your chosen project theme (products, students, books, etc.) with at least 3 fields each.
Hint 1 (-2): Keep field names consistent across all objects.
Hint 2 (-3): Print the array afterward to visually confirm it looks right.
Hint 3 (-5): Example shape: [{name:"...", price:..., quantity:...}, ...]
🟢 Easy (10 pts) — Write one simple read function Write a function that returns a single property from the first item in your array (e.g. the name of the first product).
Hint 1 (-2): This is just index + property access, no loop needed.
Hint 2 (-3): Return the value, don't just print it inside the function.
Hint 3 (-5): function firstItemName(list){ return list[0].name; }
🟢 Easy (10 pts) — Print all records with a loop Write a function that logs every item in your array, one per line, with a readable label.
Hint 1 (-2): Loop through the array by index.
Hint 2 (-3): Format each line so it's easy to read, not just a raw object dump.
Hint 3 (-5): function printAll(list){ for(let i=0;i<list.length;i++){ console.log(list[i]); } }
🟢 Easy (10 pts) — Count your records Write a function countItems(list) that returns how many items are in your array.
Hint 1 (-2): This uses a property you already know about arrays.
Hint 2 (-3): No loop is required.
Hint 3 (-5): function countItems(list){ return list.length; }
🟡 Medium (20 pts) — Search function Write a search function for your data that finds one record by a key field (like name or id), returning the object or null.
Hint 1 (-3): Reuse the array-of-objects search pattern from Day 7.
Hint 2 (-5): Return the whole object, not just true.
Hint 3 (-8): Loop through, compare the key field with ===, return on match, return null after the loop.
🟡 Medium (20 pts) — Statistic function Write a function that computes a meaningful total or average across a numeric field in your data (e.g. total price, average score).
Hint 1 (-3): This is the sum/average pattern applied to a property.
Hint 2 (-5): Don't forget to divide by .length if computing an average.
Hint 3 (-8): function totalPrice(list){ let t=0; for(let i=0;i<list.length;i++){ t+=list[i].price; } return t; }
🟡 Medium (20 pts) — Filter function Write a function that returns a subset of your data matching a condition you choose (e.g. price above a limit, students above a certain age).
Hint 1 (-3): This is the manual-filter pattern from arrays of objects.
Hint 2 (-5): Build and return a new array, don't mutate the original.
Hint 3 (-8): Loop, check the condition on a property, .push() matches into a result array, then return it.
🟡 Medium (20 pts) — Sort your data Adapt bubble or selection sort to order your array of objects by one numeric field.
Hint 1 (-3): Copy the array first with [...list] before sorting, so the original stays intact.
Hint 2 (-5): Compare and swap based on a property, not the whole object directly.
Hint 3 (-8): Reuse your Day 8 sorting function, changing the comparison to a[j].fieldName > a[j+1].fieldName.
🟠 Hard (35 pts) — Combine search + statistic Write a function that finds all records matching a search AND immediately computes a statistic on just that filtered subset (e.g. "average price of all in-stock items").
Hint 1 (-5): First filter, then run your statistic function on the filtered result, not the original list.
Hint 2 (-8): You can call your filter function and your statistic function together, passing one's output into the other.
Hint 3 (-12): function averagePriceInStock(list){ let filtered = inStockOnly(list); return totalPrice(filtered) / filtered.length; }
🟠 Hard (35 pts) — Add a validation function Write a function that checks if a new record (before adding it to your array) has all required fields filled in correctly (right types, non-empty strings, positive numbers).
Hint 1 (-5): Check each field's type with typeof, similar to the Day 7 profile validation exercise.
Hint 2 (-8): Combine all checks with && into a single boolean return.
Hint 3 (-12): function isValidRecord(item){ return typeof item.name==="string" && item.name.length>0 && typeof item.price==="number" && item.price>0; }
🟠 Hard (35 pts) — Build an "add record" function safely Write a function addItem(list, newItem) that only pushes newItem into list if it passes your validation function, and returns true/false indicating success.
Hint 1 (-5): Call your validation function first, before doing anything else.
Hint 2 (-8): Only .push() if validation passes.
Hint 3 (-12): function addItem(list,newItem){ if(!isValidRecord(newItem)) return false; list.push(newItem); return true; }
🔴 Extreme (60 pts) — Full mini pipeline function Write one function generateReport(list) that internally: filters your data by some meaningful condition, sorts the filtered result by a numeric field, and returns both the sorted filtered array AND a computed statistic on it — all using functions you've already written, combined together.
Hint 1 (-8): Think of this as a "conductor" function that just calls your other functions in sequence, passing results along.
Hint 2 (-12): You'll likely return either an array with two items [sortedFiltered, stat], or (once you know objects well) an object with named fields.
Hint 3 (-20): function generateReport(list){ let filtered = inStockOnly(list); let sorted = sortByPrice(filtered); let avg = totalPrice(filtered)/filtered.length; return [sorted, avg]; }
mini-project-checkpoints
🟢 Easy (10 pts) — Write your checkpoint list Write out your own 4-5 checkpoints for your specific project, in the order you plan to tackle them.
Hint 1 (-2): Start with data, end with the demo/Git history.
Hint 2 (-3): Keep each checkpoint testable — something you can verify with console.log.
Hint 3 (-5): Example: data ready → read functions → search/sort → demo script → final commit.
🟢 Easy (10 pts) — Commit your first checkpoint Once your sample data is ready and printed correctly, write and run the Git commands to commit it.
Hint 1 (-2): Stage, then commit, then push.
Hint 2 (-3): Use a message describing exactly this checkpoint.
Hint 3 (-5): git add . && git commit -m "checkpoint 1: sample data ready" && git push
🟢 Easy (10 pts) — Test a function in isolation Pick one function from your project and call it with two different inputs, printing both results to confirm it behaves correctly.
Hint 1 (-2): Choose inputs that are meaningfully different (e.g. found vs not found).
Hint 2 (-3): Compare the printed output to what you expect by hand.
Hint 3 (-5): For a search function: test once with a name that exists, once with one that doesn't.
🟢 Easy (10 pts) — Identify an untested edge case For one of your functions, name one edge case you haven't tested yet (e.g. empty array, missing field, zero value).
Hint 1 (-2): Think about what happens if your array has 0 items.
Hint 2 (-3): Or what happens if a numeric field is exactly 0.
Hint 3 (-5): Example: "I haven't tested what my average function does with an empty array — it would divide by 0."
🟡 Medium (20 pts) — Fix a checkpoint that's actually broken Run your Checkpoint 2 functions again after adding Checkpoint 3 code — confirm nothing from Checkpoint 2 broke. If something did, identify exactly what changed.
Hint 1 (-3): Compare your Checkpoint 2 test outputs before and after adding new code.
Hint 2 (-5): Check if you accidentally renamed a variable or function that Checkpoint 2 relied on.
Hint 3 (-8): Look specifically at any shared data (like your main array) — did a new function accidentally mutate it?
🟡 Medium (20 pts) — Write a demo script section Write the "demo script" part of your project: a labeled sequence of console.log calls exercising at least 4 of your functions.
Hint 1 (-3): Add a clear header like console.log("=== DEMO ==="); at the top.
Hint 2 (-5): Label each function's output so a reader understands what they're seeing.
Hint 3 (-8): Structure: header, then one labeled block per function, e.g. console.log("Search result:", ...);
🟡 Medium (20 pts) — Verify your Git history tells a story Run git log --oneline and check: do your commit messages, read in order, describe a clear progression of work? Rewrite any that don't.
Hint 1 (-3): Vague messages like "fix" or "update" don't tell a story.
Hint 2 (-5): You can't edit old commit messages easily as a beginner — instead, make your NEXT commit message clearer.
Hint 3 (-8): Going forward, always mention the specific function or feature completed.
🟡 Medium (20 pts) — Test with unusual data Add one deliberately unusual record to your sample data (e.g. price of 0, an empty name) and see how your functions handle it. Report what happens.
Hint 1 (-3): Focus on functions that do math (average, total) or comparisons.
Hint 2 (-5): An empty name might break a search that assumes non-empty strings.
Hint 3 (-8): Document any function that produces a confusing or wrong result with this edge case — that's useful information for polishing your project.
🟠 Hard (35 pts) — Refactor a checkpoint's function for reuse Find one function in your project that could be reused inside another (e.g., your average function reused inside a report function). Refactor to remove any duplicated logic.
Hint 1 (-5): Look for any place where you copy-pasted similar loop logic instead of calling an existing function.
Hint 2 (-8): Replace the duplicated block with a direct call to the existing function.
Hint 3 (-12): If you wrote sum logic twice, keep only one sumOf(list, field) -style function and call it from both places.
🟠 Hard (35 pts) — Design a checkpoint for a feature you haven't built yet Pick one function you haven't written yet, and write out (in plain English) exactly how you'll test it as a checkpoint before writing any code.
Hint 1 (-5): Decide what inputs you'll test with, and what output you expect for each.
Hint 2 (-8): Include at least one "normal" case and one "edge" case in your plan.
Hint 3 (-12): Example: "For findCheapest, I'll test with a normal array (expect the lowest price object), and with an array of 1 item (expect that single item back)."
🟠 Hard (35 pts) — Simulate reviewing someone else's checkpoint Imagine a classmate's Checkpoint 2 only prints raw objects with no labels. Write feedback (in plain English) on how to improve their console output for readability, with a concrete example line.
Hint 1 (-5): Focus on clarity: what would a reader NOT understand from a bare object dump?
Hint 2 (-8): Suggest adding string labels before each printed value.
Hint 3 (-12): Example fix: instead of console.log(result);, suggest console.log("Search result:", result);
🔴 Extreme (60 pts) — Full checkpoint audit Go through every checkpoint (data, read functions, search/sort, demo, Git) for your ACTUAL project right now, and for each one, write: (1) is it done, partially done, or not started, (2) one specific test you ran or will run to confirm it, and (3) the exact commit message tied to it.
Hint 1 (-8): Be honest about "partially done" — this audit is more useful if accurate.
Hint 2 (-12): For each checkpoint, the "test" should be something you can actually run right now, not a vague plan.
Hint 3 (-20): Structure your audit as a short table or list: Checkpoint | Status | Test performed | Commit message — filled in truthfully for your current project state.
Day 10 — Defense prep & review
core-review
🟢 Easy (10 pts) — Write one example per topic (basic) Write one line of code demonstrating: a variable declaration, a condition, and a loop (three separate lines).
Hint 1 (-2): Pick the simplest possible example for each.
Hint 2 (-3): They don't need to relate to each other.
Hint 3 (-5): E.g. let x = 5; / if (x > 0) {...} / for(let i=0;i<3;i++){...}
🟢 Easy (10 pts) — Name the four data shapes Name the four "shapes" of data covered in this SAS training (primitives, strings, arrays, objects) with one example value for each.
Hint 1 (-2): Think about what you learned week by week.
Hint 2 (-3): One of them is really "text", one is a "list", one is "key-value pairs".
Hint 3 (-5): Number/boolean (primitive), "hi" (string), [1,2,3] (array), {a:1} (object).
🟢 Easy (10 pts) — Identify the odd one out Given let, const, function, if — which one is NOT used to declare a variable?
Hint 1 (-2): Two of these declare variables.
Hint 2 (-3): Two of these do something else entirely (control flow / functions).
Hint 3 (-5): function and if are not variable declarations; let/const are.
🟢 Easy (10 pts) — Recall the two sorts Name the two sorting algorithms taught in this SAS training.
Hint 1 (-2): Both use nested loops.
Hint 2 (-3): One repeatedly swaps neighbors; the other picks the minimum each round.
Hint 3 (-5): Bubble sort and selection sort.
🟡 Medium (20 pts) — Rewrite from memory Without looking at notes, write a function that returns the sum of an array of numbers.
Hint 1 (-3): You'll need an accumulator and a loop.
Hint 2 (-5): Start the accumulator at 0 before the loop.
Hint 3 (-8): function sumArray(arr){ let sum=0; for(let i=0;i<arr.length;i++){ sum+=arr[i]; } return sum; }
🟡 Medium (20 pts) — Combine 3 topics in one snippet Write a snippet combining an array of objects, a loop, and a condition — printing only the names of objects meeting some criteria.
Hint 1 (-3): Think of this as a simplified filter, but just printing instead of collecting into a new array.
Hint 2 (-5): Loop through, check a property with if, and console.log the name when it matches.
Hint 3 (-8): for(let i=0;i<list.length;i++){ if(list[i].age>18) console.log(list[i].name); }
🟡 Medium (20 pts) — Spot which topic a bug belongs to Given a snippet that throws "x is not defined", is this a scope issue, a type issue, or a syntax issue? Explain briefly.
Hint 1 (-3): Think about what that specific error message usually means.
Hint 2 (-5): It's about where a variable can be accessed from.
Hint 3 (-8): It's a scope issue — the variable was likely declared inside a block or function and accessed outside of it.
🟡 Medium (20 pts) — Explain linear search vs binary search from memory Without notes, write 2-3 sentences comparing linear and binary search.
Hint 1 (-3): Mention what each requires about the data's order.
Hint 2 (-5): Mention how each one decides where to look next.
Hint 3 (-8): Linear search checks every item in order and works on any array; binary search needs sorted data and repeatedly halves the search range.
🟠 Hard (35 pts) — Build a tiny multi-concept program from scratch Without any starter code, write a program that: creates an array of 3 number objects (each with a value field), finds their sum using a function, and prints a message saying whether the sum is even or odd.
Hint 1 (-5): Break it into three steps: data, sum function, and even/odd check.
Hint 2 (-8): You can reuse your sumArray idea, adapted to read .value from each object.
Hint 3 (-12): Build the array, write a sum function reading .value, then use sum % 2 === 0 to decide the message.
🟠 Hard (35 pts) — Debug a multi-bug snippet Given a snippet with 3 intentional bugs (a const reassignment, a missing break in a switch, and an off-by-one loop), find and describe all three without being told where they are.
Hint 1 (-5): Check variable declarations, switch statements, and loop boundaries separately — one bug type each.
Hint 2 (-8): Off-by-one bugs usually show up as <= vs < mistakes.
Hint 3 (-12): Go through the snippet line by line, asking "could this specific line be one of the three named bug types?"
🟠 Hard (35 pts) — Explain a full program's behavior out loud (in writing) Given a 10-15 line program combining a loop, a function, and an array of objects, write a paragraph explaining exactly what it does and what it will print, without running it first.
Hint 1 (-5): Trace the code top to bottom, tracking variable values as they change.
Hint 2 (-8): Pay special attention to what the loop does on each pass.
Hint 3 (-12): Write your explanation as: "First, ... then, ... then the loop repeats until ..., finally it prints ..." — then run the code to check your explanation was correct.
🔴 Extreme (60 pts) — Full concept map from memory Without any notes, write a short program (15+ lines) that uses AT LEAST 6 different Core JS concepts from this SAS training (e.g. variables, a condition, a loop, a function, an array, an object, a search or sort) working together toward one small, coherent goal of your choosing.
Hint 1 (-8): Pick a simple goal first (e.g. "manage a small todo list" or "grade a few students"), then figure out which concepts naturally fit.
Hint 2 (-12): Build it piece by piece, testing each part with console.log before combining everything.
Hint 3 (-20): A reasonable skeleton: an array of objects (data) → a function that filters or searches it (function + array + object + condition) → a loop that prints results → maybe a small sort at the end.
defense-prep
🟢 Easy (10 pts) — Write your one-sentence pitch Write a single sentence describing what your mini-project does, suitable as the opening line of your defense.
Hint 1 (-2): Keep it under 20 words.
Hint 2 (-3): Focus on what it does, not how it's built.
Hint 3 (-5): Example: "My project is a small product inventory tool that can search, total, and sort items."
🟢 Easy (10 pts) — List your project's 3 main functions Name the three functions in your project you consider most important to explain during your defense.
Hint 1 (-2): Pick functions that show different skills (e.g. one search, one calculation, one sort).
Hint 2 (-3): Avoid picking three nearly-identical functions.
Hint 3 (-5): A balanced set often includes: a search/find function, a statistic function, and a sort or filter function.
🟢 Easy (10 pts) — Write your README's "How to run" section Write the exact section of your README explaining how to run your project.
Hint 1 (-2): Include the terminal command, not just a description.
Hint 2 (-3): Mention the exact file name.
Hint 3 (-5): ## How to run\n\node yourfilename.js``
🟢 Easy (10 pts) — Prepare for the "why this loop" question For one loop in your project, write a one-sentence explanation of why you chose a for loop (or while) instead of the other.
Hint 1 (-2): Think about whether you knew the number of repetitions in advance.
Hint 2 (-3): for is common when looping through an array by index.
Hint 3 (-5): Example: "I used a for loop because I needed to visit every index of the array exactly once."
🟡 Medium (20 pts) — Anticipate an edge-case question Write one likely question about what your project does with empty or missing data, and a short, honest answer.
Hint 1 (-3): Think about your statistic functions specifically — what happens with an empty array?
Hint 2 (-5): If you haven't handled it, it's fine to say so honestly as part of your answer.
Hint 3 (-8): Example Q: "What happens if the product list is empty?" A: "My average function would currently divide by zero — that's something I'd improve next."
🟡 Medium (20 pts) — Practice explaining one function line by line Pick your most complex function and write out, line by line, what each line does in plain English (not just what the code says).
Hint 1 (-3): Avoid simply restating the code — explain the purpose of each line.
Hint 2 (-5): Group related lines together (e.g. "these three lines find the minimum value").
Hint 3 (-8): For a search function: "First we start assuming nothing is found (-1). Then we check each item one by one. If we find a match, we return its position immediately."
🟡 Medium (20 pts) — Prepare for a live demo failure Write a short plan for what you'll say and do if your live demo crashes or shows an unexpected error during the defense.
Hint 1 (-3): Staying calm and diagnosing out loud is better than panicking silently.
Hint 2 (-5): Mention that you'd check the error message and explain what you think it means, live.
Hint 3 (-8): Example: "If it crashes, I'll read the error message aloud, explain what I think caused it, and either fix it live or explain how I'd fix it afterward."
🟡 Medium (20 pts) — Time your demo Do a full timed run of your live demo (just the code running, not the full presentation) and report how many seconds/minutes it takes.
Hint 1 (-3): Use a phone timer or stopwatch.
Hint 2 (-5): Include the time to actually run the command, not just narrate.
Hint 3 (-8): If it takes longer than your allotted slot allows, look for which console.log sections could be trimmed for the defense.
🟠 Hard (35 pts) — Write 3 tough questions for yourself Write three challenging questions an instructor might ask about your specific project's logic (not generic training questions), and short honest answers.
Hint 1 (-5): Look at your own trickiest function and ask "why did I do it this way, and not another way?"
Hint 2 (-8): Consider asking yourself about a specific edge case your code might not fully handle.
Hint 3 (-12): Example: "Why did you choose selection sort over bubble sort for this?" — answer honestly, even if the answer is "I didn't have a strong reason, they're similar in this context."
🟠 Hard (35 pts) — Simplify a complex explanation Take your most complicated function's explanation and rewrite it so a complete beginner (someone who just started Day 1) could understand it, without using any jargon from later days.
Hint 1 (-5): Avoid words like "iterate", "parameter", or "traversal" — use plain language instead.
Hint 2 (-8): Use a small concrete example with real numbers instead of abstract descriptions.
Hint 3 (-12): Example: instead of "it traverses the array comparing adjacent elements", say "it looks at each pair of neighboring numbers, one at a time, and swaps them if they're in the wrong order."
🟠 Hard (35 pts) — Prepare a "what I'd do differently" reflection Write 3-4 sentences honestly reflecting on what you would improve or do differently if you rebuilt this project from scratch.
Hint 1 (-5): Think about scope — did you build too much, too little, or about right?
Hint 2 (-8): Think about testing — were there edge cases you skipped?
Hint 3 (-12): A strong answer names something SPECIFIC (a function, a missing test, a messy piece of logic), not just a vague "I'd do better."
🔴 Extreme (60 pts) — Full mock defense Do a complete timed mock defense out loud (recorded if possible): 1-sentence pitch, live demo, explanation of your 3 main functions, and answers to at least 2 of your own prepared tough questions — all without reading directly from a script.
Hint 1 (-8): Practice this at least once in full before doing the "real" timed version.
Hint 2 (-12): Notice where you hesitate or get stuck — those are the spots to practice more.
Hint 3 (-20): Structure: Pitch (10-15 sec) → Data explanation (15-20 sec) → Live demo (1-2 min) → Function walkthroughs (1-2 min) → Q&A practice (1-2 min) — aim for a natural, conversational tone throughout, not a memorized recitation.
