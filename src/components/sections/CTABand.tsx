import { ButtonLink } from "@/components/ui/Button";

export function CTABand({
  title,
  ctaLabel = "Work With Us",
  href = "/work-with-us",
}: {
  title: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <section className="bg-dark py-20 md:py-32" data-theme="dark">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-5xl leading-none tracking-tight text-white md:text-7xl">
            {title}
          </h2>
          <ButtonLink href={href} variant="primary" className="px-8">
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

