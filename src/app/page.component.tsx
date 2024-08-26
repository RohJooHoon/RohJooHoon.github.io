import React, { useRef, useState, useEffect } from "react";
import pageStyles from "./page.module.css";
import Image from "next/legacy/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function Banner({ onShowMoreClick }: { onShowMoreClick: () => void }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [nowPage, setNowPage] = useState(2);
  const [moveDiff, setMoveDiff] = useState(-nowPage * 100);
  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (isDragging) {
      const diffX = clientX - startX;
      setMoveDiff(-nowPage * 100 + (diffX / windowWidth) * 100);
    }
  };

  const handleEnd = (clientX: number) => {
    setIsDragging(false);
    if (sliderRef.current) {
      const diffX = clientX - startX;
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

      if (getNowPage < 2) {
        setTimeout(() => {
          const lastPage = bannerItems.length - 3 + (getNowPage - 1);
          setIsResetting(true);
          setNowPage(lastPage);
          setMoveDiff(-lastPage * 100);
          setTimeout(() => {
            setIsResetting(false);
          }, 10);
        }, 300);
      } else if (getNowPage > bannerItems.length - 3) {
        setTimeout(() => {
          const startPage = 2 + (getNowPage - 1) - (bannerItems.length - 3);
          setIsResetting(true);
          setNowPage(2);
          setMoveDiff(-2 * 100);
          setTimeout(() => {
            setIsResetting(false);
          }, 10);
        }, 300);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    handleEnd(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      handleEnd(e.changedTouches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const bannerItems = [
    { src: "/images/banner_1.jpg", alt: "Banner Image 1" },
    { src: "/images/banner_2.jpg", alt: "Banner Image 2" },
    { src: "/images/banner_3.jpg", alt: "Banner Image 3" },
  ];

  // 앞 뒤에 더미 생성
  bannerItems.unshift(bannerItems[bannerItems.length - 2], bannerItems[bannerItems.length - 1]);
  bannerItems.push(bannerItems[2], bannerItems[3]);

  return (
    <div className={pageStyles.banner} ref={sliderRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
      <div className={pageStyles.bannerText}>
        <strong className={pageStyles.bannerTextTitle}>
          Hello
          <br />
          I'm JooHoon
        </strong>
      </div>

      <ul className={pageStyles.bannerSlider}>
        {bannerItems.map((item, index) => (
          <li
            key={index}
            className={pageStyles.bannerSliderItem}
            style={{
              transform: `translateX(${moveDiff}%)`,
              transition: isDragging || isResetting ? "none" : "transform 0.3s",
            }}
          >
            <Image src={item.src} alt={item.alt} layout="fill" objectFit="cover" />
          </li>
        ))}
      </ul>

      <button className={pageStyles.bannerShowMore} onClick={onShowMoreClick}>
        <div className={pageStyles.bannerShowMoreText}>SHOW MORE</div>
        <KeyboardArrowDownIcon style={{ width: 24, height: 24, color: "rgba(var(--white-rgb), 0.7)" }} />
      </button>
    </div>
  );
}
