import { Chip } from "@/components/ui/Chip";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({
    title: "About",
    description: "Two founders. One obsession. Build systems that convert.",
    path: "/about",
  });

const ahmadSkills = [
  "LinkedIn Strategy",
  "Content Systems",
  "Brand Positioning",
  "React + Supabase",
  "Funnel Architecture",
  "Ghostwriting",
];

const shahidSkills = [
  "Social Media Management",
  "Paid Ads Meta + Google",
  "Community Strategy",
  "Campaign Management",
  "Brand Reputation",
];

export default function AboutPage() {
  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">
            Two founders. One obsession.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Build systems that make growth predictable. Content is not enough. Distribution is not enough. The stack has
            to connect.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-none border border-black/10 bg-white p-6">
              <p className="font-display text-sm tracking-wide text-black/60">Ahmad</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">
                Head of Systems & Strategy
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                The systems guy. Not the guy you call for updates.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-black/75">
                Ahmad has spent years obsessing over one question: why do good brands stay invisible? The answer is
                always the same. No system. Great content with no funnel. A strong offer with no distribution. A full
                pipeline with no process to close it. At Helvetiqa, he designs the infrastructure that connects
                everything. Brand positioning, content architecture, funnel builds, internal tooling, new product
                development. He works at the level most people skip: the layer between strategy and execution where
                things actually break.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ahmadSkills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div className="rounded-none border border-black/10 bg-white p-6">
              <p className="font-display text-sm tracking-wide text-black/60">Shahid</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">CEO</p>
              <p className="mt-5 text-sm leading-relaxed text-black/75">
                Shahid has three plus years in social media and digital marketing across UAE and Pakistan. He previously
                worked as Social Media and Sales Manager at The Rockets Consulting UAE. He runs delivery with clear
                priorities and clean reporting.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {shahidSkills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-4xl leading-none tracking-tight md:text-5xl">Origin</h2>
            <p className="mt-5 text-sm leading-relaxed text-black/75 md:text-base">
              Helvetiqa started as two roles that usually stay separated. Strategy on one side. Execution on the other.
              We saw the same pattern in every growing brand. Attention was there. Content was there. Revenue lagged.
              The missing piece was the connection between parts. So we built a studio around that layer.
            </p>
          </div>
        </div>
      </section>

      <CTABand title="If you want a system, not random wins, talk to us." ctaLabel="Work With Us" href="/work-with-us" />
    </main>
  );
}

