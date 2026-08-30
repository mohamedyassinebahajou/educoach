# YouCode SAS — JavaScript Training (W3Schools-style, Detailed)

Core JavaScript only. No DOM, events, fetch, classes, async/await. Run every example with `node file.js` or a browser console.

---

## Day 1 — Welcome & first JavaScript

### welcome-to-javascript

**What is JavaScript?**
JavaScript is a programming language that gives step-by-step instructions to a computer. In this SAS training, we use it without any web page — just a console that prints text and numbers.
```js
console.log("JavaScript runs here, no browser needed.");
```

**JavaScript vs Java**
Despite the similar name, JavaScript and Java are two unrelated languages, created by different companies for different purposes. JavaScript is much simpler to start with.
```js
// This is JavaScript, not Java — no semicolons or types are required to declare a variable
let message = "I am JavaScript";
console.log(message);
```

**What "Core JavaScript" means**
Core JavaScript is the part of the language that works everywhere — in a browser, in Node.js, or in any script file. It includes variables, conditions, loops, functions, strings, arrays, and objects, which is exactly what this SAS training covers.
```js
let coreTopics = ["variables", "loops", "functions", "arrays", "objects"];
console.log(coreTopics);
```

**How the SAS training is organized**
Week one builds the fundamentals (variables, conditions, loops, functions, strings, arrays). Week two applies them (objects, search, sorting, mini-project, and defense). Each day builds directly on the previous one.
```js
console.log("Day 1: fundamentals -> Day 10: defense of your own project");
```

**Note:** JavaScript is case-sensitive — `Console.log` is different from `console.log`.

**More Examples:**
```js
console.log("Welcome to YouCode SAS!");
console.log(2 + 2);
```
```js
console.log("Sum:", 3 + 4);
console.log("Text:", "JS" + "2026");
```
```js
// Comments start with // and are ignored when the code runs
console.log("This line runs.");
// console.log("This line is commented out and will not run.");
```

**Exercises:**

1. Print your first name.
2. Print the result of `5 * 6`.
```js
console.log(___);
console.log(___);
```
<details><summary>Answer</summary>

```js
console.log("Yourname");
console.log(5 * 6);
```
</details>

3. Predict the output, then run it to check.
```js
console.log("Hello");
console.log(10 - 3);
console.log("Hello" + "World");
```
<details><summary>Answer</summary>

```
Hello
7
HelloWorld
```
</details>

4. True or False: `console.LOG("hi")` will work the same as `console.log("hi")`.
<details><summary>Answer</summary>

False — JavaScript is case-sensitive, so `console.LOG` does not exist and will throw an error.
</details>

---

### hello-console

**What is console.log()?**
`console.log()` is a built-in function that prints whatever you put inside its parentheses. It's the main way to see what your program is doing.
```js
console.log("I can see this in the console!");
```

**Printing different types**
You can print numbers, text (strings), booleans, or several values at once, separated by commas.
```js
console.log(42, "apples", true);
```

**Running a `.js` file**
A JavaScript file is a plain text file ending in `.js`. With Node.js installed, you run it from a terminal using `node filename.js`, from the same folder as the file.
```
node hello.js
```

**Using a browser console instead**
If you don't have Node, open your browser, press F12, go to the "Console" tab, and type JavaScript directly — it runs each line immediately, which is called a REPL.
```js
// Typed directly into a browser console:
console.log("Works in the browser too!");
```

**Statements run top to bottom**
JavaScript runs your code one line at a time, from the top of the file to the bottom, unless a loop or function changes that order (we'll see this soon).
```js
console.log("first");
console.log("second");
console.log("third");
```

**Note:** Add a semicolon `;` at the end of each statement — it's good practice, even though JavaScript can sometimes guess where a line ends.

**More Examples:**
```js
console.log("Hello, YouCode!");
console.log(10, true, "text");
```
```js
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
```
```js
console.log("2 + 2 =", 2 + 2);
console.log("10 / 2 =", 10 / 2);
```

**Exercises:**

1. What does this print? Write the output, then run it to check.
```js
console.log("A");
console.log("B");
console.log(1 + 1);
```
<details><summary>Answer</summary>

```
A
B
2
```
</details>

2. Fix the broken line so it runs without an error.
```js
console.log "Hello";
```
<details><summary>Answer</summary>

```js
console.log("Hello");
```
</details>

3. Write a `.js` file (on paper or in your editor) that prints three lines: your name, your city, and your favorite number. What terminal command would you use to run a file named `me.js`?
<details><summary>Answer</summary>

```js
console.log("Yourname");
console.log("Yourcity");
console.log(7);
```
Terminal command: `node me.js`
</details>

---

### git-github-basics

**What is Git?**
Git is a tool that saves snapshots of your project over time, called commits. Every commit is a save point you can return to later.
```
git init
```

**What is GitHub?**
GitHub is a website that hosts your Git projects online, so you can back them up and share them with instructors or teammates.
```
git remote add origin https://github.com/your-username/your-repo.git
```

**Staging with git add**
Before saving a snapshot, you tell Git which files to include using `git add`. This is called "staging".
```
git add hello.js
```

**Saving a snapshot with git commit**
`git commit -m "message"` saves a snapshot of everything staged, along with a short message describing what changed.
```
git commit -m "add hello.js with first script"
```

**Uploading with git push**
`git push` sends your commits from your computer up to GitHub, so they're backed up and visible online.
```
git push -u origin main
```

**Note:** Commit often, with small, clear messages — this makes it easy to see your progress over time.

**More Examples:**
```
git add .
git commit -m "first commit"
git push
```
```
git status
git log --oneline
```
```
git clone https://github.com/username/repo.git
cd repo
```

**Exercises:**

1. Put these commands in the correct order to save and upload your work.
```
git push
git commit -m "add hello.js"
git add .
```
<details><summary>Answer</summary>

```
git add .
git commit -m "add hello.js"
git push
```
</details>

2. What does `git status` do?
<details><summary>Answer</summary>

It shows which files have changed, which are staged, and which are untracked — a quick summary of your repo's current state.
</details>

3. You changed 3 files but only want to save 2 of them in this commit. Which command lets you choose files individually instead of using `git add .`?
<details><summary>Answer</summary>

`git add filename1 filename2` — you can list specific file names instead of using `.` (which stages everything).
</details>

---

## Day 2 — Variables, operators & conditions

### variables-let-const

**Declaring with let**
`let` creates a variable that can be reassigned later. Use it whenever a value needs to change over time.
```js
let score = 0;
score = 10;
console.log(score); // 10
```

**Declaring with const**
`const` creates a variable that cannot be reassigned. Use it by default, for values that stay the same.
```js
const schoolName = "YouCode SAS";
console.log(schoolName);
```

**Naming rules**
Variable names can use letters, digits, `_`, and `$`, but can't start with a digit. JavaScript is case-sensitive, and the convention is camelCase, like `firstName`.
```js
let firstName = "Sara";
let _privateValue = 42;
console.log(firstName, _privateValue);
```

**Primitive types**
JavaScript has a few basic (primitive) types: `number`, `string`, `boolean`, `undefined`, and `null`. You check a value's type with `typeof`.
```js
console.log(typeof 10, typeof "hi", typeof true);
```

**undefined vs a value**
A variable declared without a value automatically holds `undefined` until you assign something to it.
```js
let city;
console.log(city); // undefined
city = "Marrakesh";
console.log(city); // "Marrakesh"
```

**Note:** Prefer `const` by default, and switch to `let` only when you know a value must be reassigned later.

**More Examples:**
```js
let age = 17;
const name = "Sara";
console.log(typeof age, typeof name);
```
```js
let score = 0;
score = score + 10;
console.log(score); // 10
```
```js
let city; // declared, no value yet
console.log(city);       // undefined
console.log(typeof city); // "undefined"
```

**Exercises:**

1. Fix the bug in this code.
```js
const score = 10;
score = 20;
console.log(score);
```
<details><summary>Answer</summary>

```js
let score = 10;
score = 20;
console.log(score); // 20
```
</details>

2. What does `typeof true` return?
<details><summary>Answer</summary>

`"boolean"`
</details>

3. Declare a `const` called `pi` with value `3.14`, and a `let` called `radius` with value `5`. Print both.
<details><summary>Answer</summary>

```js
const pi = 3.14;
let radius = 5;
console.log(pi, radius);
```
</details>

4. True or False: you can change the value of a `const` variable but not redeclare it.
<details><summary>Answer</summary>

False — you can neither change nor redeclare a `const` variable once it's set.
</details>

---

### operators-arithmetic

**Arithmetic operators**
`+ - * /` do the four basic math operations. `%` (modulo) gives the remainder of a division, which is very useful to test even/odd numbers.
```js
console.log(7 + 3, 7 - 3, 7 * 3, 7 / 3, 7 % 3);
```

**Assignment operators**
`=` stores a value. Compound assignments like `+=`, `-=`, `*=`, `/=` update a variable based on its current value.
```js
let total = 10;
total += 5; // same as total = total + 5
console.log(total); // 15
```

**Comparison operators**
`<`, `>`, `<=`, `>=` compare numbers. `===` checks strict equality (same value AND type); `!==` checks strict inequality. Always prefer these over `==`/`!=`.
```js
console.log(5 === 5, 5 === "5", 5 !== 6);
```

**Logical operators**
`&&` (AND) is true only if both sides are true. `||` (OR) is true if at least one side is true. `!` (NOT) flips a boolean.
```js
let isAdult = true;
let hasTicket = false;
console.log(isAdult && hasTicket, isAdult || hasTicket, !isAdult);
```

**Mixing strings and numbers with +**
The `+` operator concatenates (joins) strings, but adds numbers. If one side is a string, JavaScript converts the other side to a string too.
```js
console.log("5" + 5); // "55" (text)
console.log(5 + 5);   // 10 (number)
```

**Note:** `"5" === 5` is `false` because one is a string and the other is a number — `===` checks type too.

**More Examples:**
```js
console.log(10 % 3);     // 1
console.log(5 === "5");  // false
console.log(true && false); // false
```
```js
let total = 10;
total += 5;
console.log(total); // 15
```
```js
let hasTicket = true;
let isVIP = false;
console.log(hasTicket || isVIP); // true
console.log(!hasTicket);         // false
```

**Exercises:**

1. Predict the output, then run it.
```js
console.log(9 % 2);
console.log(4 === 4);
console.log(false || true);
```
<details><summary>Answer</summary>

```
1
true
true
```
</details>

2. Is `12` even or odd? Write one line of code using `%` to check.
<details><summary>Answer</summary>

```js
console.log(12 % 2 === 0); // true, so it's even
```
</details>

3. What's wrong with this code, and what should it be if the intent is to check equality?
```js
let x = 5;
if (x = 10) {
  console.log("x is 10");
}
```
<details><summary>Answer</summary>

`x = 10` assigns instead of comparing. It should be `if (x === 10)`.
</details>

4. Combine two booleans: write code that prints `true` only if both `isLoggedIn` and `isAdmin` are `true`.
<details><summary>Answer</summary>

```js
let isLoggedIn = true;
let isAdmin = true;
console.log(isLoggedIn && isAdmin);
```
</details>

---

### if-else

**Basic if / else**
An `if` statement runs its block of code only when the condition is `true`. `else` runs when it's `false`.
```js
let age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

**Chaining with else if**
`else if` checks additional conditions in sequence, stopping at the first one that matches.
```js
let grade = 85;
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else {
  console.log("C or below");
}
```

**Combining conditions**
You can combine comparisons with `&&` and `||` to check ranges or multiple criteria at once.
```js
let temperature = 25;
if (temperature > 20 && temperature < 30) {
  console.log("Nice weather!");
}
```

**Truthy and falsy values**
In a condition, `0`, `""`, `null`, `undefined`, and `NaN` behave as "falsy" (like `false`). Every other value is "truthy" (like `true`).
```js
if ("hello") {
  console.log("non-empty strings are truthy");
}
```

**Using switch for exact matches**
`switch` compares one value against several exact cases. Each `case` needs a `break`, or execution "falls through" into the next case.
```js
let day = "Sunday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
```

**Note:** Values `0`, `""`, `null`, `undefined`, and `NaN` are "falsy" — every other value is "truthy" inside an `if`.

**More Examples:**
```js
let age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```
```js
let grade = 85;
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else {
  console.log("C or below");
}
```
```js
let day = "Sunday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
```

**Exercises:**

1. Complete the code so it prints "C" when `grade` is 75.
```js
let grade = 75;
if (grade >= 90) {
  console.log("A");
} else if (___) {
  console.log("C");
} else {
  console.log("F");
}
```
<details><summary>Answer</summary>

```js
} else if (grade >= 70) {
```
</details>

2. Rewrite this `if/else if` chain as a `switch` statement.
```js
let fruit = "apple";
if (fruit === "apple") {
  console.log("Red or green");
} else if (fruit === "banana") {
  console.log("Yellow");
} else {
  console.log("Unknown");
}
```
<details><summary>Answer</summary>

```js
switch (fruit) {
  case "apple":
    console.log("Red or green");
    break;
  case "banana":
    console.log("Yellow");
    break;
  default:
    console.log("Unknown");
}
```
</details>

3. What prints, and why?
```js
if ("") {
  console.log("A");
} else {
  console.log("B");
}
```
<details><summary>Answer</summary>

`B` — an empty string `""` is falsy, so the `else` branch runs.
</details>

---

## Day 3 — Loops

### for-while-loops

**The for loop**
A `for` loop has three parts: initialization, condition, and update. It's best when you know roughly how many times to repeat.
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**The while loop**
A `while` loop repeats as long as its condition is true. It's best when you don't know exactly how many repeats you'll need.
```js
let i = 0;
while (i < 3) {
  console.log("while:", i);
  i++;
}
```

**Avoiding infinite loops**
If you forget to update the condition variable inside a `while` loop, it will never stop. Always make sure something inside the loop moves it closer to becoming false.
```js
let count = 0;
while (count < 3) {
  console.log(count);
  count++; // without this line, the loop never ends
}
```

**Using break**
`break` immediately exits the loop entirely, useful once you've found what you needed.
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
```

**Using continue**
`continue` skips the rest of the current pass and jumps straight to the next one, without stopping the whole loop.
```js
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue;
  console.log(i); // only odd numbers print
}
```

**Note:** Always update your loop variable inside a `while` loop, or it will run forever (an infinite loop).

**More Examples:**
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
```js
let i = 0;
while (i < 3) {
  console.log("while:", i);
  i++;
}
```
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  if (i % 2 === 0) continue;
  console.log(i);
}
```

**Exercises:**

1. Complete the loop to print numbers 1 to 5.
```js
for (let i = ___; i <= ___; i++) {
  console.log(i);
}
```
<details><summary>Answer</summary>

```js
for (let i = 1; i <= 5; i++) {
```
</details>

2. Write a `while` loop that prints "Countdown: 3", "Countdown: 2", "Countdown: 1", then "Liftoff!".
<details><summary>Answer</summary>

```js
let i = 3;
while (i >= 1) {
  console.log("Countdown:", i);
  i--;
}
console.log("Liftoff!");
```
</details>

3. What does this loop print?
```js
for (let i = 0; i < 6; i++) {
  if (i === 3) break;
  console.log(i);
}
```
<details><summary>Answer</summary>

```
0
1
2
```
</details>

4. Fix this infinite loop.
```js
let i = 0;
while (i < 5) {
  console.log(i);
}
```
<details><summary>Answer</summary>

Add `i++;` inside the loop body:
```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```
</details>

---

### nested-loops

**What is a nested loop?**
A nested loop is a loop written inside another loop. For every single pass of the outer loop, the entire inner loop runs from start to finish.
```js
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
```

**Why use nested loops**
Nested loops are useful when you need to work with two dimensions at once, like rows and columns, or every pair of items in two lists.
```js
// Multiplication table for 1 to 3
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i + " x " + j + " = " + (i * j));
  }
}
```

**Building strings with a nested loop**
You can accumulate a string inside the inner loop, then print the finished result after it completes — useful for drawing simple shapes.
```js
for (let i = 1; i <= 3; i++) {
  let row = "";
  for (let j = 0; j < i; j++) {
    row += "*";
  }
  console.log(row);
}
```

**Scope of break and continue**
`break` and `continue` only affect the loop they are directly written inside — usually the innermost one, not the outer loop.
```js
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break; // only stops the inner loop
    console.log("i:", i, "j:", j);
  }
}
```

**Naming loop variables**
Use different variable names for each loop level — commonly `i` for the outer loop and `j` for the inner loop — so they don't overwrite each other.
```js
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    console.log(`outer=${i} inner=${j}`);
  }
}
```

**Note:** `break` and `continue` only affect the loop they are written inside (usually the innermost one).

**More Examples:**
```js
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
```
```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i + " x " + j + " = " + (i * j));
  }
}
```
```js
for (let i = 1; i <= 3; i++) {
  let row = "";
  for (let j = 0; j < i; j++) {
    row += "*";
  }
  console.log(row);
}
```

**Exercises:**

1. How many times does `console.log` run?
```js
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    console.log(i, j);
  }
}
```
<details><summary>Answer</summary>

12 times (3 × 4).
</details>

2. Write nested loops that print a multiplication table for the number 7 only (7x1 to 7x10), using a single loop — is a nested loop actually necessary here? Explain.
<details><summary>Answer</summary>

A single loop is enough since only one number (7) is involved:
```js
for (let j = 1; j <= 10; j++) {
  console.log("7 x " + j + " = " + (7 * j));
}
```
Nested loops are needed when you must vary **two** things at once, like every row *and* every column of a full table.
</details>

3. Predict the output.
```js
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    if (j === 1) break;
    console.log("i:", i, "j:", j);
  }
}
```
<details><summary>Answer</summary>

```
i: 0 j: 0
i: 1 j: 0
```
(`break` only stops the inner loop each time `j` reaches 1.)
</details>

---

## Day 4 — Functions & scope

### functions-basics

**Defining a function**
A function is a named, reusable block of code. You define it once with the `function` keyword, and it doesn't run until you call it.
```js
function greet(name) {
  return "Hello, " + name + "!";
}
```

**Parameters vs arguments**
Parameters are the placeholder names in the function's definition. Arguments are the real values you pass in when calling the function.
```js
function add(a, b) { // a and b are parameters
  return a + b;
}
console.log(add(2, 3)); // 2 and 3 are arguments
```

**Returning a value**
`return` sends a value back to wherever the function was called, and immediately stops the function. Without `return`, a function produces `undefined`.
```js
function square(n) {
  return n * n; // stops here and sends back n*n
}
console.log(square(5)); // 25
```

**Default parameters**
You can give a parameter a default value, used automatically if no argument is provided for it.
```js
function greetWithDefault(name = "friend") {
  return "Hi, " + name;
}
console.log(greetWithDefault());       // "Hi, friend"
console.log(greetWithDefault("Omar")); // "Hi, Omar"
```

**Functions calling other functions**
A function can call another function inside its own body, letting you build bigger logic out of small, tested pieces.
```js
function square(n) { return n * n; }
function sumOfSquares(a, b) {
  return square(a) + square(b);
}
console.log(sumOfSquares(2, 3)); // 13
```

**Note:** A function with no `return` produces `undefined`.

**More Examples:**
```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
```
```js
function greet(name = "friend") {
  return "Hello, " + name;
}
console.log(greet());        // "Hello, friend"
console.log(greet("Nadia")); // "Hello, Nadia"
```
```js
function square(n) {
  return n * n;
}
function sumOfSquares(a, b) {
  return square(a) + square(b);
}
console.log(sumOfSquares(2, 3)); // 13
```

**Exercises:**

1. Complete the function so it returns `true` if `n` is even.
```js
function isEven(n) {
  return ___;
}
console.log(isEven(4)); // true
```
<details><summary>Answer</summary>

```js
return n % 2 === 0;
```
</details>

2. Write a function `maxOfTwo(a, b)` that returns the larger of two numbers, without using `Math.max`.
<details><summary>Answer</summary>

```js
function maxOfTwo(a, b) {
  if (a > b) return a;
  return b;
}
```
</details>

3. What does this print, and why?
```js
function sayHi() {
  console.log("Hi");
}
console.log(sayHi());
```
<details><summary>Answer</summary>

```
Hi
undefined
```
`"Hi"` is printed by the function itself; the function returns nothing, so `console.log(sayHi())` prints `undefined`.
</details>

---

### arrow-functions-scope

**What is an arrow function?**
An arrow function is a shorter way to write a function, using `=>` instead of the `function` keyword.
```js
const square = function(n) { return n * n; }; // classic
const squareArrow = (n) => n * n;             // arrow, same behavior
console.log(square(4), squareArrow(4));
```

**Implicit return**
If the function body is a single expression, you can drop the curly braces and `return` — the value is returned automatically.
```js
const double = (n) => n * 2;
console.log(double(5)); // 10
```

**Arrow functions with multiple statements**
If you need more than one statement, you must add curly braces and an explicit `return`.
```js
const describe = (n) => {
  let type = n % 2 === 0 ? "even" : "odd";
  return n + " is " + type;
};
console.log(describe(7));
```

**Block scope**
A variable declared with `let` or `const` inside a block `{ }` (like an `if` or loop) only exists inside that block.
```js
if (true) {
  let secret = "hidden";
  console.log(secret); // works here
}
// console.log(secret); // error: secret is not defined out here
```

**Function scope**
A variable declared inside a function cannot be accessed from outside that function — it's private to the function.
```js
function makeMessage() {
  let message = "hello from inside";
  return message;
}
console.log(makeMessage());
// console.log(message); // error: message is not defined
```

**Note:** If an arrow function needs more than one statement, you need curly braces AND an explicit `return`.

**More Examples:**
```js
const square = (n) => n * n;
console.log(square(4)); // 16
```
```js
const describe = (n) => {
  let type = n % 2 === 0 ? "even" : "odd";
  return n + " is " + type;
};
console.log(describe(7));
```
```js
if (true) {
  let secret = "hidden";
  console.log(secret);
}
```

**Exercises:**

1. Rewrite this function as an arrow function.
```js
function double(n) {
  return n * 2;
}
```
<details><summary>Answer</summary>

```js
const double = (n) => n * 2;
```
</details>

2. What error would this code cause, and why?
```js
function makeMessage() {
  let message = "hi";
  return message;
}
console.log(makeMessage());
console.log(message);
```
<details><summary>Answer</summary>

`message is not defined` — `message` is scoped inside `makeMessage`, so it doesn't exist outside the function.
</details>

3. Write an arrow function `isAdult(age)` that returns `true` if age is 18 or more, using implicit return (no curly braces).
<details><summary>Answer</summary>

```js
const isAdult = (age) => age >= 18;
```
</details>

---

## Day 5 — Strings

### string-basics

**What is a string?**
A string is text, written between quotes: `'...'`, `"..."`, or backticks `` `...` ``.
```js
let word = "JavaScript";
console.log(word);
```

**The length property**
Every string has a `.length` property telling you how many characters it contains, including spaces and punctuation.
```js
console.log("Code".length); // 4
```

**Indexing a string**
You access one character using square brackets and its index. Indexes start at `0`, so the last character is at `length - 1`.
```js
let word = "Code";
console.log(word[0]);                // "C"
console.log(word[word.length - 1]);  // "e"
```

**Strings are immutable**
You cannot change a single character in place. Instead, you build an entirely new string from parts.
```js
let text = "cat";
// text[0] = "b"; // does nothing, strings can't be changed like this
console.log(text); // still "cat"
```

**Template literals**
Backtick strings let you insert variables directly into text using `${}`, which is more readable than joining with `+`.
```js
let name = "Amine";
let age = 20;
console.log(`My name is ${name} and I am ${age} years old.`);
```

**Traversing a string**
Because a string behaves like an indexed sequence, you can loop through every character with a `for` loop.
```js
let text = "hi";
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
```

**Note:** Template literals use backticks: `` `Hello, ${name}!` `` lets you insert variables directly into text.

**More Examples:**
```js
let word = "Code";
console.log(word.length);   // 4
console.log(word[0]);       // "C"
```
```js
let name = "Amine";
let age = 20;
console.log(`My name is ${name} and I am ${age}.`);
```
```js
let text = "hi";
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
```

**Exercises:**

1. Print the last character of `"Bootcamp"` without counting manually.
```js
let word = "Bootcamp";
console.log(word[___]);
```
<details><summary>Answer</summary>

```js
console.log(word[word.length - 1]); // "p"
```
</details>

2. Write a template literal that prints: `"I have 3 apples and 2 bananas."` using variables `apples = 3` and `bananas = 2`.
<details><summary>Answer</summary>

```js
let apples = 3;
let bananas = 2;
console.log(`I have ${apples} apples and ${bananas} bananas.`);
```
</details>

3. True or False: `"cat"[0] = "b"` will change the string to `"bat"`.
<details><summary>Answer</summary>

False — strings are immutable, so this line does nothing.
</details>

---

### string-methods

**The .slice() method**
`.slice(start, end)` extracts part of a string, from `start` up to (but not including) `end`. Omitting `end` slices to the end of the string.
```js
console.log("JavaScript".slice(0, 4)); // "Java"
console.log("JavaScript".slice(4));    // "Script"
```

**The .includes() method**
`.includes(substring)` returns `true` or `false` depending on whether the substring appears anywhere inside the string.
```js
console.log("hello world".includes("world")); // true
console.log("hello world".includes("bye"));   // false
```

**Changing case**
`.toUpperCase()` and `.toLowerCase()` return a new string with all letters converted — useful for case-insensitive comparisons.
```js
console.log("Hello".toUpperCase()); // "HELLO"
console.log("Hello".toLowerCase()); // "hello"
```

**Cleaning whitespace with .trim()**
`.trim()` removes whitespace from the start and end of a string, useful for cleaning up messy input.
```js
let messy = "   hi there   ";
console.log(`"${messy.trim()}"`); // "hi there"
```

**Finding a position with .indexOf()**
`.indexOf(substring)` returns the position where a substring first appears, or `-1` if it isn't found.
```js
console.log("hello world".indexOf("world")); // 6
console.log("hello world".indexOf("bye"));   // -1
```

**Splitting text with .split()**
`.split(separator)` breaks a string into an array of pieces based on a separator, such as splitting a sentence into words.
```js
let sentence = "core javascript rocks";
console.log(sentence.split(" ")); // ["core", "javascript", "rocks"]
```

**Chaining methods**
You can call methods one after another, since each one returns a new string. `text.trim().toLowerCase()` cleans and lowercases in one line.
```js
console.log("  Hello World  ".trim().toLowerCase()); // "hello world"
```

**Note:** `.slice(start, end)` excludes the `end` index — `"hello".slice(0, 3)` is `"hel"`.

**More Examples:**
```js
console.log("hello world".includes("world")); // true
console.log("  hi  ".trim());                 // "hi"
```
```js
console.log("JavaScript".slice(0, 4)); // "Java"
console.log("JavaScript".slice(4));    // "Script"
```
```js
let sentence = "core javascript rocks";
let words = sentence.split(" ");
console.log(words); // ["core", "javascript", "rocks"]
```

**Exercises:**

1. Complete the code to print `"JS"` in uppercase.
```js
console.log("js".___());
```
<details><summary>Answer</summary>

```js
console.log("js".toUpperCase()); // "JS"
```
</details>

2. Given `"  Hello World  "`, write code to print it trimmed AND in lowercase, using method chaining.
<details><summary>Answer</summary>

```js
console.log("  Hello World  ".trim().toLowerCase()); // "hello world"
```
</details>

3. What does `"banana".indexOf("na")` return? What about `"banana".indexOf("z")`?
<details><summary>Answer</summary>

`1` (first occurrence of "na") and `-1` (not found).
</details>

---

### string-challenges

**Counting vowels**
Loop through every character, lowercase it, and check if it's one of `a, e, i, o, u`.
```js
function countVowels(word) {
  let count = 0;
  let vowels = "aeiou";
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) count++;
  }
  return count;
}
console.log(countVowels("banana")); // 3
```

**Counting occurrences of a letter**
Loop through, compare each character to the target letter, and increase a counter on a match.
```js
function countLetter(word, letter) {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) count++;
  }
  return count;
}
console.log(countLetter("banana", "a")); // 3
```

**Reversing a string**
Loop backward from the last index to the first, building a new string one character at a time.
```js
function reverseString(text) {
  let result = "";
  for (let i = text.length - 1; i >= 0; i--) {
    result += text[i];
  }
  return result;
}
console.log(reverseString("hello")); // "olleh"
```

**Checking a palindrome**
A palindrome reads the same forwards and backwards. Reverse the lowercase string and compare it to the original lowercase string.
```js
function isPalindrome(text) {
  let lower = text.toLowerCase();
  return lower === reverseString(lower);
}
console.log(isPalindrome("Level")); // true
console.log(isPalindrome("Hello")); // false
```

**Testing edge cases**
Always test with an empty string, a single character, and mixed uppercase/lowercase to make sure your function is solid.
```js
console.log(countVowels(""));       // 0
console.log(reverseString("a"));    // "a"
console.log(isPalindrome("Level")); // true, case-insensitive
```

**Note:** Always lowercase both strings before comparing them, so your check is case-insensitive.

**More Examples:**
```js
function reverseString(text) {
  let result = "";
  for (let i = text.length - 1; i >= 0; i--) {
    result += text[i];
  }
  return result;
}
console.log(reverseString("hello")); // "olleh"
```
```js
function countVowels(word) {
  let count = 0;
  let vowels = "aeiou";
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) count++;
  }
  return count;
}
console.log(countVowels("banana")); // 3
```
```js
function isPalindrome(text) {
  let lower = text.toLowerCase();
  return lower === reverseString(lower);
}
console.log(isPalindrome("Level")); // true
```

**Exercises:**

1. Complete the function to count vowels in a word.
```js
function countVowels(word) {
  let count = 0;
  let vowels = "aeiou";
  for (let i = 0; i < word.length; i++) {
    if (___) count++;
  }
  return count;
}
console.log(countVowels("banana")); // 3
```
<details><summary>Answer</summary>

```js
if (vowels.includes(word[i].toLowerCase())) count++;
```
</details>

2. Write a function `countLetter(word, letter)` that counts how many times a specific letter appears.
<details><summary>Answer</summary>

```js
function countLetter(word, letter) {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) count++;
  }
  return count;
}
console.log(countLetter("banana", "a")); // 3
```
</details>

3. Is `"Race car"` (with a space) a palindrome using the `isPalindrome` function above? Why or why not?
<details><summary>Answer</summary>

No — `isPalindrome` only lowercases the text, it doesn't remove spaces, so `"race car"` reversed is `"rac ecar"`, which doesn't match. You would need to also remove spaces to detect this as a palindrome.
</details>

---

## Day 6 — Arrays

### arrays-basics

**Creating an array**
An array is an ordered list of values, written between square brackets: `[1, 2, 3]`.
```js
let fruits = ["apple", "banana", "cherry"];
console.log(fruits);
```

**Accessing items by index**
Arrays are indexed starting at `0`. The last item is at `arr.length - 1`.
```js
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);                    // "apple"
console.log(fruits[fruits.length - 1]);    // "cherry"
```

**Mutating an item**
Unlike strings, arrays are mutable: you can change an item directly by assigning to its index.
```js
let fruits = ["apple", "banana", "cherry"];
fruits[1] = "mango";
console.log(fruits); // ["apple", "mango", "cherry"]
```

**Adding and removing with push/pop**
`.push(value)` adds an item to the end. `.pop()` removes and returns the last item. Both change the array in place.
```js
let numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]
let last = numbers.pop();
console.log(last, numbers); // 4  [1, 2, 3]
```

**const arrays can still change**
Declaring an array with `const` only prevents reassigning the variable to a new array — you can still `.push()`, `.pop()`, or change items by index.
```js
const scores = [10, 20, 30];
scores.push(40); // allowed
console.log(scores); // [10, 20, 30, 40]
```

**Note:** A `const` array can still have its contents changed — `const` only blocks reassigning the variable to a whole new array.

**More Examples:**
```js
let fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits); // ["apple", "banana", "cherry"]
```
```js
let numbers = [1, 2, 3];
numbers[1] = 20;
console.log(numbers); // [1, 20, 3]
```
```js
const scores = [10, 20];
scores.push(30);
console.log(scores); // [10, 20, 30]
```

**Exercises:**

1. Complete the code to remove the last item and print it.
```js
let nums = [1, 2, 3];
let last = nums.___();
console.log(last); // 3
```
<details><summary>Answer</summary>

```js
let last = nums.pop();
```
</details>

2. Create an array of your 3 favorite colors, print the first one, then add a 4th color with `.push()`.
<details><summary>Answer</summary>

```js
let colors = ["blue", "green", "red"];
console.log(colors[0]);
colors.push("yellow");
console.log(colors);
```
</details>

3. What does `fruits[10]` print if `fruits` only has 3 items?
<details><summary>Answer</summary>

`undefined` — accessing an index that doesn't exist doesn't cause an error, it just returns `undefined`.
</details>

---

### array-traversal

**The traversal pattern**
Loop through every index with `for (let i = 0; i < arr.length; i++)` to visit each element in order.
```js
let numbers = [10, 20, 30];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

**Calculating a sum**
Start an accumulator at `0` before the loop, then add each item to it as you traverse.
```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}
console.log(sumArray([1, 2, 3])); // 6
```

**Calculating an average**
Divide the sum by the array's length after the loop finishes.
```js
function averageArray(arr) {
  return sumArray(arr) / arr.length;
}
console.log(averageArray([2, 4, 6])); // 4
```

**Finding the maximum**
Start by assuming the first item is the biggest, then compare it against every other item, updating your candidate whenever you find something bigger.
```js
function maxArray(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
console.log(maxArray([3, 7, 2])); // 7
```

**Finding the minimum**
The same pattern as maximum, but flipping the comparison to look for smaller values.
```js
function minArray(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}
console.log(minArray([3, 7, 2])); // 2
```

**Note:** Start `max`/`min` as `arr[0]`, not `0` — this avoids wrong results with all-negative arrays.

**More Examples:**
```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}
console.log(sumArray([1, 2, 3])); // 6
```
```js
function averageArray(arr) {
  return sumArray(arr) / arr.length;
}
console.log(averageArray([2, 4, 6])); // 4
```
```js
function maxArray(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
console.log(maxArray([3, 7, 2])); // 7
```

**Exercises:**

1. Complete the function to find the max value.
```js
function maxArray(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (___) max = arr[i];
  }
  return max;
}
console.log(maxArray([3, 7, 2])); // 7
```
<details><summary>Answer</summary>

```js
if (arr[i] > max) max = arr[i];
```
</details>

2. Write a `minArray(arr)` function, following the same pattern as `maxArray`.
<details><summary>Answer</summary>

```js
function minArray(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}
console.log(minArray([3, 7, 2])); // 2
```
</details>

3. What would `maxArray([-5, -2, -9])` return? Trace it by hand first, then check by running the code.
<details><summary>Answer</summary>

`-2` — it's the largest (least negative) value.
</details>

---

### array-challenges

**Manual search**
Loop through the array, comparing each item to a target, and return its index if found. Return `-1` if the loop finishes without a match.
```js
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(findIndex([5, 8, 2], 8)); // 1
```

**Counting matches**
Loop through and increment a counter each time an item passes a test, such as being even.
```js
function countEven(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) count++;
  }
  return count;
}
console.log(countEven([1, 2, 3, 4])); // 2
```

**Reversing an array**
Create a new empty array, then loop from the last index to the first, pushing each item into the new array.
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

**Manual filtering**
Build a new array containing only the items that pass a condition, by looping and pushing matches into a result array.
```js
function greaterThan(arr, limit) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > limit) result.push(arr[i]);
  }
  return result;
}
console.log(greaterThan([4, 15, 8, 23], 10)); // [15, 23]
```

**Note:** By convention, a search function returns `-1` when nothing is found, not `false`.

**More Examples:**
```js
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(findIndex([5, 8, 2], 8)); // 1
```
```js
function countEven(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) count++;
  }
  return count;
}
console.log(countEven([1, 2, 3, 4])); // 2
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

**Exercises:**

1. Complete the function to count even numbers.
```js
function countEven(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (___) count++;
  }
  return count;
}
console.log(countEven([1, 2, 3, 4])); // 2
```
<details><summary>Answer</summary>

```js
if (arr[i] % 2 === 0) count++;
```
</details>

2. Write a function `greaterThan(arr, limit)` that returns a new array with only the values greater than `limit`.
<details><summary>Answer</summary>

```js
function greaterThan(arr, limit) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > limit) result.push(arr[i]);
  }
  return result;
}
console.log(greaterThan([4, 15, 8, 23], 10)); // [15, 23]
```
</details>

3. What does `findIndex([1, 2, 3], 9)` return, and why?
<details><summary>Answer</summary>

`-1` — the loop never finds `9`, so it falls through to the `return -1;` line after the loop.
</details>

---

## Day 7 — Objects & arrays of objects

### objects-basics

**Creating an object**
An object stores related data as key-value pairs, written between curly braces.
```js
let person = { name: "Sara", age: 20, city: "Marrakesh" };
console.log(person);
```

**Accessing with dot notation**
The most common way to read a property is `object.propertyName`.
```js
let person = { name: "Sara", age: 20 };
console.log(person.name); // "Sara"
```

**Accessing with bracket notation**
Bracket notation is required when the key is stored in a variable, or contains spaces/special characters.
```js
let key = "name";
let person = { name: "Omar" };
console.log(person[key]); // "Omar"
```

**Updating and adding properties**
Assign a new value to update an existing property, or assign to a new key to add a brand-new property.
```js
let person = { name: "Sara", age: 20 };
person.age = 21;     // update
person.city = "Fes"; // add
console.log(person);
```

**Nested objects**
An object's value can itself be another object, letting you model more complex data.
```js
let car = { brand: "Toyota", specs: { year: 2022, color: "blue" } };
console.log(car.specs.year); // 2022
```

**Checking if a key exists**
Use the `in` operator to check whether a property exists on an object.
```js
let product = { title: "Book", price: 50 };
console.log("price" in product); // true
```

**Note:** A `const` object can still have its properties changed or added — only the variable itself is locked.

**More Examples:**
```js
let person = { name: "Sara", age: 20 };
console.log(person.name); // "Sara"
person.age = 21;
```
```js
let key = "name";
let person = { name: "Omar" };
console.log(person[key]); // "Omar"
```
```js
let car = { brand: "Toyota", specs: { year: 2022 } };
console.log(car.specs.year); // 2022
```

**Exercises:**

1. Add a new property `city` with value `"Rabat"` to this object.
```js
let person = { name: "Omar" };
___
console.log(person);
```
<details><summary>Answer</summary>

```js
person.city = "Rabat";
```
</details>

2. Given `let product = { title: "Book", price: 50 };`, write code to check if it has a property called `price` using the `in` operator.
<details><summary>Answer</summary>

```js
console.log("price" in product); // true
```
</details>

3. Why does `person.key` NOT work the same as `person[key]` when `key = "name"`?
<details><summary>Answer</summary>

`person.key` looks for a literal property literally named `"key"`, while `person[key]` uses the *value* stored in the `key` variable (`"name"`) to look up the property.
</details>

---

### array-of-objects

**What is an array of objects?**
It's a list where each item is itself an object — the way most real-world data is represented, like a list of students or products.
```js
let students = [
  { id: 1, name: "Sara", age: 20 },
  { id: 2, name: "Omar", age: 22 }
];
console.log(students);
```

**Accessing one record's field**
Access a record by its index first, then its property: `students[0].name`.
```js
console.log(students[0].name); // "Sara"
```

**Traversing records**
Loop through the array like before, but read `arr[i].property` inside the loop instead of just `arr[i]`.
```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name, students[i].age);
}
```

**Searching by a property**
Loop through and compare a property (like `name` or `id`) to a target, returning the whole matching object.
```js
function findByName(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
  return null;
}
console.log(findByName(students, "Omar"));
```

**Computing an aggregate over objects**
Adapt the sum/average pattern from arrays, reading a specific property from each object.
```js
function averageAge(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) sum += list[i].age;
  return sum / list.length;
}
console.log(averageAge(students)); // 21
```

**Note:** A search-by-property function should return the whole matching object (or `null`), not just `true`/`false`.

**More Examples:**
```js
let students = [
  { name: "Sara", age: 20 },
  { name: "Omar", age: 22 }
];
console.log(students[1].name); // "Omar"
```
```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name, students[i].age);
}
```
```js
function findByName(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
  return null;
}
console.log(findByName(students, "Omar"));
```

**Exercises:**

1. Complete the function to find a student by name.
```js
function findByName(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (___) return list[i];
  }
  return null;
}
console.log(findByName(students, "Omar"));
```
<details><summary>Answer</summary>

```js
if (list[i].name === name) return list[i];
```
</details>

2. Write a function `averageAge(list)` that returns the average `age` of all students.
<details><summary>Answer</summary>

```js
function averageAge(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) sum += list[i].age;
  return sum / list.length;
}
console.log(averageAge(students)); // 21
```
</details>

3. What would `findByName(students, "Nadia")` return, given the `students` array above?
<details><summary>Answer</summary>

`null` — there's no student named "Nadia" in the list.
</details>

---

## Day 8 — Search & sorting

### linear-search

**How linear search works**
Start at index `0` and check every element one by one until you find a match or reach the end.
```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(linearSearch([4, 8, 15], 8)); // 1
```

**Works on unsorted data**
Because it checks every item regardless of order, linear search works correctly whether the array is sorted or not.
```js
console.log(linearSearch([23, 4, 16, 8], 16)); // 2, unsorted array
```

**The idea behind binary search**
Binary search repeatedly checks the middle of a sorted array, discarding half the remaining range depending on whether the target is smaller or larger.
```js
function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    else if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
console.log(binarySearch([2, 4, 8, 15, 16], 15)); // 3
```

**Why binary search needs sorted data**
Binary search decides which half to keep by comparing the target to the middle value — this logic only works if the array is in order.
```js
// Unsorted input can give a WRONG result with binary search:
console.log(binarySearch([23, 4, 16, 8], 8)); // unreliable, don't do this
```

**Comparing the two approaches**
Linear search is simple and flexible but slower on large data. Binary search is much faster but only works on sorted data.
```js
let sorted = [1, 3, 5, 7, 9, 11];
console.log(linearSearch(sorted, 9));  // works, checks one by one
console.log(binarySearch(sorted, 9));  // works, and faster on large arrays
```

**Note:** Binary search is faster but only works correctly on a **sorted** array.

**More Examples:**
```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(linearSearch([4, 8, 15], 8)); // 1
```
```js
console.log(linearSearch([23, 4, 16, 8], 16)); // 2
```
```js
function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    else if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
console.log(binarySearch([2, 4, 8, 15, 16], 15)); // 3
```

**Exercises:**

1. What does this return?
```js
console.log(linearSearch([1, 2, 3], 9));
```
<details><summary>Answer</summary>

`-1` (not found)
</details>

2. Why might `binarySearch([23, 4, 16, 8], 8)` give a wrong answer?
<details><summary>Answer</summary>

Because the array `[23, 4, 16, 8]` is not sorted, and binary search assumes the array is sorted in order to decide which half to discard.
</details>

3. Write a function `linearSearchCount(arr, target)` that counts how many times `target` appears in `arr`, instead of stopping at the first match.
<details><summary>Answer</summary>

```js
function linearSearchCount(arr, target) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) count++;
  }
  return count;
}
console.log(linearSearchCount([1, 2, 2, 3, 2], 2)); // 3
```
</details>

---

### sorting-basics

**How bubble sort works**
Bubble sort repeatedly walks through the array, comparing neighboring pairs and swapping them if they're out of order. After each full pass, the largest unsorted item "bubbles up" to its correct spot.
```js
function bubbleSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
  return a;
}
console.log(bubbleSort([3, 1, 2])); // [1, 2, 3]
```

**How selection sort works**
For each position, selection sort scans the rest of the array to find the smallest remaining value, then swaps it into the current position.
```js
function selectionSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) minIndex = j;
    }
    let temp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = temp;
  }
  return a;
}
console.log(selectionSort([5, 2, 9, 1])); // [1, 2, 5, 9]
```

**Swapping with a temporary variable**
To swap two values without losing one, store one value temporarily before overwriting it.
```js
let a = 3, b = 7;
let temp = a;
a = b;
b = temp;
console.log(a, b); // 7 3
```

**Copying an array before sorting**
Use `[...arr]` to create a copy, so the original array stays unsorted and unchanged if you need it later.
```js
let original = [5, 1, 4];
let sorted = bubbleSort(original);
console.log(original); // [5, 1, 4], unchanged
console.log(sorted);   // [1, 4, 5]
```

**Comparing the two algorithms**
Bubble sort swaps neighbors repeatedly; selection sort finds and places the minimum directly. Both use nested loops and work well for learning, though neither is the fastest for large data.
```js
let data = [40, 10, 30, 20];
console.log(bubbleSort(data));
console.log(selectionSort(data));
```

**Note:** Always use a temporary variable when swapping two values, or you'll lose one of them.

**More Examples:**
```js
function bubbleSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
  return a;
}
console.log(bubbleSort([3, 1, 2])); // [1, 2, 3]
```
```js
function selectionSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) minIndex = j;
    }
    let temp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = temp;
  }
  return a;
}
console.log(selectionSort([5, 2, 9, 1])); // [1, 2, 5, 9]
```
```js
let a = 3, b = 7;
let temp = a;
a = b;
b = temp;
console.log(a, b); // 7 3
```

**Exercises:**

1. Trace `bubbleSort([2, 1])` by hand: what is the array after the first swap?
<details><summary>Answer</summary>

`[1, 2]` — 2 and 1 are swapped because 2 > 1.
</details>

2. What is wrong with this swap code? Fix it.
```js
let a = 5, b = 9;
a = b;
b = a;
console.log(a, b);
```
<details><summary>Answer</summary>

It loses the original value of `a` — both end up as `9`. Fix with a temp variable:
```js
let temp = a;
a = b;
b = temp;
```
</details>

3. Using `selectionSort`, what is `minIndex` on the very first pass (i = 0) for `[5, 2, 9, 1]`?
<details><summary>Answer</summary>

`3` — the index of `1`, the smallest value in the array.
</details>

---

## Day 9 — Mini project SAS

### mini-project-brief

**Choosing your data**
Start with an array of objects representing something realistic, like products or students, with 3-5 useful fields each.
```js
const products = [
  { name: "Pen", price: 3, quantity: 150 },
  { name: "Book", price: 15, quantity: 40 }
];
```

**Writing a search function**
Every project needs at least one function that finds a specific record by a property, like name or id.
```js
function findProduct(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
  return null;
}
console.log(findProduct(products, "Pen"));
```

**Writing a statistics function**
Reuse the sum/average pattern to compute something meaningful about your data, like total value.
```js
function totalPrice(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) total += list[i].price;
  return total;
}
console.log(totalPrice(products)); // 18
```

**Writing a filter function**
Add at least one function that returns a subset of your data matching a condition.
```js
function inStockOnly(list) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].quantity > 0) result.push(list[i]);
  }
  return result;
}
```

**Scoping your project realistically**
Aim for 5-8 small, well-tested functions rather than one giant program — quality and clarity matter more than quantity of features.
```js
// A realistic function list for a 1.5-day project:
// findProduct, totalPrice, inStockOnly, sortByPrice, averagePrice
```

**Note:** Aim for 5-8 small, well-tested functions rather than one giant program.

**More Examples:**
```js
const products = [
  { name: "Pen", price: 3 },
  { name: "Book", price: 15 }
];
function totalPrice(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) total += list[i].price;
  return total;
}
console.log(totalPrice(products)); // 18
```
```js
function findProduct(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
  return null;
}
console.log(findProduct(products, "Pen"));
```
```js
function inStockOnly(list) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].quantity > 0) result.push(list[i]);
  }
  return result;
}
```

**Exercises:**

1. Write your own array of 3 objects (your choice of fields) and one function that reads a property from them.
2. Write a function that computes the average price of your array of objects.
3. Write a function that returns only the items matching a condition you choose (e.g. price above a limit).

---

### mini-project-checkpoints

**Checkpoint 1: data ready**
Define your sample array of objects and confirm it looks correct by printing it before writing any logic.
```js
console.log("Sample data:", products);
```

**Checkpoint 2: read functions**
Implement and individually test functions that read data without changing it, like search or statistics.
```js
console.log(findProduct(products, "Pen"));   // should return the Pen object
console.log(findProduct(products, "Chair")); // should return null
```

**Checkpoint 3: search & sort**
Add at least one search function and one sort function (bubble or selection), and confirm the order is correct by printing it.
```js
let sorted = [...products].sort((a, b) => a.price - b.price); // or your own sort function
console.log(sorted);
```

**Checkpoint 4: demo script**
Write a clean section at the bottom of your file that calls every function in a logical order, with labeled output.
```js
console.log("=== DEMO ===");
console.log("All data:", products);
console.log("Total:", totalPrice(products));
```

**Checkpoint 5: Git history**
Confirm you have several small, clearly labeled commits pushed to GitHub — not just one giant commit at the end.
```
git add .
git commit -m "checkpoint 2: read functions working"
git push
```

**Note:** Commit after each checkpoint works, so you always have a "known-good" version to return to.

**More Examples:**
```js
console.log("=== DEMO ===");
console.log("All data:", products);
console.log("Total:", totalPrice(products));
```
```
git add .
git commit -m "checkpoint 2: read functions working"
git push
```
```js
console.log("Search 'Pen':", findProduct(products, "Pen"));
console.log("Search 'Chair':", findProduct(products, "Chair")); // should be null
```

**Exercises:**

1. List your own 4 checkpoints for your project.
2. Commit your current progress with a clear message, e.g. `git commit -m "checkpoint 1: data ready"`.
3. Write a demo script section that calls at least 3 of your functions with labeled `console.log` output.

---

## Day 10 — Defense prep & review

### core-review

**Data building blocks**
Review the "shapes" of data: primitives (numbers, strings, booleans), strings (indexed text), arrays (ordered lists), and objects (named fields).
```js
console.log(typeof 5, typeof "text", Array.isArray([1,2]), typeof {a:1});
```

**Control flow building blocks**
Review conditions (`if`/`else`/`switch`) for decisions, and loops (`for`/`while`) for repetition.
```js
for (let i = 0; i < 3; i++) {
  if (i === 1) console.log("middle");
}
```

**Functions and scope**
Review how functions package logic with parameters and `return`, and how `let`/`const` are limited to their block or function.
```js
const isEven = (n) => n % 2 === 0;
console.log(isEven(4));
```

**Searching and sorting**
Review linear search (scan one by one) and bubble/selection sort (nested loops with swaps) as algorithmic thinking tools.
```js
function bubbleSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        let t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
      }
    }
  }
  return a;
}
console.log(bubbleSort([9, 3, 7, 1]));
```

**Putting it all together**
Real programs combine all these pieces: arrays of objects, searched and filtered with functions, using loops and conditions.
```js
const users = [
  { name: "Sara", active: true },
  { name: "Omar", active: false }
];
function findActive(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].active) return list[i];
  }
  return null;
}
console.log(findActive(users));
```

**Note:** Try rewriting small examples from memory, without looking at your notes — that's the real test of understanding.

**More Examples:**
```js
const nums = [5, 2, 8];
const isEven = (n) => n % 2 === 0;
console.log(isEven(4));
```
```js
const users = [
  { name: "Sara", active: true },
  { name: "Omar", active: false }
];
function findActive(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].active) return list[i];
  }
  return null;
}
console.log(findActive(users));
```
```js
function bubbleSort(arr) {
  let a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        let t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
      }
    }
  }
  return a;
}
console.log(bubbleSort([9, 3, 7, 1]));
```

**Exercises:**

1. Without looking at your notes, write one small example for: a loop, a function, and an object.
2. Name the two sorting algorithms covered in this SAS training, and describe each in one sentence.
<details><summary>Answer</summary>

Bubble sort: repeatedly swaps neighboring out-of-order pairs. Selection sort: finds the minimum remaining value and places it directly into position.
</details>

3. What is the difference between linear search and binary search?
<details><summary>Answer</summary>

Linear search checks every item one by one and works on any array; binary search repeatedly halves the search range but requires a sorted array.
</details>

---

### defense-prep

**Preparing your introduction**
Before touching any code, prepare a one- or two-sentence spoken summary of what your project does.
```js
// Spoken intro example (not code, but practice saying this out loud):
// "My project is a small inventory manager that can search, total, and sort products."
```

**Explaining your data structure**
Walk through why you chose your object's fields before explaining any function — this gives context to everything that follows.
```js
const products = [{ name: "Pen", price: 3, quantity: 150 }];
console.log("Each product has: name, price, and quantity.");
```

**Running a live demo**
Always run your code live rather than only showing it — this proves it actually works and is more engaging.
```js
console.log("=== PROJECT DEMO ===");
console.log("Data:", products);
console.log("Search result:", findProduct(products, "Pen"));
```

**Preparing for questions**
Practice short, clear answers to likely questions: "Why this loop?", "What if the array is empty?", "How does your sort work?"
```js
// Practice explaining this out loud, step by step:
function totalPrice(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) total += list[i].price;
  return total;
}
```

**Writing a README**
A short README describing what your project does and how to run it is often the first thing a reviewer reads.
```
# README.md
## What it does
Tracks a small product inventory: search, total value, sorting.
## How to run
node inventory.js
```

**Note:** Run your demo live during the defense — it builds more trust than just reading code aloud.

**More Examples:**
```js
console.log("=== PROJECT DEMO ===");
console.log("Data:", products);
console.log("Search result:", findProduct(products, "Pen"));
```
```
# README.md
## What it does
Tracks a small product inventory: search, total value, sorting.
## How to run
node inventory.js
```
```js
// Practice explaining this out loud, step by step
function totalPrice(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) total += list[i].price;
  return total;
}
```

**Exercises:**

1. Write 2 questions you might be asked about your project, and a short answer for each.
2. Write a short README for your mini-project (what it does + how to run it).
3. Do one full timed practice run of your live demo, out loud, before the actual defense.
