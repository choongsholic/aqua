/* ============================================================
 * 사용법 (3단계)
 *
 * 1. AI-프롬프트.txt 열기 → [내 프로젝트 정보] 채우기 → 전체 복사
 * 2. Claude 열고 붙여넣기 + 이 파일(slide-data.js) 첨부 → 전송
 * 3. 반환된 코드로 이 파일 덮어쓰기 → template.html 브라우저에서 열기
 *
 * 수정할 때: 수정 요청 내용 + 이 파일 첨부해서 Claude에 전달
 * ============================================================
 *
 * [레이아웃 variant 옵션]
 *
 * cover.variant
 *   (기본값)  — 중앙 정렬 표지 (제목 + 부제 + 팀원)
 *   'hero'    — 좌측 정렬, 대형 타이틀 강조
 *
 * problem.variant
 *   (기본값)  — 3카드 + 우측 프로세스 플로우
 *   'focus'   — 좌측 핵심 수치 + 우측 문제 리스트
 *              → problem.focus: { label, stat, desc } 필드 추가 필요
 *
 * built.variant
 *   (기본값)  — 상단 인용구 + 하단 3카드 그리드
 *   'showcase' — 좌측 인용구 + 우측 세로 기능 리스트
 *
 * next.variant
 *   (기본값)  — 3카드 그리드
 *   'roadmap' — 가로 타임라인 형태
 *
 * extra[].type
 *   'image'   — 이미지 전체 화면
 *   'cards'   — 카드 그리드 슬라이드
 *              → extra[].items: [{ heading, body }] 필드 필요
 * ============================================================ */

const SLIDE_DATA = {
  meta: {
    event: "UX2 Team Demo Day",
    session: "Session 1. Automation",
    // UXI 팀 표준 색상 (변경 불필요)
    accentColor: "#00D56D",
    accentSecondary: "#00D56D"
  },

  cover: {
    // variant: 'hero',  // 좌측 정렬 대형 타이틀. 기본은 중앙 정렬
    title: "프로젝트 제목",
    subtitle: "한 줄로 설명하는 프로젝트 핵심 가치",
    members: "팀원1*, 팀원2"  // 발표자에 * 표시
  },

  problem: {
    // variant: 'focus',  // 좌측 핵심 수치 강조 레이아웃
    // focus: { label: "핵심 지표", stat: "4시간", desc: "1회 검수 평균 소요 시간" },
    title: "기존 방식의 비효율",
    cards: [
      { num: "01", heading: "문제 1", body: "문제 설명" },
      { num: "02", heading: "문제 2", body: "문제 설명" },
      { num: "03", heading: "문제 3", body: "문제 설명" }
    ],
    process: {
      title: "현재 프로세스",
      steps: ["단계 1", "단계 2", "단계 3", "단계 4", "단계 5"],
      note: null  // 보충 설명. 없으면 null
    }
  },

  built: {
    // variant: 'showcase',  // 좌측 인용구 + 우측 세로 기능 리스트
    quote: "우리가 만든 것은",
    quoteHighlight: "'핵심 가치'",  // em 태그로 강조됨
    sub: "프로젝트를 한 줄로 설명하는 부제",
    features: [
      { icon: "grid",  heading: "핵심 기능 1", body: "기능 설명" },
      { icon: "bar",   heading: "핵심 기능 2", body: "기능 설명" },
      { icon: "link",  heading: "핵심 기능 3", body: "기능 설명" }
      // icon 값: "grid" | "bar" | "link" | "check" | "star" | "bolt"
    ]
  },

  // ── 선택 슬라이드 — null로 설정하면 슬라이드 생략 ──

  how: {
    title: "기술 구조",
    arch: [
      { label: "입력",   highlight: true  },
      { label: "처리 A", highlight: false },
      { label: "처리 B", highlight: false },
      { label: "처리 C", highlight: false },
      { label: "출력",   highlight: true  }
    ],
    why: {
      title: "기술 선택 이유",
      items: ["이유 1", "이유 2", "이유 3"]
    }
  },
  // how: null,

  ba: {
    title: "Before / After",
    before: {
      count: 4,  suffix: "시간",
      desc: "기존 방식 소요 시간",
      items: ["문제점 1", "문제점 2", "문제점 3"]
    },
    after: {
      count: 20, suffix: "분",
      desc: "개선 후 소요 시간",
      items: ["개선 사항 1", "개선 사항 2", "개선 사항 3"]
    }
  },
  // ba: null,

  reality: {
    title: "현재 범위와 한계",
    can:  ["현재 가능한 것 1", "현재 가능한 것 2", "현재 가능한 것 3"],
    cant: ["아직 한계인 것 1", "아직 한계인 것 2", "아직 한계인 것 3"]
  },
  // reality: null,

  next: {
    // variant: 'roadmap',  // 가로 타임라인 형태. 기본은 3카드 그리드
    title: "다음 단계",
    items: [
      { heading: "계획 1", body: "설명" },
      { heading: "계획 2", body: "설명" },
      { heading: "계획 3", body: "설명" }
    ]
  },

  closing: {
    quote: '"배움의 핵심은',
    quoteHighlight: "실천",       // em 태그로 강조됨
    secondary: '직접 만들며 배웠습니다."',
    members: "팀원1, 팀원2"
  },

  // ── 추가 슬라이드 — Closing 앞에 삽입. 없으면 [] ──
  extra: [
    // 이미지 슬라이드:
    // { type: 'image', src: 'screenshot.png', alt: '스크린샷 설명' }
    //
    // 카드 그리드 슬라이드:
    // { type: 'cards', tag: 'Demo', title: '슬라이드 제목',
    //   items: [{ heading: '카드 제목', body: '설명' }] }
  ]
};
