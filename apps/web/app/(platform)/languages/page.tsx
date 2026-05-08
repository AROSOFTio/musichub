import { EntityCard } from "@/components/seo/entity-card";
import type { CatalogLanguage } from "@/lib/api";
import { pageMetadata, serverApi } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Music by Language",
  description: "Discover Musichub songs by language, including regional and cultural music categories where real songs are available.",
  path: "/languages",
});

export default async function LanguagesPage() {
  const languages = await serverApi<CatalogLanguage[]>("/languages") ?? [];
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">Music by Language</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Browse songs by language and discover language-specific music collections such as Ateso songs, Luganda music and other categories when real catalog data exists.</p>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {languages.map((language) => <EntityCard key={language.id} href={`/languages/${language.slug}`} title={`${language.name} music`} meta={`${language._count?.songs ?? 0} songs`} />)}
      </div>
    </div>
  );
}
