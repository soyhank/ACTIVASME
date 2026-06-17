import { createClient } from '@vercel/kv';
import { sendMail, mailReady, EMPRESA_EMAIL } from '../server/mailer.js';

/**
 * Backend del Libro de Reclamaciones (Ley N.° 29571 — INDECOPI).
 * - Asigna un número correlativo único a cada hoja de reclamación.
 * - Archiva el registro (Vercel KV) para su conservación.
 * - Notifica a la empresa y envía copia automática al consumidor (Gmail SMTP).
 */

// Soporta ambas convenciones de variables (Vercel KV nativo o Upstash Marketplace).
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const kv = KV_URL && KV_TOKEN ? createClient({ url: KV_URL, token: KV_TOKEN }) : null;

// Normaliza saltos de línea/tabs (previene inyección en correo) y recorta longitud.
function clean(v) {
  return String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 4000);
}

function correoConsumidor(numero, b) {
  const tipo = clean(b.tipo_solicitud) === 'queja' ? 'queja' : 'reclamo';
  return [
    `Hola ${clean(b.nombre)},`,
    '',
    `Hemos registrado tu ${tipo} en el Libro de Reclamaciones de ACTIVA Mental Health & Wellness.`,
    '',
    `N.° de Hoja de Reclamación: ${numero}`,
    `Fecha de registro: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
    '',
    'Resumen de tu solicitud:',
    `- Tipo: ${tipo.toUpperCase()}`,
    `- Descripción del bien/servicio: ${clean(b.descripcion)}`,
    `- Detalle: ${clean(b.detalle)}`,
    `- Pedido: ${clean(b.pedido)}`,
    '',
    'Daremos respuesta en un plazo no mayor a 15 días hábiles, conforme a la Ley N.° 29571.',
    'La presentación de este reclamo no impide acudir a otras vías de solución de',
    'controversias ni es requisito para denunciar ante INDECOPI.',
    '',
    'Conserva este número para cualquier seguimiento.',
    '— Equipo de ACTIVA',
  ].join('\n');
}

function correoEmpresa(numero, b, archivado) {
  return [
    `Nueva hoja de reclamación registrada: ${numero}`,
    `Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
    `Archivado en base de datos: ${archivado ? 'sí (KV)' : 'NO — configurar Vercel KV'}`,
    '',
    '== Consumidor ==',
    `Nombre: ${clean(b.nombre)}`,
    `Documento: ${clean(b.documento)}`,
    `Domicilio: ${clean(b.domicilio)}`,
    `Teléfono: ${clean(b.telefono)}`,
    `Correo: ${clean(b.email)}`,
    `Padre/Apoderado (si es menor): ${clean(b.apoderado)}`,
    '',
    '== Bien contratado ==',
    `Tipo: ${clean(b.tipo_bien)}`,
    `Monto (S/): ${clean(b.monto)}`,
    `Descripción: ${clean(b.descripcion)}`,
    '',
    '== Detalle ==',
    `Tipo de solicitud: ${clean(b.tipo_solicitud).toUpperCase()}`,
    `Detalle: ${clean(b.detalle)}`,
    `Pedido del consumidor: ${clean(b.pedido)}`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Método no permitido');
  }

  const b = req.body || {};

  // Honeypot anti-spam.
  if (b._honey) return res.redirect(303, '/gracias/');

  // Validación de campos obligatorios del formato oficial.
  const required = ['nombre', 'documento', 'email', 'descripcion', 'detalle', 'pedido'];
  for (const f of required) {
    if (!clean(b[f])) return res.redirect(303, '/libro-de-reclamaciones/?error=1');
  }

  const year = new Date().getFullYear();
  let numero = null;
  let archivado = false;

  // Número correlativo + archivo (Vercel KV). Respaldo si no está configurado.
  try {
    if (kv) {
      const n = await kv.incr('lr:counter');
      numero = `LR-${year}-${String(n).padStart(6, '0')}`;
      await kv.set(`lr:reclamo:${numero}`, {
        numero,
        fecha: new Date().toISOString(),
        nombre: clean(b.nombre),
        documento: clean(b.documento),
        domicilio: clean(b.domicilio),
        telefono: clean(b.telefono),
        email: clean(b.email),
        apoderado: clean(b.apoderado),
        tipo_bien: clean(b.tipo_bien),
        monto: clean(b.monto),
        descripcion: clean(b.descripcion),
        tipo_solicitud: clean(b.tipo_solicitud),
        detalle: clean(b.detalle),
        pedido: clean(b.pedido),
        estado: 'pendiente',
      });
      await kv.lpush('lr:index', numero);
      archivado = true;
    }
  } catch (err) {
    console.error('KV error:', err);
  }

  if (!numero) numero = `LR-${year}-${Date.now().toString().slice(-9)}`;

  // Correos: notificación a la empresa + copia al consumidor.
  try {
    if (mailReady()) {
      await sendMail({
        to: EMPRESA_EMAIL(),
        replyTo: clean(b.email),
        subject: `Libro de Reclamaciones ${numero} — ACTIVA`,
        text: correoEmpresa(numero, b, archivado),
      });
      await sendMail({
        to: clean(b.email),
        subject: `Recibimos tu reclamo ${numero} — ACTIVA`,
        text: correoConsumidor(numero, b),
      });
    } else {
      console.warn('Gmail no configurado: reclamo', numero, 'registrado sin correo.');
    }
  } catch (err) {
    console.error('Correo error:', err);
  }

  return res.redirect(303, `/gracias/?n=${encodeURIComponent(numero)}`);
}
