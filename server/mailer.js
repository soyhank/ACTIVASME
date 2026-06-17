import nodemailer from 'nodemailer';

/**
 * Transporte de correo vía SMTP de Gmail (contraseña de aplicación).
 * Variables de entorno requeridas:
 *   GMAIL_USER          correo de la empresa (p. ej. soypuromarketing@gmail.com)
 *   GMAIL_APP_PASSWORD  contraseña de aplicación de 16 caracteres (no la del correo)
 */

let transport = null;

export function mailReady() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transport;
}

/** Envía un correo. Lanza si faltan credenciales o si SMTP falla. */
export async function sendMail({ to, cc, subject, text, replyTo }) {
  if (!mailReady()) throw new Error('Credenciales de Gmail no configuradas');
  const from = `ACTIVA Mental Health & Wellness <${process.env.GMAIL_USER}>`;
  return getTransport().sendMail({ from, to, cc, subject, text, replyTo });
}

export const EMPRESA_EMAIL = () =>
  process.env.EMPRESA_EMAIL || process.env.GMAIL_USER || 'soypuromarketing@gmail.com';
