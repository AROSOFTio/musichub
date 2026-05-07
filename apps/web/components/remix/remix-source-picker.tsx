"use client";

import type { CatalogSong } from "@/lib/api";
import { SongCard } from "@/components/home/song-card";

export function RemixSourcePicker({ songs }: { songs: CatalogSong[] }) {
  return <div className="grid gap-3 sm:grid-cols-2">{songs.map((song) => <SongCard key={song.id} song={song} />)}</div>;
}
