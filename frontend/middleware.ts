import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Decode a JWT payload without verification (middleware can't use node crypto libs).
// The actual signature is validated server-side by the API on every authenticated request.
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    // Convert Base64Url to Base64
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("szr_token")?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  // No token → block all protected routes
  if ((isAdminRoute || isDashboardRoute) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Has token → decode and check role
  if (token) {
    const payload = decodeJwtPayload(token);
    const role = payload?.role as string | undefined;

    // Expired or malformed token → clear cookie and redirect to login
    if (!payload || !role) {
      if (isAdminRoute || isDashboardRoute) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("szr_token");
        return response;
      }
    }

    // Admin routes → admin only
    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Already logged in → skip login page
    if (isLoginRoute) {
      const target = role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
