---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 6
---
# Day 06 — Arrays
## Arrays — create, index, mutate

An array is an ordered list of values, written between square brackets and separated by commas, like `[1, 2, 3]` or `["a", "b", "c"]`. Just like strings, arrays are indexed starting at `0`, so `fruits[0]` is the first item and `fruits[fruits.length - 1]` is the last.

Unlike strings, arrays are mutable — you can change an item directly with `fruits[1] = "mango"`. The `.length` property tells you how many items are in the array. `.push(value)` adds a new item to the end of the array, and `.pop()` removes and returns the last item — both change the array in place.

There are also `.unshift(value)` to add to the beginning and `.shift()` to remove from the beginning, though these are used less often because they're slower for large arrays. Arrays can hold any type of value, including numbers, strings, booleans, other arrays, or even objects (we'll combine arrays and objects on Day 7).

You can create an empty array with `[]` and grow it with `.push()` inside a loop, which is an extremely common pattern for collecting results. Declaring an array with `const` still lets you `.push()`, `.pop()`, or change items by index — `const` only prevents reassigning the variable to a completely different array, not mutating its contents.

Arrays are one of the most important data structures you will use in almost every program from now on, so being fluent with indexing and mutation is essential before we move to traversal tomorrow... today, actually — traversal is next in this same lesson group.

### Key terms

- array
- index
- `.length`
- mutability
- `.push()`
- `.pop()`
- `.unshift()`
- `.shift()`
- array of mixed types

### Examples

### Example 1

```js
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.length); // 3
console.log(fruits[0]);     // "apple"
```


### Example 2

```js
let fruits = ["apple", "banana", "cherry"];
fruits[1] = "mango"; // mutate an existing item
console.log(fruits); // [ "apple", "mango", "cherry" ]
```


### Example 3

```js
let numbers = [1, 2, 3];
numbers.push(4);   // add to the end
console.log(numbers); // [1, 2, 3, 4]
let last = numbers.pop(); // remove from the end
console.log(last, numbers); // 4  [1, 2, 3]
```


### Example 4

```js
let queue = [];
queue.push("first in line");
queue.push("second in line");
console.log(queue);
```


### Example 5

```js
const scores = [10, 20, 30]; // const array, but contents can change
scores.push(40);
console.log(scores); // [10, 20, 30, 40]
```


### Common mistakes

- Thinking `const` prevents changing array contents — it only prevents reassigning the variable itself.
- Accessing an index that doesn't exist (e.g. `fruits[10]` on a 3-item array), which returns `undefined` instead of an error.
- Confusing `.push()`/`.pop()` (end of array) with `.unshift()`/`.shift()` (beginning of array).

### Checkpoints

- Q: What does `.push()` do? A: Adds a new item to the end of the array.
- Q: Can you change the contents of a `const` array? A: Yes, `const` only prevents reassigning the variable to a new array.
- Q: What is returned when accessing an index that doesn't exist? A: `undefined`.

### Practice

Create an array of 5 favorite movies, print the first and last one, add a new movie with `.push()`, remove one with `.pop()`, and print the final array.

### Sources

- MDN, "Arrays" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
- javascript.info, "Arrays" — https://javascript.info/array
- MDN, "Array.prototype.push()" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- YouTube search: "JavaScript arrays push pop length beginner"

---

## Array traversal — sum, avg, min, max

Traversal means visiting every element of an array, usually with a `for` loop where the loop variable is used as the index: `for (let i = 0; i < arr.length; i++)`. To calculate a sum, start with a variable at `0` before the loop, then add each item to it as you go.

To calculate an average, divide the sum by `arr.length` after the loop finishes — remember to guard against dividing by zero if the array might be empty. To find the maximum or minimum, start by assuming the first item is the best candidate, then loop through the rest, replacing your candidate whenever you find something bigger (for max) or smaller (for min).

This pattern — start with an initial "best guess", then update it as you scan — is one of the most reusable patterns in programming, and it appears again in linear search next week. Always use `arr.length` in the loop condition rather than a hard-coded number, so your code still works if the array's size changes.

It's good practice to name your accumulator variables clearly: `sum`, `total`, `max`, `min`, rather than generic names like `x`. Test your traversal functions on small arrays where you can compute the answer by hand, so you can verify your code is correct before trusting it on bigger data.

These four patterns (sum, average, min, max) are building blocks you'll reuse constantly, including in the mini-project in week two.

### Key terms

- traversal
- accumulator
- sum
- average
- minimum
- maximum
- "start with first item as candidate" pattern

### Examples

### Example 1

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


### Example 2

```js
function averageArray(arr) {
  if (arr.length === 0) return 0;
  return sumArray(arr) / arr.length;
}
console.log(averageArray([2, 4, 6])); // 4
```


### Example 3

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


### Example 4

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


### Common mistakes

- Starting `sum` inside the loop instead of before it, which resets it every pass.
- Starting the max/min loop from index `0` again while also using `arr[0]` as the initial candidate (harmless but slightly redundant) versus forgetting to start at index `1` (also harmless) — the real bug is starting `max` at `0` instead of `arr[0]`, which fails for arrays of all-negative numbers.
- Dividing by `arr.length` without checking for an empty array first, which causes division by zero.

### Checkpoints

- Q: Why should `max` start as `arr[0]` rather than `0`? A: Because if all numbers are negative, starting at `0` would give a wrong (too high) result.
- Q: What do you divide the sum by to get the average? A: The array's `.length`.
- Q: What should a well-written `averageArray` do if given an empty array? A: Return `0` (or handle it safely) instead of crashing from division by zero.

### Practice

Write a function `range(arr)` that returns the difference between the max and min of an array, and test all four functions (sum, average, min, max) on an array of your choosing, verifying the results by hand.

### Sources

- javascript.info, "Arrays" (loop examples) — https://javascript.info/array
- MDN, "Loops and iteration" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
- YouTube search: "JavaScript find sum average min max in array for loop"

---

## Array challenges

Today's challenges combine traversal with conditions to solve realistic small problems. A simple search means looping through an array and checking each item against a target, returning the index if found (or `-1` if not) — this is the same idea as `.indexOf()`, but writing it yourself builds your understanding for linear search next week.

Counting means looping through and incrementing a counter every time an item matches a condition, for example counting how many numbers in an array are even, or how many times a specific value appears. Inversion (reversing an array) follows the same backward-loop idea as string reversal: create a new empty array, then loop from the last index to the first, pushing each item into the new array.

You should also practice filtering by hand: building a new array containing only the items that pass a certain test, like all numbers greater than 10 — this is manual because we are not yet using array methods like `.filter()` (those are for a later, more advanced course; here we build the loop ourselves to understand the logic).

When solving array challenges, always ask: "What do I need to track as I go?" (a counter, a running sum, a found index, a new array) and "What do I return at the end?". Draw out small examples on paper first if a problem feels confusing — tracing through the array by hand, one index at a time, before writing code, prevents a lot of bugs.

These patterns—search, count, reverse, filter—are exactly what you'll need next week for linear search, sorting, and the mini-project.

### Key terms

- manual search
- counting pattern
- array reversal (inversion)
- manual filter
- index tracking
- "found" flag

### Examples

### Example 1

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


### Example 2

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


### Example 3

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


### Example 4

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


### Common mistakes

- Returning inside the loop too early or not returning `-1` after the loop when nothing is found.
- Forgetting to `push` into a new array when building a filtered or reversed result, and accidentally mutating the original array instead.
- Off-by-one errors when looping backward for reversal.

### Checkpoints

- Q: What should a search function return if the target isn't found? A: `-1` (by convention).
- Q: What pattern do you use to build a new filtered array manually? A: Loop through, test a condition, and `.push()` matching items into a new array.
- Q: Why do we build a *new* array for `reverseArray` instead of modifying the original in place? A: To avoid unexpectedly changing data the caller might still need in its original order.

### Practice

Write a function `countOccurrencesInArray(arr, value)` that counts how many times `value` appears anywhere in the array, and test it alongside all your Day 6 functions on at least two different arrays.

### Sources

- javascript.info, "Arrays" (tasks section) — https://javascript.info/array
- MDN, "Array" reference (for `.includes()`, `.indexOf()`) — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- YouTube search: "JavaScript array practice problems for beginners"
