"use client";

import { useCommonStore } from "@/store/Common";
import classNames from "classnames";
import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/legacy/image";

// import material icons
import DehazeIcon from "@mui/icons-material/Dehaze";

export default function () {
  const path = usePathname();
  const { isOpenMenu, isOpenMenuEnd, toggleMenu } = useCommonStore();

  const handleNavWrapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      toggleMenu();
    }
  };

  return (
    <div className={classNames(styles.header, { [styles.is_open]: isOpenMenu, [styles.is_openEnd]: isOpenMenuEnd })}>
      <div className={styles.headerWrap}>
        <Link className={styles.headerLogo} href="/">
          <Image src="/images/logo.png" alt="Logo" width={22} height={22} />
          PORTFOLIO
        </Link>

        <button className={styles.headerMenuButton} key="menu-button" onClick={toggleMenu}>
          <DehazeIcon style={{ fontSize: 24, color: "var(--white)" }} />
        </button>

        <div className={styles.headerNavWrap} onClick={handleNavWrapClick}>
          <nav className={styles.headerNav}>
            <Link className={classNames(styles.headerNavItem, { [styles.is_active]: path === "/" })} href="/">
              Home
            </Link>
            <Link className={classNames(styles.headerNavItem, { [styles.is_active]: path === "/work" })} href="/work">
              Work
            </Link>
            <Link className={classNames(styles.headerNavItem, { [styles.is_active]: path === "/blog" })} href="/blog">
              Blog
            </Link>
            <Link className={classNames(styles.headerNavItem, { [styles.is_active]: path === "/contact" })} href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
