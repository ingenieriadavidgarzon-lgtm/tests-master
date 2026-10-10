# Tests del Máster

Web app de tests para estudiar las asignaturas del Máster en Ingeniería Industrial. Es una PWA: se puede instalar en el móvil o en el ordenador y funciona sin conexión.

Para usarla hay que **iniciar sesión** con una cuenta de la clase (Supabase). El progreso se sincroniza entre dispositivos y hay un ranking por asignatura.

Dirección (GitHub Pages): `https://ingenieriadavidgarzon-lgtm.github.io/tests-master/`

## Estructura

```
index.html               Página principal (carga el CSS, los datos y la lógica)
css/styles.css           Estilos (tema claro y oscuro, diseño móvil)
js/app.js                Lógica de la app (menú, práctica, examen, progreso)
js/qid.js                Id estable de cada pregunta (hash del enunciado)
js/legacy-map.js         Ids de las preguntas de la versión anterior (para migrar el progreso)
js/config.js             URL y anon key de Supabase
js/cloud.js              Sesión, cola sin conexión, sincronización, migración y ranking
js/online-ui.js          Pantallas de acceso, perfil y ranking
data/sif.js              Sistemas Integrados de Fabricación (un test)
data/inst.js             Instalaciones Industriales: Climatización y PCI, con dos tests cada uno
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
└── Protección contra incendios
    ├── Temario         pci-temario    88 preguntas (las 20 primeras son el examen real del 21-02-2026)
    └── Verificación    pci-verif      87 preguntas
```

Dentro de un test las preguntas van todas juntas, sin bloques. Una pregunta puede estar en dos tests: comparte id y su progreso cuenta en cada test.

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

Las opciones se barajan, salvo en preguntas de 2 opciones o con opciones del tipo «A y B…» o «Ambas…». Una última opción que empiece por «Todas…» o «Ninguna…» se queda siempre al final.

**Id estable.** Cada pregunta se identifica por un hash corto de su enunciado normalizado (`js/qid.js`), no por su posición. Puedes añadir, quitar o reordenar preguntas sin romper el progreso. Si cambias el texto de un enunciado, esa pregunta empieza de cero.

## Importante: sube la versión de caché en cada cambio

La app se sirve desde la caché del service worker. **Cada vez que cambies cualquier archivo**, edita `sw.js` y sube la versión:

```js
const VERSION = 'tests-v5';   // antes 'tests-v4'
```

Así, al abrir la app, el navegador descarga la versión nueva y borra la caché antigua. Los cambios se ven la siguiente vez que se abre la app (o al recargar). Las llamadas a Supabase nunca se cachean.

## Inicio de sesión obligatorio

- Sin sesión, la única pantalla es la de acceso, con dos pestañas:
  - **Entrar:** email y contraseña.
  - **Crear cuenta:** email, contraseña, nombre visible (único, 3–20 caracteres) y código de grupo.

  Ninguna otra pantalla es accesible, tampoco escribiendo una dirección con `#…`.
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

- **Registro:** el perfil lo crea la función `create_profile`, que valida el código de grupo en el servidor. Una cuenta sin perfil no puede leer ni escribir nada. En el ranking solo se ve el nombre visible, nunca el email.
- **Progreso:** cada respuesta se guarda en local y en una cola que se sube a `answer_events` (test + id de pregunta). El servidor mantiene un resumen por pregunta (`question_progress`) y la app lo descarga al abrirse: el móvil y el ordenador ven el mismo progreso.
- **Seguridad (RLS):** cada usuario solo escribe sus datos. Las vistas del ranking (`ranking_*_v2`) y la función `ranking_data_v2` solo las pueden leer los usuarios autenticados del grupo. El rol anónimo no puede leer ninguna tabla ni vista; solo puede llamar a `signup_check` (comprobación previa al registro).

### Reglas del ranking

- **Dos clasificaciones, una por asignatura:** Sistemas Integrados de Fabricación e Instalaciones Industriales. Instalaciones combina los cuatro tests (Climatización Temario y Verificación, PCI Temario y Verificación).
- **Cuenta para el ranking** un examen con al menos 20 preguntas y la penalización por defecto de su test (Climatización y SIF: sin penalizar; PCI: −1/2). El **examen real** de PCI también cuenta para Instalaciones. La pantalla de configuración del examen indica si cuenta.
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
-- Ver los usuarios del grupo
select display_name, created_at from public.profiles order by created_at;
-- Borrar una cuenta y todos sus datos
delete from auth.users where id = (select id from public.profiles where display_name = 'Nombre');
-- Anular un examen concreto (deja de contar para el ranking)
update public.exam_results set ranked = false where id = 123;
```

## Probar en local

```
python3 -m http.server 8000
```

y abre `http://localhost:8000/`. El service worker necesita `http://localhost` o `https`; no funciona abriendo el archivo directamente. Con `js/config.js` de ejemplo (`TU-PROYECTO`), la app funciona sin cuentas, solo con progreso local.
