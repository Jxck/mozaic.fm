/**
 * FIXME: デモのためにめちゃくちゃ適当に実装したもの。
 * 最終的には
 * - RSS ではなくローカルにおいたファイルから情報を取得する
 * - 型も真面目に実装する
 */
type Item = {
  title: string;
  url: string;
  link?: string;
  detail?: string;
  media?: string;
  guid?: string;
  pubDate?: string;
  "itunes:subtitle"?: string;
  "media:content"?: {
    url: string;
  };
};
type Channel = {
  title: string;
  description: string;
  item: Array<Item>;
};
type JSON = {
  rss: {
    channel: Channel;
  };
};
type Episode = {
  title: string;
  url: string;
  detail: string;
  published_at: string;
  media: string;
};
export async function getEpisodes() {
  const res = await fetch("https://feed.mozaic.fm/index.json");
  const json: JSON = await res.json();
  const channel = json.rss.channel;
  const { title, description }: Channel = channel;
  const episodes: Array<Episode> = channel.item.map((item: Item) => {
    const title = item.title as string;
    const url = new URL(item.link as string).pathname;
    const detail = item["itunes:subtitle"] as string;
    const published_at = new Date(item.pubDate as string)
      .toISOString()
      .split("T")
      .at(0) as string;
    const media = item["media:content"]?.url as string;
    return {
      title,
      url,
      detail,
      media,
      published_at,
    };
  });
  return { title, description, episodes };
}

export async function getEpisode(ep: string, file: string): Promise<Episode> {
  const res = await fetch("https://feed.mozaic.fm/index.json");
  const json: JSON = await res.json();
  const item = json.rss.channel.item
    .filter(({ guid }: Item) => {
      return guid === `https://mozaic.fm/episodes/${ep}/${file}`;
    })
    .at(0) as Item;
  const title = item.title;
  const url = item.link as string;
  const detail = item["itunes:subtitle"] as string;
  const media = item["media:content"]?.url as string;
  const published_at = new Date(item.pubDate as string)
    .toISOString()
    .split("T")
    .at(0) as string;
  return {
    title,
    url,
    detail,
    media,
    published_at,
  };
}
