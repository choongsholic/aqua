# 트리거 규칙

## DP-AQUA (dp-aqua.html 세트)
- "아쿠아"라고 하면 `./context.md` 파일을 읽고 이전 작업 맥락을 파악한 뒤 바로 작업 준비 상태로 시작
- "아쿠아 써밋"이라고 하면 변경된 파일을 확인하고 `context.md`를 현재 작업 상태로 업데이트한 뒤 git commit + push
- "아쿠아 풀"이라고 하면 git pull로 최신 파일을 받아오고 완료 여부를 알려줌

## DP-AQUA Growth (dp-aqua_growth.html 세트)
- "아쿠아 그로쓰"라고 하면 `./context_growth.md` 파일을 읽고 이전 작업 맥락을 파악한 뒤 바로 작업 준비 상태로 시작
- "아쿠아 그로쓰 써밋"이라고 하면 변경된 파일을 확인하고 `context_growth.md`를 현재 작업 상태로 업데이트한 뒤 git commit + push
- "아쿠아 그로쓰 풀"이라고 하면 git pull로 최신 파일을 받아오고 완료 여부를 알려줌

---

# 폰트 렌더링 규칙

## 폰트 스택 (모든 인라인 스타일 / SVG에 적용)
- `'SF Pro Display',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif`
- **이유**: 인라인 font: 단축속성은 body font-family를 덮어씀. Apple SD Gothic Neo 없으면 한글이 엉뚱한 폰트로 폴백됨

## SVG 텍스트
- 공백 있는 폰트명은 반드시 따옴표 감쌀 것: `font-family="'SF Pro Display',..."`

## 브라우저 확인
- 수정 후 반드시 **새 탭**으로 열 것 (기존 탭 새로고침은 캐시 문제 있음)
