"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useState } from "react";

const S = {
  gold: "var(--gold)", goldDim: "var(--gold-dim)", black: "var(--black)",
  charcoal: "var(--charcoal)", panel: "var(--panel)", border: "var(--border)",
  white: "var(--white)", gray: "var(--gray)", light: "var(--light)",
};

const stats = [
  { num: "108+", label: "Athlete Signings" }, { num: "45+", label: "Partner Teams" },
  { num: "10+", label: "Countries" }, { num: "6", label: "Years Experience" },
  { num: "4", label: "Founding Partners" }, { num: "100%", label: "Athlete-Direct" },
];

const founders = [
  { initials: "NW", name: "Noah Whittle", role: "Founder & CEO", bio: "Former pro RB, 6 years international. Solingen Paladins, Nürnberg Rams (Germany/GFL), Husaria Szczecin (Poland), Tequileros de Jalisco (Mexico).", tags: ["Germany/GFL", "Poland", "Mexico"] },
  { initials: "KB", name: "Kenneth Bradley", role: "Partner & CSO", bio: "LB, 7 years pro across 4 countries. LFA Champion 2024, LFA All-Pro 2023 & 2024. All-time leading tackler at Ithaca College.", tags: ["Germany/GFL", "Denmark", "Finland", "Mexico"] },
  { initials: "RH", name: "Ronnie Hicks", role: "Director of Recruiting", bio: "DB/WR out of Cal Poly Humboldt. Played across 5 countries including France, Germany, Hungary, and Mexico.", tags: ["France", "Germany", "Hungary", "Mexico"] },
  { initials: "ET", name: "Eldridge Thompson", role: "Combine Lead", bio: "LB/Safety out of South Carolina (SEC). Leads TopArk combine operations and scouts underdog talent nationwide.", tags: ["Mexico", "LB/Safety", "Scout"] },
];

const countries = ["Germany","France","Sweden","Italy","Spain","Austria","Czech Republic","Mexico","Poland","Denmark","Finland","Hungary","Netherlands","Switzerland","Belgium"];

const plans = [
  { name: "Free", price: "0", badge: null, featured: false, desc: "Start your international journey and get discovered by teams worldwide.", features: [{ t: "Basic athlete profile", on: true },{ t: "Appear in team search results", on: true },{ t: "Up to 4 messages/month from teams", on: true },{ t: "TopArk news & updates", on: true },{ t: "Interview requests", on: false },{ t: "Direct messaging with teams", on: false },{ t: "Film & highlight uploads", on: false },{ t: "Verified badge", on: false },], cta: "Get Started Free", href: "/signup" },
  { name: "Elite", price: "29", badge: "Most Popular", featured: true, desc: "Full access to communicate, upload film, and get placed on international teams.", features: [{ t: "Full verified athlete profile", on: true },{ t: "Priority placement in search", on: true },{ t: "Unlimited interview requests", on: true },{ t: "Unlimited direct messaging", on: true },{ t: "Film uploads (up to 5)", on: true },{ t: "Verified badge", on: true },{ t: "Combine invitations", on: true },{ t: "Community chat rooms", on: true },], cta: "Go Elite", href: "/signup?plan=elite" },
  { name: "Pro Ark", price: "79", badge: null, featured: false, desc: "White-glove placement with a dedicated advisor, custom outreach, and VIP combine access.", features: [{ t: "Everything in Elite", on: true },{ t: "Unlimited film uploads", on: true },{ t: "Dedicated placement advisor", on: true },{ t: "2 advisor meetings/month", on: true },{ t: "Custom outreach to target teams", on: true },{ t: "Contract review support", on: true },{ t: "VIP combine + coaching", on: true },{ t: "Featured athlete spotlight", on: true },], cta: "Go Pro Ark", href: "/signup?plan=pro" },
];

const testimonials = [
  { quote: "TopArk got me signed in Germany within 3 weeks of creating my profile. No middlemen, no BS. Direct contact with the team.", name: "Marcus Johnson", detail: "Wide Receiver", country: "Nürnberg, Germany" },
  { quote: "As a coach in Denmark, finding American talent used to take months. Now I browse verified athletes and set up video calls the same day.", name: "Lars Eriksen", detail: "Head Coach", country: "Triangle Razorbacks, Denmark" },
  { quote: "I played 4 countries in 2 years all through TopArk. This platform is the real deal for anyone serious about playing internationally.", name: "Deon Williams", detail: "Linebacker", country: "France → Germany → Mexico" },
  { quote: "The Pro Ark advisor emailed 12 teams on my behalf and got me 4 interview calls in one week. Changed my career entirely.", name: "Tyrell Baptiste", detail: "Running Back", country: "Jalisco, Mexico" },
  { quote: "Finally a platform built by players who actually played overseas. They know exactly what teams need and what athletes want.", name: "Chris Nguyen", detail: "Defensive Back", country: "Vienna, Austria" },
  { quote: "We combined with three players from TopArk last season. All three started for us. The quality is unmatched.", name: "Roberto Fuentes", detail: "GM / Recruiter", country: "Mexicas de Mexico City" },
];

const news = [
  { tag: "Combine", title: "2025 TopArk Combine Draws 200+ Athletes in Austin", excerpt: "The largest combine in TopArk history saw athletes from 22 states compete for international placements. Six teams attended in person.", date: "Jun 10, 2025", featured: true },
  { tag: "Signing", title: "Rashad Moore Signs with Solingen Paladins (GFL)", excerpt: "", date: "May 28, 2025", featured: false },
  { tag: "Expansion", title: "TopArk Adds 8 New Partner Teams in Italy & Spain", excerpt: "", date: "May 15, 2025", featured: false },
  { tag: "Community", title: "New Community Chat Rooms Live for Elite & Pro Members", excerpt: "", date: "Apr 22, 2025", featured: false },
  { tag: "Feature", title: "Meet Eldridge Thompson: The Eye Behind TopArk Combines", excerpt: "", date: "Apr 5, 2025", featured: false },
];

export default function Home() {
  const [tab, setTab] = useState<"athlete"|"team">("athlete");
  const [sent, setSent] = useState(false);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 48px 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 80% 50%, rgba(245,196,0,0.07) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:1, height:"200%", background:"linear-gradient(to bottom, transparent, rgba(245,196,0,0.12), transparent)", top:"-50%", right:"28%", transform:"rotate(12deg)" }} />
          <div style={{ position:"absolute", width:1, height:"200%", background:"linear-gradient(to bottom, transparent, rgba(245,196,0,0.07), transparent)", top:"-50%", right:"22%", transform:"rotate(12deg)" }} />
        </div>
        <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:24 }}>// Global American Football Placement Platform</p>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(72px,12vw,150px)", lineHeight:0.92, letterSpacing:2, marginBottom:32, maxWidth:900 }}>
            YOUR GAME.<br /><span style={{ color:S.gold }}>YOUR WORLD.</span>
          </h1>
          <p style={{ fontSize:18, fontWeight:300, color:S.light, maxWidth:520, lineHeight:1.7, marginBottom:48 }}>
            TopArk connects American football athletes directly with professional teams across Europe, Mexico, and beyond. 108+ signings. No agents. No middlemen.
          </p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <Link href="/signup" style={{ background:S.gold, color:S.black, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"16px 36px", textDecoration:"none" }}>Create Your Profile</Link>
            <Link href="/search" style={{ background:"transparent", color:S.white, fontSize:13, fontWeight:500, letterSpacing:2, textTransform:"uppercase", padding:"15px 36px", border:`1px solid ${S.border}`, textDecoration:"none" }}>Browse Athletes</Link>
          </div>
          <div style={{ display:"flex", gap:48, marginTop:64, flexWrap:"wrap" }}>
            {[{n:"108+",l:"Signings"},{n:"45+",l:"Partner Teams"},{n:"10+",l:"Countries"},{n:"6yrs",l:"Experience"}].map(s=>(
              <div key={s.l}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:S.gold, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div style={{ background:S.gold, padding:"16px 0", overflow:"hidden" }}>
        <div className="stats-track" style={{ display:"flex", gap:64, whiteSpace:"nowrap" }}>
          {[...stats,...stats].map((s,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:S.black }}>{s.num}</span>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"rgba(0,0,0,0.6)" }}>{s.label}</span>
              <span style={{ width:1, height:24, background:"rgba(0,0,0,0.2)", display:"inline-block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <section style={{ background:S.charcoal, borderTop:`1px solid ${S.border}`, borderBottom:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Our Mission</p>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5vw,68px)", lineHeight:1, letterSpacing:1, marginBottom:24 }}>BUILT BY PLAYERS,<br /><span style={{ color:S.gold }}>FOR PLAYERS.</span></h2>
            <p style={{ fontSize:16, fontWeight:300, color:S.light, lineHeight:1.8, marginBottom:32 }}>Our founding team has lived the international football experience — the language barriers, the contract confusion, the agent fees. We built TopArk to eliminate all of it. Athletes connect directly with teams. Transparent. Fast. Athlete-first.</p>
            <Link href="/signup" style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 28px", textDecoration:"none" }}>Start Your Journey</Link>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[
              { title:"Direct Access", body:"No agents, no middlemen. Athletes and teams communicate directly through the platform." },
              { title:"Verified Profiles", body:"Every Elite and Pro Ark athlete is verified. Teams know they're getting real talent with real credentials." },
              { title:"Global Network", body:"10+ countries, 45+ partner teams, and growing. Your next opportunity is already on the platform." },
            ].map(c=>(
              <div key={c.title} style={{ background:S.panel, border:`1px solid ${S.border}`, borderLeft:`3px solid ${S.gold}`, padding:"24px 28px" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, marginBottom:8 }}>{c.title}</div>
                <div style={{ fontSize:14, color:S.gray, lineHeight:1.7 }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16, textAlign:"center" }}>Process</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:64, textAlign:"center" }}>HOW <span style={{ color:S.gold }}>IT WORKS</span></h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:S.border }}>
            {[
              { num:"01", icon:"👤", title:"Create Your Profile", body:"Build a verified athlete profile with your measurables, film, college stats, and international availability. Takes 10 minutes." },
              { num:"02", icon:"🔍", title:"Get Discovered", body:"Teams and coaches across 10+ countries browse our athlete database daily. Elite members get priority placement at the top of search results." },
              { num:"03", icon:"✍️", title:"Sign & Play", body:"Communicate directly with teams, schedule video calls, review contract terms, and book your flight. No agents. No cuts. Just football." },
            ].map(s=>(
              <div key={s.num} style={{ background:S.charcoal, padding:"48px 36px", position:"relative", overflow:"hidden" }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:80, color:"rgba(245,196,0,0.08)", lineHeight:1, position:"absolute", top:16, right:24 }}>{s.num}</span>
                <div style={{ fontSize:28, marginBottom:20 }}>{s.icon}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:12 }}>{s.title}</div>
                <div style={{ fontSize:14, color:S.gray, lineHeight:1.7 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section style={{ background:S.black, borderTop:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Leadership</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:16 }}>FOUNDED BY <span style={{ color:S.gold }}>PLAYERS</span></h2>
          <p style={{ fontSize:15, color:S.gray, marginBottom:56, maxWidth:600, lineHeight:1.7 }}>A combined 20+ years of international professional football experience. We didn't just watch the game — we lived it on 4 continents.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, background:S.border }}>
            {founders.map(f=>(
              <div key={f.initials} style={{ background:S.charcoal, padding:"40px 32px", display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ width:64, height:64, background:S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:S.black, letterSpacing:1 }}>{f.initials}</div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:1 }}>{f.name}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:S.gold, marginTop:4 }}>{f.role}</div>
                </div>
                <div style={{ fontSize:13, color:S.light, lineHeight:1.7 }}>{f.bio}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {f.tags.map(t=>(<span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:1, textTransform:"uppercase", padding:"4px 10px", border:`1px solid ${S.border}`, color:S.gray }}>{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section id="teams" style={{ background:S.charcoal, borderTop:`1px solid ${S.border}`, borderBottom:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Global Reach</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:16 }}>PLAY IN <span style={{ color:S.gold }}>10+ COUNTRIES</span></h2>
          <p style={{ fontSize:15, color:S.gray, marginBottom:56 }}>From the GFL in Germany to the LFA in Mexico — our network spans 4 continents and keeps growing.</p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12 }}>
            {countries.map(c=>(<span key={c} style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:"10px 20px", border:`1px solid ${S.border}`, color:S.light }}>{c}</span>))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section style={{ background:S.black, borderTop:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Membership</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:16 }}>CHOOSE YOUR <span style={{ color:S.gold }}>LEVEL</span></h2>
          <p style={{ fontSize:15, color:S.gray, marginBottom:56, maxWidth:560, lineHeight:1.7 }}>Free to start. Upgrade when you're ready to take your international career seriously.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:S.border }}>
            {plans.map(p=>(
              <div key={p.name} style={{ background:p.featured?S.panel:S.charcoal, padding:"44px 36px", display:"flex", flexDirection:"column", borderTop:p.featured?`3px solid ${S.gold}`:"none" }}>
                {p.badge&&<span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", background:S.gold, color:S.black, padding:"4px 12px", display:"inline-block", marginBottom:20, fontWeight:700, width:"fit-content" }}>{p.badge}</span>}
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:2, marginBottom:8 }}>{p.name}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:8 }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:S.gold, lineHeight:1 }}>${p.price}</span>
                  <span style={{ fontSize:13, color:S.gray }}>/month</span>
                </div>
                <div style={{ fontSize:13, color:S.gray, lineHeight:1.6, marginBottom:28, paddingBottom:28, borderBottom:`1px solid ${S.border}` }}>{p.desc}</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:36, flex:1, padding:0 }}>
                  {p.features.map(f=>(<li key={f.t} style={{ fontSize:13, color:f.on?S.light:S.gray, display:"flex", alignItems:"flex-start", gap:10, lineHeight:1.5 }}><span style={{ color:f.on?S.gold:S.border, fontWeight:700, flexShrink:0 }}>{f.on?"✓":"✕"}</span>{f.t}</li>))}
                </ul>
                <Link href={p.href} style={{ background:p.featured?S.gold:"transparent", color:p.featured?S.black:S.white, border:p.featured?"none":`1px solid ${S.border}`, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px", textDecoration:"none", textAlign:"center", display:"block", marginTop:"auto" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section style={{ background:S.charcoal, borderTop:`1px solid ${S.border}`, borderBottom:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, flexWrap:"wrap", gap:16 }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1 }}>LATEST <span style={{ color:S.gold }}>NEWS</span></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:2, background:S.border }}>
            {news.map((n,i)=>(
              <div key={i} style={{ background:S.black, padding:i===0?40:32, display:"flex", flexDirection:"column", gap:14, cursor:"pointer" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:S.gold }}>{n.tag}</span>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:i===0?32:22, letterSpacing:0.5, lineHeight:1.1 }}>{n.title}</div>
                {n.featured&&<div style={{ fontSize:13, color:S.gray, lineHeight:1.7 }}>{n.excerpt}</div>}
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1, marginTop:"auto" }}>{n.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background:S.black, borderTop:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Testimonials</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:16 }}>ATHLETES <span style={{ color:S.gold }}>SPEAK</span></h2>
          <p style={{ fontSize:15, color:S.gray, marginBottom:56 }}>Real athletes. Real placements. Real results.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:S.border }}>
            {testimonials.map((t,i)=>(
              <div key={i} style={{ background:S.charcoal, padding:36, display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, color:S.gold, lineHeight:0.6 }}>"</div>
                <div style={{ fontSize:15, color:S.light, lineHeight:1.7, fontStyle:"italic", flex:1 }}>{t.quote}</div>
                <div style={{ width:32, height:2, background:S.gold }} />
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:1 }}>{t.name}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:S.gold, marginTop:4 }}>{t.detail}</div>
                  <div style={{ fontSize:12, color:S.gray, marginTop:4 }}>{t.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERVIEW REQUEST */}
      <section style={{ background:S.charcoal, borderTop:`1px solid ${S.border}`, padding:"100px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Get Started</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", letterSpacing:1, marginBottom:16 }}>REQUEST AN <span style={{ color:S.gold }}>INTERVIEW</span></h2>
          <p style={{ fontSize:15, color:S.gray, marginBottom:48, maxWidth:560, lineHeight:1.7 }}>Athletes — tell us about yourself. Teams — tell us what you need. We connect you fast.</p>
          <div style={{ display:"flex", gap:2, marginBottom:32, background:S.border, width:"fit-content" }}>
            {(["athlete","team"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:"12px 28px", border:"none", cursor:"pointer", background:tab===t?S.gold:S.charcoal, color:tab===t?S.black:S.gray, fontWeight:tab===t?700:400 }}>
                {t==="athlete"?"I'm an Athlete":"I'm a Team / Coach"}
              </button>
            ))}
          </div>
          {sent?(
            <div style={{ background:S.black, border:`1px solid ${S.border}`, padding:"64px 48px", textAlign:"center", maxWidth:600 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🏈</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:S.gold, letterSpacing:1, marginBottom:12 }}>Request Received!</div>
              <div style={{ fontSize:14, color:S.gray, lineHeight:1.7 }}>Our team reviews every request within 24–48 hours. Get ready to play internationally.</div>
            </div>
          ):(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>
              <div style={{ background:S.black, border:`1px solid ${S.border}`, padding:36 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:1, marginBottom:24, color:S.gold }}>{tab==="athlete"?"Athlete Request":"Team / Coach Request"}</div>
                <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  {tab==="athlete"?(
                    <>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                        <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>First Name</label><input required placeholder="Marcus" /></div>
                        <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Last Name</label><input required placeholder="Johnson" /></div>
                      </div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Email</label><input type="email" required placeholder="athlete@email.com" /></div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Position</label>
                        <select required style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"12px 16px", outline:"none", fontFamily:"inherit" }}>
                          <option value="">Select Position</option>
                          {["QB","RB","WR","TE","OL","DL","LB","CB","S","K/P"].map(p=><option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Message</label><textarea required placeholder="Tell us about your experience, goals, and availability..." /></div>
                    </>
                  ):(
                    <>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Organization</label><input required placeholder="Nürnberg Rams" /></div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Country</label><input required placeholder="Germany" /></div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Email</label><input type="email" required placeholder="coach@team.com" /></div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Positions Needed</label><input required placeholder="RB, WR, LB..." /></div>
                      <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Message</label><textarea required placeholder="What are you looking for in a player?" /></div>
                    </>
                  )}
                  <button type="submit" style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px", border:"none", cursor:"pointer" }}>Submit Request</button>
                </form>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  { title:"Fast Response", body:"Our team reviews every request within 24–48 hours. Serious inquiries get prioritized." },
                  { title:"Direct Connection", body:"We match athletes with teams based on position, experience, and geographic preferences." },
                  { title:"No Agent Fees", body:"TopArk charges teams and athletes directly — zero cuts from your signing bonus or contract." },
                ].map(c=>(
                  <div key={c.title} style={{ background:S.black, border:`1px solid ${S.border}`, borderLeft:`3px solid ${S.gold}`, padding:24 }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:1, marginBottom:8 }}>{c.title}</div>
                    <div style={{ fontSize:13, color:S.gray, lineHeight:1.7 }}>{c.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"120px 48px", borderTop:`1px solid ${S.border}` }}>
        <div style={{ textAlign:"center", maxWidth:800, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,7vw,100px)", lineHeight:0.95, letterSpacing:2, marginBottom:24 }}>READY TO PLAY<br /><span style={{ color:S.gold }}>INTERNATIONALLY?</span></h2>
          <p style={{ fontSize:16, color:S.gray, marginBottom:48, lineHeight:1.7 }}>Join thousands of athletes who took their game global. Create your profile in 10 minutes.</p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/signup" style={{ background:S.gold, color:S.black, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"16px 40px", textDecoration:"none" }}>Create Your Profile</Link>
            <Link href="/combine" style={{ background:"transparent", color:S.white, fontSize:13, fontWeight:500, letterSpacing:2, textTransform:"uppercase", padding:"15px 40px", border:`1px solid ${S.border}`, textDecoration:"none" }}>Register for Combine</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:S.charcoal, borderTop:`1px solid ${S.border}`, padding:"60px 48px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3, marginBottom:16 }}>TOP<span style={{ color:S.gold }}>Λ</span>RK</div>
              <p style={{ fontSize:13, color:S.gray, lineHeight:1.7, maxWidth:280 }}>The global American football placement platform. Direct athlete-to-team connections across 10+ countries.</p>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, color:S.gold, marginTop:16, textTransform:"uppercase" }}>Georgetown / Austin, TX</p>
            </div>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:S.gold, marginBottom:20 }}>Platform</div>
              {[["Athletes","/search"],["Teams","/#teams"],["Combines","/combine"],["Contact","/contact"]].map(([l,h])=>(<div key={l} style={{ marginBottom:12 }}><Link href={h} style={{ fontSize:13, color:S.gray, textDecoration:"none" }}>{l}</Link></div>))}
            </div>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:S.gold, marginBottom:20 }}>Account</div>
              {[["Sign Up","/signup"],["Login","/login"],["Dashboard","/dashboard"],["Membership","/signup?plan=elite"]].map(([l,h])=>(<div key={l} style={{ marginBottom:12 }}><Link href={h} style={{ fontSize:13, color:S.gray, textDecoration:"none" }}>{l}</Link></div>))}
            </div>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:S.gold, marginBottom:20 }}>Connect</div>
              {["Instagram","Twitter / X","LinkedIn","YouTube"].map(l=>(<div key={l} style={{ marginBottom:12 }}><span style={{ fontSize:13, color:S.gray }}>{l}</span></div>))}
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${S.border}`, paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <span style={{ fontSize:12, color:S.gray }}>© 2025 TopArk LLC. All rights reserved.</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1 }}>Built by players. For players.</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:900px){
          .r3{grid-template-columns:1fr 1fr!important;}
          .r4{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:600px){
          section{padding:64px 24px!important;}
          footer>div>div:first-child{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>
    </>
  );
}
