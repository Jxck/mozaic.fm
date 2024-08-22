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

      const { ep, file } = episodeMeta.groups as { ep: string; file: string };
      const { frontmatter } = await import(
        `@/app/episodes/_contents/${ep}/${file}.mdx`
      );

      return {
        ...frontmatter,
        path: `/episodes/${ep}/${file}`,
      } as Frontmatter & {
        path: `/episodes/${typeof ep}/${typeof file}`;
      };
    }),
  );

  return episodes.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}
