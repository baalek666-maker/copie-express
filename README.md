# 📚 Copie Express

> **Vos corrigés en 30 secondes.** Service d'assistance à la correction pour enseignants français.

## 🎯 Concept

Copie Express assiste les enseignants français dans la **saisie des évaluations nationales** (SACoche, Pronote, LSU) et la **pré-correction** de copies.

- 📸 Le prof scanne ou photographie ses copies
- 🤖 On extrait les réponses automatiquement (OCR + LLM)
- ✅ Le prof valide en 30 secondes
- 📊 Il exporte au format SACoche / Pronote / Excel

**Promesse** : récupérer **3h par session d'éval nationale** + **2h par session de copies classiques**.

---

## 💰 Offre

| Format | Prix |
|--------|------|
| À la copie | 1€ / copie |
| Pack 100 copies | 79€ (-20%) |
| Année illimitée (500 copies max) | 199€ |
| Essai | 10 copies gratuites |

**Pain point adressé** : la **saisie administrative** des évaluations nationales = 3h de clics répétitifs que les profs détestent.

---

## 🎯 Avatar client

**Sophie, 38 ans, prof de français en lycée**
- En couple, enfants, salaire 2000-2400€ net
- Prête à payer pour **récupérer ses soirées et weekends**
- Décide vite, convaincue par les pairs

---

## 📂 Contenu du repo

- [docs/PLAN_BUSINESS.md](./docs/PLAN_BUSINESS.md) — Plan d'action business complet (concept, pricing, projections, plan 30 jours, stratégie de lancement)
- [docs/ARCHITECTURE_TECHNIQUE.md](./docs/ARCHITECTURE_TECHNIQUE.md) — Architecture technique (OCR Mistral + LLM, formats SACoche/Pronote, stack)

---

## 🛠 Stack envisagée

- **Frontend** : Next.js 14 + Tailwind + Stripe Checkout
- **Backend** : Node.js + Express + BullMQ
- **DB** : PostgreSQL
- **IA** : Mistral OCR + GPT-4o-mini (ou Claude Haiku)
- **Storage** : S3-compatible

**Coût technique par copie** : ~0.024€ (marge 97.6% à 1€/copie)

---

## 📊 Projections financières

| Horizon | Clients | Copies/an | CA | Marge |
|---------|---------|-----------|----|----|
| Année 1 (conservateur) | 50 | 3 000 | 3 000€ | 2 850€ |
| Année 2 (optimiste) | 200 | 12 000 | 12 000€ | 11 400€ |
| Année 3 (ambitieux) | 500 | 40 000 | 40 000€ | 38 000€ |

---

## 🚀 Plan 30 jours

1. **Semaine 1** : Valider le besoin sur 5 groupes FB (10 posts)
2. **Semaine 2** : MVP technique (OCR + extraction LLM)
3. **Semaine 3** : Landing page + Stripe
4. **Semaine 4** : Beta gratuit avec 10 profs, témoignages

---

## 🎯 Stratégie de lancement (zéro budget pub)

- **Groupes Facebook profs** (50k+ membres)
- **Instagram** (reel viral "POV : tu dois saisir 90 copies à la main")
- **Bouche-à-oreille** (1 prof content = 3 collègues)
- **SEO long terme** ("assistant correction copies", "remplir SACoche automatiquement")

---

## 🔗 Concurrence identifiée

**Marché US** (saturé) :
- EssayGrader.ai — 100 000+ profs users
- CoGrader — "Save 80% of grading time"
- Gradescope (Turnitin) — gros volumes

**Marché FR** : aucun concurrent direct identifié.

---

## 📜 Légal

- **RGPD** : nécessité d'un accord de confidentialité prof + suppression des copies après livraison
- **Positionnement** : "assistant de saisie" (le prof reste décisionnaire final de la note)
- **Pas de certification Éducation Nationale requise** (service B2B entre prof et prestataire)

---

## 🧑‍💻 Statut projet

🚧 **En construction** — MVP prévu semaine 2
