import os from "node:os";
import path from "node:path";
import geocoder, {
  type AddressObject,
  type AdminCodeObject,
} from "local-reverse-geocoder";

/**
 * Offline reverse geocoding via GeoNames dumps (no per-request network call).
 *
 * On first use the library downloads the GeoNames dumps into `dumpDirectory`
 * and builds an in-memory k-d tree. That first call is slow, so everything
 * below is wrapped in a single lazily-created promise plus a hard timeout —
 * enrichment is best-effort and must never hold up a request.
 *
 * Verified against GeoNames data for Nepal, where the admin levels map to:
 *   admin1 -> province   (Bagmati Province, Gandaki Pradesh, Koshi, ...)
 *   admin2 -> district   (Kathmandu, Kaski, Morang, Rupandehi, ...)
 *   admin3 -> municipality (Pokhara Lekhnath, Biratnagar, Butwal, ...)
 *   admin4 -> unused in the cities dumps (always null)
 */

// Only /tmp is writable on Vercel/Lambda.
const DUMP_DIRECTORY =
  process.env.GEONAMES_DUMP_DIR ?? path.join(os.tmpdir(), "geonames");

/**
 * WARNING: admin3 (municipality) names are not published as a standalone
 * GeoNames dump — enabling this makes the library download and parse
 * `allCountries.txt`, which is ~1.8GB on disk. That will not fit in the /tmp
 * budget of a serverless function and takes minutes to parse. Leave it off on
 * Vercel; only turn it on for a long-running Node server with real disk, or
 * precompute the municipality index at build time instead.
 */
const LOAD_ADMIN3 = process.env.GEO_LOAD_ADMIN3 === "true";

const LOOKUP_TIMEOUT_MS = Number(process.env.GEO_LOOKUP_TIMEOUT_MS ?? 3000);

export interface GeoDetails {
  /** Nearest populated place — the city/town name. */
  city?: string;
  /** GeoNames admin1. Nepal: province. */
  province?: string;
  /** GeoNames admin2. Nepal: district. */
  district?: string;
  /** GeoNames admin3. Nepal: municipality. Only set when GEO_LOAD_ADMIN3=true. */
  municipality?: string;
  country?: string;
  timezone?: string;
  /** Coordinates of the matched place (not of the visitor). */
  placeLatitude?: string;
  placeLongitude?: string;
  /** Distance in km from the queried point to the matched place. */
  distanceKm?: number;
}

let initPromise: Promise<void> | null = null;

function ensureInitialized(): Promise<void> {
  // `lookUp` self-initializes, but doing it explicitly lets us control the
  // options and share one in-flight promise across concurrent requests.
  initPromise ??= new Promise<void>((resolve) => {
    geocoder.init(
      {
        dumpDirectory: DUMP_DIRECTORY,
        // Populated places only (~31MB). Note: restricting via `countries`
        // instead downloads the per-country dump, which includes hotels, road
        // junctions and other non-place features — the nearest match to central
        // Kathmandu comes back as a hotel, so don't use it here.
        citiesFileOverride: "cities1000",
        load: {
          admin1: true, // province  (~150KB)
          admin2: true, // district  (~2.4MB)
          admin3And4: LOAD_ADMIN3, // municipality (~1.8GB — see warning above)
          alternateNames: false, // large, and we only need canonical names
        },
      },
      () => resolve()
    );
  });
  return initPromise;
}

function lookUpNearest(
  latitude: number,
  longitude: number
): Promise<AddressObject | undefined> {
  return new Promise((resolve, reject) => {
    geocoder.lookUp({ latitude, longitude }, 1, ((
      error: Error | null,
      addresses?: AddressObject[][]
    ) => {
      if (error) reject(error);
      else resolve(addresses?.[0]?.[0]);
    }) as Parameters<typeof geocoder.lookUp>[2]);
  });
}

/**
 * Admin codes come back as `{ name, geoNameId }` once the matching codes file
 * is loaded, but as a bare code string ("3", "ER") when it isn't — only the
 * resolved object form is useful in a URL.
 */
function adminName(
  code: AdminCodeObject | string | undefined | null
): string | undefined {
  if (!code || typeof code === "string") return undefined;
  return code.name || undefined;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`geocode timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Resolve a coordinate to its administrative hierarchy. Returns `null` on any
 * failure (timeout, missing dumps, no match) — callers should degrade
 * gracefully rather than treat this as an error.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeoDetails | null> {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  try {
    const address = await withTimeout(
      ensureInitialized().then(() => lookUpNearest(latitude, longitude)),
      LOOKUP_TIMEOUT_MS
    );
    if (!address) return null;

    return {
      city: address.name || undefined,
      province: adminName(address.admin1Code),
      district: adminName(address.admin2Code),
      municipality: adminName(address.admin3Code),
      country: address.countryCode || undefined,
      timezone: address.timezone || undefined,
      placeLatitude: address.latitude || undefined,
      placeLongitude: address.longitude || undefined,
      distanceKm:
        typeof address.distance === "number"
          ? Math.round(address.distance * 100) / 100
          : undefined,
    };
  } catch (error) {
    console.error("[geo] reverse geocode failed", error);
    // Reset so a transient download failure doesn't poison every later request.
    initPromise = null;
    return null;
  }
}
