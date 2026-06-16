import type { NextConfig } from "next";

// On GitHub Pages this is served from a project subpath (/DiagnostIQ).
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH; locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // static export for GitHub Pages (produces ./out)
  output: "export",
  // GH Pages has no image optimizer; also avoids the dev optimizer choking
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
