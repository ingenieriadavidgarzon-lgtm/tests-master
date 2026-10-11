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
  if (V.name === 'legal') return null;                 // Privacidad y Condiciones: siempre accesibles
  if (C.recovery) return V.name === 'recover' ? null : {name: 'recover'};
  if (C.user){
    if (C.needsProfile) return V.name === 'account' && V.mode === 'complete' ? null : {name: 'account', mode: 'complete'};
    const pend = C.pendingLegal;
    if (pend && pend.length) return V.name === 'consent' ? null : {name: 'consent'};
    return V.name === 'account' || V.name === 'recover' || V.name === 'consent' ? {name: 'home'} : null;
  }
  if (V.name === 'account' && V.mode !== 'complete') return null;
  return {name: 'account', mode: 'login', msg: C.ended || C.linkError || '', ok: C.endedOk};
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
      lines.push(w.hidden
        ? `<p class="st">No apareces en el ranking: lo tienes desactivado en tu cuenta.</p>`
        : w.missing
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
  if (!p.answers && !p.exams && !p.learn) return C.lastError ? esc(C.lastError) : 'Todo tu progreso está sincronizado con tu cuenta.';
  const parts = [];
  if (p.answers) parts.push(plural(p.answers, 'respuesta', 'respuestas'));
  if (p.exams) parts.push(plural(p.exams, 'examen', 'exámenes'));
  if (p.learn) parts.push(plural(p.learn, 'avance de Aprender', 'avances de Aprender'));
  return 'Pendiente de subir: ' + parts.join(', ').replace(/, ([^,]*)$/, ' y $1') + '.' + (C.online ? '' : ' Sin conexión: se subirá al volver la red.');
}

/* ---------- pantallas nuevas ---------- */
const field = (name, label, type, ac, hint, value) =>
  `<label class="field"><span>${label}</span><input name="${name}" type="${type}" autocomplete="${ac}"${type === 'email' ? ' inputmode="email" autocapitalize="none" spellcheck="false"' : ''}${value != null ? ` value="${esc(value)}"` : ''}>${hint ? `<small>${hint}</small>` : ''}</label>`;
const netMsg = () => !navigator.onLine && !C.user ? 'Necesitas conexión para iniciar sesión la primera vez.' : '';
const hero = (lede, title) => `<header class="hero"><p class="eyebrow">${title ? 'Tests del Máster' : 'Máster en Ingeniería Industrial'}</p><h2 class="big">${title || 'Tests del Máster'}</h2><p class="lede">${lede}</p></header>`;

/* ---------- privacidad y condiciones ---------- */
const L = () => window.LEGAL;
const CONSENT = {
  terms: 'He leído y acepto las <button type="button" class="linkbtn inl" data-act="legal" data-id="terms">Condiciones de uso</button>, y me comprometo a no compartir el acceso ni el contenido de la app sin autorización.',
  privacy: 'He leído el aviso de <button type="button" class="linkbtn inl" data-act="legal" data-id="privacy">Privacidad</button> y acepto que mi nombre visible y mis resultados aparezcan en el ranking del grupo.'
};
const checkBox = (doc, checked) => `<label class="check consent"><input type="checkbox" name="c_${doc}" ${checked ? 'checked' : ''}><span>${CONSENT[doc]}</span></label>`;
const legalLinks = () => `<p class="legallinks"><button data-act="legal" data-id="privacy">Privacidad</button> · <button data-act="legal" data-id="terms">Condiciones de uso</button></p>`;
const docFoot = d => `<p class="legalver">Última actualización: ${esc(d.updated)} · Versión ${esc(d.version)}</p>`;
function vLegal(V){
  const d = L()[V.doc === 'terms' ? 'terms' : 'privacy'], other = L()[d.id === 'terms' ? 'privacy' : 'terms'];
  return T().top(d.title, 'legalBack') + `
    <p class="eyebrow">Tests del Máster</p><h2 class="big">${esc(d.title)}</h2>
    <div class="legaltext">${d.html}</div>${docFoot(d)}
    <p class="legallinks"><button data-act="legal" data-id="${other.id}">${esc(other.title)}</button></p>`;
}
function deleteForm(){
  return `<form class="form" data-form="delete" novalidate>
      ${field('confirm', 'Escribe BORRAR para confirmar', 'text', 'off', 'Se borran para siempre tu cuenta, tu progreso, tus respuestas, tus exámenes y tu avance en Aprender, también en este dispositivo.')}
      <p class="formerr" role="alert"></p>
      <button class="btn danger" type="submit">Borrar mi cuenta</button>
    </form>`;
}
function vConsent(){
  const pend = C.pendingLegal || ['terms', 'privacy'];
  const both = pend.length === 2, first = !(C.user && C.user.legal && (C.user.legal.t || C.user.legal.p));
  const lede = first ? 'Para seguir usando la app, lee y acepta las Condiciones de uso y el aviso de Privacidad.'
    : both ? 'Han cambiado las Condiciones de uso y el aviso de Privacidad. Léelos y acéptalos para seguir.'
    : `Ha cambiado ${pend[0] === 'terms' ? 'las Condiciones de uso' : 'el aviso de Privacidad'}. Léelo y acéptalo para seguir.`;
  const docs = pend.map(k => { const d = L()[k]; return `<section class="legaldoc"><h3>${esc(d.title)}</h3><div class="legaltext">${d.html}</div>${docFoot(d)}</section>`; }).join('');
  return hero(lede, 'Antes de seguir') + docs + `
    <form class="form" data-form="consent" novalidate style="margin-top:18px">
      ${pend.map(k => checkBox(k, false)).join('')}
      <p class="formerr" role="alert"></p>
      <button class="btn primary" type="submit">Aceptar y entrar</button>
    </form>
    <h3>¿No estás de acuerdo?</h3>
    <p class="hint" style="margin-bottom:12px">Puedes cerrar sesión o borrar tu cuenta y todos tus datos.</p>
    <p class="reset" style="margin-top:0"><button data-act="logout" style="color:var(--ink)">Cerrar sesión</button></p>
    <details class="panel"><summary>Borrar mi cuenta</summary><div class="in">${deleteForm()}</div></details>`;
}

function vAccount(V){
  const m = V.mode || 'login';
  const D = V.draft || {};
  if (m === 'complete') return hero('Tu cuenta existe, pero falta el nombre visible y el código de grupo.') + `
    <form class="form" data-form="complete" novalidate>
      ${field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres. No hace falta que sea tu nombre real. Es lo único que verán tus compañeros.', D.name)}
      ${field('code', 'Código de grupo', 'text', 'off', 'Te lo da quien organiza el grupo.', D.code)}
      ${checkBox('terms', D.c_terms)}${checkBox('privacy', D.c_privacy)}
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
    ${V.msg ? `<p class="${V.ok ? 'formok' : 'formerr'}" role="${V.ok ? 'status' : 'alert'}" style="margin-bottom:14px">${esc(V.msg)}</p>` : ''}${netLine}
    <div class="seg" style="margin-bottom:18px"><button data-act="amode" data-id="login" aria-pressed="${!signup}">Entrar</button><button data-act="amode" data-id="signup" aria-pressed="${signup}">Crear cuenta</button></div>
    <form class="form" data-form="${signup ? 'signup' : 'login'}" novalidate>
      ${field('email', 'Email', 'email', 'email', signup ? 'No se muestra a nadie.' : '', D.email || V.email || '')}
      ${field('password', 'Contraseña', 'password', signup ? 'new-password' : 'current-password', signup ? 'Al menos 6 caracteres.' : '')}
      ${signup ? field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres. No hace falta que sea tu nombre real: puede ser un apodo. Es lo único que verán tus compañeros en el ranking.', D.name) : ''}
      ${signup ? field('code', 'Código de grupo', 'text', 'off', 'Te lo da quien organiza el grupo.', D.code) : ''}
      ${signup ? checkBox('terms', D.c_terms) + checkBox('privacy', D.c_privacy) : ''}
      <p class="formerr" role="alert"></p>
      <p class="formok" role="status"></p>
      <button class="btn primary" type="submit">${signup ? 'Crear cuenta' : 'Entrar'}</button>
    </form>
    ${signup ? '' : `<p class="reset"><button data-act="amode" data-id="forgot" style="color:var(--accent)">¿Has olvidado tu contraseña?</button></p>`}
    ${legalLinks()}`;
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

const fdate = t => t ? new Date(t).toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'}) : '';
function legalState(u){
  const l = u.legal || {};
  const one = (n, v, t) => v ? `${n}: versión ${esc(v)}${t ? ', aceptada el ' + fdate(t) : ''}` : `${n}: sin aceptar`;
  return `${one('Condiciones de uso', l.t, l.ta)}.<br>${one('Privacidad', l.p, l.pa)}.<br>Descarga un archivo con tu perfil, tu progreso, tus respuestas, tus exámenes y tu avance en Aprender.`;
}
function vProfile(){
  const t = T(), u = C.user || {};
  return t.top('Tu cuenta', 'rankBack') + `
    <p class="eyebrow">Nombre visible</p>
    <h2 class="big">${esc(u.name || '—')}</h2>
    <p class="lede">${esc(u.email || '')}<br>Tu email solo lo ves tú. En el ranking solo aparece tu nombre visible.</p>
    <p class="syncline" id="cloud-sync">${syncText()}</p>
    <button class="pick rankpick" data-act="ranking"><span class="l"><b>Ranking</b><small>Una clasificación por asignatura</small></span><span class="n">Ver</span></button>
    <h3>Ranking</h3>
    <label class="switch"><input type="checkbox" data-ptoggle="rank" ${C.inRanking ? 'checked' : ''}><span class="sw" aria-hidden="true"></span><span>Aparecer en el ranking</span></label>
    <p class="hint" id="rank-msg">${C.inRanking ? 'Tus compañeros ven tu nombre visible y tus estadísticas en las clasificaciones.' : 'No apareces en ninguna clasificación para los demás. Puedes seguir viendo el ranking y usando la app.'}</p>
    <h3>Cambiar nombre visible</h3>
    <form class="form" data-form="rename" novalidate>
      ${field('name', 'Nombre visible', 'text', 'nickname', 'Entre 3 y 20 caracteres. Puede ser un apodo.', u.name || '')}
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
    <h3>Cambiar email</h3>
    <form class="form" data-form="email" novalidate>
      ${field('email', 'Email nuevo', 'email', 'email', 'Te enviaremos un enlace para confirmar el cambio. Hasta que lo abras, sigues entrando con el email actual.')}
      <p class="formerr" role="alert"></p><p class="formok" role="status"></p>
      <button class="btn" type="submit">Cambiar email</button>
    </form>
    <h3>Tus datos</h3>
    <p class="hint" style="margin-top:0">${legalState(u)}</p>
    <button class="btn" data-act="exportData" style="margin-top:12px;width:100%">Descargar mis datos</button>
    <p class="hint" id="export-msg" role="status"></p>
    ${legalLinks()}
    <h3>Borrar mi cuenta</h3>
    <details class="panel"><summary>Borrar mi cuenta y todos mis datos</summary><div class="in">${deleteForm()}</div></details>
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
  if (data && data.visible === false) h += `<p class="rankhint no">No apareces en el ranking para los demás. Puedes volver a aparecer desde <button class="linkbtn inl" data-act="account">Tu cuenta</button>.</p>`;
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
  if (name === 'legal') return vLegal(V);
  if (name === 'consent') return vConsent(V);
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
  legal(d){
    const t = T(), V = t.V;
    // se guarda lo escrito en el formulario de registro para no perderlo al volver
    const f = document.querySelector('form[data-form]');
    if (f && V.name === 'account'){
      const D = {}; ['email', 'name', 'code'].forEach(n => { if (f.elements[n]) D[n] = f.elements[n].value; });
      ['c_terms', 'c_privacy'].forEach(n => { if (f.elements[n]) D[n] = f.elements[n].checked; });
      V.draft = D;
    }
    t.go({name: 'legal', doc: d.id, back: V.name === 'legal' ? V.back : V});
  },
  legalBack(){ const t = T(); t.go(t.V.back || {name: 'home'}); },
  async exportData(d, el){
    const msg = document.getElementById('export-msg');
    el.disabled = true; if (msg) msg.textContent = 'Preparando el archivo…';
    try {
      const data = await C.exportMyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'mis-datos-tests-master-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      if (msg) msg.textContent = 'Archivo descargado.';
    } catch(e){ if (msg) msg.textContent = e.message || String(e); }
    el.disabled = false;
  },
  async logout(){ const t = T(); await C.signOut(); notes = []; notesAt = 0; t.reset(); t.go({name: 'account', mode: 'login'}); }
};

/* ---------- interruptor «Aparecer en el ranking» ---------- */
document.addEventListener('change', async e => {
  const t = e.target.closest('[data-ptoggle="rank"]'); if (!t || !on) return;
  const want = t.checked, msg = document.getElementById('rank-msg');
  t.disabled = true;
  try {
    await C.setInRanking(want);
    if (msg) msg.textContent = want ? 'Vuelves a aparecer en el ranking.' : 'Ya no apareces en ninguna clasificación para los demás. Puedes seguir viendo el ranking y usando la app.';
  } catch(ex){ t.checked = !want; if (msg) msg.textContent = ex.message || String(ex); }
  t.disabled = false;
});

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
  const checked = n => !!(f.elements[n] && f.elements[n].checked);
  if ((kind === 'signup' || kind === 'complete') && (!checked('c_terms') || !checked('c_privacy')))
    return show('Para crear la cuenta tienes que marcar las dos casillas: Condiciones de uso y Privacidad.');
  if (kind === 'consent' && [...f.querySelectorAll('input[type=checkbox]')].some(x => !x.checked))
    return show('Marca las casillas para aceptar y seguir.');
  if (kind === 'email' && !emailOk) return show('Escribe un email válido.');
  if (kind === 'delete' && val('confirm').trim() !== 'BORRAR') return show('Escribe BORRAR, en mayúsculas, para confirmar.');
  if ((kind === 'consent' || kind === 'email' || kind === 'delete') && !navigator.onLine) return show('Necesitas conexión para hacerlo.');
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
    } else if (kind === 'consent'){
      await C.acceptLegal(C.pendingLegal || ['terms', 'privacy']);
      t.go({name: 'home'});
    } else if (kind === 'email'){
      await C.changeEmail(val('email'));
      f.reset(); show('Te hemos enviado un enlace a la dirección nueva (y puede que también a la actual). Abre el enlace para confirmar el cambio.', true);
    } else if (kind === 'delete'){
      await C.deleteAccount(val('confirm').trim());
      notes = []; notesAt = 0; t.reset(); t.go(gate({name: 'home'}));
      return;
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
  if (what === 'learn' && ['parts', 'learn'].includes(V.name)) return t.render();
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
