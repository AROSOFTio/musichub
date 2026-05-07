"use client";

import type { CatalogSong } from "@/lib/api";
import { SongCard } from "./song-card";

export function FilteredSongsSection({ songs }: { songs: CatalogSong[] }) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[var(--foreground)]">Filtered Results</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{songs.length} matching track{songs.length === 1 ? "" : "s"}</p>
        </div>
      </div>
      {songs.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {songs.map((song) => <SongCard key={song.id} song={song} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-borderSoft bg-[var(--card-bg)] p-8 text-center text-sm text-[var(--muted)]">
          No tracks match these filters.
        </div>
      )}
    </section>
  );
}
