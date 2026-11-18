import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="mt-2 text-slate-500">That page or entry doesn&apos;t exist.</p>
      <Link href="/" className="mt-4 inline-block text-brand underline dark:text-brand-dark">Back to Browse</Link>
    </div>
  );
}
