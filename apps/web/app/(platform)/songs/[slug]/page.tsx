import { SongDetail } from "@/components/catalog/song-detail";
import { breadcrumbJsonLd, jsonLd, pageMetadata, serverApi, songDescription, songJsonLd } from "@/lib/seo";
import type { CatalogSong } from "@/lib/api";

type SongPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: SongPageProps) {
  const song = await serverApi<CatalogSong>(`/songs/${encodeURIComponent(params.slug)}`);
  if (!song) return pageMetadata({ title: "Song not found", description: "This song could not be found on Musichub.", path: `/songs/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: song.seoTitle || `${song.title} by ${song.artist.name}`,
    description: song.seoDescription || songDescription(song),
    path: `/songs/${song.slug}`,
    image: song.coverImage,
  });
}

export default async function SongPage({ params }: SongPageProps) {
  const song = await serverApi<CatalogSong>(`/songs/${encodeURIComponent(params.slug)}`);
  return (
    <>
      {song ? jsonLd([
        songJsonLd(song),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Songs", path: "/latest" },
          { name: song.title, path: `/songs/${song.slug}` },
        ]),
      ]) : null}
      <SongDetail slug={params.slug} />
    </>
  );
}
