---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 8
---
# Day 08 — Search & sorting
## Linear search (& binary idea)

Linear search is the simplest way to find a value in an array: start at index `0` and check every element one by one until you find a match or reach the end. Its defining feature is that it works on any array, sorted or not, because it doesn't assume anything about the order of the data.

The cost of linear search grows with the size of the array: in the worst case (the value is last, or not present at all), you check every single item, so a bigger array means more work. Binary search is a much faster alternative, but it only works on a sorted array: it repeatedly checks the middle element, and depending on whether the target is smaller or larger, it discards half of the remaining array each time, narrowing down the search area very quickly.

Because binary search relies on comparing against a sorted middle point, an unsorted array must be sorted first before binary search can be used correctly — this is exactly why sorting (today's second lesson) matters so much for search performance.

For this bootcamp, you must be able to implement linear search confidently in Core JS; understanding the idea of binary search (fewer comparisons on sorted data by repeatedly halving the search range) is enough, without needing to master its full implementation yet.

A helpful mental model: linear search is like reading a book page by page looking for a name; binary search is like using the fact that a dictionary is alphabetically sorted to jump straight to roughly the right section.

Comparing the two builds your intuition for why data structure and order matter, which is a core idea in computer science broadly, not just JavaScript.

### Key terms

- linear search
- binary search (conceptual)
- sorted vs unsorted array
- worst case
- halving the search range

### Examples

### Example 1

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


### Example 2

```js
// Linear search works on unsorted data too
console.log(linearSearch([23, 4, 16, 8, 15], 8)); // 3
```


### Example 3

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


### Example 4

```js
// Why order matters: binary search fails silently on unsorted data
console.log(binarySearch([23, 4, 16, 8, 15], 8)); // may return -1, wrong!
```


### Common mistakes

- Using binary search on an unsorted array, which can give an incorrect result.
- Forgetting to return `-1` when linear search finishes without finding a match.
- Confusing the *value* found with its *index* — search functions here return the index, not the value itself.

### Checkpoints

- Q: Does linear search require the array to be sorted? A: No, it works on any order.
- Q: Why does binary search require a sorted array? A: Because it decides which half to discard based on comparing the target to the middle value, which only makes sense if the data is ordered.
- Q: In the worst case, how many items might linear search need to check in an array of 100 items? A: All 100.

### Practice

Write your own `linearSearch` function from scratch (without looking at today's example) and test it on both a sorted and an unsorted array of numbers, including a case where the target isn't present.

### Sources

- javascript.info, "Arrays" (search patterns) — https://javascript.info/array
- freeCodeCamp, "Search Algorithms" conceptual overview — https://www.freecodecamp.org/news/search-algorithms-explained/
- YouTube search: "linear search vs binary search explained simply"

---

## Bubble sort & selection sort

Sorting means rearranging an array's items into order, usually ascending (smallest to largest). Bubble sort repeatedly walks through the array, comparing each pair of neighboring items and swapping them if they're in the wrong order; after each full pass, the largest unsorted item "bubbles up" to its correct position at the end, so you need nested loops — an outer loop for each pass, and an inner loop for each comparison.

Selection sort works differently: for each position starting from the beginning, it scans the rest of the array to find the smallest remaining value, then swaps that smallest value into the current position — so it "selects" the correct value for each slot one at a time.

Both algorithms use nested loops and are considered simple, beginner-friendly sorting methods, but they are not the fastest for large data; that's fine for this bootcamp, because the goal is to understand *how* sorting works step by step, not to write production-grade performance code.

In real projects, you'd use the built-in `Array.prototype.sort()` method, but we implement bubble and selection sort manually here specifically to strengthen your understanding of nested loops, swapping, and comparisons.

Swapping two array values needs a temporary variable to avoid losing one of the values: store one value temporarily, overwrite it with the other, then use the temporary value for the second slot. A useful optimization for bubble sort is to stop early if a full pass makes zero swaps, since that means the array is already sorted — this isn't required, but it's worth knowing about.

Tracing both algorithms by hand on a small array of 4-5 numbers, writing down the array's state after every single swap, is the best way to truly understand them before you trust your code.

### Key terms

- bubble sort
- selection sort
- pass
- swap
- temporary variable
- ascending order
- nested loop (again)
- early-exit optimization

### Examples

### Example 1

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


### Example 2

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


### Example 3

```js
// Tracing a swap manually
let a = 3, b = 7;
let temp = a;
a = b;
b = temp;
console.log(a, b); // 7 3
```


### Example 4

```js
// Verifying both sorts agree on the same input
let data = [40, 10, 30, 20];
console.log(bubbleSort(data));
console.log(selectionSort(data));
```


### Common mistakes

- Swapping values without a temporary variable, which overwrites one value before it's saved.
- Off-by-one errors in the inner loop bounds, especially in bubble sort's `length - 1 - i`.
- Sorting the original array in place when you meant to keep an unsorted copy for comparison (use `[...arr]` to copy first).

### Checkpoints

- Q: What's the core difference between bubble sort and selection sort? A: Bubble sort repeatedly swaps neighboring out-of-order pairs; selection sort finds the minimum remaining value and places it directly.
- Q: Why do you need a temporary variable when swapping two array values? A: To avoid losing one value's data when overwriting the array positions.
- Q: What does `[...arr]` do in the examples above? A: Creates a shallow copy of the array, so the original isn't mutated.

### Practice

Trace `bubbleSort([4, 1, 3, 2])` by hand, writing the array's state after every swap, then verify your trace matches your code's output using `console.log` inside the loop.

### Sources

- javascript.info, "Sorting" concepts (general array practice) — https://javascript.info/array#sorting-an-array
- Visualgo, "Sorting" interactive visualizer — https://visualgo.net/en/sorting
- YouTube search: "bubble sort selection sort explained step by step animation"
