export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-stone-800">
      
      <div className="border-b border-[#eae4cd] pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-950 mb-4 tracking-tight">Gizlilik Politikası</h1>
          <p className="text-stone-500 text-[15px] font-medium tracking-wide">Son Güncelleme: 24 Ocak 2026</p>
      </div>
      
      <div className="space-y-10 text-[16px] leading-relaxed font-light text-stone-700">
        <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 tracking-tight">1. Genel Bilgilendirme</h2>
            <p>Rüya Ansiklopedisi ("biz", "sitemiz") olarak kişisel gizliliğinize saygı duyuyoruz. Bu politika, sitemizi ziyaret ettiğinizde hangi bilgilerin toplandığını açıklar.</p>
        </section>

        <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 tracking-tight">2. Çerezler (Cookies) ve Reklamlar</h2>
            <p>Sitemizde Google AdSense reklamları yayınlanmaktadır. Google, reklamları sunmak için çerezleri (cookies) kullanır. Google'ın reklam çerezlerini kullanması, sizin sitemize ve internetteki diğer sitelere yaptığınız ziyaretlere dayalı olarak size uygun reklamlar sunmasını sağlar.</p>
        </section>

        <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 tracking-tight">3. Veri Toplama</h2>
            <p>Sitemiz, ziyaretçi istatistiklerini (hangi sayfaların gezildiği, ziyaret süresi vb.) tutmak için Google Analytics kullanabilir. Bu veriler anonimdir ve kişisel kimliğinizi ortaya çıkarmaz.</p>
        </section>

        <section className="bg-[#faf9f0] p-8 rounded-2xl border border-[#eae4cd] mt-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3 tracking-tight">4. İletişim</h2>
            <p>Gizlilik politikamızla ilgili tüm sorularınız için resmi web sitemiz olan <a href="https://noxusweb.com" target="_blank" rel="noopener noreferrer" className="text-stone-950 font-semibold border-b border-stone-400 hover:text-stone-600 transition-colors">noxusweb.com</a> üzerinden bizimle iletişime geçebilirsiniz.</p>
        </section>
      </div>
    </main>
  );
}