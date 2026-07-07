import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CommunityPost } from "@/lib/types";
import AdBanner from "@/components/AdBanner";

const TYPE_LABEL: Record<string, string> = {
  general: "자유",
  study_group: "스터디 모집",
  question: "질문",
};

export default async function CommunityPage() {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as CommunityPost[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">커뮤니티</h1>
          <p className="text-sm text-slate-500">
            같은 시험 준비하는 사람들과 정보를 나눠보세요.
          </p>
        </div>
        <Link
          href="/community/new"
          className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 whitespace-nowrap"
        >
          글쓰기
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 text-amber-800 text-sm px-4 py-3">
          데이터를 불러오지 못했어요. Supabase에 schema.sql을 먼저 실행해주세요.
        </div>
      )}

      <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/community/${p.id}`}
            className="block px-4 py-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {TYPE_LABEL[p.post_type] ?? "자유"}
              </span>
              <span className="font-medium text-sm">{p.title}</span>
            </div>
            <p className="text-xs text-slate-400">
              {p.author_name} ·{" "}
              {p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}
            </p>
          </Link>
        ))}
        {posts.length === 0 && !error && (
          <p className="text-center text-sm text-slate-400 py-10">
            아직 글이 없어요. 첫 글을 남겨보세요!
          </p>
        )}
      </div>

      <div className="mt-8">
        <AdBanner slot="community-list" />
      </div>
    </div>
  );
}
