import { createClient } from "@/lib/supabase/server";
import SigningsClient from "./SigningsClient";

export default async function AdminSigningsPage() {
  const supabase = await createClient();

  const [{ data: signings }, { data: athletes }, { data: teams }] = await Promise.all([
    supabase.from("signings").select("*").order("signed_at", { ascending: false }),
    supabase.from("athlete_directory").select("id, first_name, last_name").order("first_name"),
    supabase.from("team_profiles").select("id, team_name").order("team_name"),
  ]);

  const athleteNames = new Map(
    (athletes ?? []).filter((a) => a.id).map((a) => [a.id as string, [a.first_name, a.last_name].filter(Boolean).join(" ") || "Unnamed Athlete"])
  );
  const teamNames = new Map((teams ?? []).map((t) => [t.id, t.team_name]));

  const rows = (signings ?? []).map((s) => ({
    id: s.id,
    athleteId: s.athlete_id,
    teamId: s.team_id,
    athleteName: athleteNames.get(s.athlete_id) ?? "Unknown Athlete",
    teamName: teamNames.get(s.team_id) ?? "Unknown Team",
    signedAt: s.signed_at,
    notes: s.notes,
  }));

  const athleteOptions = (athletes ?? [])
    .filter((a) => a.id)
    .map((a) => ({ id: a.id as string, name: [a.first_name, a.last_name].filter(Boolean).join(" ") || "Unnamed Athlete" }));
  const teamOptions = (teams ?? []).map((t) => ({ id: t.id, name: t.team_name }));

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>
        {rows.length} logged signing{rows.length === 1 ? "" : "s"} — TopArk&apos;s track record of athletes placed with partner teams.
      </div>
      <SigningsClient initialRows={rows} athleteOptions={athleteOptions} teamOptions={teamOptions} />
    </>
  );
}
