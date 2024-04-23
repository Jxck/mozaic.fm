import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { getEpisodes } from "../model/episodes";

const main = css`
  font-family: sans-serif;
`;

const italic = css`
  font-style: italic;
`;

export default createRoute(async (c) => {
	const { title, description, episodes } = await getEpisodes();
	return c.render(
		<main class={main}>
			<h1>{title}</h1>
			<p class={italic}>{description}</p>
			<section>
				<h2>list of episodes</h2>
				<ul>
					{episodes.map((episode) => {
						return (
							<li>
								<a href={episode.url}>{episode.title}</a>
							</li>
						);
					})}
				</ul>
			</section>
		</main>,
		{ title },
	);
});
