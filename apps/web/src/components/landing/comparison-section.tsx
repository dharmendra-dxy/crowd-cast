import { CheckIcon, XIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { COMPARISON } from "@/constants/landing.constant";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { ...COMPARISON.old, isWinner: false },
  { ...COMPARISON.new, isWinner: true },
];

export function ComparisonSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={COMPARISON.EYEBROW}
        title={COMPARISON.TITLE}
        description={COMPARISON.DESCRIPTION}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {COLUMNS.map((column) => (
          <div
            key={column.label}
            className={cn(
              "flex flex-col gap-6 rounded-2xl border p-6 sm:p-8",
              column.isWinner
                ? "border-brand/30 bg-card shadow-lg shadow-brand/5"
                : "border-border bg-background"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-lg font-semibold">
                {column.label}
              </h3>
              <Badge variant={column.isWinner ? "default" : "secondary"}>
                {column.isWinner ? "Built for live events" : "Limited"}
              </Badge>
            </div>

            <ul className="flex flex-col gap-4">
              {column.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                      column.isWinner
                        ? "bg-brand/10 text-brand"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {column.isWinner ? (
                      <CheckIcon className="size-3.5" />
                    ) : (
                      <XIcon className="size-3.5" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "leading-relaxed",
                      column.isWinner ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
