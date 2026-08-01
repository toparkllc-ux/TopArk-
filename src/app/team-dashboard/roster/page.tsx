import styles from "@/components/dashboard/dashboard.module.css";

const ROSTER = [
  { name: "Darius Mitchell", pos: "WR", measurables: "6'1\" · 195 · 4.42", experience: "2yr Pro (Germany)", status: "interview" as const },
  { name: "Marcus Thompson", pos: "LB", measurables: "6'2\" · 225 · 4.55", experience: "3yr Pro (France, Mexico)", status: "interview" as const },
  { name: "Brandon King", pos: "QB", measurables: "6'0\" · 205 · 4.62", experience: "2yr Pro (Sweden)", status: "interview" as const },
  { name: "Jaylen Roberts", pos: "RB", measurables: "5'10\" · 200 · 4.45", experience: "1yr Pro (Mexico)", status: "signed" as const },
  { name: "Chris Jackson", pos: "S", measurables: "6'0\" · 210 · 4.48", experience: "4yr Pro (Germany, Austria)", status: "signed" as const },
  { name: "Andre Williams", pos: "CB", measurables: "5'11\" · 185 · 4.38", experience: "D1 College", status: "prospect" as const },
  { name: "Terrance Hill", pos: "DL", measurables: "6'3\" · 270 · 4.85", experience: "2yr Pro (Poland)", status: "prospect" as const },
  { name: "Malik Davis", pos: "OL", measurables: "6'5\" · 310 · 5.25", experience: "D2 College", status: "declined" as const },
];

const statusClass = {
  interview: styles.rosterStatusInterview,
  signed: styles.rosterStatusSigned,
  prospect: styles.rosterStatusProspect,
  declined: styles.rosterStatusDeclined,
};
const statusLabel = { interview: "Interview", signed: "Signed", prospect: "Prospect", declined: "Declined" };

export default function RosterBoardPage() {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div className={styles.eyebrow}>Roster Management</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1 }}>
          YOUR <span style={{ color: "var(--gold)" }}>ROSTER BOARD</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Track prospects, interviews, and signed athletes in one place.
        </div>
      </div>

      <div className={styles.grid4} style={{ marginBottom: 24 }}>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Prospects</div>
          <div className={styles.statNum} style={{ color: "var(--blue)" }}>8</div>
          <div className={styles.statLabel}>Athletes saved</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>In Interview</div>
          <div className={styles.statNum}>3</div>
          <div className={styles.statLabel}>Evaluations active</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Signed</div>
          <div className={styles.statNum} style={{ color: "var(--success)" }}>2</div>
          <div className={styles.statLabel}>On your roster</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Open Spots</div>
          <div className={styles.statNum} style={{ color: "var(--error)" }}>4</div>
          <div className={styles.statLabel}>Import positions needed</div>
        </div>
      </div>

      <div className={styles.card}>
        <table className={styles.rosterTable}>
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Position</th>
              <th>Measurables</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ROSTER.map((r) => (
              <tr key={r.name}>
                <td>
                  <strong>{r.name}</strong>
                </td>
                <td>{r.pos}</td>
                <td>{r.measurables}</td>
                <td>{r.experience}</td>
                <td>
                  <span className={`${styles.rosterStatus} ${statusClass[r.status]}`}>{statusLabel[r.status]}</span>
                </td>
                <td>
                  <button className={styles.btnOutline} style={{ padding: "5px 12px", fontSize: 10 }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
