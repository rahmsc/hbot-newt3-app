"use client"

import { Button } from "~/components/ui/button"
import { ChromeIcon as GoogleIcon } from "lucide-react"
import { signInWithGoogle } from "~/app/(auth)/auth/login/action"

export default function SignInWithGoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signInWithGoogle()}
      className="h-9 w-full border-gray-200 bg-white text-black hover:bg-gray-100"
    >
      <GoogleIcon className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  )
}

