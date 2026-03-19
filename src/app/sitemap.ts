import { MetadataRoute } from 'next';
import dreamsData from '@/data/dreams.json';
export const revalidate = 86400; // 24 Saat (Saniye cinsinden)

const BASE_URL = 'https://www.islamicruyatabirleri.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Veriyi Güvenli Oku
  const allDreams = Array.isArray(dreamsData) ? (dreamsData as any[]) : [];
  
  // 2. Eğer veri boşsa konsola bas (Terminalde görürsün)
  if (allDreams.length === 0) {
    console.error("⚠️ SITEMAP UYARISI: dreams.json boş veya okunamadı!");
  }

  // 3. Statik Sayfalar
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/kaynaklar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 4. Rüya URL'lerini ekle
  const dreamRoutes = allDreams.map((dream) => ({
    url: `${BASE_URL}/tabir/${dream.slug}`,
    lastModified: new Date(), // İstersen sabit tarih yap
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // Hepsini birleştir ve döndür
  return [...routes, ...dreamRoutes];
}