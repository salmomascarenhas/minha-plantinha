import { Box, Divider } from "@mantine/core";
import { FaqSection } from "../components/landing/FaqSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { FinalCtaSection } from "../components/landing/FinalCtaSection";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { PublicFooter } from "../components/landing/PublicFooter";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";

export function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <HowItWorksSection />
      <Divider my="md" />
      <FaqSection />
      <FinalCtaSection />
      <PublicFooter />
    </Box>
  );
}
