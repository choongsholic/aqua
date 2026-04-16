# Codebase Viz Template Guide

## 파일
- `codebase-viz.html` — 물리 기반 인터랙티브 구조도 템플릿

## 구조 요약
Canvas + vanilla JS, 외부 의존성 없음 (YouandiNewKr 폰트만 CDN)

## 커스텀 포인트 (이것만 바꾸면 다른 도식화 가능)

### 1. nodeData (노드 정의)
```js
{ id:'ID', label:'표시명', sub:'부제\n줄바꿈가능', group:'타입', row:행, col:열 }
```
- **group 종류**: `input`(흰배경), `agent`(둥근), `agent-step`(둥근), `system`(사각), `memory`(사각), `qg`(마름모), `retry`(둥근), `decision`(둥근), `output`(둥근)
- row/col: 소수점 가능 (예: row:5.2)

### 2. edgeData (연결선)
```js
['fromId', 'toId', 'solid'] // 또는 'dashed'
```

### 3. contextFlows (호버 시 활성화 경로)
```js
'nodeId': {
  nodes: ['활성화할', '노드', 'ID들'],
  edges: [['from','to'], ['from','to']]
}
```

### 4. groupNodeIds (그룹 박스)
```js
{ 'Group Name': ['nodeId1', 'nodeId2', ...] }
```
drawGroupBox()에서 렌더링

## 인터랙션 파라미터

| 항목 | 위치 | 현재값 |
|------|------|--------|
| 호버 스케일 | `this.targetScale` | 1.1 |
| 스케일 스프링 stiffness | update() | 0.18 |
| 스케일 스프링 damping | update() | 0.65 |
| 호버 push 강도 | update() | 1.2 |
| push 복원 | update() | 0.18 |
| push 댐핑 | update() | 0.85 |
| 드래그 스프링K | constructor | 0.018 |
| 드래그 damping | constructor | 0.9 |
| float 진폭 | update() | 0 (비활성) |
| 노드 라운드 | draw() | 12 (qg: 4) |
| 그룹박스 라운드 | drawGroupBox() | 32 |
| 선 굵기 | drawEdge() | 0.5 / 하이라이트 1.2 |
| 점선 간격 | drawEdge() | [3, 3] |
| 파티클 크기 | drawEdge() | 1.8 |
| 파티클 속도 | drawEdge() | 0.0025 |
| 점선 흐름 속도 | drawEdge() | t * 0.3 |
| 블러(호버) | draw() | 24 |
| 그룹박스 테두리 투명도 | drawGroupBox() | 0.16 |

## 폰트
- 기본: SF Pro Display (시스템 폰트 스택)
- DP Cowork 타이틀: YouandiNewKr Bold (CDN)
- You&I 서체는 타이틀 전용, 나머지는 SF Pro Display
