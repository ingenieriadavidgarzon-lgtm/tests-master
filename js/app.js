(function(){
const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LET = 'ABCDEF';
const fmt = (n, d=2) => n.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:d});
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem(k); } catch(e){} }
};
const ICON_BACK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 4 6.5 10l6 6"/></svg>';

let V = {name:'home'};      // vista actual
let P = null;               // sesión de práctica
let X = null;               // sesión de examen
let timerId = null;

const LEAVES = [];
SUBJECTS.forEach(t => t.parts ? t.parts.forEach(p => { p.parent = t; LEAVES.push(p); }) : LEAVES.push(t));
const subj = id => LEAVES.find(s => s.id === id);
const group = id => SUBJECTS.find(s => s.id === id && s.parts);
const penLabel = v => v === 1/2 ? '−1/2' : v === 1/3 ? '−1/3' : v === 1/4 ? '−1/4' : 'Sin penalizar';
const sumT = ts => ts.reduce((a,b) => ({total:a.total+b.total, mast:a.mast+b.mast, fail:a.fail+b.fail, unseen:a.unseen+b.unseen}));
const blockOf = (s, q) => s.blocks.find(b => b.n === q.b) || {n:q.b, name:'Bloque '+q.b};
const statKey = s => 'tests.stats.' + s.id;
const getStats = s => store.get(statKey(s), {});
function record(s, qi, ok){
  const st = getStats(s); const r = st[qi] || {n:0, ok:0, last:0};
  r.n++; if (ok) r.ok++; r.last = ok ? 1 : 0; st[qi] = r; store.set(statKey(s), st);
}
function tally(s, idxs){
  const st = getStats(s); let mast=0, fail=0, unseen=0;
  idxs.forEach(i => { const r = st[i]; if (!r) unseen++; else if (r.last) mast++; else fail++; });
  return {total: idxs.length, mast, fail, unseen};
}
const allIdx = s => s.questions.map((_, i) => i);
function shuffle(a){ a = a.slice(); for (let i=a.length-1; i>0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function optOrder(q){
  const idx = q.o.map((_, i) => i);
  if (q.o.length < 3 || q.o.some(o => /\b[AB] y [BC]\b|^ambas\b/i.test(o))) return idx;
  const fixLast = /^(todas|ninguna)\b/i.test(q.o[q.o.length-1]);
  return fixLast ? shuffle(idx.slice(0,-1)).concat(idx.length-1) : shuffle(idx);
}

function go(v){ V = v; render(); window.scrollTo(0,0); }
function top(title, back, side=''){
  return `<div class="top">${back ? `<button class="back" data-act="${back}" aria-label="Volver">${ICON_BACK}</button>` : ''}<h1>${esc(title)}</h1>${side}</div>`;
}
function bar(t){
  const w = x => t.total ? (100*x/t.total) : 0;
  return `<div class="bar" aria-hidden="true"><i class="g" style="width:${w(t.mast)}%"></i><i class="r" style="width:${w(t.fail)}%"></i></div>`;
}

/* ---------- vistas ---------- */
function vHome(){
  const rows = SUBJECTS.map(s => {
    const t = sumT((s.parts || [s]).map(p => tally(p, allIdx(p))));
    return `<button class="subj" data-act="open" data-id="${s.id}">
      <span class="code">${esc(s.short)}</span>
      <span class="name">${esc(s.name)}</span>
      <span class="meta">${s.parts ? s.parts.length + ' temas · ' : ''}${t.total} preguntas</span>
      <span class="meter">${bar(t)}<span>${Math.round(100*t.mast/t.total)} % dominadas</span></span>
    </button>`;
  }).join('');
  return `<header class="hero"><p class="eyebrow">Máster en Ingeniería Industrial</p><h2 class="big">Tests del Máster</h2>
    <p class="lede">Elige una asignatura para practicar sus preguntas o hacer un examen de prueba.</p></header>
    <div class="stack">${rows}</div>
    <p class="soon">Más asignaturas en camino. Cada una tendrá su propio banco de preguntas.</p>`;
}

function vParts(){
  const g = group(V.tid);
  const rows = g.parts.map(p => {
    const t = tally(p, allIdx(p));
    return `<button class="subj" data-act="open" data-id="${p.id}">
      <span class="code">${esc(p.short)}</span>
      <span class="name">${esc(p.name)}</span>
      <span class="meta">${p.questions.length} preguntas${p.presets ? ' · incluye examen real' : ''}</span>
      <span class="meter">${bar(t)}<span>${Math.round(100*t.mast/t.total)} % dominadas</span></span>
    </button>`;
  }).join('');
  return top(g.name, 'home') + `
    <p class="eyebrow">${esc(g.short)} · ${g.parts.length} temas</p>
    <h2 class="big">${esc(g.name)}</h2>
    <p class="lede">Elige el tema. Cada uno tiene su banco de preguntas, su modo práctica y su modo examen.</p>
    <div class="stack">${rows}</div>`;
}

function vSubject(){
  const s = subj(V.sid); const st = getStats(s);
  const t = tally(s, allIdx(s));
  const nd = s.questions.filter(q => q.d).length;
  return top(s.name, s.parent ? 'parts' : 'home') + `
    <p class="eyebrow">${s.parent ? esc(s.parent.name) + ' · ' : esc(s.short) + ' · '}${s.questions.length} preguntas</p>
    <h2 class="big">${esc(s.name)}</h2>
    <div class="modes">
      <button class="mode primary" data-act="practiceSetup"><b>Modo práctica</b><span>Corriges cada pregunta al momento. Si fallas, te explica por qué.</span></button>
      <button class="mode" data-act="examSetup"><b>Modo examen</b><span>${s.examSize} preguntas al azar, sin ver respuestas hasta entregar. Nota sobre 10.</span></button>
    </div>
    <h3>Tu progreso</h3>
    <div class="kpis"><div class="g"><b>${t.mast}</b><span>Dominadas</span></div><div class="r"><b>${t.fail}</b><span>Falladas</span></div><div><b>${t.unseen}</b><span>Sin ver</span></div></div>
    <div class="meter" style="margin-top:10px">${bar(t)}<span>${Math.round(100*t.mast/t.total)} % dominadas</span></div>
    <h3>Para estudiar</h3>
    ${s.formulas ? `<details class="panel"><summary>Fórmulas clave</summary><div class="in"><dl class="formulas">${s.formulas.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join('')}</dl></div></details>` : ''}
    ${s.traps ? `<details class="panel"><summary>${esc(s.trapsTitle || 'Trampas que se repiten')}</summary><div class="in"><ul>${s.traps.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details>` : ''}
    <details class="panel"><summary>Sobre las respuestas</summary><div class="in"><p style="margin-top:0">${esc(s.source)}</p>${nd?`<p class="unsure" style="margin-bottom:0">${nd} preguntas llevan la marca «Sin confirmar»: hay dos opciones defendibles. Pregúntalas en clase antes de fiarte.</p>`:''}</div></details>
    <p class="reset">${V.confirmReset ? `¿Borrar todo tu progreso en ${esc(s.short)}? <button data-act="doReset">Sí, borrar</button> · <button data-act="cancelReset" style="color:var(--muted)">Cancelar</button>` : `<button data-act="askReset">Borrar mi progreso</button>`}</p>`;
}

function practiceScopes(s){
  const st = getStats(s); const all = allIdx(s);
  const list = [
    {id:'all', label:'Todo el banco', sub: s.parent ? 'Todas las preguntas del tema' : 'Todas las preguntas de la asignatura', idx: all},
    {id:'fail', label:'Solo las que he fallado', sub:'Tu última respuesta fue incorrecta', idx: all.filter(i => st[i] && !st[i].last)},
    {id:'new', label:'Las que no he visto', sub:'Todavía sin responder', idx: all.filter(i => !st[i])},
    {id:'unsure', label:'Sin confirmar', sub:'Respuesta dudosa, para repasarlas aparte', idx: all.filter(i => s.questions[i].d)}
  ];
  return list.filter(x => x.id !== 'unsure' || x.idx.length);
}
function vPracticeSetup(){
  const s = subj(V.sid); const scopes = practiceScopes(s);
  if (!V.scope || !scopes.find(x => x.id === V.scope && x.idx.length)) V.scope = 'all';
  const cur = scopes.find(x => x.id === V.scope);
  const btn = x => `<button class="pick" data-act="scope" data-id="${x.id}" aria-pressed="${x.id===V.scope}" ${x.idx.length?'':'disabled'}><span class="l"><b>${esc(x.label)}</b><small>${esc(x.sub)}</small></span><span class="n">${x.idx.length}</span></button>`;
  return top('Modo práctica', 'open') + `
    <p class="lede">Elige qué quieres practicar. Corriges cada pregunta al momento y, si fallas, ves la explicación.</p>
    <div class="stack">${scopes.map(btn).join('')}</div>
    <label class="check"><input type="checkbox" id="shuf" data-act="shuf" ${V.noShuffle?'':'checked'}> Preguntas en orden aleatorio</label>
    <div class="spacer"></div>
    <div class="dock"><button class="btn primary" data-act="startPractice">Empezar · ${cur.idx.length} ${cur.idx.length===1?'pregunta':'preguntas'}</button></div>`;
}

function explain(q){
  return `<div class="why">
    ${q.k ? `<p class="whylabel">Cálculo</p><div class="calc">${q.k.map(l=>`<div>${esc(l)}</div>`).join('')}</div>` : ''}
    <p>${esc(q.e)}</p>
    ${q.d ? `<p class="unsure">Respuesta sin confirmar: hay otra opción defendible. Contrástala con el profesor o los apuntes.</p>` : ''}
  </div>`;
}
function qhead(s, q, qi){
  return `<div class="qmeta"><span class="ref">nº ${qi+1}</span>${q.d?'<span class="flag">Sin confirmar</span>':''}</div>
    <p class="qtext">${esc(q.q)}</p>`;
}

function vPractice(){
  const s = subj(P.sid);
  if (P.i >= P.list.length) return vPracticeEnd();
  const qi = P.list[P.i]; const q = s.questions[qi]; const ord = P.orders[P.i]; const a = P.answer;
  const opts = ord.map((oi, pos) => {
    let cls = '';
    if (a !== null){ if (oi === q.c) cls = 'right'; else if (oi === a) cls = 'wrong'; else cls = 'dim'; }
    return `<button class="opt ${cls}" data-act="pAnswer" data-o="${oi}" ${a!==null?'disabled':''}><span class="lt">${LET[pos]}</span><span class="tx">${esc(q.o[oi])}</span></button>`;
  }).join('');
  let fb = '';
  if (a !== null){
    const ok = a === q.c; const posC = ord.indexOf(q.c);
    fb = ok
      ? `<div class="verdict ok"><p class="vh">Correcto</p>${P.showWhy ? explain(q) : `<button class="linkbtn" data-act="showWhy">Ver la explicación</button>`}</div>`
      : `<div class="verdict ko"><p class="vh">No es esa</p>
          <p class="yours">La correcta es la <b>${LET[posC]}</b>: <b>${esc(q.o[q.c])}</b></p>
          ${explain(q)}</div>`;
  }
  const last = P.i === P.list.length - 1;
  return top('Práctica', 'leavePractice', `<span class="side"><span style="color:var(--ok)">✓ ${P.ok}</span> &nbsp;<span style="color:var(--ko)">✗ ${P.ko}</span></span>`) + `
    <div class="progress"><i style="width:${100*(P.i + (a!==null?1:0))/P.list.length}%"></i></div>
    <p class="eyebrow" style="margin-bottom:8px">Pregunta ${P.i+1} de ${P.list.length}</p>
    ${qhead(s, q, qi)}
    <div class="opts">${opts}</div>
    ${fb}
    <div class="spacer"></div>
    <div class="dock">${a===null
      ? `<button class="btn" data-act="pSkip">Saltar</button>`
      : `<button class="btn primary" data-act="pNext">${last ? 'Ver resultado' : 'Siguiente'}</button>`}</div>`;
}
function vPracticeEnd(){
  const s = subj(P.sid); const n = P.ok + P.ko;
  const pct = n ? Math.round(100*P.ok/n) : 0;
  const fails = P.failed.map(qi => `<li>${esc(s.questions[qi].q)}</li>`).join('');
  return top('Práctica terminada', 'open') + `
    <p class="eyebrow">Resultado de la ronda</p>
    <div class="score"><span class="num">${P.ok}</span><span class="of">/ ${n} · ${pct} %</span></div>
    <div class="kpis"><div class="g"><b>${P.ok}</b><span>Aciertos</span></div><div class="r"><b>${P.ko}</b><span>Fallos</span></div><div><b>${P.list.length - n}</b><span>Saltadas</span></div></div>
    ${P.failed.length ? `<h3>Has fallado</h3><details class="panel" open><summary>${P.failed.length} ${P.failed.length===1?'pregunta':'preguntas'}</summary><div class="in"><ul>${fails}</ul></div></details>` : `<p class="lede" style="margin-top:18px">Sin fallos en esta ronda.</p>`}
    <div class="spacer"></div>
    <div class="dock" style="flex-wrap:wrap">
      ${P.failed.length ? `<button class="btn primary" data-act="retryFails">Repetir las falladas</button>` : ''}
      <button class="btn ${P.failed.length?'':'primary'}" data-act="practiceSetup">Otra ronda</button>
    </div>`;
}

function vExamSetup(){
  const s = subj(V.sid); const N = s.questions.length;
  const cfg = V.cfg;
  const sizes = [10, s.examSize, 30, N].filter((v,i,a) => v <= N && a.indexOf(v) === i).sort((a,b)=>a-b);
  const seg = (key, vals, lab) => `<div class="seg">${vals.map(v => `<button data-act="cfg" data-k="${key}" data-v="${v}" aria-pressed="${cfg[key]===v}">${lab(v)}</button>`).join('')}</div>`;
  const per = 10 / cfg.n;
  return top('Modo examen', 'open') + `
    <p class="lede">Preguntas al azar de todo el banco. No ves si aciertas hasta entregar; entonces tienes la nota y la corrección con explicaciones.</p>
    ${s.presets ? `<h3 style="margin-top:6px">Examen real</h3><div class="stack">${s.presets.map(p => `<button class="pick" data-act="startPreset" data-id="${p.id}"><span class="l"><b>${esc(p.name)}</b><small>${p.idx.length} preguntas en el orden del examen · ${p.t} min · fallo ${penLabel(p.pen)}</small></span><span class="n">Empezar</span></button>`).join('')}</div><h3>O un examen al azar</h3>` : ''}
    <h3${s.presets ? '' : ' style="margin-top:6px"'}>Número de preguntas</h3>
    ${seg('n', sizes, v => v===N ? `Todas (${v})` : v)}
    <h3>Penalización por fallo</h3>
    ${seg('pen', [0, 1/2, 1/3, 1/4], penLabel)}
    <p class="hint">Cada acierto vale ${fmt(per,3)} puntos${cfg.pen ? `; cada fallo resta ${fmt(per*cfg.pen,3)}. En blanco no resta` : '. Los fallos no restan'}.</p>
    <h3>Tiempo</h3>
    ${seg('t', [0, 20, 30, 45], v => v===0 ? 'Sin límite' : v+' min')}
    <div class="spacer"></div>
    <div class="dock"><button class="btn primary" data-act="startExam">Empezar examen</button></div>`;
}

function timeLeft(){ return X.limit ? Math.max(0, X.limit - Math.floor((Date.now()-X.start)/1000)) : Math.floor((Date.now()-X.start)/1000); }
const mmss = sec => `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;
function vExam(){
  const s = subj(X.sid); const qi = X.list[X.i]; const q = s.questions[qi]; const ord = X.orders[X.i]; const a = X.ans[X.i];
  const answered = X.ans.filter(v => v !== null).length;
  const tl = timeLeft();
  const opts = ord.map((oi, pos) => `<button class="opt ${a===oi?'sel':''}" data-act="xAnswer" data-o="${oi}"><span class="lt">${LET[pos]}</span><span class="tx">${esc(q.o[oi])}</span></button>`).join('');
  let sheet = '';
  if (X.panel === 'index'){
    sheet = `<div class="sheet"><p><b>Ir a la pregunta</b> · ${answered} de ${X.list.length} respondidas</p><div class="grid">${X.list.map((_, i) => `<button class="${X.ans[i]!==null?'done':''} ${i===X.i?'cur':''}" data-act="xGo" data-i="${i}">${i+1}</button>`).join('')}</div></div>`;
  } else if (X.panel === 'submit'){
    const blank = X.list.length - answered;
    sheet = `<div class="sheet"><p>${blank ? `Te ${blank===1?'queda <b>1 pregunta</b>':'quedan <b>'+blank+' preguntas</b>'} sin responder. Cuentan como en blanco.` : 'Has respondido todas las preguntas.'} ¿Entregar el examen?</p>
      <div class="row"><button class="btn" data-act="xClose">Seguir</button><button class="btn primary" data-act="xFinish">Entregar</button></div></div>`;
  } else if (X.panel === 'leave'){
    sheet = `<div class="sheet"><p>Si sales ahora se pierde este examen y no cuenta para tu progreso.</p>
      <div class="row"><button class="btn" data-act="xClose">Seguir con el examen</button><button class="btn danger" data-act="xAbandon">Salir</button></div></div>`;
  }
  return top('Examen', 'xLeave', `<span class="side timer ${X.limit && tl < 120 ? 'low':''}" id="timer">${mmss(tl)}</span>`) + `
    <div class="progress"><i style="width:${100*answered/X.list.length}%"></i></div>
    <p class="eyebrow" style="margin-bottom:8px">Pregunta ${X.i+1} de ${X.list.length} · ${answered} respondidas</p>
    ${qhead(s, q, qi)}
    <div class="opts">${opts}</div>
    ${a!==null ? `<p class="hint">Toca otra vez la opción marcada para dejarla en blanco.</p>` : ''}
    ${sheet}
    <div class="spacer"></div>
    <div class="dock">
      <button class="btn sm" data-act="xPrev" ${X.i===0?'disabled':''} aria-label="Anterior">←</button>
      <button class="btn" data-act="xIndex">Índice</button>
      ${X.i < X.list.length-1 ? `<button class="btn primary" data-act="xNext">Siguiente →</button>` : `<button class="btn primary" data-act="xSubmit">Entregar</button>`}
    </div>`;
}

function vResults(){
  const s = subj(X.sid); const R = X.result;
  const filt = V.rf || 'all';
  const items = X.list.map((qi, i) => ({qi, i, a: X.ans[i], st: X.ans[i]===null ? 'bl' : (X.ans[i]===s.questions[qi].c ? 'ok' : 'ko')}))
    .filter(it => filt==='all' || it.st===filt);
  const rev = items.map(it => {
    const q = s.questions[it.qi]; const ord = X.orders[it.i];
    const opts = ord.map((oi, pos) => {
      let cls = oi===q.c ? 'right' : (oi===it.a ? 'wrong' : 'dim');
      return `<div class="opt ${cls}"><span class="lt">${LET[pos]}</span><span class="tx">${esc(q.o[oi])}</span></div>`;
    }).join('');
    const sym = {ok:'✓', ko:'✗', bl:'–'}[it.st];
    return `<details class="rev"${it.st==='ko'&&filt==='ko'?' open':''}><summary><span class="mark ${it.st}">${sym}</span><span class="st">${esc(q.q)}<small>Pregunta ${it.i+1}${it.st==='bl'?' · en blanco':''}</small></span></summary>
      <div class="body"><div class="opts">${opts}</div>${explain(q)}</div></details>`;
  }).join('') || `<p class="empty">Nada en este filtro.</p>`;
  const chip = (k, l) => `<button class="chip" data-act="rf" data-v="${k}" aria-pressed="${filt===k}">${l}</button>`;
  const pass = R.grade >= 5;
  return top('Resultado del examen', 'open') + `
    <p class="eyebrow">${esc(s.short)} · ${X.list.length} preguntas${X.cfg.pen ? ' · fallo resta ' + penLabel(X.cfg.pen).slice(1) : ''}${R.timeout ? ' · tiempo agotado' : ''}</p>
    <div class="score"><span class="num">${fmt(R.grade)}</span><span class="of">/ 10</span><span class="pill ${pass?'ok':'ko'}">${pass?'Aprobado':'Suspenso'}</span></div>
    <div class="kpis four"><div class="g"><b>${R.ok}</b><span>Aciertos</span></div><div class="r"><b>${R.ko}</b><span>Fallos</span></div><div><b>${R.bl}</b><span>En blanco</span></div><div><b>${mmss(R.secs)}</b><span>Tiempo</span></div></div>
    <h3>Corrección</h3>
    <div class="chips">${chip('all','Todas')}${chip('ko',`Falladas (${R.ko})`)}${chip('bl',`En blanco (${R.bl})`)}${chip('ok',`Acertadas (${R.ok})`)}</div>
    <div class="stack">${rev}</div>
    <div class="spacer"></div>
    <div class="dock" style="flex-wrap:wrap">
      ${R.ko + R.bl ? `<button class="btn primary" data-act="practiceExamFails">Practicar las ${R.ko + R.bl} que no acerté</button>` : ''}
      <button class="btn ${R.ko+R.bl?'':'primary'}" data-act="examSetup">Nuevo examen</button>
    </div>`;
}

function render(){
  clearInterval(timerId); timerId = null;
  let h = '';
  if (V.name === 'home') h = vHome();
  else if (V.name === 'parts') h = vParts();
  else if (V.name === 'subject') h = vSubject();
  else if (V.name === 'practiceSetup') h = vPracticeSetup();
  else if (V.name === 'practice') h = vPractice();
  else if (V.name === 'examSetup') h = vExamSetup();
  else if (V.name === 'exam'){ h = vExam(); timerId = setInterval(tick, 1000); }
  else if (V.name === 'results') h = vResults();
  app.innerHTML = h;
}
function tick(){
  if (!X || V.name !== 'exam') return;
  const tl = timeLeft(); const el = document.getElementById('timer');
  if (el){ el.textContent = mmss(tl); el.classList.toggle('low', !!X.limit && tl < 120); }
  if (X.limit && tl <= 0) finishExam(true);
}

/* ---------- acciones ---------- */
function startPractice(sid, idxs, doShuffle=true){
  const s = subj(sid); const list = doShuffle ? shuffle(idxs) : idxs.slice();
  P = {sid, list, orders: list.map(qi => optOrder(s.questions[qi])), i:0, answer:null, ok:0, ko:0, failed:[], showWhy:false};
  go({name:'practice', sid});
}
function finishExam(timeout=false){
  const s = subj(X.sid); let ok=0, ko=0, bl=0;
  X.list.forEach((qi, i) => {
    const a = X.ans[i];
    if (a === null){ bl++; return; }
    const good = a === s.questions[qi].c; good ? ok++ : ko++;
    record(s, qi, good);
  });
  const per = 10 / X.list.length;
  const grade = Math.max(0, ok*per - ko*per*X.cfg.pen);
  X.result = {ok, ko, bl, grade: Math.round(grade*100)/100, secs: Math.floor((Date.now()-X.start)/1000), timeout};
  if (X.limit) X.result.secs = Math.min(X.result.secs, X.limit);
  X.panel = null;
  go({name:'results', sid: X.sid, rf: 'all'});
}

const A = {
  home(){ go({name:'home'}); },
  open(d){ const id = d.id || V.sid; if (group(id)) go({name:'parts', tid:id}); else go({name:'subject', sid:id}); },
  parts(){ const s = subj(V.sid); go({name:'parts', tid: V.tid || (s && s.parent && s.parent.id)}); },
  askReset(){ V.confirmReset = true; render(); },
  cancelReset(){ V.confirmReset = false; render(); },
  doReset(){ store.del(statKey(subj(V.sid))); V.confirmReset = false; render(); },
  practiceSetup(){ go({name:'practiceSetup', sid: V.sid || (P && P.sid) || (X && X.sid), scope: V.scope, noShuffle: V.noShuffle}); },
  scope(d){ V.scope = d.id; render(); },
  shuf(d, el){ V.noShuffle = !el.checked; },
  startPractice(){
    const s = subj(V.sid); const sc = practiceScopes(s).find(x => x.id === V.scope);
    if (sc && sc.idx.length) startPractice(s.id, sc.idx, !V.noShuffle);
  },
  pAnswer(d){
    if (P.answer !== null) return;
    const s = subj(P.sid); const qi = P.list[P.i]; const o = +d.o; const ok = o === s.questions[qi].c;
    P.answer = o; P.showWhy = false; ok ? P.ok++ : (P.ko++, P.failed.push(qi));
    record(s, qi, ok); render();
    if (!ok){ const v = app.querySelector('.verdict'); if (v) v.scrollIntoView({block:'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
  },
  showWhy(){ P.showWhy = true; render(); },
  pNext(){ P.i++; P.answer = null; P.showWhy = false; render(); window.scrollTo(0,0); },
  pSkip(){ P.i++; P.answer = null; render(); window.scrollTo(0,0); },
  leavePractice(){ go({name: P.i >= P.list.length ? 'subject' : 'practiceSetup', sid: P.sid}); },
  retryFails(){ startPractice(P.sid, P.failed, true); },
  examSetup(){
    const sid = V.sid || (X && X.sid); const s = subj(sid);
    const cfg = Object.assign({n: s.examSize, pen: s.examPen || 0, t: s.examTime || 0}, store.get('tests.exam.'+sid, {}));
    if (cfg.n > s.questions.length) cfg.n = s.examSize;
    go({name:'examSetup', sid, cfg});
  },
  cfg(d){ V.cfg[d.k] = +d.v; store.set('tests.exam.'+V.sid, V.cfg); render(); },
  startExam(){
    const s = subj(V.sid); const cfg = Object.assign({}, V.cfg);
    const list = shuffle(allIdx(s)).slice(0, cfg.n);
    X = {sid: s.id, cfg, list, orders: list.map(qi => optOrder(s.questions[qi])), ans: list.map(() => null), i:0, start: Date.now(), limit: cfg.t*60, panel:null};
    go({name:'exam', sid: s.id});
  },
  startPreset(d){
    const s = subj(V.sid); const p = s.presets.find(x => x.id === d.id); const cfg = {n: p.idx.length, pen: p.pen, t: p.t};
    const list = p.idx.slice();
    X = {sid: s.id, cfg, list, orders: list.map(qi => optOrder(s.questions[qi])), ans: list.map(() => null), i:0, start: Date.now(), limit: cfg.t*60, panel:null};
    go({name:'exam', sid: s.id});
  },
  xAnswer(d){ const o = +d.o; X.ans[X.i] = X.ans[X.i] === o ? null : o; render(); },
  xPrev(){ if (X.i > 0){ X.i--; X.panel = null; render(); window.scrollTo(0,0); } },
  xNext(){ if (X.i < X.list.length-1){ X.i++; X.panel = null; render(); window.scrollTo(0,0); } },
  xIndex(){ X.panel = X.panel === 'index' ? null : 'index'; render(); },
  xGo(d){ X.i = +d.i; X.panel = null; render(); window.scrollTo(0,0); },
  xSubmit(){ X.panel = 'submit'; render(); },
  xLeave(){ X.panel = 'leave'; render(); },
  xClose(){ X.panel = null; render(); },
  xFinish(){ finishExam(false); },
  xAbandon(){ const sid = X.sid; X = null; go({name:'subject', sid}); },
  rf(d){ V.rf = d.v; render(); },
  practiceExamFails(){
    const s = subj(X.sid); const idx = X.list.filter((qi, i) => X.ans[i] !== s.questions[qi].c);
    startPractice(X.sid, idx, true);
  }
};

app.addEventListener('click', e => {
  const t = e.target.closest('[data-act]'); if (!t || t.disabled) return;
  if (t.tagName === 'INPUT') return;
  const fn = A[t.dataset.act]; if (fn) fn(t.dataset, t);
});
app.addEventListener('change', e => {
  const t = e.target.closest('[data-act]'); if (t && t.tagName === 'INPUT'){ const fn = A[t.dataset.act]; if (fn) fn(t.dataset, t); }
});
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase(); const pos = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
  if (V.name === 'practice' && P && P.i < P.list.length){
    if (P.answer === null && pos >= 0 && P.orders[P.i][pos] !== undefined) A.pAnswer({o: P.orders[P.i][pos]});
    else if (P.answer !== null && (k === 'enter' || k === ' ')){ e.preventDefault(); A.pNext(); }
  } else if (V.name === 'exam' && X && !X.panel){
    if (pos >= 0 && X.orders[X.i][pos] !== undefined) A.xAnswer({o: X.orders[X.i][pos]});
    else if (k === 'arrowright') A.xNext(); else if (k === 'arrowleft') A.xPrev();
  }
});

render();
})();
