import { NextResponse } from "next/server";
import { createClient } from "~/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/profile";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      // Handle different environments and forwarded hosts
      if (isLocalEnv) {
        // In development, we can trust the origin
        return NextResponse.redirect(`${origin}${next}`);
      }
      if (forwardedHost) {
        // In production with a load balancer
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      // Default fallback
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page if something went wrong
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
