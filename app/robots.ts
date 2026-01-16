import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/about",
        "/automated-data-lab",
        "/blog/*",
        "/careers/*",
        "/contact",
        "/consultation",
        "/events",
        "/services/*",
      ],
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/login",
        "/sign-up",
        "/forgot-password",
        "/unsubscribe",
      ],
    },
    sitemap: "https://consultingsmartedge.com/sitemap.xml",
  };
}
