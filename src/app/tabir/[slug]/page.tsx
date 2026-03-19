import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// --- VERİ ÇEKME (Optimized) ---
function getDreamsData() {
  const filePath = path.join(process.cwd(), 'src/data/dreams.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

const allDreams = getDreamsData();

export async function generateStaticParams() {
  return allDreams.slice(0, 200).map((dream: any) => ({
    slug: dream.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dream = allDreams.find((d: any) => d.slug === slug);
  if (!dream) return {};
  const cleanDesc = (dream.short_desc || "").replace(/<[^>]*>?/gm, '').substring(0, 160);
  return {
    title: `Rüyada ${dream.keyword} Görmek - İslami Rüya Tabiri`,
    description: cleanDesc,
  };
}

// --- AKILLI FORMATLAYICI (Mistik Modern Tipografi) ---
function formatDreamContent(content: string, keyword: string) {
  if (!content) return `<p class="text-xl italic text-stone-400">Detaylı tabir hazırlanıyor...</p>`;

  let formatted = content;
  const hasHtml = /<[a-z][\s\S]*>/i.test(formatted);

  // Modern Bej Tipografi
  const headerClass = "text-4xl font-serif font-medium text-stone-950 mt-16 mb-6 leading-tight tracking-tight border-l-4 border-[#eae4cd] pl-5";
  const pClass = "mb-7 leading-[2] text-stone-900 text-xl font-light";

  if (hasHtml) {
    formatted = formatted.replace(/<p>\s*Giriş\s*<\/p>/gi, '');
    formatted = formatted.replace(/^Giriş\s*/gim, '');
    formatted = formatted.replace(/<h[1-2](.*?)>(.*?)<\/h[1-2]>/gi, (match, attrs, innerText) => {
      if (innerText.toLowerCase().includes(keyword.toLowerCase())) return ''; 
      return `<h3 class="${headerClass}">${innerText}</h3>`; 
    });
    formatted = formatted.replace(/<p>/gi, `<p class="${pClass}">`);
    
    const headers = ["İslami Yorum", "Diyanet", "Psikolojik Yorum", "Genel Anlamı", "Ne Anlama Gelir"];
    headers.forEach(h => {
      const regex = new RegExp(`<p[^>]*>\\s*(${h}.*?)\\s*<\\/p>`, 'gi');
      formatted = formatted.replace(regex, `<h3 class="${headerClass}">$1</h3>`);
    });
  } else {
    formatted = formatted.replace(/^Giriş\s*/i, '');
    const lines = formatted.split('\n');
    let html = '';
    const headers = ["İslami Yorum", "Diyanet", "Psikolojik Yorum", "Genel Anlamı", "Ne Anlama Gelir"];

    lines.forEach(line => {
      if (!line.trim()) return;
      const isHeader = headers.some(h => line.includes(h));
      if (isHeader) {
        html += `<h3 class="${headerClass}">${line}</h3>`;
      } else {
        html += `<p class="${pClass}">${line}</p>`;
      }
    });
    formatted = html;
  }

  return formatted;
}

export default async function DreamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dream = allDreams.find((d: any) => d.slug === slug);

  if (!dream) notFound();

  const contentHtml = formatDreamContent(dream.full_content || '', dream.keyword);
  // Zayıf içerik kurtarıcısı
  const isShortContent = (dream.full_content?.length || 0) < 300; 

  const similarDreams = allDreams
    .filter((d: any) => d.category === dream.category && d.slug !== slug)
    .slice(0, 10); // 10 kart yapıyoruz ki asimetrik grid dolsun

  return (
    // Ana Layout: globals.css'teki ay görselleriyle uyumlu, sıcak bej tonları
    <main className="min-h-screen selection:bg-[#f3efe0] selection:text-stone-950">
      
      {/* 🚀 YENİ YAPI: Asimetrik Grid */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 pt-16 pb-24 px-6 md:px-12">
        
        {/* SOL KOLON (SABİT BAŞLIK VE ÖZET) */}
        <div className="lg:col-span-5 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:flex lg:flex-col lg:justify-between pb-10">
          <div>
            <nav className="text-sm font-medium text-stone-400 mb-8 flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-stone-700 transition">Ana Sayfa</Link>
              <span className="opacity-50">›</span>
              <span className="text-stone-700 bg-[#faf9f0] px-3 py-1 rounded-full font-semibold border border-[#eae4cd]">{dream.category || "Rüya Tabiri"}</span>
            </nav>
            
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-stone-950 leading-tight mb-10 tracking-tighter">
              Rüyada {dream.keyword} Görmek
            </h1>

            {/* Kısa Özet Kartı: Lüks Vizon Dokusu (bg-#f3efe0) */}
            {dream.short_desc && (
              <div className="bg-[#f3efe0] p-8 rounded-3xl border border-stone-200 shadow-inner">
                <span className="text-4xl block mb-3">🕯️</span>
                <p className="text-2xl md:text-3xl text-stone-800 font-serif font-medium leading-normal italic">
                  "{dream.short_desc}"
                </p>
              </div>
            )}
          </div>
         
        </div>

        {/* SAĞ KOLON (ANA İÇERİK VE BENZERLERİ) */}
        <div className="lg:col-span-7">
          {/* Ana İçerik Tipografisi: Lüks, Geniş Satır Aralıkları, text-2xl */}
          <article className={`text-stone-900 ${isShortContent ? 'text-2xl leading-[2] text-center italic text-stone-800 font-serif' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>

          {/* Bilgilendirme Kutusu (Bej Uyumlu) */}
          <div className="mt-20 p-6 bg-[#f3efe0]/50 rounded-2xl text-stone-600 text-[17px] leading-relaxed flex gap-4 items-start border border-stone-200/50">
            <span className="text-2xl opacity-60">ℹ️</span>
            <p>
              Rüyalar semboliktir. Buradaki tabirler İmam Nablusi, İbn-i Şirin gibi muteber İslami kaynaklardan derlenmiştir. En doğrusunu Allah bilir.
            </p>
          </div>

          {/* 📚 Benzer Rüyalar: Dinamik Grid (Sağ Alt) */}
          {similarDreams.length > 0 && (
            <div className="mt-24">
              <h3 className="text-3xl font-serif font-semibold text-stone-950 mb-10 tracking-tight">
                📚 Aynı Kategorideki Diğer Tabirler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {similarDreams.map((d: any) => (
                  <Link 
                    key={d.slug} 
                    href={`/tabir/${d.slug}`}
                    className="group flex flex-col p-6 rounded-3xl border border-stone-100 bg-[#faf9f0] hover:bg-white hover:border-stone-300 hover:shadow-stone-200 hover:shadow-2xl transition-all duration-300 ease-out"
                  >
                    <span className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors mb-2 text-xl font-serif tracking-tight">
                      {d.keyword}
                    </span>
                    <span className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                      {d.short_desc || "Detaylı tabir için tıklayın..."}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}