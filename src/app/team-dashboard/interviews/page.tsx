import styles from "@/components/dashboard/dashboard.module.css";

const INCOMING = [
  { initials: "AW", name: "Andre Williams — CB", detail: "5'11\" · 185 · 4.38 · D1 College · Requested Jun 12" },
  { initials: "TH", name: "Terrance Hill — DL", detail: "6'3\" · 270 · 4.85 · 2yr Pro · Requested Jun 14" },
];

const OUTGOING = [
  { initials: "DM", name: "Darius Mitchell — WR", status: "Accepted · Interview Jun 18", color: "var(--success)" },
  { initials: "MT", name: "Marcus Thompson — LB", status: "Accepted · Interview Jun 20", color: "var(--success)" },
  { initials: "BK", name: "Brandon King — QB", status: "Pending · Sent Jun 15", color: "var(--gold)" },
];

export default function InterviewsPage() {
  return (
    <>
      <div className={styles.eyebrow}>Evaluation Pipeline</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 24 }}>
        INTERVIEW <span style={{ color: "var(--gold)" }}>REQUESTS</span>
      </div>
      <div className={styles.grid2} style={{ gap: 24 }}>
        <div className={styles.card}>
          <div className={styles.cardTitle} style={{ color: "var(--gold)", marginBottom: 16 }}>
            INCOMING REQUESTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {INCOMING.map((r) => (
              <div key={r.name} style={{ background: "var(--panel)", border: "1px solid var(--border)", padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
                <div className={styles.playerAvatar} style={{ width: 44, height: 44, fontSize: 16 }}>
                  {r.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>{r.detail}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className={styles.btnPrimary} style={{ padding: "6px 14px", fontSize: 10 }}>
                    Accept
                  </button>
                  <button className={styles.btnOutline} style={{ padding: "6px 14px", fontSize: 10 }}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle} style={{ marginBottom: 16 }}>
            YOUR OUTGOING REQUESTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {OUTGOING.map((r) => (
              <div key={r.name} style={{ background: "var(--panel)", border: "1px solid var(--border)", borderLeft: `3px solid ${r.color}`, padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
                <div className={styles.playerAvatar} style={{ width: 44, height: 44, fontSize: 16 }}>
                  {r.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: r.color }}>{r.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
