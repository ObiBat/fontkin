"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CopyButton({
  text,
  label = "Copy",
  className,
  variant = "outline",
  size = "sm",
}: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(text)}
      className={cn("gap-2", className)}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}

// Minimal icon-only version
export function CopyIconButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { copied, copy } = useCopy();

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        "p-2 rounded-md text-caption hover:text-foreground hover:bg-muted transition-colors",
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
