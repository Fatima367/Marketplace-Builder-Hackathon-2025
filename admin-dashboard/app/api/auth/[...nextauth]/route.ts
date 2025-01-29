import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically verify against your database
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };