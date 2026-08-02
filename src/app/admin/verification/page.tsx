import { createClient } from "@/lib/supabase/server";
import VerificationClient from "./VerificationClient";

export default async function VerificationQueuePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("athlete_profiles")
    .select("*")
    .eq("verification_status", "pending")
    .order("verification_submitted_at", { ascending: true });

  const athletes = (data ?? []).map((a) => ({
    id: a.id,
    fullName: [a.first_name, a.last_name].filter(Boolean).join(" ") || "Unnamed Athlete",
    email: a.email,
    position: a.position,
    country: a.country,
    heightCm: a.height_cm,
    weightKg: a.weight_kg,
    fortyYardDash: a.forty_yard_dash,
    bio: a.bio,
    highlightUrl: a.highlight_url,
    submittedAt: a.verification_submitted_at,
  }));

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1 }}>
          VERIFICATION <span style={{ color: "var(--gold)" }}>QUEUE</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Confirm identity, position, and measurables before approving.
        </div>
      </div>
      <VerificationClient athletes={athletes} />
    </>
  );
}
