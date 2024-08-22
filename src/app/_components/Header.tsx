import Image from "next/image";
import styles from "./Header.module.css";

export default async function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Image src="/img/mozaic.svg" width={47} height={47} alt="mozaic.fm" />
        mozaic.fm
      </h1>
    </header>
  );
}
