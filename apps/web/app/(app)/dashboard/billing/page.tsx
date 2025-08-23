"use client"

import { useState } from 'react'
import { CreditCard, Check, Sparkles, TrendingUp, Zap } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    dubsPerMonth: 3,
    features: [
      '3 dubs per month',
      'Up to 5 languages',
      'Basic analytics',
      'Manual publishing',
      'Email support',
    ],
    current: true,
  },
  {
    id: 'creator',
    name: 'Creator',
    price: '$29.99',
    period: 'per month',
    dubsPerMonth: 10,
    features: [
      '10 dubs per month',
      'Up to 10 languages',
      'Advanced analytics',
      'Auto-publishing',
      'Priority support',
      'Custom templates',
    ],
    recommended: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99.99',
    period: 'per month',
    dubsPerMonth: 50,
    features: [
      '50 dubs per month',
      'All 30 languages',
      'Real-time analytics',
      'Auto-publishing',
      'Priority support',
      'Custom templates',
      'API access',
      'Team collaboration',
    ],
  },
]

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const currentPlan = plans.find(p => p.current)

  const handleUpgrade = async (planId: string) => {
    setIsLoading(true)
    // TODO: Implement Stripe checkout
    console.log('Upgrading to', planId)
    setIsLoading(false)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
        <p className="text-gray-400">
          Manage your subscription and usage
        </p>
      </div>

      {/* Current Usage */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Current Usage</h2>
            <span className="text-sm text-gray-400">Resets Jan 1, 2025</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Dubs Used</span>
                <span className="text-sm text-white">0 / 3</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-green-400">
              <Sparkles className="w-4 h-4" />
              <span>3 dubs remaining this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Available Plans</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-xl border p-6",
                plan.current
                  ? "bg-purple-500/10 border-purple-500/50"
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-xs font-semibold text-green-400">
                    Current Plan
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-purple-400 font-semibold mt-2">
                  {plan.dubsPerMonth} dubs/month
                </p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => !plan.current && handleUpgrade(plan.id)}
                disabled={plan.current || isLoading}
                className={cn(
                  "w-full py-2 px-4 rounded-lg font-semibold transition-all",
                  plan.current
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : plan.recommended
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                )}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
          {currentPlan?.id === 'free' ? (
            <p className="text-gray-400">No payment method required for free plan</p>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                <CreditCard className="w-6 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-400">Expires 12/25</p>
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300">
                Update
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Invoice History</h2>
          <p className="text-gray-400">No invoices yet</p>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}