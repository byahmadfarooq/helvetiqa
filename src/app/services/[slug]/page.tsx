import { Chip } from "@/components/ui/Chip";
import { CTABand } from "@/components/sections/CTABand";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { pageMetadata } from "@/lib/seo";
import { services, work } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return pageMetadata({ title: "Service", description: "Service details.", path: `/services/${params.slug}` });

  return pageMetadata({
    title: service.name,
    description: service.oneLiner,
    path: `/services/${service.slug}`,
  });
}

function CaseCard({
  slug,
  client,
  category,
  metric,
  description,
}: {
  slug: string;
  client: string;
  category: string;
  metric: string;
  description: string;
}) {
  return (
    <TransitionLink
      href={`/work/${slug}`}
      className="block rounded-none border border-black/10 bg-white p-6 transition-transform duration-200 ease-out hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <p className="font-display text-sm tracking-wide text-black/60">{category}</p>
      <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">{client}</p>
      <p className="mt-3 font-display text-xl tracking-wide text-orange">{metric}</p>
      <p className="mt-4 text-sm leading-relaxed text-black/75">{description}</p>
    </TransitionLink>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const related = work.filter((c) => service.relatedWork.includes(c.slug)).slice(0, 2);

  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-sm tracking-wide text-black/60">Service</p>
          <h1 className="mt-3 font-display text-6xl leading-none tracking-tight md:text-8xl">{service.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">{service.oneLiner}</p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Deliverables</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Process</h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-5" role="list">
            {service.process.map((step, idx) => (
              <li key={step.title} className="rounded-none border border-black/10 bg-white p-5">
                <p className="font-display text-sm tracking-wide text-black/60">{String(idx + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-2xl leading-none tracking-tight">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Relevant Work</h2>
              <TransitionLink
                href="/work"
                className="font-display text-lg tracking-wide text-text underline decoration-black/20 underline-offset-4 hover:decoration-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                View all →
              </TransitionLink>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((c) => (
                <CaseCard
                  key={c.slug}
                  slug={c.slug}
                  client={c.client}
                  category={c.category}
                  metric={c.metric}
                  description={c.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand title="Want this service built for your brand?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

