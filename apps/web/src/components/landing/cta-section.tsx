import Image from "next/image";
import Link from "next/link";
import { QrCodeIcon } from "lucide-react";

import { Container } from "@/components/common/section";
import { buttonVariants } from "@/components/ui/button";
import { CTA } from "@/constants/landing.constant";
import { IMAGE_DIMENSIONS, IMAGES } from "@/constants/images.constant";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <Container className="py-16 sm:py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-center text-background sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,color-mix(in_oklch,var(--brand)_45%,transparent),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-16 size-64 rounded-full bg-accent-alt/25 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/10 px-3 py-1.5 text-xs font-medium text-background/80">
            <QrCodeIcon className="size-3.5" />
            {CTA.EYEBROW}
          </span>

          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {CTA.TITLE}
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-pretty text-background/70">
            {CTA.DESCRIPTION}
          </p>

          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href={CTA.PRIMARY_CTA.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full bg-background px-6 text-base text-foreground hover:bg-background/90 sm:w-auto"
              )}
            >
              {CTA.PRIMARY_CTA.label}
            </Link>
            <Link
              href={CTA.SECONDARY_CTA.href}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-11 w-full border-background/25 bg-transparent px-6 text-base text-background hover:bg-background/10 hover:text-background sm:w-auto"
              )}
            >
              {CTA.SECONDARY_CTA.label}
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-background/15 bg-background/5 p-3 pr-5">
            <Image
              src={IMAGES.PLACEHOLDERS.QR_CODE}
              alt="QR code placeholder linking to a CrowdCast event"
              width={IMAGE_DIMENSIONS.QR_CODE.width}
              height={IMAGE_DIMENSIONS.QR_CODE.height}
              className="size-16 rounded-lg"
            />
            <p className="text-left text-xs leading-snug text-background/70">
              Print this code once. It is the same link your whole audience
              uses for every round of the event.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
