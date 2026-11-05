export interface Flashcard {
  id: number;
  slug: string;
  category: string;
  catSlug: 'masak' | 'spl' | 'cia' | 'banka';
  tag: string;
  title: string;
  seoDescription: string;
  question: string;
  answer: string;
  legalBasis: {
    lawName: string;
    article: string;
    details: string;
    keyPoints: string[];
  };
  examTip: {
    title: string;
    trapWarning: string;
    mnemonicOrRule: string;
  };
  practiceQuestion: {
    question: string;
    options: {
      key: 'A' | 'B' | 'C' | 'D';
      text: string;
    }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
  };
  relatedArticleSlug: string;
  relatedArticleTitle: string;
  relatedExamSlug: string;
  relatedExamTitle: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    slug: "supheli-islem-bildirimi-masak-sureleri",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "5549 Sayılı Kanun Md. 4",
    title: "Şüpheli İşlem Bildirimi (ŞİB) MASAK Süreleri ve Bildirim Usulü",
    seoDescription: "5549 sayılı Kanun kapsamında Şüpheli İşlem Bildirimi (ŞİB) kaç iş gününde MASAK'a iletilir? Sınav tuzakları, mevzuat maddesi ve çözümlü soru.",
    question: "Şüpheli İşlem Bildirimi (ŞİB) MASAK'a en geç kaç iş günü içinde yapılmalıdır?",
    answer: "Şüpheli işlem bildirimleri, şüphenin doğduğu tarihten itibaren en geç 10 İŞ GÜNÜ içinde, gecikmesinde sakınca bulunan hallerde ise DERHAL MASAK Başkanlığı'na bildirilir.",
    legalBasis: {
      lawName: "5549 Sayılı Suç Gelirlerinin Aklanmasının Önlenmesi Hakkında Kanun",
      article: "Madde 4 ve Şüpheli İşlem Bildirimi Genel Tebliği",
      details: "Yükümlüler nezdinde veya bunlar aracılığıyla yapılan veya yapılmaya teşebbüs edilen işlemlerin yasa dışı yollardan elde edildiğine veya yasa dışı amaçlarla kullanılacağına dair herhangi bir bilgi, şüphe veya şüpheyi gerektirecek bir hususun bulunması halinde bu işlemlerin yükümlüler tarafından MASAK'a bildirilmesi zorunludur.",
      keyPoints: [
        "Normal ŞİB süresi şüphenin doğduğu andan itibaren en geç 10 iş günüdür.",
        "Gecikmesinde sakınca bulunan hallerde bildirim 'derhal' yapılmalıdır.",
        "İşlemin gerçekleşmiş olması şart değildir; 'teşebbüs aşamasında' kalan işlemler de bildirime tabidir.",
        "Bildirimler elektronik ortamda EMIS.ONLINE sistemi üzerinden Uyum Görevlisi aracılığıyla yapılır."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Sınav sorularında en sık düşülen tuzak: '10 takvim günü' veya '30 gün' seçenekleridir. Süre kesinlikle TAKVİM GÜNÜ DEĞİL, 'İŞ GÜNÜ' olarak düzenlenmiştir.",
      mnemonicOrRule: "Altın Kural: 10 İŞ GÜNÜ + Teşebbüs de Bildirilir + Uyum Görevlisi İmzalar."
    },
    practiceQuestion: {
      question: "5549 sayılı Kanun ve ilgili mevzuat uyarınca yükümlüler tarafından gerçekleştirilen şüpheli işlem bildirimleri (ŞİB) ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
      options: [
        { key: "A", text: "Şüphenin oluştuğu tarihten itibaren en geç 10 iş günü içinde bildirim yapılmalıdır." },
        { key: "B", text: "İşlem müşteri tarafından iptal edilmiş veya teşebbüs aşamasında kalmış olsa dahi bildirim yükümlülüğü devam eder." },
        { key: "C", text: "Bildirim süresi kanunda 10 takvim günü olarak öngörülmüş olup hafta sonları süreye dahildir." },
        { key: "D", text: "Gecikmesinde sakınca bulunan hallerde işlem derhal MASAK Başkanlığı'na iletilir." }
      ],
      correctAnswer: "C",
      explanation: "Doğru yanıt C seçeneğidir. 5549 sayılı Kanun ve MASAK yönetmeliklerine göre ŞİB süresi '10 takvim günü' değil, kesin olarak '10 İŞ GÜNÜ'dür. Hafta sonu ve resmî tatiller bu süreye dahil edilmez."
    },
    relatedArticleSlug: "masak-uyum-gorevlisi-yetkilendirme-sinavi-konu-anlatimi-ve-cozumlu-sorular",
    relatedArticleTitle: "MASAK Uyum Görevlisi Sınavı Kapsamlı Konu Anlatımı",
    relatedExamSlug: "masak-uyum-gorevlisi-yetkilendirme-deneme-sinavi-modul-1",
    relatedExamTitle: "MASAK Modül 1 Çözümlü Deneme Sınavı"
  },
  {
    id: 2,
    slug: "pay-ile-borclanma-araci-tahvil-farklari",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 3",
    title: "Pay (Hisse Senedi) ile Borçlanma Aracı (Tahvil) Arasındaki Farklar",
    seoDescription: "Sermaye piyasasında pay senedi ile tahvil/bono arasındaki ortaklık, temettü, faiz ve tasfiye önceliği farkları. SPL sınav tüyoları ve çözümlü soru.",
    question: "Pay (Hisse Senedi) ile Borçlanma Aracı (Tahvil) arasındaki temel 3 fark nedir?",
    answer: "1) Pay ortaklık hakkı verir; tahvil alacaklılık hakkı verir.\n2) Pay sahibine kâr payı (temettü) ödenir ve garanti değildir; tahvil sahibine faiz ödenir ve garantilidir.\n3) Tasfiye halinde tahvil sahipleri pay sahiplerinden önce alacağını tahsil eder.",
    legalBasis: {
      lawName: "6362 Sayılı Sermaye Piyasası Kanunu",
      article: "Madde 3, Madde 18 ve Madde 31",
      details: "Sermaye piyasası araçları; menkul kıymetler ve türev araçlar ile Kurulca bu kapsamda kabul edilen diğer sermaye piyasası araçlarını ifade eder. Menkul kıymetler ise ortaklık veya borçluluk sağlayan kıymetli evrak niteliğindeki belgelerdir.",
      keyPoints: [
        "Pay sahipleri şirketin mülkiyetine ortak olur, genel kurula katılır, oy kullanır.",
        "Tahvil sahipleri yalnızca şirketin borçlusu durumundadır; yönetimde oy hakkı yoktur.",
        "Tahvil getirisinde faiz önceden belirlenir ve şirket zarar etse dahi ödenir.",
        "Şirketin iflası veya tasfiyesi halinde önce alacaklılar ve tahvil sahipleri ödenir; kalan bakiye pay sahiplerine dağıtılır."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Sınavda 'Tahvil sahipleri kâr payı alabilir mi?' sorusu kâr-zarar ortaklığı belgesiyle karıştırılır. Klasik tahvilde getiri daima faizdir ve kârdan bağımsızdır.",
      mnemonicOrRule: "Altın Kural: Pay = Ortaklık + Temettü + Yönetim; Tahvil = Alacak + Faiz + Tasfiye Önceliği."
    },
    practiceQuestion: {
      question: "Anonim şirketlerin ihraç ettiği pay senetleri ile tahviller karşılaştırıldığında aşağıdakilerden hangisi kesinlikle doğrudur?",
      options: [
        { key: "A", text: "Tahvil sahipleri şirketin genel kurul toplantılarına katılarak oy kullanma hakkına sahiptir." },
        { key: "B", text: "Şirketin tasfiyesi halinde pay sahipleri, alacaklarını tahvil sahiplerinden önce tahsil eder." },
        { key: "C", text: "Tahvil sahibinin şirketten talep edeceği faiz geliri şirketin o yıl net dönem kârı elde etmesi şartına bağlıdır." },
        { key: "D", text: "Tahvil alacaklılık hakkı sağlarken, pay senedi mülkiyete ve şirkete ortaklık hakkı sağlar." }
      ],
      correctAnswer: "D",
      explanation: "Doğru yanıt D seçeneğidir. Pay senedi sahibine ortaklık sıfatı ve kârdan pay alma hakkı verirken; tahvil sahibi şirketin alacaklısıdır, oy hakkı yoktur ve faizi şirket zarar etse dahi sözleşme şartlarına göre ödenir."
    },
    relatedArticleSlug: "spl-sermaye-piyasasi-araclari-1-ders-notlari",
    relatedArticleTitle: "SPL Sermaye Piyasası Araçları 1 Ders Notları",
    relatedExamSlug: "spl-sermaye-piyasasi-araclari-1-deneme-sinavi",
    relatedExamTitle: "SPL Sermaye Piyasası Araçları 1 Deneme Sınavı"
  },
  {
    id: 3,
    slug: "iia-uc-hat-modeli-ve-ic-denetim",
    category: "CIA Part 1",
    catSlug: "cia",
    tag: "IIA Küresel Standartları",
    title: "IIA Üç Hat Modeli (Three Lines Model) ve İç Denetimin Rolü",
    seoDescription: "IIA Üç Hat Modeli'nde 1., 2. ve 3. hatların görev dağılımı. İç denetimin bağımsız güvence rolü, idari ve fonksiyonel raporlama farkları.",
    question: "IIA Üç Hat Modeli'nde (Three Lines Model) İç Denetim hangi hatta yer alır ve kime raporlar?",
    answer: "İç Denetim 3. HATTI oluşturur. Yönetimden tamamen bağımsız ve objektif güvence sağlar. İdari olarak Üst Yöneticiye (Genel Müdür), fonksiyonel olarak ise doğrudan DENETİM KOMİTESİ / YÖNETİM KURULUNA raporlar.",
    legalBasis: {
      lawName: "IIA (Uluslararası İç Denetçiler Enstitüsü) Küresel İç Denetim Standartları",
      article: "Standart 1100 - Bağımsızlık ve Objektiflik & Üç Hat Modeli Rehberi",
      details: "Üç Hat Modeli, bir kuruluşun risklerini yönetirken rollerin net ayrılmasını sağlar. Yönetim organı (Yönetim Kurulu), hesap verebilirlik merkezidir. İlk iki hat operasyonel yönetim ve uyum gözetimini yaparken; 3. hat bağımsız güvence sağlar.",
      keyPoints: [
        "1. Hat: Operasyonel yönetim ve süreç sahipleri (riskleri günlük olarak yönetir).",
        "2. Hat: Risk yönetimi, uyum (compliance), iç kontrol ve kalite kontrol fonksiyonları.",
        "3. Hat: İç Denetim (bağımsız ve objektif güvence ile danışmanlık sağlar).",
        "İç Denetim asla operasyonel sorumluluk üstlenmez."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Sınavlarda 'İç Denetim kimin emrindedir?' sorusu çok sık gelir. Çeldirici: 'Genel Müdüre bağlıdır'. Doğru ayrım: İdari bağ Genel Müdür/CEO olabilir, ancak fonksiyonel yetki ve raporlama daima YÖNETİM KURULU / DENETİM KOMİTESİ'ne aittir.",
      mnemonicOrRule: "Altın Kural: 1. Hat = Operasyon, 2. Hat = Uyum/Risk, 3. Hat = İç Denetim. Raporlama: Fonksiyonel -> Yönetim Kurulu."
    },
    practiceQuestion: {
      question: "IIA Üç Hat Modeli (Three Lines Model) kapsamında iç denetim fonksiyonunun konumu ve raporlama ilişkisi ile ilgili aşağıdakilerden hangisi doğrudur?",
      options: [
        { key: "A", text: "İç denetim 2. hatta yer alır ve operasyonel risk limitlerini belirler." },
        { key: "B", text: "İç denetim bağımsızlığını korumak adına fonksiyonel olarak doğrudan Yönetim Kurulu / Denetim Komitesine raporlama yapar." },
        { key: "C", text: "İç denetim yöneticisinin görevden alınması veya atanması yalnızca Genel Müdürün tek taraflı tasarrufundadır." },
        { key: "D", text: "İç denetim, kuruluşun iç kontrol prosedürlerini bizzat tasarlar ve operasyonel olarak yürütür." }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. IIA Standartlarına göre İç Denetim 3. hattır. Objektiflik ve bağımsızlığın teminatı olarak fonksiyonel açıdan en üst yönetim organı olan Yönetim Kurulu veya Denetim Komitesine raporlar."
    },
    relatedArticleSlug: "ucuncu-satir-modeli-three-lines-model-ve-ic-denetimde-rolu",
    relatedArticleTitle: "Üçüncü Satır Modeli (Three Lines Model) ve İç Denetimdeki Rolü",
    relatedExamSlug: "cia-part-1-deneme-sorulari-20-soru-cozumlu-ve-aciklamali-test",
    relatedExamTitle: "CIA Part 1 Çözümlü Deneme Sınavı"
  },
  {
    id: 4,
    slug: "borsa-istanbul-pay-piyasasi-takas-suresi-valor",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "BIST & Takasbank Yönetmeliği",
    title: "Borsa İstanbul Pay Piyasası Takas Süresi (T+2 Valör Kuralı)",
    seoDescription: "Borsa İstanbul Pay Piyasasında takas ve saklama süresi nedir? T+2 valörü, nakit transferi saatleri ve Takasbank merkezi karşı taraf rolü.",
    question: "Borsa İstanbul Pay Piyasası'nda takas süresi (valör) kural olarak nedir?",
    answer: "Takas süresi T+2'dir. Yani işlemin gerçekleştiği günden sonraki 2. İŞ GÜNÜ saat 15:30'a kadar takas ve nakit transferi tamamlanır.",
    legalBasis: {
      lawName: "6362 Sayılı Sermaye Piyasası Kanunu & Takasbank Merkezi Karşı Taraf Yönetmeliği",
      article: "SPK Takas ve Saklama Düzenlemeleri",
      details: "Borsa İstanbul Pay Piyasası'nda alım satımı gerçekleştirilen pay senetlerinin mülkiyet devri ve nakit takası Takasbank nezdinde çok taraflı netleştirme yöntemiyle T+2 valöründe sonuçlandırılır.",
      keyPoints: [
        "T: İşlem günü (Trade Date).",
        "T+2: İşlem gününü izleyen ikinci iş günü.",
        "Resmî tatiller ve hafta sonları valör hesabında iş günü sayılmaz.",
        "Takasbank, işlemlerde Merkezi Karşı Taraf (MKT) olarak takasın tamamlanmasını garanti eder."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Cuma günü yapılan bir hisse alımının takası Pazartesi değil, SALI günü gerçekleşir (Cumartesi ve Pazar iş günü değildir). Sınavlarda tarih hesaplama sorularında takvim gününe kanmayın!",
      mnemonicOrRule: "Altın Kural: Cuma T ise -> Pazartesi T+1 -> Salı T+2 (Takas Günü)."
    },
    practiceQuestion: {
      question: "Perşembe günü Borsa İstanbul Pay Piyasası'nda hisse senedi alım işlemi gerçekleştiren bir yatırımcının işlemi, araya herhangi bir resmî tatil girmediği varsayımı altında hangi gün takasa bağlanır?",
      options: [
        { key: "A", text: "Cuma günü (T+1)" },
        { key: "B", text: "Pazartesi günü (T+2)" },
        { key: "C", text: "Cumartesi günü (T+2)" },
        { key: "D", text: "Salı günü (T+3)" }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. Perşembe işlem günüdür (T). Cuma birinci iş günüdür (T+1). Hafta sonu iş günü sayılmadığından ikinci iş günü Pazartesi'dir (T+2). Dolayısıyla takas Pazartesi günü sonuçlanır."
    },
    relatedArticleSlug: "spl-takas-saklama-ve-operasyon-islemleri-ders-notlari",
    relatedArticleTitle: "SPL Takas, Saklama ve Operasyon İşlemleri Notları",
    relatedExamSlug: "spl-takas-saklama-ve-operasyon-islemleri-deneme-sinavi",
    relatedExamTitle: "SPL Takas ve Saklama Deneme Sınavı"
  },
  {
    id: 5,
    slug: "gercek-faydalanici-ubo-tespiti-ve-yuzde-25-kurali",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "MASAK Uyum Yönetmeliği Md. 17",
    title: "Gerçek Faydalanıcı (UBO) Tespiti ve Asgari %25 Ortaklık Kuralı",
    seoDescription: "Tüzel kişilerde gerçek faydalanıcının (Ultimate Beneficial Owner) tespiti. MASAK %25 hisse kuralı, nihai kontrol ve üst düzey yönetici istisnası.",
    question: "Gerçek faydalanıcı (Ultimate Beneficial Owner - UBO) tespiti için asgari yüzde kaç ortaklık aranır?",
    answer: "Tüzel kişiliğin %25'i aşan payına veya oy hakkına sahip gerçek kişiler tüzel kişinin gerçek faydalanıcısı kabul edilir ve kimliği doğrulanır.",
    legalBasis: {
      lawName: "Suç Gelirlerinin Aklanmasının ve Terörün Finansmanının Önlenmesine Dair Tedbirler Yönetmeliği",
      article: "Madde 17/A - Gerçek Faydalanıcının Tanınması",
      details: "Yükümlüler, tüzel kişilerin gerçek faydalanıcısını tespit etmek amacıyla gerekli tedbirleri alır. Tüzel kişiliğin yüzde yirmi beşi aşan hissesine sahip gerçek kişi ortaklar tüzel kişinin gerçek faydalanıcısı kabul edilir.",
      keyPoints: [
        "Temel eşik: Tüzel kişinin %25'i AŞAN hisse veya oy hakkı.",
        "%25'i aşan gerçek kişi bulunamazsa tüzel kişiliği nihai olarak kontrol eden gerçek kişi tespit edilir.",
        "Gerçek faydalanıcı hiçbir şekilde tespit edilemezse en üst düzey icra yetkisine sahip yönetici (Genel Müdür/Yön. Kur. Bşk.) gerçek faydalanıcı olarak kabul edilir.",
        "Borsaya kote halka açık şirketlerin kimlik tespitinde kolaylaştırılmış tedbirler uygulanabilir."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "'%25 ve üzeri' ifadesi yanlıştır, kanun metninde '%25'İ AŞAN' (yani %25.01 ve yukarısı) yazar. Ayrıca hiçbir ortak %25'i aşmıyorsa şirketin üst düzey yöneticisi UBO sayılır.",
      mnemonicOrRule: "Altın Formül: %25+ Hisse -> Yoksa Nihai Kontrol Eden -> O da Yoksa Üst Yönetici (CEO)."
    },
    practiceQuestion: {
      question: "MASAK Tedbirler Yönetmeliği uyarınca tüzel kişilerde gerçek faydalanıcının tespiti ile ilgili olarak, hiçbir gerçek kişinin %25'i aşan hissesi bulunmadığında ve kontrol eden başka bir şahıs tespit edilemediğinde kim gerçek faydalanıcı kabul edilir?",
      options: [
        { key: "A", text: "Şirketin tüm yönetim kurulu üyeleri müştereken" },
        { key: "B", text: "Şirketin en yüksek paya sahip ilk iki tüzel kişi ortağı" },
        { key: "C", text: "Tüzel kişiyi temsil yetkisini haiz en üst düzey icra yetkilisi (CEO / Genel Müdür)" },
        { key: "D", text: "Şirketin bağımsız denetimini gerçekleştiren başdenetçi" }
      ],
      correctAnswer: "C",
      explanation: "Doğru yanıt C seçeneğidir. Yönetmeliğin 17/A maddesi uyarınca %25'i aşan pay sahibi veya nihai kontrol eden gerçek kişi bulunamazsa, şirketin en üst düzey icra yetkisine sahip yöneticisi gerçek faydalanıcı olarak kayıtlara geçirilir."
    },
    relatedArticleSlug: "modul-1-masak-uyum-gorevlisi-yetkilendirme-sinavi-detayli-konu-anlatim",
    relatedArticleTitle: "MASAK Modül 1 Müşterinin Tanınması (KYC) Rehberi",
    relatedExamSlug: "masak-uyum-gorevlisi-yetkilendirme-deneme-sinavi-modul-1",
    relatedExamTitle: "MASAK Uyum Yetkilendirme Deneme Sınavı"
  },
  {
    id: 6,
    slug: "dolandiricilik-ucgeni-fraud-triangle-bilesenleri",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "Donald Cressey & ACFE Modeli",
    title: "Dolandırıcılık Üçgeni (Fraud Triangle) ve Denetim Kontrolleri",
    seoDescription: "Dolandırıcılık Üçgeninin 3 unsuru: Baskı, Fırsat ve Haklı Gösterme. Banka teftişinde suiistimal tespiti ve iç denetçinin odaklanması gereken bileşen.",
    question: "Dolandırıcılık Üçgeni'nin (Fraud Triangle) üç temel bileşeni nedir?",
    answer: "1) Baskı / Teşvik (Maddi sıkıntı, hedefler)\n2) Fırsat (Zayıf iç kontrol, denetim eksikliği)\n3) Haklı Gösterme / Rasyonelleştirme ('Zaten hakkımdı', 'Geçici olarak alıyorum').",
    legalBasis: {
      lawName: "Uluslararası Denetim Standartları (ISA 240) & ACFE Standartları",
      article: "Hile ve Usulsüzlük Riskinin Değerlendirilmesi",
      details: "Donald Cressey tarafından ortaya konan Dolandırıcılık Üçgeni, bir bireyin kurum aleyhine finansal suiistimal yapmasına zemin hazırlayan psikolojik ve çevresel şartları modeller.",
      keyPoints: [
        "Baskı (Pressure): Kumar, borç, aşırı satış hedefleri veya lüks yaşama isteği.",
        "Fırsat (Opportunity): Yetki aşımı, görevler ayrılığı ilkesinin ihlali, gözetimsizlik.",
        "Haklı Gösterme (Rationalization): 'Banka zaten çok kazanıyor', 'Bana az maaş veriyorlar'.",
        "İç Denetim ve Yönetimin müdahale edebileceği ve yok edebileceği TEK unsur FIRSAT unsurudur."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Soru: 'İç kontrol mekanizmaları dolandırıcılık üçgeninin hangi ayağını doğrudan engeller?' Cevap: Yalnızca FIRSAT (Opportunity). Bir kişinin kafasındaki baskıyı veya ahlaki rasyonelleştirmeyi iç kontrol sistemi doğrudan yok edemez.",
      mnemonicOrRule: "Altın Kural: Baskı kalpte/cepte, Haklı Gösterme akılda, Fırsat sistemdedir. Denetim sistemi (fırsatı) kapatır."
    },
    practiceQuestion: {
      question: "Banka teftiş kurulları ve iç denetim fonksiyonlarının tesis ettiği kontrol matrisleri ve görevler ayrılığı ilkeleri, Dolandırıcılık Üçgeni'nin hangi bileşenini doğrudan ortadan kaldırmayı hedefler?",
      options: [
        { key: "A", text: "Baskı / Teşvik (Pressure)" },
        { key: "B", text: "Fırsat (Opportunity)" },
        { key: "C", text: "Haklı Gösterme / Rasyonelleştirme (Rationalization)" },
        { key: "D", text: "Kişisel Hırs ve Ego (Greed)" }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. Kurumlar çalışanların kişisel borç baskısını veya ahlaki bakış açılarını doğrudan kontrol edemez; ancak sıkı iç kontrol, yetki limitleri ve çift imza kuralları ile hile yapma FIRSATINI ortadan kaldırabilirler."
    },
    relatedArticleSlug: "dolandiricilik-ucgeni-ve-yaygin-dolandiricilik-turleri",
    relatedArticleTitle: "Dolandırıcılık Üçgeni ve Yaygın Hile Türleri",
    relatedExamSlug: "cia-part-1-deneme-sorulari-20-soru-cozumlu-ve-aciklamali-test-blogunu-sec-cia-part-1-deneme-sorulari-20-soru-cozumlu-ve-aciklamali-test-3",
    relatedExamTitle: "CIA Hile ve Usulsüzlük Denetimi Deneme Sınavı"
  },
  {
    id: 7,
    slug: "ic-denetcide-bagimsizlik-ve-1-yil-kurali",
    category: "CIA Part 1",
    catSlug: "cia",
    tag: "IIA Standart 1130.A1",
    title: "İç Denetçinin Objektifliği ve 1 Yıl Kuralı (Cooling-off Period)",
    seoDescription: "İç denetçinin daha önce çalıştığı operasyonel birimi denetlemesi için gereken bekleme süresi. IIA 1 yıl kuralı, tarafsızlık tehditleri ve çözümlü soru.",
    question: "Bir iç denetçinin önceki operasyonel görevine ilişkin güvence denetimi yapabilmesi için en az ne kadar süre geçmelidir?",
    answer: "IIA Standartlarına göre, iç denetçi daha önce sorumlu olduğu bir operasyonel faaliyeti denetlemek için EN AZ 1 YIL beklemelidir.",
    legalBasis: {
      lawName: "IIA Uluslararası İç Denetim Standartları",
      article: "Standart 1130 - Bağımsızlık ve Objektifliğin Bozulması (1130.A1)",
      details: "İç denetçiler, daha önce sorumlu oldukları faaliyetler hakkında güvence hizmeti sunmaktan kaçınmalıdırlar. Bir iç denetçinin son bir yıl içinde sorumlu olduğu bir faaliyete güvence hizmeti sağlaması durumunda objektifliğin bozulduğu varsayılır.",
      keyPoints: [
        "1 yıllık bekleme süresi 'Güvence Hizmetleri' için zorunludur.",
        "Eğer denetçi 1 yıl dolmadan denetim yapmak zorunda kalırsa durum Denetim Komitesine derhal açıklanmalıdır.",
        "Danışmanlık hizmetlerinde ise 1 yıl kuralı katı bir yasak olmayıp, gerekli tedbirler alınarak yönetilebilir.",
        "Denetçi, yakın akrabasının çalıştığı birimi denetlerken de objektiflik zedelenir."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Çeldirici olarak '6 ay' veya '2 yıl' verilir. Doğru süre kesinlikle '1 YIL'dır (12 ay). Ayrıca bu kural GÜVENCE hizmeti için bağlayıcıdır, danışmanlıkta istisnalar vardır.",
      mnemonicOrRule: "Altın Kural: Kendi yazdığın faturayı denetlemek için en az 1 YIL soğuma süresi şarttır."
    },
    practiceQuestion: {
      question: "Geçtiğimiz 8 ay boyunca Kredi Tahsis Biriminde uzman olarak çalıştıktan sonra Banka Teftiş Kuruluna iç denetçi olarak transfer olan bir denetçinin Kredi Tahsis süreçlerine atanması hakkında IIA Standartları ne söyler?",
      options: [
        { key: "A", text: "Geçmiş tecrübesi birime değer katacağı için güvence denetimini doğrudan tek başına yürütmelidir." },
        { key: "B", text: "En az 1 yıl geçmeden bu birime yönelik güvence denetimi yapması objektifliğin bozulması anlamına gelir." },
        { key: "C", text: "Genel Müdür yazılı izin verirse herhangi bir bekleme süresi olmaksızın denetim yapılabilir." },
        { key: "D", text: "Sadece son 3 aydaki işlemleri denetlemek kaydıyla göreve başlayabilir." }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. IIA 1130.A1 standardı gereğince bir denetçinin son bir yıl içinde operasyonel sorumluluk üstlendiği bir alanda güvence görevi üstlenmesi tarafsızlığı zedeler."
    },
    relatedArticleSlug: "bagimsizlik-ve-objektiflik-tehditler-ve-korumalar",
    relatedArticleTitle: "İç Denetimde Bağımsızlık ve Objektiflik Tehditleri",
    relatedExamSlug: "cia-part-1-deneme-sorulari-20-soru-cozumlu-ve-aciklamali-test",
    relatedExamTitle: "CIA Part 1 Meslek Standartları Denemesi"
  },
  {
    id: 8,
    slug: "aracilik-yuklenimi-ile-en-iyi-gayret-araciligi-farki",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 31",
    title: "Aracılık Yüklenimi ile En İyi Gayret Aracılığı Arasındaki Risk Farkı",
    seoDescription: "Halka arzda bakiye yüklenim, tümünü yüklenim ve en iyi gayret aracılığı farkları. Satış riskinin kime ait olduğu ve SPL sınav soru çözümü.",
    question: "Aracılık Yüklenimi ile En İyi Gayret Aracılığı arasındaki risk farkı nedir?",
    answer: "Aracılık Yükleniminde yatırım kuruluşu satılamayan payları satın almayı taahhüt eder (satış riski aracı kurumdadır). En İyi Gayret Aracılığında ise satılamayan paylar ihraççıya iade edilir (satış riski ihraççıdadır).",
    legalBasis: {
      lawName: "6362 Sayılı Sermaye Piyasası Kanunu",
      article: "Madde 31 - Halka Arzda Satış ve Aracılık Türleri",
      details: "Sermaye piyasası araçlarının halka arz yoluyla satışında; aracı kuruluşların satılmayan payları bedelini tam ve nakden ödeyerek satın almayı taahhüt etmeleri 'Aracılık Yüklenimi', satılamayan payları ihraççıya iade etmeleri 'En İyi Gayret Aracılığı'dır.",
      keyPoints: [
        "Bakiyeyi Yüklenim: Satış süresi sonunda satılamayan kısım aracı kurumca satın alınır.",
        "Tümünü Yüklenim: Payların tamamı satış başlamadan önce aracı kurum tarafından bedeli ödenerek devralınır.",
        "En İyi Gayret: Aracı kurum elinden geleni yapar ancak satılmayan paylar için hiçbir finansal taahhüt altına girmez.",
        "En risksiz olan aracılık türü ihraççı açısından Aracılık Yüklenimidir."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "'En İyi Gayret Aracılığında satılamayan payları kim satın alır?' sorusu gelir. Kimse satın almaz, paylar ihraççı şirkete iade edilir veya iptal edilir.",
      mnemonicOrRule: "Altın Kural: Yüklenim = Risk Aracı Kurumda (Garanti Satış); En İyi Gayret = Risk İhraççı Şirkette."
    },
    practiceQuestion: {
      question: "Bir şirketin paylarının halka arzı sırasında aracı kurum ile 'Bakiye Aracılık Yüklenimi' sözleşmesi imzalanması durumunda, satış süresi sonunda satılamayan payların akıbeti ne olur?",
      options: [
        { key: "A", text: "Satılamayan paylar Sermaye Piyasası Kurulu tarafından devralınır." },
        { key: "B", text: "Satılamayan paylar bedeli nakden ödenmek suretiyle aracı kurum tarafından satın alınır." },
        { key: "C", text: "Halka arz tamamen iptal edilir ve toplanan tüm fonlar yatırımcılara iade edilir." },
        { key: "D", text: "Satılamayan paylar bedelsiz olarak mevcut pay sahiplerine dağıtılır." }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. Bakiye yükleniminde aracı kurum halka arz süresince satılamayan bakiye payların tamamını bedelini tam ve nakden ödeyerek kendi portföyüne satın almayı peşinen taahhüt etmiştir."
    },
    relatedArticleSlug: "spl-yatirim-kuruluslari-ders-notlari",
    relatedArticleTitle: "SPL Yatırım Kuruluşları ve Halka Arz Notları",
    relatedExamSlug: "spl-yatirim-kuruluslari-deneme-sinavi",
    relatedExamTitle: "SPL Yatırım Kuruluşları Deneme Sınavı"
  },
  {
    id: 9,
    slug: "masak-uyum-gorevlisi-atanma-kriterleri-ve-sorumluluklari",
    category: "MASAK Uyum",
    catSlug: "masak",
    tag: "MASAK Uyum Yönetmeliği Md. 13",
    title: "MASAK Uyum Görevlisinin Atanması, Nitelikleri ve Yetkileri",
    seoDescription: "Finansal kuruluşlarda MASAK Uyum Görevlisi kim tarafından atanır? Yönetim kuruluna doğrudan raporlama, idari bağımsızlık ve sınav püf noktaları.",
    question: "MASAK Uyum Görevlisi kim tarafından atanır ve idari olarak kime karşı sorumludur?",
    answer: "Uyum görevlisi doğrudan YÖNETİM KURULU (veya yetkilendirdiği üye) tarafından atanır ve görevini yönetim kuruluna doğrudan bağlı olarak yürütür. İcrai birimlerin emir ve talimatlarına tabi değildir.",
    legalBasis: {
      lawName: "Suç Gelirlerinin Aklanmasının ve Terörün Finansmanının Önlenmesine Dair Uyum Programı Yönetmeliği",
      article: "Madde 13, 14 ve 15",
      details: "Uyum görevlisi, yükümlünün 5549 sayılı Kanun ve ilgili mevzuat kapsamındaki yükümlülüklere uyumunu sağlamak, kurum içi eğitim ve risk değerlendirme politikalarını yönetmek ve şüpheli işlem bildirimlerini MASAK'a bizzat iletmek üzere atanır.",
      keyPoints: [
        "Atama ve görevden alma münhasıran Yönetim Kurulu yetkisindedir.",
        "Uyum görevlisi Genel Müdür de dahil hiçbir icrai birim yöneticisinden emir almaz.",
        "Uyum görevlisinin görevden ayrılması halinde durum 10 iş günü içinde MASAK'a bildirilir.",
        "Uyum görevlisi yardımcısı da aynı nitelikleri taşımak zorundadır."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "En popüler çeldirici: 'Uyum Görevlisini Genel Müdür atar'. Kesinlikle YANLIŞTIR! Atama yetkisi sadece ve sadece YÖNETİM KURULUNA aittir.",
      mnemonicOrRule: "Altın Kural: Uyum Görevlisi = Yönetim Kurulu Atar + MASAK'a 10 İş Gününde Bildirilir + İcradan Bağımsızdır."
    },
    practiceQuestion: {
      question: "MASAK Uyum Programı Yönetmeliği'ne göre yükümlü kuruluş bünyesinde Uyum Görevlisinin atanması veya görevden alınması yetkisi kime aittir?",
      options: [
        { key: "A", text: "Banka Genel Müdürüne" },
        { key: "B", text: "Yönetim Kuruluna (veya bu konuda yetkilendirilmiş yönetim kurulu üyesine)" },
        { key: "C", text: "Hazine ve Maliye Bakanlığına" },
        { key: "D", text: "Banka Teftiş Kurulu Başkanına" }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. Uyum görevlisi icrai yetkilerden bağımsız bir şekilde görev yapabilmesi için doğrudan Yönetim Kurulu kararıyla atanır ve yalnızca Yönetim Kuruluna karşı sorumludur."
    },
    relatedArticleSlug: "masak-uyum-gorevlisi-maaslari-2026-ne-kadar-kazaniliyor-kariyer-olanaklari-neler",
    relatedArticleTitle: "MASAK Uyum Görevlisi Kariyer ve Yetki Rehberi",
    relatedExamSlug: "masak-uyum-gorevlisi-yetkilendirme-deneme-sinavi-1-modul-2",
    relatedExamTitle: "MASAK Modül 2 Çözümlü Deneme Sınavı"
  },
  {
    id: 10,
    slug: "bankacilik-kanununa-gore-sir-saklama-ve-banka-sirri",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "5411 Sayılı Kanun Md. 73",
    title: "5411 Sayılı Kanun Kapsamında Banka Sırrı ve Müşteri Sırrı İstisnaları",
    seoDescription: "5411 sayılı Bankacılık Kanunu Madde 73 uyarınca müşteri sırrının kapsamı, sır saklama yükümlülüğü ve kanuni istisnalar (BDDK, Mahkemeler, MASAK).",
    question: "Bankacılık Kanunu'na göre 'Müşteri Sırrı' nedir ve hangi resmî mercilere sır saklama gerekçesiyle bilgi vermekten kaçınılamaz?",
    answer: "Sıfat ve görevleri dolayısıyla bankalara veya müşterilerine ait sırları öğrenenler, görevlerinden ayrılsalar dahi bu sırları açıklayamazlar. BDDK, TCMB, MASAK, Mahkemeler ve Savcılık taleplerinde sır saklama ileri sürülemez.",
    legalBasis: {
      lawName: "5411 Sayılı Bankacılık Kanunu",
      article: "Madde 73 (Sırların Saklanması) ve Madde 159 (Ceza Hükümleri)",
      details: "Banka mensupları, görevleri dolayısıyla öğrendikleri bankaya veya müşterilerine ait sırları açıklayamazlar. Bu yükümlülük görevden ayrıldıktan sonra da süresiz devam eder. İhlal halinde 1 yıldan 3 yıla kadar hapis cezası öngörülmüştür.",
      keyPoints: [
        "Sır saklama yükümlülüğü görevden ayrıldıktan sonra da devam eder (zaman aşımı yoktur).",
        "Müşterinin açık rızası olsa dahi yurt dışındaki 3. kişilerle paylaşılamaz (KVKK ve BDDK kısıtlamaları).",
        "Kanunen yetkili kılınan mercilere (BDDK denetçileri, MASAK, Adli makamlar, İcra müdürlükleri) bilgi vermek zorunludur."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Sınavda: 'Müşteri sırrı sadece bankada çalışırken mi geçerlidir?' Hayır! İstifa ettikten veya emekli olduktan sonra da ömür boyu devam eder.",
      mnemonicOrRule: "Altın Kural: Görev Biter, Sır Saklama Bitmez. Yetkili Denetçiye (BDDK/MASAK/Mahkeme) Sır Yoktur."
    },
    practiceQuestion: {
      question: "5411 sayılı Bankacılık Kanunu'nun 73. maddesi uyarınca sır saklama yükümlülüğü ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
      options: [
        { key: "A", text: "Sır saklama yükümlülüğü banka personelinin görevden ayrılmasıyla birlikte sona erer." },
        { key: "B", text: "BDDK denetçileri ile bankalar yeminli murakıplarının bilgi taleplerine karşı sır gerekçesi ileri sürülemez." },
        { key: "C", text: "Müşteri sırrını yetkisiz üçüncü şahıslara açıklayan personel hakkında hapis cezası öngörülmüştür." },
        { key: "D", text: "MASAK tarafından talep edilen şüpheli hesap hareketleri sır saklama kapsamı dışında tutulur." }
      ],
      correctAnswer: "A",
      explanation: "Doğru yanıt A seçeneğidir. 5411 sayılı Kanun açıkça sır saklama yükümlülüğünün 'görevden ayrıldıktan sonra da devam edeceğini' hükme bağlamıştır. Personel işten ayrılsa dahi öğrendiği sırları açıklayamaz."
    },
    relatedArticleSlug: "banka-mufettisi-nasil-olunur-adim-adim-2026-kariyer-rehberi",
    relatedArticleTitle: "Banka Müfettişi Nasıl Olunur? 2026 Rehberi",
    relatedExamSlug: "deneme-sinavi-genis-kapsamli-sermaye-piyasasi-mevzuati-ve-meslek-kurallari-1",
    relatedExamTitle: "Mevzuat ve Meslek Kuralları Deneme Sınavı"
  },
  {
    id: 11,
    slug: "spl-iceriden-ogrenenlerin-ticareti-insider-trading",
    category: "SPL Lisanslama",
    catSlug: "spl",
    tag: "6362 Sayılı SPK Md. 106",
    title: "İçeriden Öğrenenlerin Ticareti (Bilgi Suistimali - Insider Trading)",
    seoDescription: "6362 sayılı Kanun Madde 106 kapsamında Bilgi Suistimali (Insider Trading) suçu unsurları, hapis cezası ve adli para cezası alt sınırları.",
    question: "6362 sayılı Sermaye Piyasası Kanunu'na göre 'Bilgi Suistimali' (İçeriden Öğrenenlerin Ticareti) suçunun temel unsurları ve cezası nedir?",
    answer: "Henüz kamuya açıklanmamış, fiyatı etkileyebilecek nitelikteki bilgileri kullanarak kendisine veya başkasına menfaat temin etmektir. Cezası 3 YILDAN 5 YILA KADAR HAPİS veya adli para cezasıdır.",
    legalBasis: {
      lawName: "6362 Sayılı Sermaye Piyasası Kanunu",
      article: "Madde 106 - Bilgi Suistimali",
      details: "Doğrudan veya dolaylı olarak sermaye piyasası araçları ya da ihraççılar hakkında, henüz kamuya duyurulmamış, fiyatı etkileyebilecek nitelikteki bilgiye dayalı olarak ilgili sermaye piyasası aracında işlem yapıp menfaat sağlayanlar cezalandırılır.",
      keyPoints: [
        "Bilginin kamuya açıklanmamış (içsel bilgi) olması şarttır.",
        "Bilginin fiyatı veya yatırım kararlarını etkileyebilecek önemde olması gerekir.",
        "Hapis cezası 3 yıldan 5 yıla kadardır.",
        "Adli para cezası verilmesi durumunda ceza elde edilen menfaatin 2 katından az olamaz."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Sınavlarda 'Piyasa Dolandırıcılığı (Manipülasyon)' ile 'Bilgi Suistimali (Insider Trading)' maddeleri karıştırılır. Madde 106 = Bilgi Suistimali; Madde 107 = Piyasa Dolandırıcılığıdır.",
      mnemonicOrRule: "Altın Kural: 106 İçsel Bilgi (Gizli Haber) -> 107 Manipülasyon (Yalan Haber / Sahte İşlem)."
    },
    practiceQuestion: {
      question: "6362 sayılı SPK uyarınca Bilgi Suistimali (Madde 106) suçunu işleyen bir fail hakkında adli para cezasına hükmedilmesi durumunda, verilecek cezanın alt sınırı ne kadar olmalıdır?",
      options: [
        { key: "A", text: "Elde edilen menfaatin en az iki katı" },
        { key: "B", text: "Elde edilen menfaatin tam tutarı" },
        { key: "C", text: "Sabit olarak 500.000 TL" },
        { key: "D", text: "Şirketin ödenmiş sermayesinin %10'u" }
      ],
      correctAnswer: "A",
      explanation: "Doğru yanıt A seçeneğidir. 6362 sayılı Kanun'un 106. maddesi gereğince, bilgi suistimali suçundan dolayı adli para cezası verildiğinde, bu cezanın tutarı suç neticesinde temin edilen menfaatin İKİ KATINDAN AZ OLAMAZ."
    },
    relatedArticleSlug: "genis-kapsamli-sermaye-piyasasi-mevzuati-ve-meslek-kurallari-konu-anlatimi-ve-cozumlu-sorular",
    relatedArticleTitle: "Sermaye Piyasası Mevzuatı ve Meslek Kuralları Konu Anlatımı",
    relatedExamSlug: "deneme-sinavi-genis-kapsamli-sermaye-piyasasi-mevzuati-ve-meslek-kurallari-1",
    relatedExamTitle: "Sermaye Piyasası Mevzuatı Deneme Sınavı"
  },
  {
    id: 12,
    slug: "bankalarda-sermaye-yeterliligi-standart-orani-syso",
    category: "Banka Denetimi",
    catSlug: "banka",
    tag: "5411 SK & BDDK Basel Düzenlemeleri",
    title: "Bankalarda Sermaye Yeterliliği Standart Oranı (SYSO) ve Asgari Hadler",
    seoDescription: "Bankalarda Sermaye Yeterliliği Standart Oranı (SYSO) asgari yasal oranı (%8) ve BDDK hedef oranı (%12). Özkaynak / Risk Ağırlıklı Varlıklar formülü.",
    question: "Bankacılık Kanunu ve BDDK düzenlemelerine göre yasal asgari SYSO ile hedef SYSO oranları yüzde kaçtır?",
    answer: "Yasal asgari SYSO oranı %8'dir. BDDK tarafından bankalara uygulanan hedef (ihtiyari) sermaye yeterliliği oranı ise %12'dir.",
    legalBasis: {
      lawName: "5411 Sayılı Bankacılık Kanunu",
      article: "Madde 45 ve Bankaların Sermaye Yeterliliğinin Ölçülmesine ve Değerlendirilmesine İlişkin Yönetmelik",
      details: "Bankalar, maruz kaldıkları kredi riski, piyasa riski ve operasyonel riskler karşılığında yeterli düzeyde özkaynak bulundurmakla yükümlüdür. SYSO = Özkaynak / (Kredi Riski + Piyasa Riski + Operasyonel Riski Esas Tutar) formülüyle hesaplanır.",
      keyPoints: [
        "Basel standartlarına göre mutlak asgari oran %8'dir.",
        "BDDK'nın bankacılık sektöründe uyguladığı hedef oran %12'dir.",
        "SYSO'su %8'in altına düşen bankaya BDDK tarafından derhal sermaye artırımı veya kâr dağıtım kısıtı getirilir.",
        "Sermaye koruma tamponu ve döngüsel sermaye tamponu ile bu oran daha da yükselebilir."
      ]
    },
    examTip: {
      title: "Müfettişin Sınav Tüyosu & Çeldirici Tuzağı",
      trapWarning: "Soru köküne çok dikkat edin: 'Yasal asgari oran' soruluyorsa %8; 'BDDK hedef oranı' soruluyorsa %12'dir. Bu iki rakam sınavlarda en çok karıştırılan ikilidir.",
      mnemonicOrRule: "Altın Kural: Yasal Alt Taban = %8; Güvenli Hedef Liman = %12."
    },
    practiceQuestion: {
      question: "Türk bankacılık mevzuatı çerçevesinde BDDK düzenlemelerine göre bankaların konsolide ve konsolide olmayan bazda tutmak zorunda oldukları yasal asgari Sermaye Yeterliliği Standart Oranı (SYSO) yüzde kaçtır?",
      options: [
        { key: "A", text: "%6" },
        { key: "B", text: "%8" },
        { key: "C", text: "%10" },
        { key: "D", text: "%12" }
      ],
      correctAnswer: "B",
      explanation: "Doğru yanıt B seçeneğidir. 5411 sayılı Bankacılık Kanunu ve Basel ilkeleri uyarınca mutlak yasal asgari sınır %8'dir. %12 ise BDDK'nın uyguladığı ihtiyatî hedef orandır."
    },
    relatedArticleSlug: "2026-banka-mufettisi-maaslari-kamu-ve-ozel-bankalarda-net-rakamlar-kidem-ve-ikramiyeler",
    relatedArticleTitle: "Banka Müfettişi Maaşları ve Teftiş Standartları",
    relatedExamSlug: "deneme-sinavi-genis-kapsamli-sermaye-piyasasi-mevzuati-ve-meslek-kurallari-1",
    relatedExamTitle: "Mevzuat ve Meslek Kuralları Denemesi"
  }
];
