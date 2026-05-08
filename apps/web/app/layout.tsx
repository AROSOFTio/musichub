import type { Metadata } from "next";

import { AuthProvider } from "@/lib/auth-context";
import { appUrl } from "@/lib/seo";
import { ThemeProvider } from "@/lib/theme-context";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Musichub - Discover Songs, Artists, Genres and Events",
    template: "%s | Musichub",
  },
  description: "Musichub helps listeners discover songs, artists, genres, languages, music types, events and independent music communities.",
  applicationName: "Musichub",
  authors: [{ name: "Musichub" }],
  creator: "Musichub",
  publisher: "Musichub",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Musichub",
    title: "Musichub - Discover Songs, Artists, Genres and Events",
    description: "Discover songs, artists, genres, languages, music types, events and independent music communities on Musichub.",
    url: appUrl,
    images: [{ url: "/favicon.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Musichub",
    description: "Discover songs, artists, genres, languages, music types and events on Musichub.",
    images: ["/favicon.svg"],
  },
  robots: { index: true, follow: true },
  themeColor: "#6d28d9",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
