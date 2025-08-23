"use client"

import { Header } from "@/components/landing/Header"
import { HeroSection } from "@/components/landing/HeroSection"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection"
import { BenefitsSection } from "@/components/landing/BenefitsSection"
import { SecuritySection } from "@/components/landing/SecuritySection"
import { PricingSection } from "@/components/landing/PricingSection"
import { EmailCaptureForm } from "@/components/landing/EmailCaptureForm"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  const scrollToSignup = () => {
    const element = document.getElementById('signup')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection onGetStarted={scrollToSignup} />
      <HowItWorks />
      <BenefitsSection />
      <SecuritySection />
      <ScreenshotsSection />
      <PricingSection />
      <EmailCaptureForm />
      <Footer />
    </main>
  )
}