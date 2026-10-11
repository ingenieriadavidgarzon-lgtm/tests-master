// Módulo «Aprender»: lecciones cortas con comprobaciones, repaso espaciado (Leitner) y chuleta para dar la vuelta.
// El contenido está en data/learn/<tema>.js (window.LEARN[tema]). El progreso se guarda por usuario en
// localStorage (tests.u.<id>.learn.<tema>) y se sube a Supabase (tabla learn_progress) con la cola de js/cloud.js.
// No cuenta para el ranking ni toca el progreso de los tests.
(function(){
const DATA = window.LEARN || {};
const T = () => window.TestsApp;
const C = window.Cloud && window.Cloud.enabled ? window.Cloud : null;
const qid = window.TESTS_QID;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LET = 'ABCDEF';
const INTERVALS = [1, 3, 7, 14];   // días hasta el siguiente repaso en las cajas 1, 2, 3 y 4
const MAX_REVIEW = 20;             // tarjetas por sesión de repaso
const CHECKS = ['q', 'notin', 'fill', 'order', 'num', 'match', 'img'];
const TYPE = {q: 'Test', notin: '¿Cuál NO está?', fill: 'Completa', order: 'Ordena', num: 'Dato exacto', match: 'Empareja', img: 'Reconoce la figura'};
const kidsOf = n => n.parts || n.tests || null;
const leavesOf = n => kidsOf(n) ? kidsOf(n).flatMap(leavesOf) : [n];
function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// mismo criterio que la app: no se barajan las de dos opciones ni las de «A y B»; «Todas/Ninguna» al final
function optOrder(o){
  const idx = o.map((_, i) => i);
  if (o.length < 3 || o.some(x => /\b[AB] y [BC]\b|^ambas\b/i.test(x))) return idx;
  const fixLast = /^(todas|ninguna)\b/i.test(o[o.length - 1]);
  return fixLast ? shuffle(idx.slice(0, -1)).concat(idx.length - 1) : shuffle(idx);
}
const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);
const fmtNum = v => { const [i, d] = String(v).split('.'); return i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (d ? ',' + d : ''); };
const words = s => String(s).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

/* ---------- índice del contenido ---------- */
const NODES = []; (function walk(l){ (l || []).forEach(n => { NODES.push(n); if (kidsOf(n)) walk(kidsOf(n)); }); })(window.SUBJECTS);
const IX = {};
Object.values(DATA).forEach(D => {
  const node = NODES.find(n => n.id === D.tema);
  const bank = {};    // id estable de pregunta → {s: test, q, i}
  if (node) leavesOf(node).forEach(s => s.questions.forEach((q, i) => { const id = qid(q.q); if (!bank[id]) bank[id] = {s, q, i}; }));
  const lessons = [], cards = {};
  D.temas.forEach(t => t.lessons.forEach(L => {
    L.temaN = t.n; L.num = L.title.split('. ')[0];
    let secs = 0;
    L.cards.forEach((c, i) => {
      c.L = L;
      if (CHECKS.includes(c.t)){ c.id = L.id + ':' + qid(c.ref || c.q); cards[c.id] = c; secs += 25; }
      else secs += c.t === 'ex' ? words(c.p) * 0.35 + (c.tab ? 25 : 0) + (c.fig ? 15 : 0) : 15;
      if (c.ref && !bank[c.ref]) console.warn('[aprender] pregunta no encontrada en el banco:', c.ref);
    });
    L.min = Math.max(2, Math.round(secs / 60));
    lessons.push(L);
  }));
  const cheat = (D.cheat || []).map(([k, v]) => ({id: D.tema + '-ch:' + qid(k), k, v}));
  cheat.forEach(x => { cards[x.id] = {t: 'flip', id: x.id, k: x.k, v: x.v}; });
  IX[D.tema] = {D, node, bank, lessons, cards, cheat};
});
const ix = tema => IX[tema];
const lessonOfApt = apt => { for (const t in IX){ const L = IX[t].lessons.find(l => l.apt.includes(apt)); if (L) return {tema: t, L}; } return null; };

/* ---------- progreso: { items: { 'L:<lección>' | 'R:<tarjeta>': { d, at } } } ---------- */
const keyOf = tema => T().key('learn.' + tema);
function load(tema){ try { const v = localStorage.getItem(keyOf(tema)); const o = v ? JSON.parse(v) : null; return o && o.items ? o : {items: {}}; } catch(e){ return {items: {}}; } }
function put(tema, k, d){
  const st = load(tema), at = new Date().toISOString();
  st.items[k] = {d, at};
  try { localStorage.setItem(keyOf(tema), JSON.stringify(st)); } catch(e){}
  if (C) C.onLearn(tema, k, d, at);
}
const get = (tema, k) => (load(tema).items[k] || {}).d || null;
const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => ymd(new Date());
const inDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return ymd(d); };

// Leitner: fallo → caja 1 (mañana); acierto → caja siguiente (3, 7 y 14 días); acierto en la caja 4 → fuera del repaso
function boxFail(tema, id){ put(tema, 'R:' + id, {box: 1, due: inDays(INTERVALS[0])}); }
function boxEnter(tema, id){ const r = get(tema, 'R:' + id); if (!r || r.done) put(tema, 'R:' + id, {box: 1, due: inDays(INTERVALS[0])}); }
function boxOk(tema, id){
  const r = get(tema, 'R:' + id), b = (r && r.box) || 1;
  if (b >= INTERVALS.length){ put(tema, 'R:' + id, {box: b, done: true}); return 0; }
  put(tema, 'R:' + id, {box: b + 1, due: inDays(INTERVALS[b])});
  return INTERVALS[b];
}
function reviewItems(tema){
  const I = ix(tema), items = load(tema).items;
  return Object.entries(items).filter(([k, v]) => k.startsWith('R:') && v.d && v.d.due && !v.d.done && I.cards[k.slice(2)])
    .map(([k, v]) => ({id: k.slice(2), due: v.d.due, box: v.d.box}));
}
const dueNow = tema => reviewItems(tema).filter(r => r.due <= today()).sort((a, b) => a.due.localeCompare(b.due) || a.box - b.box);
function nextDue(tema){
  const later = reviewItems(tema).filter(r => r.due > today()).sort((a, b) => a.due.localeCompare(b.due));
  return later.length ? {due: later[0].due, n: later.filter(r => r.due === later[0].due).length} : null;
}
function status(tema, L, due){
  const d = get(tema, 'L:' + L.id);
  if (d && d.st === 'done') return (due || dueNow(tema)).some(r => r.id.startsWith(L.id + ':')) ? 'review' : 'done';
  return d && d.st === 'prog' ? 'prog' : 'new';
}
const ST = {new: 'Sin empezar', prog: 'En curso', done: 'Completada', review: 'Para repasar'};
function pct(tema){
  const I = ix(tema), items = load(tema).items;
  const done = I.lessons.filter(L => { const v = items['L:' + L.id]; return v && v.d && v.d.st === 'done'; }).length;
  return {done, total: I.lessons.length, pct: Math.round(100 * done / I.lessons.length)};
}
// «Continuar donde lo dejé»: la lección en curso más reciente; si no hay, la primera sin completar
function continueTarget(tema){
  const I = ix(tema), items = load(tema).items;
  const prog = I.lessons.map(L => ({L, v: items['L:' + L.id]})).filter(x => x.v && x.v.d && x.v.d.st === 'prog')
    .sort((a, b) => b.v.at.localeCompare(a.v.at));
  if (prog.length) return prog[0].L;
  return I.lessons.find(L => { const v = items['L:' + L.id]; return !(v && v.d && v.d.st === 'done'); }) || null;
}

/* ---------- sesión (lección, repaso o chuleta) ---------- */
let S = null;
const cardAt = () => S.kind === 'lesson' ? S.L.cards[S.queue[S.pos]] : ix(S.tema).cards[S.queue[S.pos]];
function fresh(c){
  // estado de la tarjeta en esta visita (opciones barajadas, huecos, orden, parejas)
  const u = {done: false, ok: null};
  if (!c) return u;
  if (c.t === 'q' && c.ref){ const b = ix(S.tema).bank[c.ref]; u.ord = b ? optOrder(b.q.o) : []; }
  else if (['q', 'notin', 'img'].includes(c.t)) u.ord = optOrder(c.o);
  if (c.t === 'fill'){ u.pool = shuffle(c.ans.concat(c.dis)); u.slots = c.ans.map(() => null); }
  if (c.t === 'order'){ let p; do { p = shuffle(c.items.map((_, i) => i)); } while (p.every((x, i) => x === i)); u.pool = p; u.seq = []; }
  if (c.t === 'match'){ u.right = shuffle(c.pairs.map(p => p[1])); u.sel = {}; }
  if (c.t === 'num') u.val = '';
  return u;
}
function startLesson(tema, L, back){
  const d = get(tema, 'L:' + L.id);
  const resume = d && d.st === 'prog' && Array.isArray(d.q) && d.q.every(i => L.cards[i]) && d.i < d.q.length;
  S = {kind: 'lesson', tema, L, queue: resume ? d.q.slice() : L.cards.map((_, i) => i), pos: resume ? d.i : 0,
       persist: !(d && d.st === 'done'), back: back || null, ok: 0, ko: 0, focus: '#lcard'};
  S.u = fresh(cardAt());
  T().go({name: 'learnLesson', tema});      // pasa a «En curso» al superar la primera tarjeta
}
function startReview(tema){
  const list = dueNow(tema).slice(0, MAX_REVIEW).map(r => r.id);
  S = {kind: 'review', tema, queue: list, pos: 0, ok: 0, ko: 0, focus: '#lcard'};
  S.u = fresh(cardAt());
  T().go({name: list.length ? 'learnLesson' : 'learnEnd', tema});
}
function startCheat(tema){
  S = {kind: 'cheat', tema, queue: ix(tema).cheat.map(x => x.id), pos: 0, ok: 0, ko: 0, focus: '#lcard'};
  S.u = fresh(null);
  T().go({name: 'learnLesson', tema});
}

/* ---------- comprobación ---------- */
function parseNum(s){
  s = String(s).replace(/\s+/g, '').replace(/[^\d.,+\-].*$/, '');   // se ignoran las unidades escritas detrás
  if (!/\d/.test(s)) return [];
  const c = [];
  if (s.includes(',') && s.includes('.')) c.push(s.replace(/\./g, '').replace(',', '.'));
  else if (s.includes(',')) c.push(s.replace(',', '.'));
  else { c.push(s); if (/^\d{1,3}(\.\d{3})+$/.test(s)) c.push(s.replace(/\./g, '')); }   // 1.700 puede ser mil setecientos
  return c.map(Number).filter(Number.isFinite);
}
function grade(c, u, answer){
  if (c.t === 'q' && c.ref){ const b = ix(S.tema).bank[c.ref]; return answer === b.q.c; }
  if (['q', 'notin', 'img'].includes(c.t)) return answer === c.c;
  if (c.t === 'num') return parseNum(u.val).some(x => Math.abs(x - c.v) <= 1e-9 * Math.max(1, Math.abs(c.v)));
  if (c.t === 'fill') return u.slots.every((p, i) => u.pool[p] === c.ans[i]);
  if (c.t === 'order') return u.seq.every((x, i) => x === i);
  if (c.t === 'match') return c.pairs.every((p, i) => u.right[u.sel[i]] === p[1]);
  return false;
}
function settle(ok){
  const c = cardAt(), u = S.u;
  u.done = true; u.ok = ok; ok ? S.ok++ : S.ko++;
  if (S.kind === 'lesson'){
    if (!ok){ S.queue.push(S.queue[S.pos]); boxFail(S.tema, c.id); }
    else if (c.t === 'num') boxEnter(S.tema, c.id);
    if (S.persist) put(S.tema, 'L:' + S.L.id, {st: 'prog', q: S.queue, i: S.pos});
  } else if (S.kind === 'review'){
    if (ok) u.days = boxOk(S.tema, c.id); else boxFail(S.tema, c.id);
  }
  S.focus = '.verdict';
  T().render();
}
function advance(){
  S.pos++;
  if (S.pos >= S.queue.length){
    if (S.kind === 'lesson' && S.persist) put(S.tema, 'L:' + S.L.id, {st: 'done'});
    T().go({name: 'learnEnd', tema: S.tema});
    return;
  }
  if (S.kind === 'lesson' && S.persist) put(S.tema, 'L:' + S.L.id, {st: 'prog', q: S.queue, i: S.pos});
  S.u = fresh(cardAt()); S.focus = '#lcard';
  T().render(); window.scrollTo(0, 0);
}

/* ---------- piezas de las vistas ---------- */
function table(t, label){
  return `<div class="tscroll" tabindex="0" role="region" aria-label="${esc('Tabla: ' + label)}"><table class="ltab">
    <thead><tr>${t.h.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${t.r.map(r => `<tr>${r.map((v, i) => i === 0 ? `<th scope="row">${esc(v)}</th>` : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function figure(tema, k, showCap){
  const D = ix(tema).D, f = D.figs[k];
  return `<figure class="lfig"><img src="./${esc(D.base + f.src)}" width="${f.w}" height="${f.h}" alt="${esc(f.alt)}" decoding="async">
    ${showCap ? `<figcaption>${esc(f.cap)}</figcaption>` : ''}</figure>`;
}
const cite = L => `Temario de ${esc(ix(S.tema).D.name)}, apartado ${esc(L.num)}.`;
function optsHtml(o, ord, u, correct){
  return `<div class="opts">${ord.map((oi, pos) => {
    let cls = '';
    if (u.done){ if (oi === correct) cls = 'right'; else if (oi === u.pick) cls = 'wrong'; else cls = 'dim'; }
    return `<button class="opt ${cls}" data-act="lOpt" data-o="${oi}" ${u.done ? 'disabled' : ''}><span class="lt">${LET[pos]}</span><span class="tx">${esc(o[oi])}</span></button>`;
  }).join('')}</div>`;
}
function verdict(c, u, right, why, extra){
  const after = S.kind === 'lesson'
    ? (u.ok ? '' : `<p class="again">Esta tarjeta vuelve al final de la lección.</p>`)
    : (u.ok ? `<p class="again">${u.days ? `Siguiente repaso dentro de ${plural(u.days, 'día', 'días')}.` : 'Dominada: sale del repaso.'}</p>`
            : `<p class="again">Vuelve a la caja 1: la verás mañana.</p>`);
  return `<div class="verdict ${u.ok ? 'ok' : 'ko'}" tabindex="-1" role="status">
    <p class="vh">${u.ok ? 'Correcto' : 'No es eso'}</p>
    ${!u.ok && right ? `<p class="yours">${right}</p>` : ''}
    <div class="why"><p>${esc(why)}</p>${extra || ''}<p class="cite">${cite(c.L)}</p></div>${after}</div>`;
}
function checkBody(c, u){
  const I = ix(S.tema);
  let h = `<p class="ltype">Comprueba · ${TYPE[c.t]}</p>`;
  if (c.t === 'q' && c.ref){
    const b = I.bank[c.ref];
    h += `<p class="qtext">${esc(b.q.q)}</p>${optsHtml(b.q.o, u.ord, u, b.q.c)}`;
    if (u.done) h += verdict(c, u, `La correcta es: <b>${esc(b.q.o[b.q.c])}</b>`, b.q.e,
      `<p class="cite">Pregunta del banco: ${esc(b.s.name)}, nº ${b.i + 1}.</p>`);
    return h;
  }
  if (c.t === 'img') h += figure(S.tema, c.fig, u.done);
  h += `<p class="qtext">${esc(c.q)}</p>`;
  if (['q', 'notin', 'img'].includes(c.t)){
    h += optsHtml(c.o, u.ord, u, c.c);
    if (u.done) h += verdict(c, u, `La correcta es: <b>${esc(c.o[c.c])}</b>`, c.e);
  } else if (c.t === 'num'){
    h += `<form class="numrow" data-lform="num" novalidate>
      <input id="lnum" name="v" type="text" inputmode="decimal" autocomplete="off" enterkeyhint="done" value="${esc(u.val)}" ${u.done ? 'disabled' : ''} aria-label="${esc('Respuesta' + (c.u ? ' en ' + c.u : ''))}">
      ${c.u ? `<span class="unit">${esc(c.u)}</span>` : ''}</form>
      <p class="hint">Solo el número. Vale coma o punto decimal.</p>`;
    if (u.err) h += `<p class="lerr" role="alert">${esc(u.err)}</p>`;
    if (u.done) h += verdict(c, u, `La respuesta es <b>${esc(fmtNum(c.v))}${c.u ? ' ' + esc(c.u) : ''}</b>.`, c.e);
  } else if (c.t === 'fill'){
    let k = 0;
    const slot = () => { const i = k++, p = u.slots[i];
      if (u.done) return `<span class="slot ${u.pool[p] === c.ans[i] ? 'ok' : 'ko'}">${esc(u.pool[p])}${u.pool[p] === c.ans[i] ? '' : ` <s class="sr">incorrecto</s>`}</span>`;
      return p === null ? `<span class="slot empty"><span class="sr">hueco ${i + 1} vacío</span></span>`
        : `<button class="slot" data-act="lSlot" data-i="${i}" aria-label="${esc('Quitar «' + u.pool[p] + '» del hueco ' + (i + 1))}">${esc(u.pool[p])}</button>`; };
    h += `<ul class="filllist">${c.items.map(t => `<li>${t.split('{}').map(esc).reduce((a, b) => a + slot() + b)}</li>`).join('')}</ul>`;
    if (!u.done) h += `<p class="hint">Toca una opción para ponerla en el primer hueco libre; toca un hueco para vaciarlo.</p>
      <div class="chips pool">${u.pool.map((t, j) => `<button class="chip" data-act="lChip" data-i="${j}" ${u.slots.includes(j) ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>`;
    if (u.done) h += verdict(c, u, 'Lo correcto: ' + c.ans.map(a => `<b>${esc(a)}</b>`).join(' · '), c.e);
  } else if (c.t === 'order'){
    if (!u.done){
      h += `<p class="hint">Toca los elementos en orden. Toca uno de tu lista para quitarlo.</p>
        <ol class="ordlist">${u.seq.map((x, i) => `<li><button class="ordit" data-act="lOrdOut" data-i="${i}" aria-label="${esc('Quitar ' + c.items[x])}">${esc(c.items[x])}</button></li>`).join('')}
        ${c.items.length > u.seq.length ? `<li class="ph" aria-hidden="true">…</li>` : ''}</ol>
        <div class="chips pool">${u.pool.filter(x => !u.seq.includes(x)).map(x => `<button class="chip" data-act="lOrdIn" data-i="${x}">${esc(c.items[x])}</button>`).join('')}</div>`;
    } else {
      h += `<ol class="ordlist">${u.seq.map((x, i) => `<li><span class="ordit ${x === i ? 'ok' : 'ko'}">${esc(c.items[x])}</span></li>`).join('')}</ol>`;
      h += verdict(c, u, 'Orden correcto: ' + c.items.map(esc).join(' → '), c.e);
    }
  } else if (c.t === 'match'){
    h += `<div class="matchlist">${c.pairs.map((p, i) => {
      const sel = u.sel[i], okk = u.done && u.right[sel] === p[1];
      return `<div class="mrow ${u.done ? (okk ? 'ok' : 'ko') : ''}"><label for="lm${i}">${esc(p[0])}</label>
        <select id="lm${i}" data-lmatch="${i}" ${u.done ? 'disabled' : ''}><option value="">Elige…</option>${u.right.map((r, j) => `<option value="${j}" ${String(sel) === String(j) ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
        ${u.done && !okk ? `<small>Correcta: ${esc(p[1])}</small>` : ''}</div>`;
    }).join('')}</div>`;
    if (u.err) h += `<p class="lerr" role="alert">${esc(u.err)}</p>`;
    if (u.done) h += verdict(c, u, '', c.e);
  }
  return h;
}
function cardBody(c, u){
  if (c.t === 'ex') return `<p class="ltype">Explicación</p><h2 class="lh">${esc(c.h)}</h2><div class="lp"><p>${c.p}</p></div>
    ${c.tab ? table(c.tab, c.h) : ''}${c.fig ? figure(S.tema, c.fig, true) : ''}`;
  if (c.t === 'ojo') return `<div class="ojo"><p class="ltype">Ojo</p><p>${esc(c.p)}</p></div>`;
  if (c.t === 'flip') return `<p class="ltype">Chuleta${S.kind === 'review' ? ' · repaso' : ''}</p>
    <div class="flip ${u.flipped ? 'on' : ''}"><p class="fk">${esc(c.k)}</p>${u.flipped ? `<p class="fv">${esc(c.v)}</p>` : `<p class="fq">¿Qué dato es?</p>`}</div>
    ${u.done && S.kind === 'review' ? `<p class="again">${u.ok ? (u.days ? `Siguiente repaso dentro de ${plural(u.days, 'día', 'días')}.` : 'Dominada: sale del repaso.') : 'Vuelve a la caja 1: la verás mañana.'}</p>` : ''}`;
  return checkBody(c, u);
}
function dock(c, u){
  if (c.t === 'flip'){
    if (!u.flipped) return `<button class="btn primary big" data-act="lFlip">Dar la vuelta</button>`;
    if (!u.done) return `<button class="btn" data-act="lKnow" data-v="0">No lo sabía</button><button class="btn primary" data-act="lKnow" data-v="1">Lo sabía</button>`;
  }
  if (CHECKS.includes(c.t) && !u.done){
    if (['q', 'notin', 'img'].includes(c.t)) return `<p class="dockhint">Elige una opción</p>`;
    const ready = c.t === 'fill' ? !u.slots.includes(null) : c.t === 'order' ? u.seq.length === c.items.length : true;
    return `<button class="btn primary big" data-act="lCheck" ${ready ? '' : 'disabled'}>Comprobar</button>`;
  }
  const last = S.pos === S.queue.length - 1;
  return `<button class="btn primary big" data-act="lNext">${last ? (S.kind === 'lesson' ? 'Terminar la lección' : 'Terminar') : 'Continuar'}</button>`;
}

/* ---------- vistas ---------- */
function vHome(V){
  const I = ix(V.tema), D = I.D, p = pct(V.tema), due = dueNow(V.tema), nx = nextDue(V.tema), cont = continueTarget(V.tema);
  const contState = cont && get(V.tema, 'L:' + cont.id);
  const temas = D.temas.map(t => `<h3>Tema ${t.n}. ${esc(t.name)}</h3><div class="stack">${t.lessons.map(L => {
    const st = status(V.tema, L, due);
    return `<button class="pick lrow" data-act="lOpen" data-id="${esc(L.id)}"><span class="l"><b>${esc(L.title)}</b><small>${L.cards.length} tarjetas · unos ${L.min} min</small></span><span class="lst ${st}">${ST[st]}</span></button>`;
  }).join('')}</div>`).join('');
  return T().top(D.name + ' · Aprender', 'lUp') + `
    <p class="eyebrow">${esc(D.name)} · ${I.lessons.length} lecciones</p>
    <h2 class="big">Aprender</h2>
    <div class="meter"><div class="bar" aria-hidden="true"><i class="g" style="width:${p.pct}%"></i></div><span>${p.pct} % de lecciones completadas (${p.done} de ${p.total})</span></div>
    <section class="howasks" aria-labelledby="howh"><h3 id="howh">Cómo pregunta este profesorado</h3><ul>${D.howAsks.map(l => `<li>${esc(l)}</li>`).join('')}</ul></section>
    ${(D.discrep || []).length ? `<section class="howasks discrep" aria-labelledby="disch"><h3 id="disch">Discrepancias del temario</h3><ul>${D.discrep.map(l => `<li>${esc(l)}</li>`).join('')}</ul></section>` : ''}
    <div class="stack" style="margin-top:14px">
      ${cont ? `<button class="mode primary" data-act="lContinue"><b>Continuar donde lo dejé</b><span>${esc(cont.title)}${contState && contState.st === 'prog' ? ` · tarjeta ${Math.min(contState.i + 1, contState.q.length)} de ${contState.q.length}` : ''}</span></button>`
        : `<div class="mode primary off" aria-disabled="true"><b>Has completado todas las lecciones</b><span>Sigue con el repaso de hoy y la chuleta.</span></div>`}
      <button class="pick" data-act="lReview"><span class="l"><b>Repaso de hoy</b><small>${due.length ? `Tarjetas falladas y datos exactos que tocan hoy (máximo ${MAX_REVIEW} por sesión)` : nx ? `Nada pendiente hoy. Próximo: ${plural(nx.n, 'tarjeta', 'tarjetas')} el ${nx.due.split('-').reverse().join('/')}` : 'Aún no hay tarjetas: entran las que falles y las de dato exacto'}</small></span><span class="n">${due.length}</span></button>
      <button class="pick" data-act="lCheat"><span class="l"><b>Chuleta</b><small>Los datos que más caen, en tarjetas para dar la vuelta</small></span><span class="n">${I.cheat.length}</span></button>
    </div>
    ${temas}
    <p class="hint" style="margin-top:22px">Aprender no cuenta para el ranking. Tu avance se guarda en tu cuenta y se sincroniza entre dispositivos.</p>`;
}
function vCard(){
  const c = cardAt(), u = S.u, n = S.queue.length;
  const title = S.kind === 'lesson' ? S.L.title : S.kind === 'review' ? 'Repaso de hoy' : 'Chuleta';
  const done = S.pos + ((u.done || (c.t !== 'flip' && !CHECKS.includes(c.t))) ? 1 : 0);
  const extra = S.kind === 'lesson' && S.queue.length > S.L.cards.length ? ` · ${plural(S.queue.length - S.L.cards.length, 'repetida', 'repetidas')}` : '';
  return T().top(title, 'lLeave') + `
    <div class="progress" role="progressbar" aria-label="Avance" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${done}"><i style="width:${100 * done / n}%"></i></div>
    <p class="eyebrow" style="margin-bottom:8px">Tarjeta ${S.pos + 1} de ${n}${extra}</p>
    <section class="lcard" id="lcard" tabindex="-1" aria-label="Tarjeta ${S.pos + 1} de ${n}">${cardBody(c, u)}</section>
    <div class="spacer"></div>
    <div class="dock">${dock(c, u)}</div>`;
}
function vEnd(){
  const I = ix(S.tema);
  if (S.kind === 'lesson'){
    const L = S.L, items = [];
    const seen = new Set();
    leavesOf(I.node || {questions: []}).forEach(s => s.questions.forEach(q => { if (L.apt.includes(q.apt)){ const id = qid(q.q); if (!seen.has(id)){ seen.add(id); items.push(1); } } }));
    const idx = I.lessons.indexOf(L), next = I.lessons[idx + 1];
    return T().top('Lección completada', 'lLeave') + `
      <p class="eyebrow">${esc(L.title)}</p>
      <h2 class="big">Resumen</h2>
      <ul class="sumlist">${L.sum.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <p class="hint">${S.ko ? `Has fallado ${plural(S.ko, 'comprobación', 'comprobaciones')}: ${S.ko === 1 ? 'entra' : 'entran'} en el repaso de mañana.` : 'Sin fallos en esta lección.'}</p>
      <div class="spacer"></div>
      <div class="dock col">
        ${items.length ? `<button class="btn primary" data-act="lPractice">Practicar preguntas de este apartado · ${items.length}</button>`
          : `<p class="dockhint">Este apartado no tiene preguntas en los tests.</p>`}
        <div class="row">${next ? `<button class="btn" data-act="lOpen" data-id="${esc(next.id)}">Siguiente lección</button>` : ''}<button class="btn" data-act="lHome">${S.back ? 'Volver' : 'Volver a Aprender'}</button></div>
      </div>`;
  }
  const what = S.kind === 'review' ? 'Repaso' : 'Chuleta';
  const nx = nextDue(S.tema), n = S.ok + S.ko;
  return T().top(what + (n ? ' terminado' : ''), 'lHome') + `
    ${n ? `<p class="eyebrow">${plural(n, 'tarjeta', 'tarjetas')}</p>
    <div class="kpis"><div class="g"><b>${S.ok}</b><span>${S.kind === 'cheat' ? 'Lo sabía' : 'Bien'}</span></div><div class="r"><b>${S.ko}</b><span>${S.kind === 'cheat' ? 'No lo sabía' : 'A repetir'}</span></div><div><b>${dueNow(S.tema).length}</b><span>Pendientes hoy</span></div></div>
    <p class="hint">${S.kind === 'cheat' && S.ko ? 'Las que no sabías pasan al repaso: te las preguntará mañana.' : ''}</p>`
    : `<h2 class="big">Nada que repasar hoy</h2><p class="lede">${nx ? `Próximo repaso: ${plural(nx.n, 'tarjeta', 'tarjetas')} el ${nx.due.split('-').reverse().join('/')}.` : 'Entran en el repaso las comprobaciones que falles, las de dato exacto y las tarjetas de la chuleta que no sepas.'}</p>`}
    <div class="spacer"></div>
    <div class="dock">${S.kind === 'cheat' && dueNow(S.tema).length ? `<button class="btn" data-act="lReview">Ir al repaso</button>` : ''}<button class="btn primary" data-act="lHome">Volver a Aprender</button></div>`;
}
function view(V){
  if (!V.name.startsWith('learn')) return null;
  if (!ix(V.tema)) return null;
  if (V.name === 'learn') return vHome(V);
  if (!S || S.tema !== V.tema){ setTimeout(() => T().go({name: 'learn', tema: V.tema}), 0); return ''; }
  if (V.name === 'learnLesson') return S.pos < S.queue.length ? vCard() : vEnd();
  if (V.name === 'learnEnd') return vEnd();
  return null;
}
function after(V){
  if (!S || !S.focus || !V.name.startsWith('learn')) return;
  const sel = S.focus; S.focus = null;
  const el = document.querySelector(sel);
  if (el) el.focus({preventScroll: true});
}

/* ---------- acciones ---------- */
const A = {
  learn(d){ T().go({name: 'learn', tema: d.id}); },
  lUp(){ const V = T().V; T().go({name: 'parts', tid: V.tema}); },
  lHome(){ if (S && S.back && S.kind === 'lesson'){ const b = S.back; S = null; T().go(b); } else T().go({name: 'learn', tema: (S && S.tema) || T().V.tema}); },
  lLeave(){ A.lHome(); },
  lOpen(d){ const tema = T().V.tema, L = ix(tema).lessons.find(l => l.id === d.id); if (L) startLesson(tema, L, T().V.name === 'learnEnd' && S && S.kind === 'lesson' ? S.back : null); },
  lContinue(){ const tema = T().V.tema, L = continueTarget(tema); if (L) startLesson(tema, L, null); },
  lReview(){ startReview(T().V.tema); },
  lCheat(){ startCheat(T().V.tema); },
  lOpt(d){ const u = S.u; if (u.done) return; u.pick = +d.o; settle(grade(cardAt(), u, u.pick)); },
  lChip(d){ const u = S.u, i = u.slots.indexOf(null); if (i < 0) return; u.slots[i] = +d.i; T().render(); const n = document.querySelector('[data-act="lChip"]:not(:disabled)') || document.querySelector('[data-act="lCheck"]'); if (n) n.focus(); },
  lSlot(d){ S.u.slots[+d.i] = null; T().render(); },
  lOrdIn(d){ S.u.seq.push(+d.i); T().render(); const n = document.querySelector('[data-act="lOrdIn"]') || document.querySelector('[data-act="lCheck"]'); if (n) n.focus(); },
  lOrdOut(d){ S.u.seq.splice(+d.i, 1); T().render(); },
  lCheck(){
    const c = cardAt(), u = S.u;
    if (c.t === 'num'){ const el = document.getElementById('lnum'); u.val = el ? el.value : u.val;
      if (!parseNum(u.val).length){ u.err = 'Escribe un número.'; S.focus = '#lnum'; return T().render(); } }
    if (c.t === 'match' && c.pairs.some((_, i) => u.sel[i] === undefined || u.sel[i] === '')){ u.err = 'Empareja todas antes de comprobar.'; return T().render(); }
    u.err = '';
    settle(grade(c, u));
  },
  lNext(){ advance(); },
  lFlip(){ S.u.flipped = true; S.focus = '#lcard'; T().render(); },
  lKnow(d){
    const c = cardAt(), u = S.u, ok = d.v === '1';
    u.done = true; u.ok = ok; ok ? S.ok++ : S.ko++;
    if (S.kind === 'review'){ if (ok) u.days = boxOk(S.tema, c.id); else boxFail(S.tema, c.id); S.focus = '#lcard'; T().render(); }
    else { if (!ok) boxFail(S.tema, c.id); advance(); }
  },
  lPractice(){
    const I = ix(S.tema), L = S.L, items = [], seen = new Set();
    leavesOf(I.node).forEach(s => s.questions.forEach((q, qi) => {
      if (!L.apt.includes(q.apt)) return;
      const id = qid(q.q); if (seen.has(id)) return; seen.add(id); items.push({sid: s.id, qi});
    }));
    if (items.length) T().startItems(items, true, {apt: L.num, back: {name: 'learnEnd', tema: S.tema}});
  }
};
// números y parejas
const app = document.getElementById('app');
app.addEventListener('change', e => {
  const t = e.target.closest('[data-lmatch]'); if (!t || !S) return;
  S.u.sel[+t.dataset.lmatch] = t.value === '' ? undefined : +t.value;
});
app.addEventListener('input', e => { if (e.target.id === 'lnum' && S) S.u.val = e.target.value; });
app.addEventListener('submit', e => { const f = e.target.closest('form[data-lform]'); if (!f) return; e.preventDefault(); A.lCheck(); });

/* ---------- integración con las pantallas de la app ---------- */
// Tarjeta «Aprender» en la lista de tests de un tema (desactivada si el tema aún no tiene contenido)
function partsCard(g){
  if (ix(g.id)){
    const p = pct(g.id);
    return `<button class="subj learnc" data-act="learn" data-id="${esc(g.id)}">
      <span class="code">AP</span><span class="name">Aprender</span>
      <span class="meta">${ix(g.id).lessons.length} lecciones cortas con comprobaciones, repaso y chuleta</span>
      <span class="meter"><span class="bar" aria-hidden="true"><i class="g" style="width:${p.pct}%"></i></span><span>${p.pct} % de lecciones completadas</span></span></button>`;
  }
  return `<div class="subj learnc off" aria-disabled="true"><span class="code">AP</span><span class="name">Aprender</span><span class="meta">Próximamente</span></div>`;
}
const hasApt = apt => !!(apt && lessonOfApt(apt));
const studyBtn = q => hasApt(q.apt) ? `<button class="linkbtn study" data-act="studyApt" data-apt="${esc(q.apt)}">Estudiar este apartado</button>` : '';
function openApt(apt, back){ const r = lessonOfApt(apt); if (r) startLesson(r.tema, r.L, back); }

window.Learn = { has: tema => !!ix(tema), hasApt, partsCard, studyBtn, openApt, view, after, act: A,
  // para pruebas y depuración
  _ix: IX, _parseNum: parseNum, _state: () => S };
})();
