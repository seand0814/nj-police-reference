import Link from "next/link";
import { notFound } from "next/navigation";
import { allEntries, categories, categoryBySlug } from "@/lib/content";
import { Card, PageTitle } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories().map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const rows = allEntries().filter((e) => e.category === cat.name);

  return (
    <>
      <Link href="/" className="text-sm text-brand dark:text-brand-dark">← All categories</Link>
      <PageTitle sub={`${rows.length} entries`}>{cat.name}</PageTitle>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.id}>
            <Card href={`/entry/${r.id}`}>
              <div className="font-medium">{r.title}</div>
              {r.citation ? <div className="text-sm text-slate-500">{r.citation}</div> : null}
              {r.grade_or_penalty ? (
                <div className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">{r.grade_or_penalty}</div>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
