"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import { cmToFeetInches, kgToLbs } from "@/lib/measurements";

export type PendingAthlete = {
  id: string;
  fullName: string;
  email: string;
  position: string | null;
  country: string | null;
  heightCm: number | null;
  weightKg: number | null;
  fortyYardDash: number | null;
  bio: string | null;
  highlightUrl: string | null;
  submittedAt: string | null;
};

export default function VerificationClient({ athletes }: { athletes: PendingAthlete[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDecision(id: string, status: "verified" | "unverified") {
    setBusyId(id);
    const supabase = createClient();
    await supabase.from("athlete_profiles").update({ verification_status: status }).eq("id", id);
    setBusyId(null);
    router.refresh();
  }

  if (athletes.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ fontSize: 13, color: "var(--gray)" }}>No pending verification requests.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {athletes.map((a) => (
        <div className={styles.card} key={a.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div className={styles.cardTitle}>{a.fullName.toUpperCase()}</div>
              <div className={styles.cardSub}>{a.email}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={styles.btnGold}
                style={{ padding: "8px 18px", fontSize: 11 }}
                onClick={() => handleDecision(a.id, "verified")}
                disabled={busyId === a.id}
              >
                Approve
              </button>
              <button
                className={styles.btnOutline}
                style={{ padding: "8px 18px", fontSize: 11 }}
                onClick={() => handleDecision(a.id, "unverified")}
                disabled={busyId === a.id}
              >
                Reject
              </button>
            </div>
          </div>
          <div className={styles.playerStats} style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
            <div className={styles.playerStat}>
              <div className={styles.playerStatVal}>{a.position || "—"}</div>
              <div className={styles.playerStatLabel}>Position</div>
            </div>
            <div className={styles.playerStat}>
              <div className={styles.playerStatVal}>{cmToFeetInches(a.heightCm)}</div>
              <div className={styles.playerStatLabel}>Height</div>
            </div>
            <div className={styles.playerStat}>
              <div className={styles.playerStatVal}>{kgToLbs(a.weightKg)}</div>
              <div className={styles.playerStatLabel}>Weight</div>
            </div>
            <div className={styles.playerStat}>
              <div className={styles.playerStatVal}>{a.fortyYardDash ?? "—"}</div>
              <div className={styles.playerStatLabel}>40-Yard</div>
            </div>
          </div>
          {a.bio && <p style={{ fontSize: 13, color: "var(--light)", marginTop: 12 }}>{a.bio}</p>}
          {a.highlightUrl && (
            <a href={a.highlightUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--gold)", marginTop: 8, display: "inline-block" }}>
              🎥 Watch film →
            </a>
          )}
          {a.submittedAt && (
            <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 8, fontFamily: "var(--font-mono)" }}>
              Submitted {new Date(a.submittedAt).toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
