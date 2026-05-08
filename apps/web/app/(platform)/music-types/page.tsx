import { EntityCard } from "@/components/seo/entity-card";
import type { CatalogMusicType } from "@/lib/api";
import { pageMetadata, serverApi } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Music Types",
  description: "Browse Musichub songs by music type, mood and category using real catalog classifications.",
  path: "/music-types",
});

export default async function MusicTypesPage() {
  const types = await serverApi<CatalogMusicType[]>("/music-types") ?? [];
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">Music Types</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Explore worship music, gospel songs, afrobeat releases and other music types when they are available in the Musichub catalog.</p>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {types.map((type) => <EntityCard key={type.id} href={`/music-types/${type.slug}`} title={type.name} meta={`${type._count?.songs ?? 0} songs`} />)}
      </div>
    </div>
  );
}
