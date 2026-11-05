import rawPosts from '../data/posts.json';
import fs from 'node:fs';
import path from 'node:path';

export function getWebp(url?: string | null): string {
  if (!url) return '';
  const webp = url.replace(/\.(png|jpe?g)$/i, '.webp');
  const disk = path.join(process.cwd(), 'public', webp.replace(/^\//, ''));
  return fs.existsSync(disk) ? webp : url;
}

export interface CategoryRef {
  name: string;
  slug: string;
  id?: number;
}

export interface Post {
  id: number | string;
  title: string;
  slug: string;
  url: string;
  date: string;
  post_type: string;
  categories: CategoryRef[];
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    focus_keyword?: string;
  };
  featured_image?: string | null;
  is_quiz: boolean;
  reading_time: number;
  word_count: number;
  excerpt: string;
  content: string;
}

// Category name to slug mapping helper
const CATEGORY_MAP: Record<string, string> = {
  'SPL Lisanslama': 'spl-ders-notlari',
  'MASAK Uyum Görevlisi': 'masak-uyum-gorevlisi-yetkilendirme-ders-notlari',
  'CIA Part 1': 'cia-ders-notlari',
  'Banka Denetimi': 'denetim-kutuphanesi',
  'Mali Analiz Kütüphanesi': 'mali-analiz-kutuphanesi',
  'Kariyer & Meslek Rehberi': 'kariyer-meslek-rehberi',
  'Vaka Çalışmaları': 'vaka-calismalari'
};

/**
 * Müfettiş Özel Shortcode İşleyicisi
 * Editörden eklenen shortcode'ları (:::not, :::dikkat, :::hafiza, ==vurgu== vb.) zengin bileşenlere çevirir.
 */
export function processShortcodes(content: string): string {
  if (!content) return '';
  let out = content;

  // 1. ==highlight== -> <mark class="mufettis-mark">$1</mark>
  out = out.replace(/==([^=\n]+)==/g, '<mark class="mufettis-mark">$1</mark>');
  out = out.replace(/\[vurgu\]([\s\S]*?)\[\/vurgu\]/gi, '<mark class="mufettis-mark">$1</mark>');

  // 2. [yesil-vurgu], [mavi-vurgu], [kirmizi-vurgu]
  out = out.replace(/\[yesil-vurgu\]([\s\S]*?)\[\/yesil-vurgu\]/gi, '<span class="inline-block px-1.5 py-0.5 rounded font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60">$1</span>');
  out = out.replace(/\[mavi-vurgu\]([\s\S]*?)\[\/mavi-vurgu\]/gi, '<span class="inline-block px-1.5 py-0.5 rounded font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700/60">$1</span>');
  out = out.replace(/\[kirmizi-vurgu\]([\s\S]*?)\[\/kirmizi-vurgu\]/gi, '<span class="inline-block px-1.5 py-0.5 rounded font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700/60">$1</span>');

  // 3. [not]...[/not] and :::not ... :::
  out = out.replace(/\[not\]([\s\S]*?)\[\/not\]/gi, (_m, c) => `
<div class="mufettis-note my-6">
  <div class="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span>Müfettiş Notu & Mevzuat Özeti:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);
  out = out.replace(/:::not\n?([\s\S]*?)\n?:::/gi, (_m, c) => `
<div class="mufettis-note my-6">
  <div class="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span>Müfettiş Notu & Mevzuat Özeti:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);

  // 4. [dikkat] or [uyari] or :::dikkat or :::uyari
  out = out.replace(/\[(?:dikkat|uyari)\]([\s\S]*?)\[\/(?:dikkat|uyari)\]/gi, (_m, c) => `
<div class="mufettis-warning my-6">
  <div class="font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    <span>DİKKAT - Sınav Tuzağı & Hukuki Sorumluluk:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);
  out = out.replace(/:::(?:dikkat|uyari)\n?([\s\S]*?)\n?:::/gi, (_m, c) => `
<div class="mufettis-warning my-6">
  <div class="font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    <span>DİKKAT - Sınav Tuzağı & Hukuki Sorumluluk:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);

  // 5. [hafiza] or [puf] or :::hafiza or :::puf
  out = out.replace(/\[(?:hafiza|puf)\]([\s\S]*?)\[\/(?:hafiza|puf)\]/gi, (_m, c) => `
<div class="mufettis-service my-6">
  <h4 class="font-black text-amber-700 dark:text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span>Hafıza Çivisi & Altın Kural:</span>
  </h4>
  <div>${c.trim()}</div>
</div>`);
  out = out.replace(/:::(?:hafiza|puf)\n?([\s\S]*?)\n?:::/gi, (_m, c) => `
<div class="mufettis-service my-6">
  <h4 class="font-black text-amber-700 dark:text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span>Hafıza Çivisi & Altın Kural:</span>
  </h4>
  <div>${c.trim()}</div>
</div>`);

  // 6. [basari] or :::basari
  out = out.replace(/\[basari\]([\s\S]*?)\[\/basari\]/gi, (_m, c) => `
<div class="mufettis-success my-6">
  <div class="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span>Çözüm & Yasal Uygulama:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);
  out = out.replace(/:::basari\n?([\s\S]*?)\n?:::/gi, (_m, c) => `
<div class="mufettis-success my-6">
  <div class="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
    <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span>Çözüm & Yasal Uygulama:</span>
  </div>
  <div>${c.trim()}</div>
</div>`);

  // 7. [kutu baslik="..."] or :::kutu[...]
  out = out.replace(/\[kutu\s+baslik="([^"]+)"\]([\s\S]*?)\[\/kutu\]/gi, (_m, title, c) => `
<div class="mufettis-box my-7">
  <div class="mufettis-box-header">
    <span class="font-bold text-sm tracking-wide">${title}</span>
    <span class="text-xs text-sky-300 font-mono">İnceleme Raporu</span>
  </div>
  <div class="mufettis-box-body">${c.trim()}</div>
</div>`);
  out = out.replace(/:::kutu\[([^\]]+)\]\n?([\s\S]*?)\n?:::/gi, (_m, title, c) => `
<div class="mufettis-box my-7">
  <div class="mufettis-box-header">
    <span class="font-bold text-sm tracking-wide">${title}</span>
    <span class="text-xs text-sky-300 font-mono">İnceleme Raporu</span>
  </div>
  <div class="mufettis-box-body">${c.trim()}</div>
</div>`);

  return out;
}

/**
 * Returns all posts merged from both posts.json and dynamic markdown files in src/content/posts/
 */
export function getAllPosts(): Post[] {
  const postsMap = new Map<string, Post>();

  // 1. Load baseline static posts from posts.json
  for (const p of rawPosts as Post[]) {
    postsMap.set(p.slug, {
      ...p,
      featured_image: getWebp(p.featured_image),
      content: processShortcodes(p.content)
    });
  }

  // 2. Load any new posts created via Decap CMS from src/content/posts/
  try {
    const mdFiles = import.meta.glob('../content/posts/*.{md,markdown}', { eager: true });
    for (const path in mdFiles) {
      const file: any = mdFiles[path];
      if (file && file.frontmatter) {
        const fm = file.frontmatter;
        const slug = fm.slug || path.split('/').pop()?.replace(/\.(md|markdown)$/, '') || '';
        if (!slug) continue;

        const categoryName = fm.category || 'Denetim Kütüphanesi';
        const categorySlug = CATEGORY_MAP[categoryName] || 'denetim-kutuphanesi';
        const dateStr = fm.date ? new Date(fm.date).toISOString().replace('T', ' ').slice(0, 19) : new Date().toISOString();
        const bodyContent = file.compiledContent ? file.compiledContent() : '';
        const rawContent = file.rawContent ? file.rawContent() : '';
        const wordCount = rawContent ? rawContent.split(/\s+/).length : 500;
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));

        const postObj: Post = {
          id: `cms-${slug}`,
          title: fm.title || 'Başlıksız Yazı',
          slug: slug,
          url: `/${slug}/`,
          date: dateStr,
          post_type: 'post',
          categories: [{ name: categoryName, slug: categorySlug }],
          tags: fm.tags || [],
          seo: {
            title: fm.title,
            description: fm.description || '',
            focus_keyword: fm.focus_keyword || ''
          },
          featured_image: getWebp(fm.image) || null,
          is_quiz: Boolean(fm.is_quiz),
          reading_time: readingTime,
          word_count: wordCount,
          excerpt: fm.description || rawContent.slice(0, 160).replace(/<[^>]+>/g, ''),
          content: processShortcodes(bodyContent || rawContent)
        };

        // Overwrite or append
        postsMap.set(slug, postObj);
      }
    }
  } catch (e) {
    // Glob failed or empty directory, safely continue with baseline posts
  }

  // Return sorted descending by date
  return Array.from(postsMap.values()).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Returns a single post by its slug
 */
export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}
