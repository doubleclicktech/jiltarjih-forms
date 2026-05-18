import type { MetadataRoute } from "next";
import { teams } from "@/data/teams";
import { projects } from "@/data/projects";

const BASE_URL = "https://jiltarjih.dz";

export default function sitemap(): MetadataRoute.Sitemap {
  const teamEntries = teams.map((t) => ({
    url: `${BASE_URL}/teams/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectEntries = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/teams`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...teamEntries,
    ...projectEntries,
  ];
}
