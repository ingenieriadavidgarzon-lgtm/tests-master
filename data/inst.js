// Instalaciones Industriales: asignatura → tema (parts) → test (tests) → preguntas
// Cada test tiene su progreso, su modo práctica y su modo examen. La chuleta (formulas, traps) es del tema.
// Pregunta: { q, o, c, e, k?, d? } — q enunciado, o opciones, c índice de la correcta, e explicación,
// k líneas de cálculo (opcional), d respuesta sin confirmar (opcional).
SUBJECTS.push({
 "id": "inst",
 "name": "Instalaciones Industriales",
 "short": "II",
 "parts": [
  {
   "id": "clim",
   "name": "Climatización",
   "short": "CLIM",
   "formulas": [
    [
     "Rendimiento directo",
     "η = ṁ·Cp·ΔT / (F·PCI)"
    ],
    [
     "Rendimiento indirecto",
     "η = 100 − (Ph + Pi)"
    ],
    [
     "Renovable bomba de calor",
     "ERES = Q·(1 − 1/SCOP)"
    ],
    [
     "Presión dinámica (aire 20 ºC)",
     "Pv ≈ 0,602·v² (Pa)"
    ],
    [
     "Infiltraciones, sensible",
     "Qs = 0,33·Qi·Δt"
    ],
    [
     "Infiltraciones, latente",
     "Ql = 0,84·Qi·ΔW"
    ],
    [
     "Radiación por huecos",
     "Qs1 = S·R·f (×1,2 marco metálico)"
    ],
    [
     "Presión",
     "1 mm.c.a. ≈ 9,8 Pa"
    ]
   ],
   "trapsTitle": "Cifras clave",
   "traps": [
    "Freecooling obligatorio: más de 70 kW en refrigeración (IT 1.2.4.5.1).",
    "Recuperación de calor obligatoria: más de 0,28 m³/s expulsados (IT 1.2.4.5.2).",
    "Aire exterior por persona: IDA 1 = 20, IDA 2 = 12,5, IDA 3 = 8, IDA 4 = 5 dm³/s.",
    "Mantenimiento: 5–70 kW empresa mantenedora; más de 70 kW con contrato; más de 5.000 kW en calor, 1.000 kW en frío o solar de más de 400 kW, con técnico titulado.",
    "Registro de mantenimiento: se conserva al menos 5 años.",
    "DB HE 4: renovable mínima del 70 % (60 % si el ACS es inferior a 5.000 l/día); se exige con ACS superior a 100 l/día.",
    "Instrucciones técnicas: IT 1 diseño, IT 2 montaje, IT 3 mantenimiento y uso, IT 4 inspección."
   ],
   "tests": [
    {
     "id": "clim-temario",
     "name": "Temario",
     "short": "CLIM · Temario",
     "examSize": 20,
     "source": "Banco de todo el temario de Climatización (Unidad 2, temas 1 a 6): 78 preguntas tipo test. Las respuestas son las de las soluciones comentadas del documento.",
     "questions": [
      {
       "q": "Según el temario, el reglamento principal de aplicación a una instalación de climatización enfocada a las personas es:",
       "o": [
        "RSIF",
        "RIPCI",
        "REBT",
        "RITE"
       ],
       "c": 3,
       "e": "La climatización de confort se rige por el RITE; la de procesos, por el RSIF."
      },
      {
       "q": "Una instalación de climatización enfocada a un proceso industrial se rige principalmente por:",
       "o": [
        "RSIF (RD 552/2019)",
        "CTE DB HE",
        "RITE",
        "RIPCI (RD 513/2017)"
       ],
       "c": 0,
       "e": "Las instalaciones de proceso industrial se rigen por el Reglamento de Seguridad para Instalaciones Frigoríficas (RSIF); el RITE es para el confort de las personas. Fuente: tabla 1 del tema 1."
      },
      {
       "q": "El RITE fue aprobado por el:",
       "o": [
        "RD 314/2006",
        "RD 1027/2007",
        "RD 842/2002",
        "RD 552/2019"
       ],
       "c": 1,
       "e": "RD 314/2006 es el CTE; RD 842/2002 el REBT; RD 552/2019 el RSIF."
      },
      {
       "q": "Las dos modificaciones principales del RITE citadas en el temario son:",
       "o": [
        "RD 238/2013 y RD 732/2019",
        "RD 732/2019 y RD 178/2021",
        "RD 238/2013 y RD 178/2021",
        "RD 513/2017 y RD 238/2013"
       ],
       "c": 2,
       "e": "RD 732/2019 modifica el CTE, no el RITE."
      },
      {
       "q": "En la organización normativa por rango técnico, el nivel 3 corresponde a:",
       "o": [
        "Las ordenanzas municipales",
        "Los reglamentos específicos",
        "El Código Técnico de la Edificación",
        "Las normas UNE de apoyo"
       ],
       "c": 3,
       "e": "Nivel 1 CTE, nivel 2 reglamentos, nivel 3 normas UNE."
      },
      {
       "q": "Que la reglamentación del RITE sea de carácter básico implica que:",
       "o": [
        "Las comunidades autónomas pueden añadir requisitos adicionales",
        "Solo aplica a viviendas",
        "No es de obligado cumplimiento",
        "Sustituye a las normas UNE"
       ],
       "c": 0,
       "e": "Al ser normativa básica del Estado es de mínimos: las comunidades autónomas pueden desarrollarla y añadir requisitos más exigentes. Fuente: tema 1, apartado 2.2."
      },
      {
       "q": "Según la tabla de ASHRAE del temario, una persona sentada con movimientos moderados en una oficina emite:",
       "o": [
        "116 W",
        "73 W",
        "161 W",
        "176 W"
       ],
       "c": 2,
       "e": "116 W es sentado sin actividad; 176 W conducción o de pie."
      },
      {
       "q": "La eficiencia de un sistema de calefacción por efecto Joule es:",
       "o": [
        "Mayor que 3",
        "1",
        "0,5",
        "Depende de la temperatura exterior"
       ],
       "c": 1,
       "e": "1 kW eléctrico produce 1 kW térmico."
      },
      {
       "q": "¿Qué elemento permite que un equipo de aire acondicionado funcione también en modo calor (bomba de calor)?",
       "o": [
        "La válvula de expansión termostática",
        "El desuperheater",
        "La válvula de 4 vías",
        "El vaso de expansión"
       ],
       "c": 2,
       "e": "La válvula de 4 vías invierte el ciclo."
      },
      {
       "q": "Según el temario, desde cuándo no podrán instalarse calderas de combustible fósil en viviendas:",
       "o": [
        "Enero de 2030",
        "Ya estaban prohibidas desde 2021",
        "Enero de 2040",
        "Enero de 2026"
       ],
       "c": 3,
       "e": "En industria se permiten hasta 2030 y el fin de uso completo se fija en 2040."
      },
      {
       "q": "¿Cuál de estos elementos NO forma parte de un colector solar plano?",
       "o": [
        "Válvula de 4 vías",
        "Placa absorbente",
        "Aislamiento térmico",
        "Cubierta transparente"
       ],
       "c": 0,
       "e": "Partes: cubierta, placa absorbente, tubos del fluido captador, aislamiento y carcasa."
      },
      {
       "q": "La diferencia entre PCS y PCI es que el PCS:",
       "o": [
        "Solo se aplica a combustibles sólidos",
        "Incluye el calor de vaporización del vapor de agua de los humos",
        "No tiene en cuenta el vapor de agua",
        "Es siempre menor que el PCI"
       ],
       "c": 1,
       "e": "Por eso PCS > PCI y las calderas de condensación aprovechan esa diferencia."
      },
      {
       "q": "Una combustión realizada con la cantidad exacta de oxígeno se denomina:",
       "o": [
        "Incompleta",
        "Con exceso",
        "Estequiométrica",
        "Atmosférica"
       ],
       "c": 2,
       "e": "Incompleta: falta O₂; con exceso: sobra O₂."
      },
      {
       "q": "¿De qué NO depende el punto de rocío de los humos según el temario?",
       "o": [
        "Del tipo de combustible",
        "Del exceso de aire",
        "De la humedad relativa del aire comburente",
        "Del material de la chimenea"
       ],
       "c": 3,
       "e": "Los factores citados son el tipo de combustible, el exceso de aire y la humedad relativa del aire comburente. El material de la chimenea no influye."
      },
      {
       "q": "Una caldera de 3ª generación según la Directiva 92/42 CEE es una caldera:",
       "o": [
        "De condensación",
        "De baja temperatura",
        "Estándar",
        "De fundición"
       ],
       "c": 0,
       "e": "1ª estándar, 2ª baja temperatura, 3ª condensación."
      },
      {
       "q": "La caldera estándar (1ª generación) trabaja en condiciones normales con:",
       "o": [
        "Retorno entre 35 y 40 ºC",
        "Retorno > 55 ºC y régimen 90/70 ºC",
        "Sin límite inferior de retorno",
        "Alimentación entre 35 y 45 ºC"
       ],
       "c": 1,
       "e": "Las otras opciones describen calderas de 2ª y 3ª generación."
      },
      {
       "q": "Según la DIN 4702-8, el escalón de carga en el que la caldera pasa más días al año es:",
       "o": [
        "63 %",
        "48 %",
        "30 %",
        "13 %"
       ],
       "c": 3,
       "e": "119,7 días al 13 %; de ahí la importancia del rendimiento a cargas parciales."
      },
      {
       "q": "El rendimiento estacional de una caldera, a diferencia del puntual:",
       "o": [
        "Solo considera el funcionamiento a plena carga",
        "Se mide con analizador de gases",
        "Tiene en cuenta paradas y arranques",
        "No depende de la zona geográfica"
       ],
       "c": 2,
       "e": "El puntual solo considera el estado de combustión."
      },
      {
       "q": "El tipo de regulación de quemador que ofrece mayor eficiencia energética es:",
       "o": [
        "1 escalón",
        "2 escalones",
        "Atmosférico",
        "Modulante"
       ],
       "c": 3,
       "e": "Es presurizado y de alto coste de adquisición."
      },
      {
       "q": "Un tiro insuficiente en la chimenea provoca:",
       "o": [
        "Revoco de humos e inquemados (CO)",
        "Humos que salen demasiado calientes",
        "Aumento del rendimiento",
        "Condensación en el quemador"
       ],
       "c": 0,
       "e": "El exceso de tiro es el que saca los humos demasiado calientes."
      },
      {
       "q": "El compresor de un sistema frigorífico tiene la doble función de:",
       "o": [
        "Reducir la presión y evaporar el refrigerante",
        "Elevar la presión del refrigerante y bombearlo por el circuito",
        "Condensar el refrigerante y filtrarlo",
        "Invertir el ciclo y almacenar refrigerante"
       ],
       "c": 1,
       "e": "El compresor aspira el vapor a baja presión, lo descarga a alta presión y con ello hace circular el refrigerante por el circuito. Bajar la presión es cosa de la válvula de expansión. Fuente: tema 2, apartado 2.3."
      },
      {
       "q": "En una torre de refrigeración, el «acercamiento» es la diferencia entre:",
       "o": [
        "La temperatura de entrada y la de salida del agua",
        "La temperatura seca y la húmeda del aire",
        "La temperatura de salida del agua y la de bulbo húmedo",
        "La temperatura de condensación y la de evaporación"
       ],
       "c": 2,
       "e": "La diferencia entre entrada y salida del agua es el «salto»."
      },
      {
       "q": "Un sistema tierra-agua se clasifica como:",
       "o": [
        "Aerotérmico",
        "Condensado por bucle de agua",
        "Evaporativo",
        "Geotérmico"
       ],
       "c": 3,
       "e": "Aire-aire y aire-agua son aerotérmicos; agua-aire y agua-agua, condensados por agua."
      },
      {
       "q": "Según el RITE, ¿qué categoría de calidad de aire interior corresponde, como mínimo, a un cine?",
       "o": [
        "IDA 1",
        "IDA 2",
        "IDA 3",
        "IDA 4"
       ],
       "c": 2,
       "e": "IDA 3: comercios, cines, teatros, restaurantes, gimnasios…"
      },
      {
       "q": "El caudal mínimo de aire exterior por persona para IDA 2 es:",
       "o": [
        "20 dm³/s",
        "12,5 dm³/s",
        "8 dm³/s",
        "5 dm³/s"
       ],
       "c": 1,
       "e": "IDA 1: 20; IDA 2: 12,5; IDA 3: 8; IDA 4: 5."
      },
      {
       "q": "Para un aire exterior ODA 2 y un aire interior IDA 2, la filtración mínima es:",
       "o": [
        "F9",
        "F6 + F8",
        "F7 + F9",
        "F5 + F6"
       ],
       "c": 1,
       "e": "Se lee en la tabla 1.4.2.5 del RITE cruzando la calidad del aire exterior (ODA 2) con la interior exigida (IDA 2): prefiltro F6 y filtro final F8."
      },
      {
       "q": "Las aulas de enseñanza y las oficinas se clasifican como:",
       "o": [
        "IDA 1",
        "IDA 2",
        "IDA 3",
        "IDA 4"
       ],
       "c": 1,
       "e": "IDA 2: aire de buena calidad."
      },
      {
       "q": "Un compresor formado por dos espirales, una fija y otra orbitante, es de tipo:",
       "o": [
        "Scroll",
        "Rotativo",
        "Tornillo",
        "Centrífugo"
       ],
       "c": 0,
       "e": "El scroll comprime el gas entre una espiral fija y otra que orbita sobre ella; los huecos entre ambas se estrechan hacia el centro. Fuente: ejercicios resueltos del tema 2."
      },
      {
       "q": "Un compresor con rodete de álabes, similar a una turbina, es de tipo:",
       "o": [
        "Scroll",
        "Centrífugo",
        "Alternativo",
        "Rotativo"
       ],
       "c": 1,
       "e": "El centrífugo acelera el gas con un rodete de álabes y convierte esa velocidad en presión, como una turbina. Se usa en grandes potencias. Fuente: ejercicios resueltos del tema 2."
      },
      {
       "q": "Un intercambiador con una carcasa cilíndrica larga y un haz de tubos interior es:",
       "o": [
        "Refrigerante–aire",
        "Refrigerante–agua de placas",
        "Refrigerante–agua multitubular",
        "Recuperador rotativo"
       ],
       "c": 2,
       "e": "Carcasa cilíndrica con haz de tubos es un intercambiador multitubular: el refrigerante va por un lado (tubos o carcasa) y el agua por el otro. Fuente: ejercicios resueltos del tema 2."
      },
      {
       "q": "Un sistema de expansión formado por un tubo de cobre muy fino y largo, enrollado, es:",
       "o": [
        "Restrictor",
        "Válvula electrónica",
        "Válvula termostática",
        "Capilar"
       ],
       "c": 3,
       "e": "El capilar es el sistema de expansión más simple: un tubo muy fino y largo cuya pérdida de carga baja la presión del refrigerante. No regula. Fuente: ejercicios resueltos del tema 2."
      },
      {
       "q": "La válvula de expansión que incorpora un bulbo unido por un tubo capilar es la:",
       "o": [
        "Termostática",
        "Electrónica",
        "De 4 vías",
        "Restrictor"
       ],
       "c": 0,
       "e": "La termostática regula su apertura con un bulbo sensor a la salida del evaporador, unido a la válvula por un capilar, para controlar el recalentamiento. Fuente: ejercicios resueltos del tema 2."
      },
      {
       "q": "En una torre de enfriamiento abierta, el elemento que evita el arrastre de gotas con el aire de salida es:",
       "o": [
        "La bandeja",
        "El separador de gotas",
        "Los rociadores",
        "La superficie de intercambio"
       ],
       "c": 1,
       "e": "El separador de gotas está en la salida del aire y retiene las gotas que arrastraría la corriente: menos pérdida de agua y menos riesgo de legionela. Fuente: ejercicio 13 del tema 2."
      },
      {
       "q": "Una enfriadora con ventiladores en la parte superior que produce agua fría pertenece al sistema:",
       "o": [
        "Aire-aire",
        "Agua-agua",
        "Aire-agua",
        "Geotérmico"
       ],
       "c": 2,
       "e": "Condensa con aire (ventiladores arriba) y produce agua fría: es una enfriadora aire-agua, de tipo aerotérmico. Fuente: ejercicios resueltos del tema 1."
      },
      {
       "q": "Un sistema en el que el aire llega al local a través de conductos con rejillas y difusores es de descarga:",
       "o": [
        "Directa",
        "Partida",
        "Compacta",
        "Indirecta"
       ],
       "c": 3,
       "e": "Un split de pared o un cassette son de descarga directa."
      },
      {
       "q": "Un equipo con unidad exterior y unidad interior separadas, unidas por líneas frigoríficas, es de configuración:",
       "o": [
        "Partida",
        "Compacta",
        "De descarga directa",
        "Geotérmica"
       ],
       "c": 0,
       "e": "Compacto: todo en una sola envolvente."
      },
      {
       "q": "Una caldera consume 12,4 Nm³/h de gas con PCI = 8.710 kcal/m³ y tiene 6.051 kcal/h de pérdidas sensibles. Su rendimiento sobre PCI es:",
       "o": [
        "0,85",
        "0,90",
        "0,94",
        "1,06"
       ],
       "c": 2,
       "e": "Rendimiento sobre PCI = (calor aportado − pérdidas sensibles) / calor aportado.",
       "k": [
        "Calor aportado = 12,4 · 8.710 = 108.004 kcal/h",
        "η = (108.004 − 6.051) / 108.004 = 0,94"
       ]
      },
      {
       "q": "Al calcular el rendimiento de una caldera sobre PCS, las pérdidas que se restan son:",
       "o": [
        "Solo las sensibles",
        "Las sensibles más las latentes",
        "Solo las latentes",
        "Ninguna"
       ],
       "c": 1,
       "e": "El PCS incluye el calor latente del vapor, así que se descuenta también."
      },
      {
       "q": "El método de cálculo de cargas térmicas que se enseña en el curso es:",
       "o": [
        "Funciones de transferencia",
        "Balance de calor de ASHRAE",
        "DTE (Diferencia de Temperatura Equivalente)",
        "Método de grados-día"
       ],
       "c": 2,
       "e": "El curso usa la DTE. Funciones de transferencia y balance de calor de ASHRAE existen, pero no son los que se aplican. Fuente: tema 3, apartado 1."
      },
      {
       "q": "En el cálculo de la radiación a través de huecos (CS1), si el marco es metálico:",
       "o": [
        "Se resta la superficie del marco",
        "Se divide entre 1,15",
        "Se aplica la DTE",
        "Se multiplica el resultado por 1,2"
       ],
       "c": 3,
       "e": "Qs1 = S·R·f, ×1,2 con marco metálico."
      },
      {
       "q": "La carga sensible por infiltraciones se calcula como:",
       "o": [
        "0,33·Qi·Δt",
        "K·S·DTE",
        "0,84·Qi·ΔW",
        "S·R·f"
       ],
       "c": 0,
       "e": "0,84·Q·ΔW es la latente."
      },
      {
       "q": "¿Cuál de estas partidas NO genera carga latente?",
       "o": [
        "Personas",
        "Radiación solar por ventanas",
        "Infiltraciones",
        "Ventilación"
       ],
       "c": 1,
       "e": "La radiación solar es solo sensible."
      },
      {
       "q": "En la partida CS2 (radiación y transmisión exterior), la superficie del cerramiento se toma:",
       "o": [
        "Incluyendo ventanas y puertas",
        "Solo la de las ventanas",
        "Restando huecos y puertas",
        "Multiplicada por 1,2"
       ],
       "c": 2,
       "e": "Los huecos se calculan aparte en CS1."
      },
      {
       "q": "Según la teoría del tema 3, el factor de ponderación de la iluminación LED es:",
       "o": [
        "1",
        "1,2",
        "0,2",
        "1,25"
       ],
       "c": 2,
       "e": "Incandescencia 1, fluorescencia 1,2, LED 0,2."
      },
      {
       "q": "1 mm.c.a. equivale aproximadamente a:",
       "o": [
        "1 Pa",
        "9,8 Pa",
        "98 Pa",
        "0,1 Pa"
       ],
       "c": 1,
       "e": "1 mm.c.a. = 9,81 Pa; en la práctica se redondea a 10 Pa."
      },
      {
       "q": "Para aire a 20 ºC y v = 4 m/s, la presión dinámica es aproximadamente:",
       "o": [
        "1 Pa",
        "4 Pa",
        "10 Pa",
        "24 Pa"
       ],
       "c": 2,
       "e": "Con aire a 20 ºC (ρ ≈ 1,2 kg/m³) la presión dinámica es ρ·v²/2.",
       "k": [
        "Pv = ρ·v²/2 ≈ 0,602·v²",
        "Pv = 0,602 · 4² = 9,6 Pa ≈ 10 Pa ≈ 1 mm.c.a."
       ]
      },
      {
       "q": "Un conducto de baja velocidad trabaja entre:",
       "o": [
        "2 y 6 m/s",
        "Más de 20 m/s",
        "12 y 20 m/s",
        "6 y 12 m/s"
       ],
       "c": 3,
       "e": "Más de 12 m/s es alta velocidad."
      },
      {
       "q": "La relación de aspecto ancho-alto más recomendable en conductos rectangulares es:",
       "o": [
        "1:1",
        "3:1",
        "7:1",
        "10:1"
       ],
       "c": 0,
       "e": "7:1 es la máxima y duplica el coste."
      },
      {
       "q": "A partir de qué clase de presión los conductos solo son válidos para presión positiva:",
       "o": [
        "Media presión 2",
        "Media presión 1",
        "Baja presión 3",
        "Alta presión 1"
       ],
       "c": 0,
       "e": "Hasta MP1 valen para positiva y negativa."
      },
      {
       "q": "La recuperación estática en una red de conductos se produce porque:",
       "o": [
        "Aumenta la velocidad del aire y con ella la presión",
        "Disminuye la velocidad y aumenta la presión estática",
        "Aumenta la sección y la pérdida por rozamiento",
        "El ventilador recupera presión en el retorno"
       ],
       "c": 1,
       "e": "Teorema de Bernoulli; ocurre en las derivaciones."
      },
      {
       "q": "El diámetro equivalente de un conducto rectangular es el del conducto circular con igual:",
       "o": [
        "Sección y velocidad",
        "Perímetro y caudal",
        "Longitud, caudal y pérdida de carga por rozamiento",
        "Presión total"
       ],
       "c": 2,
       "e": "Es el diámetro del conducto circular que, con la misma longitud y el mismo caudal, tiene la misma pérdida de carga por rozamiento. Permite usar los ábacos de conductos circulares. Fuente: tema 4."
      },
      {
       "q": "Según el RITE (IT 1.2.4.5.1), el enfriamiento gratuito por aire exterior es obligatorio a partir de:",
       "o": [
        "12 kW en refrigeración",
        "70 kW en refrigeración",
        "0,28 m³/s de aire expulsado",
        "1.000 kW en refrigeración"
       ],
       "c": 1,
       "e": "0,28 m³/s es el umbral de recuperación de calor."
      },
      {
       "q": "Según el temario, la diferencia entre ventilación y freecooling es que:",
       "o": [
        "La ventilación es un concepto energético",
        "El freecooling es un concepto normativo de salubridad",
        "Son el mismo concepto",
        "La ventilación es un concepto de salubridad y el freecooling uno energético"
       ],
       "c": 3,
       "e": "Pueden compartir toma de aire, pero no deben confundirse."
      },
      {
       "q": "El recuperador de calor del aire expulsado es obligatorio (IT 1.2.4.5.2) cuando el caudal expulsado mecánicamente supera:",
       "o": [
        "0,28 m³/s",
        "0,5 m³/s",
        "1.000 m³/h",
        "70 kW"
       ],
       "c": 0,
       "e": "0,28 m³/s ≈ 1.000 m³/h, pero el RITE lo expresa en m³/s."
      },
      {
       "q": "Un desuperheater se instala:",
       "o": [
        "A la descarga del compresor, antes del condensador",
        "En la aspiración del compresor",
        "Tras la válvula de expansión",
        "En el retorno de aire"
       ],
       "c": 0,
       "e": "Recupera en torno al 15 % y da agua a 60 ºC."
      },
      {
       "q": "Según el temario, a partir de qué profundidad aproximada la temperatura del terreno es estable todo el año:",
       "o": [
        "1 m",
        "5 m",
        "15 m",
        "100 m"
       ],
       "c": 2,
       "e": "Por eso la geotermia tiene gran inercia y estabilidad."
      },
      {
       "q": "Una ventaja de los recuperadores estáticos frente a los dinámicos es que:",
       "o": [
        "Recuperan calor sensible y latente",
        "No tienen bypass de aire",
        "Tienen baja pérdida de carga",
        "Tienen la eficiencia más alta"
       ],
       "c": 1,
       "e": "Además son económicos y de poca huella."
      },
      {
       "q": "Un inconveniente de los recuperadores dinámicos es que:",
       "o": [
        "Solo recuperan calor sensible",
        "Generan alta pérdida de carga",
        "Consumen electricidad",
        "Tienen baja eficiencia"
       ],
       "c": 2,
       "e": "También tienen bypass de aire, son caros y ocupan mucho."
      },
      {
       "q": "¿Cuál NO es una aplicación típica del freecooling de agua citada en el temario?",
       "o": [
        "Centros de datos",
        "Hospitales",
        "Oficinas con altas cargas internas",
        "Viviendas unifamiliares en clima cálido"
       ],
       "c": 3,
       "e": "Requiere temperaturas exteriores muy bajas y cargas de refrigeración en invierno."
      },
      {
       "q": "Los sistemas de caudal de refrigerante variable aprovechan energía residual especialmente en:",
       "o": [
        "Modo mixto",
        "Modo frío",
        "Modo calor",
        "Modo ventilación"
       ],
       "c": 0,
       "e": "En modo mixto el calor extraído en unas zonas se aporta a otras."
      },
      {
       "q": "Un recuperador formado por una rueda que gira atravesando la corriente de extracción y la de aire exterior es:",
       "o": [
        "De placas",
        "Rotativo",
        "De tubo de calor",
        "Termosifón"
       ],
       "c": 1,
       "e": "En el rotativo una rueda atraviesa alternativamente el aire de extracción y el exterior: se calienta con uno y cede el calor al otro. Es un recuperador dinámico. Fuente: ejercicios resueltos del tema 3."
      },
      {
       "q": "Un recuperador con el evaporador abajo, el condensador arriba y retorno del condensado por gravedad es:",
       "o": [
        "De placas",
        "Rotativo",
        "Termosifón",
        "Desuperheater"
       ],
       "c": 2,
       "e": "El termosifón evapora el fluido abajo, el vapor sube al condensador y el condensado vuelve por gravedad, sin bomba. Fuente: ejercicios resueltos del tema 3."
      },
      {
       "q": "¿Qué instrucción técnica del RITE regula las pruebas de puesta en servicio (montaje)?",
       "o": [
        "IT 1",
        "IT 2",
        "IT 3",
        "IT 4"
       ],
       "c": 1,
       "e": "IT 1 diseño, IT 2 montaje, IT 3 mantenimiento y uso, IT 4 inspección."
      },
      {
       "q": "Según el artículo 22 del RITE, las pruebas de la instalación terminada las realiza:",
       "o": [
        "La empresa mantenedora",
        "El organismo de control",
        "La empresa instaladora",
        "El titular de la instalación"
       ],
       "c": 2,
       "e": "Con sus medios humanos y materiales, conforme a la IT 2."
      },
      {
       "q": "¿Cuál de estas comprobaciones forma parte de las pruebas de eficiencia energética de la IT 2?",
       "o": [
        "Revisión del Libro del Edificio",
        "Potencia absorbida por los motores eléctricos",
        "Dictamen de mejoras",
        "Retimbrado de extintores"
       ],
       "c": 1,
       "e": "El dictamen pertenece a la inspección periódica (IT 4)."
      },
      {
       "q": "El mantenimiento debe realizarse bajo la dirección de un técnico titulado en instalaciones de:",
       "o": [
        "Más de 70 kW",
        "Cualquier potencia en pública concurrencia",
        "Más de 1.000 kW en calor",
        "Más de 5.000 kW en calor o 1.000 kW en frío, o solar de más de 400 kW"
       ],
       "c": 3,
       "e": "Artículo 26 del RITE: por encima de esos umbrales el mantenimiento lo dirige un técnico titulado competente."
      },
      {
       "q": "¿Quién confecciona el registro de mantenimiento y quién responde de su existencia?",
       "o": [
        "Lo confecciona el titular; responde la mantenedora",
        "Lo confecciona la mantenedora; responde el titular",
        "Ambos el organismo de control",
        "Lo confecciona la instaladora; responde la CCAA"
       ],
       "c": 1,
       "e": "Además, forma parte del Libro del Edificio."
      },
      {
       "q": "En una instalación de 40 kW sin Manual de uso y mantenimiento, el mantenimiento se hace:",
       "o": [
        "Según el criterio profesional de la mantenedora",
        "Según la UNE 100030",
        "Mensualmente por obligación",
        "No es obligatorio"
       ],
       "c": 0,
       "e": "El RITE indica las operaciones a título orientativo."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un calentador de ACS de gas ≤ 24,4 kW en una vivienda:",
       "o": [
        "2 años",
        "4 años",
        "5 años",
        "Anual"
       ],
       "c": 2,
       "e": "En el resto de usos, cada 2 años."
      },
      {
       "q": "El programa de gestión energética lo realiza:",
       "o": [
        "El titular",
        "La empresa mantenedora",
        "La empresa instaladora",
        "El organismo de control"
       ],
       "c": 1,
       "e": "Evalúa el rendimiento de generadores de calor, de frío y de la solar térmica."
      },
      {
       "q": "La inspección inicial de una instalación térmica:",
       "o": [
        "Es siempre obligatoria",
        "Solo se hace en instalaciones > 1.000 kW",
        "La realiza la empresa instaladora",
        "La podrá disponer el órgano competente de la CCAA"
       ],
       "c": 3,
       "e": "Una vez presentada la documentación de puesta en servicio."
      },
      {
       "q": "En la inspección de sistemas de calefacción se excluyen:",
       "o": [
        "Las calderas de condensación",
        "Los sistemas solo de ACS de hasta 70 kW",
        "Las bombas de calor",
        "Los sistemas de más de 70 kW"
       ],
       "c": 1,
       "e": "IT 4: se excluyen los sistemas destinados únicamente a ACS ≤ 70 kW."
      },
      {
       "q": "En el método indirecto, el rendimiento de la caldera es:",
       "o": [
        "η = 100 − (Ph + Pi)",
        "η = ṁ·Cp·ΔT / (F·PCI)",
        "η = Qusable·(1 − 1/SCOP)",
        "η = U·I·cos φ"
       ],
       "c": 0,
       "e": "Ph: pérdidas en humos; Pi: inquemados; pérdidas por el cuerpo despreciables."
      },
      {
       "q": "El rendimiento instantáneo de un equipo frigorífico se determina mediante el:",
       "o": [
        "SCOPdhw",
        "DTE",
        "PCI",
        "CEEV"
       ],
       "c": 3,
       "e": "Potencia en el evaporador entre potencia eléctrica del compresor."
      },
      {
       "q": "¿Cuál de estos edificios está EXCLUIDO del ámbito del CTE DB HE?",
       "o": [
        "Un hotel de nueva construcción",
        "Una vivienda reformada íntegramente",
        "Un edificio industrial",
        "Una oficina con cambio de uso de 200 m²"
       ],
       "c": 2,
       "e": "También protegidos, provisionales, defensa, agrícolas no residenciales y aislados < 50 m²."
      },
      {
       "q": "Para considerar renovable una bomba de calor eléctrica para ACS, su SCOPdhw debe ser como mínimo:",
       "o": [
        "1,15",
        "2,0",
        "2,5",
        "3,5"
       ],
       "c": 2,
       "e": "1,15 es el mínimo para las accionadas por energía térmica."
      },
      {
       "q": "En un perfil de temperaturas de un local en el que la temperatura es máxima junto al suelo y casi constante en altura, el sistema de calefacción es:",
       "o": [
        "Radiadores",
        "Techo radiante",
        "Aire por conductos",
        "Suelo radiante"
       ],
       "c": 3,
       "e": "Con suelo radiante el calor sale del suelo: el perfil es máximo abajo y casi uniforme en altura, el más cercano al ideal. Radiadores y aire calientan más la parte alta. Fuente: ejercicios resueltos del tema 0."
      },
      {
       "q": "Si la temperatura seca y la húmeda valen ambas 30 ºC, la temperatura efectiva es:",
       "o": [
        "30 ºC",
        "26,5 ºC",
        "23 ºC",
        "No se puede calcular"
       ],
       "c": 0,
       "e": "Ejercicio resuelto: con aire saturado la efectiva coincide con la seca."
      }
     ]
    },
    {
     "id": "clim-verif",
     "name": "Verificación",
     "short": "CLIM · Verificación",
     "examSize": 20,
     "source": "Banco ampliado de verificación de Climatización (tema 6: puesta en servicio, mantenimiento, gestión energética, inspección, rendimiento de equipos y CTE DB HE): 101 preguntas tipo test. Las respuestas son las de las soluciones comentadas del documento.",
     "questions": [
      {
       "q": "¿Qué instrucción técnica del RITE regula las pruebas de puesta en servicio (montaje)?",
       "o": [
        "IT 1",
        "IT 2",
        "IT 3",
        "IT 4"
       ],
       "c": 1,
       "e": "IT 1 diseño, IT 2 montaje, IT 3 mantenimiento y uso, IT 4 inspección."
      },
      {
       "q": "La instrucción técnica del RITE que regula la inspección es la:",
       "o": [
        "IT 1",
        "IT 2",
        "IT 3",
        "IT 4"
       ],
       "c": 3,
       "e": "IT 1 diseño, IT 2 montaje, IT 3 mantenimiento y uso, IT 4 inspección. Fuente: tema 6, apartado 1.1."
      },
      {
       "q": "Los capítulos del RITE destacados a efectos de verificación e inspección son:",
       "o": [
        "I, II y III",
        "IV, VI y VII",
        "II, IV y V",
        "V, VI y VIII"
       ],
       "c": 1,
       "e": "IV ejecución, VI uso y mantenimiento, VII inspección."
      },
      {
       "q": "Según el artículo 22 del RITE, las pruebas de la instalación terminada las realiza:",
       "o": [
        "La empresa mantenedora",
        "El organismo de control",
        "La empresa instaladora",
        "El titular de la instalación"
       ],
       "c": 2,
       "e": "Con sus medios humanos y materiales, conforme a la IT 2."
      },
      {
       "q": "¿Cuál de estas pruebas NO figura entre las de puesta en servicio de la IT 2 citadas en el temario?",
       "o": [
        "Estanqueidad de circuitos frigoríficos",
        "Libre dilatación",
        "Estanqueidad de chimeneas",
        "Medición de la resistencia de tierra del REBT"
       ],
       "c": 3,
       "e": "La prueba de tierra es del REBT, no del RITE."
      },
      {
       "q": "El ajuste y equilibrado de la IT 2 incluye:",
       "o": [
        "Distribución y difusión de aire, distribución de agua y control automático",
        "Solo la difusión de aire",
        "Solo el control automático",
        "La inspección periódica de eficiencia"
       ],
       "c": 0,
       "e": "La instaladora presenta un informe final."
      },
      {
       "q": "¿Cuál de estas comprobaciones forma parte de las pruebas de eficiencia energética de la IT 2?",
       "o": [
        "Revisión del Libro del Edificio",
        "Potencia absorbida por los motores eléctricos",
        "Dictamen de mejoras",
        "Retimbrado de extintores"
       ],
       "c": 1,
       "e": "El dictamen pertenece a la inspección periódica (IT 4)."
      },
      {
       "q": "El RITE vigente se aprobó el:",
       "o": [
        "17 de marzo de 2006",
        "20 de julio de 2007",
        "22 de mayo de 2017",
        "20 de diciembre de 2019"
       ],
       "c": 1,
       "e": "El RITE vigente es el Real Decreto 1027/2007, de 20 de julio. Las demás fechas no corresponden a su aprobación (RD 1027/2007)."
      },
      {
       "q": "El RITE se desarrolla con un enfoque:",
       "o": [
        "Prescriptivo, con especificaciones técnicas detalladas",
        "Exclusivamente económico",
        "Basado en prestaciones u objetivos",
        "Basado en un único material obligatorio"
       ],
       "c": 2,
       "e": "El RITE fija los requisitos que deben cumplir las instalaciones (prestaciones u objetivos) sin imponer técnicas ni materiales concretos para alcanzarlos."
      },
      {
       "q": "Una ventaja del enfoque prestacional del RITE es que:",
       "o": [
        "Obliga a usar un material concreto",
        "Sustituye al CTE",
        "Elimina las pruebas de puesta en servicio",
        "No impide la introducción de nuevas tecnologías"
       ],
       "c": 3,
       "e": "Al exigir resultados y no soluciones cerradas, el enfoque prestacional deja abierta la puerta a nuevas tecnologías. Un reglamento prescriptivo, en cambio, limita las soluciones aceptables a las que describe."
      },
      {
       "q": "Según el RITE, ¿qué se incluye en la definición de instalación térmica?",
       "o": [
        "Las instalaciones fijas de climatización y de ACS, incluidas conexiones a redes urbanas y la automatización y control",
        "Solo las calderas",
        "Las instalaciones frigoríficas de procesos industriales",
        "La instalación eléctrica de baja tensión"
       ],
       "c": 0,
       "e": "El RITE considera instalación térmica la fija de climatización (calefacción, refrigeración y ventilación) y la de ACS, incluidas las conexiones a redes urbanas y la automatización y control. No incluye las frigoríficas de procesos industriales ni la eléctrica. Tema 6, apartado 1.1 («Recuerda»)."
      },
      {
       "q": "El capítulo del RITE dedicado a las condiciones para la ejecución de las instalaciones es el:",
       "o": [
        "Capítulo IV",
        "Capítulo VI",
        "Capítulo VII",
        "Capítulo II"
       ],
       "c": 0,
       "e": "El capítulo IV del RITE regula la ejecución de las instalaciones. El capítulo VI trata el uso y mantenimiento y el VII, la inspección."
      },
      {
       "q": "¿Cuál de estas pruebas figura en la IT 2 para las redes de conductos de aire?",
       "o": [
        "Prueba de libre dilatación",
        "Prueba de recepción",
        "Prueba de estanqueidad de chimeneas",
        "Prueba de presión a 20 bar"
       ],
       "c": 1,
       "e": "Para las redes de conductos de aire, la IT 2 exige pruebas de recepción (de estanquidad de los conductos). La libre dilatación es una prueba de las redes de tuberías y la de estanquidad de chimeneas, de las chimeneas; la prueba a 20 bar no se aplica a conductos de aire."
      },
      {
       "q": "La prueba de libre dilatación de la IT 2 sirve para comprobar que:",
       "o": [
        "La chimenea tira correctamente",
        "Los conductos no tienen fugas de aire",
        "Las tuberías pueden dilatarse con la temperatura sin daños",
        "El refrigerante no se fuga"
       ],
       "c": 2,
       "e": "La prueba de libre dilatación es una prueba de puesta en servicio de las redes de tuberías: se comprueba que, al calentarse, las tuberías dilatan sin deformaciones ni daños en soportes y uniones."
      },
      {
       "q": "Entre las comprobaciones de eficiencia energética de la IT 2 está la de:",
       "o": [
        "El certificado energético del edificio",
        "El aislamiento acústico del edificio",
        "La resistencia al fuego de los conductos",
        "Las pérdidas térmicas de distribución de la instalación hidráulica"
       ],
       "c": 3,
       "e": "Entre las comprobaciones de eficiencia de la IT 2 está medir las pérdidas térmicas de distribución de la instalación hidráulica, es decir, el calor que se pierde en las tuberías. Las demás no son pruebas de la instalación térmica. Tema 6, apartado 1.3, letra i."
      },
      {
       "q": "En la IT 2, la comprobación de que los consumos energéticos están dentro de lo previsto se hace frente a:",
       "o": [
        "El proyecto o memoria técnica",
        "La factura del año anterior",
        "La media del sector",
        "El certificado del fabricante"
       ],
       "c": 0,
       "e": "Los consumos energéticos medidos en las pruebas se comparan con los previstos en el proyecto o la memoria técnica, que es el documento de referencia de la instalación (pruebas de eficiencia de la IT 2, letra g)."
      },
      {
       "q": "Las pruebas de eficiencia de la IT 2 incluyen comprobar las temperaturas y saltos térmicos de:",
       "o": [
        "Solo los generadores",
        "Todos los circuitos de generación, distribución y unidades terminales",
        "Solo las unidades terminales",
        "Solo el circuito de ACS"
       ],
       "c": 1,
       "e": "La IT 2 pide comprobar temperaturas y saltos térmicos en todos los circuitos: generación, distribución y unidades terminales, no en una parte aislada (pruebas de eficiencia de la IT 2, letra f)."
      },
      {
       "q": "Las pruebas de eficiencia de la IT 2 las realiza y documenta:",
       "o": [
        "El organismo de control",
        "La empresa mantenedora",
        "La empresa instaladora",
        "El titular"
       ],
       "c": 2,
       "e": "Las pruebas de puesta en servicio y de eficiencia las realiza la empresa instaladora, que las documenta antes de entregar la instalación. Tema 6, apartado 1.3."
      },
      {
       "q": "Una instalación térmica de 50 kW debe ser mantenida por:",
       "o": [
        "El propio usuario sin requisitos",
        "Una empresa mantenedora bajo la dirección de técnico titulado",
        "Una empresa mantenedora",
        "Un organismo de control"
       ],
       "c": 2,
       "e": "Entre 5 y 70 kW: empresa mantenedora."
      },
      {
       "q": "¿A partir de qué potencia el titular debe suscribir un contrato de mantenimiento?",
       "o": [
        "5 kW",
        "20 kW",
        "70 kW",
        "400 kW"
       ],
       "c": 2,
       "e": "Según el art. 26 del RITE, por encima de 70 kW el titular debe tener un contrato de mantenimiento con una empresa mantenedora. Entre 5 y 70 kW basta con que la mantenga una empresa mantenedora, sin contrato obligatorio."
      },
      {
       "q": "El mantenimiento debe realizarse bajo la dirección de un técnico titulado en instalaciones de:",
       "o": [
        "Más de 70 kW",
        "Cualquier potencia en pública concurrencia",
        "Más de 1.000 kW en calor",
        "Más de 5.000 kW en calor o 1.000 kW en frío, o solar de más de 400 kW"
       ],
       "c": 3,
       "e": "Artículo 26 del RITE: por encima de esos umbrales el mantenimiento lo dirige un técnico titulado competente."
      },
      {
       "q": "Para mantener sus instalaciones con personal propio, el titular debe:",
       "o": [
        "Presentar una declaración responsable ante la comunidad autónoma",
        "Contratar a un organismo de control",
        "Pedir autorización al Ministerio",
        "No puede hacerlo en ningún caso"
       ],
       "c": 0,
       "e": "Declarando que cumple los requisitos de la actividad de mantenimiento."
      },
      {
       "q": "El registro de las operaciones de mantenimiento debe conservarse al menos:",
       "o": [
        "1 año",
        "3 años",
        "5 años",
        "10 años"
       ],
       "c": 2,
       "e": "Contados desde la fecha de cada operación."
      },
      {
       "q": "¿Quién confecciona el registro de mantenimiento y quién responde de su existencia?",
       "o": [
        "Lo confecciona el titular; responde la mantenedora",
        "Lo confecciona la mantenedora; responde el titular",
        "Ambos el organismo de control",
        "Lo confecciona la instaladora; responde la CCAA"
       ],
       "c": 1,
       "e": "Además, forma parte del Libro del Edificio."
      },
      {
       "q": "¿Cuál NO forma parte del procedimiento de uso y mantenimiento de la IT 3?",
       "o": [
        "Programa de mantenimiento preventivo",
        "Programa de gestión energética",
        "Programa de inspección inicial por OCA",
        "Instrucciones de manejo y maniobra"
       ],
       "c": 2,
       "e": "La inspección es materia de la IT 4."
      },
      {
       "q": "En instalaciones de más de 70 kW, el Manual de uso y mantenimiento lo elabora:",
       "o": [
        "El fabricante de la caldera",
        "La empresa instaladora",
        "El órgano competente de la CCAA",
        "La empresa mantenedora contratada"
       ],
       "c": 3,
       "e": "Y lo entrega al titular."
      },
      {
       "q": "En una instalación de 40 kW sin Manual de uso y mantenimiento, el mantenimiento se hace:",
       "o": [
        "Según el criterio profesional de la mantenedora",
        "Según la UNE 100030",
        "Mensualmente por obligación",
        "No es obligatorio"
       ],
       "c": 0,
       "e": "El RITE indica las operaciones a título orientativo."
      },
      {
       "q": "Según el art. 26 del RITE, la obligación de mantenimiento por empresa mantenedora empieza a partir de una potencia térmica de:",
       "o": [
        "5 kW",
        "12 kW",
        "20 kW",
        "70 kW"
       ],
       "c": 0,
       "e": "El art. 26 del RITE obliga a contratar el mantenimiento con una empresa mantenedora a partir de 5 kW. Entre 5 y 70 kW basta la mantenedora; por encima de 70 kW hace falta además contrato escrito."
      },
      {
       "q": "Una instalación solar térmica de 500 kW debe mantenerse:",
       "o": [
        "Por el titular sin requisitos",
        "Por el organismo de control",
        "Solo por el fabricante",
        "Por mantenedora con contrato y bajo dirección de técnico titulado"
       ],
       "c": 3,
       "e": "Las instalaciones solares térmicas de más de 400 kW deben mantenerse por una empresa mantenedora con contrato y bajo la dirección de un técnico titulado competente. 500 kW supera ese umbral."
      },
      {
       "q": "Una instalación de frío de 1.200 kW debe mantenerse bajo la dirección de técnico titulado.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "En frío, el mantenimiento debe dirigirlo un técnico titulado cuando la potencia supera los 1.000 kW. 1.200 kW está por encima, así que es verdadero."
      },
      {
       "q": "Una instalación de calefacción de 3.000 kW requiere técnico titulado dirigiendo el mantenimiento.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "En calor el umbral para exigir técnico titulado es de 5.000 kW, así que con 3.000 kW no hace falta. Sí necesita contrato de mantenimiento con mantenedora, porque supera los 70 kW."
      },
      {
       "q": "El registro de mantenimiento se conserva al menos 5 años contados desde:",
       "o": [
        "La fecha de ejecución de la operación de mantenimiento",
        "La puesta en servicio",
        "La última inspección",
        "La compra de los equipos"
       ],
       "c": 0,
       "e": "El art. 27 del RITE exige conservar el registro de cada operación de mantenimiento al menos 5 años, contados desde la fecha en que se ejecutó esa operación."
      },
      {
       "q": "El registro de mantenimiento forma parte del:",
       "o": [
        "Proyecto de ejecución",
        "Libro del Edificio",
        "Certificado energético",
        "Plan de autoprotección"
       ],
       "c": 1,
       "e": "Según el art. 27 del RITE, el registro de las operaciones de mantenimiento forma parte del Libro del Edificio, junto con el resto de la documentación de uso y mantenimiento."
      },
      {
       "q": "Según la IT 3, el funcionamiento de las instalaciones térmicas debe hacerse, entre otras condiciones:",
       "o": [
        "Solo en horario laboral",
        "Con la mínima inversión inicial",
        "Con la máxima eficiencia energética y evitando emisiones a la atmósfera",
        "Sin necesidad de seguir el proyecto"
       ],
       "c": 2,
       "e": "La IT 3 pide que las instalaciones funcionen con la máxima eficiencia energética y evitando emisiones, además de con seguridad, durabilidad y protección del medio ambiente."
      },
      {
       "q": "La IT 3 exige que la instalación térmica disponga de instrucciones de:",
       "o": [
        "Facturación",
        "Montaje del fabricante únicamente",
        "Evacuación del edificio",
        "Seguridad, y de manejo y maniobra"
       ],
       "c": 3,
       "e": "La IT 3 exige que la instalación disponga de instrucciones de seguridad y de manejo y maniobra, además del programa de mantenimiento preventivo, el de gestión energética y el de funcionamiento."
      },
      {
       "q": "El Manual de uso y mantenimiento de una instalación de más de 70 kW lo entrega la mantenedora al:",
       "o": [
        "Titular de la instalación",
        "Ayuntamiento",
        "Organismo de control",
        "Fabricante"
       ],
       "c": 0,
       "e": "En instalaciones de más de 70 kW, la empresa mantenedora redacta el Manual de uso y mantenimiento y se lo entrega al titular, que es quien debe conservarlo. Tema 6, apartado 1.7."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de una caldera mural de gas ≤ 70 kW en una vivienda:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "5 años"
       ],
       "c": 1,
       "e": "En el resto de usos es anual."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un equipo de aire acondicionado ≤ 12 kW en una vivienda:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "5 años"
       ],
       "c": 2,
       "e": "En el resto de usos, cada 2 años."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un calentador de ACS de gas ≤ 24,4 kW en una vivienda:",
       "o": [
        "2 años",
        "4 años",
        "5 años",
        "Anual"
       ],
       "c": 2,
       "e": "En el resto de usos, cada 2 años."
      },
      {
       "q": "Las instalaciones de potencia superior a 70 kW tienen una periodicidad mínima de mantenimiento:",
       "o": [
        "Mensual",
        "Trimestral",
        "Semestral",
        "Anual"
       ],
       "c": 0,
       "e": "Tanto en viviendas como en el resto de usos."
      },
      {
       "q": "Una instalación solar térmica de más de 14 kW se mantiene como mínimo con periodicidad:",
       "o": [
        "Mensual",
        "Semestral",
        "Anual",
        "Cada 2 años"
       ],
       "c": 1,
       "e": "Las de ≤ 14 kW, anual."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un calentador de ACS a gas de 30 kW en una oficina:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "5 años"
       ],
       "c": 0,
       "e": "Según la tabla de periodicidades de la IT 3, un equipo de 24,4 < Pn ≤ 70 kW en usos distintos de vivienda se revisa cada año. Un calentador de gas de 30 kW en una oficina entra en ese tramo."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un aire acondicionado de 20 kW en una vivienda:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "Mensual"
       ],
       "c": 1,
       "e": "Para equipos de 12 < Pn ≤ 70 kW en viviendas, la IT 3 fija una revisión cada 2 años. Un aire acondicionado de 20 kW en vivienda está en ese tramo."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de una bomba de calor para ACS de 10 kW en un comercio:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "5 años"
       ],
       "c": 1,
       "e": "Para Pn ≤ 12 kW en usos distintos de vivienda (como un comercio), la IT 3 fija una revisión cada 2 años. En viviendas serían 4 años."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de una instalación solar térmica de 10 kW:",
       "o": [
        "Mensual",
        "Semestral",
        "Anual",
        "Cada 2 años"
       ],
       "c": 2,
       "e": "Las instalaciones solares térmicas de Pn ≤ 14 kW se revisan una vez al año según la IT 3."
      },
      {
       "q": "Periodicidad mínima de mantenimiento de un aire acondicionado de 8 kW en una oficina:",
       "o": [
        "Anual",
        "2 años",
        "4 años",
        "5 años"
       ],
       "c": 1,
       "e": "Un equipo de 8 kW está en el tramo Pn ≤ 12 kW. En usos distintos de vivienda, como una oficina, la revisión es cada 2 años; en viviendas serían 4 años."
      },
      {
       "q": "¿Cuál de estas operaciones corresponde al mantenimiento preventivo de una caldera?",
       "o": [
        "Drenaje del circuito de torres de refrigeración",
        "Comprobación del material refractario",
        "Revisión de niveles de aceite del compresor",
        "Limpieza del evaporador"
       ],
       "c": 1,
       "e": "El material refractario forma parte de la caldera (protege el hogar), así que comprobarlo es mantenimiento preventivo de la caldera. El drenaje de torres, el aceite del compresor y la limpieza del evaporador son operaciones de equipos de refrigeración."
      },
      {
       "q": "¿Cuál de estas operaciones NO es del mantenimiento de equipos de refrigeración?",
       "o": [
        "Limpieza de evaporadores y condensadores",
        "Comprobación de estanquidad y niveles de refrigerante y aceite",
        "Limpieza del quemador",
        "Revisión y limpieza de filtros de aire"
       ],
       "c": 2,
       "e": "El quemador pertenece a la caldera, no a los equipos de refrigeración. Limpiar evaporadores y condensadores, revisar refrigerante y aceite, y limpiar filtros sí son operaciones de equipos frigoríficos."
      },
      {
       "q": "En las torres de refrigeración, el mantenimiento incluye:",
       "o": [
        "Sustitución anual de la torre",
        "Retimbrado del depósito",
        "Prueba a 20 bar",
        "Drenaje, limpieza y tratamiento del circuito"
       ],
       "c": 3,
       "e": "El mantenimiento de las torres de refrigeración incluye el drenaje, la limpieza y el tratamiento del circuito de agua, sobre todo para prevenir la legionela. Tema 6, apartado 1.9."
      },
      {
       "q": "La comprobación del tarado de los elementos de seguridad es una operación de mantenimiento de:",
       "o": [
        "Calderas",
        "Recuperadores de calor",
        "Unidades terminales de aire",
        "Equipos autónomos"
       ],
       "c": 0,
       "e": "Comprobar el tarado de los elementos de seguridad (presostatos, termostatos de seguridad, válvulas) es una operación de mantenimiento de las calderas. Tema 6, apartado 1.8."
      },
      {
       "q": "La revisión del sistema de tratamiento de agua es una operación de mantenimiento de:",
       "o": [
        "Los filtros de aire",
        "La caldera",
        "Los difusores",
        "El analizador de gases"
       ],
       "c": 1,
       "e": "La revisión del sistema de tratamiento de agua figura entre las operaciones de mantenimiento de la caldera: un agua mal tratada provoca incrustaciones y corrosión. Tema 6, apartado 1.8."
      },
      {
       "q": "El programa de gestión energética lo realiza:",
       "o": [
        "El titular",
        "La empresa mantenedora",
        "La empresa instaladora",
        "El organismo de control"
       ],
       "c": 1,
       "e": "Evalúa el rendimiento de generadores de calor, de frío y de la solar térmica."
      },
      {
       "q": "En un generador de calor de 500 kW, la medida del contenido de CO y CO₂ en humos se hace con periodicidad:",
       "o": [
        "Mensual",
        "Trimestral",
        "Anual",
        "Cada 2 años"
       ],
       "c": 1,
       "e": "70–1.000 kW: trimestral; > 1.000 kW: mensual; 20–70 kW: cada 2 años."
      },
      {
       "q": "¿Cuál de estas medidas pertenece al programa de gestión energética de generadores de FRÍO?",
       "o": [
        "Índice de opacidad de humos",
        "Tiro en la caja de humos",
        "EER instantáneo",
        "Contenido de CO en humos"
       ],
       "c": 2,
       "e": "Las otras tres son de generadores de calor."
      },
      {
       "q": "En el programa de gestión energética, en un generador de calor de 50 kW la temperatura de humos se mide cada:",
       "o": [
        "Mes",
        "3 meses",
        "2 años",
        "Año"
       ],
       "c": 2,
       "e": "En el programa de gestión energética, en generadores de calor de 20 a 70 kW la temperatura de humos se mide cada 2 años. 50 kW está en ese tramo."
      },
      {
       "q": "En un generador de frío de 1.500 kW, el EER instantáneo se mide:",
       "o": [
        "Mensualmente",
        "Cada 3 meses",
        "Cada año",
        "Cada 2 años"
       ],
       "c": 0,
       "e": "En generadores de frío de más de 1.000 kW, el EER instantáneo se mide cada mes. 1.500 kW supera ese umbral."
      },
      {
       "q": "¿Cuál de estas medidas pertenece a los generadores de calor en el programa de gestión energética?",
       "o": [
        "EER instantáneo",
        "Caudal de agua en el condensador",
        "Temperatura y presión de evaporación",
        "Tiro en la caja de humos de la caldera"
       ],
       "c": 3,
       "e": "El tiro en la caja de humos es una medida propia de las calderas (generadores de calor). El EER, el caudal de agua en el condensador y la temperatura y presión de evaporación se miden en los generadores de frío."
      },
      {
       "q": "El índice de opacidad de humos se mide en generadores que usan:",
       "o": [
        "Combustibles sólidos o líquidos",
        "Gas natural",
        "Electricidad",
        "Energía solar"
       ],
       "c": 0,
       "e": "La opacidad de los humos se mide en generadores que queman combustibles sólidos o líquidos, que son los que producen hollín. En combustibles sólidos se mide también el contenido de partículas."
      },
      {
       "q": "En la solar térmica, el programa de gestión energética mide y registra:",
       "o": [
        "La temperatura de humos",
        "El consumo de ACS y la contribución solar",
        "El EER",
        "La opacidad de humos"
       ],
       "c": 1,
       "e": "En la energía solar térmica, el programa de gestión energética registra el consumo de ACS y la contribución solar, para saber qué parte de la demanda cubre el sol. Las demás medidas son de calderas o de equipos de frío. Tema 6, apartado 1.10."
      },
      {
       "q": "En un generador de frío, la potencia térmica instantánea se registra como:",
       "o": [
        "Temperatura del local",
        "kWh mensuales",
        "Porcentaje de la carga máxima",
        "Caudal de aire"
       ],
       "c": 2,
       "e": "En los generadores de frío, la potencia térmica instantánea se registra como porcentaje de la carga máxima (medida 8 de la tabla de generadores de frío)."
      },
      {
       "q": "La inspección inicial de una instalación térmica:",
       "o": [
        "Es siempre obligatoria",
        "Solo se hace en instalaciones > 1.000 kW",
        "La realiza la empresa instaladora",
        "La podrá disponer el órgano competente de la CCAA"
       ],
       "c": 3,
       "e": "Una vez presentada la documentación de puesta en servicio."
      },
      {
       "q": "Las instalaciones existentes antes de la entrada en vigor del RITE se inspeccionan:",
       "o": [
        "Con la periodicidad del RITE pero con las condiciones técnicas de la norma con que se autorizaron",
        "Con las condiciones técnicas del RITE actual",
        "No se inspeccionan",
        "Solo si cambian de titular"
       ],
       "c": 0,
       "e": "Artículo 29 del RITE: se inspeccionan con la periodicidad actual, pero se comprueban con la norma con la que se autorizaron."
      },
      {
       "q": "Un sistema de aire acondicionado con generadores de frío de más de 70 kW se inspecciona:",
       "o": [
        "Cada 2 años",
        "Cada 4 años",
        "Cada 10 años",
        "Cada 15 años"
       ],
       "c": 1,
       "e": "La potencia se evalúa sumando las de generación de frío."
      },
      {
       "q": "En la inspección de sistemas de calefacción se excluyen:",
       "o": [
        "Las calderas de condensación",
        "Los sistemas solo de ACS de hasta 70 kW",
        "Las bombas de calor",
        "Los sistemas de más de 70 kW"
       ],
       "c": 1,
       "e": "IT 4: se excluyen los sistemas destinados únicamente a ACS ≤ 70 kW."
      },
      {
       "q": "La inspección de la instalación térmica completa incluye la elaboración de:",
       "o": [
        "Un certificado de instalación",
        "Un nuevo proyecto",
        "Un dictamen con propuestas de mejora justificadas por su rentabilidad",
        "El Manual de uso y mantenimiento"
       ],
       "c": 2,
       "e": "Mejoras de eficiencia e incorporación de renovables."
      },
      {
       "q": "La inspección de los sistemas de calefacción incluye una evaluación de:",
       "o": [
        "La instalación eléctrica",
        "La resistencia al fuego de la sala de calderas",
        "El aislamiento acústico",
        "El rendimiento y el dimensionado del generador frente a las necesidades del edificio"
       ],
       "c": 3,
       "e": "La IT 4 pide evaluar el rendimiento de los generadores y si su dimensionado es adecuado a las necesidades de calefacción del edificio. Las demás comprobaciones no son de la inspección de eficiencia energética (IT 4)."
      },
      {
       "q": "En la inspección de la instalación térmica completa se comprueba la adecuación del:",
       "o": [
        "Manual de uso y mantenimiento a la instalación existente",
        "Plan de autoprotección",
        "Proyecto de actividad",
        "Libro de órdenes de obra"
       ],
       "c": 0,
       "e": "En la inspección de la instalación completa se comprueba que el Manual de uso y mantenimiento corresponde a la instalación que existe realmente, y también el registro oficial de las operaciones de mantenimiento."
      },
      {
       "q": "Las mejoras propuestas en el dictamen de inspección se justifican por su rentabilidad:",
       "o": [
        "Solo económica",
        "Energética, medioambiental y económica",
        "Estética",
        "Solo energética"
       ],
       "c": 1,
       "e": "El dictamen de inspección propone mejoras justificadas por su rentabilidad energética, medioambiental y económica, no solo por una de ellas (IT 4)."
      },
      {
       "q": "Para decidir si un sistema de calefacción se inspecciona se considera:",
       "o": [
        "La potencia del mayor generador",
        "La superficie del edificio",
        "La suma de las potencias de generación de calefacción",
        "El número de usuarios"
       ],
       "c": 2,
       "e": "Para decidir si un sistema de calefacción debe inspeccionarse se suma la potencia de todos sus generadores, no solo la del mayor (IT 4)."
      },
      {
       "q": "El órgano que puede disponer una inspección inicial de una instalación térmica es:",
       "o": [
        "El ayuntamiento",
        "El Ministerio",
        "La empresa instaladora",
        "El órgano competente de la comunidad autónoma"
       ],
       "c": 3,
       "e": "Según el art. 29 del RITE, el órgano competente de la comunidad autónoma puede disponer inspecciones, incluida una inspección inicial, para comprobar que se cumple el reglamento."
      },
      {
       "q": "Para calcular el rendimiento de una caldera por el método directo hay que medir:",
       "o": [
        "CO, CO₂ y temperatura de humos",
        "La presión de la chimenea",
        "Solo la temperatura de humos",
        "Caudal de agua, temperaturas de entrada y salida y consumo de combustible"
       ],
       "c": 3,
       "e": "Método directo: η = ṁ·Cp·ΔT / (F·PCI). Se mide el caudal y las temperaturas de entrada y salida del agua, y el combustible consumido."
      },
      {
       "q": "En el método indirecto, el rendimiento de la caldera es:",
       "o": [
        "η = 100 − (Ph + Pi)",
        "η = ṁ·Cp·ΔT / (F·PCI)",
        "η = Qusable·(1 − 1/SCOP)",
        "η = U·I·cos φ"
       ],
       "c": 0,
       "e": "Ph: pérdidas en humos; Pi: inquemados; pérdidas por el cuerpo despreciables."
      },
      {
       "q": "En el método indirecto, las pérdidas de calor por el cuerpo de la caldera:",
       "o": [
        "Son las más importantes",
        "Se consideran despreciables",
        "Se miden con termopar",
        "Se suman al PCI"
       ],
       "c": 1,
       "e": "En el método indirecto solo se restan las pérdidas en humos (Ph) y por inquemados (Pi); las del cuerpo de la caldera se desprecian. Fuente: tema 6, apartado 1.15."
      },
      {
       "q": "El analizador de gases de combustión determina la concentración de los componentes mediante:",
       "o": [
        "Anemómetros de hilo caliente",
        "Tubos de Pitot",
        "Sensores electroquímicos",
        "Termómetros de bulbo húmedo"
       ],
       "c": 2,
       "e": "Lleva también sonda termopar y microbomba de muestreo."
      },
      {
       "q": "El rendimiento instantáneo de un equipo frigorífico se determina mediante el:",
       "o": [
        "SCOPdhw",
        "DTE",
        "PCI",
        "CEEV"
       ],
       "c": 3,
       "e": "Potencia en el evaporador entre potencia eléctrica del compresor."
      },
      {
       "q": "Para medir la velocidad del aire en un conducto por debajo de 6 m/s se recomienda:",
       "o": [
        "Anemómetro de hilo caliente",
        "Tubo de Pitot",
        "Manómetro de columna de agua",
        "Analizador de gases"
       ],
       "c": 0,
       "e": "La presión dinámica es muy baja (≈ 10 Pa a 4 m/s) y requiere mucha precisión."
      },
      {
       "q": "Una caldera calienta 1 kg/s de agua de 60 a 80 ºC (Cp = 4,18 kJ/kg·ºC) consumiendo 0,0022 kg/s de gasóleo (PCI = 42.000 kJ/kg). Su rendimiento por el método directo es aproximadamente:",
       "o": [
        "80 %",
        "90 %",
        "95 %",
        "100 %"
       ],
       "c": 1,
       "e": "Por el método directo, el rendimiento es el calor útil que recibe el agua dividido entre el calor que aporta el combustible.",
       "k": [
        "Calor útil = ṁ·Cp·ΔT = 1 · 4,18 · (80 − 60) = 83,6 kW",
        "Calor aportado = ṁc·PCI = 0,0022 · 42.000 = 92,4 kW",
        "η = 83,6 / 92,4 = 0,905 ≈ 90 %"
       ]
      },
      {
       "q": "Si las pérdidas en humos son del 7 % y por inquemados del 1 %, el rendimiento por el método indirecto es:",
       "o": [
        "93 %",
        "92 %",
        "99 %",
        "86 %"
       ],
       "c": 1,
       "e": "Por el método indirecto, el rendimiento es 100 % menos la suma de las pérdidas.",
       "k": [
        "η = 100 − (Ph + Pi)",
        "η = 100 − (7 + 1) = 92 %"
       ]
      },
      {
       "q": "En el método indirecto, las pérdidas por inquemados (Pi) dependen del contenido en humos de:",
       "o": [
        "CO",
        "O₂",
        "CO₂",
        "Vapor de agua"
       ],
       "c": 0,
       "e": "Las pérdidas por inquemados se deben al combustible que sale sin quemar, que se mide por el contenido de CO en los humos: Pi = (PCco/PCI)·CO."
      },
      {
       "q": "En el método indirecto, las pérdidas de calor sensible en humos (Ph) dependen de la diferencia entre:",
       "o": [
        "Temperatura de impulsión y retorno del agua",
        "Temperatura de humos y temperatura ambiente",
        "PCS y PCI",
        "Presión de humos y atmosférica"
       ],
       "c": 1,
       "e": "Las pérdidas de calor sensible se deben a que los humos salen más calientes que el ambiente: Ph = ṁ·Cp·(Ts − Ta)/(F·PCI), donde Ts es la temperatura de humos y Ta la ambiente."
      },
      {
       "q": "Para que el analizador de gases dé el rendimiento de combustión hay que seleccionar previamente:",
       "o": [
        "La altura de la chimenea",
        "La potencia de la caldera",
        "El combustible",
        "El fabricante del quemador"
       ],
       "c": 2,
       "e": "El analizador calcula el rendimiento a partir de la composición del combustible, que lleva programada para los combustibles habituales. Por eso hay que seleccionar antes el combustible que usa la caldera."
      },
      {
       "q": "En un equipo frigorífico, la potencia en el evaporador es 8 kW y el compresor absorbe 2,6 kW. Su CEEV es aproximadamente:",
       "o": [
        "0,33",
        "3,1",
        "5,4",
        "10,6"
       ],
       "c": 1,
       "e": "El coeficiente de eficiencia energética (CEEV o EER) es la potencia frigorífica obtenida en el evaporador dividida entre la potencia eléctrica que absorbe el compresor.",
       "k": [
        "CEEV = Pf / Pabs",
        "CEEV = 8 / 2,6 = 3,08 ≈ 3,1"
       ]
      },
      {
       "q": "La potencia eléctrica absorbida por un compresor monofásico se calcula como:",
       "o": [
        "PCI·F",
        "U·I / 3",
        "ṁ·ΔH",
        "U·I·cos φ / 1.000 (kW)"
       ],
       "c": 3,
       "e": "La potencia activa de un receptor monofásico es tensión por intensidad por factor de potencia: P = U·I·cos φ, en W. Al dividir entre 1.000 se obtienen kW. Tema 6, apartado 1.17."
      },
      {
       "q": "El CTE DB HE se aplica a una ampliación de un edificio existente cuando:",
       "o": [
        "Supera el 25 % de superficie",
        "Supera el 10 % de superficie o volumen y la superficie ampliada es > 50 m²",
        "Siempre, sea cual sea su tamaño",
        "Solo si cambia el uso"
       ],
       "c": 1,
       "e": "El 25 % se refiere a la envolvente en reformas."
      },
      {
       "q": "¿Cuál de estos edificios está EXCLUIDO del ámbito del CTE DB HE?",
       "o": [
        "Un hotel de nueva construcción",
        "Una vivienda reformada íntegramente",
        "Un edificio industrial",
        "Una oficina con cambio de uso de 200 m²"
       ],
       "c": 2,
       "e": "También protegidos, provisionales, defensa, agrícolas no residenciales y aislados < 50 m²."
      },
      {
       "q": "El DB HE 4 exige contribución renovable en edificios nuevos con una demanda de ACS superior a:",
       "o": [
        "50 l/día",
        "100 l/día",
        "1.000 l/día",
        "5.000 l/día"
       ],
       "c": 1,
       "e": "5.000 l/día es el umbral para bajar la exigencia al 60 %."
      },
      {
       "q": "La contribución renovable mínima para ACS en el DB HE 4, con demanda inferior a 5.000 l/día, es:",
       "o": [
        "50 %",
        "60 %",
        "70 %",
        "100 %"
       ],
       "c": 1,
       "e": "Con demanda ≥ 5.000 l/día, el 70 %."
      },
      {
       "q": "Para considerar renovable una bomba de calor eléctrica para ACS, su SCOPdhw debe ser como mínimo:",
       "o": [
        "1,15",
        "2,0",
        "2,5",
        "3,5"
       ],
       "c": 2,
       "e": "1,15 es el mínimo para las accionadas por energía térmica."
      },
      {
       "q": "Una bomba de calor con SCOP = 4 cubre una demanda de ACS de 1.000 kWh. La energía renovable (ERES) es:",
       "o": [
        "250 kWh",
        "714 kWh",
        "750 kWh",
        "1.000 kWh"
       ],
       "c": 2,
       "e": "Solo cuenta como renovable la parte de la energía que no aporta la electricidad.",
       "k": [
        "ERES = Q · (1 − 1/SCOP)",
        "ERES = 1.000 · (1 − 1/4) = 750 kWh"
       ]
      },
      {
       "q": "El SCOPdhw de una bomba de calor para ACS debe certificarlo el fabricante según la norma:",
       "o": [
        "UNE-EN 13501-1",
        "UNE-EN 12237",
        "UNE 100030",
        "UNE-EN 16147"
       ],
       "c": 3,
       "e": "Ensayos de bombas de calor con compresor eléctrico para ACS."
      },
      {
       "q": "Los límites de consumo del CTE DB HE se expresan en:",
       "o": [
        "kWh/m²·año",
        "kW",
        "kWh/año",
        "W/m²"
       ],
       "c": 0,
       "e": "Los límites de consumo de energía primaria del DB HE (Cep,nren,lim y Cep,tot,lim) son un consumo anual por unidad de superficie, por eso se expresan en kWh/m²·año."
      },
      {
       "q": "Los límites de consumo de energía primaria del DB HE dependen del uso y de:",
       "o": [
        "La zona climática de verano",
        "La zona climática de invierno",
        "La altura del edificio",
        "El número de plantas"
       ],
       "c": 1,
       "e": "Los límites de consumo de energía primaria del DB HE se fijan según el uso del edificio y su zona climática de invierno. Tema 6, apartado 2.1."
      },
      {
       "q": "En una reforma que renueva las instalaciones térmicas y más del 25 % de la envolvente, el DB HE se aplica a:",
       "o": [
        "Solo la parte reformada",
        "Solo las instalaciones",
        "Todo el edificio",
        "Solo la envolvente"
       ],
       "c": 2,
       "e": "Si una reforma renueva las instalaciones térmicas y más del 25 % de la envolvente, se considera una reforma importante y el DB HE se aplica a todo el edificio. En ampliaciones y cambios de uso, en cambio, solo se aplica a la parte afectada."
      },
      {
       "q": "En residencial privado, la demanda de referencia de ACS del DB HE 4 parte de:",
       "o": [
        "22 l/día·persona",
        "28 l/día·persona",
        "40 l/día·persona",
        "50 l/día·persona"
       ],
       "c": 1,
       "e": "En uso residencial privado, el DB HE 4 parte de 28 litros por persona y día, a los que se aplican la ocupación, el factor de centralización y las pérdidas."
      },
      {
       "q": "El DB HE 4 se aplica a una ampliación de un edificio existente cuando la demanda inicial supera 5.000 l/día y aumenta más del:",
       "o": [
        "10 %",
        "25 %",
        "50 %",
        "70 %"
       ],
       "c": 2,
       "e": "En una ampliación, el DB HE 4 se aplica si la demanda inicial de ACS supera los 5.000 l/día y aumenta más de un 50 %. Tema 6, apartado 2.1."
      },
      {
       "q": "En ampliaciones, la contribución renovable mínima del DB HE 4 se calcula sobre:",
       "o": [
        "Toda la demanda del edificio",
        "La potencia instalada",
        "La demanda inicial",
        "El incremento de la demanda de ACS"
       ],
       "c": 3,
       "e": "En una ampliación, la contribución renovable mínima se exige solo sobre el incremento de la demanda de ACS, no sobre toda la demanda del edificio. Tema 6, apartado 2.1."
      },
      {
       "q": "Para la contribución renovable del DB HE 4 solo se considera la energía:",
       "o": [
        "In situ, en las proximidades del edificio o de biomasa sólida",
        "Comprada a la red con garantía de origen",
        "De cualquier origen",
        "Solar fotovoltaica"
       ],
       "c": 0,
       "e": "Para cumplir el DB HE 4 solo cuenta la energía renovable producida in situ o en las proximidades del edificio, y la biomasa sólida. La energía comprada a la red no cuenta, aunque tenga garantía de origen. Tema 6, apartado 2.1."
      },
      {
       "q": "El SCOPdhw de una bomba de calor para ACS se determina para una temperatura de preparación no inferior a:",
       "o": [
        "35 ºC",
        "45 ºC",
        "60 ºC",
        "70 ºC"
       ],
       "c": 1,
       "e": "El SCOPdhw de una bomba de calor para ACS se determina para una temperatura de preparación de al menos 45 ºC. Tema 6, apartado 2.1."
      },
      {
       "q": "Una bomba de calor con SCOP = 2,5 cubre 1.000 kWh de ACS. Su energía renovable (ERES) es:",
       "o": [
        "400 kWh",
        "600 kWh",
        "714 kWh",
        "1.000 kWh"
       ],
       "c": 1,
       "e": "La energía renovable de una bomba de calor es la energía útil que entrega menos la eléctrica que consume.",
       "k": [
        "ERES = Qútil · (1 − 1/SCOP)",
        "ERES = 1.000 · (1 − 1/2,5) = 1.000 · 0,6 = 600 kWh"
       ]
      },
      {
       "q": "Los sistemas de medida de la energía renovable suministrada deben adecuarse al:",
       "o": [
        "REBT",
        "RITE",
        "RIPCI",
        "RSIF"
       ],
       "c": 1,
       "e": "Los sistemas que miden la energía renovable suministrada son parte de la instalación térmica, así que deben cumplir el RITE. Tema 6, apartado 2.3."
      },
      {
       "q": "El DB HE 4 se aplica a la climatización de piscinas cubiertas nuevas.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El DB HE 4 se aplica a la climatización de las piscinas cubiertas nuevas. También a las existentes que renuevan la generación de calor o que pasan a ser cubiertas."
      }
     ]
    }
   ]
  },
  {
   "id": "pci",
   "name": "Protección contra incendios",
   "short": "PCI",
   "trapsTitle": "Cifras clave",
   "traps": [
    "Velocidad de propagación: combustión < 1 m/s; deflagración entre 1 m/s y la del sonido; detonación por encima.",
    "Riesgo intrínseco: bajo hasta 850 MJ/m², medio hasta 3.400 MJ/m², alto por encima.",
    "Control de humo (CTE): aparcamientos no abiertos; comercial o pública concurrencia con más de 1.000 personas; atrios con más de 500.",
    "Pulsadores: recorrido máximo de 25 m; parte superior entre 80 y 120 cm.",
    "Extintores: recorrido máximo de 15 m (10 m en riesgo especial alto).",
    "BIE: a ≤ 5 m de las salidas; radio de acción = manguera + 5 m; separación máxima 50 m. 25 mm: 100 l/min; 45 mm: 200 l/min.",
    "Hidrantes: 500 l/min por boca.",
    "Columna seca: DN 80, toma IPF-41 en fachada, salidas IPF-39 en plantas; prueba a 20 bar durante 2 h.",
    "Presurización: ≥ 0,75 m/s por la puerta abierta; 10 Pa con puertas abiertas y 50 Pa cerradas; apertura ≤ 100 N.",
    "Inspecciones: RIPCI cada 10 años; RSCIEI riesgo bajo 5, medio 3 y alto 2 años.",
    "Mantenimiento: trimestral y semestral, también el personal del titular; anual y quinquenal, fabricante o mantenedora. Actas: 5 años."
   ],
   "tests": [
    {
     "id": "pci-temario",
     "name": "Temario",
     "short": "PCI · Temario",
     "examSize": 20,
     "examPen": 0.5,
     "examTime": 20,
     "source": "Examen real del 21-02-2026 (20 preguntas, solución oficial) y test de todo el temario de la Unidad 4, temas 1 a 5 (68 preguntas). Las respuestas son las de las soluciones comentadas del documento.",
     "presets": [
      {
       "id": "real-2026",
       "name": "Examen real del 21-02-2026",
       "idx": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
       ],
       "t": 20,
       "pen": 0.5
      }
     ],
     "questions": [
      {
       "q": "La combustión es cuando la velocidad de propagación es:",
       "o": [
        "Inferior a 1 m/s",
        "Superior a 1 m/s y menor a la velocidad del sonido",
        "Mayor que la velocidad del sonido"
       ],
       "c": 0,
       "e": "Combustión: menos de 1 m/s. Entre 1 m/s y la velocidad del sonido es deflagración, y por encima, detonación."
      },
      {
       "q": "La sectorización es una medida de protección contra incendios:",
       "o": [
        "Pasiva",
        "Activa",
        "Pasiva y activa"
       ],
       "c": 0,
       "e": "Es arquitectónica: elementos constructivos resistentes al fuego."
      },
      {
       "q": "El estudio de la carga de fuego:",
       "o": [
        "Sirve para categorizar el riesgo de los sectores de incendio",
        "Nos indica el tipo de detectores que se deben instalar",
        "Clasifica los sectores en función de los tipos de fuego que se pueden generar"
       ],
       "c": 0,
       "e": "La carga de fuego (MJ/m²) es lo que fija el nivel de riesgo intrínseco de cada sector. Fuente: tema 1, 1.2."
      },
      {
       "q": "El control del humo del incendio se aplica a:",
       "o": [
        "Zonas de uso aparcamiento que no tengan la consideración de aparcamiento abierto",
        "Establecimientos de uso comercial o pública concurrencia cuya ocupación exceda de 500 personas",
        "Atrios cuya ocupación en el mismo sector exceda de 1.000 personas"
       ],
       "c": 0,
       "e": "Las cifras de las otras dos opciones están intercambiadas: comercial o pública concurrencia es con más de 1.000 personas, y atrios con más de 500."
      },
      {
       "q": "Un sistema de detección de incendios analógico es:",
       "o": [
        "Aquel cuyos componentes trabajan por zonas, áreas o grupos",
        "Aquel en el que cada equipo del sistema tiene su propia dirección",
        "A y B son incorrectas"
       ],
       "c": 1,
       "e": "Trabajar por zonas, áreas o grupos es lo que define al sistema convencional."
      },
      {
       "q": "Los detectores iónicos son detectores puntuales.",
       "o": [
        "Falso",
        "Verdadero"
       ],
       "c": 1,
       "e": "Son detectores puntuales de cámara ionizada."
      },
      {
       "q": "Los detectores ópticos se determinan en función de:",
       "o": [
        "Área y altura del local donde se instala",
        "Forma del techo o cubierta",
        "A y B son correctas"
       ],
       "c": 2,
       "e": "UNE 23007-14: sistema, área y altura, forma del techo y uso."
      },
      {
       "q": "Los pulsadores de alarma se situarán de modo que la distancia máxima a recorrer desde cualquier origen de evacuación hasta un pulsador:",
       "o": [
        "No supere los 25 m",
        "No supere los 15 m",
        "No supere los 50 m"
       ],
       "c": 0,
       "e": "15 m es el extintor y 50 m la separación entre BIE."
      },
      {
       "q": "Un extintor de polvo polivalente se puede utilizar para fuegos tipo E.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Clase E = eléctricos; el polvo no conduce."
      },
      {
       "q": "Para seleccionar los sistemas de abastecimiento se necesita determinar para su dimensionamiento:",
       "o": [
        "Caudal nominal, presión nominal y tiempo de autonomía",
        "Categorización del abastecimiento y la altura del edificio",
        "Ambas son correctas"
       ],
       "c": 0,
       "e": "Datos nominales, categoría y clase; la altura del edificio no es un dato de la UNE 23500."
      },
      {
       "q": "Las BIE de 45 mm:",
       "o": [
        "Se deben utilizar por una sola persona y no es necesaria formación previa",
        "Se deben utilizar por una sola persona y es necesaria la formación previa",
        "Se deben utilizar por 2 personas y es necesaria la formación previa"
       ],
       "c": 2,
       "e": "Manguera flexible de mayor caudal (200 l/min)."
      },
      {
       "q": "La columna seca está normativamente constituida por:",
       "o": [
        "Tubería ascendente de acero galvanizado de 80 mm de diámetro interior",
        "Tubería ascendente de acero galvanizado de 100 mm de diámetro interior",
        "Tubería ascendente de acero galvanizado de 200 mm de diámetro interior"
       ],
       "c": 0,
       "e": "DN 80 (3\") en acero galvanizado."
      },
      {
       "q": "Los rociadores automáticos de agua permiten detectar el incendio y apagarlo.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "O controlarlo para que se apague por otros medios."
      },
      {
       "q": "El tamaño de la señalética fotoluminiscente depende de la distancia de observación.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Una señal de 210 × 210 mm sirve hasta 10 m; para más distancia la señal tiene que ser mayor."
      },
      {
       "q": "Los exutorios son sistemas de control de humo que se instalan en los puntos más bajos del edificio.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Se instalan en los puntos altos: el humo caliente sube."
      },
      {
       "q": "Los sistemas por impulsos (jet fan) son sistemas alternativos del control de humo que:",
       "o": [
        "Se instalan exclusivamente en túneles",
        "Requieren de un análisis prestacional y cálculo CFD",
        "A y B son incorrectas"
       ],
       "c": 1,
       "e": "También en aparcamientos; no hay norma UNE-EN."
      },
      {
       "q": "El control de humo se debe instalar en establecimientos de uso comercial o pública concurrencia cuya ocupación exceda de 500 personas.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Son 1.000 personas; 500 es para atrios."
      },
      {
       "q": "En las escaleras protegidas la ventilación se puede hacer:",
       "o": [
        "Ventana o hueco directo al exterior de al menos 0,5 m² por planta",
        "Conductos de entrada y salida de aire que pueden ser compartidos con la ventilación general",
        "Sistema de presión diferencial"
       ],
       "c": 2,
       "e": "El hueco es de 1 m² y los conductos deben ser exclusivos."
      },
      {
       "q": "El RD 2267/2004 y el RD 164/2025 se aplican a:",
       "o": [
        "Exclusivamente establecimientos industriales",
        "Uso comercial y pública concurrencia",
        "Establecimientos industriales así como cuando lo requiera el CTE DB SI"
       ],
       "c": 2,
       "e": "El RSCIEI (RD 2267/2004, actualizado por el RD 164/2025) se aplica a los establecimientos industriales y también cuando el CTE DB SI remite a él, por ejemplo en zonas de uso industrial dentro de edificios no industriales."
      },
      {
       "q": "El CTE DB SI establece las necesidades normativas de:",
       "o": [
        "Medidas pasivas",
        "Medidas activas",
        "A y B son correctas"
       ],
       "c": 2,
       "e": "SI 1, 2, 3, 6 pasivas; SI 4 activas."
      },
      {
       "q": "La deflagración es una reacción cuya velocidad de propagación es:",
       "o": [
        "Inferior a 1 m/s",
        "Superior a 1 m/s y menor que la del sonido",
        "Mayor que la del sonido"
       ],
       "c": 1,
       "e": "Combustión: menos de 1 m/s; deflagración: entre 1 m/s y la velocidad del sonido; detonación: por encima. Fuente: tema 1, 1.1."
      },
      {
       "q": "Un local de riesgo especial se considera sector de incendio.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "El DB SI lo excluye expresamente."
      },
      {
       "q": "En la clasificación de resistencia al fuego, la letra I indica:",
       "o": [
        "Integridad",
        "Capacidad portante",
        "Aislamiento térmico"
       ],
       "c": 2,
       "e": "R portante, E integridad, I aislamiento."
      },
      {
       "q": "Un material de clase A1 de reacción al fuego:",
       "o": [
        "No contribuye a la propagación del fuego",
        "Tiene muy baja contribución al fuego",
        "No ha sido ensayado"
       ],
       "c": 0,
       "e": "Muy baja es B; sin ensayar es F."
      },
      {
       "q": "En la clasificación de reacción al fuego, «d2» significa:",
       "o": [
        "Producción alta de humo",
        "Caída de gotas o partículas inflamadas",
        "Caída de gotas no inflamadas"
       ],
       "c": 1,
       "e": "d0 ninguna, d1 no inflamadas, d2 inflamadas."
      },
      {
       "q": "No se debe confundir la reacción al fuego con la resistencia al fuego.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Reacción: contribución del material; resistencia: tiempo que el elemento mantiene su función."
      },
      {
       "q": "Los almacenamientos en establecimientos no industriales se consideran zona de uso industrial cuando su carga de fuego ponderada y corregida excede de:",
       "o": [
        "3·10⁶ MJ",
        "500 MJ/m²",
        "40 MJ/m²"
       ],
       "c": 0,
       "e": "40 MJ/m² es el umbral de riesgo mínimo."
      },
      {
       "q": "La sección del DB SI que fija la dotación de instalaciones de protección contra incendios es:",
       "o": [
        "SI 1",
        "SI 3",
        "SI 4"
       ],
       "c": 2,
       "e": "SI 3 es evacuación (incluye el control de humo)."
      },
      {
       "q": "En un edificio terciario, el diseño, montaje y mantenimiento de las instalaciones activas los fija:",
       "o": [
        "El CTE DB SI 4",
        "El RD 2267/2004",
        "El RIPCI (RD 513/2017)"
       ],
       "c": 2,
       "e": "El CTE fija la dotación; el RIPCI, cómo se diseñan y mantienen."
      },
      {
       "q": "Un establecimiento industrial que ocupa totalmente un edificio situado a más de 3 m de otros es de tipo:",
       "o": [
        "A",
        "B",
        "C"
       ],
       "c": 2,
       "e": "B: adosado o a ≤ 3 m."
      },
      {
       "q": "Un establecimiento que ocupa un espacio abierto cubierto hasta el 50 % de su superficie es de tipo:",
       "o": [
        "C",
        "D",
        "E"
       ],
       "c": 2,
       "e": "D puede estar totalmente cubierto."
      },
      {
       "q": "Un sector industrial con Qs = 2.000 MJ/m² tiene un riesgo intrínseco:",
       "o": [
        "Medio",
        "Bajo",
        "Alto"
       ],
       "c": 0,
       "e": "Medio: de 850 a 3.400 MJ/m² (nivel 5)."
      },
      {
       "q": "En un establecimiento de tipo A, los sectores de riesgo intrínseco alto:",
       "o": [
        "Se admiten hasta 2.000 m²",
        "No se admiten",
        "Se admiten hasta 400 m²"
       ],
       "c": 1,
       "e": "En un establecimiento tipo A (parte de un edificio) el RSCIEI no admite sectores de riesgo intrínseco alto."
      },
      {
       "q": "El RSCIEI se considera un reglamento autocontenido.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Regula dotación, sectorización, evacuación, etc. para la industria."
      },
      {
       "q": "La fase del incendio en la que hay humos todavía invisibles es:",
       "o": [
        "La de humo visible",
        "La de llamas",
        "La incipiente"
       ],
       "c": 2,
       "e": "Por eso interesa la detección precoz."
      },
      {
       "q": "La norma de diseño, instalación y puesta en servicio de los sistemas de detección a la que remite el RIPCI es:",
       "o": [
        "UNE 23500",
        "UNE 23007-14",
        "UNE-EN 12845"
       ],
       "c": 1,
       "e": "UNE 23500 es abastecimiento; 12845, rociadores."
      },
      {
       "q": "En un sistema convencional, la alarma de un detector se interpreta como alarma:",
       "o": [
        "De la zona que protege",
        "De ese detector concreto",
        "De todo el edificio"
       ],
       "c": 0,
       "e": "El analógico identifica cada equipo."
      },
      {
       "q": "Los pulsadores se situarán con su parte superior a una altura entre:",
       "o": [
        "80 y 120 cm",
        "120 y 150 cm",
        "50 y 80 cm"
       ],
       "c": 0,
       "e": "RIPCI, anexo I: parte superior entre 80 y 120 cm, y recorrido máximo de 25 m hasta un pulsador."
      },
      {
       "q": "Los detectores ópticos admiten, según la UNE 23007-14, alturas de local de hasta:",
       "o": [
        "6 m",
        "12 m",
        "20 m"
       ],
       "c": 1,
       "e": "Con coberturas de 60 a 80 m²."
      },
      {
       "q": "En un local de más de 80 m² y altura ≤ 6 m, la superficie vigilada por un detector puntual de humo (pendiente ≤ 20º) es:",
       "o": [
        "60 m²",
        "80 m²",
        "30 m²"
       ],
       "c": 0,
       "e": "80 m² si el local es ≤ 80 m² o la altura está entre 6 y 12 m."
      },
      {
       "q": "En una cocina, para evitar falsas alarmas, lo adecuado es un detector:",
       "o": [
        "Iónico",
        "Térmico",
        "Óptico de humo"
       ],
       "c": 1,
       "e": "Los térmicos se usan en atmósferas calientes o con humo."
      },
      {
       "q": "Un detector termovelocimétrico actúa por:",
       "o": [
        "Alcanzar una temperatura fija",
        "La radiación de las llamas",
        "La velocidad de subida de la temperatura"
       ],
       "c": 2,
       "e": "El termovelocimétrico reacciona a la velocidad de subida de la temperatura, del orden de 5 a 10 ºC/min, no a un valor fijo."
      },
      {
       "q": "Los detectores de llama son adecuados para detectar llamas invisibles como las del hidrógeno.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Pero dan falsas alarmas con sol o soldadura."
      },
      {
       "q": "Los detectores de aspiración están indicados en:",
       "o": [
        "Salas de informática y falsos suelos",
        "Cocinas",
        "Espacios exteriores"
       ],
       "c": 0,
       "e": "Detección precoz y de alta sensibilidad."
      },
      {
       "q": "Los avisadores visuales son obligatorios, entre otros casos, cuando el ruido supera:",
       "o": [
        "40 dB(A)",
        "60 dB(A)",
        "85 dB(A)"
       ],
       "c": 1,
       "e": "También con personas sordas o con protección auditiva."
      },
      {
       "q": "Los cables de detección que deban funcionar más de un minuto tras la detección deben soportar el fuego al menos:",
       "o": [
        "15 min",
        "30 min",
        "90 min"
       ],
       "c": 1,
       "e": "UNE 23007-14, anexo A: los cables que deban seguir funcionando tras la detección resisten al menos 30 minutos."
      },
      {
       "q": "Los retenedores de puerta liberan la hoja:",
       "o": [
        "Al recibir tensión",
        "Al cortarse la tensión",
        "Solo de forma manual"
       ],
       "c": 1,
       "e": "Seguridad positiva: el electroimán retiene la puerta mientras hay tensión; al cortarse (alarma o fallo) la puerta se cierra."
      },
      {
       "q": "El puesto de control de rociadores de acción previa se emplea donde:",
       "o": [
        "Hay riesgo de heladas",
        "Hay tubería húmeda",
        "Hay que evitar a toda costa una descarga accidental"
       ],
       "c": 2,
       "e": "La acción previa solo llena la tubería cuando la detección confirma el incendio. Se usa donde una descarga accidental sería grave: CPD, archivos de papel."
      },
      {
       "q": "La zona de refugio para usuario de silla de ruedas mide:",
       "o": [
        "0,80 × 0,60 m",
        "1,20 × 0,80 m",
        "1,50 × 1,50 m"
       ],
       "c": 1,
       "e": "0,80 × 0,60 m es para otra movilidad reducida; 1,50 m es el círculo libre."
      },
      {
       "q": "El tetraedro del fuego añade al triángulo:",
       "o": [
        "La reacción en cadena",
        "El humo",
        "El agua"
       ],
       "c": 0,
       "e": "Combustible, comburente, calor y reacción en cadena."
      },
      {
       "q": "El método de extinción más adecuado para un fuego de clase A es:",
       "o": [
        "Sofocación",
        "Enfriamiento",
        "Inhibición"
       ],
       "c": 1,
       "e": "Los fuegos de clase A son de sólidos y se apagan sobre todo por enfriamiento (agua)."
      },
      {
       "q": "Los fuegos de clase F/K son los originados por:",
       "o": [
        "Metales",
        "Gases",
        "Aceites y grasas de cocina"
       ],
       "c": 2,
       "e": "La clase F (K en EE. UU.) es la de aceites y grasas de cocina; se creó en 2005."
      },
      {
       "q": "En la eficacia 21A-113B, «113B» se refiere a:",
       "o": [
        "113 vigas de madera",
        "113 litros de líquido en el hogar tipo",
        "113 segundos de descarga"
       ],
       "c": 1,
       "e": "En 113B, el número son los litros de líquido del hogar tipo: 1/3 agua y 2/3 heptano."
      },
      {
       "q": "En un local de riesgo especial alto, el recorrido máximo hasta un extintor es:",
       "o": [
        "10 m",
        "15 m",
        "25 m"
       ],
       "c": 0,
       "e": "15 m en riesgo bajo o medio."
      },
      {
       "q": "En un abastecimiento combinado de BIE y rociadores se requiere como mínimo categoría:",
       "o": [
        "I",
        "II",
        "III"
       ],
       "c": 1,
       "e": "UNE 23500, tabla 2: el abastecimiento combinado de BIE y rociadores exige como mínimo categoría II."
      },
      {
       "q": "El grupo de bombeo debe impulsar como mínimo el 140 % del caudal nominal a una presión no inferior al:",
       "o": [
        "50 % de la nominal",
        "70 % de la nominal",
        "100 % de la nominal"
       ],
       "c": 1,
       "e": "UNE 23500, 6.4.2.2: al 140 % del caudal nominal, la presión no puede bajar del 70 % de la nominal."
      },
      {
       "q": "La presión de impulsión de las bombas contra incendios no debe sobrepasar:",
       "o": [
        "10 bar",
        "15 bar",
        "20 bar"
       ],
       "c": 1,
       "e": "20 bar es la prueba de la columna seca."
      },
      {
       "q": "El caudal mínimo de cada boca de hidrante es:",
       "o": [
        "100 l/min",
        "200 l/min",
        "500 l/min"
       ],
       "c": 2,
       "e": "100 y 200 l/min son las BIE de 25 y 45 mm."
      },
      {
       "q": "Las BIE deben situarse a una distancia máxima de las salidas del sector de:",
       "o": [
        "5 m",
        "15 m",
        "25 m"
       ],
       "c": 0,
       "e": "Medida sobre recorrido de evacuación."
      },
      {
       "q": "El radio de acción de una BIE es:",
       "o": [
        "La longitud de su manguera más 5 m",
        "La longitud de su manguera",
        "50 m"
       ],
       "c": 0,
       "e": "50 m es la separación máxima entre BIE."
      },
      {
       "q": "La red de BIE debe garantizar durante una hora el caudal de las dos más desfavorables a una presión dinámica de:",
       "o": [
        "100 a 300 kPa",
        "300 a 600 kPa",
        "600 a 1.000 kPa"
       ],
       "c": 1,
       "e": "Durante una hora, con las dos BIE más desfavorables funcionando, la presión dinámica debe estar entre 300 y 600 kPa. Fuente: tema 3, 2.4."
      },
      {
       "q": "Un establecimiento industrial de riesgo intrínseco alto requiere BIE de:",
       "o": [
        "25 mm, 2 simultáneas, 60 min",
        "45 mm, 2 simultáneas, 60 min",
        "45 mm, 3 simultáneas, 90 min"
       ],
       "c": 2,
       "e": "Bajo: DN 25; medio: DN 45, 2 y 60 min."
      },
      {
       "q": "La columna seca es de uso exclusivo de los bomberos.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Lleva el agua del camión a las plantas."
      },
      {
       "q": "La toma de alimentación de la columna seca en fachada es la:",
       "o": [
        "IPF-39",
        "IPF-41",
        "IPF-40"
       ],
       "c": 1,
       "e": "IPF-39 son las salidas en plantas."
      },
      {
       "q": "Las señales de los medios manuales de 210 × 210 mm sirven para una distancia de observación de hasta:",
       "o": [
        "10 m",
        "20 m",
        "30 m"
       ],
       "c": 0,
       "e": "UNE 23033-1: una señal de 210 × 210 mm sirve hasta 10 m de distancia de observación."
      },
      {
       "q": "Los sistemas de extinción por gases llevan retardo para:",
       "o": [
        "Ahorrar agente extintor",
        "Permitir la evacuación por el riesgo de asfixia",
        "Esperar a que actúen los rociadores"
       ],
       "c": 1,
       "e": "Los gases desplazan el oxígeno y hay riesgo de asfixia: el retardo da tiempo a evacuar antes de la descarga."
      },
      {
       "q": "La mayoría de las muertes en incendios de locales de pública concurrencia se deben a:",
       "o": [
        "Las altas temperaturas",
        "Derrumbes",
        "La inhalación de humos tóxicos"
       ],
       "c": 2,
       "e": "Por eso se controla el humo."
      },
      {
       "q": "La estrategia de presurización diferencial se aplica en:",
       "o": [
        "Vías de evacuación",
        "Edificios de techo alto",
        "Túneles"
       ],
       "c": 0,
       "e": "Techo alto: flotabilidad; túneles: ventilación horizontal."
      },
      {
       "q": "Para la ventilación horizontal (jet fan) existe una norma UNE-EN de diseño.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Se usan documentos de reconocida solvencia y CFD."
      },
      {
       "q": "Los sistemas de control de humo por flotabilidad se diseñan según la norma:",
       "o": [
        "UNE 23585",
        "UNE 23584",
        "UNE-EN 12101-6"
       ],
       "c": 0,
       "e": "23584 es instalación y mantenimiento."
      },
      {
       "q": "Según el CTE, el control de humo es obligatorio en atrios cuando su ocupación en el sector excede de:",
       "o": [
        "500 personas",
        "1.000 personas",
        "100 personas"
       ],
       "c": 0,
       "e": "1.000 es para comercial y pública concurrencia."
      },
      {
       "q": "En un aparcamiento con ventilación mecánica, los ventiladores de extracción deben ser:",
       "o": [
        "F400 120",
        "F300 60",
        "E300 60"
       ],
       "c": 1,
       "e": "E300 60 se exige a conductos y compuertas."
      },
      {
       "q": "Según el RSCIEI, un sector de almacenamiento de riesgo alto necesita evacuación de humos a partir de:",
       "o": [
        "800 m²",
        "1.000 m²",
        "2.000 m²"
       ],
       "c": 0,
       "e": "Almacenamiento medio ≥ 1.000; producción medio ≥ 2.000, alto ≥ 1.000."
      },
      {
       "q": "En una escalera protegida ventilada por conductos, estos pueden compartirse con la ventilación general.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Deben ser exclusivos para esa función."
      },
      {
       "q": "En presurización, la velocidad del aire por la puerta abierta no será inferior a:",
       "o": [
        "0,5 m/s",
        "0,75 m/s",
        "1 m/s"
       ],
       "c": 1,
       "e": "UNE-EN 12101-6: con la puerta abierta, el aire debe pasar a 0,75 m/s como mínimo para frenar el humo."
      },
      {
       "q": "En un sistema de presurización de clase E, con las puertas cerradas la diferencia de presión mínima es:",
       "o": [
        "10 Pa",
        "50 Pa",
        "100 Pa"
       ],
       "c": 1,
       "e": "10 Pa con puertas abiertas; 100 N es la fuerza en el tirador."
      },
      {
       "q": "La fuerza para abrir una puerta en un espacio presurizado no debe superar:",
       "o": [
        "50 N",
        "100 N",
        "150 N"
       ],
       "c": 1,
       "e": "UNE-EN 12101-6, 4.6.2.3: la fuerza en el tirador no debe superar 100 N, para que cualquiera pueda abrir."
      },
      {
       "q": "Al activarse la presurización de una escalera, los climatizadores del edificio deben:",
       "o": [
        "Seguir funcionando",
        "Ponerse en máxima impulsión",
        "Pararse"
       ],
       "c": 2,
       "e": "Para no interferir con el gradiente de presión."
      },
      {
       "q": "Para poner en funcionamiento una instalación del RIPCI hay que presentar ante la comunidad autónoma:",
       "o": [
        "El contrato con la compañía de agua",
        "El acta del organismo de control",
        "El certificado de la empresa instaladora"
       ],
       "c": 2,
       "e": "Firmado por su técnico titulado."
      },
      {
       "q": "Las operaciones de mantenimiento anuales y quinquenales pueden realizarlas:",
       "o": [
        "El personal del titular",
        "El fabricante o la empresa mantenedora",
        "Cualquier usuario"
       ],
       "c": 1,
       "e": "RIPCI, anexo II, tabla II: las anuales y quinquenales solo el fabricante o la empresa mantenedora."
      },
      {
       "q": "Si el fabricante no indica la vida útil de los detectores, esta se considera de:",
       "o": [
        "5 años",
        "10 años",
        "15 años"
       ],
       "c": 1,
       "e": "Igual que las señales fotoluminiscentes."
      },
      {
       "q": "La verificación de la ubicación, visibilidad y estado de los pulsadores se hace cada:",
       "o": [
        "3 meses",
        "6 meses",
        "Año"
       ],
       "c": 1,
       "e": "La prueba de funcionamiento de todos los pulsadores es anual."
      },
      {
       "q": "Según el RIPCI, el titular debe solicitar la inspección de sus instalaciones a un organismo de control al menos cada:",
       "o": [
        "5 años",
        "10 años",
        "15 años"
       ],
       "c": 1,
       "e": "Con las excepciones por uso y superficie."
      },
      {
       "q": "Si en una inspección se detectan defectos muy graves o no se corrigen en plazo, el organismo de control:",
       "o": [
        "Precinta la instalación",
        "Lo comunica a los servicios de industria de la comunidad autónoma",
        "Lo comunica al ayuntamiento"
       ],
       "c": 1,
       "e": "El organismo de control lo comunica a los servicios de industria de la comunidad autónoma. Fuente: tema 5, apartado 4."
      },
      {
       "q": "El certificado para la puesta en marcha de un establecimiento industrial lo emite:",
       "o": [
        "El ayuntamiento",
        "El organismo de control",
        "Un técnico titulado competente"
       ],
       "c": 2,
       "e": "Con riesgo intrínseco, sectores, características constructivas y certificado de la instaladora."
      },
      {
       "q": "El RIPCI se estructura en:",
       "o": [
        "17 artículos y 4 anexos",
        "23 artículos, 9 disposiciones y 3 anexos",
        "6 secciones"
       ],
       "c": 1,
       "e": "17 artículos y 4 anexos es el RSCIEI; 6 secciones, el DB SI."
      },
      {
       "q": "Antes de su puesta en servicio, la red de BIE se prueba a una presión mínima de 980 kPa durante:",
       "o": [
        "30 minutos",
        "1 hora",
        "2 horas"
       ],
       "c": 2,
       "e": "A la presión máxima de servicio y como mínimo 980 kPa, durante 2 horas, sin fugas en ningún punto."
      },
      {
       "q": "La instalación, puesta en marcha y mantenimiento de los sistemas de control de humo por flotabilidad siguen la norma:",
       "o": [
        "UNE 23585",
        "UNE 23584",
        "UNE-EN 12101-2"
       ],
       "c": 1,
       "e": "La UNE 23584 es la de instalación, puesta en marcha y mantenimiento; la UNE 23585 es la de diseño."
      }
     ]
    },
    {
     "id": "pci-verif",
     "name": "Verificación",
     "short": "PCI · Verificación",
     "examSize": 20,
     "examPen": 0.5,
     "examTime": 20,
     "source": "Banco ampliado de verificación de PCI (tema 5: CTE DB SI 4, RSCIEI y RIPCI, más las pruebas y verificaciones de los temas 1 a 4): 87 preguntas tipo test. Las respuestas son las de las soluciones comentadas del documento.",
     "questions": [
      {
       "q": "Para poner en funcionamiento una instalación del RIPCI hay que presentar ante la comunidad autónoma:",
       "o": [
        "El contrato con la compañía de agua",
        "El acta del organismo de control",
        "El certificado de la empresa instaladora"
       ],
       "c": 2,
       "e": "Firmado por su técnico titulado."
      },
      {
       "q": "El titular de una instalación de protección contra incendios puede asumir las funciones de mantenedor.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Si se habilita, dispone de medios y asume la ejecución."
      },
      {
       "q": "El objeto del CTE DB SI es establecer las condiciones de los edificios:",
       "o": [
        "Incluidos los de uso industrial",
        "Solo de uso industrial",
        "Excluidos los de uso industrial"
       ],
       "c": 2,
       "e": "El DB SI del CTE se aplica a los edificios excepto a los de uso industrial, que se rigen por el RSCIEI (RD 2267/2004, actualizado por el RD 164/2025)."
      },
      {
       "q": "El objeto del RIPCI es regular el diseño, instalación, mantenimiento e inspección de:",
       "o": [
        "La protección activa contra incendios",
        "La protección pasiva",
        "La evacuación de ocupantes"
       ],
       "c": 0,
       "e": "El RIPCI regula los medios de protección activa: detección, alarma, control y extinción. La protección pasiva (sectorización, resistencia y reacción al fuego) y la evacuación las regulan el CTE DB SI y el RSCIEI."
      },
      {
       "q": "La protección activa contra incendios puede estar formada por medios manuales o automáticos.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Según la definición del RIPCI, la protección activa la forman equipos y sistemas que pueden ser manuales (extintores, BIE, pulsadores) o automáticos (detección, rociadores)."
      },
      {
       "q": "En el RIPCI, las normas UNE de cada equipo o sistema se enumeran en:",
       "o": [
        "El anexo III",
        "El apéndice del anexo I",
        "El artículo 22"
       ],
       "c": 1,
       "e": "El apéndice del anexo I del RIPCI recoge las normas UNE que deben cumplir cada equipo y cada sistema. Tema 5, apartado 4."
      },
      {
       "q": "El certificado de la empresa instaladora del RIPCI lo emite:",
       "o": [
        "El titular de la instalación",
        "El organismo de control",
        "Un técnico titulado competente designado por la instaladora"
       ],
       "c": 2,
       "e": "El certificado lo emite la empresa instaladora y lo firma un técnico titulado competente designado por ella. El organismo de control interviene después, en las inspecciones. Tema 5, apartado 4."
      },
      {
       "q": "El certificado de la instaladora acredita que la instalación cumple el RIPCI y se ajusta:",
       "o": [
        "Al proyecto o documentación técnica",
        "Al presupuesto",
        "Al plan de autoprotección"
       ],
       "c": 0,
       "e": "Con el certificado, la instaladora acredita que la instalación cumple el RIPCI y que se ha ejecutado según el proyecto o la documentación técnica que la define. Tema 5, apartado 4."
      },
      {
       "q": "La señalización de las instalaciones manuales que exige el DB SI 4 debe cumplir lo establecido en:",
       "o": [
        "El REBT",
        "El RIPCI",
        "El RITE"
       ],
       "c": 1,
       "e": "El DB SI 4 remite al RIPCI (RD 513/2017) para la señalización de las instalaciones manuales de protección contra incendios, como extintores, BIE y pulsadores."
      },
      {
       "q": "Entre los requisitos generales del DB SI 4, el ascensor de emergencia depende de:",
       "o": [
        "La superficie construida",
        "La ocupación",
        "La altura de evacuación"
       ],
       "c": 2,
       "e": "En el DB SI 4, el ascensor de emergencia se exige según la altura de evacuación del edificio, no según la superficie ni la ocupación. Tema 5, apartado 2."
      },
      {
       "q": "En el DB SI 4, la extinción automática en cocinas depende de:",
       "o": [
        "La potencia instalada",
        "La superficie de la cocina",
        "El número de comensales"
       ],
       "c": 0,
       "e": "En el DB SI 4, la extinción automática en cocinas se exige según la potencia instalada de los aparatos de cocción. También se exige en centros de transformación."
      },
      {
       "q": "Los locales de riesgo especial se clasifican en riesgo:",
       "o": [
        "Niveles 1 a 8",
        "Alto, medio y bajo",
        "Tipos A a E"
       ],
       "c": 1,
       "e": "El DB SI clasifica los locales de riesgo especial en riesgo alto, medio y bajo. Los niveles 1 a 8 de riesgo intrínseco y las configuraciones de tipo A a E son del RSCIEI, para establecimientos industriales."
      },
      {
       "q": "El RIPCI también regula las condiciones de control de los productos a emplear.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Además del diseño, la instalación y el mantenimiento, el RIPCI regula las condiciones de control de los productos que se emplean: marcado CE, certificación y conformidad con las normas. Tema 1, apartado 2.3."
      },
      {
       "q": "Los extintores portátiles deben certificarse antes de su fabricación o importación según el:",
       "o": [
        "Anexo III del RIPCI",
        "Artículo 22 del RIPCI",
        "Artículo 5.2 del RIPCI"
       ],
       "c": 2,
       "e": "El art. 5.2 del RIPCI exige que los extintores portátiles estén certificados antes de fabricarse o importarse, conforme a las normas UNE-EN 3-7 y UNE-EN 3-10."
      },
      {
       "q": "Las operaciones de mantenimiento trimestrales y semestrales pueden realizarlas:",
       "o": [
        "El fabricante, la mantenedora o el personal del titular",
        "Solo la empresa mantenedora",
        "Solo el organismo de control"
       ],
       "c": 0,
       "e": "RIPCI, anexo II, tabla I: las operaciones trimestrales y semestrales las puede hacer el fabricante, la mantenedora o el personal del titular."
      },
      {
       "q": "Las operaciones de mantenimiento anuales y quinquenales pueden realizarlas:",
       "o": [
        "El personal del titular",
        "El fabricante o la empresa mantenedora",
        "Cualquier usuario"
       ],
       "c": 1,
       "e": "RIPCI, anexo II, tabla II: las anuales y quinquenales solo el fabricante o la empresa mantenedora."
      },
      {
       "q": "Las actas de mantenimiento deben estar a disposición de la comunidad autónoma al menos durante:",
       "o": [
        "2 años",
        "5 años",
        "10 años"
       ],
       "c": 1,
       "e": "Cinco años contados desde su expedición."
      },
      {
       "q": "Las actas de mantenimiento deben ser conformes con la serie de normas:",
       "o": [
        "UNE 23580",
        "UNE 23500",
        "UNE 192005"
       ],
       "c": 0,
       "e": "UNE 192005 es el procedimiento de inspección."
      },
      {
       "q": "Si el fabricante no indica la vida útil de los detectores, esta se considera de:",
       "o": [
        "5 años",
        "10 años",
        "15 años"
       ],
       "c": 1,
       "e": "Igual que las señales fotoluminiscentes."
      },
      {
       "q": "La comprobación del espacio libre de 500 mm bajo los detectores puntuales tiene periodicidad:",
       "o": [
        "Trimestral",
        "Semestral",
        "Anual"
       ],
       "c": 2,
       "e": "Es una operación anual (tabla II del RIPCI), hecha por el fabricante o la mantenedora."
      },
      {
       "q": "La prueba de conmutación del sistema de detección a baterías por fallo de red se realiza cada:",
       "o": [
        "3 meses",
        "Año",
        "5 años"
       ],
       "c": 0,
       "e": "Es una operación trimestral (tabla I del RIPCI)."
      },
      {
       "q": "La verificación de la ubicación, visibilidad y estado de los pulsadores se hace cada:",
       "o": [
        "3 meses",
        "6 meses",
        "Año"
       ],
       "c": 1,
       "e": "La prueba de funcionamiento de todos los pulsadores es anual."
      },
      {
       "q": "La prueba de funcionamiento individual de todos los detectores automáticos es:",
       "o": [
        "Trimestral",
        "Quinquenal",
        "Anual"
       ],
       "c": 2,
       "e": "Es una operación anual (tabla II del RIPCI), hecha por el fabricante o la mantenedora."
      },
      {
       "q": "El mantenimiento anual de la señalización luminiscente lo puede hacer el personal del titular.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "La sustitución al final de su vida útil, no: fabricante o mantenedora."
      },
      {
       "q": "Además de las tablas del anexo II, el programa de mantenimiento debe tener en cuenta:",
       "o": [
        "Las instrucciones y programa del fabricante",
        "Las preferencias del titular",
        "Solo la UNE 23007-14"
       ],
       "c": 0,
       "e": "El programa de mantenimiento combina las operaciones mínimas de las tablas del anexo II con las instrucciones y el programa del fabricante de cada equipo. Tema 1, apartado 2.3."
      },
      {
       "q": "Las operaciones de mantenimiento de menor responsabilidad pueden hacerse con personal propio.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El RIPCI permite que el personal del usuario o del titular haga las operaciones de menor responsabilidad (las de la tabla I). Las demás exigen una empresa mantenedora habilitada."
      },
      {
       "q": "Las operaciones mínimas de mantenimiento del RIPCI se recogen en el anexo II, en las tablas:",
       "o": [
        "I, II y III",
        "1.1 y 1.2",
        "A y B"
       ],
       "c": 0,
       "e": "El anexo II del RIPCI recoge las operaciones mínimas de mantenimiento en sus tablas I, II y III; la tabla I incluye las que puede hacer el personal del titular. Tema 1, apartado 2.3."
      },
      {
       "q": "Las actas de mantenimiento deben estar firmadas por:",
       "o": [
        "El organismo de control",
        "El personal cualificado que lo ha realizado",
        "El ayuntamiento"
       ],
       "c": 1,
       "e": "Las actas de mantenimiento las firma el personal cualificado que ha hecho las operaciones, para dejar constancia de quién las realizó. Tema 5, apartado 4."
      },
      {
       "q": "Antes de la revisión trimestral de un sistema de detección, el «paso previo» consiste en:",
       "o": [
        "Avisar al organismo de control",
        "Desconectar todo el sistema",
        "Implementar medidas para evitar maniobras no deseadas durante la inspección"
       ],
       "c": 2,
       "e": "Antes de probar el sistema hay que tomar medidas para que la prueba no dispare maniobras no deseadas, como paros de máquinas, cierre de compuertas o descargas. Tabla I del RIPCI."
      },
      {
       "q": "Cada tres meses se verifica si ha habido cambios o modificaciones en el sistema de detección desde la última revisión.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "En la revisión trimestral se comprueba si ha habido cambios en el sistema de detección desde la anterior y, si los hay, se documentan."
      },
      {
       "q": "El mantenimiento de los acumuladores (limpieza de bornas, agua destilada) del sistema de detección es:",
       "o": [
        "Trimestral",
        "Semestral",
        "Anual"
       ],
       "c": 0,
       "e": "El mantenimiento de los acumuladores (limpieza de bornas y reposición de agua destilada) es una operación trimestral. Tabla I del RIPCI."
      },
      {
       "q": "La revisión de las indicaciones luminosas de alarma, avería y desconexión de la central es:",
       "o": [
        "Trimestral",
        "Anual",
        "Quinquenal"
       ],
       "c": 0,
       "e": "Comprobar las indicaciones luminosas de alarma, avería y desconexión de la central es una operación trimestral. Tabla I del RIPCI."
      },
      {
       "q": "La verificación y actualización del software de la central de detección es:",
       "o": [
        "Trimestral",
        "Semestral",
        "Anual"
       ],
       "c": 2,
       "e": "La verificación y actualización del software de la central de detección es una operación anual, según las recomendaciones del fabricante."
      },
      {
       "q": "La comprobación de todas las maniobras de la central (paro de aire, ascensores, compuertas, extracción…) es:",
       "o": [
        "Trimestral",
        "Anual",
        "Quinquenal"
       ],
       "c": 1,
       "e": "Comprobar todas las maniobras programadas de la central (paro del aire acondicionado, ascensores, cierre de compuertas, extracción…) es una operación anual que hace la empresa mantenedora. Tabla II del RIPCI."
      },
      {
       "q": "Al verificar un detector se deben emplear métodos que no dañen ni perjudiquen su rendimiento.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "La tabla II del RIPCI exige verificar los detectores con métodos que no los dañen ni reduzcan su rendimiento, por ejemplo con el gas o el calor de prueba que indique el fabricante."
      },
      {
       "q": "Las operaciones anuales de los sistemas de detección deben seguir además la norma:",
       "o": [
        "UNE 23007-14",
        "UNE 23500",
        "UNE-EN 12845"
       ],
       "c": 0,
       "e": "Además de la tabla II del RIPCI, las operaciones anuales de los sistemas de detección deben seguir la norma UNE 23007-14, que regula su diseño, instalación y mantenimiento. La UNE 23500 es de abastecimiento de agua y la UNE-EN 12845, de rociadores."
      },
      {
       "q": "La comprobación de la señalización de los pulsadores de alarma es:",
       "o": [
        "Trimestral",
        "Semestral",
        "Anual"
       ],
       "c": 0,
       "e": "Comprobar la señalización de los pulsadores de alarma es una operación trimestral. La revisión de su ubicación, visibilidad y estado es semestral."
      },
      {
       "q": "El mantenimiento anual de la señalización luminiscente comprueba:",
       "o": [
        "El software de la central",
        "La presión de la red",
        "Existencia, ubicación, limpieza, legibilidad e iluminación en la oscuridad"
       ],
       "c": 2,
       "e": "En la señalización luminiscente, la revisión anual comprueba la existencia, la ubicación, la limpieza, la legibilidad y la iluminación en la oscuridad de las señales, además de sus sujeciones."
      },
      {
       "q": "La sustitución de las señales fotoluminiscentes al acabar su vida útil la hace:",
       "o": [
        "El fabricante o una empresa mantenedora",
        "El personal del titular",
        "El organismo de control"
       ],
       "c": 0,
       "e": "Al acabar su vida útil, las señales fotoluminiscentes las sustituye el fabricante o una empresa mantenedora, no el personal del titular. Tema 5, apartado 4."
      },
      {
       "q": "El mantenimiento de las señales fotoluminiscentes se realiza conforme a la norma:",
       "o": [
        "UNE 23035-3",
        "UNE 23033-1",
        "UNE 23580"
       ],
       "c": 0,
       "e": "El mantenimiento de las señales fotoluminiscentes se hace según la UNE 23035-3. La UNE 23033-1 define las propias señales."
      },
      {
       "q": "Los registros de mantenimiento de sistemas que aún no tienen norma UNE 23580 asociada no necesitan acta.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Aunque un sistema no tenga todavía norma UNE 23580 asociada, hay que registrar su mantenimiento y tener ese contenido disponible para la evaluación. Por eso es falso que no necesite acta."
      },
      {
       "q": "Según el RIPCI, el titular debe solicitar la inspección de sus instalaciones a un organismo de control al menos cada:",
       "o": [
        "5 años",
        "10 años",
        "15 años"
       ],
       "c": 1,
       "e": "Con las excepciones por uso y superficie."
      },
      {
       "q": "Está exento de la inspección periódica del RIPCI un edificio:",
       "o": [
        "Comercial de 400 m²",
        "Administrativo de 3.000 m²",
        "Docente de 2.500 m²"
       ],
       "c": 0,
       "e": "Exentos: comercial, PC y aparcamiento < 500 m²; administrativo y docente < 2.000 m²."
      },
      {
       "q": "Una instalación existente con 22 años de antigüedad debe pasar su primera inspección del RIPCI en un plazo de:",
       "o": [
        "1 año",
        "2 años",
        "3 años"
       ],
       "c": 0,
       "e": "15–20 años: 2 años; 10–15 años: 3 años."
      },
      {
       "q": "Si en una inspección se detectan defectos muy graves o no se corrigen en plazo, el organismo de control:",
       "o": [
        "Precinta la instalación",
        "Lo comunica a los servicios de industria de la comunidad autónoma",
        "Lo comunica al ayuntamiento"
       ],
       "c": 1,
       "e": "El organismo de control lo comunica a los servicios de industria de la comunidad autónoma. Fuente: tema 5, apartado 4."
      },
      {
       "q": "Durante las inspecciones periódicas del RIPCI se inspecciona:",
       "o": [
        "Solo la documentación",
        "El estado de los equipos in situ y la documentación",
        "Solo los equipos"
       ],
       "c": 1,
       "e": "Según el art. 22 del RIPCI, en las inspecciones periódicas se revisa la documentación (actas y registros de mantenimiento) y también el estado real de los equipos in situ."
      },
      {
       "q": "El procedimiento de inspección reglamentaria de las instalaciones PCI en edificios no industriales es la norma:",
       "o": [
        "UNE 192005-2",
        "UNE 192005-1",
        "UNE 23580"
       ],
       "c": 0,
       "e": "La UNE 192005-2 es el procedimiento de inspección reglamentaria de las instalaciones de protección contra incendios en edificios no industriales. La parte 1 es la de establecimientos industriales."
      },
      {
       "q": "Una instalación existente con 12 años de antigüedad debe pasar su primera inspección del RIPCI en un plazo de:",
       "o": [
        "1 año",
        "2 años",
        "3 años"
       ],
       "c": 2,
       "e": "Las instalaciones existentes deben pasar la primera inspección en un plazo que depende de su antigüedad. Con entre 10 y 15 años, el plazo es de 3 años; 12 años está en ese tramo."
      },
      {
       "q": "Una instalación existente con 17 años de antigüedad debe pasar su primera inspección en un plazo de:",
       "o": [
        "1 año",
        "2 años",
        "3 años"
       ],
       "c": 1,
       "e": "Con entre 15 y 20 años de antigüedad, la primera inspección debe hacerse en un plazo de 2 años; 17 años está en ese tramo."
      },
      {
       "q": "Está exento de la inspección periódica del RIPCI un edificio docente de 1.800 m².",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El uso docente está exento de la inspección periódica del RIPCI si su superficie es menor de 2.000 m². 1.800 m² está por debajo, así que es verdadero."
      },
      {
       "q": "Está exento de la inspección periódica del RIPCI un local de pública concurrencia de 600 m².",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "La pública concurrencia solo está exenta si su superficie es menor de 500 m². Un local de 600 m² supera el umbral, así que debe inspeccionarse."
      },
      {
       "q": "Está exento de la inspección periódica del RIPCI un edificio de uso residencial vivienda.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El uso residencial vivienda está exento de la inspección periódica del RIPCI en todo caso, sea cual sea su superficie."
      },
      {
       "q": "El acta de inspección del RIPCI la firman:",
       "o": [
        "La mantenedora y la instaladora",
        "Solo el titular",
        "El técnico del organismo de control y el titular"
       ],
       "c": 2,
       "e": "El acta de inspección la firman el técnico del organismo de control que la hace y el titular de la instalación. Tema 5, apartado 4."
      },
      {
       "q": "Las inspecciones del RIPCI las solicita:",
       "o": [
        "El titular de la instalación",
        "La empresa mantenedora",
        "La comunidad autónoma"
       ],
       "c": 0,
       "e": "Es el titular de la instalación quien debe solicitar las inspecciones a un organismo de control acreditado."
      },
      {
       "q": "Según el RSCIEI, un establecimiento de riesgo intrínseco medio se inspecciona como máximo cada:",
       "o": [
        "2 años",
        "3 años",
        "5 años"
       ],
       "c": 1,
       "e": "RSCIEI: riesgo bajo cada 5 años, medio cada 3 y alto cada 2."
      },
      {
       "q": "Según el RSCIEI, un establecimiento de riesgo intrínseco alto se inspecciona como máximo cada:",
       "o": [
        "2 años",
        "3 años",
        "5 años"
       ],
       "c": 0,
       "e": "RSCIEI: riesgo bajo cada 5 años, medio cada 3 y alto cada 2. Fuente: tema 5, apartado 3."
      },
      {
       "q": "El certificado para la puesta en marcha de un establecimiento industrial lo emite:",
       "o": [
        "El ayuntamiento",
        "El organismo de control",
        "Un técnico titulado competente"
       ],
       "c": 2,
       "e": "Con riesgo intrínseco, sectores, características constructivas y certificado de la instaladora."
      },
      {
       "q": "En la inspección de un establecimiento industrial NO se comprueba:",
       "o": [
        "El consumo energético de la instalación",
        "Que el mantenimiento se haga según el RIPCI",
        "Que no haya cambios de actividad ni ampliaciones"
       ],
       "c": 0,
       "e": "El consumo energético es materia del RITE, no de la inspección de protección contra incendios."
      },
      {
       "q": "Las inspecciones de los organismos de control en establecimientos industriales deben seguir la norma:",
       "o": [
        "UNE 192005-1",
        "UNE 192005-2",
        "UNE 23580"
       ],
       "c": 0,
       "e": "La parte 2 es para instalaciones en edificios no industriales."
      },
      {
       "q": "Según la guía técnica del RSCIEI, los organismos de control deben inspeccionar según la norma:",
       "o": [
        "UNE 192005-1",
        "UNE 192005-2",
        "UNE 23007-14"
       ],
       "c": 0,
       "e": "La guía técnica del RSCIEI establece que los organismos de control inspeccionen los establecimientos industriales según la UNE 192005-1:2014. La parte 2 es para edificios no industriales."
      },
      {
       "q": "El RSCIEI se aplica a los talleres de reparación y estacionamientos de vehículos de transporte de personas y mercancías.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El ámbito de aplicación del RSCIEI incluye expresamente los talleres de reparación y los estacionamientos de vehículos de transporte de personas y de mercancías."
      },
      {
       "q": "¿Cuál de estos datos NO figura en el certificado de puesta en marcha de un establecimiento industrial?",
       "o": [
        "Número de sectores y su riesgo intrínseco",
        "Plan de evacuación de cada trabajador",
        "Características constructivas"
       ],
       "c": 1,
       "e": "El certificado de puesta en marcha recoge el número de sectores y su riesgo intrínseco, el riesgo intrínseco del establecimiento, sus características constructivas y el certificado de la instaladora. No incluye ningún plan de evacuación individual."
      },
      {
       "q": "Del acta de inspección del RSCIEI conservan copia:",
       "o": [
        "Solo el titular",
        "Solo la comunidad autónoma",
        "El técnico del organismo de control y el titular"
       ],
       "c": 2,
       "e": "Del acta de inspección del RSCIEI conservan copia el técnico del organismo de control y el titular del establecimiento. Tema 5, apartado 3."
      },
      {
       "q": "En la fórmula del riesgo intrínseco, el coeficiente Ra corrige la peligrosidad por:",
       "o": [
        "La activación propia de la actividad",
        "La combustibilidad",
        "La superficie"
       ],
       "c": 0,
       "e": "En la fórmula del riesgo intrínseco, Ra corrige por el peligro de activación propio de la actividad (producción, almacenamiento…). La combustibilidad la pondera Ci."
      },
      {
       "q": "En la fórmula del riesgo intrínseco, Gi es:",
       "o": [
        "El poder calorífico en MJ/kg",
        "La masa en kg de cada combustible",
        "La superficie del sector"
       ],
       "c": 1,
       "e": "En Qs = Σ(Gi·qi·Ci)·Ra / A, Gi es la masa en kg de cada combustible. qi es su poder calorífico (MJ/kg) y A, la superficie del sector."
      },
      {
       "q": "Un sector de 100 m² con 10.000 kg de un combustible de 17 MJ/kg (Ci = 1, Ra = 1) tiene un riesgo intrínseco:",
       "o": [
        "Bajo",
        "Alto",
        "Medio"
       ],
       "c": 2,
       "e": "Se calcula la densidad de carga de fuego del sector y se compara con la tabla del RSCIEI: entre 850 y 3.400 MJ/m² el riesgo es medio.",
       "k": [
        "Qs = Gi · qi · Ci · Ra / A",
        "Qs = 10.000 · 17 · 1 · 1 / 100 = 1.700 MJ/m²",
        "1.275 < 1.700 ≤ 1.700 → riesgo medio, nivel 4"
       ]
      },
      {
       "q": "Un edificio industrial con dos sectores de 1.000 m², uno con Qs = 400 y otro con Qs = 1.200 MJ/m², tiene un Qe de:",
       "o": [
        "800 MJ/m² (riesgo bajo)",
        "1.600 MJ/m² (riesgo medio)",
        "400 MJ/m² (riesgo bajo)"
       ],
       "c": 0,
       "e": "La carga de fuego del edificio es la media de la de sus sectores, ponderada por la superficie de cada uno. 800 MJ/m² no supera 850, así que el riesgo es bajo.",
       "k": [
        "Qe = Σ(Qsi · Ai) / Σ Ai",
        "Qe = (400 · 1.000 + 1.200 · 1.000) / 2.000",
        "Qe = 1.600.000 / 2.000 = 800 MJ/m² ≤ 850 → riesgo bajo"
       ]
      },
      {
       "q": "El RIPCI se estructura en:",
       "o": [
        "17 artículos y 4 anexos",
        "23 artículos, 9 disposiciones y 3 anexos",
        "6 secciones"
       ],
       "c": 1,
       "e": "17 artículos y 4 anexos es el RSCIEI; 6 secciones, el DB SI."
      },
      {
       "q": "El ECI (equipo de control e indicación) NO tiene como función:",
       "o": [
        "Indicar la localización del peligro",
        "Descargar el agente extintor sin retardo",
        "Supervisar fallos como cortocircuitos o roturas de línea"
       ],
       "c": 1,
       "e": "Recibe señales, decide si hay alarma, avisa e indica dónde."
      },
      {
       "q": "Las BIE pueden llevar manguera plana de hasta 20 m o semirrígida de hasta 30 m.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El RIPCI admite manguera plana de hasta 20 m o semirrígida de hasta 30 m."
      },
      {
       "q": "Las siglas SDAI corresponden a:",
       "o": [
        "Sistema de detección y alarma de incendios",
        "Sistema de defensa activa integral",
        "Sistema de detección automática industrial"
       ],
       "c": 0,
       "e": "SDAI significa sistema de detección y alarma de incendios. En inglés se llama FDAS (fire detection and alarm system)."
      },
      {
       "q": "Si es necesario, el ECI puede transmitir el aviso de fallo a una central de recepción.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El equipo de control e indicación (ECI, la central) puede enviar el aviso de fallo a una central de recepción mediante el equipo de envío de aviso de fallo."
      },
      {
       "q": "La familia de normas que regula los sistemas de detección y alarma es la:",
       "o": [
        "UNE-EN 54",
        "UNE-EN 671",
        "UNE-EN 12845"
       ],
       "c": 0,
       "e": "La familia UNE-EN 54 regula los componentes de los sistemas de detección y alarma. La UNE-EN 671 es de BIE y la UNE-EN 12845, de rociadores."
      },
      {
       "q": "Las BIE están reguladas por la norma:",
       "o": [
        "UNE-EN 671",
        "UNE-EN 54",
        "UNE 23500"
       ],
       "c": 0,
       "e": "Las bocas de incendio equipadas (BIE) se regulan por la UNE-EN 671. La UNE-EN 54 es de detección y la UNE 23500, de abastecimiento de agua. Tema 5, apartado 4."
      },
      {
       "q": "En un sistema de rociadores, las cabezas pueden instalarse también entre estanterías y debajo de estantes.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Según la UNE-EN 12845, en almacenes los rociadores pueden instalarse también entre estanterías y bajo los estantes, para llegar al fuego que el estante tapa desde el techo."
      },
      {
       "q": "Un sistema de rociadores consta de abastecimiento de agua y una o varias instalaciones, cada una con:",
       "o": [
        "Una central de detección",
        "Un puesto de control principal y una red de tuberías con cabezas",
        "Un grupo de BIE"
       ],
       "c": 1,
       "e": "Una instalación de rociadores consta del abastecimiento de agua y de una o varias instalaciones, cada una con su puesto de control principal y su red de tuberías con las cabezas rociadoras. Tema 5, apartado 4."
      },
      {
       "q": "Entre los equipos que enumera el tema 5 como regulados figuran las mantas ignífugas y el alumbrado de emergencia.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "La lista de equipos y sistemas regulados del tema 5 incluye las mantas ignífugas (punto 14) y el alumbrado de emergencia (punto 15)."
      },
      {
       "q": "Antes de su puesta en servicio, la red de BIE se prueba a una presión mínima de 980 kPa durante:",
       "o": [
        "30 minutos",
        "1 hora",
        "2 horas"
       ],
       "c": 2,
       "e": "A la presión máxima de servicio y como mínimo 980 kPa, durante 2 horas, sin fugas en ningún punto."
      },
      {
       "q": "La instalación de columna seca debe resistir sin fugas una presión de:",
       "o": [
        "10 bar durante 2 horas",
        "20 bar durante 2 horas",
        "15 bar durante 1 hora"
       ],
       "c": 1,
       "e": "Prueba de la columna seca: 20 bar durante 2 horas sin fugas. Fuente: tema 3, 2.5."
      },
      {
       "q": "El plan de alarmas de la central de detección es objeto de inspección periódica.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "La matriz de actuaciones de la central (plan de alarmas) se revisa en la inspección periódica según la UNE 192005-2 en edificios no industriales y la UNE 192005-1 en establecimientos industriales."
      },
      {
       "q": "La instalación, puesta en marcha y mantenimiento de los sistemas de control de humo por flotabilidad siguen la norma:",
       "o": [
        "UNE 23585",
        "UNE 23584",
        "UNE-EN 12101-2"
       ],
       "c": 1,
       "e": "La UNE 23584 es la de instalación, puesta en marcha y mantenimiento; la UNE 23585 es la de diseño."
      },
      {
       "q": "La prueba de estanqueidad de la red de BIE se hace a la presión máxima de servicio, con un mínimo de:",
       "o": [
        "600 kPa",
        "980 kPa",
        "2.000 kPa"
       ],
       "c": 1,
       "e": "La red de BIE se somete a una prueba de estanquidad a la presión máxima de servicio, con un mínimo de 980 kPa (unos 10 kg/cm²), durante 2 horas y sin fugas."
      },
      {
       "q": "La matriz de actuaciones (plan de alarmas) de la central es necesaria para programarla y es objeto de inspección.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "La matriz de actuaciones (plan de alarmas) define qué maniobras dispara cada señal. Hace falta para programar la central y es objeto de inspección. Tema 2, apartado 1.2."
      },
      {
       "q": "El puesto de control de rociadores transmite hoy la descarga a la central mediante:",
       "o": [
        "Un pulsador",
        "Un detector óptico",
        "Un presostato"
       ],
       "c": 2,
       "e": "Hoy, el puesto de control transmite la descarga de los rociadores a la central mediante un presostato, que detecta el cambio de presión cuando se abre un rociador. Se mantiene además el gong hidráulico como alarma sonora."
      },
      {
       "q": "El puesto de control húmedo incorpora una cámara de retardo para:",
       "o": [
        "Evitar falsas alarmas",
        "Retrasar la descarga",
        "Ahorrar agua"
       ],
       "c": 0,
       "e": "La cámara de retardo absorbe las variaciones bruscas de presión de la red, que podrían activar la alarma sin que haya descarga. Así se evitan falsas alarmas. Tema 2, apartado 2.7."
      },
      {
       "q": "El depósito de reserva de agua contra incendios debe garantizar un funcionamiento sin vaciarlo de:",
       "o": [
        "5 años",
        "10 años",
        "15 años"
       ],
       "c": 2,
       "e": "El depósito de reserva de agua debe poder funcionar 15 años sin vaciarse para su mantenimiento. Por eso debe ser de material rígido y resistente a la corrosión."
      },
      {
       "q": "La instalación, puesta en marcha y mantenimiento de los sistemas de presión diferencial siguen la UNE-EN 12101-6 y la:",
       "o": [
        "UNE 23584",
        "UNE 23585",
        "UNE 23500"
       ],
       "c": 0,
       "e": "Los sistemas de presión diferencial siguen la UNE-EN 12101-6 y la UNE 23584 (instalación, puesta en marcha y mantenimiento). La UNE 23585 es la de diseño de control de humo y la UNE 23500, la de abastecimiento. Tema 4, apartado 2.1."
      }
     ]
    }
   ]
  },
  {
   "id": "font",
   "name": "Fontanería y saneamiento",
   "short": "FONT",
   "formulas": [
    [
     "Caudal de cálculo",
     "Qc = ΣQinst · k (k ≤ 1, simultaneidad)"
    ],
    [
     "Pérdidas localizadas",
     "≈ 20–30 % de las lineales"
    ],
    [
     "Depósito auxiliar del grupo",
     "V = Q·t·60 (Q en dm³/s, t = 15–20 min, V en l)"
    ],
    [
     "Unidad de desagüe",
     "1 UD = 0,47 dm³/s; continuos: 1 UD por 0,03 dm³/s"
    ],
    [
     "Corrección de pluviales",
     "f = i / 100 (i en mm/h)"
    ]
   ],
   "trapsTitle": "Cifras clave",
   "traps": [
    "Presión en puntos de consumo: mínimo 100 kPa en grifos y 150 kPa en fluxores y calentadores; máximo 500 kPa.",
    "ACS en los puntos de consumo entre 50 y 65 ºC (salvo vivienda exclusiva); el retorno pierde como máximo 3 ºC.",
    "Retorno de ACS si la ida al punto más alejado mide 15 m o más; mínimo 250 l/h por columna o el 10 % del agua; diámetro interior ≥ 16 mm.",
    "Velocidad de cálculo: 0,5–2 m/s en tuberías metálicas; 0,5–3,5 m/s en termoplásticas y multicapa.",
    "Golpe de ariete positivo ≤ 2 bar; materiales resistentes hasta 40 ºC; prohibidos el aluminio y los tubos con plomo.",
    "Cierre hidráulico: 50 mm en usos continuos, 70 mm en discontinuos, 100 mm como máximo; en la prueba de aparatos debe quedar ≥ 25 mm.",
    "Pendientes: derivaciones al bote sifónico 2–4 %; lavabo y bidé 2,5–5 %; bañera y ducha ≤ 10 %; colectores colgados ≥ 1 % y enterrados ≥ 2 %.",
    "Distancias: bote sifónico a bajante ≤ 2 m; derivaciones al bote ≤ 2,5 m; lavabo o bidé a bajante ≤ 4 m; manguetón del inodoro ≤ 1 m; registros cada 15 m.",
    "Bajantes: variación de presión ≤ ±250 Pa y agua ≤ 1/3 de la sección. Colectores de residuales a media sección (hasta 3/4); pluviales a sección llena.",
    "Prueba de fontanería: la hace la instaladora, con todo visto; manómetro de 0,1 bar; presiones referidas a la calzada; metálicas UNE-EN 14336, plásticas UNE-CEN/TR 12108 proc. A.",
    "Saneamiento: red horizontal a 0,3–0,6 bar durante 10 min; total con agua 0,3–1 bar; con aire 0,5–1 bar constante 3 min; con humo a 250 Pa, sin humo ni olor dentro.",
    "Mantenimiento del saneamiento: 6 meses sumideros transitables, botes sifónicos y separador de grasas; anual cubiertas no transitables, colectores colgados, pozos y bombas; 10 años arquetas."
   ],
   "tests": [
    {
     "id": "font-temario",
     "name": "Temario",
     "short": "FONT · Temario",
     "examSize": 20,
     "examPen": 0.5,
     "examTime": 20,
     "source": "Examen real del 21-02-2026 (20 preguntas, solución oficial) y test del resto del temario de la Unidad 5, temas 1 a 4 (98 preguntas). Las respuestas son las de las soluciones comentadas del documento. Discrepancias del temario: la presión máxima en los puntos de consumo es de 500 kPa (tema 1 y CTE DB HS 4), aunque una diapositiva del tema 5 pone 550 kPa; para legionela y agua de consumo se usan las normas vigentes que cita el tema 5 (RD 487/2022 y RD 3/2023), aunque los temas 1 y 2 citan el RD 865/2003 y el RD 140/2003; las tuberías metálicas se prueban según la UNE-EN 14336, que sustituye a la UNE 100151:1988; el desagüe del lavabo lleva entre el 2,5 y el 5 % de pendiente (HS 5), aunque el tema 3 habla de un 1 %; y la pregunta 20 del examen real (los sistemas mixtos no son más caros que los separativos) no sale de las diapositivas. Las preguntas afectadas llevan la marca «Sin confirmar».",
     "presets": [
      {
       "id": "real-2026",
       "name": "Examen real del 21-02-2026",
       "idx": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
       ],
       "t": 20,
       "pen": 0.5
      }
     ],
     "questions": [
      {
       "q": "La acometida es la tubería que enlaza:",
       "o": [
        "La instalación general del edificio con la red exterior de suministro",
        "La instalación general del edificio con el cuarto de contadores divisionarios",
        "La instalación general del edificio con el grupo de presión"
       ],
       "c": 0,
       "e": "Según la terminología del HS 4, la acometida es el tramo que une la red exterior de suministro (la de la compañía) con la instalación general del edificio. El cuarto de contadores y el grupo de presión ya forman parte de la instalación interior."
      },
      {
       "q": "La suma de los caudales instantáneos mínimos de un grupo de aparatos sanitarios:",
       "o": [
        "Es siempre menor que el caudal simultáneo",
        "Es siempre mayor que el caudal simultáneo",
        "Puede ser igual o mayor que el caudal simultáneo"
       ],
       "c": 2,
       "e": "El caudal simultáneo es la suma de los caudales instantáneos multiplicada por un coeficiente de simultaneidad menor o igual que 1. Por eso la suma es mayor que el simultáneo, o igual cuando solo hay un aparato."
      },
      {
       "q": "Los caudales instantáneos mínimos según el CTE DB HS 4:",
       "o": [
        "Son siempre mayores en AFS que en ACS",
        "Son siempre menores en AFS que en ACS",
        "Son siempre iguales en AFS que en ACS"
       ],
       "c": 0,
       "e": "En la tabla 2.1 del HS 4, el caudal instantáneo mínimo de agua fría es siempre mayor que el de agua caliente para el mismo aparato. Por ejemplo, en un lavabo son 0,10 dm³/s en AFS frente a 0,065 dm³/s en ACS."
      },
      {
       "q": "La presión mínima de un punto de consumo tipo fluxor debe ser:",
       "o": [
        "100 kPa",
        "150 kPa",
        "200 kPa"
       ],
       "c": 1,
       "e": "El HS 4 exige 150 kPa en fluxores y calentadores, porque necesitan más presión para funcionar bien. Para los grifos comunes basta con 100 kPa."
      },
      {
       "q": "La temperatura en los puntos de consumo de ACS debe estar comprendida entre:",
       "o": [
        "45 ºC y 65 ºC",
        "50 ºC y 60 ºC",
        "50 ºC y 65 ºC"
       ],
       "c": 2,
       "e": "El HS 4 fija que el ACS llegue a los puntos de consumo entre 50 y 65 ºC, un rango que limita el riesgo de legionela sin llegar a quemar. No es exigible en edificios de uso exclusivo de vivienda."
      },
      {
       "q": "Las velocidades de cálculo en tuberías termoplásticas deben estar comprendidas entre:",
       "o": [
        "0,5 m/s y 2 m/s",
        "0,5 m/s y 3,5 m/s",
        "0,5 m/s y 3 m/s"
       ],
       "c": 1,
       "e": "Las tuberías termoplásticas y multicapa admiten velocidades de cálculo de 0,5 a 3,5 m/s. En las metálicas el máximo es más bajo, de 2 m/s, para limitar ruidos y erosión."
      },
      {
       "q": "En ACS, la pérdida de temperatura al grifo más alejado debe ser como máximo:",
       "o": [
        "3 ºC",
        "2 ºC",
        "3,5 ºC"
       ],
       "c": 0,
       "e": "El caudal de retorno de ACS se calcula para que el agua no pierda más de 3 ºC hasta el grifo más alejado de la red."
      },
      {
       "q": "Las protecciones contra la corrosión cuando los tubos de cobre discurren enterrados o empotrados deben ser:",
       "o": [
        "Con revestimiento de plástico",
        "Con revestimiento bituminoso",
        "Con revestimiento de película continua de polietileno"
       ],
       "c": 0,
       "e": "Los tubos de cobre enterrados o empotrados se protegen con un revestimiento de plástico. El revestimiento bituminoso es para tubos de acero y la película continua de polietileno, para fundición."
      },
      {
       "q": "En los receptores abiertos:",
       "o": [
        "El cálculo de la caída de presión debe tener en cuenta la presión mínima de descarga",
        "El retorno debe tener la misma pérdida de carga que el circuito de impulsión",
        "El intercambiador genera una pérdida de carga que se debe tener en cuenta"
       ],
       "c": 0,
       "e": "En un receptor abierto el agua sale al exterior (un grifo o un inodoro), así que hay que garantizar una presión mínima de descarga en ese punto. La pérdida de carga del intercambiador es lo que se tiene en cuenta en los receptores cerrados, por los que el agua circula sin salir."
      },
      {
       "q": "El sellado hidráulico debe realizarse siempre con un sifón individual.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "El cierre hidráulico no tiene por qué ser un sifón individual: también vale un bote sifónico, un sumidero sifónico o una arqueta sifónica."
      },
      {
       "q": "Las aguas pluviales se pueden utilizar para consumo humano.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "El RD 1620/2007 sobre reutilización de aguas prohíbe usar aguas regeneradas para consumo humano, salvo en situaciones de catástrofe declarada."
      },
      {
       "q": "El tratamiento de las aguas pluviales y residuales se realiza en una primera etapa en el propio edificio de viviendas antes de enviarlas al saneamiento general público.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Las aguas del edificio se vierten directamente a la red pública, que las lleva a la depuradora. Solo cuando no existe red de alcantarillado se exige una estación depuradora particular."
      },
      {
       "q": "El reflujo en una instalación de saneamiento se evita instalando:",
       "o": [
        "Una clapeta antirretorno",
        "Una válvula de corte",
        "No es necesario, nunca se produce"
       ],
       "c": 0,
       "e": "El reflujo (que el agua vuelva desde la red hacia el edificio) se evita con válvulas antirretorno de seguridad, es decir, con una clapeta antirretorno. Una válvula de corte no lo impide de forma automática."
      },
      {
       "q": "En saneamiento, la ventilación primaria discurre paralela a la bajante y se conecta a esta.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "La ventilación que discurre paralela a la bajante y se conecta a ella es la secundaria. La primaria es la prolongación de la propia bajante hasta la cubierta."
      },
      {
       "q": "En saneamiento, una unidad de desagüe equivale a:",
       "o": [
        "0,47 l/s",
        "0,03 l/s",
        "Ambas son incorrectas"
       ],
       "c": 0,
       "e": "En el HS 5, una unidad de desagüe (UD) equivale a 0,47 l/s. El valor de 0,03 l/s es el caudal que se asigna a cada UD en los desagües continuos, como las bandejas de condensación."
      },
      {
       "q": "La altura mínima de cierre hidráulico debe ser 70 mm para usos continuos.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "La altura mínima del cierre hidráulico es de 50 mm en usos continuos y de 70 mm en usos discontinuos, donde el agua del sifón tiene más tiempo para evaporarse."
      },
      {
       "q": "Las derivaciones que acometen al bote sifónico deben tener una pendiente comprendida entre:",
       "o": [
        "1-2 %",
        "2-4 %",
        "1-3 %"
       ],
       "c": 1,
       "e": "Las derivaciones que llegan a un bote sifónico deben tener una pendiente de entre el 2 y el 4 % y una longitud no mayor de 2,5 m."
      },
      {
       "q": "El desagüe de los inodoros a las bajantes debe realizarse directamente o por medio de un manguetón de longitud igual o menor que 2 m.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "El inodoro debe desaguar a la bajante directamente o mediante un manguetón de 1 m como máximo, no de 2 m."
      },
      {
       "q": "Los colectores colgados deben tener una pendiente mínima del:",
       "o": [
        "1 %",
        "2 %",
        "4 %"
       ],
       "c": 0,
       "e": "Los colectores colgados deben tener al menos un 1 % de pendiente. Los enterrados necesitan un mínimo del 2 %."
      },
      {
       "q": "Los sistemas de saneamiento mixtos son más caros de implantar que los separativos.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Respuesta de la solución oficial del examen: falso, los sistemas mixtos no son más caros que los separativos. Este dato no sale de las diapositivas del temario. Tiene lógica, porque el separativo duplica las redes hasta el final, pero no está confirmado en los apuntes.",
       "d": true
      },
      {
       "q": "El documento de referencia para el diseño de las instalaciones de fontanería es:",
       "o": [
        "CTE DB HS 5",
        "CTE DB HS 4",
        "RITE"
       ],
       "c": 1,
       "e": "El suministro de agua (fontanería) se regula en la sección HS 4 del CTE. La HS 5 trata la evacuación de aguas y el RITE, las instalaciones térmicas."
      },
      {
       "q": "Las reformas de instalaciones de suministro existentes quedan incluidas en el HS 4 cuando:",
       "o": [
        "Se cambia el material de las tuberías",
        "Se cambia de titular",
        "Se amplía el número o la capacidad de los aparatos receptores"
       ],
       "c": 2,
       "e": "El HS 4 se aplica a las reformas de instalaciones existentes cuando se amplía el número o la capacidad de los aparatos receptores, porque eso cambia los caudales de cálculo. Cambiar de titular o sustituir el material no lo activa (ámbito de aplicación del HS 4)."
      },
      {
       "q": "Las ascendentes o montantes enlazan:",
       "o": [
        "El distribuidor principal con las instalaciones particulares o derivaciones colectivas",
        "La acometida con la red pública",
        "El contador con el aparato"
       ],
       "c": 0,
       "e": "Según la terminología del HS 4, las ascendentes o montantes son las tuberías verticales que llevan el agua desde el distribuidor principal hasta las instalaciones particulares o derivaciones colectivas de cada planta."
      },
      {
       "q": "El caudal simultáneo es el que se produce por:",
       "o": [
        "La suma de todos los caudales instantáneos",
        "El funcionamiento lógico simultáneo de aparatos",
        "El aparato más desfavorable"
       ],
       "c": 1,
       "e": "El caudal simultáneo es el que circula cuando funcionan a la vez los aparatos que lógicamente coinciden en uso, no todos. Se obtiene aplicando un coeficiente de simultaneidad a la suma de caudales instantáneos (terminología del HS 4)."
      },
      {
       "q": "Los contadores divisionarios se instalarán, en general:",
       "o": [
        "En la acometida",
        "Junto a cada aparato",
        "Sobre las baterías"
       ],
       "c": 2,
       "e": "Los contadores divisionarios, que miden el consumo de cada abonado, se agrupan en baterías en el cuarto o armario de contadores."
      },
      {
       "q": "El distribuidor principal enlaza:",
       "o": [
        "Los sistemas de control de presión con las ascendentes o derivaciones",
        "La red exterior con la llave de registro",
        "El contador con la vivienda"
       ],
       "c": 0,
       "e": "Según el HS 4, el distribuidor principal es la tubería que va desde los sistemas de control de presión (grupo de presión o reductor) hasta las ascendentes o derivaciones."
      },
      {
       "q": "El tubo de alimentación enlaza:",
       "o": [
        "La acometida con la red pública",
        "La llave de corte general con los sistemas de control de presión o el distribuidor principal",
        "El montante con el aparato"
       ],
       "c": 1,
       "e": "Según el HS 4, el tubo de alimentación va desde la llave de corte general hasta los sistemas de control de presión o, si no los hay, hasta el distribuidor principal."
      },
      {
       "q": "La llave de registro se coloca:",
       "o": [
        "En la base de las ascendentes",
        "En cada aparato",
        "Al final de la acometida"
       ],
       "c": 2,
       "e": "La llave de registro se sitúa al final de la acometida, normalmente en la vía pública, y permite a la compañía cerrar el paso de agua a la instalación interior del edificio."
      },
      {
       "q": "La presión de trabajo de un tubo se define considerando un uso continuado de:",
       "o": [
        "25 años",
        "50 años",
        "100 años"
       ],
       "c": 1,
       "e": "La presión de trabajo de un tubo es la presión manométrica interna máxima que soporta en uso continuado durante 50 años, que es su vida de diseño."
      },
      {
       "q": "La presión nominal de un tubo coincide con la presión máxima de trabajo a:",
       "o": [
        "10 ºC",
        "20 ºC",
        "40 ºC"
       ],
       "c": 1,
       "e": "Según la terminología del HS 4, la presión nominal de un tubo es la presión máxima de trabajo a 20 ºC. A temperaturas más altas, la presión admisible baja."
      },
      {
       "q": "El pasamuros debe permitir que la tubería quede suelta para su libre dilatación.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El pasamuros es el manguito que atraviesa un muro o forjado: la tubería va suelta dentro de él para que pueda dilatar sin tensiones (terminología del HS 4)."
      },
      {
       "q": "La válvula de seguridad descarga el exceso de presión y su escape se reconduce a:",
       "o": [
        "Desagüe",
        "La red de ACS",
        "El depósito"
       ],
       "c": 0,
       "e": "La válvula de seguridad libera el exceso de presión, y el agua que expulsa se conduce a un desagüe para que no inunde ni dañe nada (terminología del HS 4)."
      },
      {
       "q": "Los materiales de la instalación deben resistir sin daños temperaturas de hasta:",
       "o": [
        "40 ºC",
        "60 ºC",
        "80 ºC"
       ],
       "c": 0,
       "e": "El HS 4 exige que los materiales resistan sin daños temperaturas de hasta 40 ºC, además de las del entorno inmediato."
      },
      {
       "q": "¿En cuál de estos puntos NO se exige expresamente sistema antirretorno?",
       "o": [
        "Después de los contadores",
        "En cada grifo de lavabo",
        "En la base de las ascendentes"
       ],
       "c": 1,
       "e": "El HS 4 exige antirretorno después de los contadores, en la base de las ascendentes, antes del tratamiento de agua, en los tubos de alimentación de usos no domésticos y antes de los equipos de refrigeración o climatización. No se exige en cada grifo de lavabo."
      },
      {
       "q": "Las instalaciones de suministro de agua pueden conectarse directamente a instalaciones de evacuación.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Para no contaminar el agua potable, la red de suministro no puede conectarse directamente a la de evacuación, ni a instalaciones de agua de otro origen que no sea la red pública."
      },
      {
       "q": "Los antirretornos se combinarán con:",
       "o": [
        "Filtros",
        "Válvulas de seguridad",
        "Grifos de vaciado"
       ],
       "c": 2,
       "e": "Los sistemas antirretorno se combinan con grifos de vaciado, para poder vaciar cualquier tramo de la red aunque el antirretorno impida que el agua vuelva."
      },
      {
       "q": "La presión mínima en un punto de consumo con grifo común es:",
       "o": [
        "100 kPa",
        "150 kPa",
        "50 kPa"
       ],
       "c": 0,
       "e": "El HS 4 pide 100 kPa en los grifos comunes. Los fluxores y calentadores necesitan más presión: 150 kPa."
      },
      {
       "q": "La presión en cualquier punto de consumo no debe superar:",
       "o": [
        "300 kPa",
        "500 kPa",
        "1.000 kPa"
       ],
       "c": 1,
       "e": "El tema 1 y el CTE DB HS 4 fijan 500 kPa como presión máxima en cualquier punto de consumo, y es el dato que se usa aquí. La diapositiva del tema 5 pone 550 kPa. Por encima de la máxima hay que instalar un reductor de presión.",
       "d": true
      },
      {
       "q": "Debe disponerse red de retorno de ACS cuando la tubería de ida al punto más alejado mide:",
       "o": [
        "10 m o más",
        "15 m o más",
        "25 m o más"
       ],
       "c": 1,
       "e": "El HS 4 exige red de retorno de ACS cuando la tubería de ida hasta el punto más alejado mide 15 m o más, para que el agua caliente llegue enseguida y no se desperdicie agua (exigencia de ahorro de agua)."
      },
      {
       "q": "En zonas de pública concurrencia, los grifos de lavabos y las cisternas deben tener dispositivos de ahorro de agua.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Por la exigencia de ahorro de agua del HS 4, en las zonas de pública concurrencia los grifos de los lavabos y las cisternas deben llevar dispositivos de ahorro."
      },
      {
       "q": "Las tuberías que suministren agua no apta para el consumo deben:",
       "o": [
        "Estar señalizadas de forma fácil e inequívoca",
        "Ser de color azul",
        "Estar enterradas"
       ],
       "c": 0,
       "e": "El HS 4 exige que las tuberías de agua no apta para el consumo se señalicen de forma fácil e inequívoca, para que nadie la beba por error. No impone un color ni un trazado concreto."
      },
      {
       "q": "La red con contador general único se compone de acometida, instalación general con armario o arqueta del contador, tubo de alimentación, distribuidor principal y:",
       "o": [
        "Contadores aislados",
        "Derivaciones colectivas",
        "Bajantes"
       ],
       "c": 1,
       "e": "La red con contador general único consta de acometida, instalación general con el armario o arqueta del contador general, tubo de alimentación, distribuidor principal y derivaciones colectivas (figura 3.1 del HS 4)."
      },
      {
       "q": "Según el caudal del inodoro con fluxor de la tabla 2.1 del HS 4, su caudal instantáneo mínimo de AFS es:",
       "o": [
        "0,10 dm³/s",
        "1,25 dm³/s",
        "0,30 dm³/s"
       ],
       "c": 1,
       "e": "El inodoro con fluxor necesita un caudal muy alto durante la descarga: 1,25 dm³/s en agua fría, según la tabla 2.1 del HS 4. Con cisterna basta con 0,10 dm³/s."
      },
      {
       "q": "El caudal instantáneo mínimo de AFS de una ducha es:",
       "o": [
        "0,10 dm³/s",
        "0,20 dm³/s",
        "0,30 dm³/s"
       ],
       "c": 1,
       "e": "Según la tabla 2.1 del HS 4, la ducha necesita 0,20 dm³/s de agua fría y 0,10 dm³/s de agua caliente."
      },
      {
       "q": "En el dimensionado de la red se parte del circuito más desfavorable, que es el de:",
       "o": [
        "Mayor longitud",
        "Mayor número de aparatos",
        "Mayor pérdida de presión por rozamiento y altura geométrica"
       ],
       "c": 2,
       "e": "El dimensionado parte del circuito más desfavorable, que es el que tiene más pérdida de presión sumando el rozamiento y la altura geométrica. No es necesariamente el más largo (HS 4, apartado 4.2)."
      },
      {
       "q": "El caudal de cálculo de un tramo es:",
       "o": [
        "El caudal máximo por el coeficiente de simultaneidad",
        "La suma de caudales instantáneos",
        "El caudal del aparato más desfavorable"
       ],
       "c": 0,
       "e": "El caudal de cálculo de cada tramo es su caudal máximo (la suma de los caudales instantáneos que alimenta) multiplicado por el coeficiente de simultaneidad (HS 4, apartado 4.2)."
      },
      {
       "q": "En tuberías metálicas la velocidad de cálculo debe estar entre:",
       "o": [
        "0,5 y 2 m/s",
        "0,5 y 3,5 m/s",
        "1 y 3 m/s"
       ],
       "c": 0,
       "e": "En tuberías metálicas la velocidad de cálculo va de 0,5 a 2 m/s. Las termoplásticas y multicapa admiten hasta 3,5 m/s."
      },
      {
       "q": "Las pérdidas de carga localizadas pueden estimarse como un porcentaje de las lineales del:",
       "o": [
        "5–10 %",
        "20–30 %",
        "40–50 %"
       ],
       "c": 1,
       "e": "Para comprobar la presión, el HS 4 permite estimar las pérdidas de carga localizadas (codos, llaves…) como un 20 a 30 % de las pérdidas lineales del tramo."
      },
      {
       "q": "Si la presión disponible en el punto más desfavorable es inferior a la mínima exigida:",
       "o": [
        "Se aumenta el diámetro de la acometida",
        "Hay que instalar un grupo de presión",
        "Se instala un reductor de presión"
       ],
       "c": 1,
       "e": "Si la presión disponible en el punto más desfavorable no llega a la mínima exigida, hay que instalar un grupo de presión. El reductor hace lo contrario: baja la presión cuando supera la máxima (HS 4, comprobación de la presión)."
      },
      {
       "q": "El diámetro mínimo en cobre o plástico del ramal a un lavabo es:",
       "o": [
        "12 mm",
        "20 mm",
        "25 mm"
       ],
       "c": 0,
       "e": "Según la tabla 4.2 del HS 4, el ramal de enlace a un lavabo en cobre o plástico tiene un diámetro mínimo de 12 mm."
      },
      {
       "q": "El diámetro mínimo en cobre o plástico del ramal a un inodoro con fluxor es:",
       "o": [
        "12 mm",
        "20 mm",
        "25-40 mm"
       ],
       "c": 2,
       "e": "Según la tabla 4.2 del HS 4, el fluxor necesita un ramal de 25 a 40 mm en cobre o plástico, por su gran caudal instantáneo."
      },
      {
       "q": "El diámetro mínimo en cobre o plástico de la alimentación a un cuarto húmedo es:",
       "o": [
        "12 mm",
        "20 mm",
        "25 mm"
       ],
       "c": 1,
       "e": "Según la tabla 4.3 del HS 4, la alimentación a un cuarto húmedo tiene un diámetro mínimo de 20 mm en cobre o plástico. El distribuidor principal, 25 mm."
      },
      {
       "q": "No se recircularán en cada columna de ACS menos de:",
       "o": [
        "100 l/h",
        "250 l/h",
        "500 l/h"
       ],
       "c": 1,
       "e": "El HS 4 fija un caudal mínimo de recirculación de 250 l/h en cada columna de ACS, para poder equilibrar el retorno entre columnas."
      },
      {
       "q": "El caudal de retorno de ACS puede estimarse recirculando como mínimo el:",
       "o": [
        "5 % del agua de alimentación",
        "10 % del agua de alimentación",
        "25 % del agua de alimentación"
       ],
       "c": 1,
       "e": "Como regla empírica, el HS 4 permite estimar el caudal de retorno de ACS recirculando como mínimo el 10 % del agua de alimentación."
      },
      {
       "q": "El diámetro interior mínimo de la tubería de retorno de ACS es:",
       "o": [
        "12 mm",
        "16 mm",
        "20 mm"
       ],
       "c": 1,
       "e": "El HS 4 fija un diámetro interior mínimo de 16 mm para la tubería de retorno de ACS."
      },
      {
       "q": "En todo tramo recto sin conexiones de más de 25 m hay que tomar medidas frente a:",
       "o": [
        "Golpes de ariete",
        "Condensaciones",
        "Dilataciones y contracciones"
       ],
       "c": 2,
       "e": "En los tramos rectos de más de 25 m sin conexiones hay que prever las dilataciones y contracciones por temperatura, por ejemplo con dilatadores."
      },
      {
       "q": "El volumen del depósito auxiliar del grupo de presión es V = Q·t·60, con t estimado entre:",
       "o": [
        "5 y 10 min",
        "15 y 20 min",
        "30 y 60 min"
       ],
       "c": 1,
       "e": "El depósito auxiliar del grupo de presión se dimensiona con V = Q·t·60, con t entre 15 y 20 minutos de reserva, Q en dm³/s y V en litros."
      },
      {
       "q": "Un grupo convencional con un caudal de 20 dm³/s debe llevar, sin contar las de reserva:",
       "o": [
        "2 bombas",
        "3 bombas",
        "4 bombas"
       ],
       "c": 1,
       "e": "El número de bombas del grupo convencional depende del caudal: hasta 10 dm³/s, 2 bombas; hasta 30 dm³/s, 3; por encima de 30, 4. 20 dm³/s está en el tramo de 3 bombas, sin contar las de reserva."
      },
      {
       "q": "La presión máxima de parada del grupo de presión estará entre:",
       "o": [
        "0,5 y 1 bar por encima de la mínima",
        "2 y 3 bar por encima de la mínima",
        "5 y 6 bar por encima de la mínima"
       ],
       "c": 1,
       "e": "La presión de parada del grupo se fija entre 2 y 3 bar por encima de la mínima (la de arranque). Ese margen limita el número de arranques y paradas de las bombas."
      },
      {
       "q": "El diámetro del reductor de presión se calcula en función de:",
       "o": [
        "El caudal máximo simultáneo",
        "El diámetro nominal de la tubería",
        "La presión de la red"
       ],
       "c": 0,
       "e": "El reductor de presión se elige por el caudal máximo simultáneo que debe dejar pasar (tabla 4.5 del HS 4), nunca por el diámetro de la tubería donde se instala."
      },
      {
       "q": "Para dimensionar un descalcificador se toma como caudal mínimo:",
       "o": [
        "50 l/persona·día",
        "80 l/persona·día",
        "150 l/persona·día"
       ],
       "c": 1,
       "e": "El HS 4 indica dimensionar el descalcificador con un consumo mínimo de 80 litros por persona y día."
      },
      {
       "q": "Las tuberías empotradas NO pueden ir en:",
       "o": [
        "Patinillos registrables",
        "Tabiques de ladrillo hueco sencillo",
        "Techos técnicos"
       ],
       "c": 1,
       "e": "Las tuberías empotradas no pueden ir en tabiques de ladrillo hueco sencillo, por su poco espesor (condiciones de ejecución del HS 4). Los patinillos registrables y los techos técnicos sí se permiten."
      },
      {
       "q": "Las conducciones enterradas pueden instalarse en contacto directo con el terreno.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Las conducciones enterradas nunca van en contacto directo con el terreno: deben llevar siempre un revestimiento de protección contra la corrosión."
      },
      {
       "q": "Las protecciones contra la corrosión de tubos de acero enterrados pueden ser de:",
       "o": [
        "Película continua de polietileno con zincado",
        "Solo plástico",
        "Polietileno, bituminoso, resina epoxídica o alquitrán de poliuretano"
       ],
       "c": 2,
       "e": "Los tubos de acero enterrados se protegen con polietileno, bituminoso, resina epoxídica o alquitrán de poliuretano. El cobre se protege con plástico y la fundición, con polietileno, epoxi o betún."
      },
      {
       "q": "En redes metálicas enterradas se instala una junta dieléctrica:",
       "o": [
        "Después de la entrada al edificio y antes de la salida",
        "Solo en la acometida",
        "En cada codo"
       ],
       "c": 0,
       "e": "En las redes metálicas enterradas se instala una junta dieléctrica después de la entrada al edificio y antes de la salida, para cortar las corrientes que causan corrosión (protecciones del HS 4)."
      },
      {
       "q": "El golpe de ariete positivo medido antes de válvulas y aparatos no debe sobrepasar:",
       "o": [
        "1 bar",
        "2 bar",
        "5 bar"
       ],
       "c": 1,
       "e": "El golpe de ariete positivo no debe superar los 2 bar medido antes de válvulas y aparatos. El negativo no debe bajar del 50 % de la presión de servicio."
      },
      {
       "q": "Cuando un pasatubos vertical visto pueda recibir golpes, debe sobresalir al menos:",
       "o": [
        "1 cm",
        "3 cm",
        "10 cm"
       ],
       "c": 1,
       "e": "Si un pasatubos vertical visto puede recibir golpes, debe sobresalir al menos 3 cm del suelo, para proteger la tubería (protecciones mecánicas del HS 4)."
      },
      {
       "q": "Los soportes de tubos metálicos con agua a 1,5–2 m/s deben ser:",
       "o": [
        "Rígidos",
        "Antivibratorios",
        "De acero galvanizado"
       ],
       "c": 1,
       "e": "Con velocidades de 1,5 a 2 m/s, el agua transmite ruido y vibraciones, así que los soportes de los tubos metálicos deben ser antivibratorios (protección contra ruidos del HS 4)."
      },
      {
       "q": "Quedan prohibidos expresamente los tubos de:",
       "o": [
        "Acero inoxidable",
        "Polibutileno",
        "Aluminio y los que contengan plomo"
       ],
       "c": 2,
       "e": "El HS 4 prohíbe los tubos de aluminio y los que contengan plomo, porque pueden alterar la potabilidad del agua."
      },
      {
       "q": "Las válvulas de cierre por giro de 90º solo pueden usarse como órgano de cierre para:",
       "o": [
        "Trabajos de mantenimiento",
        "Regulación de caudal",
        "Vaciado"
       ],
       "c": 0,
       "e": "Las válvulas de giro de 90º (de bola o mariposa) solo se aceptan como cierre para trabajos de mantenimiento, no para regular caudal, y deben resistir 10 bar."
      },
      {
       "q": "Para los tubos de cobre se consideran agresivas las aguas con pH inferior a:",
       "o": [
        "5,5",
        "6,5",
        "7,5"
       ],
       "c": 1,
       "e": "Para el cobre, el agua es agresiva si su pH es inferior a 6,5; la agresividad se valora con el índice de Lucey."
      },
      {
       "q": "Para valorar la agresividad del agua en tubos de acero galvanizado se emplea el índice de:",
       "o": [
        "Lucey",
        "Langelier",
        "Reynolds"
       ],
       "c": 1,
       "e": "En el acero galvanizado, la agresividad del agua se valora con el índice de Langelier. También se considera agresiva si tiene más de 250 mg/l de cloruros."
      },
      {
       "q": "El acero inoxidable AISI 304 puede usarse con cloruros de hasta:",
       "o": [
        "100 mg/l",
        "200 mg/l",
        "500 mg/l"
       ],
       "c": 1,
       "e": "El acero inoxidable AISI 304 admite aguas con hasta 200 mg/l de cloruros. Por encima hay que usar AISI 316, más resistente."
      },
      {
       "q": "Las tuberías de cobre no deben colocarse antes de las de acero galvanizado según el sentido del agua.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Si el cobre está aguas arriba del acero galvanizado, el agua arrastra iones de cobre que forman pares galvánicos y corroen el acero. Por eso el cobre no debe ir antes que el galvanizado en el sentido del flujo."
      },
      {
       "q": "Se puede acoplar cobre después de acero galvanizado si se monta entre ambos:",
       "o": [
        "Un manguito de cobre",
        "Un filtro",
        "Una válvula de retención"
       ],
       "c": 2,
       "e": "Se puede poner cobre después del acero galvanizado si se intercala una válvula de retención, que impide que el agua con iones de cobre retroceda hacia el acero (incompatibilidades del HS 4)."
      },
      {
       "q": "Las instalaciones que no se ponen en servicio en las 4 semanas siguientes a su terminación se cierran y:",
       "o": [
        "Se vacían",
        "Se presurizan",
        "Se cloran sin vaciar"
       ],
       "c": 0,
       "e": "Si una instalación no se pone en servicio en las 4 semanas siguientes a terminarla, se cierra y se vacía para evitar el agua estancada. Lo mismo si está más de 6 meses fuera de servicio."
      },
      {
       "q": "Las acometidas que no se utilizan durante 1 año deben:",
       "o": [
        "Vaciarse cada mes",
        "Taponarse",
        "Desmontarse"
       ],
       "c": 1,
       "e": "Las acometidas que no se usan durante un año deben taponarse (mantenimiento del HS 4)."
      },
      {
       "q": "Un intercambiador es un ejemplo de receptor:",
       "o": [
        "Abierto",
        "Mixto",
        "Cerrado"
       ],
       "c": 2,
       "e": "En un receptor cerrado el agua circula por dentro sin salir al exterior, como en un intercambiador. Lo que hay que tener en cuenta en el cálculo es su pérdida de carga."
      },
      {
       "q": "Los perlizadores o aireadores reducen el caudal en torno al:",
       "o": [
        "10 %",
        "20 %",
        "50 %"
       ],
       "c": 1,
       "e": "Los perlizadores o aireadores mezclan aire con el agua y reducen el caudal en torno a un 20 % sin que se note la diferencia al usarlos (tema 3)."
      },
      {
       "q": "Los grifos temporizados o electrónicos pueden reducir el consumo de agua en torno al:",
       "o": [
        "10 %",
        "30 %",
        "60 %"
       ],
       "c": 1,
       "e": "Los grifos temporizados o electrónicos cortan el agua solos, y con eso ahorran en torno a un 30 % de consumo (tema 3)."
      },
      {
       "q": "En los inodoros de doble pulsación, la descarga reducida es aproximadamente del:",
       "o": [
        "25 %",
        "50 %",
        "75 %"
       ],
       "c": 1,
       "e": "La cisterna de doble pulsación tiene una descarga completa (100 %) y otra reducida de aproximadamente la mitad (50 %)."
      },
      {
       "q": "Las duchas, al no poder llevar sifón propio, suelen conectarse a:",
       "o": [
        "Un bote sifónico",
        "Directamente a la bajante sin cierre",
        "Un separador de grasas"
       ],
       "c": 0,
       "e": "Como las duchas no suelen tener sitio para un sifón propio, se conectan a un bote sifónico que hace de cierre hidráulico común del cuarto húmedo (tema 3)."
      },
      {
       "q": "La reutilización de aguas regeneradas está regulada por el:",
       "o": [
        "RD 1620/2007",
        "RD 487/2022",
        "RD 140/2003"
       ],
       "c": 0,
       "e": "La reutilización de aguas regeneradas la regula el RD 1620/2007. El RD 487/2022 trata la legionela y el RD 140/2003, el agua de consumo (sustituido por el RD 3/2023). Tema 3."
      },
      {
       "q": "Está prohibido reutilizar aguas regeneradas en:",
       "o": [
        "Riego de jardines privados",
        "Torres de refrigeración y condensadores evaporativos",
        "Baldeo de calles"
       ],
       "c": 1,
       "e": "El RD 1620/2007 prohíbe usar aguas regeneradas en torres de refrigeración y condensadores evaporativos, por el riesgo de legionela, salvo lo previsto para uso industrial."
      },
      {
       "q": "Las aguas grises proceden de:",
       "o": [
        "Inodoros",
        "La lluvia",
        "Lavabos, duchas y bañeras"
       ],
       "c": 2,
       "e": "Las aguas grises son las de lavabos, duchas y bañeras, poco contaminadas. Las de los inodoros son aguas negras. Recuperar las grises tiene un coste elevado."
      },
      {
       "q": "El responsable de la calidad del agua regenerada hasta el punto de entrega es:",
       "o": [
        "El titular de la concesión o autorización",
        "El usuario",
        "El ayuntamiento"
       ],
       "c": 0,
       "e": "Hasta el punto de entrega, la calidad del agua regenerada es responsabilidad del titular de la concesión o autorización. A partir de ese punto responde el usuario."
      },
      {
       "q": "El documento que regula la evacuación de aguas residuales y pluviales es el:",
       "o": [
        "CTE DB HS 4",
        "CTE DB HS 5",
        "CTE DB HE 4"
       ],
       "c": 1,
       "e": "La evacuación de aguas residuales y pluviales se regula en la sección HS 5 del CTE. La HS 4 es el suministro de agua y la HE 4, la contribución renovable al ACS (tema 4)."
      },
      {
       "q": "La red de pequeña evacuación conduce los residuos desde los cierres hidráulicos hasta las bajantes, excepto los de:",
       "o": [
        "Lavabos",
        "Duchas",
        "Inodoros"
       ],
       "c": 2,
       "e": "Según el HS 5, la red de pequeña evacuación lleva el agua desde los cierres hidráulicos hasta las bajantes, salvo la de los inodoros, que desaguan directamente a la bajante o por un manguetón."
      },
      {
       "q": "El sistema en el que derivaciones y bajantes son independientes para residuales y pluviales pero se unifican en los colectores es:",
       "o": [
        "Mixto o semiseparativo",
        "Separativo",
        "Unitario de bajantes"
       ],
       "c": 0,
       "e": "En el sistema mixto o semiseparativo, derivaciones y bajantes son independientes para residuales y pluviales, pero se juntan en los colectores. En el separativo, los colectores también van separados."
      },
      {
       "q": "Cuando existe una única red de alcantarillado público, debe disponerse:",
       "o": [
        "Siempre un sistema separativo hasta la red",
        "Un sistema mixto o separativo con conexión final con cierre hidráulico",
        "Una depuradora particular"
       ],
       "c": 1,
       "e": "Si el alcantarillado público es una única red unitaria, el edificio puede tener un sistema mixto o separativo, pero la conexión final debe hacerse con un cierre hidráulico, para que los gases de la red no vuelvan al edificio. Tema 4, apartado 3.2."
      },
      {
       "q": "Cuando no existe red de alcantarillado público, las residuales van a:",
       "o": [
        "El terreno",
        "La red de pluviales",
        "Una estación depuradora particular"
       ],
       "c": 2,
       "e": "Si no hay alcantarillado público, las aguas residuales deben ir a una estación depuradora particular. Las pluviales sí pueden verterse al terreno."
      },
      {
       "q": "La ventilación terciaria protege los cierres hidráulicos contra:",
       "o": [
        "Sifonamiento y autosifonamiento",
        "Las heladas",
        "El reflujo"
       ],
       "c": 0,
       "e": "La ventilación terciaria conecta los cierres hidráulicos con la red de ventilación para protegerlos del sifonamiento y del autosifonamiento. Un sistema que la tiene incluye también la primaria y la secundaria."
      },
      {
       "q": "Las válvulas de aireación permiten:",
       "o": [
        "La salida de aire pero no su entrada",
        "La entrada de aire pero no su salida",
        "La entrada y salida de aire"
       ],
       "c": 1,
       "e": "La válvula de aireación deja entrar aire en la red para equilibrar la presión, pero no deja salir el aire de la red. Por eso puede instalarse en falsos techos sin salir al exterior."
      },
      {
       "q": "La altura máxima del cierre hidráulico es:",
       "o": [
        "70 mm",
        "100 mm",
        "150 mm"
       ],
       "c": 1,
       "e": "La altura del cierre hidráulico no debe pasar de 100 mm. La mínima es de 50 mm en usos continuos y de 70 mm en discontinuos."
      },
      {
       "q": "Un bote sifónico puede dar servicio a aparatos de otro cuarto húmedo.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Un bote sifónico solo puede dar servicio a los aparatos del cuarto húmedo donde está instalado, no a los de otro cuarto."
      },
      {
       "q": "La distancia del bote sifónico a la bajante no debe ser mayor que:",
       "o": [
        "1 m",
        "2 m",
        "4 m"
       ],
       "c": 1,
       "e": "El bote sifónico debe estar a 2 m como máximo de la bajante, y las derivaciones que llegan a él, a 2,5 m como máximo."
      },
      {
       "q": "En lavabos y bidés con sifón individual, la distancia máxima a la bajante es:",
       "o": [
        "2 m",
        "4 m",
        "6 m"
       ],
       "c": 1,
       "e": "Los lavabos y bidés con sifón individual pueden estar como máximo a 4 m de la bajante, con una pendiente del desagüe del 2,5 al 5 %."
      },
      {
       "q": "En bañeras y duchas, la pendiente del desagüe debe ser:",
       "o": [
        "Entre 2 y 4 %",
        "≥ 10 %",
        "≤ 10 %"
       ],
       "c": 2,
       "e": "El HS 5 limita la pendiente del desagüe de bañeras y duchas a un máximo del 10 %."
      },
      {
       "q": "Los desagües de fregaderos, lavadoras y lavavajillas deben llevar:",
       "o": [
        "Sifón individual",
        "Bote sifónico",
        "Válvula de aireación"
       ],
       "c": 0,
       "e": "El HS 5 exige sifón individual en los desagües de fregaderos, lavadoras y lavavajillas, por la grasa y los restos que arrastran."
      },
      {
       "q": "La unión de los desagües a las bajantes debe tener una inclinación no menor que:",
       "o": [
        "30º",
        "45º",
        "90º"
       ],
       "c": 1,
       "e": "Los desagües deben unirse a la bajante con la mayor inclinación posible y nunca menos de 45º, para que el agua entre sin frenar ni perturbar el flujo."
      },
      {
       "q": "El rebosadero es obligatorio en lavabos aunque no tengan tapón.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El HS 5 exige rebosadero en los lavabos aunque no tengan tapón, para evitar que se desborden."
      },
      {
       "q": "En redes enterradas, en las arquetas de paso pueden acometer como máximo:",
       "o": [
        "2 colectores",
        "3 colectores",
        "4 colectores"
       ],
       "c": 1,
       "e": "En las arquetas de paso de redes enterradas pueden acometer como máximo 3 colectores, uno por cada cara libre de la arqueta."
      },
      {
       "q": "La arqueta a pie de bajante debe ser sifónica.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "La arqueta a pie de bajante no debe ser sifónica: la bajante tiene que poder ventilar a través de la red."
      },
      {
       "q": "Se debe disponer pozo de resalto cuando la diferencia de cota con la acometida sea mayor que:",
       "o": [
        "0,5 m",
        "1 m",
        "2 m"
       ],
       "c": 1,
       "e": "Cuando la diferencia de cota entre el final de la red y la acometida supera 1 m, hay que disponer un pozo de resalto (HS 5)."
      },
      {
       "q": "El separador de grasas se dispone preferiblemente:",
       "o": [
        "Al principio de la red",
        "Al final de la red horizontal, antes del pozo de resalto y la acometida",
        "En cada bajante"
       ],
       "c": 1,
       "e": "El separador de grasas se coloca al final de la red horizontal, antes del pozo de resalto y de la acometida, para retener grasas de restaurantes, garajes o talleres antes de verter a la red pública."
      },
      {
       "q": "El sistema de bombeo y elevación debe tener al menos:",
       "o": [
        "Una bomba",
        "Tres bombas",
        "Dos bombas"
       ],
       "c": 2,
       "e": "El sistema de bombeo y elevación debe tener al menos dos bombas, para que siga funcionando si una se avería."
      },
      {
       "q": "Sin grupo electrógeno, las bombas de elevación deben tener una batería con autonomía de al menos:",
       "o": [
        "4 h",
        "12 h",
        "24 h"
       ],
       "c": 2,
       "e": "Si no hay grupo electrógeno, las bombas de elevación deben alimentarse con una batería de al menos 24 h de autonomía, o con un grupo exclusivo."
      },
      {
       "q": "En la conexión del bombeo con el alcantarillado debe disponerse:",
       "o": [
        "Un bucle antirreflujo",
        "Un bote sifónico",
        "Una válvula de aireación"
       ],
       "c": 0,
       "e": "La impulsión del bombeo se conecta al alcantarillado con un bucle antirreflujo, situado por encima del nivel de salida, para que el agua de la red no vuelva hacia el edificio."
      },
      {
       "q": "Para desagües continuos (bandejas de condensación), se toma 1 UD por cada:",
       "o": [
        "0,03 dm³/s",
        "0,47 dm³/s",
        "1 dm³/s"
       ],
       "c": 0,
       "e": "En los desagües continuos, como las bandejas de condensación, el HS 5 asigna 1 UD por cada 0,03 dm³/s de caudal (apartado 4.1)."
      },
      {
       "q": "Los diámetros de la tabla 4.1 del HS 5 valen para ramales individuales de longitud:",
       "o": [
        "1,5 m",
        "3 m",
        "5 m"
       ],
       "c": 0,
       "e": "Los diámetros de la tabla 4.1 del HS 5 son válidos para ramales individuales de hasta 1,5 m. Si el ramal es más largo, hay que hacer un cálculo pormenorizado."
      },
      {
       "q": "Según la tabla 4.2 del HS 5, un desagüe de 50 mm equivale a:",
       "o": [
        "2 UD",
        "3 UD",
        "5 UD"
       ],
       "c": 1,
       "e": "La tabla 4.2 del HS 5 asigna UD según el diámetro del desagüe: 32 mm → 1, 40 → 2, 50 → 3, 60 → 4, 80 → 5 y 100 → 6."
      },
      {
       "q": "Las bajantes de residuales se dimensionan para que la variación de presión no supere:",
       "o": [
        "±100 Pa",
        "±250 Pa",
        "±500 Pa"
       ],
       "c": 1,
       "e": "Las bajantes de residuales se dimensionan para que la variación de presión no supere ±250 Pa, para no romper los cierres hidráulicos, y para que el agua no ocupe más de un tercio de la sección."
      },
      {
       "q": "Si una desviación de la bajante forma más de 45º con la vertical, ese tramo se dimensiona como colector con pendiente del:",
       "o": [
        "1 %",
        "2 %",
        "4 %"
       ],
       "c": 2,
       "e": "Si una desviación forma más de 45º con la vertical, el agua ya no cae: ese tramo se dimensiona como un colector horizontal con pendiente del 4 % (HS 5)."
      },
      {
       "q": "Los colectores horizontales de residuales se dimensionan para funcionar a:",
       "o": [
        "Sección llena",
        "Media sección, hasta tres cuartos",
        "Un tercio de sección"
       ],
       "c": 1,
       "e": "Los colectores de residuales se calculan para funcionar a media sección, hasta un máximo de tres cuartos, para dejar espacio al aire. Los de pluviales se calculan a sección llena."
      },
      {
       "q": "Una cubierta de 150 m² necesita como mínimo:",
       "o": [
        "2 sumideros",
        "3 sumideros",
        "4 sumideros"
       ],
       "c": 1,
       "e": "Según la tabla 4.6 del HS 5, una cubierta de entre 100 y 200 m² necesita al menos 3 sumideros. 150 m² está en ese tramo."
      },
      {
       "q": "Para una intensidad pluviométrica de 150 mm/h, el factor de corrección de la superficie es:",
       "o": [
        "0,67",
        "1,5",
        "150"
       ],
       "c": 1,
       "e": "Las tablas de pluviales del HS 5 están hechas para 100 mm/h. Para otra intensidad, la superficie se corrige con el factor f = i / 100.",
       "k": [
        "f = i / 100",
        "f = 150 / 100 = 1,5"
       ]
      },
      {
       "q": "Un canalón de sección cuadrangular debe ser, respecto al semicircular equivalente:",
       "o": [
        "Un 10 % menor",
        "Igual",
        "Un 10 % mayor"
       ],
       "c": 2,
       "e": "El HS 5 dimensiona los canalones como semicirculares. Si el canalón es de sección cuadrangular, su sección debe ser un 10 % mayor que la del semicircular equivalente."
      },
      {
       "q": "El área de paso del filtro de una caldereta debe ser entre 1,5 y 2 veces la sección de la tubería.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El HS 5 exige que el filtro de la caldereta tenga un área de paso de entre 1,5 y 2 veces la sección de la tubería, para que no se obstruya con hojas y restos."
      }
     ]
    },
    {
     "id": "font-verif",
     "name": "Verificación",
     "short": "FONT · Verificación",
     "examSize": 20,
     "examPen": 0.5,
     "examTime": 20,
     "source": "Banco ampliado de verificación de Fontanería y saneamiento (tema 5: verificación del HS 4 y del HS 5, pruebas, puesta en servicio y mantenimiento): 94 preguntas tipo test. Las respuestas son las de las soluciones comentadas del documento. Discrepancias del temario: la presión máxima en los puntos de consumo es de 500 kPa (tema 1 y CTE DB HS 4), aunque una diapositiva del tema 5 pone 550 kPa; para legionela y agua de consumo se usan las normas vigentes que cita el tema 5 (RD 487/2022 y RD 3/2023), aunque los temas 1 y 2 citan el RD 865/2003 y el RD 140/2003; las tuberías metálicas se prueban según la UNE-EN 14336, que sustituye a la UNE 100151:1988; el desagüe del lavabo lleva entre el 2,5 y el 5 % de pendiente (HS 5), aunque el tema 3 habla de un 1 %; y la pregunta 20 del examen real (los sistemas mixtos no son más caros que los separativos) no sale de las diapositivas. Las preguntas afectadas llevan la marca «Sin confirmar».",
     "questions": [
      {
       "q": "El CTE regula las exigencias básicas de calidad de los edificios en desarrollo de la:",
       "o": [
        "Ley de Industria",
        "Ley de Aguas",
        "Ley 38/1999 de Ordenación de la Edificación"
       ],
       "c": 2,
       "e": "El CTE desarrolla la Ley 38/1999 de Ordenación de la Edificación (LOE), que establece los requisitos básicos de calidad de los edificios (tema 5, presentación)."
      },
      {
       "q": "El requisito básico de higiene, salud y protección del medio ambiente se denomina de forma simplificada:",
       "o": [
        "Salubridad",
        "Habitabilidad",
        "Seguridad de utilización"
       ],
       "c": 0,
       "e": "El requisito básico de higiene, salud y protección del medio ambiente se resume como «salubridad», y lo desarrolla el Documento Básico HS."
      },
      {
       "q": "El objetivo del requisito de salubridad es reducir a límites aceptables el riesgo de que los usuarios padezcan molestias o enfermedades y de que el edificio se deteriore o deteriore el medio ambiente.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Es la definición del objetivo de salubridad: limitar el riesgo de molestias o enfermedades para los usuarios y el de que el edificio se deteriore o deteriore el medio ambiente (tema 5, apartado 1.1)."
      },
      {
       "q": "La sección del DB HS dedicada al suministro de agua es la:",
       "o": [
        "HS 3",
        "HS 4",
        "HS 5"
       ],
       "c": 1,
       "e": "El suministro de agua es la sección HS 4 del DB HS. La HS 3 trata la calidad del aire interior y la HS 5, la evacuación de aguas."
      },
      {
       "q": "Una reforma de la fontanería existente queda dentro del HS 4 cuando:",
       "o": [
        "Se sustituyen tuberías por otras iguales",
        "Se amplía el número o la capacidad de los aparatos receptores",
        "Se repinta el cuarto de contadores"
       ],
       "c": 1,
       "e": "El HS 4 se aplica a una reforma cuando aumenta el número o la capacidad de los aparatos receptores, porque cambian los caudales. Sustituir tuberías por otras iguales no lo activa. El HS 5 sigue el mismo criterio."
      },
      {
       "q": "¿Cuál es el orden de la secuencia de verificación del HS 4 y del HS 5?",
       "o": [
        "Ejecución, diseño, productos, mantenimiento, dimensionado",
        "Productos, diseño, ejecución, dimensionado, mantenimiento",
        "Diseño, dimensionado, ejecución, productos, uso y mantenimiento"
       ],
       "c": 2,
       "e": "El HS 4 y el HS 5 tienen la misma estructura: condiciones de diseño, de dimensionado, de ejecución, de los productos de construcción y de uso y mantenimiento (apartados 3 a 7 de cada sección). La verificación sigue ese orden."
      },
      {
       "q": "En la secuencia de verificación del HS 4, la puesta en servicio forma parte del cumplimiento de las condiciones de:",
       "o": [
        "Ejecución",
        "Diseño",
        "Productos de construcción"
       ],
       "c": 0,
       "e": "La puesta en servicio, con sus pruebas, forma parte de las condiciones de ejecución, recogidas en el apartado 5 («Construcción») del HS 4."
      },
      {
       "q": "En la verificación del HS 5, las pruebas forman parte de las condiciones de:",
       "o": [
        "Dimensionado",
        "Ejecución",
        "Uso y mantenimiento"
       ],
       "c": 1,
       "e": "En el HS 5, las pruebas de estanqueidad forman parte de las condiciones de ejecución, igual que en el HS 4 (tema 5, apartado 2.2)."
      },
      {
       "q": "Según el tema 5, en la verificación de fontanería y saneamiento es la propia normativa la que determina los criterios de auditoría.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El tema 5 subraya («Recuerda») que en fontanería y saneamiento no hace falta un método propio: la normativa (HS 4 y HS 5) fija qué hay que comprobar y cómo."
      },
      {
       "q": "Los equipos de producción de ACS con acumulación deben tener características que eviten:",
       "o": [
        "El ruido",
        "La corrosión exterior",
        "El desarrollo de gérmenes patógenos"
       ],
       "c": 2,
       "e": "La exigencia básica del HS 4 pide que los equipos de ACS con acumulación eviten el desarrollo de gérmenes patógenos como la legionela, que proliferan en agua templada estancada."
      },
      {
       "q": "Según el tema 5, el agua de consumo debe cumplir actualmente el:",
       "o": [
        "RD 140/2003",
        "RD 3/2023",
        "RD 1620/2007"
       ],
       "c": 1,
       "e": "Se usa el RD 3/2023, de 10 de enero, que es el vigente y el que cita el tema 5. Los temas 1 y 2 citan todavía el RD 140/2003, que es el que sustituyó. El RD 1620/2007 trata la reutilización de aguas.",
       "d": true
      },
      {
       "q": "La base del dimensionado (caudal y presión) la facilitan:",
       "o": [
        "Las compañías suministradoras",
        "El fabricante de las tuberías",
        "El ayuntamiento"
       ],
       "c": 0,
       "e": "El caudal y la presión de partida para dimensionar los facilita la compañía suministradora, porque dependen de su red (HS 4, apartado 3.1)."
      },
      {
       "q": "Antes de los aparatos de refrigeración o climatización debe instalarse un sistema antirretorno.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El HS 4 exige un sistema antirretorno antes de los aparatos de refrigeración o climatización, para que su agua no pueda volver a la red de consumo."
      },
      {
       "q": "Al verificar las condiciones mínimas de suministro, la presión en un calentador debe ser al menos:",
       "o": [
        "100 kPa",
        "150 kPa",
        "200 kPa"
       ],
       "c": 1,
       "e": "Los calentadores, igual que los fluxores, necesitan al menos 150 kPa para funcionar bien. Los grifos comunes se conforman con 100 kPa."
      },
      {
       "q": "La temperatura de ACS de 50 a 65 ºC no es exigible en:",
       "o": [
        "Hospitales",
        "Edificios de uso exclusivo de vivienda",
        "Hoteles"
       ],
       "c": 1,
       "e": "El rango de 50 a 65 ºC no se exige en edificios de uso exclusivo de vivienda, siempre que no afecten al ambiente exterior. En hospitales y hoteles sí se exige, por el riesgo de legionela."
      },
      {
       "q": "Excepto en viviendas aisladas y adosadas, el grupo de presión, el tratamiento de agua y los contadores deben instalarse en:",
       "o": [
        "Patinillos no registrables",
        "La cubierta",
        "Locales con dimensiones suficientes para su mantenimiento"
       ],
       "c": 2,
       "e": "Salvo en viviendas aisladas o adosadas, el grupo de presión, el tratamiento de agua y los contadores deben ir en locales con espacio suficiente para mantenerlos (condiciones de mantenimiento del HS 4)."
      },
      {
       "q": "Para su mantenimiento, las redes de tuberías deben estar a la vista, en huecos o patinillos registrables, o tener arquetas o registros.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Tanto el HS 4 como el HS 5 exigen que las redes se puedan mantener: a la vista, en huecos o patinillos registrables, o con arquetas y registros."
      },
      {
       "q": "Debe disponerse contabilización de agua fría y caliente para:",
       "o": [
        "Cada unidad de consumo individualizable",
        "Cada edificio",
        "Cada planta"
       ],
       "c": 0,
       "e": "Por la exigencia de ahorro de agua, cada unidad de consumo individualizable (cada vivienda o local) debe tener contador de agua fría y de agua caliente."
      },
      {
       "q": "El esquema general de la instalación puede ser de red con contador general único o de red con:",
       "o": [
        "Contadores en cubierta",
        "Contadores aislados",
        "Grupo de presión obligatorio"
       ],
       "c": 1,
       "e": "El HS 4 contempla dos esquemas: red con contador general único (figura 3.1) y red con contadores aislados (figura 3.2)."
      },
      {
       "q": "Un grupo de presión convencional cuenta con depósito auxiliar, al menos dos bombas iguales en paralelo con funcionamiento alterno y:",
       "o": [
        "Válvula de aireación",
        "Variador de frecuencia obligatorio",
        "Depósitos de presión con membrana"
       ],
       "c": 2,
       "e": "El grupo convencional tiene un depósito auxiliar, al menos dos bombas iguales en paralelo que funcionan alternándose y depósitos de presión con membrana, que evitan arranques continuos (tema 5, apartado 1.5)."
      },
      {
       "q": "El grupo de presión de caudal variable puede prescindir del depósito auxiliar y lleva:",
       "o": [
        "Un variador de frecuencia que mantiene constante la presión de salida",
        "Solo una bomba",
        "Un depósito de membrana de gran volumen"
       ],
       "c": 0,
       "e": "El grupo de caudal variable regula la velocidad de las bombas con un variador de frecuencia para mantener constante la presión de salida, y puede prescindir del depósito auxiliar (tema 5, apartado 1.5)."
      },
      {
       "q": "El grupo de presión debe permitir abastecer con presión de red las zonas que lo admitan sin poner en marcha el grupo.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El grupo de presión debe dejar que las zonas con presión de red suficiente se abastezcan directamente, sin poner en marcha el grupo, para ahorrar energía (tema 5, apartado 1.5)."
      },
      {
       "q": "Los grupos de presión se instalan en un local de uso exclusivo que puede albergar también:",
       "o": [
        "El cuarto de basuras",
        "El sistema de tratamiento de agua",
        "La caldera"
       ],
       "c": 1,
       "e": "El grupo de presión va en un local de uso exclusivo, que puede compartir con el sistema de tratamiento de agua porque ambos forman parte de la instalación de agua (tema 5, apartado 1.5)."
      },
      {
       "q": "La prueba de resistencia mecánica y estanquidad de las instalaciones interiores la efectúa:",
       "o": [
        "La compañía suministradora",
        "El director de obra",
        "La empresa instaladora"
       ],
       "c": 2,
       "e": "La prueba de resistencia mecánica y estanquidad de las instalaciones interiores la hace la empresa instaladora (HS 4, apartado 5.2)."
      },
      {
       "q": "Durante la prueba de resistencia y estanquidad, los componentes deben estar:",
       "o": [
        "Vistos y accesibles",
        "Empotrados y terminados",
        "Aislados térmicamente"
       ],
       "c": 0,
       "e": "Durante la prueba, todos los componentes deben estar vistos y accesibles, para poder detectar cualquier fuga antes de taparlos."
      },
      {
       "q": "Para iniciar la prueba se llena la instalación con los grifos terminales:",
       "o": [
        "Cerrados",
        "Abiertos hasta purgar todo el aire",
        "Desmontados"
       ],
       "c": 1,
       "e": "Se llena la instalación con los grifos abiertos hasta que sale todo el aire. Después se cierran los grifos y la alimentación, y se sube a la presión de prueba."
      },
      {
       "q": "Tras purgar, la presión de prueba se alcanza mediante:",
       "o": [
        "La presión de la red",
        "El grupo de presión del edificio",
        "La bomba conectada"
       ],
       "c": 2,
       "e": "La presión de prueba se alcanza con una bomba conectada a la instalación, no con la presión de la red ni con el grupo del edificio (HS 4, apartado 5.2)."
      },
      {
       "q": "Las tuberías metálicas se prueban según la norma (actualizada en el tema 5):",
       "o": [
        "UNE-EN 14336",
        "UNE-CEN/TR 12108",
        "UNE 23500"
       ],
       "c": 0,
       "e": "Se usa la UNE-EN 14336, que es la que da el tema 5 como vigente. Los temas anteriores y el HS 4 citan la UNE 100151:1988, a la que sustituye. Las termoplásticas y multicapa se prueban con el procedimiento A de la UNE-CEN/TR 12108.",
       "d": true
      },
      {
       "q": "Las tuberías termoplásticas y multicapa se prueban según:",
       "o": [
        "El procedimiento A de la UNE-CEN/TR 12108",
        "La UNE-EN 14336",
        "La UNE 100030"
       ],
       "c": 0,
       "e": "Las tuberías termoplásticas y multicapa se prueban con el procedimiento A de la UNE-CEN/TR 12108. La UNE-EN 14336 es para las metálicas (HS 4, apartado 5.2)."
      },
      {
       "q": "Tras la primera prueba, la instalación se vuelve a probar:",
       "o": [
        "Con aire",
        "Con la grifería y los aparatos conectados",
        "Un año después"
       ],
       "c": 1,
       "e": "Tras la primera prueba, la instalación se vuelve a probar con la grifería y los aparatos ya conectados, para comprobar también esas uniones (HS 4, apartado 5.2)."
      },
      {
       "q": "El manómetro de la prueba debe apreciar como mínimo intervalos de:",
       "o": [
        "0,01 bar",
        "0,1 bar",
        "1 bar"
       ],
       "c": 1,
       "e": "El manómetro de la prueba debe apreciar como mínimo variaciones de 0,1 bar, para detectar pequeñas pérdidas de presión (HS 4, apartado 5.2)."
      },
      {
       "q": "Las presiones de prueba indicadas se refieren al nivel de:",
       "o": [
        "La cubierta",
        "El grifo más alto",
        "La calzada"
       ],
       "c": 2,
       "e": "Las presiones de prueba se refieren al nivel de la calzada: en los puntos más altos del edificio la presión será menor por la altura (HS 4, apartado 5.2)."
      },
      {
       "q": "La purga consiste en:",
       "o": [
        "Eliminar el aire de las tuberías",
        "Vaciar el agua",
        "Limpiar los filtros"
       ],
       "c": 0,
       "e": "Según la terminología del HS 4, la purga es la eliminación del aire de las tuberías."
      },
      {
       "q": "La comprobación del tiempo que tarda en salir el agua caliente se hace tras el equilibrado y sin haber abierto ningún grifo en las últimas:",
       "o": [
        "2 horas",
        "12 horas",
        "24 horas"
       ],
       "c": 2,
       "e": "Para medir cuánto tarda en salir el agua caliente, la red debe estar en reposo: tras el equilibrado y sin abrir ningún grifo en las últimas 24 horas. Se abre uno a uno el grifo más alejado de cada ramal."
      },
      {
       "q": "Con el acumulador a régimen, las temperaturas se comprueban con:",
       "o": [
        "Cámara termográfica obligatoria",
        "Termómetro de contacto",
        "Analizador de gases"
       ],
       "c": 1,
       "e": "Con el acumulador a régimen, las temperaturas se miden con un termómetro de contacto en el acumulador, en su salida y en los grifos."
      },
      {
       "q": "La temperatura del retorno de ACS no debe ser inferior a la de salida del acumulador en más de:",
       "o": [
        "1 ºC",
        "3 ºC",
        "5 ºC"
       ],
       "c": 1,
       "e": "El retorno de ACS no debe llegar más de 3 ºC por debajo de la temperatura de salida del acumulador (HS 4, apartado 5.2)."
      },
      {
       "q": "Entre las pruebas de ACS está obtener los caudales exigidos a la temperatura fijada abriendo:",
       "o": [
        "Todos los grifos",
        "Un solo grifo",
        "El número de grifos estimado en la simultaneidad"
       ],
       "c": 2,
       "e": "Se abren a la vez los grifos que se han estimado en el cálculo de simultaneidad y se comprueba que dan el caudal exigido a la temperatura fijada (HS 4, apartado 5.2)."
      },
      {
       "q": "¿Cuál NO es una prueba particular de ACS del HS 4?",
       "o": [
        "Prueba de humo",
        "Medición de temperaturas de la red",
        "Medición de caudal y temperatura en los puntos de agua"
       ],
       "c": 0,
       "e": "La prueba de humo es de saneamiento (HS 5), no de ACS. Las pruebas de ACS miden caudales y temperaturas."
      },
      {
       "q": "La red de ACS debe tener retorno, tanto en producción individual como centralizada, cuando la ida al punto más alejado mide:",
       "o": [
        "≥ 10 m",
        "≥ 15 m",
        "≥ 25 m"
       ],
       "c": 1,
       "e": "Con producción individual o centralizada, la red de ACS debe tener retorno si la ida al punto más alejado mide 15 m o más (tema 5, apartado 1.7)."
      },
      {
       "q": "Una instalación que permanece fuera de servicio más de 6 meses debe:",
       "o": [
        "Clorarse sin vaciar",
        "Cerrarse y vaciarse",
        "Mantenerse llena"
       ],
       "c": 1,
       "e": "Si una instalación va a estar más de 6 meses fuera de servicio, debe cerrarse y vaciarse, para que no quede agua estancada. También si no entra en servicio en las 4 semanas siguientes a terminarla."
      },
      {
       "q": "Las acometidas paradas temporalmente deben cerrarse en:",
       "o": [
        "El contador divisionario",
        "La llave de cada vivienda",
        "La conducción de abastecimiento"
       ],
       "c": 2,
       "e": "Las acometidas paradas temporalmente se cierran en la conducción de abastecimiento, es decir, antes de entrar al edificio (HS 4, apartado 7.1)."
      },
      {
       "q": "En la nueva puesta en servicio de una instalación con descalcificación hay que iniciar:",
       "o": [
        "Una regeneración por arranque manual",
        "Una prueba de humo",
        "Un vaciado completo"
       ],
       "c": 0,
       "e": "Al volver a poner en servicio una instalación con descalcificador, hay que iniciar una regeneración con arranque manual (HS 4, apartado 7.2)."
      },
      {
       "q": "Para el llenado en una nueva puesta en servicio, las llaves de cierre se abren al principio:",
       "o": [
        "Totalmente",
        "Solo un poco, empezando por la llave principal",
        "Empezando por la más alejada"
       ],
       "c": 1,
       "e": "Al llenar de nuevo la instalación, las llaves se abren solo un poco, empezando por la principal, para evitar golpes de ariete."
      },
      {
       "q": "En la nueva puesta en servicio, la purga de las llaves de toma empieza por:",
       "o": [
        "La más cercana",
        "La de la cocina",
        "La más alejada o la situada más alta"
       ],
       "c": 2,
       "e": "La purga empieza por la toma más alejada o la más alta, que es donde se acumula el aire, y se deja abierta hasta que no sale aire."
      },
      {
       "q": "Tras llenar y lavar, la estanqueidad de la instalación se comprueba:",
       "o": [
        "Por control visual de conducciones accesibles, conexiones y aparatos",
        "Con humo",
        "Con aire a 1 bar"
       ],
       "c": 0,
       "e": "Tras llenar y lavar, la estanqueidad se comprueba visualmente en las conducciones accesibles, las conexiones y los aparatos (HS 4, apartado 7.2)."
      },
      {
       "q": "Según el tema 5, las operaciones de mantenimiento de fontanería deben recoger las prescripciones del:",
       "o": [
        "RD 1620/2007",
        "RD 487/2022 sobre legionelosis",
        "RITE"
       ],
       "c": 1,
       "e": "Se usa el RD 487/2022, que es el vigente y el que cita el tema 5. El tema 2 cita todavía el RD 865/2003, al que sustituye. El RD 1620/2007 trata la reutilización de aguas.",
       "d": true
      },
      {
       "q": "Los elementos de medida, control y maniobra que deban quedar ocultos se situarán en espacios accesibles.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "Si los elementos de medida, control y maniobra deben quedar ocultos, han de situarse en espacios accesibles para su mantenimiento (HS 4, apartado 7.3)."
      },
      {
       "q": "Con batería de contadores, los montantes hasta cada derivación particular forman parte, a efectos de mantenimiento, de:",
       "o": [
        "La instalación particular",
        "La acometida",
        "La instalación general"
       ],
       "c": 2,
       "e": "Con batería de contadores, los montantes hasta cada derivación particular discurren por zonas comunes, así que a efectos de mantenimiento forman parte de la instalación general."
      },
      {
       "q": "El cierre hidráulico impide el paso de aire de la red a los locales:",
       "o": [
        "Sin afectar al flujo del agua",
        "Reduciendo el caudal",
        "Solo de noche"
       ],
       "c": 0,
       "e": "Según el HS 5, el cierre hidráulico deja una capa de agua que impide que los gases de la red entren en los locales, sin frenar el desagüe."
      },
      {
       "q": "¿Cuál de estas características NO es exigible a un cierre hidráulico?",
       "o": [
        "Ser autolimpiable",
        "Tener una válvula de retención interior",
        "No tener partes móviles"
       ],
       "c": 1,
       "e": "El cierre hidráulico debe ser autolimpiable, no tener partes móviles y tener un registro de limpieza accesible. Una válvula de retención interior sería una parte móvil, así que no se exige."
      },
      {
       "q": "Los cierres hidráulicos pueden instalarse en serie.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "No se pueden poner dos cierres hidráulicos en serie. Por ejemplo, si hay bote sifónico, los aparatos que desaguan en él no llevan sifón individual."
      },
      {
       "q": "La corona del sifón debe estar a una distancia de la válvula de desagüe:",
       "o": [
        "≤ 60 cm",
        "≤ 1 m",
        "≥ 1 m"
       ],
       "c": 0,
       "e": "El HS 5 limita a 60 cm la distancia entre la válvula de desagüe y la corona del sifón."
      },
      {
       "q": "El diámetro del sifón debe ser:",
       "o": [
        "Igual al de la bajante",
        "Menor que el de la válvula",
        "Mayor o igual que el de la válvula y menor o igual que el del ramal"
       ],
       "c": 2,
       "e": "El diámetro del sifón debe ser igual o mayor que el de la válvula de desagüe e igual o menor que el del ramal, para que el diámetro vaya aumentando en el sentido del flujo."
      },
      {
       "q": "Si la red de pequeña evacuación no puede conectarse a la bajante, se permite conectarla:",
       "o": [
        "Al manguetón del inodoro",
        "Al colector enterrado directamente",
        "A la red de pluviales"
       ],
       "c": 0,
       "e": "Si la red de pequeña evacuación no puede llegar a la bajante, el HS 5 permite conectarla al manguetón del inodoro."
      },
      {
       "q": "Pueden disponerse desagües enfrentados acometiendo a una tubería común.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "El HS 5 prohíbe que dos desagües enfrentados acometan a una tubería común, porque el agua de uno entraría en el otro."
      },
      {
       "q": "Con sifones individuales, los ramales se unen a un tubo de derivación con cabecera:",
       "o": [
        "Soldada",
        "Registrable con tapón roscado",
        "Abierta al ambiente"
       ],
       "c": 1,
       "e": "Con sifones individuales, los ramales se unen a un tubo de derivación cuya cabecera debe ser registrable con tapón roscado, para poder limpiarla (HS 5)."
      },
      {
       "q": "El diámetro de una bajante puede disminuir en el sentido de la corriente.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 1,
       "e": "Una bajante nunca puede reducir su diámetro en el sentido de la corriente. Sí puede aumentarlo si acometen caudales mucho mayores."
      },
      {
       "q": "En colectores colgados, las bajantes se conectan mediante:",
       "o": [
        "Bridas",
        "Simples codos",
        "Piezas especiales, no simples codos"
       ],
       "c": 2,
       "e": "En los colectores colgados, las bajantes se conectan con piezas especiales, no con simples codos, para no frenar el agua ni provocar atascos (tema 5, apartado 2.3)."
      },
      {
       "q": "La conexión de una bajante de pluviales a un colector colgado debe separarse de la de residuales al menos:",
       "o": [
        "1 m",
        "3 m",
        "5 m"
       ],
       "c": 1,
       "e": "En un colector colgado, la conexión de una bajante de pluviales debe estar al menos a 3 m de la de residuales (tema 5, apartado 2.3)."
      },
      {
       "q": "En un mismo punto de un colector colgado no deben acometer más de:",
       "o": [
        "Dos colectores",
        "Tres colectores",
        "Cuatro colectores"
       ],
       "c": 0,
       "e": "En un mismo punto de un colector colgado no pueden acometer más de dos colectores. En las arquetas de paso de redes enterradas se admiten tres."
      },
      {
       "q": "En los tramos rectos de colectores, la distancia máxima entre registros es:",
       "o": [
        "10 m",
        "15 m",
        "25 m"
       ],
       "c": 1,
       "e": "En los tramos rectos de colectores, colgados o enterrados, debe haber un registro al menos cada 15 m."
      },
      {
       "q": "Los colectores enterrados se sitúan en zanjas:",
       "o": [
        "Por encima de la red de agua potable",
        "Por debajo de la red de agua potable",
        "Junto a la red eléctrica"
       ],
       "c": 1,
       "e": "Los colectores enterrados van por debajo de la red de agua potable, para que una fuga de aguas residuales no pueda contaminarla (tema 5, apartado 2.3)."
      },
      {
       "q": "La acometida de las bajantes a una red enterrada se hace con interposición de:",
       "o": [
        "Una válvula de aireación",
        "Un bote sifónico",
        "Una arqueta"
       ],
       "c": 2,
       "e": "Las bajantes acometen a la red enterrada a través de una arqueta, que permite registrar y limpiar la unión (tema 5, apartado 2.3)."
      },
      {
       "q": "La pendiente mínima de un colector enterrado es del:",
       "o": [
        "1 %",
        "2 %",
        "4 %"
       ],
       "c": 1,
       "e": "Los colectores enterrados necesitan una pendiente mínima del 2 %. Los colgados, del 1 %."
      },
      {
       "q": "Las pruebas de estanqueidad parcial se realizan con:",
       "o": [
        "Agua",
        "Aire",
        "Humo"
       ],
       "c": 0,
       "e": "Las pruebas de estanqueidad parcial se hacen con agua, sobre los aparatos, las redes horizontales y las arquetas."
      },
      {
       "q": "En la prueba de aparatos no se admite que quede en el sifón una altura de cierre hidráulico inferior a:",
       "o": [
        "10 mm",
        "25 mm",
        "50 mm"
       ],
       "c": 1,
       "e": "En la prueba de aparatos, después de descargar, el sifón debe conservar al menos 25 mm de cierre hidráulico (HS 5, apartado 5.6)."
      },
      {
       "q": "En la prueba de aparatos se verifican tiempos de desagüe, sifonamientos, ruidos y:",
       "o": [
        "Resistencia al fuego",
        "Cierres hidráulicos",
        "Presión de la red de agua"
       ],
       "c": 1,
       "e": "En la prueba de aparatos se comprueban los tiempos de desagüe, los sifonamientos, los ruidos y que se mantienen los cierres hidráulicos, descargando cada aparato solo o varios a la vez."
      },
      {
       "q": "En la prueba de vaciado, con los grifos al caudal mínimo y la válvula de desagüe abierta, no debe acumularse agua en el aparato durante:",
       "o": [
        "30 segundos",
        "1 minuto",
        "5 minutos"
       ],
       "c": 1,
       "e": "En la prueba de vaciado, con los grifos al caudal mínimo y el desagüe abierto, el aparato no debe acumular agua durante 1 minuto (HS 5, apartado 5.6)."
      },
      {
       "q": "En la prueba de la red horizontal se introduce agua a presión de:",
       "o": [
        "0,1 a 0,2 bar",
        "0,3 a 0,6 bar",
        "1 a 2 bar"
       ],
       "c": 1,
       "e": "La red horizontal se prueba introduciendo agua a una presión de 0,3 a 0,6 bar durante 10 minutos."
      },
      {
       "q": "La prueba de cada tramo de red horizontal dura:",
       "o": [
        "2 minutos",
        "10 minutos",
        "2 horas"
       ],
       "c": 1,
       "e": "Cada tramo de red horizontal se prueba durante 10 minutos a 0,3–0,6 bar (HS 5, apartado 5.6)."
      },
      {
       "q": "Las arquetas y pozos de registro se prueban llenándolos de agua y observando si:",
       "o": [
        "Cambia el color",
        "Sale humo",
        "Desciende el nivel"
       ],
       "c": 2,
       "e": "Las arquetas y pozos se llenan de agua y se comprueba que el nivel no baja, lo que indicaría una fuga (HS 5, apartado 5.6)."
      },
      {
       "q": "En las pruebas parciales se controlan las uniones, entronques y derivaciones en un:",
       "o": [
        "10 %",
        "50 %",
        "100 %"
       ],
       "c": 2,
       "e": "En las pruebas parciales se revisan todas, el 100 %, de las uniones, entronques y derivaciones (HS 5, apartado 5.6)."
      },
      {
       "q": "Las pruebas de estanqueidad total se hacen sobre el sistema completo:",
       "o": [
        "De una sola vez o por partes",
        "Solo de una vez",
        "Solo por plantas"
       ],
       "c": 0,
       "e": "Las pruebas de estanqueidad total se hacen sobre el sistema completo, de una vez o por partes, con agua, aire o humo."
      },
      {
       "q": "En la prueba total con agua se taponan todos los terminales excepto los de:",
       "o": [
        "La planta baja",
        "Cubierta",
        "Los inodoros"
       ],
       "c": 1,
       "e": "En la prueba total con agua se taponan todos los terminales salvo los de cubierta, y se llena la red hasta que rebosa por ellos."
      },
      {
       "q": "En la prueba total con agua, la presión en cualquier punto debe estar entre:",
       "o": [
        "0,1 y 0,3 bar",
        "0,3 y 1 bar",
        "1 y 2 bar"
       ],
       "c": 1,
       "e": "En la prueba total con agua, la presión en cualquier punto debe estar entre 0,3 y 1 bar (HS 5, apartado 5.6)."
      },
      {
       "q": "Si la altura equivalente del sistema supera 1 bar, la prueba con agua se hace:",
       "o": [
        "Con aire",
        "A 2 bar",
        "Por fases, subdividiendo la red en vertical"
       ],
       "c": 2,
       "e": "Si la columna de agua de todo el sistema daría más de 1 bar, la prueba se hace por fases, dividiendo la red en tramos verticales (HS 5, apartado 5.6)."
      },
      {
       "q": "Si la red se prueba con agua por partes, la presión será de:",
       "o": [
        "0,3 a 0,6 bar",
        "0,5 a 1 bar",
        "1 bar"
       ],
       "c": 0,
       "e": "Si la red se prueba con agua por partes, la presión es de 0,3 a 0,6 bar, suficiente para detectar fugas sin forzar las uniones."
      },
      {
       "q": "Si la red de ventilación ya está hecha, en la prueba con agua:",
       "o": [
        "Se somete al mismo régimen que el resto",
        "Se excluye",
        "Se prueba con humo"
       ],
       "c": 0,
       "e": "Si la red de ventilación ya está ejecutada, se prueba con agua igual que el resto de la red (HS 5, apartado 5.6)."
      },
      {
       "q": "La prueba con agua termina cuando:",
       "o": [
        "Han pasado 10 minutos",
        "Ninguna unión acusa pérdida de agua",
        "El agua sale por cubierta"
       ],
       "c": 1,
       "e": "La prueba con agua se da por buena cuando ninguna unión pierde agua (HS 5, apartado 5.6)."
      },
      {
       "q": "En la prueba con aire, la presión de la red será de:",
       "o": [
        "0,3 a 0,6 bar",
        "0,5 a 1 bar como máximo",
        "2 bar"
       ],
       "c": 1,
       "e": "En la prueba con aire, la presión de la red se lleva a entre 0,5 y 1 bar como máximo (HS 5, apartado 5.6)."
      },
      {
       "q": "La prueba con aire es satisfactoria si la presión se mantiene constante durante:",
       "o": [
        "1 minuto",
        "3 minutos",
        "10 minutos"
       ],
       "c": 1,
       "e": "La prueba con aire es satisfactoria si la presión se mantiene constante durante 3 minutos (HS 5, apartado 5.6)."
      },
      {
       "q": "La prueba con humo se efectúa sobre la red de:",
       "o": [
        "Aguas pluviales",
        "Agua fría",
        "Aguas residuales y su ventilación"
       ],
       "c": 2,
       "e": "La prueba con humo se hace sobre la red de aguas residuales y su ventilación, que es por donde podrían escapar gases al interior. La prueba con agua se hace sobre residuales y pluviales."
      },
      {
       "q": "En la prueba con humo, el producto se introduce:",
       "o": [
        "Por la parte baja del sistema",
        "Por la cubierta",
        "Por cada aparato"
       ],
       "c": 0,
       "e": "El humo se introduce por la parte baja del sistema, después de llenar de agua todos los cierres hidráulicos, y sube por la red."
      },
      {
       "q": "En la prueba con humo, cuando aparece humo por los terminales de cubierta se taponan para mantener una presión de:",
       "o": [
        "25 Pa",
        "250 Pa",
        "2.500 Pa"
       ],
       "c": 1,
       "e": "Cuando el humo sale por los terminales de cubierta, se taponan para mantener una presión de 250 Pa, la misma variación que deben aguantar los cierres hidráulicos."
      },
      {
       "q": "La prueba con humo es satisfactoria cuando:",
       "o": [
        "El humo sale por todos los aparatos",
        "No se detecta humo ni olor en el interior del edificio",
        "La presión sube a 1 bar"
       ],
       "c": 1,
       "e": "La prueba con humo es satisfactoria si no se nota humo ni olor dentro del edificio (HS 5, apartado 5.6)."
      },
      {
       "q": "El humo de la prueba debe ser espeso y de olor fuerte.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El humo de prueba debe ser espeso y de olor fuerte, para poder detectar las fugas a la vista y por el olfato."
      },
      {
       "q": "Los sumideros de locales húmedos, cubiertas transitables y los botes sifónicos se limpian cada:",
       "o": [
        "3 meses",
        "Año",
        "6 meses"
       ],
       "c": 2,
       "e": "Los sumideros de locales húmedos y de cubiertas transitables y los botes sifónicos se limpian cada 6 meses (HS 5, apartado 7)."
      },
      {
       "q": "Los sumideros y calderetas de cubiertas no transitables se limpian al menos:",
       "o": [
        "Una vez al año",
        "Cada mes",
        "Cada 5 años"
       ],
       "c": 0,
       "e": "Los sumideros y calderetas de cubiertas no transitables se limpian al menos una vez al año (HS 5, apartado 7)."
      },
      {
       "q": "Los colectores suspendidos se revisan:",
       "o": [
        "Cada 6 meses",
        "Una vez al año",
        "Cada 10 años"
       ],
       "c": 1,
       "e": "Los colectores suspendidos se revisan una vez al año, igual que las arquetas sumidero, los pozos y las bombas."
      },
      {
       "q": "Las arquetas de pie de bajante, de paso y sifónicas se limpian cada:",
       "o": [
        "Año",
        "5 años",
        "10 años"
       ],
       "c": 2,
       "e": "Las arquetas de pie de bajante, de paso y sifónicas se limpian cada 10 años, o antes si aparecen olores."
      },
      {
       "q": "El separador de grasas y fangos se limpia cada:",
       "o": [
        "6 meses",
        "Mes",
        "Año"
       ],
       "c": 0,
       "e": "El separador de grasas y fangos se limpia cada 6 meses, porque se llena con rapidez (HS 5, apartado 7)."
      },
      {
       "q": "Los sifones y válvulas se revisan y desatascan:",
       "o": [
        "Cada año",
        "Cuando disminuye apreciablemente el caudal de evacuación",
        "Cada 10 años"
       ],
       "c": 1,
       "e": "Los sifones y válvulas no tienen una periodicidad fija: se revisan y desatascan cuando el caudal de evacuación baja de forma apreciable (HS 5, apartado 7)."
      },
      {
       "q": "Para evitar malos olores, en sumideros, botes sifónicos y sifones debe mantenerse:",
       "o": [
        "Desinfectante",
        "Tapones cerrados",
        "Agua permanentemente"
       ],
       "c": 2,
       "e": "Para que no haya malos olores, sumideros, botes sifónicos y sifones deben tener siempre agua, que es lo que forma el cierre hidráulico (HS 5, apartado 7)."
      },
      {
       "q": "En el mantenimiento de saneamiento se comprueba periódicamente la estanqueidad de la red y la existencia de olores.",
       "o": [
        "Verdadero",
        "Falso"
       ],
       "c": 0,
       "e": "El mantenimiento del saneamiento incluye comprobar periódicamente la estanqueidad de la red y si hay olores, que indicarían fugas o cierres hidráulicos secos (HS 5, apartado 7)."
      }
     ]
    }
   ]
  }
 ]
});
