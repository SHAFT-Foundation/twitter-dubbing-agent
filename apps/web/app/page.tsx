"use client"

import { HeroSection } from "@/components/landing/HeroSection"
import { EmailCaptureForm } from "@/components/landing/EmailCaptureForm"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { BenefitsSection } from "@/components/landing/BenefitsSection"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  const scrollToSignup = () => {
    const element = document.getElementById('signup')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      <HeroSection onGetStarted={scrollToSignup} />
      <HowItWorks />
      <BenefitsSection />
      <EmailCaptureForm />
      <Footer />
    </main>
  )
}