"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Mobil menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fdfcf5]/80 backdrop-blur-xl border-b border-[#eae4cd] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ana Sayfa">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-500">🌙</span>
            <span className="font-serif font-bold text-2xl text-stone-900 tracking-tight group-hover:text-stone-600 transition">
              Rüya Ansiklopedisi
            </span>
          </Link>

          {/* --- MASAÜSTÜ MENÜ --- */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[15px] font-medium text-stone-600 hover:text-stone-950 transition">Ana Sayfa</Link>
            <Link href="/tum-ruyalar" className="text-[15px] font-medium text-stone-600 hover:text-stone-950 transition">Tüm Tabirler</Link>
            <Link href="/kaynaklar" className="text-[15px] font-medium text-stone-600 hover:text-stone-950 transition">Kaynaklar</Link>
            
            <Link 
              href="https://play.google.com/store/apps/details?id=com.tunq.ruyaalimi" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 text-[#fdfcf5] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-700 transition-colors shadow-lg shadow-stone-200"
            >
              Uygulamayı İndir
            </Link>
          </nav>

          {/* --- MOBİL HAMBURGER BUTONU --- */}
          <button 
            className="md:hidden text-stone-900 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menüyü Aç"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* --- 📱 MOBİL ÇEKMECE (DRAWER) --- */}
      {/* Karanlık Arka Plan (Overlay) */}
      <div 
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Sağdan Gelen Çekmece */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#faf9f0] shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Çekmece Üst Kısım (Kapat Butonu) */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#eae4cd]">
          <span className="font-serif font-bold text-xl text-stone-900 tracking-tight">Menü</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-stone-500 hover:text-stone-900 p-2 focus:outline-none bg-white rounded-full shadow-sm border border-[#eae4cd]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Çekmece Linkleri */}
        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
          <Link href="/" className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors">Ana Sayfa</Link>
          <Link href="/tum-ruyalar" className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors">Tüm Tabirler</Link>
          <Link href="/kaynaklar" className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors">İslami Kaynaklar</Link>
          <Link href="/gizlilik" className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors">Gizlilik</Link>
        </div>

        {/* Çekmece Alt Kısım (Mobil Uygulama Butonu) */}
        <div className="p-6 border-t border-[#eae4cd] bg-[#fdfcf5]">
          <Link 
            href="https://play.google.com/store/apps/details?id=com.tunq.ruyaalimi" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full bg-stone-900 text-[#fdfcf5] py-4 rounded-2xl text-[16px] font-semibold shadow-lg shadow-stone-200 active:scale-95 transition-transform"
          >
            📱 Uygulamayı İndir
          </Link>
        </div>

      </div>
    </>
  );
}