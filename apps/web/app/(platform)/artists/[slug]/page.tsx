import { ArtistProfilePageClient } from "@/components/catalog/artist-profile-page";
import type { CatalogArtist, CatalogSong } from "@/lib/api";
import { artistDescription, artistJsonLd, breadcrumbJsonLd, jsonLd, pageMetadata, serverApi } from "@/lib/seo";

type ArtistPageProps = { params: { slug: string } };
type ArtistWithSongs = CatalogArtist & { songs: CatalogSong[] };

export async function generateMetadata({ params }: ArtistPageProps) {
  const artist = await serverApi<ArtistWithSongs>(`/artists/${encodeURIComponent(params.slug)}`);
  if (!artist) return pageMetadata({ title: "Artist not found", description: "This artist could not be found on Musichub.", path: `/artists/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: artist.seoTitle || `${artist.name} Songs, Music and Artist Profile`,
    description: artistDescription(artist),
    path: `/artists/${artist.slug}`,
    image: artist.avatar || artist.coverImage,
  });
}

export default async function ArtistProfilePage({ params }: ArtistPageProps) {
  const artist = await serverApi<ArtistWithSongs>(`/artists/${encodeURIComponent(params.slug)}`);
  return (
    <>
      {artist ? jsonLd([
        artistJsonLd(artist),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Artists", path: "/artists" },
          { name: artist.name, path: `/artists/${artist.slug}` },
        ]),
      ]) : null}
      <ArtistProfilePageClient slug={params.slug} />
    </>
  );
}
