"use server";

import matter from "gray-matter";
import { createFile, deleteFile, getFile, updateFile } from "@/lib/github";
import { wordCount, kebabCase } from "@/lib/utils";

type Category =
  | "Growth Frameworks"
  | "Content Systems"
  | "Philosophy"
  | "Brand Strategy"
  | "Productivity Systems";

function buildFrontmatter(input: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category: Category;
  published: boolean;
  readTime: number;
}) {
  const safeTitle = input.title.replace(/"/g, '\\"');
  const safeExcerpt = input.excerpt.replace(/"/g, '\\"');
  return [
    "---",
    `title: "${safeTitle}"`,
    `date: "${input.date}"`,
    `excerpt: "${safeExcerpt}"`,
    `slug: "${input.slug}"`,
    `category: "${input.category}"`,
    `published: ${input.published ? "true" : "false"}`,
    `readTime: ${input.readTime}`,
    "---",
    "",
  ].join("\n");
}

export async function githubCheckPostExists(slug: string) {
  const path = `content/posts/${slug}.md`;
  try {
    await getFile(path);
    return { exists: true as const };
  } catch {
    return { exists: false as const };
  }
}

export async function githubCreatePost(input: {
  title: string;
  slug: string;
  category: Category;
  excerpt: string;
  body: string;
  published: boolean;
}) {
  const slug = kebabCase(input.slug || input.title);
  const check = await githubCheckPostExists(slug);
  if (check.exists) {
    return { ok: false as const, error: "Slug already exists." };
  }

  const date = new Date().toISOString().slice(0, 10);
  const readTime = Math.ceil(wordCount(input.body) / 200);
  const frontmatter = buildFrontmatter({
    title: input.title,
    date,
    excerpt: input.excerpt,
    slug,
    category: input.category,
    published: input.published,
    readTime,
  });
  const content = `${frontmatter}${input.body.trim()}\n`;

  await createFile(`content/posts/${slug}.md`, content, `Create post: ${input.title}`);
  return { ok: true as const, slug };
}

export async function githubGetPost(slug: string) {
  const { content, sha } = await getFile(`content/posts/${slug}.md`);
  const decoded = Buffer.from(content, "base64").toString("utf8");
  const parsed = matter(decoded);
  const data = parsed.data as {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    category: Category;
    published: boolean;
    readTime: number;
  };
  return { sha, data, body: parsed.content };
}

export async function githubUpdatePost(input: {
  slug: string;
  sha: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  body: string;
  published: boolean;
}) {
  const readTime = Math.ceil(wordCount(input.body) / 200);
  const frontmatter = buildFrontmatter({
    title: input.title,
    date: input.date,
    excerpt: input.excerpt,
    slug: input.slug,
    category: input.category,
    published: input.published,
    readTime,
  });
  const content = `${frontmatter}${input.body.trim()}\n`;
  await updateFile(`content/posts/${input.slug}.md`, content, input.sha, `Update post: ${input.title}`);
  return { ok: true as const };
}

export async function githubDeletePost(input: { slug: string; sha: string; title: string }) {
  await deleteFile(`content/posts/${input.slug}.md`, input.sha, `Delete post: ${input.title}`);
  return { ok: true as const };
}

