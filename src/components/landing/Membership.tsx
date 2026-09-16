import Link from "next/link";
import styles from "./landing.module.css";

export default function Membership() {
  return (
    <section className={`${styles.section} ${styles.membership}`} id="membership">
      <div className={styles.membershipInner}>
        <div className={styles.sectionEyebrow}>Membership</div>
        <h2 className={styles.sectionHeadline}>
          CHOOSE YOUR <span className={styles.accent}>LEVEL.</span>
        </h2>
        <p className={styles.membershipSub}>
          Start free and get discovered. Upgrade to TopArk Elite and unlock direct team
          access, priority placement, and exclusive combine invites.
        </p>
        <div className={styles.plans}>
          {/* FREE */}
          <div className={styles.plan}>
            <div className={styles.planName}>FREE</div>
            <div className={styles.planPrice}>
              <span className={styles.planPriceNum}>$0</span>
              <span className={styles.planPricePeriod}>/ forever</span>
            </div>
            <p className={styles.planDesc}>
              Get started, build your profile, and get visible to international teams
              at no cost.
            </p>
            <ul className={styles.planFeatures}>
              <li>Basic athlete profile</li>
              <li>Appear in team search results</li>
              <li className={styles.locked}>Interview requests (paid plans only)</li>
              <li>Access to TopArk news &amp; updates</li>
              <li>Up to 4 messages/month from teams</li>
              <li className={styles.locked}>Unlimited direct messaging</li>
              <li className={styles.locked}>Priority placement matching</li>
              <li className={styles.locked}>Exclusive combine invitations</li>
              <li className={styles.locked}>Film &amp; highlight reel uploads</li>
              <li className={styles.locked}>Verified badge on profile</li>
              <li className={styles.locked}>Community chat rooms</li>
            </ul>
            <Link href="/signup">
              <button className={`${styles.btnSecondary} ${styles.planCta}`}>
                Get Started Free
              </button>
            </Link>
          </div>

          {/* ELITE */}
          <div className={`${styles.plan} ${styles.planFeatured}`}>
            <div className={styles.planBadge}>⚡ Most Popular</div>
            <div className={styles.planName}>ELITE</div>
            <div className={styles.planPrice}>
              <span className={styles.planPriceNum}>$14.99</span>
              <span className={styles.planPricePeriod}>/ month</span>
            </div>
            <p className={styles.planDesc}>
              Everything a serious athlete needs to get signed — direct access,
              priority visibility, and full profile tools.
            </p>
            <ul className={styles.planFeatures}>
              <li>Full verified athlete profile</li>
              <li>Priority placement in team search</li>
              <li>Unlimited interview requests</li>
              <li>Direct messaging with coaches &amp; teams</li>
              <li>Film &amp; highlight reel uploads (up to 5)</li>
              <li>Verified badge on profile</li>
              <li>Exclusive combine invitations</li>
              <li>Monthly placement report</li>
              <li>Community chat rooms</li>
              <li className={styles.locked}>Advisor meetings (Pro Ark only)</li>
            </ul>
            <Link href="/signup">
              <button className={`${styles.btnPrimary} ${styles.planCta}`}>
                Join Elite — $14.99/mo
              </button>
            </Link>
          </div>

          {/* PRO ARK */}
          <div className={styles.plan}>
            <div className={`${styles.planBadge} ${styles.planBadgeAlt}`}>
              👑 Top Tier
            </div>
            <div className={styles.planName}>PRO ARK</div>
            <div className={styles.planPrice}>
              <span className={styles.planPriceNum}>$34.99</span>
              <span className={styles.planPricePeriod}>/ month</span>
            </div>
            <p className={styles.planDesc}>
              Full white-glove service. A TopArk advisor actively works your placement
              alongside you.
            </p>
            <ul className={styles.planFeatures}>
              <li>Everything in Elite</li>
              <li>Unlimited film uploads</li>
              <li>Dedicated TopArk placement advisor</li>
              <li>2 advisor meetings / month</li>
              <li>Custom outreach to target teams</li>
              <li>Contract review support</li>
              <li>VIP combine access + coaching</li>
              <li>Early access to new leagues &amp; markets</li>
              <li>Featured athlete spotlight (social media)</li>
              <li>Community chat rooms (all rooms)</li>
            </ul>
            <Link href="/signup">
              <button className={`${styles.btnSecondary} ${styles.planCta}`}>
                Go Pro Ark
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.verificationNote}>
          <p>
            ⚠️ <strong style={{ color: "var(--gold)" }}>Verification Required</strong> —
            All athletes must be verified before sending messages to teams and coaches.
            This includes confirming your identity, position, and measurables through
            our verification process. This ensures teams only interact with real,
            qualified players.
          </p>
        </div>
      </div>
    </section>
  );
}
