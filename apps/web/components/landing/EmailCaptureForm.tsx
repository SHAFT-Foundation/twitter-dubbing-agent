"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
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
    <section id="signup" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Early Access
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Be among the first to automatically dub your content into multiple languages. 
            Limited spots available.
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
            
            <div>
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
                  "block w-full rounded-lg border-0 px-4 py-3",
                  "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-blue-600",
                  "sm:text-sm sm:leading-6",
                  errors.email && "ring-red-500 focus:ring-red-500"
                )}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={cn(
                "flex w-full justify-center rounded-lg px-4 py-3",
                "text-sm font-semibold leading-6 text-white shadow-sm",
                "bg-gradient-to-r from-blue-600 to-purple-600",
                "hover:from-blue-700 hover:to-purple-700",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  You&apos;re on the list!
                </>
              ) : (
                'Get Early Access'
              )}
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-4 rounded-lg bg-green-50 p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Success! We&apos;ll be in touch soon.
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Check your email for confirmation and updates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 rounded-lg bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  )
}