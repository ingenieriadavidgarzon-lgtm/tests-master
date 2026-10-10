# Tests del Máster

Web app de tests para estudiar las asignaturas del Máster en Ingeniería Industrial. Es una PWA: se puede instalar en el móvil o en el ordenador y funciona sin conexión.

Dirección (GitHub Pages): `https://USUARIO.github.io/tests-master/`

## Estructura

```
index.html               Página principal (carga el CSS, los datos y la lógica)
css/styles.css           Estilos (tema claro y oscuro, diseño móvil)
js/app.js                Lógica de la app (menú, práctica, examen, progreso)
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

## Probar en local

```
python3 -m http.server 8000
```

y abre `http://localhost:8000/`. (El service worker necesita `http://localhost` o `https`; no funciona abriendo el archivo directamente.)
