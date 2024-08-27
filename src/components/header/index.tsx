"use client";

import { useCommonStore } from "@/store/Common";
import classNames from "classnames";
import pageStyles from "./index.module.css";
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
    <div className={classNames(pageStyles.header, { [pageStyles.is_open]: isOpenMenu, [pageStyles.is_openEnd]: isOpenMenuEnd })}>
      <div className={pageStyles.headerWrap}>
        <Link href="/">
          <h1 className={pageStyles.headerLogo}>
            <Image src="/images/logo.png" alt="Logo" width={22} height={22} />
            PORTFOLIO
          </h1>
        </Link>

        <button className={pageStyles.headerMenuButton} key="menu-button" onClick={toggleMenu}>
          <DehazeIcon style={{ fontSize: 24, color: "var(--white)" }} />
        </button>

        <div className={pageStyles.headerNavWrap} onClick={handleNavWrapClick}>
          <nav className={pageStyles.headerNav}>
            <Link className={classNames(pageStyles.headerNavItem, { [pageStyles.is_active]: path === "/" })} href="/">
              Home
            </Link>
            <Link className={classNames(pageStyles.headerNavItem, { [pageStyles.is_active]: path === "/work" })} href="/work">
              Work
            </Link>
            <Link className={classNames(pageStyles.headerNavItem, { [pageStyles.is_active]: path === "/blog" })} href="/blog">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
