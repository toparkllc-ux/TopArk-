"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { createClient } from "@/lib/supabase/client";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
};

export default function NotificationBell({
  userId,
  accountType,
}: {
  userId: string;
  accountType: "athlete" | "team";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(30);
      if (active && data) setNotifications(data);
    })();

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleOpenNotification(n: Notification) {
    if (!n.read_at) {
      const supabase = createClient();
      await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", n.id);
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read_at: new Date().toISOString() } : x)));
    }
    setOpen(false);
    const base = accountType === "athlete" ? "/dashboard" : "/team-dashboard";
    if (n.link?.startsWith("/messages/")) {
      router.push(`${base}/messages?c=${n.link.split("/").pop()}`);
    } else if (n.link?.startsWith("/interviews/")) {
      router.push(accountType === "athlete" ? "/dashboard/calendar" : "/team-dashboard/interviews");
    }
  }

  async function handleMarkAllRead() {
    const supabase = createClient();
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", userId).is("read_at", null);
    setNotifications((prev) => prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
  }

  return (
    <div style={{ position: "relative" }} ref={wrapRef}>
      <div className={styles.topbarNotif} onClick={() => setOpen((v) => !v)}>
        🔔{unreadCount > 0 && <span className={styles.notifDot} />}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 340,
            maxHeight: 420,
            overflowY: "auto",
            background: "var(--charcoal)",
            border: "1px solid var(--border)",
            zIndex: 200,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: 1 }}>NOTIFICATIONS</div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{ background: "none", border: "none", color: "var(--gold)", fontSize: 11, cursor: "pointer" }}
              >
                Mark all read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div style={{ padding: 20, fontSize: 12, color: "var(--gray)" }}>No notifications yet.</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleOpenNotification(n)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  background: n.read_at ? "transparent" : "rgba(245,196,0,0.06)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: n.read_at ? "var(--white)" : "var(--gold)" }}>
                  {n.title}
                </div>
                {n.body && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--gray)",
                      marginTop: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.body}
                  </div>
                )}
                <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-mono)", marginTop: 4 }}>
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
