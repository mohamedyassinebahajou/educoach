---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 5
---
# Day 05 — Strings
## Strings — length, index, traversal

A string is a sequence of characters, written between single quotes `'...'`, double quotes `"..."`, or backticks `` `...` `` (backticks also allow "template literals" with `${}` for inserting variables directly into text).

Every string has a `.length` property that tells you how many characters it contains, including spaces and punctuation. You can access an individual character using square brackets and its index, like `text[0]` for the first character — remember that indexes start at `0`, so the last character is at `text.length - 1`.

Strings are "immutable" in JavaScript, meaning you cannot change a character in place (`text[0] = "X"` does nothing); instead, you build a new string from parts. Because strings behave like an indexed sequence, you can traverse (walk through) every character using a `for` loop, checking or building something character by character — this is the same pattern you used for arrays-to-come, and it's the base for classic exercises like counting vowels or reversing text.

Template literals with backticks are the modern, readable way to combine variables and text, replacing a lot of `+` concatenation: `` `Hello, ${name}!` `` is easier to read than `"Hello, " + name + "!"`. Comparing strings uses the same `===` operator as numbers, and is case-sensitive, so `"Hello" === "hello"` is `false`.

Getting comfortable with string indexing and traversal sets you up perfectly for tomorrow's string methods and string challenges.

### Key terms

- string
- `.length`
- index
- template literal (backtick string)
- `${}`
- immutability
- string traversal

### Examples

### Example 1

```js
let word = "JavaScript";
console.log(word.length);   // 10
console.log(word[0]);       // "J"
console.log(word[word.length - 1]); // "t"
```


### Example 2

```js
let name = "Amine";
let age = 20;
console.log(`My name is ${name} and I am ${age} years old.`);
```


### Example 3

```js
// Traversing a string character by character
let text = "code";
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
```


### Example 4

```js
console.log("Hello" === "hello"); // false, case-sensitive
console.log("Hello" === "Hello"); // true
```


### Example 5

```js
// Building a new string from characters (strings are immutable)
let original = "abc";
let upperManual = "";
for (let i = 0; i < original.length; i++) {
  upperManual += original[i].toUpperCase();
}
console.log(upperManual); // "ABC"
```


### Common mistakes

- Trying to reassign a single character with `text[0] = "X"` and expecting it to work — strings are immutable.
- Off-by-one errors when finding the last character (forgetting `- 1`).
- Comparing strings with different casing and expecting them to match.

### Checkpoints

- Q: What does `"hello".length` return? A: `5`.
- Q: How do you access the last character of a string called `text`? A: `text[text.length - 1]`.
- Q: Are strings mutable or immutable in JavaScript? A: Immutable — you cannot change a character in place.

### Practice

Write a loop that prints every character of your first name on its own line, then write a template literal that introduces yourself using at least two variables.

### Sources

- MDN, "Strings — a first splash" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
- javascript.info, "Strings" — https://javascript.info/string
- YouTube search: "JavaScript strings length index for loop beginner"

---

## Essential string methods

Beyond indexing, JavaScript strings come with many built-in methods that make common tasks easy. `.slice(start, end)` extracts part of a string, from the `start` index up to (but not including) the `end` index — if you omit `end`, it slices to the end of the string. `.includes(substring)` returns `true` or `false` depending on whether the substring appears anywhere inside the string, which is very handy for search-like checks. `.toUpperCase()` and `.toLowerCase()` return a new string with all letters converted, useful for case-insensitive comparisons. `.trim()` removes whitespace from the start and end of a string, which is essential when cleaning up user input. `.indexOf(substring)` returns the position where a substring first appears, or `-1` if it's not found at all. `.split(separator)` breaks a string into an array of pieces based on a separator, for example splitting a sentence into words by splitting on `" "`.

All of these methods return a *new* string or array — none of them change the original string, because strings are immutable, as we learned yesterday. Chaining methods together, like `text.trim().toLowerCase()`, is a common and powerful pattern once you're comfortable with each method individually.

Knowing these methods well will make tomorrow's string challenges (vowels, palindrome, reverse) much faster to solve.

### Key terms

- `.slice()`
- `.includes()`
- `.toUpperCase()`
- `.toLowerCase()`
- `.trim()`
- `.indexOf()`
- `.split()`
- method chaining

### Examples

### Example 1

```js
let text = "JavaScript is fun";
console.log(text.slice(0, 10)); // "JavaScript"
console.log(text.slice(11));    // "is fun"
```


### Example 2

```js
console.log("JavaScript is fun".includes("fun"));   // true
console.log("JavaScript is fun".includes("Python")); // false
```


### Example 3

```js
console.log("Hello".toUpperCase()); // "HELLO"
console.log("Hello".toLowerCase()); // "hello"
```


### Example 4

```js
let messy = "   hi there   ";
console.log(`"${messy.trim()}"`); // "hi there"
```


### Example 5

```js
console.log("hello world".indexOf("world")); // 6
console.log("hello world".indexOf("bye"));   // -1
```


### Example 6

```js
let sentence = "core javascript is powerful";
let words = sentence.split(" ");
console.log(words); // [ "core", "javascript", "is", "powerful" ]
```


### Common mistakes

- Expecting `.toUpperCase()` or `.slice()` to change the original variable — they return a *new* string, so you must store the result.
- Forgetting that `.slice(start, end)` excludes the `end` index itself.
- Assuming `.indexOf()` returns `false` when not found — it actually returns `-1`.

### Checkpoints

- Q: What does `"hello".slice(1, 3)` return? A: `"el"`.
- Q: What does `.includes()` return? A: A boolean, `true` or `false`.
- Q: Do string methods change the original string? A: No, they return a new string; the original is unchanged.

### Practice

Take a sentence stored in a variable, and using only the methods above, print it in uppercase, print whether it includes a certain word, and split it into an array of words.

### Sources

- MDN, "String" reference — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- javascript.info, "Strings" (methods section) — https://javascript.info/string#the-length-property
- MDN, "String.prototype.slice()" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
- YouTube search: "JavaScript string methods slice includes trim toUpperCase"

---

## String challenges

Today we combine everything from the last two lessons — indexing, traversal, and methods — to solve classic beginner exercises. Counting vowels means looping through every character of a string and checking if it matches one of `a, e, i, o, u` (usually after converting to lowercase first, so the check is case-insensitive).

Counting occurrences of a specific letter or word follows the same pattern: loop through, compare, and increase a counter each time you find a match. Reversing a string can be done manually with a loop that walks backward from the last index to the first, building a new string one character at a time — this reinforces that strings are immutable and you must build a new one.

A palindrome is a string that reads the same forwards and backwards (like "level" or "radar"); the simplest approach is to reverse the string and compare it to the original with `===`. These exercises are "classic" because they appear in almost every beginner course and technical interview — they test whether you truly understand loops, indexes, and string methods rather than just memorizing syntax.

There is often more than one correct way to solve each challenge (for example, reversing with a loop vs. using `.split("").reverse().join("")` — note `.reverse()` is an array method, so this trick converts the string to an array first).

For this bootcamp, try solving each challenge with a plain loop first, since that builds your fundamental logic — you can explore shortcuts afterward. Always test your solution with multiple inputs: an empty string, a single character, a normal word, and a tricky case like mixed uppercase/lowercase.

### Key terms

- vowel counting
- occurrence counting
- string reversal
- palindrome
- case-insensitive comparison
- manual loop vs. built-in shortcut

### Examples

### Example 1

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


### Example 2

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


### Example 3

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


### Example 4

```js
function isPalindrome(text) {
  let lower = text.toLowerCase();
  return lower === reverseString(lower);
}
console.log(isPalindrome("level")); // true
console.log(isPalindrome("hello")); // false
```


### Example 5

```js
// Edge cases worth testing
console.log(countVowels(""));      // 0
console.log(reverseString("a"));   // "a"
console.log(isPalindrome("Level")); // true, case-insensitive
```


### Common mistakes

- Forgetting to lowercase both strings before comparing, causing false negatives on palindrome checks.
- Off-by-one errors when looping backward for reversal (starting at `length` instead of `length - 1`).
- Not testing edge cases like empty strings or single characters.

### Checkpoints

- Q: Why do we convert to lowercase before checking for a palindrome? A: So the comparison is case-insensitive (e.g. "Level" should still count).
- Q: What loop direction do you use to reverse a string manually? A: Backward, from `length - 1` down to `0`.
- Q: What's a quick way to check if a string is a palindrome once you have `reverseString`? A: Compare the lowercase original to its lowercase reverse with `===`.

### Practice

Write a function that counts how many times a full word (not just a letter) appears in a sentence, and test your four functions today against at least three different inputs each.

### Sources

- javascript.info, "Strings" (task section at bottom of page) — https://javascript.info/string
- freeCodeCamp, "Basic Algorithm Scripting" (string challenges) — https://www.freecodecamp.org/learn/
- YouTube search: "JavaScript reverse string palindrome count vowels tutorial"
