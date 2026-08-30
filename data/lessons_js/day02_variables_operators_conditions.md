---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 2
---
# Day 02 — Variables, operators & conditions
## Variables and constants

A variable is a named container that holds a value so you can use it later. In modern JavaScript we mostly use `let` for values that can change, and `const` for values that should never be reassigned. You should prefer `const` by default and only use `let` when you know the value needs to update later, for example a counter in a loop.

Variable names should be descriptive: `age` is better than `a`, and `totalPrice` is better than `tp`. JavaScript variable names can contain letters, digits, `_` and `$`, but cannot start with a digit, and are case-sensitive (`age` and `Age` are different).

The convention in JavaScript is "camelCase" for variable names, like `firstName` or `isLoggedIn`. JavaScript has several primitive types: `number` (e.g. `42` or `3.14`), `string` (text, e.g. `"hello"`), `boolean` (`true`/`false`), `undefined` (a variable declared but not yet given a value), and `null` (an intentional "no value").

You can check a value's type at any time with the `typeof` operator, which is very useful for debugging. Trying to reassign a `const` will cause an error — this is a safety feature, not a bug, because it stops you from accidentally overwriting an important value.

Getting comfortable naming and typing variables correctly is the first real programming skill, because every future lesson depends on it.

### Key terms

- variable
- `let`
- `const`
- `var` (legacy
- avoid)
- primitive type
- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `typeof`
- camelCase

### Examples

### Example 1

```js
let age = 17;
const schoolName = "YouCode SAS";
console.log(age, schoolName);
```


### Example 2

```js
let score = 0;
score = score + 10; // let allows reassignment
console.log(score);
```


### Example 3

```js
const pi = 3.14159;
// pi = 3; // this would throw an error, const cannot be reassigned
console.log(pi);
```


### Example 4

```js
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
```


### Example 5

```js
let city; // declared but no value yet
console.log(city); // undefined
city = "Marrakesh";
console.log(city);
```


### Common mistakes

- Trying to reassign a `const` variable, which throws a `TypeError`.
- Using a variable before declaring it, or misspelling its name in a later line.
- Confusing `undefined` (no value assigned yet) with `null` (deliberately set to "nothing").

### Checkpoints

- Q: What keyword should you use by default for a value that won't change? A: `const`.
- Q: What does `typeof "hello"` return? A: `"string"`.
- Q: What happens if you try to reassign a `const`? A: JavaScript throws an error.

### Practice

Declare `const` variables for your name, city, and favorite number, then a `let` variable for a score starting at 0 that you increase by 5 twice, printing the score each time.

### Sources

- MDN, "Storing the information you need — Variables" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
- javascript.info, "Variables" — https://javascript.info/variables
- MDN, "typeof" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
- YouTube search: "let const var JavaScript difference beginner"

---

## Operators

Operators let you combine and compare values. Arithmetic operators include `+` (add), `-` (subtract), `*` (multiply), `/` (divide), and `%` (modulo, the remainder of a division), which is extremely useful for checking if a number is even or odd.

Assignment operators store or update values: `=` assigns, while `+=`, `-=`, `*=`, `/=` update a variable based on its current value, so `score += 5` means "add 5 to score". Comparison operators produce a boolean (`true`/`false`): `<`, `>`, `<=`, `>=` compare numbers, while `===` checks if two values are strictly equal (same value AND same type) and `!==` checks strict inequality.

Always prefer `===` and `!==` over `==` and `!=`, because the loose versions try to convert types automatically and can produce confusing results, like `"5" == 5` being `true`. Logical operators combine booleans: `&&` (AND, true only if both sides are true), `||` (OR, true if at least one side is true), and `!` (NOT, flips true to false and vice versa).

These operators are the foundation of every condition and loop you will write, so understanding the difference between assignment (`=`) and comparison (`===`) is critical — this is one of the most common beginner bugs. String concatenation also uses `+`, so `"5" + 5` produces `"55"` (text), while `5 + 5` produces `10` (a number) — the type of the operands changes the behavior.

### Key terms

- arithmetic operator
- modulo `%`
- assignment `=`
- compound assignment `+=`
- strict equality `===`
- strict inequality `!==`
- logical AND `&&`
- logical OR `||`
- logical NOT `!`

### Examples

### Example 1

```js
console.log(7 + 3, 7 - 3, 7 * 3, 7 / 3, 7 % 3);
```


### Example 2

```js
let total = 10;
total += 5; // same as total = total + 5
console.log(total);
```


### Example 3

```js
console.log(5 === 5);   // true
console.log(5 === "5"); // false, different types
console.log(5 !== 6);   // true
```


### Example 4

```js
let isAdult = true;
let hasTicket = false;
console.log(isAdult && hasTicket); // false
console.log(isAdult || hasTicket); // true
console.log(!isAdult);             // false
```


### Example 5

```js
console.log(10 % 2); // 0, so 10 is even
console.log(7 % 2);  // 1, so 7 is odd
```


### Common mistakes

- Using `=` (assignment) instead of `===` (comparison) inside a condition.
- Using `==` instead of `===` and getting surprising type-conversion results.
- Forgetting that `%` gives the remainder, not a percentage.

### Checkpoints

- Q: What does `10 % 3` evaluate to? A: `1` (the remainder).
- Q: What is the difference between `=` and `===`? A: `=` assigns a value, `===` compares two values for strict equality.
- Q: What does `true && false` evaluate to? A: `false`.

### Practice

Write a script that stores two numbers, then prints their sum, difference, product, quotient, and remainder, and prints whether the first number is greater than the second using `>`.

### Sources

- MDN, "Basic math in JavaScript" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
- javascript.info, "Operators" — https://javascript.info/operators
- javascript.info, "Comparisons" — https://javascript.info/comparison
- YouTube search: "JavaScript operators explained ===  vs =="

---

## Conditions — if / else / switch

Conditions let your program make decisions and run different code depending on the situation. An `if` statement runs a block of code only when its condition is `true`. You can add `else` to run alternative code when the condition is `false`, and `else if` to check multiple conditions in sequence, stopping at the first one that matches.

Conditions are usually built with comparison operators (`===`, `<`, `>=`...) and can be combined with `&&` and `||` for more complex logic, for example checking if a number is between two values. A `switch` statement is a cleaner alternative to many `else if` chains when you're comparing one variable against several exact values; each `case` needs a `break` to stop it from "falling through" into the next case, and you can add a `default` case for anything that doesn't match.

JavaScript treats some values as "falsy" in conditions even if they're not literally `false`: `0`, `""` (empty string), `null`, `undefined`, and `NaN` are all falsy, while everything else is "truthy". Indentation (spacing) inside `if`/`else` blocks doesn't change how the code runs, but it makes the code much easier to read, so always indent consistently.

Understanding conditions well is essential, because almost every real program needs to branch based on user input or computed values. Practice reading conditions out loud in plain English before writing them in code — this habit prevents a lot of logic bugs.

### Key terms

- `if`
- `else`
- `else if`
- `switch`
- `case`
- `break`
- `default`
- truthy
- falsy
- block `{ }`

### Examples

### Example 1

```js
let age = 16;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```


### Example 2

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


### Example 3

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


### Example 4

```js
let temperature = 25;
if (temperature > 20 && temperature < 30) {
  console.log("Nice weather!");
}
```


### Example 5

```js
// Falsy values in action
if (0) {
  console.log("this will not print");
}
if ("hello") {
  console.log("this WILL print, non-empty strings are truthy");
}
```


### Common mistakes

- Forgetting `break` inside a `switch`, causing execution to "fall through" into the next case.
- Using `=` instead of `===` inside an `if` condition.
- Writing overlapping `else if` conditions in the wrong order (e.g. checking `>= 70` before `>= 90`, so high grades never reach the correct branch).

### Checkpoints

- Q: What keyword stops a `switch` case from falling into the next one? A: `break`.
- Q: Name two falsy values in JavaScript besides `false`. A: Any two of `0`, `""`, `null`, `undefined`, `NaN`.
- Q: What runs if none of the `if`/`else if` conditions are true and there's an `else`? A: The code inside the `else` block.

### Practice

Write a program that stores a number and prints "positive", "negative", or "zero" depending on its value, then rewrite the weekend/weekday example using your own days.

### Sources

- MDN, "Making decisions in your code — conditionals" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
- javascript.info, "Conditional branching: if, '?'" — https://javascript.info/ifelse
- javascript.info, "Logical operators" — https://javascript.info/logical-operators
- YouTube search: "JavaScript if else switch statement beginner"
