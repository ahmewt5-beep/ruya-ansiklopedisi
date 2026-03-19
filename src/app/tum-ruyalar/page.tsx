import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

// 🚀 SENIOR DOKUNUŞU: Turbopack çökmesin diye veriyi anlık okuyoruz
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
const ITEMS_PER_PAGE = 50; // Her sayfada 50 rüya gösterelim

export const metadata: Metadata = {
  title: "Tüm Rüya Tabirleri Listesi - A'dan Z'ye Rüya Sözlüğü",
  description: "Rüya Ansiklopedisi arşivindeki tüm rüya tabirlerinin tam listesi.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AllDreamsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const currentPage = page > 0 ? page : 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDreams = allDreams.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allDreams.length / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen relative pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-5 rounded-full bg-[#f3efe0] text-stone-700 text-sm font-semibold tracking-widest mb-6 border border-[#eae4cd]">
              KAPSAMLI ARŞİV
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-950 mb-6 tracking-tight">
              Tüm Tabirler Dizini
            </h1>
            <p className="text-stone-600 text-lg font-light">
              İslami kaynaklara dayanan arşivimizde şu an <span className="font-semibold text-stone-900">{allDreams.length}</span> rüya listeleniyor. <br className="hidden md:block"/> (Sayfa {currentPage} / {totalPages})
            </p>
        </div>

        {/* Liste (Lüks Satırlar) */}
        <div className="bg-[#faf9f0] rounded-3xl shadow-sm border border-[#eae4cd] divide-y divide-[#eae4cd] mb-16 overflow-hidden">
            {currentDreams.map((dream: any) => (
                <Link 
                    key={dream.slug} 
                    href={`/tabir/${dream.slug}`}
                    className="flex justify-between items-center p-6 hover:bg-white transition-colors duration-300 group"
                >
                    <span className="font-serif font-medium text-lg text-stone-800 group-hover:text-stone-600 transition-colors">
                        {dream.keyword}
                    </span>
                    <span className="text-stone-400 text-sm font-medium flex items-center gap-2 group-hover:text-stone-900 transition-colors">
                        Tabiri Oku <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>
            ))}
        </div>

        {/* PAGINATION KONTROLLERİ */}
        <div className="flex justify-center items-center gap-6">
            {/* Önceki Sayfa */}
            {currentPage > 1 ? (
                <Link 
                    href={`/tum-ruyalar?page=${currentPage - 1}`}
                    className="px-6 py-3 bg-white border border-[#eae4cd] rounded-full text-stone-700 hover:bg-stone-900 hover:text-[#fdfcf5] hover:border-stone-900 transition-all duration-300 font-semibold shadow-sm"
                >
                    ← Önceki
                </Link>
            ) : (
                <span className="px-6 py-3 border border-[#eae4cd] rounded-full text-stone-400 cursor-not-allowed bg-[#faf9f0] opacity-70">← Önceki</span>
            )}

            <span className="text-stone-500 font-medium font-serif text-lg">
                {currentPage} / {totalPages}
            </span>

            {/* Sonraki Sayfa */}
            {currentPage < totalPages ? (
                <Link 
                    href={`/tum-ruyalar?page=${currentPage + 1}`}
                    className="px-6 py-3 bg-stone-900 border border-stone-900 rounded-full text-[#fdfcf5] hover:bg-stone-700 transition-all duration-300 font-semibold shadow-lg shadow-stone-200"
                >
                    Sonraki →
                </Link>
            ) : (
                <span className="px-6 py-3 border border-[#eae4cd] rounded-full text-stone-400 cursor-not-allowed bg-[#faf9f0] opacity-70">Sonraki →</span>
            )}
        </div>

      </div>
    </main>
  );
}