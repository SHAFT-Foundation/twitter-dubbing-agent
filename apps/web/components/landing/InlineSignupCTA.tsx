"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  hp_email: z.string().optional(), // Honeypot field
})

type FormData = z.infer<typeof formSchema>

interface InlineSignupCTAProps {
  variant?: 'compact' | 'full'
  showDescription?: boolean
}

export function InlineSignupCTA({ variant = 'compact', showDescription = true }: InlineSignupCTAProps) {
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
    // Check honeypot
    if (data.hp_email) {
      setSubmitStatus('success')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage("")

    try {
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

  if (variant === 'compact') {
    return (
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Honeypot */}
          <input
            type="email"
            {...register("hp_email")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="flex gap-2">
            <input
              type="email"
              autoComplete="email"
              required
              {...register("email")}
              className={cn(
                "flex-1 rounded-lg border bg-gray-900/50 backdrop-blur-sm px-4 py-3",
                "text-white placeholder:text-gray-500 text-sm",
                "border-gray-800 focus:border-purple-500",
                "focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
                "transition-all duration-200",
                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              )}
              placeholder="Enter your email"
              disabled={submitStatus === 'success'}
            />

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={cn(
                "px-6 py-3 rounded-lg font-semibold text-sm text-white whitespace-nowrap",
                "bg-gradient-to-r from-purple-600 to-pink-600",
                "hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
                "hover:scale-105 transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : submitStatus === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                "Get Access"
              )}
            </button>
          </div>

          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 text-xs text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span>You&apos;re on the list! Check your email.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {showDescription && (
          <p className="mt-2 text-xs text-center text-gray-500">
            🔒 No spam, unsubscribe anytime
          </p>
        )}
      </div>
    )
  }

  // Full variant (similar to original but more compact)
  return (
    <div className="w-full max-w-md mx-auto">
      {showDescription && (
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Early Access</span>
          </h3>
          <p className="text-sm text-gray-400">
            Join 65+ crypto KOLs expanding their global reach
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Honeypot */}
        <input
          type="email"
          {...register("hp_email")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <input
            type="email"
            autoComplete="email"
            required
            {...register("email")}
            className={cn(
              "w-full rounded-lg border bg-gray-900/50 backdrop-blur-sm px-4 py-3",
              "text-white placeholder:text-gray-500",
              "border-gray-800 focus:border-purple-500",
              "focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
              "transition-all duration-200",
              errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            )}
            placeholder="Enter your email"
            disabled={submitStatus === 'success'}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3",
            "text-sm font-semibold text-white",
            "bg-gradient-to-r from-purple-600 to-pink-600",
            "hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
            "hover:scale-[1.02] transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Securing your spot...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4" />
              You&apos;re on the list! 🎉
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Claim Early Access
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
            <p className="text-xs text-green-400">
              Check your email for exclusive updates and launch details.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-xs text-red-400">{errorMessage}</p>
          </div>
        )}

        {showDescription && (
          <p className="text-xs text-center text-gray-500">
            🔒 No spam, unsubscribe anytime
          </p>
        )}
      </form>
    </div>
  )
}
