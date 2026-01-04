import Link from "next/link";
import { fontIdToVariable } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-caption mb-6">
        Page Not Found
      </p>
      <h1
        className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6"
        style={{ fontFamily: fontIdToVariable["playfair-display"], fontWeight: 500 }}
      >
        404
      </h1>
      <p className="text-lg text-body mb-10 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-foreground text-background text-sm uppercase tracking-wider rounded-md hover:bg-foreground/90 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/explore"
          className="px-6 py-3 border border-border text-sm uppercase tracking-wider rounded-md hover:border-foreground/30 transition-colors"
        >
          Explore Fonts
        </Link>
      </div>
    </div>
  );
}
