"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import Header from "@/components/header";
import { Banner } from "./page.component"

export default function () {
  const testRef = useRef<HTMLDivElement>(null);

  const handleShowMoreClick = () => {
    if (testRef.current) {
      testRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Banner onShowMoreClick={handleShowMoreClick} />
        <div ref={testRef} className={styles.test}>test</div>
      </main>
    </>
  );
}