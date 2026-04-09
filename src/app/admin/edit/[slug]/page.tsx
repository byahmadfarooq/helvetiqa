import { githubGetPost } from "@/app/admin/actions";
import { PostEditor } from "@/components/admin/PostEditor";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export const generateMetadata = ({ params }: { params: { slug: string } }) =>
  pageMetadata({
    title: "Edit Post",
    description: "Edit a post.",
    path: `/admin/edit/${params.slug}`,
    noindex: true,
  });

export default async function AdminEditPostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await githubGetPost(params.slug);
    return (
      <main id="main" className="dot-grid bg-bg">
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-7xl">Edit Post</h1>
          <p className="mt-4 text-sm leading-relaxed text-black/75">Update content and save.</p>
          <div className="mt-10">
            <PostEditor
              mode="edit"
              initial={{
                title: post.data.title,
                slug: post.data.slug,
                date: post.data.date,
                excerpt: post.data.excerpt,
                category: post.data.category,
                body: post.body,
                published: Boolean(post.data.published),
                sha: post.sha,
              }}
            />
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}

