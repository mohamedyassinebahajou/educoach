# Phase 2 Deep Dive — Machine Learning (EduCoach)

**Companion:** [`PHASE2_CONCEPTS_EXPLAINED.md`](PHASE2_CONCEPTS_EXPLAINED.md) · [`PHASE2_ML_GUIDE.md`](PHASE2_ML_GUIDE.md)  
**Artifacts:** `models/random_forest.pkl`, `models/model_metrics.json`  
**Runtime:** `src/ml/predict.py`

---

## 1. Why Phase 2 exists

Coach question:

> By **2 PM**, who is likely to fail tonight’s eval (/20)?

ML answer:

1. Predict **continuous score**  
2. Flag **at-risk** if predicted score **< 10**

This is CDC **Bloc 1**.

---

## 2. Supervised learning in one picture

```text
Features X  →  Model  →  Prediction ŷ
     ↑                        ↑
 known at 2 PM          compared to true y
```

| | EduCoach |
|--|----------|
| **X** | day, topic, attempted, solved, hints, time, previous_eval |
| **y** | today_eval_score |
| **ŷ** | predicted_score |
| **Business rule** | at_risk = (ŷ < 10) |

You **never** put `today_eval_score` or `at_risk` in X → **no leakage**.

---

## 3. Regression + threshold (not pure classification)

| Approach | Output | Why you use it |
|----------|--------|----------------|
| **Regression** | score 0–20 | Ranking, nuance, dashboard (“3.8 vs 9.1”) |
| **Threshold** | True/False | Coach binary decision |

Pure classifier only says at-risk/OK — loses “how bad”.  
You train a **regressor**, then derive classification metrics.

---

## 4. Train / test split

**Theory:** model must work on **unseen** rows.

```text
All 264 rows
   ├─ Train (~80%) → fit Pipeline
   └─ Test  (~20%) → report RMSE, recall
```

`random_state=42` → reproducible split.

**Overfitting:** memorizes train, fails on test.  
Split (+ RF depth limits) fights that.

---

## 5. Preprocessing: One-Hot + Pipeline

### Why One-Hot for `topic`?
Topic is **nominal** (no true order).  
One-Hot → columns like `topic_loops=0/1`, `topic_lists=0/1`, …

Label-encoding (loops=1, lists=2…) would invent a false ranking.

### Why `Pipeline` + `ColumnTransformer`?
```text
Raw row
  → numeric: impute
  → topic: impute + OneHot
  → RandomForest / LinearRegression
```

**Whole Pipeline** saved in `.pkl` → predict-time uses **same** transforms as training.  
Avoids “trained with One-Hot, predicted with raw strings” bugs.

---

## 6. Baseline: Linear Regression

**Baseline** = simple competitor.

Linear Regression assumes roughly:

```text
score ≈ w1*solved + w2*previous + … + b
```

If RF cannot beat it, complexity is unjustified.

### Your baseline
| RMSE | MAE | R² | At-risk recall |
|------|-----|----|----------------|
| ≈ 2.73 | ≈ 2.20 | ≈ 0.80 | ≈ 0.96 |

Already strong (synthetic data has clear linear-ish signals) — RF must still improve a bit + nail recall.

---

## 7. Random Forest (theory)

### Decision tree (intuition)
Asks questions like:
- `solved ≤ 2?`
- `previous < 10?`
- `hints > 5?`

Leaf → predicted score (average of training rows in that leaf).

### Forest
Many trees on random subsets of rows/features → average predictions.

**Why good for EduCoach**
- Captures **non-linear** interactions (hints × solved)  
- Little need for feature scaling  
- Gives **feature importance**  
- Works well on small/medium tabular data  

### Your best RF (GridSearch)
| Param | Value |
|-------|-------|
| n_estimators | 300 |
| max_depth | 10 |
| min_samples_leaf | 2 |
| min_samples_split | 2 |

### Your RF metrics
| RMSE | MAE | R² | At-risk recall |
|------|-----|----|----------------|
| **≈ 2.65** | **≈ 2.15** | **≈ 0.81** | **1.00** |

Slightly better than baseline on error; **perfect recall** on the test set.

---

## 8. Metrics explained (memorize)

### RMSE (Root Mean Squared Error)
Typical size of score mistakes, in **/20 points**.  
Penalizes large errors more than MAE.

- RF ≈ **2.65** → predictions often ~2–3 points off  
- Soft CDC target &lt; 2.5 → **slightly above**, acceptable for PoC if recall is excellent  

### MAE
Average absolute error ≈ **2.15** — easier intuition than RMSE.

### R²
Share of variance explained ≈ **0.81** → model captures most score variation (1.0 = perfect, 0 = as bad as predicting the mean).

### Confusion matrix & Recall (at-risk)

After thresholding ŷ &lt; 10:

Your RF test matrix (from training notes):

```text
                Pred OK    Pred at-risk
True OK           23            4        (FP)
True at-risk       0           26        (TP)
```

| Cell | Meaning |
|------|---------|
| **TP=26** | Correctly flagged struggling |
| **FN=0** | Missed struggling → **none** |
| **FP=4** | False alarms |
| **TN=23** | Correctly OK |

**Recall** = TP / (TP+FN) = 26/26 = **1.0**  
→ Of true at-risk students in the test set, you caught **all**.

**Why recall &gt; vanity accuracy:** missing a fail is worse for the coach than an extra check-in.

CDC: recall &gt; 75% → **passed**.

---

## 9. Feature importance (what RF used)

Approx. from your pipeline:

| Feature group | Importance order |
|---------------|------------------|
| `exercises_solved_correctly` | #1 |
| `previous_eval_score` | #2 |
| `hints_used` | medium |
| attempted / time | smaller |
| `day` / individual topics | weak |

Matches EDA correlations → good story continuity Phase 1 → 2.

**No `student_id` in X** → learn behavior, not identity.

---

## 10. GridSearch / hyperparameters (practical theory)

**Hyperparameters** = settings chosen before fitting (depth, number of trees), not learned like weights.

**GridSearchCV** tries combinations, uses cross-validation on train, picks best by a score (e.g. neg RMSE).

Limits depth / min leaf → reduce overfitting on only 264 rows.

---

## 11. From notebook to production: `predict.py`

```text
features dict → 1-row DataFrame → pipeline.predict → score
→ at_risk = score < AT_RISK_THRESHOLD (10)
```

Used by:
- Performance Analyzer agent  
- `POST /predict_today`  
- Coach risk board  

---

## 12. Worked example

```python
features = {
  "day": 3,
  "topic": "loops",
  "exercises_attempted": 5,
  "exercises_solved_correctly": 1,
  "hints_used": 10,
  "time_spent_minutes": 90,
  "previous_eval_score": 5.0,
}
# → predicted_score ≈ 3.81, at_risk True
```

Story: weak yesterday + few solves + many hints → model agrees with coaching intuition.

---

## 13. How to defend RMSE ≈ 2.65

Jury: “CDC says RMSE &lt; 2.5.”

Answer:
1. Soft / aspirational target on synthetic small data  
2. Primary coach KPI is **not missing at-risk** → recall **1.0**  
3. Error ~2.6 points on /20 still useful for early ranking  
4. Real/more data + tuning can push RMSE down later  

---

## 14. Videos

| Topic | Link |
|-------|------|
| ML intro | https://www.youtube.com/watch?v=Gv9_4yMHFhI |
| Bias/variance | https://www.youtube.com/watch?v=EuBBz3bI-aA |
| Random Forest | Search: `StatQuest random forests` |
| Linear regression / R² | Search: `StatQuest r squared` |
| RMSE intuition | Search: `RMSE vs MAE explained` |
| Precision/recall | Search: `StatQuest precision recall` |
| sklearn Pipeline | Search: `ColumnTransformer Pipeline scikit-learn` |

---

## 15. 60-second pitch

“In Phase 2 I predict tonight’s score with a sklearn Pipeline: One-Hot topic plus a Random Forest, compared to a linear baseline. RF reaches RMSE ≈ 2.65 and R² ≈ 0.81, slightly better than the baseline, and at-risk recall = 100% on the test set with zero false negatives. Features exclude leakage columns; solved exercises and previous score dominate importance. The saved pipeline powers the coach risk board and the silent analyzer agent.”

---

## 16. Self-check

1. Why regress then threshold?  
2. What is a baseline for?  
3. RMSE vs recall — which matters more to the coach and why?  
4. Why Pipeline?  
5. Why not `student_id` in X?  
6. Your RF recall and FN count?  

---

## 17. Jury Q quick hits

**Q: Is this Deep Learning?**  
A: Classical tabular ML (RF). Embeddings later are neural; LSTM on OULAD is a possible extension.

**Q: Small dataset?**  
A: 264 rows — PoC limit; strong synthetic signal; next step real data (OULAD).

**Q: Cross-validation?**  
A: Used inside GridSearch on train; final numbers reported on held-out test.
