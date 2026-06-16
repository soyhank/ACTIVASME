/* =========================================================================
   Configuración central del sitio ACTIVA. Editar aquí cambia todo el sitio.
   Los valores marcados como TODO deben confirmarse con el cliente (no inventar).
   ========================================================================= */

export const SITE = {
  name: 'ACTIVA Mental Health & Wellness',
  shortName: 'Activa',
  brand: 'Activasme',
  slogan: 'Comprometidos con tu felicidad',
  description:
    'Centro de salud mental en Lima: psicología y psiquiatría, presencial y online. Atención cálida y basada en evidencia para todo el Perú y el extranjero.',
  url: 'https://activasme.com',
  locale: 'es-PE',
  lang: 'es',
  // Contacto
  phoneDisplay: '+51 906 719 905',
  phoneE164: '+51906719905',
  whatsappNumber: '51906719905',
  email: 'TODO@activasme.com', // TODO: confirmar correo de contacto
  // Sede (TODO: confirmar dirección exacta, distrito y geo)
  address: {
    streetAddress: 'TODO — dirección exacta',
    addressLocality: 'Lima',
    addressRegion: 'Lima',
    addressCountry: 'PE',
    postalCode: '', // TODO
    geo: { lat: '', lng: '' }, // TODO
  },
  // Horarios (TODO: confirmar)
  openingHours: 'TODO — horario de atención',
  // Redes (TODO: confirmar vigencia de URLs)
  social: {
    facebook: 'https://facebook.com/activa.sme',
    instagram: 'https://instagram.com/activa.sme',
    twitter: 'https://twitter.com/Activa_SME',
  },
  foundingYear: 2017,
} as const;

export const SAME_AS = [
  SITE.social.facebook,
  SITE.social.instagram,
  SITE.social.twitter,
];

/* Especialidades médicas declaradas (para JSON-LD MedicalClinic) */
export const MEDICAL_SPECIALTIES = ['Psychiatric', 'Psychological'];
