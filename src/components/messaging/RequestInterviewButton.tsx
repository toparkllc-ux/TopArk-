"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import dashStyles from "@/components/dashboard/dashboard.module.css";

export default function RequestInterviewButton({
  athleteId,
  teamId,
  athleteName,
  className,
}: {
  athleteId: string;
  teamId: string;
  athleteName: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [proposedAt, setProposedAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    const supabase = createClient();
    const { error: insertError } = await supabase.from("interview_requests").insert({
      athlete_id: athleteId,
      team_id: teamId,
      requested_by: teamId,
      message: message || null,
      proposed_at: proposedAt ? new Date(proposedAt).toISOString() : null,
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSent(true);
  }

  if (!open) {
    return (
      <button className={className} onClick={() => setOpen(true)}>
        Request Interview
      </button>
    );
  }

  return (
    <div className={dashStyles.modalBg} onClick={() => setOpen(false)}>
      <div className={dashStyles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={dashStyles.modalClose} onClick={() => setOpen(false)}>
          ✕
        </button>
        {sent ? (
          <>
            <div className={dashStyles.modalTitle}>REQUEST SENT</div>
            <p style={{ fontSize: 13, color: "var(--gray)" }}>
              {athleteName} has been notified of your interview request.
            </p>
          </>
        ) : (
          <>
            <div className={dashStyles.modalTitle}>REQUEST INTERVIEW — {athleteName.toUpperCase()}</div>
            <div className={dashStyles.formGroup}>
              <label className={dashStyles.formLabel}>Proposed Date &amp; Time</label>
              <input
                className={dashStyles.formInput}
                type="datetime-local"
                value={proposedAt}
                onChange={(e) => setProposedAt(e.target.value)}
              />
            </div>
            <div className={dashStyles.formGroup}>
              <label className={dashStyles.formLabel}>Message</label>
              <textarea
                className={dashStyles.formTextarea}
                placeholder="What would you like to discuss?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error && <div style={{ fontSize: 12, color: "var(--error)", marginBottom: 8 }}>{error}</div>}
            <div className={dashStyles.modalActions}>
              <button className={dashStyles.btnOutline} onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className={dashStyles.btnGold} onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Sending…" : "Send Request"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
