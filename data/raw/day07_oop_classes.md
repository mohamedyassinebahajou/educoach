---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 7 — OOP: Classes

## Learning objectives
- Define a class with `class`
- Create instances (objects)
- Use `__init__` to initialize state
- Define methods that operate on `self`

## Key concepts
Object-oriented programming (OOP) groups data and behavior together.

A **class** is a blueprint.  
An **instance** is one concrete object created from that blueprint.

`__init__` is the initializer method. The first parameter of instance methods is conventionally named `self` and refers to the current object.

## Worked examples (code + step-by-step output)

### Example 1 — EduCoach `Student` class
```python
class Student:
    """Simple student model for EduCoach."""

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def is_at_risk(self):
        return self.score < 10

    def update_score(self, new_score):
        self.score = new_score


alice = Student("Alice", 12)
bob = Student("Bob", 7)

print(alice.name, alice.is_at_risk())
print(bob.name, bob.is_at_risk())
bob.update_score(11)
print(bob.name, "at risk?", bob.is_at_risk())
```

Step-by-step execution:
1. Create `alice` → `name="Alice"`, `score=12` → `is_at_risk()` → `12 < 10` → `False`.
2. Create `bob` → `name="Bob"`, `score=7` → `is_at_risk()` → `7 < 10` → `True`.
3. `bob.update_score(11)` changes Bob's score to 11.
4. `bob.is_at_risk()` → `11 < 10` → `False`.

Output:
```text
Alice False
Bob True
Bob at risk? False
```

### Example 2 — `label()` method returns a status string
```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def label(self):
        if self.score < 10:
            return "at_risk"
        return "ok"


students = [Student("Alice", 12), Student("Bob", 7), Student("Carlos", 10)]

for s in students:
    print(f"{s.name}: {s.label()}")
```

Step-by-step:
| student | score | `label()` result |
|---------|-------|------------------|
| Alice | 12 | `"ok"` |
| Bob | 7 | `"at_risk"` |
| Carlos | 10 | `"ok"` (10 is not `< 10`) |

Output:
```text
Alice: ok
Bob: at_risk
Carlos: ok
```

### Example 3 — `Rectangle` with `area()` method
```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


r = Rectangle(4, 5)
print("Width:", r.width)
print("Height:", r.height)
print("Area:", r.area())
```

Step-by-step:
1. `Rectangle(4, 5)` sets `width=4`, `height=5`.
2. `r.area()` computes `4 * 5` → returns `20`.

Output:
```text
Width: 4
Height: 5
Area: 20
```

### Example 4 — Class variable vs instance variable
```python
class Dog:
    kind = "canine"  # shared by all instances

    def __init__(self, name):
        self.name = name  # unique to each instance


d1 = Dog("Rex")
d2 = Dog("Luna")

print(d1.name, d1.kind)
print(d2.name, d2.kind)
print(Dog.kind)
```

Step-by-step:
1. `kind = "canine"` lives on the class — shared by all dogs.
2. `self.name` is set per instance in `__init__`.
3. Both dogs share `"canine"` but have different names.

Output:
```text
Rex canine
Luna canine
canine
```

## Common mistakes
- Forgetting `self` in method definitions
- Calling a method on the class without an instance when it needs instance data
- Putting mutable values as class variables when you meant instance variables
- Confusing the class (blueprint) with one object (instance)

## Mini exercises (no full solutions)
1. Create a `Rectangle` class with `width`, `height`, and method `area()`.
2. Create a `BankAccount` with `deposit` and `withdraw` methods.
3. Add a method `label()` to `Student` returning `"at_risk"` or `"ok"`.

## Summary
- Classes encapsulate state + behavior
- `__init__` sets up new objects
- Methods always receive `self`
- Instances each keep their own data

## Official reference
- https://docs.python.org/3/tutorial/classes.html
