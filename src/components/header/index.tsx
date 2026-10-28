"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";

const links = [
  { href: "#projects", label: "프로젝트" },
  { href: "#experience", label: "경력" },
  { href: "#approach", label: "강점" },
  { href: "#skills", label: "기술" },
  { href: "#contact", label: "연락처" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <Link className={styles.headerLogo} href="#home" onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark} aria-hidden="true">R</span>
          <span>JOOHOON ROH</span>
        </Link>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? styles.navOpen : styles.nav} aria-label="주요 메뉴">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
