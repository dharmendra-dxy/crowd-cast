import { InfoIcon, ShieldCheckIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { SECURITY } from "@/constants/landing.constant";
import { LANDING_ANCHORS } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

export function SecuritySection() {
  return (
    <Section id={LANDING_ANCHORS.SECURITY} tone="muted">
      <SectionHeading
        eyebrow={SECURITY.EYEBROW}
        title={SECURITY.TITLE}
        description={SECURITY.DESCRIPTION}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SECURITY.MODES.map((mode) => (
          <div
            key={mode.name}
            className={cn(
              "flex flex-col gap-4 rounded-2xl border bg-background p-6",
              mode.featured
                ? "border-brand/40 shadow-lg shadow-brand/5"
                : "border-border"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-base font-semibold">
                {mode.name}
              </h3>
              <Badge variant={mode.featured ? "default" : "secondary"}>
                {mode.badge}
              </Badge>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {mode.description}
            </p>

            <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
              {mode.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs text-foreground/80"
                >
                  <ShieldCheckIcon className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <ul className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6">
          {SECURITY.NOTES.map((note) => (
            <li key={note} className="flex items-start gap-2.5 text-sm">
              <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">{note}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-background p-6">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {SECURITY.DISCLAIMER}
          </p>
        </div>
      </div>
    </Section>
  );
}
