import { kv } from '@vercel/kv';

/**
 * Backend del Libro de Reclamaciones (Ley N.° 29571 — INDECOPI).
 * - Asigna un número correlativo único a cada hoja de reclamación.
 * - Archiva el registro (Vercel KV) para su conservación.
 * - Notifica a la empresa y envía copia automática al consumidor.
 *
 * Variables de entorno:
 *   EMPRESA_EMAIL          correo de la empresa (destino). Default soypuromarketing@gmail.com
 *   KV_REST_API_URL/TOKEN  inyectadas al conectar un store de Vercel KV (Upstash) al proyecto.
 */

const EMPRESA_EMAIL = process.env.EMPRESA_EMAIL || 'soypuromarketing@gmail.com';

// Normaliza saltos de línea/tabs (previene inyección en correo) y recorta longitud.
function clean(v) {
  return String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 4000);
}

// Texto plano multilínea para la autorespuesta al consumidor.
function autorespuesta(numero, b) {
  const tipo = clean(b.tipo_solicitud) === 'queja' ? 'queja' : 'reclamo';
  return [
    `Hola ${clean(b.nombre)},`,
    '',
    `Hemos registrado tu ${tipo} en el Libro de Reclamaciones de ACTIVA Mental Health & Wellness.`,
    '',
    `N.° de Hoja de Reclamación: ${numero}`,
    `Fecha de registro: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
    '',
    'Resumen:',
    `- Tipo: ${tipo.toUpperCase()}`,
    `- Detalle: ${clean(b.detalle)}`,
    `- Pedido: ${clean(b.pedido)}`,
    '',
    'Daremos respuesta a tu solicitud en un plazo no mayor a 15 días hábiles, conforme a la',
    'Ley N.° 29571. La presentación de este reclamo no impide acudir a otras vías de solución',
    'de controversias ni es requisito para denunciar ante INDECOPI.',
    '',
    'Conserva este número para cualquier seguimiento.',
    '— Equipo de ACTIVA',
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Método no permitido');
  }

  const b = req.body || {};

  // Honeypot anti-spam: si viene relleno, fingimos éxito sin procesar.
  if (b._honey) return res.redirect(303, '/gracias/');

  // Validación de campos obligatorios del formato oficial.
  const required = ['nombre', 'documento', 'email', 'descripcion', 'detalle', 'pedido'];
  for (const f of required) {
    if (!clean(b[f])) {
      return res.redirect(303, '/libro-de-reclamaciones/?error=1');
    }
  }

  const year = new Date().getFullYear();
  let numero = null;
  let archivado = false;

  // Número correlativo + archivo (Vercel KV). Si no está configurado, se usa
  // un identificador único de respaldo para no perder el reclamo.
  try {
    if (process.env.KV_REST_API_URL) {
      const n = await kv.incr('lr:counter');
      numero = `LR-${year}-${String(n).padStart(6, '0')}`;
      const registro = {
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
      };
      await kv.set(`lr:reclamo:${numero}`, registro);
      await kv.lpush('lr:index', numero);
      archivado = true;
    }
  } catch (err) {
    console.error('KV error:', err);
  }

  if (!numero) {
    numero = `LR-${year}-${Date.now().toString().slice(-9)}`;
  }

  // Notificación a la empresa + copia automática al consumidor (FormSubmit).
  try {
    await fetch(`https://formsubmit.co/ajax/${EMPRESA_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Libro de Reclamaciones ${numero} — ACTIVA`,
        _template: 'table',
        _autoresponse: autorespuesta(numero, b),
        'N.° de Hoja': numero,
        Tipo: clean(b.tipo_solicitud).toUpperCase(),
        Nombre: clean(b.nombre),
        Documento: clean(b.documento),
        Domicilio: clean(b.domicilio),
        Teléfono: clean(b.telefono),
        email: clean(b.email),
        'Padre/Apoderado': clean(b.apoderado),
        Bien: clean(b.tipo_bien),
        'Monto (S/)': clean(b.monto),
        'Descripción del bien': clean(b.descripcion),
        Detalle: clean(b.detalle),
        Pedido: clean(b.pedido),
        Archivado: archivado ? 'sí (KV)' : 'no — configurar Vercel KV',
      }),
    });
  } catch (err) {
    console.error('Notificación error:', err);
  }

  return res.redirect(303, `/gracias/?n=${encodeURIComponent(numero)}`);
}
