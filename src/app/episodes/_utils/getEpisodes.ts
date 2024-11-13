import type { Frontmatter } from "../_types/Frontmatter";

export async function getEpisodes() {
  const episodePaths = [
    "./src/app/episodes/_contents/150/monthly-ecosystem-202405.mdx",
    "./src/app/episodes/_contents/151/monthly-platform-202405.mdx",
    "./src/app/episodes/_contents/152/mozaic-renewal-202406.mdx",
    "./src/app/episodes/_contents/153/mozaic-ecosystem-202406.mdx",
    "./src/app/episodes/_contents/154/monthly-platform-202406.mdx",
    "./src/app/episodes/_contents/155/mozaic-renewal-202407.mdx",
    "./src/app/episodes/_contents/156/monthly-ecosystem-202407.mdx",
    "./src/app/episodes/_contents/157/monthly-platform-202407.mdx",
    "./src/app/episodes/_contents/158/monthly-ecosystem-202408.mdx",
  ];
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
