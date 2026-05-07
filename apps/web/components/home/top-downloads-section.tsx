"use client";

import type { CatalogSong } from "@/lib/api";
import { SongCard } from "./song-card";

export function TopDownloadsSection({ songs }: { songs: CatalogSong[] }) {
  if (!songs.length) return null;
  return (
    <section>
      <h2 className="mb-4 text-xl font-black text-[var(--foreground)]">Top Downloads</h2>
      <div className="space-y-3">{songs.map((song) => <SongCard key={song.id} song={song} compact />)}</div>
    </section>
  );
}
