# 포트폴리오 [작업중]

안녕하세요 포트폴리오 사이트에 오신 것을 환영합니다.

## 개요

이 포트폴리오 사이트는 **Next.js 14** 버전을 사용하여 제작되었으며, **GitHub Actions**를 적용하여 **master** 브랜치 배포시 자동으로 **GitHub Pages** 에 비용 절감 목적으로, 정적 호스팅되고 있습니다.

필요한 서버 동작은 **HTTPS without domain** 을 적용해 세팅한 **EC2** 를 통해, 추가 도메인 구매 없이 **SSL** 인증된 경로에 제작한 **Node.js API**를 호출하여 사용중 입니다.

이 사이트에서 블로그 게시물, 이전 회사에서 작업한 프로젝트 및 개인적인 프로젝트를 포함한 작업을 한 곳에서 볼 수 있습니다.

## 기술 스택

- **React.js / Redux / Next.js / typescript**  
- **Vue.js / Vuex / Nuxt.js / typescript**  
- **React Native / Redux / typescript**  
- **AWS (EC2, S3, CloudFront)**  
- **GIT (Actions, Pages)**
- **node.js**
- **웹표준**
- **접근성**

## 연락처

협업을 원하시면 아래의 연락처로 연락주세요

- **이메일:** joohoon.roh@gmail.com

## 리뉴얼 개발 및 검증

`portfolio/rework-2026` / Draft PR #1에서 작업합니다. 패키지 관리자는 npm이며 `package-lock.json`으로 설치합니다. Next.js 14의 린트 호환성을 위해 ESLint 8.57.1을 사용합니다. Node 실행 파일은 앱 의존성으로 설치하지 않습니다.

```sh
npm ci
npm run lint
npm run build
npm run dev
```

타입 검사는 `src`와 Next 생성 타입을 대상으로 합니다. 과거 프로젝트 자료인 `project/`와 `blog/`는 현재 Next 앱의 빌드 대상이 아닙니다. 회사 원본 코드를 상세 사례에 재사용하지 않습니다.

2026-10-28 로컬 검증: lint 경고/오류 없음, 프로덕션 정적 빌드 성공(`/`, `/contact`, `/work`, 404). Node 26.3.0 / npm 11.16.0에서 실행했으며 CI는 기존 배포와 동일하게 Node 20을 사용합니다. 브라우저 도구 연결 실패 및 로컬 Chrome 실행 중단으로 시각·모바일·키보드 동작 검증은 미완료입니다. 빌드의 Browserslist 데이터 갱신 안내는 남아 있습니다.

`/contact`는 `NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP`가 설정된 경우 기존 `/send-email` API 경로를 사용하며, 미설정 시 폼 전송을 비활성화하고 이메일 연락을 안내합니다. 실제 API 연결·메일 전송은 검증하지 않았습니다.

배포는 여전히 `output: "export"`와 GitHub Pages를 사용합니다. master 병합 시 기존 Pages 배포가 실행됩니다. EC2 Docker 전환 전에는 도메인, 서버 접근 방법, 자원, 현재 API/포트/프록시/인증서, 롤백 경로를 확인해야 합니다. 운영 전환은 아직 수행하지 않았습니다.
