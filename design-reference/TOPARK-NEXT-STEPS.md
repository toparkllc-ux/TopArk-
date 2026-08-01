# TopArk — What's Next Roadmap

## Where We Are Right Now

We built the full **visual experience** of TopArk — every screen a player, coach, or founder would see. Think of it like a model home: it looks perfect when you walk through, but the plumbing and electricity aren't connected yet.

### What's Real Right Now:
- ✅ Landing page (public website)
- ✅ Athlete dashboard (player experience)
- ✅ Team/coach dashboard (coach experience)
- ✅ Admin panel (founders only)
- ✅ Sign-up flow with Terms & Conditions
- ✅ AI chat (actually works — talks to Claude API live)
- ✅ Brand, design system, and content locked in
- ✅ Project brief (development spec for Claude Code)

### What's NOT Real Yet:
- ⬜ Nobody can actually create an account (forms don't save)
- ⬜ Messages don't send between real people
- ⬜ Payments don't process (Stripe not connected)
- ⬜ Profiles aren't stored in a database
- ⬜ Verification system doesn't actually verify anyone
- ⬜ Calendar doesn't save real appointments
- ⬜ Admin panel shows example data, not real data

---

## The 10 Things You Need to Build

### 1. Database (Where Your Data Lives)
**What it does:** Stores every athlete profile, team account, message, and payment permanently. Without it, info disappears when someone closes the page.
**What to use:** Supabase (free to start)
**Cost:** $0–25/month

### 2. User Authentication (Login System)
**What it does:** Lets people create accounts, log in, and see THEIR dashboard. Controls who sees what — athletes see athlete dashboard, coaches see team dashboard, founders see admin panel.
**What to use:** Supabase Auth (built into Supabase, free)
**Cost:** $0

### 3. Payment Processing (Getting Paid)
**What it does:** When an athlete clicks "Join Elite — $14.99/mo," real money moves from their card to your bank. Handles recurring monthly billing, cancellations, upgrades, and failed payments automatically.
**What to use:** Stripe (free to set up)
**Cost:** 2.9% + $0.30 per transaction (on $14.99, Stripe keeps ~$0.73, you get ~$14.26)

### 4. Real-Time Messaging
**What it does:** Athlete types a message, hits send, coach sees it instantly — like texting. Also enforces message limits (free tier = 1 per week).
**What to use:** Supabase Realtime or Pusher
**Cost:** $0–25/month

### 5. File Storage (Film Uploads)
**What it does:** Athletes upload highlight film, photos, and documents. Files live on the internet so teams can watch them anytime.
**What to use:** Supabase Storage (1GB free)
**Cost:** $0–25/month

### 6. Domain (Your Web Address)
**What it does:** Changes your URL from `topark.netlify.app` to `toparkfootball.com` — professional, memorable, brandable.
**What to use:** Namecheap or GoDaddy
**Cost:** ~$12/year

### 7. Email System (Automated Notifications)
**What it does:** Sends welcome emails when someone signs up, notification emails when a team messages them, alerts when payments fail. All automated — you never send these manually.
**What to use:** Resend or Mailgun
**Cost:** $0–20/month (free tier covers first few thousand emails)

### 8. Analytics (Know Your Numbers)
**What it does:** Tells you how many people visit the site, how many sign up, how many convert to paid, which pages people spend time on. This data drives every business decision.
**What to use:** Google Analytics (free) or Plausible ($9/mo)
**Cost:** $0–9/month

### 9. SEO (Getting Found on Google)
**What it does:** When someone searches "play football in Europe" or "international football opportunities," TopArk shows up in results. This is technical setup built into the code.
**What to use:** Built into Next.js when Claude Code converts the prototypes
**Cost:** $0

### 10. Mobile Responsiveness
**What it does:** Makes the full app feel smooth on phones — touch-friendly buttons, fast loading, native feel. Our prototypes already work on mobile, but the real app needs to be optimized.
**What to use:** Built into the code automatically
**Cost:** $0

---

## The Build Order

### THIS WEEK — Setup
1. Buy your domain (toparkfootball.com or similar)
2. Deploy prototypes to Netlify — get a live URL to share
3. Create a Stripe account (free) at stripe.com
4. Create a Supabase account (free) at supabase.com

### PHASE 1 — Foundation (Claude Code)
5. Convert prototypes to a real Next.js app
6. Build login/registration with Supabase Auth
7. Connect Stripe for membership payments (Free, Elite $14.99, Pro Ark $49.99)
8. Build athlete profile system with database

### PHASE 2 — Core Features (Claude Code)
9. Build real messaging system with limits
10. Build team/coach search and browse athletes
11. Build verification workflow
12. Build interview request system

### PHASE 3 — Advanced (Claude Code)
13. Build calendar with real scheduling
14. Build community chat rooms (paid tiers only)
15. Build notification/email system
16. Build admin panel with real data

### PHASE 4 — Launch
17. Deploy to Vercel
18. Connect your domain
19. Set up Google Analytics
20. YOU'RE LIVE

---

## Monthly Costs Once Live

| Item | Cost |
|------|------|
| Domain | ~$1/month ($12/year) |
| Hosting (Vercel) | $0–20/month |
| Database (Supabase) | $0–25/month |
| Stripe | 2.9% per transaction |
| Email (Resend) | $0–20/month |
| Claude subscription | $20–100/month |
| **Total** | **Under $100/month** |

---

## Revenue Model

### Stream 1 — Memberships
- Free: $0 (up to 4 messages/month, limited features)
- Elite: $14.99/month or $119.99/year
- Pro Ark: $49.99/month or $399.99/year

### Stream 2 — Combine Registration Fees
- Standard registration per athlete per event
- Early bird and VIP pricing tiers

### Revenue Math (Example at Scale)
- 500 Elite members: $7,495/month
- 100 Pro Ark members: $4,999/month
- 6 combines/year at ~$4,000 each: $24,000/year
- **Annual revenue potential: $174,000+**

---

## Files We Built

| File | What It Is |
|------|------------|
| topark-landing.html | Public website / marketing page |
| topark-signup.html | Registration + Terms & Conditions gate |
| topark-dashboard.html | Athlete member dashboard |
| topark-team-dashboard.html | Team/coach dashboard |
| topark-admin.html | Founders-only admin panel |
| TOPARK-PROJECT-BRIEF.md | Full development spec for Claude Code |

---

## The TopArk Team

- **Noah Whittle** — Founder & CEO
- **Kenneth Bradley** — Director of Strategy
- **Ronnie Hicks** — Executive Director of Recruiting
- **Eldridge Thompson** — Scout & Events Executive Coordinator

---

*Last updated: July 2026*
*Next step: Deploy to Netlify + set up Stripe and Supabase accounts*
