import posts from '../../data/posts.json';

export async function GET() {
  const searchIndex = posts.map(p => ({
    title: p.title,
    slug: p.slug,
    url: p.url,
    excerpt: p.excerpt,
    categories: p.categories,
    is_quiz: p.is_quiz
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
