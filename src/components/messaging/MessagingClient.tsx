"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { ConversationSummary } from "@/lib/messaging/getConversationSummaries";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  read_at: string | null;
};

function initialsOf(name: string) {
  return (
    name
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "TA"
  );
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessagingClient({
  initialConversations,
  myId,
  canSend,
  cantSendReason,
  initialSelectedId,
}: {
  initialConversations: ConversationSummary[];
  myId: string;
  canSend: boolean;
  cantSendReason?: string;
  initialSelectedId?: string;
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId ?? initialConversations[0]?.id
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;
    const supabase = createClient();
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedId)
        .order("created_at", { ascending: true });
      if (active && data) setMessages(data);

      await supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() })
        .eq("conversation_id", selectedId)
        .neq("sender_id", myId)
        .is("read_at", null);

      setConversations((prev) => prev.map((c) => (c.id === selectedId ? { ...c, unread: false } : c)));
    })();

    const channel = supabase
      .channel(`messages:${selectedId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selectedId}` },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => (prev.some((m) => m.id === newMsg.id) ? prev : [...prev, newMsg]));
          setConversations((prev) =>
            prev.map((c) =>
              c.id === selectedId
                ? { ...c, lastMessage: newMsg.body, lastMessageAt: newMsg.created_at }
                : c
            )
          );
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [selectedId, myId]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || !selectedId || sending) return;
    setSending(true);
    setError("");
    const supabase = createClient();
    const { error: sendError } = await supabase
      .from("messages")
      .insert({ conversation_id: selectedId, sender_id: myId, body: text });
    setSending(false);
    if (sendError) {
      setError(sendError.message);
      return;
    }
    setInput("");
  }

  if (conversations.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ fontSize: 13, color: "var(--gray)" }}>
          No conversations yet. Messages will show up here once a team or athlete reaches out.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.communityWrap}>
      <div className={styles.roomList}>
        <div className={styles.roomHeader}>CONVERSATIONS</div>
        {conversations.map((c) => (
          <div
            key={c.id}
            className={`${styles.roomItem} ${c.id === selectedId ? styles.roomItemActive : ""}`}
            onClick={() => setSelectedId(c.id)}
          >
            {c.partnerName}
            {c.unread ? <span className={styles.roomBadge}>●</span> : null}
          </div>
        ))}
      </div>
      <div className={styles.chatArea}>
        {selected && (
          <>
            <div className={styles.chatAreaHeader}>
              <div>
                <div className={styles.chatAreaTitle}>{selected.partnerName}</div>
              </div>
            </div>
            <div className={styles.chatMessages} ref={bodyRef}>
              {messages.map((m) => (
                <div className={`${styles.chatMsg} ${m.sender_id === myId ? styles.chatMsgMine : ""}`} key={m.id}>
                  <div className={styles.chatMsgAvatar} style={{ background: "var(--panel)" }}>
                    {m.sender_id === myId ? "ME" : initialsOf(selected.partnerName)}
                  </div>
                  <div className={styles.chatMsgBody}>
                    <div className={styles.chatMsgHeader}>
                      <span className={styles.chatMsgName}>{m.sender_id === myId ? "You" : selected.partnerName}</span>
                      <span className={styles.chatMsgTime}>{formatTime(m.created_at)}</span>
                    </div>
                    <div className={styles.chatMsgText}>{m.body}</div>
                  </div>
                </div>
              ))}
            </div>
            {!canSend ? (
              <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--gray)" }}>
                {cantSendReason}
              </div>
            ) : (
              <div className={styles.chatInputArea}>
                <input
                  className={styles.communityInput}
                  type="text"
                  placeholder={`Message ${selected.partnerName}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <button className={styles.sendBtn} onClick={handleSend} disabled={sending}>
                  Send
                </button>
              </div>
            )}
            {error && (
              <div style={{ padding: "8px 20px", fontSize: 12, color: "var(--error)" }}>{error}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
