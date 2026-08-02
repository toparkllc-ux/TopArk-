import { getCurrentUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import CommunityChatClient from "@/components/community/CommunityChatClient";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function CommunityPage() {
  const current = await getCurrentUser();
  const isAthlete = current?.accountType === "athlete";
  const isLocked = !isAthlete || current.profile.membership_tier === "free";

  const supabase = await createClient();
  const { data: rooms } = await supabase.from("chat_rooms").select("*").order("sort_order");

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div className={styles.eyebrow}>Members Only</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1 }}>
          COMMUNITY CHAT <span style={{ color: "var(--gold)" }}>ROOMS</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Private &amp; safe. Elite and Pro Ark members only. Real athletes, real conversations.
        </div>
      </div>
      <div className={isLocked ? styles.lockedFeature : ""}>
        {isLocked && (
          <div className={styles.lockedOverlay}>
            <div className={styles.lockedIcon}>🔒</div>
            <div className={styles.lockedTitle}>ELITE FEATURE</div>
            <div className={styles.lockedSub}>
              Community chat rooms are available to Elite and Pro Ark members.
            </div>
            <a href="/dashboard/membership">
              <button className={styles.upgradeBtn}>Upgrade Plan</button>
            </a>
          </div>
        )}
        {current && (
          <CommunityChatClient
            rooms={rooms ?? []}
            myId={current.user.id}
            canSend={!isLocked}
            cantSendReason="Community chat is available to Elite and Pro Ark members — upgrade to join the conversation."
          />
        )}
      </div>
    </>
  );
}
