"use client";

import { useMemo, useState } from "react";
import type { HomeFeed } from "@/lib/api";
import { emptyDiscoveryFilters, filterDiscoverySongs, isDiscoveryFilterActive } from "./discovery-filters";
import { EditorPicksSection } from "./editor-picks-section";
import { FeatureShortcuts } from "./feature-shortcuts";
import { FilteredSongsSection } from "./filtered-songs-section";
import { HeroCarousel } from "./hero-carousel";
import { LatestUploadsSection } from "./latest-uploads-section";
import { PopularArtistsSection } from "./popular-artists-section";
import { RightRail } from "./right-rail";
import { TopDownloadsSection } from "./top-downloads-section";
import { TrendingSection } from "./trending-section";

export function HomeDesktopLayout({ feed }: { feed: HomeFeed }) {
  const modules = feed.modules ?? {};
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
    <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-10">
        <HeroCarousel song={feed.featured ?? null} />
        <FeatureShortcuts modules={modules} />
        {filtersActive ? (
          <FilteredSongsSection songs={filteredSongs} />
        ) : (
          <>
            <TrendingSection songs={feed.trendingNow ?? feed.trending ?? []} />
            <LatestUploadsSection songs={feed.latestUploads ?? feed.latest ?? []} />
            <EditorPicksSection songs={feed.editorPicks ?? []} />
            <TopDownloadsSection songs={feed.topDownloads ?? []} />
            <PopularArtistsSection artists={feed.popularArtists ?? []} />
          </>
        )}
      </div>
      <RightRail modules={modules} continueListening={feed.continueListening ?? []} songs={allSongs} filters={filters} onFiltersChange={setFilters} />
    </div>
  );
}
