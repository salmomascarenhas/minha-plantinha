import { Box, Divider } from "@mantine/core";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSection } from "../components/landing/HeroSection";
import { PublicFooter } from "../components/landing/PublicFooter";

export function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <Divider my="md" />
      <FeaturesSection />
      <PublicFooter />
    </Box>
  );
}
