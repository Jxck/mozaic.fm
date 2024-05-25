import { getEpisode } from "@/app/model/episodes";

export const runtime = 'edge';

export default async function Page({
  params,
}: {
  params: { ep: string; file: string };
}) {
  const { ep, file } = params;
  const episode = await getEpisode(ep, file);
  return (
    <main>
      <h1>{episode.title}</h1>
      <section>{episode.detail}</section>
      <div>
        <audio controls src={episode.media} />
      </div>
    </main>
  );
}
