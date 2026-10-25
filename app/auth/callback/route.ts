import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitizeRedirectPath(nextPath: string | null): string {
  if (!nextPath) return "/library";

  // Prevent protocol-relative URLs (//attacker.com) and backslash traversal (/\attacker.com)
  if (!nextPath.startsWith("/") || nextPath.startsWith("//") || nextPath.startsWith("/\\")) {
    return "/library";
  }

  // Prevent embedded protocols or colon-based exploits (e.g. javascript:, https:)
  if (nextPath.includes(":") || nextPath.includes("\\")) {
    return "/library";
  }

  return nextPath;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next");
  const safeNext = sanitizeRedirectPath(rawNext);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth-failed`);
}
