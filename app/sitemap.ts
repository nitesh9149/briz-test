import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";
import { defaultLocale } from "@/app/[lang]/i18n-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${getSiteOrigin()}/${defaultLocale}`;
  const lastModified = new Date();

  return [
    { url: base, lastModified },
    { url: `${base}/contact-us`, lastModified },
    { url: `${base}/privacy-policy`, lastModified },
    { url: `${base}/terms-of-use`, lastModified },
  ];
}
