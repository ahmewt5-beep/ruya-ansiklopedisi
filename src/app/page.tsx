import Link from "next/link";
import dreams from "@/data/dreams.json"; 
import SearchBox from "@/components/SearchBox"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rüya Ansiklopedisi | En Kapsamlı Rüya Tabirleri Rehberi",
  description: "22.000'den fazla rüya tabiri. İslami kaynaklar ve modern yorumlarla rüyalarınızın gizemini çözün. Diyanet ve İhya kaynaklı tabirler.",
};

export default function Home() {
  const featuredDreams = dreams.slice(0, 60); 
  const alphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");

  return (
    <main className="min-h-screen relative">
      
      {/* 🚀 HERO BÖLÜMÜ (Transparan yapıldı, globals.css arka planı görünecek) */}
      <section className="relative pt-28 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-1.5 px-5 rounded-full bg-[#f3efe0] text-stone-700 text-sm font-semibold tracking-widest mb-8 border border-[#eae4cd]">
            TÜRKİYE'NİN EN KAPSAMLI SÖZLÜĞÜ
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-950 mb-8 leading-[1.1] tracking-tight">
            Rüyalarınızın <br className="hidden md:block" /> Gizemini Çözün
          </h1>
          <p className="text-stone-600 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-14 leading-relaxed">
            İslami kaynaklar ve bilimsel analizlerle <span className="font-semibold text-stone-900 border-b-2 border-[#eae4cd]">22.000+</span> farklı tabir arşivimizde.
          </p>

          {/* Client Component - Arama Kutusu (Etrafına zarif bir glow eklendi) */}
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -inset-4 bg-[#f3efe0] blur-2xl opacity-50 rounded-full z-0"></div>
            <div className="relative z-10">
              <SearchBox />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* 🔠 A-Z İNDEKSİ (Premium Taş Tuşlar) */}
        <div className="mb-24 max-w-5xl mx-auto">
          <h2 className="text-center text-stone-900 font-serif font-bold text-3xl mb-10">Alfabetik Rüya Rehberi</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {alphabet.map((char) => (
              <Link 
                key={char} 
                href={`/harf/${char.toLowerCase()}`} 
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#eae4cd] text-stone-600 hover:bg-stone-900 hover:text-[#fdfcf5] hover:border-stone-900 transition-all duration-300 font-serif text-lg font-medium shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                {char}
              </Link>
            ))}
          </div>
        </div>

        {/* 📚 LİSTE BÖLÜMÜ */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold text-stone-950 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-stone-900 inline-block"></span>
            Popüler Rüya Tabirleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDreams.map((dream: any) => (
            <Link
              key={dream.slug}
              href={`/tabir/${dream.slug}`}
              className="group flex flex-col h-full bg-[#faf9f0] p-7 rounded-3xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-5">
                <span className="text-[11px] font-bold text-stone-600 bg-[#f3efe0] px-3 py-1.5 rounded-full uppercase tracking-widest">
                  {dream.category || "Genel"}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-stone-950 group-hover:text-stone-700 mb-3 font-serif leading-tight">
                {dream.keyword}
              </h3>
              
              <p className="text-stone-500 text-[15px] line-clamp-3 leading-relaxed flex-grow font-light">
                {dream.short_desc || `${dream.keyword} rüyasının İslami ve detaylı anlamı...`}
              </p>
              
              <div className="mt-6 pt-5 border-t border-[#eae4cd] text-stone-900 text-sm font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                Tabiri Oku <span className="ml-2 text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Sinyali / Daha Fazla */}
        <div className="mt-20 text-center">
          <Link 
            href="/tum-ruyalar" 
            className="inline-block px-10 py-4 bg-white border border-stone-200 text-stone-900 font-semibold rounded-full hover:bg-stone-900 hover:text-[#fdfcf5] transition-colors duration-300 shadow-sm"
          >
            Tüm Rüyaları Görüntüle
          </Link>
        </div>

      </div>
    </main>
  );
}