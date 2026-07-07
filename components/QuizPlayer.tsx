"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import RewardedAdButton from "@/components/RewardedAdButton";
import AdBanner from "@/components/AdBanner";

export default function QuizPlayer({
  certName,
  questions,
}: {
  certName: string;
  questions: QuizQuestion[];
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        아직 등록된 문제가 없어요. 곧 업데이트할게요.
      </p>
    );
  }

  const q = questions[index];
  const isCorrect = selected === q.answer_index;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer_index) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-slate-500 mb-2">{certName} 문제풀이 결과</p>
        <p className="text-3xl font-bold mb-6">
          {score} / {questions.length}
        </p>
        <AdBanner unit="DAN-rVbdlrqWzZ8RUDtG" width="320" height="50" className="mb-8" />
        <button
          onClick={() => {
            setIndex(0);
            setScore(0);
            setSelected(null);
            setShowExplanation(false);
            setFinished(false);
          }}
          className="rounded-md bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700"
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-slate-400 mb-2">
        {index + 1} / {questions.length} · 예시 문제
      </p>
      <h2 className="text-lg font-semibold mb-5">{q.question}</h2>
      <div className="grid gap-2 mb-6">
        {q.choices.map((choice, i) => {
          const isPicked = selected === i;
          const showCorrect = selected !== null && i === q.answer_index;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`text-left rounded-lg border px-4 py-3 text-sm transition ${
                showCorrect
                  ? "border-green-500 bg-green-50"
                  : isPicked
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mb-6">
          <p
            className={`text-sm font-medium mb-3 ${
              isCorrect ? "text-green-600" : "text-red-500"
            }`}
          >
            {isCorrect ? "정답이에요!" : "아쉬워요, 오답이에요."}
          </p>

          {!showExplanation ? (
            <RewardedAdButton onRewarded={() => setShowExplanation(true)} />
          ) : (
            <div className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {q.explanation ?? "해설이 아직 준비되지 않았어요."}
            </div>
          )}
        </div>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="rounded-md bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700"
        >
          {index + 1 < questions.length ? "다음 문제" : "결과 보기"}
        </button>
      )}
    </div>
  );
}
