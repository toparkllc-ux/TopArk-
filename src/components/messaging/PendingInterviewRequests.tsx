"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";

export type PendingRequest = {
  id: string;
  teamName: string;
  message: string | null;
  proposedAt: string | null;
};

export default function PendingInterviewRequests({ requests }: { requests: PendingRequest[] }) {
  const router = useRouter();
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleAccept(id: string) {
    if (!scheduledAt) {
      setError("Pick a date & time to confirm the interview.");
      return;
    }
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("interview_requests")
      .update({ status: "accepted", scheduled_at: new Date(scheduledAt).toISOString() })
      .eq("id", id);
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setRespondingId(null);
    router.refresh();
  }

  async function handleDecline(id: string) {
    setBusy(true);
    const supabase = createClient();
    await supabase.from("interview_requests").update({ status: "declined" }).eq("id", id);
    setBusy(false);
    router.refresh();
  }

  if (requests.length === 0) return null;

  return (
    <div className={styles.card} style={{ marginBottom: 24 }}>
      <div className={styles.eyebrow}>Action Needed</div>
      <div className={styles.cardTitle}>INTERVIEW REQUESTS</div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {requests.map((r) => (
          <div
            key={r.id}
            style={{ background: "var(--panel)", border: "1px solid var(--border)", padding: 16 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{r.teamName}</div>
                {r.message && <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 4 }}>{r.message}</div>}
                {r.proposedAt && (
                  <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
                    Proposed: {new Date(r.proposedAt).toLocaleString()}
                  </div>
                )}
              </div>
              {respondingId !== r.id && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className={styles.btnGold}
                    style={{ padding: "8px 16px", fontSize: 11 }}
                    onClick={() => {
                      setRespondingId(r.id);
                      setScheduledAt(r.proposedAt ? r.proposedAt.slice(0, 16) : "");
                      setError("");
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.btnOutline}
                    style={{ padding: "8px 16px", fontSize: 11 }}
                    onClick={() => handleDecline(r.id)}
                    disabled={busy}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
            {respondingId === r.id && (
              <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <label className={styles.formLabel}>Confirm Date &amp; Time</label>
                  <input
                    className={styles.formInput}
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </div>
                <button className={styles.btnGold} style={{ padding: "10px 16px", fontSize: 11 }} onClick={() => handleAccept(r.id)} disabled={busy}>
                  Confirm
                </button>
                <button className={styles.btnOutline} style={{ padding: "10px 16px", fontSize: 11 }} onClick={() => setRespondingId(null)}>
                  Cancel
                </button>
              </div>
            )}
            {error && respondingId === r.id && <div style={{ fontSize: 11, color: "var(--error)", marginTop: 6 }}>{error}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
