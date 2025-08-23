import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-purple-400">X Dub by SHAFT Foundation</p>
        <div className="mt-8 space-y-6 text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using X Dub, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
            <p>
              X Dub provides automated dubbing services for X (formerly Twitter) content, enabling users to 
              translate their videos, clips, and Spaces into multiple languages using AI technology.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and 
              for all activities that occur under your account. You must own or have rights to all content you submit for dubbing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Content Ownership</h2>
            <p>
              You retain all rights to your original content. By using our service, you grant us a 
              limited, non-exclusive license to process your content solely for dubbing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Privacy & Data Protection</h2>
            <p>
              Your use of our service is governed by our Privacy Policy. We comply with applicable data protection laws
              and implement industry-standard security measures.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              X Dub and SHAFT Foundation shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Service Modifications</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the service at any time
              with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of Panama, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
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