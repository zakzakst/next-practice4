import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  distDir: `out${process.env.NEXT_PUBLIC_BASE_PATH}`,
  trailingSlash: true,
  // SSGではnext/imageが利用できない。unoptimizedで割愛
  images: {
    unoptimized: true,
  },
  compiler: {
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["^data-testid$"] }
        : false,
  },
};

export default nextConfig;
