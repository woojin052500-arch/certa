"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getTierInfo } from "@/lib/gamification";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

export default function MyPage() {
  const [profile, setProfile] = useState<any>(null);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // 프로필 가져오기
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (prof) setProfile(prof);

      // 최근 성적 가져오기 (certifications 테이블 조인 불가 시 분리해서 가져오거나 RLS 허용 가정)
      // Supabase 릴레이션이 설정되어 있다면 cert_id(name) 형태로 가져올 수 있습니다.
      const { data: results } = await supabase
        .from("quiz_results")
        .select(`
          id, score, total_questions, exp_earned, created_at,
          cert_id
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (results) setRecentResults(results);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="text-center py-20 animate-pulse text-slate-400">데이터를 불러오는 중...</div>;

  if (!profile) return <div className="text-center py-20 text-slate-500">프로필 정보가 없습니다. (Supabase 테이블 설정을 확인해주세요)</div>;

  const tierInfo = getTierInfo(profile.exp || 0);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

      {/* 1. 프로필 & 게이미피케이션 섹션 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 mb-8 shadow-sm">
        <div className="shrink-0 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={profile.avatar_url || "/logo.svg"} 
            alt="profile" 
            className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover"
          />
          <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${tierInfo.currentTier.bg} ${tierInfo.currentTier.color} border-2 border-white`}>
            {tierInfo.currentTier.name}
          </div>
        </div>
        
        <div className="flex-1 w-full text-center md:text-left">
          <h2 className="text-xl font-bold mb-1">{profile.full_name || "사용자"}</h2>
          <p className="text-sm text-slate-500 mb-4">현재까지 모은 경험치: <strong>{profile.exp?.toLocaleString() || 0} EXP</strong></p>
          
          <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden border border-slate-200">
            <div 
              className={`h-full ${tierInfo.currentTier.bg.replace('bg-', 'bg-').replace('-100', '-500')} transition-all duration-500`}
              style={{ width: `${tierInfo.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>{tierInfo.currentTier.name}</span>
            {tierInfo.expToNext > 0 ? (
              <span>다음 티어({tierInfo.nextTier.name})까지 {tierInfo.expToNext.toLocaleString()} EXP</span>
            ) : (
              <span>최고 티어 달성!</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 2. 최근 모의고사 성적 (학습 통계) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
            최근 모의고사 기록
            <Link href="/quiz" className="text-xs font-normal text-indigo-500 hover:underline">문제 풀러가기 &rarr;</Link>
          </h3>
          
          {recentResults.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentResults.map((r, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">{new Date(r.created_at).toLocaleDateString()}</p>
                    <p className="text-sm font-medium">점수: {r.score} / {r.total_questions}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{Math.round((r.score / r.total_questions) * 100)}점</p>
                    <p className="text-xs text-green-500 font-medium">+{r.exp_earned} EXP</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-400 bg-slate-50 rounded-xl">
              아직 모의고사 기록이 없어요.<br/>지금 바로 실력을 테스트해보세요!
            </div>
          )}
        </div>

        {/* 3. 오답노트 (향후 구현 예정 영역) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">나만의 오답노트</h3>
          <p className="text-sm text-slate-500 mb-5">
            자주 틀리는 문제들만 따로 모아<br/>약점을 보완할 수 있는 기능이 곧 오픈됩니다!
          </p>
          <button disabled className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
            출시 준비 중
          </button>
        </div>
      </div>

      <AdBanner unit="DAN-Jdt1adls7aCA1gf3" width="320" height="100" />
    </div>
  );
}
