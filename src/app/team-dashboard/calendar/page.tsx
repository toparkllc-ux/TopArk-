import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/queries";
import styles from "@/components/dashboard/dashboard.module.css";
import TeamCalendarClient from "./TeamCalendarClient";

export default async function TeamCalendarPage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "team") return null;

  const supabase = await createClient();

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("owner_id", current.user.id)
    .order("starts_at", { ascending: true });

  const { data: recentRequests } = await supabase
    .from("interview_requests")
    .select("*")
    .eq("team_id", current.user.id)
    .neq("status", "pending")
    .order("updated_at", { ascending: false })
    .limit(6);

  const athleteIds = [...new Set((recentRequests ?? []).map((r) => r.athlete_id))];
  const { data: athletes } = athleteIds.length
    ? await supabase.from("athlete_directory").select("id, first_name, last_name").in("id", athleteIds)
    : { data: [] };
  const nameMap = new Map((athletes ?? []).map((a) => [a.id, [a.first_name, a.last_name].filter(Boolean).join(" ") || "Athlete"]));

  const events = (appointments ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    detail: a.detail,
    kind: a.kind as "interview" | "meeting" | "combine",
    startsAt: a.starts_at,
  }));

  const activity = (recentRequests ?? []).map((r) => ({
    id: r.id,
    icon: r.status === "accepted" ? "✅" : r.status === "declined" ? "🚫" : "📋",
    title: `${nameMap.get(r.athlete_id) ?? "Athlete"} — interview ${r.status}`,
    detail: new Date(r.updated_at).toLocaleDateString(),
  }));

  return (
    <>
      <div className={styles.eyebrow}>Schedule</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1, marginBottom: 24 }}>
        EVALUATION <span style={{ color: "var(--gold)" }}>CALENDAR</span>
      </div>
      <TeamCalendarClient initialEvents={events} activity={activity} />
    </>
  );
}
