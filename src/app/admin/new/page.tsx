import { PostEditor } from "@/components/admin/PostEditor";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({
    title: "New Post",
    description: "Create a new post.",
    path: "/admin/new",
    noindex: true,
  });

export default function AdminNewPostPage() {
  return (
    <main id="main" className="dot-grid bg-bg">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <h1 className="font-display text-6xl leading-none tracking-tight md:text-7xl">New Post</h1>
        <p className="mt-4 text-sm leading-relaxed text-black/75">Write it. Publish when ready.</p>
        <div className="mt-10">
          <PostEditor mode="new" />
        </div>
      </section>
    </main>
  );
}

