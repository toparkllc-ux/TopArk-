import type { Metadata } from "next";
import Link from "next/link";
import { getUpcomingCombineEvents, formatEventDate, spotsRemaining } from "@/lib/combines/getCombineEvents";
import styles from "./combines.module.css";

export const metadata: Metadata = {
  title: "Combines | TopArk",
  description: "Upcoming TopArk combines and exposure events — register to be seen by international scouts.",
};

export default async function CombinesPage() {
  const events = await getUpcomingCombineEvents();

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          TOPARK
        </Link>
        <Link href="/" className={styles.navBack}>
          ← Back to Home
        </Link>
      </nav>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Exposure Events</div>
        <div className={styles.headline}>
          UPCOMING <span className={styles.accent}>COMBINES.</span>
        </div>
        {events.length === 0 ? (
          <div className={styles.empty}>No combines scheduled right now — check back soon.</div>
        ) : (
          <div className={styles.list}>
            {events.map((event) => {
              const remaining = spotsRemaining(event);
              const full = remaining !== null && remaining <= 0;
              return (
                <Link className={styles.card} href={`/combines/${event.slug}`} key={event.id}>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardTag}>{event.status === "closed" ? "Registration Closed" : "Registration Open"}</div>
                    <div className={styles.cardTitle}>{event.title}</div>
                    <div className={styles.cardMeta}>
                      {event.event_date ? formatEventDate(event.event_date) : ""} · {event.location}
                    </div>
                  </div>
                  {remaining !== null && (
                    <div className={`${styles.cardSpots} ${full ? styles.cardSpotsFull : ""}`}>
                      {full ? "Full" : `${remaining} spots left`}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
