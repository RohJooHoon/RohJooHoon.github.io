import Link from "next/link";
import styles from "./page.module.css";

const projects = [
  {
    number: "01",
    type: "FRONTEND ARCHITECTURE · DEEP MEDI",
    title: "웹 어드민 2.0 아키텍처 설계",
    period: "2026.01 — 2026.05",
    summary: "도메인 경계와 개발 규칙을 코드로 검증할 수 있는 프론트엔드 기반 구축",
    details: [
      "FSD 4계층 구조와 도메인 단위 모듈 설계",
      "Steiger·eslint-boundaries로 의존성 규칙 정적 검증",
      "Turborepo 모노레포와 버전 관리·검증 자동화 구성",
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "FSD", "Turborepo"],
  },
  {
    number: "02",
    type: "LEGACY REFACTORING · KIWISNAP",
    title: "상세페이지 에디터 구조 개선",
    period: "2020.11 — 2024.03",
    summary: "화면 간 데이터 의존을 줄이고 중앙 상태 기반으로 에디터 구조 개선",
    details: [
      "Vue 3·Nuxt 기반으로 핵심 에디터 구조 개선",
      "스토어 기반 데이터 중앙 관리로 유지보수성 향상",
      "불필요한 API 요청과 동기화 오류를 줄여 주요 동작 속도 개선",
    ],
    metric: "3–5초 → 1초 이내",
    tags: ["Vue 3", "Nuxt.js", "TypeScript", "State Management"],
  },
  {
    number: "03",
    type: "MICRO FRONTENDS · HAIi",
    title: "React 마이크로 프론트엔드 구축",
    period: "2024.11 — 2025.11",
    summary: "여러 팀이 독립적으로 개발하고 배포할 수 있는 프론트엔드 아키텍처 설계",
    details: [
      "Module Federation 기반 Shell 1개와 Remote 앱 4개 설계",
      "앱별 실행 환경·라우팅·배포 파이프라인 구성",
      "공유 라이브러리 전략으로 중복 번들 축소",
    ],
    metric: "4개 팀 독립 배포 · 번들 약 40% 절감",
    tags: ["React", "TypeScript", "Module Federation", "CI/CD"],
  },
  {
    number: "04",
    type: "TV APPLICATION · HAIi",
    title: "삼성 스마트 TV 인지 훈련 앱",
    period: "2025.07 — 2025.10",
    summary: "터치 중심 모바일 경험을 TV 리모컨 기반 앱으로 확장",
    details: [
      "Vue 3·TypeScript 기반 SPA 설계 및 프론트엔드 전담",
      "리모컨 포커스 이동·선택·뒤로가기 UX 구현",
      "Tizen API 연동과 환경별 빌드·배포 자동화",
    ],
    tags: ["Vue 3", "TypeScript", "Tizen", "Pinia", "Vite"],
  },
];

const experience = [
  {
    company: "딥메디",
    role: "프론트엔드 개발 · 중간 관리",
    period: "2026.01 — 현재",
    description: "웹 어드민 2.0 리뉴얼. FSD, Turborepo, 정적 배포 및 개발 자동화 체계 구축",
  },
  {
    company: "하이 (Haii)",
    role: "프론트엔드 개발",
    period: "2024.10 — 2026.01",
    description: "16개 사내 프로젝트 통합 어드민, 삼성 스마트 TV 앱, 채팅형 설문 웹 개발",
  },
  {
    company: "키위스냅",
    role: "프론트엔드 개발 팀장",
    period: "2020.11 — 2024.03",
    description: "쇼핑몰 솔루션 핵심 에디터와 React 기반 도매 직거래 솔루션의 구조 설계 및 개발",
  },
  {
    company: "에이치나인",
    role: "프론트엔드 개발",
    period: "2017.04 — 2020.01",
    description: "웹 접근성 인증·갱신, 다국어 웹사이트, 하이브리드 앱 및 대규모 웹앱 퍼블리싱",
  },
];

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <section className={styles.hero} id="home">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>FRONTEND ENGINEER · 8+ YEARS</p>
          <h1>
            복잡한 문제를
            <br />
            <span>유지보수 가능한 구조</span>로 만듭니다.
          </h1>
          <p className={styles.heroDescription}>
            웹 서비스의 구조 설계부터 성능 개선, 배포 자동화까지.
            <br className={styles.desktopBreak} />
            사용자 경험과 개발 생산성을 함께 고려하는 프론트엔드 개발자 노주훈입니다.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#projects">대표 프로젝트 보기 <span aria-hidden="true">↘</span></a>
            <a className={styles.secondaryButton} href="mailto:joohoon.roh@gmail.com">이메일 연락</a>
          </div>
          <div className={styles.heroFacts}>
            <div><strong>8년+</strong><span>개발 경력</span></div>
            <div><strong>4개 팀</strong><span>독립 배포 구조</span></div>
            <div><strong>약 40%</strong><span>번들 절감 · 이력서 기재</span></div>
          </div>
        </div>
        <a className={styles.scrollCue} href="#projects">SCROLL TO EXPLORE <span>↓</span></a>
      </section>

      <section className={styles.section} id="projects">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>SELECTED WORK</p>
          <h2>대표 프로젝트</h2>
          <p>사용한 기술보다 해결한 문제, 설계한 구조, 확인 가능한 결과를 중심으로 정리했습니다.</p>
        </div>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.number}>
              <div className={styles.projectNumber}>{project.number}</div>
              <div className={styles.projectBody}>
                <p className={styles.projectType}>{project.type}</p>
                <div className={styles.projectTitleRow}>
                  <h3>{project.title}</h3>
                  <span className={styles.projectPeriod}>{project.period}</span>
                </div>
                <p className={styles.projectSummary}>{project.summary}</p>
                <ul className={styles.detailList}>
                  {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {project.metric && <p className={styles.metric}>{project.metric}</p>}
                <ul className={styles.tagList}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.disclaimer}>성과 수치는 이력서 기재값이며 이번 포트폴리오 작업에서 독립 검증하지 않았습니다. 측정 환경·비교 버전·산정 기준은 아직 확인되지 않았습니다.</p>
      </section>

      <section className={styles.experienceSection} id="experience">
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>CAREER</p>
            <h2>경력</h2>
            <p>다양한 제품과 플랫폼에서 프론트엔드 구조 설계 및 구현을 담당했습니다.</p>
          </div>
          <div className={styles.timeline}>
            {experience.map((item) => (
              <article className={styles.timelineItem} key={item.company}>
                <div className={styles.timelinePeriod}>{item.period}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.company}</h3>
                  <p className={styles.timelineRole}>{item.role}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="approach">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>HOW I WORK</p>
          <h2>강점과 접근 방식</h2>
        </div>
        <div className={styles.strengthGrid}>
          <article><span>01</span><h3>구조 설계와 리팩터링</h3><p>기존 코드의 데이터 흐름과 의존 관계를 파악하고, 기능 추가와 유지보수가 쉬운 구조로 개선합니다.</p></article>
          <article><span>02</span><h3>개발 생산성 자동화</h3><p>타입·린트 검증, 버전 관리, 빌드 및 배포 과정을 자동화해 반복 작업과 실수를 줄입니다.</p></article>
          <article><span>03</span><h3>제품과 플랫폼 확장</h3><p>웹 어드민, 에디터, 하이브리드 앱, 삼성 Tizen TV 등 플랫폼 특성에 맞는 UI를 구현합니다.</p></article>
          <article><span>04</span><h3>접근성과 협업</h3><p>웹 표준과 접근성을 고려하고, 기획·디자인·개발 간 요구사항과 구현 방향을 조율합니다.</p></article>
        </div>
      </section>

      <section className={styles.skillsSection} id="skills">
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>TOOLKIT</p>
            <h2>기술 스택</h2>
          </div>
          <div className={styles.skillGroups}>
            <div><h3>Frontend</h3><p>React · Next.js · Vue 3 · Nuxt.js · TypeScript · JavaScript · HTML · CSS/SCSS</p></div>
            <div><h3>Architecture & State</h3><p>FSD · Micro Frontends · Module Federation · Turborepo · Pinia · Zustand · TanStack Query</p></div>
            <div><h3>Quality & Delivery</h3><p>ESLint · Steiger · GitHub Actions · CI/CD · Docker · Static Export · Sentry</p></div>
            <div><h3>Platform & Other</h3><p>Tizen · Flutter · React Native · REST API · Web Accessibility · i18n</p></div>
          </div>
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerInner}>
          <p className={styles.eyebrow}>LET&apos;S CONNECT</p>
          <h2>함께 해결할 문제를 찾고 있습니다.</h2>
          <p>프론트엔드 구조 설계, 사용자 경험 개선, 개발 환경 자동화에 관심이 있습니다.</p>
          <a className={styles.primaryButton} href="mailto:joohoon.roh@gmail.com">joohoon.roh@gmail.com <span aria-hidden="true">↗</span></a>
          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} JooHoon Roh</span>
            <div><Link href="https://github.com/RohJooHoon" target="_blank" rel="noopener noreferrer">GitHub</Link><Link href="https://hand-easy-master.tistory.com/" target="_blank" rel="noopener noreferrer">Blog</Link></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
