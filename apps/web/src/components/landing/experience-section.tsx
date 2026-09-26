import Image from "next/image";
import { CheckIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/common/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EXPERIENCE } from "@/constants/landing.constant";
import { LANDING_ANCHORS } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <Section id={LANDING_ANCHORS.EXPERIENCE}>
      <SectionHeading
        eyebrow={EXPERIENCE.EYEBROW}
        title={EXPERIENCE.TITLE}
        description={EXPERIENCE.DESCRIPTION}
      />

      <Tabs defaultValue={EXPERIENCE.TABS[0].value} className="mt-10 gap-6">
        <TabsList
          variant="line"
          className="h-auto justify-start gap-1 overflow-x-auto p-0"
        >
          {EXPERIENCE.TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-9 shrink-0 gap-2 rounded-lg px-3"
            >
              <tab.icon className="size-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {EXPERIENCE.TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-balance">
                  {tab.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {tab.description}
                </p>
                <ul className="mt-1 flex flex-col gap-2.5">
                  {tab.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <CheckIcon className="size-3.5" />
                      </span>
                      <span className="text-foreground/85">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={cn(
                  "overflow-hidden rounded-2xl border border-border bg-muted/40",
                  tab.value === EXPERIENCE.VOTER_TAB
                    ? "max-w-[16rem] justify-self-center"
                    : ""
                )}
              >
                <Image
                  src={tab.image}
                  alt={tab.imageAlt}
                  width={tab.imageDimensions.width}
                  height={tab.imageDimensions.height}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
