import type { MetadataRoute } from "next";
import { services, work } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date().toISOString();

  const staticRoutes = ["/", "/services", "/work", "/work-with-us", "/about", "/blog"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
  }));

  const workRoutes = work.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: now,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...postRoutes];
}

