import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

const DEVICE_COOKIE_NAME = "om_store_device_id";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 1. Ensure persistent device identifier cookie is set for device policy
  let deviceId = request.cookies.get(DEVICE_COOKIE_NAME)?.value;
  if (!deviceId || deviceId.length < 32) {
    deviceId = (crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "")).slice(0, 48);
    supabaseResponse.cookies.set(DEVICE_COOKIE_NAME, deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  const pathname = request.nextUrl.pathname;
  const isProtectedPath =
    pathname.startsWith("/library") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/api/account");

  // Only perform remote Supabase Auth network calls for protected routes
  // This drastically reduces latency on public pages (homepage, product previews)
  if (!isProtectedPath) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // In local development ONLY, allow inspecting experience if dev_preview=1
    const isDev = process.env.NODE_ENV === "development";
    if (isDev && request.nextUrl.searchParams.get("dev_preview") === "1") {
      return supabaseResponse;
    }

    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image/svg public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
