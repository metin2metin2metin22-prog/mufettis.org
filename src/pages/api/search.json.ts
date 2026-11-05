import { getAllPosts } from '../../utils/posts';

function cleanContent(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[\/?(not|dikkat|hafiza|vurgu|basari|kutu|yesil-vurgu|mavi-vurgu|kirmizi-vurgu)[^\]]*\]/gi, ' ')
    .replace(/:::[a-zA-Z0-9_\-\[\]\s]*/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  const posts = getAllPosts();
  const searchIndex = posts
    .filter(p => p.post_type === 'post')
    .map(p => ({
      title: p.title,
      slug: p.slug,
      url: p.url,
      excerpt: p.excerpt || '',
      categories: p.categories || [],
      tags: p.tags || [],
      featured_image: p.featured_image,
      reading_time: p.reading_time,
      is_quiz: p.is_quiz,
      content: cleanContent(p.content)
    }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
