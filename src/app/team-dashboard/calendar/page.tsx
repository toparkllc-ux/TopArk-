import styles from "@/components/dashboard/dashboard.module.css";

const EVALUATIONS = [
  { day: "18", month: "Jun", title: "Darius M. — WR Eval", detail: "Video call · Film review + Q&A", time: "2:00 PM", eval: false },
  { day: "20", month: "Jun", title: "Marcus T. — LB Eval", detail: "Video call · Physical assessment", time: "10:00 AM", eval: true },
  { day: "25", month: "Jun", title: "Brandon K. — QB Eval", detail: "Video call · Scheme fit discussion", time: "3:00 PM", eval: false },
  { day: "28", month: "Jun", title: "Georgetown Combine — Live Scouting", detail: "In-person · TopArk International Combine", time: "8:00 AM", eval: true },
];

const ACTIVITY = [
  { icon: "✅", title: "Jaylen R. signed", detail: "Running Back · Contract confirmed · 2d ago" },
  { icon: "✅", title: "Chris J. signed", detail: "Safety · Contract confirmed · 5d ago" },
  { icon: "🎥", title: "New film reviewed", detail: "Andre W. (CB) uploaded combine footage · 1w ago" },
  { icon: "📋", title: "Roster needs updated", detail: "You added DL and OL to open positions · 1w ago" },
];

export default function TeamCalendarPage() {
  return (
    <>
      <div className={styles.eyebrow}>Schedule</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 24 }}>
        EVALUATION <span style={{ color: "var(--gold)" }}>CALENDAR</span>
      </div>
      <div className={styles.grid2} style={{ gap: 24, alignItems: "start" }}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>UPCOMING EVALUATIONS</div>
          <div className={styles.apptList} style={{ marginTop: 16 }}>
            {EVALUATIONS.map((e) => (
              <div className={styles.apptItem} key={e.title} style={e.eval ? { borderLeftColor: "var(--blue)" } : undefined}>
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
          <div className={styles.cardTitle}>RECENT ACTIVITY</div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {ACTIVITY.map((a, i) => (
              <div
                key={a.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  paddingBottom: i < ACTIVITY.length - 1 ? 14 : 0,
                  borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ fontSize: 18 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
