import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { wordCount } from "@/lib/utils";

export type PostCategory =
  | "Growth Frameworks"
  | "Content Systems"
  | "Philosophy"
  | "Brand Strategy"
  | "Productivity Systems";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category: PostCategory;
  published: boolean;
  readTime?: number;
};

export type Post = PostFrontmatter & {
  body: string;
  html: string;
  readTime: number;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const parsed = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      const computedReadTime = fm.readTime ?? Math.ceil(wordCount(content) / 200);
      const html = marked.parse(content) as string;
      return {
        ...fm,
        body: content,
        html,
        readTime: computedReadTime,
      } satisfies Post;
    })
    .filter((p) => Boolean(p.published))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return parsed;
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDir)) return null;
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const computedReadTime = fm.readTime ?? Math.ceil(wordCount(content) / 200);
  const html = marked.parse(content) as string;

  if (!fm.published) return null;

  return {
    ...fm,
    body: content,
    html,
    readTime: computedReadTime,
  };
}

