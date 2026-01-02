"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, GitCompare, X, Wand2, Menu } from "lucide-react";
import { DonateButton } from "@/components/donate-button";
import { fontIdToVariable } from "@/lib/fonts";
import { useFavorites, useComparison } from "@/contexts/app-state";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();
  const { compareCount, clearCompare } = useComparison();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "/explore", label: "Explore", icon: null },
    { href: "/builder", label: "Builder", icon: Wand2 },
    { href: "/favorites", label: "Favorites", icon: Heart, count: favoritesCount },
    { href: "/compare", label: "Compare", icon: GitCompare, count: compareCount },
  ];

  return (
    <>
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="h-14 md:h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg md:text-xl uppercase tracking-wide hover:opacity-70 transition-opacity"
              style={{ fontFamily: fontIdToVariable["anton"] }}
              onClick={closeMobileMenu}
            >
              Fontkin
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map(({ href, label, icon: Icon, count }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-[13px] uppercase tracking-[0.08em] transition-colors flex items-center gap-2 relative",
                    href === "/explore" ? "hover-underline" : "",
                    isActive(href) ? "text-foreground" : "text-caption hover:text-foreground"
                  )}
                >
                  {Icon && (
                    <motion.div
                      animate={count && count > 0 ? (href === "/favorites" ? { scale: [1, 1.15, 1] } : { rotate: [0, -8, 8, 0] }) : {}}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      key={count}
                    >
                      <Icon className={cn("h-3.5 w-3.5", count && count > 0 && "fill-foreground text-foreground")} />
                    </motion.div>
                  )}
                  <span className={Icon ? "hidden sm:inline" : ""}>{label}</span>
                  <AnimatePresence mode="popLayout">
                    {count !== undefined && count > 0 && (
                      <motion.span
                        key={`${href}-badge`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium bg-foreground text-background px-1 rounded-full"
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
              <DonateButton variant="nav" />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-3">
              {/* Quick access icons on mobile */}
              <Link href="/favorites" className="relative p-2">
                <Heart className={cn("h-5 w-5", favoritesCount > 0 ? "fill-foreground" : "text-caption")} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-medium bg-foreground text-background rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link href="/compare" className="relative p-2">
                <GitCompare className={cn("h-5 w-5", compareCount > 0 ? "text-foreground" : "text-caption")} />
                {compareCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-medium bg-foreground text-background rounded-full">
                    {compareCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden border-t bg-background overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(({ href, label, icon: Icon, count }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center justify-between py-3 px-3 rounded-xl transition-colors",
                        isActive(href) ? "bg-muted text-foreground" : "text-body hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="h-5 w-5" />}
                        <span className="text-[15px]">{label}</span>
                      </div>
                      {count !== undefined && count > 0 && (
                        <span className="text-xs font-medium bg-foreground text-background px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-3 border-t mt-3"
                >
                  <DonateButton variant="footer" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating compare bar - Premium style */}
      <AnimatePresence>
        {compareCount > 0 && pathname !== "/compare" && (
          <div className="fixed bottom-4 md:bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="pointer-events-auto w-full max-w-md md:max-w-none md:w-auto"
            >
              <div className="flex items-center justify-between md:justify-start gap-4 md:gap-6 px-5 md:px-8 py-3.5 md:py-4 bg-foreground text-background shadow-2xl border border-foreground rounded-full">
                <span className="text-[12px] md:text-[13px] uppercase tracking-[0.1em]">
                  {compareCount} {compareCount === 1 ? "combo" : "combos"}
                </span>
                <div className="hidden md:block w-px h-4 bg-background/20" />
                <Link
                  href="/compare"
                  className="text-[12px] md:text-[13px] uppercase tracking-[0.1em] hover:opacity-70 transition-opacity font-medium"
                >
                  Compare →
                </Link>
                <button
                  onClick={clearCompare}
                  className="p-1 hover:opacity-70 transition-opacity"
                  title="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
