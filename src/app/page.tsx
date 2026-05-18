import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedTeamsSection } from "@/components/sections/FeaturedTeamsSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <FeaturedProjectsSection />
      <FeaturedTeamsSection />
      <RegistrationSection />
    </>
  );
}

