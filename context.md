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
- `mau_growth.html` — MAU 클릭 시 이동하는 주간/월간/Growth Metrics 탭 상세 페이지
- `uxi_aqua.html` — UXI 브랜드 페이지 (aqua_real_grw.html footer "UXI" 링크로 연결)
- `aqua_v0.8.html` — 0.8 버전 대시보드 (aqua_real_grw.html 복제 + 이탈 조기 경보(LF) 탭 + 휴일차이 자동 계산)
- `aqua_v0.82.html` — 0.82 버전 (v0.8 복제 + 레전드/일수카운트를 ret-section 하단으로 이동 → 세그현황판에서도 공통 노출, LF 모드에서 레전드만 페이드인)
- `aqua_v0.84.html` — 0.84 버전 (현 운영 안정화 버전)
- `aqua_v0.85.html` — **v0.84 + LF 모드 5가지 보정 (2026-04-25)**:
  1. **3단계 심각도** (호전/주의/이상) — `.lf-state-good/warn/danger` 클래스로 테두리·KPI숫자·뱃지를 같은 색 계열로 통일. `--clr-warn: #FFB020` 신규
  2. **0일 그룹 분리 narrative** — `buildLFContent`에서 0일(휴면)을 1-2일과 분리해 "단, 0일 그룹 +XX만 신규 휴면" cue 자동 추가 (Light 평균-narrative 모순 해소)
  3. **분포 방향 화살표** — narrative line2 앞에 →(초록 = 우측 이동) / ←(빨강 = 좌측 이동) 직접 표시
  4. **호전 시각 강조** — diff ≥ +0.3이면 초록 "호전" 칩 (Casual +0.7 케이스 대응)
  5. **delta 폰트** — `.lf-xcol-delta` 14px/400 → 15px/500
  - 진입/종료 시 LF state 클래스 toggle은 line ~2557 (entry) / ~2557 (exit) 추가됨
  - 임계값: `diff >= 0.3` good / `diff <= -0.3` danger / `0 > diff > -0.3` warn / 그 외 중립
- `aqua_v0.86.html` — **v0.85 + 비마케터 가독성 / 마케터 스캔 효율 개선 (2026-04-26)**:
  1. **부제 강화** — `.period-sub` muted → 0.6 / weight 600. 키워드 맨 앞 재배치: "인원 규모 — 6개 세그…" / "평균 로그인 일수 — 전월 마감 세그…" — 두 탭 *기준 차이* 즉시 인지
  2. **Track footer hint** — Acquisition `증가 = 활성 미전환` / Retention `감소 = 이탈 우려` — `.track-footer-hint` (12px/0.5/우측정렬), 탭 라벨 옆이 아닌 카드 하단 우측에 부착. LF 모드 진입 시 `opacity:0 + max-height:0`로 페이드아웃
  3. **Tier 테두리 슬라이더 연동** — `--tier-bad-border / -hover / -active`(0.40/0.85/1) + warn(0.45/0.9/1) + good(0.40/0.85/1) CSS 변수 9개. JS `applyStrokeScale()`에 `TIER_BORDERS` 맵 추가 → 슬라이더로 노랑/빨강/초록 테두리 투명도 같이 조정 가능 (이전엔 검정선만 반응)
  4. **CSV-driven tank-sub** — `CSV_HEADER_MAP`에 `로그인일수_기준` → `sub` 추가, fallback `r.sub || r.seg` → `r.sub || ''`로 변경. `.tank-sub:empty { display:none }`. 기존 카드 동어반복 제거
  5. **LF 분포 점선 boundary** — `drawLFChart`에서 2일↔3일 사이 수직 점선 (rgba 0.14, dash [2,3]) → 저빈도(1-2일) / 활성(3일+) 구분 가이드
  6. **LF narrative 명명** — `저빈도(1-2일) / 활성(3일+)` 채택. *마케터 스캔 효율 위해 의미 기반 2그룹*이 *순수 일수* 또는 *3그룹*보다 우위. "활성"은 narrative 한정 nickname (CSV/Retention 라벨엔 미사용)
  7. **Detail panel 재구성** — `전월 비교 chart` ↑ KPI row ↑ 프로필 순으로 재배치. "전월 비교" 타이틀 제거(바만으로 비교 충분). 첫 섹션 `padding-top:8px`
  8. **Delta bar 비율 정리** — bar/label 16→12px, font 16→14, weight 500→400, gap 14→12. `.delta-hatch` top:4/height:52로 대칭 8px 삐져나옴 (zero 케이스 `top:0` override 제거)
  9. **Tab / Track-label 톤** — 탭 36→40px, font 14→16. `.track-label` 유앤아이 서체 15px / height 56px (액큐지션·리텐션 가독성)
  10. **Tanks-row max-height 280** — 카드 높이와 일치, lf-mode `tanks-row max-height: none` override (LF 차트 클립 방지)
  11. **Auto-play on speed pick** — `setPlayInterval` 재생 중이 아닐 땐 자동으로 `togglePlay()` 호출. Delay 툴팁에서 초 선택만으로 즉시 재생
  - 데이터: `seg_status.csv` / `seg_visit.csv` 미세 보정 (마케터 미팅용 샘플)
  - 보류: 카드별 한 단어 라벨, 샘플 데이터 명시, LF 차트 백그라운드 존 — 노이즈 우려 / 1.0 미룸
  - **마케터 미팅(월요일)**: `memory/project_aqua_marketer_discussion.md` 5개 포인트 (이상 임계 −0.3 / 점선 / LF 시각신호 / 저빈도·활성 명명 / **휴일차이 비교 범위 — 진행 동기간 vs 캘린더 전월전체**) + 1·4주차 데이터 불일치 함께 검증

- `aqua_v0.87.html` — **v0.86 + LF narrative 코호트 모델 재정의 (2026-04-27)**:
  - 발단: v0.86 Power 카드 "<<>>전체 세그 규모 확장" narrative ↔ 세그현황판 Power 180→180 모순. 사용자 설명: LF는 **전월 마감 인원을 통째로 가둔 코호트** 모델 (모집단 크기 정의상 고정), 세그현황판은 동적 멤버십. 두 패널의 모집단이 다름.
  - "확장/축소" 분기 자체를 제거 — 코호트 닫혀있어 합 항상 = 전월마감
  - narrative 표기 변경: "저빈도 X만 증가" → "X만명이 [origin] → [destination] 이동" (인원 증감 → 버킷 간 이동)
  - 6가지 흐름 패턴 분기: 활성→휴면(강한 이탈), 활성→저빈도(빈도 하락), 저빈도→휴면(휴면화), 휴면→활성(복귀), 휴면→저빈도(가벼운 복귀), 저빈도→활성(빈도 상승). 출/도착 그룹 rank 비교로 우/좌 화살표 자동 결정
  - 데이터 정합성 가드: 코호트 합이 ±5만 초과 어긋나면 narrative 단언 보류 + ⚠ "코호트 합 X만 어긋남 — 데이터 검증 필요" 경고. `.lf-data-warn` CSS (clr-warn 노랑) 추가
  - NOISE / COHORT_DRIFT 둘 다 상수 5만 (튜닝 포인트로 마케터 미팅 논의 항목 추가)
  - 데이터 사고 부록: `data_4주차/seg_visit.csv` Power 당월 3일/5일/6일 = 10 → 0 으로 정정 (사용자 source CSV와 일치). 합 210 → 180 코호트 정합 ✓
  - 위치: `buildLFContent` 함수 내부 line 2319~2391. CSS는 line 1042~1043
  - 마케터 미팅 항목 #6 신설 (이동 패턴 명명/이동 표기 적합성/NOISE 임계 적정성)
  - **분포 시프트 폴백 + 좌측 시프트 누적-강조 형식 (2026-04-27)**: 도구 본질("어디로 모였나 → 캠페인 타겟팅")에 맞춰 좌측 시프트 narrative를 **흐름 강조 → 누적 상위 2개 버킷 강조**로 전환. 발단: Power 케이스(평균 +1.6일, 9일/5일/6일 → 10일+ 시프트)가 sumHigh=0이라 그룹 흐름 모델로 안 잡혔고, Casual 케이스에서도 "40만이 활성→휴면 이동"보다 "0일 +40만, 1일 +20만 유지중"이 캠페인 액션에 더 직접적
    - **우측 시프트 (그룹 흐름)**: 그대로 — `<b>X만명</b>이 origin → dest 이동` + `>>> 의미 (휴면 활성 복귀 등)`
    - **우측 시프트 폴백 (헤비 확대, 10일+ 비중 +3%p 이상)**: `헤비 유저(10일+) 비중 확대 +X.X%p` + `>>> 분포 우측 이동, 빈도 상승`
    - **좌측 시프트 공통 형식** (그룹 흐름·폴백 양쪽): `buildLeftShiftLines()` 헬퍼 — 비중 +2%p 이상 버킷 누적 큰 순(동률시 좌측 우선) 상위 2개
      - line1 `<b>X일 +N만</b>, <b>Y일 +M만</b> 유지중`
      - line2 `<<< 분포 좌측 이동, 활성화 집중 공략 필요`
      - 누적 +2%p 이상 0개면 그룹 흐름 형식("X만이 활성→휴면 이동" + "활성층 휴면 진입") 또는 "큰 변화 없음"으로 폴백
    - **cueLine 제거**: 우측 시프트(양호 케이스)에서 "0일 그룹 -20만 동반 변동" 같은 보조 정보가 narrative 가독성 해치고, 차트 하단 delta로 같은 정보 확인 가능. line1/line2만 남김
    - 위치: `buildLFContent` line ~2342-2410. 우측 흐름 6분기 중 좌측 3개("활성층 휴면 진입" 등)는 폴백 시에만 사용
  - **Retention 트랙 alert 톤 다운 (2026-04-27)**: Retention 감소는 이탈일 수도, Casual/Power로 세그 이동(졸업)일 수도 있는 양면 해석이라 "이상"(빨강) 단정이 부적절. 변동률 무관 항상 노랑 tier로 일원화
    - footer hint 변경: `감소 = 이탈 우려` → `감소 = 이탈/세그 이동` (line 1289)
    - tier 판정 (line ~1428, ~2096): `if (isBad && !t.invertSign) tier = 'warn'` 분기 추가. Retention(invertSign=false) 나쁜 변동은 magn 무관 warn
    - **chip 라벨 변경 (Retention 한정)**: 세그 현황판 buildTanks chipText (line 1457)에서 Retention warn만 `'확인 필요'`로 분기 — `tier === 'warn' ? (t.invertSign ? '주의' : '확인 필요')`. Acquisition warn은 `'주의'` 그대로 (활성 미전환은 분명한 부정 시그널). LF 모드 chipText (line 2315)는 `'주의'` 유지 (사용자 별도 지시 없으면 변경 금지)
    - "점검"은 점검 진행 중으로 오해 가능 — "확인 필요"가 액션 톤은 살리면서 오해 소지 없음
    - Acquisition은 그대로 (활성 미전환은 분명한 부정 시그널이라 danger 유지)
  - **키보드 네비게이션 인터랙션 정합성 (2026-04-27 추가)**:
    1. **kbd-focus tier 색 lf-mode 한정** — 이전엔 일반 모드에서도 sev-good/sev-warn/alert 카드가 방향키 포커스 시 tier 색 테두리. `.lf-mode` 스코프로 한정해 마우스 호버와 동일하게 동작 (line ~1132/1153). lf-mode 카드는 `.lf-state-good/warn/danger` 클래스를 쓰므로 셀렉터도 그에 맞춰 변경
    2. **라이트 모드 호버 투명도 강화** — 디폴트 `rgba(0,0,0,0.20)` 대비 호버 0.40은 차이 너무 약함. 호버/kbd-focus 모두 `rgba(0,0,0,0.64)`로 (line 80/1135/1152). 다크 모드(0.10→0.80, 0.7 차이) 수준에 근접
    3. **Detail panel 트랜지션 키보드 Enter 정상화** — 방향키+Enter 시 우측 패널 바/숫자가 transition 없이 틱틱 스냅. 원인: `innerHTML` 교체 직후 같은 rAF에서 width 설정 → 새 DOM의 초기값이 미확정. 마우스는 `mouseenter→animateCard`가 사전 layout flush를 일으켜 우연히 동작. 수정: `void document.getElementById('detail-body').offsetWidth` 강제 reflow 추가 (line ~2191)
    4. **kbd-nav 마우스 호버 잔재 완전 억제** — 마우스가 카드 위에 있는 상태에서 방향키 누르면 `body.kbd-nav`가 켜지는데 `:hover`는 살아있어 tier 색 잔존. 다크: line 1145-1147 삭제 → 1142가 적용되어 default 테두리로 리셋. 라이트: 추가 규칙(`body.light.kbd-nav .tank-wrap:not(.lf-state-*) .tank-card:hover { border-color: var(--border-card); }`) 신설해 line 80 specificity 극복. lf-mode는 `var(--tier-good-border)` 등 비-hover tier 색으로 reset

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
- **Y축 스케일 공통화**: Light/Casual/Power 세 차트가 `LF_DATA` 전체 최댓값 기준으로 동일 Y축 사용 → 동일 선상 비교
- LF 탭 alert 토글: `curMean < prevMean`이면 빨간 테두리 (LF 모드에서만), 나가면 origAlert 복구
- warn 영역(전월 대비 이상): `rgba(var(--clr-bad-rgb),0.08)` 배경 + radius 16, 그리드 정렬
- 그리드라인/해치 오버레이: 첫·마지막 버킷 경계까지 확장 (좌=padL, 우=W)
- 0 델타 공통 규칙: `–` (en dash, 48% opacity), "0만" 텍스트 생략 (상세 배지만 "– 0만" 유지)
- 탱크 인디케이터: `min-height: 24px` + `.alert-badge.placeholder { visibility: hidden }`로 alert 유무와 무관하게 행 높이 고정
- CSV 데이터 정합성 교정(seg_visit.csv): Light/Casual/Power cur·prev 11버킷 재입력, localStorage 캐시 v3로 bump

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
- **모든 하드코딩 샘플 제거** — DATA/LF_DATA/SEG_DETAILS는 빈값으로 초기화, CSV가 채움
- CSV 구조 재정비 (업무망 실제 포맷에 맞춤):
  - `data/total.csv` — 상단 대시보드 지표 (MAU/MAU 기여수/PUSH/Echo) *신규 분리*
  - `data/seg_panel.csv` — 세그 상세(연령대/보유카드 TOP5/평균카드보유/월평균결제). 한글 헤더 풀스키마
  - `data/seg_status.csv` — 세그 현황(한글 풀스키마: 데이터 추출일/트랙구분/세그구분/당월_진행/전월_동기/전월_마감)
  - `data/seg_visit.csv` — 로그인 빈도(피벗 레이아웃: A열=필드명, B~D열=Light/Casual/Power)
- 헤더 매핑(`CSV_HEADER_MAP`) 대폭 확장, 한글/영문 공존 지원
- 방문 CSV 피벗 자동 감지(`isPivotVisit`) + 전용 파서(`parsePivotVisit`)
- seg_status alert 자동 판정 (invertSign 기반 '나쁜 방향 변동' 감지)
- localStorage 캐싱: DATA(`aqua_data`) + LF_DATA(`aqua_lf_data_v3`) + SEG_DETAILS(`aqua_seg_details_v1`)

#### 기타
- Footer: "Digital Product · App User Quantitative Analysis · by UXI"
  - UXI → `href="uxi_aqua.html"` (같은 탭 페이지 전환, target="_blank" 없음)
  - 호버 시 흰색, underline 없음

### 다음 세션 작업 후보
- [x] Acquisition/Retention 이상징후 자동 판단 (invertSign 기반 완료)
- [x] 기준일(period) 실데이터 교체 (seg_visit/status extract_date 기반 자동 계산)
- [x] LF 데이터 CSV 연동 완료 (seg_visit.csv 피벗 파서)
- [ ] 업무망 실CSV 연결 후 실 수치 검증
- [ ] mau_growth.html 차트 데이터 CSV 연동 (현재 하드코딩 샘플)
- [ ] DATA_LAG_DAYS 상수(현재 10) — 실제 데이터 파이프라인 지연에 맞춰 조정

---

## mau_growth.html (MAU 상세 추이 페이지)

### 파일 개요
- `dp-aqua_growth.html` 기반으로 복사 후 단독 페이지화
- 상단 대시보드의 MAU 카드 클릭 시 진입 (`onclick="location.href='mau_growth.html'"`)
- 탭 3개: 주간 / 월간 / Growth Metrics (구 "연간")

### 핵심 로직
- **cutoff 기준일**: `seg_visit.csv`의 `extract_date` − `DATA_LAG_DAYS(=10)` = 실제 마지막 데이터 날짜
- **주간**: prev(전월)는 1~5주차 전체, cur(당월)는 lastWeek(=ceil(lastDataDay/7))까지만. KPI는 당주/전주/전주대비
- **월간**: prev(전년)는 Jan-Dec 전체, cur(당년)는 1~CURRENT_MONTH까지만. 값 갭은 미세(~10)로 YoY 성장 추이 표현
- **Growth Metrics**: 2026.4 기준 MAU/DAU 성장 정적 차트

### 구조 변경 지점
- `anchors` / `WEEK_DAYS` / `WEEK_XS` / `ANCHOR_DAYS` — 전체 유지, buildPts에서만 cur 절단
- `makeDot(types=['cur','prev'])` — types 파라미터로 cur 도트 주차 제한 구현
- `monthlyAnchors` 값 재조정 (전년 대비 미세 차이)
- `yearlyRangeStart=96` (Jan 2026) — 당년 1월부터 기준
- 오버라이드 스크립트: 캔버스 숨김 + `hideDetailPage()` → `location.href='aqua_real_grw.html'` + 로드 후 auto-open

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

### 라이트 모드 (`?light=1`)
- aqua_v0.8 / aqua_real_grw에서 라이트 상태면 UXI 링크에 `?light=1` 쿼리 붙여 전달 (`goUXI`)
- `body.light` → 배경 `#f0f0f0`, 뒤로가기/물고기 stroke `#000`, 물고기 drop-shadow 제거
- 캔버스 색상: `UXI_INSIDE_COLOR = #000` / `UXI_OUTSIDE_COLOR = #3a3428` (다크 대비 더 진한 회색)

---

## aqua_v0.82.html (0.82 버전 대시보드)

### 파일 개요
- `aqua_v0.8.html` 복제본. 레전드 + 일수카운트 영역을 **ret-section 하단**(tanks-row 뒤)으로 이동 — 세그현황판/LF 양 모드 공통 노출
- LF 모드에서는 레전드(전월/당월)만 페이드인(opacity 0→1, 0.32s), 일수카운트 박스는 상시 노출 → 탭 전환 시 위치 튐 없음

### 일수카운트 박스 스타일 (v0.8/v0.82 공통)
- 전월 박스: `.dc-dim` — 숫자 opacity 0.42, 라벨 opacity 0.62
- 당월/휴일차이 박스: `.dc-emph` — 테두리 `var(--border-emph)` (base 0.34)
- 안쪽 세로 구분선: `.dc-cell::after` 1px, 위아래 8px inset, `var(--border-inner)` (base 0.10)
- 새 CSS 변수 `--border-emph` / `--border-inner` 추가, `STROKE_BASE`에 등록해 슬라이더가 같이 스케일

### 트랙 라벨
- `.track-label` height 44→52px, font-size 10→13px (가독성 향상)
- 탱크 카드 호버/액티브/kbd-focus 시 해당 트랙 라벨이 `var(--white)`로 전환 (`:has` 셀렉터)

### 좌상단 기능버튼 그리드
- `.lnb-bottom` bottom 24→16px로 내림 — 우측 업로드 버튼(`.load-btn-wrap` bottom:16px)과 세로 중심선 일치

---

## aqua_v0.8.html (0.8 버전 대시보드)

### 파일 개요
- `aqua_real_grw.html` 복제본, 이탈 조기 경보(LF) 탭 + 휴일차이 자동 계산 추가
- 세그 현황판 ↔ 이탈 조기 경보 탭 전환 (period-sub 텍스트 scramble 애니메이션)

### 레이아웃
- LF 전용 레전드 + 휴일차이 박스는 `ret-section` 내부(track-label 자리)에 배치
  - `max-height: 0 ↔ 60` + opacity 페이드 전환
  - **absolute 금지** — aquarium-container 바닥 absolute는 카드 겹침/튐 이슈 반복, ret-section 내부가 최종 정답
- `.dc-period-lbl` margin-left: 8px / `.dc-val` font-weight: 500

### 휴일차이 자동 계산 (`updateDaycount`)
- `#period-val` 텍스트(예: "4. 1 ~ 4. 26") 파싱 → 당월/전월 같은 범위(1~endDay) 평일/휴일 카운트
- `KR_HOLIDAYS` Set: 2025·2026 공휴일 하드코딩 (대체공휴일 포함) — **매년 초 다음해 분 수동 추가 필요**
- 부호별 색상: +초록 / −빨강 / 0 흰색 (`applyDiffSign`)
- `MutationObserver`로 `#period-val` 변경 시 자동 재계산

### 풋터 / 테마
- dashboard-footer 64px 고정, load-btn-wrap bottom 16px (위아래 16 균등)
- `footer-uxi` margin-left: 4px, 라이트모드 hover `#000`
- 라이트 테마 `localStorage('aqua_theme')` 영속화 → UXI 왕복 시 유지
- `goUXI(e)`: 라이트 상태면 `uxi_aqua.html?light=1`로 이동

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

## Document_templete/dashboard/dashboard.html (대시보드 제안서 27장)

### 파일 개요
- "정밀 타격 대시보드 및 카드앱의 세이버 메트릭스 제안" 27장 단일 HTML 발표 자료 (2026-04-28, UX Insight팀)
- 세이버 메트릭스(FAI / RDI / VRI) + LPI(논의 필요) + BA(Business Attribution) + 대시보드 v0.8/0.9/1.0 구축 계획
- 위치: `Document_templete/dashboard/dashboard.html` (v0.8 폴리싱 + 인라인 편집 반영본 — `dashboard_v0.8.html`은 통합 후 제거)
- 원본 백업: `dashboard_org.html` (untracked, 작업용 보존)
- 디자인 참고: `Document_templete/dashboard/장표디자인참고/0~26.png`
- 대시보드 스크린샷: `Document_templete/dashboard/imgs/img_*.png` (페이지 3,4,9,13,16,20,22,23,24)

### 인라인 편집 시스템 정합성 수정 (2026-04-28 후속)
- **편집 활성화 시 풀폭 요소 shrink 버그 수정**: `.editable[contenteditable="plaintext-only"]`의 `width: fit-content !important`가 모든 editable에 일괄 적용돼 `.intro-footer` 같은 풀폭 요소가 텍스트 폭으로 쪼그라드는 문제. fit-content를 `.lede` opt-in으로 한정. JS 마우스다운 핸들러의 `marginLeft/Right: auto` 자동 적용도 `.lede`에만 한정 (flex item에 margin auto = shrink-to-fit 사이드이펙트 방지)
- **인트로 푸터 BR 더블 라인 버그 수정**: `text<br><span class="sub" style="display:block">` 구조에서 사용자가 사이에 `<br>` 추가 시 빈 줄 1개가 추가로 생기는 브라우저 렌더링 이슈. `.intro-footer`를 `<div class="main">` + `<div class="sub">` 두 독립 editable 블록으로 분리. `.sub`은 `display:block` 제거하고 `margin-top: 0.15em`로 시각 갭만 유지
- **루틴/혜택 RDI 카드 정리 (v0.8 폴리싱 #3 후속)**: `.center-block` 통째 editable이 활성화 시 본문 전체를 감싸던 문제 → BA 카드처럼 `<div class="lede">제목</div>` + `<p class="cond">본문</p>`로 분리. `.center-block .lead` SPAN 구조 제거. body padding 32×36, gap 20, `.formula-mini`만 `margin-top:auto`로 하단 고정
- **키보드 단축키**: 시프트+엔터도 plain Enter처럼 `<br>` 삽입 (이전엔 차단). Cmd/Ctrl+Enter = 저장 종료 / Esc = 취소 / Cmd/Ctrl+↑↓ = 폰트 크기 / Cmd/Ctrl+B = 굵게 (기존)
- **localStorage 키 bump**: `dashboard-edits-v2` → `v3` — 구조 변경 전 저장된 stale 편집(특히 .intro-footer 관련) 자동 무효화
- `.badge-discuss` border-radius 12 → 999px (논의 필요 라벨 pill 모양)
- **버전 통합**: `dashboard_v0.8.html` → `dashboard.html`로 일원화 (사용자가 인라인 편집 export 후 덮어쓰기 + 리네임). 작업 중 산출물은 `📥 HTML 내보내기` 버튼으로 export → 파일 덮어쓰기 패턴

### dashboard_v0.8.html 폴리싱 (2026-04-28)
- Page 5 (야구 vs 카드앱): `.compare-rounded` 배경을 공식 박스와 동일한 골드 `rgba(158,138,73,0.12)`로 통일, head-center ↔ box 간격 60→110px(슬라이드 5 한정)
- Page 11 (RDI 2동력): `.bhx-card .body.two-col` 안 h4 margin-bottom 4→22px, ul gap 12→6px (타이틀-리스트는 띄우고 li끼리는 모음)
- Page 12 (루틴/혜택 RDI): rdi-card body에 `flex:1` + center-block에 `margin-top:auto` 추가해 center-block 위/아래 마진 동일 분배. body padding-top을 gap과 같은 22px로 보정
- Page 18 (LPI 측정 방식): 우측 카드 body `flex:1` 인라인 추가 — 기존 `justify-content:center`가 작동하도록 (안 텍스트 세로 중앙)
- Page 21 (BA 인트로): `.ba-card .body` gap 24→40px, lede(설명문) 위 padding(40)과 같아져 lede 위/아래 마진 대칭
- Page 23/24 (BA 비용절감/간접수익): `<p class="dash-cap">`을 `<div class="dash-side-img">` 안으로 이동해 이미지 컬럼 아래 센터 정렬
- Page 25 (구축 계획 표): `.plan-table` 풀리뉴얼
  - 헤더 좌측 정렬(아래 셀과 앞정렬 통일), `<small>` 인라인 + 동일 굵기로 한 줄 처리
  - `tr.row-schedule td`: 회색 배경(`var(--soft-fill)`) + `border-top: 2px solid var(--text)`로 표 상단 검정 라인이 일정 행 위에서 좌→우 끊김 없이 연결
  - `tr.row-hl td`: 살몬 → 크림옐로우(`#FAF1D6` light / 노랑 18% dark)
  - 폰트 전반 키움(th 26→32, td/ul/sub 22→28, label 24→30), 레이블 padding-left 10→40px(들여쓰기), 불릿을 `·`(글리프) → 8px 진짜 원형 도트
  - `<div class="attn-center">`로 감싸 표 세로 중앙 정렬
- 공식 박스(`.formula`) 폰트 72→60px (페이지 7/10/14/17 공통)
- 애니메이션 변경 시도 후 원복: `.slide.active .animate` 스코프로 변경 → 사용자 "어색해" 반응 → 원래 `.animate` 단순 키프레임으로 복귀

### 시스템 (template.html 그대로 가져옴)
- `html.theme-dark` / `html.theme-light` 클래스 토글 + CSS 변수 토큰 (--bg, --surface, --text, --text-secondary, --accent 등) 동일
- 슬라이드 캔버스: 2040×1080, `.slide { position: absolute; inset: 0 }` 풀스크린, viewport에 자동 스케일
- 폰트: YouandiNewKrTitle(제목/h1·h2·h3) + SFProDisplay(본문/UI/숫자) — `../fonts/` 경로
- `--font-scale` 시스템 + `calc(...px * var(--font-scale))` 패턴
- 상단 progress-bar(3px, accent → accent-secondary 그라디언트)
- 하단 slide-nav(prev SVG / `n / 27` counter / next SVG)
- **하단 overview-panel — ↑ 키로 열기**: 좌측 controls(전체화면/테마/A−100%A+/Print) 210px + 우측 썸네일 트랙(scale 0.08824 클론). 클릭 또는 키보드(←→Enter)로 이동, ↓/Esc 닫기
- localStorage: `dashboard-theme` / `dashboard-font-scale`
- 키보드: ←→·Space·PgUp/PgDn 페이지, Home/End 처음/끝, T 테마, ↑ overview

### 27장 구성
- p0 표지 / p1 세그 명칭 표(A~D안 4가지 후보) / p2 V.08 인트로 3카드
- p3,4 대시보드 V.08 split(세그별 현황 / 이탈 조기 경보)
- p5 야구(OPS·WHIP·WAR·WPA) vs 카드앱(FAI·RDI·VRI) 비교
- p6 FAI·RDI·VRI 흐름(신규→정기→습관)
- p7~9 FAI(정의·AND 조건·대시보드)
- p10~13 RDI(정의·2동력·루틴/혜택 분리·대시보드)
- p14~16 VRI(정의·4패턴 OOO/XOO/OXO/XXO·대시보드)
- p17~20 LPI(논의 필요 배지)(정의·라이트유저 정의/측정·4패턴 OOX/XOX/OXX/XXX·대시보드)
- p21~24 BA(인트로 3카드·직접 수익·비용 절감·간접 수익)
- p25 대시보드 v0.8/0.9/v1.0 구축 계획 표
- p26 EOD

### 의도된 비일관성 (보존)
- VRI는 page 6에서 "Visit Regularity Index", page 14에서 "Visit Recurrence Index"로 명명 — 두 가지 후보를 의도적으로 함께 노출 (용어 정의 논의용)
- p17 LPI 정의 박스의 공식 변수명은 LRI (또 다른 이름 후보)

### 2026-04-29 작업
- **공유 폰트 사이즈 시스템**: `.doc-title` / `.doc-bullets` 사이즈를 CSS 변수(`--doc-title-size`, `--doc-bullets-size`)로 추출. Cmd+↑↓ 폰트 단축키가 doc-title 또는 doc-bullets li에서 눌리면 element-단위 inline style 대신 변수 수정 → 27장 일괄 반영. localStorage 키 `dashboard-shared-sizes-v1`. `.doc-bullets li::before` 불릿(•)는 별도 22px 고정 (텍스트만 변수 적용)
- **불릿 +/- 호버 컨트롤**: 각 `.doc-bullets li` 호버 시 우측에 흐린 그린 `−`/`+` 글리프 (테두리 X, 호버 시 100%). `−` = 그 li 삭제 (마지막 li 삭제 시 ul 전체 제거), `+` = 그 li 다음 새 항목 삽입 + 즉시 편집 진입
- **+ 새 항목 추가 버튼**: doc-bullets 없는 슬라이드에 `.doc-title` 호버 시 등장. 풀폭 + 인셋 점선 outline(라운딩 X) + li와 동일 텍스트 사이즈/위치. 클릭 시 새 ul 생성 + 첫 li 편집 진입
- **bullets 구조 저장소**: `dashboard-bullets-v1` localStorage. 슬라이드별 `b-N` 키로 ul innerHTML 통째 저장. li 텍스트 편집 시 saveEdit이 자동으로 BULLETS_KEY로 위임. applyStoredEdits에서 li-in-bullets는 EDIT_KEY 무시(자연스러운 마이그레이션)
- **상/중/하 콘텐츠 정렬 패턴** (slide-intro): flex column + auto margin으로 HTML 구조 변경 없이 3구역 분배. doc-title은 자연 위치 / slide-title.sm `margin-top: auto` / intro-cards `margin-bottom: auto` / intro-footer는 slide-intro의 마지막 자식. guide.md 11번 섹션에 정리
- **반응형 패딩**: `.slide-doc` / `.slide-intro-body` 위 패딩을 `calc(80px * var(--font-scale))`로 통일 → 두 페이지 위 간격 동일. `.doc-title`의 `margin-top: -20px` 제거(타이틀 위 여백 살림)
- **autoFitFontScale**: 뷰포트 높이/폭 비율 따라 0.7~1.0으로 자동 조정. fullscreenchange 이벤트에서도 호출 → 토글 시 즉시 padding 반영. 이전의 manual 플래그 차단 제거(매번 재계산)
- **slides-wrapper 동적 높이**: `Math.max(1080, availForSlide / scale)`로 viewport 높이에 맞춰 늘어남 → 16:10 등 squat한 디스플레이에서 슬라이드가 viewport 가득 채움. `offsetY = 0` (슬라이드 상단 정렬)
- **dash-wrap.dual 레이아웃 보강**: `grid-template-rows: 1fr; align-items: stretch` + 이미지 `flex: 1; min-height: 0; object-fit: contain` + 캡션 `flex: 0 0 auto`. 슬라이드 패딩 변경에도 캡션 항상 보이게
- **편집 호버 점선 outline**: `.title-add-list`만 `outline: 1.5px dashed` (인셋, 라운딩 X). 일반 .editable hover는 솔리드 box-shadow 유지(이전 호버 톤 그대로)
- **폰트 풀 스택 명시**: `.title-add-list`, `.bullet-controls .btn-bullet`에 `'SFProDisplay','SF Pro Display',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif` — inherit/단축형은 한글 폴백 깨짐
- **exportHTML 정리**: clone에서 `.slide.active`/`.slide.exit-left` 제거 → export 후 새로고침 시 다른 슬라이드(예: LPI)가 깜빡이는 현상 방지

---

## GitHub 연결
- 리포: https://github.com/choongsholic/aqua
- 브랜치: main

---

## 커뮤니케이션 원칙
- 구조적 제약이 있으면 시도 전에 먼저 설명
- 시키지 않은 것 추가 금지
- 수치 단위까지 정확하게
