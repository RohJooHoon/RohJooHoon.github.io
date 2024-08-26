"use client";

import { useRef } from "react";
import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";
import Header from "@/components/header";
import { Banner } from "./page.component";

export default function () {
  const firstSectionRef = useRef<HTMLDivElement>(null);

  const handleShowMoreClick = () => {
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main className={pageStyles.main}>
        <Banner onShowMoreClick={handleShowMoreClick} />
        <div className={commonStyles.sectionContainer} ref={firstSectionRef}>
          {/* About Me */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>About Me</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
            </div>
          </section>

          {/* Work Experiences */}
          <section className={`${commonStyles.section} ${commonStyles.is_triple}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Work Experiences</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>대리 / Front-End Development</h3>
                <p className={commonStyles.sectionContentDescription}>
                  키위스냅
                  <br />
                  2020.11 - 2024.03
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>주임 / Front-End Development</h3>
                <p className={commonStyles.sectionContentDescription}>
                  더클로젯컴퍼니
                  <br />
                  2020.04 - 2020.11
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>주임 / DEV</h3>
                <p className={commonStyles.sectionContentDescription}>
                  에이치나인
                  <br />
                  2017.04 - 2020.01
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className={`${commonStyles.section} ${commonStyles.is_dual}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Education</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>고려사이버대학교</h3>
                <p className={commonStyles.sectionContentDescription}>
                  디자인공학과
                  <br />
                  2020.11 - 2024.03
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>계원예술대학교</h3>
                <p className={commonStyles.sectionContentDescription}>
                  디지털미디어디자인과
                  <br />
                  2020.04 - 2020.11
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
