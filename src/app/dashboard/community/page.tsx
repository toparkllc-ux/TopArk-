import { getCurrentUser } from "@/lib/supabase/queries";
import styles from "@/components/dashboard/dashboard.module.css";

const ROOM_GROUPS = [
  { section: "General", rooms: [{ id: "general", label: "general", badge: 4 }, { id: "introductions", label: "introductions" }, { id: "news", label: "topark-news" }] },
  { section: "By Position", rooms: [{ id: "qb", label: "quarterbacks" }, { id: "skill", label: "skill-positions" }, { id: "line", label: "linemen" }] },
  { section: "Regional", rooms: [{ id: "europe", label: "europe-league" }, { id: "latam", label: "latin-america" }] },
];

const SAMPLE_CHAT = [
  { initials: "JR", bg: "#1e3a5f", name: "Jaylen R.", role: "pro", time: "10:14 AM", text: "Just got off a call with a team in Mexico — they're looking for 2 DBs and a pass rusher. Anyone at those positions hit me up." },
  { initials: "MT", bg: "#2d1b1b", name: "Marcus T.", role: "elite", time: "10:22 AM", text: "That's what I'm saying. France has been super active this offseason. Paris signed 4 Americans already. Stay ready." },
  { initials: "BK", bg: "#1a2e1a", name: "Brandon K.", role: "elite", time: "10:31 AM", text: "Sweden was unreal. The lifestyle, the respect, how they treat the game — honestly better than some situations I had in the US." },
  { initials: "NW", bg: "#2a1a00", name: "Noah W. (Founder)", role: "pro", time: "10:45 AM", text: "Big things coming from the combine this month. We've got 8 partner teams flying in from Europe. Let's get you signed. 🏈" },
];

export default async function CommunityPage() {
  const current = await getCurrentUser();
  const isAthlete = current?.accountType === "athlete";
  const isLocked = !isAthlete || current.profile.membership_tier === "free";

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div className={styles.eyebrow}>Members Only</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1 }}>
          COMMUNITY CHAT <span style={{ color: "var(--gold)" }}>ROOMS</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Private &amp; safe. Elite and Pro Ark members only. Real athletes, real conversations.
        </div>
      </div>
      <div className={isLocked ? styles.lockedFeature : ""}>
        {isLocked && (
          <div className={styles.lockedOverlay}>
            <div className={styles.lockedIcon}>🔒</div>
            <div className={styles.lockedTitle}>ELITE FEATURE</div>
            <div className={styles.lockedSub}>
              Community chat rooms are available to Elite and Pro Ark members.
            </div>
            <a href="/dashboard/membership">
              <button className={styles.upgradeBtn}>Upgrade Plan</button>
            </a>
          </div>
        )}
        <div className={styles.communityWrap}>
          <div className={styles.roomList}>
            <div className={styles.roomHeader}>ROOMS</div>
            {ROOM_GROUPS.map((group) => (
              <div key={group.section}>
                <div className={styles.roomSection}>{group.section}</div>
                {group.rooms.map((room, i) => (
                  <div
                    className={`${styles.roomItem} ${group.section === "General" && i === 0 ? styles.roomItemActive : ""}`}
                    key={room.id}
                  >
                    <span className={styles.roomHash}>#</span> {room.label}
                    {room.badge ? <span className={styles.roomBadge}>{room.badge}</span> : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.chatArea}>
            <div className={styles.chatAreaHeader}>
              <div>
                <div className={styles.chatAreaTitle}># general</div>
                <div className={styles.chatAreaMeta}>All paid members · Private &amp; verified</div>
              </div>
              <div className={styles.chatAreaOnline}>
                <span className={styles.onlineDot} /> 24 online
              </div>
            </div>
            <div className={styles.chatMessages}>
              {SAMPLE_CHAT.map((msg) => (
                <div className={styles.chatMsg} key={msg.name}>
                  <div className={styles.chatMsgAvatar} style={{ background: msg.bg }}>
                    {msg.initials}
                  </div>
                  <div className={styles.chatMsgBody}>
                    <div className={styles.chatMsgHeader}>
                      <span className={styles.chatMsgName}>{msg.name}</span>
                      <span className={`${styles.chatMsgRole} ${msg.role === "pro" ? styles.rolePro : styles.roleElite}`}>
                        {msg.role === "pro" ? "Pro Ark" : "Elite"}
                      </span>
                      <span className={styles.chatMsgTime}>{msg.time}</span>
                    </div>
                    <div className={styles.chatMsgText}>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.chatInputArea}>
              <input className={styles.communityInput} type="text" placeholder="Message #general..." disabled={isLocked} />
              <button className={styles.sendBtn} disabled={isLocked}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
