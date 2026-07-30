# 🧱 Brick 4 — Mega Context Prompt (Copie Express)

```
You are tasked to help me with different copywriting tasks. Here is the updated context about my product. Read it and wait for the next instruction.

Product description
"""
# 🧱 Brick 1 — Product Description (Copie Express)

## 🎯 Le Produit

Copie Express est un service d'assistance à la correction pour enseignants français. Le prof scanne ses copies (évaluations nationales ou copies classiques), et le système extrait automatiquement les réponses et génère un fichier prêt à importer dans SACoche, Pronote ou Excel.

Promesse principale : récupérer 3 heures par session d'éval nationale et 2 heures par session de copies classiques.

## 💡 Ce que ça fait concrètement

1. Upload : Le prof photographie ou scanne ses copies (PDF, photos JPG/PNG)
2. Extraction automatique : OCR Mistral + LLM détectent les réponses cochées/écrites
3. Validation rapide : Le prof voit un aperçu, corrige en 30 secondes si besoin
4. Export : Téléchargement au format SACoche / Pronote / Excel
5. Gain de temps : 3h de saisie → 30 secondes

## 💰 Tarification

| Offre | Prix | Cible |
|-------|------|-------|
| Découverte | 10€/mois | Prof qui veut tester |
| Standard | 10€/mois | Prof régulier |
| Annuel | 99€/an | Prof engagé (économie de 21€) |
| Essai | 10 copies gratuites | Tout nouveau prof |

## 🎯 Pour qui c'est FAIT

Sophie, 38 ans, prof de français en lycée
- En couple avec enfants
- Salaire : 2000-2400€ net/mois
- Prête à payer pour récupérer ses soirées et weekends
- Décide vite quand convaincue par les pairs

## 🎯 Pour qui c'est PAS FAIT

- Profs qui n'utilisent jamais SACoche/Pronote
- Profs qui font du QCM très complexe
- Profs qui veulent une correction qualitative subjective

## ⚙️ Stack technique

- Frontend : Next.js 14 + Tailwind CSS + Stripe Checkout
- Backend : Node.js + Express + BullMQ
- DB : PostgreSQL
- IA : Mistral OCR + GPT-4o-mini
- Storage : S3-compatible
"""

Consolidated Persona
"""
# 🧱 Brick 2 — Consolidated Persona (Copie Express)

## 👤 Persona Principale : Sophie, 38 ans, prof de français en lycée

Démographie : Femme (75% du corps enseignant français), 35-50 ans, en couple avec 1-2 enfants (6-14 ans), salaire net 2 000-2 400€/mois, 12-18 ans d'ancienneté, zone urbaine ou périurbaine.

Comportements : Corrige ses copies le soir (après 20h) ou le dimanche, passe 6h/semaine à corriger, utilise SACoche ou Pronote quotidiennement, scrolle Instagram et Facebook 15-30 min/jour, suit des comptes de profs (Charivari, Le Café Pédagogique).

Frustrations profondes :
1. "Je passe mes soirées à corriger au lieu de voir mes enfants grandir"
2. "Les évaluations nationales me bouffent 3h de clics pour rien"
3. "Je suis épuisée, je n'ai plus de vie perso"
4. "Mes élèves ne progressent pas même après mes corrections"
5. "On me demande toujours plus, mais sans reconnaissance"

Désirs :
1. Récupérer ses soirées et weekends
2. Retrouver du temps pour sa famille
3. Se sentir reconnue dans son travail
4. Voir ses élèves progresser
5. Avoir une vie équilibrée

Objections :
1. "C'est encore un outil qui va me demander du temps pour apprendre"
2. "Et si ça se trompe dans la détection ?"
3. "Je préfère faire les choses moi-même, c'est mon job"
4. "C'est combien ? J'ai pas le budget."
5. "Mes collègues vont juger si je délègue la correction"

Déclencheurs d'achat :
1. Témoignage d'une autre prof "j'ai récupéré mes weekends"
2. Post FB montrant qu'elle n'est pas seule à galérer
3. Essai gratuit de 10 copies sans engagement
4. 10€/mois = 1 café par jour
5. Promesse d'un gain de temps mesurable

Voice of Customer :
- "J'en peux plus de ces évaluations nationales à la con"
- "Encore 3h de clics pour rentrer des QCM dans SACoche"
- "Je corrige le soir après que les enfants soient couchés"
- "Le weekend c'est copies, pas repos"
- "J'ai plus de vie perso à cause de ce métier"
- "Y'a pas un outil qui fait ça automatiquement ?"
- "Si ça pouvait scanner mes copies et tout remplir, je prends"
- "Mais je veux rester maître de la note finale"
- "10€/mois c'est rien si ça me fait gagner 3h"

## 👤 Persona Secondaire : Marc, 45 ans, prof de maths en collège

Homme, plus technique, moins dans l'émotion, utilise SACoche quotidiennement, a déjà testé des outils numériques (Python pour corriger), préfère le côté "gain de temps" au côté "récupérer ma vie perso", sera convaincu par la démo technique + ROI mathématique, pricing moins sensible.

Voice of Customer : "Combien de temps ça me fait gagner par session ?" / "C'est fiable sur les QCM ?" / "J'intègre avec Pronote facilement ?"
"""

Marketing angles
"""
# 🧱 Brick 3 — Marketing Angles (Copie Express)

## 🎯 Angle 1 — PRÉDÉFINI
"Rends tes soirées à tes enfants"
- Pain : Douleur #1 (vie perso)
- Promesse : "Récupère 3h par session d'éval nationale pour être avec tes enfants au lieu de cliquer"
- Preuve : Témoignages "j'ai pu aller au match de foot de mon fils mardi soir"
- CTA : "Essaie 10 copies gratuites, sans CB"

## 🎯 Angle 2 — PRÉDÉFINI
"Les évaluations nationales en 30 secondes, pas en 3 heures"
- Pain : Douleur #2 (saisie admin)
- Promesse : "Tu scannes tes 90 copies d'éval CM2, je remplis SACoche à ta place"
- Preuve : Démo avant/après en vidéo
- CTA : "Teste sur tes prochaines éval, sans engagement"

## 🎯 Angle 3 — PRÉDÉFINI
"Marre de corriger le weekend ? Garde-le pour toi."
- Pain : Douleur #1 + #3 (récupération weekend)
- Promesse : "Je m'occupe de la saisie, tu profites de ton samedi"
- Preuve : "Pour la première fois en 8 ans, j'ai fait un brunch dimanche"
- CTA : "Essaie ce weekend, sans CB"

## 🎯 Angle 4 — SECONDAIRE (Marc)
"OCR Mistral + LLM : 99% de fiabilité sur les QCM"
- Pain : peur technique
- Promesse : "Test sur 1000 copies réelles : 99.2% de précision sur QCM"
- CTA : "Test sur tes copies"

## 🎯 Angle 5 — SECONDAIRE (objection prix)
"1 café par jour pour récupérer tes soirées"
- Pain : Objection #4 prix
- Promesse : "10€/mois = 0.33€/jour = 1 café"
- Preuve : ROI "12h/an × 0.83€/h < 1 café"
- CTA : "10€/mois, résiliable"

## 🎯 Angle 6 — SECONDAIRE (objection temps)
"Setup en 5 minutes, pas de formation"
- Pain : Objection #1 temps
- Promesse : "Tu uploades, tu valides, c'est fait"
- Preuve : Vidéo 90 sec
- CTA : "Essaie maintenant"

## 🎯 Angle 7 — SECONDAIRE (peur remplacement)
"Tu gardes le contrôle, je remplis juste les cases"
- Pain : Objection #3 peur remplacement
- Promesse : "Tu valides chaque copie en 30 sec, la note finale c'est toi"
- Preuve : Capture interface
- CTA : "Teste sans risque"
"""

General copywriting framework

Use the Voice of Customer language from the persona. Every word must sound like a French teacher talking to another French teacher, NOT a marketer talking to a prospect.

**Framework LBC (Lead-Bridge-Close) :**
1. **Lead (Hook)** : Open with a pain or curiosity that mirrors what the prospect feels or wonders
2. **Bridge (Story/Proof)** : Build trust by sharing a story, testimonial, or data point
3. **Close (CTA)** : Clear, low-friction, specific action

**Rules :**
- Tu/vous : Tutoiement always (rapproche, conversationnel)
- Contractions : "c'est", "t'as", "tu vas" (FR spoken, pas literary)
- Phrases courtes : max 15 mots par phrase
- Paragraphes : max 3 lignes
- Espaces blancs généreux
- 1 CTA par message
- Langage VOC exact, pas de jargon marketing ("innovation", "révolutionnaire", "optimal")

Writing rules

**Conversational French, jamais literary ou corporate.**
- Utilise "tu" partout
- Contractions : c'est, t'as, tu vas, j'ai, etc.
- Phrases courtes (max 15 mots)
- Emojis rares (1 par message max, cohérent)
- JAMAIS de mots anglais (sauf jargon métier accepté : "scoring", "feedback")
- JAMAIS de jargon tech (OCR, LLM, API, etc.)
- JAMAIS de "IA" en titre ou headline (peur du remplacement)
- Langage VOC exact des profs français
```