/* =========================================================================
   Estructura de navegación e índice de servicios (para menús y enlazado
   interno). Mantener sincronizado con src/content/servicios/*.md
   ========================================================================= */

export interface NavServicio {
  slug: string; // slug del .md de la colección servicios
  titulo: string; // texto visible en el menú
  href: string; // URL final
}

export const PSICOLOGIA: NavServicio[] = [
  { slug: 'terapia-cognitivo-conductual', titulo: 'Terapia cognitivo conductual (TCC)', href: '/psicologia/terapia-cognitivo-conductual/' },
  { slug: 'terapia-act', titulo: 'Terapia ACT', href: '/psicologia/terapia-act/' },
  { slug: 'terapia-dbt', titulo: 'Terapia DBT', href: '/psicologia/terapia-dbt/' },
  { slug: 'terapia-de-pareja', titulo: 'Terapia de pareja', href: '/psicologia/terapia-de-pareja/' },
  { slug: 'terapia-familiar', titulo: 'Terapia familiar', href: '/psicologia/terapia-familiar/' },
  { slug: 'ansiedad', titulo: 'Ansiedad', href: '/psicologia/ansiedad/' },
  { slug: 'depresion', titulo: 'Depresión', href: '/psicologia/depresion/' },
  { slug: 'duelo', titulo: 'Duelo', href: '/psicologia/duelo/' },
  { slug: 'orientacion-vocacional', titulo: 'Orientación vocacional', href: '/psicologia/orientacion-vocacional/' },
  { slug: 'terapia-infantil', titulo: 'Terapia infantil', href: '/psicologia/terapia-infantil/' },
  { slug: 'evaluaciones-psicologicas', titulo: 'Evaluaciones psicológicas', href: '/psicologia/evaluaciones-psicologicas/' },
];

export const PSIQUIATRIA: NavServicio[] = [
  { slug: 'tdah', titulo: 'TDAH', href: '/psiquiatria/tdah/' },
  { slug: 'trastorno-bipolar', titulo: 'Trastorno bipolar', href: '/psiquiatria/trastorno-bipolar/' },
  { slug: 'trastornos-de-personalidad', titulo: 'Trastornos de personalidad', href: '/psiquiatria/trastornos-de-personalidad/' },
  { slug: 'trastornos-alimentarios', titulo: 'Trastornos alimentarios', href: '/psiquiatria/trastornos-alimentarios/' },
  { slug: 'trastornos-del-sueno', titulo: 'Trastornos del sueño', href: '/psiquiatria/trastornos-del-sueno/' },
  { slug: 'esquizofrenia', titulo: 'Esquizofrenia', href: '/psiquiatria/esquizofrenia/' },
  { slug: 'psiquiatria-integrativa', titulo: 'Psiquiatría integrativa', href: '/psiquiatria/psiquiatria-integrativa/' },
  { slug: 'psiquiatria-de-enlace', titulo: 'Psiquiatría de enlace', href: '/psiquiatria/psiquiatria-de-enlace/' },
  { slug: 'certificado-de-salud-mental', titulo: 'Certificado de salud mental', href: '/psiquiatria/certificado-de-salud-mental/' },
];

/** Devuelve el título visible de un servicio a partir de su slug. */
export function servicioTitulo(slug: string): string {
  const found = [...PSICOLOGIA, ...PSIQUIATRIA].find((s) => s.slug === slug);
  if (found) return found.titulo;
  if (slug === 'terapia-online') return 'Terapia online';
  if (slug === 'empresas') return 'Para empresas';
  if (slug === 'psicologia') return 'Psicología';
  if (slug === 'psiquiatria') return 'Psiquiatría';
  return slug;
}

/** Devuelve la URL pública de un servicio a partir de su slug. */
export function servicioHref(slug: string): string {
  const found = [...PSICOLOGIA, ...PSIQUIATRIA].find((s) => s.slug === slug);
  if (found) return found.href;
  // transversales conocidos
  if (slug === 'terapia-online') return '/terapia-online/';
  if (slug === 'empresas') return '/empresas/';
  if (slug === 'psicologia') return '/psicologia/';
  if (slug === 'psiquiatria') return '/psiquiatria/';
  return `/${slug}/`;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavServicio[];
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Psicología', href: '/psicologia/', children: PSICOLOGIA },
  { label: 'Psiquiatría', href: '/psiquiatria/', children: PSIQUIATRIA },
  { label: 'Especialistas', href: '/especialistas/' },
  { label: 'Terapia online', href: '/terapia-online/' },
  { label: 'Empresas', href: '/empresas/' },
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Contacto', href: '/contacto/' },
];

/* Condiciones que se tratan (para grillas informativas en Home y pilares) */
export const CONDICIONES: { nombre: string; href: string }[] = [
  { nombre: 'Ansiedad', href: '/psicologia/ansiedad/' },
  { nombre: 'Depresión', href: '/psicologia/depresion/' },
  { nombre: 'Estrés', href: '/psicologia/ansiedad/' },
  { nombre: 'Duelo', href: '/psicologia/duelo/' },
  { nombre: 'Trastornos alimentarios', href: '/psiquiatria/trastornos-alimentarios/' },
  { nombre: 'Adicciones', href: '/psiquiatria/' },
  { nombre: 'TDAH', href: '/psiquiatria/tdah/' },
  { nombre: 'Trastorno bipolar', href: '/psiquiatria/trastorno-bipolar/' },
  { nombre: 'Trastornos de personalidad', href: '/psiquiatria/trastornos-de-personalidad/' },
  { nombre: 'Trastornos del sueño', href: '/psiquiatria/trastornos-del-sueno/' },
  { nombre: 'Problemas de pareja', href: '/psicologia/terapia-de-pareja/' },
  { nombre: 'Esquizofrenia y psicosis', href: '/psiquiatria/esquizofrenia/' },
];
