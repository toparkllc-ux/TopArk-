import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/queries";
import PendingInterviewRequests from "@/components/messaging/PendingInterviewRequests";
import CalendarClient from "./CalendarClient";

export default async function CalendarPage() {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "athlete") return null;

  const supabase = await createClient();

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("owner_id", current.user.id)
    .order("starts_at", { ascending: true });

  const { data: pending } = await supabase
    .from("interview_requests")
    .select("*")
    .eq("athlete_id", current.user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  const teamIds = [...new Set((pending ?? []).map((r) => r.team_id))];
  const { data: teams } = teamIds.length
    ? await supabase.from("team_profiles").select("id, team_name").in("id", teamIds)
    : { data: [] };
  const teamNameMap = new Map((teams ?? []).map((t) => [t.id, t.team_name || "A team"]));

  const pendingRequests = (pending ?? []).map((r) => ({
    id: r.id,
    teamName: teamNameMap.get(r.team_id) ?? "A team",
    message: r.message,
    proposedAt: r.proposed_at,
  }));

  const events = (appointments ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    detail: a.detail,
    kind: a.kind as "interview" | "meeting" | "combine",
    startsAt: a.starts_at,
  }));

  return (
    <>
      <PendingInterviewRequests requests={pendingRequests} />
      <CalendarClient initialEvents={events} />
    </>
  );
}
