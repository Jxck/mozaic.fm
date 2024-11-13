import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { parse } from "yaml";
import updateFrontmatter from "../../../../remarkPlugins/updateFrontmatter.mjs";
import type { Frontmatter } from "../../_types/Episode";

type CustomFrontmatter = Frontmatter & {
  title: string;
  description: string;
};

// next-mdx-remoteのparseFrontmatter optionは強制的にfrontmatterを書き換えるので、別途contentから値を取得する
export async function getTitleAndDescription(content: string) {
  let frontmatter: CustomFrontmatter = {
    type: "podcast",
    tags: [],
    audio: "",
    published_at: "",
    guests: {},
    title: "",
    description: "",
  };

  await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(updateFrontmatter)
    .use(remarkFrontmatter, ["yaml"])
    .use(() => (tree) => {
      // @ts-expect-error remark doesn't correctly type the tree
      const yaml = tree.children.find((node) => node.type === "yaml");

      frontmatter = parse(yaml.value);
    })
    .process(content);

  return frontmatter;
}
