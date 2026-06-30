import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Mock DB implementation for template showcase
        if (credentials.email === "admin@example.com" && credentials.password === "admin") {
          return { id: "1", name: "System Admin", email: "admin@example.com", role: "admin" }
        }
        if (credentials.email === "client@example.com" && credentials.password === "client") {
          return { id: "2", name: "Acme Client", email: "client@example.com", role: "client" }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as "admin" | "manager" | "client"
      }
      return session
    },
  },
})
