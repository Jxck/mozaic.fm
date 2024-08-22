import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.header}>
      <p>
        <small>
          Copyright © 2016 <a href="/">mozaic.fm</a>. All Rights Reserved.
          Redistribute, Transcript are not allowed.
        </small>{" "}
        <strong>
          全ての出演者の発言は個人のものであり、組織/団体を代表するものではありません。
        </strong>
      </p>
    </footer>
  );
}
