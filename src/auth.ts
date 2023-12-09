import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/drizzle";
// import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
// import { unstable_noStore } from "next/cache";

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ["/"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    },
  },
} satisfies NextAuthConfig;

export const { handlers,auth,  signOut } = NextAuth(authConfig);
// export async function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   unstable_noStore();
//   const session = await getServerSession(...args, authConfig);
//   return { getUser: () => session?.user && { userId: session.user.id } };
// }