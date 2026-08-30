---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 4 — Lists

## Learning objectives
- Create and index lists
- Slice, append, and update list values
- Understand that lists are mutable
- Use common list operations

## Key concepts
A list groups values in square brackets, separated by commas:
`squares = [1, 4, 9, 16, 25]`

Lists support:
- indexing (`squares[0]`)
- negative indexing (`squares[-1]`)
- slicing (`squares[-3:]`)
- concatenation (`list_a + list_b`)

Unlike strings, lists are **mutable**: you can change elements, append items, or clear the list.

Useful methods/operations include `append()`, slice assignment, and `len()`.

## Worked examples (code + step-by-step output)

### Example 1 — Indexing and slicing
```python
squares = [1, 4, 9, 16, 25]
print(squares[0])
print(squares[-1])
print(squares[-3:])
```

Step-by-step:
| expression | meaning | result |
|------------|---------|--------|
| `squares[0]` | first element | `1` |
| `squares[-1]` | last element | `25` |
| `squares[-3:]` | last 3 elements | `[9, 16, 25]` |

Output:
```text
1
25
[9, 16, 25]
```

### Example 2 — Mutating a list (change + append)
```python
cubes = [1, 8, 27, 65, 125]
cubes[3] = 64
cubes.append(216)
print(cubes)
```

Step-by-step execution:
1. Start with `[1, 8, 27, 65, 125]`.
2. `cubes[3] = 64` replaces index 3 (`65` → `64`).
3. `cubes.append(216)` adds `216` at the end.
4. Final list: `[1, 8, 27, 64, 125, 216]`.

Output:
```text
[1, 8, 27, 64, 125, 216]
```

### Example 3 — Slice assignment
```python
letters = ["a", "b", "c", "d", "e", "f", "g"]
letters[2:5] = ["C", "D", "E"]
print(letters)
```

Step-by-step:
1. Slice `[2:5]` covers indices 2, 3, 4 → `"c"`, `"d"`, `"e"`.
2. Replace those 3 elements with `["C", "D", "E"]`.
3. List becomes `['a', 'b', 'C', 'D', 'E', 'f', 'g']`.

Output:
```text
['a', 'b', 'C', 'D', 'E', 'f', 'g']
```

### Example 4 — Nested lists
```python
a = ["a", "b", "c"]
n = [1, 2, 3]
x = [a, n]
print(x[0][1])
```

Step-by-step:
1. `x` is a list containing two lists: `[["a","b","c"], [1,2,3]]`.
2. `x[0]` → inner list `["a", "b", "c"]`.
3. `x[0][1]` → second element of that inner list → `"b"`.

Output:
```text
b
```

### Example 5 — EduCoach: filter at-risk scores
```python
scores = [12, 7, 15, 9, 11]
at_risk = []

for score in scores:
    if score < 10:
        at_risk.append(score)

print("All scores:", scores)
print("At risk (< 10):", at_risk)
print("Count at risk:", len(at_risk))
```

Step-by-step:
| score | `< 10`? | action |
|-------|---------|--------|
| 12 | No | skip |
| 7 | Yes | append 7 |
| 15 | No | skip |
| 9 | Yes | append 9 |
| 11 | No | skip |

Output:
```text
All scores: [12, 7, 15, 9, 11]
At risk (< 10): [7, 9]
Count at risk: 2
```

## Common mistakes
- Confusing index `0` with human counting from 1
- Assuming `b = a` copies the list (it usually aliases the same object)
- Using out-of-range indexes (`IndexError`)
- Expecting strings to behave like lists for item assignment

## Mini exercises (no full solutions)
1. Build a list of 5 integers and replace the third value.
2. Append two values, then print the list length.
3. From `names = ["Ada", "Linus", "Guido"]`, create a sliced list with only the first two names.

## Summary
- Lists store ordered collections
- They are mutable and support indexing/slicing
- `append` and slice assignment are everyday tools
- Be careful with aliasing vs copying

## Official reference
- https://docs.python.org/3/tutorial/introduction.html#lists
- https://docs.python.org/3/tutorial/datastructures.html#more-on-lists
