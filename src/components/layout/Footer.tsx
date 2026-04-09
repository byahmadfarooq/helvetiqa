import { socialLinks } from "@/lib/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-dark text-white" data-theme="dark">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <TransitionLink href="/" aria-label="Helvetiqa home" className="inline-flex items-center">
              <Logo className="text-white" />
            </TransitionLink>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Helvetiqa builds connected systems that turn attention into booked calls. Content, funnels, ads, and web.
              One stack. One direction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-sm tracking-wide text-white/70">Navigate</p>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <TransitionLink className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/services">
                    Services
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/work">
                    Work
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/about">
                    About
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/blog">
                    Blog
                  </TransitionLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm tracking-wide text-white/70">Contact</p>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a
                    className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    href={`mailto:${socialLinks.email}`}
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <TransitionLink className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime" href="/work-with-us">
                    Work With Us
                  </TransitionLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm tracking-wide text-white/70">Social</p>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a
                    className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-white hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Helvetiqa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

