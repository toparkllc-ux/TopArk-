"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import AppointmentModal from "@/components/dashboard/AppointmentModal";

type EventKind = "interview" | "meeting" | "combine";
type CalendarEvent = { id: string; title: string; detail: string | null; kind: EventKind; startsAt: string };
type Activity = { id: string; icon: string; title: string; detail: string };

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function TeamCalendarClient({
  initialEvents,
  activity,
}: {
  initialEvents: CalendarEvent[];
  activity: Activity[];
}) {
  const [showModal, setShowModal] = useState(false);
  const upcoming = initialEvents
    .map((e) => ({ ...e, date: new Date(e.startsAt) }))
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
      <div className={styles.grid2} style={{ gap: 24, alignItems: "start" }}>
        <div className={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className={styles.cardTitle}>UPCOMING EVALUATIONS</div>
            <button className={styles.topbarBtn} onClick={() => setShowModal(true)}>
              + Add
            </button>
          </div>
          {upcoming.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 16 }}>Nothing scheduled yet.</div>
          ) : (
            <div className={styles.apptList} style={{ marginTop: 16 }}>
              {upcoming.map((e) => (
                <div
                  className={`${styles.apptItem} ${e.kind === "interview" ? "" : styles.apptItemMeeting}`}
                  key={e.id}
                  style={e.kind !== "interview" ? { borderLeftColor: "var(--blue)" } : undefined}
                >
                  <div className={styles.apptDate}>
                    <div className={styles.apptDateDay} style={e.kind !== "interview" ? { color: "var(--blue)" } : undefined}>
                      {e.date.getDate()}
                    </div>
                    <div className={styles.apptDateMonth}>{MONTH_ABBR[e.date.getMonth()]}</div>
                  </div>
                  <div className={styles.apptDivider} />
                  <div className={styles.apptInfo}>
                    <div className={styles.apptTitle}>{e.title}</div>
                    {e.detail && <div className={styles.apptDetail}>{e.detail}</div>}
                  </div>
                  <div className={styles.apptTime}>
                    {e.date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>RECENT ACTIVITY</div>
          {activity.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 16 }}>No activity yet.</div>
          ) : (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              {activity.map((a, i) => (
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    paddingBottom: i < activity.length - 1 ? 14 : 0,
                    borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div style={{ fontSize: 18 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: "var(--gray)" }}>{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && <AppointmentModal onClose={() => setShowModal(false)} />}
    </>
  );
}
