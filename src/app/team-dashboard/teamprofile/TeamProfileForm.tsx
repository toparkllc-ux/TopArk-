"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

export default function TeamProfileForm({ profile, userId }: { profile: Tables<"team_profiles">; userId: string }) {
  const router = useRouter();
  const [form, setForm] = useState({
    team_name: profile.team_name ?? "",
    league: profile.league ?? "",
    country: profile.country ?? "",
    contact_name: profile.contact_name ?? "",
    bio: profile.bio ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase
      .from("team_profiles")
      .update({
        team_name: form.team_name,
        league: form.league || null,
        country: form.country || null,
        contact_name: form.contact_name,
        bio: form.bio || null,
      })
      .eq("id", userId);
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Profile saved.");
    router.refresh();
  }

  return (
    <div className={styles.grid2} style={{ gap: 24 }}>
      <div className={styles.card}>
        <div className={styles.eyebrow}>Team Info</div>
        <div className={styles.cardTitle}>YOUR PROFILE</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Team Name</label>
            <input className={styles.formInput} value={form.team_name} onChange={(e) => setForm({ ...form, team_name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>League / Division</label>
            <input className={styles.formInput} value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Country</label>
            <input className={styles.formInput} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Coach / Contact Name</label>
            <input className={styles.formInput} value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Team Bio</label>
            <textarea className={styles.formTextarea} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          {message && <div style={{ fontSize: 12, color: "var(--gold)" }}>{message}</div>}
          <button className={styles.btnGold} style={{ width: "100%" }} onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.eyebrow}>Partnership</div>
        <div className={styles.cardTitle}>TOPARK STATUS</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            ["Partner Status", "✓ Active"],
            ["Athlete Database Access", "✓ Full Access"],
            ["Direct Messaging", "✓ Unlimited"],
            ["Interview Requests", "✓ Unlimited"],
            ["Combine Access", "✓ Priority"],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 13 }}>{label}</span>
              <span style={{ color: "var(--success)", fontSize: 12, fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
