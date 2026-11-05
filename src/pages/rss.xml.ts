import type { APIRoute } from 'astro';
import { getAllPosts } from '../utils/posts';

export const GET: APIRoute = async () => {
  const posts = getAllPosts().filter(p => p.post_type === 'post');

  const escapeXml = (unsafe: string) => {
    return (unsafe || '').replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const items = posts.slice(0, 40).map(post => {
    const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
    const title = escapeXml(post.title);
    const link = `https://mufettis.org/${post.slug}/`;
    const description = escapeXml(post.excerpt || post.title);

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Müfettiş.org - Mevzuat ve Sınav Akışı</title>
    <link>https://mufettis.org/</link>
    <description>Banka Müfettişliği, SPL, MASAK ve CIA Sınav Hazırlık Portalı Güncel Mevzuat ve Sınav Akışı</description>
    <language>tr</language>
    <atom:link href="https://mufettis.org/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
