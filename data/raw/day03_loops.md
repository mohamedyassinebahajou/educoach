---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 3 — Loops (`for`, `while`, `range`)

## Learning objectives
- Iterate with `for` over sequences
- Repeat with `while` while a condition stays true
- Use `range()` to generate number sequences
- Control loops with `break` and `continue`

## Key concepts
A `for` loop iterates over items of a sequence (list, string, etc.) in order.

A `while` loop repeats as long as its condition remains true.

`range(n)` generates numbers from `0` to `n-1`.  
You can also use `range(start, stop)` and `range(start, stop, step)`.

- `break` exits the nearest enclosing loop
- `continue` skips to the next iteration

## Worked examples (code + step-by-step output)

### Example 1 — `for` over a list
```python
words = ["cat", "window", "defenestrate"]
for w in words:
    print(w, len(w))
```

Step-by-step execution:
1. Create list `words` with 3 strings.
2. First iteration: `w = "cat"` → print `cat 3`
3. Second iteration: `w = "window"` → print `window 6`
4. Third iteration: `w = "defenestrate"` → print `defenestrate 12`
5. No more items → loop ends.

Output:
```text
cat 3
window 6
defenestrate 12
```

### Example 2 — `range(5)`
```python
for i in range(5):
    print(i)
```

Step-by-step:
- `range(5)` produces `0, 1, 2, 3, 4` (stop value `5` is excluded).

Output:
```text
0
1
2
3
4
```

### Example 3 — `range(start, stop, step)`
```python
print(list(range(5, 10)))
print(list(range(0, 10, 3)))
```

Output:
```text
[5, 6, 7, 8, 9]
[0, 3, 6, 9]
```

### Example 4 — `while` loop (Fibonacci start)
```python
a, b = 0, 1
while a < 10:
    print(a)
    a, b = b, a + b
```

Step-by-step:
| check `a < 10` | print `a` | new `(a, b)` |
|----------------|-----------|--------------|
| 0 < 10 ✓ | 0 | (1, 1) |
| 1 < 10 ✓ | 1 | (1, 2) |
| 1 < 10 ✓ | 1 | (2, 3) |
| 2 < 10 ✓ | 2 | (3, 5) |
| 3 < 10 ✓ | 3 | (5, 8) |
| 5 < 10 ✓ | 5 | (8, 13) |
| 8 < 10 ✓ | 8 | (13, 21) |
| 13 < 10 ✗ | stop | |

Output:
```text
0
1
1
2
3
5
8
```

### Example 5 — `continue` and `break`
```python
for num in range(2, 10):
    if num % 2 == 0:
        print(f"Found an even number {num}")
        continue
    print(f"Found an odd number {num}")
```

Step-by-step for `num = 2` then `3`:
- `2 % 2 == 0` → print even → `continue` (skip odd print)
- `3 % 2 != 0` → print odd

Output:
```text
Found an even number 2
Found an odd number 3
Found an even number 4
Found an odd number 5
Found an even number 6
Found an odd number 7
Found an even number 8
Found an odd number 9
```

### Example 6 — stop an infinite pattern with `break`
```python
n = 1
while True:
    print(n)
    if n == 3:
        break
    n = n + 1
```

Output:
```text
1
2
3
```

## Common mistakes
- Creating an infinite `while` loop (condition never becomes false, no `break`)
- Off-by-one errors with `range` (stop value is excluded)
- Modifying a list while iterating over it (prefer copy or new list)
- Forgetting indentation in the loop body

## Mini exercises (no full solutions)
1. Print all odd numbers from 1 to 15 using `range`.
2. Ask for numbers until the user types `0`, then print the sum.
3. Loop over a list of student scores and count how many are `< 10`.

## Summary
- `for` walks through items
- `while` repeats on a condition
- `range` is perfect for numeric loops
- `break` / `continue` refine loop control

## Official reference
- https://docs.python.org/3/tutorial/controlflow.html#for-statements
- https://docs.python.org/3/tutorial/controlflow.html#the-range-function
