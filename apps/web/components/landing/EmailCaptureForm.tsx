"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle, AlertCircle, Sparkles, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  hp_email: z.string().optional(), // Honeypot field for spam prevention
})

type FormData = z.infer<typeof formSchema>

export function EmailCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Check honeypot field - if filled, it's likely spam
    if (data.hp_email) {
      setSubmitStatus('success')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage("")

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_medium: urlParams.get('utm_medium'),
      }

      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          ...utmData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to sign up. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="signup" className="bg-black py-16 sm:py-24 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Rocket className="h-4 w-4" />
            Limited Spots Available
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Allowlist</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Be among the first crypto KOLs to go global with AI dubbing.
            <br />
            <span className="text-sm">Only 100 early access spots remaining</span>
          </p>
        </div>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="mx-auto mt-10 max-w-md"
        >
          <div className="flex flex-col gap-4">
            {/* Honeypot field - hidden from users */}
            <input
              type="email"
              {...register("hp_email")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                className={cn(
                  "block w-full rounded-lg border bg-gray-900/50 backdrop-blur-sm px-4 py-4",
                  "text-white placeholder:text-gray-500",
                  "border-gray-800 focus:border-purple-500",
                  "focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
                  "transition-all duration-200",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
                placeholder="Enter your email for early access"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={cn(
                "group relative flex w-full justify-center rounded-lg px-4 py-4",
                "text-base font-semibold text-white",
                "bg-gradient-to-r from-purple-600 to-pink-600",
                "shadow-[0_0_40px_rgba(168,85,247,0.4)]",
                "hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]",
                "hover:scale-[1.02] transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Securing your spot...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  You&apos;re on the list! 🎉
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Claim Early Access
                  <span className="ml-2 text-purple-200">→</span>
                </>
              )}
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 backdrop-blur-sm">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-400">
                    Welcome to the future of content dubbing!
                  </p>
                  <p className="mt-1 text-sm text-green-300/80">
                    Check your email for exclusive updates and launch details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 backdrop-blur-sm">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-400">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </form>

        {/* Progress bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="rounded-full bg-gray-800 p-1">
            <div className="h-2 w-[65%] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            65 of 100 spots claimed
          </p>
        </div>
      </div>
    </section>
  )
}