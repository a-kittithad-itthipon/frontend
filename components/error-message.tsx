"use client";

import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-md border border-destructive/20 bg-destructive/10",
        "px-3 py-2 text-sm text-destructive/90",
        "leading-snug wrap-break-word",
        "animate-in fade-in slide-in-from-top-1",
        className,
      )}
    >
      {message}
    </p>
  );
}
