export type Frontmatter = {
  type: string;
  tags: string[];
  audio: string;
  published_at: string;
  guests: Record<string, string>;
};
