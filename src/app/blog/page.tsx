import { BlogIndex } from "@/components/blog/BlogIndex";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

export const generateMetadata = () =>
  pageMetadata({
    title: "Blog",
    description: "Thinking in systems. Notes on growth, content, and conversion.",
    path: "/blog",
  });

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">Thinking in systems.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Frameworks, breakdowns, and operating rules. Written for founders who want clarity and output.
          </p>
          <div className="mt-12">
            <BlogIndex posts={posts} />
          </div>
        </div>
      </section>

      <EmailCapture
        source="blog_email_capture"
        title="Get new posts by email."
        subtitle="Short notes. Clear ideas. No noise."
      />

      <CTABand title="Want this thinking applied to your brand?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

