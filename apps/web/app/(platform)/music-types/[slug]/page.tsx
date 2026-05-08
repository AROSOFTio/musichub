import { RankedSongList } from "@/components/catalog/ranked-song-list";
import type { CatalogMusicType, CatalogSong } from "@/lib/api";
import { breadcrumbJsonLd, jsonLd, pageMetadata, serverApi } from "@/lib/seo";

type MusicTypeWithSongs = CatalogMusicType & { songs: CatalogSong[] };

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const musicType = await serverApi<MusicTypeWithSongs>(`/music-types/${encodeURIComponent(params.slug)}`);
  if (!musicType) return pageMetadata({ title: "Music type not found", description: "This music type could not be found on Musichub.", path: `/music-types/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: `${musicType.name} Songs and Artists`,
    description: musicType.description || `Explore ${musicType.name} songs, artists and related music on Musichub.`,
    path: `/music-types/${musicType.slug}`,
  });
}

export default async function MusicTypePage({ params }: { params: { slug: string } }) {
  const musicType = await serverApi<MusicTypeWithSongs>(`/music-types/${encodeURIComponent(params.slug)}`);
  if (!musicType) return null;
  return (
    <div className="space-y-6">
      {jsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Music Types", path: "/music-types" }, { name: musicType.name, path: `/music-types/${musicType.slug}` }]))}
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">{musicType.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{musicType.description || `Discover ${musicType.name} music from real Musichub songs and artists.`}</p>
      </section>
      <RankedSongList songs={musicType.songs} showRank />
    </div>
  );
}
