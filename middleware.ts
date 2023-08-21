import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
  
    // Check if the locale query parameter is already present
    if (!searchParams.has('locale')) {
      const locale = getLocale(request);
      const redirectUrl = new URL(pathname, request.url);
      redirectUrl.searchParams.append('locale', locale); // Append the locale as a query parameter
      return NextResponse.redirect(redirectUrl);
    }
  }

export const config = {
  // Matcher ignoring `/_next/`, `/images/`, `/svg/`, and `/favicon.ico`
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|svg).*)"],
};
