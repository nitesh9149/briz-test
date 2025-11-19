import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_APP_URL;
  return [
    {
      url: `${origin}`,
      lastModified: new Date(),
    },
    {
      url: `${origin}/contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${origin}/pages/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${origin}/pages/terms-of-use`,
      lastModified: new Date(),
    },
  ];
}
