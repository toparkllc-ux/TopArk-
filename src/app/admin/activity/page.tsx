import { createClient } from "@/lib/supabase/server";
import styles from "@/components/dashboard/dashboard.module.css";

type ActivityItem = { icon: string; text: string; at: string };

export default async function AdminActivityPage() {
  const supabase = await createClient();

  const [
    { data: athletes },
    { data: teams },
    { data: signings },
    { data: registrations },
    { data: posts },
  ] = await Promise.all([
    supabase.from("athlete_profiles").select("first_name, last_name, created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("team_profiles").select("team_name, created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("signings").select("athlete_id, team_id, created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("combine_registrations").select("athlete_id, event_id, created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("news_posts").select("title, published_at").eq("status", "published").order("published_at", { ascending: false }).limit(8),
  ]);

  const signingAthleteIds = (signings ?? []).map((s) => s.athlete_id);
  const signingTeamIds = (signings ?? []).map((s) => s.team_id);
  const registrationAthleteIds = (registrations ?? []).map((r) => r.athlete_id);
  const registrationEventIds = (registrations ?? []).map((r) => r.event_id);

  const [{ data: signingAthletes }, { data: signingTeams }, { data: regAthletes }, { data: regEvents }] = await Promise.all([
    signingAthleteIds.length
      ? supabase.from("athlete_directory").select("id, first_name, last_name").in("id", signingAthleteIds)
      : Promise.resolve({ data: [] }),
    signingTeamIds.length
      ? supabase.from("team_profiles").select("id, team_name").in("id", signingTeamIds)
      : Promise.resolve({ data: [] }),
    registrationAthleteIds.length
      ? supabase.from("athlete_directory").select("id, first_name, last_name").in("id", registrationAthleteIds)
      : Promise.resolve({ data: [] }),
    registrationEventIds.length
      ? supabase.from("combine_events").select("id, title").in("id", registrationEventIds)
      : Promise.resolve({ data: [] }),
  ]);

  const athleteNameById = new Map(
    [...(signingAthletes ?? []), ...(regAthletes ?? [])]
      .filter((a) => a.id)
      .map((a) => [a.id as string, [a.first_name, a.last_name].filter(Boolean).join(" ") || "Unnamed Athlete"])
  );
  const teamNameById = new Map((signingTeams ?? []).map((t) => [t.id, t.team_name]));
  const eventTitleById = new Map((regEvents ?? []).map((e) => [e.id, e.title]));

  const items: ActivityItem[] = [
    ...(athletes ?? []).map((a) => ({
      icon: "🏈",
      text: `${[a.first_name, a.last_name].filter(Boolean).join(" ") || "An athlete"} joined TopArk`,
      at: a.created_at,
    })),
    ...(teams ?? []).map((t) => ({ icon: "🏟️", text: `${t.team_name} joined as a partner team`, at: t.created_at })),
    ...(signings ?? []).map((s) => ({
      icon: "🤝",
      text: `${athleteNameById.get(s.athlete_id) ?? "An athlete"} signed with ${teamNameById.get(s.team_id) ?? "a team"}`,
      at: s.created_at,
    })),
    ...(registrations ?? []).map((r) => ({
      icon: "🎯",
      text: `${athleteNameById.get(r.athlete_id) ?? "An athlete"} registered for ${eventTitleById.get(r.event_id) ?? "a combine"}`,
      at: r.created_at,
    })),
    ...(posts ?? []).map((p) => ({ icon: "📰", text: `Published "${p.title}"`, at: p.published_at ?? "" })),
  ]
    .filter((item) => item.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 25);

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>Recent activity across the platform.</div>
      <div className={styles.card}>
        {items.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No activity yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 4px",
                  borderBottom: i === items.length - 1 ? "none" : "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 18 }}>{item.icon}</div>
                <div style={{ flex: 1, fontSize: 13 }}>{item.text}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gray)" }}>
                  {new Date(item.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
