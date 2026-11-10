import { getAllPosts } from '../../utils/posts';

export async function GET() {
  const posts = getAllPosts();
  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
