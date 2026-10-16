# Tests del Máster

Web app de tests para estudiar las asignaturas del Máster en Ingeniería Industrial. Es una PWA: se puede instalar en el móvil o en el ordenador y funciona sin conexión.

Para usarla hay que **iniciar sesión** con una cuenta de la clase (Supabase). El progreso se sincroniza entre dispositivos y hay un ranking por asignatura.

Dirección (GitHub Pages): `https://ingenieriadavidgarzon-lgtm.github.io/tests-master/`

## Estructura

```
index.html               Página principal (carga el CSS, los datos y la lógica)
css/styles.css           Estilos (tema claro y oscuro, diseño móvil)
css/fonts.css            Fuentes servidas desde la propia app (sin Google Fonts)
fonts/                   Archivos de las fuentes (WOFF2) y sus licencias (SIL Open Font License)
js/app.js                Lógica de la app (menú, práctica, examen, progreso)
js/qid.js                Id estable de cada pregunta (hash del enunciado)
js/legacy-map.js         Ids de las preguntas de la versión anterior (para migrar el progreso)
js/config.js             URL y anon key de Supabase
js/legal.js              Textos de Privacidad y Condiciones de uso, con su versión
js/vendor/               Copia local de supabase-js 2.117.2 (sin CDN de terceros)
js/cloud.js              Sesión, cola sin conexión, sincronización, migración y ranking
js/online-ui.js          Pantallas de acceso, perfil y ranking
js/learn.js              Módulo Aprender: lecciones, repaso espaciado y chuleta
data/sif.js              Sistemas Integrados de Fabricación (un test)
data/inst.js             Instalaciones Industriales: Climatización, PCI, Fontanería y Comunicaciones, con dos tests cada uno
data/learn/pci.js        Contenido de Aprender de Protección contra incendios
data/learn/fontaneria.js Contenido de Aprender de Fontanería y saneamiento (tema font, apartados fonta-X.Y)
assets/learn/pci/        Figuras de Aprender de PCI (WebP)
assets/learn/fontaneria/ Figuras de Aprender de Fontanería (WebP)
tools/check-learn.js     Comprobación del contenido de Aprender (node tools/check-learn.js)
supabase/schema.sql      SQL base de Supabase (tablas, RLS, funciones y vistas)
supabase/migrations/     Migraciones posteriores, en orden de fecha
manifest.webmanifest     Datos de instalación de la PWA
sw.js                    Service worker (caché sin conexión)
icons/                   Iconos de la app
```

Todas las rutas son relativas (`./`), así que la app funciona en cualquier subcarpeta, como la de GitHub Pages.

## Asignaturas, temas y tests

Hay tres niveles: **asignatura → tema → test**. Cada test tiene su propio progreso, modo práctica, modo examen y «Sobre las respuestas». La chuleta (`formulas`, `traps`) es del tema y se ve en todos sus tests.

```
Sistemas Integrados de Fabricación                 (asignatura con un único test: lleva questions)
Instalaciones Industriales                         (asignatura con temas: lleva parts)
├── Climatización                                  (tema: lleva tests y la chuleta)
│   ├── Temario         clim-temario   78 preguntas
│   └── Verificación    clim-verif    101 preguntas
├── Protección contra incendios
│   ├── Temario         pci-temario    88 preguntas (las 20 primeras son el examen real del 21-02-2026)
│   └── Verificación    pci-verif      87 preguntas
├── Fontanería y saneamiento
│   ├── Temario         font-temario  118 preguntas (las 20 primeras son el examen real del 21-02-2026)
│   ├── Verificación    font-verif     94 preguntas
│   └── Legionela       font-legionela 55 preguntas (tema 6, RD 487/2022; chuleta propia)
└── Comunicaciones                                 (sin examen real)
    ├── Temario         com-temario   111 preguntas (69 del banco del temario + 42 del test de teoría)
    └── Verificación    com-verif      56 preguntas (40 del banco de verificación + 16 del test de verificaciones)
```

Dentro de un test las preguntas van todas juntas, sin bloques. Los exámenes al azar de PCI, Fontanería y Comunicaciones usan por defecto 20 preguntas, −1/2 y 20 minutos; los de Climatización y SIF, 20 preguntas sin penalizar y sin límite de tiempo.

En Fontanería y saneamiento, «Sobre las respuestas» resume las discrepancias del temario (presión máxima de 500 o 550 kPa, reales decretos de legionela y de agua de consumo, norma de prueba de tuberías metálicas, pendiente del desagüe del lavabo y la pregunta 20 del examen real). Las preguntas que dependen de ellas llevan la marca «Sin confirmar» y su explicación dice qué dato se usa y cuál es el alternativo.

El test de Legionela (tema 6 de Fontanería, RD 487/2022) sale del banco FONTA_TEST_LEGIONELA: 55 preguntas, sin las preguntas cortas. Las explicaciones indican de qué pregunta del test de clase vienen. Tiene su propia chuleta («Cifras clave» de legionela), que sustituye a la del tema solo en ese test. La purga del fondo de los acumuladores es semanal según la diapositiva del tema 6 (el test de clase decía mensual), y esa pregunta lleva la marca «Sin confirmar». El tema 6 no tiene temario en PDF, así que no hay lecciones de Aprender; solo tres preguntas encajan en lecciones existentes y llevan `apt`.

En Comunicaciones se han quitado las preguntas cuya respuesta era una norma UNE (con todas las opciones UNE) y se han añadido las 58 del test de teoría y verificaciones (cuatro opciones; la explicación es breve porque el documento solo marca la respuesta).

En Comunicaciones pasa lo mismo con sus discrepancias: títulos de diapositivas copiados de otra asignatura, ISO/IEC 11081 por 11801, wifi 802.11b/g frente a a/b/g/n/ac, la errata «hora digital», los requisitos particulares de la ITC-BT-51 puestos bajo la ITC-BT-36 y la videovigilancia según la LOPD 15/1999 y la Instrucción 1/2006 de la AEPD. Las respuestas siguen lo que dicen las diapositivas. Una pregunta puede estar en dos tests: comparte id y su progreso cuenta en cada test.

### Añadir un test a un tema

Añade un objeto al array `tests` del tema en su archivo de datos (por ejemplo, en `data/inst.js`):

```js
{
  "id": "clim-ejercicios",           // único en toda la app; no lo cambies después
  "name": "Ejercicios",
  "short": "CLIM · Ejercicios",
  "examSize": 20,                    // preguntas por examen
  "examPen": 0,                      // penalización por defecto (0, 0.5, 1/3, 0.25); omítelo si es 0
  "examTime": 0,                     // minutos por defecto (0 = sin límite)
  "source": "De dónde salen las preguntas y lo fiables que son las respuestas.",
  "questions": [ … ]
}
```

Un test también puede tener exámenes reales en orden fijo:

```js
"presets": [ { "id": "real-2026", "name": "Examen real del 21-02-2026", "idx": [0, 1, 2], "t": 20, "pen": 0.5 } ]
```

(`idx` son las posiciones de las preguntas en `questions`, empezando en 0; `t` son minutos y `pen` la penalización.)

### Añadir un tema

Añade un objeto a `parts` de la asignatura con `id`, `name`, `short`, la chuleta (`formulas: [['Nombre', 'fórmula']]`, `trapsTitle`, `traps: ['…']`) y su array `tests`.

### Añadir una asignatura

1. Crea un archivo en `data/`, por ejemplo `data/mec.js`. Si tiene un solo test, sigue el modelo de `data/sif.js` (con `questions`). Si tiene temas, sigue el de `data/inst.js` (con `parts` y `tests`):

   ```js
   SUBJECTS.push({
     id: 'mec', name: 'Mecánica de Fluidos', short: 'MEC',
     source: '…', examSize: 20,
     questions: [ { q: 'Enunciado', o: ['A', 'B', 'C', 'D'], c: 2, e: 'Explicación.' } ]
   });
   ```

2. Regístralo en `index.html`, junto a las demás asignaturas y **antes** de `js/config.js`:

   ```html
   <script src="./data/mec.js"></script>
   ```

3. Añade `'./data/mec.js'` a la lista `ASSETS` de `sw.js` y sube la versión de caché.

Cada asignatura tiene su clasificación en el ranking automáticamente.

### Formato de una pregunta

```js
{ q, o, c, e, k?, d? }
```

| Campo | Qué es |
|---|---|
| `q` | Enunciado. |
| `o` | Opciones (array de textos): 2 (verdadero/falso), 3 o 4. |
| `c` | Índice de la opción correcta, empezando en 0. |
| `e` | Explicación (se muestra al fallar y en la corrección). No cites opciones por letra: se barajan. |
| `k` | *Opcional.* Líneas de cálculo paso a paso, array de textos. |
| `d` | *Opcional.* `true` si la respuesta está sin confirmar. |
| `apt` | *Opcional.* Apartado del temario en Aprender, por ejemplo `"pci-1.3"`. Activa «Estudiar este apartado» al fallarla. |

Las opciones se barajan, salvo en preguntas de 2 opciones o con opciones del tipo «A y B…» o «Ambas…». Una última opción que empiece por «Todas…» o «Ninguna…» se queda siempre al final.

**Id estable.** Cada pregunta se identifica por un hash corto de su enunciado normalizado (`js/qid.js`), no por su posición. Puedes añadir, quitar o reordenar preguntas sin romper el progreso. Si cambias el texto de un enunciado, esa pregunta empieza de cero.

## Aprender

En los temas de Instalaciones Industriales, la primera tarjeta es **Aprender**: lecciones cortas (una por apartado del temario, de 4 a 10 tarjetas, 3–5 minutos) que alternan explicaciones con comprobaciones. Hoy tienen contenido Protección contra incendios y Fontanería y saneamiento; en los demás temas aparece desactivada, con «Próximamente».

- **Entrada:** «Cómo pregunta este profesorado», las discrepancias del temario (si las hay, en un bloque aparte), «Continuar donde lo dejé», «Repaso de hoy», «Chuleta» y la lista de lecciones por tema con su estado (sin empezar, en curso, completada o para repasar).
- **Tarjetas:** explicación (con tabla o figura), aviso «Ojo» y comprobaciones: test (del banco o nuevo), «¿Cuál NO está?», completar la lista, ordenar, dato exacto, emparejar y reconocer una figura. Cada comprobación se corrige al momento y cita el apartado del temario. Si se falla, la tarjeta vuelve al final de la lección.
- **Al terminar:** resumen y «Practicar preguntas de este apartado», que abre el modo práctica solo con las preguntas de los dos tests que tienen ese `apt`.
- **Repaso de hoy:** sistema Leitner con cajas de 1, 3, 7 y 14 días. Entran las comprobaciones falladas, las de dato exacto y las tarjetas de la chuleta marcadas «No lo sabía». Como mucho 20 por sesión.
- **Desde los tests:** al fallar una pregunta con `apt` (en la práctica o en la corrección del examen) aparece «Estudiar este apartado».
- **Progreso:** por usuario, en `localStorage` y en la tabla `learn_progress` de Supabase (migración `supabase/migrations/20261011_aprender.sql`), con la misma cola sin conexión que las respuestas. Gana siempre el cambio más reciente, así que se puede avanzar en dos dispositivos. **No cuenta para el ranking.**

### Cómo añadir el módulo Aprender a un tema

1. **Contenido.** Crea `data/learn/<id del tema>.js` siguiendo el modelo de `data/learn/pci.js`:

   ```js
   window.LEARN = window.LEARN || {};
   window.LEARN.clim = {
     tema: 'clim', name: 'Climatización', source: 'De dónde sale el contenido',
     base: 'assets/learn/clim/',                       // carpeta de las figuras
     howAsks: ['…', '…'],                              // «Cómo pregunta este profesorado»: de 4 a 6 líneas
     discrep: ['…'],                                   // opcional: discrepancias del temario, en un bloque aparte de la entrada
     figs: { f01: { src: 'fig01.webp', w: 1200, h: 500, alt: 'Descripción completa', cap: 'Figura 1. Pie del temario.' } },
     temas: [ { n: 1, name: 'Nombre del tema 1', lessons: [
       { id: 'clim-1.1', apt: ['clim-1.1'], title: '1.1. Título del apartado', cards: [ … ], sum: ['3 a 5 puntos'] }
     ] } ],
     cheat: [ ['Concepto', 'Dato'] ]                   // chuleta para dar la vuelta
   };
   ```

   - `tema` es el id del tema en `data/` (por ejemplo `font`). El nombre del archivo y el prefijo de lecciones y apartados pueden ser otros (Fontanería usa `data/learn/fontaneria.js` y `fonta-1.1`).
   - `id` de la lección: `<prefijo>-<apartado>`; si un apartado largo se divide, `clim-2.4-1`, `clim-2.4-2`… con el mismo `apt`.
   - `title` empieza por el número del apartado («2.4. …»): es lo que se cita en las correcciones.

2. **Tarjetas** (`cards`). De 4 a 10 por lección y nunca dos explicaciones seguidas sin una comprobación entre medias:

   | Tipo | Campos |
   |---|---|
   | `ex` explicación | `h` título, `p` texto (HTML sencillo: `<b>`, unas 80 palabras), `tab: {h: [cabeceras], r: [[fila]]}` y `fig: 'f01'` opcionales |
   | `ojo` aviso | `p`. Los recuadros «Ojo» del temario, tal cual, y cada discrepancia en la lección afectada con el dato que se usa en el examen |
   | `q` test del banco | `ref`: id estable de la pregunta (`TESTS_QID(enunciado)`); usa su explicación |
   | `q` test nuevo | `q`, `o` (3 opciones), `c`, `e` |
   | `notin` ¿Cuál NO está? | `q` (con «NO»), `o` (3 o 4), `c`, `e` |
   | `fill` completar | `q`, `items` (textos con `{}` en cada hueco), `ans` (en orden), `dis` (distractores), `e` |
   | `order` ordenar | `q`, `items` en el orden correcto, `e`. Solo si el orden importa |
   | `num` dato exacto | `q`, `v` (número), `u` (unidades), `e`. Acepta coma o punto |
   | `match` emparejar | `q`, `pairs` (de 4 a 6 `[izquierda, derecha]`, sin repetir), `e` |
   | `img` reconocer figura | `fig`, `q`, `o`, `c`, `e`. El pie se muestra al responder |

   El id de cada comprobación es `<lección>:<hash del enunciado>`: si cambias el enunciado, su repaso empieza de cero.

3. **Figuras.** WebP de 1200 px de ancho como máximo y unos 150 KB, en `assets/learn/<tema>/`, con `alt` (lo que muestra la figura, para lectores de pantalla) y el pie del temario. Añádelas a `ASSETS` en `sw.js`.

4. **Asociación con el banco.** Añade `"apt": "<tema>-<apartado>"` a cada pregunta de los tests del tema, sin cambiar nada más. Si una pregunta no encaja en ningún apartado, no lleva `apt`.

5. **Registro.** En `index.html`, `<script src="./data/learn/<tema>.js"></script>` después de los datos de las asignaturas; en `sw.js`, el archivo, las figuras y la versión de caché nueva. La tarjeta Aprender del tema se activa sola.

6. **Comprobación.** `node tools/check-learn.js` revisa número de tarjetas, explicaciones seguidas, referencias al banco, figuras, parejas, huecos, duración estimada y qué preguntas se han quedado sin `apt`.

No hace falta ninguna migración nueva: la tabla `learn_progress` sirve para todos los temas.

## Importante: sube la versión de caché en cada cambio

La app se sirve desde la caché del service worker. **Cada vez que cambies cualquier archivo**, edita `sw.js` y sube la versión:

```js
const VERSION = 'tests-v5';   // antes 'tests-v4'
```

Así, al abrir la app, el navegador descarga la versión nueva y borra la caché antigua. Los cambios se ven la siguiente vez que se abre la app (o al recargar). Las llamadas a Supabase nunca se cachean.

## Inicio de sesión obligatorio

- Sin sesión, la única pantalla es la de acceso, con dos pestañas:
  - **Entrar:** email y contraseña.
  - **Crear cuenta:** email, contraseña, nombre visible (único, 3–20 caracteres; puede ser un apodo), código de grupo y las dos casillas de Condiciones de uso y Privacidad.

  Sin sesión solo se pueden ver, además, las páginas de Privacidad y Condiciones de uso.
- **«¿Has olvidado tu contraseña?»** envía el email de recuperación de Supabase. El enlace vuelve a la app, a la pantalla «Nueva contraseña».
- **La sesión se recuerda** en cada dispositivo hasta que se cierra.
- **Sin conexión:** con una sesión guardada, la app se abre y funciona: respuestas y exámenes van a una cola local y se suben al volver la red. Sin sesión guardada, la app muestra «Necesitas conexión para iniciar sesión la primera vez».
- **Sesión caducada o cerrada en otro dispositivo:** la app vuelve a la pantalla de acceso con un aviso, y lo que hubiera en la cola se sube al volver a entrar.
- **Progreso por usuario:** en cada dispositivo, el progreso local se guarda con el id del usuario (`tests.u.<id>.stats.<test>`). Dos personas que usen el mismo móvil no ven el progreso de la otra.
- **Progreso de antes:** quien usaba la app sin cuenta ve, en su primer inicio de sesión, cómo su progreso se sube a la cuenta y pasa al sistema de ids estables. Después se borran los datos locales «sin usuario». Se hace una sola vez por dispositivo y usuario.
- **Cerrar sesión** quita de la pantalla los datos del usuario y vuelve al acceso.

### Lo que protege el inicio de sesión (y lo que no)

El login protege la app, el progreso, los resultados y el ranking: sin sesión no se puede usar la app, y en Supabase ninguna tabla ni vista se puede leer sin estar autenticado (RLS).

Pero **los bancos de preguntas (`data/*.js`) son archivos estáticos de GitHub Pages**. Quien conozca la dirección de un archivo, por ejemplo `…/tests-master/data/inst.js`, puede abrirlo en el navegador sin iniciar sesión. El repositorio también es público, salvo que lo hagas privado; las páginas de GitHub Pages siguen siendo públicas aunque el repositorio sea privado.

Si quieres proteger también el contenido, estas son las opciones (no están implementadas):

1. **Servir las preguntas desde Supabase solo a usuarios autenticados.** Guardar los bancos en una tabla `questions` con RLS «solo autenticados del grupo» (o en Supabase Storage, en un bucket privado) y que la app los descargue tras iniciar sesión.
   - Supone: migrar los datos a Supabase, adaptar la app para cargarlos tras el login, cachearlos para el uso sin conexión (en IndexedDB o en la caché del service worker, solo tras iniciar sesión) y editar las preguntas en Supabase en lugar de en los archivos de `data/`.
   - Lo que consigue: el contenido deja de estar en GitHub Pages.
   - Lo que no consigue: cualquier usuario con sesión puede seguir copiando las preguntas desde el navegador.
2. **Repositorio privado + hosting con autenticación** (Netlify o Cloudflare Pages con acceso protegido, por ejemplo con Cloudflare Access). Supone sacar la app de GitHub Pages y gestionar otro servicio. Puede tener coste según el plan.
3. **Ofuscar o cifrar los archivos de datos.** No es una protección real: la clave para descifrarlos tendría que estar en la app. Solo dificulta la lectura casual.

Para un grupo de clase, lo razonable es la opción 1 si el contenido es sensible. Si no lo es, puedes dejarlo como está.

## Privacidad y condiciones de uso (RGPD y LOPDGDD)

### Qué hace la app

- **Páginas legales:** «Privacidad» y «Condiciones de uso», accesibles sin sesión y enlazadas en el acceso, el registro y «Tu cuenta». Los textos están en `js/legal.js`.
- **Consentimiento:** al crear la cuenta hay que marcar dos casillas (no premarcadas): las Condiciones de uso y el aviso de Privacidad. El perfil guarda la versión y la fecha de cada aceptación (`terms_version`, `terms_accepted_at`, `privacy_version`, `privacy_accepted_at`).
- **Usuarios que ya existían o documentos nuevos:** si la versión aceptada no coincide con la de `js/legal.js`, al abrir la app aparece la pantalla «Antes de seguir» con los documentos que han cambiado y sus casillas. Mientras no acepte, no se sube nada a Supabase y no aparece en el ranking. Si no acepta, puede cerrar sesión o borrar la cuenta.
- **Ranking voluntario:** interruptor «Aparecer en el ranking» en «Tu cuenta» (activado tras el consentimiento). Desactivado, el usuario desaparece de todas las clasificaciones para los demás: lo filtran las vistas `ranking_*`, las funciones `ranking_data*` y la política de lectura de `profiles` en Supabase. Puede seguir viendo el ranking y usando la app. Los avisos «Fulano te ha pasado» solo mencionan a usuarios visibles.
- **Derechos desde «Tu cuenta»:** cambiar el nombre visible y el email (con el enlace de confirmación de Supabase), descargar un JSON con todos sus datos (`export_my_data`) y borrar la cuenta escribiendo BORRAR (`delete_my_account`). El borrado elimina sus filas de todas las tablas, su usuario de Supabase Auth (con sus sesiones, identidades y registros de auditoría) y sus datos del dispositivo. Se hace con funciones SQL `SECURITY DEFINER` que solo actúan sobre `auth.uid()`; la app nunca tiene la `service_role`.
- **Última actividad:** `profiles.last_active_at` se actualiza al abrir la app (una vez al día) y al responder, hacer exámenes o avanzar en Aprender.
- **Sin terceros:** la app no carga analítica, píxeles ni scripts externos. Las fuentes se sirven desde `fonts/` (antes venían de Google Fonts, que recibía la IP de cada usuario) y supabase-js desde `js/vendor/` (antes, desde jsDelivr). La única conexión externa es la de Supabase. En el dispositivo solo se guardan la sesión y el progreso para usar la app sin conexión (`localStorage`), sin cookies.

### Cambiar los textos y sus versiones

1. Edita el texto en `js/legal.js` (`privacy.html` o `terms.html`).
2. Si el cambio es de fondo (qué datos, para qué, plazos, derechos, normas de uso), **sube su `version`** (por ejemplo `'1.0'` → `'1.1'`) y cambia `updated`. Al abrir la app, cada usuario tendrá que aceptar de nuevo solo ese documento. Para una errata, cambia el texto sin subir la versión.
3. Sube la versión de caché en `sw.js`, haz commit y push.

Los datos del responsable y la región están al principio de `js/legal.js` (`OWNER`, `EMAIL`, `REGION`).

### Conservación y borrado (SQL Editor)

```sql
-- Cuentas sin actividad durante más de 12 meses: las borra pg_cron cada día a las 03:17 (UTC).
-- Comprobar que la tarea está programada y su último resultado:
select jobname, schedule, active from cron.job;
select status, start_time, return_message from cron.job_run_details order by start_time desc limit 5;
-- Ejecutarla a mano (devuelve cuántas cuentas ha borrado):
select public.purge_inactive();

-- Borrar una cuenta concreta y todos sus datos:
select public.purge_user('uuid-del-usuario');

-- CIERRE DE LA APP: borra TODAS las cuentas y TODOS los datos. No está programada.
-- Ejecútala solo cuando decidas cerrar la app (no se puede deshacer):
select public.purge_everything('BORRAR TODO');
```

Si `cron.job` no existe, pg_cron no está activado: actívalo en *Database → Extensions → pg_cron* y vuelve a ejecutar la migración `20261011_privacidad_y_condiciones.sql`, o ejecuta `select public.purge_inactive();` a mano una vez al mes. Estas funciones no se pueden llamar desde la app: solo desde el SQL Editor o pg_cron.

### Región de Supabase

La región está en *Project Settings → General → Region* y debe coincidir con `REGION` en `js/legal.js`. Si el proyecto está fuera de la Unión Europea, pasarlo a una región europea (por ejemplo *Central EU (Frankfurt)*) supone:

1. Crear un proyecto nuevo en esa región: Supabase no permite cambiar la región de un proyecto existente.
2. Configurarlo igual (email, URLs de redirección, código de grupo) y ejecutar `schema.sql` y todas las migraciones.
3. Copiar los datos: un volcado del proyecto antiguo (*Database → Backups*, o `pg_dump` con la cadena de conexión) que incluya `auth.users` y las tablas de `public`, y restaurarlo en el nuevo. Así las cuentas conservan su contraseña. Si no se copian, cada usuario tendría que registrarse de nuevo y perdería su progreso.
4. Cambiar la URL y la anon key en `js/config.js`, subir la versión de caché y publicar. Todos tendrán que volver a iniciar sesión.
5. Comprobar que todo funciona y borrar el proyecto antiguo.

Mientras siga fuera de la UE, la transferencia internacional se ampara en el acuerdo de tratamiento de datos de Supabase (con cláusulas contractuales tipo), y el aviso de Privacidad debería indicarlo.

## Cuentas y ranking (Supabase)

### Configuración (una vez)

1. **Crear el proyecto.** En https://supabase.com → *New project*: nombre `tests-master`, una contraseña de base de datos (guárdala), región *West EU (Ireland)* o *Central EU (Frankfurt)*, plan Free.
2. **Login con email.** *Authentication → Sign In / Providers → Email*: activado, *Allow new users to sign up* activado y *Confirm email* desactivado (recomendado para un grupo pequeño).
3. **URLs de redirección.** *Authentication → URL Configuration*:
   - *Site URL:* `https://ingenieriadavidgarzon-lgtm.github.io/tests-master/`
   - *Redirect URLs* → *Add URL:* `https://ingenieriadavidgarzon-lgtm.github.io/tests-master/**`

   Sin esto, el enlace de «¿Has olvidado tu contraseña?» no vuelve a la app.
4. **SQL.** *SQL Editor → New query*: pega todo `supabase/schema.sql` y pulsa *Run*. Después, pega y ejecuta **cada archivo de `supabase/migrations/` en orden de fecha**. Todos se pueden volver a ejecutar sin perder datos.
5. **Código de grupo.** En el mismo editor:
   ```sql
   update public.app_config set value = 'TU-CODIGO' where key = 'group_code';
   ```
   Para cambiarlo más adelante, ejecuta la misma línea con otro código. Quien ya tiene cuenta sigue dentro; el código solo se pide al registrarse.
6. **URL y key.** *Project Settings → API* (o *API Keys*): copia la *Project URL* y la clave pública (*anon public*, o *publishable*) en `js/config.js`. **Nunca** pongas la `service_role` ni la `secret`. La anon key es pública: la seguridad está en las políticas RLS.
7. Sube la versión de caché en `sw.js`, haz commit y push.

### Cómo funciona

- **Registro:** el perfil lo crea la función `create_profile`, que valida el código de grupo en el servidor y guarda la versión y la fecha de aceptación de las Condiciones de uso y del aviso de Privacidad. Una cuenta sin perfil no puede leer ni escribir nada. En el ranking solo se ve el nombre visible, nunca el email.
- **Progreso:** cada respuesta se guarda en local y en una cola que se sube a `answer_events` (test + id de pregunta). El servidor mantiene un resumen por pregunta (`question_progress`) y la app lo descarga al abrirse: el móvil y el ordenador ven el mismo progreso.
- **Seguridad (RLS):** cada usuario solo escribe sus datos. Las vistas del ranking (`ranking_*_v2`) y la función `ranking_data_v2` solo las pueden leer los usuarios autenticados del grupo. El rol anónimo no puede leer ninguna tabla ni vista; solo puede llamar a `signup_check` (comprobación previa al registro).

### Reglas del ranking

- **Dos clasificaciones, una por asignatura:** Sistemas Integrados de Fabricación e Instalaciones Industriales. Instalaciones combina los nueve tests (Temario y Verificación de Climatización, PCI, Fontanería y Comunicaciones, más Legionela de Fontanería). Un test nuevo entra solo en la clasificación de su asignatura: la app lo registra en la tabla `boards` la primera vez que sincroniza, sin migración.
- **Cuenta para el ranking** un examen con al menos 20 preguntas y la penalización por defecto de su test (Climatización y SIF: sin penalizar; PCI, Fontanería y Comunicaciones: −1/2). Los **exámenes reales** de PCI y de Fontanería también cuentan para Instalaciones. La pantalla de configuración del examen indica si cuenta.
- El servidor vuelve a calcular la nota y **rechaza** resultados imposibles: nota fuera de 0–10, aciertos + fallos + en blanco distinto del número de preguntas, nota que no corresponde a aciertos y fallos, o duración menor de 1 minuto.
- **Exámenes:** media de tus 5 últimos exámenes que cuentan dentro de la asignatura; hacen falta 3 para aparecer.
- **Dominio:** porcentaje de preguntas dominadas (última respuesta correcta) sobre el total de preguntas distintas de la asignatura. Una pregunta que está en dos tests cuenta una vez.
- **Esta semana:** preguntas respondidas desde el lunes a las 00:00 (hora de Madrid).
- **Avisos:** en el menú, «Fulano te ha pasado en Instalaciones Industriales». En el resultado de un examen, «Con esta nota entrarías N.º en …».
- La penalización por defecto de cada test queda fijada en la tabla `boards` la primera vez que se usa. Si después la cambias en el archivo de datos, cámbiala también ahí:
  ```sql
  update public.boards set penalty = 0.5 where id = 'clim-verif';
  ```

### Administración (SQL Editor)

```sql
-- Ver los usuarios del grupo, si están en el ranking y su última actividad
select display_name, in_ranking, last_active_at, created_at from public.profiles order by created_at;
-- Borrar una cuenta y todos sus datos (también sus registros de Auth)
select public.purge_user((select id from public.profiles where display_name = 'Nombre'));
-- Anular un examen concreto (deja de contar para el ranking)
update public.exam_results set ranked = false where id = 123;
```

## Probar en local

```
python3 -m http.server 8000
```

y abre `http://localhost:8000/`. El service worker necesita `http://localhost` o `https`; no funciona abriendo el archivo directamente. Con `js/config.js` de ejemplo (`TU-PROYECTO`), la app funciona sin cuentas, solo con progreso local.
