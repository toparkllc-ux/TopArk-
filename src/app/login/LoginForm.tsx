"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError("Login isn't connected yet. Check back soon.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError("Something went wrong. Try again.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", userId)
      .single();

    const next = searchParams.get("next");
    if (next) {
      router.push(next);
    } else if (profile?.account_type === "team") {
      router.push("/team-dashboard");
    } else {
      router.push("/dashboard");
    }
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
          <div className={styles.eyebrow}>Welcome Back</div>
          <h1 className={styles.headline}>
            LOG IN TO <span className={styles.accent}>TOPARK.</span>
          </h1>
          <p className={styles.sub}>Access your dashboard, messages, and membership.</p>

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
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                className={styles.formInput}
                type="password"
                placeholder="Your password"
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
            New to TopArk? <Link href="/signup">Create an account</Link>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>© 2026 TopArk. All rights reserved.</footer>
    </div>
  );
}
