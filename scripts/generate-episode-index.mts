import { glob, readFile } from "node:fs/promises";
import { join } from "node:path";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { parse } from "yaml";
import updateFrontmatter from "../remarkPlugins/updateFrontmatter.mjs";
import { generateRSSTemplate, type Item } from "./rss-template.mts";

try {
  process.loadEnvFile(join(import.meta.dirname, "..", ".env.local"));
  process.loadEnvFile(join(import.meta.dirname, "..", ".env"));
} catch {
  // ignore
}

const outputJsonPath = join(import.meta.dirname, "..", "public", "index.json");
const items: Item[] = [];

for await (const entry of glob(
  join(import.meta.dirname, "..", "public", "md", "**/*.md"),
)) {
  const content = await readFile(entry, "utf-8");
  const frontmatter = await getTitleAndDescription(content);
  const fragments = entry.split("/");
  const ep = fragments.at(-2)!;
  const file = fragments.at(-1)!;

  items.push({
    frontmatter,
    ep,
    file,
  });
}

const json = await generateRSSTemplate(items, outputJsonPath);

console.log(json.rss.channel.item[0]);

// TODO: 共通コードを利用するようにtypescriptのmodule周りを書き換える
// getEpisodeMetadata.tsは利用できないので、コピーを取る
async function getTitleAndDescription(content: string) {
  let frontmatter = {
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
