# 🧱 Brick 1 — Product Description (Copie Express) — **VERSION v2 BREVET/BAC**

## 🎯 Le Produit

**Copie Express** est un service d'assistance à la correction pour enseignants français du secondaire (collège + lycée). Le prof scanne ses copies de brevet blanc, bac blanc, ou contrôle au fil de l'année. Le service détecte chaque réponse, chaque méthode de résolution, et remplit le fichier SACoche/Pronote/Excel. Le prof valide 5 copies au hasard en 30 secondes. Il exporte. Terminé.

**Cible principale** : Profs de **mathématiques, physique, SVT, technologie** en collège et lycée.

**Cible secondaire** : Profs de français, histoire, langues (éval à réponse unique).

---

## 💎 Positionnement

**Copie Express ne corrige pas à ta place. Il remplit SACoche à ta place.**

Le prof reste maître. C'est lui qui clique "valider" en dernier. Mais c'est lui qui ne passe plus 3 heures à cliquer 8 100 fois.

---

## 🎯 Promesse chiffrée

| Type d'éval | Copies | Temps actuel | Avec Copie Express |
|-------------|--------|--------------|---------------------|
| Brevet blanc | 90 copies | 3 heures | 30 secondes |
| Bac blanc | 92-180 copies | 4-6 heures | 30 secondes |
| Contrôle de maths au fil de l'année | 30 copies | 1 heure | 30 secondes |
| Éval nationale CP/CE1 | 25 copies | 30 minutes | 15 secondes |

**Gain moyen** : 90% du temps de saisie administrative

---

## 💰 Pricing (3 tiers)

### Tier 1 — Mensuel
- **10€/mois** (sans engagement)
- Copies illimitées
- Pour les profs qui veulent tester sans risque

### Tier 2 — Annuel ⭐ Populaire
- **99€/an** (économies 21€ vs mensuel)
- Tout du tier 1
- Détection multi-méthodes (maths/physique)
- Support prioritaire
- Garantie satisfait ou remboursé 30j

### Tier 3 — Expert Bac/Brevet (V2, septembre 2026)
- **149€/an**
- Tout du tier 2
- Analyse multi-méthodes avancée
- Détection automatique de l'approche mathématique (discriminant, factorisation, racines...)
- Grilles de correction personnalisées
- Support téléphonique dédié
- Accès anticipé 1 mois avant lancement

---

## 🧠 Stack technique

- **Frontend** : Next.js 14, shadcn/ui, Tailwind
- **Backend** : Node.js, Express
- **OCR** : Mistral OCR (précision manuscrite française)
- **Extraction structurée** : LLM (multi-méthodes)
- **Export** : SACoche CSV, Pronote XLS, Excel
- **Auth** : JWT + email magic link
- **DB** : PostgreSQL
- **Paiement** : Stripe (subscriptions)

**Coût marginal par copie** : ~0,024€ (OCR + LLM)
**Coût marginal annuel pour 500 copies** : 12€ → marge 95%

---

## 📊 Métriques de succès

### V1 (MVP, dans 4 semaines)
- 100 profs en beta privée (cibles maths/phys/SVT)
- 30 conversions payantes (taux 30%)
- Panier moyen : 99€

### V2 (dans 6 mois)
- 1 000 profs payants
- 100 conversions Expert (taux 10%)
- ARR : 100 000€

### V3 (dans 12 mois)
- 10 000 profs payants
- ARR : 1M€

---

## 🎯 Différenciateurs vs concurrence

1. **Multi-méthodes** : seul outil qui détecte la méthode de résolution (maths/physique)
2. **Ciblage brevet/bac** : positionnement clair vs "OCR généraliste"
3. **Tarification simple** : 99€/an vs 0,10€/copie (prévisible)
4. **Validation finale prof** : le prof reste maître, le service remplit juste
5. **Saisonnalité alignée** : marketing ciblé sur les pics brevet/bac

---

## ✅ Anti-patterns à éviter

- ❌ Pas de mention "IA" en titre/headline (peur du remplacement)
- ❌ Pas de mention "OCR" / "GPT" / "Mistral" dans le copy public
- ❌ Pas de "boostez vos performances" (langage startup)
- ❌ Pas de "révolutionnaire" / "game-changer"
- ✅ Vocabulaire orienté **prof** : "brevet blanc", "SACoche", "méthode", "corriger"
- ✅ Émotionnel concret : enfants, match, weekend, couple
- ✅ Ciblage explicite : maths/phys/SVT collège/lycée
- ✅ Cœur de métier : "Tu es prof. Pas une machine à cliquer."