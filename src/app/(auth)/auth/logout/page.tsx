"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const LogoutPage = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const signOut = async () => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          throw error
        }
        // Redirect to home page after successful logout
        setTimeout(() => router.push("/"), 2000)
      } catch (e) {
        setError("An error occurred while signing out.")
        console.error("Sign out error:", e)
      }
    }

    signOut()
  }, [router, supabase.auth])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Logging out...</h1>
        <p>You will be redirected to the home page in a moment.</p>
      </div>
    </div>
  )
}

export default LogoutPage

