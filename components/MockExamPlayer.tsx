"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QuizQuestion } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { supabase } from "@/lib/supabase";

type Answers = Record<string, number | undefined>;

export default function MockExamPlayer({
  certId,
  certName,
  questions,
}: {
  certId: string;
  certName: string;
  questions: QuizQuestion[];
}) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewUnlocked, setReviewUnlocked] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const score = useMemo(() => {
    return questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.answer_index ? 1 : 0),
      0
    );
  }, [answers, questions]);

  if (questions.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        아직 모의고사를 구성할 문제가 부족해요. 곧 업데이트할게요.
      </p>
    );
  }

  if (!started) {
    return (
      <div className="rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold mb-2">{certName} 모의고사</h2>
        <p className="text-sm text-slate-500 mb-1">
          총 {questions.length}문제 · 연습문제로 구성 (실제 기출문제 아님)
        </p>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed break-keep">
          실제 시험처럼 제한 없이 푼 뒤 한 번에 채점됩니다. <br className="hidden sm:block" />
          모든 문제에 대한 <strong>성적표와 명쾌한 해설</strong>은 채점 완료 후 확인하실 수 있어요!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="rounded-md bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700"
        >
          모의고사 시작하기
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div>
        <div className="text-center py-8">
          <p className="text-sm text-slate-500 mb-2">{certName} 모의고사 결과</p>
          <p className="text-3xl font-bold mb-1">
            {score} / {questions.length}
          </p>
          <p className="text-sm text-slate-400">
            {Math.round((score / questions.length) * 100)}점
          </p>
        </div>

        {!reviewUnlocked ? (
          <div className="text-center py-6">
            <p className="text-sm text-slate-500 mb-4">
              문제별 첨삭(정답 · 해설)은 광고를 보면 열람할 수 있어요.
            </p>
            <RewardedAdButton
              label="광고 보고 첨삭 전체 보기"
              onRewarded={() => setReviewUnlocked(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-6">
            {questions.map((q, i) => {
              const picked = answers[q.id];
              const correct = picked === q.answer_index;
              return (
                <div
                  key={q.id}
                  className={`rounded-lg border p-4 text-sm ${
                    correct ? "border-green-200" : "border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium pr-4">
                      {i + 1}. {q.question}
                    </p>
                    {!correct && (
                      <button 
                        onClick={async () => {
                          const { data: { session } } = await supabase.auth.getSession();
                          if (session) {
                            await supabase.from("saved_questions").insert({
                              user_id: session.user.id,
                              question_id: q.id
                            });
                            alert("오답노트에 저장되었습니다!");
                          } else {
                            alert("로그인이 필요합니다.");
                          }
                        }}
                        className="shrink-0 flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-indigo-600 bg-slate-100 px-2 py-1 rounded transition"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        저장
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    내 답:{" "}
                    {picked !== undefined ? q.choices[picked] : "미응답"} ·
                    정답: {q.choices[q.answer_index]}
                  </p>
                  <p className="text-xs text-slate-400">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        )}

        <AdBanner unit="DAN-rVbdlrqWzZ8RUDtG" width="320" height="50" className="my-8" />

        <div className="flex gap-3">
          <button
            onClick={() => {
              setStarted(false);
              setIndex(0);
              setAnswers({});
              setSubmitted(false);
              setReviewUnlocked(false);
            }}
            className="text-sm rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-50"
          >
            다시 풀기
          </button>
          <Link
            href={`/quiz/${certId}`}
            className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
          >
            한 문제씩 풀어보기
          </Link>
        </div>
      </div>
    );
  }

  // 결과 보기 전 대형 광고(보상형 대체) 모달
  if (showAdModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b text-center bg-indigo-50/50">
            <h3 className="font-bold text-lg text-indigo-900">수고하셨습니다! 🎉</h3>
            <p className="text-xs text-indigo-700 mt-1 font-medium">아래 광고를 닫으면 채점 결과와 전체 해설이 바로 공개됩니다.</p>
          </div>
          
          <div className="p-4 bg-slate-50 flex justify-center items-center min-h-[250px]">
            <KakaoAdFit unit="DAN-d8d5pMi10MsuwcMM" width="300" height="250" />
          </div>

          <div className="p-4">
            <button
              onClick={async () => {
                setShowAdModal(false);
                setSubmitted(true);
                setReviewUnlocked(true);

                // 결과 저장 및 경험치 획득 로직
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                  const earnedExp = score * 10 + 50; // 문제당 10점 + 완료 보너스 50점
                  
                  // 1. quiz_results 저장
                  await supabase.from("quiz_results").insert({
                    user_id: session.user.id,
                    cert_id: certId,
                    score,
                    total_questions: questions.length,
                    exp_earned: earnedExp
                  });

                  // 2. 현재 프로필 EXP 가져와서 업데이트
                  const { data: prof } = await supabase.from("profiles").select("exp").eq("id", session.user.id).single();
                  if (prof) {
                    await supabase.from("profiles").update({ exp: prof.exp + earnedExp }).eq("id", session.user.id);
                  }
                }
              }}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
            >
              광고 닫고 결과 확인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-400">
          {index + 1} / {questions.length}
        </p>
        <p className="text-xs text-slate-400">
          답변 완료 {Object.keys(answers).length} / {questions.length}
        </p>
      </div>
      <h2 className="text-lg font-semibold mb-5">{q.question}</h2>
      <div className="grid gap-2 mb-6">
        {q.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
            className={`text-left rounded-lg border px-4 py-3 text-sm transition ${
              answers[q.id] === i
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="text-sm rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-50 disabled:opacity-40"
        >
          이전
        </button>
        {index + 1 < questions.length ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
          >
            다음
          </button>
        ) : (
          <button
            onClick={() => setShowAdModal(true)}
            className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
          >
            제출하고 채점하기
          </button>
        )}
      </div>
    </div>
  );
}
