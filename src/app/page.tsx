"use client";

import React, { useRef, useState, useEffect } from "react";
import commonStyles from "@/app/common.module.css";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { Banner } from "./page.component";

export default function Page() {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [loadCheck, setLoadCheck] = useState(false);
  const [mainTop, setMainTop] = useState(0);
  const sectionRef1 = useRef<HTMLDivElement>(null);

  const handleShowMoreClick = () => {
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: Event) => {
    const mainScrollTop = mainRef.current?.scrollTop || 0;
    setMainTop(mainScrollTop);
  };

  const animateStyle = (data: { target: React.RefObject<HTMLDivElement>; startEnd?: string; percent?: number; gap?: number; test?: string }) => {
    let result = 1;

    if (loadCheck && data.target.current) {
      const mainHeight = mainRef.current?.clientHeight || 0;
      const mainBottom = mainTop + mainHeight || 0;

      const targetTop = mainTop + data.target.current?.getBoundingClientRect().top;
      const targetHeight = data.target.current?.clientHeight || 0;
      const targetBottom = targetTop + targetHeight;

      if (data.startEnd === "bottomTop") {
        // bottomTop
        result = 1 - (targetTop - mainTop) / (mainHeight - targetHeight);
      } else if (data.startEnd === "topTop") {
        // topTop
        result = 1 - (targetTop - mainTop) / mainHeight;
      } else if (data.startEnd === "bottomBottom") {
        // bottomBottom
        result = (mainBottom - targetBottom) / targetTop;
      } else {
        // topBottom
        result = 1 - (targetBottom - mainTop) / targetBottom;
      }

      if (result > 1) {
        result = 1;
      } else if (result < 0) {
        result = 0;
      }

      if (data.percent) {
        result = result * data.percent;
      }

      if (data.gap) {
        result = result + data.gap;
      }
    }

    return result;
  };

  useEffect(() => {
    setLoadCheck(true);
  }, ["mainRef"]);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <main className={commonStyles.main} ref={mainRef}>
        <Banner onShowMoreClick={handleShowMoreClick} />

        {/* 1 */}
        <section className={styles.section} ref={sectionRef1}>
          <div className={styles.sectionBg} style={{ backgroundColor: "#cbcaca" }}>
            <Image
              className={styles.sectionBgImage}
              src={"/images/bg_1.jpg"}
              alt={""}
              objectFit="contain"
              width={0}
              height={0}
              style={{
                transform: `translate(${animateStyle({ target: sectionRef1, percent: 40, gap: -17 })}%, ${animateStyle({ target: sectionRef1, percent: -25 })}%) scale(${animateStyle({ target: sectionRef1, percent: 0.5, gap: 1 })})`,
                opacity: animateStyle({ target: sectionRef1, startEnd: "bottomBottom", percent: -1, gap: 1 }),
              }}
            />
          </div>
          <div className={styles.sectionBox}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.sectionDescription}>
              안녕하세요 노주훈의 포트폴리오 사이트에 오신 것을 환영합니다.
              <br />이 사이트는 저의 프론트엔드 개발자로서의 기술과 프로젝트를 소개하는 공간입니다.
            </p>
          </div>
        </section>

        {/* 2 */}
        {/* <section className={styles.section}>
          <div className={styles.sectionBgLayer} style={{ backgroundColor: "#64666a" }}>
            <Image src={"/images/bg_2.jpg"} alt={""} className={styles.sectionBg} width={0} height={0} />
          </div>
          <div className={styles.sectionContentLayer}></div>
        </section> */}

        {/* 3 */}
        {/* <section className={styles.section}>
          <div className={styles.sectionBgLayer} style={{ backgroundColor: "#cbcaca" }}>
            <Image src={"/images/bg_3.jpg"} alt={""} className={styles.sectionBg} width={0} height={0} />
          </div>
          <div className={styles.sectionContentLayer}></div>
        </section> */}

        {/* 4 */}
        {/* <section className={styles.section}>
          <div className={styles.sectionBgLayer} style={{ backgroundColor: "#d9d6c8" }}>
            <Image src={"/images/bg_4.jpg"} alt={""} className={styles.sectionBg} width={0} height={0} />
          </div>
          <div className={styles.sectionContentLayer}></div>
        </section> */}

        {/* 5 */}
        {/* <section className={styles.section}>
          <div className={styles.sectionBgLayer} style={{ backgroundColor: "#939e9c" }}>
            <Image src={"/images/bg_5.jpg"} alt={""} className={styles.sectionBg} width={0} height={0} />
          </div>
          <div className={styles.sectionContentLayer}></div>
        </section> */}

        {/* 0 */}
        {/* <section className={styles.section}>
          <div className={styles.sectionBgLayer} style={{ backgroundColor: "#1b1b1c" }}>
            <Image src={"/images/bg_0.jpg"} alt={""} fill objectFit="contain" width={0} height={0} />
          </div>
          <div className={styles.sectionContentLayer}></div>
        </section> */}

        <div className={commonStyles.sectionContainer} ref={firstSectionRef}>
          {/* About Me */}
          <section className={commonStyles.section}></section>

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
        </div>
      </main>
    </>
  );
}
