"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

type NewsPost = Tables<"news_posts">;

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const EMPTY_FORM = { id: "", title: "", slug: "", tag: "Announcement", excerpt: "", body: "" };

export default function ContentClient({ initialPosts }: { initialPosts: NewsPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState<typeof EMPTY_FORM | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function startCreate() {
    setError("");
    setForm({ ...EMPTY_FORM });
  }

  function startEdit(post: NewsPost) {
    setError("");
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      tag: post.tag,
      excerpt: post.excerpt,
      body: post.body,
    });
  }

  async function handleSave(publish: boolean) {
    if (!form) return;
    if (!form.title.trim() || !form.excerpt.trim() || !form.body.trim()) {
      setError("Title, excerpt, and body are required.");
      return;
    }
    setSaving(true);
    setError("");
    const supabase = createClient();
    const slug = form.slug.trim() || slugify(form.title);
    const payload = {
      title: form.title.trim(),
      slug,
      tag: form.tag.trim() || "Announcement",
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      ...(publish ? { status: "published", published_at: new Date().toISOString() } : {}),
    };

    const { data: saved, error: saveError } = form.id
      ? await supabase.from("news_posts").update(payload).eq("id", form.id).select().single()
      : await supabase
          .from("news_posts")
          .insert(publish ? payload : { ...payload, status: "draft" })
          .select()
          .single();

    setSaving(false);
    if (saveError || !saved) {
      setError(saveError?.message ?? "Failed to save article.");
      return;
    }
    setPosts((prev) =>
      form.id ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev]
    );
    setForm(null);
  }

  async function handleTogglePublish(post: NewsPost) {
    setBusyId(post.id);
    const supabase = createClient();
    const nextStatus = post.status === "published" ? "draft" : "published";
    const { data: updated } = await supabase
      .from("news_posts")
      .update({
        status: nextStatus,
        ...(nextStatus === "published" && !post.published_at ? { published_at: new Date().toISOString() } : {}),
      })
      .eq("id", post.id)
      .select()
      .single();
    if (updated) setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setBusyId(null);
  }

  async function handleDelete(post: NewsPost) {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setBusyId(post.id);
    const supabase = createClient();
    await supabase.from("news_posts").delete().eq("id", post.id);
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    setBusyId(null);
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button className={styles.btnGold} style={{ padding: "10px 22px", fontSize: 12 }} onClick={startCreate}>
          + Create New Article
        </button>
      </div>

      {form && (
        <div className={styles.card} style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className={styles.cardTitle}>{form.id ? "EDIT ARTICLE" : "NEW ARTICLE"}</div>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Slug (auto-generated from title if left blank)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Category (e.g. 🏈 Featured, 🌍 International)"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Excerpt (shown on cards)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            style={inputStyle}
          />
          <textarea
            placeholder="Full article body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={8}
            style={inputStyle}
          />
          {error && <div style={{ fontSize: 12, color: "var(--error)" }}>{error}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnGold} style={{ padding: "10px 20px", fontSize: 12 }} onClick={() => handleSave(true)} disabled={saving}>
              Save &amp; Publish
            </button>
            <button className={styles.btnOutline} style={{ padding: "10px 20px", fontSize: 12 }} onClick={() => handleSave(false)} disabled={saving}>
              Save as Draft
            </button>
            <button className={styles.btnSm} onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {posts.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No articles yet. Create your first one above.</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                  </td>
                  <td>{post.tag}</td>
                  <td>
                    {post.status === "published" && post.published_at
                      ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "Draft"}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${post.status === "published" ? styles.statusPublished : styles.statusDraft}`}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{post.status === "published" ? post.views.toLocaleString() : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className={styles.btnSm} onClick={() => startEdit(post)} disabled={busyId === post.id}>
                        Edit
                      </button>
                      <button className={styles.btnSm} onClick={() => handleTogglePublish(post)} disabled={busyId === post.id}>
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button className={styles.btnSm} onClick={() => handleDelete(post)} disabled={busyId === post.id}>
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
