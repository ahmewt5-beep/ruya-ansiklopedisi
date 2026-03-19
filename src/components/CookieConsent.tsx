"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Daha önce kabul edilmiş mi kontrol et
    const consent = localStorage.getItem("cookie-accepted-ruya");
    if (!consent) {
      // 2 saniye gecikmeyle zarifçe ekrana gelsin
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-accepted-ruya", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-[#faf9f0]/95 backdrop-blur-md border border-[#eae4cd] p-6 rounded-[2.5rem] shadow-2xl shadow-stone-300/50 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f3efe0] rounded-full flex items-center justify-center text-xl">
            🍪
          </div>
          <h3 className="font-serif font-bold text-stone-950 text-lg tracking-tight">
            Çerez Deneyimi
          </h3>
        </div>
        
        <p className="text-[14px] text-stone-600 leading-relaxed font-light">
          Rüyalarınızın gizemini çözerken size en iyi deneyimi sunmak için çerezleri kullanıyoruz. 
          <Link href="/gizlilik" className="ml-1 text-stone-950 font-semibold border-b border-stone-300 hover:text-stone-600 transition-colors">
            Gizlilik Politikası
          </Link>
        </p>

        <button
          onClick={acceptCookies}
          className="w-full bg-stone-900 text-[#fdfcf5] py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-stone-700 transition-all active:scale-[0.98] shadow-lg shadow-stone-200"
        >
          Kabul Ediyorum
        </button>
      </div>
    </div>
  );
}