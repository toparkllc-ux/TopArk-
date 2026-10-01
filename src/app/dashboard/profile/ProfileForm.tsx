"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

// Unit conversion helpers (stored as cm/kg in DB, displayed as ft/in & lbs for athletes)
function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}
function feetInchesToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54);
}
function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462);
}
function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462);
}

const POSITIONS = [
  "Quarterback", "Running Back", "Wide Receiver", "Tight End", "Offensive Lineman",
  "Defensive Lineman", "Linebacker", "Cornerback", "Safety", "Kicker / Punter",
];

const TRACKED_FIELDS = [
  "first_name", "last_name", "position", "country", "height_feet", "weight_lbs",
  "forty_yard_dash", "bio", "highlight_url",
] as const;

export default function ProfileForm({ profile, userId }: { profile: Tables<"athlete_profiles">; userId: string }) {
  const router = useRouter();

  // Convert stored cm/kg to US display units for initial state
  const initHeight = profile.height_cm ? cmToFeetInches(profile.height_cm) : { feet: 0, inches: 0 };
  const initWeight = profile.weight_kg ? kgToLbs(profile.weight_kg) : 0;

  const [form, setForm] = useState({
    first_name: profile.first_name ?? "",
    last_name: profile.last_name ?? "",
    position: profile.position ?? "",
    country: profile.country ?? "",
    // US display units (converted back to cm/kg on save)
    height_feet: initHeight.feet > 0 || profile.height_cm ? initHeight.feet.toString() : "",
    height_inches: initHeight.feet > 0 || profile.height_cm ? initHeight.inches.toString() : "",
    weight_lbs: initWeight > 0 || profile.weight_kg ? initWeight.toString() : "",
    forty_yard_dash: profile.forty_yard_dash?.toString() ?? "",
    bio: profile.bio ?? "",
    highlight_url: profile.highlight_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [submittingVerification, setSubmittingVerification] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(profile.verification_status);

  const completeness = useMemo(() => {
    const filled = TRACKED_FIELDS.filter((key) => {
      const val = form[key as keyof typeof form];
      return val !== undefined && val !== null && String(val).trim() !== "";
    }).length;
    return Math.round((filled / TRACKED_FIELDS.length) * 100);
  }, [form]);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    // Convert US units back to metric for DB storage
    const heightCm = form.height_feet
      ? feetInchesToCm(Number(form.height_feet), Number(form.height_inches || "0"))
      : null;
    const weightKg = form.weight_lbs ? lbsToKg(Number(form.weight_lbs)) : null;

    const { error } = await supabase
      .from("athlete_profiles")
      .update({
        first_name: form.first_name,
        last_name: form.last_name,
        position: form.position || null,
        country: form.country || null,
        height_cm: heightCm,
        weight_kg: weightKg,
        forty_yard_dash: form.forty_yard_dash ? Number(form.forty_yard_dash) : null,
        bio: form.bio || null,
        highlight_url: form.highlight_url || null,
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

  async function handleSubmitVerification() {
    setSubmittingVerification(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("athlete_profiles")
      .update({ verification_status: "pending", verification_submitted_at: new Date().toISOString() })
      .eq("id", userId);
    setSubmittingVerification(false);
    if (!error) {
      setVerificationStatus("pending");
      router.refresh();
    }
  }

  const statusLabel =
    verificationStatus === "verified" ? "✓ Verified" : verificationStatus === "pending" ? "⏳ Pending Review" : "Not Verified";
  const statusColor =
    verificationStatus === "verified" ? "var(--success)" : verificationStatus === "pending" ? "var(--gold)" : "var(--gray)";

  return (
    <div className={styles.grid2} style={{ gap: 24 }}>
      <div className={styles.card}>
        <div className={styles.eyebrow}>Athlete Profile</div>
        <div className={styles.cardTitle}>YOUR INFO</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className={styles.formGroup} style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label className={styles.formLabel}>First Name</label>
              <input
                className={styles.formInput}
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className={styles.formLabel}>Last Name</label>
              <input
                className={styles.formInput}
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Position</label>
            <select
              className={styles.formSelect}
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            >
              <option value="">Select position</option>
              {POSITIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Country</label>
            <input
              className={styles.formInput}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div className={styles.formGroup} style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label className={styles.formLabel}>Height</label>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    className={styles.formInput}
                    type="number"
                    min="0"
                    max="8"
                    placeholder="ft"
                    value={form.height_feet}
                    onChange={(e) => setForm({ ...form, height_feet: e.target.value })}
                    style={{ paddingRight: 28 }}
                  />
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--gray)", pointerEvents: "none" }}>ft</span>
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    className={styles.formInput}
                    type="number"
                    min="0"
                    max="11"
                    placeholder="in"
                    value={form.height_inches}
                    onChange={(e) => setForm({ ...form, height_inches: e.target.value })}
                    style={{ paddingRight: 28 }}
                  />
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--gray)", pointerEvents: "none" }}>in</span>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <label className={styles.formLabel}>Weight</label>
              <input
                className={styles.formInput}
                type="number"
                min="0"
                placeholder="lbs"
                value={form.weight_lbs}
                onChange={(e) => setForm({ ...form, weight_lbs: e.target.value })}
                style={{ paddingRight: 36 }}
              />
              <span style={{ position: "absolute", right: 10, bottom: 10, fontSize: 11, color: "var(--gray)", pointerEvents: "none" }}>lbs</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>40-Yard Dash (seconds)</label>
            <input
              className={styles.formInput}
              type="number"
              step="0.01"
              value={form.forty_yard_dash}
              onChange={(e) => setForm({ ...form, forty_yard_dash: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Film / Highlight Link</label>
            <input
              className={styles.formInput}
              placeholder="YouTube or Hudl link"
              value={form.highlight_url}
              onChange={(e) => setForm({ ...form, highlight_url: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bio</label>
            <textarea
              className={styles.formTextarea}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          {message && <div style={{ fontSize: 12, color: "var(--gold)" }}>{message}</div>}
          <button className={styles.btnGold} style={{ width: "100%" }} onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.eyebrow}>Status</div>
        <div className={styles.cardTitle}>PROFILE HEALTH</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span style={{ fontSize: 13 }}>Verification</span>
            <span style={{ color: statusColor, fontSize: 12, fontWeight: 600 }}>{statusLabel}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <span style={{ fontSize: 13 }}>Profile Completeness</span>
            <span style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600 }}>{completeness}%</span>
          </div>
          <div style={{ background: "var(--border)", height: 4, borderRadius: 2 }}>
            <div style={{ background: "var(--gold)", height: 4, width: `${completeness}%`, borderRadius: 2 }} />
          </div>

          {verificationStatus === "unverified" && (
            <button className={styles.btnGold} style={{ marginTop: 8 }} onClick={handleSubmitVerification} disabled={submittingVerification}>
              {submittingVerification ? "Submitting…" : "Submit for Verification"}
            </button>
          )}
          {verificationStatus === "pending" && (
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderLeft: "3px solid var(--gold)", padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: "var(--gray)" }}>
                ⏳ Your verification request is under review by the TopArk team.
              </div>
            </div>
          )}
          {completeness < 100 && (
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderLeft: "3px solid var(--gold)", padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: "var(--gray)" }}>
                💡 Complete every field to reach 100% — fuller profiles get more team views.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
