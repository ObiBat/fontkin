"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, GitCompare, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Toast types
type ToastType = "success" | "info" | "favorite" | "compare" | "milestone";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  // Convenience methods
  showFavoriteAdded: (name: string, count: number) => void;
  showFavoriteRemoved: (name: string) => void;
  showCompareAdded: (name: string, count: number) => void;
  showCompareRemoved: (name: string) => void;
  showCompareFull: () => void;
  showMilestone: (type: "favorites" | "compare", count: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast icons
const toastIcons: Record<ToastType, ReactNode> = {
  success: <Check className="h-4 w-4" />,
  info: <Sparkles className="h-4 w-4" />,
  favorite: <Heart className="h-4 w-4 fill-current" />,
  compare: <GitCompare className="h-4 w-4" />,
  milestone: <Sparkles className="h-4 w-4" />,
};

// Toast colors - Premium monochrome
const toastStyles: Record<ToastType, string> = {
  success: "bg-card border-border text-foreground",
  info: "bg-card border-border text-foreground",
  favorite: "bg-card border-border text-foreground",
  compare: "bg-card border-border text-foreground",
  milestone: "bg-foreground border-foreground text-background",
};

const iconBgStyles: Record<ToastType, string> = {
  success: "bg-foreground",
  info: "bg-foreground/80",
  favorite: "bg-foreground",
  compare: "bg-foreground",
  milestone: "bg-background",
};

// Single Toast Component
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "relative flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm",
        "bg-background/95",
        toast.type === "milestone" ? "border-amber-500/30" : "border-border"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white",
          iconBgStyles[toast.type]
        )}
      >
        {toastIcons[toast.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-caption mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <Link
            href={toast.action.href}
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground mt-2 hover:underline underline-offset-2"
            onClick={onRemove}
          >
            {toast.action.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 rounded-full text-caption hover:text-foreground hover:bg-muted transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Progress bar for auto-dismiss */}
      {toast.duration && (
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 rounded-full",
            iconBgStyles[toast.type]
          )}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

// Toast Provider
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration ?? 4000 };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    if (newToast.duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Convenience methods
  const showFavoriteAdded = useCallback((name: string, count: number) => {
    addToast({
      type: "favorite",
      title: "Added to Favorites",
      description: `${name} saved`,
      action: count >= 3 ? { label: "View all favorites", href: "/favorites" } : undefined,
    });
  }, [addToast]);

  const showFavoriteRemoved = useCallback((name: string) => {
    addToast({
      type: "info",
      title: "Removed from Favorites",
      description: name,
      duration: 2500,
    });
  }, [addToast]);

  const showCompareAdded = useCallback((name: string, count: number) => {
    addToast({
      type: "compare",
      title: `Added to Compare (${count}/3)`,
      description: name,
      action: count === 3 ? { label: "Compare now", href: "/compare" } : undefined,
    });
  }, [addToast]);

  const showCompareRemoved = useCallback((name: string) => {
    addToast({
      type: "info",
      title: "Removed from Compare",
      description: name,
      duration: 2500,
    });
  }, [addToast]);

  const showCompareFull = useCallback(() => {
    addToast({
      type: "compare",
      title: "Compare is Full",
      description: "Remove one to add another",
      action: { label: "Go to Compare", href: "/compare" },
    });
  }, [addToast]);

  const showMilestone = useCallback((type: "favorites" | "compare", count: number) => {
    if (type === "favorites" && count === 3) {
      addToast({
        type: "milestone",
        title: "Nice collection!",
        description: `You have ${count} favorites saved`,
        action: { label: "View your favorites", href: "/favorites" },
        duration: 5000,
      });
    } else if (type === "compare" && count === 3) {
      addToast({
        type: "milestone",
        title: "Ready to compare!",
        description: "You've selected 3 combos",
        action: { label: "Compare them now", href: "/compare" },
        duration: 5000,
      });
    }
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showFavoriteAdded,
        showFavoriteRemoved,
        showCompareAdded,
        showCompareRemoved,
        showCompareFull,
        showMilestone,
      }}
    >
      {children}

      {/* Toast Container - bottom right, above floating compare bar */}
      <div className="fixed bottom-24 right-6 z-[100] flex flex-col-reverse gap-2 w-full max-w-sm pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
