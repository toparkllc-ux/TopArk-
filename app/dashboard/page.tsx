"use client";
import Link from "next/link";
import { useState } from "react";

const S = { gold:"var(--gold)", black:"var(--black)", charcoal:"var(--charcoal)", panel:"var(--panel)", border:"var(--border)", white:"var(--white)", gray:"var(--gray)", light:"var(--light)" };

const nav = [
  { id:"overview", icon:"📊", label:"Overview" },
  { id:"messages", icon:"💬", label:"Messages" },
  { id:"schedule", icon:"📅", label:"Schedule" },
  { id:"community", icon:"🌍", label:"Community" },
  { id:"profile", icon:"👤", label:"My Profile" },
  { id:"membership", icon:"⭐", label:"Membership" },
];

const messages = [
  { from:"Nürnberg Rams", country:"Germany 🇩🇪", preview:"We've reviewed your profile and would love to schedule a video call...", time:"2h ago", unread:true },
  { from:"Solingen Paladins", country:"Germany 🇩🇪", preview:"Your highlight reel is impressive. We have 2 import slots available for next season...", time:"Yesterday", unread:true },
  { from:"Grenoble Centaures", country:"France 🇫🇷", preview:"Thank you for your interest. We're looking for a WR with your profile...", time:"2 days ago", unread:false },
  { from:"Triangle Razorbacks", country:"Denmark 🇩🇰", preview:"Hi Marcus, we'd like to invite you to our virtual combine on July 15th...", time:"3 days ago", unread:false },
  { from:"TopArk Team", country:"Austin, TX 🇺🇸", preview:"Your profile has been verified! You now have priority placement in team searches.", time:"1 week ago", unread:false },
];

const appointments = [
  { title:"Video Call — Nürnberg Rams", date:"Jun 28, 2025", time:"2:00 PM EST", type:"interview" },
  { title:"Video Call — Solingen Paladins", date:"Jun 30, 2025", time:"11:00 AM EST", type:"interview" },
  { title:"Advisor Meeting — TopArk Pro", date:"Jul 2, 2025", time:"3:00 PM EST", type:"advisor" },
];

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const calDays = Array.from({length:35},(_,i)=>({ day: i<3?null:i-2, hasEvent:[3,7,14,21,28].includes(i-2) }));

export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:S.black }}>
      {/* Sidebar */}
      <div style={{ width:260, background:S.charcoal, borderRight:`1px solid ${S.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"28px 24px", borderBottom:`1px solid ${S.border}` }}>
          <Link href="/" style={{ textDecoration:"none" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:3 }}>TOP<span style={{ color:S.gold }}>Λ</span>RK</div>
          </Link>
          <div style={{ marginTop:16, display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ width:40, height:40, background:S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:S.black }}>MJ</div>
            <div>
              <div style={{ fontSize:14, fontWeight:600 }}>Marcus Johnson</div>
              <div style={{ fontSize:11, color:S.gold, fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>⭐ ELITE MEMBER</div>
            </div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"16px 0" }}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setActive(n.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 24px", border:"none", cursor:"pointer", background:active===n.id?"rgba(245,196,0,0.1)":"transparent", color:active===n.id?S.gold:S.light, borderLeft:active===n.id?`3px solid ${S.gold}`:"3px solid transparent", textAlign:"left", fontSize:14, fontWeight:active===n.id?600:400, transition:"all 0.2s" }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding:"16px 24px", borderTop:`1px solid ${S.border}` }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Profile Complete</div>
          <div style={{ background:S.border, height:4, borderRadius:2, overflow:"hidden" }}>
            <div style={{ width:"78%", height:"100%", background:S.gold }} />
          </div>
          <div style={{ fontSize:11, color:S.gold, marginTop:6, fontWeight:600 }}>78% Complete</div>
        </div>
        <Link href="/login" style={{ padding:"16px 24px", borderTop:`1px solid ${S.border}`, fontSize:13, color:S.gray, textDecoration:"none", display:"block" }}>← Sign Out</Link>
      </div>

      {/* Main */}
      <div style={{ flex:1, overflow:"auto" }}>
        <div style={{ padding:"32px 40px", borderBottom:`1px solid ${S.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:1 }}>
              {nav.find(n=>n.id===active)?.label}
            </h1>
            <p style={{ fontSize:13, color:S.gray, marginTop:4 }}>Wednesday, June 25, 2025</p>
          </div>
          <button onClick={()=>setShowModal(true)} style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 24px", border:"none", cursor:"pointer" }}>
            + Schedule Call
          </button>
        </div>

        <div style={{ padding:"40px" }}>
          {/* OVERVIEW */}
          {active==="overview"&&(
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
                {[
                  { label:"Profile Views", value:"247", change:"+18 this week", up:true },
                  { label:"Interview Requests", value:"3", change:"2 pending reply", up:true },
                  { label:"Messages", value:"12", change:"2 unread", up:false },
                  { label:"Countries Viewing", value:"5", change:"Germany, France, Denmark +2", up:true },
                ].map(s=>(
                  <div key={s.label} style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:"24px 20px" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:12 }}>{s.label}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, color:S.gold, lineHeight:1, marginBottom:8 }}>{s.value}</div>
                    <div style={{ fontSize:11, color:s.up?"#22c55e":S.gray }}>{s.change}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, marginBottom:20, color:S.gold }}>Upcoming Schedule</div>
                  {appointments.map((a,i)=>(
                    <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"12px 0", borderBottom:i<appointments.length-1?`1px solid ${S.border}`:"none" }}>
                      <div style={{ width:40, height:40, background:a.type==="interview"?S.gold:S.panel, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                        {a.type==="interview"?"🎥":"👤"}
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{a.title}</div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1 }}>{a.date} · {a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, marginBottom:20, color:S.gold }}>Recent Messages</div>
                  {messages.slice(0,3).map((m,i)=>(
                    <div key={i} onClick={()=>setActive("messages")} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:i<2?`1px solid ${S.border}`:"none", cursor:"pointer" }}>
                      <div style={{ width:36, height:36, background:m.unread?S.gold:S.panel, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, color:m.unread?S.black:S.gray, flexShrink:0 }}>
                        {m.from.split(" ").map(w=>w[0]).join("").slice(0,2)}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                          <span style={{ fontSize:13, fontWeight:m.unread?600:400 }}>{m.from}</span>
                          <span style={{ fontSize:10, color:S.gray, fontFamily:"'Space Mono',monospace" }}>{m.time}</span>
                        </div>
                        <div style={{ fontSize:12, color:S.gray, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.preview}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {active==="messages"&&(
            <div style={{ background:S.charcoal, border:`1px solid ${S.border}` }}>
              {messages.map((m,i)=>(
                <div key={i} style={{ display:"flex", gap:16, padding:"20px 24px", borderBottom:i<messages.length-1?`1px solid ${S.border}`:"none", cursor:"pointer", background:m.unread?"rgba(245,196,0,0.03)":"transparent" }}>
                  {m.unread&&<div style={{ width:6, height:6, background:S.gold, borderRadius:"50%", marginTop:8, flexShrink:0 }} />}
                  {!m.unread&&<div style={{ width:6, flexShrink:0 }} />}
                  <div style={{ width:44, height:44, background:m.unread?S.gold:S.panel, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:m.unread?S.black:S.gray, flexShrink:0 }}>
                    {m.from.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <div>
                        <span style={{ fontSize:14, fontWeight:m.unread?600:400 }}>{m.from}</span>
                        <span style={{ fontSize:11, color:S.gray, marginLeft:10, fontFamily:"'Space Mono',monospace" }}>{m.country}</span>
                      </div>
                      <span style={{ fontSize:11, color:S.gray, fontFamily:"'Space Mono',monospace" }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize:13, color:S.gray }}>{m.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SCHEDULE */}
          {active==="schedule"&&(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:24 }}>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1 }}>June 2025</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"6px 12px", cursor:"pointer" }}>‹</button>
                    <button style={{ background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"6px 12px", cursor:"pointer" }}>›</button>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, background:S.border }}>
                  {days.map(d=>(<div key={d} style={{ background:S.charcoal, padding:"8px 4px", textAlign:"center", fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:1, color:S.gray, textTransform:"uppercase" }}>{d}</div>))}
                  {calDays.map((d,i)=>(
                    <div key={i} style={{ background:S.charcoal, padding:8, minHeight:64, position:"relative" }}>
                      {d.day&&<span style={{ fontSize:12, color:d.day===25?S.gold:S.gray, fontWeight:d.day===25?700:400 }}>{d.day}</span>}
                      {d.hasEvent&&d.day&&<div style={{ marginTop:4, height:4, background:S.gold, borderRadius:2 }} />}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, color:S.gold }}>Upcoming</div>
                {appointments.map((a,i)=>(
                  <div key={i} style={{ background:S.charcoal, border:`1px solid ${S.border}`, borderLeft:`3px solid ${S.gold}`, padding:20 }}>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>{a.title}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gold, letterSpacing:1 }}>{a.date}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1, marginTop:2 }}>{a.time}</div>
                  </div>
                ))}
                <button onClick={()=>setShowModal(true)} style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 24px", border:"none", cursor:"pointer" }}>+ Add Appointment</button>
              </div>
            </div>
          )}

          {/* COMMUNITY */}
          {active==="community"&&(
            <div style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:24, height:"calc(100vh - 200px)" }}>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}` }}>
                <div style={{ padding:16, borderBottom:`1px solid ${S.border}`, fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:S.gold }}>Rooms</div>
                {[
                  { name:"# general", active:true },
                  { name:"# quarterbacks", active:false },
                  { name:"# running-backs", active:false },
                  { name:"# receivers", active:false },
                  { name:"# linebackers", active:false },
                  { name:"# d-backs", active:false },
                  { name:"# germany-gfl", active:false },
                  { name:"# france-efaf", active:false },
                  { name:"# mexico-lfa", active:false },
                ].map(r=>(
                  <div key={r.name} style={{ padding:"10px 16px", cursor:"pointer", background:r.active?"rgba(245,196,0,0.08)":"transparent", color:r.active?S.white:S.gray, fontSize:13, borderLeft:r.active?`2px solid ${S.gold}`:"2px solid transparent" }}>{r.name}</div>
                ))}
              </div>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, display:"flex", flexDirection:"column" }}>
                <div style={{ padding:"16px 20px", borderBottom:`1px solid ${S.border}`, fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1 }}># general</div>
                <div style={{ flex:1, padding:20, display:"flex", flexDirection:"column", gap:16, overflowY:"auto" }}>
                  {[
                    { user:"DeShawn K.", role:"WR · Germany", msg:"Anyone have experience with the GFL contract structure? First time signing overseas.", time:"10:32 AM" },
                    { user:"Marcus J.", role:"WR · Elite", msg:"Yes! DM me. The contracts are pretty standard — 3-page deal. Make sure you check the housing allowance clause.", time:"10:35 AM" },
                    { user:"TopArk Team", role:"Staff", msg:"Reminder: Elite members get contract review support. Submit via your dashboard!", time:"10:41 AM", gold:true },
                    { user:"Roderick T.", role:"LB · Pro Ark", msg:"Just got off a video call with Nürnberg. Those guys are serious. Great organization.", time:"11:02 AM" },
                  ].map((c,i)=>(
                    <div key={i} style={{ display:"flex", gap:12 }}>
                      <div style={{ width:36, height:36, background:c.gold?S.gold:S.panel, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, color:c.gold?S.black:S.white, flexShrink:0 }}>{c.user.split(" ").map(w=>w[0]).join("")}</div>
                      <div>
                        <div style={{ display:"flex", gap:8, alignItems:"baseline", marginBottom:4 }}>
                          <span style={{ fontSize:13, fontWeight:600, color:c.gold?S.gold:S.white }}>{c.user}</span>
                          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:S.gray }}>{c.role}</span>
                          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:S.gray }}>{c.time}</span>
                        </div>
                        <div style={{ fontSize:14, color:S.light, lineHeight:1.5 }}>{c.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:16, borderTop:`1px solid ${S.border}`, display:"flex", gap:12 }}>
                  <input placeholder="Message #general..." style={{ flex:1, background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"10px 14px", outline:"none", fontFamily:"inherit" }} />
                  <button style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, padding:"10px 20px", border:"none", cursor:"pointer" }}>Send</button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {active==="profile"&&(
            <div style={{ maxWidth:720 }}>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:32, marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:32 }}>
                  <div style={{ width:80, height:80, background:S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:S.black }}>MJ</div>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:1 }}>Marcus Johnson</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gold, letterSpacing:2, textTransform:"uppercase" }}>Wide Receiver · Elite Member ✓</div>
                  </div>
                  <div style={{ marginLeft:"auto" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1, marginBottom:6 }}>Profile Completeness</div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:120, background:S.border, height:6, borderRadius:3 }}><div style={{ width:"78%", height:"100%", background:S.gold, borderRadius:3 }} /></div>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:S.gold }}>78%</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                  {[
                    { label:"Position", value:"Wide Receiver (WR)" },
                    { label:"College", value:"Cal Poly Humboldt" },
                    { label:"Height", value:"6'1\"" },
                    { label:"Weight", value:"195 lbs" },
                    { label:"40-Yard Dash", value:"4.45s" },
                    { label:"Experience", value:"3 years (1 international)" },
                    { label:"Country Preference", value:"Germany, France, Mexico" },
                    { label:"Available", value:"July 2025" },
                  ].map(f=>(
                    <div key={f.label}>
                      <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>{f.label}</label>
                      <input defaultValue={f.value} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:20 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Bio</label>
                  <textarea defaultValue="3-year WR out of Cal Poly Humboldt. Ran a 4.45 at my pro day. Hungry to compete internationally and take my game to the next level." style={{ minHeight:100 }} />
                </div>
                <div style={{ marginTop:20 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Highlight Reel URL</label>
                  <input defaultValue="https://hudl.com/video/marcus-johnson-2024" />
                </div>
                <button style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 28px", border:"none", cursor:"pointer", marginTop:20 }}>Save Profile</button>
              </div>
            </div>
          )}

          {/* MEMBERSHIP */}
          {active==="membership"&&(
            <div style={{ maxWidth:800 }}>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, borderTop:`3px solid ${S.gold}`, padding:32, marginBottom:24 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:3, textTransform:"uppercase", background:S.gold, color:S.black, padding:"4px 12px", display:"inline-block", marginBottom:16, fontWeight:700 }}>Current Plan</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:2 }}>ELITE</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:S.gold }}>$29<span style={{ fontSize:16, color:S.gray }}>/month</span></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1, marginBottom:4 }}>Next billing date</div>
                    <div style={{ fontSize:14, color:S.white }}>July 25, 2025</div>
                  </div>
                </div>
              </div>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:32 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>UPGRADE TO <span style={{ color:S.gold }}>PRO ARK</span></div>
                <p style={{ fontSize:14, color:S.gray, marginBottom:24, lineHeight:1.7 }}>Get a dedicated placement advisor, custom outreach to your target teams, and VIP combine access for $79/month.</p>
                <Link href="/signup?plan=pro" style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 28px", textDecoration:"none", display:"inline-block" }}>Upgrade to Pro Ark</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule modal */}
      {showModal&&(
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:40, maxWidth:480, width:"90%", position:"relative" }}>
            <button onClick={()=>setShowModal(false)} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", color:S.gray, fontSize:20, cursor:"pointer" }}>✕</button>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:1, marginBottom:24, color:S.gold }}>Schedule Video Call</div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Team / Organization</label><input placeholder="Nürnberg Rams" /></div>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Date</label><input type="date" /></div>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Time (EST)</label><input type="time" /></div>
              <div><label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Notes</label><textarea placeholder="Topics to discuss..." style={{ minHeight:80 }} /></div>
              <button onClick={()=>setShowModal(false)} style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px", border:"none", cursor:"pointer" }}>Confirm Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
