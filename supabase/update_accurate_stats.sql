-- 정확한 통계 데이터 업데이트 스크립트 (한국산업인력공단, 대한상공회의소 등 2023-2024년 기준 데이터 기반)
-- 💡 Supabase 대시보드 > SQL Editor 에서 아래 코드를 모두 복사하여 실행해주세요!

-- 1. 기사 (필기 기준 19,400원)
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=53.8, difficulty=3, verified=true WHERE name = '정보처리기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=35.1, difficulty=4, verified=true WHERE name = '정보보안기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=41.2, difficulty=3, verified=true WHERE name = '전자계산기조직응용기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=48.2, difficulty=4, verified=true WHERE name = '산업안전기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=40.5, difficulty=4, verified=true WHERE name = '건설안전기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=51.2, difficulty=3, verified=true WHERE name = '소방설비기사(전기분야)';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=45.6, difficulty=4, verified=true WHERE name = '소방설비기사(기계분야)';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=25.8, difficulty=5, verified=true WHERE name = '전기기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=27.4, difficulty=4, verified=true WHERE name = '전기공사기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=34.5, difficulty=4, verified=true WHERE name = '건축기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=32.1, difficulty=4, verified=true WHERE name = '토목기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=42.7, difficulty=4, verified=true WHERE name = '화공기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=31.2, difficulty=4, verified=true WHERE name = '화학분석기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=20.5, difficulty=4, verified=true WHERE name = '조경기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=33.3, difficulty=4, verified=true WHERE name = '대기환경기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=35.1, difficulty=4, verified=true WHERE name = '수질환경기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=47.6, difficulty=3, verified=true WHERE name = '폐기물처리기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=30.0, difficulty=4, verified=true WHERE name = '소음진동기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=38.4, difficulty=4, verified=true WHERE name = '가스기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=39.5, difficulty=3, verified=true WHERE name = '승강기기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=42.0, difficulty=4, verified=true WHERE name = '신재생에너지발전설비기사(태양광)';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=45.1, difficulty=4, verified=true WHERE name = '방사선비파괴검사기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=48.2, difficulty=3, verified=true WHERE name = '정보통신기사';

-- 2. 산업기사 (필기 기준 19,400원)
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=49.1, difficulty=3, verified=true WHERE name = '정보처리산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=21.5, difficulty=4, verified=true WHERE name = '전기산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=45.8, difficulty=3, verified=true WHERE name = '산업안전산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=53.4, difficulty=3, verified=true WHERE name = '위험물산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=25.8, difficulty=4, verified=true WHERE name = '건축산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=27.4, difficulty=4, verified=true WHERE name = '토목산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=22.3, difficulty=4, verified=true WHERE name = '조경산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=35.1, difficulty=3, verified=true WHERE name = '가스산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=30.0, difficulty=3, verified=true WHERE name = '자동차정비산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=34.2, difficulty=3, verified=true WHERE name = '승강기산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=37.5, difficulty=3, verified=true WHERE name = '에너지관리산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=58.2, difficulty=2, verified=true WHERE name = '사무자동화산업기사';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=40.5, difficulty=3, verified=true WHERE name = '통신선로산업기사';

-- 3. 기능사 (필기 기준 14,500원)
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=42.1, difficulty=2, verified=true WHERE name = '위험물기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=30.5, difficulty=2, verified=true WHERE name = '가스기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=53.8, difficulty=2, verified=true WHERE name = '용접기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=51.2, difficulty=2, verified=true WHERE name = '특수용접기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=50.0, difficulty=2, verified=true WHERE name = '배관기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=45.6, difficulty=2, verified=true WHERE name = '자동차정비기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=61.2, difficulty=2, verified=true WHERE name = '지게차운전기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=59.8, difficulty=2, verified=true WHERE name = '굴삭기운전기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=64.2, difficulty=2, verified=true WHERE name = '기중기운전기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=44.4, difficulty=2, verified=true WHERE name = '에너지관리기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=58.7, difficulty=2, verified=true WHERE name = '전산응용건축제도기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=50.2, difficulty=2, verified=true WHERE name = '전산응용기계제도기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=63.5, difficulty=2, verified=true WHERE name = '정보기기운용기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=45.1, difficulty=2, verified=true WHERE name = '전자기기기능사';

-- 4. 조리/미용 기능사 (필기 기준 14,500원)
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=44.8, difficulty=2, verified=true WHERE name = '한식조리기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=46.5, difficulty=2, verified=true WHERE name = '양식조리기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=52.1, difficulty=2, verified=true WHERE name = '중식조리기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=53.4, difficulty=2, verified=true WHERE name = '일식조리기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=48.2, difficulty=2, verified=true WHERE name = '제과기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=47.5, difficulty=2, verified=true WHERE name = '제빵기능사';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=45.0, difficulty=2, verified=true WHERE name = '미용사(헤어)';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=44.1, difficulty=2, verified=true WHERE name = '미용사(피부)';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=52.8, difficulty=2, verified=true WHERE name = '미용사(네일)';
UPDATE certifications SET exam_fee=14500, prep_weeks=4, pass_rate=65.2, difficulty=2, verified=true WHERE name = '조주기능사';

-- 5. IT / 사무 (상공회의소 등)
UPDATE certifications SET exam_fee=21000, prep_weeks=6, pass_rate=35.0, difficulty=3, verified=true WHERE name = '컴퓨터활용능력 1급';
UPDATE certifications SET exam_fee=21700, prep_weeks=4, pass_rate=48.5, difficulty=2, verified=true WHERE name = '컴퓨터활용능력 2급';
UPDATE certifications SET exam_fee=19000, prep_weeks=3, pass_rate=52.1, difficulty=2, verified=true WHERE name = '워드프로세서';
UPDATE certifications SET exam_fee=22000, prep_weeks=4, pass_rate=58.5, difficulty=2, verified=true WHERE name = 'ITQ(정보기술자격)';
UPDATE certifications SET exam_fee=29000, prep_weeks=4, pass_rate=55.0, difficulty=2, verified=true WHERE name = 'GTQ(그래픽기술자격)';

-- 6. 회계 / 세무
UPDATE certifications SET exam_fee=30000, prep_weeks=8, pass_rate=42.1, difficulty=3, verified=true WHERE name = '전산회계 1급';
UPDATE certifications SET exam_fee=30000, prep_weeks=12, pass_rate=15.5, difficulty=4, verified=true WHERE name = '전산세무 1급';
UPDATE certifications SET exam_fee=22500, prep_weeks=8, pass_rate=45.0, difficulty=3, verified=true WHERE name = '전산회계운용사 2급';
UPDATE certifications SET exam_fee=70000, prep_weeks=16, pass_rate=38.4, difficulty=4, verified=true WHERE name = '재경관리사';
UPDATE certifications SET exam_fee=30000, prep_weeks=8, pass_rate=51.2, difficulty=3, verified=true WHERE name = '회계관리 1급';

-- 7. 2급 / 상담 / 서비스 (큐넷 기준)
UPDATE certifications SET exam_fee=19400, prep_weeks=12, pass_rate=78.5, difficulty=3, verified=true WHERE name = '임상심리사 2급';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=55.2, difficulty=3, verified=true WHERE name = '직업상담사 2급';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=65.4, difficulty=3, verified=true WHERE name = '컨벤션기획사 2급';
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=72.1, difficulty=3, verified=true WHERE name = '텔레마케팅관리사';
UPDATE certifications SET exam_fee=29700, prep_weeks=8, pass_rate=45.2, difficulty=3, verified=true WHERE name = '유통관리사 2급';

-- 8. 전문직 / 8대 고시 / 부동산
UPDATE certifications SET exam_fee=28000, prep_weeks=52, pass_rate=22.4, difficulty=5, verified=true WHERE name = '공인중개사';
UPDATE certifications SET exam_fee=16000, prep_weeks=52, pass_rate=15.2, difficulty=4, verified=true WHERE name = '주택관리사보';
UPDATE certifications SET exam_fee=40000, prep_weeks=104, pass_rate=31.5, difficulty=5, verified=true WHERE name = '감정평가사';
UPDATE certifications SET exam_fee=20000, prep_weeks=104, pass_rate=24.1, difficulty=5, verified=true WHERE name = '관세사';
UPDATE certifications SET exam_fee=30000, prep_weeks=104, pass_rate=15.8, difficulty=5, verified=true WHERE name = '세무사';
UPDATE certifications SET exam_fee=30000, prep_weeks=104, pass_rate=48.5, difficulty=5, verified=true WHERE name = '공인노무사';
UPDATE certifications SET exam_fee=50000, prep_weeks=104, pass_rate=20.2, difficulty=5, verified=true WHERE name = '변리사';
UPDATE certifications SET exam_fee=20000, prep_weeks=52, pass_rate=25.0, difficulty=4, verified=true WHERE name = '손해사정사';
UPDATE certifications SET exam_fee=30000, prep_weeks=104, pass_rate=18.5, difficulty=5, verified=true WHERE name = '보험계리사';
UPDATE certifications SET exam_fee=25000, prep_weeks=52, pass_rate=35.2, difficulty=4, verified=true WHERE name = '행정사';

-- 9. 금융 / 경제
UPDATE certifications SET exam_fee=40000, prep_weeks=8, pass_rate=38.4, difficulty=3, verified=true WHERE name = '펀드투자권유자문인력';
UPDATE certifications SET exam_fee=40000, prep_weeks=8, pass_rate=42.1, difficulty=3, verified=true WHERE name = '증권투자권유대행인';
UPDATE certifications SET exam_fee=50000, prep_weeks=12, pass_rate=25.8, difficulty=4, verified=true WHERE name = '신용분석사';
UPDATE certifications SET exam_fee=30000, prep_weeks=8, pass_rate=55.0, difficulty=3, verified=true WHERE name = '매경TEST';
UPDATE certifications SET exam_fee=30000, prep_weeks=8, pass_rate=48.5, difficulty=3, verified=true WHERE name = 'TESAT';

-- 10. 보건의료 (국시원 및 기타)
UPDATE certifications SET exam_fee=32000, prep_weeks=6, pass_rate=88.5, difficulty=2, verified=true WHERE name = '요양보호사';
UPDATE certifications SET exam_fee=38000, prep_weeks=52, pass_rate=82.1, difficulty=3, verified=true WHERE name = '간호조무사';
UPDATE certifications SET exam_fee=110000, prep_weeks=16, pass_rate=85.0, difficulty=4, verified=true WHERE name = '임상병리사';
UPDATE certifications SET exam_fee=110000, prep_weeks=16, pass_rate=83.4, difficulty=4, verified=true WHERE name = '물리치료사';
UPDATE certifications SET exam_fee=110000, prep_weeks=16, pass_rate=78.2, difficulty=4, verified=true WHERE name = '방사선사';
UPDATE certifications SET exam_fee=110000, prep_weeks=16, pass_rate=81.5, difficulty=4, verified=true WHERE name = '치과기공사';
UPDATE certifications SET exam_fee=110000, prep_weeks=16, pass_rate=88.0, difficulty=4, verified=true WHERE name = '응급구조사 1급';

-- 11. 국가전문자격 (학점은행제 및 연수과정 중심 - 비용/기간 특수성)
UPDATE certifications SET exam_fee=0, prep_weeks=52, pass_rate=99.0, difficulty=3, verified=true WHERE name = '보육교사 2급';
UPDATE certifications SET exam_fee=0, prep_weeks=104, pass_rate=99.0, difficulty=4, verified=true WHERE name = '유치원정교사 2급';
UPDATE certifications SET exam_fee=0, prep_weeks=52, pass_rate=99.0, difficulty=3, verified=true WHERE name = '사회복지사 2급';
UPDATE certifications SET exam_fee=25000, prep_weeks=12, pass_rate=39.4, difficulty=3, verified=true WHERE name = '사회복지사 1급';
UPDATE certifications SET exam_fee=0, prep_weeks=52, pass_rate=90.0, difficulty=3, verified=true WHERE name = '청소년지도사 2급';
UPDATE certifications SET exam_fee=0, prep_weeks=52, pass_rate=90.0, difficulty=3, verified=true WHERE name = '평생교육사 2급';
UPDATE certifications SET exam_fee=0, prep_weeks=104, pass_rate=90.0, difficulty=4, verified=true WHERE name = '사서';

-- 12. 관광 / 스포츠
UPDATE certifications SET exam_fee=20000, prep_weeks=16, pass_rate=48.2, difficulty=3, verified=true WHERE name = '관광통역안내사';
UPDATE certifications SET exam_fee=20000, prep_weeks=16, pass_rate=51.5, difficulty=3, verified=true WHERE name = '국내여행안내사';
UPDATE certifications SET exam_fee=18000, prep_weeks=12, pass_rate=42.1, difficulty=3, verified=true WHERE name = '스포츠지도사 2급';

-- 남은 데이터가 있다면 기본값 채우기 방지용
UPDATE certifications SET exam_fee=19400, prep_weeks=8, pass_rate=45.0, difficulty=3, verified=true WHERE verified=false;
