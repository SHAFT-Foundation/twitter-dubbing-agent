import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-purple-400">X Dub by SHAFT Foundation</p>
        <div className="mt-8 space-y-6 text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Email address when you sign up for early access</li>
              <li>X account information when you connect your account</li>
              <li>Content metadata for dubbing purposes</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and maintain our dubbing services</li>
              <li>Process your content for translation</li>
              <li>Communicate with you about our services</li>
              <li>Improve and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information. We may share information with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Service providers who assist in operating our platform</li>
              <li>AI dubbing partners (content only, not personal data)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers with physical security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access your personal information</li>
              <li>Update or correct your data</li>
              <li>Delete your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and comply with legal obligations. 
              Content processing data is deleted after dubbing is complete unless you choose to save it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized content. 
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for users under 18 years of age. We do not knowingly collect 
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              For privacy-related questions or concerns, contact us at:
              <br />
              <a href="mailto:argos@shaft.finance" className="text-purple-400 hover:text-purple-300">
                argos@shaft.finance
              </a>
              <br />
              SHAFT Foundation
              <br />
              Calle 50, Edificio Oceania, Piso 12, Oficina 1203
              <br />
              Bella Vista Ciudad de Panamá, Panamá
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link 
            href="/" 
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}