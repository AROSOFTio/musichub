import type { Metadata } from "next";
import { createElement } from "react";

import type { CatalogArtist, CatalogGenre, CatalogSong, HomeEvent } from "./api";

export const siteName = "Musichub";
export const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://hub.arosoft.io").replace(/\/$/, "");
export const apiBaseUrl = (
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  `${appUrl}/api`
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${appUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncate(value: string, length = 155) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > length ? `${clean.slice(0, length - 1).trim()}...` : clean;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const images = image ? [{ url: image.startsWith("http") ? image : absoluteUrl(image) }] : [{ url: absoluteUrl("/favicon.svg") }];
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((item) => item.url),
    },
  };
}

export async function serverApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function jsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function songDescription(song: CatalogSong) {
  const parts = [
    `${song.title} by ${song.artist.name}`,
    song.genre?.name ? `${song.genre.name} music` : null,
    song.language?.name ? `in ${song.language.name}` : null,
    song.musicType?.name ? `classified as ${song.musicType.name}` : null,
  ].filter(Boolean);
  return truncate(`${parts.join(", ")}. Stream the song, discover related artists, genres and more music on Musichub.`);
}

export function artistDescription(artist: CatalogArtist & { songs?: CatalogSong[] }) {
  return truncate(artist.seoDescription || artist.bio || `Discover songs, albums and music by ${artist.name} on Musichub.`);
}

export function genreDescription(genre: CatalogGenre & { songs?: CatalogSong[] }) {
  return truncate(genre.seoDescription || genre.description || `Explore ${genre.name} music, songs, artists and latest uploads on Musichub.`);
}

export function songJsonLd(song: CatalogSong) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: song.title,
    url: absoluteUrl(`/songs/${song.slug}`),
    byArtist: { "@type": "MusicGroup", name: song.artist.name, url: absoluteUrl(`/artists/${song.artist.slug}`) },
    inLanguage: song.language?.name,
    genre: song.genre?.name,
    datePublished: song.releaseDate ?? song.createdAt,
    image: song.coverImage ? absoluteUrl(song.coverImage) : undefined,
    duration: song.duration ? `PT${song.duration}S` : undefined,
  };
}

export function artistJsonLd(artist: CatalogArtist) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    url: absoluteUrl(`/artists/${artist.slug}`),
    image: artist.avatar ? absoluteUrl(artist.avatar) : undefined,
    description: artistDescription(artist),
  };
}

export function eventJsonLd(event: HomeEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: { "@type": "Place", name: event.location },
    image: event.image ? [absoluteUrl(event.image)] : undefined,
    url: event.ctaUrl ? absoluteUrl(event.ctaUrl) : absoluteUrl("/"),
  };
}
