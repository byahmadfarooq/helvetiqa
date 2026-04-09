import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";
import { work } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return work.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = work.find((c) => c.slug === params.slug);
  if (!caseStudy) {
    return pageMetadata({
      title: "Case Study",
      description: "Case study details.",
      path: `/work/${params.slug}`,
    });
  }

  return pageMetadata({
    title: caseStudy.client,
    description: `${caseStudy.category}. ${caseStudy.metric}.`,
    path: `/work/${caseStudy.slug}`,
  });
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const caseStudy = work.find((c) => c.slug === params.slug);
  if (!caseStudy) notFound();

  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-sm tracking-wide text-black/60">{caseStudy.category}</p>
          <h1 className="mt-3 font-display text-6xl leading-none tracking-tight md:text-8xl">{caseStudy.client}</h1>
          <p className="mt-5 font-display text-2xl tracking-wide text-orange md:text-3xl">{caseStudy.metric}</p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-black/75 md:text-base">{caseStudy.description}</p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Challenge</h2>
              <p className="mt-5 text-sm leading-relaxed text-black/75 md:text-base">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Approach</h2>
              <ul role="list" className="mt-5 space-y-3">
                {caseStudy.approach.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-black/75 md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Results</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {caseStudy.results.map((r) => (
              <div key={r.label} className="rounded-none border border-black/10 bg-white p-6">
                <p className="font-display text-sm tracking-wide text-black/60">{r.label}</p>
                <p className="mt-3 font-display text-5xl leading-none tracking-tight text-text">{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Want a system like this?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

