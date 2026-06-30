import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAuthPage = nextUrl.pathname.startsWith("/login")

  if (isAuthPage) {
    if (isLoggedIn && nextUrl.pathname !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return null
  }

  if (!isLoggedIn && nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  const role = req.auth?.user?.role

  // RBAC: Restrict admin-only routes
  if (
    (nextUrl.pathname.startsWith("/dashboard/admin") || 
     nextUrl.pathname.startsWith("/dashboard/clients") ||
     nextUrl.pathname === "/dashboard") && 
    role !== "admin"
  ) {
    if (nextUrl.pathname !== "/dashboard/client") {
      return NextResponse.redirect(new URL("/dashboard/client", nextUrl))
    }
  }

  // RBAC: Prevent admin from accidentally landing on client portal
  if ((nextUrl.pathname === "/dashboard/client" || nextUrl.pathname.startsWith("/dashboard/client/")) && role === "admin") {
    if (nextUrl.pathname !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
