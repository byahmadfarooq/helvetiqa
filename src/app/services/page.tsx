import { CTABand } from "@/components/sections/CTABand";
import { ServiceRows } from "@/components/services/ServiceRows";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({
    title: "Services",
    description: "Seven services. One goal. Booked calls.",
    path: "/services",
  });

export default function ServicesPage() {
  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">Services</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Pick one service or combine a few. We keep the stack connected so results do not depend on luck.
          </p>
          <div className="mt-12">
            <ServiceRows variant="full" />
          </div>
        </div>
      </section>

      <CTABand title="If you want booked calls, start here." ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

