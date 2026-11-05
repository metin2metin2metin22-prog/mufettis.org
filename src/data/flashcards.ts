export interface Flashcard {
  id: number;
  slug: string;
  category: string;
  catSlug: 'masak' | 'spl' | 'cia' | 'banka';
  tag: string;
  title: string;
  question: string;
  answer: string;
  legalNote: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    slug: "supheli-islem-bildirimi-masak-sureleri",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "5549 Sayılı Kanun Md. 4",
    title: "Şüpheli İşlem Bildirimi (ŞİB) MASAK Süreleri",
    question: "Şüpheli İşlem Bildirimi (ŞİB) MASAK'a en geç kaç iş günü içinde yapılmalıdır?",
    answer: "Şüpheli işlem bildirimleri, şüphenin doğduğu tarihten itibaren en geç 10 İŞ GÜNÜ içinde, gecikmesinde sakınca bulunan hallerde ise DERHAL MASAK Başkanlığı'na bildirilir.",
    legalNote: "5549 sayılı Kanun Madde 4 uyarınca süre takvim günü değil iş günüdür. İşlem teşebbüs aşamasında kalsa dahi Uyum Görevlisi aracılığıyla MASAK'a bildirilmesi zorunludur."
  },
  {
    id: 2,
    slug: "pay-ile-borclanma-araci-tahvil-farklari",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 3",
    title: "Pay (Hisse Senedi) ile Borçlanma Aracı (Tahvil) Farkları",
    question: "Pay (Hisse Senedi) ile Borçlanma Aracı (Tahvil) arasındaki temel 3 fark nedir?",
    answer: "1) Pay ortaklık hakkı verir; tahvil alacaklılık hakkı verir.\n2) Pay sahibine kâr payı (temettü) ödenir ve garanti değildir; tahvil sahibine faiz ödenir ve garantilidir.\n3) Tasfiye halinde tahvil sahipleri pay sahiplerinden önce alacağını tahsil eder.",
    legalNote: "6362 sayılı Sermaye Piyasası Kanunu uyarınca tahvil sahiplerinin yönetim ve oy hakkı bulunmaz; alacakları tasfiyede pay sahiplerinden önceliklidir."
  },
  {
    id: 3,
    slug: "iia-uc-hat-modeli-ve-ic-denetim",
    category: "CIA Part 1",
    catSlug: "cia",
    tag: "IIA Küresel Standartları",
    title: "IIA Üç Hat Modeli ve İç Denetimin Rolü",
    question: "IIA Üç Hat Modeli'nde (Three Lines Model) İç Denetim hangi hatta yer alır ve kime raporlar?",
    answer: "İç Denetim 3. HATTI oluşturur. Yönetimden bağımsız ve objektif güvence sağlar. İdari olarak Üst Yöneticiye (Genel Müdür), fonksiyonel olarak ise doğrudan Denetim Komitesi / Yönetim Kuruluna raporlar.",
    legalNote: "IIA Standartları gereğince iç denetim hiçbir operasyonel sorumluluk üstlenmez; bağımsızlığını korumak adına fonksiyonel olarak Yönetim Kuruluna bağlıdır."
  },
  {
    id: 4,
    slug: "borsa-istanbul-pay-piyasasi-takas-suresi-valor",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "BIST & Takasbank Yönetmeliği",
    title: "BIST Pay Piyasası Takas Süresi (T+2)",
    question: "Borsa İstanbul Pay Piyasası'nda takas süresi (valör) kural olarak nedir?",
    answer: "Takas süresi T+2'dir. Yani işlemin gerçekleştiği günden sonraki 2. İŞ GÜNÜ saat 15:30'a kadar takas ve nakit transferi Takasbank nezdinde tamamlanır.",
    legalNote: "Hafta sonları ve resmî tatiller valör hesabında iş günü sayılmaz. Takasbank Merkezi Karşı Taraf (MKT) olarak işlemi garanti eder."
  },
  {
    id: 5,
    slug: "gercek-faydalanici-ubo-tespiti-ve-yuzde-25-kurali",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "MASAK Uyum Yönetmeliği Md. 17",
    title: "Gerçek Faydalanıcı (UBO) Tespiti ve %25 Kuralı",
    question: "Gerçek faydalanıcı (Ultimate Beneficial Owner - UBO) tespiti için asgari yüzde kaç ortaklık aranır?",
    answer: "Tüzel kişiliğin %25'i aşan payına veya oy hakkına sahip gerçek kişiler tüzel kişinin gerçek faydalanıcısı kabul edilir ve kimliği doğrulanır.",
    legalNote: "MASAK Tedbirler Yönetmeliği Madde 17/A gereğince %25'i aşan gerçek kişi yoksa nihai kontrol eden, o da bulunamazsa şirketin en üst düzey icra yetkilisi (CEO/GM) UBO sayılır."
  },
  {
    id: 6,
    slug: "dolandiricilik-ucgeni-fraud-triangle-bilesenleri",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "Donald Cressey & ACFE",
    title: "Dolandırıcılık Üçgeni (Fraud Triangle) Bileşenleri",
    question: "Dolandırıcılık Üçgeni'nin (Fraud Triangle) üç temel bileşeni nedir?",
    answer: "1) Baskı / Teşvik (Maddi sıkıntı, hedefler)\n2) Fırsat (Zayıf iç kontrol, denetim eksikliği)\n3) Haklı Gösterme / Rasyonelleştirme ('Zaten hakkımdı', 'Geçici olarak alıyorum').",
    legalNote: "Denetim ve iç kontrol mekanizmaları dolandırıcılık üçgeninin yalnızca 'Fırsat' (Opportunity) ayağını doğrudan ortadan kaldırmayı hedefler."
  },
  {
    id: 7,
    slug: "ic-denetcide-bagimsizlik-ve-1-yil-kurali",
    category: "CIA Part 1",
    catSlug: "cia",
    tag: "IIA Standart 1130.A1",
    title: "İç Denetçinin Objektifliği ve 1 Yıl Kuralı",
    question: "Bir iç denetçinin önceki operasyonel görevine ilişkin güvence denetimi yapabilmesi için en az ne kadar süre geçmelidir?",
    answer: "IIA Standartlarına (1130.A1) göre, iç denetçi daha önce sorumlu olduğu bir operasyonel faaliyeti denetlemek için EN AZ 1 YIL beklemelidir.",
    legalNote: "Bir yıl geçmeden aynı alana güvence verilmesi denetçinin tarafsızlığını zedeler; bu durum Denetim Komitesine bildirilmelidir."
  },
  {
    id: 8,
    slug: "aracilik-yuklenimi-ile-en-iyi-gayret-araciligi-farki",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 31",
    title: "Aracılık Yüklenimi ile En İyi Gayret Aracılığı Farkı",
    question: "Aracılık Yüklenimi ile En İyi Gayret Aracılığı arasındaki risk farkı nedir?",
    answer: "Aracılık Yükleniminde yatırım kuruluşu satılamayan payları satın almayı taahhüt eder (satış riski aracı kurumdadır). En İyi Gayret Aracılığında ise satılamayan paylar ihraççıya iade edilir (satış riski ihraççıdadır).",
    legalNote: "6362 sayılı SPK Madde 31 uyarınca bakiye yükleniminde kalan paylar tam ve nakden aracı kurumca devralınır; ihraççı için garantili satış sağlar."
  },
  {
    id: 9,
    slug: "masak-uyum-gorevlisi-atanma-kriterleri-ve-sorumluluklari",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "MASAK Uyum Yönetmeliği Md. 13",
    title: "MASAK Uyum Görevlisinin Atanması ve Sorumlulukları",
    question: "MASAK Uyum Görevlisi kim tarafından atanır ve idari olarak kime karşı sorumludur?",
    answer: "Uyum görevlisi doğrudan YÖNETİM KURULU tarafından atanır ve görevini yönetim kuruluna doğrudan bağlı olarak yürütür. İcrai birimlerin emir ve talimatlarına tabi değildir.",
    legalNote: "MASAK Uyum Programı Yönetmeliği Madde 13 gereğince atama ve görevden alma münhasıran Yönetim Kurulu yetkisindedir; Genel Müdür atayamaz."
  },
  {
    id: 10,
    slug: "bankacilik-kanununa-gore-sir-saklama-ve-banka-sirri",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "5411 Sayılı Kanun Md. 73",
    title: "Bankacılık Kanunu'na Göre Banka ve Müşteri Sırrı",
    question: "Bankacılık Kanunu'na göre 'Müşteri Sırrı' nedir ve görevden ayrıldıktan sonra devam eder mi?",
    answer: "Sıfat ve görevleri dolayısıyla bankalara veya müşterilerine ait sırları öğrenenler, görevlerinden ayrılsalar dahi bu sırları açıklayamazlar. BDDK, TCMB, MASAK ve adli mercilere bilgi verilmesi sır saklama ihlali sayılmaz.",
    legalNote: "5411 sayılı Bankacılık Kanunu Madde 73 ve 159 uyarınca sır saklama yükümlülüğü süresizdir; ihlali durumunda 1 yıldan 3 yıla kadar hapis cezası öngörülmüştür."
  },
  {
    id: 11,
    slug: "spl-iceriden-ogrenenlerin-ticareti-insider-trading",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 106",
    title: "Bilgi Suistimali (İçeriden Öğrenenlerin Ticareti)",
    question: "6362 sayılı Sermaye Piyasası Kanunu'na göre Bilgi Suistimali (Insider Trading) suçu ve cezası nedir?",
    answer: "Henüz kamuya açıklanmamış, fiyatı etkileyebilecek nitelikteki bilgileri kullanarak menfaat temin etmektir. Cezası 3 YILDAN 5 YILA KADAR HAPİS veya menfaatin en az iki katı tutarında adli para cezasıdır.",
    legalNote: "SPK Madde 106 kapsamında bilginin gizli (içsel) olması ve fiyatı etkileme gücüne sahip bulunması suçun kurucu unsurudur."
  },
  {
    id: 12,
    slug: "bankalarda-sermaye-yeterliligi-standart-orani-syso",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "5411 SK & BDDK Düzenlemeleri",
    title: "Sermaye Yeterliliği Standart Oranı (SYSO)",
    question: "Bankacılık Kanunu ve BDDK düzenlemelerine göre yasal asgari SYSO ile hedef SYSO oranları kaçtır?",
    answer: "Yasal asgari SYSO oranı %8'dir. BDDK tarafından bankalara uygulanan hedef (ihtiyari) sermaye yeterliliği oranı ise %12'dir.",
    legalNote: "5411 sayılı Kanun Madde 45 ve Basel standartları çerçevesinde hesaplanan SYSO, özkaynakların risk ağırlıklı varlıklara bölünmesiyle bulunur."
  }
];
