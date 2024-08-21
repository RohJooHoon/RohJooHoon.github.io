import React, { useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/legacy/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function Banner({ onShowMoreClick }: { onShowMoreClick: () => void }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const sliderRef = useRef<HTMLUListElement>(null);
  const [startX, setStartX] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [moveDiff, setMoveDiff] = useState(-nowPage * 100);
  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const diffX = e.clientX - startX;
      setMoveDiff(-nowPage * 100 + (diffX / windowWidth) * 100);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    if (sliderRef.current) {
      const diffX = e.clientX - startX;
      let getNowPage = nowPage;

      if (Math.abs((diffX / windowWidth) * 100) > 10) {
        if (diffX > 0) {
          getNowPage--;
        } else {
          getNowPage++;
        }

        setNowPage(getNowPage);
        setMoveDiff(-getNowPage * 100);
      } else {
        setMoveDiff(-getNowPage * 100);
      }

      if (getNowPage < 1) {
        setTimeout(() => {
          const lastPage = bannerItems.length - 2;
          setIsResetting(true);
          setNowPage(lastPage);
          setMoveDiff(-lastPage * 100);
          setTimeout(() => {
            setIsResetting(false);
          }, 50);
        }, 300);
      } else if (getNowPage > bannerItems.length - 2) {
        setTimeout(() => {
          setIsResetting(true);
          setNowPage(1);
          setMoveDiff(-1 * 100);
          setTimeout(() => {
            setIsResetting(false);
          }, 50);
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const bannerItems = [
    { src: "/images/banner_1.jpg", alt: "Banner Image 1" },
    { src: "/images/banner_2.jpg", alt: "Banner Image 2" },
    { src: "/images/banner_3.jpg", alt: "Banner Image 3" },
  ];

  // 앞 뒤에 더미 생성
  bannerItems.unshift(bannerItems[bannerItems.length - 1]);
  bannerItems.push(bannerItems[1]);

  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <strong className={styles.bannerTextTitle}>
          Hello
          <br />
          I'm JooHoon
        </strong>
      </div>

      <ul className={styles.bannerSlider} ref={sliderRef} onMouseDown={handleMouseDown}>
        {bannerItems.map((item, index) => (
          <li key={index} className={styles.bannerSliderItem} style={{ transform: `translateX(${moveDiff}%)`, transition: isDragging || isResetting ? "none" : "transform 0.3s" }}>
            <Image src={item.src} alt={item.alt} layout="fill" objectFit="cover" />
          </li>
        ))}
      </ul>

      <button className={styles.bannerShowMore} onClick={onShowMoreClick}>
        <div className={styles.bannerShowMoreText}>SHOW MORE</div>
        <KeyboardArrowDownIcon style={{ width: 24, height: 24, color: "rgba(var(--white-rgb), 0.7)" }} />
      </button>
    </div>
  );
}
