import { readFile } from "node:fs/promises";
import type { Frontmatter } from "../src/app/_types/Episode";

export type Item = {
  frontmatter: Frontmatter & {
    title: string;
    description: string;
  };
  ep: string;
  file: string;
};

type RssJSON = Awaited<ReturnType<typeof generateRSSTemplate>>;

type RSSItems = RssJSON["rss"]["channel"]["item"];

// TODO: URL等を環境変数へ置換したいが、とりあえずは固定値で
export async function generateRSSTemplate(
  items: Item[],
  outputJsonPath: string,
) {
  const itemCaches = await getItemFromCache(outputJsonPath);

  console.log(itemCaches);

  return {
    rss: {
      channel: {
        title: "mozaic.fm",
        link: "http://mozaic.fm/",
        description: "next generation web podcast",
        generator: "Ruby",
        language: "ja",
        copyright:
          "Copyright (c) 2014 mozaic.fm. All Rights Reserved. Redistribute, Transcript are not allowed.",
        "atom:link": {
          "xmlns:atom": "http://www.w3.org/2005/Atom",
          rel: "self",
          type: "application/rss+xml",
          href: "http://feed.mozaic.fm",
        },
        "itunes:author": "Jxck",
        "itunes:category": "Technology",
        "itunes:explicit": "no",
        "itunes:image": "http://files.mozaic.fm/mozaic.jpeg",
        "itunes:keywords": [
          "web",
          "technology",
          "programming",
          "it",
          "software",
          "jxck",
        ],
        "itunes:subtitle": "next generation web podcast",
        "itunes:summary":
          "talking about next generation web technologies hosted by Jxck",
        "media:category": "Technology/Podcasting",
        "media:copyright":
          "Copyright (c) 2014 mozaic.fm. All Rights Reserved. Redistribute, Transcript are not allowed.",
        "media:credit": "Jxck",
        "media:description": "next generation web podcast",
        "media:keywords": [
          "web",
          "technology",
          "programming",
          "it",
          "software",
          "jxck",
        ],
        "media:rating": "nonadult",
        "media:thumbnail": "http://files.mozaic.fm/mozaic.jpeg",
        "itunes:owner": {
          "itunes:email": "mail@jxck.io",
          "itunes:name": "Jxck",
        },
        item: items
          .sort((a, b) => {
            if (Number(b.ep) - Number(a.ep) === 0) {
              if (a.frontmatter.title.endsWith("sideshow")) {
                return -1;
              }
              return 1;
            }

            return Number(b.ep) - Number(a.ep);
          })
          .map(({ frontmatter, ep, file }, i) => ({
            category: "mozaicfm",
            enclosure: {
              // TODO: 置く場所のURLを考える
              "url": `https://files.mozaic.fm/mozaic-ep${ep}.mp3`,
              // TODO:
              length: "0",
              type: "audio/mpeg",
            },
            title: `${frontmatter.title} | mozaic.fm"`,
            // TODO:
            guid: `${process.env.NEXT_PUBLIC_URL}/episodes/${ep}/monthly-ecosystem-202410.html"`,
            // TODO:
            link: "",
            pubDate: frontmatter.published_at,
            "itunes:author": "Jxck",
            // TODO:
            "itunes:duration": "0",
            "itunes:explicit": "no",
            "itunes:keywords": ["web", "tech", "it"],
            "itunes:order": `${i}`,
            "itunes:subtitle": frontmatter.description,
            "media:content": {
              url: "0",
              fileSize: "0",
              type: "audio/mpeg",
            },
          })),
      },
    },
  };
}

async function getItemFromCache(outputJsonPath: string): Promise<RSSItems> {
  try {
    const data = await readFile(outputJsonPath, "utf-8");
    const res: RssJSON = JSON.parse(data);

    return res.rss.channel.item;
  } catch {
    return [];
  }
}
