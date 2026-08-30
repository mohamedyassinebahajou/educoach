# CAHIER DES CHARGES - Projet de Fin de Formation
## Systèmes Hybrides : Machine/Deep Learning & Multi-Agents LLM

---

## 1. Contexte et Objectifs

Ce projet de fin de formation conclut le parcours couvrant le Machine Learning, le Deep Learning, le NLP, les LLM, les agents intelligents, le RAG et les bonnes pratiques MLOps.

**Objectifs pédagogiques :**
- Démontrer la maîtrise de l'ensemble du cycle de vie d'un projet d'IA
- Intégrer un modèle prédictif (ML/DL) avec un système multi-agents LLM
- Concevoir une architecture agentique avancée avec RAG
- Sécuriser les interactions avec des Guardrails
- Déployer une application complète avec les bonnes pratiques MLOps

---

## 2. Règle de Composition Obligatoire

Le projet doit respecter la structure suivante :

| Bloc | Contenu | Statut |
|------|---------|--------|
| **Bloc 1 - Modèle ML/DL** | Machine Learning (classification, régression, clustering, recommandation, séries temporelles) OU Deep Learning (CNN, RNN/LSTM, Transformers, Vision, NLP) | **OBLIGATOIRE** |
| **Bloc 2 - Système Multi-Agents** | Architecture multi-agents (minimum 4 agents) avec RAG et collaboration | **OBLIGATOIRE** |
| **Bloc 3 - MLOps** | Docker, suivi d'expériences (MLflow), tests, CI/CD, monitoring | **BONUS** |

**Les blocs 1 et 2 doivent être intégrés dans un même cas d'usage cohérent, et non juxtaposés artificiellement.**

---

## 3. Choix du Sujet

Le thème est libre mais doit répondre à une problématique réelle avec :
- Des utilisateurs cibles clairement identifiés
- Une valeur métier démontrable
- Un jeu de données documenté (source, taille, caractéristiques)

### Domaines suggérés (non exhaustifs)

| Secteur | Exemple d'application |
|---------|----------------------|
| **Santé** | Diagnostic assisté + recommandation de traitement |
| **Finance** | Prédiction de marché + conseil en investissement |
| **Éducation** | Prédiction de performance + tutorat personnalisé |
| **E-commerce** | Système de recommandation + assistant shopping |
| **Agriculture** | Détection de maladies + conseil agricole |
| **Cybersécurité** | Détection d'anomalies + réponse aux menaces |
| **Juridique** | Classification de documents + recherche légale |
| **RH** | Screening candidats + coaching entretien |
| **Support IT** | Catégorisation de tickets + résolution automatisée |

---

## 4. Exigences Obligatoires

### 4.1 Bloc ML/DL

| Exigence | Description |
|----------|-------------|
| **Problème défini** | Problème clair avec objectif de prédiction |
| **Jeu de données** | Documenté (source, taille, variables) avec EDA |
| **Modèle entraîné** | ML ou DL avec justification du choix |
| **Fine-tuning** | Si utilisation d'un modèle pré-entraîné |
| **Évaluation** | Métriques adaptées (accuracy, F1, RMSE, R², etc.) |
| **Baseline** | Comparaison à un modèle simple |

**Métriques exigées :**
- Classification : Accuracy, Precision, Recall, F1-Score, AUC-ROC
- Régression : RMSE, MAE, R²
- Clustering : Silhouette Score, Davies-Bouldin
- Séries temporelles : MAPE, RMSE

### 4.2 Architecture Multi-Agents

**Le système doit contenir au minimum 4 agents spécialisés**, chacun ayant une responsabilité clairement définie.

| Agent | Responsabilité |
|-------|---------------|
| **Orchestrateur** | Coordination, routage des requêtes, mémoire |
| **RAG Agent** | Recherche documentaire, génération ancrée |
| **ML/DL Agent** | Appel au modèle prédictif, interprétation |
| **Validation Agent** | Guardrails, sécurité, contrôle qualité |
| **Tool Agent** | Exécution d'outils externes (optionnel) |

#### Collaboration entre agents

Le projet doit démontrer :
- Communication entre agents
- Échange d'informations structurées
- Délégation de tâches
- Coordination de l'exécution
- Prise de décision collective

### 4.3 RAG (Retrieval-Augmented Generation)

**Le système doit intégrer un pipeline RAG** comprenant :

| Étape | Description |
|-------|-------------|
| **Ingestion** | Chargement des documents sources |
| **Prétraitement** | Nettoyage et normalisation |
| **Chunking** | Découpage en segments optimisés |
| **Embeddings** | Génération des vecteurs sémantiques |
| **Base vectorielle** | Stockage et indexation |
| **Recherche sémantique** | Retrieval par similarité |
| **Reranking** | Réordonnancement des résultats (recommandé) |
| **Génération** | Réponse ancrée sur les sources |

### 4.4 Mémoire Conversationnelle

**Le système doit intégrer un mécanisme de mémoire :**

| Type | Description |
|------|-------------|
| **Short-Term Memory** | Contexte courant, historique des échanges, session |
| **Long-Term Memory** | (Recommandé) Base de connaissances persistante |

### 4.5 Guardrails

**Le projet doit implémenter des mécanismes de protection :**

| Guardrail | Description |
|-----------|-------------|
| **Validation des entrées** | Vérification des types, formats, limites |
| **Détection prompts malveillants** | Identification des tentatives d'injection |
| **Prévention Prompt Injection** | Nettoyage et validation des prompts |
| **Contrôle des hallucinations** | Vérification des faits, ancrage aux sources |
| **Validation du format de sortie** | Structure, type, contenu attendu |
| **Filtrage des contenus sensibles** | Détection et blocage |

### 4.6 Outils (Tools) ou MCP

**Le système doit utiliser des capacités externes :**

- LangChain / LangGraph Tools
- MCP (Model Context Protocol)
- API REST
- Base SQL
- Recherche Web
- Calculatrice
- Exécution Python
- Services Cloud

### 4.7 Interface Utilisateur

**Développer une interface utilisateur :**

| Option | Recommandation |
|--------|---------------|
| **Streamlit** | Rapide, intégration Python (recommandé) |
| **React / Next.js** | Interface professionnelle |
| **Gradio** | Alternative simple |

### 4.8 API

**Le système doit exposer une API :**
- FastAPI (recommandé)
- Documentation OpenAPI/Swagger
- Endpoints pour : requêtes utilisateur, prédictions ML, gestion de documents, monitoring

### 4.9 Conteneurisation

**Le projet doit être conteneurisé avec Docker :**
- Dockerfile pour chaque service
- Docker Compose pour l'orchestration multi-services

---

## 5. Contraintes Techniques

### 5.1 Technologies Obligatoires

| Technologie | Usage |
|-------------|-------|
| **Python** | Langage principal |
| **LangGraph** | Orchestration des agents |
| **LLM (≥1)** | OpenAI, Anthropic, Mistral, Llama, etc. |
| **Vector DB** | Pinecone, Chroma, FAISS, Qdrant |
| **Docker** | Conteneurisation |

### 5.2 Technologies Recommandées

| Technologie | Usage |
|-------------|-------|
| **MLflow** | Suivi des expériences |
| **FastAPI** | API REST |
| **Streamlit** | Interface utilisateur |
| **Pytest** | Tests unitaires |
| **GitHub Actions** | CI/CD |

### 5.3 Options de LLM

| Option | Avantages | Inconvénients |
|--------|-----------|---------------|
| **OpenAI GPT-4** | Performance, facilité | Coût, dépendance externe |
| **Claude** | Contexte long, sécurité | Coût |
| **Mistral (Open-source)** | Gratuit, local | Nécessite du hardware |
| **Llama 3** | Gratuit, open-source | Nécessite du hardware |

---

## 6. Évaluation

### 6.1 Évaluation du Bloc ML/DL

Le modèle doit être évalué avec des métriques adaptées :

| Type de modèle | Métriques |
|----------------|-----------|
| Classification | Accuracy, Precision, Recall, F1, AUC-ROC |
| Régression | RMSE, MAE, R², MAPE |
| Clustering | Silhouette Score, Davies-Bouldin |
| Deep Learning | Métriques spécifiques + temps d'entraînement |

**Exigence :** Comparaison à une baseline (modèle simple ou règles heuristiques)

### 6.2 Évaluation du Système Multi-Agents

| Critère | Métrique |
|---------|----------|
| **RAG** | Fidélité (Faithfulness), Pertinence du retrieval (Hit Rate, MRR) |
| **Agents** | Taux de réussite des tâches, temps de réponse |
| **Collaboration** | Nombre d'interactions, taux de délégation réussie |

### 6.3 Évaluation Globale

| Critère | Description |
|---------|-------------|
| **Qualité de l'intégration** | Cohérence entre ML et agents |
| **Expérience utilisateur** | Fluidité, pertinence des réponses |
| **Robustesse** | Gestion des erreurs, sécurité |
| **Performance** | Temps de réponse, latence |

---

## 7. Livrables Attendus

### 7.1 Cahier des Charges (Document)

| Section | Contenu |
|---------|---------|
| **Présentation du projet** | Contexte, problématique, utilisateurs cibles |
| **Jeu de données** | Source, taille, variables, EDA |
| **Bloc ML/DL** | Approche, modèle, évaluation, baseline |
| **Bloc Multi-Agents** | Architecture, agents, collaboration, RAG |
| **Stack technique** | Technologies utilisées |
| **Planning** | Calendrier sur 15 jours |
| **Risques** | Difficultés anticipées |

### 7.2 Dépôt GitHub

**Structure attendue :**
project/
├── README.md # Présentation complète du projet
├── requirements.txt # Dépendances Python
├── docker-compose.yml # Orchestration Docker
├── Dockerfile # Conteneurisation
├── .github/workflows/ # CI/CD (optionnel)
│ └── ci.yml
├── data/
│ ├── raw/ # Données brutes
│ ├── processed/ # Données traitées
│ └── external/ # Documents pour RAG
├── notebooks/
│ ├── 01_EDA.ipynb # Exploration
│ ├── 02_Modeling.ipynb # Modélisation ML/DL
│ └── 03_Evaluation.ipynb # Évaluation
├── src/
│ ├── ml/ # Code ML/DL
│ │ ├── model.py
│ │ ├── train.py
│ │ └── predict.py
│ ├── agents/ # Agents LangGraph
│ │ ├── orchestrator.py
│ │ ├── rag_agent.py
│ │ ├── ml_agent.py
│ │ ├── validation_agent.py
│ │ └── tools.py
│ ├── rag/ # Pipeline RAG
│ │ ├── ingestion.py
│ │ ├── embeddings.py
│ │ └── retrieval.py
│ ├── guardrails/ # Sécurité
│ │ ├── input_validation.py
│ │ ├── prompt_injection.py
│ │ └── hallucination.py
│ ├── memory/ # Mémoire
│ │ ├── short_term.py
│ │ └── long_term.py
│ ├── api/ # FastAPI
│ │ ├── routes.py
│ │ └── models.py
│ └── ui/ # Streamlit
│ └── app.py
├── tests/ # Tests unitaires
│ ├── test_ml.py
│ ├── test_agents.py
│ └── test_api.py
├── models/ # Modèles sauvegardés
├── mlruns/ # MLflow (optionnel)
└── vector_db/ # Base vectorielle


### 7.3 Application / Démonstration

- Démo fonctionnelle exécutable (locale ou en ligne)
- Interface utilisateur opérationnelle
- API accessible via Swagger/OpenAPI

### 7.4 Présentation (10-12 slides)

| Slide | Contenu |
|-------|---------|
| 1 | Titre, auteur, contexte |
| 2 | Problématique et objectifs |
| 3 | Jeu de données et EDA |
| 4 | Approche ML/DL (modèle, métriques, baseline) |
| 5 | Architecture multi-agents |
| 6 | Pipeline RAG |
| 7 | Sécurité et Guardrails |
| 8 | Démonstration (captures d'écran / vidéo) |
| 9 | Résultats et évaluation |
| 10 | Difficultés rencontrées |
| 11 | Améliorations possibles |
| 12 | Bilan personnel |

---

## 8. Planning sur 15 Jours

| Jour | Phase | Activités |
|------|-------|-----------|
| **J1-J2** | **Cadrage** | Choix sujet, définition problème, collecte données, EDA |
| **J3-J4** | **ML/DL** | Modélisation, entraînement, évaluation, baseline |
| **J5-J6** | **RAG** | Ingestion, chunking, embeddings, vector DB, retrieval |
| **J7-J8** | **Agents** | Conception architecture, implémentation 4+ agents, LangGraph |
| **J9** | **Mémoire** | Implémentation Short-Term Memory |
| **J10** | **Guardrails** | Validation, sécurité, anti-hallucination |
| **J11** | **Tools/MCP** | Intégration outils externes |
| **J12** | **API** | FastAPI endpoints |
| **J13** | **Interface** | Streamlit/React UI |
| **J14** | **Docker & Tests** | Conteneurisation, tests unitaires |
| **J15** | **Finalisation** | Préparation présentation, README, démonstration |

---

## 9. Critères de Validation

### 9.1 Critères Obligatoires (Éliminatoires)

| Critère | Statut |
|---------|--------|
| Modèle ML ou DL entraîné | ✅ Obligatoire |
| Minimum 4 agents | ✅ Obligatoire |
| Pipeline RAG fonctionnel | ✅ Obligatoire |
| Short-Term Memory | ✅ Obligatoire |
| Guardrails | ✅ Obligatoire |
| API FastAPI | ✅ Obligatoire |
| Interface utilisateur | ✅ Obligatoire |
| Docker | ✅ Obligatoire |

### 9.2 Critères de Qualité

| Critère | Points |
|---------|--------|
| Qualité du code (structure, documentation) | 10% |
| Performance du modèle ML/DL | 15% |
| Robustesse des agents | 15% |
| Qualité du RAG (pertinence) | 15% |
| Sécurité (Guardrails) | 10% |
| Interface utilisateur | 10% |
| Présentation | 10% |
| Innovation / Complexité | 15% |

### 9.3 Bonus (MLOps)

| Bonus | Description |
|-------|-------------|
| MLflow | Suivi des expériences |
| CI/CD | GitHub Actions |
| Tests | Tests unitaires, intégration |
| Monitoring | Suivi des performances |
| Déploiement | Hugging Face Spaces, Render, Cloud |

---

## 10. Exemples de Sujets Validés

### Exemple 1 : Assistant Médical Intelligent

| Bloc | Contenu |
|------|---------|
| **ML/DL** | CNN pour classification d'images médicales (radiographies) |
| **Agents** | Diagnostic, traitement, vérification médicamenteuse, suivi patient |
| **RAG** | Articles médicaux, protocoles cliniques |
| **Guardrails** | Validation des recommandations, filtrage des erreurs |

### Exemple 2 : Conseiller Financier Automatisé

| Bloc | Contenu |
|------|---------|
| **ML/DL** | LSTM pour prédiction de séries temporelles (actions) |
| **Agents** | Analyse marché, prédiction, évaluation risque, conseil |
| **RAG** | Rapports financiers, actualités économiques |
| **Guardrails** | Détection de conseils dangereux, conformité |

### Exemple 3 : Assistant E-commerce

| Bloc | Contenu |
|------|---------|
| **ML/DL** | Système de recommandation (collaborative filtering) |
| **Agents** | Recherche produit, recommandation, comparaison, support |
| **RAG** | Catalogue produits, avis clients |
| **Guardrails** | Filtrage des avis inappropriés |

### Exemple 4 : Assistant Juridique

| Bloc | Contenu |
|------|---------|
| **ML/DL** | Classification de documents juridiques |
| **Agents** | Recherche jurisprudentielle, analyse contrat, rédaction, révision |
| **RAG** | Codes juridiques, jurisprudence |
| **Guardrails** | Validation des citations, détection de biais |

---

## 11. Stack Technique Référence

| Catégorie | Technologies |
|-----------|--------------|
| **Langage** | Python 3.10+ |
| **ML/DL** | scikit-learn, XGBoost, PyTorch, TensorFlow, Hugging Face |
| **LLM** | OpenAI GPT, Claude, Mistral, Llama 3 |
| **Agents** | LangGraph, LangChain, CrewAI |
| **Vector DB** | Pinecone, Chroma, FAISS, Qdrant, Weaviate |
| **API** | FastAPI, Pydantic |
| **Interface** | Streamlit, Gradio, React |
| **MLOps** | MLflow, Docker, GitHub Actions |
| **Tests** | Pytest, unittest |
| **Monitoring** | LangSmith, Weights & Biases |

---

## 12. Conseils de Réussite

### 12.1 À faire

- ✅ Commencer par un MVP simple et itérer
- ✅ Choisir un sujet qui vous passionne
- ✅ Documenter dès le premier jour
- ✅ Tester chaque composant individuellement
- ✅ Utiliser des LLM open-source pour éviter les coûts
- ✅ Préparer la démo en avance

### 12.2 À éviter

- ❌ Vouloir trop en faire (scope trop large)
- ❌ Négliger l'évaluation quantitative
- ❌ Oublier les Guardrails
- ❌ Ne pas conteneuriser (Docker)
- ❌ Sous-estimer le temps d'intégration

---

## 13. Checklist Finale

Avant la soutenance, vérifier :

### Code
- [ ] Code complet et fonctionnel
- [ ] README détaillé
- [ ] requirements.txt
- [ ] Dockerfile / docker-compose

### ML/DL
- [ ] EDA réalisée
- [ ] Modèle entraîné et sauvegardé
- [ ] Métriques calculées
- [ ] Baseline comparée

### Agents
- [ ] 4+ agents implémentés
- [ ] LangGraph orchestration
- [ ] Collaboration fonctionnelle

### RAG
- [ ] Ingestion documentaire
- [ ] Base vectorielle
- [ ] Retrieval fonctionnel
- [ ] Génération ancrée aux sources

### Sécurité
- [ ] Guardrails implémentés
- [ ] Validation entrées
- [ ] Anti-hallucination

### Interface
- [ ] Interface utilisateur
- [ ] API FastAPI
- [ ] Démo fonctionnelle

### Livrables
- [ ] Cahier des charges
- [ ] Dépôt GitHub
- [ ] Présentation 10-12 slides

---
