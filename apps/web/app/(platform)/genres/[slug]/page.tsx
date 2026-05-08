import { GenreDetailPageClient } from "@/components/catalog/genre-detail-page";
import type { CatalogGenre, CatalogSong } from "@/lib/api";
import { absoluteUrl, breadcrumbJsonLd, genreDescription, jsonLd, pageMetadata, serverApi } from "@/lib/seo";

type GenrePageProps = { params: { slug: string } };
type GenreWithSongs = CatalogGenre & { songs: CatalogSong[] };

export async function generateMetadata({ params }: GenrePageProps) {
  const genre = await serverApi<GenreWithSongs>(`/genres/${encodeURIComponent(params.slug)}`);
  if (!genre) return pageMetadata({ title: "Genre not found", description: "This genre could not be found on Musichub.", path: `/genres/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: genre.seoTitle || `${genre.name} Music, Songs and Artists`,
    description: genreDescription(genre),
    path: `/genres/${genre.slug}`,
  });
}

export default async function GenreDetailPage({ params }: GenrePageProps) {
  const genre = await serverApi<GenreWithSongs>(`/genres/${encodeURIComponent(params.slug)}`);
  return (
    <>
      {genre ? jsonLd([
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${genre.name} music`,
          description: genreDescription(genre),
          url: absoluteUrl(`/genres/${genre.slug}`),
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Genres", path: "/genres" },
          { name: genre.name, path: `/genres/${genre.slug}` },
        ]),
      ]) : null}
      <GenreDetailPageClient slug={params.slug} />
    </>
  );
}
