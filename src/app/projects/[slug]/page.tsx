import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { caseStudies } from '@/content/case-studies';
import styles from './page.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find(({ slug }) => slug === params.slug);
  return { title: `${project?.title ?? '프로젝트'} | 노주훈`, description: project?.summary };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(({ slug }) => slug === params.slug);
  const study = caseStudies[params.slug];
  if (!project || !study) notFound();
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.container}>
        <Link className={styles.back} href="/#projects">대표 프로젝트로</Link>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{project.type}</p>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <dl className={styles.facts}>
            <div><dt>기간</dt><dd>{project.period}</dd></div>
            <div><dt>역할</dt><dd>{study.role}</dd></div>
          </dl>
          <ul className={styles.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </header>
        <section className={styles.section}><p className={styles.eyebrow}>CONTEXT</p><h2>배경과 과제</h2><p>{study.context}</p></section>
        <section className={styles.section}>
          <p className={styles.eyebrow}>STRUCTURE</p><h2>구조 개요</h2>
          <ol className={styles.flow}>{study.flow.map(item => <li key={item}>{item}</li>)}</ol>
          <p className={styles.caption}>공개 가능한 경력 설명을 바탕으로 정리한 개념 구조입니다. 내부 구현 전체를 나타내지는 않습니다.</p>
        </section>
        <section className={styles.section}>
          <p className={styles.eyebrow}>IMPLEMENTATION</p><h2>설계와 구현</h2>
          <div className={styles.decisions}>{study.decisions.map((decision, index) => <article key={decision.title}><span className={styles.number}>0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div></article>)}</div>
        </section>
        <section className={styles.section}><p className={styles.eyebrow}>OUTCOME</p><h2>결과와 확인 범위</h2><p>{study.result}</p><aside className={styles.note}><h3>측정 및 공개 범위</h3><p>{study.limitation}</p><p>회사 소스와 내부 데이터는 공개하지 않습니다. 성과와 경력은 제공된 이력서 및 본인 확인 내용을 바탕으로 정리했습니다.</p></aside></section>
        <footer className={styles.footer}><Link href="/#projects">다른 프로젝트 보기</Link><a href="mailto:joohoon.roh@gmail.com">이메일 연락</a></footer>
      </div>
    </main>
  );
}
