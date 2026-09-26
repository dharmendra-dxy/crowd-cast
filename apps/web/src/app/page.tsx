import { ComparisonSection } from "@/components/landing/comparison-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SecuritySection } from "@/components/landing/security-section";
import { StatsStrip } from "@/components/landing/stats-strip";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsStrip />
        <ComparisonSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ExperienceSection />
        <SecuritySection />
        <UseCasesSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
