"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import type { PlanId } from "@/lib/stripe";

const PLANS: {
  id: "free" | PlanId;
  name: string;
  price: string;
  period: string;
  features: { text: string; no?: boolean }[];
}[] = [
  {
    id: "free",
    name: "FREE",
    price: "$0",
    period: "forever",
    features: [
      { text: "Basic athlete profile" },
      { text: "Appear in team search" },
      { text: "Up to 4 messages / month" },
      { text: "TopArk news access" },
      { text: "Community chat rooms", no: true },
      { text: "Calendar & scheduling", no: true },
      { text: "Advisor meetings", no: true },
      { text: "Priority placement", no: true },
      { text: "Verified badge", no: true },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: "$14.99",
    period: "per month",
    features: [
      { text: "Full verified athlete profile" },
      { text: "Priority placement in search" },
      { text: "Unlimited interview requests" },
      { text: "Unlimited direct team messaging" },
      { text: "Film uploads (up to 5)" },
      { text: "Verified badge" },
      { text: "Exclusive combine invites" },
      { text: "Community chat rooms access" },
      { text: "Full calendar & scheduling" },
      { text: "Dedicated advisor", no: true },
    ],
  },
  {
    id: "pro_ark",
    name: "PRO ARK",
    price: "$34.99",
    period: "per month",
    features: [
      { text: "Everything in Elite" },
      { text: "Unlimited film uploads" },
      { text: "Dedicated placement advisor" },
      { text: "2 advisor meetings / month" },
      { text: "Custom outreach to target teams" },
      { text: "Contract review support" },
      { text: "VIP combine access + coaching" },
      { text: "Community chat rooms (all rooms)" },
      { text: "Featured athlete spotlight" },
    ],
  },
];

export default function MembershipClient({ currentTier }: { currentTier: string }) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleUpgrade(plan: PlanId) {
    setLoadingPlan(plan);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval: "monthly" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error || "Unable to start checkout.");
    } catch {
      setError("Unable to start checkout.");
    } finally {
      setLoadingPlan(null);
    }
  }

  const currentLabel = currentTier === "free" ? "Free" : currentTier === "elite" ? "Elite" : "Pro Ark";

  return (
    <>
      <div className={styles.eyebrow}>Your Subscription</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 8 }}>
        MEMBERSHIP <span style={{ color: "var(--gold)" }}>PLANS</span>
      </div>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 4 }}>
        You are currently on the <strong style={{ color: "var(--gold)" }}>{currentLabel}</strong> plan. Upgrade anytime.
      </div>
      {error && <div style={{ fontSize: 12, color: "var(--error)", marginTop: 8 }}>{error}</div>}
      <div className={styles.planGrid}>
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentTier;
          return (
            <div className={`${styles.planCard} ${isCurrent ? styles.planCardCurrent : ""}`} key={plan.id}>
              {isCurrent ? (
                <div className={`${styles.planTag} ${styles.planTagCurrent}`}>✓ Current Plan</div>
              ) : plan.id === "pro_ark" ? (
                <div className={styles.planTag}>👑 Top Tier</div>
              ) : null}
              <div className={styles.planName2}>{plan.name}</div>
              <div className={styles.planPrice2}>{plan.price}</div>
              <div className={styles.planPeriod}>{plan.period}</div>
              <ul className={styles.planFeatures2}>
                {plan.features.map((f) => (
                  <li className={f.no ? styles.planFeatureNo : ""} key={f.text}>
                    {f.text}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <button className={`${styles.planBtn} ${styles.planBtnCurrent}`} disabled>
                  Current Plan
                </button>
              ) : plan.id === "free" ? (
                <button className={styles.planBtn}>Downgrade to Free</button>
              ) : (
                <button
                  className={`${styles.planBtn} ${styles.planBtnGold}`}
                  onClick={() => handleUpgrade(plan.id as PlanId)}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === plan.id ? "Redirecting…" : `Upgrade to ${plan.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
