"use client";
import Link from "next/link";
import { useState } from "react";

const S = { gold:"var(--gold)", black:"var(--black)", charcoal:"var(--charcoal)", panel:"var(--panel)", border:"var(--border)", white:"var(--white)", gray:"var(--gray)", light:"var(--light)" };

const positions = ["QB","RB","WR","TE","OL — Tackle","OL — Guard","OL — Center","DE","DT","LB — ILB","LB — OLB","CB","S — FS","S — SS","K","P","LS"];

export default function SignupPage() {
  const [type, setType] = useState<"athlete"|"team">("athlete");
  const [plan] = useState("free");

  return (
    <div style={{ minHeight:"100vh", background:S.black }}>
      {/* Header */}
      <div style={{ padding:"24px 48px", borderBottom:`1px solid ${S.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ textDecoration:"none" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3 }}>TOP<span style={{ color:S.gold }}>Λ</span>RK</div>
        </Link>
        <span style={{ fontSize:14, color:S.gray }}>Already a member? <Link href="/login" style={{ color:S.gold, textDecoration:"none" }}>Sign In →</Link></span>
      </div>

      <div style={{ maxWidth:640, margin:"0 auto", padding:"64px 24px" }}>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Join TopArk</p>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,6vw,72px)", letterSpacing:1, marginBottom:8 }}>CREATE YOUR <span style={{ color:S.gold }}>ACCOUNT</span></h1>
        <p style={{ fontSize:14, color:S.gray, marginBottom:40, lineHeight:1.7 }}>Start free. Get discovered by teams across 10+ countries.</p>

        {/* Account type toggle */}
        <div style={{ background:S.border, display:"flex", gap:2, marginBottom:40, width:"100%" }}>
          {(["athlete","team"] as const).map(t=>(
            <button key={t} onClick={()=>setType(t)} style={{ flex:1, fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px", border:"none", cursor:"pointer", background:type===t?S.gold:S.charcoal, color:type===t?S.black:S.gray, fontWeight:type===t?700:400, transition:"background 0.2s" }}>
              {t==="athlete"?"🏈 I'm an Athlete":"🏟️ I'm a Team / Coach"}
            </button>
          ))}
        </div>

        {type==="athlete"?(
          <form onSubmit={e=>e.preventDefault()} style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>First Name</label><input required placeholder="Marcus" /></div>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Last Name</label><input required placeholder="Johnson" /></div>
            </div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Email Address</label><input type="email" required placeholder="athlete@email.com" /></div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Password</label><input type="password" required placeholder="Min. 8 characters" /></div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Primary Position</label>
              <select required style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"12px 16px", outline:"none", fontFamily:"inherit" }}>
                <option value="">Select your position</option>
                {positions.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>College / University</label><input placeholder="e.g. Cal Poly Humboldt" /></div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Years of Pro Experience</label>
              <select style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"12px 16px", outline:"none", fontFamily:"inherit" }}>
                <option value="">Select</option>
                {["0 (College / Rookie)","1–2 years","3–5 years","6+ years"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Plan selection */}
            <div style={{ marginTop:8 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:16 }}>Select Your Plan</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:S.border }}>
                {[
                  { id:"free", name:"Free", price:"$0", desc:"Basic profile" },
                  { id:"elite", name:"Elite", price:"$29/mo", desc:"Full access" },
                  { id:"pro", name:"Pro Ark", price:"$79/mo", desc:"White-glove" },
                ].map(p=>(
                  <div key={p.id} style={{ background:plan===p.id?S.gold:S.charcoal, padding:"20px 16px", textAlign:"center", cursor:"pointer", border:plan===p.id?`2px solid ${S.gold}`:"2px solid transparent" }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, color:plan===p.id?S.black:S.white }}>{p.name}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:plan===p.id?S.black:S.gold, marginTop:4 }}>{p.price}</div>
                    <div style={{ fontSize:11, color:plan===p.id?"rgba(0,0,0,0.6)":S.gray, marginTop:4 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <input type="checkbox" required style={{ width:"auto", marginTop:3, accentColor:S.gold }} />
              <label style={{ fontSize:13, color:S.gray, lineHeight:1.6 }}>I agree to TopArk's <span style={{ color:S.gold }}>Terms of Service</span> and <span style={{ color:S.gold }}>Privacy Policy</span>. I confirm I am 18+ years old.</label>
            </div>

            <Link href="/dashboard" style={{ background:S.gold, color:S.black, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"16px 24px", textDecoration:"none", textAlign:"center", display:"block", marginTop:8 }}>
              Create Athlete Profile
            </Link>
          </form>
        ):(
          <form onSubmit={e=>e.preventDefault()} style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Organization / Team Name</label><input required placeholder="Nürnberg Rams" /></div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Country</label>
              <select required style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"12px 16px", outline:"none", fontFamily:"inherit" }}>
                <option value="">Select country</option>
                {["Germany","France","Sweden","Italy","Spain","Austria","Czech Republic","Mexico","Poland","Denmark","Finland","Hungary","Netherlands","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Your Role</label>
              <select required style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"12px 16px", outline:"none", fontFamily:"inherit" }}>
                <option value="">Select role</option>
                {["Head Coach","Offensive Coordinator","Defensive Coordinator","Recruiting Coordinator","General Manager","Team Owner","Scout"].map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>First Name</label><input required placeholder="Lars" /></div>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Last Name</label><input required placeholder="Eriksen" /></div>
            </div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Email Address</label><input type="email" required placeholder="coach@team.com" /></div>
            <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Password</label><input type="password" required placeholder="Min. 8 characters" /></div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <input type="checkbox" required style={{ width:"auto", marginTop:3, accentColor:S.gold }} />
              <label style={{ fontSize:13, color:S.gray, lineHeight:1.6 }}>I agree to TopArk's <span style={{ color:S.gold }}>Terms of Service</span> and <span style={{ color:S.gold }}>Privacy Policy</span>.</label>
            </div>

            <Link href="/team-dashboard" style={{ background:S.gold, color:S.black, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"16px 24px", textDecoration:"none", textAlign:"center", display:"block", marginTop:8 }}>
              Create Team Account
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
