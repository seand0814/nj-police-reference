"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { haptic } from "@/lib/haptics";

type Recognizer = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
};

function getRecognizer(): (new () => Recognizer) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognizer; webkitSpeechRecognition?: new () => Recognizer };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Microphone button: speak a search. Hidden on browsers without speech recognition. */
export default function VoiceButton({ onText }: { onText: (text: string, final: boolean) => void }) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState("");
  const rec = useRef<Recognizer | null>(null);

  useEffect(() => setSupported(!!getRecognizer()), []);

  function toggle() {
    if (listening) {
      rec.current?.stop();
      return;
    }
    const R = getRecognizer();
    if (!R) return;
    const r = new R();
    r.lang = "en-US";
    r.interimResults = true;
    r.continuous = false;
    r.onresult = (e) => {
      let text = "";
      let final = false;
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
        if (e.results[i].isFinal) final = true;
      }
      onText(text, final);
    };
    r.onerror = (e) => setErr(e.error === "not-allowed" ? "Microphone access is off for this site." : "Didn't catch that. Try again.");
    r.onend = () => setListening(false);
    rec.current = r;
    setErr("");
    setListening(true);
    haptic();
    try {
      r.start();
    } catch {
      setListening(false);
    }
  }

  if (!supported) return null;
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={listening ? "Stop listening" : "Search by voice"}
        aria-pressed={listening}
        className={
          "absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl active:scale-95 " +
          (listening ? "animate-pulse bg-red-600 text-white" : "text-navy-800 dark:text-gold-300")
        }
      >
        <Icon name="mic" size={20} />
      </button>
      {err ? <p className="absolute -bottom-5 right-2 text-[11px] text-red-600">{err}</p> : null}
    </>
  );
}
