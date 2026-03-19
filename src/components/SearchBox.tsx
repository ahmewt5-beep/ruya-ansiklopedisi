"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  // Tıklamaları algılamak için referans
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce Algoritması (Kullanıcı yazmayı bitirdiğinde arar, sunucuyu yormaz)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (term.trim().length > 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        } catch (error) {
          console.error("Arama hatası", error);
        }
        setIsSearching(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400); // 400 milisaniye bekler

    return () => clearTimeout(timer);
  }, [term]);

  // Sayfa boşluğuna tıklanınca sonuç listesini kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enter'a basınca veya butona tıklanınca detaylı arama sayfasına yönlendir (İleride yaparsınız)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.length > 2) {
      setIsOpen(false);
      // router.push(`/arama?q=${encodeURIComponent(term)}`);
      console.log("Arama sayfasına gidilecek:", term);
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-3xl mx-auto relative z-50">
      <form onSubmit={handleSearch} className="relative flex items-center bg-white p-2.5 rounded-full shadow-2xl shadow-stone-200/60 border border-stone-100 transition-all duration-300 focus-within:ring-4 focus-within:ring-[#eae4cd] focus-within:border-stone-300">
        <span className="pl-6 text-2xl opacity-40">🔍</span>
        <input
          type="text"
          placeholder="Rüyada ne gördünüz? (Örn: Yılan, Altın, Su)"
          className="w-full px-6 py-4 text-stone-900 bg-transparent outline-none placeholder:text-stone-400 text-lg md:text-xl font-serif"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="bg-stone-900 text-[#fdfcf5] px-8 py-4 rounded-full font-semibold hover:bg-stone-700 transition-colors duration-300 shadow-md whitespace-nowrap"
        >
          Tabir Et
        </button>
      </form>

      {/* 🔮 ARAMA SONUÇLARI (Akıllı Dropdown) */}
      {isOpen && (term.length > 2) && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col transform opacity-100 translate-y-0 transition-all duration-300 origin-top">
          
          {isSearching ? (
            <div className="p-8 text-center text-stone-500 font-medium flex items-center justify-center gap-3">
               <span className="animate-spin text-2xl">⏳</span> Arşiv taranıyor...
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-[#eae4cd]">
              {results.map((dream) => (
                <li key={dream.slug}>
                  <Link 
                    href={`/tabir/${dream.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-5 hover:bg-[#faf9f0] transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-lg text-stone-900 group-hover:text-stone-600 transition-colors">
                        {dream.keyword}
                      </span>
                      <span className="text-sm text-stone-500 font-light truncate max-w-sm mt-1">
                        {dream.short_desc}
                      </span>
                    </div>
                    <span className="text-stone-300 group-hover:text-stone-800 transition-colors text-xl group-hover:translate-x-1 transform duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-stone-500 font-medium">
              "<strong>{term}</strong>" ile ilgili tabir bulunamadı. <br/>
              <span className="text-sm opacity-70">Farklı bir kelime deneyin.</span>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}