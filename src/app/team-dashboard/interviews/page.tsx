import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/queries";
import styles from "@/components/dashboard/dashboard.module.css";

const statusColor: Record<string, string> = {
  pending: "var(--gold)",
  accepted: "var(--success)",
  declined: "var(--error)",
  cancelled: "var(--gray)",
};

export default async function InterviewsPage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "team") return null;

  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("interview_requests")
    .select("*")
    .eq("team_id", current.user.id)
    .order("created_at", { ascending: false });

  const athleteIds = [...new Set((requests ?? []).map((r) => r.athlete_id))];
  const { data: athletes } = athleteIds.length
    ? await supabase.from("athlete_directory").select("id, first_name, last_name").in("id", athleteIds)
    : { data: [] };
  const nameMap = new Map((athletes ?? []).map((a) => [a.id, [a.first_name, a.last_name].filter(Boolean).join(" ") || "Athlete"]));

  return (
    <>
      <div className={styles.eyebrow}>Evaluation Pipeline</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 24 }}>
        YOUR INTERVIEW <span style={{ color: "var(--gold)" }}>REQUESTS</span>
      </div>

      {!requests || requests.length === 0 ? (
        <div className={styles.card}>
          <div style={{ fontSize: 13, color: "var(--gray)" }}>
            No interview requests yet. Send one from an athlete&apos;s profile in Find Athletes.
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          {requests.map((r, i) => {
            const name = nameMap.get(r.athlete_id) ?? "Athlete";
            const initials = name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "TA";
            return (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: i < requests.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className={styles.playerAvatar} style={{ width: 44, height: 44, fontSize: 16 }}>
                  {initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>
                    {r.scheduled_at
                      ? `Scheduled ${new Date(r.scheduled_at).toLocaleString()}`
                      : r.proposed_at
                        ? `Proposed ${new Date(r.proposed_at).toLocaleString()}`
                        : `Sent ${new Date(r.created_at).toLocaleDateString()}`}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: statusColor[r.status] ?? "var(--gray)",
                  }}
                >
                  {r.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
