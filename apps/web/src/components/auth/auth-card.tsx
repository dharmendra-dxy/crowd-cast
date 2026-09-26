import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
};

/** Headline + body + cross-link footer shared by both auth screens. */
export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {children}

      <p className="text-center text-sm text-muted-foreground">
        {footerText}{" "}
        <Link
          href={footerLinkHref}
          className={cn(
            "font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          )}
        >
          {footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
