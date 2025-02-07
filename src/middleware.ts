import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { Database } from "../types/database";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if this is a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/profile");

  if (!session && isProtectedRoute) {
    // Redirect to login page without the redirect parameter
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/profile/:path*"],
};
