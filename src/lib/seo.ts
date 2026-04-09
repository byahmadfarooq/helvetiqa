import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  openGraphType?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const base = siteUrl();
  const url = `${base}${opts.path}`;
  const fullTitle = `${opts.title} | Helvetiqa`;

  return {
    title: fullTitle,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.openGraphType ?? "website",
      url,
      title: fullTitle,
      description: opts.description,
      siteName: "Helvetiqa",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
    },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

