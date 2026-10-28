# 노주훈 포트폴리오

기존 사진 카루셀, `Hello / I'm JooHoon` 타이틀, 로고와 코랄·옐로 색상, 사진 배경 섹션을 유지하며 경력 내용을 보완하는 포트폴리오입니다.

## 개발

Next.js 14.2.5 · React 18 · TypeScript를 사용합니다. Node는 20.9 이상이 필요하며 CI는 Node 20을 사용합니다. 패키지 관리자는 npm입니다.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

Next 14의 린트와 호환되는 ESLint 8.57.1을 사용합니다. 타입 검사 범위는 `src`와 Next 생성 타입입니다. 과거 자료인 `project/`와 `blog/`는 현재 앱 빌드 대상이 아닙니다. 회사 소스나 인증정보를 포트폴리오 사례에 재사용하지 않습니다.

## 화면 구성

- 메인: 사진 카루셀 → About → Work → Experience → Publishing → Contact.
- 카루셀은 기존 `banner_1.jpg`부터 `banner_3.jpg`를 사용하며 이전·다음 버튼, 방향키, 포인터 드래그를 지원합니다. 자동 재생은 하지 않습니다.
- 섹션 배경은 기존 `bg_1.jpg`, `bg_2.jpg`, `bg_4.jpg`, `bg_5.jpg`를 사용합니다.
- 기존 미완성 문구를 경력 설명으로 교체하고 일반 문서 스크롤과 앵커 이동을 사용합니다.
- 프로젝트 목록 정보는 `src/content/projects.ts`, 상세 설명은 `src/content/case-studies.ts`에서 관리합니다.
- 상세 사례는 `/projects/deepmedi-admin/`, `/projects/kiwisnap-editor/`, `/projects/haii-mfe/`, `/projects/tizen-tv/`로 정적 생성됩니다.

MFE 소속은 2026-10-28 사용자 확인에 따라 하이(Haii)입니다. 성과 수치는 이력서 기재값이며 독립 검증하지 않았습니다. 상세 사례에 미확인 측정 기준을 표시합니다. 회사 소스와 미승인 스크린샷을 포함하지 않습니다. TV 앱은 공식 명칭과 스토어 URL 확인 전까지 기능 중심의 제목을 사용합니다. Java/Spring 실무 경력은 추가하지 않았습니다.

## 배포와 연락

`output: "export"`, `trailingSlash: true`를 사용해 `out/`을 생성합니다. master 브랜치에 반영하면 기존 GitHub Actions가 GitHub Pages로 배포합니다. 개발 브랜치와 PR의 검증 워크플로는 배포하지 않습니다.

포트폴리오는 EC2를 사용하지 않는 정적 호스팅을 유지합니다. Pages 빌드에 기존 EC2 API 주소를 주입하지 않으며 연락은 이메일 링크로 제공합니다. `/contact/`의 기존 폼 구현은 보존하되 `NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP`가 별도로 설정된 경우에만 표시합니다. 실제 API 연결과 이메일 전송은 검증하지 않았습니다. AWS 자원은 중지·삭제하지 않았습니다.

연락처: [joohoon.roh@gmail.com](mailto:joohoon.roh@gmail.com)

## 검증 기록 — 2026-10-28

- npm 잠금 파일 정리 후 `npm ci` 성공.
- 기존 검증 커밋 `2e65146`의 GitHub Actions 성공.
- 사진 카루셀 복원 후 프로덕션 빌드·린트·타입 검사·상세 경로 정적 생성 성공.
- 브라우저에서 사진 전환, 마지막→첫 사진 순환, 모바일 메뉴와 앵커 이동을 확인.
- Browserslist 데이터 갱신 안내는 남아 있습니다.
- PR은 Draft로 유지하며 master 병합과 운영 배포는 수행하지 않았습니다.
