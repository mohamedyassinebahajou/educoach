---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 6 — Dictionaries

## Learning objectives
- Store data as key → value pairs
- Add, update, and read dictionary entries
- Loop over keys, values, and items
- Know when to choose a dict over a list

## Key concepts
A dictionary (`dict`) maps keys to values:
`{"Hans": "active", "Éléonore": "inactive"}`

Keys must be immutable (strings, numbers, tuples of immutables). Values can be any type.

Main operations:
- get/set by key: `d[key]`
- membership: `key in d`
- delete: `del d[key]`
- iterate: `.keys()`, `.values()`, `.items()`

Dictionaries are excellent for labeled data (student id → score, username → status).

## Worked examples (code + step-by-step output)

### Example 1 — Read, add, and check membership
```python
users = {"Hans": "active", "Éléonore": "inactive", "景太郎": "active"}

print(users["Hans"])
users["Ada"] = "active"
print("Ada" in users)
print(users)
```

Step-by-step:
1. Look up `"Hans"` → value `"active"`.
2. Add new key `"Ada"` with value `"active"`.
3. `"Ada" in users` → `True`.
4. Print the full dictionary (4 entries now).

Output:
```text
active
True
{'Hans': 'active', 'Éléonore': 'inactive', '景太郎': 'active', 'Ada': 'active'}
```

### Example 2 — Safe read with `.get()`
```python
users = {"Alice": 12, "Bob": 7}

print(users.get("Alice"))
print(users.get("Missing", "unknown"))
```

Step-by-step:
1. `users.get("Alice")` → key exists → returns `12`.
2. `users.get("Missing", "unknown")` → key missing → returns default `"unknown"` (no `KeyError`).

Output:
```text
12
unknown
```

### Example 3 — Loop with `.items()`
```python
users = {"Hans": "active", "Éléonore": "inactive", "Ada": "active"}

for user, status in users.items():
    print(user, "->", status)
```

Step-by-step:
| iteration | `user` | `status` | printed line |
|-----------|--------|----------|--------------|
| 1 | Hans | active | `Hans -> active` |
| 2 | Éléonore | inactive | `Éléonore -> inactive` |
| 3 | Ada | active | `Ada -> active` |

Output:
```text
Hans -> active
Éléonore -> inactive
Ada -> active
```

### Example 4 — EduCoach: find at-risk students
```python
students = {"Alice": 12, "Bob": 7, "Carlos": 9, "Diana": 15}

print("All students:")
for name, score in students.items():
    print(f"  {name}: {score}")

print("\nAt-risk students (score < 10):")
for name, score in students.items():
    if score < 10:
        print(f"  {name} is at risk with score {score}")
```

Step-by-step:
1. First loop prints every student and score.
2. Second loop checks each score; only `Bob` (7) and `Carlos` (9) are below 10.

Output:
```text
All students:
  Alice: 12
  Bob: 7
  Carlos: 9
  Diana: 15

At-risk students (score < 10):
  Bob is at risk with score 7
  Carlos is at risk with score 9
```

### Example 5 — Build a filtered dictionary
```python
users = {"Hans": "active", "Éléonore": "inactive", "Ada": "active", "Bob": "active"}

active_users = {}
for user, status in users.items():
    if status == "active":
        active_users[user] = status

print(active_users)
print("Active count:", len(active_users))
```

Step-by-step:
1. Start with empty `active_users = {}`.
2. Loop: keep only entries where `status == "active"`.
3. Result has 3 active users: Hans, Ada, Bob.

Output:
```text
{'Hans': 'active', 'Ada': 'active', 'Bob': 'active'}
Active count: 3
```

## Common mistakes
- Using a missing key with `d[key]` (`KeyError`) — prefer `.get()`
- Assuming dictionaries keep insertion order in very old Python (modern Python does)
- Trying to use a list as a key (`TypeError`)
- Confusing dict keys with list indexes

## Mini exercises (no full solutions)
1. Create a dict of 3 students and their scores.
2. Print all students with score < 10.
3. Update one score and add a new student.

## Summary
- Dicts store key-value associations
- Lookup by key is the core operation
- `.items()` is ideal for looping
- Use `.get()` to avoid KeyError

## Official reference
- https://docs.python.org/3/tutorial/datastructures.html#dictionaries
