import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Certification, QuizQuestion } from "@/lib/types";
import MockExamPlayer from "@/components/MockExamPlayer";

export const dynamic = "force-dynamic";
export default async function MockExamPage({
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
      <h1 className="text-xl font-bold mb-1">{typedCert.name}</h1>
      <p className="text-xs text-slate-400 mb-8">모의고사</p>
      <MockExamPlayer
        certId={certId}
        certName={typedCert.name}
        questions={(questions ?? []) as QuizQuestion[]}
      />
    </div>
  );
}
