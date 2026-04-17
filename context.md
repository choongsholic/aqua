# DP-AQUA 프로젝트 컨텍스트

## 프로젝트 개요
현대카드 앱 MAU 800만 달성을 위한 유저 행동 분석 시각화 대시보드.
단일 HTML 파일로 구현된 Canvas 2D 기반 실시간 파티클 시뮬레이션.

## 메인 작업 파일
- `dp-aqua_growth.html` — 메인 대시보드 파일 (원본)
- `dp-aqua_growth2.html` — 신규유입/이탈 제거 + 세그 간 이동 없는 정적 버전
- `dp-aqua-guide.md` — 구현 가이드 (전체 스펙 정리)
- `gm_dashboard.html` — 업무망 배포용 실전 대시보드 (파티클 제거, 로컬 폰트 적용)

---

## 최근 완료 작업

### dp-aqua_growth.html

#### 상세페이지 — 주간 UV 추이 차트
- **진입**: 헤더 MAU 영역 클릭 또는 T1 손가락 흔들기 제스처
- **KPI**: 당월진행 763만 / 전월동기 749만 / 전월동기대비 ▲14만(green)
- **차트**: 이번달(#50d278) + 전월동기(white 점선), 5주차
- **크로스헤어**: 마우스 X → 1일 단위 스냅, 말풍선(4월 N일 + 주차 + 이번달/전월동기)

#### 세그 현황판 탱크 UI
- 레이아웃: 세그명+꺽쇠 / 큰 숫자+만 / ▲▼ 인디케이터 / 설명 텍스트
- 호버 시: 아웃라인 80% 흰색, cursor:pointer, 틱 효과음
- 하락 지표 색상: `rgba(0,112,240,0.95)` (파란색)

#### 장기 미이용 슬라이드 패널 (dormantPanel)
- 클릭 시 우측에서 슬라이드인 (width:400px)
- 타이틀: "장기 미이용", 서브: "6개월 이상 미접속"
- KPI 3개 카드, 연령대 바 차트, 보유 카드 TOP5, 주요 알림
- 연령대/카드 프로그레스바 색상: `#50d278` (스타일 가이드 녹색)

#### 이상 징후 감지 패널
- MAU TRACK / RETENTION TRACK 섹션, 섹션 사이 점선
- 고정 데이터: 미설치자 0, 장기미이용 1만, 간헐이용 2만 / Light 3만, Casual 2만, Power 0

#### 이탈 존
- 서브 텍스트: "전월 마감 기준"

### dp-aqua_growth2.html (새로 생성)
- dp-aqua_growth.html 복사본
- **신규유입 / 이탈 사이드 존 제거** (drawSideZones 미호출)
- **모든 탱크 구멍 막힘** (Retention 6개 + MAU 5개 홀 완전 제거)
- **아쿠아리움 테두리 구멍 막힘** (new_in / churn_out 파이프 연결부)
- **세그 간 이동 파티클 정지** (tryMigrations 비활성화)
- **파이프 시각 제거** (drawAllPipes 미호출)
- 페이드아웃 파티클: newZone 대신 light/casual/power 탱크 안에서 바로 리사이클

---

## 스타일 가이드
- 녹색(성장/유입): `#50d278` / `rgba(80,210,120,0.95)`
- 파란색(하락/이탈): `rgba(0,112,240,0.95)` — `COLOR.outflow`
- 경고 빨강: `rgba(255,80,80,0.9)`
- 폰트: `'SF Pro Display',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif`

---

---

## gm_dashboard.html 작업 현황

### 완료
- 파티클 시뮬레이션 전체 제거 (Particle 클래스, buildGrid, applyRepulsion, applyMouseForce, tryMigrations 등)
- 로컬 폰트 적용: `Fonts/SF-Pro-Display-Medium.otf`, `Fonts/SF-Pro-Display-Bold.otf`, `Fonts/YouandiNewKrTitle-Bold.ttf`
  - weight 400/500 → Medium, weight 600/700/800 → Bold, YouandiNewKr → ttf 로컬
- CDN 폰트(현대카드 서버) → 로컬 파일로 전환
- 업무망 윈도우 환경 대응 완료

### 폰트 규칙
- 일반/얇은 텍스트 → SF Pro Display Medium
- 굵은 텍스트 → SF Pro Display Bold
- 로고/주요 지표 (명시적 요청 시) → YouandiNewKrTitle-Bold

---

---

## aqua_real_grw.html (실데이터 POC 대시보드)

### 파일 개요
- 파티클 없는 순수 HTML/CSS 실데이터 대시보드
- 폰트: `fonts/` 폴더 로컬 파일 (SF Pro Display Medium/Bold, YouandiNewKrTitle-Bold)

### 완료된 작업

#### 레이아웃 & 그리드
- 좌우 마진 그리드: 24px (topbar, nav items, lnb-bottom 버튼, main 모두 일치)
- aquarium-header: `padding: 14px 16px 14px 24px` (우측 16px = tracks-area 우측 패딩과 일치)
- main: `padding: 16px 24px 0`
- 최소 높이: `min-height: 520px`
- 가로 최소: `min-width: 1080px`

#### 사이드바 토글
- lnb-bottom (버튼+슬라이더) → `<body>` 직하위, `position: fixed; left:0; width:220px; padding: 0 16px 0 24px`
- 사이드바 버튼: 레이아웃 아이콘 ↔ 햄버거 아이콘 전환
- 접힐 때: `lnb` width→0, lnb-nav 좌로 페이드아웃
- 버튼 위치 고정 (덜컹거림 없음)

#### 다크/라이트 모드
- 완전 반전: 배경, 테두리, 텍스트, 카드, 탭바, 슬라이더 모두 전환
- SVG 아이콘: `currentColor` 사용 → 모드에 따라 자동 반전
- 전환 애니메이션: 0.4s ease (주요 요소 전체)
- 라이트모드 슬라이더: `document.body.style.setProperty` 사용 (body > html 우선순위)

#### 탱크 카드 인터랙션
- 호버 시: 아웃라인 border-color 전환 (0.25s), caret 100% opacity, tank-name 100% opacity
- 이상 탱크: 기본 `rgba(255,80,80,0.52)`, 호버 `rgba(255,80,80,0.9)`
- 라이트모드 이상 탱크 호버: `:not(.alert)` 예외 처리로 빨간색 유지
- 숫자 카운트업 애니메이션: 호버 재실행, duration 800ms, easeOutCubic

#### 데이터
- `DATA` 객체에서 수동 입력 후 `randomizeTanks()`로 랜덤 분산 적용
- RANGES: No-Show/Long-D/On-Off/Light/Casual/Power 세그별 범위 정의
- 등락 방향: `positive` 플래그 기반

### 현재 상태
- 다크/라이트 모드 완전 동작
- 탱크 6개 (Acquisition 3 + Retention 3) 반응형 높이
- 사이드바 토글 완전 동작
- 스트로크 슬라이더 동작
- 사운드 효과 없음 (브라우저 정책 이슈로 제거)

### CSV 데이터 연동 구조 (완료)
- `data/` 폴더에 3개 CSV 생성
  - `seg_status.csv`: seg, track(acquisition/retention), sub, value, prev_close, positive, invert_sign, alert
  - `seg_panel.csv`: period, label, value, delta, positive (KPI 4행)
  - `seg_visit.csv`: week, seg, uv_current, uv_prev (Migration Tracking용, 현재 미사용)
- 우측 하단 고정 버튼 (darkmode-btn 동일 스타일, 폴더 업로드 아이콘)
- `webkitdirectory` 폴더 선택 → 3개 CSV 자동 매핑
- localStorage 캐싱: 첫 로드 후 새로고침 시 자동 복원
- delta_v, pct는 value/prev_close로 코드가 자동 계산
- 레이블(seg, sub 컬럼)은 CSV 값 그대로 표시 → 언제든 변경 가능

### 세그 명칭 매핑
- 앱미경험 = No-Show (Acquisition)
- 장기미이용 = Long-D (Acquisition)
- 간헐이용 = On-Off (Acquisition)
- Light / Casual / Power (Retention, 동일)

### 이상징후 판단 기준 (가이드 기준, 미구현)
- **Acquisition**: `value > prev_close`이면 이상 (비활성 증가 = 나쁜 신호)
  - 현재는 CSV `alert` 컬럼 수동 입력 방식
  - 향후: value > prev_close 자동 판단으로 전환 예정
- **Retention**: `평균 로그인 일수_당월 < 평균 로그인 일수_전월 - 0.3`이면 이상
  - 현재 CSV에 avg_login 데이터 없음
  - 향후: seg_status.csv에 avg_login_current, avg_login_prev 컬럼 추가 예정

### 다음 세션 작업 후보
- [ ] Acquisition 이상징후 자동 판단 (value > prev_close → alert 자동)
- [ ] Retention 이상징후: seg_status.csv에 avg_login_current, avg_login_prev 추가 + 자동 판단
- [ ] 그리드 최종 정렬 재확인 (사이드바 접힘 시 버튼 위치)
- [ ] 라이트모드 lnb-item 색상 재확인
- [ ] Migration Tracking 탭 화면 구현

---

## 향후 작업
- [ ] dp-aqua_growth2.html 기반 추가 수정 작업
- [ ] 월간 보기 토글 (주간 ↔ 월간 전환)
- [ ] T2 / T3 세그먼트 상세페이지 확장
- [ ] WebGL 전환 (76,300개 파티클 — 100단위)
- [ ] 실제 데이터 API 연동
- [ ] 이상 신호 실시간 감지 로직

---

## GitHub 연결
- 리포: https://github.com/choongsholic/aqua
- 브랜치: main

---

## 커뮤니케이션 원칙
- 구조적 제약이 있으면 시도 전에 먼저 설명
- 시키지 않은 것 추가 금지
- 수치 단위까지 정확하게
