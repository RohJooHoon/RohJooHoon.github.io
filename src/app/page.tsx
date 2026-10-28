import Image from "next/image";
import Link from "next/link";
import { Banner } from "./page.component";
import { projects } from "@/content/projects";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Banner />
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div className={styles.sectionBg}><Image src="/images/bg_1.jpg" alt="" fill sizes="100vw" className={styles.sectionPhoto} /></div>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.sectionDescription}>안녕하세요. 프론트엔드 개발자 노주훈입니다.<br />Vue와 React로 웹 어드민, 에디터, TV 앱을 만들어 왔습니다.<br />화면을 구현하는 일부터 데이터 흐름을 정리하고<br />반복되는 개발 과정을 자동화하는 일까지 함께합니다.</p>
        </div>
      </section>
      <section id="projects" className={`${styles.section} ${styles.work}`}>
        <div className={styles.sectionBg}><Image src="/images/bg_2.jpg" alt="" fill sizes="100vw" className={styles.sectionPhoto} /></div>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Work</h2>
          <div className={styles.workList}>
            {projects.map(project => <article key={project.slug} className={styles.workItem}>
              <div><p className={styles.workMeta}>{project.type} · {project.period}</p><h3><Link href={`/projects/${project.slug}/`}>{project.title}<span aria-hidden="true"> ↗</span></Link></h3><p>{project.summary}</p><p className={styles.workTags}>{project.tags.join(" · ")}</p></div>
            </article>)}
          </div>
        </div>
      </section>
      <section id="experience" className={`${styles.section} ${styles.career}`}>
        <div className={styles.sectionBg}><Image src="/images/bg_4.jpg" alt="" fill sizes="100vw" className={styles.sectionPhoto} /></div>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <dl className={styles.careerList}>
            <div><dt>딥메디 <span>2026.01 — 현재</span></dt><dd>웹 어드민 2.0 리뉴얼 · 프론트 앱 개발 중간 관리</dd></div>
            <div><dt>하이 (Haii) <span>2024.10 — 2026.01</span></dt><dd>통합 어드민과 MFE · 삼성 TV 앱 · 채팅형 설문 웹</dd></div>
            <div><dt>키위스냅 <span>2020.11 — 2024.03</span></dt><dd>프론트엔드 개발 팀장 · 쇼핑몰 에디터와 직거래 솔루션</dd></div>
            <div><dt>에이치나인 <span>2017.04 — 2020.01</span></dt><dd>웹 접근성 · 다국어 · 하이브리드 앱 · 웹 퍼블리싱</dd></div>
          </dl>
        </div>
      </section>
      <section id="publishing" className={`${styles.section} ${styles.publishing}`}>
        <div className={styles.sectionBg}><Image src="/images/bg_5.jpg" alt="" fill sizes="100vw" className={styles.sectionPhoto} /></div>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Publishing</h2>
          <p className={styles.sectionDescription}>HTML과 CSS로 화면의 기본을 다져 왔습니다.<br />삼성 SDS 웹 접근성 마크 취득·갱신 작업에 참여했고,<br />WENZI 약 250페이지 웹앱과 반응형 브랜드 페이지를 제작했습니다.<br />기획·디자인·개발 사이에서 구현 방향을 함께 맞춰갑니다.</p>
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
