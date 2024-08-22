import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  title: string;
  tags: string[];
  audio: string;
  published_at: string;
  guests?: Record<string, string>;
};

type Props = {
  params: {
    episodes: string[];
  };
};

export default async function Page({ params: { episodes } }: Props) {
  const [ep, file] = episodes;
  const md = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_PODCAST_CONTENT_URL}/${ep}/${file.replace(/.html$/, "")}.md`,
    )
  ).text();

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: md,
    options: { parseFrontmatter: true },
  });

  return (
    <main>
      <h2>tags</h2>
      <ul>
        {frontmatter?.tags.map((tag: string) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {frontmatter?.guests && (
        <>
          <h2>guests</h2>
          <ul>
            {Object.entries(frontmatter.guests).map(([name, link]) => (
              <li key={link}>
                <a href={link}>{name}</a>
              </li>
            ))}
          </ul>
        </>
      )}
      {content}
      {/* biome-ignore lint: TODO */}
      <audio controls={true} src={frontmatter.audio} />
    </main>
  );
}
