import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Certification, QuizQuestion } from "@/lib/types";
import QuizPlayer from "@/components/QuizPlayer";

export const dynamic = "force-dynamic";
export default async function QuizPlayPage({
  params,
}: {
  params: Promise<{ certId: string }>;
}) {
  const { certId } = await params;

  const { data: cert } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", certId)
    .single();

  if (!cert) notFound();

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("cert_id", certId);

  const typedCert = cert as Certification;

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold">{typedCert.name}</h1>
        <Link
          href={`/quiz/${certId}/mock`}
          className="text-xs rounded-md bg-indigo-600 text-white px-3 py-1.5 hover:bg-indigo-700 whitespace-nowrap"
        >
          모의고사로 풀기
        </Link>
      </div>
      <p className="text-xs text-slate-400 mb-8">
        문제풀이 (한 문제씩) · 연습문제, 실제 기출문제 아님
      </p>
      <QuizPlayer
        certName={typedCert.name}
        questions={(questions ?? []) as QuizQuestion[]}
      />
    </div>
  );
}
