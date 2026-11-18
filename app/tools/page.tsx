import Converter from "@/components/Converter";
import { PageTitle } from "@/components/ui";

export default function ToolsPage() {
  return (
    <>
      <PageTitle sub="Unit conversions">Tools</PageTitle>
      <Converter />
      <p className="mt-3 text-sm text-slate-500">Marijuana threshold reference: 6 oz ≈ 170 g; 17 g hashish ≈ 0.6 oz.</p>
    </>
  );
}
