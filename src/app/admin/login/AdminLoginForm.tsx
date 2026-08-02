"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/login/login.module.css";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!supabaseConfigured) {
      setError("Not connected yet.");
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setSubmitting(false);
      setError(signInError.message);
      return;
    }

    const { data: isAdmin } = await supabase.rpc("claim_admin");
    setSubmitting(false);
    if (!isAdmin) {
      setError("This account doesn't have admin access.");
      await supabase.auth.signOut();
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span>Ark</span>
        </Link>
        <Link href="/" className={styles.navBack}>
          ← Back to TopArk
        </Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Founders Only</div>
          <h1 className={styles.headline}>
            ADMIN <span className={styles.accent}>LOG IN.</span>
          </h1>
          <p className={styles.sub}>Access the TopArk admin panel.</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                className={styles.formInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                className={styles.formInput}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className={styles.errorMsg}>{error}</div>}
            <button className={styles.btnPrimary} type="submit" disabled={submitting}>
              {submitting ? "Logging In…" : "Log In"}
            </button>
          </form>

          <div className={styles.footerNote}>
            No admin login yet? <Link href="/admin/signup">Create one</Link>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>© 2026 TopArk. All rights reserved.</footer>
    </div>
  );
}
