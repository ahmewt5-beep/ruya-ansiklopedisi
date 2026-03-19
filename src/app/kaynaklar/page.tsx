import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İslami Rüya Tabiri Kaynakları - Rüya Ansiklopedisi",
  description: "Rüya tabirlerimizde kullandığımız temel kaynaklar: İmam Nablusi, İbn-i Sirin, Seyyid Süleyman.",
};

export default function SourcesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24 relative">
      {/* Dekoratif Mistik Arkaplan Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3efe0] rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
      
      <div className="relative z-10 text-center mb-20">
        <span className="inline-block py-1.5 px-5 rounded-full bg-[#f3efe0] text-stone-700 text-sm font-semibold tracking-widest mb-6 border border-[#eae4cd]">
          KÜTÜPHANE
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-950 tracking-tight mb-8">
          Referans Aldığımız <br className="hidden md:block"/> Kadim Kaynaklar
        </h1>
        <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
          Sitemizdeki tüm tabirler, yüzyıllardır İslam aleminde güvenilirliği kabul edilmiş büyük alimlerin eserlerinden özenle derlenmiştir.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Kaynak 1 */}
        <div className="bg-[#faf9f0] p-10 rounded-3xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 transition-colors duration-300">
          <span className="text-4xl block mb-4 opacity-80">📖</span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">İmam Nablusi</h3>
          <p className="text-[16px] leading-relaxed text-stone-600">
            Abdülganî en-Nablusî (k.s), rüya tabirleri konusunda en detaylı eseri yazan alimlerden biridir. "Ta'tîrü'l-Enâm fî Ta'bîri'l-Menâm" adlı eseri temel kaynağımızdır.
          </p>
        </div>

        {/* Kaynak 2 */}
        <div className="bg-[#faf9f0] p-10 rounded-3xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 transition-colors duration-300">
          <span className="text-4xl block mb-4 opacity-80">📜</span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">İbn-i Sirin</h3>
          <p className="text-[16px] leading-relaxed text-stone-600">
            Muhammed bin Sirin, Tabiin döneminin en büyük rüya tabircisidir. Rüyaları Kuran ve Sünnet ışığında olağanüstü bir ferasetle yorumlamasıyla bilinir.
          </p>
        </div>

        {/* Kaynak 3 */}
        <div className="bg-[#faf9f0] p-10 rounded-3xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 transition-colors duration-300">
          <span className="text-4xl block mb-4 opacity-80">🖋️</span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Seyyid Süleyman</h3>
          <p className="text-[16px] leading-relaxed text-stone-600">
            "Kenzul Menam" eserinin müellifidir. Özellikle modern dönemde en çok başvurulan, dili sade ve yorumları isabetli kaynaklardan biridir.
          </p>
        </div>

        {/* Kaynak 4 */}
        <div className="bg-[#faf9f0] p-10 rounded-3xl border border-[#eae4cd] hover:bg-white hover:border-stone-300 transition-colors duration-300">
          <span className="text-4xl block mb-4 opacity-80">🕌</span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Diyanet İşleri</h3>
          <p className="text-[16px] leading-relaxed text-stone-600">
            Dini kavramların günümüzdeki yorumlanmasında Diyanet İşleri Başkanlığı'nın sahih kaynakları, yayınları ve fetvaları dikkate alınmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}