# DP-AQUA 프로젝트 컨텍스트

## 프로젝트 개요
현대카드 앱 MAU 800만 달성을 위한 유저 행동 분석 시각화 대시보드.
단일 HTML 파일로 구현된 Canvas 2D 기반 실시간 파티클 시뮬레이션.

## 메인 작업 파일
- `dp-aqua_growth.html` — 메인 대시보드 파일 (원본)
- `dp-aqua_growth2.html` — 신규유입/이탈 제거 + 세그 간 이동 없는 정적 버전
- `dp-aqua-guide.md` — 구현 가이드 (전체 스펙 정리)
- `gm_dashboard.html` — 업무망 배포용 실전 대시보드 (파티클 제거, 로컬 폰트 적용)
- `aqua_real_grw.html` — 실데이터 POC 대시보드 (주력 작업 파일)
- `uxi_aqua.html` — UXI 브랜드 페이지 (aqua_real_grw.html footer "UXI" 링크로 연결)

---

## 스타일 가이드
- 녹색(성장/유입): `#00D56D` / `--clr-good` / `--clr-good-rgb: 0,213,109`
- 빨강(하락/이탈): `#FF0238` / `--clr-bad` / `--clr-bad-rgb: 255,2,56`
- 경고 빨강 테두리: `rgba(var(--clr-bad-rgb),0.40)` 기본 / `0.8` 호버 (슬라이더 비연동)
- 폰트: `'SF Pro Display',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif`
- 주요 숫자: `'YouandiNewKrTitle', sans-serif` (LF KPI 숫자 등)

---

## aqua_real_grw.html (실데이터 POC 대시보드)

### 파일 개요
- 파티클 없는 순수 HTML/CSS 실데이터 대시보드
- 폰트: `fonts/` 폴더 로컬 파일 (SF Pro Display Medium/Bold, YouandiNewKrTitle-Bold)

### 완료된 작업

#### 레이아웃 & 그리드
- 좌우 마진 그리드: 24px
- aquarium-header: `padding: 14px 16px 14px 24px`
- main: `padding: 16px 24px 0`
- 최소 높이: `min-height: 520px` / 최소 가로: `min-width: 1080px`

#### 사이드바 토글
- lnb-bottom (버튼+슬라이더) → `<body>` 직하위, `position: fixed`
- 사이드바 버튼: 레이아웃 아이콘 ↔ 햄버거 아이콘 전환
- 접힐 때: lnb width→0, lnb-nav 좌로 페이드아웃

#### 슬라이더 (선 밝기)
- `.toggle-bar`: `height: 6px`, `border-radius: 3px`, 호버 시 `height: 10px` / `border-radius: 5px` (0.18s 트랜지션)
- `.toggle-knob`: `border-radius: 99px` (pill), 호버 시 `height: 10px`
- 트랙 시각 요소는 `::before` 위장 (background-clip 이슈 해결)
- 라이트모드: `body.light .toggle-bar::before { background: rgba(0,0,0,0.15); }`
- `STROKE_BASE`: `--border` 0.10 / `--border-aquarium` 0.14 / `--border-card` 0.10 / `--border-divider` 0.12
- alert 테두리(`rgba(var(--clr-bad-rgb),0.40)`)는 슬라이더 비연동 (색상이 달라 의도적 분리)

#### 다크/라이트 모드
- 완전 반전: 배경, 테두리, 텍스트, 카드, 탭바, 슬라이더 모두 전환
- 라이트모드 세그 카드 배경: `background: rgba(255,255,255,1)`

#### 탱크 카드 인터랙션
- 호버 시: 아웃라인 border-color 전환 (0.25s), caret 100% opacity
- alert 탱크: 기본 `rgba(var(--clr-bad-rgb),0.40)`, 호버 `rgba(var(--clr-bad-rgb),0.8)`
- 숫자 카운트업 애니메이션: 호버 재실행, 800ms easeOutCubic
- 호버 틱 사운드: 모든 세그 카드 + LF 차트 버킷

#### 복사 버튼 (LF 카드 + 세그 상세 패널)
- 호버 시에만 표시, 클릭 시 체크마크로 전환
- SVG mask로 앞쪽 rect가 뒤쪽 rect 일부를 잘라내는 클립보드 아이콘

#### LF (Login Frequency) 탭
- Acquisition 섹션: opacity/translateY + scale(0.9) 페이드아웃
- Retention 3개 카드(Light/Casual/Power): 세로 확장, 꺽쇠 opacity:0
- KPI 3개(당월평균/전월동기/전월대비) + Canvas 바 차트 + 범례 + 델타 칩
- 바 차트: 당월 흰색(0.9)/전월 회색(0.22), Y축 그리드라인, X축 버킷레이블
- 바 성장 애니메이션: `_barProg` easeOutCubic, 하단에서 위로
- 해치 방향: 그린=아래→위, 레드=위→아래
- hover 시 3개 중 나머지 opacity:0.4 fade
- `.lf-kpi-row margin-bottom: 24px` (KPI행 ↔ 구간별 분포 제목 간격)
- LF 툴팁(호버 말풍선): 라이트모드에서 shadow `rgba(0,0,0,0.18)` blur:16 offsetY:4

#### LF 데이터 구조 (JS 하드코딩, LF_DATA 객체)
- Light: curMean:1.2 / prevMean:1.8 / buckets: 0일/1~2일/3~7일/8일+
- Casual: curMean:2.4 / prevMean:2.5
- Power: curMean:3.2 / prevMean:3.6

#### 세그 상세 패널
- 탱크 카드 클릭 시 우측 스플릿 패널 (width: 0 → 360px)
- 패널 bg: 항상 pure `#000`
- Header: YouandiNewKr Bold 28px + 32x32 원형 close btn
- KPI row: 플랫 — 34px Bold 숫자 + 16px Bold 단위, gap 49px
- 연령대 바: 200px 6px, 9px tick 패턴 + #00D56D fill
- `SEG_DETAILS` 객체: No-Show/Long-D/On-Off/Light/Casual/Power 정의

#### 데이터
- `DATA` 객체 수동 입력 + `randomizeTanks()`로 랜덤 분산
- CSV 폴더 업로드: seg_status.csv / seg_panel.csv / seg_visit.csv
- localStorage 캐싱

#### 기타
- Footer: "Digital Product · App User Quantitative Analysis · by UXI"
  - UXI → `href="uxi_aqua.html"` (같은 탭 페이지 전환, target="_blank" 없음)
  - 호버 시 흰색, underline 없음

### 다음 세션 작업 후보
- [ ] Acquisition 이상징후 자동 판단 (value > prev_close → alert 자동)
- [ ] Retention 이상징후: avg_login_current, avg_login_prev 컬럼 추가 + 자동 판단
- [ ] 기준일(period) 실데이터로 교체
- [ ] LF 데이터 CSV 연동 (현재 JS 하드코딩)

---

## uxi_aqua.html (UXI 브랜드 페이지)

### 파일 개요
- Canvas 2D 기반 문자 그리드 페이지
- "UXI" 마스크 텍스트 형체, SF Mono 폰트, 배경 #060606
- aqua_real_grw.html footer에서 같은 탭 링크로 진입, 좌상단 ← 뒤로가기 버튼

### 핵심 구조
- `CHARS_IN`: 'AppUserQuantitativeAnalysis...' — UXI 마스크 내부 문자
- `CHARS_OUT`: '0123456789' — 마스크 외부 문자
- `CHARS_CHAOS`: 대소문자+숫자+특수문자 — 클릭/인트로 카오스용
- `FONT_MASK`: Georgia serif (UXI 형체용 오프스크린 렌더링)
- `FONT_FAM`: SF Mono, Menlo, Monaco (실제 표시 폰트)
- 셀 크기: `cellW:13`, `cellH:20`
- UXI 마스크: 화면 너비 92% 채우도록 폰트 크기 자동 계산

### 행 이동 (스탁카토)
- `sequence = [1, pause, 1, pause, 1, pause, 1, pause, 1, rest]`
- cur===1 일 때만 `cellW/3` 이동
- 짝수행 우→, 홀수행 좌←

### 인터랙션
#### 물고기 (자율 유영)
- 자율 유영: 랜덤 target 이동, 벽 회피, 감쇠, 최대속도 7
- 몸통 wiggle: 속도 수직 방향 sinusoidal 진동
- 커서 300px 이내 접근 시 flee (force 2.8, 지수 1.4)
- 잡기: 커서가 55px 이내 → `controlled=true`, 커서 숨김 (`html.controlled *`)
  - 잡힌 상태: lerp 0.18로 커서 따라옴
  - 잡힐 때 바운스 스케일 (catchBounceT)
- 흔들기 해제: 700ms 내 방향 반전 3회 → 물고기 속도 20으로 랜덤 방향 튕김
- 클릭 (잡힌 상태): 틱 사운드 + 카오스 파동 + 물고기 flee + clickBounce
- Esc: 미구현 (흔들기로 대체)

#### 클릭 카오스 (잡힌 상태에서만)
- 링 웨이브 확장: waveFront = age * 0.55px/ms, waveW = 160 + age*0.08
- 카오스 문자: `CHARS_CHAOS` 랜덤
- 산개 방향: 클릭 중심에서 바깥 방향 * 28 + 랜덤 jitter * 14

#### 마우스 호버 (알파벳 밀림)
- 반경 520px, force = `(1-rd/520)^2 * 48`
- UXI 내부: alpha 0.65~1.0 + flicker / 외부: alpha 0.10~0.72
- 밀림은 물고기(fishX/fishY) 기준, 마우스 기준 아님

### 인트로 애니메이션 (2000ms)
- 각 셀에 `birthTime` (0~1400ms 랜덤)
- birthTime 전: invisible
- CHAOS_DUR 220ms: 매 프레임 CHARS_CHAOS 랜덤 플리커 (0.5~1.0 alpha)
- SETTLE_DUR 350ms: 확률적으로 점점 고정 문자로 안착
- → UXI 형체가 랜덤 코드에서 채워지는 터미널 느낌

### Google Translate 차단
- `<html lang="en" translate="no">`
- `<meta name="google" content="notranslate">`

---

## Document_templete/template.html (팀 발표 템플릿)

### 파일 개요
- 단일 HTML 파일 발표 슬라이드 템플릿 (팀 데모데이용)
- `slide-data.js`에 콘텐츠 입력 → `template.html` 브라우저에서 열기
- 폰트: `fonts/` 폴더 로컬 파일 (SF-Pro-Display-Medium/Bold.otf, YouandiNewKrTitle-Bold.ttf)

### 디자인 시스템
- 배경: `--bg: #080808`, 서피스: `--surface: #141414`
- 강조색: `--accent: #00D56D` / 네거티브: `--negative: #FF0238`
- 텍스트: `--text: rgba(255,255,255,0.92)` / 서브: `--text-secondary: rgba(255,255,255,0.42)`
- 테두리: `--border: rgba(255,255,255,0.10)`
- 본문 폰트: `'SFProDisplay'` (font-family 이름, aqua 동일 방식)
- 헤딩(h1/h2)/빅넘버 폰트: `'YouandiNewKrTitle', 'SFProDisplay', sans-serif`
- 빅넘버 클래스: `.ba-big`, `.next-num`, `.next-roadmap-num`, `.built-step-num`, `.common-bignumber-value`, `.common-vlist-num` → 모두 YouandiNewKrTitle

### 슬라이드 캔버스
- wrapper 크기: **2040×1080px** (좌우 60px 버퍼 포함, 전환 잔상 방지)
- 콘텐츠 패딩: `calc(clamp(32px,7vw,112px) + 60px)` (60px 버퍼 보정)
- 스케일: `Math.min(innerWidth/2040, innerHeight/1080)`
- wrapper에 `transition: transform 0.32s cubic-bezier(0.4,0,0.2,1)` (패널 열릴 때 부드럽게 축소)

### 슬라이드 전환
- `.slide`: `opacity:0; transform:translateX(60px)` → `.slide.active`: `opacity:1; transform:translateX(0)`
- `.slide.exit-left`: `opacity:0; transform:translateX(-60px)`
- transition: `opacity 0.5s + transform 0.5s cubic-bezier(0.4,0,0.2,1)`
- body `transition: none` (그라디언트 전환 흰색 플래시 방지)

### 주요 UI 결정
- 헤더 위 서브태그(WHAT WE BUILT 등): `color: var(--text-secondary)` + `font-weight:700` (그린 아님)
- 커버 레이블(SESSION 1.): 동일하게 `text-secondary + bold`
- 문제카드 01/02/03 번호: `text-secondary` (레드 제거)
- 아이콘/불릿 정렬: 모든 flex 컨테이너 `align-items:center` (Inter→SFPro 전환 시 margin-top 오정렬 수정)
- `whatsnext-next-item`: `padding:20px 24px; border-radius:8px`
- Inter 폰트 전면 제거 → 전부 `SFProDisplay`로 교체

### 오버뷰 패널 (슬라이드 썸네일 + 컨트롤)
- 우측 상단 햄버거 메뉴(`.viz-menu`) **제거** → 오버뷰 패널 좌측 사이드바로 통합
- 패널 구성: `#overview-controls`(좌, 210px 고정) + `#overview-track`(우, 썸네일)
- `↑` 키: 패널 열림 → 슬라이드 콘텐츠 위로 밀리며 축소 (트랜지션 동기화)
- `↓` 키 / `Esc`: 패널 닫힘
- 패널 열린 상태 키 네비게이션 (2섹션):
  - `thumbs` 섹션: `←/→`로 썸네일 포커스, `Enter`로 이동. 맨 왼쪽에서 `←` 누르면 `controls` 섹션으로 전환
  - `controls` 섹션: `↑/↓`로 버튼 이동, `Enter`로 실행. 폰트 조절 행(`.font-row`)에서는 `←/→`가 폰트 크기 조절(+flashFontNudge 좌/우 하이라이트)
- 컨트롤 버튼: 전체 화면 / 테마 토글 / 폰트 A−/A+ / PNG 다운로드 / Print
- 썸네일: 실제 슬라이드 DOM 클론 `scale(0.08824)` → 진짜 배경/콘텐츠 보임
- 슬라이드 쿼리는 반드시 `#slidesWrapper` 범위 한정 (클론 중복 방지)
- 포커스 표시:
  - 썸네일 현재 장(`.overview-current`): opacity 1
  - 썸네일 이동 포커스(`.overview-focus`): `#00D56D` 그린 테두리
  - 컨트롤 포커스(`.control-focus`): `rgba(255,255,255,0.14)` 배경 + 흰색 outline
- 구분선: `border-right: 1px solid rgba(255,255,255,0.14)` (controls↔thumbs)
- 썸네일 라디우스: `border-radius:8px`

### 배경 전환 (크로스페이드)
- `#bg-layer` + `#bg-layer-b` 두 레이어 교대로 사용
- `syncOuterBackground`에서 다음 레이어 opacity 1, 현재 레이어 opacity 0 (0.5s cubic-bezier)
- 슬라이드 전환 시 배경 컬러/이미지 점프 제거
- **베이스 배경 테마 동기화**: `html.theme-dark` → `#080808`, `html.theme-light` → `#F5F5F3` 강제. 기존 body `#080808` 하드코딩으로 라이트 모드 크로스페이드 중간에 검정 깜빡임 발생하던 문제 해결

### 테마 localStorage
- 키: `viz-theme-v3` (이전 `viz-theme` 폐기)
- 기본값: `dark` (시스템 prefers-color-scheme 감지 제거)

### 다음 세션 작업 후보
- [ ] 라이트/다크 테마 전환 시 썸네일 배경 동기화 확인
- [ ] 슬라이드 수 많을 때 오버뷰 패널 스크롤 UX 개선

---

## GitHub 연결
- 리포: https://github.com/choongsholic/aqua
- 브랜치: main

---

## 커뮤니케이션 원칙
- 구조적 제약이 있으면 시도 전에 먼저 설명
- 시키지 않은 것 추가 금지
- 수치 단위까지 정확하게
