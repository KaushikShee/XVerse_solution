import type { MetadataRoute } from 'next';
import { readDbAsync } from '@/lib/db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xverse.solutions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await readDbAsync();
  const publishedPosts = db.blogPosts.filter(p => p.status === 'published');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/about`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/portfolio`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/blog`,              lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
    { url: `${siteUrl}/contact`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = publishedPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
