# 노주훈 포트폴리오

https://rohjoohoon.github.io/

## 기술 스택

| 항목 | 사양 |
| --- | --- |
| 런타임 | Node.js ≥ 20.9, npm |
| 프레임워크 | Next.js 14.2.5, React 18 |
| 언어 | TypeScript 5 |
| 스타일 | CSS Modules, MUI 5, Emotion 11 |
| 린트 | ESLint 8.57.1 |
| 호스팅 | GitHub Pages · GitHub Actions |

## 실행

```sh
npm ci
npm run dev
npm run lint
npm run build
```

## 디렉터리

- `src/app/`: 페이지·레이아웃
- `src/content/`: 프로젝트·경력·기술 스택 데이터
- `public/images/`: 이미지

## 배포

`master` 반영 시 GitHub Actions가 정적 빌드(`out/`) 후 GitHub Pages에 배포합니다.

- `output: "export"`
- `trailingSlash: true`
- 이미지 최적화 비활성화
