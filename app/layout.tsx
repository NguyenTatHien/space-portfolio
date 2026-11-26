import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Background } from "@/components/sections/background";
import { Footer } from "@/components/sections/contact";
import { Navbar } from "@/components/sections/navbar";
import { PROFILE } from "@/constants/profile";
import { LanguageProvider } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin", "vietnamese"], variable: "--font-space-grotesk", display: "swap" });
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-jetbrains", display: "swap" });

const title = `${PROFILE.name} | Full-stack Developer`;
const description =
  "Full-stack developer in Ho Chi Minh City. React, Next.js, Laravel, NestJS and practical AI (RAG). I turn paper forms and spreadsheets into web systems businesses rely on every day.";

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.site),
  title: { default: title, template: `%s | ${PROFILE.name}` },
  description,
  applicationName: "Hien Nguyen Portfolio",
  authors: [{ name: PROFILE.name, url: PROFILE.site }],
  creator: PROFILE.name,
  keywords: [
    "Nguyễn Tất Hiển", "Nguyen Tat Hien", "Hien Nguyen", "full-stack developer", "React", "Next.js",
    "Laravel", "NestJS", "TypeScript", "RAG", "portfolio", "Ho Chi Minh City",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: PROFILE.site,
    siteName: "Hien Nguyen",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.shortName,
  jobTitle: "Full-stack Developer",
  url: PROFILE.site,
  email: `mailto:${PROFILE.email}`,
  image: `${PROFILE.site}${PROFILE.avatar}`,
  address: { "@type": "PostalAddress", addressLocality: "Ho Chi Minh City", addressCountry: "VN" },
  sameAs: [PROFILE.github, PROFILE.linkedin],
  knowsAbout: ["React", "Next.js", "TypeScript", "Laravel", "NestJS", "Node.js", "MySQL", "Docker", "RAG"],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn(display.variable, sans.variable, mono.variable)} suppressHydrationWarning>
      <body className="min-h-svh overflow-x-hidden">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          <Background />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
