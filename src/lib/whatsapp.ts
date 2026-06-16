import { SITE } from './site';

const BASE = `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}&text=`;

const MENSAJE_GENERICO = '¡Hola! Deseo información de sus terapias.';

/**
 * Construye un enlace de WhatsApp con mensaje contextual ya URL-encoded.
 * @param mensaje Texto del mensaje (sin codificar). Por defecto, el genérico.
 */
export function whatsappLink(mensaje: string = MENSAJE_GENERICO): string {
  return BASE + encodeURIComponent(mensaje);
}

/** Mensaje para agendar una cita de un servicio concreto. */
export function whatsappAgendar(servicio: string): string {
  return whatsappLink(`¡Hola! Quisiera agendar una cita de ${servicio}.`);
}

/** Mensaje para contactar a un/a especialista concreto/a. */
export function whatsappEspecialista(nombre: string): string {
  return whatsappLink(`¡Hola! Quisiera agendar una cita con ${nombre}.`);
}

export { MENSAJE_GENERICO };
