"use client"

import { Twitter, Linkedin, Youtube, MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SHAFT Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-white">
                shaft<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Proud partner of the DAIAA
            </p>
            <a 
              href="https://www.daiaa.org/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Learn more at daiaa.org →
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:argos@shaft.finance" 
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                argos@shaft.finance
              </a>
              <div className="text-sm text-gray-400">
                <p>SHAFT Foundation</p>
                <p>Calle 50, Edificio Oceania, Piso 12</p>
                <p>Oficina 1203</p>
                <p>Bella Vista Ciudad de Panamá</p>
                <p>Panamá</p>
              </div>
            </div>
          </div>

          {/* Global Access & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Global Access</h3>
            <p className="text-sm text-gray-400">
              Open Source AI Speech agents can be accessed by a global audience, breaking down geographical barriers. This opens up investment opportunities to a broader range of investors who may not have had access to certain markets or assets through traditional means.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://medium.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.828.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-xs text-gray-400">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} X Dub by SHAFT Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}