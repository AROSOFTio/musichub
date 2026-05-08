import { RankedSongList } from "@/components/catalog/ranked-song-list";
import type { CatalogLanguage, CatalogSong } from "@/lib/api";
import { breadcrumbJsonLd, jsonLd, pageMetadata, serverApi } from "@/lib/seo";

type LanguageWithSongs = CatalogLanguage & { songs: CatalogSong[] };

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const language = await serverApi<LanguageWithSongs>(`/languages/${encodeURIComponent(params.slug)}`);
  if (!language) return pageMetadata({ title: "Language not found", description: "This language page could not be found on Musichub.", path: `/languages/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: `${language.name} Music and Songs`,
    description: `Explore ${language.name} music, songs, artists and related releases on Musichub.`,
    path: `/languages/${language.slug}`,
  });
}

export default async function LanguagePage({ params }: { params: { slug: string } }) {
  const language = await serverApi<LanguageWithSongs>(`/languages/${encodeURIComponent(params.slug)}`);
  if (!language) return null;
  return (
    <div className="space-y-6">
      {jsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Languages", path: "/languages" }, { name: language.name, path: `/languages/${language.slug}` }]))}
      <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-card">
        <h1 className="text-3xl font-black text-slate-950">{language.name} Music</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Discover songs performed in or associated with {language.name}. This page is built from real Musichub catalog data.</p>
      </section>
      <RankedSongList songs={language.songs} showRank />
    </div>
  );
}
