"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function StartConversationButton({
  athleteId,
  teamId,
  className,
  label = "Message",
}: {
  athleteId: string;
  teamId: string;
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    const supabase = createClient();

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("athlete_id", athleteId)
      .eq("team_id", teamId)
      .maybeSingle();

    let conversationId = existing?.id;

    if (!conversationId) {
      const { data: created, error: insertError } = await supabase
        .from("conversations")
        .insert({ athlete_id: athleteId, team_id: teamId })
        .select("id")
        .single();
      if (insertError) {
        setLoading(false);
        setError(insertError.message);
        return;
      }
      conversationId = created.id;
    }

    router.push(`/team-dashboard/messages?c=${conversationId}`);
  }

  return (
    <>
      <button className={className} onClick={handleClick} disabled={loading}>
        {loading ? "…" : label}
      </button>
      {error && <div style={{ fontSize: 11, color: "var(--error)", marginTop: 4 }}>{error}</div>}
    </>
  );
}
