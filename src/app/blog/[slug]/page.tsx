import { EmailCapture } from "@/components/forms/EmailCapture";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return pageMetadata({
      title: "Post",
      description: "Blog post.",
      path: `/blog/${params.slug}`,
      openGraphType: "article",
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main id="main" className="bg-bg">
      <article className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-display text-sm tracking-wide text-black/60">{post.category}</p>
          <h1 className="mt-3 font-display text-6xl leading-none tracking-tight md:text-7xl">{post.title}</h1>
          <p className="mt-5 font-display text-sm tracking-wide text-black/60">
            {formatDate(post.date)} · {post.readTime} min read
          </p>
          <div className="prose prose-neutral mt-10 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </article>

      <EmailCapture
        source="blog_post_email_capture"
        title="Want more like this?"
        subtitle="Get the next post in your inbox."
      />

      <CTABand title="Want Helvetiqa to build your system?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

