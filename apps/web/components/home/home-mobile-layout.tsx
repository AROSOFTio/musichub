"use client";

import { useMemo, useState } from "react";
import type { HomeFeed } from "@/lib/api";
import { DiscoveryFilters, emptyDiscoveryFilters, filterDiscoverySongs, isDiscoveryFilterActive } from "./discovery-filters";
import { FeatureShortcuts } from "./feature-shortcuts";
import { FilteredSongsSection } from "./filtered-songs-section";
import { HeroCarousel } from "./hero-carousel";
import { LatestUploadsSection } from "./latest-uploads-section";
import { TrendingSection } from "./trending-section";

export function HomeMobileLayout({ feed }: { feed: HomeFeed }) {
  const [filters, setFilters] = useState(emptyDiscoveryFilters);
  const allSongs = useMemo(() => {
    const sources = [
      feed.trendingNow ?? feed.trending ?? [],
      feed.latestUploads ?? feed.latest ?? [],
      feed.editorPicks ?? [],
      feed.topDownloads ?? [],
      feed.continueListening ?? [],
    ];
    return Array.from(new Map(sources.flat().map((song) => [song.id, song])).values());
  }, [feed]);
  const filteredSongs = useMemo(() => filterDiscoverySongs(allSongs, filters), [allSongs, filters]);
  const filtersActive = isDiscoveryFilterActive(filters);

  return (
    <div className="space-y-7 lg:hidden">
      <HeroCarousel song={feed.featured ?? null} />
      <FeatureShortcuts modules={feed.modules ?? {}} />
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-3xl border border-borderSoft bg-[var(--card-bg)] px-5 py-4 text-sm font-black text-[var(--foreground)] shadow-card">
          Filters
          <span className="text-xs text-[var(--muted)] group-open:hidden">Open</span>
          <span className="hidden text-xs text-[var(--muted)] group-open:inline">Close</span>
        </summary>
        <div className="mt-3">
          <DiscoveryFilters songs={allSongs} filters={filters} onChange={setFilters} compact />
        </div>
      </details>
      {filtersActive ? (
        <FilteredSongsSection songs={filteredSongs} />
      ) : (
        <>
          <TrendingSection songs={feed.trendingNow ?? feed.trending ?? []} />
          <LatestUploadsSection songs={feed.latestUploads ?? feed.latest ?? []} />
        </>
      )}
    </div>
  );
}
