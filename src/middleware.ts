import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Cette fonction s'exécute après que l'utilisateur s'est connecté
    return NextResponse.next();
  },
  {
    callbacks: {
      // 🛡️ C'est ici que la magie opère :
      // On autorise l'accès SEULEMENT si l'email correspond à ton ADMIN_EMAIL
      authorized: ({ token }) => {
        return token?.email === process.env.ADMIN_EMAIL;
      },
    },
  }
);

// 🔒 On définit quelles routes sont protégées
// Ici, on bloque tout ce qui commence par /admin
export const config = { 
  matcher: ["/admin/:path*"] 
};