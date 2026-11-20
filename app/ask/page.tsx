"use client";

import { useEffect, useRef, useState } from "react";
import ChatText from "@/components/ChatText";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What are the elements of shoplifting and how is it graded?",
  "When can I order a passenger out of the car in NJ?",
  "Explain Terry v. Ohio with a patrol example",
  "When is a DV arrest mandatory?",
  "Can I ask for consent to search a car on a routine stop?",
  "Difference between careless and reckless driving",
];

const STORE = "njpr.chat";

export default function AskPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Keep the conversation on this device between visits.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORE);
      if (raw) setMessages(JSON.parse(raw) as Msg[]);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORE, JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setError("You're offline. Ask AI needs a connection; search and saved pages still work.");
      return;
    }
    setError("");
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Something went wrong. Try again.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer.trim()) throw new Error("No answer came back. Try again.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError((e as Error).message);
        setMessages(history.slice(0, -1));
        setInput(q);
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  function clear() {
    stop();
    setMessages([]);
    setError("");
  }

  return (
    <div className="flex min-h-[calc(100vh-9rem)] flex-col">
      <PageHeader
        icon="chat"
        iconBg="bg-sky-600"
        eyebrow="AI assistant"
        title="Ask a Legal Question"
        subtitle="NJ statutes, AG directives and case law, explained."
        actions={
          messages.length ? (
            <button type="button" onClick={clear} className="h-11 rounded-xl border border-white/25 bg-white/10 px-3 text-sm font-semibold">
              New chat
            </button>
          ) : null
        }
      />

      <p className="mb-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
        <Icon name="alert" size={16} className="shrink-0" />
        <span>AI answers can be wrong. This is legal information, not legal advice. Confirm with current statutes, AG directives,
        your department&apos;s policy or the prosecutor before acting. Don&apos;t enter names or case details.</span>
      </p>

      {messages.length === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500">Try asking:</p>
          {STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium shadow-sm active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex-1 space-y-3">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ml-10 rounded-2xl rounded-br-sm bg-brand px-4 py-3 text-white shadow-sm dark:bg-blue-600">
              {m.content}
            </div>
          ) : (
            <div key={i} className="mr-4 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {m.content ? <ChatText text={m.content} /> : <p className="py-2 text-slate-400">Thinking…</p>}
            </div>
          )
        )}
        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">{error}</p> : null}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-[calc(58px+env(safe-area-inset-bottom))] -mx-4 mt-4 flex gap-2 border-t border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          maxLength={2000}
          placeholder="Ask about a statute, case or procedure…"
          className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base dark:border-slate-700 dark:bg-slate-900"
        />
        {busy ? (
          <button type="button" onClick={stop} className="min-h-[48px] rounded-2xl bg-slate-700 px-4 font-semibold text-white">Stop</button>
        ) : (
          <button disabled={!input.trim()} className="min-h-[48px] rounded-2xl bg-brand px-4 font-semibold text-white disabled:opacity-40 dark:bg-blue-600">Send</button>
        )}
      </form>
    </div>
  );
}
