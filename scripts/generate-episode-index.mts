import { glob } from "node:fs/promises";
import { join } from "node:path";
import { generateRSSTemplate } from "./rss-template";

// TODO: for CI
// process.loadEnvFile(join(import.meta.dirname, '..', '.env.local'));

for await (const entry of glob(
  join(import.meta.dirname, "..", "public", "md", "**/*.md"),
)) {
  // console.log(entry);
}
