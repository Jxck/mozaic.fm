import Image from "next/image";
import Link from "next/link";
import { getEpisodes } from "./episodes/_utils/getEpisodes";

export default async function Home() {
  const episodes = await getEpisodes();
  // const tags = new Set(episodes.flatMap((episode) => episode.tags));

  return (
    <>
      <header>
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
        <search>
          <form>
            <label htmlFor="search">search</label>
            <input
              id="search"
              type="text"
              name="q"
              placeholder="search episodes..."
            />
          </form>
        </search>
      </header>
      <main>
        <section>
          <nav>
            <ul>
              <li>
                <a href="#dummy">All</a>
              </li>
              <li>
                <a href="#dummy">Platform</a>
              </li>
              <li>
                <a href="#dummy">Ecosystem</a>
              </li>
              <li>
                <a href="#dummy">Guest</a>
              </li>
              <li>
                <a href="#dummy">Others</a>
              </li>
              <li>
                <a href="#dummy">Sort by Oldest</a>
              </li>
            </ul>
          </nav>
        </section>
        <section>
          <ul>
            {episodes.map((episode) => {
              return (
                <li key={episode.title}>
                  <Link href={episode.path}>{episode.title}</Link>
                  <p>{episode.description}</p>
                  <p>published_at: {episode.published_at}</p>
                  <button type="button">Detail</button>
                  <button type="button">Play</button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
