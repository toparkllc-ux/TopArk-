import { createClient } from "@/lib/supabase/server";
import CombinesClient from "./CombinesClient";

export default async function AdminCombinesPage() {
  const supabase = await createClient();
  const [{ data: events }, { data: registrations }] = await Promise.all([
    supabase.from("combine_events").select("*").order("event_date", { ascending: false }),
    supabase.from("combine_registrations").select("event_id"),
  ]);

  const registeredCounts = new Map<string, number>();
  for (const r of registrations ?? []) {
    registeredCounts.set(r.event_id, (registeredCounts.get(r.event_id) ?? 0) + 1);
  }

  const rows = (events ?? []).map((e) => ({ ...e, registeredCount: registeredCounts.get(e.id) ?? 0 }));

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>Manage combine events and track registrations.</div>
      <CombinesClient initialEvents={rows} />
    </>
  );
}
