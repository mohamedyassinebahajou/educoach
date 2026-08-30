# Cahier des Charges - EduCoach AI (Sprint SAS Intensif)

## Projet de Fin de Formation - Systèmes Hybrides ML & Multi-Agents

---

## 1. Contexte du Projet

Ce projet vise à concevoir un assistant intelligent destiné à un coach IT lors d’un **SAS (Stage d’Accélération en SAS)** intensif de 3 à 4 semaines.

**Fonctionnement du SAS :**
- Groupe de **24 apprenants** (débutants en Python et Web Dev).
- **Jour type** : Explication d'un nouveau concept (ex: Boucles, Fonctions, API) le matin → Exercices pratiques l'après-midi → Session d'évaluation **1-to-1** en soirée pour tester le niveau technique de chaque candidat.
- **Problématique** : Le coach ne peut pas être partout à la fois. Les apprenants posent des questions répétitives sur le code, et il est difficile de prédire qui va échouer à l'évaluation du soir avant qu'il ne soit trop tard.

---

## 2. Objectifs du Projet (PoC)

1. **Prédire les performances** : Utiliser un modèle ML pour anticiper la note de l'évaluation du soir (sur 20) dès 14h, afin d'identifier les apprenants "à risque" (note < 10/20).
2. **Assister les apprenants** : Fournir un tuteur virtuel disponible 24/7 pour aider sur les exercices du jour, **sans donner les solutions complètes**.
3. **Réduire les tâches répétitives** : Répondre automatiquement aux questions de syntaxe et de débogage basique.
4. **Scalabilité** : Permettre au coach de gérer efficacement un groupe de 24, en ciblant uniquement les étudiants en difficulté.

---

## 3. Règle de Composition Obligatoire

| Bloc | Contenu | Statut |
|------|---------|--------|
| **Bloc 1 - Modèle ML** | Régression (Random Forest) pour prédire la note sur 20. Classification binaire "At-Risk" (Note < 10). | **OBLIGATOIRE** |
| **Bloc 2 - Multi-Agents & RAG** | 4 agents spécialisés (Orchestrateur, Tutor RAG, Code Reviewer, Performance Predictor). | **OBLIGATOIRE** |
| **Bloc 3 - MLOps** | Docker, suivi MLflow, GitHub CI/CD. | **BONUS** |

---

## 4. Jeu de Données (Synthétique)

Faute d'historique numérique, un dataset synthétique sera généré en Python.

- **Population** : 24 étudiants.
- **Durée** : 20 jours (4 semaines).
- **Fréquence** : 1 enregistrement par étudiant par jour.

**Variables d'entrée (Features) :**
- `student_id`, `day`, `topic` (encodé).
- `exercises_attempted` (1 à 5).
- `exercises_solved_correctly` (0 à 5).
- `hints_used` (Nombre de fois où l'étudiant a demandé de l'aide à l'assistant).
- `time_spent_minutes` (Temps passé sur les exercices).
- `previous_eval_score` (Note de la veille, 0-20).

**Variable cible (Target) :**
- `today_eval_score` (Note sur 20 à l'évaluation du soir).
- `at_risk` (Dérivé : True si score < 10).

---

## 5. Bloc 1 - Modèle Machine Learning

### 5.1 Modèle
**Random Forest Regressor**.
*Justification* : Robuste sur données tabulaires, gère les non-linéarités, interprétable (importance des features), s'exécute sur CPU.

### 5.2 Métriques
- **RMSE** : Objectif < 2.0 points sur 20.
- **Recall de la classe "At-Risk"** : Critère le plus important. Il faut détecter au moins 80% des étudiants qui vont échouer.

### 5.3 Baseline
Régression Linéaire (pour prouver que le Random Forest apporte une plus-value).

---

## 6. Bloc 2 - Architecture Multi-Agents (LangGraph)

Le système utilise **4 agents** collaborant via un orchestrateur.

| Agent | Rôle principal |
|-------|----------------|
| **1. Orchestrateur (Supervisor)** | Reçoit le message de l'utilisateur, gère la mémoire courte (session en cours), route vers l'agent compétent, agrège la réponse. |
| **2. Concept Tutor (RAG)** | Spécialisé dans les concepts du jour. Interroge la base vectorielle (RAG) sur les slides du cours pour expliquer clairement la théorie. |
| **3. Exercise Helper (Code Reviewer)** | Analyse les snippets Python. **Ne donne jamais la solution brute**, seulement des indices (ex: "Regarde ta condition à la ligne 4"). |
| **4. Performance Predictor** | Agent "silencieux". Appelle le modèle ML en arrière-plan. Si l'étudiant est prédit "At-Risk", produit une **alerte coach** (`coach_alert`) — jamais affichée à l'étudiant — pour décider d'un coaching individuel ou d'un rappel collectif sur le topic. |

---

## 7. Pipeline RAG

- **Données** : 20 fichiers PDF/PPT (un par jour de formation).
- **Ingestion** : `LangChain` + `PyPDFLoader`.
- **Chunking** : `RecursiveCharacterTextSplitter` (taille 500, overlap 50).
- **Embeddings** : `sentence-transformers/all-MiniLM-L6-v2` (léger, tourne sur CPU).
- **Vector DB** : `Chroma` (stockage local).
- **Recherche** : Top-K = 3 documents pertinents par requête.

---

## 8. Contraintes Techniques Spécifiques

| Contrainte | Solution |
|------------|----------|
| **Pas de GPU** | Utilisation de modèles quantifiés. |
| **Pas de budget API** | **Ollama** local avec `llama3.2:3b` (excellent pour le code et raisonnable en RAM ~4-5Go). |
| **Pas de données réelles** | Génération synthétique avec `numpy` et `pandas`. |
| **Présentiel** | L'interface sera un Dashboard Coach (Streamlit) + Chatbot intégré. |

**Stack Minimum :**
- Python 3.11
- LangGraph
- Ollama (LLM)
- Chroma (Vector DB)
- Scikit-learn (ML)
- FastAPI
- Streamlit
- Docker

---

## 9. Planning du Développement (15 Jours)

| Jour | Phase | Objectifs |
|------|-------|-----------|
| **J1** | Cadrage | Définir les 20 sujets exacts du SAS. Lister les documents pédagogiques. |
| **J2** | Data | Générer le dataset synthétique (24x20). EDA et visualisation. |
| **J3-J4** | ML | Entraîner Random Forest + Baseline. Sauvegarder le modèle (`joblib`). |
| **J5** | RAG | Ingérer les 20 documents dans la base Chroma. |
| **J6-J7** | Agents | Coder les 4 agents avec LangGraph (graphe d'état). |
| **J8** | Intégration | Connecter l'agent Performance Predictor au modèle ML. |
| **J9** | Sécurité | Implémenter les Guardrails (blocage des solutions, Prompt Injection). |
| **J10** | API | Créer les endpoints FastAPI (`/chat`, `/predict_day`). |
| **J11-J12** | Interface | Streamlit (2 onglets : Dashboard Coach + Chat étudiant). |
| **J13** | Docker | Rédiger `Dockerfile` et `docker-compose.yml` (avec service Ollama). |
| **J14** | Tests | Pytest sur l'API et les agents. |
| **J15** | Finalisation | README, présentation (10-12 slides), vidéo démo. |

---

## 10. Critères de Validation (PoC)

- [ ] Le modèle prédit la note du soir avec un RMSE < 2.5.
- [ ] Le modèle détecte les "At-Risk" avec un Recall > 75%.
- [ ] Les 4 agents communiquent et déléguent les tâches correctement.
- [ ] Le RAG répond uniquement à partir des documents du jour (pas d'hallucination).
- [ ] Le code reviewer donne des indices, jamais la solution brute.
- [ ] L'interface Streamlit affiche un dashboard avec la liste des étudiants triés par risque.

---

## 11. Livrables Attendus

1. **Cahier des charges** (ce document).
2. **Dépôt GitHub** : Code organisé (voir structure arborescente), README détaillé.
3. **Démonstration** : Application lancée via Docker Compose.
4. **Présentation** : 10-12 slides, avec un accent sur la démo de l'intervention "Avant/Après" sur un étudiant en difficulté.