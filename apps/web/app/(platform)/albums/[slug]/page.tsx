import { RankedSongList } from "@/components/catalog/ranked-song-list";
import type { CatalogAlbum, CatalogSong } from "@/lib/api";
import { absoluteUrl, breadcrumbJsonLd, jsonLd, pageMetadata, serverApi } from "@/lib/seo";

type AlbumWithSongs = CatalogAlbum & { songs: CatalogSong[] };

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const album = await serverApi<AlbumWithSongs>(`/albums/${encodeURIComponent(params.slug)}`);
  if (!album) return pageMetadata({ title: "Album not found", description: "This album could not be found on Musichub.", path: `/albums/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: album.seoTitle || `${album.title} by ${album.artist?.name ?? "Musichub Artist"}`,
    description: album.seoDescription || album.description || `Listen to songs from ${album.title} on Musichub.`,
    path: `/albums/${album.slug}`,
    image: album.coverImage,
  });
}

export default async function AlbumPage({ params }: { params: { slug: string } }) {
  const album = await serverApi<AlbumWithSongs>(`/albums/${encodeURIComponent(params.slug)}`);
  if (!album) return null;
  return (
    <div className="space-y-6">
      {jsonLd([
        { "@context": "https://schema.org", "@type": "MusicAlbum", name: album.title, byArtist: album.artist?.name, url: absoluteUrl(`/albums/${album.slug}`), image: album.coverImage ? absoluteUrl(album.coverImage) : undefined },
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Albums", path: "/albums" }, { name: album.title, path: `/albums/${album.slug}` }]),
      ])}
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">{album.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{album.artist?.name} · {album._count?.songs ?? album.songs.length} songs</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{album.description || `Songs and releases from ${album.title}.`}</p>
      </section>
      <RankedSongList songs={album.songs} showRank />
    </div>
  );
}
