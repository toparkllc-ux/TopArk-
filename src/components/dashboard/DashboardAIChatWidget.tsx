"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./dashboard.module.css";

type Message = { role: "user" | "assistant"; content: string; time: string };

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const GREETING =
  "Hey! I'm the TopArk AI assistant 🏈 Ask me about your membership, messaging limits, verification, or anything else on the platform.";

export default function DashboardAIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING, time: "Just now" },
  ]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, waiting]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || waiting) return;
    setInput("");
    const nextMessages = [...messages, { role: "user" as const, content: text, time: getTime() }];
    setMessages(nextMessages);
    setWaiting(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply: string = data.reply || "I'm having trouble connecting right now — try again shortly.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply, time: getTime() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue — try again shortly.", time: getTime() },
      ]);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <>
      <button className={styles.aiChatTrigger} onClick={() => setOpen((v) => !v)} aria-label="Open TopArk AI chat">
        <span>{open ? "✕" : "💬"}</span>
        {!open && <span className={styles.aiChatBadge}>1</span>}
      </button>
      <div className={`${styles.aiChatWindow} ${open ? styles.aiChatWindowOpen : ""}`}>
        <div className={styles.aiChatHeader}>
          <div className={styles.aiChatHeaderLeft}>
            <div className={styles.aiChatAvatar}>TA</div>
            <div>
              <div className={styles.aiChatHeaderName}>TOPARK AI</div>
              <div className={styles.aiChatHeaderStatus}>AI-Powered · Always On</div>
            </div>
          </div>
          <button className={styles.aiChatClose} onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className={styles.aiChatLabel}>⚡ Powered by AI · Knows everything about TopArk</div>
        <div className={styles.aiChatBody} ref={bodyRef}>
          {messages.map((m, i) => (
            <div className={`${styles.aiMsg} ${m.role === "user" ? styles.aiMsgMe : styles.aiMsgThem}`} key={i}>
              <div className={styles.aiMsgBubble}>{m.content}</div>
              <div className={styles.aiMsgTime}>{m.time}</div>
            </div>
          ))}
          <div className={`${styles.aiTyping} ${waiting ? styles.aiTypingShow : ""}`}>
            <div className={styles.aiTypingBubble}>
              <div className={styles.aiTypingDot} />
              <div className={styles.aiTypingDot} />
              <div className={styles.aiTypingDot} />
            </div>
          </div>
        </div>
        <div className={styles.aiChatFooter}>
          <input
            ref={inputRef}
            className={styles.aiChatInput}
            type="text"
            placeholder="Ask anything about TopArk..."
            value={input}
            disabled={waiting}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !waiting) sendMessage();
            }}
          />
          <button className={styles.aiChatSend} onClick={sendMessage} disabled={waiting}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
