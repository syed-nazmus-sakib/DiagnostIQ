// Mirrors basePath in next.config.ts. Use asset() for any reference to a file
// in /public (plain <img> src, <a href> to a static file, etc.) — Next does
// NOT auto-prefix those with the GitHub Pages base path the way it does for
// next/image, next/link, and bundled assets.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
