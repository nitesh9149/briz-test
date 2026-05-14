import { NextResponse, type NextRequest } from "next/server";
import Negotiator from "negotiator";
import { locales, defaultLocale, hasLocale } from "@/app/[lang]/i18n-config";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  const matched = negotiator.language(locales as unknown as string[]);
  return matched && hasLocale(matched) ? matched : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, fonts, etc.)
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff|woff2|ttf|otf|mp4|webm)).*)",
  ],
};
