// Cuentas, sincronización y ranking con Supabase.
// Todo es opcional: sin configuración, sin conexión o sin sesión, la app funciona solo en local como siempre.
// Respuestas y exámenes se guardan primero en una cola local y se suben cuando hay red.
(function(){
const CFG = window.TESTS_CONFIG || {};
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
const LIB_SRI = 'sha384-Rj26LVGvoeRVR6+mwQmFfcR3QOBEwT+ZmuCWpuiqeTzJpCs0ER4ITAWGb4Hiy3Ok';
const enabled = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && !/TU-PROYECTO|TU-ANON-KEY/.test(CFG.supabaseUrl + CFG.supabaseAnonKey));

const K = {
  owner: 'tests.cloud.owner',     // cuenta a la que pertenece el progreso local de este dispositivo
  me: 'tests.cloud.me',           // {id, email, name} para mostrar sin red
  answers: 'tests.cloud.answers', // cola de respuestas pendientes de subir
  exams: 'tests.cloud.exams',     // cola de exámenes pendientes de subir
  resets: 'tests.cloud.resets',   // «Borrar mi progreso» pendientes
  imp: 'tests.cloud.import',      // progreso local que se sube al entrar por primera vez
  pend: 'tests.cloud.pending',    // registro a medias (perfil por crear)
  status: 'tests.cloud.status',   // estado de subida de cada examen
  rank: 'tests.cloud.rank',       // última copia del ranking
  snap: 'tests.cloud.snap'        // posiciones en la última visita (avisos «te ha pasado»)
};
const get = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const del = k => { try { localStorage.removeItem(k); } catch(e){} };
const uuid = () => crypto.randomUUID ? crypto.randomUUID()
  : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

const LEAVES = [];
(window.SUBJECTS || []).forEach(t => t.parts ? t.parts.forEach(p => LEAVES.push(p)) : LEAVES.push(t));
const subjOf = b => String(b).split(':')[0];
const MIN_N = 20, MIN_EXAMS = 3, LAST = 5;

let sb = null, libPromise = null;
let uid = null;                       // usuario con sesión activa
let me = get(K.me, null);             // copia local para mostrar el nombre sin red
let online = navigator.onLine;
let profileOk = false, needsProfile = false, boardsDone = false;
let lastError = null, rankCache = null;
const listeners = [];
const emit = what => listeners.forEach(f => { try { f(what || 'state'); } catch(e){ console.error(e); } });

/* ---------- carga de supabase-js (desde la caché del service worker si no hay red) ---------- */
function loadLib(){
  if (!enabled) return Promise.resolve(null);
  if (window.supabase && window.supabase.createClient) return Promise.resolve(window.supabase);
  if (libPromise) return libPromise;
  libPromise = new Promise(res => {
    const s = document.createElement('script');
    s.src = LIB; s.integrity = LIB_SRI; s.crossOrigin = 'anonymous'; s.async = true;
    s.onload = () => res(window.supabase || null);
    s.onerror = () => { libPromise = null; s.remove(); res(null); };
    document.head.appendChild(s);
  });
  return libPromise;
}
async function init(){
  if (sb) return true;
  const lib = await loadLib();
  if (!lib) return false;
  if (!sb){
    sb = lib.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'tests.cloud.auth' }
    });
    // supabase recomienda no llamar a la API dentro de este callback: se difiere
    sb.auth.onAuthStateChange((ev, session) => setTimeout(() => onSession(ev, session), 0));
  }
  return true;
}
function onSession(ev, session){
  const id = session && session.user ? session.user.id : null;
  if (!id && ev !== 'SIGNED_OUT' && !navigator.onLine) return;   // sin red: se mantiene lo que había
  if (id !== uid){
    uid = id; profileOk = false; needsProfile = false; boardsDone = false;
    if (id){ me = Object.assign({}, me && me.id === id ? me : {}, {id, email: session.user.email}); set(K.me, me); }
    else { me = null; del(K.me); }
    emit('auth');
  }
  if (uid) sync();
}

/* ---------- errores en español ---------- */
function isNet(e){
  const m = e ? (e.message || '') + ' ' + (e.name || '') + ' ' + (e.details || '') : '';
  return !navigator.onLine || /failed to fetch|networkerror|load failed|network request failed|fetch failed|AuthRetryableFetchError|timed? ?out/i.test(m);
}
function msg(e){
  const m = (e && (e.message || e.error_description || e.msg)) || String(e);
  const s = m + ' ' + ((e && e.code) || '');
  if (isNet(e)) return 'Sin conexión. Inténtalo cuando vuelvas a tener red.';
  if (/invalid login credentials|invalid_credentials/i.test(s)) return 'Email o contraseña incorrectos.';
  if (/already (been )?registered|user_already_exists|email_exists/i.test(s)) return 'Ya existe una cuenta con ese email.';
  if (/email not confirmed|email_not_confirmed/i.test(s)) return 'Falta confirmar el email: abre el enlace que te ha llegado al correo.';
  if (/same_password|should be different/i.test(s)) return 'La nueva contraseña tiene que ser distinta de la actual.';
  if (/weak_password|password.*(at least|characters|short)/i.test(s)) return 'La contraseña debe tener al menos 6 caracteres.';
  if (/email_address_invalid|validate email|invalid.*email|email.*invalid/i.test(s)) return 'El email no es válido.';
  if (/rate limit|too many|over_\w*_limit/i.test(s)) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
  if (/signups? not allowed|signup_disabled/i.test(s)) return 'El registro de cuentas está desactivado.';
  if (/name_taken/.test(s)) return 'Ese nombre ya existe. Elige otro.';
  if (/bad_name/.test(s)) return 'El nombre visible debe tener entre 3 y 20 caracteres.';
  if (/bad_code/.test(s)) return 'El código de grupo no es correcto.';
  if (/not_member/.test(s)) return 'Tu cuenta no tiene perfil en el grupo.';
  return 'No se ha podido completar: ' + m;
}
const fail = e => { const err = new Error(msg(e)); err.net = isNet(e); err.raw = e; return err; };
async function need(){
  if (!enabled) throw new Error('Las cuentas no están configuradas.');
  if (!(await init())) throw fail(new Error('Failed to fetch'));
}
const rpc = async (fn, args) => { const { data, error } = await sb.rpc(fn, args); if (error) throw error; return data; };

/* ---------- cuenta ---------- */
async function signIn(email, password){
  await need();
  const { data, error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw fail(error);
  onSession('SIGNED_IN', data.session);
  try { await ensureProfile(); } catch(e){ throw fail(e); }
  return needsProfile ? 'profile' : 'ok';
}
async function signUp(email, password, name, code){
  await need();
  name = name.trim().replace(/\s+/g, ' ');
  if (name.length < 3 || name.length > 20) throw fail(new Error('bad_name'));
  let r;
  try { r = await rpc('signup_check', { p_code: code, p_name: name }); } catch(e){ throw fail(e); }
  if (r !== 'ok') throw fail(new Error(r));
  set(K.pend, { email: email.trim().toLowerCase(), name, code });
  const { data, error } = await sb.auth.signUp({ email: email.trim(), password, options: { data: { display_name: name } } });
  if (error) throw fail(error);
  if (!data.session) return 'confirm';               // confirmación por email activada en Supabase
  onSession('SIGNED_IN', data.session);
  try { await ensureProfile(); } catch(e){ throw fail(e); }
  return needsProfile ? 'profile' : 'ok';
}
async function createProfile(code, name){
  await need();
  try {
    const n = await rpc('create_profile', { p_code: code, p_name: name });
    me = Object.assign({}, me, { name: n }); set(K.me, me);
    profileOk = true; needsProfile = false; del(K.pend);
  } catch(e){ throw fail(e); }
  emit('auth'); sync();
}
// Una sola comprobación a la vez (el registro y la sincronización pueden pedirla juntos)
let profilePromise = null;
function ensureProfile(){
  if (profileOk){ needsProfile = false; return Promise.resolve(true); }
  if (!profilePromise) profilePromise = checkProfile().finally(() => { profilePromise = null; });
  return profilePromise;
}
async function checkProfile(){
  const { data, error } = await sb.from('profiles').select('display_name').eq('id', uid).maybeSingle();
  if (error) throw error;
  if (data){ profileOk = true; needsProfile = false; me = Object.assign({}, me, { name: data.display_name }); set(K.me, me); return true; }
  const p = get(K.pend, null);
  if (p && p.code && me && (!p.email || p.email === String(me.email || '').toLowerCase())){
    try { await createProfile(p.code, p.name); return true; }
    catch(e){ if (!e.net) del(K.pend); if (e.net) throw e.raw; }
  }
  if (profileOk) return true;            // se creó mientras tanto desde «Completa tu registro»
  needsProfile = true; emit('auth');
  return false;
}
async function signOut(){
  if (sb) { try { await sb.auth.signOut({ scope: 'local' }); } catch(e){} }
  uid = null; me = null; profileOk = false; needsProfile = false; rankCache = null;
  del(K.me); del(K.rank);
  emit('auth');
}
async function rename(name){
  await need();
  try { const n = await rpc('set_display_name', { p_name: name }); me = Object.assign({}, me, { name: n }); set(K.me, me); emit('auth'); return n; }
  catch(e){ throw fail(e); }
}
async function changePassword(password){
  await need();
  const { error } = await sb.auth.updateUser({ password });
  if (error) throw fail(error);
}

/* ---------- registro local (lo llama app.js) ---------- */
const owner = () => uid || get(K.owner, null);
let timer = null;
function schedule(ms){ clearTimeout(timer); timer = setTimeout(sync, ms); }

function onAnswer(sid, qi, ok){
  const u = enabled && owner(); if (!u) return;
  const q = get(K.answers, []);
  q.push({ id: uuid(), u, s: sid, q: qi, k: ok ? 1 : 0, t: new Date().toISOString() });
  set(K.answers, q);
  schedule(3000);
}
function onExam(s, X){
  const u = enabled && owner(); if (!u) return null;
  const R = X.result;
  const rec = { u, client_id: uuid(), subject_id: s.id, preset_id: X.preset || null,
    taken_at: new Date(X.start).toISOString(), n_questions: X.list.length,
    n_correct: R.ok, n_wrong: R.ko, n_blank: R.bl, penalty: X.cfg.pen, duration_s: R.secs, grade: R.grade };
  const q = get(K.exams, []); q.push(rec); set(K.exams, q);
  setStatus(rec.client_id, { st: 'pending' });
  schedule(0);
  return rec.client_id;
}
function onReset(sid){
  const u = enabled && owner(); if (!u) return;
  set(K.answers, get(K.answers, []).filter(e => !(e.u === u && e.s === sid)));
  const r = get(K.resets, []); r.push({ u, s: sid }); set(K.resets, r);
  schedule(0);
}
function setStatus(id, st){
  const all = get(K.status, {}); all[id] = Object.assign({ at: Date.now() }, st);
  const keys = Object.keys(all).sort((a, b) => all[b].at - all[a].at).slice(0, 30);
  set(K.status, Object.fromEntries(keys.map(k => [k, all[k]])));
  emit('exam');
}
const examStatus = id => (get(K.status, {})[id] || null);

// ¿Este examen cuenta para el ranking? (el servidor lo vuelve a comprobar)
function counts(s, n, pen, preset){
  if (preset) return true;
  return n >= MIN_N && Math.abs(pen - (s.examPen || 0)) < 1e-9;
}

/* ---------- sincronización ---------- */
let running = null, again = false;
function sync(){
  if (!enabled || !uid) return Promise.resolve();
  if (running){ again = true; return running; }
  running = (async () => { do { again = false; await syncOnce(); } while (again); })()
    .finally(() => { running = null; });
  return running;
}
async function syncOnce(){
  try {
    if (!(await ensureProfile())) return;
    await registerBoards();
    await adopt();
    await pushResets();
    await pushAnswers();
    await pushExams();
    await pullStats();
    online = true; lastError = null;
  } catch(e){
    if (isNet(e)) online = false;
    else { lastError = msg(e); console.warn('[tests] sincronización:', e); }
  }
  emit('sync');
}
async function registerBoards(){
  if (boardsDone) return;
  const list = [];
  LEAVES.forEach(s => {
    list.push({ subject_id: s.id, preset_id: null, penalty: s.examPen || 0, min_questions: MIN_N });
    (s.presets || []).forEach(p => list.push({ subject_id: s.id, preset_id: p.id, penalty: p.pen, min_questions: p.idx.length }));
  });
  await rpc('register_boards', { p: list });
  boardsDone = true;
}
function localStats(){
  const out = {};
  LEAVES.forEach(s => { const st = get('tests.stats.' + s.id, {}); if (Object.keys(st).length) out[s.id] = st; });
  return out;
}
// Primera vez que esta cuenta entra en este dispositivo
async function adopt(){
  const o = get(K.owner, null);
  if (o !== uid){
    if (!o) set(K.imp, { u: uid, id: uuid(), stats: localStats() });   // progreso sin cuenta: se suma a la cuenta
    set(K.owner, uid);                                                   // si era de otra cuenta, no se mezcla
  }
  const imp = get(K.imp, null);
  if (imp && imp.u === uid){
    if (Object.keys(imp.stats).length) await rpc('import_local_stats', { p_import_id: imp.id, p_stats: imp.stats });
    del(K.imp);
  }
}
async function pushResets(){
  for (const r of get(K.resets, []).filter(x => x.u === uid)){
    await rpc('reset_subject_stats', { p_subject: r.s });
    set(K.resets, get(K.resets, []).filter(x => !(x.u === r.u && x.s === r.s)));
  }
}
async function pushAnswers(){
  for (;;){
    const batch = get(K.answers, []).filter(e => e.u === uid).slice(0, 500);
    if (!batch.length) return;
    const rows = batch.map(e => ({ id: e.id, user_id: uid, subject_id: e.s, q_index: e.q, correct: !!e.k, answered_at: e.t }));
    const { error } = await sb.from('answer_events').upsert(rows, { onConflict: 'id', ignoreDuplicates: true });
    if (error) throw error;
    const sent = new Set(batch.map(e => e.id));
    set(K.answers, get(K.answers, []).filter(e => !sent.has(e.id)));
  }
}
async function pushExams(){
  for (const rec of get(K.exams, []).filter(e => e.u === uid)){
    const row = Object.assign({}, rec, { user_id: uid }); delete row.u;
    const { error } = await sb.from('exam_results').upsert(row, { onConflict: 'user_id,client_id', ignoreDuplicates: true });
    if (error && (isNet(error) || !['22023', '23514', '22P02'].includes(error.code))) throw error;   // se reintenta luego
    setStatus(rec.client_id, error ? { st: 'rejected', msg: error.message } : { st: 'ok' });
    set(K.exams, get(K.exams, []).filter(e => e.client_id !== rec.client_id));
  }
}
// La cuenta manda: el progreso local pasa a ser el de la nube (más lo que aún no se ha subido)
async function pullStats(){
  const rows = [];
  for (let from = 0; ; from += 1000){
    const { data, error } = await sb.from('question_stats').select('subject_id,q_index,n,n_correct,last_correct')
      .order('subject_id').order('q_index').range(from, from + 999);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 1000) break;
  }
  if (get(K.owner, null) !== uid || get(K.resets, []).some(r => r.u === uid)) return;
  const map = {};
  rows.forEach(r => { (map[r.subject_id] = map[r.subject_id] || {})[r.q_index] = { n: r.n, ok: r.n_correct, last: r.last_correct ? 1 : 0 }; });
  get(K.answers, []).filter(e => e.u === uid).forEach(e => {
    const m = map[e.s] = map[e.s] || {}; const r = m[e.q] || (m[e.q] = { n: 0, ok: 0, last: 0 });
    r.n++; if (e.k) r.ok++; r.last = e.k ? 1 : 0;
  });
  let changed = false;
  LEAVES.forEach(s => {
    const key = 'tests.stats.' + s.id, next = map[s.id] || {};
    if (JSON.stringify(get(key, {})) !== JSON.stringify(next)){
      changed = true;
      if (Object.keys(next).length) set(key, next); else del(key);
    }
  });
  if (changed) emit('stats');
}

/* ---------- ranking ---------- */
// Una clasificación por asignatura: las asignaturas con temas juntan los exámenes de todos sus temas.
// Los exámenes reales (presets) tienen su propia clasificación: 'tema:examen'.
const GROUPS = (window.SUBJECTS || []).map(t => ({ id: t.id, name: t.name, short: t.short, leaves: t.parts || [t] }));
const groupOf = sid => GROUPS.find(g => g.leaves.some(s => s.id === sid)) || null;
const groupsArg = () => Object.fromEntries(GROUPS.map(g => [g.id, g.leaves.map(s => s.id)]));

async function fetchRanking(){
  await need();
  if (!uid) throw new Error('Inicia sesión para ver el ranking.');
  let data;
  try {
    try { data = await rpc('ranking_data', { p_groups: groupsArg() }); }
    catch(e){
      // schema.sql antiguo (sin agrupar por asignatura): se usa la versión anterior de la función
      if (isNet(e) || !/PGRST202|42883/.test(e.code || '')) throw e;
      data = await rpc('ranking_data');
    }
  } catch(e){ online = !isNet(e) && online; throw fail(e); }
  online = true;
  data.fetched = Date.now();
  rankCache = data; set(K.rank, data);
  return data;
}
function cachedRanking(){
  if (!rankCache) rankCache = get(K.rank, null);
  const id = uid || (me && me.id);
  return rankCache && rankCache.me === id ? rankCache : null;
}
const round = (v, d) => Math.round(v * 10 ** d) / 10 ** d;
const isPreset = b => String(b).includes(':');

// Media de los 5 últimos y nº de exámenes que cuentan, por usuario, en una clasificación
function examStats(data, b){
  const out = {};
  if (isPreset(b)){
    data.exams.filter(e => e.b === b).forEach(e => { out[e.u] = { avg: +e.avg, n: +e.n }; });
  } else if (data.groups){
    data.groups.filter(e => e.gr === b).forEach(e => { out[e.u] = { avg: +e.avg, n: +e.n }; });
  } else {
    // aproximación con el SQL antiguo: media de los temas ponderada por exámenes
    const g = GROUPS.find(x => x.id === b); const ids = g ? g.leaves.map(s => s.id) : [];
    data.exams.filter(e => ids.includes(e.b)).forEach(e => {
      const o = out[e.u] = out[e.u] || { sum: 0, w: 0, n: 0 }; const w = Math.min(+e.n, LAST);
      o.sum += +e.avg * w; o.w += w; o.n += +e.n;
    });
    Object.values(out).forEach(o => { o.avg = round(o.sum / o.w, 2); });
  }
  return out;
}

// Filas de una clasificación. b: id de asignatura ('sif', 'inst') o 'tema:examen-real'
// tab: 'exams' | 'mastery' | 'week'
function board(data, b, tab){
  const names = {}; data.members.forEach(m => { names[m.id] = m.name; });
  const mas = {}; data.mastery.forEach(e => { (mas[e.u] = mas[e.u] || {})[e.s] = +e.m; });
  const wk = {};  data.week.forEach(e => { (wk[e.u] = wk[e.u] || {})[e.s] = +e.a; });
  const g = isPreset(b) ? groupOf(subjOf(b)) : GROUPS.find(x => x.id === b);
  const leaves = g ? g.leaves : [];
  const ex = examStats(data, b);
  const rows = Object.keys(names).map(u => {
    const e = ex[u];
    const r = { id: u, name: names[u], value: null, n: e ? e.n : 0, missing: 0, me: u === data.me };
    if (tab === 'exams'){
      if (r.n >= MIN_EXAMS) r.value = round(e.avg, 2); else r.missing = MIN_EXAMS - r.n;
    } else if (tab === 'mastery'){
      let m = 0, total = 0;
      leaves.forEach(s => { total += s.questions.length; m += Math.min((mas[u] || {})[s.id] || 0, s.questions.length); });
      r.value = total ? round(100 * m / total, 1) : 0;
    } else {
      r.value = leaves.reduce((a, s) => a + ((wk[u] || {})[s.id] || 0), 0);
    }
    return r;
  });
  const shown = rows.filter(r => tab === 'exams' ? r.value !== null : r.value > 0)
    .sort((x, y) => y.value - x.value || x.name.localeCompare(y.name, 'es'));
  shown.forEach(r => { r.pos = 1 + shown.filter(o => o.value > r.value).length; });
  const mine = shown.find(r => r.me) || rows.find(r => r.me) || null;
  return { rows: shown, me: mine };
}
// Clasificación en la que cuenta un examen de este tema
const boardFor = (sid, preset) => preset ? sid + ':' + preset : (groupOf(sid) || { id: sid }).id;
// Posición que daría una nota recién hecha
function wouldRank(data, b, grade, clientId){
  const g = !isPreset(b) && GROUPS.find(x => x.id === b);
  const inBoard = x => g ? !isPreset(x.b) && g.leaves.some(s => s.id === x.b) : x.b === b;
  const mineAll = data.mine.filter(inBoard).sort((x, y) => String(y.t || '').localeCompare(String(x.t || '')));
  const mine = mineAll.filter(x => x.c !== clientId).map(x => +x.g);
  const already = mineAll.some(x => x.c === clientId);
  const ex = examStats(data, b);
  const n = (ex[data.me] ? ex[data.me].n : 0) - (already ? 1 : 0) + 1;
  if (n < MIN_EXAMS) return { missing: MIN_EXAMS - n };
  const grades = [grade].concat(mine).slice(0, LAST);
  const avg = round(grades.reduce((a, v) => a + v, 0) / grades.length, 2);
  const others = Object.entries(ex).filter(([u, v]) => u !== data.me && v.n >= MIN_EXAMS).map(([, v]) => v.avg);
  return { pos: 1 + others.filter(v => v > avg).length, avg };
}
function boardsList(){
  const out = [];
  GROUPS.forEach(g => { out.push(g.id); g.leaves.forEach(s => (s.presets || []).forEach(p => out.push(s.id + ':' + p.id))); });
  return out;
}
// Avisos «Fulano te ha pasado en …» desde la última visita
function overtakes(data){
  const snap = get(K.snap, null), now = {}, notes = [];
  boardsList().forEach(b => {
    const pos = {}; board(data, b, 'exams').rows.forEach(r => { pos[r.id] = r.pos; });
    now[b] = pos;
    const before = snap && snap.u === data.me ? snap.b[b] : null;
    const mine = pos[data.me], mineBefore = before ? before[data.me] : undefined;
    if (!before || mine == null || mineBefore == null) return;
    Object.keys(pos).forEach(u => {
      // estaba detrás de ti (o no aparecía) y ahora está delante
      if (u !== data.me && pos[u] < mine && (before[u] == null || before[u] >= mineBefore)){
        const m = data.members.find(x => x.id === u);
        if (m) notes.push({ name: m.name, board: b });
      }
    });
  });
  set(K.snap, { u: data.me, b: now });
  return notes;
}

/* ---------- arranque ---------- */
function pending(){
  const u = owner();
  return { answers: get(K.answers, []).filter(e => e.u === u).length, exams: get(K.exams, []).filter(e => e.u === u).length };
}
if (enabled){
  window.addEventListener('online', () => { online = true; init().then(ok => { if (ok) sync(); emit('net'); }); });
  window.addEventListener('offline', () => { online = false; emit('net'); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && uid) sync(); });
  init().then(ok => { if (!ok) emit('net'); });
}

window.Cloud = {
  enabled, LEAVES, GROUPS, MIN_N, MIN_EXAMS, groupOf, boardFor,
  get user(){ return me; },                 // {id, email, name} o null
  get signedIn(){ return !!uid; },
  get needsProfile(){ return needsProfile; },
  get online(){ return online && navigator.onLine; },
  get lastError(){ return lastError; },
  on(f){ listeners.push(f); },
  init, signIn, signUp, signOut, createProfile, rename, changePassword,
  onAnswer, onExam, onReset, examStatus, counts, pending, sync,
  fetchRanking, cachedRanking, board, wouldRank, overtakes, boardsList
};
})();
