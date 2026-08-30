---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 3
---
# Day 03 — Loops
## for and while

Loops let you repeat code without copy-pasting it many times. A `for` loop has three parts separated by semicolons: initialization (starting point), condition (when to keep going), and update (what happens after each pass), for example `for (let i = 0; i < 5; i++)`.

A `while` loop only has a condition, and keeps running its block as long as that condition stays true — you must update something inside the loop body, or you'll create an infinite loop that never stops. Use `for` when you know roughly how many times you want to repeat something, and `while` when you're repeating "until" some condition changes, like waiting for a random number to match a target.

The `break` keyword immediately exits a loop entirely, useful when you found what you were looking for and don't need to keep checking. The `continue` keyword skips the rest of the current pass and jumps to the next one, useful for skipping specific values without stopping the whole loop.

The loop variable (often called `i`, short for "index" or "iterator") usually starts at `0` because array positions in JavaScript also start at `0` — we'll connect this to arrays soon. A very common beginner bug is the "off-by-one" error: looping one time too many or too few, usually caused by using `<=` instead of `<`, or vice versa.

Always trace through a loop by hand (or with `console.log`) for the first couple of times you write a new kind of loop, so you build intuition for how the values change on each pass.

### Key terms

- `for` loop
- `while` loop
- loop counter/index
- condition
- increment (`i++`)
- `break`
- `continue`
- infinite loop
- off-by-one error

### Examples

### Example 1

```js
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
```


### Example 2

```js
let i = 0;
while (i < 5) {
  console.log("While count:", i);
  i++;
}
```


### Example 3

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // stop the loop completely
  }
  console.log(i);
}
```


### Example 4

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // skip even numbers
  }
  console.log(i); // only odd numbers print
}
```


### Example 5

```js
// Counting down
for (let i = 5; i > 0; i--) {
  console.log(i);
}
console.log("Liftoff!");
```


### Common mistakes

- Forgetting to update the loop variable in a `while` loop, creating an infinite loop.
- Off-by-one errors from mixing up `<` and `<=` in the condition.
- Confusing `break` (stop the loop) with `continue` (skip to the next pass).

### Checkpoints

- Q: What are the three parts of a `for` loop's header? A: Initialization, condition, and update.
- Q: What does `continue` do inside a loop? A: Skips the rest of the current pass and moves to the next iteration.
- Q: What causes an infinite loop with `while`? A: The condition never becomes false, usually because the loop variable is never updated.

### Practice

Write a `for` loop that prints numbers 1 to 20, but skips multiples of 3 with `continue` and stops entirely once it reaches 18 with `break`.

### Sources

- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- javascript.info, "Loops: while and for" — https://javascript.info/while-for
- YouTube search: "JavaScript for loop while loop beginner explained"

---

## Loops with conditions & nesting

A nested loop is simply a loop written inside another loop. The outer loop runs once, and for every single pass of the outer loop, the entire inner loop runs completely from start to finish. Nested loops are useful whenever you need to work with two dimensions, like rows and columns in a grid, or comparing every item in a list against every other item.

A classic example is printing a multiplication table: the outer loop picks a row number, and the inner loop picks each column for that row. It's important to use different variable names for each loop (commonly `i` for the outer loop and `j` for the inner loop) so they don't overwrite each other.

Nested loops can get slow if both loops run many times, because the total number of operations is roughly the outer count multiplied by the inner count — this becomes important later when comparing search and sort algorithms. `break` and `continue` inside a nested loop only affect the innermost loop they are written in, not the outer one, which can surprise beginners.

When debugging nested loops, it helps to temporarily log both `i` and `j` together so you can see exactly which combination is being processed at each step. Nested loops are the foundation for bubble sort and selection sort, which we will study later this week — so getting comfortable tracing them by hand now will make sorting much easier to understand.

### Key terms

- nested loop
- outer loop
- inner loop
- `i`/`j` convention
- grid/table pattern
- time complexity (intuitive idea only)

### Examples

### Example 1

```js
// Multiplication table for 1 to 5
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    console.log(i + " x " + j + " = " + (i * j));
  }
}
```


### Example 2

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


### Example 3

```js
// break only stops the inner loop
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break;
    console.log("i:", i, "j:", j);
  }
}
```


### Example 4

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


### Common mistakes

- Reusing the same variable name (`i`) for both loops, which causes them to interfere with each other.
- Assuming `break` exits both loops, when it only exits the innermost one.
- Writing loops so deeply nested that the code becomes hard to read — usually a sign the logic should be split into a function (next lesson!).

### Checkpoints

- Q: If the outer loop runs 3 times and the inner loop runs 4 times each time, how many total inner-loop passes happen? A: 12.
- Q: Does `break` inside the inner loop also stop the outer loop? A: No, only the inner loop.
- Q: Why do we usually name loop variables `i` and `j`? A: By convention, to keep outer and inner loop counters distinct and readable.

### Practice

Print a full multiplication table from 1 to 10 using nested loops, then modify it to only print rows for even numbers using an `if` condition inside the outer loop.

### Sources

- javascript.info, "Loops: while and for" (nested examples) — https://javascript.info/while-for
- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- YouTube search: "JavaScript nested loops multiplication table example"
