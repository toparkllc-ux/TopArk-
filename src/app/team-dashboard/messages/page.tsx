import { getCurrentUser } from "@/lib/supabase/queries";
import { getConversationSummaries } from "@/lib/messaging/getConversationSummaries";
import MessagingClient from "@/components/messaging/MessagingClient";

export default async function TeamMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const current = await getCurrentUser();
  if (!current || current.accountType !== "team") return null;

  const { c } = await searchParams;
  const conversations = await getConversationSummaries(current.user.id, "team");

  return (
    <MessagingClient
      initialConversations={conversations}
      myId={current.user.id}
      canSend
      initialSelectedId={c}
    />
  );
}
