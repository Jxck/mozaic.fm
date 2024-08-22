type Props = {
  params: {
    episodes: string[];
  };
};

export default async function Page({ params: { episodes } }: Props) {
  const [ep, file] = episodes;
  const { default: Component, frontmatter } = await import(
    `@/app/episodes/_contents/${ep}/${file.replace(".html", "")}.mdx`
  );

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
              // @ts-expect-error generate frontmatter IF
              <li key={link}>
                {/* @ts-expect-error generate frontmatter IF */}
                <a href={link}>{name}</a>
              </li>
            ))}
          </ul>
        </>
      )}
      <Component />
      {/* biome-ignore lint: TODO */}
      <audio controls={true} src={frontmatter.audio} />
    </main>
  );
}
