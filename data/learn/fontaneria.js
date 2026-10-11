// Aprender · Fontanería y saneamiento.
// Contenido sacado SOLO de FONTA_TEMARIO (partes 0, 1 y 2) y de los bancos de preguntas de Fontanería de data/inst.js.
// Formato y cómo añadir otro tema: README, «Cómo añadir el módulo Aprender a un tema». Comprobación: node tools/check-learn.js
window.LEARN = window.LEARN || {};
window.LEARN.font = {
  tema: "font", name: "Fontanería y saneamiento",
  source: "FONTA_TEMARIO (temario de estudio, unidad 5, temas 1 a 5)",
  base: "assets/learn/fontaneria/",
  // Parte 0 resumida
  howAsks: [
    "Parcial del 21-02-2026: 20 preguntas en 20 minutos. Acierto +0,5, fallo −0,25, en blanco 0. Tres opciones (A, B, C) o verdadero/falso.",
    "Casi todo sale literal del CTE DB HS 4 y HS 5: definiciones, límites de presión y temperatura, velocidades, pendientes y distancias.",
    "Trampas: un número cercano (3 m/s por 3,5 m/s; manguetón de 2 m por 1 m; 70 mm para uso continuo) o dos conceptos intercambiados (ventilación primaria y secundaria; receptor abierto y cerrado).",
    "También caen preguntas de criterio de los temas 3 y 4: agua de lluvia potable, sellado siempre con sifón individual, cómo se evita el reflujo.",
    "Si dudas entre las tres, en blanco; si puedes descartar una, compensa contestar.",
    "Estudia los números por parejas: 50/70 mm, 1 %/2 %, 2/3,5 m/s, 2 m/2,5 m, 100/150 kPa."
  ],
  // Parte 0: discrepancias del temario (bloque aparte en la entrada)
  discrep: [
    "Presión máxima en los puntos de consumo: 500 kPa en el tema 1 y el CTE DB HS 4; 550 kPa en la diapositiva del tema 5. En las preguntas se usa 500 kPa.",
    "Legionela: RD 865/2003 (tema 2) frente al RD 487/2022 (tema 5), que es el vigente. Agua de consumo: RD 140/2003 (temas 1 y 2) frente al RD 3/2023 (tema 5).",
    "Prueba de tuberías metálicas: UNE 100151:1988, que el tema 5 indica sustituida por la UNE-EN 14336:2005. Termoplásticas y multicapa: procedimiento A de la UNE-CEN/TR 12108:2015 IN.",
    "Pendiente del desagüe del lavabo: «una mínima pendiente (1 %)» en el tema 3; el HS 5 (temas 4 y 5) exige entre 2,5 y 5 % con sifón individual.",
    "La pregunta 20 del examen (los sistemas mixtos no son más caros que los separativos) no sale de las diapositivas."
  ],
  // figuras: archivo, ancho, alto, texto alternativo y pie
  figs: {
    f01: {"src":"fig01.webp","w":1200,"h":311,"alt":"Cadena de cajas: contador, llave de paso, derivación particular, ramales de enlace y puntos de consumo. Debajo: instalación interior particular, del contador (o llave de paso) a los aparatos del abonado.","cap":"Figura 1. Partes de la instalación interior particular (HS 4, terminología)."},
    f02: {"src":"fig02.webp","w":1200,"h":438,"alt":"Esquema de la red pública, el contador y una ascendente con cinco puntos numerados: 1 después de los contadores, 2 en la base de las ascendentes, 3 antes del equipo de tratamiento de agua, 4 en tubos de alimentación no domésticos y 5 antes de aparatos de refrigeración o climatización. Siempre combinados con grifos de vaciado.","cap":"Figura 2. Puntos donde el HS 4 exige sistema antirretorno."},
    f03: {"src":"fig03.webp","w":1200,"h":316,"alt":"Dos escalas. Presión en el punto de consumo: 100 kPa grifos comunes, 150 kPa fluxores y calentadores, 500 kPa máximo. Temperatura de ACS en el punto de consumo: entre 50 y 65 °C.","cap":"Figura 3. Límites de presión y temperatura en los puntos de consumo."},
    f04: {"src":"fig04.webp","w":1200,"h":545,"alt":"a) Red con contador general único: acometida, llave de corte general, filtro, contador general, tubo de alimentación, distribuidor principal, ascendentes y derivaciones colectivas. b) Red con contadores aislados: acometida, llave de corte general, filtro, tubo de alimentación, contadores divisionarios, ascendentes e instalaciones particulares. Pie: la instalación general va de la llave de corte general hasta las instalaciones particulares.","cap":"Figura 4. Los dos esquemas generales del HS 4, de la red pública a los usuarios (simplificados)."},
    f05: {"src":"fig05.webp","w":1200,"h":405,"alt":"Pasos en cajas: a) caudal máximo, suma de caudales de la tabla 2.1; b) coeficiente de simultaneidad; c) caudal de cálculo = Qmáx × K; d) velocidad de cálculo; e) diámetro (Q y v); comprobar presión. Arriba: pérdidas localizadas del 20–30 % de las de la longitud real; si no llega la presión mínima, grupo de presión. Se empieza por el circuito más desfavorable.","cap":"Figura 5. Procedimiento de dimensionado por tramos del HS 4 (apartado 4.2)."},
    f06: {"src":"fig06.webp","w":1200,"h":338,"alt":"Barras de velocidad de cálculo: tuberías metálicas de 0,5 a 2,0 m/s; termoplásticas y multicapa de 0,5 a 3,5 m/s.","cap":"Figura 6. Intervalos de velocidad de cálculo según el material (pregunta 6 del examen)."},
    f07: {"src":"fig07.webp","w":1200,"h":434,"alt":"Acumulador con la ida al grifo más alejado y el retorno. Si la ida mide 15 m o más, red de retorno obligatoria. En el grifo más alejado, caída de 3 °C como máximo respecto a la salida del acumulador. Retorno de al menos 250 l/h por columna, en torno al 10 % del caudal y diámetro interior de 16 mm o más.","cap":"Figura 7. Criterios de la red de retorno de ACS."},
    f08: {"src":"fig08.webp","w":1200,"h":461,"alt":"Grupo convencional: depósito auxiliar V = Q·t·60 con t de 15 a 20 min, dos o más bombas iguales en paralelo y funcionamiento alterno, depósito de presión con membrana Vn = Pb·Va/Pa. Caudal variable: puede prescindir del depósito auxiliar y lleva variador de frecuencia con presión de salida constante. Número de bombas sin reserva: hasta 10 dm³/s, 2; hasta 30, 3; más de 30, 4. Pmáx = Pmín + 2 a 3 bar.","cap":"Figura 8. Grupo de presión convencional y de caudal variable, con las fórmulas del tema 2."},
    f09: {"src":"fig09.webp","w":1200,"h":562,"alt":"Tubería que atraviesa un forjado o muro dentro de una funda (pasatubos) de mayor diámetro, que sobresale 3 cm o más donde pueda haber golpes.","cap":"Figura 9. Paso de una tubería por un forjado o muro con funda."},
    f10: {"src":"fig10.webp","w":1200,"h":386,"alt":"Sentido de circulación del agua. Cobre antes de acero galvanizado: prohibido, los iones Cu+ arrastrados perforan el galvanizado. Acero galvanizado antes de cobre: permitido montando una válvula de retención entre ambos. Acero galvanizado antes de acero inoxidable: permitido.","cap":"Figura 10. Orden de los metales según el sentido del agua (par galvánico)."},
    f11: {"src":"fig11.webp","w":1200,"h":381,"alt":"Dos recuadros. Receptor abierto: el agua sale al exterior (grifo, inodoro, ducha); en el cálculo cuenta la presión mínima de salida. Receptor cerrado: el agua lo atraviesa (intercambiador); en el cálculo cuenta su pérdida de carga como elemento singular.","cap":"Figura 11. Receptores abiertos y cerrados."},
    f12: {"src":"fig12.webp","w":1200,"h":385,"alt":"Barras de reducción según el tema 3: perlizador o aireador, 20 % del caudal; grifo temporizado o electrónico, 30 % del consumo; doble pulsación, descarga reducida del 50 %.","cap":"Figura 12. Ahorro que el tema 3 atribuye a cada dispositivo."},
    f13: {"src":"fig13.webp","w":1200,"h":451,"alt":"Separativo: bajantes de pluviales y residuales con colectores independientes. Mixto o semiseparativo: derivaciones y bajantes separadas que se unen en un colector común.","cap":"Figura 13. Sistema separativo frente a mixto."},
    f14: {"src":"fig14.webp","w":1200,"h":557,"alt":"Cuatro esquemas. Primaria: la bajante se prolonga por encima de la cubierta. Secundaria: tubo paralelo conectado a la bajante, que evita la sobrepresión en la base. Terciaria: ramales a cada cierre, que lo protegen contra el sifonamiento. Válvula de aireación en lo alto de una bajante, bajo la cubierta.","cap":"Figura 14. Subsistemas de ventilación del saneamiento (esquemático)."},
    f15: {"src":"fig15.webp","w":1200,"h":483,"alt":"Sifón en U con el agua retenida (sello) y la altura de cierre; corona a 60 cm o menos por debajo de la válvula de desagüe. Uso continuo, 50 mm o más; uso discontinuo, 70 mm o más; máximo 100 mm; prueba parcial, mínimo admitido 25 mm.","cap":"Figura 15. Cierre hidráulico (sifón) y alturas del HS 5."},
    f16: {"src":"fig16.webp","w":1200,"h":577,"alt":"Desagües hacia una bajante. Lavabo, bidé, fregadero y lavadero con sifón individual: hasta 4 m de la bajante con pendiente del 2,5 al 5 %. Bañera y ducha: pendiente de hasta el 10 %. Inodoro: directo o con manguetón de 1 m o menos. Derivaciones al bote sifónico de hasta 2,5 m con el 2–4 %; bote sifónico a bajante, hasta 2,00 m. Unión a la bajante con inclinación nunca menor de 45°.","cap":"Figura 16. Distancias y pendientes de la red de pequeña evacuación (HS 5)."},
    f17: {"src":"fig17.webp","w":1200,"h":440,"alt":"Colector colgado: pendiente del 1 % o más, registros cada 15 m como máximo, no más de 2 colectores en un punto y pluviales a 3 m o más de la conexión de residuales. Colector enterrado: pendiente del 2 % o más, por debajo de la red de agua potable y con arquetas, hasta el pozo; si el desnivel supera 1 m, pozo de resalto. Bajantes sin desviaciones y con diámetro que no disminuye.","cap":"Figura 17. Colectores colgados y enterrados, pozo general y pozo de resalto."},
    f18: {"src":"fig18.webp","w":1200,"h":287,"alt":"Cadena de cajas: diseño (ap. 3), dimensionado (ap. 4), ejecución (ap. 5) con puesta en servicio y pruebas, productos de construcción (ap. 6) y uso y mantenimiento (ap. 7).","cap":"Figura 18. Secuencia de verificación del HS 4 y del HS 5."},
    f19: {"src":"fig19.webp","w":1200,"h":510,"alt":"Pruebas al finalizar. Estanqueidad parcial con agua: aparatos con cierre que quede de 25 mm o más; vaciado sin acumulación en 1 min; red horizontal a 0,3–0,6 bar durante 10 min; arquetas y pozos sin descenso de nivel; uniones y derivaciones al 100 %. Estanqueidad total: agua a 0,3–1 bar (por partes 0,3–0,6) sin que pierda ninguna unión; aire a 0,5–1 bar con presión constante 3 minutos; humo espeso y con olor por la parte baja, 250 Pa, sin humo ni olor dentro del edificio.","cap":"Figura 19. Resumen de las pruebas de estanqueidad del saneamiento."},
    f20: {"src":"fig20.webp","w":1200,"h":427,"alt":"Tres recuadros. Cada 6 meses: sumideros de locales húmedos, sumideros de cubiertas transitables, botes sifónicos y separador de grasas y fangos. Cada año: sumideros y calderetas de cubiertas no transitables, colectores suspendidos, arquetas sumidero, pozos y bombas. Cada 10 años: arquetas a pie de bajante, de paso y sifónicas (antes si hay olores).","cap":"Figura 20. Periodicidad de limpieza y revisión del saneamiento."}
  },
  temas: [
    { n: 1, name: "Instalación de enlace", lessons: [
      { id: "fonta-1.1", apt: ["fonta-1.1"], title: "1.1. Normativa y ámbito de aplicación",
      cards: [
        {"t":"ex","h":"El CTE DB HS 4","p":"El documento de referencia para fontanería es el <b>CTE DB HS 4 «Suministro de agua»</b> (CTE aprobado por el RD 314/2006). Se aplica a la instalación de suministro de agua de los edificios del ámbito general del CTE."},
        {"t":"q","ref":"1k2am68"},   // font-temario nº 21: El documento de referencia para el diseño de las instalaciones de fontanería es:
        {"t":"ex","h":"Reformas y alcance","p":"Las ampliaciones, modificaciones, reformas o rehabilitaciones entran en el HS 4 cuando <b>se amplía el número o la capacidad de los aparatos receptores</b>. El HS 4 no trata solo el diseño: también el dimensionado, la construcción, los productos y el mantenimiento y conservación. Hay normativa adicional de las compañías suministradoras para la instalación de enlace (por ejemplo, el Canal de Isabel II en Madrid)."},
        {"t":"q","ref":"066rih1"},   // font-temario nº 22: Las reformas de instalaciones de suministro existentes quedan incluidas en el HS 4 cuando:
        {"t":"notin","q":"¿Qué NO trata el HS 4 según el temario?","o":["El dimensionado","La construcción","El mantenimiento y conservación","Las tarifas de la compañía suministradora"],"c":3,"e":"El HS 4 trata diseño, dimensionado, construcción, productos y mantenimiento y conservación."},
        {"t":"q","ref":"04tf49d"}   // font-verif nº 5: Una reforma de la fontanería existente queda dentro del HS 4 cuando:
      ],
      sum: ["Referencia: CTE DB HS 4 «Suministro de agua» (CTE: RD 314/2006).","Una reforma entra en el HS 4 si amplía el número o la capacidad de los aparatos receptores.","El HS 4 abarca diseño, dimensionado, construcción, productos y mantenimiento."] },
      { id: "fonta-1.2", apt: ["fonta-1.2"], title: "1.2. Procedimiento de verificación",
      cards: [
        {"t":"ex","h":"Orden de verificación (HS 4, 1.2)","p":"Hay que comprobar, por este orden, el cumplimiento de las condiciones de:","tab":{"h":["Orden","Condiciones de","Apartado del HS 4"],"r":[["1","Diseño","3. Diseño"],["2","Dimensionado","4. Dimensionado"],["3","Ejecución","5. Construcción"],["4","Productos de construcción","6. Productos de construcción"],["5","Uso y mantenimiento","7. Mantenimiento y conservación"]]}},
        {"t":"order","q":"Ordena la secuencia de verificación del HS 4.","items":["Diseño","Dimensionado","Ejecución","Productos de construcción","Uso y mantenimiento"],"e":"HS 4, 1.2: diseño, dimensionado, ejecución, productos de construcción y uso y mantenimiento."},
        {"t":"match","q":"Empareja cada condición con su apartado del HS 4.","pairs":[["Diseño","3. Diseño"],["Dimensionado","4. Dimensionado"],["Ejecución","5. Construcción"],["Productos de construcción","6. Productos de construcción"],["Uso y mantenimiento","7. Mantenimiento y conservación"]],"e":"La ejecución se comprueba con el apartado 5, «Construcción», y el uso con el 7, «Mantenimiento y conservación»."},
        {"t":"q","q":"En el HS 4, las condiciones de ejecución se comprueban con el apartado:","o":["5. Construcción","3. Diseño","7. Mantenimiento y conservación"],"c":0,"e":"Tabla del apartado 1.2: ejecución → 5. Construcción."}
      ],
      sum: ["Orden: diseño, dimensionado, ejecución, productos y uso y mantenimiento.","Ejecución se comprueba con el apartado 5 (Construcción).","Uso y mantenimiento, con el apartado 7 (Mantenimiento y conservación)."] },
      { id: "fonta-1.3-1", apt: ["fonta-1.3"], title: "1.3. Terminología: de la acometida al montante",
      cards: [
        {"t":"ex","h":"Términos del HS 4 (1)","p":"De la red exterior hacia dentro del edificio.","tab":{"h":["Término","Definición"],"r":[["Acometida","Tubería que enlaza la instalación general del edificio con la red exterior de suministro."],["Llave de registro","Al final de la acometida, para cerrar el paso hacia la instalación interior."],["Instalación general","Tuberías y elementos de control y regulación que enlazan la acometida con las instalaciones interiores particulares y las derivaciones colectivas."],["Tubo de alimentación","Enlaza la llave de corte general con los sistemas de control y regulación de la presión o con el distribuidor principal."],["Distribuidor principal","Enlaza los sistemas de control de la presión con las ascendentes o derivaciones."],["Ascendentes (montantes)","Tuberías verticales que enlazan el distribuidor principal con las instalaciones interiores particulares o derivaciones colectivas."]]}},
        {"t":"q","ref":"0c0o9m6"},   // font-temario nº 1: La acometida es la tubería que enlaza:
        {"t":"q","ref":"06hd02r"},   // font-temario nº 28: La llave de registro se coloca:
        {"t":"match","q":"Empareja cada elemento con lo que enlaza.","pairs":[["Tubo de alimentación","Llave de corte general con el control de presión o el distribuidor"],["Distribuidor principal","Control de presión con las ascendentes o derivaciones"],["Ascendentes","Distribuidor principal con las instalaciones particulares"],["Acometida","Instalación general con la red exterior"]],"e":"Terminología del HS 4 recogida en el apartado 1.3."},
        {"t":"ex","h":"Términos del HS 4 (2)","p":"Contadores y derivaciones.","tab":{"h":["Término","Definición"],"r":[["Contador general","Mide todos los consumos del edificio."],["Contadores divisionarios","Miden el consumo de cada abonado o servicio. En general, sobre baterías."],["Derivación particular","Enlaza el montante con las derivaciones de aparato."],["Derivación de aparato","Enlaza la derivación particular con un aparato de consumo."]]},"fig":"f01"},
        {"t":"q","ref":"0uzrqla"},   // font-temario nº 25: Los contadores divisionarios se instalarán, en general:
        {"t":"order","q":"Ordena la instalación interior particular, del contador a los aparatos.","items":["Contador","Llave de paso","Derivación particular","Ramales de enlace","Puntos de consumo"],"e":"Figura 1: contador, llave de paso, derivación particular, ramales de enlace y puntos de consumo."},
        {"t":"q","ref":"02ao4zf"}   // font-temario nº 23: Las ascendentes o montantes enlazan:
      ],
      sum: ["Acometida: enlaza la instalación general con la red exterior; al final, la llave de registro.","Tubo de alimentación → distribuidor principal → ascendentes.","Contadores divisionarios, en general sobre baterías.","Instalación interior particular: contador, llave de paso, derivación particular, ramales y puntos de consumo."] },
      { id: "fonta-1.3-2", apt: ["fonta-1.3"], title: "1.3. Terminología: equipos y elementos",
      cards: [
        {"t":"ex","h":"Términos del HS 4 (3)","p":"Equipos y elementos de la instalación.","tab":{"h":["Término","Definición"],"r":[["Depósito de acumulación","Para que las bombas del grupo de presión no aspiren de la red exterior, o de reserva si el suministro es discontinuo o insuficiente."],["Grupo de sobreelevación","Equipo que da más presión que la de la red."],["Fluxor","Llave temporizada de cierre automático que da mucho caudal en poco tiempo; sustituye a la cisterna en inodoros de uso público."],["Pasamuros","Orificio en un muro para que la tubería pase suelta y pueda dilatar."],["Válvula de retención","Impide automáticamente el paso del fluido en sentido contrario."],["Válvula de seguridad","Se abre cuando la presión supera el tarado y descarga a la atmósfera (escape a desagüe)."],["Purgado","Eliminar el aire de las tuberías."]]}},
        {"t":"q","ref":"140becb"},   // font-temario nº 31: El pasamuros debe permitir que la tubería quede suelta para su libre dilatación.
        {"t":"q","ref":"1lj4jqc"},   // font-temario nº 32: La válvula de seguridad descarga el exceso de presión y su escape se reconduce a:
        {"t":"match","q":"Empareja cada elemento con su función.","pairs":[["Fluxor","Mucho caudal en poco tiempo, en inodoros de uso público"],["Válvula de retención","Impide el paso del fluido en sentido contrario"],["Válvula de seguridad","Descarga cuando la presión supera el tarado"],["Grupo de sobreelevación","Da más presión que la de la red"],["Pasamuros","Deja la tubería suelta para que dilate"]],"e":"Terminología del apartado 1.3."},
        {"t":"q","ref":"11v5s34"}   // font-verif nº 33: La purga consiste en:
      ],
      sum: ["Depósito de acumulación: que las bombas no aspiren de la red, o reserva.","Fluxor: mucho caudal en poco tiempo; sustituye a la cisterna en uso público.","Válvula de seguridad: descarga a desagüe; válvula de retención: impide el retorno.","Pasamuros: la tubería pasa suelta para dilatar."] },
      { id: "fonta-1.3-3", apt: ["fonta-1.3"], title: "1.3. Caudales y presiones",
      cards: [
        {"t":"ex","h":"Caudal instantáneo y simultáneo","p":"El <b>caudal instantáneo mínimo</b> es el que debe recibir cada aparato con independencia del estado de funcionamiento. El <b>caudal simultáneo</b> es el que se produce por el funcionamiento lógico simultáneo de varios aparatos. Como el simultáneo es la suma por un coeficiente ≤ 1, la suma de instantáneos puede ser igual o mayor que el simultáneo (pregunta 2 del examen)."},
        {"t":"q","ref":"0txsc9q"},   // font-temario nº 2: La suma de los caudales instantáneos mínimos de un grupo de aparatos sanitarios:
        {"t":"q","ref":"0jzh37u"},   // font-temario nº 24: El caudal simultáneo es el que se produce por:
        {"t":"ex","h":"Cuatro presiones","p":"<b>De prueba</b>: la de la prueba de estanqueidad. <b>De servicio</b>: la del suministro en régimen estacionario. <b>De trabajo</b>: la máxima de diseño del tubo para 50 años de uso. <b>Nominal</b>: la máxima de trabajo a 20 ºC."},
        {"t":"match","q":"Empareja cada presión con su definición.","pairs":[["Presión de prueba","La de la prueba de estanqueidad"],["Presión de servicio","La del suministro en régimen estacionario"],["Presión de trabajo","La máxima de diseño del tubo para 50 años"],["Presión nominal","La máxima de trabajo a 20 ºC"]],"e":"Presiones del apartado 1.3."},
        {"t":"num","q":"¿Para cuántos años de uso se define la presión de trabajo de un tubo?","v":50,"u":"años","e":"Presión de trabajo: la máxima de diseño del tubo para 50 años de uso."},
        {"t":"q","ref":"09cm8rr"}   // font-temario nº 30: La presión nominal de un tubo coincide con la presión máxima de trabajo a:
      ],
      sum: ["Caudal simultáneo = suma de instantáneos × coeficiente ≤ 1.","La suma de instantáneos puede ser igual o mayor que el simultáneo.","Presión de trabajo: 50 años; nominal: máxima de trabajo a 20 ºC."] },
      { id: "fonta-1.4-1", apt: ["fonta-1.4"], title: "1.4. Calidad, materiales y retornos",
      cards: [
        {"t":"ex","h":"Calidad del agua y materiales","p":"Calidad del agua: la de la legislación de agua de consumo humano. La compañía da los datos de caudal y presión para dimensionar. Materiales: no alterar potabilidad, olor, color ni sabor; resistentes a la corrosión interior; sin incompatibilidad electroquímica; <b>resistentes hasta 40 ºC</b>; que no reduzcan la vida útil. Evitar gérmenes patógenos y biocapa. No se puede conectar directamente a la evacuación ni a agua de otro origen que la red pública."},
        {"t":"ojo","p":"Agua de consumo: los temas 1 y 2 citan el RD 140/2003 y el tema 5 el RD 3/2023, que es el vigente. El test de Verificación pregunta por el RD 3/2023."},
        {"t":"q","ref":"1cqshbv"},   // font-verif nº 12: La base del dimensionado (caudal y presión) la facilitan:
        {"t":"num","q":"¿Hasta qué temperatura deben resistir los materiales de la instalación?","v":40,"u":"ºC","e":"Materiales resistentes hasta 40 ºC."},
        {"t":"q","ref":"1jghozh"},   // font-temario nº 35: Las instalaciones de suministro de agua pueden conectarse directamente a instalaciones de 
        {"t":"ex","h":"Protección contra retornos","p":"Sistema antirretorno después de los contadores, en la base de las ascendentes, antes del equipo de tratamiento de agua, en los tubos de alimentación no domésticos y antes de aparatos de refrigeración o climatización (y en cualquier otro punto necesario), <b>siempre combinado con grifos de vaciado</b>.","fig":"f02"},
        {"t":"fill","q":"Completa dónde exige el HS 4 sistema antirretorno.","items":["Después de los {}","En la base de las {}","Antes del equipo de {} de agua","Antes de aparatos de refrigeración o {}"],"ans":["contadores","ascendentes","tratamiento","climatización"],"dis":["bajantes","grifos"],"e":"Figura 2: después de contadores, base de ascendentes, antes del tratamiento, alimentaciones no domésticas y antes de climatización."},
        {"t":"q","ref":"17suou6"},   // font-temario nº 34: ¿En cuál de estos puntos NO se exige expresamente sistema antirretorno?
        {"t":"q","ref":"1f56pk3"}   // font-temario nº 36: Los antirretornos se combinarán con:
      ],
      sum: ["Materiales: sin alterar el agua, resistentes a la corrosión y hasta 40 ºC.","Nunca conectada directamente a la evacuación ni a agua de otro origen.","Antirretornos: contadores, base de ascendentes, tratamiento, no domésticos y climatización, con grifos de vaciado."] },
      { id: "fonta-1.4-2", apt: ["fonta-1.4"], title: "1.4. Caudales instantáneos mínimos (tabla 2.1)",
      cards: [
        {"t":"ex","h":"Tabla 2.1 del HS 4","p":"Caudal instantáneo mínimo por aparato.","tab":{"h":["Aparato","AFS (dm³/s)","ACS (dm³/s)"],"r":[["Lavamanos","0,05","0,03"],["Lavabo","0,10","0,065"],["Ducha","0,20","0,10"],["Bañera de 1,40 m o más","0,30","0,20"],["Bañera de menos de 1,40 m","0,20","0,15"],["Bidé","0,10","0,065"],["Inodoro con cisterna","0,10","–"],["Inodoro con fluxor","1,25","–"],["Urinario con grifo temporizado","0,15","–"],["Urinario con cisterna (c/u)","0,04","–"],["Fregadero doméstico","0,20","0,10"],["Fregadero no doméstico","0,30","0,20"],["Lavavajillas doméstico","0,15","0,10"],["Lavavajillas industrial (20 servicios)","0,25","0,20"],["Lavadero","0,20","0,10"],["Lavadora doméstica","0,20","0,15"],["Lavadora industrial (8 kg)","0,60","0,40"],["Grifo aislado","0,15","0,10"],["Grifo garaje","0,20","–"],["Vertedero","0,20","–"]]}},
        {"t":"ojo","p":"En la tabla 2.1 el caudal de AFS es siempre mayor que el de ACS (pregunta 3 del examen). El inodoro con fluxor (1,25 dm³/s) es el más alto con diferencia."},
        {"t":"q","ref":"0bpym3g"},   // font-temario nº 3: Los caudales instantáneos mínimos según el CTE DB HS 4:
        {"t":"q","ref":"17ddcko"},   // font-temario nº 43: Según el caudal del inodoro con fluxor de la tabla 2.1 del HS 4, su caudal instantáneo mín
        {"t":"num","q":"Caudal instantáneo mínimo de AFS de un lavabo.","v":0.1,"u":"dm³/s","e":"Tabla 2.1: lavabo, 0,10 dm³/s de AFS y 0,065 de ACS."},
        {"t":"match","q":"Empareja cada aparato con su caudal mínimo de AFS.","pairs":[["Lavamanos","0,05 dm³/s"],["Inodoro con fluxor","1,25 dm³/s"],["Lavadora industrial (8 kg)","0,60 dm³/s"],["Urinario con cisterna (c/u)","0,04 dm³/s"],["Bañera de 1,40 m o más","0,30 dm³/s"]],"e":"Tabla 2.1 del HS 4."},
        {"t":"q","ref":"1283wy6"}   // font-temario nº 44: El caudal instantáneo mínimo de AFS de una ducha es:
      ],
      sum: ["El caudal de AFS es siempre mayor que el de ACS.","Inodoro con fluxor: 1,25 dm³/s, el más alto.","Lavabo 0,10; ducha 0,20; lavamanos 0,05 dm³/s de AFS."] },
      { id: "fonta-1.4-3", apt: ["fonta-1.4"], title: "1.4. Presión y temperatura",
      cards: [
        {"t":"ex","h":"Límites en los puntos de consumo","p":"Presión mínima de <b>100 kPa</b> en grifos comunes y <b>150 kPa</b> en fluxores y calentadores; <b>máximo 500 kPa</b> en cualquier punto. ACS en los puntos de consumo <b>entre 50 y 65 ºC</b>, salvo en edificios de uso exclusivo de vivienda que no afecten al ambiente exterior.","fig":"f03"},
        {"t":"q","ref":"1k4vw36"},   // font-temario nº 4: La presión mínima de un punto de consumo tipo fluxor debe ser:
        {"t":"num","q":"Presión mínima en un punto de consumo con grifo común.","v":100,"u":"kPa","e":"Grifos comunes: 100 kPa; fluxores y calentadores: 150 kPa."},
        {"t":"ojo","p":"Presión máxima: el tema 1 y el CTE DB HS 4 dicen 500 kPa; la diapositiva del tema 5 pone 550 kPa. En las preguntas se usa 500 kPa."},
        {"t":"q","ref":"062h9ky"},   // font-temario nº 38: La presión en cualquier punto de consumo no debe superar:
        {"t":"q","ref":"1ntxno8"},   // font-temario nº 5: La temperatura en los puntos de consumo de ACS debe estar comprendida entre:
        {"t":"q","ref":"0v26y6q"}   // font-verif nº 15: La temperatura de ACS de 50 a 65 ºC no es exigible en:
      ],
      sum: ["Presión mínima: 100 kPa grifos comunes; 150 kPa fluxores y calentadores.","Presión máxima: 500 kPa (el tema 5 dice 550; en las preguntas, 500).","ACS entre 50 y 65 ºC, salvo uso exclusivo de vivienda."] },
      { id: "fonta-1.4-4", apt: ["fonta-1.4"], title: "1.4. Mantenimiento, señalización y ahorro",
      cards: [
        {"t":"ex","h":"Mantenimiento y señalización","p":"Salvo en viviendas aisladas y adosadas, grupo de presión, tratamiento y contadores en locales con espacio para mantenerlos. Tuberías accesibles: vistas, en huecos o patinillos registrables o con arquetas o registros. Si hay agua no apta para el consumo, sus tuberías, grifos y terminales se señalizan de forma fácil e inequívoca."},
        {"t":"q","ref":"0183yyr"},   // font-verif nº 17: Para su mantenimiento, las redes de tuberías deben estar a la vista, en huecos o patinillo
        {"t":"q","ref":"0l0279o"},   // font-temario nº 41: Las tuberías que suministren agua no apta para el consumo deben:
        {"t":"ex","h":"Ahorro de agua","p":"Contabilización de agua fría y caliente para cada unidad de consumo individualizable; <b>red de retorno de ACS si la ida al punto más alejado mide 15 m o más</b>; en zonas de pública concurrencia, grifos de lavabos y cisternas con dispositivos de ahorro."},
        {"t":"num","q":"¿A partir de qué longitud de ida al punto más alejado es obligatoria la red de retorno de ACS?","v":15,"u":"m","e":"Red de retorno de ACS si la ida al punto más alejado mide 15 m o más."},
        {"t":"q","ref":"1lwl9nf"}   // font-temario nº 40: En zonas de pública concurrencia, los grifos de lavabos y las cisternas deben tener dispos
      ],
      sum: ["Grupo, tratamiento y contadores en locales mantenibles (salvo viviendas aisladas y adosadas).","El agua no apta se señaliza de forma fácil e inequívoca.","Retorno de ACS si la ida mide 15 m o más; ahorro obligatorio en pública concurrencia."] },
      { id: "fonta-1.5", apt: ["fonta-1.5"], title: "1.5. Esquema general de la instalación",
      cards: [
        {"t":"ex","h":"Dos esquemas","p":"La instalación se compone de acometida, instalación general y, según la contabilización sea única o múltiple, derivaciones colectivas o instalaciones particulares. <b>Contador general único</b> (figura 3.1): acometida, instalación general con armario o arqueta del contador general, tubo de alimentación, distribuidor principal y derivaciones colectivas. <b>Contadores aislados</b> (figura 3.2): acometida, instalación general con los contadores aislados, instalaciones particulares y derivaciones colectivas.","fig":"f04"},
        {"t":"order","q":"Ordena la red con contador general único, de la red pública a los usuarios.","items":["Acometida","Llave de corte general","Filtro","Contador general","Tubo de alimentación","Distribuidor principal","Ascendentes","Derivaciones colectivas"],"e":"Figura 4 a): acometida, llave de corte general, filtro, contador general, tubo de alimentación, distribuidor principal, ascendentes y derivaciones colectivas."},
        {"t":"q","ref":"15n1h79"},   // font-temario nº 42: La red con contador general único se compone de acometida, instalación general con armario
        {"t":"ex","h":"Elementos de la red","p":"Agua fría: acometida; instalación general (llave de corte general, filtro, armario o arqueta del contador general, tubo de alimentación, distribuidor principal, ascendentes, contadores divisionarios); instalación particular; derivaciones colectivas; sistemas de control de presión (sobreelevación y reducción); y sistemas de tratamiento de agua. La red de ACS tiene distribución (impulsión y retorno) y regulación y control."},
        {"t":"notin","q":"¿Cuál NO es un elemento de la red de agua fría según el temario?","o":["Sistemas de control de presión","Sistemas de tratamiento de agua","Contadores divisionarios","Bote sifónico"],"c":3,"e":"El bote sifónico es un cierre hidráulico del saneamiento (HS 5), no de la red de suministro."},
        {"t":"fill","q":"Completa los elementos de la instalación general.","items":["Llave de corte {}","Armario o arqueta del contador {}","Tubo de {}","Distribuidor {}"],"ans":["general","general","alimentación","principal"],"dis":["secundario","retorno"],"e":"Instalación general: llave de corte general, filtro, armario o arqueta del contador general, tubo de alimentación, distribuidor principal, ascendentes y contadores divisionarios."}
      ],
      sum: ["Dos esquemas: contador general único o contadores aislados.","Contador único: acometida, llave de corte general, filtro, contador general, tubo de alimentación, distribuidor principal, ascendentes, derivaciones colectivas.","La red de ACS tiene impulsión y retorno, y regulación y control."] }
    ]},
    { n: 2, name: "Conducciones de suministro", lessons: [
      { id: "fonta-2.1", apt: ["fonta-2.1"], title: "2.1. Espacio para contadores",
      cards: [
        {"t":"ex","h":"Armario o cámara","p":"Con contador general único se prevé un <b>armario o una cámara</b> con las dimensiones de la tabla 4.1 del HS 4, que dependen del <b>diámetro nominal del contador</b>. Por ejemplo, armario para contador de 15 mm: 600 × 500 × 200 mm."},
        {"t":"q","q":"Las dimensiones del armario o cámara del contador general dependen de:","o":["El diámetro nominal del contador","El número de viviendas","La presión de la red"],"c":0,"e":"Tabla 4.1 del HS 4: según el diámetro nominal del contador."},
        {"t":"fill","q":"Completa el armario para un contador de 15 mm.","items":["{} × {} × {} mm"],"ans":["600","500","200"],"dis":["400","300"],"e":"Ejemplo del temario: 600 × 500 × 200 mm."},
        {"t":"q","q":"Con contador general único se prevé:","o":["Un armario o una cámara","Una batería de contadores divisionarios","Un depósito auxiliar"],"c":0,"e":"Apartado 2.1: armario o cámara con las dimensiones de la tabla 4.1."}
      ],
      sum: ["Contador general único: armario o cámara (tabla 4.1 del HS 4).","Las dimensiones dependen del diámetro nominal del contador.","Contador de 15 mm: armario de 600 × 500 × 200 mm."] },
      { id: "fonta-2.2-1", apt: ["fonta-2.2"], title: "2.2. Dimensionado por tramos",
      cards: [
        {"t":"ex","h":"Procedimiento","p":"Primer dimensionado partiendo del <b>circuito más desfavorable</b> (el de mayor pérdida de presión por rozamiento y altura geométrica) y después se comprueba la presión. Por tramos: a) caudal máximo = suma de caudales (tabla 2.1); b) coeficiente de simultaneidad; c) caudal de cálculo = caudal máximo × coeficiente; d) velocidad de cálculo; e) diámetro según caudal y velocidad.","fig":"f05"},
        {"t":"order","q":"Ordena los pasos del dimensionado de un tramo.","items":["Caudal máximo del tramo","Coeficiente de simultaneidad","Caudal de cálculo","Velocidad de cálculo","Diámetro del tramo"],"e":"HS 4, 4.2: pasos a) a e)."},
        {"t":"q","ref":"008nkzx"},   // font-temario nº 45: En el dimensionado de la red se parte del circuito más desfavorable, que es el de:
        {"t":"q","ref":"03t6tvj"},   // font-temario nº 46: El caudal de cálculo de un tramo es:
        {"t":"ex","h":"Velocidad de cálculo","p":"<b>Metálicas: 0,50–2,00 m/s.</b> <b>Termoplásticas y multicapa: 0,50–3,50 m/s.</b>","fig":"f06"},
        {"t":"q","ref":"14ybeb9"},   // font-temario nº 6: Las velocidades de cálculo en tuberías termoplásticas deben estar comprendidas entre:
        {"t":"num","q":"Velocidad de cálculo máxima en tuberías metálicas.","v":2,"u":"m/s","e":"Metálicas: 0,50–2,00 m/s; termoplásticas y multicapa: 0,50–3,50 m/s."}
      ],
      sum: ["Se parte del circuito más desfavorable.","Caudal de cálculo = caudal máximo × coeficiente de simultaneidad.","Velocidad: metálicas 0,5–2 m/s; termoplásticas y multicapa 0,5–3,5 m/s."] },
      { id: "fonta-2.2-2", apt: ["fonta-2.2"], title: "2.2. Comprobación de la presión",
      cards: [
        {"t":"ex","h":"Comprobar la presión","p":"Se suman las pérdidas de cada tramo; las <b>localizadas</b> se pueden estimar en un <b>20–30 %</b> de las de la longitud real. Si la presión disponible en el punto más desfavorable (presión total − altura geométrica − presión residual) no llega al mínimo, <b>hace falta grupo de presión</b>."},
        {"t":"q","ref":"05q59fw"},   // font-temario nº 48: Las pérdidas de carga localizadas pueden estimarse como un porcentaje de las lineales del:
        {"t":"q","ref":"08l6k2a"},   // font-temario nº 49: Si la presión disponible en el punto más desfavorable es inferior a la mínima exigida:
        {"t":"q","q":"La presión disponible en el punto más desfavorable es:","o":["Presión total − altura geométrica − presión residual","Presión total + altura geométrica","Presión residual − pérdidas localizadas"],"c":0,"e":"Apartado 2.2: presión total − altura geométrica − presión residual."},
        {"t":"q","ref":"1i0f4s7"}   // font-temario nº 47: En tuberías metálicas la velocidad de cálculo debe estar entre:
      ],
      sum: ["Pérdidas localizadas: 20–30 % de las de la longitud real.","Disponible = total − altura geométrica − residual.","Si no llega al mínimo, grupo de presión."] },
      { id: "fonta-2.3-1", apt: ["fonta-2.3"], title: "2.3. Ramales de enlace (tabla 4.2)",
      cards: [
        {"t":"ex","h":"Tabla 4.2: ramal de enlace","p":"Los ramales a aparatos domésticos se dimensionan con esta tabla.","tab":{"h":["Aparato","Acero (\")","Cobre o plástico (mm)"],"r":[["Lavamanos, lavabo, bidé, ducha","½","12"],["Bañera < 1,40 m","¾","20"],["Bañera ≥ 1,40 m","¾","20"],["Inodoro con cisterna","½","12"],["Inodoro con fluxor","1 – 1½","25 – 40"],["Urinario (grifo temporizado o cisterna)","½","12"],["Fregadero doméstico","½","12"],["Fregadero industrial","¾","20"],["Lavavajillas doméstico","½ (rosca a ¾)","12"],["Lavavajillas industrial","¾","20"],["Lavadora doméstica","¾","20"],["Lavadora industrial","1","25"],["Vertedero","¾","20"]]}},
        {"t":"q","ref":"03i2e0z"},   // font-temario nº 50: El diámetro mínimo en cobre o plástico del ramal a un lavabo es:
        {"t":"q","ref":"1wjzji4"},   // font-temario nº 51: El diámetro mínimo en cobre o plástico del ramal a un inodoro con fluxor es:
        {"t":"match","q":"Empareja cada aparato con su ramal en cobre o plástico.","pairs":[["Lavabo","12 mm"],["Inodoro con fluxor","25 – 40 mm"],["Lavadora industrial","25 mm"],["Bañera ≥ 1,40 m","20 mm"]],"e":"Tabla 4.2 del HS 4."},
        {"t":"num","q":"Ramal de enlace de una ducha en cobre o plástico.","v":12,"u":"mm","e":"Tabla 4.2: lavamanos, lavabo, bidé y ducha, 12 mm (½\" en acero)."}
      ],
      sum: ["Lavabo, bidé, ducha, inodoro con cisterna: 12 mm (½\").","Bañeras, fregadero industrial, lavadora doméstica: 20 mm (¾\").","Inodoro con fluxor: 25–40 mm (1–1½\")."] },
      { id: "fonta-2.3-2", apt: ["fonta-2.3"], title: "2.3. Tubo de alimentación mínimo (tabla 4.3)",
      cards: [
        {"t":"ex","h":"Tabla 4.3","p":"Los tramos de la red se dimensionan con el procedimiento del 2.2 y, como mínimo, con esta tabla.","tab":{"h":["Tramo","Acero (\")","Cobre o plástico (mm)"],"r":[["Cuarto húmedo privado (baño, aseo, cocina)","¾","20"],["Derivación particular (vivienda, apartamento, local)","¾","20"],["Columna (montante o descendente)","¾","20"],["Distribuidor principal","1","25"],["Climatización < 50 kW","½","12"],["Climatización 50 – 250 kW","¾","20"],["Climatización 250 – 500 kW","1","25"],["Climatización > 500 kW","1¼","32"]]}},
        {"t":"q","ref":"1j06wzu"},   // font-temario nº 52: El diámetro mínimo en cobre o plástico de la alimentación a un cuarto húmedo es:
        {"t":"num","q":"Diámetro mínimo del distribuidor principal en cobre o plástico.","v":25,"u":"mm","e":"Tabla 4.3: distribuidor principal, 25 mm (1\")."},
        {"t":"match","q":"Empareja la potencia de climatización con su tubo mínimo (cobre o plástico).","pairs":[["< 50 kW","12 mm"],["50 – 250 kW","20 mm"],["250 – 500 kW","25 mm"],["> 500 kW","32 mm"]],"e":"Tabla 4.3 del HS 4."}
      ],
      sum: ["Cuarto húmedo, derivación particular y columna: 20 mm (¾\").","Distribuidor principal: 25 mm (1\").","Climatización: 12, 20, 25 y 32 mm según potencia."] },
      { id: "fonta-2.4", apt: ["fonta-2.4"], title: "2.4. Redes de ACS",
      cards: [
        {"t":"ex","h":"Impulsión y retorno","p":"Impulsión: mismo método que el agua fría. Retorno: en el grifo más alejado la temperatura <b>no cae más de 3 ºC</b> respecto a la salida del acumulador. Nunca menos de <b>250 l/h por columna</b>. Regla empírica: recircular como mínimo el <b>10 %</b> del agua de alimentación; diámetro interior mínimo del retorno <b>16 mm</b>.","fig":"f07"},
        {"t":"q","ref":"02bvw0m"},   // font-temario nº 7: En ACS, la pérdida de temperatura al grifo más alejado debe ser como máximo:
        {"t":"q","ref":"19yrwg5"},   // font-temario nº 53: No se recircularán en cada columna de ACS menos de:
        {"t":"num","q":"Diámetro interior mínimo de la tubería de retorno de ACS.","v":16,"u":"mm","e":"Retorno: diámetro interior mínimo de 16 mm."},
        {"t":"ex","h":"Aislamiento, dilatadores y tabla 4.4","p":"Aislamiento de ida y retorno según el RITE. Dilatadores en tramos rectos sin conexiones de <b>más de 25 m</b>; en montantes, mejor equidistantes de las derivaciones (UNE 100156 metálicos, UNE ENV 12108 termoplásticos).","tab":{"h":["Diámetro del retorno","½\"","¾\"","1\"","1¼\"","1½\"","2\""],"r":[["Caudal recirculado (l/h)","140","300","600","1.100","1.800","3.300"]]}},
        {"t":"q","ref":"0kokpx4"},   // font-temario nº 56: En todo tramo recto sin conexiones de más de 25 m hay que tomar medidas frente a:
        {"t":"match","q":"Empareja cada diámetro de retorno con su caudal recirculado (tabla 4.4).","pairs":[["½\"","140 l/h"],["¾\"","300 l/h"],["1\"","600 l/h"],["1¼\"","1.100 l/h"],["1½\"","1.800 l/h"],["2\"","3.300 l/h"]],"e":"Tabla 4.4 del HS 4."},
        {"t":"q","ref":"0z4rxo5"}   // font-temario nº 54: El caudal de retorno de ACS puede estimarse recirculando como mínimo el:
      ],
      sum: ["Caída máxima de 3 ºC en el grifo más alejado.","Retorno: ≥ 250 l/h por columna, ≥ 10 % recirculado, Ø interior ≥ 16 mm.","Dilatadores en tramos rectos de más de 25 m."] },
      { id: "fonta-2.5-1", apt: ["fonta-2.5"], title: "2.5. Contadores, depósito y bombas",
      cards: [
        {"t":"ex","h":"Contadores, depósito y bombas","p":"Contadores con calibre adecuado a los caudales nominales y máximos. <b>Depósito auxiliar: V = Q · t · 60</b> (V en litros, Q caudal máximo simultáneo en dm³/s, t de 15 a 20 min). Bombas del grupo convencional, sin contar las de reserva: <b>2 hasta 10 dm³/s, 3 hasta 30 dm³/s y 4 por encima</b>. Caudal de bombas = máximo simultáneo.","fig":"f08"},
        {"t":"q","ref":"0zj9hkf"},   // font-temario nº 57: El volumen del depósito auxiliar del grupo de presión es V = Q·t·60, con t estimado entre:
        {"t":"q","ref":"0r84ur6"},   // font-temario nº 58: Un grupo convencional con un caudal de 20 dm³/s debe llevar, sin contar las de reserva:
        {"t":"num","q":"Depósito auxiliar con Q = 2 dm³/s y t = 15 min: volumen V = Q · t · 60.","v":1800,"u":"l","e":"V = 2 × 15 × 60 = 1.800 litros."},
        {"t":"ex","h":"Presiones del grupo","p":"Presión mínima o de arranque <b>Pb = Ha + Hg + Pc + Pr</b> (aspiración, altura geométrica, pérdidas y residual). Presión máxima: <b>2 a 3 bar por encima de la mínima</b>. Depósito de presión (membrana): Vn = Pb · Va / Pa (presiones absolutas mínima y máxima, Va volumen mínimo de agua)."},
        {"t":"q","ref":"1l1wo06"},   // font-temario nº 59: La presión máxima de parada del grupo de presión estará entre:
        {"t":"fill","q":"Completa los términos de Pb = Ha + Hg + Pc + Pr.","items":["Ha: altura de {}","Hg: altura {}","Pc: {} de carga","Pr: presión {}"],"ans":["aspiración","geométrica","pérdidas","residual"],"dis":["atmosférica","nominal"],"e":"Pb = aspiración + altura geométrica + pérdidas + residual."}
      ],
      sum: ["Depósito auxiliar: V = Q·t·60, t = 15–20 min.","Bombas sin reserva: 2 (≤ 10 dm³/s), 3 (≤ 30), 4 (> 30).","Pb = Ha + Hg + Pc + Pr; presión máxima 2–3 bar por encima."] },
      { id: "fonta-2.5-2", apt: ["fonta-2.5"], title: "2.5. Reductor de presión y tratamiento",
      cards: [
        {"t":"ex","h":"Reductor de presión","p":"Diámetro nominal por la tabla 4.5 según el <b>caudal máximo simultáneo</b>, nunca en función del diámetro de la tubería."},
        {"t":"q","ref":"1bas1xe"},   // font-temario nº 60: El diámetro del reductor de presión se calcula en función de:
        {"t":"ex","h":"Dosificadores y descalcificadores","p":"Dosificadores: por caudal punta y consumo mensual; si no se conoce, <b>60 m³ en 6 meses</b> (fría y ACS) o <b>30 m³ en 6 meses</b> (solo ACS). Descalcificadores: mínimo <b>80 litros por persona y día</b>."},
        {"t":"q","ref":"0wb5t4r"},   // font-temario nº 61: Para dimensionar un descalcificador se toma como caudal mínimo:
        {"t":"num","q":"Dosificador sin datos de consumo, para agua fría y ACS: consumo a considerar en 6 meses.","v":60,"u":"m³","e":"60 m³ en 6 meses (fría y ACS); 30 m³ si solo es ACS."}
      ],
      sum: ["Reductor: según el caudal máximo simultáneo, nunca según el diámetro de la tubería.","Dosificador sin datos: 60 m³ en 6 meses (30 m³ solo ACS).","Descalcificador: 80 l por persona y día."] },
      { id: "fonta-2.6-1", apt: ["fonta-2.6"], title: "2.6. Ejecución: trazado y uniones",
      cards: [
        {"t":"ex","h":"Trazado","p":"Tuberías ocultas preferentemente por patinillos, cámaras, techos o suelos técnicos; si no, por rozas. <b>Prohibido empotrarlas en tabiques de ladrillo hueco sencillo.</b> Enterradas: protegidas frente a corrosión, esfuerzos y hielo; <b>nunca en contacto con el terreno</b>; si hace falta, protección catódica."},
        {"t":"q","ref":"1ff9wlg"},   // font-temario nº 62: Las tuberías empotradas NO pueden ir en:
        {"t":"q","ref":"0stt8qq"},   // font-temario nº 63: Las conducciones enterradas pueden instalarse en contacto directo con el terreno.
        {"t":"ex","h":"Uniones","p":"Estancas. Acero galvanizado con rosca cónica (UNE-EN 10242); cobre por soldadura por capilaridad (blanda o fuerte) o manguitos mecánicos (compresión, ajuste cónico, pestañas); plástico según el fabricante."},
        {"t":"match","q":"Empareja cada material o caso con su solución.","pairs":[["Acero galvanizado","Rosca cónica (UNE-EN 10242)"],["Cobre","Soldadura por capilaridad o manguitos mecánicos"],["Plástico","Según el fabricante"],["Tabique de ladrillo hueco sencillo","Prohibido empotrar tuberías"]],"e":"Apartado 2.6."}
      ],
      sum: ["Ocultas por patinillos, cámaras, techos o suelos técnicos; nunca en ladrillo hueco sencillo.","Enterradas: nunca en contacto con el terreno.","Uniones: galvanizado con rosca cónica; cobre por capilaridad o manguitos."] },
      { id: "fonta-2.6-2", apt: ["fonta-2.6"], title: "2.6. Ejecución: corrosión",
      cards: [
        {"t":"ex","h":"Protección contra la corrosión","p":"Tubos enterrados o empotrados.","tab":{"h":["Material","Revestimiento"],"r":[["Acero","Polietileno, bituminoso, resina epoxídica o alquitrán de poliuretano"],["Cobre","Plástico (pregunta 8 del examen)"],["Fundición","Película continua de polietileno, resina epoxídica, betún, láminas de poliuretano o zincado con recubrimiento"]]}},
        {"t":"q","ref":"0r7w1p7"},   // font-temario nº 8: Las protecciones contra la corrosión cuando los tubos de cobre discurren enterrados o empo
        {"t":"q","ref":"1axr7jb"},   // font-temario nº 64: Las protecciones contra la corrosión de tubos de acero enterrados pueden ser de:
        {"t":"ex","h":"Otros casos","p":"Acero galvanizado empotrado: lechada de cemento en agua fría; coquilla aislante en agua caliente. En redes metálicas enterradas, <b>junta dieléctrica</b> después de la entrada al edificio y antes de la salida. Condensaciones: elemento separador con función de barrera antivapor (UNE 100171). Heladas: aislamiento según UNE-EN ISO 12241."},
        {"t":"q","ref":"1rmdvqu"},   // font-temario nº 65: En redes metálicas enterradas se instala una junta dieléctrica:
        {"t":"match","q":"Empareja cada caso con su protección.","pairs":[["Galvanizado empotrado, agua fría","Lechada de cemento"],["Galvanizado empotrado, agua caliente","Coquilla aislante"],["Condensaciones","Barrera antivapor (UNE 100171)"],["Heladas","Aislamiento según UNE-EN ISO 12241"]],"e":"Apartado 2.6."}
      ],
      sum: ["Cobre enterrado o empotrado: revestimiento de plástico.","Junta dieléctrica en redes metálicas enterradas, a la entrada y a la salida.","Galvanizado empotrado: lechada en fría, coquilla en caliente."] },
      { id: "fonta-2.6-3", apt: ["fonta-2.6"], title: "2.6. Ejecución: esfuerzos, golpe de ariete y ruidos",
      cards: [
        {"t":"ex","h":"Esfuerzos y golpe de ariete","p":"Al atravesar paramentos, <b>funda (pasatubos)</b> de mayor diámetro. Junta de dilatación del edificio → dispositivo dilatador. <b>Golpe de ariete positivo ≤ 2 bar</b>; el negativo no baja del 50 % de la presión de servicio.","fig":"f09"},
        {"t":"q","ref":"1n3fjvj"},   // font-temario nº 67: Cuando un pasatubos vertical visto pueda recibir golpes, debe sobresalir al menos:
        {"t":"num","q":"Golpe de ariete positivo máximo.","v":2,"u":"bar","e":"Golpe de ariete positivo ≤ 2 bar."},
        {"t":"q","q":"El golpe de ariete negativo no debe bajar del:","o":["50 % de la presión de servicio","10 % de la presión de servicio","Valor de 2 bar"],"c":0,"e":"Apartado 2.6: el negativo no baja del 50 % de la presión de servicio."},
        {"t":"ex","h":"Ruidos","p":"Patinillos en zonas comunes; conectores flexibles a la salida de las bombas; <b>soportes antivibratorios</b> en tubos metálicos con velocidades de 1,5 a 2,0 m/s."},
        {"t":"q","ref":"133vh4k"}   // font-temario nº 68: Los soportes de tubos metálicos con agua a 1,5–2 m/s deben ser:
      ],
      sum: ["Funda (pasatubos) de mayor diámetro al atravesar paramentos.","Golpe de ariete: positivo ≤ 2 bar; negativo ≥ 50 % de la de servicio.","Soportes antivibratorios en metálicos a 1,5–2 m/s."] },
      { id: "fonta-2.7", apt: ["fonta-2.7"], title: "2.7. Puesta en servicio: pruebas",
      cards: [
        {"t":"ex","h":"Prueba de resistencia y estanquidad","p":"La hace la <b>empresa instaladora</b> con todo visto y accesible: se llena, se purga con los grifos abiertos, se cierran y se lleva la bomba hasta la presión de prueba. Después se conectan grifería y aparatos y se repite la prueba. Manómetro que aprecie al menos <b>0,1 bar</b>. Presiones referidas a nivel de calzada."},
        {"t":"order","q":"Ordena la prueba de resistencia y estanquidad.","items":["Llenar la instalación","Purgar con los grifos abiertos","Cerrar los grifos","Llevar la bomba hasta la presión de prueba"],"e":"Apartado 2.7: se llena, se purga con los grifos abiertos, se cierran y se lleva la bomba hasta la presión de prueba."},
        {"t":"q","ref":"01m9f7r"},   // font-verif nº 25: Durante la prueba de resistencia y estanquidad, los componentes deben estar:
        {"t":"num","q":"¿Qué intervalo mínimo debe apreciar el manómetro de la prueba?","v":0.1,"u":"bar","e":"Manómetro que aprecie al menos 0,1 bar."},
        {"t":"ojo","p":"Prueba de tuberías metálicas: UNE 100151:1988, que el tema 5 indica sustituida por la UNE-EN 14336:2005. El test de Verificación pregunta por la UNE-EN 14336. Termoplásticas y multicapa: procedimiento A de la UNE-CEN/TR 12108:2015 IN."},
        {"t":"q","ref":"0uzpl3v"},   // font-verif nº 32: Las presiones de prueba indicadas se refieren al nivel de:
        {"t":"ex","h":"Pruebas particulares de ACS","p":"(a) caudal y temperatura en los puntos; (b) caudales exigidos a la temperatura fijada con los grifos de la simultaneidad abiertos; (c) tiempo que tarda en salir el agua caliente en el grifo más alejado de cada ramal sin haber abierto ninguno en <b>24 h</b>; (d) temperaturas de la red; (e) con el acumulador a régimen, termómetro de contacto: el retorno no más de <b>3 ºC</b> por debajo de la salida."},
        {"t":"q","ref":"11tw3li"},   // font-verif nº 34: La comprobación del tiempo que tarda en salir el agua caliente se hace tras el equilibrado
        {"t":"q","ref":"1niz5r5"}   // font-verif nº 36: La temperatura del retorno de ACS no debe ser inferior a la de salida del acumulador en má
      ],
      sum: ["La prueba la hace la empresa instaladora, con todo visto y accesible.","Llenar, purgar, cerrar y subir a presión con la bomba; se repite con los aparatos conectados.","Manómetro de 0,1 bar; presiones referidas a la calzada.","ACS: 24 h sin abrir grifos; retorno ≤ 3 ºC por debajo de la salida."] },
      { id: "fonta-2.8", apt: ["fonta-2.8"], title: "2.8. Productos de construcción",
      cards: [
        {"t":"ex","h":"Tubos admitidos","p":"Para agua potable: cobre, acero inoxidable, fundición dúctil, PVC, PVC-C, PE, PE-X, PB, PP y multicapa. <b>Prohibidos los tubos de aluminio y los que contengan plomo.</b> El ACS es también agua de consumo humano."},
        {"t":"q","ref":"0n9piqj"},   // font-temario nº 69: Quedan prohibidos expresamente los tubos de:
        {"t":"notin","q":"¿Cuál NO está admitido para agua potable?","o":["Cobre","PE-X","Multicapa","Aluminio"],"c":3,"e":"Los tubos de aluminio y los que contengan plomo están prohibidos."},
        {"t":"ex","h":"Aislamiento, válvulas y llaves","p":"Aislamiento con coquillas resistentes a la temperatura de aplicación. Válvulas y llaves compatibles con la tubería; cuerpo de una pieza; las de cierre por giro de 90º solo como órgano de cierre para mantenimiento; <b>resistentes a 10 bar</b>."},
        {"t":"q","ref":"1g758ha"},   // font-temario nº 70: Las válvulas de cierre por giro de 90º solo pueden usarse como órgano de cierre para:
        {"t":"num","q":"Presión que deben resistir válvulas y llaves.","v":10,"u":"bar","e":"Válvulas y llaves resistentes a 10 bar."}
      ],
      sum: ["Prohibidos los tubos de aluminio y los que contengan plomo.","El ACS también es agua de consumo humano.","Llaves de giro de 90º solo para mantenimiento; válvulas y llaves a 10 bar."] },
      { id: "fonta-2.9", apt: ["fonta-2.9"], title: "2.9. Incompatibilidades",
      cards: [
        {"t":"ex","h":"Agresividad del agua","p":"<b>Acero galvanizado</b>: agresivas las aguas no incrustantes con cloruros &gt; 250 mg/l; índice de Langelier. <b>Cobre</b>: agresivas las aguas dulces y ácidas (pH &lt; 6,5) y con mucho CO₂; índice de Lucey. <b>Acero inoxidable</b>: AISI 304 con cloruros ≤ 200 mg/l; por encima, AISI 316."},
        {"t":"q","ref":"07l0s8e"},   // font-temario nº 72: Para valorar la agresividad del agua en tubos de acero galvanizado se emplea el índice de:
        {"t":"num","q":"¿Por debajo de qué pH son agresivas las aguas para el cobre?","v":6.5,"u":"","e":"Cobre: aguas dulces y ácidas con pH < 6,5 y mucho CO₂."},
        {"t":"match","q":"Empareja cada material o índice con su dato.","pairs":[["Índice de Langelier","Acero galvanizado"],["Índice de Lucey","Cobre"],["AISI 304","Cloruros ≤ 200 mg/l"],["AISI 316","Cloruros por encima de 200 mg/l"]],"e":"Apartado 2.9."},
        {"t":"ex","h":"Orden de los metales","p":"Entre metales distintos, primero el de menor potencial. <b>El cobre no va antes del acero galvanizado</b> (los iones Cu⁺ perforan el galvanizado). Cobre después de galvanizado sí, con <b>válvula de retención</b> entre ambos; excepcionalmente, manguitos antielectrolíticos de plástico. Acero inoxidable sí puede acoplarse al galvanizado. En las vainas pasamuros, material plástico entre materiales distintos."},
        {"t":"img","fig":"f10","q":"Según la figura, ¿qué hay que montar para poner cobre después de acero galvanizado?","o":["Una válvula de retención entre ambos","Una junta dieléctrica","Nada: está prohibido"],"c":0,"e":"Galvanizado → cobre: permitido con válvula de retención entre ambos. Lo prohibido es cobre → galvanizado."},
        {"t":"q","ref":"0sd686b"}   // font-temario nº 74: Las tuberías de cobre no deben colocarse antes de las de acero galvanizado según el sentid
      ],
      sum: ["Galvanizado: cloruros > 250 mg/l agresivos (Langelier).","Cobre: pH < 6,5 y mucho CO₂ (Lucey).","Inoxidable 304 hasta 200 mg/l de cloruros; por encima, 316.","Nunca cobre antes de galvanizado; al revés, con válvula de retención."] },
      { id: "fonta-2.10", apt: ["fonta-2.10"], title: "2.10. Mantenimiento y conservación",
      cards: [
        {"t":"ex","h":"Interrupción del servicio","p":"Si no se pone en servicio <b>4 semanas</b> después de terminar o está fuera de servicio <b>más de 6 meses</b>, se cierra y se vacía. Acometidas sin uso: cerrarlas; sin uso durante <b>1 año</b>: taponarlas."},
        {"t":"q","ref":"08m2m4r"},   // font-temario nº 76: Las instalaciones que no se ponen en servicio en las 4 semanas siguientes a su terminación
        {"t":"q","ref":"1cwigqr"},   // font-temario nº 77: Las acometidas que no se utilizan durante 1 año deben:
        {"t":"num","q":"Fuera de servicio más de cuántos meses hay que cerrar y vaciar la instalación.","v":6,"u":"meses","e":"Más de 6 meses fuera de servicio: cerrar y vaciar."},
        {"t":"ex","h":"Nueva puesta en servicio","p":"Descalcificadores con regeneración manual; llenar abriendo poco a poco empezando por la llave principal; purgar desde la toma más alejada o más alta; lavar y comprobar la estanqueidad visualmente."},
        {"t":"order","q":"Ordena la nueva puesta en servicio.","items":["Regenerar los descalcificadores (arranque manual)","Llenar abriendo poco a poco desde la llave principal","Purgar desde la toma más alejada o más alta","Lavar y comprobar la estanqueidad visualmente"],"e":"Apartado 2.10, en el orden que da el temario."},
        {"t":"ex","h":"Mantenimiento","p":"Según la normativa de legionela; equipos ocultos accesibles. Con batería de contadores, los montantes hasta cada derivación particular son parte de la instalación general."},
        {"t":"ojo","p":"Legionela: el tema 2 cita el RD 865/2003 y el tema 5 el RD 487/2022, que es el vigente. El test de Verificación pregunta por el RD 487/2022."},
        {"t":"q","ref":"0gwzu2p"}   // font-verif nº 48: Con batería de contadores, los montantes hasta cada derivación particular forman parte, a 
      ],
      sum: ["4 semanas sin estrenar o más de 6 meses parada: cerrar y vaciar.","Acometida sin uso 1 año: taponar.","Llenar despacio desde la llave principal y purgar desde la toma más alejada o alta.","Mantenimiento según la normativa de legionela (vigente: RD 487/2022)."] }
    ]},
    { n: 3, name: "Elementos receptores", lessons: [
      { id: "fonta-3.1", apt: ["fonta-3.1"], title: "3.1. Tipos de receptores",
      cards: [
        {"t":"ex","h":"Abiertos y cerrados","p":"<b>Abiertos</b>: el agua sale al exterior (grifo, inodoro, ducha); en el cálculo cuenta su <b>presión mínima de salida</b>. <b>Cerrados</b>: el agua los atraviesa (intercambiadores); en el cálculo cuenta su <b>pérdida de carga</b>, como un elemento singular más.","fig":"f11"},
        {"t":"q","ref":"0rzcl5u"},   // font-temario nº 78: Un intercambiador es un ejemplo de receptor:
        {"t":"ojo","p":"Pregunta 9 del examen: «en los receptores abiertos debe tenerse en cuenta la presión mínima de descarga». La pérdida de carga del intercambiador es de los cerrados."},
        {"t":"q","ref":"0m5sdft"},   // font-temario nº 9: En los receptores abiertos:
        {"t":"q","q":"En el cálculo de un receptor cerrado se tiene en cuenta:","o":["Su pérdida de carga, como elemento singular","Su presión mínima de salida","Su caudal de descarga al exterior"],"c":0,"e":"Apartado 3.1: en los cerrados cuenta la pérdida de carga."}
      ],
      sum: ["Abierto: el agua sale; cuenta la presión mínima de salida.","Cerrado (intercambiador): el agua lo atraviesa; cuenta la pérdida de carga.","Pregunta 9 del examen: en los abiertos se tiene en cuenta la presión mínima de descarga."] },
      { id: "fonta-3.2", apt: ["fonta-3.2"], title: "3.2. Aparatos sanitarios",
      cards: [
        {"t":"ex","h":"Inodoros y lavabos","p":"Inodoros: según la descarga sea vertical u horizontal y la red enterrada o colgada; a veces la llave de paso queda oculta. Lavabos: suministro doble (fría y caliente), desagüe con «una mínima pendiente (1 %)» según el tema 3 y sifón para el sellado hidráulico."},
        {"t":"ojo","p":"Pendiente del desagüe del lavabo: el tema 3 habla de «una mínima pendiente (1 %)», pero el HS 5 (temas 4 y 5) exige entre 2,5 y 5 % con sifón individual. Si preguntan por el HS 5, usa 2,5–5 %."},
        {"t":"q","q":"Según el HS 5, el desagüe de un lavabo con sifón individual lleva una pendiente:","o":["Entre el 2,5 y el 5 %","Del 1 %","De hasta el 10 %"],"c":0,"e":"El HS 5 exige 2,5–5 % para lavabos con sifón individual; el 1 % es lo que dice el tema 3. Hasta el 10 % es para bañeras y duchas."},
        {"t":"ex","h":"Duchas y bañeras","p":"Al estar más bajas comprometen la pendiente; se elevan unos centímetros. La ducha, al no poder llevar sifón, suele ir a un <b>bote sifónico</b>."},
        {"t":"q","ref":"1ifkuzb"}   // font-temario nº 82: Las duchas, al no poder llevar sifón propio, suelen conectarse a:
      ],
      sum: ["Lavabo: doble suministro y sifón para el sellado.","Pendiente del lavabo: 1 % en el tema 3; 2,5–5 % según el HS 5.","La ducha suele ir a bote sifónico."] },
      { id: "fonta-3.3", apt: ["fonta-3.3"], title: "3.3. Eficiencia en los aparatos",
      cards: [
        {"t":"ex","h":"Dispositivos de ahorro","p":"Perlizadores, atomizadores o aireadores: reducen un <b>20 %</b> del caudal. Grifos temporizados o electrónicos: reducen un <b>30 %</b> del consumo. Grifos termostáticos: selector de temperatura, ahorran agua y dan confort. Doble pulsación en inodoros: descarga reducida (<b>50 %</b>) o completa. Programadores de riego y riego por goteo (evita la evaporación del riego por aspersión).","fig":"f12"},
        {"t":"q","ref":"1wiesu6"},   // font-temario nº 79: Los perlizadores o aireadores reducen el caudal en torno al:
        {"t":"q","ref":"0j674wq"},   // font-temario nº 80: Los grifos temporizados o electrónicos pueden reducir el consumo de agua en torno al:
        {"t":"q","ref":"0ityi4i"},   // font-temario nº 81: En los inodoros de doble pulsación, la descarga reducida es aproximadamente del:
        {"t":"match","q":"Empareja cada dispositivo con lo que aporta.","pairs":[["Perlizador o aireador","Reduce un 20 % del caudal"],["Grifo temporizado o electrónico","Reduce un 30 % del consumo"],["Doble pulsación","Descarga reducida del 50 %"],["Grifo termostático","Selector de temperatura"],["Riego por goteo","Evita la evaporación del riego por aspersión"]],"e":"Apartado 3.3."}
      ],
      sum: ["Perlizador: −20 % de caudal.","Grifo temporizado o electrónico: −30 % de consumo.","Doble pulsación: descarga reducida del 50 %."] },
      { id: "fonta-3.4", apt: ["fonta-3.4"], title: "3.4. Aprovechamiento de aguas",
      cards: [
        {"t":"ex","h":"Reutilización","p":"Regulada por el <b>RD 1620/2007</b>. Usos admitidos en el anexo I.A (por ejemplo, riego de jardines privados, descarga de aparatos sanitarios, baldeo de calles, sistemas contra incendios). Cualquier reutilización requiere <b>informe previo y vinculante</b> de las autoridades sanitarias."},
        {"t":"q","ref":"1547kdp"},   // font-temario nº 83: La reutilización de aguas regeneradas está regulada por el:
        {"t":"ex","h":"Usos prohibidos","p":"<b>Consumo humano</b>, salvo declaración de catástrofe. Industria alimentaria (salvo excepciones), instalaciones hospitalarias, cultivo de moluscos filtradores, agua de baño, torres de refrigeración y condensadores evaporativos (salvo lo previsto para uso industrial), fuentes y láminas ornamentales en espacios públicos o interiores de edificios públicos."},
        {"t":"q","ref":"1ixp3py"},   // font-temario nº 11: Las aguas pluviales se pueden utilizar para consumo humano.
        {"t":"notin","q":"¿Cuál de estos usos NO está prohibido para las aguas regeneradas?","o":["Riego de jardines privados","Consumo humano","Torres de refrigeración","Agua de baño"],"c":0,"e":"El riego de jardines privados es un uso admitido (anexo I.A del RD 1620/2007)."},
        {"t":"q","ref":"19mm3te"},   // font-temario nº 84: Está prohibido reutilizar aguas regeneradas en:
        {"t":"ex","h":"Responsabilidad y aguas grises","p":"El titular de la concesión responde de la calidad hasta el punto de entrega; desde ahí, el usuario. <b>Aguas grises</b>: las residuales domésticas de lavabos, duchas y bañeras; se recuperan de forma localizada o centralizada y su problema es el alto coste."},
        {"t":"q","ref":"05aas2e"},   // font-temario nº 86: El responsable de la calidad del agua regenerada hasta el punto de entrega es:
        {"t":"q","ref":"0u42wvw"}   // font-temario nº 85: Las aguas grises proceden de:
      ],
      sum: ["Reutilización: RD 1620/2007, con informe previo y vinculante sanitario.","Nunca para consumo humano (salvo catástrofe); tampoco torres de refrigeración ni agua de baño.","Aguas grises: lavabos, duchas y bañeras."] },
      { id: "fonta-3.5", apt: ["fonta-3.5"], title: "3.5. Depósitos acumuladores",
      cards: [
        {"t":"ex","h":"Acumuladores","p":"Acumuladores o <b>interacumuladores</b> (con intercambiador incorporado), en ACS, agua fría y climatización: almacenan energía térmica. Materiales plásticos o metálicos; en superficie o enterrados. En aerotermia, depósitos de inercia dentro de la vivienda."},
        {"t":"q","q":"Un interacumulador es:","o":["Un acumulador con intercambiador incorporado","Un grupo de presión con depósito","Un depósito exterior de aerotermia sin intercambiador"],"c":0,"e":"Apartado 3.5: interacumulador, con intercambiador incorporado."},
        {"t":"ex","h":"Para qué sirven","p":"Objetivos: depósito de inercia, almacenar energía para reponerla en un tiempo dado o reserva de emergencia si se corta el suministro. La acumulación <b>reduce la potencia instalada, el coste y el consumo</b>."},
        {"t":"notin","q":"¿Cuál NO es un objetivo de un depósito acumulador según el temario?","o":["Depósito de inercia","Almacenar energía para reponerla en un tiempo dado","Reserva de emergencia","Aumentar la presión de la red"],"c":3,"e":"Dar más presión es cosa del grupo de sobreelevación."},
        {"t":"q","q":"La acumulación permite reducir:","o":["La potencia instalada, el coste y el consumo","Solo el consumo","El diámetro de la acometida"],"c":0,"e":"Apartado 3.5."}
      ],
      sum: ["Interacumulador: acumulador con intercambiador incorporado.","Objetivos: inercia, almacenar energía o reserva de emergencia.","Reduce potencia instalada, coste y consumo."] }
    ]},
    { n: 4, name: "Sistemas de evacuación", lessons: [
      { id: "fonta-4.1", apt: ["fonta-4.1"], title: "4.1. Normativa y condiciones generales (HS 5)",
      cards: [
        {"t":"ex","h":"CTE DB HS 5","p":"El <b>CTE DB HS 5 «Evacuación de aguas»</b> se aplica a la evacuación de aguas residuales y pluviales. Mismo criterio de reformas que el HS 4 y misma secuencia de verificación: diseño, dimensionado, ejecución, productos, uso y mantenimiento."},
        {"t":"q","ref":"1nme5wk"},   // font-temario nº 87: El documento que regula la evacuación de aguas residuales y pluviales es el:
        {"t":"ex","h":"Condiciones generales","p":"Cierres hidráulicos que impidan el paso del aire de la red a los locales sin afectar al flujo. Trazado lo más sencillo posible, autolimpiable, sin retención de agua; diámetros apropiados. Redes accesibles. Ventilación para que funcionen los cierres y salgan los gases mefíticos. <b>La red solo evacua aguas residuales o pluviales.</b>"},
        {"t":"notin","q":"¿Cuál NO es una condición general del HS 5?","o":["Cierres hidráulicos que no afecten al flujo","Trazado autolimpiable sin retención de agua","Redes accesibles","Bombear siempre todas las aguas"],"c":3,"e":"Las condiciones son cierres, trazado sencillo y autolimpiable, accesibilidad y ventilación. El bombeo es solo un elemento especial (4.7)."},
        {"t":"q","q":"La red de evacuación del edificio:","o":["Solo evacua aguas residuales o pluviales","Puede recibir agua de cualquier origen","Solo evacua aguas pluviales"],"c":0,"e":"Apartado 4.1: la red solo evacua aguas residuales o pluviales."}
      ],
      sum: ["HS 5 «Evacuación de aguas»: residuales y pluviales.","Misma secuencia de verificación que el HS 4.","Cierres, trazado autolimpiable, accesibilidad y ventilación."] },
      { id: "fonta-4.2-1", apt: ["fonta-4.2"], title: "4.2. Terminología del HS 5",
      cards: [
        {"t":"ex","h":"Términos del HS 5 (1)","p":"De la red al alcantarillado.","tab":{"h":["Término","Definición"],"r":[["Acometida","Conducciones fuera del edificio que enlazan su red con la red general de saneamiento o la depuración."],["Aguas pluviales / residuales","Pluviales: de la lluvia, básicamente sin contaminar. Residuales: de los aparatos sanitarios."],["Cierre hidráulico","Retiene agua e impide el paso de aire fétido de la red a los locales sin afectar al flujo."],["Bajante","Canalización vertical hasta la arqueta a pie de bajante o el colector suspendido."],["Colector","Conduce las aguas desde las bajantes hasta el alcantarillado."],["Red de pequeña evacuación","Desde los cierres hidráulicos (salvo inodoros) hasta las bajantes."],["Cota de evacuación","Diferencia entre el punto de vertido más bajo y la conexión a la red; a veces obliga a bombear."],["Pozo general del edificio","Conexión entre la red privada y la pública."]]}},
        {"t":"q","ref":"05qz2r9"},   // font-temario nº 88: La red de pequeña evacuación conduce los residuos desde los cierres hidráulicos hasta las 
        {"t":"match","q":"Empareja cada término con su definición.","pairs":[["Bajante","Canalización vertical"],["Colector","De las bajantes al alcantarillado"],["Red de pequeña evacuación","De los cierres hidráulicos a las bajantes"],["Pozo general","Conexión entre la red privada y la pública"]],"e":"Terminología del HS 5."},
        {"t":"ex","h":"Términos del HS 5 (2)","p":"Fenómenos y unidades.","tab":{"h":["Término","Definición"],"r":[["Reflujo","Flujo en sentido contrario al previsto. Se evita con válvula antirretorno (clapeta) (pregunta 13 del examen)."],["Sifonamiento","Expulsión del agua del sello por variaciones de presión."],["Radio hidráulico","Sección del flujo / perímetro mojado; a sección llena o media en tubo circular, ¼ del diámetro."],["Unidad de desagüe (UD)","Caudal de 0,47 dm³/s; el «peso» de cada aparato al dimensionar (pregunta 15 del examen)."],["Válvula de aireación","Deja entrar aire pero no salir, para limitar fluctuaciones de presión."],["Longitud efectiva (ventilación)","Longitud equivalente / 1,5, para incluir las pérdidas localizadas."]]}},
        {"t":"q","ref":"17fo1fq"},   // font-temario nº 13: El reflujo en una instalación de saneamiento se evita instalando:
        {"t":"q","ref":"017st7p"},   // font-temario nº 15: En saneamiento, una unidad de desagüe equivale a:
        {"t":"num","q":"Caudal de una unidad de desagüe.","v":0.47,"u":"dm³/s","e":"UD: 0,47 dm³/s."},
        {"t":"q","ref":"0b5p7ff"},   // font-temario nº 93: Las válvulas de aireación permiten:
        {"t":"q","ref":"1678gup"}   // font-verif nº 49: El cierre hidráulico impide el paso de aire de la red a los locales:
      ],
      sum: ["Red de pequeña evacuación: de los cierres (salvo inodoros) a las bajantes.","Reflujo: se evita con clapeta antirretorno.","UD = 0,47 dm³/s.","Válvula de aireación: deja entrar aire pero no salir."] },
      { id: "fonta-4.2-2", apt: ["fonta-4.2"], title: "4.2. Sistemas y ventilación",
      cards: [
        {"t":"ex","h":"Separativo y mixto","p":"<b>Separativo</b>: derivaciones, bajantes y colectores independientes para residuales y pluviales. <b>Mixto o semiseparativo</b>: derivaciones y bajantes independientes, pero se unen en los colectores.","fig":"f13"},
        {"t":"q","ref":"1rrv15t"},   // font-temario nº 89: El sistema en el que derivaciones y bajantes son independientes para residuales y pluviale
        {"t":"ojo","p":"La pregunta 20 del examen («los sistemas mixtos son más caros de implantar que los separativos», falso) no sale de las diapositivas."},
        {"t":"q","ref":"1vvle4n"},   // font-temario nº 20: Los sistemas de saneamiento mixtos son más caros de implantar que los separativos.
        {"t":"ex","h":"Ventilación","p":"<b>Primaria</b>: prolongación de la bajante por encima de la última planta hasta la cubierta; evita sobrepresiones y subpresiones en la bajante. <b>Secundaria</b> (paralela o cruzada): paralela a la bajante y conectada a ella; evita el exceso de presión en la base. <b>Terciaria</b>: protege los cierres contra el sifonamiento y el autosifonamiento. <b>Válvulas de aireación-ventilación</b>: unifican las tres sin salir al exterior.","fig":"f14"},
        {"t":"ojo","p":"La pregunta 14 del examen atribuía a la ventilación primaria lo de discurrir paralela a la bajante y conectarse a ella (falso): eso es la secundaria."},
        {"t":"q","ref":"0h5dv1c"},   // font-temario nº 14: En saneamiento, la ventilación primaria discurre paralela a la bajante y se conecta a esta
        {"t":"match","q":"Empareja cada ventilación con lo que hace.","pairs":[["Primaria","Prolonga la bajante hasta la cubierta"],["Secundaria","Paralela a la bajante; evita exceso de presión en la base"],["Terciaria","Protege los cierres contra el sifonamiento"],["Válvulas de aireación-ventilación","Unifican las tres sin salir al exterior"]],"e":"Apartado 4.2."},
        {"t":"q","ref":"0ci7wwn"}   // font-temario nº 92: La ventilación terciaria protege los cierres hidráulicos contra:
      ],
      sum: ["Separativo: todo independiente. Mixto: se unen en los colectores.","Primaria: prolonga la bajante; secundaria: paralela y conectada.","Terciaria: protege los cierres del sifonamiento."] },
      { id: "fonta-4.3", apt: ["fonta-4.3"], title: "4.3. Configuración de la evacuación",
      cards: [
        {"t":"ex","h":"Según la red pública","p":"Colectores preferentemente por gravedad al pozo o arqueta general. <b>Sin alcantarillado público</b>: dos sistemas separados, residuales con depuradora particular y pluviales al terreno. Residuos agresivos industriales: tratamiento previo. <b>Una sola red pública</b>: mixto, o separativo con conexión final con cierre hidráulico. <b>Dos redes públicas</b>: separativo, cada red a la suya."},
        {"t":"q","ref":"0sffr0g"},   // font-temario nº 91: Cuando no existe red de alcantarillado público, las residuales van a:
        {"t":"q","ref":"0z69p78"},   // font-temario nº 90: Cuando existe una única red de alcantarillado público, debe disponerse:
        {"t":"ojo","p":"Pregunta 12 del examen: es falso que las aguas pluviales y residuales se traten «en una primera etapa en el propio edificio» antes de enviarlas a la red pública. Solo hay depuradora particular cuando no hay alcantarillado."},
        {"t":"q","ref":"0zgh7sa"},   // font-temario nº 12: El tratamiento de las aguas pluviales y residuales se realiza en una primera etapa en el p
        {"t":"match","q":"Empareja cada caso con su configuración.","pairs":[["Sin alcantarillado público","Residuales a depuradora particular y pluviales al terreno"],["Una sola red pública","Mixto, o separativo con conexión final con cierre hidráulico"],["Dos redes públicas","Separativo, cada red a la suya"],["Residuos agresivos industriales","Tratamiento previo"]],"e":"Apartado 4.3."}
      ],
      sum: ["Sin alcantarillado: depuradora particular para residuales y pluviales al terreno.","Una red pública: mixto o separativo con cierre hidráulico final.","No se tratan las aguas en el edificio si hay alcantarillado."] },
      { id: "fonta-4.4", apt: ["fonta-4.4"], title: "4.4. Cierres hidráulicos",
      cards: [
        {"t":"ex","h":"Tipos y requisitos","p":"Sifones individuales, botes sifónicos (para varios aparatos), sumideros sifónicos y arquetas sifónicas. Autolimpiables, sin retener sólidos, <b>sin partes móviles</b> y con registro de limpieza accesible."},
        {"t":"q","ref":"08q1i84"},   // font-verif nº 50: ¿Cuál de estas características NO es exigible a un cierre hidráulico?
        {"t":"ex","h":"Alturas","p":"Altura de cierre: <b>≥ 50 mm en usos continuos</b>, <b>≥ 70 mm en discontinuos</b> y máximo <b>100 mm</b>. Corona ≤ 60 cm por debajo de la válvula de desagüe. Diámetro del sifón ≥ el de la válvula y ≤ el del ramal.","fig":"f15"},
        {"t":"q","ref":"0taopk8"},   // font-temario nº 16: La altura mínima de cierre hidráulico debe ser 70 mm para usos continuos.
        {"t":"match","q":"Empareja cada dato del cierre hidráulico.","pairs":[["Uso continuo","≥ 50 mm"],["Uso discontinuo","≥ 70 mm"],["Altura máxima","100 mm"],["Corona bajo la válvula","≤ 60 cm"]],"e":"Apartado 4.4 y figura 15."},
        {"t":"ex","h":"Reglas de colocación","p":"Lo más cerca posible de la válvula de desagüe. <b>No en serie</b>: si hay bote sifónico, los aparatos no llevan sifón individual. Un bote sifónico solo sirve a aparatos de su propio cuarto húmedo. Fregaderos, lavaderos, lavadoras y lavavajillas, siempre con sifón individual."},
        {"t":"q","ref":"1xeh4uy"},   // font-temario nº 10: El sellado hidráulico debe realizarse siempre con un sifón individual.
        {"t":"q","ref":"1bzf7bv"},   // font-temario nº 95: Un bote sifónico puede dar servicio a aparatos de otro cuarto húmedo.
        {"t":"q","ref":"0lxza3z"}   // font-temario nº 99: Los desagües de fregaderos, lavadoras y lavavajillas deben llevar:
      ],
      sum: ["Cierre: ≥ 50 mm continuo, ≥ 70 mm discontinuo, máximo 100 mm.","Sin partes móviles; nunca en serie.","Bote sifónico solo para su cuarto húmedo; fregaderos y lavadoras con sifón individual."] },
      { id: "fonta-4.5", apt: ["fonta-4.5"], title: "4.5. Redes de pequeña evacuación",
      cards: [
        {"t":"ex","h":"Distancias y pendientes","p":"Bote sifónico a bajante <b>≤ 2,00 m</b>; derivaciones al bote <b>≤ 2,50 m</b> con pendiente <b>2–4 %</b>. Sifón individual (fregaderos, lavaderos, lavabos, bidés) a <b>≤ 4,00 m</b> de la bajante con pendiente <b>2,5–5 %</b>; bañeras y duchas <b>≤ 10 %</b>. Inodoro: a la bajante directamente o con <b>manguetón ≤ 1,00 m</b>.","fig":"f16"},
        {"t":"q","ref":"1btc19j"},   // font-temario nº 17: Las derivaciones que acometen al bote sifónico deben tener una pendiente comprendida entre
        {"t":"q","ref":"1ao5kgr"},   // font-temario nº 18: El desagüe de los inodoros a las bajantes debe realizarse directamente o por medio de un m
        {"t":"ojo","p":"Pendiente del desagüe del lavabo: el tema 3 habla de «una mínima pendiente (1 %)», pero el HS 5 (temas 4 y 5) exige entre 2,5 y 5 % con sifón individual. Si preguntan por el HS 5, usa 2,5–5 %."},
        {"t":"match","q":"Empareja cada elemento con su límite.","pairs":[["Bote sifónico a bajante","≤ 2,00 m"],["Derivaciones al bote","≤ 2,50 m, 2–4 %"],["Lavabo o bidé con sifón individual","≤ 4,00 m, 2,5–5 %"],["Bañeras y duchas","Pendiente ≤ 10 %"],["Manguetón del inodoro","≤ 1,00 m"],["Unión a la bajante","Inclinación ≥ 45º"]],"e":"HS 5, red de pequeña evacuación (figura 16)."},
        {"t":"ex","h":"Otras reglas","p":"Trazado sencillo por gravedad; conectar a bajantes (o, si no se puede, al manguetón del inodoro). <b>Rebosadero obligatorio</b> en lavabos, bidés, bañeras y fregaderos (aunque el lavabo no tenga tapón). Sin desagües enfrentados a una tubería común; uniones a la bajante con inclinación <b>≥ 45º</b>; sin desagües bombeados (salvo temporales)."},
        {"t":"q","ref":"0buhvh9"},   // font-temario nº 101: El rebosadero es obligatorio en lavabos aunque no tengan tapón.
        {"t":"num","q":"Inclinación mínima de la unión de los desagües a la bajante.","v":45,"u":"º","e":"Uniones a la bajante con inclinación ≥ 45º."}
      ],
      sum: ["Bote a bajante ≤ 2 m; derivaciones al bote ≤ 2,5 m con 2–4 %.","Sifón individual ≤ 4 m con 2,5–5 %; bañeras y duchas ≤ 10 %.","Manguetón ≤ 1 m; uniones a 45º o más; rebosadero obligatorio."] },
      { id: "fonta-4.6-1", apt: ["fonta-4.6"], title: "4.6. Bajantes y colectores",
      cards: [
        {"t":"ex","h":"Bajantes","p":"Sin desviaciones ni retranqueos, con diámetro uniforme que <b>no disminuye en el sentido de la corriente</b> (puede aumentar si llegan caudales mucho mayores)."},
        {"t":"q","ref":"0umtxi7"},   // font-verif nº 57: El diámetro de una bajante puede disminuir en el sentido de la corriente.
        {"t":"ex","h":"Colectores","p":"<b>Colgados</b>: pendiente <b>≥ 1 %</b>; conexión con piezas especiales; bajante de pluviales a ≥ 3 m de la de residuales; no más de 2 colectores en un punto; registros cada ≤ 15 m. <b>Enterrados</b>: pendiente <b>≥ 2 %</b>; en zanjas por debajo de la red de agua potable; las bajantes acometen con arqueta; registros cada ≤ 15 m.","fig":"f17"},
        {"t":"q","ref":"02qiq0q"},   // font-temario nº 19: Los colectores colgados deben tener una pendiente mínima del:
        {"t":"num","q":"Pendiente mínima de un colector enterrado.","v":2,"u":"%","e":"Colgados ≥ 1 %; enterrados ≥ 2 %."},
        {"t":"q","ref":"075hvug"},   // font-verif nº 59: La conexión de una bajante de pluviales a un colector colgado debe separarse de la de resi
        {"t":"q","ref":"1brdd8b"}   // font-verif nº 62: Los colectores enterrados se sitúan en zanjas:
      ],
      sum: ["Bajantes: sin desviaciones; el diámetro no disminuye.","Colgados ≥ 1 %, enterrados ≥ 2 %; registros cada ≤ 15 m.","Enterrados por debajo de la red de agua potable."] },
      { id: "fonta-4.6-2", apt: ["fonta-4.6"], title: "4.6. Arquetas, separador de grasas y pozos",
      cards: [
        {"t":"ex","h":"Arquetas","p":"Sobre cimiento de hormigón y con tapa practicable; un colector por cara (ángulo con la salida &gt; 90º). La de <b>pie de bajante no es sifónica</b>; la de <b>paso, máximo 3 colectores</b>; la de trasdós, si llega más de un colector al pozo general."},
        {"t":"q","ref":"0fpkwww"},   // font-temario nº 103: La arqueta a pie de bajante debe ser sifónica.
        {"t":"q","ref":"1d2r02x"},   // font-temario nº 102: En redes enterradas, en las arquetas de paso pueden acometer como máximo:
        {"t":"ex","h":"Separador, pozos y registros","p":"Separador de grasas (restaurantes, garajes…): con ventilación y tapa registrable, preferiblemente al final de la red horizontal. Pozo general al final, antes de la acometida. <b>Pozo de resalto si el desnivel con la acometida es &gt; 1 m.</b> Registros de limpieza en cada encuentro y cambio de dirección y en tramos rectos."},
        {"t":"q","ref":"1p0ldcc"},   // font-temario nº 105: El separador de grasas se dispone preferiblemente:
        {"t":"num","q":"Desnivel con la acometida a partir del cual se pone pozo de resalto.","v":1,"u":"m","e":"Pozo de resalto si el desnivel es mayor de 1 m."}
      ],
      sum: ["Arqueta a pie de bajante: no sifónica.","Arqueta de paso: máximo 3 colectores.","Pozo de resalto si el desnivel supera 1 m."] },
      { id: "fonta-4.7", apt: ["fonta-4.7"], title: "4.7. Elementos especiales",
      cards: [
        {"t":"ex","h":"Bombeo y elevación","p":"Cuando parte de la red queda por debajo de la acometida. No vierten pluviales (salvo patios o rampas de garaje) ni aguas de plantas superiores a la acometida, ni grasas, aceites o inflamables."},
        {"t":"notin","q":"¿Cuál de estas aguas NO está prohibido verter al bombeo?","o":["Pluviales de rampas de garaje","Grasas y aceites","Líquidos inflamables","Aguas de plantas superiores a la acometida"],"c":0,"e":"Las pluviales no van al bombeo salvo las de patios o rampas de garaje."},
        {"t":"ex","h":"Equipos","p":"<b>Al menos dos bombas</b>, protegidas contra sólidos; conectadas al grupo electrógeno o a una batería con <b>24 h</b> de autonomía; pozo con ventilación; <b>bucle antirreflujo</b> en la conexión al alcantarillado. Válvulas antirretorno de seguridad para evitar inundaciones si se sobrecarga el alcantarillado."},
        {"t":"q","ref":"14tgcpj"},   // font-temario nº 106: El sistema de bombeo y elevación debe tener al menos:
        {"t":"q","ref":"1e3t3fr"},   // font-temario nº 107: Sin grupo electrógeno, las bombas de elevación deben tener una batería con autonomía de al
        {"t":"q","ref":"0w7hy1p"}   // font-temario nº 108: En la conexión del bombeo con el alcantarillado debe disponerse:
      ],
      sum: ["Bombeo cuando parte de la red está por debajo de la acometida.","Al menos dos bombas; grupo electrógeno o batería de 24 h.","Bucle antirreflujo en la conexión al alcantarillado."] },
      { id: "fonta-4.8", apt: ["fonta-4.8"], title: "4.8. Dimensionado: aguas residuales",
      cards: [
        {"t":"ex","h":"Unidades de desagüe","p":"Se dimensiona como separativo y luego se convierte a mixto. Método de unidades de desagüe (UD) según uso público o privado (tabla 4.1 del HS 5, que no viene en las diapositivas). Desagües continuos o semicontinuos: <b>1 UD por cada 0,03 dm³/s</b>. Diámetros de la tabla 4.1 válidos para ramales de <b>1,5 m</b>."},
        {"t":"q","ref":"1mmz1ja"},   // font-temario nº 109: Para desagües continuos (bandejas de condensación), se toma 1 UD por cada:
        {"t":"q","ref":"09k8ah0"},   // font-temario nº 110: Los diámetros de la tabla 4.1 del HS 5 valen para ramales individuales de longitud:
        {"t":"ex","h":"Ramales, bajantes y colectores","p":"El diámetro nunca menor que el de aguas arriba. Bajantes: variación de presión <b>≤ ± 250 Pa</b> y agua ≤ 1/3 de la sección. Desviación de la bajante: &lt; 45º sin cambio de sección; &gt; 45º, el tramo como colector al <b>4 %</b>. Colectores horizontales: a media sección, hasta tres cuartos como máximo.","tab":{"h":["Desagüe (mm)","32","40","50","60","80","100"],"r":[["UD","1","2","3","4","5","6"]]}},
        {"t":"q","ref":"0unindz"},   // font-temario nº 111: Según la tabla 4.2 del HS 5, un desagüe de 50 mm equivale a:
        {"t":"q","ref":"1dtr0g8"},   // font-temario nº 112: Las bajantes de residuales se dimensionan para que la variación de presión no supere:
        {"t":"q","ref":"0ikoq6p"},   // font-temario nº 113: Si una desviación de la bajante forma más de 45º con la vertical, ese tramo se dimensiona 
        {"t":"match","q":"Empareja cada diámetro de desagüe con sus UD (tabla 4.2).","pairs":[["32 mm","1 UD"],["40 mm","2 UD"],["50 mm","3 UD"],["60 mm","4 UD"],["80 mm","5 UD"],["100 mm","6 UD"]],"e":"Tabla 4.2 del HS 5."}
      ],
      sum: ["Continuos: 1 UD por cada 0,03 dm³/s; tabla 4.1 para ramales de 1,5 m.","Bajantes: ± 250 Pa y ≤ 1/3 de la sección.","Desviación > 45º: como colector al 4 %; colectores a media sección."] },
      { id: "fonta-4.9", apt: ["fonta-4.9"], title: "4.9. Dimensionado: aguas pluviales",
      cards: [
        {"t":"ex","h":"Recogida y canalones","p":"Filtro de la caldereta: área de paso entre <b>1,5 y 2 veces</b> la sección del tubo. Puntos de recogida suficientes para no tener desniveles &gt; 150 mm ni pendientes &gt; 0,5 %. Canalones y bajantes para <b>100 mm/h</b>; con otra intensidad, factor <b>f = i / 100</b>. Canalón no semicircular: sección <b>10 % mayor</b>. Colectores de pluviales a sección llena."},
        {"t":"q","ref":"1jpd15k"},   // font-temario nº 118: El área de paso del filtro de una caldereta debe ser entre 1,5 y 2 veces la sección de la 
        {"t":"q","ref":"0qwdgw0"},   // font-temario nº 116: Para una intensidad pluviométrica de 150 mm/h, el factor de corrección de la superficie es
        {"t":"q","ref":"1wfvv64"},   // font-temario nº 117: Un canalón de sección cuadrangular debe ser, respecto al semicircular equivalente:
        {"t":"ex","h":"Sumideros y bajantes","p":"Tablas 4.6 y 4.8 del HS 5.","tab":{"h":["Superficie de cubierta (m²)","S < 100","100 ≤ S < 200","200 ≤ S < 500","S > 500"],"r":[["Número mínimo de sumideros","2","3","4","1 cada 150 m²"]]}},
        {"t":"q","ref":"1a393hv"},   // font-temario nº 115: Una cubierta de 150 m² necesita como mínimo:
        {"t":"num","q":"Cubierta de más de 500 m²: un sumidero cada cuántos m².","v":150,"u":"m²","e":"Tabla 4.6: más de 500 m², 1 sumidero cada 150 m²."},
        {"t":"match","q":"Empareja la superficie servida con el diámetro de la bajante (tabla 4.8).","pairs":[["65 m²","50 mm"],["177 m²","75 mm"],["580 m²","110 mm"],["2.700 m²","200 mm"]],"e":"Tabla 4.8: 65→50, 113→63, 177→75, 318→90, 580→110, 805→125, 1.544→160, 2.700→200."}
      ],
      sum: ["Caldereta: paso de 1,5 a 2 veces la sección.","Intensidad base 100 mm/h; f = i/100; canalón no semicircular +10 %.","Sumideros: 2, 3, 4 y 1 cada 150 m² por encima de 500 m²."] }
    ]},
    { n: 5, name: "Auditorías y verificaciones de suministro y evacuación", lessons: [
      { id: "fonta-5.1", apt: ["fonta-5.1"], title: "5.1. Marco normativo",
      cards: [
        {"t":"ex","h":"CTE y salubridad","p":"El CTE regula las exigencias básicas de calidad de los edificios en desarrollo de la <b>Ley 38/1999 de Ordenación de la Edificación</b>. El requisito de higiene, salud y protección del medio ambiente se llama, simplificando, <b>salubridad</b>: reducir a límites aceptables el riesgo de molestias o enfermedades de los usuarios y de deterioro del edificio y del entorno."},
        {"t":"q","ref":"1o3o6nh"},   // font-verif nº 1: El CTE regula las exigencias básicas de calidad de los edificios en desarrollo de la:
        {"t":"q","ref":"02ckqg7"},   // font-verif nº 2: El requisito básico de higiene, salud y protección del medio ambiente se denomina de forma
        {"t":"ex","h":"El DB HS y la auditoría","p":"El DB HS fija parámetros y procedimientos que aseguran las exigencias. La ONU reconoció en <b>2010</b> el agua potable y el saneamiento como derecho humano (ODS 6.2 y 6.3). HS 4: agua apta, caudales suficientes, sin retornos, con ahorro y ACS sin gérmenes patógenos. HS 5: residuales y pluviales. La propia normativa fija los criterios de auditoría: la secuencia de verificación.","fig":"f18"},
        {"t":"q","ref":"000smgs"},   // font-verif nº 9: Según el tema 5, en la verificación de fontanería y saneamiento es la propia normativa la 
        {"t":"q","ref":"12xxit2"},   // font-verif nº 6: ¿Cuál es el orden de la secuencia de verificación del HS 4 y del HS 5?
        {"t":"num","q":"¿En qué año reconoció la ONU el agua potable y el saneamiento como derecho humano?","v":2010,"u":"","e":"ONU, 2010 (ODS 6.2 y 6.3)."},
        {"t":"q","ref":"0y0ck0a"}   // font-verif nº 7: En la secuencia de verificación del HS 4, la puesta en servicio forma parte del cumplimien
      ],
      sum: ["CTE: desarrolla la Ley 38/1999 de Ordenación de la Edificación.","Salubridad = higiene, salud y protección del medio ambiente.","La normativa fija la auditoría: diseño, dimensionado, ejecución, productos y uso."] },
      { id: "fonta-5.2-1", apt: ["fonta-5.2"], title: "5.2. Suministro: propiedades a verificar",
      cards: [
        {"t":"ex","h":"Qué se verifica","p":"Calidad del agua según el <b>RD 3/2023</b>. Antirretornos después de contadores, en la base de ascendentes, antes del tratamiento, en alimentaciones no domésticas y antes de climatización. Caudales mínimos, presión mínima y máxima, ACS a 50–65 ºC; locales para grupos, tratamiento y contadores; señalización del agua no apta; contabilización y retorno de ACS (≥ 15 m); ahorro en pública concurrencia."},
        {"t":"ojo","p":"Agua de consumo: los temas 1 y 2 citan el RD 140/2003 y el tema 5 el RD 3/2023, que es el vigente. El test de Verificación pregunta por el RD 3/2023."},
        {"t":"q","ref":"0cb18ac"},   // font-verif nº 11: Según el tema 5, el agua de consumo debe cumplir actualmente el:
        {"t":"ojo","p":"Presión máxima: el tema 1 y el CTE DB HS 4 dicen 500 kPa; la diapositiva del tema 5 pone 550 kPa. En las preguntas se usa 500 kPa."},
        {"t":"num","q":"Presión máxima en cualquier punto de consumo (dato de las preguntas).","v":500,"u":"kPa","e":"En las preguntas se usa 500 kPa (el tema 5 dice 550)."},
        {"t":"q","ref":"0fm5coz"},   // font-verif nº 13: Antes de los aparatos de refrigeración o climatización debe instalarse un sistema antirret
        {"t":"q","ref":"0d9tipi"},   // font-verif nº 14: Al verificar las condiciones mínimas de suministro, la presión en un calentador debe ser a
        {"t":"q","ref":"1lhbjx5"}   // font-verif nº 18: Debe disponerse contabilización de agua fría y caliente para:
      ],
      sum: ["Agua de consumo: RD 3/2023 (vigente).","Se verifican antirretornos, caudales, presiones (máximo 500 kPa) y ACS a 50–65 ºC.","Contabilización de fría y caliente por unidad de consumo."] },
      { id: "fonta-5.2-2", apt: ["fonta-5.2"], title: "5.2. Suministro: grupos de presión",
      cards: [
        {"t":"ex","h":"Grupo convencional","p":"Depósito auxiliar (que la bomba no aspire de la red), <b>al menos dos bombas iguales en paralelo y de funcionamiento alterno</b> y <b>depósitos de presión con membrana</b> para el arranque y la parada automáticos. Las zonas que llegan con la presión de red no deben depender del grupo."},
        {"t":"q","ref":"0lnoyoc"},   // font-verif nº 20: Un grupo de presión convencional cuenta con depósito auxiliar, al menos dos bombas iguales
        {"t":"ex","h":"Caudal variable y local","p":"El de caudal variable puede prescindir del depósito auxiliar y lleva <b>variador de frecuencia</b> que mantiene constante la presión de salida. Los grupos van en local de uso exclusivo (puede alojar también el tratamiento). Esquema: con contador general único o con contadores aislados."},
        {"t":"q","ref":"12k6nvp"},   // font-verif nº 21: El grupo de presión de caudal variable puede prescindir del depósito auxiliar y lleva:
        {"t":"q","ref":"1xrh3o2"},   // font-verif nº 22: El grupo de presión debe permitir abastecer con presión de red las zonas que lo admitan si
        {"t":"q","ref":"1km6yyb"},   // font-verif nº 23: Los grupos de presión se instalan en un local de uso exclusivo que puede albergar también:
        {"t":"q","ref":"1m67ada"}   // font-verif nº 19: El esquema general de la instalación puede ser de red con contador general único o de red 
      ],
      sum: ["Convencional: depósito auxiliar, ≥ 2 bombas alternas y depósitos de membrana.","Caudal variable: variador de frecuencia, puede no llevar depósito auxiliar.","Local exclusivo, que puede alojar el tratamiento."] },
      { id: "fonta-5.3", apt: ["fonta-5.3"], title: "5.3. Suministro: pruebas y mantenimiento",
      cards: [
        {"t":"ex","h":"Prueba de resistencia y estanquidad","p":"A cargo de la <b>empresa instaladora</b>: metálicas por UNE 100151:1988 (hoy UNE-EN 14336:2005); termoplásticas y multicapa por UNE-CEN/TR 12108:2015 IN. Se repite con la grifería y los aparatos conectados."},
        {"t":"ojo","p":"Prueba de tuberías metálicas: UNE 100151:1988, que el tema 5 indica sustituida por la UNE-EN 14336:2005. El test de Verificación pregunta por la UNE-EN 14336. Termoplásticas y multicapa: procedimiento A de la UNE-CEN/TR 12108:2015 IN."},
        {"t":"q","ref":"16iy9wt"},   // font-verif nº 28: Las tuberías metálicas se prueban según la norma (actualizada en el tema 5):
        {"t":"q","ref":"06thvl9"},   // font-verif nº 30: Tras la primera prueba, la instalación se vuelve a probar:
        {"t":"ex","h":"ACS, interrupción y mantenimiento","p":"Pruebas particulares de ACS (las cinco del tema 2) y retorno obligatorio a partir de 15 m, en producción individual o centralizada. Interrupción y nueva puesta en servicio igual que en el tema 2 (4 semanas, 6 meses, 1 año). Mantenimiento según el <b>RD 487/2022</b> de prevención de la legionelosis."},
        {"t":"ojo","p":"Legionela: el tema 2 cita el RD 865/2003 y el tema 5 el RD 487/2022, que es el vigente. El test de Verificación pregunta por el RD 487/2022."},
        {"t":"q","ref":"1ua893g"},   // font-verif nº 46: Según el tema 5, las operaciones de mantenimiento de fontanería deben recoger las prescrip
        {"t":"q","ref":"1ln8f9f"},   // font-verif nº 38: ¿Cuál NO es una prueba particular de ACS del HS 4?
        {"t":"fill","q":"Completa los plazos de interrupción del servicio.","items":["Sin poner en servicio {} después de terminar: cerrar y vaciar","Fuera de servicio más de {}: cerrar y vaciar","Acometida sin uso durante {}: taponar"],"ans":["4 semanas","6 meses","1 año"],"dis":["2 semanas","3 meses"],"e":"Temas 2 y 5: 4 semanas, 6 meses y 1 año."}
      ],
      sum: ["Prueba a cargo de la instaladora; metálicas por UNE-EN 14336 (antes UNE 100151).","Se repite con grifería y aparatos conectados.","Interrupción: 4 semanas, 6 meses, 1 año.","Mantenimiento según el RD 487/2022 (legionela)."] },
      { id: "fonta-5.4", apt: ["fonta-5.4"], title: "5.4. Saneamiento: diseño a verificar",
      cards: [
        {"t":"ex","h":"Qué se comprueba","p":"Cierres hidráulicos, red de pequeña evacuación, bajantes y colectores con los criterios del tema 4: alturas de cierre, 2 m del bote a la bajante, 2,5 m y 2–4 % de las derivaciones, 4 m y 2,5–5 % con sifón individual, ≤ 10 % en duchas, manguetón ≤ 1 m, rebosaderos, uniones ≥ 45º, pendientes de 1 % y 2 % en colectores, registros cada 15 m."},
        {"t":"fill","q":"Completa las distancias máximas que se verifican.","items":["Bote sifónico a bajante: ≤ {} m","Derivaciones al bote: ≤ {} m","Lavabo con sifón individual a bajante: ≤ {} m","Manguetón del inodoro: ≤ {} m"],"ans":["2","2,5","4","1"],"dis":["3","1,5"],"e":"Criterios del tema 4 que repite el 5.4."},
        {"t":"q","ref":"0ty3lkm"},   // font-verif nº 61: En los tramos rectos de colectores, la distancia máxima entre registros es:
        {"t":"q","ref":"10aw45v"},   // font-verif nº 64: La pendiente mínima de un colector enterrado es del:
        {"t":"q","q":"Al verificar los colectores se comprueban pendientes mínimas de:","o":["1 % colgados y 2 % enterrados","2 % colgados y 1 % enterrados","4 % en ambos"],"c":0,"e":"Colector colgado ≥ 1 %; enterrado ≥ 2 %."}
      ],
      sum: ["Se verifica con los criterios del tema 4.","Bote 2 m; derivaciones 2,5 m y 2–4 %; sifón individual 4 m y 2,5–5 %.","Colectores 1 % colgados y 2 % enterrados; registros cada 15 m."] },
      { id: "fonta-5.5-1", apt: ["fonta-5.5"], title: "5.5. Pruebas de estanqueidad parciales",
      cards: [
        {"t":"ex","h":"Pruebas parciales (con agua)","p":"Cada una con su criterio.","tab":{"h":["Prueba","Cómo se hace","Criterio"],"r":[["Aparatos","Descargar cada aparato aislado o a la vez; tiempos, sifonado, ruidos","Cierre hidráulico que quede ≥ 25 mm"],["Vaciado","Grifos con caudal mínimo y válvula de desagüe abierta","No se acumula agua en 1 minuto"],["Red horizontal","Cada tramo con agua a 0,3–0,6 bar durante 10 min","Estanco"],["Arquetas y pozos","Llenos de agua","Sin descenso de nivel"],["Uniones","Uniones, entronques y derivaciones","Control al 100 %"]]}},
        {"t":"q","ref":"0lwk6uu"},   // font-verif nº 65: Las pruebas de estanqueidad parcial se realizan con:
        {"t":"q","ref":"0bzmcty"},   // font-verif nº 66: En la prueba de aparatos no se admite que quede en el sifón una altura de cierre hidráulic
        {"t":"num","q":"Duración de la prueba de cada tramo de la red horizontal.","v":10,"u":"min","e":"Red horizontal: 0,3–0,6 bar durante 10 min."},
        {"t":"q","ref":"05c75aw"},   // font-verif nº 68: En la prueba de vaciado, con los grifos al caudal mínimo y la válvula de desagüe abierta, 
        {"t":"match","q":"Empareja cada prueba parcial con su criterio.","pairs":[["Aparatos","Cierre que quede ≥ 25 mm"],["Vaciado","Sin acumulación en 1 minuto"],["Red horizontal","0,3–0,6 bar durante 10 min"],["Arquetas y pozos","Sin descenso de nivel"],["Uniones","Control al 100 %"]],"e":"Tabla del apartado 5.5."}
      ],
      sum: ["Parciales con agua.","Aparatos: cierre ≥ 25 mm; vaciado: 1 minuto.","Red horizontal: 0,3–0,6 bar 10 min; uniones al 100 %."] },
      { id: "fonta-5.5-2", apt: ["fonta-5.5"], title: "5.5. Pruebas de estanqueidad totales",
      cards: [
        {"t":"ex","h":"Pruebas totales","p":"Sobre el sistema total, de una vez o por partes.","tab":{"h":["Prueba","Cómo se hace","Criterio"],"r":[["Con agua","Residuales y pluviales; terminales taponados salvo los de cubierta; llenar hasta rebosar","0,3–1 bar (por partes 0,3–0,6 bar); ninguna unión pierde agua"],["Con aire","Igual que con agua","0,5–1 bar; presión constante 3 minutos"],["Con humo","Red de residuales y su ventilación; humo espeso y con olor por la parte baja, con los cierres llenos; tapar terminales de cubierta al salir humo","250 Pa (resiste ± 250 Pa); sin humo ni olor dentro del edificio"]]},"fig":"f19"},
        {"t":"q","ref":"05n7ghw"},   // font-verif nº 75: En la prueba total con agua, la presión en cualquier punto debe estar entre:
        {"t":"q","ref":"0dtimtv"},   // font-verif nº 81: La prueba con aire es satisfactoria si la presión se mantiene constante durante:
        {"t":"q","ref":"18r1lxu"},   // font-verif nº 84: En la prueba con humo, cuando aparece humo por los terminales de cubierta se taponan para 
        {"t":"ex","h":"Por fases","p":"Las pruebas de estanqueidad total se hacen sobre el sistema total, de una vez o por partes. Si la altura equivale a <b>más de 1 bar</b>, se prueba por fases en vertical."},
        {"t":"q","ref":"00y261o"},   // font-verif nº 76: Si la altura equivalente del sistema supera 1 bar, la prueba con agua se hace:
        {"t":"num","q":"Presión máxima de la prueba total con aire.","v":1,"u":"bar","e":"Prueba con aire: 0,5–1 bar y presión constante 3 minutos."},
        {"t":"q","ref":"128jz13"},   // font-verif nº 82: La prueba con humo se efectúa sobre la red de:
        {"t":"q","ref":"1txfeug"}   // font-verif nº 86: El humo de la prueba debe ser espeso y de olor fuerte.
      ],
      sum: ["Agua: 0,3–1 bar (por partes 0,3–0,6); ninguna unión pierde.","Aire: 0,5–1 bar constante 3 minutos.","Humo: por la parte baja, 250 Pa, sin humo ni olor dentro.","Más de 1 bar de altura: por fases en vertical."] },
      { id: "fonta-5.6", apt: ["fonta-5.6"], title: "5.6. Saneamiento: mantenimiento y conservación",
      cards: [
        {"t":"ex","h":"Mantenimiento","p":"Comprobar periódicamente estanqueidad, olores y elementos; <b>desatascar sifones y válvulas cuando baje el caudal</b>. Mantener siempre agua en sumideros, botes sifónicos y sifones para evitar olores. Limpieza y revisión: cada 6 meses, cada año y cada 10 años, según el elemento."},
        {"t":"q","ref":"1j497kg"},   // font-verif nº 93: Para evitar malos olores, en sumideros, botes sifónicos y sifones debe mantenerse:
        {"t":"q","ref":"0bleny3"},   // font-verif nº 92: Los sifones y válvulas se revisan y desatascan:
        {"t":"img","fig":"f20","q":"Según la figura, ¿cada cuánto se limpian las arquetas a pie de bajante, de paso y sifónicas?","o":["Cada 10 años","Cada año","Cada 6 meses"],"c":0,"e":"Arquetas a pie de bajante, de paso y sifónicas: cada 10 años (antes si hay olores)."},
        {"t":"q","ref":"1aikddr"},   // font-verif nº 87: Los sumideros de locales húmedos, cubiertas transitables y los botes sifónicos se limpian 
        {"t":"q","ref":"0ofwwxz"}   // font-verif nº 89: Los colectores suspendidos se revisan:
      ],
      sum: ["Desatascar sifones y válvulas cuando baje el caudal; agua siempre en los cierres.","6 meses: sumideros de locales húmedos y cubiertas transitables, botes, separador de grasas.","1 año: cubiertas no transitables, colectores suspendidos, pozos; 10 años: arquetas."] }
    ]}
  ],
  // Parte 2: chuleta [concepto, dato]
  cheat: [
    ["Presión mínima en grifos comunes / fluxores y calentadores","100 kPa / 150 kPa"],
    ["Presión máxima en un punto de consumo","500 kPa (el tema 5 dice 550)"],
    ["Temperatura de ACS en los puntos de consumo","50–65 ºC (salvo vivienda exclusiva)"],
    ["Materiales resistentes hasta","40 ºC"],
    ["Red de retorno de ACS obligatoria","Ida al punto más alejado ≥ 15 m"],
    ["Caída de temperatura de ACS en el grifo más alejado","≤ 3 ºC"],
    ["Retorno: caudal mínimo por columna / regla / diámetro","250 l/h / 10 % / Ø int. ≥ 16 mm"],
    ["Velocidad en tubos metálicos / termoplásticos y multicapa","0,5–2 m/s / 0,5–3,5 m/s"],
    ["Pérdidas localizadas estimadas","20–30 % de las de longitud real"],
    ["Dilatadores","Tramos rectos > 25 m"],
    ["Depósito auxiliar","V = Q·t·60, t = 15–20 min"],
    ["Nº de bombas (sin reserva)","2 (≤ 10 dm³/s), 3 (≤ 30), 4 (> 30)"],
    ["Presión máxima del grupo","2–3 bar por encima de la mínima"],
    ["Golpe de ariete positivo / negativo","≤ 2 bar / ≥ 50 % presión de servicio"],
    ["Pasatubos vertical visto","Sobresale ≥ 3 cm"],
    ["Manómetro de la prueba","Aprecia ≥ 0,1 bar"],
    ["Válvulas y llaves","10 bar"],
    ["Descalcificador","80 l por persona y día"],
    ["Cloruros: galvanizado agresivo / inoxidable 304","> 250 mg/l / ≤ 200 mg/l"],
    ["Cobre: agua agresiva","pH < 6,5 y CO₂ alto (índice de Lucey)"],
    ["Revestimiento del cobre enterrado o empotrado","Plástico"],
    ["Interrupción del servicio","4 semanas sin estrenar o > 6 meses parado → vaciar; acometida 1 año → taponar"],
    ["Perlizador / temporizado / doble pulsación","20 % / 30 % / 50 %"],
    ["Reutilización de aguas","RD 1620/2007; nunca para consumo humano"],
    ["Unidad de desagüe (UD)","0,47 dm³/s; continuos: 1 UD por 0,03 dm³/s"],
    ["Altura de cierre: continuo / discontinuo / máximo","50 / 70 / 100 mm"],
    ["Corona del sifón","≤ 60 cm bajo la válvula"],
    ["Bote sifónico a bajante / derivaciones al bote","≤ 2 m / ≤ 2,5 m con 2–4 %"],
    ["Lavabo, bidé, fregadero (sifón individual)","≤ 4 m, 2,5–5 %"],
    ["Bañera y ducha","Pendiente ≤ 10 %"],
    ["Manguetón del inodoro","≤ 1 m"],
    ["Unión de desagües a bajante","≥ 45º"],
    ["Colector colgado / enterrado","≥ 1 % / ≥ 2 %"],
    ["Registros en colectores","Cada ≤ 15 m"],
    ["Pozo de resalto","Desnivel > 1 m"],
    ["Arqueta de paso","Máximo 3 colectores"],
    ["Bombeo","≥ 2 bombas; 24 h de autonomía"],
    ["Bajantes de residuales","± 250 Pa y ≤ 1/3 de la sección"],
    ["Colectores de residuales / pluviales","Media sección (máx. ¾) / sección llena"],
    ["Desviación de bajante > 45º","Como colector al 4 %"],
    ["Caldereta","Paso 1,5–2 veces la sección"],
    ["Pluviales: intensidad base y corrección","100 mm/h; f = i/100"],
    ["Sumideros mínimos","2 (< 100 m²), 3, 4, 1 cada 150 m² (> 500 m²)"],
    ["Prueba parcial: cierre / vaciado / red horizontal","≥ 25 mm / 1 min / 0,3–0,6 bar 10 min"],
    ["Prueba total con agua / aire / humo","0,3–1 bar / 0,5–1 bar 3 min / 250 Pa"],
    ["Mantenimiento saneamiento","6 meses: sumideros húmedos, botes, separador; 1 año: cubiertas no transitables, colectores, pozos; 10 años: arquetas"],
    ["Normas de prueba de tuberías","Metálicas UNE 100151 (hoy UNE-EN 14336); plásticas UNE-CEN/TR 12108"],
    ["Legionela / agua de consumo (vigentes)","RD 487/2022 / RD 3/2023"]
  ]
};
