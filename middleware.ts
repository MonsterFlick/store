import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { clientEnv } from "@/lib/env";

const DEVICE_COOKIE_NAME = "om_store_device_id";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 1. Ensure persistent device identifier cookie is set for device policy
  let deviceId = request.cookies.get(DEVICE_COOKIE_NAME)?.value;
  let isNewDevice = false;

  if (!deviceId || deviceId.length < 32) {
    deviceId = (crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "")).slice(0, 48);
    isNewDevice = true;
    request.cookies.set(DEVICE_COOKIE_NAME, deviceId);
  }

  const applyDeviceCookie = (res: NextResponse) => {
    if (isNewDevice && deviceId) {
      res.cookies.set(DEVICE_COOKIE_NAME, deviceId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
      });
    }
  };

  applyDeviceCookie(supabaseResponse);

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
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
          // Preserve device cookie after re-creating response
          applyDeviceCookie(supabaseResponse);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Return 401 JSON for API requests instead of redirecting with HTML
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
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
