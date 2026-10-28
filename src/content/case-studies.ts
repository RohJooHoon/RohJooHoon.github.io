export const caseStudies: Record<string, {
  role: string;
  context: string;
  decisions: { title: string; description: string }[];
  flow: string[];
  result: string;
  limitation: string;
}> = {
  'deepmedi-admin': {
    role: '프론트 앱 개발 · 중간 관리',
    context: '웹 어드민 2.0 리뉴얼에서 도메인별 모듈과 공용 코드의 경계를 정리하고, 여러 앱에서 사용할 프론트엔드 기반을 구성했습니다.',
    decisions: [
      { title: '4계층 구조와 의존성 검증', description: 'FSD의 app / features / entities / shared 4계층으로 코드를 구성했습니다. Steiger와 eslint-boundaries를 사용해 계층과 도메인 사이의 의존성 규칙을 정적으로 검증하도록 했습니다.' },
      { title: '앱과 공용 패키지 분리', description: 'Turborepo 모노레포에서 앱과 공용 패키지를 분리하고 빌드 캐싱을 구성했습니다. Static Export와 CDN을 사용하는 배포 구조를 마련했습니다.' },
      { title: '반복 작업 자동화', description: 'ko / en / ja / zh 4개 로케일의 번역 키를 자동 스캔하고, release-please의 dev / main 2채널로 버전과 체인지로그를 관리했습니다. Conventional Commits와 Lefthook을 함께 사용했습니다.' },
    ],
    flow: ['app · 앱 구성', 'features · 사용자 기능', 'entities · 도메인', 'shared · 공용 코드'],
    result: '도메인 모듈화, 의존성 정적 검증, 빌드 캐싱과 릴리스 자동화를 포함하는 개발 기반을 구성했습니다.',
    limitation: '빌드 시간이나 개발 생산성의 전후 측정값은 공개 자료에서 확인되지 않았습니다. 구조와 자동화 구성 경험을 중심으로 설명합니다.',
  },
  'kiwisnap-editor': {
    role: 'Seed 멤버 · 메인 개발자 · 프론트엔드 개발 팀장',
    context: '템플릿 기반 쇼핑몰 솔루션의 초기·베타부터 1.0, 2.0, 3.0 개발을 주도했습니다. 핵심 에디터에서 불필요한 API 요청과 화면 간 데이터 동기화 문제를 개선했습니다.',
    decisions: [
      { title: '스토어 기반 데이터 중앙 관리', description: 'Vue 3 · Nuxt.js 기반 에디터에서 데이터를 스토어로 중앙 관리하도록 구조를 개선했습니다. 화면마다 연결된 데이터 흐름을 정리해 동기화 오류와 불필요한 API 요청을 줄였습니다.' },
      { title: '핵심 에디터 설계와 제품 개발', description: '쇼핑몰 솔루션의 핵심 에디터 설계·개발을 담당하며 제품 버전 확장에 참여했습니다. TypeScript, SCSS와 상태 관리 경험을 제품 구현에 적용했습니다.' },
      { title: '마크업 생성 자동화', description: 'Figma CSS를 기반으로 프레임 마크업을 자동 생성하는 도구를 개발했습니다. 반복적인 화면 제작 업무를 자동화한 별도 사례입니다.' },
    ],
    flow: ['에디터 화면', '중앙 스토어', '데이터 동기화 · API'],
    result: '이력서에는 에디터 주요 동작 속도를 3–5초에서 1초 이내로 개선한 것으로 기재되어 있습니다. 페이지 로드 시간이나 LCP 수치로 해석하지 않습니다.',
    limitation: '해당 동작의 정의, 장비·네트워크·데이터 규모, 비교 버전과 반복 측정 기준은 아직 확인되지 않았습니다. 이번 작업에서 재측정한 벤치마크가 아닙니다.',
  },
  'haii-mfe': {
    role: '16개 사내 프로젝트 통합 어드민 · 프론트엔드 전담',
    context: '여러 사내 프로젝트를 통합하는 어드민에서 4개 팀이 독립적으로 개발하고 배포할 수 있는 프론트엔드 구조를 구성했습니다.',
    decisions: [
      { title: 'Shell과 Remote 앱 분리', description: 'React · TypeScript와 Module Federation을 사용해 Shell 1개와 Remote 앱 4개를 구성했습니다. Remote 앱의 독립 실행과 통합 라우팅을 함께 구현했습니다.' },
      { title: '앱별 배포 파이프라인', description: '앱별 배포 파이프라인을 구성하고 Firebase CLI 배포 스크립트를 사용했습니다. 독립 개발·배포가 가능한 단위로 실행 환경을 나누었습니다.' },
      { title: '공유 라이브러리 전략', description: '공유 라이브러리 전략을 적용해 중복 번들을 줄였습니다. 독립 앱의 실행 환경과 Shell에서의 통합 동작을 함께 고려한 구성입니다.' },
    ],
    flow: ['Shell · 통합 라우팅', 'Remote 앱 × 4 · 독립 실행', '앱별 배포 파이프라인'],
    result: '4개 팀의 독립 개발·배포 구조를 구성했습니다. 이력서에는 공유 라이브러리 전략을 통한 번들 약 40% 절감이 기재되어 있습니다.',
    limitation: '번들 수치가 원본·압축·gzip 중 어떤 기준인지, 초기 로드 또는 전체 앱 합계인지, 비교 버전과 측정 도구가 무엇인지는 아직 확인되지 않았습니다.',
  },
  'tizen-tv': {
    role: '프론트엔드 전담',
    context: '삼성 스마트 TV 인지 훈련 앱에서 TV 리모컨과 터치 입력을 고려한 UI를 구현했습니다. 웹과 다른 입력 방식과 Tizen 실행 환경을 다루었습니다.',
    decisions: [
      { title: '입력 방식에 맞는 탐색', description: '리모컨의 포커스 이동·선택·뒤로가기를 구현하고 터치와 리모컨 입력을 감지했습니다. Vue 3 · TypeScript · Pinia · Vue Router를 사용했습니다.' },
      { title: 'Tizen API와 다국어', description: 'Tizen의 디바이스·언어 API를 연동하고 Vue I18n으로 다국어를 구성했습니다. TV 접근성과 평가·게임 모듈 구현을 담당했습니다.' },
      { title: '타입 생성과 환경별 배포', description: 'OpenAPI 기반 타입 생성, ES2015 빌드 타겟과 환경별 빌드를 적용했습니다. Makefile을 사용해 브랜치별 배포를 자동화했습니다.' },
    ],
    flow: ['리모컨 · 터치 입력', '포커스 이동 · 선택 · 뒤로가기', '평가 · 게임 모듈 / Tizen API'],
    result: '이력서에는 삼성 스마트 TV 공식 앱스토어 출시 경험으로 기재되어 있습니다.',
    limitation: '지원 TV 모델 범위와 실제 스토어 상세 링크는 아직 확보하지 않았습니다. 공식 명칭 확인 전까지 이 페이지에서는 기능 중심의 프로젝트 제목을 사용합니다.',
  },
};
