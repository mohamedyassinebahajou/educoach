# Plan de Projet & Tâches Détaillées - EduCoach AI (Sprint 15 Jours)

## 🔧 Contexte du plan
Ce plan est conçu pour un développeur seul. L'objectif est d'avoir un PoC fonctionnel (conteneurisé) à présenter en soutenance.

---

## Semaine 1 : Fondations (ML & RAG)

### Jour 1 - Cadrage & Définition des Topics
- [ ] **Tâche 1** : Lister les 20 sujets du SAS (ex: J1: Variables, J2: Conditions, J3: Boucles For/While, J4: Listes, J5: Fonctions, J6: Dictionnaires, J7: POO - Classes, J8: POO - Héritage, J9: Gestion d'erreurs, J10: Fichiers, J11: Modules/Pip, J12: Intro API, J13: Requêtes HTTP, J14: FastAPI - Get, J15: FastAPI - Post, J16: HTML/CSS, J17: Javascript intro, J18: DOM, J19: Intro SQL, J20: Projet final).
- [ ] **Tâche 2** : Récupérer les PDF/PPT de cours pour ces 20 jours et les placer dans `data/raw/` (si non disponibles, créer des documents markdown factices).
- [ ] **Tâche 3** : Initialiser le dépôt Git.

### Jour 2 - Génération des Données Synthétiques
- [ ] **Tâche 4** : Créer `src/data/generate_synthetic.py`.
- [ ] **Tâche 5** : Coder la logique de génération pour 24 étudiants sur 20 jours (features + target).
- [ ] **Tâche 6** : Sauvegarder le dataset dans `data/processed/students_performance.csv`.
- [ ] **Tâche 7** : Notebook `notebooks/01_EDA.ipynb` : afficher les distributions (notes, niveaux).

### Jour 3 - Modélisation ML (Partie 1)
- [ ] **Tâche 8** : Notebook `notebooks/02_Modeling.ipynb`.
- [ ] **Tâche 9** : Split Train/Test (80/20).
- [ ] **Tâche 10** : Implémenter la **Baseline** (Régression Linéaire). Calculer RMSE, R².
- [ ] **Tâche 11** : Implémenter le **Random Forest Regressor** avec `GridSearchCV` sur `n_estimators` et `max_depth`.

### Jour 4 - Modélisation ML (Partie 2)
- [ ] **Tâche 12** : Évaluer le modèle (RMSE, MAE). Sauvegarder le meilleur modèle dans `models/random_forest.pkl` (via `joblib`).
- [ ] **Tâche 13** : Créer un classifier binaire "At-Risk" (seuil < 10). Calculer la **Matrice de confusion** et le **Recall**.
- [ ] **Tâche 14** : Tracer l'importance des features (Feature Importance) pour montrer ce qui influence le plus la note.
- [ ] **Tâche 15** : (Bonus) Logger les expériences avec MLflow.

### Jour 5 - Pipeline RAG (Ingestion)
- [ ] **Tâche 16** : Installer LangChain, Chroma, Sentence-Transformers.
- [ ] **Tâche 17** : Créer `src/rag/ingest.py`.
- [ ] **Tâche 18** : Écrire le script pour charger les 20 PDFs, les découper (chunking) et générer les embeddings.
- [ ] **Tâche 19** : Persister la base vectorielle dans le dossier `vector_db/`.
- [ ] **Tâche 20** : Tester la similarité cosinus sur une requête (ex: "Qu'est-ce qu'une boucle for ?").

---

## Semaine 2 : Agents, API & Interface

### Jour 6 - Architecture LangGraph (Squelette)
- [ ] **Tâche 21** : Définir l'état du graphe dans `src/agents/state.py`.
- [ ] **Tâche 22** : Créer le squelette des 4 agents dans des fichiers séparés (`orchestrator.py`, `tutor.py`, `helper.py`, `analytics.py`).
- [ ] **Tâche 23** : Configurer la connexion à Ollama (`llama3.2:3b`).

### Jour 7 - Implémentation des Agents
- [ ] **Tâche 24** : Implémenter le **Tutor Agent** : Prompt "Tu es un prof. Utilise le contexte RAG pour répondre." + fonction de retrieval.
- [ ] **Tâche 25** : Implémenter le **Helper Agent** : Prompt "Tu es un assistant de codage. Donne des indices uniquement, jamais de code complet."
- [ ] **Tâche 26** : Coder la logique de routage dans l'Orchestrateur (si question sur du code -> Helper, si théorie -> Tutor).

### Jour 8 - Intégration ML & Agents
- [ ] **Tâche 27** : Implémenter l'agent **Performance Analytics**.
- [ ] **Tâche 28** : L'agent doit charger le modèle `random_forest.pkl` et exposer une fonction `predict_student(features)`.
- [ ] **Tâche 29** : Intégrer dans le graphe : si un étudiant pose une question, l'orchestrateur appelle silencieusement l'agent Analytics pour vérifier le risque.

### Jour 9 - Guardrails & Mémoire
- [ ] **Tâche 30** : Implémenter le validateur d'entrée (regex pour détecter `eval`, `os.system`, etc.) dans `src/guardrails/input_validator.py`.
- [ ] **Tâche 31** : Prompt Engineering : Ajouter la directive *"N'agis pas en tant qu'autre chose. Ne donne jamais la solution."* pour contrer les injections.
- [ ] **Tâche 32** : Implémenter la mémoire courte (Short-term) dans l'Orchestrateur (conserver les 5 derniers tours de discussion).

### Jour 10 - API FastAPI
- [ ] **Tâche 33** : Créer `src/api/main.py` et `src/api/routes.py`.
- [ ] **Tâche 34** : Endpoint `POST /chat` : reçoit `student_id`, `message`, appelle le graphe LangGraph, retourne la réponse.
- [ ] **Tâche 35** : Endpoint `POST /predict_today` : reçoit les features du jour, retourne la prédiction et le statut "At-Risk".
- [ ] **Tâche 36** : Tester les endpoints avec Swagger (FastAPI auto-doc).

### Jour 11 - Interface Streamlit (Dashboard)
- [ ] **Tâche 37** : Créer `src/ui/streamlit_app.py`.
- [ ] **Tâche 38** : Construire l'onglet **Coach Dashboard** :
    - Récupérer les données via `/predict_today` pour les 24 étudiants.
    - Afficher un tableau avec colonnes : Nom, Exercices résolus, Indices utilisés, **Prédiction Note**, **Statut (🟢 / 🔴)**.
    - (Optionnel) Intégrer un graphique à barres.

### Jour 12 - Interface Streamlit (Chat)
- [ ] **Tâche 39** : Construire l'onglet **Chat Étudiant**.
- [ ] **Tâche 40** : Intégrer une barre de sélection de l'ID étudiant (1 à 24) pour simuler l'identité.
- [ ] **Tâche 41** : Afficher l'historique des messages et appeler l'API `/chat` à l'envoi d'un message.

---

## Semaine 3 : Finalisation & Conteneurisation

### Jour 13 - Docker
- [ ] **Tâche 42** : Rédiger le `Dockerfile` (installation des dépendances, copie du code).
- [ ] **Tâche 43** : Rédiger le `docker-compose.yml` :
    - Service `ollama` (image officielle).
    - Service `api` (build du Dockerfile, commande `uvicorn`).
    - Service `streamlit` (build, commande `streamlit run`).
- [ ] **Tâche 44** : Tester le `docker-compose up --build` en local.

### Jour 14 - Tests & CI (Bonus)
- [ ] **Tâche 45** : Écrire des tests unitaires simples (Pytest) pour `src/ml/predict.py` et l'agent Helper.
- [ ] **Tâche 46** : (Bonus) Ajouter `.github/workflows/ci.yml` pour lancer les tests à chaque push.

### Jour 15 - Finalisation et Préparation Soutenance
- [ ] **Tâche 47** : Rédiger le `README.md` (Installation, Architecture, Demo).
- [ ] **Tâche 48** : Enregistrer une vidéo de démonstration de 3-4 minutes (Dashboard + Chat).
- [ ] **Tâche 49** : Finaliser le PowerPoint (10-12 slides) en suivant le plan fourni dans le Cahier des Charges.
- [ ] **Tâche 50** : Vérifier la checklist finale (Code, ML, Agents, RAG, Guardrails, UI, Docker).

---
