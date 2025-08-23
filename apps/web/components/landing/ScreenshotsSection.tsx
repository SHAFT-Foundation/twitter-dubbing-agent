"use client"

import { Monitor, Smartphone, Check } from "lucide-react"

const screenshots = [
  {
    title: "Connect X in Seconds",
    description: "One-click OAuth connection",
    placeholder: "🔗 Connect X Account",
    features: ["Secure OAuth 2.0", "Instant verification", "No passwords needed"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Select Your Languages",
    description: "Choose from 30 languages",
    placeholder: "🌍 Language Selection",
    features: ["Multi-select interface", "Region targeting", "Save preferences"],
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Watch the Magic",
    description: "Real-time dubbing dashboard",
    placeholder: "📊 Live Dashboard",
    features: ["Processing status", "Download links", "Analytics"],
    gradient: "from-pink-500 to-orange-500",
  },
]

export function ScreenshotsSection() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Monitor className="h-4 w-4" />
            Setup in 2 Minutes
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dead Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Setup</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            No technical knowledge required. If you can tweet, you can dub.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {screenshots.map((screenshot, index) => (
              <div key={screenshot.title} className="group relative">
                {/* Card */}
                <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  {/* Screenshot placeholder */}
                  <div className={`aspect-video bg-gradient-to-br ${screenshot.gradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                    {/* Fake browser chrome */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gray-900/80 backdrop-blur-sm flex items-center px-3 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="inline-block px-3 py-0.5 rounded bg-gray-800 text-xs text-gray-400">
                          xdub.app/dashboard
                        </div>
                      </div>
                    </div>
                    
                    {/* Content placeholder */}
                    <div className="text-center mt-8">
                      <div className="text-6xl mb-4">{screenshot.placeholder.split(' ')[0]}</div>
                      <div className="text-white/90 font-semibold text-lg">
                        {screenshot.placeholder.split(' ').slice(1).join(' ')}
                      </div>
                      
                      {/* Animated elements */}
                      <div className="mt-6 space-y-2">
                        {index === 0 && (
                          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm animate-pulse">
                            Authorize @YourHandle
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex justify-center gap-2">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">🇯🇵</span>
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">🇰🇷</span>
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">🇨🇳</span>
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">🇪🇸</span>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="space-y-1">
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full w-3/4 bg-white/60 animate-pulse"></div>
                            </div>
                            <div className="text-xs text-white/80">Processing 3 of 5 languages...</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Step {index + 1}: {screenshot.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {screenshot.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {screenshot.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                          <Check className="h-3 w-3 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile preview */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4">
              <Smartphone className="h-5 w-5 text-purple-400" />
              <p className="text-sm text-gray-400">
                Works perfectly on mobile too. Manage your dubs on the go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}