// Textos legales: aviso de Privacidad y Condiciones de uso.
// Para cambiar un texto: edítalo aquí, sube su «version» y cambia «updated». Al abrir la app, a cada
// usuario se le vuelve a pedir que acepte el documento cuya versión ha cambiado (solo ese).
(function(){
const OWNER = 'David Garzón';
const EMAIL = 'ingenieria.davidgarzon@gmail.com';
// Región del proyecto de Supabase (Supabase → Project Settings → General → Region)
const REGION = 'PENDIENTE: región del proyecto de Supabase';

const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

window.LEGAL = {
  owner: OWNER, email: EMAIL, region: REGION,
  privacy: {
    id: 'privacy', title: 'Privacidad', version: '1.0', updated: '11 de octubre de 2026',
    html: `
      <p><b>Responsable:</b> ${OWNER}. Contacto: ${mail}.</p>
      <p><b>Qué datos guardamos:</b> tu email, tu nombre visible (puede ser un apodo), tus respuestas, tu progreso de estudio y los resultados de tus exámenes. Nada más.</p>
      <p><b>Para qué:</b> para que puedas estudiar, guardar tu progreso entre dispositivos y mostrar el ranking del grupo.</p>
      <p><b>Base legal:</b> tu consentimiento, que das al crear la cuenta. Puedes retirarlo cuando quieras borrando tu cuenta.</p>
      <p><b>Quién los ve:</b> el resto del grupo solo ve tu nombre visible y tus estadísticas del ranking, y puedes salir del ranking desde «Tu cuenta». Nadie ve tu email ni tus respuestas, salvo el responsable como administrador cuando haga falta para el mantenimiento.</p>
      <p><b>Dónde se guardan:</b> en Supabase, en servidores de ${REGION}.</p>
      <p><b>Cuánto tiempo:</b> mientras tengas la cuenta activa. Si la borras, se borra todo al momento. Las cuentas sin actividad durante 12 meses se borran solas. Si la app deja de funcionar, se borran todos los datos.</p>
      <p><b>Terceros:</b> tus datos no se ceden a nadie ni se usan para publicidad o analítica.</p>
      <p><b>Tus derechos:</b> acceso, rectificación, supresión, oposición y portabilidad. Puedes ejercerlos desde «Tu cuenta» (cambiar el nombre o el email, descargar tus datos, salir del ranking o borrar la cuenta) o escribiendo a ${mail}. También puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).</p>
      <p><b>En tu dispositivo:</b> solo se guarda lo imprescindible: la sesión y tu progreso para usar la app sin conexión. No hay cookies de seguimiento.</p>`
  },
  terms: {
    id: 'terms', title: 'Condiciones de uso', version: '1.0', updated: '11 de octubre de 2026',
    html: `
      <p><b>Uso exclusivo:</b> esta app es una herramienta privada de estudio para los alumnos de la clase del Máster en Ingeniería Industrial a los que ${OWNER} ha dado acceso. No es una app oficial ni está vinculada a la universidad ni al profesorado.</p>
      <p><b>Acceso personal e intransferible:</b> no puedes compartir tu cuenta, tu contraseña ni el código de grupo, ni dar acceso a otras personas sin autorización expresa del titular.</p>
      <p><b>Contenido:</b> las preguntas, explicaciones y resúmenes son material de estudio elaborado a partir de los apuntes de la asignatura, solo para tu uso personal. No puedes copiarlos, descargarlos de forma masiva, publicarlos ni distribuirlos fuera de la app sin autorización del titular. Los materiales originales de la asignatura pertenecen a sus autores.</p>
      <p><b>Sin garantía:</b> las respuestas y explicaciones pueden tener errores; no sustituyen a los apuntes ni al criterio del profesorado. La app no se responsabiliza de los resultados en los exámenes.</p>
      <p><b>Buen uso:</b> no está permitido manipular el ranking, automatizar respuestas ni intentar acceder a datos de otros usuarios.</p>
      <p><b>Incumplimiento:</b> el titular puede suspender o borrar la cuenta de quien no cumpla estas condiciones.</p>
      <p><b>Cambios:</b> si estas condiciones cambian, se te pedirá que las aceptes de nuevo.</p>
      <p><b>Contacto:</b> ${mail}.</p>`
  }
};
})();
