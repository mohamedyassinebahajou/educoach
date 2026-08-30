# Phase 2 — Machine Learning Training Guide

**Project:** EduCoach AI  
**Notebook to create / fill:** `notebooks/02_Model_Training.ipynb`  
**Data source:** `data/processed/student_performance.csv`  
**Artifacts to save:** `models/random_forest.pkl` and optionally `models/model_metrics.json`  
**Goal:** Train a regression model to predict `today_eval_score`, compare it to a baseline, and derive the binary `at_risk` signal the coach needs.

> You write the notebook. This guide explains the full sequence, the methods to use, what each metric means, and what to conclude.

---

## Table of Contents

1. [What Phase 2 is solving](#1-what-phase-2-is-solving)
2. [What you are predicting](#2-what-you-are-predicting)
3. [Notebook structure](#3-notebook-structure)
4. [Step-by-step implementation](#4-step-by-step-implementation)
5. [Method reference sheet](#5-method-reference-sheet)
6. [How to interpret results](#6-how-to-interpret-results)
7. [What to save](#7-what-to-save)
8. [Definition of Done](#8-definition-of-done)
9. [Common mistakes](#9-common-mistakes)

---

## 1. What Phase 2 is solving

In Phase 1 you explored the data. In Phase 2 you turn that table into a model the app can use.

The coach’s real question is:

> "By 2 PM, which students are likely to fail tonight's evaluation?"

To support that, you will train:

1. A **regression model** predicting `today_eval_score` on a 0–20 scale
2. A derived **classification signal**: `at_risk = predicted_score < 10`

This is why Phase 2 uses **both** regression and classification metrics.

| Task | Output | Why it matters |
|------|--------|----------------|
| Regression | predicted score | Gives nuance, ranking, dashboard value |
| Classification | at-risk flag | Lets the coach intervene early |

---

## 2. What you are predicting

### Target

Your main target is:

`today_eval_score`

### Derived target

You also care about:

`at_risk = today_eval_score < 10`

### Features to use

Use these columns as inputs:

- `day`
- `topic`
- `exercises_attempted`
- `exercises_solved_correctly`
- `hints_used`
- `time_spent_minutes`
- `previous_eval_score`

Do **not** use:

- `today_eval_score` as a feature (that is the target)
- `at_risk` as a feature (it is derived from the target, so that would be leakage)

### Why encode `topic`

`topic` is text, and scikit-learn models need numbers.  
So you will convert `topic` into numeric columns using **One-Hot Encoding**.

Because you now have **11 topics**, `topic` will become 11 binary columns unless you drop one category.

---

## 3. Notebook structure

Create or fill: `notebooks/02_Model_Training.ipynb`

Recommended cell plan:

| # | Cell type | Purpose |
|---|-----------|---------|
| 0 | Markdown | Title + goal |
| 1 | Code | Imports |
| 2 | Code | Load data |
| 3 | Code | Select features and target |
| 4 | Code | Train/test split |
| 5 | Code | Build preprocessing (`ColumnTransformer`) |
| 6 | Code | Baseline pipeline: `LinearRegression` |
| 7 | Code | Evaluate baseline |
| 8 | Code | Random Forest pipeline |
| 9 | Code | Grid search |
| 10 | Code | Evaluate best RF |
| 11 | Code | Derive `at_risk` and compute classification metrics |
| 12 | Code | Feature importance |
| 13 | Code | Save model with `joblib` |
| 14 | Markdown | Final conclusions |

---

## 4. Step-by-step implementation

### STEP 0 — Imports

Use:

```python
from pathlib import Path
import json

import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    confusion_matrix,
    classification_report,
    recall_score,
)
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
```

### Why these imports

| Import | Role |
|--------|------|
| `train_test_split` | Hold out unseen data for evaluation |
| `Pipeline` | Chain preprocessing + model cleanly |
| `ColumnTransformer` | Apply different transforms to numeric vs categorical columns |
| `OneHotEncoder` | Convert `topic` into numeric columns |
| `LinearRegression` | Baseline model |
| `RandomForestRegressor` | Main model required by the spec |
| `GridSearchCV` | Hyperparameter search |
| metrics | Measure regression and classification quality |
| `joblib` | Save fitted model |

---

### STEP 1 — Load the dataset

```python
DATA_PATH = Path("../data/processed/student_performance.csv")
MODEL_PATH = Path("../models/random_forest.pkl")
METRICS_PATH = Path("../models/model_metrics.json")

df = pd.read_csv(DATA_PATH)
df.head()
```

Quick sanity checks:

```python
print(df.shape)
print(df["topic"].nunique())
print(df["at_risk"].value_counts(normalize=True))
```

Expected:

- shape around `(264, 10)`
- `topic.nunique() == 11`

---

### STEP 2 — Define features and target

```python
feature_cols = [
    "day",
    "topic",
    "exercises_attempted",
    "exercises_solved_correctly",
    "hints_used",
    "time_spent_minutes",
    "previous_eval_score",
]

target_col = "today_eval_score"

X = df[feature_cols]
y = df[target_col]
```

Optional helper target for later:

```python
y_at_risk = (y < 10).astype(int)
```

### Why this matters

Separate this clearly now so you never accidentally leak target columns into the model.

---

### STEP 3 — Train/test split

Use an 80/20 split:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

print(X_train.shape, X_test.shape)
```

### Why use a test set

You need an **honest evaluation**.  
The model must be judged on data it did **not** see during training.

### Why `random_state=42`

This makes the split reproducible.

---

### STEP 4 — Separate numeric and categorical columns

```python
numeric_features = [
    "day",
    "exercises_attempted",
    "exercises_solved_correctly",
    "hints_used",
    "time_spent_minutes",
    "previous_eval_score",
]

categorical_features = ["topic"]
```

### Why split them

- Numeric columns can pass through mostly unchanged
- Categorical columns need encoding

---

### STEP 5 — Build preprocessing

Even if your current dataset has no missing values, set this up properly. It is good ML hygiene.

```python
numeric_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median")),
    ]
)

categorical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features),
    ]
)
```

### Why use a pipeline instead of preprocessing by hand

Because later:

- training and inference stay identical
- the saved `.pkl` includes preprocessing
- you avoid "trained on one format, predicted on another" bugs

---

### STEP 6 — Baseline model: Linear Regression

Build the full pipeline:

```python
baseline_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", LinearRegression()),
    ]
)

baseline_model.fit(X_train, y_train)
baseline_pred = baseline_model.predict(X_test)
```

### Why baseline first

You need a simple reference point. If Random Forest does not beat Linear Regression, then either:

- the data is mostly linear
- your RF settings are poor
- your evaluation setup has a bug

---

### STEP 7 — Evaluate the baseline

```python
baseline_rmse = mean_squared_error(y_test, baseline_pred, squared=False)
baseline_mae = mean_absolute_error(y_test, baseline_pred)
baseline_r2 = r2_score(y_test, baseline_pred)

print("Baseline RMSE:", baseline_rmse)
print("Baseline MAE :", baseline_mae)
print("Baseline R2  :", baseline_r2)
```

### Metric meanings

| Metric | Meaning | Better |
|--------|---------|--------|
| `RMSE` | Average prediction error, penalizes large errors more | Lower |
| `MAE` | Average absolute error | Lower |
| `R²` | How much variance is explained | Higher |

### Rule of thumb here

Because the target is a score out of 20:

- RMSE near `1.5–2.5` is good for this PoC
- MAE lower than RMSE is normal
- R² closer to `1` is better

---

### STEP 8 — Main model: Random Forest Regressor

Start with a clean pipeline:

```python
rf_pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "model",
            RandomForestRegressor(
                random_state=42,
                n_jobs=-1,
            ),
        ),
    ]
)
```

### Why Random Forest

It is a good match because:

- handles non-linear patterns
- robust on tabular data
- less feature scaling pain than many other models
- gives feature importance

---

### STEP 9 — Hyperparameter search with GridSearchCV

Use a small but meaningful grid first:

```python
param_grid = {
    "model__n_estimators": [100, 200, 300],
    "model__max_depth": [None, 5, 10, 15],
    "model__min_samples_split": [2, 5, 10],
    "model__min_samples_leaf": [1, 2, 4],
}
```

Fit the search:

```python
grid_search = GridSearchCV(
    estimator=rf_pipeline,
    param_grid=param_grid,
    cv=5,
    scoring="neg_root_mean_squared_error",
    n_jobs=-1,
    verbose=1,
)

grid_search.fit(X_train, y_train)
```

Inspect results:

```python
print("Best params:", grid_search.best_params_)
print("Best CV score:", grid_search.best_score_)
```

### Why `neg_root_mean_squared_error`

scikit-learn maximizes scores, so RMSE is negated during search.  
Less negative is better.

---

### STEP 10 — Evaluate the best Random Forest

```python
best_rf = grid_search.best_estimator_
rf_pred = best_rf.predict(X_test)

rf_rmse = mean_squared_error(y_test, rf_pred, squared=False)
rf_mae = mean_absolute_error(y_test, rf_pred)
rf_r2 = r2_score(y_test, rf_pred)

print("RF RMSE:", rf_rmse)
print("RF MAE :", rf_mae)
print("RF R2  :", rf_r2)
```

### Compare baseline vs RF

```python
comparison = pd.DataFrame(
    {
        "model": ["LinearRegression", "RandomForest"],
        "rmse": [baseline_rmse, rf_rmse],
        "mae": [baseline_mae, rf_mae],
        "r2": [baseline_r2, rf_r2],
    }
)

comparison
```

### What you want to see

- RF RMSE lower than baseline RMSE
- RF MAE lower than baseline MAE
- RF R² higher than baseline R²

---

### STEP 11 — Convert score prediction into at-risk prediction

This is the coach-facing signal.

```python
y_test_at_risk = (y_test < 10).astype(int)
rf_pred_at_risk = (rf_pred < 10).astype(int)
baseline_pred_at_risk = (baseline_pred < 10).astype(int)
```

Now compute recall:

```python
baseline_recall = recall_score(y_test_at_risk, baseline_pred_at_risk)
rf_recall = recall_score(y_test_at_risk, rf_pred_at_risk)

print("Baseline at-risk recall:", baseline_recall)
print("RF at-risk recall:", rf_recall)
```

Also inspect confusion matrix:

```python
cm = confusion_matrix(y_test_at_risk, rf_pred_at_risk)
cm
```

And a full report:

```python
print(classification_report(y_test_at_risk, rf_pred_at_risk, target_names=["not_at_risk", "at_risk"]))
```

### Why recall matters most

For the coach:

- False positive = you check on a student who might actually be okay
- False negative = you miss a struggling student

So **Recall on the at-risk class** is the key business metric.

---

### STEP 12 — Visual checks

#### 12.1 Predicted vs actual scatter

```python
plt.figure(figsize=(6, 6))
plt.scatter(y_test, rf_pred, alpha=0.7)
plt.plot([0, 20], [0, 20], "r--")
plt.xlabel("Actual score")
plt.ylabel("Predicted score")
plt.title("Random Forest: predicted vs actual")
plt.show()
```

Interpretation:

- points near the diagonal = good predictions
- strong spread = more error

#### 12.2 Residuals

```python
residuals = y_test - rf_pred

plt.figure(figsize=(8, 4))
sns.histplot(residuals, bins=20, kde=True)
plt.axvline(0, color="red", linestyle="--")
plt.title("Residual distribution")
plt.xlabel("Actual - Predicted")
plt.show()
```

Interpretation:

- centered near 0 = good
- heavy tails = some big misses

---

### STEP 13 — Feature importance

Because you used a pipeline, get the transformed feature names first.

```python
feature_names = best_rf.named_steps["preprocessor"].get_feature_names_out()
importances = best_rf.named_steps["model"].feature_importances_

importance_df = (
    pd.DataFrame(
        {"feature": feature_names, "importance": importances}
    )
    .sort_values("importance", ascending=False)
)

importance_df.head(15)
```

Plot it:

```python
top_n = 15
top_importance = importance_df.head(top_n).sort_values("importance")

plt.figure(figsize=(8, 6))
plt.barh(top_importance["feature"], top_importance["importance"])
plt.title("Top feature importances - Random Forest")
plt.xlabel("Importance")
plt.tight_layout()
plt.show()
```

### What to expect

Based on your EDA, strong features will likely include:

- `exercises_solved_correctly`
- `previous_eval_score`
- one or more encoded `topic_*` columns
- maybe `hints_used`

Note: feature importance is useful, but it is not the same as causality.

---

### STEP 14 — Save the best model

Save the **full pipeline**, not just the raw regressor.

```python
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
joblib.dump(best_rf, MODEL_PATH)
print(f"Saved model to: {MODEL_PATH}")
```

### Why save the full pipeline

Because the pipeline includes:

- imputers
- one-hot encoding
- the fitted Random Forest

That makes inference much simpler later in `src/ml/predict.py`.

---

### STEP 15 — Save metrics (recommended)

```python
metrics_payload = {
    "baseline": {
        "rmse": float(baseline_rmse),
        "mae": float(baseline_mae),
        "r2": float(baseline_r2),
        "at_risk_recall": float(baseline_recall),
    },
    "random_forest": {
        "rmse": float(rf_rmse),
        "mae": float(rf_mae),
        "r2": float(rf_r2),
        "at_risk_recall": float(rf_recall),
        "best_params": grid_search.best_params_,
    },
}

with open(METRICS_PATH, "w", encoding="utf-8") as f:
    json.dump(metrics_payload, f, indent=2)

metrics_payload
```

This helps later for:

- README results section
- dashboard numbers
- final presentation

---

### STEP 16 — Final conclusions cell

End the notebook with a Markdown summary answering:

1. Did Random Forest beat the baseline?
2. What were the final RMSE / MAE / R²?
3. What was at-risk recall?
4. Which features mattered most?
5. Is the model good enough for the PoC?

Use this template:

```markdown
## Phase 2 Conclusions

1. **Baseline vs Random Forest:** Random Forest [did / did not] outperform Linear Regression.
2. **Final regression metrics:** RMSE = ___, MAE = ___, R² = ___.
3. **At-risk detection:** Recall = ___, which means the model catches ___% of struggling students.
4. **Main drivers:** The most important features were ___, ___, and ___.
5. **PoC verdict:** The model is [ready / not ready] for integration into the Performance Analyzer agent because ___.
```

---

## 5. Method Reference Sheet

### Data splitting

| Method | Purpose |
|--------|---------|
| `train_test_split(X, y, test_size=0.2, random_state=42)` | Split into train and test |

### Preprocessing

| Method | Purpose |
|--------|---------|
| `ColumnTransformer(...)` | Different transforms per column group |
| `Pipeline(...)` | Chain preprocessing + model |
| `SimpleImputer(strategy="median")` | Fill missing numeric values |
| `SimpleImputer(strategy="most_frequent")` | Fill missing categorical values |
| `OneHotEncoder(handle_unknown="ignore")` | Encode text categories safely |

### Modeling

| Method | Purpose |
|--------|---------|
| `LinearRegression()` | Simple baseline |
| `RandomForestRegressor(...)` | Main non-linear model |
| `GridSearchCV(...)` | Tune hyperparameters |

### Regression metrics

| Method | Meaning |
|--------|---------|
| `mean_squared_error(..., squared=False)` | RMSE |
| `mean_absolute_error(...)` | MAE |
| `r2_score(...)` | R² |

### Classification metrics

| Method | Meaning |
|--------|---------|
| `recall_score(...)` | Fraction of true at-risk students caught |
| `confusion_matrix(...)` | Counts TP / FP / FN / TN |
| `classification_report(...)` | Precision, recall, F1, support |

### Persistence

| Method | Purpose |
|--------|---------|
| `joblib.dump(model, path)` | Save fitted model |
| `joblib.load(path)` | Reload later |

---

## 6. How to Interpret Results

### If Random Forest is clearly better

Good. That supports your choice of a non-linear model.

### If baseline and RF are very close

Possible reasons:

- synthetic formula is fairly simple and partly linear
- dataset is small (`264` rows)
- your hyperparameter grid is too narrow

### If recall is low

That means the model misses too many struggling students.  
In a coach workflow, that is risky.

Things to investigate later:

- threshold tuning (not always fixed at 10 in production)
- richer synthetic data
- more student-behavior features

### If train performance is much better than test performance

That suggests overfitting.

Potential fixes:

- reduce `max_depth`
- increase `min_samples_leaf`
- simplify the model

---

## 7. What to Save

By the end of Phase 2 you should have:

- `notebooks/02_Model_Training.ipynb`
- `models/random_forest.pkl`
- optionally `models/model_metrics.json`

Later, code files you will create:

- `src/ml/train.py`
- `src/ml/predict.py`

But for now, the notebook is enough.

---

## 8. Definition of Done

- [ ] Notebook runs top-to-bottom without errors
- [ ] Proper train/test split used
- [ ] `topic` encoded through a preprocessing pipeline
- [ ] Baseline `LinearRegression` trained and evaluated
- [ ] `RandomForestRegressor` trained with `GridSearchCV`
- [ ] Regression metrics computed for both models
- [ ] At-risk recall computed from predicted score `< 10`
- [ ] Feature importances plotted
- [ ] Best model saved to `models/random_forest.pkl`
- [ ] Final markdown conclusions written

---

## 9. Common Mistakes

| Mistake | Why it is a problem | Fix |
|--------|----------------------|-----|
| Using `at_risk` as an input feature | Leakage | Drop it from `X` |
| Encoding `topic` manually in train but differently in test | Inconsistent inference | Use `Pipeline` + `ColumnTransformer` |
| Training on the full dataset before evaluating | Inflated metrics | Split first |
| Saving only the RF model, not preprocessing | Hard to reuse at inference time | Save the full pipeline |
| Judging only RMSE | Misses coach objective | Also compute at-risk recall |
| Interpreting feature importance as proof of causality | Overclaiming | Say “important for prediction,” not “causes” |

---

## Quick Start Recap

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
```

Then open `notebooks/02_Model_Training.ipynb` in Cursor and follow:

1. Load data
2. Split features/target
3. Build preprocessing
4. Train baseline
5. Train Random Forest
6. Evaluate regression
7. Derive at-risk recall
8. Save model

When you finish, bring me:

- your metrics table
- best params
- top 10 feature importances
- any error or surprising result
