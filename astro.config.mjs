import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://mufettis.org',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/category/vaka-calismalari/')
    }),
    tailwind()
  ]
});
