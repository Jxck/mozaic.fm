/**
 * FIXME: デモのためにめちゃくちゃ適当に実装したもの。
 * 最終的には
 * - RSS ではなくローカルにおいたファイルから情報を取得する
 * - 型も真面目に実装する
 */
type Episode = {
	title: string;
	url: string;
	link?: string;
	detail?: string;
	media?: string;
	guid?: string;
	"itunes:subtitle"?: string;
	"media:content"?: {
		url: string;
	};
};
type Channel = {
	title: string;
	description: string;
	item: Array<Episode>;
};
type JSON = {
	rss: {
		channel: Channel;
	};
};
export async function getEpisodes() {
	const res = await fetch("https://feed.mozaic.fm/index.json");
	const json: JSON = await res.json();
	const channel = json.rss.channel;
	const { title, description }: Channel = channel;
	const episodes: Array<Episode> = channel.item.map((episode: Episode) => {
		const title = episode.title as string;
		const url = new URL(episode.link as string).pathname;
		return {
			title,
			url,
		};
	});
	return { title, description, episodes };
}

export async function getEpisode(ep: string, file: string): Promise<Episode> {
	const res = await fetch("https://feed.mozaic.fm/index.json");
	const json: JSON = await res.json();
	const episode = json.rss.channel.item
		.filter(({ guid }: Episode) => {
			return guid === `https://mozaic.fm/episodes/${ep}/${file}`;
		})
		.at(0) as Episode;
	console.log(episode);
	const title = episode.title;
	const url = episode.link as string;
	const detail = episode["itunes:subtitle"] as string;
	const media = episode["media:content"]?.url as string;
	return {
		title,
		url,
		detail,
		media,
	};
}
