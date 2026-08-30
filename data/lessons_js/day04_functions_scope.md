---
source: YouCode SAS EduCoach MDX (apps/educoach-js/content/lessons)
adapted_for: EduCoach JS RAG
day: 4
---
# Day 04 — functions scope (rich lesson pack)

This RAG document concatenates the Learn MDX lessons for SAS day 4.


<!-- source: functions-basics.mdx -->

A **function** packages reusable steps. You **define** it once and **call** it many times with different inputs.

## Anatomy

```js
function greet(name) {      // name = parameter
  return `Hello, ${name}`;  // send a value back
}
greet("Sam");               // "Sam" = argument
```

| Word | Meaning |
|------|---------|
| parameter | placeholder in the definition |
| argument | real value at the call site |
| return | value given back to the caller |

## return is not optional (usually)

```js
function brokenAdd(a, b) {
  a + b;
}
console.log(brokenAdd(2, 3)); // undefined
```

Without `return`, the result is `undefined`.

## Early return

Handle bad input first, then happy paths:

```js
function grade(score) {
  if (score < 0 || score > 20) return "invalid";
  if (score >= 10) return "pass";
  return "retry";
}
```

## Refactoring pattern (SAS Thursday afternoon)

Yesterday’s loops become today’s functions:

```js
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum = sum + i;
  return sum;
}
```

Benefits: name documents intent; you can test with many inputs.

## Default parameters

```js
function tag(label = "info", message) {
  return `[${label}] ${message}`;
}
```

## Guided lab

1. Run the starter; find the `undefined` from `brokenAdd`.
2. Fix `brokenAdd` by adding `return`.
3. Write `function isEven(n)` returning `true`/`false`.
4. Write `function max2(a, b)` returning the larger value.
5. Refactor your Day-3 “count multiples of 3” into `function countMultiples(limit, k)`.

## Extra drills

**Drill A — pure function**

```js
function area(width, height) {
  return width * height;
}
console.log(area(10, 5));
```

**Drill B — composition**

```js
function double(n) { return n * 2; }
function plusOne(n) { return n + 1; }
console.log(plusOne(double(5))); // 11
```

## Common mistakes

1. Missing `return`
2. Logging inside the function *instead of* returning (harder to reuse)
3. Wrong number of arguments (extras ignored; missing → `undefined`)
4. Recursion by accident (calling itself without a base case) — avoid for now

## Checkpoint

What does a function return if there is no `return` statement?


<!-- source: arrow-functions-scope.mdx -->

Two ideas power clean programs: **scope** (where a name exists) and **arrows** (short function syntax).

## Arrow functions

```js
const double = (n) => n * 2;          // expression body — implicit return
const sum = (a, b) => a + b;
const shout = (s) => {                 // block body — needs return
  const up = s.toUpperCase();
  return `${up}!`;
};
```

Use arrows for short transforms. Use `function` declarations when you want a clear named statement (either is fine in SAS).

## Scope rules

1. `let` / `const` inside `{ }` are visible only in that block.
2. Function parameters are local to the function.
3. Inner code can read outer bindings (lexical scope).
4. Inner names can **shadow** outer names.

```js
const course = "JS";
function show() {
  const tip = "prefer const";
  console.log(course, tip); // OK
}
// console.log(tip); // ReferenceError
```

## Shadowing

```js
const label = "outer";
function demo() {
  const label = "inner";
  console.log(label); // inner
}
demo();
console.log(label); // outer
```

## Block scope with if/for

```js
if (true) {
  const blockOnly = 42;
}
// blockOnly is not visible here
```

## map preview (optional)

Arrows shine as callbacks:

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);
```

You will use this more on Days 6–7; for now, notice the arrow as a tiny function argument.

## Guided lab

1. Run the starter.
2. Uncomment `console.log(tip)` to see the ReferenceError, then re-comment.
3. Write `const triple = (n) => n * 3` and log `triple(4)`.
4. Write a function `area(w, h)` as both `function` and arrow forms.

## Common mistakes

1. Forgetting `return` in a block-body arrow
2. Confusing `=>` with `>=`
3. Shadowing by accident and debugging the wrong variable
4. Assuming `var` behaves like `let` (it does not)

## Checkpoint

Can code outside a function read a `const` declared inside that function? Why?
