"use client"

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="/terms" 
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Terms of Service
          </a>
          <a 
            href="/privacy" 
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Privacy Policy
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Claude Code. All rights reserved.
            </p>
            <span className="mx-2 text-gray-400">•</span>
            <p className="text-center text-xs leading-5 text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-gray-700">SpeechLab</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}