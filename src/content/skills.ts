import { aiHarness } from './ai-harness';

type SkillGroup = {
  title: string;
  items: string[];
  primaryItems?: string[];
  detail?: typeof aiHarness;
};

export const skillGroups: SkillGroup[] = [
  {
    title: '프론트엔드',
    primaryItems: ['React 19', 'Next.js 16 · App Router', 'TypeScript', 'Vue 3', 'Nuxt.js'],
    items: ['React 19', 'Next.js 16 · App Router', 'TypeScript', 'Vue 3', 'Nuxt.js', 'JavaScript', 'HTML', 'CSS / SCSS', 'Tailwind CSS v4'],
  },
  {
    title: '구조 설계·상태 관리',
    primaryItems: ['FSD', 'Turborepo · 모노레포', 'Micro Frontends', 'Module Federation'],
    items: ['FSD', 'Turborepo · 모노레포', 'pnpm Workspaces', 'Micro Frontends', 'Module Federation', 'TanStack Query', 'Zustand', 'Pinia', 'React Hook Form', 'Zod', 'React Compiler'],
  },
  {
    title: 'AI 개발 워크플로',
    items: ['Claude Code', 'AI 하네스 구성', '커스텀 스킬 설계', '서브에이전트 리뷰', '훅 기반 명령 가드', '검사 게이트 설계'],
    detail: aiHarness,
  },
  {
    title: '테스트·코드 품질',
    items: ['Vitest · 테스트 코드 작성', 'ESLint', 'TypeScript 정적 검사', 'Steiger', 'eslint-boundaries', 'API Extractor', 'Lefthook'],
  },
  {
    title: 'Git·빌드·배포',
    items: ['Git', 'GitHub Actions', 'GitHub CLI', 'GitHub Packages', 'Changesets', 'CI/CD', 'Docker', 'AWS · EC2 / S3 / CloudFront', 'Static Export · CDN', 'Vite', 'Firebase CLI', 'release-please', 'Conventional Commits', 'Makefile'],
  },
  {
    title: '제품 분석·모니터링',
    items: ['GA4', 'PostHog', 'Sentry'],
  },
  {
    title: '앱·TV 플랫폼',
    items: ['Flutter', 'React Native', 'Tizen', 'App Store · iOS 앱 배포', 'Google Play · Android 앱 배포'],
  },
  {
    title: '검색·접근성·다국어',
    items: ['SEO', 'GEO', '웹 접근성', '웹 접근성 마크 취득·갱신', '웹 표준', '반응형 UI', 'i18next', 'Vue I18n'],
  },
  {
    title: 'API·데이터·인터랙션',
    items: ['REST API', 'OpenAPI 기반 타입 생성', 'Axios', 'Recharts', 'ECharts', 'Three.js', 'Matter.js', 'Lottie', 'ExcelJS', 'jsPDF', 'Node.js', 'MySQL', 'jQuery'],
  },
];
