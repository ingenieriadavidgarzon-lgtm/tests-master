// Cuentas, sincronización y ranking con Supabase.
// Con cuentas configuradas (js/config.js), iniciar sesión es obligatorio. El progreso local se guarda por usuario
// (tests.u.<id>.…) y las respuestas y exámenes pasan por una cola local que se sube cuando hay red.
(function(){
const CFG = window.TESTS_CONFIG || {};
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
const LIB_SRI = 'sha384-Rj26LVGvoeRVR6+mwQmFfcR3QOBEwT+ZmuCWpuiqeTzJpCs0ER4ITAWGb4Hiy3Ok';
const enabled = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && !/TU-PROYECTO|TU-ANON-KEY/.test(CFG.supabaseUrl + CFG.supabaseAnonKey));
const AUTH_KEY = 'tests.cloud.auth';    // donde supabase-js guarda la sesión

const K = {
  me: 'tests.cloud.me',             // {id, email, name} para abrir la app sin red
  answers: 'tests.cloud.q.answers', // cola de respuestas: {id, u, s: test, q: id de pregunta, k, t}
  exams: 'tests.cloud.q.exams',     // cola de exámenes
  resets: 'tests.cloud.q.resets',   // «Borrar mi progreso» pendientes
  imports: 'tests.cloud.q.imports', // progreso local que se suma a la cuenta
  pend: 'tests.cloud.pending',      // registro a medias (perfil por crear)
  status: 'tests.cloud.status',     // estado de subida de cada examen
  rank: 'tests.cloud.rank',         // última copia del ranking
  snap: 'tests.cloud.snap'          // posiciones en la última visita (avisos «te ha pasado»)
};
// Claves de la versión anterior (progreso por posición, sin usuario)
const LEG = { stats: id => 'tests.stats.' + id, exam: id => 'tests.exam.' + id, owner: 'tests.cloud.owner',
  answers: 'tests.cloud.answers', exams: 'tests.cloud.exams', resets: 'tests.cloud.resets', imp: 'tests.cloud.import' };
const LEGACY_SUBJECTS = ['sif', 'ii', 'ii-pci'];

const get = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const del = k => { try { localStorage.removeItem(k); } catch(e){} };
const has = k => { try { return localStorage.getItem(k) !== null; } catch(e){ return false; } };
const uuid = () => crypto.randomUUID ? crypto.randomUUID()
  : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
const ukey = (u, k) => 'tests.u.' + u + '.' + k;

// Árbol de datos: asignatura → (temas →) tests. Las asignaturas son las raíces (una clasificación cada una).
const kidsOf = n => n.parts || n.tests || null;
const leavesOf = n => kidsOf(n) ? kidsOf(n).flatMap(leavesOf) : [n];
const ROOTS = window.SUBJECTS || [];
const LEAVES = ROOTS.flatMap(leavesOf);
const rootOf = {}; ROOTS.forEach(r => leavesOf(r).forEach(l => { rootOf[l.id] = r.id; }));
const leaf = id => LEAVES.find(s => s.id === id);
const MIN_N = 20, MIN_EXAMS = 3, LAST = 5;

let sb = null, libPromise = null;
let uid = null;                        // usuario con sesión activa en supabase-js
let me = get(K.me, null);              // copia local: permite abrir la app sin red
if (me && !has(AUTH_KEY)) { me = null; del(K.me); }
let online = navigator.onLine;
let profileOk = false, needsProfile = false, boardsDone = false, verified = false;
let recovery = false;                  // se ha vuelto del enlace de «he olvidado mi contraseña»
let ended = '';                        // motivo del último cierre de sesión no pedido por el usuario
let signingOut = false;
let lastError = null, rankCache = null;
const listeners = [];
const emit = what => listeners.forEach(f => { try { f(what || 'state'); } catch(e){ console.error(e); } });

// ¿Vuelve del enlace del correo? (#access_token=…&type=recovery, o un error si el enlace ha caducado)
const H = new URLSearchParams(location.hash.slice(1));
let linkError = H.get('error_description') ? 'El enlace no es válido o ha caducado. Pide otro.' : '';
let recoveryPending = H.get('type') === 'recovery' && !!H.get('access_token');
if (linkError) history.replaceState(null, '', location.pathname + location.search);

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
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit', storageKey: AUTH_KEY }
    });
    // supabase recomienda no llamar a la API dentro de este callback: se difiere
    sb.auth.onAuthStateChange((ev, session) => setTimeout(() => onSession(ev, session), 0));
  }
  return true;
}
function onSession(ev, session){
  const id = session && session.user ? session.user.id : null;
  if (ev === 'PASSWORD_RECOVERY'){
    recovery = true; recoveryPending = false;
    history.replaceState(null, '', location.pathname + location.search);
  }
  if (!id){
    if (ev !== 'SIGNED_OUT' && !navigator.onLine) return;       // sin red: se mantiene la sesión guardada
    if (ev === 'INITIAL_SESSION' && recoveryPending) return;   // aún procesando el enlace del correo
    if (uid || me){
      if (!signingOut && ev === 'SIGNED_OUT') ended = 'Tu sesión ha caducado o se ha cerrado en otro dispositivo. Vuelve a entrar.';
      endSession();
    }
    return;
  }
  if (id !== uid){
    uid = id; profileOk = false; needsProfile = false; boardsDone = false; verified = false;
    me = Object.assign({}, me && me.id === id ? me : {}, { id, email: session.user.email }); set(K.me, me);
    ended = ''; linkError = '';
    adoptLocal(id);
    emit('auth');
  }
  if (!recovery) sync();
}
function endSession(){
  uid = null; me = null; profileOk = false; needsProfile = false; rankCache = null; recovery = false;
  del(K.me);
  emit('auth');
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
  if (/rate limit|too many|over_\w*_limit|for security purposes/i.test(s)) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
  if (/signups? not allowed|signup_disabled/i.test(s)) return 'El registro de cuentas está desactivado.';
  if (/session_not_found|refresh_token_not_found|auth session missing|jwt expired/i.test(s)) return 'Tu sesión ha caducado. Vuelve a entrar.';
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
const redirectUrl = () => location.origin + location.pathname;

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
  const { data, error } = await sb.auth.signUp({ email: email.trim(), password, options: { data: { display_name: name }, emailRedirectTo: redirectUrl() } });
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
  signingOut = true;
  try { if (sb) await sb.auth.signOut({ scope: 'local' }); } catch(e){}
  try { localStorage.removeItem(AUTH_KEY); } catch(e){}
  signingOut = false; ended = '';
  endSession();
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
async function sendReset(email){
  await need();
  const { error } = await sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectUrl() });
  if (error) throw fail(error);
}
async function finishRecovery(password){
  await changePassword(password);
  recovery = false;
  emit('auth');
  sync();
}
// Comprueba en el servidor que la sesión sigue viva (caducada o cerrada en otro dispositivo → acceso)
async function verifySession(){
  if (verified || !sb || !uid) return;
  const { error } = await sb.auth.getUser();
  if (error && !isNet(error) && (error.status === 401 || error.status === 403 || /session|jwt|token/i.test(error.message || ''))){
    ended = 'Tu sesión ha caducado o se ha cerrado en otro dispositivo. Vuelve a entrar.';
    signingOut = true;
    try { await sb.auth.signOut({ scope: 'local' }); } catch(e){}
    try { localStorage.removeItem(AUTH_KEY); } catch(e){}
    signingOut = false;
    endSession();
    throw new Error('session_ended');
  }
  if (!error) verified = true;
}

/* ---------- progreso local por usuario y migración de la versión anterior ---------- */
const testsOf = {};    // id de pregunta → tests donde está (una pregunta puede estar en dos)
LEAVES.forEach(s => s.questions.forEach(q => { const id = window.TESTS_QID(q.q); (testsOf[id] = testsOf[id] || []).push(s.id); }));
function mergeRec(a, b){
  if (!a) return { n: b.n, ok: b.ok, last: b.last };
  return { n: a.n + b.n, ok: a.ok + b.ok, last: a.last };     // se conserva la última respuesta que ya había
}
// Progreso por posición (versión anterior) → { test: { id de pregunta: {n, ok, last} } }
function convertLegacy(bySubject){
  const out = {}, map = window.LEGACY_QIDS || {};
  Object.entries(bySubject).forEach(([sid, st]) => {
    const ids = map[sid] || [];
    Object.entries(st || {}).forEach(([idx, r]) => {
      const id = ids[+idx]; if (!id || !r || !r.n) return;
      (testsOf[id] || []).forEach(t => { const m = out[t] = out[t] || {}; m[id] = mergeRec(m[id], { n: +r.n, ok: +r.ok || 0, last: r.last ? 1 : 0 }); });
    });
  });
  return out;
}
// Primera vez que esta cuenta entra en este dispositivo: se migra (una sola vez) lo que hubiera de la versión anterior
function adoptLocal(u){
  if (get(ukey(u, 'migrated'), false)) return;
  const legOwner = get(LEG.owner, null);
  if (!legOwner || legOwner === u){
    const legacy = {}; LEGACY_SUBJECTS.forEach(id => { const st = get(LEG.stats(id), null); if (st && Object.keys(st).length) legacy[id] = st; });
    const imports = get(K.imports, []);
    if (!legOwner && Object.keys(legacy).length){
      // progreso usado sin cuenta: se suma a la cuenta y se queda en este dispositivo para este usuario
      const conv = convertLegacy(legacy);
      Object.entries(conv).forEach(([t, m]) => {
        const key = ukey(u, 'stats.' + t), cur = get(key, {});
        Object.entries(m).forEach(([id, r]) => { cur[id] = mergeRec(cur[id], r); });
        set(key, cur);
      });
      if (Object.keys(conv).length) imports.push({ u, id: uuid(), stats: conv });
    }
    // importación pendiente de la versión anterior
    const li = get(LEG.imp, null);
    if (li && li.u === u && li.stats){ const conv = convertLegacy(li.stats); if (Object.keys(conv).length) imports.push({ u, id: li.id, stats: conv }); }
    set(K.imports, imports);
    // colas de la versión anterior de este usuario
    const qa = get(K.answers, []);
    get(LEG.answers, []).filter(e => e.u === u).forEach(e => {
      const id = ((window.LEGACY_QIDS || {})[e.s] || [])[e.q];
      (testsOf[id] || []).forEach(t => qa.push({ id: uuid(), u, s: t, q: id, k: e.k, t: e.t }));
    });
    set(K.answers, qa);
    const qe = get(K.exams, []); get(LEG.exams, []).filter(e => e.u === u).forEach(e => qe.push(e)); set(K.exams, qe);
    const cfg = get(LEG.exam('sif'), null); if (cfg && !has(ukey(u, 'exam.sif'))) set(ukey(u, 'exam.sif'), cfg);
    // se borran los datos «sin usuario» de la versión anterior
    LEGACY_SUBJECTS.forEach(id => { del(LEG.stats(id)); del(LEG.exam(id)); });
    [LEG.owner, LEG.imp, LEG.resets].forEach(del);
    const restA = get(LEG.answers, []).filter(e => e.u !== u), restE = get(LEG.exams, []).filter(e => e.u !== u);
    if (restA.length) set(LEG.answers, restA); else del(LEG.answers);
    if (restE.length) set(LEG.exams, restE); else del(LEG.exams);
  }
  set(ukey(u, 'migrated'), true);
}

/* ---------- registro local (lo llama app.js) ---------- */
const cur = () => uid || (me && me.id) || null;
const key = k => ukey(cur() || '_', k);
let timer = null;
function schedule(ms){ clearTimeout(timer); timer = setTimeout(sync, ms); }

function onAnswer(testId, qId, ok){
  const u = enabled && cur(); if (!u) return;
  const q = get(K.answers, []);
  q.push({ id: uuid(), u, s: testId, q: qId, k: ok ? 1 : 0, t: new Date().toISOString() });
  set(K.answers, q);
  schedule(3000);
}
function onExam(s, X){
  const u = enabled && cur(); if (!u) return null;
  const R = X.result;
  const rec = { u, client_id: uuid(), subject_id: s.id, preset_id: X.preset || null,
    taken_at: new Date(X.start).toISOString(), n_questions: X.list.length,
    n_correct: R.ok, n_wrong: R.ko, n_blank: R.bl, penalty: X.cfg.pen, duration_s: R.secs, grade: R.grade };
  const q = get(K.exams, []); q.push(rec); set(K.exams, q);
  setStatus(rec.client_id, { st: 'pending' });
  schedule(0);
  return rec.client_id;
}
function onReset(testId){
  const u = enabled && cur(); if (!u) return;
  set(K.answers, get(K.answers, []).filter(e => !(e.u === u && e.s === testId)));
  const r = get(K.resets, []); r.push({ u, s: testId }); set(K.resets, r);
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
  if (!enabled || !uid || recovery) return Promise.resolve();
  if (running){ again = true; return running; }
  running = (async () => { do { again = false; await syncOnce(); } while (again && uid); })()
    .finally(() => { running = null; });
  return running;
}
async function syncOnce(){
  try {
    await verifySession();
    if (!(await ensureProfile())) return;
    await registerBoards();
    await pushImports();
    await pushResets();
    await pushAnswers();
    await pushExams();
    await pullProgress();
    online = true; lastError = null;
  } catch(e){
    if (e && e.message === 'session_ended') return;
    if (isNet(e)) online = false;
    else { lastError = msg(e); console.warn('[tests] sincronización:', e); }
  }
  emit('sync');
}
async function registerBoards(){
  if (boardsDone) return;
  const list = [];
  LEAVES.forEach(s => {
    list.push({ subject_id: s.id, preset_id: null, penalty: s.examPen || 0, min_questions: MIN_N, asignatura_id: rootOf[s.id] });
    (s.presets || []).forEach(p => list.push({ subject_id: s.id, preset_id: p.id, penalty: p.pen, min_questions: p.idx.length, asignatura_id: rootOf[s.id] }));
  });
  await rpc('register_boards', { p: list });
  boardsDone = true;
}
async function pushImports(){
  for (const imp of get(K.imports, []).filter(x => x.u === uid)){
    await rpc('import_progress', { p_import_id: imp.id, p_stats: imp.stats });
    set(K.imports, get(K.imports, []).filter(x => x.id !== imp.id));
  }
}
async function pushResets(){
  for (const r of get(K.resets, []).filter(x => x.u === uid)){
    await rpc('reset_progress', { p_test: r.s });
    set(K.resets, get(K.resets, []).filter(x => !(x.u === r.u && x.s === r.s)));
  }
}
async function pushAnswers(){
  for (;;){
    const batch = get(K.answers, []).filter(e => e.u === uid).slice(0, 500);
    if (!batch.length) return;
    const rows = batch.map(e => ({ id: e.id, user_id: uid, subject_id: e.s, q_id: e.q, correct: !!e.k, answered_at: e.t }));
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
async function pullProgress(){
  const u = uid, rows = [];
  for (let from = 0; ; from += 1000){
    const { data, error } = await sb.from('question_progress').select('test_id,q_id,n,n_correct,last_correct')
      .order('test_id').order('q_id').range(from, from + 999);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 1000) break;
  }
  if (u !== uid || get(K.resets, []).some(r => r.u === u) || get(K.imports, []).some(r => r.u === u)) return;
  const map = {};
  rows.forEach(r => { (map[r.test_id] = map[r.test_id] || {})[r.q_id] = { n: r.n, ok: r.n_correct, last: r.last_correct ? 1 : 0 }; });
  get(K.answers, []).filter(e => e.u === u).forEach(e => {
    const m = map[e.s] = map[e.s] || {}; const r = m[e.q] || (m[e.q] = { n: 0, ok: 0, last: 0 });
    r.n++; if (e.k) r.ok++; r.last = e.k ? 1 : 0;
  });
  let changed = false;
  LEAVES.forEach(s => {
    const k = ukey(u, 'stats.' + s.id), next = map[s.id] || {};
    if (JSON.stringify(get(k, {})) !== JSON.stringify(next)){
      changed = true;
      if (Object.keys(next).length) set(k, next); else del(k);
    }
  });
  if (changed) emit('stats');
}

/* ---------- ranking: una clasificación por asignatura ---------- */
async function fetchRanking(){
  await need();
  if (!uid) throw new Error('Inicia sesión para ver el ranking.');
  let data;
  try { data = await rpc('ranking_data_v2'); } catch(e){ online = !isNet(e) && online; throw fail(e); }
  online = true;
  data.fetched = Date.now(); data.v = 2;
  rankCache = data; set(K.rank, data);
  return data;
}
function cachedRanking(){
  if (!rankCache) rankCache = get(K.rank, null);
  return rankCache && rankCache.v === 2 && rankCache.me === cur() ? rankCache : null;
}
const round = (v, d) => Math.round(v * 10 ** d) / 10 ** d;
// Preguntas distintas de una asignatura (una pregunta en dos tests cuenta una vez)
function uniqueCount(a){
  const r = ROOTS.find(x => x.id === a); const ids = new Set();
  if (r) leavesOf(r).forEach(s => s.questions.forEach(q => ids.add(window.TESTS_QID(q.q))));
  return ids.size;
}
// Filas de una clasificación. a: id de asignatura; tab: 'exams' | 'mastery' | 'week'
function board(data, a, tab){
  const names = {}; data.members.forEach(m => { names[m.id] = m.name; });
  const ex = {}; data.exams.filter(e => e.a === a).forEach(e => { ex[e.u] = { avg: +e.avg, n: +e.n }; });
  const mas = {}; data.mastery.filter(e => e.a === a).forEach(e => { mas[e.u] = +e.m; });
  const wk = {}; data.week.filter(e => e.a === a).forEach(e => { wk[e.u] = +e.c; });
  const total = uniqueCount(a);
  const rows = Object.keys(names).map(u => {
    const e = ex[u];
    const r = { id: u, name: names[u], value: null, n: e ? e.n : 0, missing: 0, me: u === data.me };
    if (tab === 'exams'){ if (r.n >= MIN_EXAMS) r.value = round(e.avg, 2); else r.missing = MIN_EXAMS - r.n; }
    else if (tab === 'mastery') r.value = total ? round(100 * Math.min(mas[u] || 0, total) / total, 1) : 0;
    else r.value = wk[u] || 0;
    return r;
  });
  const shown = rows.filter(r => tab === 'exams' ? r.value !== null : r.value > 0)
    .sort((x, y) => y.value - x.value || x.name.localeCompare(y.name, 'es'));
  shown.forEach(r => { r.pos = 1 + shown.filter(o => o.value > r.value).length; });
  const mine = shown.find(r => r.me) || rows.find(r => r.me) || null;
  return { rows: shown, me: mine, total };
}
// Posición que daría una nota recién hecha en la clasificación de su asignatura
function wouldRank(data, a, grade, clientId){
  const mineAll = data.mine.filter(x => x.a === a).sort((x, y) => String(y.t).localeCompare(String(x.t)));
  const prev = mineAll.filter(x => x.c !== clientId).map(x => +x.g);
  const already = mineAll.some(x => x.c === clientId);
  const cur_ = data.exams.find(e => e.u === data.me && e.a === a);
  const n = (cur_ ? +cur_.n : 0) - (already ? 1 : 0) + 1;
  if (n < MIN_EXAMS) return { missing: MIN_EXAMS - n };
  const g = [grade].concat(prev).slice(0, LAST);
  const avg = round(g.reduce((s, v) => s + v, 0) / g.length, 2);
  const others = data.exams.filter(e => e.a === a && e.u !== data.me && +e.n >= MIN_EXAMS).map(e => +e.avg);
  return { pos: 1 + others.filter(v => v > avg).length, avg };
}
// Avisos «Fulano te ha pasado en …» desde la última visita
function overtakes(data){
  const sk = ukey(data.me, 'snap'), snap = get(sk, null), now = {}, notes = [];
  ROOTS.forEach(({ id: a }) => {
    const pos = {}; board(data, a, 'exams').rows.forEach(r => { pos[r.id] = r.pos; });
    now[a] = pos;
    const before = snap ? snap[a] : null;
    const mine = pos[data.me], mineBefore = before ? before[data.me] : undefined;
    if (!before || mine == null || mineBefore == null) return;
    Object.keys(pos).forEach(u => {
      // estaba detrás de ti (o no aparecía) y ahora está delante
      if (u !== data.me && pos[u] < mine && (before[u] == null || before[u] >= mineBefore)){
        const m = data.members.find(x => x.id === u);
        if (m) notes.push({ name: m.name, board: a });
      }
    });
  });
  set(sk, now);
  return notes;
}

/* ---------- arranque ---------- */
function pending(){
  const u = cur();
  return { answers: get(K.answers, []).filter(e => e.u === u).length, exams: get(K.exams, []).filter(e => e.u === u).length };
}
if (enabled){
  window.addEventListener('online', () => {
    online = true;
    init().then(async ok => {
      // si la app se abrió sin red con la sesión guardada, se recupera ahora (y se renueva el token)
      if (ok && !uid && me){ const { data } = await sb.auth.getSession(); if (data && data.session) onSession('SIGNED_IN', data.session); }
      if (ok){ verified = false; sync(); }
      emit('net');
    });
  });
  window.addEventListener('offline', () => { online = false; emit('net'); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && uid){ verified = false; sync(); } });
  init().then(ok => { if (!ok) emit('net'); });
}

window.Cloud = {
  enabled, LEAVES, ROOTS, MIN_N, MIN_EXAMS,
  get user(){ return me; },                 // {id, email, name} o null
  get signedIn(){ return !!uid; },
  get needsProfile(){ return needsProfile; },
  get recovery(){ return recovery; },
  get recoveryPending(){ return recoveryPending; },
  get ended(){ return ended; },
  get linkError(){ return linkError; },
  get online(){ return online && navigator.onLine; },
  get lastError(){ return lastError; },
  on(f){ listeners.push(f); },
  key, rootOf: id => rootOf[id], init,
  signIn, signUp, signOut, createProfile, rename, changePassword, sendReset, finishRecovery,
  onAnswer, onExam, onReset, examStatus, counts, pending, sync,
  fetchRanking, cachedRanking, board, wouldRank, overtakes, uniqueCount
};
})();
