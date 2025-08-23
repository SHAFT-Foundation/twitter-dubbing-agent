"use client"

import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out X Dub',
    features: [
      '10 minutes per month',
      'Up to 5 languages',
      'Manual review mode',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Creator',
    price: '$29.99',
    description: 'For active content creators',
    features: [
      '60 minutes included',
      '$0.85 per additional minute',
      'Up to 10 languages',
      'Auto-reply mode',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Custom',
    price: 'Contact',
    description: 'For teams and enterprises',
    features: [
      'Volume discounts',
      'All 30 languages',
      'API access',
      'Dedicated support',
      'Team collaboration',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-black" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Sparkles className="h-4 w-4" />
            Simple Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Plan</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Pay per minute of dubbing. Start with 10 free minutes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-8 transition-all",
                plan.highlighted
                  ? "border-2 border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  : "border border-gray-800 bg-gray-900/50 hover:border-gray-700"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-gray-400">/month</span>}
                </div>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3 px-4 rounded-full font-semibold transition-all",
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            All plans include our security guarantee. Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </section>
  )
}