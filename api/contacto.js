import { sendMail, mailReady, EMPRESA_EMAIL } from '../server/mailer.js';

/** Backend del formulario de contacto: envía el mensaje a la empresa (Gmail SMTP). */

function clean(v) {
  return String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 4000);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Método no permitido');
  }

  const b = req.body || {};
  if (b._honey) return res.redirect(303, '/gracias/');

  const nombre = clean(b.nombre);
  const email = clean(b.email);
  const motivo = String(b.motivo ?? '').trim().slice(0, 5000);

  if (!nombre || !email || !motivo) {
    return res.redirect(303, '/contacto/?error=1');
  }

  const texto = [
    'Nuevo mensaje de contacto desde activasme.com',
    '',
    `Nombre: ${nombre}`,
    `Correo: ${email}`,
    `Teléfono/WhatsApp: ${clean(b.telefono)}`,
    '',
    'Mensaje:',
    motivo,
  ].join('\n');

  try {
    if (mailReady()) {
      await sendMail({
        to: EMPRESA_EMAIL(),
        replyTo: email,
        subject: `Nuevo contacto — ${nombre}`,
        text: texto,
      });
    } else {
      console.warn('Gmail no configurado: contacto de', email, 'no enviado por correo.');
    }
  } catch (err) {
    console.error('Correo contacto error:', err);
  }

  return res.redirect(303, '/gracias/');
}
