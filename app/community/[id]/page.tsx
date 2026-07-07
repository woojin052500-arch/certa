import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CommunityComment, CommunityPost } from "@/lib/types";
import CommentSection from "@/components/CommentSection";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("community_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from("community_comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const typedPost = post as CommunityPost;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1">{typedPost.title}</h1>
      <p className="text-xs text-slate-400 mb-6">
        {typedPost.author_name} ·{" "}
        {typedPost.created_at
          ? new Date(typedPost.created_at).toLocaleString()
          : ""}
      </p>
      <p className="text-sm leading-relaxed whitespace-pre-wrap mb-8">
        {typedPost.content}
      </p>

      <AdBanner slot="post-detail" className="mb-8" />

      <CommentSection
        postId={id}
        initialComments={(comments ?? []) as CommunityComment[]}
      />
    </div>
  );
}
