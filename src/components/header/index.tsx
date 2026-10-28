"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";

const links = [
  { href: "/#projects", label: "프로젝트" },
  { href: "/#experience", label: "경력" },
  { href: "/#approach", label: "강점" },
  { href: "/#skills", label: "기술" },
  { href: "/#contact", label: "연락처" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">본문 바로가기</a>
      <div className={styles.headerWrap}>
        <Link className={styles.headerLogo} href="/#home" onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark} aria-hidden="true">R</span>
          <span>JOOHOON ROH</span>
        </Link>
        <button
          className={styles.menuButton}
          ref={menuButtonRef}
          type="button"
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="주요 메뉴"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
