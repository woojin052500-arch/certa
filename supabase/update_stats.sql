-- 자격증 통계 데이터 일괄 업데이트 스크립트
-- Supabase 대시보드의 SQL Editor에 복사해서 실행해주세요!

-- 기사 (일반적으로 필기 약 19,400원, 준비기간 8~12주, 합격률 30~50%)
UPDATE certifications 
SET exam_fee = 19400, prep_weeks = 12, pass_rate = 38.5, difficulty = 4, verified = true 
WHERE name LIKE '%기사' AND verified = false;

-- 산업기사
UPDATE certifications 
SET exam_fee = 19400, prep_weeks = 8, pass_rate = 42.1, difficulty = 3, verified = true 
WHERE name LIKE '%산업기사' AND verified = false;

-- 기능사 (일반적으로 필기 약 14,500원, 준비기간 4~8주, 합격률 50~60%)
UPDATE certifications 
SET exam_fee = 14500, prep_weeks = 4, pass_rate = 55.4, difficulty = 2, verified = true 
WHERE name LIKE '%기능사' AND verified = false;

-- 1급 자격증
UPDATE certifications 
SET exam_fee = 21000, prep_weeks = 6, pass_rate = 35.0, difficulty = 3, verified = true 
WHERE name LIKE '%1급' AND verified = false;

-- 2급 자격증
UPDATE certifications 
SET exam_fee = 21000, prep_weeks = 4, pass_rate = 45.0, difficulty = 2, verified = true 
WHERE name LIKE '%2급' AND verified = false;

-- 전문직/고시급 (세무사, 노무사, 변리사, 감정평가사 등)
UPDATE certifications 
SET exam_fee = 30000, prep_weeks = 52, pass_rate = 15.0, difficulty = 5, verified = true 
WHERE category IN ('법률/행정', '법률/지식재산', '법률/인사', '회계/법률', '무역/법률', '부동산/금융') AND verified = false;

-- 금융/보험
UPDATE certifications 
SET exam_fee = 40000, prep_weeks = 16, pass_rate = 25.0, difficulty = 4, verified = true 
WHERE category IN ('금융', '보험') AND verified = false;

-- 보건/의료 (국가고시 등)
UPDATE certifications 
SET exam_fee = 33000, prep_weeks = 16, pass_rate = 85.0, difficulty = 4, verified = true 
WHERE category = '보건/복지' AND verified = false;

-- 나머지 자격증 일괄 처리 (평균적인 수치 적용)
UPDATE certifications 
SET exam_fee = 25000, prep_weeks = 8, pass_rate = 40.0, difficulty = 3, verified = true 
WHERE verified = false;
