import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "",
    },
    sitemap: `${getSiteOrigin()}/sitemap.xml`,
  };
}
