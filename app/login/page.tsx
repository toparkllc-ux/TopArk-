"use client";
import Link from "next/link";
import { useState } from "react";

const S = { gold:"var(--gold)", black:"var(--black)", charcoal:"var(--charcoal)", panel:"var(--panel)", border:"var(--border)", white:"var(--white)", gray:"var(--gray)", light:"var(--light)" };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", background:S.black }}>
      {/* Left panel */}
      <div style={{ background:S.gold, display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:1, height:"200%", background:"rgba(0,0,0,0.1)", top:"-50%", left:"40%", transform:"rotate(15deg)" }} />
          <div style={{ position:"absolute", width:1, height:"200%", background:"rgba(0,0,0,0.07)", top:"-50%", left:"35%", transform:"rotate(15deg)" }} />
        </div>
        <Link href="/" style={{ textDecoration:"none", display:"inline-block", marginBottom:48 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:3, color:S.black }}>TOP<span style={{ color:"rgba(0,0,0,0.4)" }}>Λ</span>RK</div>
        </Link>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(60px,6vw,88px)", lineHeight:0.92, color:S.black, letterSpacing:2, marginBottom:24 }}>WELCOME<br />BACK.</h1>
        <p style={{ fontSize:16, color:"rgba(0,0,0,0.65)", lineHeight:1.7, maxWidth:360, marginBottom:48 }}>
          Your next international opportunity is waiting. Log in to check your messages, manage your schedule, and stay connected with teams worldwide.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[{ n:"108+", l:"Athlete Signings" },{ n:"45+", l:"Partner Teams" },{ n:"10+", l:"Countries" }].map(s=>(
            <div key={s.l} style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:S.black, minWidth:64 }}>{s.n}</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"rgba(0,0,0,0.55)" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 64px" }}>
        <div style={{ maxWidth:400, width:"100%" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:S.gold, marginBottom:16 }}>Member Access</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, letterSpacing:1, marginBottom:8 }}>SIGN IN</h2>
          <p style={{ fontSize:14, color:S.gray, marginBottom:40 }}>Don't have an account? <Link href="/signup" style={{ color:S.gold, textDecoration:"none" }}>Create one free →</Link></p>

          <form onSubmit={e=>{e.preventDefault();}} style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div>
              <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Email Address</label>
              <input type="email" required placeholder="athlete@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Password</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
              <div style={{ marginTop:8, textAlign:"right" }}>
                <span style={{ fontSize:12, color:S.gold, cursor:"pointer" }}>Forgot password?</span>
              </div>
            </div>
            <Link href="/dashboard" style={{ background:S.gold, color:S.black, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"16px 24px", textDecoration:"none", textAlign:"center", display:"block", marginTop:8 }}>
              Sign In
            </Link>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ flex:1, height:1, background:S.border }} />
              <span style={{ fontSize:12, color:S.gray }}>or</span>
              <div style={{ flex:1, height:1, background:S.border }} />
            </div>
            <Link href="/team-dashboard" style={{ background:"transparent", color:S.white, fontSize:13, fontWeight:500, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px", border:`1px solid ${S.border}`, textDecoration:"none", textAlign:"center", display:"block" }}>
              Sign In as Team / Coach
            </Link>
          </form>

          <p style={{ fontSize:12, color:S.gray, marginTop:32, lineHeight:1.7 }}>
            By signing in you agree to TopArk's <span style={{ color:S.gold, cursor:"pointer" }}>Terms of Service</span> and <span style={{ color:S.gold, cursor:"pointer" }}>Privacy Policy</span>.
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}
          div[style*="padding: 80px 64px"]{padding:48px 24px!important;}
          div[style*="padding:80px 64px"]:first-child{min-height:40vh;}
        }
      `}</style>
    </div>
  );
}
