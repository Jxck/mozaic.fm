import Image from "next/image";
import { getEpisodes } from "./model/episodes";
import styles from "./page.module.css";

export default async function Home() {
  const { title, description, episodes } = await getEpisodes();
  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <a href="https://mozaic.fm" target="_blank" rel="noreferrer">
          <Image
            src="/mozaic.svg"
            alt="mozaic logo"
            width={100}
            height={100}
            priority
          />
        </a>
      </div>
      <section>
        <h2>list of episodes</h2>
        <ul>
          {episodes.map((episode) => {
            return (
              <li key={episode.url}>
                <a href={episode.url}>{episode.title}</a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
