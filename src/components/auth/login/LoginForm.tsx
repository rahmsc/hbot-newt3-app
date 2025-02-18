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

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to dashboard or home page after successful login
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "An error occurred during login.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-grow overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 -z-10 blur-sm opacity-50"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_VERCEL_URL}/placeholder.svg?height=800&width=1200)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Card className="relative mx-auto max-w-md rounded-lg border bg-white/95 shadow-md">
          <CardHeader className="space-y-2">
            <Image
              src="/images/banners/signup-banner.png"
              alt="login-banner"
              width={340}
              height={113}
              className="w-full rounded-t-lg"
            />
            <CardTitle className="text-center text-2xl font-bold tracking-tight">Login</CardTitle>
            <CardDescription className="text-center text-sm text-gray-600">
              Enter your credentials to access your account
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
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button type="submit" className="h-9 w-full bg-black text-white hover:bg-black/90">
                Login
              </Button>

              <div className="text-center text-xs">
                <Link href="/auth/forgot-password" className="text-gray-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center text-xs text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

