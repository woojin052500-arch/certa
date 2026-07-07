"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { QuizQuestion } from "@/lib/types";
import AdBanner from "@/components/AdBanner";

interface SavedQuestionItem {
  id: string;
  created_at: string;
  memo: string | null;
  quiz_questions: QuizQuestion;
}

export default function SavedQuestionsPage() {
  const [questions, setQuestions] = useState<SavedQuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedQuestions = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("saved_questions")
      .select(`
        id,
        created_at,
        memo,
        quiz_questions (*)
      `)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Supabase join syntax returns objects or arrays. In a 1:1 foreign key, it returns an object.
      setQuestions(data as unknown as SavedQuestionItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedQuestions();
  }, []);

  const handleRemove = async (id: string) => {
    const confirmDelete = window.confirm("오답노트에서 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("saved_questions").delete().eq("id", id);
    if (!error) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return <div className="py-20 text-center animate-pulse text-slate-400">오답노트를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/mypage" className="text-sm text-indigo-600 hover:underline mb-2 inline-block">
          &larr; 마이페이지로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">나만의 오답노트</h1>
        <p className="text-sm text-slate-500 mt-1">틀렸던 문제들을 복습하고 약점을 보완하세요.</p>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-slate-500 mb-2">아직 저장된 문제가 없어요.</p>
          <Link href="/quiz" className="text-sm text-indigo-600 hover:underline">
            모의고사 풀러가기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {questions.map((item, idx) => {
            const q = item.quiz_questions;
            if (!q) return null; // 혹시라도 연결된 문제가 삭제된 경우 방어
            
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-500">
                    저장일: {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded"
                  >
                    삭제
                  </button>
                </div>
                <div className="p-5">
                  <p className="font-bold text-lg mb-4 leading-relaxed">
                    <span className="text-indigo-600 mr-2">Q{questions.length - idx}.</span> 
                    {q.question}
                  </p>
                  
                  <div className="grid gap-2 mb-6">
                    {q.choices.map((choice, i) => (
                      <div 
                        key={i} 
                        className={`px-4 py-3 rounded-lg border text-sm ${
                          i === q.answer_index 
                            ? "bg-indigo-50 border-indigo-200 font-medium text-indigo-900" 
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        {i + 1}. {choice}
                        {i === q.answer_index && <span className="ml-2 text-indigo-600 text-xs font-bold">(정답)</span>}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-1">해설</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <AdBanner unit="DAN-rVbdlrqWzZ8RUDtG" width="320" height="50" />
      </div>
    </div>
  );
}
