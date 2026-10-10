// Id estable de cada pregunta: hash corto (FNV-1a de 32 bits, en base 36) del enunciado normalizado
// (sin tildes, en minúsculas, solo letras y números). Así añadir o reordenar preguntas no rompe el progreso.
window.TESTS_QID = function(text){
  const n = String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  let h = 0x811c9dc5;
  for (let i = 0; i < n.length; i++){ h ^= n.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36).padStart(7, '0');
};
