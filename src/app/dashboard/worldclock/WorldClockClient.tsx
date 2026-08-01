"use client";

import { useEffect, useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";

const CITIES = [
  { id: "austin", flag: "🇺🇸", city: "AUSTIN", country: "Texas, USA (HQ)", tz: "America/Chicago", reference: true },
  { id: "berlin", flag: "🇩🇪", city: "BERLIN", country: "Germany", tz: "Europe/Berlin" },
  { id: "paris", flag: "🇫🇷", city: "PARIS", country: "France", tz: "Europe/Paris" },
  { id: "stockholm", flag: "🇸🇪", city: "STOCKHOLM", country: "Sweden", tz: "Europe/Stockholm" },
  { id: "rome", flag: "🇮🇹", city: "ROME", country: "Italy", tz: "Europe/Rome" },
  { id: "madrid", flag: "🇪🇸", city: "MADRID", country: "Spain", tz: "Europe/Madrid" },
  { id: "vienna", flag: "🇦🇹", city: "VIENNA", country: "Austria", tz: "Europe/Vienna" },
  { id: "mexico", flag: "🇲🇽", city: "MEXICO CITY", country: "Mexico", tz: "America/Mexico_City" },
  { id: "warsaw", flag: "🇵🇱", city: "WARSAW", country: "Poland", tz: "Europe/Warsaw" },
  { id: "copenhagen", flag: "🇩🇰", city: "COPENHAGEN", country: "Denmark", tz: "Europe/Copenhagen" },
];

function offsetMinutes(date: Date, tz: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
  const asUTC = Date.UTC(
    Number(parts.year), Number(parts.month) - 1, Number(parts.day),
    Number(parts.hour), Number(parts.minute), Number(parts.second)
  );
  return (asUTC - date.getTime()) / 60000;
}

export default function WorldClockClient() {
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

  const referenceOffset = now ? offsetMinutes(now, "America/Chicago") : 0;

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div className={styles.eyebrow}>Time Zones</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1 }}>
          WORLD <span style={{ color: "var(--gold)" }}>CLOCK</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Know when your teams and coaches are available. All clocks are live.
        </div>
      </div>

      <div className={styles.eyebrow} style={{ marginBottom: 12 }}>
        TopArk Countries
      </div>
      <div className={styles.clockGrid}>
        {CITIES.map((c) => {
          if (!now) {
            return (
              <div className={`${styles.clockCard} ${c.reference ? styles.clockCardLocal : ""}`} key={c.id}>
                <div className={styles.clockFlag}>{c.flag}</div>
                <div className={styles.clockCity}>{c.city}</div>
                <div className={styles.clockCountry}>{c.country}</div>
                <div className={styles.clockTime}>--:--</div>
              </div>
            );
          }

          const timeStr = new Intl.DateTimeFormat("en-US", {
            timeZone: c.tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
          }).format(now);
          const dateStr = new Intl.DateTimeFormat("en-US", {
            timeZone: c.tz, weekday: "short", month: "short", day: "numeric",
          }).format(now);

          const diffMinutes = Math.round((offsetMinutes(now, c.tz) - referenceOffset));
          const diffHours = diffMinutes / 60;
          const diffLabel =
            c.reference
              ? "TOPARK HQ"
              : diffHours === 0
                ? "SAME TIME"
                : `${diffHours > 0 ? "+" : ""}${diffHours}H VS AUSTIN`;
          const diffClass = c.reference
            ? styles.clockDiffSame
            : diffHours === 0
              ? styles.clockDiffSame
              : diffHours > 0
                ? styles.clockDiffAhead
                : styles.clockDiffBehind;

          return (
            <div className={`${styles.clockCard} ${c.reference ? styles.clockCardLocal : ""}`} key={c.id}>
              {c.reference && <div className={styles.clockLocalTag}>📍 TopArk HQ</div>}
              <div className={styles.clockFlag}>{c.flag}</div>
              <div className={styles.clockCity}>{c.city}</div>
              <div className={styles.clockCountry}>{c.country}</div>
              <div className={styles.clockTime}>{timeStr}</div>
              <div className={styles.clockDate}>{dateStr}</div>
              <div className={`${styles.clockDiff} ${diffClass}`}>{diffLabel}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
