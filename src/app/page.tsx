import { Reveal } from "@/components/animation/Reveal";
import { TickerStrip } from "@/components/animation/TickerStrip";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { CTABand } from "@/components/sections/CTABand";
import { ServiceRows } from "@/components/services/ServiceRows";
import { ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { pageMetadata } from "@/lib/seo";
import { work } from "@/lib/site";

export const generateMetadata = () =>
  pageMetadata({
    title: "Home",
    description: "Helvetiqa builds the systems that turn your brand into booked calls.",
    path: "/",
  });

function Card({
  href,
  tag,
  title,
  metric,
  body,
}: {
  href: string;
  tag: string;
  title: string;
  metric: string;
  body: string;
}) {
  return (
    <TransitionLink
      href={href}
      className="group block rounded-none border border-black/10 bg-white p-6 transition-transform duration-200 ease-out hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <p className="font-display text-sm tracking-wide text-black/60">{tag}</p>
      <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">{title}</p>
      <p className="mt-3 font-display text-xl tracking-wide text-orange">{metric}</p>
      <p className="mt-4 text-sm leading-relaxed text-black/75">{body}</p>
      <p className="mt-6 font-display text-sm tracking-wide text-text">View</p>
    </TransitionLink>
  );
}

export default function HomePage() {
  const featured = work.slice(0, 3);

  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid min-h-[calc(100dvh-80px)] bg-bg py-20 md:py-32">
        <div className="mx-auto flex max-w-6xl flex-col justify-between px-6">
          <Reveal>
            <div className="max-w-4xl">
              <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">
                We build the systems that turn your brand into booked calls.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
                Content, funnels, ads, and web. Designed to connect. Built to ship fast. Measured by calls, not noise.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/work-with-us" variant="primary">
                  Work With Us
                </ButtonLink>
                <ButtonLink href="/work" variant="ghost">
                  See Our Work
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TickerStrip />

      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-none tracking-tight md:text-6xl">Services</h2>
            <TransitionLink
              href="/services"
              className="font-display text-lg tracking-wide text-text underline decoration-black/20 underline-offset-4 hover:decoration-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              See all services →
            </TransitionLink>
          </div>
          <div className="mt-10">
            <ServiceRows variant="preview" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-none tracking-tight md:text-6xl">Case Studies</h2>
            <TransitionLink
              href="/work"
              className="font-display text-lg tracking-wide text-text underline decoration-black/20 underline-offset-4 hover:decoration-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              View all work →
            </TransitionLink>
          </div>

          <Reveal stagger>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {featured.map((c) => (
                <Card
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  tag={c.category}
                  title={c.client}
                  metric={c.metric}
                  body={c.description}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-none tracking-tight md:text-6xl">About</h2>
            <TransitionLink
              href="/about"
              className="font-display text-lg tracking-wide text-text underline decoration-black/20 underline-offset-4 hover:decoration-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Meet the founders →
            </TransitionLink>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-none border border-black/10 bg-white p-6">
              <p className="font-display text-sm tracking-wide text-black/60">Ahmad</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-tight">Systems and strategy.</p>
              <p className="mt-4 text-sm leading-relaxed text-black/75">
                He designs the layer between ideas and execution. Positioning, content architecture, funnels, and
                internal tooling.
              </p>
            </div>
            <div className="rounded-none border border-black/10 bg-white p-6">
              <p className="font-display text-sm tracking-wide text-black/60">Shahid</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-tight">Growth and delivery.</p>
              <p className="mt-4 text-sm leading-relaxed text-black/75">
                He runs social and paid execution with clear reporting. The work stays consistent. The brand stays
                sharp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCapture source="home_email_capture" title="Get the playbooks." subtitle="Tight notes on content and conversion." />

      <CTABand title="Ready to turn attention into booked calls?" ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

