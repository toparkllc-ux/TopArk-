"use client";
import Link from "next/link";
import { useState } from "react";

const S = { gold:"var(--gold)", black:"var(--black)", charcoal:"var(--charcoal)", panel:"var(--panel)", border:"var(--border)", white:"var(--white)", gray:"var(--gray)", light:"var(--light)" };

const navItems = [
  { id:"overview", icon:"📊", label:"Overview" },
  { id:"search", icon:"🔍", label:"Search Players" },
  { id:"messages", icon:"💬", label:"Messages" },
  { id:"interviews", icon:"🎥", label:"Interviews" },
  { id:"roster", icon:"📋", label:"Roster" },
  { id:"settings", icon:"⚙️", label:"Settings" },
];

const players = [
  { initials:"MJ", name:"Marcus Johnson", pos:"WR", college:"Cal Poly Humboldt", height:"6'1\"", weight:"195", dash:"4.45s", exp:"3 yrs", countries:["Germany","France"], verified:true, plan:"Elite" },
  { initials:"DW", name:"Deon Williams", pos:"LB", college:"Florida A&M", height:"6'2\"", weight:"235", dash:"4.68s", exp:"5 yrs", countries:["Germany","Denmark","Mexico"], verified:true, plan:"Pro Ark" },
  { initials:"TB", name:"Tyrell Baptiste", pos:"RB", college:"Morgan State", height:"5'11\"", weight:"210", dash:"4.52s", exp:"4 yrs", countries:["Mexico","Spain"], verified:true, plan:"Elite" },
  { initials:"CN", name:"Chris Nguyen", pos:"CB", college:"San Jose State", height:"5'10\"", weight:"185", dash:"4.38s", exp:"2 yrs", countries:["Austria"], verified:true, plan:"Elite" },
  { initials:"RT", name:"Roderick Thompson", pos:"DE", college:"South Carolina State", height:"6'4\"", weight:"255", dash:"4.75s", exp:"6 yrs", countries:["Germany","Italy","Sweden"], verified:true, plan:"Pro Ark" },
  { initials:"JH", name:"Jaylen Harris", pos:"QB", college:"Grambling State", height:"6'3\"", weight:"220", dash:"4.61s", exp:"3 yrs", countries:["Mexico"], verified:false, plan:"Free" },
  { initials:"KM", name:"Kevin Moore", pos:"OL", college:"Howard", height:"6'5\"", weight:"305", dash:"5.20s", exp:"1 yr", countries:[], verified:false, plan:"Free" },
  { initials:"AS", name:"Andre Smith", pos:"S", college:"Bethune-Cookman", height:"6'0\"", weight:"200", dash:"4.50s", exp:"4 yrs", countries:["France","Poland"], verified:true, plan:"Elite" },
  { initials:"BJ", name:"Brandon Jackson", pos:"TE", college:"NC A&T", height:"6'4\"", weight:"250", dash:"4.72s", exp:"2 yrs", countries:["Denmark"], verified:true, plan:"Elite" },
  { initials:"PW", name:"Phillip Washington", pos:"WR", college:"Alcorn State", height:"6'0\"", weight:"188", dash:"4.42s", exp:"3 yrs", countries:["Germany","Mexico"], verified:true, plan:"Elite" },
  { initials:"DT", name:"Darren Taylor", pos:"LB", college:"Hampton", height:"6'1\"", weight:"230", dash:"4.65s", exp:"5 yrs", countries:["Austria","Czech Republic"], verified:true, plan:"Pro Ark" },
  { initials:"MR", name:"Marcus Reed", pos:"RB", college:"Tuskegee", height:"5'9\"", weight:"200", dash:"4.48s", exp:"1 yr", countries:[], verified:false, plan:"Free" },
];

const positionColors: Record<string,string> = { WR:"#F5C400", RB:"#22c55e", LB:"#3b82f6", CB:"#a855f7", DE:"#ef4444", QB:"#f97316", OL:"#6b7280", S:"#06b6d4", TE:"#84cc16" };

export default function TeamDashboard() {
  const [active, setActive] = useState("overview");
  const [posFilter, setPosFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [requestSent, setRequestSent] = useState<string[]>([]);

  const filtered = players.filter(p =>
    (!posFilter || p.pos === posFilter) &&
    (!expFilter || (expFilter==="1-3" && parseInt(p.exp)<=3) || (expFilter==="4-6" && parseInt(p.exp)>=4 && parseInt(p.exp)<=6) || (expFilter==="7+" && parseInt(p.exp)>=7))
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:S.black }}>
      {/* Sidebar */}
      <div style={{ width:260, background:S.charcoal, borderRight:`1px solid ${S.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"28px 24px", borderBottom:`1px solid ${S.border}` }}>
          <Link href="/" style={{ textDecoration:"none" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:3 }}>TOP<span style={{ color:S.gold }}>Λ</span>RK</div>
          </Link>
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:14, fontWeight:600 }}>Nürnberg Rams</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gold, letterSpacing:1, marginTop:2 }}>🇩🇪 Germany / GFL</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:S.gray, letterSpacing:1, marginTop:4, textTransform:"uppercase" }}>Partner Team</div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"16px 0" }}>
          {navItems.map(n=>(
            <button key={n.id} onClick={()=>setActive(n.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 24px", border:"none", cursor:"pointer", background:active===n.id?"rgba(245,196,0,0.1)":"transparent", color:active===n.id?S.gold:S.light, borderLeft:active===n.id?`3px solid ${S.gold}`:"3px solid transparent", textAlign:"left", fontSize:14, fontWeight:active===n.id?600:400 }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </nav>
        <Link href="/login" style={{ padding:"16px 24px", borderTop:`1px solid ${S.border}`, fontSize:13, color:S.gray, textDecoration:"none", display:"block" }}>← Sign Out</Link>
      </div>

      {/* Main */}
      <div style={{ flex:1, overflow:"auto" }}>
        <div style={{ padding:"32px 40px", borderBottom:`1px solid ${S.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:1 }}>{navItems.find(n=>n.id===active)?.label}</h1>
            <p style={{ fontSize:13, color:S.gray, marginTop:4 }}>June 25, 2025</p>
          </div>
          <button onClick={()=>setActive("search")} style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 24px", border:"none", cursor:"pointer" }}>
            + Find Players
          </button>
        </div>

        <div style={{ padding:"40px" }}>
          {/* OVERVIEW */}
          {active==="overview"&&(
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
                {[
                  { label:"Players Viewed", value:"47", change:"This month" },
                  { label:"Interviews Sent", value:"8", change:"3 accepted" },
                  { label:"Roster Spots Open", value:"3", change:"Import slots" },
                  { label:"Messages", value:"14", change:"5 unread" },
                ].map(s=>(
                  <div key={s.label} style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:"24px 20px" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:12 }}>{s.label}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, color:S.gold, lineHeight:1, marginBottom:8 }}>{s.value}</div>
                    <div style={{ fontSize:11, color:S.gray }}>{s.change}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1, marginBottom:20, color:S.gold }}>Recent Activity</div>
                {[
                  { icon:"🎥", text:"Video call scheduled with Marcus Johnson (WR)", time:"2h ago" },
                  { icon:"💬", text:"New message from Deon Williams regarding contract terms", time:"Yesterday" },
                  { icon:"👁️", text:"Profile view: Tyrell Baptiste (RB) viewed your team page", time:"2 days ago" },
                  { icon:"✅", text:"Roderick Thompson accepted your interview request", time:"3 days ago" },
                ].map((a,i)=>(
                  <div key={i} style={{ display:"flex", gap:16, padding:"12px 0", borderBottom:i<3?`1px solid ${S.border}`:"none" }}>
                    <span style={{ fontSize:18 }}>{a.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color:S.light }}>{a.text}</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, marginTop:4 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH PLAYERS */}
          {active==="search"&&(
            <div style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:24 }}>
              {/* Filters */}
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24, alignSelf:"start" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:1, marginBottom:20, color:S.gold }}>Filters</div>
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Position</label>
                    <select value={posFilter} onChange={e=>setPosFilter(e.target.value)} style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"10px 14px", outline:"none", fontFamily:"inherit" }}>
                      <option value="">All Positions</option>
                      {["QB","RB","WR","TE","OL","DE","DT","LB","CB","S","K","P"].map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Experience</label>
                    <select value={expFilter} onChange={e=>setExpFilter(e.target.value)} style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"10px 14px", outline:"none", fontFamily:"inherit" }}>
                      <option value="">Any Experience</option>
                      <option value="1-3">1–3 Years</option>
                      <option value="4-6">4–6 Years</option>
                      <option value="7+">7+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>Verified Only</label>
                    <select style={{ width:"100%", background:S.panel, border:`1px solid ${S.border}`, color:S.white, padding:"10px 14px", outline:"none", fontFamily:"inherit" }}>
                      <option value="">All Athletes</option>
                      <option>Verified Only</option>
                    </select>
                  </div>
                  <button onClick={()=>{setPosFilter("");setExpFilter("");}} style={{ background:"transparent", color:S.gray, fontSize:12, letterSpacing:1, textTransform:"uppercase", padding:"10px", border:`1px solid ${S.border}`, cursor:"pointer" }}>Clear Filters</button>
                </div>
              </div>

              {/* Results */}
              <div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, letterSpacing:1, marginBottom:16 }}>{filtered.length} ATHLETES FOUND</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
                  {filtered.map(p=>(
                    <div key={p.initials} style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24 }}>
                      <div style={{ display:"flex", gap:16, marginBottom:16 }}>
                        <div style={{ width:52, height:52, background:positionColors[p.pos]||S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:S.black, flexShrink:0 }}>{p.initials}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1 }}>{p.name}</span>
                            {p.verified&&<span style={{ fontSize:10, color:S.gold }}>✓</span>}
                          </div>
                          <div style={{ display:"flex", gap:8, marginTop:4 }}>
                            <span style={{ background:positionColors[p.pos]||S.gold, color:S.black, fontSize:10, fontWeight:700, padding:"2px 8px", fontFamily:"'Space Mono',monospace" }}>{p.pos}</span>
                            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:S.gray, letterSpacing:1 }}>{p.plan}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
                        {[{ l:"Height", v:p.height },{ l:"Weight", v:p.weight+"lbs" },{ l:"40 YD", v:p.dash }].map(s=>(
                          <div key={s.l} style={{ background:S.panel, padding:"8px 10px" }}>
                            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:1, textTransform:"uppercase", color:S.gray }}>{s.l}</div>
                            <div style={{ fontSize:14, fontWeight:600, marginTop:2 }}>{s.v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize:12, color:S.gray, marginBottom:8 }}>{p.college} · {p.exp} pro</div>
                      {p.countries.length>0&&<div style={{ fontSize:12, color:S.gray, marginBottom:16 }}>🌍 {p.countries.join(", ")}</div>}
                      <div style={{ display:"flex", gap:8 }}>
                        <Link href={`/athletes/${p.name.toLowerCase().replace(/\s/g,"-")}`} style={{ flex:1, background:"transparent", color:S.white, fontSize:11, fontWeight:600, letterSpacing:1, textTransform:"uppercase", padding:"10px 12px", border:`1px solid ${S.border}`, textDecoration:"none", textAlign:"center" }}>View Profile</Link>
                        <button onClick={()=>setRequestSent(prev=>[...prev,p.initials])} style={{ flex:1, background:requestSent.includes(p.initials)?S.panel:S.gold, color:requestSent.includes(p.initials)?S.gray:S.black, fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"10px 12px", border:"none", cursor:requestSent.includes(p.initials)?"default":"pointer" }}>
                          {requestSent.includes(p.initials)?"Requested ✓":"Request Interview"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INTERVIEWS */}
          {active==="interviews"&&(
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { name:"Marcus Johnson", pos:"WR", status:"Scheduled", date:"Jun 28, 2025 · 2:00 PM EST", color:"#22c55e" },
                { name:"Roderick Thompson", pos:"DE", status:"Accepted", date:"Jun 30, 2025 · 11:00 AM EST", color:"#22c55e" },
                { name:"Deon Williams", pos:"LB", status:"Pending", date:"Awaiting response", color:S.gold },
                { name:"Chris Nguyen", pos:"CB", status:"Pending", date:"Awaiting response", color:S.gold },
                { name:"Andre Smith", pos:"S", status:"Declined", date:"June 20, 2025", color:"#ef4444" },
              ].map((r,i)=>(
                <div key={i} style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ width:44, height:44, background:S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:S.black }}>
                      {r.name.split(" ").map(w=>w[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:600 }}>{r.name}</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, marginTop:2 }}>{r.pos} · {r.date}</div>
                    </div>
                  </div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:r.color, padding:"4px 12px", border:`1px solid ${r.color}` }}>{r.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* ROSTER */}
          {active==="roster"&&(
            <div>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:24, marginBottom:24, borderLeft:`3px solid ${S.gold}` }}>
                <div style={{ display:"flex", gap:32 }}>
                  {[{ l:"Import Slots", v:"3 open" },{ l:"Total Roster", v:"48 players" },{ l:"Americans", v:"2 signed" },{ l:"Season Start", v:"Sept 2025" }].map(s=>(
                    <div key={s.l}><div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:S.gray }}>{s.l}</div><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:S.gold, marginTop:4 }}>{s.v}</div></div>
                  ))}
                </div>
              </div>
              {[
                { initials:"MJ", name:"Marcus Johnson", pos:"WR", signed:"Jun 5, 2025", status:"Active" },
                { initials:"RT", name:"Roderick Thompson", pos:"DE", signed:"May 18, 2025", status:"Active" },
              ].map(p=>(
                <div key={p.initials} style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ width:44, height:44, background:S.gold, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:S.black }}>{p.initials}</div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:S.gray, marginTop:2 }}>{p.pos} · Signed {p.signed}</div>
                    </div>
                  </div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#22c55e", padding:"4px 12px", border:"1px solid #22c55e" }}>{p.status}</span>
                </div>
              ))}
            </div>
          )}

          {active==="messages"&&(
            <div style={{ background:S.charcoal, border:`1px solid ${S.border}` }}>
              {[
                { from:"Marcus Johnson", role:"WR · Elite", preview:"Thank you for reaching out! I'm very interested in the Nürnberg Rams...", time:"2h ago", unread:true },
                { from:"Roderick Thompson", role:"DE · Pro Ark", preview:"I reviewed the contract terms. I have a few questions about the housing allowance...", time:"Yesterday", unread:true },
                { from:"Deon Williams", role:"LB · Pro Ark", preview:"I'm available for a call this week. What times work for you?", time:"2 days ago", unread:false },
                { from:"TopArk Team", role:"Staff", preview:"Your team profile has been verified. You now have full recruiter access.", time:"1 week ago", unread:false },
              ].map((m,i)=>(
                <div key={i} style={{ display:"flex", gap:16, padding:"20px 24px", borderBottom:i<3?`1px solid ${S.border}`:"none", cursor:"pointer" }}>
                  <div style={{ width:44, height:44, background:m.unread?S.gold:S.panel, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:m.unread?S.black:S.gray, flexShrink:0 }}>
                    {m.from.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <div><span style={{ fontSize:14, fontWeight:m.unread?600:400 }}>{m.from}</span><span style={{ fontSize:11, color:S.gray, marginLeft:10, fontFamily:"'Space Mono',monospace" }}>{m.role}</span></div>
                      <span style={{ fontSize:11, color:S.gray, fontFamily:"'Space Mono',monospace" }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize:13, color:S.gray }}>{m.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active==="settings"&&(
            <div style={{ maxWidth:600 }}>
              <div style={{ background:S.charcoal, border:`1px solid ${S.border}`, padding:32, display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, color:S.gold, marginBottom:4 }}>Team Settings</div>
                {[
                  { label:"Team Name", value:"Nürnberg Rams" },
                  { label:"Country", value:"Germany" },
                  { label:"League", value:"German Football League (GFL)" },
                  { label:"Contact Email", value:"recruiting@nuernberg-rams.de" },
                  { label:"Website", value:"https://nuernberg-rams.de" },
                ].map(f=>(
                  <div key={f.label}>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.gray, marginBottom:8 }}>{f.label}</label>
                    <input defaultValue={f.value} />
                  </div>
                ))}
                <button style={{ background:S.gold, color:S.black, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"12px 28px", border:"none", cursor:"pointer", width:"fit-content", marginTop:8 }}>Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
