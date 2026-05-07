"use client";

import type { HomeFeed } from "@/lib/api";
import { EditorPicksSection } from "./editor-picks-section";
import { FeatureShortcuts } from "./feature-shortcuts";
import { HeroCarousel } from "./hero-carousel";
import { LatestUploadsSection } from "./latest-uploads-section";
import { PopularArtistsSection } from "./popular-artists-section";
import { RightRail } from "./right-rail";
import { TopDownloadsSection } from "./top-downloads-section";
import { TrendingSection } from "./trending-section";

export function HomeDesktopLayout({ feed }: { feed: HomeFeed }) {
  const modules = feed.modules ?? {};
  return (
    <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-10">
        <HeroCarousel song={feed.featured ?? null} />
        <FeatureShortcuts modules={modules} />
        <TrendingSection songs={feed.trendingNow ?? feed.trending ?? []} />
        <LatestUploadsSection songs={feed.latestUploads ?? feed.latest ?? []} />
        <EditorPicksSection songs={feed.editorPicks ?? []} />
        <TopDownloadsSection songs={feed.topDownloads ?? []} />
        <PopularArtistsSection artists={feed.popularArtists ?? []} />
      </div>
      <RightRail modules={modules} continueListening={feed.continueListening ?? []} genres={feed.browseGenres ?? feed.genres ?? []} />
    </div>
  );
}
