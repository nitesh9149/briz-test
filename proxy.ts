import { NextResponse, type NextRequest } from "next/server";
import Negotiator from "negotiator";
import { locales, defaultLocale, hasLocale } from "@/app/[lang]/i18n-config";
import { reverseGeocode, type GeoDetails } from "@/lib/reverse-geocode";

// Proxy runs on the Node.js runtime in Next.js 16, so `local-reverse-geocoder`
// (which needs `fs`) can be imported here. The `runtime` config option is not
// available in proxy files — setting it throws.

const GEO_PARAM_KEYS = [
  "city",
  "province",
  "district",
  "municipality",
  "country",
  "latitude",
  "longitude",
] as const;

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  const matched = negotiator.language(locales as unknown as string[]);
  return matched && hasLocale(matched) ? matched : defaultLocale;
}

/** Vercel percent-encodes non-ASCII header values per RFC3986. */
function decodeHeader(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getCoordinates(request: NextRequest): [number, number] | null {
  const lat = Number(request.headers.get("x-vercel-ip-latitude"));
  const lon = Number(request.headers.get("x-vercel-ip-longitude"));
  if (Number.isFinite(lat) && Number.isFinite(lon)) return [lat, lon];

  // Vercel geo headers don't exist locally — let `next dev` be tested with a
  // fixed coordinate (Kathmandu: GEO_DEV_COORDS="27.7172,85.3240").
  if (process.env.NODE_ENV !== "production" && process.env.GEO_DEV_COORDS) {
    const [devLat, devLon] = process.env.GEO_DEV_COORDS.split(",").map(Number);
    if (Number.isFinite(devLat) && Number.isFinite(devLon)) {
      return [devLat, devLon];
    }
  }
  return null;
}

type ResolvedGeo = GeoDetails & { latitude?: string; longitude?: string };

async function resolveGeo(request: NextRequest): Promise<ResolvedGeo> {
  const headerCity = decodeHeader(request.headers.get("x-vercel-ip-city"));
  const headerCountry = request.headers
    .get("x-vercel-ip-country")
    ?.toUpperCase();
  const coordinates = getCoordinates(request);

  const details = coordinates
    ? await reverseGeocode(coordinates[0], coordinates[1])
    : null;

  return {
    ...details,
    // The header city is the visitor's own city; the geocoded name is the
    // nearest place with population >= 1000, so prefer the header when present.
    city: headerCity ?? details?.city,
    country: headerCountry ?? details?.country,
    // The visitor's coordinates, not the matched place's.
    latitude: coordinates?.[0].toString(),
    longitude: coordinates?.[1].toString(),
  };
}

function needsEnrichment(
  searchParams: URLSearchParams,
  request: NextRequest
): boolean {
  const headerCity = decodeHeader(request.headers.get("x-vercel-ip-city"));
  const hasGeoParams = GEO_PARAM_KEYS.some((key) => searchParams.has(key));
  // Re-enrich when the visitor's city changed since the params were written.
  const cityIsCurrent =
    headerCity === undefined || searchParams.get("city") === headerCity;
  return !(hasGeoParams && cityIsCurrent);
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Skip the (expensive) lookup entirely once the URL already carries the geo
  // params — the common case for every request after the first.
  const geo = needsEnrichment(searchParams, request)
    ? await resolveGeo(request)
    : null;

  const params: Array<[string, string]> = [];
  if (geo) {
    for (const key of GEO_PARAM_KEYS) {
      const value = geo[key];
      if (value && searchParams.get(key) !== value) params.push([key, value]);
    }
  }

  console.log(
    `Request for ${pathname} — geo: ${geo ? JSON.stringify(geo) : "already in URL"}`
  );

  if (pathnameHasLocale && params.length === 0) return;

  const url = request.nextUrl.clone();
  if (!pathnameHasLocale) {
    url.pathname = `/${getLocale(request)}${pathname}`;
  }
  for (const [key, value] of params) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, fonts, etc.)
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff|woff2|ttf|otf|mp4|webm)).*)",
  ],
};
