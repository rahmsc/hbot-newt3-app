/* eslint-disable @typescript-eslint/no-unsafe-call */
"use server"

import { createClient } from "@supabase/supabase-js"
import { hash } from "node:crypto"
import { z } from "zod"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "")

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  country: z.string().optional(),
  referralSource: z.string(),
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function signup(prevState: any, formData: FormData) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      country: formData.get("country"),
      referralSource: formData.get("referralSource"),
    }

    // Validate the data
    const validated = SignupSchema.parse(data)

    // Hash the password
    const hashedPassword = hash("sha256", validated.password)

    // Insert into database
    const { error } = await supabase.from("profiles").insert({
      email: validated.email,
      password: hashedPassword,
      first_name: validated.firstName,
      country: validated.country ?? null,
      referral_source: validated.referralSource,
    })

    if (error) throw error

    // Redirect to success page or login
    return null
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return "Invalid form data. Please check your inputs."
    }

    if (error.code === "23505") {
      // PostgreSQL unique violation
      return "Email already exists. Please use a different email."
    }

    console.error("Signup error:", error)
    return "Something went wrong. Please try again."
  }
}

