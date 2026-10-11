// Comprueba el contenido del módulo Aprender (data/learn/*.js) contra las reglas de la plantilla
// y contra los bancos de preguntas. Uso: node tools/check-learn.js [tema]
// Sale con código 1 si hay errores; los avisos no bloquean.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = { window: {}, SUBJECTS: [] };
ctx.window.SUBJECTS = ctx.SUBJECTS;
vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
['data/sif.js', 'data/inst.js', 'js/qid.js'].forEach(load);
const files = fs.readdirSync(path.join(ROOT, 'data/learn')).filter(f => f.endsWith('.js'));
files.forEach(f => load('data/learn/' + f));
const qid = ctx.window.TESTS_QID;
const kids = n => n.parts || n.tests || null;
const leaves = n => kids(n) ? kids(n).flatMap(leaves) : [n];
const nodes = []; (function walk(l){ l.forEach(n => { nodes.push(n); if (kids(n)) walk(kids(n)); }); })(ctx.SUBJECTS);

const CHECKS = ['q', 'notin', 'fill', 'order', 'num', 'match', 'img'];
const words = s => String(s).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
let errors = 0, warns = 0;
const err = m => { errors++; console.log('ERROR  ' + m); };
const warn = m => { warns++; console.log('aviso  ' + m); };

const only = process.argv[2];
Object.values(ctx.window.LEARN || {}).filter(D => !only || D.tema === only).forEach(D => {
  const tema = nodes.find(n => n.id === D.tema);
  if (!tema){ err(`${D.tema}: no hay ningún tema con ese id en data/`); return; }
  const bank = {}; leaves(tema).forEach(t => t.questions.forEach((q, i) => { const id = qid(q.q); (bank[id] = bank[id] || []).push({ t, i, q }); }));
  const used = new Set(), ids = new Set(), byType = {}, apts = new Set();
  let nLessons = 0, nCards = 0, minutes = [];
  console.log(`\n${D.tema} · ${D.name}`);
  if (!(D.howAsks || []).length || D.howAsks.length > 6) warn(`howAsks: ${(D.howAsks || []).length} líneas (se esperan de 4 a 6)`);
  Object.entries(D.figs || {}).forEach(([k, f]) => {
    const p = path.join(ROOT, D.base, f.src);
    if (!fs.existsSync(p)) return err(`figura ${k}: no existe ${p}`);
    const kb = fs.statSync(p).size / 1024;
    if (kb > 160) warn(`figura ${k}: ${kb.toFixed(0)} KB (objetivo ~150 KB)`);
    if (f.w > 1200) warn(`figura ${k}: ${f.w} px de ancho (máximo 1200)`);
    if (!f.alt || !f.cap) err(`figura ${k}: falta alt o pie`);
  });
  D.temas.forEach(T => T.lessons.forEach(L => {
    nLessons++;
    const where = `${L.id}`;
    if (!/^[a-z]+-\d+\.\d+(-\d+)?$/.test(L.id)) err(`${where}: id de lección con formato raro`);
    (L.apt || []).forEach(a => apts.add(a));
    if (!(L.apt || []).length) err(`${where}: falta apt`);
    const n = L.cards.length; nCards += n;
    if (n < 4 || n > 10) err(`${where}: ${n} tarjetas (de 4 a 10)`);
    if (!L.cards.some(c => CHECKS.includes(c.t))) err(`${where}: ninguna comprobación`);
    if (!(L.sum || []).length || L.sum.length < 3 || L.sum.length > 5) err(`${where}: el resumen tiene ${(L.sum || []).length} puntos (de 3 a 5)`);
    let pendingEx = false, secs = 0;
    L.cards.forEach((c, i) => {
      const w = `${where} #${i + 1} (${c.t})`;
      byType[c.t] = (byType[c.t] || 0) + 1;
      if (c.t === 'ex'){
        if (pendingEx) err(`${w}: dos explicaciones seguidas sin comprobación`);
        pendingEx = true;
        const nw = words(c.p);
        if (nw > 80) warn(`${w}: ${nw} palabras (máximo orientativo 80)`);
        secs += nw * 0.35 + (c.tab ? 25 : 0) + (c.fig ? 15 : 0);
      } else if (c.t === 'ojo'){ secs += 15; }
      else if (CHECKS.includes(c.t)){ pendingEx = false; secs += 25; }
      else err(`${w}: tipo desconocido`);
      if (c.fig && !(D.figs || {})[c.fig]) err(`${w}: figura ${c.fig} no definida`);
      if (c.fig) used.add(c.fig);
      if (c.tab && (!c.tab.h || !c.tab.r || c.tab.r.some(r => r.length !== c.tab.h.length))) err(`${w}: tabla con filas de distinto número de columnas`);
      if (CHECKS.includes(c.t) && c.t !== 'q' && !c.e) err(`${w}: falta la explicación e`);
      if (c.t === 'q' && c.ref){
        const hit = bank[c.ref];
        if (!hit) err(`${w}: la pregunta ${c.ref} no está en los bancos de ${D.tema}`);
      } else if (['q', 'notin', 'img'].includes(c.t)){
        if (!c.q || !Array.isArray(c.o) || c.o.length < 2 || c.o.length > 4) err(`${w}: enunciado u opciones mal formados`);
        else if (!(c.c >= 0 && c.c < c.o.length)) err(`${w}: c fuera de rango`);
        if (c.t === 'q' && !c.e) err(`${w}: falta la explicación e`);
        if (c.t === 'notin' && !/\bNO\b/.test(c.q)) warn(`${w}: «¿Cuál NO…?» sin la palabra NO en mayúsculas`);
      }
      if (c.t === 'img' && !c.fig) err(`${w}: falta la figura`);
      if (c.t === 'num' && (!Number.isFinite(c.v) || typeof c.u !== 'string')) err(`${w}: v debe ser un número y u las unidades`);
      if (c.t === 'match'){
        const p = c.pairs || [];
        if (p.length < 4 || p.length > 6) err(`${w}: ${p.length} parejas (de 4 a 6)`);
        if (new Set(p.map(x => x[0])).size !== p.length || new Set(p.map(x => x[1])).size !== p.length) err(`${w}: hay parejas repetidas`);
      }
      if (c.t === 'fill'){
        const holes = (c.items || []).join('|').split('{}').length - 1;
        if (holes !== (c.ans || []).length) err(`${w}: ${holes} huecos y ${(c.ans || []).length} respuestas`);
        if (!(c.dis || []).length) err(`${w}: faltan distractores`);
      }
      if (c.t === 'order' && (c.items || []).length < 3) err(`${w}: ordenar necesita al menos 3 elementos`);
      if (CHECKS.includes(c.t)){
        const id = L.id + ':' + qid(c.ref || c.q || '');
        if (ids.has(id)) err(`${w}: id de tarjeta repetido (${id}); cambia el enunciado`);
        ids.add(id);
      }
    });
    minutes.push(secs / 60);
    if (secs / 60 > 6) warn(`${where}: unos ${Math.round(secs / 60)} min (objetivo de 3 a 5)`);
  }));
  Object.keys(D.figs || {}).filter(k => !used.has(k)).forEach(k => warn(`figura ${k} sin usar en ninguna tarjeta`));
  // asociación con el banco
  let withApt = 0, total = 0; const noApt = [], orphan = new Set();
  leaves(tema).forEach(t => t.questions.forEach((q, i) => {
    total++;
    if (q.apt){ withApt++; if (!apts.has(q.apt)) orphan.add(q.apt); }
    else noApt.push(`${t.id} nº ${i + 1}: ${q.q}`);
  }));
  orphan.forEach(a => err(`apt ${a} está en el banco pero ninguna lección lo cubre`));
  console.log(`  lecciones: ${nLessons} · tarjetas: ${nCards} · figuras: ${Object.keys(D.figs || {}).length}`);
  console.log('  por tipo: ' + Object.entries(byType).map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log(`  duración estimada por lección: ${Math.min(...minutes).toFixed(1)}–${Math.max(...minutes).toFixed(1)} min`);
  console.log(`  preguntas del banco con apt: ${withApt} de ${total}`);
  noApt.forEach(s => console.log('  sin apt: ' + s));
  console.log(`  chuleta: ${(D.cheat || []).length} tarjetas`);
});
console.log(`\n${errors} errores, ${warns} avisos`);
process.exit(errors ? 1 : 0);
