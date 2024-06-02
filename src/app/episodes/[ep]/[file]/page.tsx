import { getEpisode } from "@/app/model/episodes";

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
        {/* biome-ignore lint: use track */}
        <audio controls src={episode.media} />
      </div>
    </main>
  );
}
