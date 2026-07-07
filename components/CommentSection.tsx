"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CommunityComment } from "@/lib/types";

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: CommunityComment[];
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);

    const { data, error } = await supabase
      .from("community_comments")
      .insert({
        post_id: postId,
        content,
        author_name: authorName.trim() || "익명",
      })
      .select()
      .single();

    setSubmitting(false);
    if (!error && data) {
      setComments([...comments, data as CommunityComment]);
      setContent("");
      router.refresh();
    }
  };

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">댓글 {comments.length}개</h2>
      <div className="flex flex-col gap-3 mb-6">
        {comments.map((c) => (
          <div key={c.id} className="rounded-md bg-slate-50 px-4 py-3 text-sm">
            <p className="text-xs text-slate-400 mb-1">{c.author_name}</p>
            <p>{c.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-slate-400">첫 댓글을 남겨보세요.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="닉네임"
            className="text-sm border border-slate-300 rounded-md px-3 py-2 w-32"
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="text-sm border border-slate-300 rounded-md px-3 py-2 flex-1"
          />
          <button
            type="submit"
            disabled={submitting}
            className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:opacity-60"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
