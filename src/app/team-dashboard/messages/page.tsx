import styles from "@/components/dashboard/dashboard.module.css";

const MESSAGES = [
  { from: "Darius M. — Wide Receiver", preview: "Hey coach, I wanted to follow up on my film. I have new footage from last week's showcase that I think you'll want to see...", time: "1h ago", unread: true, avatar: "🏈" },
  { from: "Jaylen R. — Running Back", preview: "Interested in your program. I played two seasons in Mexico and looking for Europe next.", time: "3h ago", unread: true, avatar: "🏈" },
  { from: "Marcus T. — Linebacker", preview: "Thanks for the interview slot, looking forward to it.", time: "6h ago", unread: true, avatar: "🏈" },
  { from: "Brandon K. — Quarterback", preview: "Sending over my updated highlight reel this week.", time: "1d ago", unread: false, avatar: "🏈" },
  { from: "TopArk Team", preview: "3 new athletes matching your roster needs have been added to the platform this week.", time: "1d ago", unread: false, avatar: "⚡" },
];

export default function TeamMessagesPage() {
  return (
    <div className={styles.card}>
      <div className={styles.eyebrow}>Inbox</div>
      <div className={styles.cardTitle}>ATHLETE MESSAGES</div>
      <div style={{ marginTop: 16 }}>
        {MESSAGES.map((msg) => (
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
    </div>
  );
}
