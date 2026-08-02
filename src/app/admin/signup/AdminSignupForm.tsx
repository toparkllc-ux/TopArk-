"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/login/login.module.css";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function AdminSignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!supabaseConfigured) {
      setError("Not connected yet.");
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setSubmitting(false);
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      const { data: isAdmin } = await supabase.rpc("claim_admin");
      setSubmitting(false);
      if (isAdmin) {
        router.push("/admin");
        return;
      }
      setError("This email isn't on the founders allowlist.");
      return;
    }

    setSubmitting(false);
    setDone(true);
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
            ADMIN <span className={styles.accent}>ACCESS.</span>
          </h1>
          <p className={styles.sub}>
            Create your login. Admin access is only granted if your email is on the founders
            allowlist.
          </p>

          {done ? (
            <p style={{ fontSize: 13, color: "var(--gold)" }}>
              Check your email to confirm your account, then log in at{" "}
              <Link href="/admin/login" style={{ color: "var(--gold)" }}>
                /admin/login
              </Link>
              .
            </p>
          ) : (
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
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className={styles.errorMsg}>{error}</div>}
              <button className={styles.btnPrimary} type="submit" disabled={submitting}>
                {submitting ? "Creating…" : "Create Admin Login"}
              </button>
            </form>
          )}

          <div className={styles.footerNote}>
            Already have a login? <Link href="/admin/login">Log in</Link>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>© 2026 TopArk. All rights reserved.</footer>
    </div>
  );
}
