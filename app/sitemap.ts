import { MetadataRoute } from "next";
import { getAllResolvedCombos } from "@/lib/data/combos";

export default function sitemap(): MetadataRoute.Sitemap {
  const combos = getAllResolvedCombos();
  const baseUrl = "https://fontkin.com";

  const comboUrls = combos.map((combo) => ({
    url: `${baseUrl}/combo/${combo.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...comboUrls,
  ];
}
