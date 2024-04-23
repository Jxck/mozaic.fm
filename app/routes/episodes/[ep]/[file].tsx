import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Player from "../../../islands/player";
import { getEpisode } from "../../../model/episodes";

const className = css`
  font-family: sans-serif;
`;
// /episodes/146/monthly-platform-202403.html
export default createRoute(async (c) => {
	const ep = c.req.param("ep");
	const file = c.req.param("file");

	const episode = await getEpisode(ep, file);
	return c.render(
		<div class={className}>
			<h1>{episode.title}</h1>
			<section>{episode.detail}</section>
			<Player src={episode.media as string} />
			<footer>
				<a href="/">top</a>
			</footer>
		</div>,
		{ title: ep },
	);
});
