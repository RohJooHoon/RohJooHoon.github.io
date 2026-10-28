import Link from "next/link";
import { Banner } from "./page.component";
import { projects } from "@/content/projects";
import { personalProjects } from "@/content/personal-projects";
import styles from "./page.module.css";

const projectsByStartDate = [...projects].sort((a, b) =>
  b.period.slice(0, 7).localeCompare(a.period.slice(0, 7)),
);

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Banner />
      <section id="about" className={styles.section}>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.sectionDescription}>
            <p>안녕하세요. 프론트엔드 개발자 노주훈입니다.</p>
            <p>쇼핑몰 솔루션의 초기 개발부터 통합 어드민, 삼성 스마트 TV 앱 출시까지 프론트엔드 설계와 개발을 맡아왔습니다. 최근에는 Next.js 기반 어드민을 리뉴얼하며 도메인 구조, 공용 패키지, 개발·배포 자동화를 구성했습니다.</p>
            <p>HTML·CSS와 웹 접근성에 대한 이해를 바탕으로 반응형 UI의 완성도까지 챙깁니다.</p>
          </div>
        </div>
      </section>
      <section id="projects" className={styles.section}>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Work</h2>
          <div className={styles.workList}>
            {projectsByStartDate.map(project => <article key={project.slug} className={styles.workItem}>
              <div><p className={styles.workMeta}><span>{project.type.split(" · ")[1]}</span><span>{project.period}</span></p><h3><Link href={`/projects/${project.slug}/`}>{project.title}</Link></h3><p>{project.summary}</p></div>
            </article>)}
          </div>
        </div>
      </section>
      <section id="experience" className={styles.section}>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <dl className={styles.careerList}>
            <div><dt>딥메디 <span>2026.01 — 현재</span></dt><dd>프론트엔드 구조 설계·구현 · 공용 패키지와 개발 자동화 환경 구축</dd></div>
            <div><dt>하이 (Haii) <span>2024.10 — 2026.01</span></dt><dd>통합 어드민과 MFE · 삼성 TV 앱 · 채팅형 설문 웹</dd></div>
            <div className={styles.learningEntry}><dt>IoT 스마트팜 개발자 과정 <span>2024.05 — 2024.11</span></dt><dd><span className={styles.entryType}>교육 이수 · 팀 프로젝트</span>모듈형 자동 재배기 설계, React Native 컨트롤러 앱 제작 및 아두이노 통신 구현</dd></div>
            <div><dt>키위스냅 <span>2020.11 — 2024.03</span></dt><dd>프론트엔드 개발 팀장 · 쇼핑몰 에디터와 React 기반 KDDM 직거래 솔루션 설계·개발 및 팀 리딩</dd></div>
            <div><dt>에이치나인 <span>2017.04 — 2020.01</span></dt><dd>웹 접근성 · 다국어 · 하이브리드 앱 · 반응형 UI</dd></div>
          </dl>
        </div>
      </section>
      <section id="personal-projects" className={styles.section}>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>개인 프로젝트</h2>
          <div className={styles.workList}>
            {personalProjects.map(project => <article key={project.name} className={styles.workItem}>
              <p className={styles.workMeta}><span>{project.status}</span><span>{project.technology}</span></p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className={styles.projectMetrics}>{project.metrics} <span>({project.metricsAsOf})</span></p>
              <div className={styles.projectLinks}>
                <a href={project.url} target="_blank" rel="noopener noreferrer">앱 다운로드</a>
                <a href={project.instagram} target="_blank" rel="noopener noreferrer">인스타그램</a>
              </div>
            </article>)}
          </div>
        </div>
      </section>
      <footer id="contact" className={styles.contact}>
        <h2>Contact</h2><a href="mailto:joohoon.roh@gmail.com">joohoon.roh@gmail.com</a>
        <div><Link href="https://github.com/RohJooHoon" target="_blank" rel="noopener noreferrer">GitHub</Link></div>
        <p>© {new Date().getFullYear()} JooHoon Roh</p>
      </footer>
    </main>
  );
}
