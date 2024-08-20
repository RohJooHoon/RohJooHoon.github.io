import styles from "./page.module.css";
import Header from "@/components/header";
import Image from "next/legacy/image";

export default function () {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.banner}>
          <Image
            src="/images/banner_1.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.banner}>
          <Image
            src="/images/banner_1.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </main>
    </>
  );
}
