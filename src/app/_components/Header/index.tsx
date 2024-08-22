import Image from "next/image";
import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Image src="/img/mozaic.svg" width={47} height={47} alt="mozaic.fm" />
        mozaic.fm
      </h1>
    </header>
  );
}
