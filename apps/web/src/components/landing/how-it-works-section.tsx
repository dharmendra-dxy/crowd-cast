import Image from "next/image";
import { LightbulbIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/section";
import { IMAGE_DIMENSIONS } from "@/constants/images.constant";
import { HOW_IT_WORKS } from "@/constants/landing.constant";
import { LANDING_ANCHORS } from "@/constants/routes.constant";

export function HowItWorksSection() {
  return (
    <Section id={LANDING_ANCHORS.HOW_IT_WORKS} tone="muted">
      <SectionHeading
        eyebrow={HOW_IT_WORKS.EYEBROW}
        title={HOW_IT_WORKS.TITLE}
        description={HOW_IT_WORKS.DESCRIPTION}
      />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <ol className="flex flex-col gap-4">
          {HOW_IT_WORKS.STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border bg-background p-5 sm:p-6"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 font-heading text-sm font-semibold text-brand">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
                  <step.icon className="size-4 text-brand" />
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}

          <li className="flex gap-4 rounded-2xl border border-dashed border-brand/40 bg-brand/5 p-5 sm:p-6">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-brand">
              <LightbulbIcon className="size-4" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-sm font-semibold">
                {HOW_IT_WORKS.TIP.TITLE}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {HOW_IT_WORKS.TIP.DESCRIPTION}
              </p>
            </div>
          </li>
        </ol>

        <div className="relative lg:sticky lg:top-24">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklch,var(--brand)_18%,transparent),transparent)]"
          />
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-brand/5">
            <Image
              src={HOW_IT_WORKS.IMAGE}
              alt="CrowdCast voting screen on a phone showing a 1 to 10 rating scale"
              width={IMAGE_DIMENSIONS.MOBILE_VOTE.width}
              height={IMAGE_DIMENSIONS.MOBILE_VOTE.height}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
