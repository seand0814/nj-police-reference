import Link from "next/link";
import type { ReactNode } from "react";

/** Renders **bold** and in-app links (/entry/..., /go/..., /s/...) inside a line of text. */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  // No lookbehind (older iOS Safari lacks it); check the preceding character instead.
  const re = /(\*\*[^*]+\*\*)|(\/(?:entry|go|s)\/[a-z0-9-]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${keyBase}-b${i++}`}>{m[1].slice(2, -2)}</strong>);
    else if (m[2] && m.index > 0 && /[A-Za-z0-9.]/.test(text[m.index - 1])) {
      out.push(m[2]); // part of a longer URL or path; leave as text
    } else if (m[2]) {
      const href = m[2];
      out.push(
        <Link key={`${keyBase}-l${i++}`} href={href} className="font-medium text-brand underline dark:text-brand-dark">
          Open in app ›
        </Link>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Small, safe Markdown subset for assistant answers: headings, bullets, numbered lists, bold, app links. */
export default function ChatText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  function flush(k: number) {
    if (!list) return;
    const items = list.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>);
    blocks.push(
      list.ordered ? (
        <ol key={`ol${k}`} className="my-2 list-decimal space-y-1 pl-5">{items}</ol>
      ) : (
        <ul key={`ul${k}`} className="my-2 list-disc space-y-1 pl-5">{items}</ul>
      )
    );
    list = null;
  }

  lines.forEach((raw, k) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const num = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const head = line.match(/^#{1,4}\s+(.*)$/);
    if (bullet || num) {
      const ordered = !!num;
      if (list && list.ordered !== ordered) flush(k);
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? num)![1]);
      return;
    }
    flush(k);
    if (!line.trim()) return;
    if (head) blocks.push(<p key={k} className="mt-3 font-bold">{inline(head[1], String(k))}</p>);
    else blocks.push(<p key={k} className="my-2">{inline(line, String(k))}</p>);
  });
  flush(lines.length);
  return <div className="leading-relaxed">{blocks}</div>;
}
