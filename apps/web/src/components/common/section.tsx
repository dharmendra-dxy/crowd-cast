import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

/** Centered, max-width wrapper used by every marketing section. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  className?: string;
  /** Tinted background to visually separate consecutive sections. */
  tone?: "default" | "muted";
  children: ReactNode;
};

const SECTION_TONES = {
  default: "",
  muted: "bg-muted/40",
} as const;

export function Section({ id, className, tone = "default", children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 sm:py-20 lg:py-28",
        SECTION_TONES[tone],
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
