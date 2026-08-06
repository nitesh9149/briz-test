/**
 * The canonical site origin (scheme + host), derived from NEXT_PUBLIC_APP_URL.
 *
 * Any path on the env value (e.g. a stray "/en") is stripped so that metadata,
 * sitemap, and robots URLs compose correctly. Without this, a base like
 * "https://site.com/en" combined with a page path of "/en" would resolve to
 * "https://site.com/en/en" (a 404) in Open Graph / canonical tags.
 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}
