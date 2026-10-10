// Pantallas de acceso, perfil y ranking, y los añadidos en las pantallas que ya existían.
// Con cuentas configuradas (js/config.js), sin sesión solo se ve la pantalla de acceso.
// Sin configurar, no añade nada: la app queda como siempre.
(function(){
const C = window.Cloud;
const on = !!(C && C.enabled);
const T = () => window.TestsApp;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num = (n, d) => n.toLocaleString('es-ES', {minimumFractionDigits: d, maximumFractionDigits: d});
const pct = n => n.toLocaleString('es-ES', {maximumFractionDigits: 1}) + ' %';
const hhmm = t => new Date(t).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});
const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);
const leaf = id => C.LEAVES.find(s => s.id === id);
const root = id => C.ROOTS.find(r => r.id === id);
const getJ = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } };
const setJ = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const kidsOf = n => n.parts || n.tests || null;
const leavesOf = n => kidsOf(n) ? kidsOf(n).flatMap(leavesOf) : [n];

const boardName = a => (root(a) || {}).name || a;
const penText = s => (s.examPen || 0) ? 'penalización ' + T().penLabel(s.examPen) : 'sin penalización';
// Penalizaciones por defecto de una asignatura, por tema: «CLIM sin penalizar; PCI −1/2»
function rootPenText(r){
  const lab = p => p ? T().penLabel(p) : 'sin penalizar';
  if (!r.parts) return penText(leavesOf(r)[0]);
  return r.parts.map(k => k.short + ' ' + [...new Set(leavesOf(k).map(s => s.examPen || 0))].map(lab).join(' / ')).join('; ');
}
const SEEN = () => C.key('seen'), LASTB = () => C.key('rboard');
const defaultBoard = () => { const b = getJ(LASTB(), null); return root(b) ? b : (C.ROOTS[0] || {}).id; };

/* ---------- acceso obligatorio ---------- */
// Devuelve la vista a la que hay que ir si la actual no está permitida (o null si lo está)
function gate(V){
  if (!on) return null;
  if (C.recovery) return V.name === 'recover' ? null : {name: 'recover'};
  if (C.user){
    if (C.needsProfile) return V.name === 'account' && V.mode === 'complete' ? null : {name: 'account', mode: 'complete'};
    return V.name === 'account' || V.name === 'recover' ? {name: 'home'} : null;
  }
  if (V.name === 'account' && V.mode !== 'complete') return null;
  return {name: 'account', mode: 'login', msg: C.ended || C.linkError || ''};
}

/* ---------- añadidos en pantallas existentes ---------- */
let notes = [], notesAt = 0;
function homeBar(){
  if (!on) return '';
  const u = C.user || {};
  const who = u.name ? `<span class="av">${esc(u.name[0].toUpperCase())}</span>${esc(u.name)}` : 'Mi cuenta';
  return `<div class="homebar"><button class="hb" data-act="ranking">Ranking</button><button class="hb" data-act="account">${who}</button></div>`;
}
const notesHtml = () => notes.slice(-3).map(n =>
  `<button class="note" data-act="ranking" data-id="${esc(n.board)}"><b>${esc(n.name)}</b> te ha pasado en ${esc(boardName(n.board))}.</button>`).join('');
function homeNotes(){ return on ? `<div class="notes" id="cloud-notes">${notesHtml()}</div>` : ''; }
function subjectLink(s){
  if (!on) return '';
  const a = C.rootOf(s.id);
  return `<button class="pick rankpick" data-act="ranking" data-id="${esc(a)}"><span class="l"><b>Ranking</b><small>${esc(boardName(a))}: tu posición frente a la clase</small></span><span class="n">Ver</span></button>`;
}
function examHint(s, cfg){
  if (!on) return '';
  return C.counts(s, cfg.n, cfg.pen, null)
    ? `<p class="rankhint yes">Este examen cuenta para el ranking de ${esc(boardName(C.rootOf(s.id)))}.</p>`
    : `<p class="rankhint no">Este examen no cuenta para el ranking: hacen falta ${C.MIN_N} preguntas o más y ${penText(s)}.</p>`;
}
const presetHint = () => on ? ' · cuenta para el ranking' : '';
const resultsSlot = () => on ? `<div class="cloudres" id="cloud-res"></div>` : '';

function statusLine(st){
  if (st.st === 'ok') return `<p class="st ok">Resultado guardado en tu cuenta.</p>`;
  if (st.st === 'rejected') return `<p class="st ko">${esc(st.msg || 'El servidor no ha aceptado el resultado.')}</p>`;
  if (!C.online) return `<p class="st warn">Sin conexión: tu resultado se subirá luego.</p>`;
  return `<p class="st">Guardando tu resultado…</p>`;
}
function paintResults(){
  const el = document.getElementById('cloud-res'); const X = T().X;
  if (!el || !X || !X.result || !X.cloudId) return;
  const s = leaf(X.sid), R = X.result, a = C.rootOf(s.id);
  const lines = [];
  if (C.counts(s, X.list.length, X.cfg.pen, X.preset)){
    const data = C.cachedRanking();
    if (data){
      const w = C.wouldRank(data, a, R.grade, X.cloudId);
      lines.push(w.missing
        ? `<p class="pos">Te ${w.missing === 1 ? 'falta 1 examen' : 'faltan ' + w.missing + ' exámenes'} para entrar en el ranking de ${esc(boardName(a))}.</p>`
        : `<p class="pos">Con esta nota entrarías ${w.pos}.º en ${esc(boardName(a))}.</p>`);
    }
  } else {
    lines.push(`<p class="st">Este examen no cuenta para el ranking: hacen falta ${C.MIN_N} preguntas o más y ${penText(s)}.</p>`);
  }
  const st = C.examStatus(X.cloudId);
  if (st) lines.push(statusLine(st));
  el.innerHTML = lines.join('');
}
function syncText(){
  const p = C.pending();
  if (!p.answers && !p.exams) return C.lastError ? esc(C.lastError) : 'Todo tu progreso está sincronizado con tu cuenta.';
  const parts = [];
  if (p.answers) parts.push(plural(p.answers, 'respuesta', 'respuestas'));
  if (p.exams) parts.push(plural(p.exams, 'examen', 'exámenes'));
  return 'Pendiente de subir: ' + parts.join(' y ') + '.' + (C.online ? '' : ' Sin conexión: se subirá al volver la red.');
}

/* ---------- pantallas nuevas ---------- */
const field = (name, label, type, ac, hint, value) =>
  `<label class="field"><span>${label}</span><input name="${name}" type="${type}" autocomplete="${ac}"${type === 'email' ? ' inputmode="email" autocapitalize="none" spellcheck="false"' : ''}${value != null ? ` value="${esc(value)}"` : ''}>${hint ? `<small>${hint}</small>` : ''}</label>`;
const netMsg = () => !navigator.onLine && !C.user ? 'Necesitas conexión para iniciar sesión la primera vez.' : '';
const hero = (lede, title) => `<header class="hero"><p class="eyebrow">${title ? 'Tests del Máster' : 'Máster en Ingeniería Industrial'}</p><h2 class="big">${title || 'Tests del Máster'}</h2><p class="lede">${lede}</p></header>`;

function vAccount(V){
  const m = V.mode || 'login';
  if (m === 'complete') return hero('Tu cuenta existe, pero falta el nombre visible y el código de grupo.') + `
    <form class="form" data-form="complete" novalidate>
      ${field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres. Es lo único que verán tus compañeros.')}
      ${field('code', 'Código de grupo', 'text', 'off', 'Te lo da quien organiza el grupo.')}
      <p class="formerr" role="alert"></p>
      <button class="btn primary" type="submit">Guardar</button>
    </form>
    <p class="reset"><button data-act="logout" style="color:var(--muted)">Cerrar sesión</button></p>`;
  const netLine = `<p class="formerr" id="net-msg" role="alert" style="margin-bottom:14px">${esc(netMsg())}</p>`;
  if (m === 'forgot') return hero('Escribe el email de tu cuenta y te enviaremos un enlace para poner una contraseña nueva.') + netLine + `
    <form class="form" data-form="forgot" novalidate>
      ${field('email', 'Email', 'email', 'email', '', V.email || '')}
      <p class="formerr" role="alert"></p><p class="formok" role="status"></p>
      <button class="btn primary" type="submit">Enviar el enlace</button>
    </form>
    <p class="reset"><button data-act="amode" data-id="login" style="color:var(--accent)">Volver a entrar</button></p>`;
  const signup = m === 'signup';
  return hero(signup ? 'Crea tu cuenta con el código de grupo de la clase.' : 'Entra con tu cuenta para practicar, hacer exámenes y ver el ranking.') + `
    ${V.msg ? `<p class="formerr" role="alert" style="margin-bottom:14px">${esc(V.msg)}</p>` : ''}${netLine}
    <div class="seg" style="margin-bottom:18px"><button data-act="amode" data-id="login" aria-pressed="${!signup}">Entrar</button><button data-act="amode" data-id="signup" aria-pressed="${signup}">Crear cuenta</button></div>
    <form class="form" data-form="${signup ? 'signup' : 'login'}" novalidate>
      ${field('email', 'Email', 'email', 'email', signup ? 'No se muestra a nadie.' : '', V.email || '')}
      ${field('password', 'Contraseña', 'password', signup ? 'new-password' : 'current-password', signup ? 'Al menos 6 caracteres.' : '')}
      ${signup ? field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres. Es lo único que verán tus compañeros en el ranking.') : ''}
      ${signup ? field('code', 'Código de grupo', 'text', 'off', 'Te lo da quien organiza el grupo.') : ''}
      <p class="formerr" role="alert"></p>
      <p class="formok" role="status"></p>
      <button class="btn primary" type="submit">${signup ? 'Crear cuenta' : 'Entrar'}</button>
    </form>
    ${signup ? '' : `<p class="reset"><button data-act="amode" data-id="forgot" style="color:var(--accent)">¿Has olvidado tu contraseña?</button></p>`}`;
}

function vRecover(){
  const u = C.user || {};
  return hero(`Escribe la contraseña nueva para tu cuenta${u.email ? ' ' + esc(u.email) : ''}.`, 'Nueva contraseña') + `
    <form class="form" data-form="recover" novalidate>
      ${field('p1', 'Nueva contraseña', 'password', 'new-password', 'Al menos 6 caracteres.')}
      ${field('p2', 'Repite la contraseña', 'password', 'new-password', '')}
      <p class="formerr" role="alert"></p>
      <button class="btn primary" type="submit">Guardar y entrar</button>
    </form>`;
}

function vProfile(){
  const t = T(), u = C.user || {};
  return t.top('Tu cuenta', 'rankBack') + `
    <p class="eyebrow">Nombre visible</p>
    <h2 class="big">${esc(u.name || '—')}</h2>
    <p class="lede">${esc(u.email || '')}<br>Tu email solo lo ves tú. En el ranking solo aparece tu nombre visible.</p>
    <p class="syncline" id="cloud-sync">${syncText()}</p>
    <button class="pick rankpick" data-act="ranking"><span class="l"><b>Ranking</b><small>Una clasificación por asignatura</small></span><span class="n">Ver</span></button>
    <h3>Cambiar nombre visible</h3>
    <form class="form" data-form="rename" novalidate>
      ${field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres.', u.name || '')}
      <p class="formerr" role="alert"></p><p class="formok" role="status"></p>
      <button class="btn" type="submit">Guardar nombre</button>
    </form>
    <h3>Cambiar contraseña</h3>
    <form class="form" data-form="password" novalidate>
      ${field('p1', 'Nueva contraseña', 'password', 'new-password', 'Al menos 6 caracteres.')}
      ${field('p2', 'Repite la contraseña', 'password', 'new-password', '')}
      <p class="formerr" role="alert"></p><p class="formok" role="status"></p>
      <button class="btn" type="submit">Cambiar contraseña</button>
    </form>
    <div class="spacer"></div>
    <div class="dock"><button class="btn" data-act="logout">Cerrar sesión</button></div>`;
}

const RULES = {
  exams: a => { const r = root(a), pre = leavesOf(r).some(s => s.presets);
    return `Media de tus 5 últimos exámenes que cuentan${kidsOf(r) ? ', de cualquiera de sus tests' : ''}: ${C.MIN_N} preguntas o más con la penalización por defecto (${esc(rootPenText(r))})${pre ? ', y el examen real' : ''}. Hacen falta ${C.MIN_EXAMS} para aparecer.`; },
  mastery: a => `Porcentaje de las ${C.uniqueCount(a)} preguntas distintas de la asignatura cuya última respuesta fue correcta. Una pregunta que está en dos tests cuenta una vez.`,
  week: () => 'Preguntas respondidas desde el lunes a las 00:00 (hora de Madrid). Se reinicia cada semana.'
};
function valueHtml(tab, v){
  if (v == null) return '';
  if (tab === 'exams') return num(v, 2);
  if (tab === 'mastery') return pct(v);
  return String(v);
}
function trendHtml(prev, r){
  if (!prev) return '<span class="tr"></span>';
  const p = prev[r.id];
  if (p == null) return '<span class="tr">nuevo</span>';
  const d = p - r.pos;
  if (d > 0) return `<span class="tr up" title="Sube ${d}">▲${d}</span>`;
  if (d < 0) return `<span class="tr down" title="Baja ${-d}">▼${-d}</span>`;
  return '<span class="tr" title="Igual">=</span>';
}
function rowHtml(r, tab, prev){
  const sub = tab === 'exams' && r.value == null
    ? `${r.missing === 1 ? 'Falta 1 examen' : 'Faltan ' + r.missing + ' exámenes'}`
    : plural(r.n, 'examen', 'exámenes');
  return `<div class="rrow${r.me ? ' me' : ''}"><span class="rp">${r.value == null ? '—' : r.pos}</span>
    <span class="rn"><b>${esc(r.name)}${r.me ? ' <em>(tú)</em>' : ''}</b><small>${sub}</small></span>
    <span class="rv">${valueHtml(tab, r.value)}</span>${r.value == null ? '<span class="tr"></span>' : trendHtml(prev, r)}</div>`;
}
function vRanking(V){
  const t = T();
  let h = t.top('Ranking', 'rankBack');
  if (!root(V.board)) V.board = defaultBoard();
  const a = V.board, r = root(a);
  const chips = C.ROOTS.map(x => `<button class="chip" data-act="rboard" data-id="${esc(x.id)}" aria-pressed="${a === x.id}">${esc(x.name)}</button>`).join('');
  const tabs = [['exams', 'Exámenes'], ['mastery', 'Dominio'], ['week', 'Esta semana']]
    .map(([k, l]) => `<button data-act="rtab" data-id="${k}" aria-pressed="${V.tab === k}">${l}</button>`).join('');
  h += `<div class="chips rsel">${chips}</div>
    <p class="eyebrow">${esc(kidsOf(r) ? kidsOf(r).map(k => k.name).join(' + ') : 'Clasificación de la clase')}</p>
    <h2 class="big">${esc(r.name)}</h2>
    <div class="seg">${tabs}</div>
    <p class="hint">${RULES[V.tab](a)}</p>`;

  const data = V.data || C.cachedRanking();
  if (!data){
    return h + `<p class="empty">${V.fetching || !V.fetched ? 'Cargando el ranking…' : esc(V.err || 'No se ha podido cargar el ranking.')}</p>` +
      (V.fetched && !V.fetching ? `<p class="rnote"><button class="linkbtn" data-act="rretry">Reintentar</button></p>` : '');
  }
  const key = a + '|' + V.tab;
  const prev = (V.prev || {})[key] || null;
  const { rows, me } = C.board(data, a, V.tab);
  if (V.data){
    V.savedSeen = V.savedSeen || {};
    if (!V.savedSeen[key]){          // posiciones de esta visita, para la tendencia de la próxima
      const seen = getJ(SEEN(), {}); const pos = {}; rows.forEach(x => { pos[x.id] = x.pos; });
      seen[key] = pos; setJ(SEEN(), seen); V.savedSeen[key] = true;
    }
  }
  if (!rows.length){
    h += `<p class="empty">${V.tab === 'exams' ? `Todavía no hay nadie en esta clasificación: hacen falta ${C.MIN_EXAMS} exámenes que cuenten.`
      : V.tab === 'week' ? 'Nadie ha respondido preguntas esta semana todavía.' : 'Nadie tiene preguntas dominadas todavía.'}</p>`;
  } else {
    const top3 = rows.slice(0, 3);
    const order = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3.length === 2 ? [top3[1], top3[0]] : top3;
    h += `<div class="podium n${top3.length}">${order.map(x => `<div class="pod p${x.pos}${x.me ? ' me' : ''}">
        <span class="pp">${x.pos}</span><span class="nm">${esc(x.name)}</span>
        <span class="vl">${valueHtml(V.tab, x.value)}</span><small>${plural(x.n, 'examen', 'exámenes')}</small>${trendHtml(prev, x)}</div>`).join('')}</div>`;
    const rest = rows.slice(3, 10);
    if (rest.length) h += `<div class="rlist">${rest.map(x => rowHtml(x, V.tab, prev)).join('')}</div>`;
  }
  const meTop = me && rows.indexOf(me) > -1 && rows.indexOf(me) < 10;
  h += `<p class="rnote">${V.err ? esc(V.err) + ' Datos de las ' + hhmm(data.fetched) + '.' : 'Actualizado a las ' + hhmm(data.fetched) + '.'} <button class="linkbtn" data-act="rretry">Actualizar</button></p>`;
  if (me && !meTop) h += `<div class="spacer"></div><div class="dock rpin">${rowHtml(me, V.tab, prev)}</div>`;
  return h;
}

function view(name, V){
  if (!on) return null;
  if (name === 'account') return vAccount(V);
  if (name === 'recover') return vRecover(V);
  if (name === 'profile') return vProfile(V);
  if (name === 'ranking') return vRanking(V);
  return null;
}

/* ---------- después de cada render ---------- */
function after(V){
  if (!on) return;
  if (V.name === 'home') refreshNotes();
  if (V.name === 'results'){
    paintResults();
    const X = T().X;
    if (X && X.cloudId && !X.rankAsked && C.signedIn){
      X.rankAsked = true;
      C.sync().then(() => C.fetchRanking()).then(paintResults, () => {});
    }
  }
  if (V.name === 'ranking' && !V.fetched && !V.fetching){
    if (!C.signedIn){ V.fetched = true; V.err = 'Sin conexión.'; return; }
    V.fetching = true;
    C.fetchRanking().then(d => { V.data = d; V.err = ''; }, e => { V.err = e.message; })
      .then(() => { V.fetching = false; V.fetched = true; if (T().V === V) T().render(); });
  }
}
function refreshNotes(){
  if (!C.signedIn || !C.online || Date.now() - notesAt < 60000) return;
  notesAt = Date.now();
  C.fetchRanking().then(d => {
    C.overtakes(d).forEach(n => { if (!notes.some(x => x.name === n.name && x.board === n.board)) notes.push(n); });
    const el = document.getElementById('cloud-notes'); if (el) el.innerHTML = notesHtml();
  }, () => { notesAt = 0; });
}

/* ---------- acciones ---------- */
const backOf = V => ['ranking', 'profile'].includes(V.name) ? (V.back || {name: 'home'}) : V;
const A = {
  ranking(d){
    const t = T(), V = t.V;
    const board = root(d.id) ? d.id : defaultBoard();
    setJ(LASTB(), board);
    t.go({name: 'ranking', board, tab: 'exams', back: backOf(V), prev: getJ(SEEN(), {})});
  },
  rankBack(){ const t = T(); t.go(t.V.back || {name: 'home'}); },
  rboard(d){ const V = T().V; V.board = d.id; setJ(LASTB(), d.id); T().render(); },
  rtab(d){ const V = T().V; V.tab = d.id; T().render(); },
  rretry(){ const V = T().V; V.fetched = false; V.fetching = false; T().render(); },
  account(){ const t = T(); t.go({name: 'profile', back: backOf(t.V)}); },
  amode(d){ const t = T(); const f = document.querySelector('form[data-form] [name=email]'); t.V.email = f ? f.value : (t.V.email || ''); t.V.mode = d.id; t.V.msg = ''; t.render(); },
  async logout(){ const t = T(); await C.signOut(); notes = []; notesAt = 0; t.reset(); t.go({name: 'account', mode: 'login'}); }
};

/* ---------- formularios ---------- */
document.addEventListener('submit', async e => {
  const f = e.target.closest('form[data-form]'); if (!f || !on) return;
  e.preventDefault();
  const kind = f.dataset.form, val = n => (f.elements[n] ? f.elements[n].value : '');
  const err = f.querySelector('.formerr'), ok = f.querySelector('.formok'), btn = f.querySelector('button[type=submit]');
  const label = btn.textContent;
  const show = (m, good) => { err.textContent = good ? '' : m; if (ok) ok.textContent = good ? m : ''; };
  const name = val('name').trim().replace(/\s+/g, ' ');
  const emailOk = /^\S+@\S+\.\S+$/.test(val('email').trim());
  // comprobaciones rápidas antes de ir al servidor
  if ((kind === 'login' || kind === 'signup' || kind === 'forgot') && !emailOk) return show('Escribe un email válido.');
  if ((kind === 'login' || kind === 'signup') && !val('password')) return show('Escribe tu contraseña.');
  if (kind === 'signup' && val('password').length < 6) return show('La contraseña debe tener al menos 6 caracteres.');
  if ((kind === 'signup' || kind === 'complete' || kind === 'rename') && (name.length < 3 || name.length > 20)) return show('El nombre visible debe tener entre 3 y 20 caracteres.');
  if ((kind === 'signup' || kind === 'complete') && !val('code').trim()) return show('Escribe el código de grupo.');
  if (kind === 'password' || kind === 'recover'){
    if (val('p1').length < 6) return show('La contraseña debe tener al menos 6 caracteres.');
    if (val('p1') !== val('p2')) return show('Las contraseñas no coinciden.');
  }
  if ((kind === 'login' || kind === 'signup' || kind === 'forgot') && !navigator.onLine) return show('Necesitas conexión para iniciar sesión la primera vez.');
  btn.disabled = true; btn.textContent = 'Un momento…'; show('', false);
  const t = T();
  try {
    if (kind === 'login' || kind === 'signup'){
      const r = kind === 'login' ? await C.signIn(val('email'), val('password')) : await C.signUp(val('email'), val('password'), name, val('code').trim());
      if (r === 'confirm') show('Te hemos enviado un email para confirmar la cuenta. Ábrelo y después entra con tu email y contraseña.', true);
      else if (r === 'profile') t.go({name: 'account', mode: 'complete'});
      else t.go({name: 'home'});
    } else if (kind === 'complete'){
      await C.createProfile(val('code').trim(), name);
      t.go({name: 'home'});
    } else if (kind === 'forgot'){
      await C.sendReset(val('email'));
      show('Si hay una cuenta con ese email, te llegará un enlace para poner una contraseña nueva.', true);
    } else if (kind === 'recover'){
      await C.finishRecovery(val('p1'));
      t.go({name: 'home'});
    } else if (kind === 'rename'){
      const n = await C.rename(name);
      const h = document.querySelector('h2.big'); if (h) h.textContent = n;
      show('Nombre cambiado.', true);
    } else if (kind === 'password'){
      await C.changePassword(val('p1'));
      f.reset(); show('Contraseña cambiada.', true);
    }
  } catch(ex){ show(ex.message || String(ex)); }
  if (document.body.contains(btn)){ btn.disabled = false; btn.textContent = label; }
});

/* ---------- cambios de estado ---------- */
if (on) C.on(what => {
  const t = T(); if (!t) return;
  const V = t.V; const typing = document.activeElement && document.activeElement.tagName === 'INPUT';
  if (what === 'auth'){
    // sesión cerrada o caducada: se limpia la pantalla y se vuelve al acceso (la cola local se conserva)
    if (!C.user){ notes = []; notesAt = 0; t.reset(); return t.go(gate({name: 'home'})); }
    const g = gate(V); if (g) return t.go(g);
    if (!typing && ['home', 'parts', 'subject', 'examSetup', 'ranking'].includes(V.name)) return t.render();
  }
  if (what === 'net'){ const el = document.getElementById('net-msg'); if (el) el.textContent = netMsg(); }
  if (what === 'stats' && ['home', 'parts', 'subject', 'practiceSetup'].includes(V.name)) return t.render();
  if (V.name === 'results') paintResults();
  if (V.name === 'profile'){ const el = document.getElementById('cloud-sync'); if (el) el.innerHTML = syncText(); }
});

window.OnlineUI = {
  enabled: on, gate, key: k => C.key(k), homeBar, homeNotes, subjectLink, examHint, presetHint, resultsSlot, view, after, act: A,
  answered: (testId, qId, ok) => { if (on) C.onAnswer(testId, qId, ok); },
  examDone: (s, X) => on ? C.onExam(s, X) : null,
  reset: testId => { if (on) C.onReset(testId); }
};
})();
