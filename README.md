# ACTIVASME 🌱

**Activa tu salud mental.** ACTIVASME es una plataforma web de salud mental y bienestar emocional construida con [Astro](https://astro.build) para ser **rápida y optimizada para SEO**.

La aplicación acompaña a las personas a cuidar su bienestar con:

- 📊 **Seguimiento de ánimo** — check-ins diarios y visualización de patrones.
- 🧘 **Ejercicios guiados** — respiración, mindfulness y relajación.
- 📚 **Recursos confiables** — guías sobre ansiedad, estrés, sueño y autocuidado.
- 🤝 **Apoyo cercano** — red de acompañamiento y acceso a líneas de ayuda.

> ⚕️ **Aviso:** ACTIVASME es un apoyo al bienestar y **no sustituye** la atención médica o psicológica profesional. Si estás en crisis, busca ayuda profesional de inmediato.

## 🚀 Stack

- [Astro](https://astro.build) — generación de sitios estáticos, ultra rápido y SEO-friendly.
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap automático.
- TypeScript (modo estricto).

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Instala las dependencias                     |
| `npm run dev`     | Inicia el servidor local en `localhost:4321` |
| `npm run build`   | Compila el sitio de producción en `./dist/`  |
| `npm run preview` | Previsualiza el build localmente             |

## 📁 Estructura

```text
/
├── public/             # Estáticos: favicon, robots.txt, imágenes
├── src/
│   ├── layouts/        # Layout base con metadatos SEO
│   └── pages/          # Páginas del sitio (index.astro)
└── astro.config.mjs    # Configuración de Astro y sitemap
```

## ⚙️ Configuración

Antes de desplegar, actualiza la propiedad `site` en `astro.config.mjs` y la URL del sitemap en `public/robots.txt` con tu dominio final.

## 📄 Licencia

MIT
