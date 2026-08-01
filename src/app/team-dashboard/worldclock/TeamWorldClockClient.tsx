"use client";

import { useEffect, useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";

const CITIES = [
  { flag: "🇩🇪", label: "Berlin", tz: "Europe/Berlin" },
  { flag: "🇺🇸", label: "Austin TX", tz: "America/Chicago" },
  { flag: "🇲🇽", label: "Mexico City", tz: "America/Mexico_City" },
  { flag: "🇫🇷", label: "Paris", tz: "Europe/Paris" },
];

export default function TeamWorldClockClient() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    const immediate = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(immediate);
    };
  }, []);

  return (
    <>
      <div className={styles.eyebrow}>Time Zones</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 24 }}>
        WORLD <span style={{ color: "var(--gold)" }}>CLOCK</span>
      </div>
      <div className={styles.grid4}>
        {CITIES.map((c) => {
          const time = now
            ? new Intl.DateTimeFormat("en-US", { timeZone: c.tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(now)
            : "--:--";
          const date = now
            ? new Intl.DateTimeFormat("en-US", { timeZone: c.tz, weekday: "short", month: "short", day: "numeric" }).format(now)
            : "--";
          return (
            <div className={styles.statCard} style={{ textAlign: "center" }} key={c.label}>
              <div className={styles.eyebrow}>
                {c.flag} {c.label}
              </div>
              <div className={styles.statNum}>{time}</div>
              <div className={styles.statLabel}>{date}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
