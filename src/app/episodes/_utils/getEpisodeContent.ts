export async function getEpisodeContent(ep: string, file: string) {
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_R2_URL}/${ep}/${file.replace(".html", ".md")}`,
    )
  ).text();
}
