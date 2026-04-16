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
