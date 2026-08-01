import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/queries";
import styles from "@/components/dashboard/dashboard.module.css";

const SAMPLE_MESSAGES = [
  { from: "Berlin Thunder FC 🇩🇪", preview: "We've reviewed your film and would love to schedule a formal evaluation call...", time: "2h ago", unread: true, avatar: "🏈" },
  { from: "Paris Musketeers 🇫🇷", preview: "Hey, coach saw your highlights — interested in a call this week to discuss fit", time: "5h ago", unread: true, avatar: "🇫🇷" },
  { from: "Vienna Vikings 🇦🇹", preview: "Your verified profile stood out to our staff. We'd like to extend an invitation...", time: "1d ago", unread: true, avatar: "🇦🇹" },
  { from: "Stockholm Commanders 🇸🇪", preview: "Thanks for your interest, we'll be in touch after combine season", time: "2d ago", unread: false, avatar: "🇸🇪" },
  { from: "TopArk Support", preview: "Your profile has been verified and you now appear in priority search results.", time: "3d ago", unread: false, avatar: "⚡" },
];

export default async function MessagesPage() {
  const current = await getCurrentUser();
  const isAthlete = current?.accountType === "athlete";
  const tier = isAthlete ? current.profile.membership_tier : "free";
  const verified = isAthlete && current.profile.verification_status === "verified";
  const isPaid = tier !== "free";

  return (
    <>
      <div className={styles.card} style={{ marginBottom: 16 }}>
        <div className={styles.eyebrow}>Inbox</div>
        <div className={styles.cardTitle}>TEAM MESSAGES</div>
        <div className={styles.msgLimitBar} style={{ maxWidth: 340 }}>
          <div className={styles.msgLimitLabel}>
            <span style={{ fontSize: 12 }}>Weekly messages from teams</span>
            <span style={{ color: "var(--gold)", fontSize: 12 }}>{isPaid ? "Unlimited" : "Up to 4/month"}</span>
          </div>
          <div className={styles.msgLimitTrack}>
            <div
              className={styles.msgLimitFill}
              style={{ width: isPaid ? "100%" : "25%", background: isPaid ? "var(--success)" : "var(--gold)" }}
            />
          </div>
        </div>
        <p style={{ fontSize: 12, color: "var(--gray)", marginTop: 4 }}>
          {isPaid
            ? `You have unlimited messages on your ${tier === "elite" ? "Elite" : "Pro Ark"} plan.`
            : "Free members receive up to 4 messages a month from teams."}
        </p>
        {!verified && (
          <div
            style={{
              marginTop: 12,
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--gold)",
              padding: "10px 14px",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--light)", lineHeight: 1.5 }}>
              ⚠️ <strong style={{ color: "var(--gold)" }}>Verification Required</strong> — All
              athletes must be verified before sending messages to teams and coaches. Complete
              your verification in{" "}
              <Link href="/dashboard/profile" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                My Profile
              </Link>{" "}
              to unlock messaging.
            </div>
          </div>
        )}
      </div>
      <div className={styles.card}>
        {SAMPLE_MESSAGES.map((msg) => (
          <div className={`${styles.msgItem} ${msg.unread ? styles.msgUnread : ""}`} key={msg.from}>
            {msg.unread ? <div className={styles.msgUnreadDot} /> : <div style={{ width: 6 }} />}
            <div className={styles.msgAvatar}>{msg.avatar}</div>
            <div className={styles.msgInfo}>
              <div className={styles.msgFrom}>{msg.from}</div>
              <div className={styles.msgPreview}>{msg.preview}</div>
            </div>
            <div className={styles.msgTime}>{msg.time}</div>
          </div>
        ))}
      </div>
    </>
  );
}
