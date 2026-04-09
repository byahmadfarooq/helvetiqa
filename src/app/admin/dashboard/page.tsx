import matter from "gray-matter";
import { DashboardClient } from "@/components/admin/DashboardClient";
import { pageMetadata } from "@/lib/seo";
import { getFile } from "@/lib/github";

export const generateMetadata = () =>
  pageMetadata({
    title: "Dashboard",
    description: "Admin dashboard.",
    path: "/admin/dashboard",
    noindex: true,
  });

async function listPostSlugs(): Promise<string[]> {
  const token = process.env.GITHUB_PAT;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!token || !owner || !repo) return [];

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/content/posts`, {
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  const json = (await res.json()) as Array<{ name: string; type: string }>;
  return json
    .filter((item) => item.type === "file" && item.name.endsWith(".md"))
    .map((item) => item.name.replace(/\.md$/, ""));
}

export default async function AdminDashboardPage() {
  const slugs = await listPostSlugs();
  const rows = await Promise.all(
    slugs.map(async (slug) => {
      const { content, sha } = await getFile(`content/posts/${slug}.md`);
      const decoded = Buffer.from(content, "base64").toString("utf8");
      const parsed = matter(decoded);
      const fm = parsed.data as { title: string; date: string; category: string; published: boolean; slug: string };
      return { title: fm.title, date: fm.date, category: fm.category, published: Boolean(fm.published), slug: fm.slug, sha };
    })
  );

  rows.sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <main id="main" className="dot-grid bg-bg">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <h1 className="font-display text-6xl leading-none tracking-tight md:text-7xl">Dashboard</h1>
        <p className="mt-4 text-sm leading-relaxed text-black/75">Manage posts stored in GitHub.</p>
        <div className="mt-10">
          <DashboardClient rows={rows} />
        </div>
      </section>
    </main>
  );
}

