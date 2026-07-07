import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/types";

export default async function QuizIndexPage() {
  const { data } = await supabase.from("certifications").select("*");
  const certs = (data ?? []) as Certification[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">문제풀이</h1>
      <p className="text-sm text-slate-500 mb-1">
        풀어볼 자격증을 선택하세요.
      </p>
      <p className="text-xs text-slate-400 mb-6">
        수록된 문제는 자체 제작한 연습문제이며 실제 기출문제가 아닙니다.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {certs.map((c) => (
          <Link
            key={c.id}
            href={`/quiz/${c.id}`}
            className="rounded-lg border border-slate-200 px-4 py-4 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <p className="font-medium text-sm">{c.name}</p>
            <p className="text-xs text-slate-400">{c.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
