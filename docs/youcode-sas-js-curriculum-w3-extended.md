# YouCode SAS — JavaScript Bootcamp (W3Schools-style, Extended)

Core JavaScript only. No DOM, events, fetch, classes, async/await. Run every example with `node file.js` or a browser console.

---

## Day 1 — Welcome & first JavaScript

### welcome-to-javascript
JavaScript is a programming language you can run in a browser console or with Node.js. In this bootcamp we only use **Core JavaScript**: variables, conditions, loops, functions, strings, arrays, objects. No web pages needed — everything runs and prints in a plain console.

**Note:** JavaScript and Java are two completely different languages, despite the similar name.

**Example 1:**
```js
console.log("Welcome to YouCode SAS!");
console.log(2 + 2);
```

**Example 2:**
```js
console.log("Sum:", 3 + 4);
console.log("Text:", "JS" + "2026");
```

**Example 3:**
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
`console.log()` prints a value so you can see it. A `.js` file is a plain text file you run with `node file.js`, or you can type code directly in a browser console. Statements normally run top to bottom, one after another.

**Note:** Add a semicolon `;` at the end of each statement — it's good practice, even though JavaScript can sometimes guess where a line ends.

**Example 1:**
```js
console.log("Hello, YouCode!");
console.log(10, true, "text");
```

**Example 2:**
```js
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
```

**Example 3:**
```js
// Logging several computed values at once
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
Git saves snapshots (commits) of your code so you never lose work. GitHub hosts your project online so you can share it. Daily flow: `git add` (stage changes), `git commit -m "message"` (save a snapshot), `git push` (upload it).

**Note:** Commit often, with small, clear messages — this makes it easy to see your progress over time.

**Example 1:**
```
git add .
git commit -m "first commit"
git push
```

**Example 2:**
```
git status
git log --oneline
```

**Example 3:**
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
`let` is for values that change. `const` is for values that don't change. Use `typeof` to check a value's type: `"number"`, `"string"`, `"boolean"`, `"undefined"`.

**Note:** Prefer `const` by default, and switch to `let` only when you know a value must be reassigned later.

**Example 1:**
```js
let age = 17;
const name = "Sara";
console.log(typeof age, typeof name);
```

**Example 2:**
```js
let score = 0;
score = score + 10;
console.log(score); // 10
```

**Example 3:**
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
`+ - * / %` do math (`%` gives the remainder). `===` compares value AND type (use this, not `==`). `&& || !` combine booleans (AND, OR, NOT).

**Note:** `"5" === 5` is `false` because one is a string and the other is a number — `===` checks type too.

**Example 1:**
```js
console.log(10 % 3);     // 1
console.log(5 === "5");  // false
console.log(true && false); // false
```

**Example 2:**
```js
let total = 10;
total += 5; // same as total = total + 5
console.log(total); // 15
```

**Example 3:**
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
`if / else if / else` chooses a path based on a condition. `switch` compares one value against many exact cases (each `case` needs `break`).

**Note:** Values `0`, `""`, `null`, `undefined`, and `NaN` are "falsy" — every other value is "truthy" inside an `if`.

**Example 1:**
```js
let age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

**Example 2:**
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

**Example 3:**
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
`for` repeats a known number of times. `while` repeats until a condition becomes false. `break` exits the loop entirely; `continue` skips to the next round.

**Note:** Always update your loop variable inside a `while` loop, or it will run forever (an infinite loop).

**Example 1:**
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**Example 2:**
```js
let i = 0;
while (i < 3) {
  console.log("while:", i);
  i++;
}
```

**Example 3:**
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  if (i % 2 === 0) continue;
  console.log(i); // prints only odd numbers below 5
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
A loop inside another loop. The inner loop finishes completely for every single pass of the outer loop.

**Note:** `break` and `continue` only affect the loop they are written inside (usually the innermost one).

**Example 1:**
```js
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
```

**Example 2:**
```js
// Multiplication table for 1 to 3
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i + " x " + j + " = " + (i * j));
  }
}
```

**Example 3:**
```js
// Building rows of stars
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
A function is a reusable block of code. Parameters are the placeholder names; arguments are the real values passed in. `return` sends a value back to the caller and stops the function.

**Note:** A function with no `return` produces `undefined`.

**Example 1:**
```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
```

**Example 2:**
```js
function greet(name = "friend") {
  return "Hello, " + name;
}
console.log(greet());        // "Hello, friend"
console.log(greet("Nadia")); // "Hello, Nadia"
```

**Example 3:**
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
Arrow functions: `(params) => expression`. A variable declared with `let`/`const` only exists inside the block `{ }` where it was declared.

**Note:** If an arrow function needs more than one statement, you need curly braces AND an explicit `return`.

**Example 1:**
```js
const square = (n) => n * n;
console.log(square(4)); // 16
```

**Example 2:**
```js
const describe = (n) => {
  let type = n % 2 === 0 ? "even" : "odd";
  return n + " is " + type;
};
console.log(describe(7));
```

**Example 3:**
```js
if (true) {
  let secret = "hidden";
  console.log(secret); // works here
}
// console.log(secret); // error: secret is not defined out here
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
Strings are text. `.length` gives the size. `text[0]` gives the first character (indexes start at 0). Strings are immutable — you can't change a character in place.

**Note:** Template literals use backticks: `` `Hello, ${name}!` `` lets you insert variables directly into text.

**Example 1:**
```js
let word = "Code";
console.log(word.length);   // 4
console.log(word[0]);       // "C"
```

**Example 2:**
```js
let name = "Amine";
let age = 20;
console.log(`My name is ${name} and I am ${age}.`);
```

**Example 3:**
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
`.slice()`, `.includes()`, `.toUpperCase()`, `.toLowerCase()`, `.trim()`, `.indexOf()`, `.split()` are built-in string tools. None of them change the original string.

**Note:** `.slice(start, end)` excludes the `end` index — `"hello".slice(0, 3)` is `"hel"`.

**Example 1:**
```js
console.log("hello world".includes("world")); // true
console.log("  hi  ".trim());                 // "hi"
```

**Example 2:**
```js
console.log("JavaScript".slice(0, 4)); // "Java"
console.log("JavaScript".slice(4));    // "Script"
```

**Example 3:**
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
Combine loops and string methods to solve classic exercises: count vowels, reverse a string, check a palindrome.

**Note:** Always lowercase both strings before comparing them, so your check is case-insensitive.

**Example 1:**
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

**Example 2:**
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

**Example 3:**
```js
function isPalindrome(text) {
  let lower = text.toLowerCase();
  return lower === reverseString(lower);
}
console.log(isPalindrome("Level")); // true
console.log(isPalindrome("Hello")); // false
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
Arrays are ordered lists: `[1, 2, 3]`. `.push()` adds to the end, `.pop()` removes from the end. Indexes start at 0.

**Note:** A `const` array can still have its contents changed — `const` only blocks reassigning the variable to a whole new array.

**Example 1:**
```js
let fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits); // ["apple", "banana", "cherry"]
```

**Example 2:**
```js
let numbers = [1, 2, 3];
numbers[1] = 20;
console.log(numbers); // [1, 20, 3]
```

**Example 3:**
```js
const scores = [10, 20];
scores.push(30); // allowed, even with const
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
Loop through an array with `for (let i = 0; i < arr.length; i++)` to compute a sum, average, min, or max.

**Note:** Start `max`/`min` as `arr[0]`, not `0` — this avoids wrong results with all-negative arrays.

**Example 1:**
```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}
console.log(sumArray([1, 2, 3])); // 6
```

**Example 2:**
```js
function averageArray(arr) {
  return sumArray(arr) / arr.length;
}
console.log(averageArray([2, 4, 6])); // 4
```

**Example 3:**
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
Use loops + conditions to search, count, or reverse an array manually.

**Note:** By convention, a search function returns `-1` when nothing is found, not `false`.

**Example 1:**
```js
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(findIndex([5, 8, 2], 8)); // 1
```

**Example 2:**
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

**Example 3:**
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
Objects store key-value pairs: `{ name: "Sara", age: 20 }`. Access with `.name` or `["name"]`. Bracket notation is required when the key is stored in a variable.

**Note:** A `const` object can still have its properties changed or added — only the variable itself is locked.

**Example 1:**
```js
let person = { name: "Sara", age: 20 };
console.log(person.name); // "Sara"
person.age = 21;
```

**Example 2:**
```js
let key = "name";
let person = { name: "Omar" };
console.log(person[key]); // "Omar"
```

**Example 3:**
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
An array of objects is a list of records: `students[0].name` accesses one field of one record. Loop through with `arr[i].property`.

**Note:** A search-by-property function should return the whole matching object (or `null`), not just `true`/`false`.

**Example 1:**
```js
let students = [
  { name: "Sara", age: 20 },
  { name: "Omar", age: 22 }
];
console.log(students[1].name); // "Omar"
```

**Example 2:**
```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name, students[i].age);
}
```

**Example 3:**
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
Linear search checks every item one by one until it finds a match. Works on any array, sorted or not. Returns the index, or `-1` if not found.

**Note:** Binary search is faster but only works correctly on a **sorted** array.

**Example 1:**
```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log(linearSearch([4, 8, 15], 8)); // 1
```

**Example 2:**
```js
console.log(linearSearch([23, 4, 16, 8], 16)); // 2 (works on unsorted data too)
```

**Example 3:**
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
Bubble sort swaps neighboring items if they're out of order, across multiple passes. Selection sort picks the smallest remaining item each round and places it directly.

**Note:** Always use a temporary variable when swapping two values, or you'll lose one of them.

**Example 1:**
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

**Example 2:**
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

**Example 3:**
```js
// Manual swap, step by step
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
Build a small console program using an array of objects (e.g. products or students) with functions to search, filter, and compute statistics.

**Note:** Aim for 5-8 small, well-tested functions rather than one giant program.

**Example 1:**
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

**Example 2:**
```js
function findProduct(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
  return null;
}
console.log(findProduct(products, "Pen"));
```

**Example 3:**
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
Break your project into stages: 1) data, 2) read functions, 3) search/sort, 4) demo script, 5) Git commits.

**Note:** Commit after each checkpoint works, so you always have a "known-good" version to return to.

**Example 1:**
```js
console.log("=== DEMO ===");
console.log("All data:", products);
console.log("Total:", totalPrice(products));
```

**Example 2:**
```
git add .
git commit -m "checkpoint 2: read functions working"
git push
```

**Example 3:**
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
Quick recap: variables, conditions, loops, functions, strings, arrays, objects, search, sorting.

**Note:** Try rewriting small examples from memory, without looking at your notes — that's the real test of understanding.

**Example 1:**
```js
const nums = [5, 2, 8];
const isEven = (n) => n % 2 === 0;
console.log(isEven(4));
```

**Example 2:**
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

**Example 3:**
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
2. Name the two sorting algorithms covered this bootcamp, and describe each in one sentence.
<details><summary>Answer</summary>

Bubble sort: repeatedly swaps neighboring out-of-order pairs. Selection sort: finds the minimum remaining value and places it directly into position.
</details>

3. What is the difference between linear search and binary search?
<details><summary>Answer</summary>

Linear search checks every item one by one and works on any array; binary search repeatedly halves the search range but requires a sorted array.
</details>

---

### defense-prep
Prepare a live demo, a short README, and answers to likely questions ("why this loop?", "what if the array is empty?").

**Note:** Run your demo live during the defense — it builds more trust than just reading code aloud.

**Example 1:**
```js
console.log("=== PROJECT DEMO ===");
console.log("Data:", products);
console.log("Search result:", findProduct(products, "Pen"));
```

**Example 2:**
```
# README.md
## What it does
Tracks a small product inventory: search, total value, sorting.
## How to run
node inventory.js
```

**Example 3:**
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
