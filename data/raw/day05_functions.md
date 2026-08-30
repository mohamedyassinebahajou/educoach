---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 5 — Functions

## Learning objectives
- Define functions with `def`
- Pass arguments and return values
- Understand default argument values
- Document functions with docstrings

## Key concepts
A function packages reusable logic.

```python
def function_name(parameters):
    """Optional docstring."""
    # body
    return value
```

Functions can:
- take positional arguments
- take keyword arguments
- define default values
- return one or more values (as a tuple)

The first statement in a function body can be a documentation string (docstring).

## Worked examples (code + step-by-step output)

### Example 1 — EduCoach: `is_at_risk(score)`
```python
def is_at_risk(score):
    """Return True if score is below 10."""
    return score < 10

print(is_at_risk(7))
print(is_at_risk(12))
print(is_at_risk(10))
```

Step-by-step:
1. Call `is_at_risk(7)` → `7 < 10` → returns `True` → print `True`.
2. Call `is_at_risk(12)` → `12 < 10` → returns `False` → print `False`.
3. Call `is_at_risk(10)` → `10 < 10` → returns `False` → print `False`.

Output:
```text
True
False
False
```

### Example 2 — `mean(numbers)` with return value
```python
def mean(numbers):
    """Return the average of a list of numbers."""
    total = sum(numbers)
    count = len(numbers)
    return total / count

scores = [12, 7, 15]
avg = mean(scores)
print("Scores:", scores)
print("Average:", avg)
```

Step-by-step:
1. `sum([12, 7, 15])` → `34`.
2. `len([12, 7, 15])` → `3`.
3. `34 / 3` → `11.333...` returned as `avg`.
4. Print scores and average.

Output:
```text
Scores: [12, 7, 15]
Average: 11.333333333333334
```

### Example 3 — Default argument: `greet(name, excited=False)`
```python
def greet(name, excited=False):
    msg = f"Hello, {name}"
    if excited:
        msg += "!"
    return msg

print(greet("Alice"))
print(greet("Bob", excited=True))
```

Step-by-step:
| call | `excited` value | result |
|------|-----------------|--------|
| `greet("Alice")` | default `False` | `"Hello, Alice"` |
| `greet("Bob", excited=True)` | `True` | `"Hello, Bob!"` |

Output:
```text
Hello, Alice
Hello, Bob!
```

### Example 4 — `fib(n)` prints a Fibonacci series
```python
def fib(n):
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=" ")
        a, b = b, a + b
    print()

fib(20)
```

Step-by-step:
| check `a < 20` | print `a` | new `(a, b)` |
|----------------|-----------|--------------|
| 0 < 20 ✓ | 0 | (1, 1) |
| 1 < 20 ✓ | 1 | (1, 2) |
| 1 < 20 ✓ | 1 | (2, 3) |
| 2 < 20 ✓ | 2 | (3, 5) |
| 3 < 20 ✓ | 3 | (5, 8) |
| 5 < 20 ✓ | 5 | (8, 13) |
| 8 < 20 ✓ | 8 | (13, 21) |
| 13 < 20 ✓ | 13 | (21, 34) |
| 21 < 20 ✗ | stop | |

Output:
```text
0 1 1 2 3 5 8 13 
```

## Common mistakes
- Forgetting `return` (function returns `None`)
- Using a mutable object as a default argument
- Confusing printing inside a function with returning a value
- Wrong number of arguments (`TypeError`)

## Mini exercises (no full solutions)
1. Write `is_at_risk(score)` that returns `True` if score < 10.
2. Write `mean(numbers)` that returns the average of a list.
3. Write `greet(name, excited=False)` with a default argument.

## Summary
- `def` creates reusable functions
- Arguments can be required or optional
- `return` sends a result back to the caller
- Docstrings explain the function purpose

## Official reference
- https://docs.python.org/3/tutorial/controlflow.html#defining-functions
