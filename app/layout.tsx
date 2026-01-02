import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { fontVariables, spaceGrotesk } from "@/lib/fonts";
import { fontIdToVariable } from "@/lib/fonts";
import { Header } from "@/components/header";
import { ToastProvider } from "@/components/toast";
import { AppStateProvider } from "@/contexts/app-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "Typographica — Professional Font Pairing Lab",
  description:
    "Stop guessing font pairings. Explore curated, professional combinations with real web + editorial previews, smart filters, and one-click developer + AI-friendly exports.",
  keywords: ["typography", "font pairing", "web fonts", "google fonts", "design system", "tailwind", "css"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} ${spaceGrotesk.className} antialiased`}>
        <ToastProvider>
          <AppStateProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="border-t">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                  {/* Donation Banner */}
                  <div className="mb-12 p-6 md:p-8 border border-dashed rounded-2xl bg-muted/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <p
                          className="text-lg uppercase tracking-wide mb-2"
                          style={{ fontFamily: fontIdToVariable["anton"] }}
                        >
                          Free Forever
                        </p>
                        <p className="text-sm text-body max-w-md">
                          Typographica is free to use. If it helps your work, consider buying me a coffee to keep the project alive.
                        </p>
                      </div>
                      <a
                        href="https://buymeacoffee.com/obicreative"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
                      >
                        <Heart className="h-4 w-4" />
                        Support This Project
                      </a>
                    </div>
                  </div>

                  {/* Footer Content */}
                  <div className="grid md:grid-cols-3 gap-10 md:gap-8">
                    {/* Brand */}
                    <div>
                      <p
                        className="text-xl uppercase tracking-wide mb-3"
                        style={{ fontFamily: fontIdToVariable["anton"] }}
                      >
                        Typographica
                      </p>
                      <p className="text-sm text-caption leading-relaxed">
                        Curated font pairings for the modern web. Find the perfect typographic voice for your next project.
                      </p>
                    </div>

                    {/* Navigation */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-caption mb-4">Navigate</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <Link href="/explore" className="text-body hover:text-foreground transition-colors">
                          Explore
                        </Link>
                        <Link href="/builder" className="text-body hover:text-foreground transition-colors">
                          Builder
                        </Link>
                        <Link href="/favorites" className="text-body hover:text-foreground transition-colors">
                          Favorites
                        </Link>
                        <Link href="/compare" className="text-body hover:text-foreground transition-colors">
                          Compare
                        </Link>
                      </div>
                    </div>

                    {/* About / Creator */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-caption mb-4">Creator</p>
                      <p className="text-sm text-body leading-relaxed mb-4">
                        Built by <span className="text-foreground font-medium">Obi Batbileg</span> — a designer & developer passionate about typography and crafting beautiful digital experiences.
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href="https://obicreative.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors"
                        >
                          Portfolio →
                        </a>
                        <a
                          href="https://x.com/obibatbileg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors"
                        >
                          Twitter
                        </a>
                        <a
                          href="https://github.com/ObiBat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="mt-12 pt-6 border-t text-xs text-caption">
                    <p>© {new Date().getFullYear()} Typographica. Made with love for designers & developers.</p>
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
