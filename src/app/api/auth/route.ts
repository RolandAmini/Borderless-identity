import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Ajoute cette ligne pour forcer la page de login de NextAuth si besoin
  pages: {
    signIn: '/api/auth/signin', 
  },
});

export { handler as GET, handler as POST };