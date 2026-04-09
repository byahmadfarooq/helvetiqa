import { CTABand } from "@/components/sections/CTABand";
import { ContactForm } from "@/components/forms/ContactForm";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({
    title: "Work With Us",
    description: "Tell us what you need. We will reply fast.",
    path: "/work-with-us",
  });

export default function WorkWithUsPage() {
  return (
    <main id="main" className="bg-bg">
      <section className="dot-grid bg-bg py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">Work With Us</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Send details. Pick services. Book a call if you want to move today.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl leading-none tracking-tight md:text-4xl">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                We read every message. If it is a fit, we reply with next steps.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl leading-none tracking-tight md:text-4xl">Book a Call</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                Use the calendar to pick a time. Thirty minutes. No prep work.
              </p>
              <div className="mt-6 overflow-hidden rounded-none border border-black/10 bg-white">
                <iframe
                  title="Book a call"
                  src="https://cal.com/ahmad-farooq-tuwcnw/30min?layout=month_view"
                  className="h-[760px] w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmailCapture
        source="packages_email_capture"
        title="Want the packages breakdown?"
        subtitle="We will send a short note on what we do and how we price."
      />

      <CTABand title="If you want speed and clarity, this is the move." ctaLabel="Book a Call" href="/work-with-us" />
    </main>
  );
}

