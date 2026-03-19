import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://www.islamicruyatabirleri.com'; // Domainini buraya da yaz

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Varsa gizli yerler
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Sitemap yolunu gösteriyoruz
  };
}