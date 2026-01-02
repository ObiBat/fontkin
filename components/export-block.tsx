"use client";

import { CopyIconButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface ExportBlockProps {
  title: string;
  code: string;
  language?: string;
  className?: string;
}

export function ExportBlock({
  title,
  code,
  language = "plaintext",
  className,
}: ExportBlockProps) {
  return (
    <div className={cn("rounded-lg border bg-muted/30", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-sm font-medium text-subhead">{title}</span>
        <CopyIconButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

// AI Prompt specific export block with special styling
interface AIPromptBlockProps {
  title: string;
  description?: string;
  prompt: string;
  className?: string;
}

export function AIPromptBlock({
  title,
  description,
  prompt,
  className,
}: AIPromptBlockProps) {
  return (
    <div className={cn("rounded-lg border border-primary/20 bg-primary/5", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          {description && (
            <p className="text-xs text-body mt-0.5">{description}</p>
          )}
        </div>
        <CopyIconButton text={prompt} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm whitespace-pre-wrap font-mono leading-relaxed">
        {prompt}
      </pre>
    </div>
  );
}
