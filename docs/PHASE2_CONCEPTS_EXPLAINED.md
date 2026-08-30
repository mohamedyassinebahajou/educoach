# Phase 2 Concepts Explained — EduCoach AI

**Purpose:** Understand every idea behind your model-training notebook (`02_Model_Training.ipynb`).  
**How to use:** Read one concept → watch the video → map it to your actual metrics (baseline vs Random Forest).

---

## Watch order (recommended)

1. Machine Learning intro + bias/variance
2. Features vs target / leakage
3. Train/test split
4. One-hot encoding
5. Pipelines + ColumnTransformer
6. Linear regression + R²
7. RMSE / MAE
8. Decision trees → Regression trees
9. Random Forests
10. Cross-validation + GridSearch
11. Confusion matrix + Recall
12. Feature importance + saving models

---

## Your Phase 2 results (keep these in mind)

| Model | RMSE | MAE | R² | At-risk Recall |
|-------|------|-----|----|----------------|
| Linear Regression (baseline) | 2.73 | 2.20 | 0.80 | 0.96 |
| Random Forest (best) | **2.65** | **2.15** | **0.81** | **1.00** |

Best RF params:

- `n_estimators=300`
- `max_depth=10`
- `min_samples_leaf=2`
- `min_samples_split=2`

Confusion matrix (RF):

```text
[[23, 4],
 [ 0, 26]]
```

Meaning:

- **TN=23**, **FP=4**, **FN=0**, **TP=26**
- No struggling student missed on the test set

---

## 1. What Machine Learning Is Doing Here

### Plain meaning
ML learns a function from examples:

```text
features (X)  →  model  →  prediction (ŷ)
```

In EduCoach:

```text
day, topic, exercises, hints, time, previous score
        →
predicted tonight score
        →
at_risk if predicted score < 10
```

### Two problem types you used

| Type | Output | EduCoach use |
|------|--------|--------------|
| **Regression** | continuous number | predict score /20 |
| **Classification** | class label | at-risk / not at-risk |

You trained a **regressor**, then derived classification by thresholding.

### Watch
- **Gentle ML intro — StatQuest:**  
  [A Gentle Introduction to Machine Learning](https://www.youtube.com/watch?v=Gv9_4yMHFhI)
- **Bias-Variance Tradeoff — StatQuest:**  
  [Machine Learning Fundamentals: Bias and Variance](https://www.youtube.com/watch?v=EuBBz3bI-aA)

---

## 2. Features, Target, and Data Leakage

### Plain meaning

| Term | Meaning | EduCoach example |
|------|---------|------------------|
| **Features (X)** | Inputs used to predict | `hints_used`, `previous_eval_score`, … |
| **Target (y)** | What you want to predict | `today_eval_score` |
| **Leakage** | Accidentally giving the model information it would not have at prediction time | Using `at_risk` as an input (derived from target) |

### Why you excluded `at_risk` from X
Because:

```text
at_risk = (today_eval_score < 10)
```

If you feed `at_risk` as a feature, the model cheats.

### Watch
- Covered conceptually in ML intros; practical leakage warning also appears in pipeline talks below.
- **Good framing video:**  
  [A Gentle Introduction to Machine Learning — StatQuest](https://www.youtube.com/watch?v=Gv9_4yMHFhI)

---

## 3. Train / Test Split

### Plain meaning
Split data into:

- **Train set** → model learns patterns
- **Test set** → honest evaluation on unseen rows

You used:

```python
train_test_split(X, y, test_size=0.2, random_state=42)
```

→ 211 train / 53 test

### Why it matters
If you evaluate on the same data you trained on, metrics look unrealistically good (overfitting illusion).

### Watch
- **Codebasics (sklearn practical):**  
  [Training and Testing Data](https://www.youtube.com/watch?v=fwY9Qv96DJY)

---

## 4. One-Hot Encoding

### Plain meaning
ML models need numbers.  
`topic="loops"` is text, so we convert categories into binary columns:

```text
topic_loops = 1
topic_lists = 0
topic_functions = 0
...
```

That is **one-hot encoding**.

### Why `handle_unknown="ignore"`
If a future row has an unseen topic, don’t crash — encode unknowns as zeros.

### EduCoach connection
You had **11 topics**, so encoding created multiple `cat__topic_*` columns.  
Feature importance showed topic columns were weak compared with numeric performance features.

### Watch
- **Codebasics:**  
  [One Hot Encoding](https://www.youtube.com/watch?v=9yl6-HEY7_s)
- **Also useful (trees notebook includes encoding section):**  
  [Classification Trees in Python from Start to Finish — StatQuest](https://www.youtube.com/watch?v=q90UDEgYqeI)

---

## 5. Pipelines & ColumnTransformer

### Plain meaning

**Pipeline** = chain of steps treated as one object:

```text
preprocess → model
```

**ColumnTransformer** = apply different transforms to different columns:

- numeric → imputer
- categorical → imputer + one-hot

### Why this is best practice
1. Same transforms at train and predict time  
2. Prevents preprocessing mistakes  
3. Lets you save **one** `.pkl` that includes encoding + model  
4. Works cleanly with `GridSearchCV`

### EduCoach connection
You saved the full pipeline to `models/random_forest.pkl`.  
That is exactly what the future Performance Analyzer agent should load.

### Watch
- **ColumnTransformer practical:**  
  [Column Transformer in Machine Learning](https://www.youtube.com/watch?v=5TVj6iEBR4I)
- **Pipeline + ColumnTransformer style walkthrough:**  
  [Simplify Data Preprocessing with ColumnTransformer](https://www.youtube.com/watch?v=yBLNbeKbFKI)

---

## 6. Baseline Model (Linear Regression)

### Plain meaning
A baseline is a **simple reference model**.  
If a fancy model cannot beat it, the fancy model is not justified.

Linear Regression assumes:

```text
y ≈ w0 + w1*x1 + w2*x2 + ...
```

### EduCoach connection
Your baseline was already strong:

- RMSE 2.73
- R² 0.80

Why? Your synthetic score formula is partly linear (`previous * 0.6 + success_rate * 10 + ...`).

### Watch
- **StatQuest:**  
  [Linear Regression, Clearly Explained!!!](https://www.youtube.com/watch?v=7ArmBVF2dCs)

---

## 7. R² (Coefficient of Determination)

### Plain meaning
R² ≈ “What fraction of the target’s variance does the model explain?”

- `R² = 0` → no better than predicting the mean
- `R² = 1` → perfect
- Your RF `R² ≈ 0.81` → explains ~81% of score variance

### Watch
- **StatQuest:**  
  [R-squared, Clearly Explained!!!](https://www.youtube.com/watch?v=2AQKmw14mHM)

---

## 8. MAE and RMSE

### Plain meaning

For each row, residual = `actual - predicted`.

| Metric | Formula idea | Intuition |
|--------|--------------|-----------|
| **MAE** | mean(\|residual\|) | Typical absolute error |
| **MSE** | mean(residual²) | Penalizes big mistakes more |
| **RMSE** | √MSE | Like MSE, but back in score units |

### EduCoach reading

| Model | MAE | RMSE |
|-------|-----|------|
| Baseline | 2.20 | 2.73 |
| RF | 2.15 | 2.65 |

Interpretation:

- Typical miss ≈ **2.1–2.2 points** on a /20 scale
- RMSE a bit higher than MAE → some larger errors exist (normal)

PoC soft target was RMSE `< 2.5`. You landed at **2.65** — close, and still useful because recall is excellent.

### Watch
- **Regression error metrics explained:**  
  [MAE / MSE / RMSE explained](https://www.youtube.com/watch?v=KjR9yPzxKnE)
- **R² companion:**  
  [R-squared — StatQuest](https://www.youtube.com/watch?v=2AQKmw14mHM)

---

## 9. Residuals & Predicted-vs-Actual Plots

### Plain meaning

1. **Predicted vs actual scatter**  
   Points near the diagonal (`y = x`) = good predictions.

2. **Residual histogram**  
   Residuals centered near 0 = no huge systematic bias.

### EduCoach connection
You plotted both. Together with RMSE/MAE, they show the model is decent but not perfect — expected on 53 test rows.

### Watch
- Covered inside linear regression videos:  
  [Linear Regression, Clearly Explained!!! — StatQuest](https://www.youtube.com/watch?v=7ArmBVF2dCs)

---

## 10. Decision Trees (foundation for Random Forest)

### Plain meaning
A decision tree asks a sequence of yes/no questions on features and ends in a prediction leaf.

Example intuition:

```text
if previous_eval_score < 8
  and exercises_solved_correctly < 2
    → predict low score
else
    → predict higher score
```

Trees are flexible but can overfit if grown too deep.

### Watch
- **StatQuest:**  
  [Decision and Classification Trees, Clearly Explained!!!](https://www.youtube.com/watch?v=_L39rN6gz7Y)

---

## 11. Regression Trees

### Plain meaning
Same idea as decision trees, but leaves predict a **number** (average of samples in that leaf), not a class.

### Watch
- **StatQuest:**  
  [Regression Trees, Clearly Explained!!!](https://www.youtube.com/watch?v=g9c66TUylZ4)

---

## 12. Random Forests

### Plain meaning
A Random Forest builds **many trees** on random subsets of data/features, then averages their predictions.

Why better than one tree?

- reduces variance
- more robust
- usually better generalization

### Key hyperparameters you tuned

| Param | Meaning | Your best |
|-------|---------|-----------|
| `n_estimators` | number of trees | 300 |
| `max_depth` | how deep each tree can grow | 10 |
| `min_samples_split` | min samples to split a node | 2 |
| `min_samples_leaf` | min samples in a leaf | 2 |

`max_depth=10` + `min_samples_leaf=2` is a mild regularizer (helps avoid overfitting).

### EduCoach connection
RF beat baseline on all regression metrics and reached **recall = 1.0**.

### Watch
- **StatQuest Part 1:**  
  [Random Forests Part 1 - Building, Using and Evaluating](https://www.youtube.com/watch?v=J4Wdy0Wc_xQ)
- **StatQuest Part 2:**  
  [Random Forests Part 2: Missing data and clustering](https://www.youtube.com/watch?v=sQ870aTKqiM)

---

## 13. Cross-Validation

### Plain meaning
Instead of trusting one train/validation split, CV rotates folds:

```text
Fold1 test, rest train
Fold2 test, rest train
...
average the scores
```

You used **5-fold CV** inside `GridSearchCV`.

### Why your CV score was negative
You scored with `neg_root_mean_squared_error`.

```text
Best CV score = -2.51
⇒ CV RMSE ≈ 2.51
```

scikit-learn maximizes scores, so it stores RMSE as negative.

### Watch
- **StatQuest:**  
  [Machine Learning Fundamentals: Cross Validation](https://www.youtube.com/watch?v=fSytzGwwBVw)

---

## 14. GridSearchCV (Hyperparameter Tuning)

### Plain meaning
Try many hyperparameter combinations, evaluate each with CV, keep the best.

You searched 108 candidates × 5 folds = **540 fits**.

### Important
Grid search finds the best settings **on training data via CV**.  
Final honesty check is still the **held-out test set**.

That is why:

- CV RMSE ≈ 2.51
- Test RMSE ≈ 2.65

Small gap is normal on a small dataset.

### Watch
- Practical GridSearch often appears after CV/pipeline videos; solid sklearn workflow:  
  [Training and Testing Data — Codebasics](https://www.youtube.com/watch?v=fwY9Qv96DJY)
- Concept foundation:  
  [Cross Validation — StatQuest](https://www.youtube.com/watch?v=fSytzGwwBVw)

---

## 15. Confusion Matrix

### Plain meaning
For binary classification, count these four outcomes:

| | Predicted Not At-Risk | Predicted At-Risk |
|--|------------------------|-------------------|
| **Actual Not At-Risk** | TN | FP |
| **Actual At-Risk** | FN | TP |

### Your RF matrix

```text
[[23, 4],
 [ 0, 26]]
```

| Cell | Count | Meaning for the coach |
|------|-------|------------------------|
| TN | 23 | Correctly left alone |
| FP | 4 | Extra check on a student who was actually okay |
| FN | 0 | **Missed struggling student** (worst case) |
| TP | 26 | Correctly flagged at-risk |

For EduCoach, **FN is the dangerous one**. You got **0 FN**. Great.

### Watch
- **StatQuest:**  
  [Machine Learning Fundamentals: The Confusion Matrix](https://www.youtube.com/watch?v=Kdsp6soUEyM)

---

## 16. Precision, Recall, Sensitivity

### Plain meaning (at-risk = positive class)

- **Recall (Sensitivity)** = `TP / (TP + FN)`  
  “Of all truly at-risk students, how many did we catch?”

- **Precision** = `TP / (TP + FP)`  
  “Of students we flagged at-risk, how many truly were?”

### EduCoach values (RF)

- Recall = **1.00** (caught all 26)
- Precision ≈ **0.87** (26 / 30 flagged)
- Coach preference: high recall first, even if a few false alarms

### Watch
- **StatQuest:**  
  [Machine Learning Fundamentals: Sensitivity and Specificity](https://www.youtube.com/watch?v=vP06aMoz4v8)
- **Precision/Recall companion style lesson:**  
  [Precision, Recall, F1 — The Nerdy Dev](https://www.youtube.com/watch?v=dlLHN7rL03w)

---

## 17. Thresholding a Regressor into a Classifier

### Plain meaning
You did not train a separate classifier. You did:

```python
predicted_at_risk = (predicted_score < 10)
```

This is common when the business rule is already a numeric cutoff.

### Why it fits EduCoach
The coach already thinks in scores /20.  
Predict the score, then apply the school rule `< 10`.

### Watch
Threshold ideas appear in ROC videos (optional deeper dive):  
[ROC and AUC, Clearly Explained! — StatQuest](https://www.youtube.com/watch?v=4jRBRDbJemM)

---

## 18. Feature Importance

### Plain meaning
For tree models, feature importance estimates how much each feature helped reduce prediction error across trees.

### Your top drivers

1. `exercises_solved_correctly` ≈ 0.46  
2. `previous_eval_score` ≈ 0.37  
3. `hints_used` ≈ 0.08  

This aligned with Phase 1 correlations. Nice consistency story for soutenance.

### Caution
Importance ≠ causality.  
It means “useful for prediction in this model,” not “this causes the score.”

### Watch
Covered inside Random Forest videos:  
[Random Forests Part 1 — StatQuest](https://www.youtube.com/watch?v=J4Wdy0Wc_xQ)

---

## 19. Overfitting vs Underfitting

### Plain meaning

| Problem | Symptom | Fix idea |
|---------|---------|----------|
| **Underfitting** | poor train + poor test | richer model / better features |
| **Overfitting** | great train, weak test | shallower trees, more regularization, more data |

### EduCoach reading
CV RMSE 2.51 vs test RMSE 2.65 → mild gap, not a disaster.  
With only 264 rows, some variance is expected.

### Watch
- **StatQuest:**  
  [Bias and Variance](https://www.youtube.com/watch?v=EuBBz3bI-aA)

---

## 20. Saving Models with joblib

### Plain meaning
`joblib.dump(model, path)` serializes the fitted object to disk.  
Later: `joblib.load(path)` restores it for prediction.

### Why save the pipeline
Your `.pkl` includes:

- imputers
- one-hot encoder
- trained Random Forest

So inference code can do:

```python
model = joblib.load("models/random_forest.pkl")
pred = model.predict(new_features_dataframe)
```

No manual re-encoding needed.

### Watch
- Practical save/load often appears in end-to-end sklearn tutorials; concept also in StatQuest Python tree webinar workflow:  
  [Classification Trees in Python from Start to Finish](https://www.youtube.com/watch?v=q90UDEgYqeI)

---

## Phase 2 Concept Map (EduCoach)

```text
CSV
 │
 ├─ X features / y target
 ├─ train_test_split
 │
 ├─ ColumnTransformer + Pipeline
 │     ├─ OneHot(topic)
 │     └─ numeric passthrough/impute
 │
 ├─ Baseline LinearRegression ── RMSE/MAE/R²
 │
 ├─ RandomForest + GridSearchCV
 │     └─ best params via 5-fold CV
 │
 ├─ Test evaluation
 │     ├─ regression metrics
 │     └─ threshold <10 → confusion matrix / recall
 │
 └─ Save full pipeline (.pkl) + metrics.json
```

---

## Self-check (can you explain these out loud?)

1. Why do we need a baseline?
2. Why is test RMSE more important than training fit quality?
3. Why was GridSearch CV score negative?
4. What is the difference between RMSE and MAE?
5. Why is recall more important than precision for the coach?
6. Why save the full pipeline instead of only `RandomForestRegressor`?
7. What does `FN = 0` mean in your confusion matrix?

If you can answer these, Phase 2 theory is solid.

---

## Official docs (bookmark)

- Train/test split: https://scikit-learn.org/stable/modules/cross_validation.html  
- Pipeline: https://scikit-learn.org/stable/modules/compose.html  
- RandomForestRegressor: https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html  
- Metrics: https://scikit-learn.org/stable/modules/model_evaluation.html  

---

## Suggested study plan (2–3 evenings)

### Evening A (Phase 1 refresh)
1. Mean/std  
2. Histograms  
3. Correlation  

### Evening B (Phase 2 core)
1. Train/test split  
2. Linear regression + R²  
3. RMSE/MAE  

### Evening C (Phase 2 advanced)
1. Decision trees + Random Forest  
2. Cross-validation  
3. Confusion matrix + recall  

Then you are ready to explain your notebooks in a soutenance without memorizing code only.

---

## Next project step

When concept review is done, we start **Phase 3 — RAG** (lesson docs → Chroma → Concept Tutor).
