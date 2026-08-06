import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";
import { defaultLocale } from "@/app/[lang]/i18n-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${getSiteOrigin()}/${defaultLocale}`;
  const lastModified = new Date().toISOString();

  return [
    { url: base, lastModified, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/contact-us`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/terms-of-use`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
