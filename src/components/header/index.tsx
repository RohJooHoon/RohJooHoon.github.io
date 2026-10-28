"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">본문 바로가기</a>
      <div className={styles.headerWrap}>
        <Link className={styles.headerLogo} href="/#home" onClick={() => setMenuOpen(false)}>
          <Image src="/images/logo.svg" alt="" width={28} height={28} />
          <span>PORTFOLIO</span>
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
