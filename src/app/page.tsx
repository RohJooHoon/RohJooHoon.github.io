import styles from "./page.module.css";
import Navigation from "@/components/navigation";

export default function () {
  return (
    <main className={styles.main}>
      <Navigation />
      <h1>Home</h1>
    </main>
  );
}