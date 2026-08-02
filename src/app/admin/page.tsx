import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: athleteCount }, { count: teamCount }, { count: pendingCount }, { count: conversationCount }] =
    await Promise.all([
      supabase.from("athlete_directory").select("*", { count: "exact", head: true }),
      supabase.from("team_profiles").select("*", { count: "exact", head: true }),
      supabase.from("athlete_profiles").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
      supabase.from("conversations").select("*", { count: "exact", head: true }),
    ]);

  return (
    <>
      <div className={styles.grid5} style={{ marginBottom: 24 }}>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Athletes</div>
          <div className={styles.statNum}>{athleteCount ?? 0}</div>
          <div className={styles.statLabel}>Registered profiles</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Teams</div>
          <div className={styles.statNum}>{teamCount ?? 0}</div>
          <div className={styles.statLabel}>Partner accounts</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Verification</div>
          <div className={styles.statNum} style={{ color: pendingCount ? "var(--gold)" : undefined }}>
            {pendingCount ?? 0}
          </div>
          <div className={styles.statLabel}>Pending review</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Conversations</div>
          <div className={styles.statNum}>{conversationCount ?? 0}</div>
          <div className={styles.statLabel}>Athlete ↔ team threads</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Countries</div>
          <div className={styles.statNum}>10+</div>
          <div className={styles.statLabel}>Per brand copy</div>
        </div>
      </div>

      {pendingCount ? (
        <div className={styles.card}>
          <div className={styles.eyebrow}>Action Needed</div>
          <div className={styles.cardTitle}>{pendingCount} ATHLETE{pendingCount === 1 ? "" : "S"} AWAITING VERIFICATION</div>
          <p style={{ fontSize: 13, color: "var(--gray)", marginTop: 8 }}>
            Review submitted profiles in the{" "}
            <Link href="/admin/verification" style={{ color: "var(--gold)" }}>
              Verification Queue
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className={styles.card}>
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No pending verification requests right now.</div>
        </div>
      )}
    </>
  );
}
