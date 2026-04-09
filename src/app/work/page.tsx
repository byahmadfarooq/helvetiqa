import { CTABand } from "@/components/sections/CTABand";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { pageMetadata } from "@/lib/seo";
import { work } from "@/lib/site";

export const generateMetadata = () =>
  pageMetadata({
    title: "Work",
    description: "Case studies with clear metrics and clean execution.",
    path: "/work",
  });

export default function WorkPage() {
  return (
    <main id="main" className="bg-white">
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">Work</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Real work. Clear wins. No inflated claims.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {work.map((c) => (
              <TransitionLink
                key={c.slug}
                href={`/work/${c.slug}`}
                className="block rounded-none border border-black/10 bg-white p-6 transition-transform duration-200 ease-out hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-sm tracking-wide text-black/60">{c.category}</p>
                    <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">{c.client}</p>
                    <p className="mt-3 font-display text-xl tracking-wide text-orange">{c.metric}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-none border border-black/10 bg-bg text-sm"
                  >
                    →
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-black/75">{c.description}</p>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Want your next case study here?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

