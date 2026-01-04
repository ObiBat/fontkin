import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { fontVariables, spaceGrotesk } from "@/lib/fonts";
import { fontIdToVariable } from "@/lib/fonts";
import { Header } from "@/components/header";
import { DonateButton } from "@/components/donate-button";
import { ToastProvider } from "@/components/toast";
import { AppStateProvider } from "@/contexts/app-state";
import { Analytics } from "@/components/analytics";
import {
  WebsiteSchema,
  OrganizationSchema,
  SoftwareApplicationSchema,
  FAQSchema,
} from "@/components/structured-data";
import "./globals.css";

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Fontkin | Professional Font Pairing Lab",
    template: "%s | Fontkin",
  },
  description:
    "Stop guessing font pairings. Explore curated, professional combinations with real web + editorial previews, smart filters, and one-click developer + AI-friendly exports.",
  keywords: [
    "typography",
    "font pairing",
    "web fonts",
    "google fonts",
    "design system",
    "tailwind",
    "css",
    "fontkin",
    "font combinations",
    "type pairing",
    "web typography",
    "ui fonts",
  ],
  metadataBase: new URL("https://fontkin.com"),
  alternates: {
    canonical: "https://fontkin.com",
  },
  openGraph: {
    title: "Fontkin | Professional Font Pairing Lab",
    description: "Stop guessing font pairings. Explore curated, professional combinations with real previews and one-click exports.",
    url: "https://fontkin.com",
    siteName: "Fontkin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fontkin | Professional Font Pairing Lab",
    description: "Stop guessing font pairings. Explore curated, professional combinations with real previews and one-click exports.",
    creator: "@obibatbileg",
    site: "@obibatbileg",
  },
  authors: [{ name: "Obi Batbileg", url: "https://obicreative.dev" }],
  creator: "Obi Batbileg",
  publisher: "Fontkin",
  category: "Design Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "I2FmlCM9-12uCHuOi9aMrCnNFzvwTH8xLCwk5jMVBBY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <WebsiteSchema />
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <FAQSchema />

        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={`${fontVariables} ${spaceGrotesk.className} antialiased`}>
        {/* Analytics - loads after page interactive */}
        <Analytics />

        <ToastProvider>
          <AppStateProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="border-t">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
                  {/* Donation Banner */}
                  <div className="mb-10 md:mb-12 p-5 sm:p-6 md:p-8 border border-dashed rounded-xl sm:rounded-2xl bg-muted/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6">
                      <div>
                        <p
                          className="text-base sm:text-lg uppercase tracking-wide mb-1.5 sm:mb-2"
                          style={{ fontFamily: fontIdToVariable["anton"] }}
                        >
                          Free Forever
                        </p>
                        <p className="text-xs sm:text-sm text-body max-w-md">
                          Fontkin is free to use. If it helps your work, consider buying me a coffee to keep the project alive.
                        </p>
                      </div>
                      <DonateButton variant="footer" />
                    </div>
                  </div>

                  {/* Footer Content */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 md:col-span-1">
                      <p
                        className="text-lg sm:text-xl uppercase tracking-wide mb-2 sm:mb-3"
                        style={{ fontFamily: fontIdToVariable["anton"] }}
                      >
                        Fontkin
                      </p>
                      <p className="text-xs sm:text-sm text-caption leading-relaxed max-w-xs">
                        Curated font pairings for the modern web. Find your fonts&apos; perfect kin.
                      </p>
                    </div>

                    {/* Navigation */}
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider text-caption mb-3 sm:mb-4">Navigate</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
                        <Link href="/explore" className="text-body hover:text-foreground transition-colors py-1">
                          Explore
                        </Link>
                        <Link href="/builder" className="text-body hover:text-foreground transition-colors py-1">
                          Builder
                        </Link>
                        <Link href="/favorites" className="text-body hover:text-foreground transition-colors py-1">
                          Favorites
                        </Link>
                        <Link href="/compare" className="text-body hover:text-foreground transition-colors py-1">
                          Compare
                        </Link>
                      </div>
                    </div>

                    {/* About / Creator */}
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider text-caption mb-3 sm:mb-4">Creator</p>
                      <p className="text-xs sm:text-sm text-body leading-relaxed mb-3 sm:mb-4">
                        Built by <span className="text-foreground font-medium">Obi Batbileg</span>, a designer and developer passionate about typography.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <a
                          href="https://obicreative.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] sm:text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors py-1"
                        >
                          → Portfolio
                        </a>
                        <a
                          href="https://x.com/obibatbileg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] sm:text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors py-1"
                        >
                          Twitter
                        </a>
                        <a
                          href="https://github.com/ObiBat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] sm:text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors py-1"
                        >
                          GitHub
                        </a>
                      </div>
                      <div className="pt-3 border-t border-dashed">
                        <p className="text-[10px] sm:text-xs text-caption mb-1.5 sm:mb-2">Open for feedback</p>
                        <a
                          href="mailto:obi@craefto.com"
                          className="text-xs sm:text-sm text-foreground hover:opacity-70 transition-opacity"
                        >
                          obi@craefto.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="mt-10 md:mt-12 pt-5 md:pt-6 border-t text-[10px] sm:text-xs text-caption">
                    <p>© {new Date().getFullYear()} Fontkin. Made with love for designers & developers.</p>
                  </div>
                </div>
              </footer>
            </div>
          </AppStateProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
