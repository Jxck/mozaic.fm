import Link from "next/link";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { getEpisodes } from "./episodes/_utils/getEpisodes";

export default async function Home() {
  const episodes = await getEpisodes();
  return (
    <>
      <Header />
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
              const guests = (
                <ul>
                  {Object.entries(episode.guests || []).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <a href={href}>@{name}</a>
                      </li>
                    );
                  })}
                </ul>
              );

              return (
                <div key={episode.title}>
                  <Link href={episode.path}>{episode.title}</Link>
                  <div>guest: {guests}</div>
                  <p>{episode.description}</p>
                  <p>published_at: {episode.published_at}</p>
                  <button type="button">Detail</button>
                  <button type="button">Play</button>
                </div>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
