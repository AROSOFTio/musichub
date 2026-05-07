"use client";

import Link from "next/link";
import type { CatalogArtist } from "@/lib/api";

export function PopularArtistsSection({ artists }: { artists: CatalogArtist[] }) {
  if (!artists.length) return null;
  return (
    <section>
      <h2 className="mb-4 text-xl font-black text-[var(--foreground)]">Popular Artists</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {artists.map((artist) => (
          <Link key={artist.id} href={`/artists/${artist.slug}`} className="w-24 shrink-0 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-violet-50 text-xl font-black text-violet-600">
              {artist.avatar ? <img src={artist.avatar} alt="" className="h-full w-full object-cover" /> : artist.name.charAt(0)}
            </span>
            <span className="mt-2 block truncate text-xs font-bold text-[var(--foreground)]">{artist.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
