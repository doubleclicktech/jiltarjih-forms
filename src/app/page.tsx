import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedTeamsSection } from "@/components/sections/FeaturedTeamsSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <TracksSection />
      <FeaturedProjectsSection />
      <FeaturedTeamsSection />
      <RegistrationSection />
    </>
  );
}

