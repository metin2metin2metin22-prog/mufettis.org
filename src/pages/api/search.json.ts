import posts from '../../data/posts.json';

export async function GET() {
  const searchIndex = posts
    .filter(p => p.post_type === 'post')
    .map(p => ({
      title: p.title,
      slug: p.slug,
      url: p.url,
      excerpt: p.excerpt,
      categories: p.categories,
      featured_image: p.featured_image,
      reading_time: p.reading_time,
      is_quiz: p.is_quiz
    }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
