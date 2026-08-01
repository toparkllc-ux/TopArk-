"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./landing.module.css";

type Message = { role: "user" | "assistant"; content: string; time: string };

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const GREETING =
  "Hey! I'm the TopArk AI assistant 🏈 I can answer questions about opportunities, memberships, how our platform works, or how to get signed internationally. What brings you here?";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING, time: "Just now" },
  ]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
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
      const reply: string =
        data.reply ||
        "I'm having trouble connecting. Fill out the interview request above and our team will reach out directly!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply, time: getTime() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection issue. Try the interview request form above and our team will reach out!",
          time: getTime(),
        },
      ]);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <>
      <button
        className={styles.chatTrigger}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open TopArk AI chat"
      >
        <span>{open ? "✕" : "💬"}</span>
        {!open && <span className={styles.chatBadge}>1</span>}
      </button>
      <div className={`${styles.chatWindow} ${open ? styles.chatWindowOpen : ""}`}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderLeft}>
            <div className={styles.chatAvatar}>TA</div>
            <div>
              <div className={styles.chatHeaderName}>TOPARK AI</div>
              <div className={styles.chatHeaderStatus}>
                <span className={styles.statusDot} /> AI-Powered · Always On
              </div>
            </div>
          </div>
          <button className={styles.chatClose} onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className={styles.chatAiLabel}>⚡ Powered by AI · Knows everything about TopArk</div>
        <div className={styles.chatBody} ref={bodyRef}>
          {messages.map((m, i) => (
            <div className={`${styles.msg} ${m.role === "user" ? styles.msgMe : styles.msgThem}`} key={i}>
              <div className={styles.msgBubble}>{m.content}</div>
              <div className={styles.msgTime}>{m.time}</div>
            </div>
          ))}
          <div className={`${styles.typingIndicator} ${waiting ? styles.typingIndicatorShow : ""}`}>
            <div className={styles.typingBubble}>
              <div className={styles.typingDot} />
              <div className={styles.typingDot} />
              <div className={styles.typingDot} />
            </div>
          </div>
        </div>
        <div className={styles.chatFooter}>
          <input
            ref={inputRef}
            className={styles.chatInput}
            type="text"
            placeholder="Ask anything about TopArk..."
            value={input}
            disabled={waiting}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !waiting) sendMessage();
            }}
          />
          <button className={styles.chatSend} onClick={sendMessage} disabled={waiting}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
