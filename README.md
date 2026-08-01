# TopArk

Global American football opportunity platform — Next.js (App Router, TypeScript) + Tailwind CSS v4.

Design reference (original HTML/CSS prototypes and project docs) lives in [`/design-reference`](./design-reference).

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase / Stripe / Anthropic keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

**Phase 1 — Foundation**
- [x] Next.js project scaffold matching the TopArk design system (colors, Bebas Neue / Inter / Space Mono)
- [x] Landing page (`/`) converted from `topark-landing.html`, including the AI chat widget wired to a server-side `/api/chat` route (Anthropic API key stays server-only)
- [x] Signup flow (`/signup`) converted from `topark-signup.html` — athlete/team account type, info form, Terms & Conditions scroll-gate, success step — wired to Supabase Auth
- [x] Stripe subscription checkout scaffold (`/api/checkout`, `/api/webhooks/stripe`) for Elite ($14.99/mo) and Pro Ark ($49.99/mo)
- [ ] Login / logout pages
- [ ] Email verification flow

**Phase 2 — Core Platform** (not started): athlete/team profiles, verification, search & directory, dashboard conversion (`topark-dashboard.html`, `topark-team-dashboard.html`).

**Phase 3 — Communication** (not started): real-time messaging, interview requests, calendar.

**Phase 4 — Community & Admin** (not started): community chat rooms, admin panel (`topark-admin.html`).

## Environment variables

See `.env.local.example`. Nothing will actually persist or charge cards until real Supabase and Stripe keys are set — until then, the signup form advances through the UI without calling Supabase, and `/api/checkout` returns a 503.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Auth/DB, planned Storage & Realtime) · Stripe · Anthropic API (AI chat widget)
