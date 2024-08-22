export type Frontmatter = {
  title: string;
  description: string;
  audio: string;
  published_at: string;
  tags: string[];
  guests?: Record<string, string>;
};
