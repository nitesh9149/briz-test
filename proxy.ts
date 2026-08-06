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

function getCity(request: NextRequest): string | null {
  const raw = request.headers.get("x-vercel-ip-city");
  if (!raw) return null;
  // Vercel percent-encodes the header value (e.g. "San%20Francisco").
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const city = getCity(request);
  console.log(`Request received for city: ${city}, pathname: ${pathname}`);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Only redirect when the city param is missing or stale, otherwise every
  // request would bounce forever.
  const needsCityParam = city !== null && searchParams.get("city") !== city;

  if (pathnameHasLocale && !needsCityParam) return;

  const url = request.nextUrl.clone();
  if (!pathnameHasLocale) {
    url.pathname = `/${getLocale(request)}${pathname}`;
  }
  if (city !== null) {
    url.searchParams.set("city", city);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, fonts, etc.)
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff|woff2|ttf|otf|mp4|webm)).*)",
  ],
};
