import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/types";
import RecommendQuiz from "@/components/RecommendQuiz";

export default async function RecommendPage() {
  const { data } = await supabase.from("certifications").select("*");
  const certs = (data ?? []) as Certification[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">자격증 추천받기</h1>
      <p className="text-sm text-slate-500 mb-1">
        간단한 질문 3개로 나에게 맞는 자격증을 찾아드려요.
      </p>
      <p className="text-xs text-slate-400 mb-8">
        응시료·합격률이 확인된 자격증 중에서만 추천해요. 더 많은 자격증은{" "}
        <a href="/compare" className="underline">전체 비교표</a>에서 볼 수 있어요.
      </p>
      <RecommendQuiz certs={certs} />
    </div>
  );
}
