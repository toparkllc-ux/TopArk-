# TopArk

Global American football opportunity platform — Next.js (App Router, TypeScript) + Tailwind CSS v4 + Supabase.

Design reference (original HTML/CSS prototypes and project docs) lives in [`/design-reference`](./design-reference).

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase / Stripe / Anthropic keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Supabase project (`zazvoxhgklujjadscdon`) is already live with the schema in [`/supabase/migrations`](./supabase/migrations) applied — signup, login, and profile editing work end to end once `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. Stripe and the AI chat widget still need real keys.

## Status

**Phase 1 — Foundation**
- [x] Next.js project scaffold matching the TopArk design system (colors, Bebas Neue / Inter / Space Mono)
- [x] Landing page (`/`) converted from `topark-landing.html`, including the AI chat widget wired to a server-side `/api/chat` route (Anthropic API key stays server-only)
- [x] Signup flow (`/signup`) converted from `topark-signup.html` — athlete/team account type, info form, Terms & Conditions scroll-gate, success step — wired to Supabase Auth
- [x] Login (`/login`) / logout, session-aware proxy (`src/proxy.ts`) protecting `/dashboard` and `/team-dashboard`
- [x] Stripe subscription checkout scaffold (`/api/checkout`, `/api/webhooks/stripe`) for Elite ($14.99/mo) and Pro Ark ($49.99/mo)

**Phase 2 — Core Platform**
- [x] Supabase schema: `profiles`, `athlete_profiles`, `team_profiles`, auto-provisioned on signup, RLS on every table
- [x] Athlete profile creation and editing (`/dashboard/profile`) — real read/write, live completeness %
- [x] Verification workflow — athletes submit for review (`unverified` → `pending`); admin approval UI is Phase 4
- [x] Team profile creation and editing (`/team-dashboard/teamprofile`)
- [x] Athlete dashboard (`/dashboard`) converted from `topark-dashboard.html` — overview, membership (live Stripe checkout + tier), profile, world clock (live), messages/calendar/community are visual conversions with sample data (real-time backend is Phase 3)
- [x] Team dashboard (`/team-dashboard`) converted from `topark-team-dashboard.html` — overview, **Find Athletes is a real DB-backed search/filter** (position, verified, film available), roster/messages/calendar/interviews are visual conversions with sample data
- [x] Public athlete profile pages (`/athletes/[id]`), reading from a `athlete_directory` view that excludes email and Stripe IDs from public/team access

**Phase 3 — Communication** (not started): real-time messaging, interview requests, working calendar persistence, notifications.

**Phase 4 — Community & Admin** (not started): community chat rooms wired to real messages, admin panel (`topark-admin.html`), verification review queue.

## Environment variables

See `.env.local.example`. Supabase is live; Stripe (`STRIPE_SECRET_KEY`, price IDs, webhook secret) and `ANTHROPIC_API_KEY` still need to be filled in — until then `/api/checkout` and `/api/chat` return a friendly 503 instead of erroring.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Auth/Postgres, RLS) · Stripe · Anthropic API (AI chat widget)
