"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";

export default function AppointmentModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [kind, setKind] = useState<"meeting" | "combine">("meeting");
  const [startsAt, setStartsAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!title || !startsAt) {
      setError("Title and date/time are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSubmitting(false);
      setError("You must be logged in.");
      return;
    }
    const { error: insertError } = await supabase.from("appointments").insert({
      owner_id: user.id,
      title,
      detail: detail || null,
      kind,
      starts_at: new Date(startsAt).toISOString(),
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div className={styles.modalBg} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ✕
        </button>
        <div className={styles.modalTitle}>SCHEDULE APPOINTMENT</div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Title</label>
          <input className={styles.formInput} placeholder="Advisor call, combine, etc." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type</label>
          <select className={styles.formSelect} value={kind} onChange={(e) => setKind(e.target.value as "meeting" | "combine")}>
            <option value="meeting">Meeting</option>
            <option value="combine">Combine / Event</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Date &amp; Time</label>
          <input className={styles.formInput} type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Notes</label>
          <textarea className={styles.formTextarea} value={detail} onChange={(e) => setDetail(e.target.value)} />
        </div>
        {error && <div style={{ fontSize: 12, color: "var(--error)", marginBottom: 8 }}>{error}</div>}
        <div className={styles.modalActions}>
          <button className={styles.btnOutline} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnGold} onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving…" : "Save Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
