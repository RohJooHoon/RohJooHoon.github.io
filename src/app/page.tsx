"use client";

import React, { useRef, useState, useEffect } from "react";
import commonStyles from "@/app/common.module.css";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { Banner } from "./page.component";

export default function Page() {
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [loadCheck, setLoadCheck] = useState(false);
  const [mainTop, setMainTop] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const sectionWrapRef1 = useRef<HTMLDivElement>(null);
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocumentLoaded(true);
  }, []);

  const handleShowMoreClick = () => {
    if (sectionRef1.current) {
      sectionRef1.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleScroll = (e: Event) => {
    const mainScrollTop = mainRef.current?.scrollTop || 0;
    setMainTop(mainScrollTop);
  };

  const animateStyle = (target: React.RefObject<HTMLDivElement>, value: { [key: number]: number }, type?: "min" | "top" | "bottom" | "max") => {
    let result = 1;

    if (loadCheck && target.current) {
      const mainHeight = mainRef.current?.clientHeight || 0;
      const mainBottom = mainTop + mainHeight || 0;
      const targetTop = mainTop + target.current?.getBoundingClientRect().top;
      const targetHeight = target.current?.clientHeight || 0;
      const targetBottom = targetTop + targetHeight;

      if (type === "min") {
        // bottomTop
        if (targetHeight > mainHeight) {
          result = (mainBottom - (targetTop + mainHeight)) / (targetHeight - mainHeight);
        } else {
          result = (mainBottom - targetBottom) / (mainHeight - targetHeight);
        }
      } else if (type === "top") {
        // topTop
        result = (mainBottom - targetTop) / mainHeight;
      } else if (type === "bottom") {
        // bottomBottom
        result = (mainBottom - targetBottom) / mainHeight;
      } else {
        // topBottom
        result = (mainBottom - targetTop) / (mainHeight + targetHeight);
      }

      if (result > 1) {
        result = 1;
      } else if (result < 0) {
        result = 0;
      }

      // Calculate the value based on the result
      const keys = Object.keys(value)
        .map(Number)
        .sort((a, b) => a - b);
      let calculatedValue = value[keys[0]];

      for (let i = 0; i < keys.length - 1; i++) {
        const startKey = keys[i];
        const endKey = keys[i + 1];
        if (result * 100 >= startKey && result * 100 <= endKey) {
          const startValue = value[startKey];
          const endValue = value[endKey];
          const range = endKey - startKey;
          const progress = (result * 100 - startKey) / range;
          calculatedValue = startValue + (endValue - startValue) * progress;
          break;
        }
      }

      return calculatedValue;
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
                transform: `translate(${animateStyle(sectionRef1, { 0: -30, 100: 30 }, "max")}%, ${animateStyle(sectionRef1, { 0: 25, 100: -25 }, "max")}%) scale(${animateStyle(sectionRef1, { 0: 1, 100: 1.5 }, "max")})`,
                opacity: animateStyle(sectionRef1, { 0: 1, 100: 0 }, "bottom"),
              }}
            />
          </div>
          <div className={styles.sectionBox}>
            <h2 className={styles.sectionTitle}>Hello</h2>
            <p className={styles.sectionDescription}>
              안녕하세요 노주훈의 포트폴리오 사이트에 오신 것을 환영합니다.<br />
              이 사이트는 저의 프론트엔드 개발자로서의 기술과 프로젝트를 소개하는 공간입니다.<br />
              <br />
              기술 스택은 next 14버전 TypeScript 로 제작되었으며,<br />
              GitHub Action 를 통해 CI/CD 배포 자동화 구축이 되어있습니다.<br />
              Contact 페이지의 입력폼은 AWS EC2 Ubuntu 웹서버를 세팅되어있으며<br />
              node.js 로 제작한 api를 호출하여 메일 전송 기능이 구현되어있습니다. <br />
              <br />
              이미지 리소스는 직접 찍은 사진과 미드저니로 직접 생성한 리소스를 사용하였습니다.<br />
              그 외 부분은 아직 미완성 상태로, 제작중 입니다.<br />
            </p>
          </div>
        </section>

        {/* 2 */}
        <section className={styles.section} ref={sectionRef2} style={{ zIndex: "0" }}>
          <div className={styles.sectionBg} style={{ backgroundColor: "#64666a" }}>
            {documentLoaded && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
                <Image className={styles.sectionBgImage} src={"/images/bg_2.jpg"} alt={""} objectFit="cover" layout="fill" />
              </div>
            )}
          </div>
          <div className={styles.sectionBox}>
            <h2 className={styles.sectionTitle}>업무</h2>
            <p className={styles.sectionDescription}>작업중 작업중 작업중</p>
          </div>
        </section>

        <div
          className={styles.sectionWrap}
          ref={sectionWrapRef1}
          style={{
            height: "calc(100% + 1500px)",
            backgroundColor: `rgb(${animateStyle(sectionWrapRef1, { 0: 255, 100: 251 }, "min")}, ${animateStyle(sectionWrapRef1, { 0: 255, 100: 91 }, "min")}, ${animateStyle(sectionWrapRef1, { 0: 255, 100: 96 }, "min")})`,
          }}
        ></div>

        {/* 3 */}
        <section className={styles.section} ref={sectionRef3}>
          <div className={styles.sectionBg} style={{ backgroundColor: "#1b1b1c" }}>
            <Image className={styles.sectionBgImage} src={"/images/bg_0.jpg"} alt={""} objectFit="contain" width={0} height={0} />
          </div>
          <div className={styles.sectionBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.sectionDescription}>아래 폼으로 연락주세요</p>
          </div>
        </section>

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

        <div className={commonStyles.sectionContainer}>
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
