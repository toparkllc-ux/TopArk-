# TopArk — Project Brief for Development

## What Is TopArk?
TopArk is a global American football opportunity platform that connects athletes with professional teams internationally. It is NOT a traditional agency — athletes communicate directly with teams and coaches. Think of it as the modern, verified, real-time replacement for europlayers.com.

Based in Georgetown / Austin, Texas.
Brand colors: Yellow (#F5C400) and Black (#0A0A0A).
Logo concept inspired by Noah's Ark.

---

## Leadership

**Noah Whittle — Founder & CEO**
- Former pro running back, 6 years international experience
- Teams: Solingen Paladins & Nürnberg Rams (Germany/GFL), Husaria Szczecin (Poland), Tequileros de Jalisco, Jefes de Ciudad Juárez (camp), Mexicas de Mexico City (Mexico)
- Originally from New York, based in Georgetown/Austin TX

**Kenneth Bradley — Director of Strategy**
- Linebacker, 7 years pro across 4 countries
- College: Ithaca College — all-time leading tackler
- Teams: Nürnberg Rams (Germany/GFL), Triangle Razorbacks (Denmark), Porvoon Butchers (Finland), Tequileros de Jalisco, Jefes de Ciudad Juárez, Caudillos de Chihuahua (LFA Mexico)
- LFA all-time leading tackler, single-season tackle record, LFA Champion 2024, LFA All-Pro 2023 & 2024
- From New Jersey

**Ronnie Hicks — Executive Director of Recruiting**
- DB/WR out of Cal Poly Humboldt, played across 5 countries
- Teams: Grenoble Centaures (France), Stuttgart Scorpions (Germany), Hildesheim Invaders (Germany), Nürnberg Rams (Germany/GFL), Fehérvár Enthroners (Hungary), Tijuana Galgos (Mexico)
- From San Diego CA

**Eldridge Thompson — Scout & Events Executive Coordinator**
- LB/Safety out of South Carolina (SEC), Coffeyville CC (JUCO)
- Teams: Tequileros de Jalisco, Jefes de Ciudad Juárez (Mexico)
- From Memphis TN
- Leads TopArk combine operations and scouts underdog talent at schools

---

## Key Metrics
- 108+ player signings
- 45+ partner teams
- 10+ countries reached
- Countries: Germany, France, Sweden, Italy, Spain, Austria, Czech Republic, Mexico, Poland, Denmark

---

## Membership Tiers

### Free ($0)
- Basic athlete profile
- Appear in team search results
- Up to 4 messages/month from teams (enforced as 1 per week — landing page says "up to 4/month", dashboard enforces weekly)
- Access to TopArk news & updates
- NO interview requests
- NO direct messaging
- NO community chat
- NO verified badge

### Elite ($29/month)
- Full verified athlete profile
- Priority placement in team search
- Unlimited interview requests
- Unlimited direct messaging with coaches & teams
- Film & highlight reel uploads (up to 5)
- Verified badge on profile
- Exclusive combine invitations
- Monthly placement report
- Community chat rooms access
- Full calendar & scheduling

### Pro Ark ($79/month)
- Everything in Elite
- Unlimited film uploads
- Dedicated TopArk placement advisor
- 2 advisor meetings per month
- Custom outreach to target teams
- Contract review support
- VIP combine access + coaching
- Early access to new leagues & markets
- Featured athlete spotlight (social media)
- Community chat rooms (all rooms)

---

## Existing Prototype Files

Two HTML prototype files are included in this project folder:

1. **topark-landing.html** — The public-facing landing page / marketing site
   - Hero section with "Your Game. Your World." tagline
   - Scrolling stats ticker (108+ signings, 45+ teams, 10+ countries)
   - Mission section
   - Founders section (4 cards with bios and team tags)
   - How It Works (3-step process)
   - Global reach / countries section
   - Membership plans (Free, Elite, Pro Ark)
   - News section (5 articles)
   - Testimonials section (6 cards — athletes and a coach)
   - Interview request forms (athlete tab + team/coach tab)
   - CTA section
   - AI chat widget (bottom-right, uses Claude API)
   - TopArk logo embedded as base64

2. **topark-dashboard.html** — The member dashboard (post-login experience)
   - Sidebar navigation with logo and plan indicator
   - Dashboard overview (stats, upcoming schedule, recent messages)
   - Messages page with inbox from teams
   - Calendar with monthly view and appointment list
   - Community chat rooms (general, position-specific, regional)
   - Athlete profile editor with completeness score
   - Membership management page with plan comparison
   - Schedule appointment modal
   - AI chat widget (bottom-right, uses Claude API)

**IMPORTANT: Use these files as the design reference. Match the visual style, colors, typography, and layout exactly. Do NOT redesign from scratch.**

---

## Design System

- **Primary color:** #F5C400 (Gold/Yellow)
- **Primary dim:** #C49A00
- **Background:** #0A0A0A (Black)
- **Secondary bg:** #141414 (Charcoal)
- **Panel:** #1A1A1A
- **Border:** #2A2A2A
- **Text:** #FFFFFF (White), #CCCCCC (Light), #888888 (Gray)
- **Success:** #22c55e (Green)
- **Error:** #ef4444 (Red)
- **Display font:** Bebas Neue
- **Body font:** Inter (weights: 300, 400, 500, 600, 700)
- **Mono font:** Space Mono

---

## Tech Stack (Recommended)

- **Frontend:** Next.js + React + Tailwind CSS
- **Backend:** Next.js API routes or Node.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (email + password, OAuth)
- **Payments:** Stripe (subscriptions for Elite and Pro Ark)
- **Real-time messaging:** Supabase Realtime or Pusher
- **File storage:** Supabase Storage (for film uploads)
- **AI chat:** Claude API (claude-sonnet-4-6)
- **Deployment:** Vercel
- **Domain:** To be connected (toparkfootball.com or similar)

---

## Features to Build (Priority Order)

### Phase 1 — Foundation
- [ ] Next.js project setup matching prototype design
- [ ] Landing page (convert topark-landing.html to React components)
- [ ] User registration (athlete vs team/coach account types)
- [ ] Login / logout
- [ ] Email verification
- [ ] Stripe integration for Elite and Pro Ark subscriptions

### Phase 2 — Core Platform
- [ ] Athlete profile creation and editing
- [ ] Profile verification system
- [ ] Team/coach profile creation
- [ ] Search & filter athlete directory (by position, country, measurables)
- [ ] Public athlete profile pages teams can view
- [ ] Dashboard (convert topark-dashboard.html to React components)

### Phase 3 — Communication
- [ ] Real-time messaging between athletes and teams
- [ ] Message limits for free tier (1/week, marketed as "up to 4/month")
- [ ] Interview request system (athlete-to-team and team-to-athlete)
- [ ] Calendar with scheduling
- [ ] Notification system

### Phase 4 — Community & Growth
- [ ] Community chat rooms (paid tiers only)
- [ ] Rooms by topic: general, position-specific, regional
- [ ] News/blog section (editable)
- [ ] Combine event registration
- [ ] AI chat widget on all pages

---

## AI Chat System Prompt

The AI chat widget on every page uses the Claude API. The system prompt should include all leadership info, membership details, and platform features listed above. The AI should:
- Be energetic, confident, and direct
- Speak like someone who played the game
- Keep responses under 3 sentences when possible
- Guide users toward creating profiles, picking memberships, or requesting interviews
- NEVER reveal the 1-per-week enforcement to free users — always say "up to 4 messages/month"
- NEVER make up facts not in this brief

---

## Notes
- Mobile-first responsive design
- The logo is embedded as base64 in the prototype files — extract and use as a proper image asset
- All forms are currently non-functional in prototypes — they need real backend connections
- The prototypes use vanilla HTML/CSS/JS — convert to React components with Tailwind
- Match the exact visual style of the prototypes
