/* =========================================================================
   Builders de JSON-LD (schema.org). Devuelven objetos planos listos para
   <script type="application/ld+json">. Validar en Rich Results Test.
   ========================================================================= */
import { SITE, SAME_AS, MEDICAL_SPECIALTIES } from './site';

const abs = (path: string) =>
  path.startsWith('http') ? path : new URL(path, SITE.url).href;

/* ---- Organización / Clínica (global) ---- */
export function medicalClinicSchema() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${SITE.url}/#clinic`,
    name: SITE.name,
    alternateName: SITE.shortName,
    slogan: SITE.slogan,
    url: SITE.url,
    logo: abs('/logo.svg'),
    image: abs('/og-default.jpg'),
    telephone: SITE.phoneE164,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    medicalSpecialty: MEDICAL_SPECIALTIES,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress, // TODO
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    areaServed: [
      { '@type': 'City', name: 'Lima' },
      { '@type': 'Country', name: 'Perú' },
    ],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Psicología y psicoterapia' },
      { '@type': 'MedicalProcedure', name: 'Psiquiatría' },
      { '@type': 'MedicalProcedure', name: 'Terapia online' },
    ],
    sameAs: SAME_AS,
  };
  // TODO: añadir geo y openingHoursSpecification cuando se confirmen.
  return data;
}

/* ---- Breadcrumbs ---- */
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

/* ---- FAQ ---- */
export function faqSchema(faq: { pregunta: string; respuesta: string }[]) {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  };
}

/* ---- Especialista (Physician / Person) ---- */
export function specialistSchema(s: {
  nombre: string;
  rol: string;
  tipo: 'psicologo' | 'psiquiatra';
  foto: string;
  url: string;
  enfoques?: string[];
}) {
  const isMd = s.tipo === 'psiquiatra';
  return {
    '@context': 'https://schema.org',
    '@type': isMd ? 'Physician' : 'Person',
    name: s.nombre,
    jobTitle: s.rol,
    image: abs(s.foto),
    url: abs(s.url),
    knowsAbout: s.enfoques ?? [],
    ...(isMd
      ? { medicalSpecialty: 'Psychiatric' }
      : { worksFor: { '@type': 'MedicalClinic', name: SITE.name } }),
    memberOf: {
      '@type': 'MedicalClinic',
      '@id': `${SITE.url}/#clinic`,
      name: SITE.name,
    },
  };
}

/* ---- Servicio / Procedimiento ---- */
export function serviceSchema(s: {
  nombre: string;
  descripcion: string;
  url: string;
  tipo: 'MedicalProcedure' | 'MedicalTherapy' | 'Service';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': s.tipo,
    name: s.nombre,
    description: s.descripcion,
    url: abs(s.url),
    provider: {
      '@type': 'MedicalClinic',
      '@id': `${SITE.url}/#clinic`,
      name: SITE.name,
    },
    areaServed: { '@type': 'City', name: 'Lima' },
  };
}

/* ---- Artículo / MedicalWebPage ---- */
export function articleSchema(a: {
  title: string;
  description: string;
  url: string;
  image: string;
  fecha: Date;
  fechaRevision: Date;
  autorNombre: string;
  autorUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalWebPage', 'Article'],
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    url: abs(a.url),
    datePublished: a.fecha.toISOString(),
    dateModified: a.fechaRevision.toISOString(),
    inLanguage: SITE.locale,
    author: {
      '@type': 'Person',
      name: a.autorNombre,
      url: abs(a.autorUrl),
    },
    reviewedBy: {
      '@type': 'Person',
      name: a.autorNombre,
      url: abs(a.autorUrl),
    },
    publisher: {
      '@type': 'MedicalClinic',
      '@id': `${SITE.url}/#clinic`,
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: abs('/logo.svg') },
    },
  };
}
