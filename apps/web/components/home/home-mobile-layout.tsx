"use client";

import type { HomeFeed } from "@/lib/api";
import { FeatureShortcuts } from "./feature-shortcuts";
import { HeroCarousel } from "./hero-carousel";
import { LatestUploadsSection } from "./latest-uploads-section";
import { TrendingSection } from "./trending-section";

export function HomeMobileLayout({ feed }: { feed: HomeFeed }) {
  return (
    <div className="space-y-7 lg:hidden">
      <HeroCarousel song={feed.featured ?? null} />
      <FeatureShortcuts modules={feed.modules ?? {}} />
      <TrendingSection songs={feed.trendingNow ?? feed.trending ?? []} />
      <LatestUploadsSection songs={feed.latestUploads ?? feed.latest ?? []} />
    </div>
  );
}
