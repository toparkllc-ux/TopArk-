"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "@/app/combines/combines.module.css";

type Viewer = "athlete" | "team" | "guest";

export default function CombineRegisterButton({
  eventId,
  viewer,
  initialRegistered,
  closed,
  full,
}: {
  eventId: string;
  viewer: Viewer;
  initialRegistered: boolean;
  closed: boolean;
  full: boolean;
}) {
  const router = useRouter();
  const [registered, setRegistered] = useState(initialRegistered);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: rpcError } = await supabase.rpc("register_for_combine", { p_event_id: eventId });
    setLoading(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setRegistered(true);
    router.refresh();
  }

  async function handleCancel() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: rpcError } = await supabase.rpc("cancel_combine_registration", { p_event_id: eventId });
    setLoading(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setRegistered(false);
    router.refresh();
  }

  if (viewer === "guest") {
    return (
      <a href="/signup" className={styles.btnPrimary}>
        Sign Up to Register
      </a>
    );
  }

  if (viewer === "team") {
    return <div className={styles.registerText}>Combine registration is open to athlete accounts.</div>;
  }

  if (registered) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
        <div className={styles.registerConfirmed}>✓ You&apos;re registered — check your calendar for details.</div>
        <button className={styles.btnSecondary} onClick={handleCancel} disabled={loading}>
          {loading ? "…" : "Cancel Registration"}
        </button>
        {error && <div className={styles.registerError}>{error}</div>}
      </div>
    );
  }

  return (
    <div>
      <button className={styles.btnPrimary} onClick={handleRegister} disabled={loading || closed || full}>
        {loading ? "…" : full ? "Combine Full" : closed ? "Registration Closed" : "Register for This Combine"}
      </button>
      {error && <div className={styles.registerError}>{error}</div>}
    </div>
  );
}
