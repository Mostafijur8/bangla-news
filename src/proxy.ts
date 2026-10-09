import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const signInUrl = new URL("/signin", request.url);

      signInUrl.searchParams.set(
        "callbackURL",
        request.nextUrl.pathname + request.nextUrl.search,
      );

      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    // Authentication check failed: do not allow access
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/news/:path*"],
};
