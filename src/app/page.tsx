import Image from "next/image";
import { getEpisodes } from "./model/episodes";

export default async function Home() {
  const { title, description, episodes } = await getEpisodes();
  return (
    <>
      <header>
        <h1>{title}</h1>
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
          <p>
            &gt; {description} by <a href="https://jxck.io">@jxck</a>
          </p>
        </section>
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
                <li key={episode.url}>
                  <a href={episode.url}>{episode.title}</a>
                  <p>{episode.detail}</p>
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
