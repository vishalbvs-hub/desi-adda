import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip API routes and the gate page itself
  if (pathname.startsWith("/api") || pathname === "/gate") {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("site-access");
  if (authCookie?.value === "granted") {
    return NextResponse.next();
  }

  // Redirect to gate page
  const url = request.nextUrl.clone();
  url.pathname = "/gate";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - /api (API routes)
     * - /_next (Next.js internals)
     * - Static files (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|css|js)).*)",
  ],
};
