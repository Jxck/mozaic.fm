// webpackを通すと、まだnode:fs/promisesのglobが存在しないので、ライブラリを利用する
import { glob } from "glob";
import type { Frontmatter } from "../_types/Frontmatter";

export async function getEpisodes() {
  const episodePaths = await glob("./src/app/episodes/_contents/**/*.mdx");
  const episodes = await Promise.all(
    episodePaths.map(async (path) => {
      const episodeMeta = path.match(/\/(?<ep>\d+)\/(?<file>[^/]+)\.mdx$/);

      if (!episodeMeta) {
        throw new Error("invalid episode path");
      }

      const { ep, file } = episodeMeta.groups as {
        ep: string;
        file: `/episodes/${string}/${string}`;
      };
      const { frontmatter } = (await import(
        `@/app/episodes/_contents/${ep}/${file}.mdx`
      )) as { frontmatter: Frontmatter };

      return {
        ...frontmatter,
        episode: Number(ep),
        path: `/episodes/${ep}/${file}`,
      };
    }),
  );

  return episodes.sort((a, b) => {
    if (b.episode - a.episode === 0) {
      if (a.title.endsWith("sideshow")) {
        return -1;
      }
      return 1;
    }

    return b.episode - a.episode;
  });
}
