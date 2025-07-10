import { Box, Divider } from "@mantine/core";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSection } from "../components/landing/HeroSection";
import { PublicFooter } from "../components/landing/PublicFooter";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";

export function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <Divider my="md" />
      <FeaturesSection />
      <ShowcaseSection />
      <PublicFooter />
    </Box>
  );
}
