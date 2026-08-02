import { createClient } from "@/lib/supabase/server";
import styles from "@/components/dashboard/dashboard.module.css";

const TIER_PRICE: Record<string, number> = { free: 0, elite: 14.99, pro_ark: 49.99 };
const TIER_LABEL: Record<string, string> = { free: "Free", elite: "Elite", pro_ark: "Pro Ark" };

export default async function AdminRevenuePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("athlete_profiles").select("membership_tier");

  const counts: Record<string, number> = { free: 0, elite: 0, pro_ark: 0 };
  for (const row of data ?? []) {
    counts[row.membership_tier] = (counts[row.membership_tier] ?? 0) + 1;
  }

  const mrr = Object.entries(counts).reduce((sum, [tier, count]) => sum + (TIER_PRICE[tier] ?? 0) * count, 0);
  const paidCount = counts.elite + counts.pro_ark;
  const totalAthletes = (data ?? []).length;

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>
        Estimated monthly recurring revenue from active athlete subscriptions.
      </div>

      <div className={styles.grid4} style={{ marginBottom: 24 }}>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Estimated MRR</div>
          <div className={styles.statNum}>${mrr.toFixed(2)}</div>
          <div className={styles.statLabel}>Per month, from active tiers</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Paid Subscribers</div>
          <div className={styles.statNum}>{paidCount}</div>
          <div className={styles.statLabel}>Elite + Pro Ark</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Conversion Rate</div>
          <div className={styles.statNum}>{totalAthletes ? Math.round((paidCount / totalAthletes) * 100) : 0}%</div>
          <div className={styles.statLabel}>Of all registered athletes</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.eyebrow}>Total Athletes</div>
          <div className={styles.statNum}>{totalAthletes}</div>
          <div className={styles.statLabel}>Across all tiers</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle} style={{ marginBottom: 12 }}>
          BREAKDOWN BY TIER
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Price / mo</th>
              <th>Subscribers</th>
              <th>Monthly Revenue</th>
            </tr>
          </thead>
          <tbody>
            {(["free", "elite", "pro_ark"] as const).map((tier) => (
              <tr key={tier}>
                <td>
                  <strong>{TIER_LABEL[tier]}</strong>
                </td>
                <td>${TIER_PRICE[tier].toFixed(2)}</td>
                <td>{counts[tier]}</td>
                <td>${(TIER_PRICE[tier] * counts[tier]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
