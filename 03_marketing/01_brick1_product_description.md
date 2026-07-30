# 🧱 Brick 1 — Product Description (Copie Express)

## 🎯 Le Produit

**Copie Express** est un service d'assistance à la correction pour enseignants français. Le prof scanne ses copies (évaluations nationales ou copies classiques), et le système extrait automatiquement les réponses et génère un fichier prêt à importer dans SACoche, Pronote ou Excel.

**Promesse principale** : récupérer **3 heures par session d'éval nationale** et **2 heures par session de copies classiques**.

---

## 💡 Ce que ça fait concrètement

1. **Upload** : Le prof photographie ou scanne ses copies (PDF, photos JPG/PNG)
2. **Extraction automatique** : OCR Mistral + LLM détectent les réponses cochées/écrites
3. **Validation rapide** : Le prof voit un aperçu, corrige en 30 secondes si besoin
4. **Export** : Téléchargement au format SACoche / Pronote / Excel
5. **Gain de temps** : 3h de saisie → 30 secondes

---

## 💰 Tarification (mise à jour 30/07/2026)

| Offre | Prix | Cible |
|-------|------|-------|
| **Découverte** | 10€/mois | Prof qui veut tester |
| **Standard** | 10€/mois | Prof régulier |
| **Annuel** | 99€/an | Prof engagé (économie de 21€) |
| **Essai** | 10 copies gratuites | Tout nouveau prof |

---

## 🎯 Pour qui c'est FAIT

**Sophie, 38 ans, prof de français en lycée**
- En couple avec enfants
- Salaire : 2000-2400€ net/mois
- Prête à payer pour récupérer ses soirées et weekends
- Décide vite quand convaincue par les pairs

---

## 🎯 Pour qui c'est PAS FAIT

- ❌ Profs qui n'utilisent jamais SACoche/Pronote (rare)
- ❌ Profs qui font du QCM très complexe (maths spé, etc.)
- ❌ Profs qui veulent une correction qualitative subjective (commentaire littéraire détaillé)

---

## ⚙️ Stack technique

- **Frontend** : Next.js 14 + Tailwind CSS + Stripe Checkout
- **Backend** : Node.js + Express + BullMQ (file d'attente)
- **DB** : PostgreSQL
- **IA** : Mistral OCR + GPT-4o-mini
- **Storage** : S3-compatible

**Coût technique par copie** : ~0.024€ (marge 97.6% à 1€/copie, marge 99.76% à 10€/mois pour 50 copies)

---

## 🚀 Statut

- ✅ Concept validé
- ✅ Pricing validé (10€/mois)
- ✅ Avatar identifié (Sophie 38 ans)
- ⏳ MVP à coder (Semaine 2)
- ⏳ Landing page à faire (Semaine 3)
- ⏳ Lancement beta (Semaine 4)

---

## 📊 Projections financières (mises à jour 30/07/2026)

| Horizon | Clients | CA | Marge (97%) |
|---------|---------|----|----|
| **Année 1** | 50 profs × 10€/mois | 6 000€/an | 5 820€/an |
| **Année 2** | 200 profs × 10€/mois | 24 000€/an | 23 280€/an |
| **Année 3** | 500 profs × 10€/mois | 60 000€/an | 58 200€/an |

---

## 🛡 Conformité

- RGPD : accord de confidentialité prof + suppression des copies après 30 jours
- Positionnement : "assistant de saisie" (le prof reste décisionnaire final)
- Pas de certification Éducation Nationale requise (service B2B)
