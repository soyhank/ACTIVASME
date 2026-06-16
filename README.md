# ACTIVA Mental Health & Wellness 🌿

Sitio web de **ACTIVA Mental Health & Wellness** (marca corta: *Activa* / *Activasme*),
centro de salud mental en Lima, Perú: **psicología y psiquiatría**, presencial y online.

Construido con **Astro** (salida 100 % estática) para ser **rápido y optimizado para SEO**,
con foco en el sector salud (YMYL): contenido con autor profesional, E-E-A-T, datos
estructurados y accesibilidad.

- **Dominio de producción:** activasme.com
- **Despliegue:** Vercel (build estático)
- **Conversión principal:** WhatsApp +51 906 719 905

---

## 🧱 Stack técnico

- [Astro 6](https://astro.build) (SSG) + **TypeScript estricto**
- **Tailwind CSS v4** vía `@tailwindcss/vite` + design tokens (CSS variables)
- **Content Collections** (Markdown) con esquemas **Zod**
- `@astrojs/sitemap` (sitemap automático) + `@astrojs/mdx`
- Fuentes **self-hosted** con `@fontsource-variable` (Inter + Nunito Sans)
- `astro:assets` / `sharp` para imágenes

> **Nota de implementación:** el brief pedía `@astrojs/tailwind`, pero ese paquete está
> deprecado en Astro 6. Se usa **Tailwind v4 + `@tailwindcss/vite`** (estándar actual),
> manteniendo los design tokens vía CSS variables. Gestor: **npm** (pnpm como alternativa).

---

## 🚀 Comandos

Desde la raíz del proyecto:

| Comando            | Acción                                            |
| :----------------- | :------------------------------------------------ |
| `npm install`      | Instala las dependencias                          |
| `npm run dev`      | Servidor de desarrollo en `localhost:4321`        |
| `npm run build`    | Compila el sitio de producción en `./dist/`       |
| `npm run preview`  | Previsualiza el build localmente                  |
| `npx astro check`  | Verificación de tipos TypeScript                  |

---

## 📁 Estructura

```text
src/
  components/   SEO, Header, Footer, WhatsappButton, Breadcrumbs,
                ServiceCard, SpecialistCard, Faq, Hero, Cta, ConditionGrid
  layouts/      BaseLayout, ServiceLayout, SpecialistLayout, BlogLayout
  content/
    servicios/      20 landings (psicología y psiquiatría)
    especialistas/  7 perfiles del equipo
    recursos/       artículos del blog (8 publicados + 4 borradores)
  content.config.ts  esquemas Zod de las colecciones
  lib/          site.ts, nav.ts, whatsapp.ts, schema.ts (JSON-LD)
  pages/        rutas del sitio (+ rutas dinámicas [slug])
  styles/       tokens.css (3 paletas) + global.css
public/         logo.svg, logo-blanco.svg, favicon, apple-touch-icon,
                og-default.jpg, equipo/, robots.txt
astro.config.mjs · vercel.json · tsconfig.json
```

---

## ✍️ Cómo editar el contenido

El contenido es **editable sin tocar código**, en `src/content/`:

- **Servicios** → `src/content/servicios/<slug>.md`. El *frontmatter* define título, SEO,
  pilar, enfoques, FAQ (con schema), especialistas que atienden y servicios relacionados.
  El cuerpo en Markdown es el contenido de la landing.
- **Especialistas** → `src/content/especialistas/<slug>.md`. Datos del profesional, áreas
  (enlazables a servicios) y biografía. El **número de colegiatura** está como `TODO`.
- **Recursos (blog)** → `src/content/recursos/<slug>.md`. Artículos firmados por un
  profesional, con fecha de publicación y de revisión. Los marcados con `draft: true` no
  se publican (los 4 *stubs* tienen outline para redactar).

Para añadir un nuevo servicio al menú, edita también `src/lib/nav.ts`.

### Cambiar la paleta de color

Las 3 paletas están en `src/styles/tokens.css`. La **Opción A "Calma Natural"** es la
predeterminada. Para activar otra, añade el atributo al `<html>` en `BaseLayout.astro`:

```html
<html lang="es-PE" data-theme="sereno">  <!-- Opción B -->
<html lang="es-PE" data-theme="vivo">    <!-- Opción C -->
```

---

## ▲ Despliegue en Vercel

El proyecto ya existe como proyecto en Vercel (**no desplegado aún**). Para publicarlo:

```bash
# Opción 1: desde la carpeta del proyecto
vercel          # despliegue de PREVIEW
vercel --prod   # despliegue a PRODUCCIÓN

# Opción 2: conectar el repo de GitHub al proyecto de Vercel
# (cada git push despliega automáticamente)
```

`vercel.json` incluye **headers de seguridad** (HSTS, X-Content-Type-Options,
X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP), caché de estáticos y
`trailingSlash` coherente con Astro.

---

## ✅ SEO y accesibilidad

- `<title>`, `meta description`, **canonical** y OG/Twitter únicos por página.
- **hreflang** `es-PE` / `es` y JSON-LD por tipo (`MedicalClinic`, `Physician`/`Person`,
  `MedicalTherapy`/`MedicalProcedure`, `FAQPage`, `Article`/`MedicalWebPage`,
  `BreadcrumbList`).
- Sitemap automático + `robots.txt`, página **404** personalizada.
- HTML semántico, skip-link, foco visible, `prefers-reduced-motion`, contraste AA.

---

## 📌 Datos pendientes (TODO — no inventar, confirmar con el cliente)

- [ ] **Números de colegiatura** (CPsP / CMP) de cada profesional.
- [ ] **Dirección física** exacta, distrito y coordenadas geo de la sede en Lima.
- [ ] **Horarios** de atención.
- [ ] **Precios** por servicio/modalidad.
- [ ] **Correo de contacto** y endpoint real del **formulario** (`/contacto/`, hoy apunta a
      un placeholder de Formspree).
- [ ] **URLs de redes sociales** (confirmar vigencia).
- [ ] **Logo definitivo** y **fotos profesionales** del equipo (hoy hay placeholders).
- [ ] Razón social / RUC para páginas legales.

---

## ⚕️ Aviso

El contenido del sitio es **educativo** y no reemplaza la atención profesional. En caso de
crisis: **Línea 113, opción 5** (MINSA) o emergencias.

## 📄 Licencia

Propiedad de ACTIVA Mental Health & Wellness. Todos los derechos reservados.
