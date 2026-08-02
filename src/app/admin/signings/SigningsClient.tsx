"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";

type Option = { id: string; name: string };
type SigningRow = {
  id: string;
  athleteId: string;
  teamId: string;
  athleteName: string;
  teamName: string;
  signedAt: string;
  notes: string | null;
};

export default function SigningsClient({
  initialRows,
  athleteOptions,
  teamOptions,
}: {
  initialRows: SigningRow[];
  athleteOptions: Option[];
  teamOptions: Option[];
}) {
  const [rows, setRows] = useState(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [athleteId, setAthleteId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [signedAt, setSignedAt] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleCreate() {
    if (!athleteId || !teamId) {
      setError("Select both an athlete and a team.");
      return;
    }
    setSaving(true);
    setError("");
    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("signings")
      .insert({ athlete_id: athleteId, team_id: teamId, signed_at: signedAt, notes: notes.trim() || null })
      .select()
      .single();
    setSaving(false);
    if (insertError || !data) {
      setError(insertError?.message ?? "Failed to log signing.");
      return;
    }
    const athlete = athleteOptions.find((a) => a.id === athleteId);
    const team = teamOptions.find((t) => t.id === teamId);
    setRows((prev) => [
      {
        id: data.id,
        athleteId,
        teamId,
        athleteName: athlete?.name ?? "Unknown Athlete",
        teamName: team?.name ?? "Unknown Team",
        signedAt: data.signed_at,
        notes: data.notes,
      },
      ...prev,
    ]);
    setAthleteId("");
    setTeamId("");
    setNotes("");
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this signing record?")) return;
    setBusyId(id);
    const supabase = createClient();
    await supabase.from("signings").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    setBusyId(null);
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button className={styles.btnGold} style={{ padding: "10px 22px", fontSize: 12 }} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ Log a Signing"}
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className={styles.cardTitle}>NEW SIGNING</div>
          <select value={athleteId} onChange={(e) => setAthleteId(e.target.value)} style={inputStyle}>
            <option value="">Select athlete…</option>
            {athleteOptions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <select value={teamId} onChange={(e) => setTeamId(e.target.value)} style={inputStyle}>
            <option value="">Select team…</option>
            {teamOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <input type="date" value={signedAt} onChange={(e) => setSignedAt(e.target.value)} style={inputStyle} />
          <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={inputStyle} />
          {error && <div style={{ fontSize: 12, color: "var(--error)" }}>{error}</div>}
          <div>
            <button className={styles.btnGold} style={{ padding: "10px 20px", fontSize: 12 }} onClick={handleCreate} disabled={saving}>
              {saving ? "Saving…" : "Save Signing"}
            </button>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {rows.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No signings logged yet.</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Athlete</th>
                <th>Team</th>
                <th>Date</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.athleteName}</strong>
                  </td>
                  <td>{r.teamName}</td>
                  <td>{new Date(r.signedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td>{r.notes ?? "—"}</td>
                  <td>
                    <button className={styles.btnSm} onClick={() => handleDelete(r.id)} disabled={busyId === r.id}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--border)",
  color: "var(--white)",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  padding: "11px 14px",
  outline: "none",
  width: "100%",
  resize: "vertical",
};
