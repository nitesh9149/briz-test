import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reads GeoNames dumps off disk at runtime — must not be bundled.
  serverExternalPackages: ["local-reverse-geocoder"],
};

export default nextConfig;
