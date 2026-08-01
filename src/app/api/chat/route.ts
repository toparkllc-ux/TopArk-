import { NextRequest, NextResponse } from "next/server";
import { TOPARK_SYSTEM_PROMPT } from "@/lib/ai-system-prompt";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI chat is not configured yet." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Invalid message history." }, { status: 400 });
  }
  for (const m of messages) {
    if (
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length === 0 ||
      m.content.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
        max_tokens: 500,
        system: TOPARK_SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "AI service is unavailable right now." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string =
      data.content
        ?.map((block: { text?: string }) => block.text || "")
        .join("") ||
      "I'm having trouble connecting. Fill out the interview request above and our team will reach out directly!";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "AI service is unavailable right now." },
      { status: 502 }
    );
  }
}
