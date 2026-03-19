import type { Metadata, Viewport } from "next"; 
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
// Yeni eklediğimiz Mobil Uyumlu Navbar Bileşeni
import Navbar from "@/components/Navbar";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
});

const merriweather = Merriweather({ 
  weight: ["300", "400", "700", "900"], 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const SITE_URL = "https://islamicruyatabirleri.com/"; 

export const viewport: Viewport = {
  themeColor: '#fdfcf5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rüya Ansiklopedisi - İslami ve Bilimsel Rüya Tabirleri",
    template: "%s | Rüya Ansiklopedisi" 
  },
  description: "16.000'den fazla rüya tabiri, Diyanet, İhya ve Nablusi kaynaklı yorumlar. Yapay zeka destekli en kapsamlı rüya sözlüğü.",
  verification: {
    yandex: "91420c4d0cb66dd5",
  },
  alternates: {
    canonical: './', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  applicationName: 'Rüya Ansiklopedisi',
  authors: [{ name: 'Rüya Alimi Ekibi' }],
  publisher: 'Noxus Web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rüya Ansiklopedisi",
              "url": SITE_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/arama?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      
      <body className={`${inter.variable} ${merriweather.variable} font-sans text-stone-900 flex flex-col min-h-screen selection:bg-[#f3efe0] selection:text-stone-950`}>
        
        {/* 🚀 ESKİ HEADER SİLİNDİ, YERİNE MOBİL UYUMLU NAVBAR GELDİ */}
        <Navbar />

        {/* --- ANA İÇERİK --- */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- 🏛️ MODERN BEJ FOOTER --- */}
        <footer className="bg-[#faf9f0] text-stone-600 py-16 border-t border-[#eae4cd] mt-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-stone-950 font-serif font-bold text-2xl mb-5 flex items-center gap-2">
                <span>🌙</span> Hakkımızda
              </h3>
              <p className="text-[15px] leading-relaxed max-w-sm text-stone-500">
                Rüya Ansiklopedisi, İslami kaynakları modern teknoloji ile birleştiren en kapsamlı rüya tabirleri platformudur.
              </p>
            </div>
            <div>
              <h3 className="text-stone-950 font-serif font-bold text-lg mb-5 tracking-wide">Bağlantılar</h3>
              <ul className="space-y-3 text-[15px]">
                <li><Link href="/kaynaklar" className="hover:text-stone-950 transition-colors">Kaynakçalar</Link></li>
                <li><Link href="/gizlilik" className="hover:text-stone-950 transition-colors">Gizlilik Politikası</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-stone-950 font-serif font-bold text-lg mb-5 tracking-wide">Mobil Uygulama</h3>
              <p className="text-[15px] mb-4 text-stone-500">Rüyalarınızı cebinizde yorumlayın.</p>
              <Link href="https://play.google.com/store/apps/details?id=com.tunq.ruyaalimi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-stone-900 font-bold hover:text-stone-600 transition-colors border-b border-stone-300 pb-1">
                Play Store'a Git <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#eae4cd] flex flex-col md:flex-row justify-between items-center text-sm text-stone-400 gap-4">
            <span>© {new Date().getFullYear()} Rüya Ansiklopedisi. Tüm hakları saklıdır.</span>
            
            <div className="flex items-center gap-2">
              <span>Developed by</span>
              <a href="https://noxusweb.com" target="_blank" rel="noopener noreferrer" className="text-stone-700 font-bold hover:text-stone-950 transition-colors">
                Noxus Web
              </a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}