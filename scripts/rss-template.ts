// TODO: use process.env for some variables
export function generateRSSTemplate(item: []) {
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
        item,
      },
    },
  };
}
