import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { personalProjects } from '@/content/personal-projects';
import { caseStudies } from '@/content/case-studies';
import styles from './page.module.css';

const detailProjects = [
  ...projects.map(project => ({
    ...project,
    factLabel: '기간',
    factValue: project.period,
    backHref: '/#projects',
    backLabel: '대표 프로젝트로',
    metrics: undefined as string | undefined,
    links: [] as { label: string; href: string }[],
  })),
  ...personalProjects.map(project => ({
    slug: project.slug,
    title: project.name,
    type: `PERSONAL APP · ${project.technology}`,
    summary: project.description,
    tags: project.tags,
    factLabel: '상태',
    factValue: project.status,
    backHref: '/#personal-projects',
    backLabel: '개인 프로젝트로',
    metrics: `${project.metrics} (${project.metricsAsOf})`,
    links: [
      { label: '앱 다운로드', href: project.url },
      { label: '인스타그램', href: project.instagram },
    ],
  })),
];

export const dynamicParams = false;
export function generateStaticParams() {
  return detailProjects.map(({ slug }) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = detailProjects.find(({ slug }) => slug === params.slug);
  return { title: `${project?.title ?? '프로젝트'} | 노주훈`, description: project?.summary };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = detailProjects.find(({ slug }) => slug === params.slug);
  const study = caseStudies[params.slug];
  if (!project || !study) notFound();
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.container}>
        <Link className={styles.back} href={project.backHref}>{project.backLabel}</Link>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{project.type}</p>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <dl className={styles.facts}>
            <div><dt>{project.factLabel}</dt><dd>{project.factValue}</dd></div>
            <div><dt>역할</dt><dd>{study.role}</dd></div>
          </dl>
          <ul className={styles.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          {project.links.length > 0 && <nav className={styles.links} aria-label="앱 관련 링크">
            {project.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
          </nav>}
        </header>
        {project.metrics && <section className={styles.section} aria-labelledby="operation-title">
          <p className={styles.eyebrow}>OPERATION</p><h2 id="operation-title">출시 이후 운영</h2>
          <p>{project.metrics}</p>
        </section>}
        <section className={styles.section}><p className={styles.eyebrow}>CONTEXT</p><h2>배경과 과제</h2><p>{study.context}</p></section>
        <section className={styles.section}>
          <p className={styles.eyebrow}>COMPONENTS</p><h2>구현 구성</h2>
          <ol className={styles.flow}>{study.flow.map(item => <li key={item}>{item}</li>)}</ol>
        </section>
        <section className={styles.section}>
          <p className={styles.eyebrow}>IMPLEMENTATION</p><h2>설계와 구현</h2>
          <div className={styles.decisions}>{study.decisions.map((decision, index) => <article key={decision.title}><span className={styles.number}>0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div></article>)}</div>
        </section>
        <section className={styles.section}>
          <p className={styles.eyebrow}>OUTCOME</p><h2>성과</h2>
          <ul className={styles.results}>{study.results.map(result => <li key={result}>{result}</li>)}</ul>
        </section>
        <footer className={styles.footer}><Link href={project.backHref}>{project.backLabel}</Link><a href="mailto:joohoon.roh@gmail.com">이메일 연락</a></footer>
      </div>
    </main>
  );
}

