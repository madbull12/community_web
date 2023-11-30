import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import db from "./lib/drizzle"
import { DrizzleAdapter } from '@auth/drizzle-adapter'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub],
  adapter:DrizzleAdapter(db)
})