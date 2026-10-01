import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase auth callback route.
 *
 * When a user clicks the email confirmation link, Supabase redirects them here
 * with a ?code= param. This route exchanges that code for a session cookie,
 * then sends the user to their dashboard.
 *
 * Also handles password reset links (type=recovery).
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const type = requestUrl.searchParams.get("type");

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Password reset — send them to the reset page
      if (type === "recovery") {
        return NextResponse.redirect(new URL("/reset-password", requestUrl.origin));
      }

      // Email confirmation — get their account type and send to correct dashboard
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("account_type")
          .eq("id", user.id)
          .single();

        const destination =
          profile?.account_type === "team" ? "/team-dashboard" : "/dashboard";
        return NextResponse.redirect(new URL(destination, requestUrl.origin));
      }

      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Something went wrong — send to login with an error
  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("error", "Email confirmation failed. Please try again.");
  return NextResponse.redirect(loginUrl);
}
