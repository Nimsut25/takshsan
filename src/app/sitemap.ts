import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tnlfincorp.in";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/investment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/investment/fd`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/investment/rd`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...[
      "personal",
      "business",
      "home",
      "auto",
      "education",
      "loan-against-property",
    ].map((slug) => ({
      url: `${base}/loans/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
