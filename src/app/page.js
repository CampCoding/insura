import AboutSection from "@/components/home/AboutSection";
import ClinicalBand from "@/components/home/ClinicalBand";
import ContactCta from "@/components/home/ContactCta";
import CoursesPreview from "@/components/home/CoursesPreview";
import DifferentiatorsSection from "@/components/home/DifferentiatorsSection";
import Hero from "@/components/home/Hero";
import IncludesSection from "@/components/home/IncludesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DifferentiatorsSection />
      <ClinicalBand />
      <CoursesPreview />
      <IncludesSection />
      <ContactCta />
    </>
  );
}
