"use client";

import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";

export default function WorkPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className={`${commonStyles.main} ${commonStyles.is_headerSpace}`}>
        <div className={commonStyles.sectionContainer}>
          {/* Skill */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h1 className={commonStyles.sectionTitle}>Skill</h1>
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
        </div>
      </main>
    </>
  );
}
