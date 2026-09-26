import Image from "next/image";
import Link from "next/link";
import { CheckIcon, SparklesIcon, UsersIcon, VoteIcon } from "lucide-react";

import { Container } from "@/components/common/section";
import { buttonVariants } from "@/components/ui/button";
import { IMAGE_DIMENSIONS, IMAGES } from "@/constants/images.constant";
import { HERO } from "@/constants/landing.constant";
import { cn } from "@/lib/utils";

const FLOATING_BADGES = [
  {
    label: "248 votes in",
    icon: VoteIcon,
    className: "top-6 -left-4 hidden sm:flex",
  },
  {
    label: "312 connected",
    icon: UsersIcon,
    className: "right-4 -bottom-5 hidden sm:flex",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--brand)_16%,transparent),transparent)]"
      />
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <Link
            href={HERO.SECONDARY_CTA.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground",
              "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            )}
          >
            <SparklesIcon className="size-3.5 text-brand" />
            {HERO.EYEBROW}
          </Link>

          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {HERO.TITLE}{" "}
            <span className="bg-linear-to-r from-brand to-accent-alt bg-clip-text text-transparent">
              {HERO.TITLE_ACCENT}
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {HERO.DESCRIPTION}
          </p>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href={HERO.PRIMARY_CTA.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full px-6 text-base sm:w-auto"
              )}
            >
              {HERO.PRIMARY_CTA.label}
            </Link>
            <Link
              href={HERO.SECONDARY_CTA.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 w-full px-6 text-base sm:w-auto"
              )}
            >
              {HERO.SECONDARY_CTA.label}
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {HERO.HIGHLIGHTS.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <CheckIcon className="size-4 text-brand" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div
            aria-hidden
            className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-brand/5">
            <Image
              src={IMAGES.PLACEHOLDERS.DASHBOARD_HERO}
              alt="CrowdCast organizer dashboard showing live vote totals, running average and a round timer"
              width={IMAGE_DIMENSIONS.DASHBOARD_HERO.width}
              height={IMAGE_DIMENSIONS.DASHBOARD_HERO.height}
              priority
              className="w-full"
            />
          </div>

          {FLOATING_BADGES.map((badge) => (
            <div
              key={badge.label}
              className={cn(
                "absolute items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur",
                badge.className
              )}
            >
              <badge.icon className="size-3.5 text-brand" />
              {badge.label}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
