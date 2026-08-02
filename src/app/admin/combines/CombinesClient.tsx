"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

type CombineEvent = Tables<"combine_events"> & { registeredCount: number };

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const EMPTY_FORM = {
  id: "",
  title: "",
  slug: "",
  location: "",
  description: "",
  eventDate: "",
  registrationDeadline: "",
  capacity: "",
  status: "draft",
};

export default function CombinesClient({ initialEvents }: { initialEvents: CombineEvent[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState<typeof EMPTY_FORM | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function startCreate() {
    setError("");
    setForm({ ...EMPTY_FORM });
  }

  function startEdit(event: CombineEvent) {
    setError("");
    setForm({
      id: event.id,
      title: event.title,
      slug: event.slug,
      location: event.location,
      description: event.description,
      eventDate: toLocalInput(event.event_date),
      registrationDeadline: toLocalInput(event.registration_deadline),
      capacity: event.capacity != null ? String(event.capacity) : "",
      status: event.status,
    });
  }

  async function handleSave() {
    if (!form) return;
    if (!form.title.trim() || !form.location.trim() || !form.description.trim() || !form.eventDate) {
      setError("Title, location, description, and event date are required.");
      return;
    }
    setSaving(true);
    setError("");
    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      location: form.location.trim(),
      description: form.description.trim(),
      event_date: new Date(form.eventDate).toISOString(),
      registration_deadline: form.registrationDeadline ? new Date(form.registrationDeadline).toISOString() : null,
      capacity: form.capacity ? Number(form.capacity) : null,
      status: form.status,
    };

    const { data: saved, error: saveError } = form.id
      ? await supabase.from("combine_events").update(payload).eq("id", form.id).select().single()
      : await supabase.from("combine_events").insert(payload).select().single();

    setSaving(false);
    if (saveError || !saved) {
      setError(saveError?.message ?? "Failed to save combine.");
      return;
    }
    setEvents((prev) =>
      form.id
        ? prev.map((e) => (e.id === saved.id ? { ...saved, registeredCount: e.registeredCount } : e))
        : [{ ...saved, registeredCount: 0 }, ...prev]
    );
    setForm(null);
  }

  async function handleStatusChange(event: CombineEvent, status: string) {
    setBusyId(event.id);
    const supabase = createClient();
    const { data: updated } = await supabase.from("combine_events").update({ status }).eq("id", event.id).select().single();
    if (updated) setEvents((prev) => prev.map((e) => (e.id === updated.id ? { ...updated, registeredCount: e.registeredCount } : e)));
    setBusyId(null);
  }

  async function handleDelete(event: CombineEvent) {
    if (!confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    setBusyId(event.id);
    const supabase = createClient();
    await supabase.from("combine_events").delete().eq("id", event.id);
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    setBusyId(null);
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button className={styles.btnGold} style={{ padding: "10px 22px", fontSize: 12 }} onClick={startCreate}>
          + Create New Combine
        </button>
      </div>

      {form && (
        <div className={styles.card} style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className={styles.cardTitle}>{form.id ? "EDIT COMBINE" : "NEW COMBINE"}</div>
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
          <input
            placeholder="Slug (auto-generated from title if left blank)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Location (e.g. Georgetown, TX)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            style={inputStyle}
          />
          <label style={labelStyle}>
            Event date &amp; time
            <input
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Registration deadline (optional)
            <input
              type="datetime-local"
              value={form.registrationDeadline}
              onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Capacity (optional, leave blank for unlimited)
            <input
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Status
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          {error && <div style={{ fontSize: 12, color: "var(--error)" }}>{error}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnGold} style={{ padding: "10px 20px", fontSize: 12 }} onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button className={styles.btnSm} onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {events.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No combines yet. Create your first one above.</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <strong>{event.title}</strong>
                  </td>
                  <td>{event.location}</td>
                  <td>{new Date(event.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td>
                    {event.registeredCount}
                    {event.capacity != null ? ` / ${event.capacity}` : ""}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${event.status === "published" ? styles.statusPublished : styles.statusDraft}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button className={styles.btnSm} onClick={() => startEdit(event)} disabled={busyId === event.id}>
                        Edit
                      </button>
                      {event.status !== "published" && (
                        <button className={styles.btnSm} onClick={() => handleStatusChange(event, "published")} disabled={busyId === event.id}>
                          Publish
                        </button>
                      )}
                      {event.status === "published" && (
                        <button className={styles.btnSm} onClick={() => handleStatusChange(event, "closed")} disabled={busyId === event.id}>
                          Close
                        </button>
                      )}
                      <button className={styles.btnSm} onClick={() => handleDelete(event)} disabled={busyId === event.id}>
                        Delete
                      </button>
                    </div>
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

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 11,
  color: "var(--gray)",
  fontFamily: "var(--font-mono)",
  letterSpacing: 0.5,
  textTransform: "uppercase",
};
