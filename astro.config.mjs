// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Cambia esta URL por el dominio final del proyecto (o tu URL de GitHub Pages).
  site: 'https://activasme.com',
  integrations: [sitemap()],
  compressHTML: true,
});
