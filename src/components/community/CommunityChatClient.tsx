"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

type Room = Tables<"chat_rooms">;
type Message = Tables<"chat_messages">;

const ROLE_LABEL: Record<string, string> = {
  elite: "Elite",
  pro_ark: "Pro Ark",
  founder: "Founder",
};

const ROLE_CLASS: Record<string, string> = {
  elite: styles.roleElite,
  pro_ark: styles.rolePro,
  founder: styles.roleFounder,
};

const AVATAR_COLORS = ["#1e3a5f", "#2d1b1b", "#1a2e1a", "#2a1a00", "#2a1a3a", "#0f2a2a"];

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

function avatarColorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function CommunityChatClient({
  rooms,
  myId,
  canSend,
  cantSendReason,
}: {
  rooms: Room[];
  myId: string;
  canSend: boolean;
  cantSendReason?: string;
}) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(rooms[0]?.id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  const groups = useMemo(() => {
    const bySection = new Map<string, Room[]>();
    for (const room of rooms) {
      const list = bySection.get(room.section) ?? [];
      list.push(room);
      bySection.set(room.section, list);
    }
    return Array.from(bySection.entries());
  }, [rooms]);

  useEffect(() => {
    if (!selectedRoomId) return;
    const supabase = createClient();
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room_id", selectedRoomId)
        .order("created_at", { ascending: true })
        .limit(200);
      if (active && data) setMessages(data);
    })();

    const channel = supabase
      .channel(`chat_messages:${selectedRoomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `room_id=eq.${selectedRoomId}` },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => (prev.some((m) => m.id === newMsg.id) ? prev : [...prev, newMsg]));
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [selectedRoomId]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || !selectedRoomId || sending) return;
    setSending(true);
    setError("");
    const supabase = createClient();
    const { error: sendError } = await supabase
      .from("chat_messages")
      .insert({ room_id: selectedRoomId, sender_id: myId, body: text });
    setSending(false);
    if (sendError) {
      setError(sendError.message);
      return;
    }
    setInput("");
  }

  if (rooms.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ fontSize: 13, color: "var(--gray)" }}>No chat rooms are available right now.</div>
      </div>
    );
  }

  return (
    <div className={styles.communityWrap}>
      <div className={styles.roomList}>
        <div className={styles.roomHeader}>ROOMS</div>
        {groups.map(([section, sectionRooms]) => (
          <div key={section}>
            <div className={styles.roomSection}>{section}</div>
            {sectionRooms.map((room) => (
              <div
                key={room.id}
                className={`${styles.roomItem} ${room.id === selectedRoomId ? styles.roomItemActive : ""}`}
                onClick={() => setSelectedRoomId(room.id)}
              >
                <span className={styles.roomHash}>#</span> {room.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.chatArea}>
        {selectedRoom && (
          <>
            <div className={styles.chatAreaHeader}>
              <div>
                <div className={styles.chatAreaTitle}># {selectedRoom.name}</div>
                <div className={styles.chatAreaMeta}>All paid members · Private &amp; verified</div>
              </div>
              <div className={styles.chatAreaOnline}>
                <span className={styles.onlineDot} /> Live
              </div>
            </div>
            <div className={styles.chatMessages} ref={bodyRef}>
              {messages.map((m) => (
                <div className={`${styles.chatMsg} ${m.sender_id === myId ? styles.chatMsgMine : ""}`} key={m.id}>
                  <div className={styles.chatMsgAvatar} style={{ background: avatarColorFor(m.sender_id) }}>
                    {initialsOf(m.sender_name)}
                  </div>
                  <div className={styles.chatMsgBody}>
                    <div className={styles.chatMsgHeader}>
                      <span className={styles.chatMsgName}>{m.sender_id === myId ? "You" : m.sender_name}</span>
                      <span className={`${styles.chatMsgRole} ${ROLE_CLASS[m.sender_role] ?? styles.roleElite}`}>
                        {ROLE_LABEL[m.sender_role] ?? "Elite"}
                      </span>
                      <span className={styles.chatMsgTime}>{formatTime(m.created_at)}</span>
                    </div>
                    <div className={styles.chatMsgText}>{m.body}</div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div style={{ fontSize: 13, color: "var(--gray)" }}>
                  No messages yet. Be the first to say something in #{selectedRoom.name}.
                </div>
              )}
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
                  placeholder={`Message #${selectedRoom.name}...`}
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
            {error && <div style={{ padding: "8px 20px", fontSize: 12, color: "var(--error)" }}>{error}</div>}
          </>
        )}
      </div>
    </div>
  );
}
