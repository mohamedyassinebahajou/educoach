---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 2 — Conditions (`if` / `elif` / `else`)

## Learning objectives
- Write branching logic with `if`, `elif`, and `else`
- Use comparison operators correctly
- Understand indentation as Python's block structure

## Key concepts
An `if` statement chooses which code runs based on a condition.

Comparison operators:
- `<`, `>`, `==`, `!=`, `<=`, `>=`

`elif` means "else if" and avoids deep nesting. The `else` block is optional.

In Python, indentation defines the body of the condition. All lines in the same block must share the same indentation level.

## Worked examples (code + step-by-step output)

### Example 1 — `if` / `elif` / `else` chain
```python
x = -5

if x < 0:
    x = 0
    print("Negative changed to zero")
elif x == 0:
    print("Zero")
elif x == 1:
    print("Single")
else:
    print("More")
```

Step-by-step execution:
1. Start with `x = -5`.
2. Check `x < 0` → `-5 < 0` is **True** → enter the first block.
3. Set `x = 0` and print `"Negative changed to zero"`.
4. Skip all `elif` and `else` branches (first match wins).

Output:
```text
Negative changed to zero
```

### Example 2 — Boolean combinations (`and`)
```python
score = 14
has_submitted = True

if score >= 10 and has_submitted:
    print("Pass")
elif score < 10:
    print("At risk")
else:
    print("Incomplete")
```

Step-by-step:
1. `score >= 10` → `14 >= 10` → True.
2. `has_submitted` → True.
3. `True and True` → enter the `Pass` branch.

Output:
```text
Pass
```

### Example 3 — EduCoach: at-risk check
```python
score = 7

if score < 10:
    print("at_risk")
else:
    print("ok")
```

Step-by-step:
1. `score = 7`.
2. `7 < 10` → True → print `"at_risk"`.
3. The `else` block is skipped.

Output:
```text
at_risk
```

### Example 4 — Age categories with `elif`
```python
age = 17

if age < 18:
    print("minor")
elif age < 65:
    print("adult")
else:
    print("senior")
```

Step-by-step:
| check | result | action |
|-------|--------|--------|
| `17 < 18` | True | print `"minor"`, stop |
| `17 < 65` | (not reached) | — |
| `else` | (not reached) | — |

Output:
```text
minor
```

## Common mistakes
- Using `=` (assignment) instead of `==` (comparison)
- Forgetting the colon `:` after `if` / `elif` / `else`
- Inconsistent indentation
- Writing many nested `if`s instead of `elif`

## Mini exercises (no full solutions)
1. Ask for an age and print whether the person is a minor, adult, or senior.
2. Given a score from 0 to 20, print `at_risk` if score < 10, else `ok`.
3. Check whether a password length is at least 8 characters.

## Summary
- Conditions control program flow
- `if` / `elif` / `else` handle multiple cases
- Indentation is mandatory and meaningful in Python

## Official reference
- https://docs.python.org/3/tutorial/controlflow.html#if-statements
