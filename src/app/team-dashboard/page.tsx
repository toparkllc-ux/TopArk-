import styles from "@/components/dashboard/dashboard.module.css";

const EVALUATIONS = [
  { day: "18", month: "Jun", title: "Darius M. — Wide Receiver", detail: "🇺🇸 Texas · 6'1\" 195 · 4.42 40yd", time: "2:00 PM CET", eval: false },
  { day: "20", month: "Jun", title: "Marcus T. — Linebacker", detail: "🇺🇸 Georgia · 6'2\" 225 · Film reviewed ✓", time: "10:00 AM CET", eval: true },
  { day: "25", month: "Jun", title: "Brandon K. — Quarterback", detail: "🇺🇸 California · 6'0\" 205 · 2yr exp", time: "3:00 PM CET", eval: false },
];

const MESSAGES = [
  { from: "Darius M. — WR", preview: "Hey coach, I wanted to follow up on my film. I have new footage from last week's showcase...", time: "1h ago", unread: true, avatar: "🏈" },
  { from: "Jaylen R. — RB", preview: "Interested in your program. I played two seasons in Mexico and looking for Europe next...", time: "3h ago", unread: true, avatar: "🏈" },
  { from: "TopArk Team", preview: "3 new athletes matching your roster needs have been added to the platform this week.", time: "1d ago", unread: false, avatar: "⚡" },
];

export default function TeamDashboardPage() {
  return (
    <>
      <div className={styles.grid4} style={{ marginBottom: 24 }}>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Athletes Found</div>
          <div className={styles.statNum}>248</div>
          <div className={styles.statLabel}>Matching your roster needs</div>
          <div className={styles.statChange}>↑ 18 new this week</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Interviews</div>
          <div className={styles.statNum}>6</div>
          <div className={styles.statLabel}>Scheduled this month</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Messages</div>
          <div className={styles.statNum}>12</div>
          <div className={styles.statLabel}>Active conversations</div>
          <div className={styles.statChange}>5 unread</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Roster</div>
          <div className={styles.statNum}>4</div>
          <div className={styles.statLabel}>Import spots to fill</div>
        </div>
      </div>

      <div className={styles.grid2} style={{ gap: 24 }}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Upcoming</div>
          <div className={styles.cardTitle}>SCHEDULED EVALUATIONS</div>
          <div className={styles.apptList} style={{ marginTop: 16 }}>
            {EVALUATIONS.map((e) => (
              <div className={`${styles.apptItem} ${e.eval ? styles.apptItemMeeting : ""}`} key={e.title} style={e.eval ? { borderLeftColor: "var(--blue)" } : undefined}>
                <div className={styles.apptDate}>
                  <div className={styles.apptDateDay} style={e.eval ? { color: "var(--blue)" } : undefined}>
                    {e.day}
                  </div>
                  <div className={styles.apptDateMonth}>{e.month}</div>
                </div>
                <div className={styles.apptDivider} />
                <div className={styles.apptInfo}>
                  <div className={styles.apptTitle}>{e.title}</div>
                  <div className={styles.apptDetail}>{e.detail}</div>
                </div>
                <div className={styles.apptTime}>{e.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.eyebrow}>Inbox</div>
          <div className={styles.cardTitle}>ATHLETE MESSAGES</div>
          <div style={{ marginTop: 16 }}>
            {MESSAGES.map((msg) => (
              <div className={`${styles.msgItem} ${msg.unread ? styles.msgUnread : ""}`} key={msg.from}>
                {msg.unread ? <div className={styles.msgUnreadDot} /> : <div style={{ width: 6 }} />}
                <div className={styles.msgAvatar}>{msg.avatar}</div>
                <div className={styles.msgInfo}>
                  <div className={styles.msgFrom}>{msg.from}</div>
                  <div className={styles.msgPreview}>{msg.preview}</div>
                </div>
                <div className={styles.msgTime}>{msg.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
