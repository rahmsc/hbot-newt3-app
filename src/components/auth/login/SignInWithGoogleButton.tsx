"use client"

import { Button } from "~/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { ChromeIcon as GoogleIcon } from "lucide-react"

export default function SignInWithGoogleButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="h-9 w-full border-gray-200 bg-white text-black hover:bg-gray-100"
    >
      <GoogleIcon className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  )
}

