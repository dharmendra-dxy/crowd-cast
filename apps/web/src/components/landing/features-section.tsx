import { Section, SectionHeading } from "@/components/common/section";
import { FEATURES } from "@/constants/landing.constant";
import { LANDING_ANCHORS } from "@/constants/routes.constant";

export function FeaturesSection() {
  return (
    <Section id={LANDING_ANCHORS.FEATURES}>
      <SectionHeading
        eyebrow={FEATURES.EYEBROW}
        title={FEATURES.TITLE}
        description={FEATURES.DESCRIPTION}
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.ITEMS.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
              <feature.icon className="size-5" />
            </span>
            <h3 className="font-heading text-base font-semibold">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
