# Tests del Máster

Web app de tests para estudiar las asignaturas del Máster en Ingeniería Industrial. Es una PWA: se puede instalar en el móvil o en el ordenador y funciona sin conexión.

Dirección (GitHub Pages): `https://USUARIO.github.io/tests-master/`

## Estructura

```
index.html               Página principal (carga el CSS, los datos y la lógica)
css/styles.css           Estilos (tema claro y oscuro, diseño móvil)
js/app.js                Lógica de la app (menú, práctica, examen, progreso)
js/config.js             URL y anon key de Supabase
js/cloud.js              Cuentas, cola sin conexión, sincronización y cálculo del ranking
js/online-ui.js          Pantallas de cuenta, perfil y ranking
supabase/schema.sql      Todo el SQL de Supabase (tablas, RLS, funciones y vistas)
data/sif.js              Sistemas Integrados de Fabricación
data/inst.js             Instalaciones Industriales (temas: Climatización y Protección contra incendios)
manifest.webmanifest     Datos de instalación de la PWA
sw.js                    Service worker (caché sin conexión)
icons/                   Iconos de la app
```

Todas las rutas son relativas (`./`), así que la app funciona en cualquier subcarpeta, como la de GitHub Pages.

## Añadir una asignatura

1. Crea un archivo en `data/`, por ejemplo `data/mec.js`:

   ```js
   // Mecánica de fluidos — banco de N preguntas
   SUBJECTS.push({
     id: 'mec',                       // único; se usa en las claves de progreso
     name: 'Mecánica de Fluidos',
     short: 'MEC',                    // sigla de la tarjeta
     source: 'De dónde salen las preguntas y lo fiables que son las respuestas.',
     examSize: 20,                    // preguntas por examen
     // examPen: 1/2,                 // penalización por defecto (0, 1/2, 1/3, 1/4)
     // examTime: 20,                 // minutos por defecto (0 = sin límite)
     // formulas: [['Bernoulli', 'p + ½ρv² + ρgz = cte']],   // chuleta (opcional)
     // traps: ['Trampa que se repite…'],                     // chuleta (opcional)
     blocks: [],
     questions: [
       { q: 'Enunciado', o: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], c: 2, e: 'Explicación.' }
     ]
   });
   ```

2. Regístralo en `index.html`, junto a las demás asignaturas y **antes** de `js/app.js`:

   ```html
   <script src="./data/mec.js"></script>
   ```

3. Añade `'./data/mec.js'` a la lista `ASSETS` de `sw.js` (para que funcione sin conexión) y sube la versión de caché (ver más abajo).

Usa como modelo `data/sif.js`.

## Añadir un tema a una asignatura con temas

Las asignaturas con temas (como Instalaciones Industriales) llevan `parts` en lugar de `questions`. Cada tema es como una asignatura: tiene su propio progreso, modos y chuleta. Para añadir uno, añade otro objeto al array `parts` de `data/inst.js`:

```js
{
  "id": "ii-elec",                    // único en toda la app
  "name": "Electricidad",
  "short": "ELEC",
  "source": "…",
  "examSize": 20,
  "questions": [ … ]
}
```

Opcionalmente, un tema puede tener exámenes reales en orden fijo:

```js
"presets": [ { "id": "real-2026", "name": "Examen real del 21-02-2026", "idx": [0, 5, 7], "t": 20, "pen": 0.5 } ]
```

(`idx` son las posiciones de las preguntas en `questions`, empezando en 0; `t` son minutos y `pen` la penalización.)

## Formato de una pregunta

```js
{ q, o, c, e, k?, d? }
```

| Campo | Qué es |
|---|---|
| `q` | Enunciado. |
| `o` | Opciones (array de textos). |
| `c` | Índice de la opción correcta, empezando en 0. |
| `e` | Explicación (se muestra al fallar y en la corrección). |
| `k` | *Opcional.* Líneas de cálculo, array de textos. |
| `d` | *Opcional.* `true` si la respuesta está sin confirmar. |

Las opciones se barajan, salvo en preguntas de 2 opciones o con opciones del tipo «A y B…» o «Ambas…». Una última opción que empiece por «Todas…» o «Ninguna…» se queda siempre al final.

El progreso se guarda en el navegador (`localStorage`) con las claves `tests.stats.<id>` y `tests.exam.<id>`: no cambies el `id` de una asignatura o tema ya en uso, o se perderá su progreso.

## Importante: sube la versión de caché en cada cambio

La app se sirve desde la caché del service worker. **Cada vez que cambies cualquier archivo**, edita `sw.js` y sube la versión:

```js
const VERSION = 'tests-v2';   // antes 'tests-v1'
```

Así, al abrir la app, el navegador descarga la versión nueva y borra la caché antigua. Los cambios se ven la siguiente vez que se abre la app (o al recargar).

## Cuentas y ranking (Supabase)

### Configuración (una vez)

1. **Crear el proyecto.** En https://supabase.com → *New project*: nombre `tests-master`, una contraseña de base de datos (guárdala), región *West EU (Ireland)* o *Central EU (Frankfurt)*, plan Free.
2. **Login con email.** *Authentication → Sign In / Providers → Email*: activado, y *Allow new users to sign up* activado.
3. **Sin confirmación por email** (recomendado para un grupo pequeño): en la misma pantalla, desactiva *Confirm email* y guarda. En *Authentication → URL Configuration*, pon como *Site URL* la dirección de GitHub Pages.
4. **SQL.** *SQL Editor → New query*: pega todo `supabase/schema.sql` y pulsa *Run*. Se puede volver a ejecutar sin perder datos.
5. **Código de grupo.** En el mismo editor:
   ```sql
   update public.app_config set value = 'TU-CODIGO' where key = 'group_code';
   ```
   Para cambiarlo más adelante, ejecuta la misma línea con otro código. Quien ya tiene cuenta sigue dentro; el código solo se pide al registrarse.
6. **URL y key.** *Project Settings → API* (o *API Keys*): copia la *Project URL* y la clave pública (*anon public*, o *publishable*) en `js/config.js`. **Nunca** pongas la `service_role` / `secret`. La anon key es pública: la seguridad está en las políticas RLS.
7. Sube la versión de caché en `sw.js`, haz commit y push.

Mientras `js/config.js` tenga los valores de ejemplo, la app no muestra nada de cuentas y funciona como antes.

### Cómo funciona

- **Registro:** email, contraseña, nombre visible (único, 3–20 caracteres) y código de grupo. El perfil lo crea la función `create_profile`, que valida el código en el servidor. Una cuenta sin perfil no puede leer ni escribir nada. En el ranking solo se ve el nombre visible, nunca el email.
- **Progreso:** cada respuesta se guarda en local (como siempre) y en una cola que se sube a `answer_events`. El servidor mantiene un resumen por pregunta (`question_stats`) y la app lo descarga al abrirse, así el móvil y el ordenador ven el mismo progreso.
- **Primera vez que entras en un dispositivo:** el progreso local que tenías sin cuenta se suma a la cuenta sin perder nada.
- **Sin conexión:** respuestas y exámenes se quedan en la cola local y se suben solos al recuperar la red.
- **Seguridad (RLS):** cada usuario solo escribe sus datos; el ranking (vistas `ranking_exams`, `ranking_mastery`, `ranking_week` y la función `ranking_data`) solo lo pueden leer los usuarios del grupo.

### Reglas del ranking

- **Cuenta para el ranking** un examen con al menos 20 preguntas y la penalización por defecto de esa asignatura o tema (PCI: −1/2; SIF y Climatización: sin penalizar). La pantalla de configuración del examen lo indica.
- El **examen real** de PCI cuenta en su propia clasificación.
- El servidor vuelve a calcular la nota y **rechaza** resultados imposibles: nota fuera de 0–10, aciertos + fallos + en blanco distinto del número de preguntas, nota que no corresponde a aciertos y fallos, o duración menor de 1 minuto.
- **Exámenes:** media de tus 5 últimos exámenes que cuentan; hacen falta 3 para aparecer.
- **General:** media de tus medias en cada asignatura o tema donde tienes al menos 3.
- **Dominio:** porcentaje de preguntas cuya última respuesta fue correcta.
- **Esta semana:** preguntas respondidas desde el lunes a las 00:00 (hora de Madrid).
- Las asignaturas y temas nuevos aparecen solos en el ranking. La penalización por defecto queda fijada en la tabla `boards` la primera vez que se usa; si después la cambias en el archivo de datos, cámbiala también ahí:
  ```sql
  update public.boards set penalty = 0.5 where id = 'mec';
  ```

### Administración (SQL Editor)

```sql
-- Ver los usuarios del grupo
select display_name, created_at from public.profiles order by created_at;
-- Borrar una cuenta y todos sus datos
delete from auth.users where id = (select id from public.profiles where display_name = 'Nombre');
-- Anular un examen concreto (no cuenta para el ranking)
update public.exam_results set ranked = false where id = 123;
```

## Probar en local

```
python3 -m http.server 8000
```

y abre `http://localhost:8000/`. (El service worker necesita `http://localhost` o `https`; no funciona abriendo el archivo directamente.)
