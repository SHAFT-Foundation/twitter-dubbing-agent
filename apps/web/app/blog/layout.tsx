import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      {children}
      <Footer />
    </div>
  )
}
