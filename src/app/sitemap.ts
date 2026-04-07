import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rahulsingh.dev';

  const projectUrls = PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
