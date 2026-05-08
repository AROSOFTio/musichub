import { EntityCard } from "@/components/seo/entity-card";
import type { CatalogAlbum } from "@/lib/api";
import { jsonLd, pageMetadata, serverApi } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Albums",
  description: "Browse published albums on Musichub and discover songs, artists and related music collections.",
  path: "/albums",
});

export default async function AlbumsPage() {
  const albums = await serverApi<CatalogAlbum[]>("/albums") ?? [];
  return (
    <div className="space-y-6">
      {jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Musichub albums", url: "/albums" })}
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">Albums</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Explore published albums and music collections from artists on Musichub.</p>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {albums.map((album) => <EntityCard key={album.id} href={`/albums/${album.slug}`} title={album.title} image={album.coverImage} meta={`${album.artist?.name ?? "Artist"} · ${album._count?.songs ?? 0} songs`} />)}
      </div>
    </div>
  );
}
