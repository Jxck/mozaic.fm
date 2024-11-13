import { compileMDX } from "next-mdx-remote/rsc";
import type { Frontmatter } from "../../_types/Episode";
import { getEpisodeContent } from "../_utils/getEpisodeContent";
import { getTitleAndDescription } from "../_utils/getEpisodeMetadata";

// TODO
// export async function generateStaticParams() {
// }

type Props = {
  params: {
    episodes: string[];
  };
};

export async function generateMetadata({ params: { episodes } }: Props) {
  const [ep, file] = episodes;
  const content = await getEpisodeContent(ep, file);
  const metadata = await getTitleAndDescription(content);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// const components = {
//   h1: (props) => (
//     <h1 {...props} className="large-text">
//       {props.children}
//     </h1>
//   ),
// }

export default async function Page({ params: { episodes } }: Props) {
  const [ep, file] = episodes;
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: await getEpisodeContent(ep, file),
    options: {
      parseFrontmatter: true,
    },
  });

  return (
    <main>
      {content}
      {/* biome-ignore lint: TODO */}
      <audio controls={true} src={frontmatter.audio} />
    </main>
  );
}
