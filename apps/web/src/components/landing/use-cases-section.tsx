import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/section";
import { buttonVariants } from "@/components/ui/button";
import { IMAGE_DIMENSIONS } from "@/constants/images.constant";
import { USE_CASES } from "@/constants/landing.constant";
import { ROUTES, LANDING_ANCHORS } from "@/constants/routes.constant";

export function UseCasesSection() {
  return (
    <Section id={LANDING_ANCHORS.USE_CASES}>
      <SectionHeading
        eyebrow={USE_CASES.EYEBROW}
        title={USE_CASES.TITLE}
        description={USE_CASES.DESCRIPTION}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {USE_CASES.ITEMS.map((item) => (
          <article
            key={item.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/30"
          >
            <div className="aspect-[64/42] w-full overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={IMAGE_DIMENSIONS.USE_CASE.width}
                height={IMAGE_DIMENSIONS.USE_CASE.height}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <Link
                href={ROUTES.SIGNUP}
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Start an event
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
