// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://activasme.com',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-PE' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
