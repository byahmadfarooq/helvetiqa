import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CursorProvider } from "@/components/layout/CursorProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteUrl } from "@/lib/site";

const fontDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Helvetiqa",
  description: "Helvetiqa builds connected systems that turn attention into booked calls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="min-h-dvh bg-bg font-body text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-none focus:bg-lime focus:px-4 focus:py-3 focus:font-display focus:text-sm focus:tracking-wide focus:text-text"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <CursorProvider>
            <Header />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </CursorProvider>
        </LenisProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
