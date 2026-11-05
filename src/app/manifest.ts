import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TIC AI — AI for Business in Telugu",
    short_name: "TIC AI",
    description:
      "Learn AI for business in Telugu. Courses, webinar recordings and workflows from the Telugu International Council of AI for Business.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fdfaf3",
    theme_color: "#0e1527",
    lang: "te",
    dir: "ltr",
    categories: ["education", "business"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "My learning", short_name: "Learning", url: "/my-learning" },
      { name: "All courses", short_name: "Courses", url: "/courses" },
    ],
  };
}
