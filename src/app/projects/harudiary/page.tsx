import type { Metadata } from 'next';
import Link from 'next/link';
import { personalProjects } from '@/content/personal-projects';
import shared from '../[slug]/page.module.css';
import styles from './page.module.css';

const app = personalProjects.find(project => project.slug === 'harudiary')!;
const appStoreUrl = 'https://apps.apple.com/kr/app/id6783727248';
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.harufactory.harudiary';

export const metadata: Metadata = {
  title: '하루일기 — 대화가 일기가 되는 앱 | 노주훈',
  description: '일기 쓰기가 어려운 사람을 위해, AI 하루와 나눈 대화가 일기로 기록되는 앱. App Store와 Google Play에서 만나보세요.',
};

const steps = [
  { title: 'AI 하루와 이야기해요', description: '무엇부터 써야 할지 고민하는 대신, 오늘 있었던 일과 느꼈던 마음을 하루에게 이야기해요.' },
  { title: '대화가 일기로 남아요', description: '하루와 나눈 대화 내용이 일기로 기록돼요. 긴 글을 처음부터 혼자 써야 하는 부담을 덜어줘요.' },
  { title: '나의 하루를 다시 만나요', description: '기록한 날을 달력에서 찾아보고, 한 달 돌아보기 편지로 지난 시간을 되짚어봐요.' },
];

export default function HarudiaryPage() {
  return (
    <main id="main-content" tabIndex={-1} className={shared.main}>
      <div className={shared.container}>
        <Link className={shared.back} href="/#personal-projects">개인 프로젝트로</Link>
        <header className={styles.hero}>
          <p className={shared.eyebrow}>하루일기 · 개인 앱</p>
          <p className={styles.status}>App Store · Google Play 출시 · 운영 중</p>
          <h1>대화가 일기가 되는,<br />하루일기</h1>
          <p className={styles.lead}>일기 쓰기가 어려운 날, AI 하루와 이야기해 보세요.<br />나눈 대화가 나의 하루를 담은 일기로 기록됩니다.</p>
          <nav className={styles.links} aria-label="하루일기 다운로드">
            <a className={styles.primary} href={appStoreUrl} target="_blank" rel="noopener noreferrer">App Store에서 보기</a>
            <a className={styles.secondary} href={playStoreUrl} target="_blank" rel="noopener noreferrer">Google Play에서 보기</a>
          </nav>
        </header>

        <section className={shared.section} aria-labelledby="idea-title">
          <p className={shared.eyebrow}>기획 의도</p>
          <h2 id="idea-title">기록하고 싶지만,<br />무엇부터 써야 할지 막막한 사람에게</h2>
          <p>하루를 남기고 싶어 일기장을 열어도, 첫 문장부터 어려울 때가 있습니다. 하루일기는 혼자 글을 완성하는 대신, 누군가에게 오늘의 이야기를 들려주듯 기록을 시작할 수 있도록 만든 앱입니다.</p>
          <p>AI 캐릭터 ‘하루’와 대화하는 과정이 일기로 이어집니다. 잘 쓴 글보다 나의 하루와 마음이 남는 경험을 중심에 두었습니다.</p>
        </section>

        <section className={shared.section} aria-labelledby="experience-title">
          <p className={shared.eyebrow}>이렇게 사용해요</p>
          <h2 id="experience-title">이야기하고, 기록하고, 돌아보고</h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step.title}>
              <span className={styles.number}>0{index + 1}</span>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>)}
          </ol>
        </section>

        <section className={shared.section} aria-labelledby="features-title">
          <p className={shared.eyebrow}>기록을 돕는 기능</p>
          <h2 id="features-title">나에게 편한 방식으로 남기는 하루</h2>
          <div className={styles.features}>
            <article><h3>말로도 남길 수 있어요</h3><p>타이핑하기 어려운 순간에는 음성 입력으로 오늘의 이야기를 남길 수 있어요.</p></article>
            <article><h3>손글씨 기록도 함께</h3><p>종이에 쓴 일기를 사진으로 가져와 변환하고, 앱 안에서 기록을 이어갈 수 있어요.</p></article>
            <article><h3>기록한 날을 한눈에</h3><p>달력과 검색으로 지난 일기를 찾아보고, 그날의 기분과 이야기를 다시 만나요.</p></article>
            <article><h3>한 달을 돌아보는 편지</h3><p>쌓인 기록을 바탕으로 한 달 돌아보기 편지를 받아 나의 시간을 되짚어볼 수 있어요.</p></article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="release-title">
          <p className={shared.eyebrow}>출시와 운영</p>
          <h2 id="release-title">아이디어를 실제로 사용할 수 있는 앱으로</h2>
          <p>개인 프로젝트로 제작한 하루일기를 App Store와 Google Play에 출시해 운영하고 있습니다. 지금 다운로드해 AI 하루와 나의 첫 일기를 남겨볼 수 있습니다.</p>
          <p className={styles.metrics}>{app.metrics}<br /><span>{app.metricsAsOf}</span></p>
          <nav className={styles.links} aria-label="앱과 운영 채널">
            <a className={styles.primary} href={app.url} target="_blank" rel="noopener noreferrer">하루일기 다운로드</a>
            <a className={styles.textLink} href={app.instagram} target="_blank" rel="noopener noreferrer">인스타그램에서 보기</a>
          </nav>
        </section>
        <footer className={shared.footer}>
          <Link href="/#personal-projects">개인 프로젝트로</Link>
          <a href="mailto:joohoon.roh@gmail.com">이메일 연락</a>
        </footer>
      </div>
    </main>
  );
}
