# 🔧 Comment ÉvalBot marche techniquement

## 🎯 Le principe en 1 schéma

```
📄 SCAN DE COPIE (PDF ou photo)
         ↓
   🔍 OCR (Mistral / Google Vision)
         ↓
   📝 TEXTE BRUT extra de la copie
         ↓
   🧠 LLM (GPT-4o / Claude) reçoit :
         - Le texte OCR
         - Le barème de l'évaluation
         - La grille de bonnes réponses
         ↓
   📊 RÉPONSES STRUCTURÉES extraites :
         {
           "élève": "Durand Marie",
           "réponses": [
             {"q1": "B", "q2": "A", "q3": "C", ...}
           ],
           "score": 14/20
         }
         ↓
   📥 EXPORT au format du logiciel cible (SACoche, Pronote...)
```

---

## 🔍 Étape 1 : OCR (extraction du texte)

### C'est quoi l'OCR ?

**OCR = Optical Character Recognition** = transformer une image en texte.

**Exemple :**
- Tu prends une photo de copie → l'OCR te sort le texte de chaque réponse

### Outils OCR

**Option A — Mistral OCR (RECOMMANDÉ)**
- **Prix** : 1 000 pages = 1$ (~0.001€/page)
- **Avantage** : excellent sur l'écriture manuscrite française
- **API** : très simple, similaire à GPT
- **Lien** : https://docs.mistral.ai/capabilities/document_ai/

**Option B — Google Cloud Vision**
- **Prix** : 1.50$/1000 images
- **Avantage** : très précis sur caractères imprimés
- **API** : complexe à setup

**Option C — Tesseract (gratuit, open-source)**
- **Prix** : 0€
- **Inconvénient** : moins bon sur manuscrit
- **À éviter** pour des copies d'élèves

### Comment l'OCR fonctionne (Mistral)

```python
from mistralai import Mistral

client = Mistral(api_key="ta_clé")

# Upload du PDF
uploaded = client.files.upload(
    file={
        "file_name": "copie_eleve.pdf",
        "content": open("copie.pdf", "rb").read(),
    },
    purpose="ocr"
)

# OCR
response = client.ocr.process(
    model="mistral-ocr-latest",
    document={
        "type": "file",
        "file_id": uploaded.id,
    }
)

# Récupère le texte
texte_copie = response.pages[0].markdown
```

**Output** : un texte structuré avec les réponses de l'élève.

---

## 🧠 Étape 2 : LLM (extraction structurée)

### C'est quoi un LLM ?

**LLM = Large Language Model** = une IA qui comprend le texte (GPT-4, Claude, Mistral Large).

Ici on l'utilise pour **structurer** le texte OCR en données exploitables.

### Prompt envoyé au LLM

```python
prompt = f"""
Voici la copie scannée d'un élève pour une évaluation nationale de français niveau 6ème.

Le barème est :
- Question 1 : bonne réponse = "B"
- Question 2 : bonne réponse = "A"  
- Question 3 : bonne réponse = "C"
- Question 4 : bonne réponse = "Vrai"
- Question 5 : bonne réponse = "Faux"
- Question 6 : réponse libre (à lire)

Voici le texte extrait par OCR de la copie :
\"\"\"
{texte_copie}
\"\"\"

Tâche : renvoie-moi un JSON avec :
- le nom de l'élève (si visible)
- la réponse cochée/écrite pour chaque question
- le score total (bonnes réponses cochées)
- un score de confiance (0-100%) sur ta détection

Format JSON strict.
"""
```

### Output du LLM

```json
{
  "élève": "Durand Marie",
  "réponses": [
    {"q": 1, "réponse": "B", "correcte": true},
    {"q": 2, "réponse": "A", "correcte": true},
    {"q": 3, "réponse": "C", "correcte": true},
    {"q": 4, "réponse": "Vrai", "correcte": true},
    {"q": 5, "réponse": "Faux", "correcte": false},
    {"q": 6, "réponse": "Le protagoniste s'appelle...", "à_corriger": true}
  ],
  "score": 14,
  "score_total": 20,
  "confiance": 92
}
```

### Si la confiance est basse

Si `confiance < 95%`, on **flag** la copie pour **vérification humaine**. Le prof voit :
> "⚠️ Copie 23 — Confiance OCR 78% — Vérifie la question 6"

---

## 📥 Étape 3 : Export dans le logiciel du prof

### Les formats cibles

**SACoche** (le plus courant)
- Format : CSV avec colonnes `eleve_id, exercice_id, item_id, score`
- Import : Upload CSV dans SACoche

**Pronote**
- Format : CSV spécifique avec `eleve_id, evaluation_id, note`
- Import : Upload dans Pronote > Notes

**LSU** (Livret Scolaire Unique)
- Format : XML
- Import : API LSU ou saisie manuelle

**Excel générique**
- Format : XLSX basique
- Le prof fait le copier-coller lui-même

### Génération du CSV

```python
import csv

def generer_csv_sacoche(resultats, fichier):
    with open(fichier, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['eleve_id', 'exercice_id', 'item_id', 'score'])
        for r in resultats:
            for q in r['réponses']:
                writer.writerow([r['élève'], 'eval_nationale_6eme', q['q'], q['correcte']])
```

---

## 🏗 Architecture complète (résumé)

```
┌─────────────────────────────────────────────────┐
│  FRONTEND (Next.js)                              │
│  - Upload PDF/photos                             │
│  - Visualisation des résultats                   │
│  - Paiement Stripe                               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  BACKEND (Node.js + BullMQ)                      │
│  - Reçoit les fichiers                           │
│  - Les met en file d'attente                     │
│  - Orchestre le traitement                       │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌─────────────────┐
│  MISTRAL OCR │  │  GPT-4o-mini    │
│  → texte brut│  │  → JSON structuré│
└──────────────┘  └─────────────────┘
        │                 │
        └────────┬────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│  POSTGRESQL                                     │
│  - Stockage users, copies, paiements            │
│  - Historique des scans                         │
└─────────────────────────────────────────────────┘
```

---

## 💡 Astuce technique : validation humaine

**Tu ne peux pas garantir 100% de précision.** Il faut un **fallback humain**.

**Stratégie :**
1. L'IA traite la copie
2. Si confiance > 95% → **auto-validé**
3. Si confiance < 95% → **mis de côté pour vérification prof**

**UX :**
- Le prof voit "✅ 78 copies validées automatiquement"
- Et "⚠️ 12 copies à vérifier"
- Le prof clique sur les 12 et corrige en 2 min

---

## ⏱ Temps de traitement

| Étape | Temps/copie |
|-------|-------------|
| Upload serveur | 2 sec |
| OCR Mistral | 3-5 sec |
| LLM extraction | 2-3 sec |
| Génération CSV | <1 sec |
| **Total** | **~10 sec/copie** |

Pour 90 copies = **15 minutes** au lieu de 3h.

---

## 💰 Récap des coûts techniques

| Composant | Coût/copie |
|-----------|-----------|
| Mistral OCR | 0.001€ |
| GPT-4o-mini | 0.020€ |
| Stockage S3 (1 copie = 2 MB) | 0.001€ |
| Serverless compute | 0.002€ |
| **Total** | **0.024€** |

**Marge par copie vendue 1€ = 97.6%**
