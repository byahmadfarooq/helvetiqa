"use client";

import { services } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "./Logo";
import { TransitionLink } from "@/components/ui/TransitionLink";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <TransitionLink
      href={href}
      onClick={() => onClick?.()}
      className={cn(
        "relative inline-flex items-center font-display text-lg tracking-wide text-text",
        "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-text after:transition-transform after:duration-200 after:ease-out",
        "hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange",
        active && "after:scale-x-100"
      )}
    >
      {label}
    </TransitionLink>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const serviceItems = useMemo(() => {
    return services.map((s) => ({ slug: s.slug, name: s.name }));
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[9997] bg-bg",
        isScrolled && "border-b border-black/[0.08]"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <TransitionLink href="/" aria-label="Helvetiqa home" className="inline-flex items-center">
          <Logo />
        </TransitionLink>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary navigation">
          <NavLink href="/work-with-us" label="Work With Us" />

          <div className="relative">
            <button
              type="button"
              className={cn(
                "relative inline-flex items-center gap-2 font-display text-lg tracking-wide text-text",
                "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-text after:transition-transform after:duration-200 after:ease-out",
                "hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              )}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <span aria-hidden="true" className={cn("text-xs", servicesOpen && "rotate-180")}>
                ▼
              </span>
            </button>

            {servicesOpen && (
              <div
                role="menu"
                className="absolute left-0 top-[calc(100%+14px)] w-[260px] border border-black/10 bg-white p-2"
              >
                <ul role="list" className="flex flex-col">
                  {serviceItems.map((item) => (
                    <li key={item.slug}>
                      <TransitionLink
                        href={`/services/${item.slug}`}
                        className="block rounded-none px-3 py-2 font-body text-sm text-text hover:bg-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.name}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <NavLink href="/work" label="Work" />
          <NavLink href="/blog" label="Blog" />
          <NavLink href="/about" label="About" />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <TransitionLink
            href="/work-with-us"
            className="inline-flex items-center justify-center rounded-none bg-lime px-5 py-3 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            Book a Call
          </TransitionLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-none border border-black/10 bg-white px-4 py-3 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-dark text-white"
          data-theme="dark"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <TransitionLink
              href="/"
              aria-label="Helvetiqa home"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center"
            >
              <Logo className="text-white" />
            </TransitionLink>
            <button
              type="button"
              className="rounded-none border border-white/20 bg-transparent px-4 py-3 font-display text-lg tracking-wide text-white transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="px-6 pb-10 pt-10">
            <ul role="list" className="flex flex-col gap-6">
              <li>
                <NavLink href="/work-with-us" label="Work With Us" onClick={() => setMobileOpen(false)} />
              </li>
              <li className="pt-4">
                <p className="font-display text-sm tracking-wide text-white/70">Services</p>
                <ul role="list" className="mt-4 flex flex-col gap-4">
                  {serviceItems.map((item) => (
                    <li key={item.slug}>
                      <TransitionLink
                        href={`/services/${item.slug}`}
                        className="font-display text-3xl tracking-wide text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="pt-6">
                <NavLink href="/work" label="Work" onClick={() => setMobileOpen(false)} />
              </li>
              <li>
                <NavLink href="/blog" label="Blog" onClick={() => setMobileOpen(false)} />
              </li>
              <li>
                <NavLink href="/about" label="About" onClick={() => setMobileOpen(false)} />
              </li>
              <li className="pt-6">
                <TransitionLink
                  href="/work-with-us"
                  className="inline-flex w-full items-center justify-center rounded-none bg-lime px-5 py-4 font-display text-xl tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Call
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
