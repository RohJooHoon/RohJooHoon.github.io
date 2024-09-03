"use client";

import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";

export default function () {
  return (
    <>
      <main className={`${commonStyles.main} ${commonStyles.is_headerSpace}`}>
        <div className={commonStyles.sectionContainer}>
          {/* Skill */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Skill</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>React.js</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>React Native</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>typescript</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>Vue.js</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>AWS</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>GIT</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>node.js</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>웹표준</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>접근성</strong>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>SEO</strong>
              </div>
            </div>
          </section>

          {/* Work Experiences */}
          <section className={`${commonStyles.section} ${commonStyles.is_flex}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Work Experiences</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>키위스냅</strong>
                <p className={commonStyles.sectionContentDescription}>대리 / Front-End Development</p>
                <p className={commonStyles.sectionContentInfo}>2020.11 - 2024.03</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>더클로젯컴퍼니</strong>
                <p className={commonStyles.sectionContentDescription}>주임 / Front-End Development</p>
                <p className={commonStyles.sectionContentInfo}>2020.04 - 2020.11</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>에이치나인</strong>
                <p className={commonStyles.sectionContentDescription}>주임 / DEV</p>
                <p className={commonStyles.sectionContentInfo}>2017.04 - 2020.01</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
