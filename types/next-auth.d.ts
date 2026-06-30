import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: "admin" | "manager" | "client"
    } & DefaultSession["user"]
  }

  interface User {
    role: "admin" | "manager" | "client"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "manager" | "client"
  }
}
