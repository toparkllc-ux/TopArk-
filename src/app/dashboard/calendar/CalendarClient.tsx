"use client";

import { useMemo, useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import AppointmentModal from "@/components/dashboard/AppointmentModal";

type EventKind = "interview" | "meeting" | "combine";
export type CalendarEvent = { id: string; title: string; detail: string | null; kind: EventKind; startsAt: string };
type CalEvent = { id: string; date: Date; title: string; detail: string | null; kind: EventKind };

const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];
const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const eventStyle: Record<EventKind, string> = {
  interview: styles.calEventInterview,
  meeting: styles.calEventMeeting,
  combine: styles.calEventCombine,
};
const apptItemClass: Record<EventKind, string> = {
  interview: "",
  meeting: styles.apptItemMeeting,
  combine: styles.apptItemCombine,
};
const apptColor: Record<EventKind, string | undefined> = {
  interview: undefined,
  meeting: "var(--success)",
  combine: "var(--error)",
};

export default function CalendarClient({ initialEvents }: { initialEvents: CalendarEvent[] }) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [showModal, setShowModal] = useState(false);

  const events: CalEvent[] = useMemo(
    () =>
      initialEvents.map((e) => ({
        id: e.id,
        date: new Date(e.startsAt),
        title: e.title,
        detail: e.detail,
        kind: e.kind,
      })),
    [initialEvents]
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; date: Date; otherMonth: boolean }[] = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, date: new Date(year, month - 1, daysInPrevMonth - i), otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: new Date(year, month, d), otherMonth: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const next = addDays(last, 1);
    cells.push({ day: next.getDate(), date: next, otherMonth: true });
  }

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  const upcomingEvents = events
    .filter((e) => e.date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
      <div className={styles.grid2} style={{ gap: 24, alignItems: "start" }}>
        <div>
          <div className={styles.calendarWrap}>
            <div className={styles.calHeader}>
              <div className={styles.calMonth}>
                {MONTH_NAMES[month]} {year}
              </div>
              <div className={styles.calNav}>
                <button
                  className={styles.calNavBtn}
                  onClick={() => setViewDate(new Date(year, month - 1, 1))}
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button
                  className={styles.calNavBtn}
                  onClick={() => setViewDate(new Date(year, month + 1, 1))}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {DAY_NAMES.map((d) => (
                <div className={styles.calDayName} key={d}>
                  {d}
                </div>
              ))}
              {cells.map((cell, i) => {
                const dayEvents = events.filter((e) => isSameDay(e.date, cell.date));
                const isToday = isSameDay(cell.date, today) && !cell.otherMonth;
                return (
                  <div className={`${styles.calDay} ${cell.otherMonth ? styles.calDayOtherMonth : ""}`} key={i}>
                    <div className={isToday ? styles.calDayTodayNum : styles.calDayNum}>{cell.day}</div>
                    {dayEvents.map((e) => (
                      <div className={`${styles.calEvent} ${eventStyle[e.kind]}`} key={e.id}>
                        {e.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray)" }}>
              <div style={{ width: 10, height: 10, background: "rgba(245,196,0,0.3)", borderLeft: "2px solid var(--gold)" }} />
              Interview
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray)" }}>
              <div style={{ width: 10, height: 10, background: "rgba(34,197,94,0.2)", borderLeft: "2px solid var(--success)" }} />
              Advisor Meeting
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray)" }}>
              <div style={{ width: 10, height: 10, background: "rgba(239,68,68,0.15)", borderLeft: "2px solid var(--error)" }} />
              Combine / Event
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div className={styles.eyebrow}>Upcoming</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 1 }}>YOUR APPOINTMENTS</div>
            </div>
            <button className={styles.topbarBtn} onClick={() => setShowModal(true)}>
              + Add
            </button>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className={styles.card}>
              <div style={{ fontSize: 13, color: "var(--gray)" }}>Nothing scheduled yet.</div>
            </div>
          ) : (
            <div className={styles.apptList}>
              {upcomingEvents.map((e) => (
                <div className={`${styles.apptItem} ${apptItemClass[e.kind]}`} key={e.id}>
                  <div className={styles.apptDate}>
                    <div className={styles.apptDateDay} style={{ color: apptColor[e.kind] }}>
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
      </div>
      {showModal && <AppointmentModal onClose={() => setShowModal(false)} />}
    </>
  );
}
