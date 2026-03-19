import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

// 🚀 SENIOR DOKUNUŞU: Performans İçin JSON'ı Anlık Okuyoruz
function getDreamsData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/dreams.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Dreams JSON okuma hatası:", error);
    return [];
  }
}

const allDreams = getDreamsData();
const ITEMS_PER_PAGE = 100; 

type Props = {
  params: Promise<{ harf: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// "Rüyada" kelimesini temizleme algoritmanız kusursuz, aynen korudum.
const getRealKeyword = (text: string) => {
  let cleanText = text.toLocaleLowerCase('tr').trim();
  if (cleanText.startsWith("rüyada ")) {
    cleanText = cleanText.replace("rüyada ", "").trim();
  } else if (cleanText.startsWith("rüya ")) {
    cleanText = cleanText.replace("rüya ", "").trim();
  }
  return cleanText;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { harf } = await params;
  const decodedChar = decodeURIComponent(harf).toLocaleUpperCase('tr');
  return {
    title: `${decodedChar} Harfi ile Başlayan Rüyalar - Rüya Ansiklopedisi`,
    description: `${decodedChar} harfiyle başlayan rüya tabirleri arşivi.`,
    alternates: { canonical: `/harf/${harf}` }
  };
}

export default async function HarfPage({ params, searchParams }: Props) {
  const { harf } = await params;
  const resolvedSearchParams = await searchParams;

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const currentPage = page > 0 ? page : 1;
  
  const targetCharRaw = decodeURIComponent(harf);
  const targetChar = targetCharRaw.toLocaleLowerCase('tr').charAt(0);

  const filteredDreams = allDreams.filter((dream: any) => {
    const coreKeyword = getRealKeyword(dream.keyword);
    return coreKeyword.startsWith(targetChar);
  });

  filteredDreams.sort((a: any, b: any) => {
     return getRealKeyword(a.keyword).localeCompare(getRealKeyword(b.keyword), 'tr');
  });

  const totalItems = filteredDreams.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDreams = filteredDreams.slice(startIndex, endIndex);

  const displayChar = targetCharRaw.toLocaleUpperCase('tr');

  if (totalItems === 0) {
    return (
        <main className="min-h-screen py-32 px-6 text-center">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6 tracking-tight">Kayıt Bulunamadı</h1>
            <p className="text-lg text-stone-600 mb-2">"{displayChar}" harfi ile başlayan rüya tabiri bulunamadı.</p>
            <p className="text-[15px] text-stone-400 mb-8">(Sistem "Rüyada..." ön ekini temizleyerek arama yapar)</p>
            <Link href="/" className="inline-block px-8 py-3 bg-stone-900 text-[#fdfcf5] rounded-full font-semibold hover:bg-stone-700 transition">Ana Sayfaya Dön</Link>
        </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 pb-8 border-b border-[#eae4cd] flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <Link href="/" className="text-sm font-medium text-stone-400 hover:text-stone-900 mb-4 inline-block transition">← Ana Sayfa</Link>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-950 tracking-tight">
                    <span className="text-stone-400">{displayChar}</span> Harfi <span className="text-2xl md:text-3xl text-stone-500 font-normal">/ Sayfa {currentPage}</span>
                </h1>
            </div>
            <span className="text-stone-600 text-sm bg-[#faf9f0] px-4 py-2 rounded-full border border-[#eae4cd] font-medium">
                Bu harfte <strong>{totalItems}</strong> rüya var
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
          {currentDreams.map((dream: any) => (
            <Link
              key={dream.slug}
              href={`/tabir/${dream.slug}`}
              className="group flex flex-col bg-[#faf9f0] p-6 rounded-2xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 hover:shadow-xl hover:shadow-stone-200 transition-all duration-300"
            >
              <h2 className="font-serif font-bold text-xl text-stone-900 group-hover:text-stone-600 mb-3 leading-tight tracking-tight">
                {dream.keyword}
              </h2>
              {/* İlk Kelime İpucu */}
              <div className="mt-auto pt-4 border-t border-[#eae4cd] flex justify-between items-center text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                 <span>{getRealKeyword(dream.keyword).split(' ')[0]}</span>
                 <span className="text-stone-900 group-hover:translate-x-1 transition-transform text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Bej Tema */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 py-10 border-t border-[#eae4cd]">
                {currentPage > 1 ? (
                    <Link 
                        href={`/harf/${harf}?page=${currentPage - 1}`}
                        className="px-6 py-3 bg-white border border-[#eae4cd] rounded-full text-stone-700 hover:bg-stone-900 hover:text-[#fdfcf5] transition-all font-semibold shadow-sm"
                    >
                        ← Önceki
                    </Link>
                ) : (
                    <span className="px-6 py-3 border border-[#eae4cd] rounded-full text-stone-400 cursor-not-allowed bg-[#faf9f0]">← Önceki</span>
                )}

                <span className="text-stone-500 font-medium font-serif text-lg">
                    {currentPage} / {totalPages}
                </span>

                {currentPage < totalPages ? (
                    <Link 
                        href={`/harf/${harf}?page=${currentPage + 1}`}
                        className="px-6 py-3 bg-stone-900 border border-stone-900 rounded-full text-[#fdfcf5] hover:bg-stone-700 transition-all font-semibold shadow-lg shadow-stone-200"
                    >
                        Sonraki →
                    </Link>
                ) : (
                    <span className="px-6 py-3 border border-[#eae4cd] rounded-full text-stone-400 cursor-not-allowed bg-[#faf9f0]">Sonraki →</span>
                )}
            </div>
        )}

      </div>
    </main>
  );
}