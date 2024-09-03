"use client";

import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";

export default function () {
  return (
    <>
      <main className={`${commonStyles.main} ${commonStyles.is_headerSpace}`}>
        <div className={commonStyles.sectionContainer}>
          {/* About Me */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>About Me</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <p className={commonStyles.sectionContentDescription}>안녕하세요 노주훈의 포트폴리오 사이트에 오신 것을 환영합니다. 이 사이트는 저의 프론트엔드 개발자로서의 기술과 프로젝트를 소개하는 공간입니다.</p>
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

          {/* Education */}
          <section className={`${commonStyles.section} ${commonStyles.is_flex}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Education</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>고려사이버대학교</strong>
                <p className={commonStyles.sectionContentDescription}>디자인공학과</p>
                <p className={commonStyles.sectionContentInfo}>2017.3 - 2019.8</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>계원예술대학교</strong>
                <p className={commonStyles.sectionContentDescription}>디지털미디어디자인과</p>
                <p className={commonStyles.sectionContentInfo}>2012.3 - 2016.2</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
