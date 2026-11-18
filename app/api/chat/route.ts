import { relevantContext } from "@/lib/chatContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-5-5";
const MAX_INPUT_CHARS = 2000;
const MAX_TURNS = 12;
const RATE_LIMIT = Number(process.env.CHAT_RATE_LIMIT_PER_HOUR || 30);

const SYSTEM = `You are the legal reference assistant inside "NJ Police Reference", an app for New Jersey law enforcement officers.

Your job: explain New Jersey criminal and motor vehicle law (N.J.S.A. Title 2C, Title 39 and related titles), NJ Attorney General guidelines and directives, and U.S. Supreme Court and NJ Supreme Court case law, in plain language an officer can use in the field.

How to answer:
- Lead with the direct answer in 1-2 sentences, then the key elements, grading or rule, then a short practical example if helpful.
- Cite the statute section or case name and citation for every legal rule you state.
- Point out where New Jersey law gives more protection than federal law (for example consent searches, passenger exit orders, the automobile exception, no good-faith exception).
- Be honest about uncertainty. If you are not sure of a citation, grade, number or the current version of a law, say so plainly and say what to check. Never invent statutes, case names, citations, grades or penalties.
- Laws and AG directives change. Remind the user to confirm current law, AG directives and department policy when it matters to a charging, search or force decision.
- Keep answers concise and scannable on a phone: short paragraphs and bullet points, no long essays.
- You give legal information, not legal advice. For decisions in an active case, direct the officer to their supervisor, the county prosecutor's office or department legal advisor.
- Do not help anyone evade law enforcement, harm people, or violate someone's rights. Decline politely if asked.
- Remind users not to enter names, case numbers or other identifying details of real people or investigations if they do.

The app's own reference entries related to the question may be provided below. Use them when relevant, but note that most entries have not yet been verified against official sources; where an entry is marked as not verified or its grade is flagged for review, say so. When an app entry is relevant, mention its app link (for example /entry/njsa-2c-12-1a) so the user can open it.`;

type Msg = { role: "user" | "assistant"; content: string };

// Best-effort per-IP limit. Serverless instances don't share memory, so also set a spend limit in the Anthropic Console.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function plain(status: number, text: string) {
  return new Response(text, { status, headers: { "content-type": "text/plain; charset=utf-8" } });
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return plain(503, "The assistant isn't set up yet. The site owner needs to add an ANTHROPIC_API_KEY in Vercel.");

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return plain(429, "You've reached the hourly question limit. Please try again later.");

  let messages: Msg[];
  try {
    const body = (await req.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages)) throw new Error("bad");
    messages = body.messages
      .filter(
        (m: unknown): m is Msg =>
          !!m &&
          typeof m === "object" &&
          ((m as Msg).role === "user" || (m as Msg).role === "assistant") &&
          typeof (m as Msg).content === "string" &&
          (m as Msg).content.trim().length > 0
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_INPUT_CHARS : 6000) }))
      .slice(-MAX_TURNS);
  } catch {
    return plain(400, "Invalid request.");
  }
  // The conversation must start with the user and end with a new user question.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return plain(400, "Ask a question to get started.");

  const question = messages[messages.length - 1].content;
  const context = relevantContext(question);
  const system = context ? `${SYSTEM}\n\n## Related app entries\n\n${context}` : SYSTEM;

  const upstream = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1500, system, messages, stream: true }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("Anthropic API error", upstream.status, detail.slice(0, 500));
    return plain(502, upstream.status === 429 ? "The assistant is busy. Try again in a minute." : "The assistant couldn't answer right now. Try again.");
  }

  // Convert the API's server-sent events into a plain text stream for the page.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;
            try {
              const evt = JSON.parse(data);
              if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(evt.delta.text));
              } else if (evt.type === "error") {
                controller.enqueue(encoder.encode("\n\n[The answer was interrupted. Please try again.]"));
              }
            } catch {
              // ignore partial or non-JSON lines
            }
          }
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n[Connection lost. Please try again.]"));
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
