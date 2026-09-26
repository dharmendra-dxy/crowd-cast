import { Container } from "@/components/common/section";
import { STATS } from "@/constants/landing.constant";

export function StatsStrip() {
  return (
    <Container>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 bg-background px-4 py-8 text-center"
          >
            <span className="flex items-center gap-1.5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              <stat.icon className="size-5 text-brand sm:size-6" />
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </dl>
    </Container>
  );
}
