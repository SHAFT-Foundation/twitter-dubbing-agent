"use client"

import { Header } from "@/components/landing/Header"
import { HeroSection } from "@/components/landing/HeroSection"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection"
import { BenefitsSection } from "@/components/landing/BenefitsSection"
import { SecuritySection } from "@/components/landing/SecuritySection"
import { PricingSection } from "@/components/landing/PricingSection"
import { FAQSection } from "@/components/landing/FAQSection"
import { EmailCaptureForm } from "@/components/landing/EmailCaptureForm"
import { Footer } from "@/components/landing/Footer"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { InfluencerTypeModal } from "@/components/InfluencerTypeModal"

export default function Home() {
  const scrollToSignup = () => {
    const element = document.getElementById('signup')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ThemeProvider>
      {/* 🚨 FORCE DEPLOYMENT v4.0 - API ENDPOINTS MUST DEPLOY - 2024-08-24 17:15 🚨 */}
      <main className="min-h-screen bg-black">
        <InfluencerTypeModal />
        <Header />
        <HeroSection onGetStarted={scrollToSignup} />
        <HowItWorks />
        <BenefitsSection />
        <SecuritySection />
        <ScreenshotsSection />
        <PricingSection />
        <FAQSection />
        <EmailCaptureForm />
        <Footer />
      </main>
    </ThemeProvider>
  )
}