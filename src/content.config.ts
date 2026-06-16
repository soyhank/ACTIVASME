import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Modalidad de atención reutilizable */
const modalidad = z.enum(['presencial', 'virtual', 'presencial/virtual']);

/* Pregunta/respuesta para bloques FAQ (→ schema FAQPage) */
const faqItem = z.object({
  pregunta: z.string(),
  respuesta: z.string(),
});

/* =========================================================================
   SERVICIOS — landings de psicología, psiquiatría y transversales
   Editable sin tocar código. Body en Markdown = secciones de la landing.
   ========================================================================= */
const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    title: z.string(), // <title> SEO (≤60)
    h1: z.string(), // encabezado visible (keyword + "en Lima")
    description: z.string().max(165), // meta description (≤155-160)
    pilar: z.enum(['psicologia', 'psiquiatria', 'transversal', 'empresas']),
    keyword: z.string(), // keyword principal
    keywordsSecundarias: z.array(z.string()).default([]),
    intro: z.string(), // intro empática (lead)
    modalidad: modalidad.default('presencial/virtual'),
    enfoques: z.array(z.string()).default([]), // TCC, ACT, DBT, TREC…
    faq: z.array(faqItem).default([]),
    especialistas: z.array(z.string()).default([]), // slugs que lo atienden
    relacionados: z.array(z.string()).default([]), // slugs de servicios
    schemaType: z
      .enum(['MedicalProcedure', 'MedicalTherapy', 'Service'])
      .default('MedicalTherapy'),
    icono: z.string().default('hoja'),
    destacado: z.boolean().default(false),
    orden: z.number().default(100),
    ultimaRevision: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/* =========================================================================
   ESPECIALISTAS — 7 perfiles del equipo (E-E-A-T)
   ========================================================================= */
const especialistas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/especialistas' }),
  schema: z.object({
    nombre: z.string(),
    rol: z.string(), // "Médico Psiquiatra", "Psicóloga…"
    tipo: z.enum(['psicologo', 'psiquiatra']),
    credenciales: z.string().default(''),
    enfoques: z.array(z.string()).default([]),
    // Áreas que atiende; cada una puede enlazar a un servicio (slug)
    areas: z
      .array(
        z.object({
          nombre: z.string(),
          servicio: z.string().optional(), // slug de servicio
        }),
      )
      .default([]),
    modalidad: modalidad.default('presencial/virtual'),
    foto: z.string().default('/equipo/placeholder.svg'),
    // CPsP (psicólogos) / CMP (médicos) — NO inventar; queda como TODO
    numeroColegiatura: z.string().default('TODO'),
    mensajeWhatsapp: z.string(),
    destacado: z.boolean().default(true),
    orden: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

/* =========================================================================
   RECURSOS — blog/artículos (reemplaza "Sabías que…")
   ========================================================================= */
const recursos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/recursos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(165),
    keyword: z.string(),
    autor: z.string(), // slug del especialista (autor profesional)
    fecha: z.coerce.date(), // fecha de publicación
    fechaRevision: z.coerce.date(), // última revisión clínica
    servicioRelacionado: z.string(), // slug de servicio (CTA / enlace)
    categoria: z.string().default('Salud mental'),
    heroImage: z.string().optional(),
    stub: z.boolean().default(false), // true = outline pendiente de redacción
    draft: z.boolean().default(false),
  }),
});

export const collections = { servicios, especialistas, recursos };
