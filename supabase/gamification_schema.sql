-- 1. 사용자 프로필(profiles) 테이블
-- Supabase auth.users 테이블과 1:1로 매칭되는 확장 테이블입니다.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  exp integer DEFAULT 0, -- 경험치
  tier text DEFAULT 'Iron', -- 롤 티어 (Iron, Bronze, Silver, Gold, Platinum, Emerald, Diamond, Master, Grandmaster, Challenger)
  last_attendance_date date, -- 마지막 출석일 (매일 출석체크용)
  attendance_streak integer DEFAULT 0, -- 연속 출석 일수
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 새 사용자가 가입할 때 자동으로 profile을 생성하는 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users에 insert가 발생하면 트리거 실행 (기존 트리거가 있으면 삭제 후 생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. 모의고사 결과(quiz_results) 테이블
-- 사용자가 모의고사를 끝냈을 때 점수와 정보를 저장합니다.
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cert_id uuid REFERENCES public.certifications(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  exp_earned integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. 오답노트(saved_questions) 테이블
-- 사용자가 나중에 다시 보기 위해 저장한 문제들입니다.
CREATE TABLE IF NOT EXISTS public.saved_questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  memo text, -- 오답 노트 메모 (선택)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, question_id) -- 한 문제는 한 번만 저장 가능
);

-- 5. Row Level Security (RLS) 설정
-- 각 사용자는 자신의 데이터만 읽고 쓸 수 있도록 보안 규칙을 설정합니다.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_questions ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Quiz Results RLS
CREATE POLICY "Users can view own quiz results" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz results" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved Questions RLS
CREATE POLICY "Users can view own saved questions" ON public.saved_questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved questions" ON public.saved_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved questions" ON public.saved_questions FOR DELETE USING (auth.uid() = user_id);
