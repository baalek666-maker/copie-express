# 🔧 Architecture Technique — Copie Express

**Version** : 2.0 (refonte post-pivot brevet/bac)
**Date** : 30 juillet 2026
**Statut** : Spec V1 — à implémenter

---

## 🎯 Vue d'ensemble en 1 schéma

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                       │
│                                                                  │
│  Landing pages      Dashboard prof       Upload UI               │
│  /index.html        /app/dashboard       /app/upload            │
│  /expert.html       /app/eval/[id]       /app/validate          │
│                            │                  │                   │
└────────────────────────────┼──────────────────┼───────────────────┘
                             │                  │
                  ┌──────────▼──────────────────▼──────────┐
                  │          BACKEND (Express API)          │
                  │                                          │
                  │  /auth        /upload      /extract      │
                  │  /validate    /export      /billing     │
                  │     │            │            │          │
                  └─────┼────────────┼────────────┼──────────┘
                        │            │            │
        ┌───────────────┼────────────┼────────────┼───────────────┐
        │               │            │            │               │
   ┌────▼─────┐   ┌─────▼────┐  ┌────▼────┐  ┌────▼─────┐  ┌─────▼────┐
   │ Supabase │   │Supabase  │  │ Mistral │  │  Mistral │  │  Stripe  │
   │  Auth    │   │ Storage  │  │   OCR   │  │   LLM    │  │ Billing  │
   │ (email)  │   │  (EU)    │  │  (EU)   │  │   (EU)   │  │   (EU)   │
   └──────────┘   └──────────┘  └─────────┘  └──────────┘  └──────────┘
```

---

## 🧩 Stack technique

| Couche | Service | Région | Pourquoi |
|--------|---------|--------|----------|
| **Frontend** | Next.js 14 + shadcn/ui + Tailwind | Vercel EU (CDG Paris) | Rapide à dev, RGPD-friendly |
| **Backend** | Node.js Express | Railway EU | Simple, scalable, EU |
| **Base de données** | Supabase Postgres | Frankfurt EU | Managed, RGPD, free tier 500 users |
| **Auth** | Supabase Auth (magic link email) | EU | Pas de mot de passe à gérer |
| **Storage copies** | Supabase Storage | EU, chiffré AES-256 | Données élèves isolées, RGPD |
| **OCR** | Mistral OCR API | France | Précision manuscrite FR, EU par défaut |
| **LLM extraction** | Mistral Large (V2) ou Mistral Small (V1 budget) | France | Serveurs EU, conforme RGPD |
| **Paiement** | Stripe | EU | DPA fourni, standard SaaS |
| **Email transactionnel** | Resend | EU possible | Magic links, confirmations |
| **Monitoring** | Sentry EU | EU | Errors tracking |
| **Analytics** | Plausible EU | EU | Pas de cookie, RGPD-comply |

### Pourquoi **pas** mon VPS perso

- ❌ Pas de DPA pour les profs
- ❌ Mélange avec d'autres projets (risque de fuite)
- ❌ Pas de redondance / monitoring
- ❌ RGPD borderline (disque non chiffré, pas de logs structurés)
- ✅ **Stack managé** = conformité + scalabilité + 0 maintenance

---

## 📊 Modèle de données (V1)

### Table `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  academy TEXT,                    -- ex: 'Lyon', 'Paris'
  subject TEXT[],                   -- ex: ['maths', 'physique']
  school_level TEXT[],              -- ex: ['college', 'lycee']
  role TEXT DEFAULT 'teacher',
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT,         -- 'active' | 'canceled' | 'past_due'
  subscription_plan TEXT,           -- 'monthly' | 'yearly' | 'expert_yearly'
  subscription_expires_at TIMESTAMPTZ,
  trial_used BOOLEAN DEFAULT FALSE, -- a-t-il déjà testé 10 copies gratuites
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table `evaluations`

```sql
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,                       -- ex: 'Brevet blanc mars 2026'
  type TEXT NOT NULL,                        -- 'brevet_blanc' | 'bac_blanc' | 'controle'
  subject TEXT NOT NULL,                     -- 'maths' | 'physique' | ...
  class_level TEXT NOT NULL,                 -- '3eme' | '1ere' | ...
  total_copies INTEGER NOT NULL,
  grading_scale JSONB NOT NULL,              -- [{question: 'q1', max_points: 2, type: 'qcm'}, ...]
  correct_answers JSONB,                     -- [{q1: 'B', q2: 'Paris', ...}, ...]
  status TEXT DEFAULT 'draft',               -- 'draft' | 'processing' | 'ready_to_validate' | 'validated' | 'exported'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table `copies`

```sql
CREATE TABLE copies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  student_identifier TEXT,                   -- 'eleve_01' (anonymisé)
  photo_storage_path TEXT NOT NULL,          -- chemin Supabase Storage
  ocr_text TEXT,                             -- sortie brute Mistral OCR
  extracted_answers JSONB,                   -- [{q1: 'B', q2: '...'}, ...]
  confidence_score NUMERIC(3,2),             -- 0.00 à 1.00
  validated_by_user BOOLEAN DEFAULT FALSE,
  user_corrections JSONB,                    -- si prof a modifié une extraction
  final_score NUMERIC(4,2),                  -- ex: 14.50 / 20
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);
```

### Table `exports` (audit trail RGPD)

```sql
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  format TEXT NOT NULL,                      -- 'csv_sacoche' | 'csv_pronote' | 'xlsx'
  file_storage_path TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,           -- créé + 30 jours = auto-delete
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row-Level Security (RLS)

Toutes les tables ont RLS activé. Un user ne peut accéder qu'à ses propres evaluations, copies, exports.

---

## 🔄 Flow complet (V1)

### Étape 1 — Inscription (5 sec)

```
1. User arrive sur /app
2. Tape son email
3. Reçoit un magic link par email (Resend)
4. Clique → redirigé vers /app/onboarding
5. Renseigne : nom, académie, matière(s), niveau(x)
6. → Dashboard
```

### Étape 2 — Création évaluation (2 min)

```
1. User clique "Nouvelle évaluation"
2. Form : titre + type + matière + classe + barème
3. Optionnel : grille de bonnes réponses (pour auto-correction QCM)
4. Submit → evaluation créée (status='draft')
```

### Étape 3 — Upload pile (3 min)

```
1. User clique "Ajouter des copies"
2. Drag-and-drop photos OU scan PDF OU zip de photos
3. Chaque photo uploadée sur Supabase Storage (chiffré)
4. Copies créées (status='processing')
```

### Étape 4 — Extraction (2 min pour 90 copies)

```
Pour chaque copie (parallélisé, max 5 simultanés) :
1. POST Mistral OCR API → texte brut
2. POST Mistral Small API avec prompt structuré :
   - Texte OCR
   - Grille de barème
   - Grille de bonnes réponses (si fournie)
   → Renvoie JSON structuré {élève: 'eleve_01', réponses: [...], score: 14/20}
3. Sauvegarde dans `copies`
4. Notification user (websocket ou polling)
```

**Coût marginal** :
- Mistral OCR : ~0,01€/copie
- Mistral Small : ~0,001€/copie (input) + 0,003€/copie (output)
- **Total : ~0,014€/copie**
- Pour 90 copies : ~1,26€

### Étape 5 — Validation (30 sec pour 90 copies)

```
1. UI affiche chaque copie avec ses réponses extraites
2. Prof voit : photo + réponses extraites + score suggéré
3. Il clique "Valider" sur chaque copie (ou bulk "Tout valider")
4. Il peut modifier manuellement une réponse avant de valider
5. Status → 'validated'
```

### Étape 6 — Export (30 sec)

```
1. Prof clique "Exporter"
2. Choix du format : SACoche CSV / Pronote CSV / Excel
3. Backend génère le fichier selon template
4. Upload sur Supabase Storage (chiffré, expires_at = +30j)
5. User télécharge via lien sécurisé
6. Email de confirmation avec lien
```

---

## 📁 Format d'export

### SACoche CSV (college)

```csv
eleve;q1;q2;q3;q4;q5;q6;q7;q8;q9;q10;note
eleve_01;B;A;C;D;B;A;C;D;B;A;14.50
eleve_02;A;B;C;D;A;B;C;D;A;B;16.00
...
```

### Pronote CSV (lycee)

```csv
Nom;Note;Appreciation
eleve_01;14.50;Bon travail global
eleve_02;16.00;Excellent
...
```

---

## 🧠 Prompts LLM (Mistral Small)

### Prompt d'extraction

```python
EXTRACTION_PROMPT = """Tu es un assistant qui extrait les réponses d'une copie d'élève à partir du texte OCR.

Voici le barème de l'évaluation :
{grading_scale}

Voici les bonnes réponses attendues (si QCM ou réponse unique) :
{correct_answers}

Texte OCR de la copie :
\"\"\"
{ocr_text}
\"\"\"

Retourne un JSON strict :
{
  "student_identifier": "eleve_XX" (déduit si visible, sinon null),
  "answers": {
    "q1": "réponse élève ou null si illisible",
    "q2": "...",
    ...
  },
  "method_used": "nom de la méthode si math/phys (optionnel)",
  "confidence": 0.85 (ta confiance globale, 0 à 1)
}

Ne fais aucun commentaire. JSON uniquement."""
```

### Prompt de détection multi-méthodes (V2 Expert)

```python
METHOD_DETECTION_PROMPT = """Pour ce problème de maths/physique, identifie la méthode de résolution utilisée par l'élève parmi :
{allowed_methods}

Réponse élève :
\"\"\"
{answer_text}
\"\"\"

JSON strict : {"method": "...", "is_valid_method": true/false, "comment": "..."}"""
```

---

## 🔐 RGPD & Sécurité

### Mesures V1

| Mesure | Implémentation |
|--------|----------------|
| **Chiffrement at rest** | Supabase Storage : AES-256 natif |
| **Chiffrement in transit** | HTTPS/TLS 1.3 partout (Vercel + Railway + Supabase) |
| **Serveurs EU** | Vercel EU (CDG), Railway EU, Supabase Frankfurt, Mistral FR |
| **DPA sous-traitants** | Supabase, Mistral, Stripe, Resend : tous ont des DPA |
| **Suppression auto** | Cron quotidien : supprime copies + photos > 30 jours |
| **Consentement** | CGU + bandeau explicite avant 1er upload |
| **Droit à l'effacement** | Endpoint `/api/user/delete` → supprime tout en cascade |
| **Logs minimaux** | Pas de log des contenus de copies, juste des metadata |
| **2FA** | Magic link + captcha sur login |
| **Audit trail** | Table `exports` + `audit_logs` pour tracer accès admin |

### À ne PAS faire V1

- ❌ Stocker des données nominatives d'élèves (juste des identifiants anonymes "eleve_01")
- ❌ Faire du profilage d'élèves
- ❌ Partager les copies avec un tiers
- ❌ Utiliser les copies pour entraîner un modèle (sauf opt-in explicite)
- ❌ Héberger hors UE

---

## 💰 Coûts V1 (estimation)

### Free tier (0-100 users)

| Service | Coût |
|---------|------|
| Vercel | 0€ (free tier) |
| Railway | 0€ (free tier, 5$/mois après) |
| Supabase | 0€ (free tier, 25$/mois après) |
| Mistral OCR | 0€ (premières copies gratuites) |
| Mistral Small | 0€ (crédits gratuits) |
| Stripe | 0€ (0% commission sur abonnements) |
| **Total** | **0€/mois** |

### À 100 users actifs

| Service | Coût |
|---------|------|
| Vercel | 0€ |
| Railway | 5€ |
| Supabase | 0€ |
| Mistral OCR | 25€ (~2500 copies/mois) |
| Mistral Small | 10€ |
| Stripe (2,9% + 0,30€/transaction) | ~30€ |
| Resend | 0€ |
| **Total** | **~70€/mois** |
| **Recettes** | 100 × 99€ = 9900€/an |
| **Marge** | **88%** ✅ |

### À 1000 users actifs

| Service | Coût |
|---------|------|
| Vercel | 20€ |
| Railway | 50€ |
| Supabase | 25€ |
| Mistral OCR | 250€ (~25 000 copies/mois) |
| Mistral Small | 100€ |
| Stripe fees | 300€ |
| **Total** | **~745€/mois** |
| **Recettes** | 1000 × 99€ = 99 000€/an |
| **Marge** | **88%** ✅ |

---

## 🗓️ Roadmap V1 (8 semaines)

### Semaine 1-2 : Setup & Auth
- [ ] Setup repo `copie-express-v1` (Next.js + shadcn/ui)
- [ ] Setup Supabase (Postgres + Auth + Storage)
- [ ] Magic link auth
- [ ] Onboarding wizard (académie, matière, niveau)
- [ ] Schema DB + RLS

### Semaine 3-4 : Stripe
- [ ] Stripe products (10€/mois, 99€/an, 149€/an)
- [ ] Checkout flow
- [ ] Webhook → update subscription_status
- [ ] Customer portal
- [ ] Garantie 30j (refund auto)

### Semaine 5-6 : Cœur produit
- [ ] Upload UI (drag-drop photos + PDF)
- [ ] Mistral OCR integration
- [ ] Mistral Small extraction
- [ ] UI validation copies
- [ ] Export CSV SACoche + Pronote

### Semaine 7 : RGPD & Polish
- [ ] Bandeau consentement
- [ ] Cron suppression 30j
- [ ] Page profil + delete account
- [ ] Email confirmations
- [ ] Onboarding vidéo (Loom)

### Semaine 8 : Beta
- [ ] Invitation 20 profs beta
- [ ] Tests utilisateurs
- [ ] Bugfixes critiques
- [ ] **LANCEMENT**

---

## 🚀 Roadmap V2 (Expert, mois 6)

### Features

- [ ] Multi-méthodes (maths/physique)
- [ ] Templates grilles brevet/bac par académie
- [ ] Stats de réussite par méthode
- [ ] Grilles de correction personnalisées
- [ ] Support téléphonique
- [ ] Communauté Slack privée

### Differenciation vs V1

| Feature | V1 Standard | V2 Expert |
|---------|-------------|-----------|
| OCR QCM | ✅ | ✅ |
| OCR réponse unique | ✅ | ✅ |
| OCR réponse manuscrite | Basique | Avancé |
| Détection méthode maths | ❌ | ✅ |
| Stats par méthode | ❌ | ✅ |
| Grilles personnalisées | ❌ | ✅ |
| Support | Email | Téléphone |
| Templates académie | ❌ | ✅ |
| Prix | 99€/an | 149€/an |

---

## 📋 Variables d'environnement (futur `.env`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Mistral
MISTRAL_API_KEY=xxx
MISTRAL_OCR_MODEL=mistral-ocr-latest
MISTRAL_LLM_MODEL=mistral-small-latest

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_MONTHLY=price_xxx
STRIPE_PRICE_YEARLY=price_xxx
STRIPE_PRICE_EXPERT=price_xxx

# Resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@copie-express.fr

# Sentry
SENTRY_DSN=https://xxx@sentry.io/xxx

# App
NEXT_PUBLIC_APP_URL=https://copie-express.fr
NODE_ENV=production
```

---

## ⚠️ Décisions architecturales

| Décision | Choix | Raison |
|----------|-------|--------|
| Pas de VPS perso | ✅ | RGPD, sécurité, scalabilité |
| Pas moi comme LLM | ✅ | Pas d'API stable, RGPD, pas scalable |
| Supabase vs Firebase | Supabase | EU, SQL natif, RGPD-friendly |
| Mistral vs OpenAI | Mistral | EU par défaut, RGPD, prix |
| Stripe vs autre | Stripe | Standard, DPA fourni |
| Next.js vs autre | Next.js | Cohérence LP, écosystème |
| Monorepo vs multi-repo | Multi-repo | LP marketing séparée du code |

---

## 🔗 Repos GitHub

| Repo | Contenu | URL |
|------|---------|-----|
| `copie-express` | LP marketing + VMF + assets | https://github.com/baalek666-maker/copie-express |
| `copie-express-v1` | App Next.js + backend (à créer) | https://github.com/baalek666-maker/copie-express-v1 |

---

**Spec V1 figée. À implémenter après validation du plan.**