import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StartHereSection } from "@/components/start-here-section"
import { HowItWorks } from "@/components/how-it-works"
import { SolutionFeatures } from "@/components/solution-features"
import { OurDifference } from "@/components/our-difference"
import { ImplementationProcess } from "@/components/implementation-process"
import { BenefitsSection } from "@/components/benefits-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StartHereSection />
        <HowItWorks />
        <SolutionFeatures />
        <OurDifference />
        <ImplementationProcess />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
