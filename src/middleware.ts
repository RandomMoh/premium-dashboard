import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAuthPage = nextUrl.pathname.startsWith("/login")

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return null
  }

  if (!isLoggedIn) {
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
    return NextResponse.redirect(new URL("/dashboard/client", nextUrl))
  }

  // RBAC: Prevent admin from accidentally landing on client portal
  if (nextUrl.pathname.startsWith("/dashboard/client") && role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
