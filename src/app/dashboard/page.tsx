import { getCurrentUser } from "@/lib/supabase/queries";
import styles from "@/components/dashboard/dashboard.module.css";

const SAMPLE_MESSAGES = [
  { from: "Berlin Thunder FC", flag: "🏈", preview: "We've reviewed your film and would love to schedule a formal eval...", time: "2h ago", unread: true },
  { from: "Paris Musketeers", flag: "🇫🇷", preview: "Hey, coach saw your highlights — interested in a call this week", time: "5h ago", unread: true },
  { from: "Stockholm Commanders", flag: "🇸🇪", preview: "Thanks for your interest, we'll be in touch after combine season", time: "2d ago", unread: false },
  { from: "TopArk Support", flag: "⚡", preview: "Your profile has been verified! You now appear in priority search results.", time: "3d ago", unread: false },
];

const SAMPLE_SCHEDULE = [
  { day: "18", month: "Jun", title: "Interview — Berlin Thunder", detail: "🇩🇪 Germany · Wide Receiver eval", time: "2:00 PM", kind: "interview" as const },
  { day: "22", month: "Jun", title: "TopArk Advisor Call", detail: "Monthly strategy session", time: "10:00 AM", kind: "meeting" as const },
  { day: "28", month: "Jun", title: "TopArk Combine — Georgetown TX", detail: "International exposure event", time: "8:00 AM", kind: "combine" as const },
];

const kindClass = { interview: "", meeting: styles.apptItemMeeting, combine: styles.apptItemCombine };
const kindColor = { interview: undefined, meeting: "var(--success)", combine: "var(--error)" };

export default async function DashboardOverviewPage() {
  const current = await getCurrentUser();
  const isPaid = current?.accountType === "athlete" && current.profile.membership_tier !== "free";

  return (
    <>
      <div className={styles.grid4} style={{ marginBottom: 24 }}>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Messages</div>
          <div className={styles.statNum}>4</div>
          <div className={styles.statLabel}>From teams this week</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Interviews</div>
          <div className={styles.statNum}>2</div>
          <div className={styles.statLabel}>Scheduled upcoming</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Profile Views</div>
          <div className={styles.statNum}>38</div>
          <div className={styles.statLabel}>Teams viewed your profile</div>
          <div className={styles.statChange}>↑ 12 this week</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Countries</div>
          <div className={styles.statNum}>3</div>
          <div className={styles.statLabel}>Teams from different countries</div>
        </div>
      </div>

      <div className={styles.grid2} style={{ gap: 24 }}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Upcoming</div>
          <div className={styles.cardTitle}>YOUR SCHEDULE</div>
          <div className={styles.apptList} style={{ marginTop: 16 }}>
            {SAMPLE_SCHEDULE.map((item) => (
              <div className={`${styles.apptItem} ${kindClass[item.kind]}`} key={item.title}>
                <div className={styles.apptDate}>
                  <div className={styles.apptDateDay} style={{ color: kindColor[item.kind] }}>
                    {item.day}
                  </div>
                  <div className={styles.apptDateMonth}>{item.month}</div>
                </div>
                <div className={styles.apptDivider} />
                <div className={styles.apptInfo}>
                  <div className={styles.apptTitle}>{item.title}</div>
                  <div className={styles.apptDetail}>{item.detail}</div>
                </div>
                <div className={styles.apptTime}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.eyebrow}>Inbox</div>
          <div className={styles.cardTitle} style={{ marginBottom: 4 }}>
            RECENT MESSAGES
          </div>
          <div className={styles.msgLimitBar}>
            <div className={styles.msgLimitLabel}>
              <span>Weekly message limit</span>
              <span style={{ color: "var(--gold)" }}>{isPaid ? "Unlimited" : "Up to 4/month"}</span>
            </div>
            <div className={styles.msgLimitTrack}>
              <div
                className={styles.msgLimitFill}
                style={{ width: isPaid ? "100%" : "25%", background: isPaid ? "var(--success)" : "var(--gold)" }}
              />
            </div>
          </div>
          {SAMPLE_MESSAGES.map((msg) => (
            <div className={`${styles.msgItem} ${msg.unread ? styles.msgUnread : ""}`} key={msg.from}>
              {msg.unread ? <div className={styles.msgUnreadDot} /> : <div style={{ width: 6 }} />}
              <div className={styles.msgAvatar}>{msg.flag}</div>
              <div className={styles.msgInfo}>
                <div className={styles.msgFrom}>{msg.from}</div>
                <div className={styles.msgPreview}>{msg.preview}</div>
              </div>
              <div className={styles.msgTime}>{msg.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
