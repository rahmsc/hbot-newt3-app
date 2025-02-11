import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { Database } from "../../../../../types/database";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const redirect = requestUrl.searchParams.get("redirect") ?? "/profile";

  // Check if we have a code
  if (!code) {
    console.error("No code provided in the callback");
    return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
  }

  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      throw error;
    }

    // If successful, redirect to the provided redirect URL or default to /profile
    return NextResponse.redirect(new URL(redirect, requestUrl.origin));
  } catch (error) {
    console.error("Unexpected error during authentication:", error);
    // Redirect to an error page
    return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
  }
}
