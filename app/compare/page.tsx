import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/types";
import CompareTable from "@/components/CompareTable";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";
export default async function ComparePage() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("pass_rate", { ascending: false });

  const certs = (data ?? []) as Certification[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">자격증 비교</h1>
      <p className="text-sm text-slate-500 mb-6">
        응시료·준비기간·합격률을 기준으로 자격증을 비교해보세요.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 text-amber-800 text-sm px-4 py-3">
          데이터를 불러오지 못했어요. Supabase 프로젝트에{" "}
          <code className="font-mono">supabase/schema.sql</code>을 아직 실행하지
          않았다면, Supabase 대시보드 SQL Editor에서 실행해주세요.
        </div>
      )}

      <CompareTable certs={certs} />

      <div className="mt-8">
        <AdBanner slot="compare-bottom" />
      </div>
    </div>
  );
}
