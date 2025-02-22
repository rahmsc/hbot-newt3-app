import { NextResponse } from "next/server";
import { createClient } from "~/utils/supabase/server";

export async function GET(request: Request) {
  // Get the code from either the query params or the root URL
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? url.pathname.split("/").pop();
  const next = url.searchParams.get("next") ?? "/auth/profile";
  
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (!baseUrl) {
        console.error("NEXT_PUBLIC_SITE_URL is not defined");
        return NextResponse.redirect("/auth/error");
      }
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/error`);
}
