import rawPosts from '../data/posts.json';

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
 * Returns all posts merged from both posts.json and dynamic markdown files in src/content/posts/
 */
export function getAllPosts(): Post[] {
  const postsMap = new Map<string, Post>();

  // 1. Load baseline static posts from posts.json
  for (const p of rawPosts as Post[]) {
    postsMap.set(p.slug, p);
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
          featured_image: fm.image || null,
          is_quiz: Boolean(fm.is_quiz),
          reading_time: readingTime,
          word_count: wordCount,
          excerpt: fm.description || rawContent.slice(0, 160).replace(/<[^>]+>/g, ''),
          content: bodyContent || rawContent
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
