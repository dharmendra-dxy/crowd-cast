import { Section, SectionHeading } from "@/components/common/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants/landing.constant";
import { LANDING_ANCHORS } from "@/constants/routes.constant";

export function FaqSection() {
  return (
    <Section id={LANDING_ANCHORS.FAQ} tone="muted">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow={FAQ.EYEBROW}
          title={FAQ.TITLE}
          align="left"
          className="lg:sticky lg:top-24 lg:self-start"
        />

        <Accordion className="w-full">
          {FAQ.ITEMS.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-4 text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
