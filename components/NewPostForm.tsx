"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/types";

export default function NewPostForm({ certs }: { certs: Certification[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [postType, setPostType] = useState("general");
  const [certId, setCertId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("community_posts")
      .insert({
        title,
        content,
        author_name: authorName.trim() || "익명",
        post_type: postType,
        cert_id: certId || null,
      })
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      setErrorMsg("글 등록에 실패했어요. Supabase 스키마가 설정됐는지 확인해주세요.");
      return;
    }
    
    router.refresh(); // 라우터 캐시 무효화
    router.push(`/community/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMsg && (
        <div className="rounded-md border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
          {errorMsg}
        </div>
      )}
      <div className="flex gap-3">
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="text-sm border border-slate-300 rounded-md px-3 py-2"
        >
          <option value="general">자유</option>
          <option value="study_group">스터디 모집</option>
          <option value="question">질문</option>
        </select>
        <select
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="text-sm border border-slate-300 rounded-md px-3 py-2 flex-1"
        >
          <option value="">관련 자격증 (선택)</option>
          {certs.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <input
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="닉네임 (선택, 비우면 익명)"
        className="text-sm border border-slate-300 rounded-md px-3 py-2"
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
        className="text-sm border border-slate-300 rounded-md px-3 py-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        required
        rows={8}
        className="text-sm border border-slate-300 rounded-md px-3 py-2"
      />
      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-md bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
      >
        {submitting ? "등록 중..." : "등록하기"}
      </button>
    </form>
  );
}
