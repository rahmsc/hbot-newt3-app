"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import Image from "next/image"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "~/hooks/use-toast"

const referralSources = [
  { value: "search", label: "Search Engine" },
  { value: "social", label: "Social Media" },
  { value: "friend", label: "Friend/Colleague" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" },
]

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${src}`
}

export default function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [referralSource, setReferralSource] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const country = formData.get("country") as string

    try {
      // Sign up the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            country,
            referral_source: referralSource,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) throw signUpError

      if (!user) {
        throw new Error("No user data returned from sign-up")
      }

      // Show success toast
      toast({
        title: "Sign up successful!",
        description: "Please check your email to confirm your account.",
      })

      // Optionally redirect to a confirmation page
      router.push("/auth/profile")

    } catch (error: any) {
      console.error("Sign up error:", error)
      setError(error.message || "An error occurred during sign up.")
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-grow overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <Card className="relative mx-auto max-w-md rounded-lg border bg-white/95 shadow-md">
          <CardHeader className="space-y-2">
            <Image
              loader={imageLoader}
              src="/images/banners/signup-banner.png"
              alt="signup-banner"
              width={340}
              height={113}
              className="w-full rounded-t-lg"
              unoptimized
            />
            <CardTitle className="text-center text-2xl font-bold tracking-tight">Get access</CardTitle>
            <CardDescription className="text-center text-sm text-gray-600 px-4">
              Join to get access to Hyperbaric HQ. Search for and save your favourite content. Connect with others. Work
              with experts. Get exclusive deals.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 py-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address*"
                  required
                  className="h-9 rounded-md border-gray-200 bg-white px-3"
                />

                <Input
                  name="password"
                  type="password"
                  placeholder="Password*"
                  required
                  className="h-9 rounded-md border-gray-200 bg-white px-3"
                />

                <Input
                  name="fullName"
                  placeholder="Full Name*"
                  required
                  className="h-9 rounded-md border-gray-200 bg-white px-3"
                />

                <Input name="country" placeholder="Country" className="h-9 rounded-md border-gray-200 bg-white px-3" />

                <Select value={referralSource} onValueChange={setReferralSource}>
                  <SelectTrigger className="h-9 rounded-md border-gray-200 bg-white px-3">
                    <SelectValue placeholder="How did you hear about us?" />
                  </SelectTrigger>
                  <SelectContent>
                    {referralSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button type="submit" className="h-9 w-full bg-black text-white hover:bg-black/90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Join HQ"
                )}
              </Button>

              <div className="text-center text-xs text-gray-600">
                By signing up, you&apos;re agreeing to our{" "}
                <Link href="/terms" className="underline">
                  terms
                </Link>
                .
              </div>
              <div className="text-center text-xs text-gray-600 mt-2">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline">
                  Login here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

