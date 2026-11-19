"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/** "English | Spanish" lines with a button that reads the Spanish aloud using the phone's built-in voice. */
export default function SpeakList({ lines }: { lines: string[] }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  function say(text: string, i: number) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ". "));
    u.lang = "es-US";
    const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("es"));
    if (voice) u.voice = voice;
    u.rate = 0.9;
    u.onend = () => setPlaying(null);
    setPlaying(i);
    synth.speak(u);
  }

  return (
    <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {lines.map((line, i) => {
        const [en, es] = line.split("|").map((s) => s.trim());
        return (
          <li key={i} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0 dark:border-slate-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-500 dark:text-slate-400">{en}</p>
              {es ? <p className="text-lg font-semibold leading-snug">{es}</p> : null}
            </div>
            {es && supported ? (
              <button
                type="button"
                onClick={() => say(es, i)}
                aria-label={`Play: ${es}`}
                className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg active:scale-95 " + (playing === i ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800")}
              >
                <Icon name="speaker" size={20} />
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
