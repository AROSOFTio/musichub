import type { MetadataRoute } from "next";

import type { CatalogAlbum, CatalogArtist, CatalogGenre, CatalogLanguage, CatalogMusicType, CatalogSong, HomeEvent } from "@/lib/api";
import { absoluteUrl, serverApi } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/trending",
  "/latest",
  "/top-50",
  "/all-time",
  "/genres",
  "/artists",
  "/albums",
  "/languages",
  "/music-types",
  "/events",
  "/about",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [songs, artists, genres, albums, musicTypes, languages, events] = await Promise.all([
    serverApi<CatalogSong[]>("/songs"),
    serverApi<CatalogArtist[]>("/artists"),
    serverApi<CatalogGenre[]>("/genres"),
    serverApi<CatalogAlbum[]>("/albums"),
    serverApi<CatalogMusicType[]>("/music-types"),
    serverApi<CatalogLanguage[]>("/languages"),
    serverApi<HomeEvent[]>("/events"),
  ]);

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" as const : "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...(songs ?? []).map((song) => ({
      url: absoluteUrl(`/songs/${song.slug}`),
      lastModified: new Date(song.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...(artists ?? []).map((artist) => ({
      url: absoluteUrl(`/artists/${artist.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...(genres ?? []).map((genre) => ({
      url: absoluteUrl(`/genres/${genre.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...(albums ?? []).map((album) => ({
      url: absoluteUrl(`/albums/${album.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...(musicTypes ?? []).map((musicType) => ({
      url: absoluteUrl(`/music-types/${musicType.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...(languages ?? []).map((language) => ({
      url: absoluteUrl(`/languages/${language.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...(events ?? []).map((event) => ({
      url: absoluteUrl(`/events/${event.slug}`),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.75,
    })),
  ];
}
