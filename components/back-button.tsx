"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const backHref = from === "home" ? "/" : "/explore";
  const backLabel = from === "home" ? "Back to Home" : "Back to Explore";

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 text-sm text-body hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {backLabel}
    </Link>
  );
}
