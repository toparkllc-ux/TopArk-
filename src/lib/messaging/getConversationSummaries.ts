import { createClient } from "@/lib/supabase/server";

export type ConversationSummary = {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerInitials: string;
  lastMessage: string | null;
  lastMessageAt: string;
  unread: boolean;
};

export async function getConversationSummaries(
  myId: string,
  myRole: "athlete" | "team"
): Promise<ConversationSummary[]> {
  const supabase = await createClient();

  const { data: conversations } = await supabase
    .from("conversations")
    .select("*")
    .or(`athlete_id.eq.${myId},team_id.eq.${myId}`)
    .order("last_message_at", { ascending: false });

  if (!conversations || conversations.length === 0) return [];

  const conversationIds = conversations.map((c) => c.id);
  const partnerIds = conversations.map((c) => (myRole === "athlete" ? c.team_id : c.athlete_id));

  const partnerMap = new Map<string, string>();
  if (myRole === "athlete") {
    const { data: teams } = await supabase
      .from("team_profiles")
      .select("id, team_name")
      .in("id", partnerIds);
    teams?.forEach((t) => partnerMap.set(t.id, t.team_name || "Team"));
  } else {
    const { data: athletes } = await supabase
      .from("athlete_directory")
      .select("id, first_name, last_name")
      .in("id", partnerIds);
    athletes?.forEach((a) => {
      if (a.id) partnerMap.set(a.id, [a.first_name, a.last_name].filter(Boolean).join(" ") || "Athlete");
    });
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("conversation_id, body, created_at, sender_id, read_at")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: false });

  return conversations.map((c) => {
    const partnerId = myRole === "athlete" ? c.team_id : c.athlete_id;
    const convoMessages = messages?.filter((m) => m.conversation_id === c.id) ?? [];
    const last = convoMessages[0];
    const unread = convoMessages.some((m) => m.sender_id !== myId && !m.read_at);
    const partnerName = partnerMap.get(partnerId) ?? "Unknown";

    return {
      id: c.id,
      partnerId,
      partnerName,
      partnerInitials: partnerName
        .split(" ")
        .map((s) => s[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase() || "TA",
      lastMessage: last?.body ?? null,
      lastMessageAt: c.last_message_at,
      unread,
    };
  });
}
