import type { MetadataRoute } from "next";

import { appUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin",
          "/login",
          "/register",
          "/artist",
          "/library",
          "/favorites",
          "/downloads",
          "/remix-studio",
          "/api",
        ],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
