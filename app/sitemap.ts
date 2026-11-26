import type { MetadataRoute } from "next";

import { PROFILE } from "@/constants/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: PROFILE.site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
