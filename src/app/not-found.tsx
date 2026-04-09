import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({
    title: "Not Found",
    description: "The page you tried to open does not exist.",
    path: "/404",
  });

export default function NotFound() {
  return (
    <main id="main" className="dot-grid bg-bg">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">404</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/75 md:text-base">
          That page is not here.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

