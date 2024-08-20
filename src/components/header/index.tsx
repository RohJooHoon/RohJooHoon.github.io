"use client";

import { useEffect } from "react";
import { useCommonStore } from "@/store/Common";
import classNames from "classnames";
import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const path = usePathname();
  const { isOpenMenu, isOpenMenuEnd, toggleMenu } = useCommonStore();

  return (
    <div className={classNames(styles.header, { [styles.is_open]: isOpenMenu, [styles.is_openEnd]: isOpenMenuEnd })}>
      <div className={styles.headerWrap}>
        <button className={styles.headerMenuButton} key="menu-button" onClick={toggleMenu}>
          menu
        </button>

        <div className={styles.headerNavWrap}>
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
