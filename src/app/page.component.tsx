"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronIcon } from "@/components/chevron-icon";
import styles from "./page.module.css";

const images = ["/images/banner_2.jpg", "/images/banner_1.jpg", "/images/banner_3.jpg"];
const slides = [images[2], ...images, images[0]];
const descriptions = [
  ['웹부터 TV와 모바일 앱까지,', '사용자가 직접 쓰는 화면을 만듭니다.'],
  ['복잡한 데이터 흐름을 정리하고,', '변경하기 쉬운 프론트엔드 구조를 설계합니다.'],
  ['반복되는 개발·검증 과정을 자동화해,', '제품에 집중할 시간을 만듭니다.'],
];

export function Banner() {
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const moving = useRef(false);
  const selected = (index - 1 + images.length) % images.length;

  const move = (direction: number) => {
    if (moving.current) return;
    moving.current = true;
    setAnimated(true);
    setIndex(current => current + direction);
  };
  const finish = () => {
    moving.current = false;
    if (index === 0 || index === slides.length - 1) {
      setAnimated(false);
      setIndex(index === 0 ? images.length : 1);
    }
  };

  return (
    <section id="home" className={styles.banner} aria-label="개발 경험 소개" aria-roledescription="캐러셀"
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
      <div className={styles.bannerSlider}
        onPointerDown={event => {
          if (moving.current || (event.pointerType === "mouse" && event.button !== 0)) return;
          gesture.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          if (!gesture.current) return;
          const x = event.clientX - gesture.current.x;
          const y = event.clientY - gesture.current.y;
          if (Math.abs(x) > Math.abs(y)) setDragOffset(x);
        }}
        onPointerCancel={() => { gesture.current = null; setDragOffset(0); }}
        onPointerUp={event => {
          if (!gesture.current) return;
          const x = event.clientX - gesture.current.x;
          const y = event.clientY - gesture.current.y;
          gesture.current = null;
          setDragOffset(0);
          if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1);
        }}>
        <div className={styles.bannerTrack} onTransitionEnd={finish}
          style={{ transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`, transition: animated && !dragOffset ? "transform 0.45s ease" : "none" }}>
          {slides.map((src, position) => <div key={`${src}-${position}`} className={styles.bannerSliderItem}>
            <Image src={src} alt="" fill sizes="100vw" priority={position === 1} draggable={false} style={{ objectFit: "cover" }} />
          </div>)}
        </div>
      </div>
      <div className={styles.bannerShade} />
      <div className={styles.bannerText}>
        <h1 className={styles.bannerTextTitle}>프론트엔드 개발자<br />노주훈입니다.</h1>
        <div className={styles.bannerDescriptionSlot} aria-live="polite" aria-atomic="true">
          <p key={selected} className={styles.bannerTextDescription}>{descriptions[selected][0]}<br />{descriptions[selected][1]}</p>
        </div>
        <div className={styles.bannerControls} aria-label="소개 슬라이드 선택">
          <button type="button" onClick={() => move(-1)} aria-label="이전 슬라이드">
            <ChevronIcon />
          </button>
          <span role="status" aria-live="polite">{String(selected + 1).padStart(2, "0")} / 03</span>
          <button type="button" onClick={() => move(1)} aria-label="다음 슬라이드">
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
      <a className={styles.bannerShowMore} href="#about"><span className={styles.bannerShowMoreText}>SHOW MORE</span></a>
    </section>
  );
}
