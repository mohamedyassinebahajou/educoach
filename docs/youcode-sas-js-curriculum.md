# YouCode SAS — JavaScript Bootcamp Curriculum (Core JS, 2 Weeks)

Track: **Core JavaScript only**. No DOM, HTML/CSS, events, `addEventListener`, forms, `fetch`/AJAX, Node APIs, npm libraries, `async`/`await`, classes, modules, or TypeScript. All code should run in a plain console (Node REPL, `node file.js`, or a browser DevTools console) and print results with `console.log`.

---

## Day 1 — Mon 31 Aug — Welcome & first JavaScript

### welcome-to-javascript — Welcome to YouCode SAS / JavaScript

**Sources:**
- MDN, "JavaScript basics" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
- javascript.info, "An Introduction to JavaScript" — https://javascript.info/intro
- YouTube search: "JavaScript full course for beginners 2024"
- YouTube search: "what can you build with JavaScript"

**Explain:**
Welcome to the JavaScript bootcamp. Over the next two weeks you will learn Core JavaScript, the part of the language that works everywhere: in a browser, in Node.js, or in a simple script file. JavaScript was created to make web pages interactive, but the language itself is just a tool for giving instructions to a computer, one line at a time. In this bootcamp we will not touch web pages, buttons, or forms. Instead we focus on the building blocks: values, variables, decisions, loops, functions, strings, arrays, and objects. These building blocks exist in almost every programming language, so what you learn here will transfer to Python, Java, or any other language later. Think of JavaScript as a very literal assistant: it does exactly what you type, nothing more and nothing less, so precision matters. Every day builds on the previous one, so it's important not to skip lessons. By the end of week one you will be comfortable writing small programs with loops and functions. By the end of week two you will search and sort data, and build a small project entirely in Core JS. We will also use Git and GitHub daily, because saving and sharing your work is as important as writing it. Don't worry about memorizing everything today — programming is learned by typing code yourself, making mistakes, and fixing them.

**Key terms:** program, script, interpreter, Core JavaScript, browser console, Node.js, bootcamp roadmap.

**Examples:**
```js
// Your very first JavaScript statement
console.log("Welcome to YouCode SAS!");
```
```js
// JavaScript can do math instantly
console.log(2 + 2);
console.log(10 * 4);
```
```js
// JavaScript can combine text (this is called concatenation)
console.log("Hello, " + "world!");
```
```js
// A comment: this line is ignored by JavaScript, it's a note for humans
// console.log("this will not run");
console.log("this will run");
```

**Mistakes:**
- Thinking JavaScript is the same as Java (they are unrelated languages, only the name is similar).
- Forgetting that JavaScript is case-sensitive: `Console.log` is not the same as `console.log`.
- Trying to run code in a text file without any way to execute it (you need Node, a browser console, or an online sandbox).

**Checkpoints:**
- Q: Is JavaScript the same language as Java? A: No, they are completely different languages that only share part of their name.
- Q: What function do we use to print something to the console? A: `console.log()`.
- Q: What track are we following in this bootcamp? A: Core JavaScript only — no DOM, browser APIs, or frameworks.

**Practice:** Open a console (browser DevTools or Node) and print your name, your age, and a short sentence about why you're learning to code, each with a separate `console.log`.

---

### hello-console — console.log and .js files

**Sources:**
- MDN, "What went wrong? Troubleshooting JavaScript" (console section) — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
- javascript.info, "Code editors" and "Developer console" — https://javascript.info/devtools
- Node.js docs, "console.log" — https://nodejs.org/api/console.html#consolelogdata-args
- YouTube search: "how to run JavaScript file with Node.js beginner"

**Explain:**
`console.log()` is the single most useful tool you will use in this bootcamp: it prints a value so you can see what your code is doing. You can print numbers, text (called strings), true/false values, or several things at once separated by commas. A JavaScript file is simply a text file saved with the `.js` extension, for example `day1.js`. If you have Node.js installed, you run it by typing `node day1.js` in a terminal, in the same folder as the file. If you don't have Node installed, you can open your browser, press F12 (or right-click → Inspect), go to the "Console" tab, and type statements directly — this is called a REPL, meaning it reads, runs, and prints each line immediately. Every JavaScript statement usually ends with a semicolon `;`, though JavaScript can often guess where a statement ends without one; we will use semicolons consistently to build a good habit. Statements run from top to bottom, in order, unless we tell the program to do otherwise (which we'll learn with loops and functions). Getting comfortable running code and reading `console.log` output is the foundation for debugging every program you will ever write. When something looks wrong, the first fix is almost always: add more `console.log` statements to see what's actually happening inside your program.

**Key terms:** console.log, `.js` file, terminal, Node.js, REPL, statement, semicolon, comment.

**Examples:**
```js
console.log("Hello, YouCode!");
console.log(42);
console.log(true);
```
```js
// You can log multiple values in one call
console.log("Sum:", 2 + 3);
```
```js
// Order matters: statements run top to bottom
console.log("first");
console.log("second");
console.log("third");
```
```js
// A single-line comment starts with //
// This next line does nothing visible, it's just a note
console.log("code after a comment still runs");
```

**Mistakes:**
- Forgetting to save the `.js` file before running it in the terminal.
- Running `node` from the wrong folder, so it can't find the file (use `cd` to move into the correct folder first).
- Mixing up `console.log` with `console.log()` — forgetting the parentheses, which will cause an error.

**Checkpoints:**
- Q: What file extension do JavaScript files use? A: `.js`.
- Q: What terminal command runs a file called `app.js` with Node? A: `node app.js`.
- Q: What is the purpose of `console.log`? A: To print a value so the programmer can see it while the program runs.

**Practice:** Create a file `hello.js`, print three different values (a string, a number, a boolean) each on its own line, and run it with Node or paste it in a browser console.

---

### git-github-basics — Git & GitHub basics

**Sources:**
- GitHub Docs, "Hello World" guide — https://docs.github.com/en/get-started/quickstart/hello-world
- Git docs, "Git Basics" — https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- YouTube search: "Git and GitHub for beginners crash course"
- YouTube search: "git add commit push explained simply"

**Explain:**
Git is a tool that saves snapshots of your code over time, called commits, so you never lose your work and can always go back to an earlier version. GitHub is a website that hosts your Git projects online so you can back them up and share them with instructors or teammates. Think of a commit as a save point in a video game: you make some changes, then you "commit" them with a short message describing what you did. The everyday workflow is: edit your files, `git add` the files you want to save (this stages them), `git commit -m "message"` to save a snapshot, and `git push` to send it to GitHub. A "repository" (or "repo") is simply the folder that Git is tracking. Before you can push, you usually `git clone` a repo (download it) or `git init` (start tracking a new folder). It's good practice to commit often, with small, clear messages like "add loop exercises" rather than one giant commit at the end of the week. Throughout the bootcamp you will commit your daily exercises and push them so instructors can review your progress and give feedback. Mistakes in Git are recoverable almost all the time, so don't be afraid to experiment — but always ask before force-pushing or deleting branches you're unsure about. This lesson is a hands-on workshop: you will set up a GitHub account (if you don't have one), configure Git locally, and push your first commit today.

**Key terms:** repository (repo), commit, stage (`git add`), push, pull, clone, branch, `.gitignore`.

**Examples:**
```
git init
git add .
git commit -m "first commit: hello.js"
```
```
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```
```
git status
git log --oneline
```
```
git pull origin main
```

**Mistakes:**
- Forgetting `git add` before `git commit` (nothing gets staged, so the commit is empty).
- Writing vague commit messages like "update" or "fix" instead of describing what changed.
- Committing large unrelated files (like `node_modules`) — use a `.gitignore` file to exclude them.

**Checkpoints:**
- Q: What command saves a snapshot of staged changes with a message? A: `git commit -m "message"`.
- Q: What command uploads your commits to GitHub? A: `git push`.
- Q: What is a repository? A: A folder that Git is tracking the history of.

**Practice:** Create a GitHub repository for your bootcamp exercises, clone it locally, add today's `hello.js` file, commit it, and push it.

---

## Day 2 — Tue 1 Sep — Variables, operators & conditions

### variables-let-const — Variables and constants

**Sources:**
- MDN, "Storing the information you need — Variables" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
- javascript.info, "Variables" — https://javascript.info/variables
- MDN, "typeof" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
- YouTube search: "let const var JavaScript difference beginner"

**Explain:**
A variable is a named container that holds a value so you can use it later. In modern JavaScript we mostly use `let` for values that can change, and `const` for values that should never be reassigned. You should prefer `const` by default and only use `let` when you know the value needs to update later, for example a counter in a loop. Variable names should be descriptive: `age` is better than `a`, and `totalPrice` is better than `tp`. JavaScript variable names can contain letters, digits, `_` and `$`, but cannot start with a digit, and are case-sensitive (`age` and `Age` are different). The convention in JavaScript is "camelCase" for variable names, like `firstName` or `isLoggedIn`. JavaScript has several primitive types: `number` (e.g. `42` or `3.14`), `string` (text, e.g. `"hello"`), `boolean` (`true`/`false`), `undefined` (a variable declared but not yet given a value), and `null` (an intentional "no value"). You can check a value's type at any time with the `typeof` operator, which is very useful for debugging. Trying to reassign a `const` will cause an error — this is a safety feature, not a bug, because it stops you from accidentally overwriting an important value. Getting comfortable naming and typing variables correctly is the first real programming skill, because every future lesson depends on it.

**Key terms:** variable, `let`, `const`, `var` (legacy, avoid), primitive type, `number`, `string`, `boolean`, `undefined`, `null`, `typeof`, camelCase.

**Examples:**
```js
let age = 17;
const schoolName = "YouCode SAS";
console.log(age, schoolName);
```
```js
let score = 0;
score = score + 10; // let allows reassignment
console.log(score);
```
```js
const pi = 3.14159;
// pi = 3; // this would throw an error, const cannot be reassigned
console.log(pi);
```
```js
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
```
```js
let city; // declared but no value yet
console.log(city); // undefined
city = "Marrakesh";
console.log(city);
```

**Mistakes:**
- Trying to reassign a `const` variable, which throws a `TypeError`.
- Using a variable before declaring it, or misspelling its name in a later line.
- Confusing `undefined` (no value assigned yet) with `null` (deliberately set to "nothing").

**Checkpoints:**
- Q: What keyword should you use by default for a value that won't change? A: `const`.
- Q: What does `typeof "hello"` return? A: `"string"`.
- Q: What happens if you try to reassign a `const`? A: JavaScript throws an error.

**Practice:** Declare `const` variables for your name, city, and favorite number, then a `let` variable for a score starting at 0 that you increase by 5 twice, printing the score each time.

---

### operators-arithmetic — Operators (arithmetic, assignment, comparison, logical)

**Sources:**
- MDN, "Basic math in JavaScript" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
- javascript.info, "Operators" — https://javascript.info/operators
- javascript.info, "Comparisons" — https://javascript.info/comparison
- YouTube search: "JavaScript operators explained ===  vs =="

**Explain:**
Operators let you combine and compare values. Arithmetic operators include `+` (add), `-` (subtract), `*` (multiply), `/` (divide), and `%` (modulo, the remainder of a division), which is extremely useful for checking if a number is even or odd. Assignment operators store or update values: `=` assigns, while `+=`, `-=`, `*=`, `/=` update a variable based on its current value, so `score += 5` means "add 5 to score". Comparison operators produce a boolean (`true`/`false`): `<`, `>`, `<=`, `>=` compare numbers, while `===` checks if two values are strictly equal (same value AND same type) and `!==` checks strict inequality. Always prefer `===` and `!==` over `==` and `!=`, because the loose versions try to convert types automatically and can produce confusing results, like `"5" == 5` being `true`. Logical operators combine booleans: `&&` (AND, true only if both sides are true), `||` (OR, true if at least one side is true), and `!` (NOT, flips true to false and vice versa). These operators are the foundation of every condition and loop you will write, so understanding the difference between assignment (`=`) and comparison (`===`) is critical — this is one of the most common beginner bugs. String concatenation also uses `+`, so `"5" + 5` produces `"55"` (text), while `5 + 5` produces `10` (a number) — the type of the operands changes the behavior.

**Key terms:** arithmetic operator, modulo `%`, assignment `=`, compound assignment `+=`, strict equality `===`, strict inequality `!==`, logical AND `&&`, logical OR `||`, logical NOT `!`.

**Examples:**
```js
console.log(7 + 3, 7 - 3, 7 * 3, 7 / 3, 7 % 3);
```
```js
let total = 10;
total += 5; // same as total = total + 5
console.log(total);
```
```js
console.log(5 === 5);   // true
console.log(5 === "5"); // false, different types
console.log(5 !== 6);   // true
```
```js
let isAdult = true;
let hasTicket = false;
console.log(isAdult && hasTicket); // false
console.log(isAdult || hasTicket); // true
console.log(!isAdult);             // false
```
```js
console.log(10 % 2); // 0, so 10 is even
console.log(7 % 2);  // 1, so 7 is odd
```

**Mistakes:**
- Using `=` (assignment) instead of `===` (comparison) inside a condition.
- Using `==` instead of `===` and getting surprising type-conversion results.
- Forgetting that `%` gives the remainder, not a percentage.

**Checkpoints:**
- Q: What does `10 % 3` evaluate to? A: `1` (the remainder).
- Q: What is the difference between `=` and `===`? A: `=` assigns a value, `===` compares two values for strict equality.
- Q: What does `true && false` evaluate to? A: `false`.

**Practice:** Write a script that stores two numbers, then prints their sum, difference, product, quotient, and remainder, and prints whether the first number is greater than the second using `>`.

---

### if-else — Conditions — if / else / switch

**Sources:**
- MDN, "Making decisions in your code — conditionals" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
- javascript.info, "Conditional branching: if, '?'" — https://javascript.info/ifelse
- javascript.info, "Logical operators" — https://javascript.info/logical-operators
- YouTube search: "JavaScript if else switch statement beginner"

**Explain:**
Conditions let your program make decisions and run different code depending on the situation. An `if` statement runs a block of code only when its condition is `true`. You can add `else` to run alternative code when the condition is `false`, and `else if` to check multiple conditions in sequence, stopping at the first one that matches. Conditions are usually built with comparison operators (`===`, `<`, `>=`...) and can be combined with `&&` and `||` for more complex logic, for example checking if a number is between two values. A `switch` statement is a cleaner alternative to many `else if` chains when you're comparing one variable against several exact values; each `case` needs a `break` to stop it from "falling through" into the next case, and you can add a `default` case for anything that doesn't match. JavaScript treats some values as "falsy" in conditions even if they're not literally `false`: `0`, `""` (empty string), `null`, `undefined`, and `NaN` are all falsy, while everything else is "truthy". Indentation (spacing) inside `if`/`else` blocks doesn't change how the code runs, but it makes the code much easier to read, so always indent consistently. Understanding conditions well is essential, because almost every real program needs to branch based on user input or computed values. Practice reading conditions out loud in plain English before writing them in code — this habit prevents a lot of logic bugs.

**Key terms:** `if`, `else`, `else if`, `switch`, `case`, `break`, `default`, truthy, falsy, block `{ }`.

**Examples:**
```js
let age = 16;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```
```js
let grade = 72;
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else {
  console.log("F");
}
```
```js
let day = "Tuesday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
```
```js
let temperature = 25;
if (temperature > 20 && temperature < 30) {
  console.log("Nice weather!");
}
```
```js
// Falsy values in action
if (0) {
  console.log("this will not print");
}
if ("hello") {
  console.log("this WILL print, non-empty strings are truthy");
}
```

**Mistakes:**
- Forgetting `break` inside a `switch`, causing execution to "fall through" into the next case.
- Using `=` instead of `===` inside an `if` condition.
- Writing overlapping `else if` conditions in the wrong order (e.g. checking `>= 70` before `>= 90`, so high grades never reach the correct branch).

**Checkpoints:**
- Q: What keyword stops a `switch` case from falling into the next one? A: `break`.
- Q: Name two falsy values in JavaScript besides `false`. A: Any two of `0`, `""`, `null`, `undefined`, `NaN`.
- Q: What runs if none of the `if`/`else if` conditions are true and there's an `else`? A: The code inside the `else` block.

**Practice:** Write a program that stores a number and prints "positive", "negative", or "zero" depending on its value, then rewrite the weekend/weekday example using your own days.

---

## Day 3 — Wed 2 Sep — Loops

### for-while-loops — for and while (break, continue)

**Sources:**
- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- javascript.info, "Loops: while and for" — https://javascript.info/while-for
- YouTube search: "JavaScript for loop while loop beginner explained"

**Explain:**
Loops let you repeat code without copy-pasting it many times. A `for` loop has three parts separated by semicolons: initialization (starting point), condition (when to keep going), and update (what happens after each pass), for example `for (let i = 0; i < 5; i++)`. A `while` loop only has a condition, and keeps running its block as long as that condition stays true — you must update something inside the loop body, or you'll create an infinite loop that never stops. Use `for` when you know roughly how many times you want to repeat something, and `while` when you're repeating "until" some condition changes, like waiting for a random number to match a target. The `break` keyword immediately exits a loop entirely, useful when you found what you were looking for and don't need to keep checking. The `continue` keyword skips the rest of the current pass and jumps to the next one, useful for skipping specific values without stopping the whole loop. The loop variable (often called `i`, short for "index" or "iterator") usually starts at `0` because array positions in JavaScript also start at `0` — we'll connect this to arrays soon. A very common beginner bug is the "off-by-one" error: looping one time too many or too few, usually caused by using `<=` instead of `<`, or vice versa. Always trace through a loop by hand (or with `console.log`) for the first couple of times you write a new kind of loop, so you build intuition for how the values change on each pass.

**Key terms:** `for` loop, `while` loop, loop counter/index, condition, increment (`i++`), `break`, `continue`, infinite loop, off-by-one error.

**Examples:**
```js
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
```
```js
let i = 0;
while (i < 5) {
  console.log("While count:", i);
  i++;
}
```
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // stop the loop completely
  }
  console.log(i);
}
```
```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // skip even numbers
  }
  console.log(i); // only odd numbers print
}
```
```js
// Counting down
for (let i = 5; i > 0; i--) {
  console.log(i);
}
console.log("Liftoff!");
```

**Mistakes:**
- Forgetting to update the loop variable in a `while` loop, creating an infinite loop.
- Off-by-one errors from mixing up `<` and `<=` in the condition.
- Confusing `break` (stop the loop) with `continue` (skip to the next pass).

**Checkpoints:**
- Q: What are the three parts of a `for` loop's header? A: Initialization, condition, and update.
- Q: What does `continue` do inside a loop? A: Skips the rest of the current pass and moves to the next iteration.
- Q: What causes an infinite loop with `while`? A: The condition never becomes false, usually because the loop variable is never updated.

**Practice:** Write a `for` loop that prints numbers 1 to 20, but skips multiples of 3 with `continue` and stops entirely once it reaches 18 with `break`.

---

### nested-loops — Loops with conditions & nesting

**Sources:**
- javascript.info, "Loops: while and for" (nested examples) — https://javascript.info/while-for
- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- YouTube search: "JavaScript nested loops multiplication table example"

**Explain:**
A nested loop is simply a loop written inside another loop. The outer loop runs once, and for every single pass of the outer loop, the entire inner loop runs completely from start to finish. Nested loops are useful whenever you need to work with two dimensions, like rows and columns in a grid, or comparing every item in a list against every other item. A classic example is printing a multiplication table: the outer loop picks a row number, and the inner loop picks each column for that row. It's important to use different variable names for each loop (commonly `i` for the outer loop and `j` for the inner loop) so they don't overwrite each other. Nested loops can get slow if both loops run many times, because the total number of operations is roughly the outer count multiplied by the inner count — this becomes important later when comparing search and sort algorithms. `break` and `continue` inside a nested loop only affect the innermost loop they are written in, not the outer one, which can surprise beginners. When debugging nested loops, it helps to temporarily log both `i` and `j` together so you can see exactly which combination is being processed at each step. Nested loops are the foundation for bubble sort and selection sort, which we will study later this week — so getting comfortable tracing them by hand now will make sorting much easier to understand.

**Key terms:** nested loop, outer loop, inner loop, `i`/`j` convention, grid/table pattern, time complexity (intuitive idea only).

**Examples:**
```js
// Multiplication table for 1 to 5
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    console.log(i + " x " + j + " = " + (i * j));
  }
}
```
```js
// Print a simple triangle of stars
for (let i = 1; i <= 4; i++) {
  let row = "";
  for (let j = 0; j < i; j++) {
    row += "*";
  }
  console.log(row);
}
```
```js
// break only stops the inner loop
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break;
    console.log("i:", i, "j:", j);
  }
}
```
```js
// Comparing every pair of numbers in a list (used later for search/sort)
let numbers = [3, 1, 4];
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (i !== j) {
      console.log(numbers[i], "vs", numbers[j]);
    }
  }
}
```

**Mistakes:**
- Reusing the same variable name (`i`) for both loops, which causes them to interfere with each other.
- Assuming `break` exits both loops, when it only exits the innermost one.
- Writing loops so deeply nested that the code becomes hard to read — usually a sign the logic should be split into a function (next lesson!).

**Checkpoints:**
- Q: If the outer loop runs 3 times and the inner loop runs 4 times each time, how many total inner-loop passes happen? A: 12.
- Q: Does `break` inside the inner loop also stop the outer loop? A: No, only the inner loop.
- Q: Why do we usually name loop variables `i` and `j`? A: By convention, to keep outer and inner loop counters distinct and readable.

**Practice:** Print a full multiplication table from 1 to 10 using nested loops, then modify it to only print rows for even numbers using an `if` condition inside the outer loop.

---

## Day 4 — Thu 3 Sep — Functions & scope

### functions-basics — Functions (parameters, arguments, return, refactoring)

**Sources:**
- MDN, "Functions — reusable blocks of code" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
- javascript.info, "Functions" — https://javascript.info/function-basics
- javascript.info, "Function expressions" — https://javascript.info/function-expressions
- YouTube search: "JavaScript functions parameters return beginner"

**Explain:**
A function is a named, reusable block of code that performs a task. You define a function once with the `function` keyword, and then you can "call" (run) it as many times as you need, with different inputs. The values you list in the function's definition are called parameters, and the actual values you pass in when calling it are called arguments — for example, in `function greet(name)`, `name` is a parameter, and in `greet("Sara")`, `"Sara"` is the argument. The `return` keyword sends a value back out of the function to wherever it was called, and immediately stops the function from running further; without `return`, a function produces `undefined`. Functions help you avoid repeating the same code (this is called "DRY", Don't Repeat Yourself) and let you organize a big problem into small, testable pieces — this process of turning repeated or messy code into clean functions is called refactoring. Functions can call other functions, and a function can take zero, one, or several parameters, some of which can have default values if no argument is provided. It's good practice to give functions verb-based names describing what they do, like `calculateAverage` or `isEven`, so the code reads almost like English. A function only "does" something when you call it — defining `function sayHi() {...}` on its own prints nothing, you must also write `sayHi();`. Learning to break a task into small functions, test each one with `console.log`, and combine them is one of the most important skills in this bootcamp.

**Key terms:** function declaration, parameter, argument, `return`, function call/invocation, default parameter, refactoring, DRY.

**Examples:**
```js
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Sara"));
```
```js
function add(a, b) {
  return a + b;
}
console.log(add(3, 4)); // 7
```
```js
function isEven(number) {
  return number % 2 === 0;
}
console.log(isEven(10)); // true
console.log(isEven(7));  // false
```
```js
// Default parameter: used if no argument is given
function greetWithDefault(name = "friend") {
  return "Hi, " + name;
}
console.log(greetWithDefault());       // "Hi, friend"
console.log(greetWithDefault("Omar")); // "Hi, Omar"
```
```js
// Functions calling other functions
function square(n) {
  return n * n;
}
function sumOfSquares(a, b) {
  return square(a) + square(b);
}
console.log(sumOfSquares(2, 3)); // 4 + 9 = 13
```

**Mistakes:**
- Forgetting to call the function (`greet("Sara")`) after defining it — defining it alone does nothing.
- Forgetting `return`, so the function silently produces `undefined` instead of the expected value.
- Confusing parameters (in the definition) with arguments (in the call) — this is a vocabulary mix-up, not a bug, but it matters for communication.

**Checkpoints:**
- Q: What's the difference between a parameter and an argument? A: A parameter is the placeholder name in the function definition; an argument is the actual value passed when calling the function.
- Q: What does a function return if it has no `return` statement? A: `undefined`.
- Q: Why do we use functions instead of repeating code? A: To avoid repetition, make code reusable, and organize logic into clear, testable pieces.

**Practice:** Write a function `isPositive(n)` that returns `true`/`false`, and a function `maxOfThree(a, b, c)` that returns the largest of three numbers, without using any built-in `Math` methods.

---

### arrow-functions-scope — Scope & arrow functions

**Sources:**
- javascript.info, "Arrow functions, the basics" — https://javascript.info/arrow-functions-basics
- MDN, "Arrow function expressions" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- javascript.info, "Variable scope, closure" (intro sections) — https://javascript.info/closure
- YouTube search: "JavaScript arrow functions vs regular functions scope"

**Explain:**
Arrow functions are a shorter way to write functions, using `=>` instead of the `function` keyword. A classic function `function add(a, b) { return a + b; }` can be rewritten as an arrow function: `const add = (a, b) => { return a + b; };`. If the function body is a single expression, you can drop the curly braces and the `return` keyword entirely, called an "implicit return": `const add = (a, b) => a + b;`. Arrow functions are especially popular for short, simple operations, while classic `function` declarations are still very common and perfectly valid — both do the same basic job for our Core JS needs. Scope refers to where a variable can be "seen" and used in your code. Variables declared with `let` or `const` inside a block (`{ }`, like inside an `if` or a `for` loop) only exist inside that block — this is called block scope. Variables declared outside any function or block are in the "global scope" and can be accessed anywhere in the file, but it's best practice to avoid too many global variables, because they make code harder to reason about and more prone to accidental overwrites. A variable declared inside a function cannot be accessed from outside that function — this protects each function's internal work from interfering with the rest of the program. Understanding scope explains a very common beginner error: "X is not defined", which happens when you try to use a variable outside the block or function where it was declared. As a rule of thumb, declare variables as close as possible to where you use them, and prefer `const` inside functions unless you need to reassign.

**Key terms:** arrow function `=>`, implicit return, block scope, global scope, function scope, "is not defined" error.

**Examples:**
```js
// Classic function vs arrow function, same behavior
function double(n) { return n * 2; }
const doubleArrow = (n) => n * 2;
console.log(double(5), doubleArrow(5));
```
```js
// Arrow function with multiple statements needs braces + return
const describe = (n) => {
  let type = n % 2 === 0 ? "even" : "odd";
  return n + " is " + type;
};
console.log(describe(7));
```
```js
// Block scope example
if (true) {
  let secret = "only visible in here";
  console.log(secret);
}
// console.log(secret); // this would throw: secret is not defined
```
```js
// Function scope example
function makeMessage() {
  let message = "hello from inside";
  return message;
}
console.log(makeMessage());
// console.log(message); // error: message is not defined out here
```
```js
// Global vs local
let counter = 0; // global
function increment() {
  let localValue = 1; // local, only exists inside this function
  counter += localValue;
}
increment();
console.log(counter); // 1
```

**Mistakes:**
- Trying to use a variable outside the block or function it was declared in.
- Forgetting curly braces + `return` when an arrow function needs more than one statement.
- Overusing global variables, making it hard to track where a value was changed.

**Checkpoints:**
- Q: Rewrite `function square(n) { return n * n; }` as an arrow function with implicit return. A: `const square = (n) => n * n;`.
- Q: Can a variable declared with `let` inside an `if` block be used after the block ends? A: No, it's block-scoped and only exists inside that block.
- Q: What error message do you typically see when accessing a variable outside its scope? A: "X is not defined".

**Practice:** Rewrite three of your Day 4 functions as arrow functions, then write a small script that demonstrates a variable declared inside a `for` loop being unavailable outside of it.

---

## Day 5 — Fri 4 Sep — Strings

### string-basics — Strings — length, index, traversal

**Sources:**
- MDN, "Strings — a first splash" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
- javascript.info, "Strings" — https://javascript.info/string
- YouTube search: "JavaScript strings length index for loop beginner"

**Explain:**
A string is a sequence of characters, written between single quotes `'...'`, double quotes `"..."`, or backticks `` `...` `` (backticks also allow "template literals" with `${}` for inserting variables directly into text). Every string has a `.length` property that tells you how many characters it contains, including spaces and punctuation. You can access an individual character using square brackets and its index, like `text[0]` for the first character — remember that indexes start at `0`, so the last character is at `text.length - 1`. Strings are "immutable" in JavaScript, meaning you cannot change a character in place (`text[0] = "X"` does nothing); instead, you build a new string from parts. Because strings behave like an indexed sequence, you can traverse (walk through) every character using a `for` loop, checking or building something character by character — this is the same pattern you used for arrays-to-come, and it's the base for classic exercises like counting vowels or reversing text. Template literals with backticks are the modern, readable way to combine variables and text, replacing a lot of `+` concatenation: `` `Hello, ${name}!` `` is easier to read than `"Hello, " + name + "!"`. Comparing strings uses the same `===` operator as numbers, and is case-sensitive, so `"Hello" === "hello"` is `false`. Getting comfortable with string indexing and traversal sets you up perfectly for tomorrow's string methods and string challenges.

**Key terms:** string, `.length`, index, template literal (backtick string), `${}`, immutability, string traversal.

**Examples:**
```js
let word = "JavaScript";
console.log(word.length);   // 10
console.log(word[0]);       // "J"
console.log(word[word.length - 1]); // "t"
```
```js
let name = "Amine";
let age = 20;
console.log(`My name is ${name} and I am ${age} years old.`);
```
```js
// Traversing a string character by character
let text = "code";
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
```
```js
console.log("Hello" === "hello"); // false, case-sensitive
console.log("Hello" === "Hello"); // true
```
```js
// Building a new string from characters (strings are immutable)
let original = "abc";
let upperManual = "";
for (let i = 0; i < original.length; i++) {
  upperManual += original[i].toUpperCase();
}
console.log(upperManual); // "ABC"
```

**Mistakes:**
- Trying to reassign a single character with `text[0] = "X"` and expecting it to work — strings are immutable.
- Off-by-one errors when finding the last character (forgetting `- 1`).
- Comparing strings with different casing and expecting them to match.

**Checkpoints:**
- Q: What does `"hello".length` return? A: `5`.
- Q: How do you access the last character of a string called `text`? A: `text[text.length - 1]`.
- Q: Are strings mutable or immutable in JavaScript? A: Immutable — you cannot change a character in place.

**Practice:** Write a loop that prints every character of your first name on its own line, then write a template literal that introduces yourself using at least two variables.

---

### string-methods — Essential string methods

**Sources:**
- MDN, "String" reference — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- javascript.info, "Strings" (methods section) — https://javascript.info/string#the-length-property
- MDN, "String.prototype.slice()" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
- YouTube search: "JavaScript string methods slice includes trim toUpperCase"

**Explain:**
Beyond indexing, JavaScript strings come with many built-in methods that make common tasks easy. `.slice(start, end)` extracts part of a string, from the `start` index up to (but not including) the `end` index — if you omit `end`, it slices to the end of the string. `.includes(substring)` returns `true` or `false` depending on whether the substring appears anywhere inside the string, which is very handy for search-like checks. `.toUpperCase()` and `.toLowerCase()` return a new string with all letters converted, useful for case-insensitive comparisons. `.trim()` removes whitespace from the start and end of a string, which is essential when cleaning up user input. `.indexOf(substring)` returns the position where a substring first appears, or `-1` if it's not found at all. `.split(separator)` breaks a string into an array of pieces based on a separator, for example splitting a sentence into words by splitting on `" "`. All of these methods return a *new* string or array — none of them change the original string, because strings are immutable, as we learned yesterday. Chaining methods together, like `text.trim().toLowerCase()`, is a common and powerful pattern once you're comfortable with each method individually. Knowing these methods well will make tomorrow's string challenges (vowels, palindrome, reverse) much faster to solve.

**Key terms:** `.slice()`, `.includes()`, `.toUpperCase()`, `.toLowerCase()`, `.trim()`, `.indexOf()`, `.split()`, method chaining.

**Examples:**
```js
let text = "JavaScript is fun";
console.log(text.slice(0, 10)); // "JavaScript"
console.log(text.slice(11));    // "is fun"
```
```js
console.log("JavaScript is fun".includes("fun"));   // true
console.log("JavaScript is fun".includes("Python")); // false
```
```js
console.log("Hello".toUpperCase()); // "HELLO"
console.log("Hello".toLowerCase()); // "hello"
```
```js
let messy = "   hi there   ";
console.log(`"${messy.trim()}"`); // "hi there"
```
```js
console.log("hello world".indexOf("world")); // 6
console.log("hello world".indexOf("bye"));   // -1
```
```js
let sentence = "core javascript is powerful";
let words = sentence.split(" ");
console.log(words); // [ "core", "javascript", "is", "powerful" ]
```

**Mistakes:**
- Expecting `.toUpperCase()` or `.slice()` to change the original variable — they return a *new* string, so you must store the result.
- Forgetting that `.slice(start, end)` excludes the `end` index itself.
- Assuming `.indexOf()` returns `false` when not found — it actually returns `-1`.

**Checkpoints:**
- Q: What does `"hello".slice(1, 3)` return? A: `"el"`.
- Q: What does `.includes()` return? A: A boolean, `true` or `false`.
- Q: Do string methods change the original string? A: No, they return a new string; the original is unchanged.

**Practice:** Take a sentence stored in a variable, and using only the methods above, print it in uppercase, print whether it includes a certain word, and split it into an array of words.

---

### string-challenges — String challenges

**Sources:**
- javascript.info, "Strings" (task section at bottom of page) — https://javascript.info/string
- freeCodeCamp, "Basic Algorithm Scripting" (string challenges) — https://www.freecodecamp.org/learn/
- YouTube search: "JavaScript reverse string palindrome count vowels tutorial"

**Explain:**
Today we combine everything from the last two lessons — indexing, traversal, and methods — to solve classic beginner exercises. Counting vowels means looping through every character of a string and checking if it matches one of `a, e, i, o, u` (usually after converting to lowercase first, so the check is case-insensitive). Counting occurrences of a specific letter or word follows the same pattern: loop through, compare, and increase a counter each time you find a match. Reversing a string can be done manually with a loop that walks backward from the last index to the first, building a new string one character at a time — this reinforces that strings are immutable and you must build a new one. A palindrome is a string that reads the same forwards and backwards (like "level" or "radar"); the simplest approach is to reverse the string and compare it to the original with `===`. These exercises are "classic" because they appear in almost every beginner course and technical interview — they test whether you truly understand loops, indexes, and string methods rather than just memorizing syntax. There is often more than one correct way to solve each challenge (for example, reversing with a loop vs. using `.split("").reverse().join("")` — note `.reverse()` is an array method, so this trick converts the string to an array first). For this bootcamp, try solving each challenge with a plain loop first, since that builds your fundamental logic — you can explore shortcuts afterward. Always test your solution with multiple inputs: an empty string, a single character, a normal word, and a tricky case like mixed uppercase/lowercase.

**Key terms:** vowel counting, occurrence counting, string reversal, palindrome, case-insensitive comparison, manual loop vs. built-in shortcut.

**Examples:**
```js
function countVowels(text) {
  let count = 0;
  let vowels = "aeiou";
  let lower = text.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    if (vowels.includes(lower[i])) {
      count++;
    }
  }
  return count;
}
console.log(countVowels("JavaScript")); // 3
```
```js
function countOccurrences(text, letter) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === letter) {
      count++;
    }
  }
  return count;
}
console.log(countOccurrences("banana", "a")); // 3
```
```js
function reverseString(text) {
  let reversed = "";
  for (let i = text.length - 1; i >= 0; i--) {
    reversed += text[i];
  }
  return reversed;
}
console.log(reverseString("hello")); // "olleh"
```
```js
function isPalindrome(text) {
  let lower = text.toLowerCase();
  return lower === reverseString(lower);
}
console.log(isPalindrome("level")); // true
console.log(isPalindrome("hello")); // false
```
```js
// Edge cases worth testing
console.log(countVowels(""));      // 0
console.log(reverseString("a"));   // "a"
console.log(isPalindrome("Level")); // true, case-insensitive
```

**Mistakes:**
- Forgetting to lowercase both strings before comparing, causing false negatives on palindrome checks.
- Off-by-one errors when looping backward for reversal (starting at `length` instead of `length - 1`).
- Not testing edge cases like empty strings or single characters.

**Checkpoints:**
- Q: Why do we convert to lowercase before checking for a palindrome? A: So the comparison is case-insensitive (e.g. "Level" should still count).
- Q: What loop direction do you use to reverse a string manually? A: Backward, from `length - 1` down to `0`.
- Q: What's a quick way to check if a string is a palindrome once you have `reverseString`? A: Compare the lowercase original to its lowercase reverse with `===`.

**Practice:** Write a function that counts how many times a full word (not just a letter) appears in a sentence, and test your four functions today against at least three different inputs each.

---

## Day 6 — Sat 5 Sep — Arrays

### arrays-basics — Arrays — create, index, mutate

**Sources:**
- MDN, "Arrays" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
- javascript.info, "Arrays" — https://javascript.info/array
- MDN, "Array.prototype.push()" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- YouTube search: "JavaScript arrays push pop length beginner"

**Explain:**
An array is an ordered list of values, written between square brackets and separated by commas, like `[1, 2, 3]` or `["a", "b", "c"]`. Just like strings, arrays are indexed starting at `0`, so `fruits[0]` is the first item and `fruits[fruits.length - 1]` is the last. Unlike strings, arrays are mutable — you can change an item directly with `fruits[1] = "mango"`. The `.length` property tells you how many items are in the array. `.push(value)` adds a new item to the end of the array, and `.pop()` removes and returns the last item — both change the array in place. There are also `.unshift(value)` to add to the beginning and `.shift()` to remove from the beginning, though these are used less often because they're slower for large arrays. Arrays can hold any type of value, including numbers, strings, booleans, other arrays, or even objects (we'll combine arrays and objects on Day 7). You can create an empty array with `[]` and grow it with `.push()` inside a loop, which is an extremely common pattern for collecting results. Declaring an array with `const` still lets you `.push()`, `.pop()`, or change items by index — `const` only prevents reassigning the variable to a completely different array, not mutating its contents. Arrays are one of the most important data structures you will use in almost every program from now on, so being fluent with indexing and mutation is essential before we move to traversal tomorrow... today, actually — traversal is next in this same lesson group.

**Key terms:** array, index, `.length`, mutability, `.push()`, `.pop()`, `.unshift()`, `.shift()`, array of mixed types.

**Examples:**
```js
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.length); // 3
console.log(fruits[0]);     // "apple"
```
```js
let fruits = ["apple", "banana", "cherry"];
fruits[1] = "mango"; // mutate an existing item
console.log(fruits); // [ "apple", "mango", "cherry" ]
```
```js
let numbers = [1, 2, 3];
numbers.push(4);   // add to the end
console.log(numbers); // [1, 2, 3, 4]
let last = numbers.pop(); // remove from the end
console.log(last, numbers); // 4  [1, 2, 3]
```
```js
let queue = [];
queue.push("first in line");
queue.push("second in line");
console.log(queue);
```
```js
const scores = [10, 20, 30]; // const array, but contents can change
scores.push(40);
console.log(scores); // [10, 20, 30, 40]
```

**Mistakes:**
- Thinking `const` prevents changing array contents — it only prevents reassigning the variable itself.
- Accessing an index that doesn't exist (e.g. `fruits[10]` on a 3-item array), which returns `undefined` instead of an error.
- Confusing `.push()`/`.pop()` (end of array) with `.unshift()`/`.shift()` (beginning of array).

**Checkpoints:**
- Q: What does `.push()` do? A: Adds a new item to the end of the array.
- Q: Can you change the contents of a `const` array? A: Yes, `const` only prevents reassigning the variable to a new array.
- Q: What is returned when accessing an index that doesn't exist? A: `undefined`.

**Practice:** Create an array of 5 favorite movies, print the first and last one, add a new movie with `.push()`, remove one with `.pop()`, and print the final array.

---

### array-traversal — Array traversal — sum, avg, min, max

**Sources:**
- javascript.info, "Arrays" (loop examples) — https://javascript.info/array
- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- YouTube search: "JavaScript find sum average min max in array for loop"

**Explain:**
Traversal means visiting every element of an array, usually with a `for` loop where the loop variable is used as the index: `for (let i = 0; i < arr.length; i++)`. To calculate a sum, start with a variable at `0` before the loop, then add each item to it as you go. To calculate an average, divide the sum by `arr.length` after the loop finishes — remember to guard against dividing by zero if the array might be empty. To find the maximum or minimum, start by assuming the first item is the best candidate, then loop through the rest, replacing your candidate whenever you find something bigger (for max) or smaller (for min). This pattern — start with an initial "best guess", then update it as you scan — is one of the most reusable patterns in programming, and it appears again in linear search next week. Always use `arr.length` in the loop condition rather than a hard-coded number, so your code still works if the array's size changes. It's good practice to name your accumulator variables clearly: `sum`, `total`, `max`, `min`, rather than generic names like `x`. Test your traversal functions on small arrays where you can compute the answer by hand, so you can verify your code is correct before trusting it on bigger data. These four patterns (sum, average, min, max) are building blocks you'll reuse constantly, including in the mini-project in week two.

**Key terms:** traversal, accumulator, sum, average, minimum, maximum, "start with first item as candidate" pattern.

**Examples:**
```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(sumArray([1, 2, 3, 4])); // 10
```
```js
function averageArray(arr) {
  if (arr.length === 0) return 0;
  return sumArray(arr) / arr.length;
}
console.log(averageArray([2, 4, 6])); // 4
```
```js
function maxArray(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(maxArray([3, 7, 2, 9, 4])); // 9
```
```js
function minArray(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}
console.log(minArray([3, 7, 2, 9, 4])); // 2
```

**Mistakes:**
- Starting `sum` inside the loop instead of before it, which resets it every pass.
- Starting the max/min loop from index `0` again while also using `arr[0]` as the initial candidate (harmless but slightly redundant) versus forgetting to start at index `1` (also harmless) — the real bug is starting `max` at `0` instead of `arr[0]`, which fails for arrays of all-negative numbers.
- Dividing by `arr.length` without checking for an empty array first, which causes division by zero.

**Checkpoints:**
- Q: Why should `max` start as `arr[0]` rather than `0`? A: Because if all numbers are negative, starting at `0` would give a wrong (too high) result.
- Q: What do you divide the sum by to get the average? A: The array's `.length`.
- Q: What should a well-written `averageArray` do if given an empty array? A: Return `0` (or handle it safely) instead of crashing from division by zero.

**Practice:** Write a function `range(arr)` that returns the difference between the max and min of an array, and test all four functions (sum, average, min, max) on an array of your choosing, verifying the results by hand.

---

### array-challenges — Array challenges (search, counting, inversion)

**Sources:**
- javascript.info, "Arrays" (tasks section) — https://javascript.info/array
- MDN, "Array" reference (for `.includes()`, `.indexOf()`) — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- YouTube search: "JavaScript array practice problems for beginners"

**Explain:**
Today's challenges combine traversal with conditions to solve realistic small problems. A simple search means looping through an array and checking each item against a target, returning the index if found (or `-1` if not) — this is the same idea as `.indexOf()`, but writing it yourself builds your understanding for linear search next week. Counting means looping through and incrementing a counter every time an item matches a condition, for example counting how many numbers in an array are even, or how many times a specific value appears. Inversion (reversing an array) follows the same backward-loop idea as string reversal: create a new empty array, then loop from the last index to the first, pushing each item into the new array. You should also practice filtering by hand: building a new array containing only the items that pass a certain test, like all numbers greater than 10 — this is manual because we are not yet using array methods like `.filter()` (those are for a later, more advanced course; here we build the loop ourselves to understand the logic). When solving array challenges, always ask: "What do I need to track as I go?" (a counter, a running sum, a found index, a new array) and "What do I return at the end?". Draw out small examples on paper first if a problem feels confusing — tracing through the array by hand, one index at a time, before writing code, prevents a lot of bugs. These patterns—search, count, reverse, filter—are exactly what you'll need next week for linear search, sorting, and the mini-project.

**Key terms:** manual search, counting pattern, array reversal (inversion), manual filter, index tracking, "found" flag.

**Examples:**
```js
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
console.log(findIndex([5, 8, 2, 9], 2)); // 2
console.log(findIndex([5, 8, 2, 9], 100)); // -1
```
```js
function countEven(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      count++;
    }
  }
  return count;
}
console.log(countEven([1, 2, 3, 4, 5, 6])); // 3
```
```js
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}
console.log(reverseArray([1, 2, 3])); // [3, 2, 1]
```
```js
function greaterThan(arr, limit) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > limit) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(greaterThan([4, 15, 8, 23, 1], 10)); // [15, 23]
```

**Mistakes:**
- Returning inside the loop too early or not returning `-1` after the loop when nothing is found.
- Forgetting to `push` into a new array when building a filtered or reversed result, and accidentally mutating the original array instead.
- Off-by-one errors when looping backward for reversal.

**Checkpoints:**
- Q: What should a search function return if the target isn't found? A: `-1` (by convention).
- Q: What pattern do you use to build a new filtered array manually? A: Loop through, test a condition, and `.push()` matching items into a new array.
- Q: Why do we build a *new* array for `reverseArray` instead of modifying the original in place? A: To avoid unexpectedly changing data the caller might still need in its original order.

**Practice:** Write a function `countOccurrencesInArray(arr, value)` that counts how many times `value` appears anywhere in the array, and test it alongside all your Day 6 functions on at least two different arrays.

---

## Day 7 — Mon 7 Sep — Objects & arrays of objects

### objects-basics — Objects (properties, values, access, update)

**Sources:**
- MDN, "Object basics" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
- javascript.info, "Objects" — https://javascript.info/object
- YouTube search: "JavaScript objects properties dot notation bracket notation"

**Explain:**
An object is a collection of related data stored as key-value pairs, written between curly braces, like `{ name: "Sara", age: 20 }`. Each key (also called a property name) is connected to a value, and together they describe one "thing" — a person, a product, a car — in a structured way. You access a property using dot notation, `person.name`, or bracket notation, `person["name"]` — bracket notation is required when the key is stored in a variable or contains spaces/special characters. You can update an existing property by assigning a new value, `person.age = 21`, and you can add a brand-new property the same way, even if it didn't exist before: `person.city = "Rabat"`. You can also delete a property with the `delete` keyword, though this is used less often than updating. Objects can contain any type of value, including strings, numbers, booleans, arrays, and even other objects (called nested objects), which lets you model more complex real-world data. Just like arrays, objects declared with `const` can still have their properties changed — `const` only locks the variable itself, not its contents. You can check if a key exists using `"key" in object` or by checking if `object.key !== undefined`. Objects are the natural next step after arrays: while arrays are great for ordered lists of similar things, objects are great for describing one thing with several different named attributes — and tomorrow we'll combine both into arrays of objects, which is how most real data is actually structured.

**Key terms:** object, property (key), value, dot notation, bracket notation, nested object, `delete`, `in` operator.

**Examples:**
```js
let person = { name: "Sara", age: 20, city: "Marrakesh" };
console.log(person.name);   // "Sara"
console.log(person["age"]); // 20
```
```js
let person = { name: "Sara", age: 20 };
person.age = 21;      // update existing property
person.city = "Fes";  // add new property
console.log(person);
```
```js
let car = {
  brand: "Toyota",
  model: "Corolla",
  specs: { year: 2022, color: "blue" } // nested object
};
console.log(car.specs.year); // 2022
```
```js
let key = "name";
let person = { name: "Omar" };
console.log(person[key]); // "Omar", bracket notation with a variable key
```
```js
let product = { title: "Book", price: 50 };
console.log("price" in product); // true
delete product.price;
console.log(product); // { title: "Book" }
```

**Mistakes:**
- Using dot notation with a variable key (`person.key` instead of `person[key]`), which looks for a literal property called "key".
- Forgetting that accessing a property that doesn't exist returns `undefined`, not an error.
- Confusing object property order expectations — objects are for named access, not for order-dependent logic like arrays.

**Checkpoints:**
- Q: How do you access a property called `price` on an object called `product`? A: `product.price` or `product["price"]`.
- Q: When must you use bracket notation instead of dot notation? A: When the key is stored in a variable, or contains spaces/special characters.
- Q: Does using `const` prevent changing an object's properties? A: No, it only prevents reassigning the variable to a different object.

**Practice:** Create an object describing yourself (name, age, city, favorite hobby), print each property, then update one property and add a brand-new one.

---

### array-of-objects — Arrays of objects (traverse and search records)

**Sources:**
- javascript.info, "Objects" and "Arrays" combined practice — https://javascript.info/object
- MDN, "Working with objects" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
- YouTube search: "JavaScript array of objects loop find beginner"

**Explain:**
An array of objects is exactly what it sounds like: a list where each item is an object, which is how most real-world data is represented — a list of students, products, or orders. You access one record by its index first, then its property: `students[0].name` gets the `name` of the first student in the array. To traverse an array of objects, you use the same `for` loop pattern as before, but inside the loop you work with `arr[i].propertyName` instead of just `arr[i]`. Searching for a specific record means looping through and checking a property against a target value, for example finding the student whose `id` matches a given number, and returning the whole object (or `null`/`undefined` if not found) rather than just a boolean. You can also compute aggregates across an array of objects, like the total or average of a specific property — for example, the average `age` of all students, or the total `price` of all products — by adapting the sum/average pattern from Day 6 to read `arr[i].price` instead of `arr[i]`. Filtering an array of objects follows the same manual-filter pattern: loop through, test a property, and push matching objects into a new array, for example "all students older than 18". This combination — arrays holding objects, each object holding named fields — is the shape of almost all realistic data you will work with, including in this bootcamp's mini-project and in any future database or API you'll learn about later. Practicing comfortable dot-notation access inside a loop (`arr[i].field`) today will make the rest of the bootcamp much smoother.

**Key terms:** array of objects, record, `arr[i].property`, search by property, aggregate over objects, manual filter over objects.

**Examples:**
```js
let students = [
  { id: 1, name: "Sara", age: 20 },
  { id: 2, name: "Omar", age: 22 },
  { id: 3, name: "Nadia", age: 19 }
];
console.log(students[0].name); // "Sara"
```
```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name, "-", students[i].age);
}
```
```js
function findStudentById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}
console.log(findStudentById(students, 2)); // { id: 2, name: "Omar", age: 22 }
```
```js
function averageAge(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].age;
  }
  return sum / list.length;
}
console.log(averageAge(students)); // 20.33...
```
```js
function studentsOlderThan(list, limit) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].age > limit) {
      result.push(list[i]);
    }
  }
  return result;
}
console.log(studentsOlderThan(students, 19));
```

**Mistakes:**
- Forgetting the `.property` after the index, e.g. `students[i]` instead of `students[i].age`, and getting the whole object instead of a number.
- Returning `true`/`false` from a search function when the whole record (or `null`) is expected.
- Mutating a record you found through search when you only meant to read its data.

**Checkpoints:**
- Q: How do you access the `name` of the second item in an array of student objects called `students`? A: `students[1].name`.
- Q: What should a "find by id" function return if no record matches? A: `null` (or `undefined`), not `false` or `-1`.
- Q: What loop pattern do you use to compute the average of a property across an array of objects? A: The sum/average pattern, reading `arr[i].property` instead of `arr[i]`.

**Practice:** Build an array of 5 objects representing products (`name`, `price`, `inStock`), then write functions to find a product by name, compute the total price of all products, and list only the products currently in stock.

---

## Day 8 — Tue 8 Sep — Search & sorting

### linear-search — Linear search (& binary-search idea)

**Sources:**
- javascript.info, "Arrays" (search patterns) — https://javascript.info/array
- freeCodeCamp, "Search Algorithms" conceptual overview — https://www.freecodecamp.org/news/search-algorithms-explained/
- YouTube search: "linear search vs binary search explained simply"

**Explain:**
Linear search is the simplest way to find a value in an array: start at index `0` and check every element one by one until you find a match or reach the end. Its defining feature is that it works on any array, sorted or not, because it doesn't assume anything about the order of the data. The cost of linear search grows with the size of the array: in the worst case (the value is last, or not present at all), you check every single item, so a bigger array means more work. Binary search is a much faster alternative, but it only works on a sorted array: it repeatedly checks the middle element, and depending on whether the target is smaller or larger, it discards half of the remaining array each time, narrowing down the search area very quickly. Because binary search relies on comparing against a sorted middle point, an unsorted array must be sorted first before binary search can be used correctly — this is exactly why sorting (today's second lesson) matters so much for search performance. For this bootcamp, you must be able to implement linear search confidently in Core JS; understanding the idea of binary search (fewer comparisons on sorted data by repeatedly halving the search range) is enough, without needing to master its full implementation yet. A helpful mental model: linear search is like reading a book page by page looking for a name; binary search is like using the fact that a dictionary is alphabetically sorted to jump straight to roughly the right section. Comparing the two builds your intuition for why data structure and order matter, which is a core idea in computer science broadly, not just JavaScript.

**Key terms:** linear search, binary search (conceptual), sorted vs unsorted array, worst case, halving the search range.

**Examples:**
```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // found at index i
    }
  }
  return -1; // not found
}
console.log(linearSearch([4, 8, 15, 16, 23], 15)); // 2
console.log(linearSearch([4, 8, 15, 16, 23], 99)); // -1
```
```js
// Linear search works on unsorted data too
console.log(linearSearch([23, 4, 16, 8, 15], 8)); // 3
```
```js
// Conceptual binary search on a SORTED array
function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) {
      return mid;
    } else if (sortedArr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
console.log(binarySearch([2, 4, 8, 15, 16, 23], 16)); // 4
```
```js
// Why order matters: binary search fails silently on unsorted data
console.log(binarySearch([23, 4, 16, 8, 15], 8)); // may return -1, wrong!
```

**Mistakes:**
- Using binary search on an unsorted array, which can give an incorrect result.
- Forgetting to return `-1` when linear search finishes without finding a match.
- Confusing the *value* found with its *index* — search functions here return the index, not the value itself.

**Checkpoints:**
- Q: Does linear search require the array to be sorted? A: No, it works on any order.
- Q: Why does binary search require a sorted array? A: Because it decides which half to discard based on comparing the target to the middle value, which only makes sense if the data is ordered.
- Q: In the worst case, how many items might linear search need to check in an array of 100 items? A: All 100.

**Practice:** Write your own `linearSearch` function from scratch (without looking at today's example) and test it on both a sorted and an unsorted array of numbers, including a case where the target isn't present.

---

### sorting-basics — Bubble sort & selection sort

**Sources:**
- javascript.info, "Sorting" concepts (general array practice) — https://javascript.info/array#sorting-an-array
- Visualgo, "Sorting" interactive visualizer — https://visualgo.net/en/sorting
- YouTube search: "bubble sort selection sort explained step by step animation"

**Explain:**
Sorting means rearranging an array's items into order, usually ascending (smallest to largest). Bubble sort repeatedly walks through the array, comparing each pair of neighboring items and swapping them if they're in the wrong order; after each full pass, the largest unsorted item "bubbles up" to its correct position at the end, so you need nested loops — an outer loop for each pass, and an inner loop for each comparison. Selection sort works differently: for each position starting from the beginning, it scans the rest of the array to find the smallest remaining value, then swaps that smallest value into the current position — so it "selects" the correct value for each slot one at a time. Both algorithms use nested loops and are considered simple, beginner-friendly sorting methods, but they are not the fastest for large data; that's fine for this bootcamp, because the goal is to understand *how* sorting works step by step, not to write production-grade performance code. In real projects, you'd use the built-in `Array.prototype.sort()` method, but we implement bubble and selection sort manually here specifically to strengthen your understanding of nested loops, swapping, and comparisons. Swapping two array values needs a temporary variable to avoid losing one of the values: store one value temporarily, overwrite it with the other, then use the temporary value for the second slot. A useful optimization for bubble sort is to stop early if a full pass makes zero swaps, since that means the array is already sorted — this isn't required, but it's worth knowing about. Tracing both algorithms by hand on a small array of 4-5 numbers, writing down the array's state after every single swap, is the best way to truly understand them before you trust your code.

**Key terms:** bubble sort, selection sort, pass, swap, temporary variable, ascending order, nested loop (again), early-exit optimization.

**Examples:**
```js
function bubbleSort(arr) {
  let result = [...arr]; // copy so we don't mutate the original
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        // swap using a temporary variable
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
}
console.log(bubbleSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]
```
```js
function selectionSort(arr) {
  let result = [...arr];
  for (let i = 0; i < result.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    // swap the found minimum with the current position
    let temp = result[i];
    result[i] = result[minIndex];
    result[minIndex] = temp;
  }
  return result;
}
console.log(selectionSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]
```
```js
// Tracing a swap manually
let a = 3, b = 7;
let temp = a;
a = b;
b = temp;
console.log(a, b); // 7 3
```
```js
// Verifying both sorts agree on the same input
let data = [40, 10, 30, 20];
console.log(bubbleSort(data));
console.log(selectionSort(data));
```

**Mistakes:**
- Swapping values without a temporary variable, which overwrites one value before it's saved.
- Off-by-one errors in the inner loop bounds, especially in bubble sort's `length - 1 - i`.
- Sorting the original array in place when you meant to keep an unsorted copy for comparison (use `[...arr]` to copy first).

**Checkpoints:**
- Q: What's the core difference between bubble sort and selection sort? A: Bubble sort repeatedly swaps neighboring out-of-order pairs; selection sort finds the minimum remaining value and places it directly.
- Q: Why do you need a temporary variable when swapping two array values? A: To avoid losing one value's data when overwriting the array positions.
- Q: What does `[...arr]` do in the examples above? A: Creates a shallow copy of the array, so the original isn't mutated.

**Practice:** Trace `bubbleSort([4, 1, 3, 2])` by hand, writing the array's state after every swap, then verify your trace matches your code's output using `console.log` inside the loop.

---

## Day 9 — Wed–Thu 9–10 Sep — Mini project SAS

### mini-project-brief — Mini project brief

**Sources:**
- MDN, "Building blocks" learning path recap — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
- javascript.info full index (for review while building) — https://javascript.info/
- YouTube search: "beginner JavaScript project ideas console app"

**Explain:**
The mini-project is your chance to combine everything from the past eight days into one working Core JS program, without using any forbidden features (still no DOM, fetch, classes, or async). A good project idea for this level is a simple console-based data manager: for example, a "student grade manager" or "small inventory tracker" that stores an array of objects, and lets you search, filter, sort, and compute statistics (sum, average, min, max) on that data using only functions you write yourself. The scope should be realistic for roughly a day and a half of work: aim for 5-8 small functions rather than one giant program, and get each function fully working and tested with `console.log` before moving to the next. Structure your project as a single `.js` file (or a few files if your instructor allows splitting), with a clear top section defining your sample data (an array of objects), followed by your functions, and a bottom section that calls your functions and logs the results — this bottom section acts as your "demo script" for the defense on Day 10. You must use Git throughout: commit after each function works, with clear messages like "add search by name function", so your GitHub history shows your progress over the two days, not just one final commit. Re-use the patterns you've already practiced: linear search for "find by property", the sum/average/min/max pattern for statistics, and bubble or selection sort for ordering your records by some field (like sorting products by price). Keep your console output readable: use clear `console.log` labels like `console.log("Average price:", avg)` rather than printing bare numbers, so anyone reviewing your output understands it immediately. Ask your instructor for help early if you get stuck on scope or a bug — the goal is a small, working, well-tested project, not a huge, half-finished one.

**Key terms:** project scope, sample data (array of objects), demo script, Git commit history, readable console output.

**Examples:**
```js
// Example starting shape for a "product inventory" mini project
const products = [
  { name: "Notebook", price: 15, quantity: 40 },
  { name: "Pen", price: 3, quantity: 150 },
  { name: "Backpack", price: 90, quantity: 8 }
];

function findProductByName(list, name) { /* ...linear search... */ }
function totalInventoryValue(list) { /* ...sum of price * quantity... */ }
function sortByPrice(list) { /* ...bubble or selection sort by price... */ }

// Demo section at the bottom of the file
console.log(findProductByName(products, "Pen"));
console.log("Total value:", totalInventoryValue(products));
console.log(sortByPrice(products));
```
```js
// Good console output labeling habit
console.log("--- Search result ---");
console.log(findProductByName(products, "Backpack"));
console.log("--- Sorted by price ---");
console.log(sortByPrice(products));
```
```
git add .
git commit -m "add totalInventoryValue function with tests"
git push
```

**Mistakes:**
- Choosing a project scope that's too large (e.g. trying to build a full store simulation) and running out of time.
- Writing all the code first and testing at the very end, instead of testing each function as you finish it.
- Committing only once at the very end, losing the benefit of a clear progress history.

**Checkpoints:**
- Q: What is the recommended number of functions for the mini-project? A: Roughly 5-8 small, well-tested functions.
- Q: Why should you commit after each function works, rather than once at the end? A: To show clear progress in your Git history and avoid losing work.
- Q: What forbidden features must the mini-project still avoid? A: DOM, HTML/CSS, events, fetch/AJAX, classes, async/await, and other items outside Core JS.

**Practice:** Write your project's sample data (array of at least 5 objects) and a one-paragraph plan listing the functions you intend to build, before writing any function logic.

---

### mini-project-checkpoints — Project checkpoints (testable milestones)

**Sources:**
- GitHub Docs, "About issues" (for tracking milestones, optional) — https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- javascript.info, general reference for debugging while building — https://javascript.info/debugging-chrome
- YouTube search: "how to plan and test a small coding project step by step"

**Explain:**
Breaking your mini-project into checkpoints makes it much less overwhelming and gives you clear, testable proof of progress at each stage. Checkpoint 1 is your data setup: define your array of objects with realistic sample values, and confirm with `console.log` that it looks correct before writing any logic that depends on it. Checkpoint 2 is your "read" functions: things that look at the data without changing it, like finding a record, filtering by a condition, or computing a statistic (sum/average/min/max) — test each one individually with at least two different inputs. Checkpoint 3 is your "search and sort" functions: implement linear search for at least one lookup, and bubble or selection sort for at least one ordering, and confirm the output is correctly ordered by printing it. Checkpoint 4 is your "demo script": a clean section at the bottom of your file that calls every function you wrote, in a logical order, with labeled `console.log` output that would make sense to someone seeing it for the first time. Checkpoint 5 is your Git history: confirm you have several small, clearly-labeled commits pushed to GitHub, not just one big commit — this is often checked separately from the code itself. At each checkpoint, ask yourself: "If I ran this file right now, would everything print correctly with no errors?" — if not, fix it before moving to the next checkpoint, rather than stacking new code on top of broken code. Treat each checkpoint like a mini save point: once it works, commit it, so you can always return to a known-good state if something breaks later. By the end of Day 9, you should be able to run your whole file from top to bottom with `node` and see a clean, complete demo output with no errors.

**Key terms:** milestone/checkpoint, read function vs. mutating function, demo script, "known-good state", incremental testing.

**Examples:**
```js
// Checkpoint 1: data setup, verify visually
console.log("Sample data:", products);
```
```js
// Checkpoint 2: read functions, tested individually
console.log(findProductByName(products, "Pen"));   // should return the Pen object
console.log(findProductByName(products, "Chair")); // should return null (not found)
```
```js
// Checkpoint 3: search & sort, verify order is correct
let sorted = sortByPrice(products);
console.log(sorted.map ? sorted : sorted); // check ascending price order visually
```
```js
// Checkpoint 4: full demo script at the bottom of the file
console.log("=== MINI PROJECT DEMO ===");
console.log("All products:", products);
console.log("Find 'Pen':", findProductByName(products, "Pen"));
console.log("Total value:", totalInventoryValue(products));
console.log("Sorted by price:", sortByPrice(products));
```

**Mistakes:**
- Moving to the next checkpoint while the current one still has bugs or untested cases.
- Writing a demo script that only shows the "happy path" and never tests a not-found or empty-input case.
- Losing track of which checkpoint corresponds to which Git commit, making it hard to show progress at the defense.

**Checkpoints:**
- Q: What should Checkpoint 1 verify before you write any logic? A: That your sample array of objects looks correct when printed.
- Q: What is a "demo script"? A: A clean section of code that calls every function in a logical order with labeled output, used to showcase the project.
- Q: Why commit after each checkpoint rather than only at the very end? A: So you always have a known-good state to return to, and your Git history shows real progress.

**Practice:** List your own 4-5 checkpoints for your specific project idea, and commit your code right now at whatever checkpoint you've currently reached.

---

## Day 10 — Fri–Sat 11–12 Sep — Defense prep & review

### core-review — Core JS review (map of Week 1–2 skills)

**Sources:**
- MDN, "JavaScript first steps" + "Building blocks" learning paths (full recap) — https://developer.mozilla.org/en-US/docs/Learn/JavaScript
- javascript.info, full site index for review — https://javascript.info/
- YouTube search: "JavaScript fundamentals review beginner cheat sheet"

**Explain:**
This is a full recap of everything covered in the bootcamp, organized as a mental map so you can see how each piece connects to the next. We started with the absolute basics: running code with `console.log`, and Git/GitHub as the habit of saving and sharing your work. Then came variables (`let`/`const`) and primitive types, followed by operators and conditions (`if`/`else`/`switch`), which let programs make decisions. Loops (`for`/`while`, plus `break`/`continue` and nesting) let programs repeat work, and functions (classic and arrow) let you organize that work into small, reusable, named pieces with clear inputs (parameters) and outputs (`return`). Strings taught you indexing, traversal, and built-in methods, while arrays taught you the same ideas applied to lists of any kind of value, plus mutation with `.push()`/`.pop()`. Objects added named properties to describe a single "thing," and arrays of objects combined both ideas to represent realistic collections of records, like students or products. In week two, linear search taught you how to look something up by scanning, and bubble/selection sort taught you how to put data in order using nested loops and swaps — both essential algorithmic thinking skills, even beyond JavaScript. Finally, the mini-project forced you to combine all of these skills into one working, tested, Git-tracked program. When reviewing, try to explain each topic out loud in your own words, and rewrite a couple of small examples entirely from memory (without looking at your notes) to check you've truly internalized them, not just recognized them. If any topic still feels shaky, that's normal — pick 2-3 to actively practice today rather than passively re-reading everything.

**Key terms:** (recap of all bootcamp key terms) variables, operators, conditions, loops, functions, scope, strings, arrays, objects, arrays of objects, linear search, sorting.

**Examples:**
```js
// A compact review combining many concepts in one small script
const numbers = [5, 3, 8, 1, 9, 2];

function findMax(arr) {           // functions + traversal
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

const isEven = (n) => n % 2 === 0; // arrow function + operators

let evens = [];                    // manual filter (arrays)
for (let i = 0; i < numbers.length; i++) {
  if (isEven(numbers[i])) {
    evens.push(numbers[i]);
  }
}

console.log("Max:", findMax(numbers));
console.log("Evens:", evens);
```
```js
// Review: object + search + condition together
const users = [
  { id: 1, name: "Sara", active: true },
  { id: 2, name: "Omar", active: false }
];

function findActiveUser(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].active) {
      return list[i];
    }
  }
  return null;
}

console.log(findActiveUser(users));
```
```js
// Review: sorting recap
function bubbleSort(arr) {
  let result = [...arr];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
}
console.log(bubbleSort([9, 3, 7, 1]));
```

**Mistakes:**
- Re-reading notes passively instead of actively rewriting small examples from memory.
- Skipping review of topics that feel "easy" but haven't actually been tested with fresh examples.
- Cramming everything the night before the defense instead of spacing review across Day 10.

**Checkpoints:**
- Q: Name the four "shapes" of data covered in this bootcamp. A: Primitive values, strings, arrays, and objects (including arrays of objects).
- Q: What two algorithms did we study for putting data in order? A: Bubble sort and selection sort.
- Q: What algorithm scans an array one item at a time to find a target, working on unsorted data? A: Linear search.

**Practice:** Without looking at your notes, write one function from each major topic (a condition, a loop, a function, a string method use, an array traversal, an object access, a search, and a sort) in a single fresh file.

---

### defense-prep — Soutenance prep (present, demo, answer questions)

**Sources:**
- GitHub Docs, "About READMEs" (for writing a clear project README) — https://docs.github.com/en/repositories/managing-your-repository-settings-and-features/customizing-your-repository/about-readmes
- YouTube search: "how to present a coding project to a technical audience beginner"
- YouTube search: "how to explain your code in a technical interview"

**Explain:**
A "soutenance" (defense) is when you present your mini-project to instructors or peers and explain how it works — this is as much about communication as it is about code. Start by preparing a short spoken introduction: what your project does, in one or two sentences, before touching any code. Then walk through your code file top to bottom, explaining the purpose of your data structure first (why you chose these fields for your objects), then each function briefly (what it takes in, what it returns, and why it's needed), rather than reading every line aloud. Always run your demo live rather than just showing static code — running `node yourfile.js` and watching the real `console.log` output builds trust that your code actually works, and it's more engaging than a silent code read-through. Prepare for likely questions in advance: "Why did you use a `for` loop here instead of something else?", "What happens if the array is empty?", "How does your sort function work, step by step?" — practicing clear, short answers to these out loud (even alone, or with a study partner) makes a huge difference on the day. If you don't know the answer to a question, it's completely fine to say "I'm not sure, let me think" rather than guessing confidently and being wrong — instructors respect honesty and clear thinking under pressure far more than bluffing. Keep a short written README in your GitHub repo describing what the project does and how to run it (`node filename.js`), since this is often the first thing a reviewer reads before even opening your code. Time yourself doing a full practice run beforehand, so you know whether you're too short, too long, or just right for your allotted defense slot. Finally, remember that a small, working, well-explained project always defends better than a big, half-broken one you can't fully explain — clarity and understanding matter more than raw feature count.

**Key terms:** soutenance/defense, live demo, README, anticipated questions, "I don't know, let me think" (honest uncertainty), practice run/timing.

**Examples:**
```js
// A clear demo script is your best presentation tool — run this live
console.log("=== PROJECT DEMO: Inventory Manager ===");
console.log("1) All products:");
console.log(products);
console.log("2) Search for 'Pen':", findProductByName(products, "Pen"));
console.log("3) Total inventory value:", totalInventoryValue(products));
console.log("4) Products sorted by price:", sortByPrice(products));
```
```
# README.md example structure
# Inventory Manager (Core JS Mini Project)

## What it does
Tracks a small product inventory: search, total value, and sorting by price.

## How to run
node inventory.js
```
```js
// Practice explaining THIS out loud: what does it do, step by step?
function totalInventoryValue(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i].price * list[i].quantity;
  }
  return total;
}
```

**Mistakes:**
- Reading code line by line instead of explaining its purpose and behavior at a higher level.
- Not testing the live demo beforehand, risking an on-the-spot crash in front of the audience.
- Guessing confidently at a question instead of honestly saying you're not sure and reasoning it through.

**Checkpoints:**
- Q: Why is a live demo better than just showing static code? A: It proves the code actually works and is more engaging for the audience.
- Q: What should you do if you don't know the answer to a defense question? A: Say so honestly, and try to reason through it out loud rather than guessing confidently.
- Q: What should a project README typically include? A: A short description of what the project does and how to run it.

**Practice:** Write a README for your mini-project, do one full timed practice run of your presentation and live demo out loud, and write down two questions you think you might be asked, with short prepared answers.
