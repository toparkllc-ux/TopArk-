"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import styles from "@/app/login/login.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError("Password reset isn't connected yet. Check back soon.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    setSubmitting(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span>Ark</span>
        </Link>
        <Link href="/login" className={styles.navBack}>
          ← Back to Login
        </Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.card}>
          {sent ? (
            <>
              <div className={styles.eyebrow}>Check Your Inbox</div>
              <h1 className={styles.headline}>
                RESET LINK <span className={styles.accent}>SENT.</span>
              </h1>
              <p className={styles.sub}>
                We sent a password reset link to <strong>{email}</strong>. Check your inbox
                and click the link to set a new password.
              </p>
              <div className={styles.footerNote}>
                Didn&apos;t get it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold)",
                    cursor: "pointer",
                    padding: 0,
                    font: "inherit",
                  }}
                >
                  try again
                </button>
                .
              </div>
            </>
          ) : (
            <>
              <div className={styles.eyebrow}>Forgot Password</div>
              <h1 className={styles.headline}>
                RESET YOUR <span className={styles.accent}>PASSWORD.</span>
              </h1>
              <p className={styles.sub}>
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    className={styles.formInput}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && <div className={styles.errorMsg}>{error}</div>}
                <button className={styles.btnPrimary} type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Reset Link"}
                </button>
              </form>

              <div className={styles.footerNote}>
                Remember your password? <Link href="/login">Log in</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className={styles.footer}>© 2026 TopArk. All rights reserved.</footer>
    </div>
  );
}
