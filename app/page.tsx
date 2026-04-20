import { Hero } from "@/components/home/Hero";
import { WhyExists } from "@/components/home/WhyExists";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { Comparison } from "@/components/home/Comparison";
import { MidCTA } from "@/components/home/MidCTA";
import { ValueCards } from "@/components/home/ValueCards";
import { SocialProof } from "@/components/home/SocialProof";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyExists />
      <HowItWorks />
      <Features />
      <Comparison />
      <MidCTA />
      <ValueCards />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
