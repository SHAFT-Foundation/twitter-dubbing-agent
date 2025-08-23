"use client"

import { Shield, Lock, Eye, UserCheck, Bell, CheckCircle } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: "AI Security Monitoring",
    description: "Our advanced AI security agent monitors all platform activity 24/7, detecting and preventing any unauthorized actions in real-time.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Lock,
    title: "Limited X Permissions",
    description: "We can ONLY post replies to your existing videos and dubs. We cannot create new standalone posts without your explicit content association.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: UserCheck,
    title: "You Control Everything",
    description: "Configure manual review mode - you're the only one who can click 'Publish'. Review every dub before it goes live. Nothing happens without your approval.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Eye,
    title: "Transparent Activity Logs",
    description: "Every action is logged and visible in your dashboard. See exactly what was dubbed, when, and what permissions were used.",
    gradient: "from-pink-500 to-orange-500",
  },
]

const securityPromises = [
  "End-to-end encryption for all X tokens",
  "No storage of X passwords - OAuth only",
  "Automatic token rotation and refresh",
  "Instant revocation from your dashboard",
  "GDPR and SOC 2 compliant infrastructure",
  "Regular third-party security audits",
]

export function SecuritySection() {
  return (
    <section className="py-16 sm:py-24 bg-black" id="security">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 ring-1 ring-green-500/20 mb-4">
            <Shield className="h-4 w-4" />
            Bank-Level Security
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your X Account is <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Safe</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            We take security seriously. Multiple layers of protection ensure your content and account remain under your complete control.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-green-500/50 hover:bg-gray-900/80 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Manual Control Highlight */}
        <div className="rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-900/20 to-teal-900/20 p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">
                🔒 Manual Review Mode Available
              </h3>
              <p className="text-gray-300 mb-4">
                Worried about automation? Enable manual review mode and YOU become the gatekeeper. Every dubbed video waits for your personal approval before posting. You click the button, not us.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Review each dub
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Approve or reject
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  You control timing
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Promises */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
          <div className="text-center mb-6">
            <Bell className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">Our Security Commitments</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {securityPromises.map((promise) => (
              <div key={promise} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{promise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            <strong className="text-white">Important:</strong> X Dub can only reply to your existing content. We cannot and will not create new posts on your behalf. Your account, your rules.
          </p>
        </div>
      </div>
    </section>
  )
}