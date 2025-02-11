import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { Database } from "~/types/profile";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  // Check if this is a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/profile");
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");

  if (isAuthRoute) {
    // Don't apply any redirects for auth routes
    return res;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
