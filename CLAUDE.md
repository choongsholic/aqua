# 트리거 규칙

## 아쿠아 (DP 폴더 전체 — Document_templete 제외)
- "아쿠아"라고 하면 `./context.md` 파일을 읽고 이전 작업 맥락을 파악한 뒤 바로 작업 준비 상태로 시작
- "아쿠아 푸시"라고 하면 변경된 파일을 확인하고 `context.md`를 현재 작업 상태로 업데이트한 뒤 git add + commit + push (단, `Document_templete/` 변경분은 제외)
- "아쿠아 풀"이라고 하면 git pull로 최신 파일을 받아오고 완료 여부를 알려줌

## 템플릿 (Document_templete/ 폴더만)
- "템플릿"이라고 하면 `./Document_templete/` 폴더의 context.md(없으면 DP context.md 템플릿 섹션)를 읽고 작업 준비 상태로 시작
- "템플릿 푸시"라고 하면 변경된 파일을 확인하고 context.md 템플릿 섹션을 업데이트한 뒤 `Document_templete/` 내 변경 파일만 git add + commit + push
- "템플릿 풀"이라고 하면 git pull로 최신 파일을 받아오고 완료 여부를 알려줌

---

# 폰트 렌더링 규칙

## 폰트 스택 (모든 인라인 스타일 / SVG에 적용)
- `'SF Pro Display',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif`
- **이유**: 인라인 font: 단축속성은 body font-family를 덮어씀. Apple SD Gothic Neo 없으면 한글이 엉뚱한 폰트로 폴백됨

## SVG 텍스트
- 공백 있는 폰트명은 반드시 따옴표 감쌀 것: `font-family="'SF Pro Display',..."`

## 브라우저 확인
- 수정 후 반드시 **새 탭**으로 열 것 (기존 탭 새로고침은 캐시 문제 있음)
