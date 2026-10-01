"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import styles from "@/app/login/login.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    // Redirect to dashboard after successful reset
    router.push("/dashboard");
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span>Ark</span>
        </Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>New Password</div>
          <h1 className={styles.headline}>
            SET YOUR <span className={styles.accent}>PASSWORD.</span>
          </h1>
          <p className={styles.sub}>Choose a strong password for your TopArk account.</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>New Password</label>
              <input
                className={styles.formInput}
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input
                className={styles.formInput}
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {error && <div className={styles.errorMsg}>{error}</div>}
            <button className={styles.btnPrimary} type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Set New Password"}
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>© 2026 TopArk. All rights reserved.</footer>
    </div>
  );
}
