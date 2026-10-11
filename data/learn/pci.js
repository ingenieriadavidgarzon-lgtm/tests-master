// Aprender · Protección contra incendios (PCI).
// Contenido sacado SOLO de PCI_TEMARIO (partes 0, 1 y 2) y de los bancos de preguntas de PCI de data/inst.js.
// Formato y cómo añadir otro tema: README, «Cómo añadir el módulo Aprender a un tema». Comprobación: node tools/check-learn.js
window.LEARN = window.LEARN || {};
window.LEARN.pci = {
  tema: "pci", name: "Protección contra incendios",
  source: "PCI_TEMARIO (temario de estudio, unidad 4, temas 1 a 5)",
  base: "assets/learn/pci/",
  // Parte 0 resumida
  howAsks: [
    "Parcial del 21-02-2026: 20 preguntas en 20 minutos. Acierto +0,5, fallo −0,25, en blanco 0.",
    "Tres opciones (A, B, C) o verdadero/falso; la C suele ser «A y B son correctas» o «A y B son incorrectas».",
    "Preguntas literales de las diapositivas: definiciones, umbrales y qué norma aplica (CTE, RD 2267/2004, RIPCI).",
    "Las trampas cambian un número (500 por 1.000 personas; 0,5 m² por 1 m²) o una palabra (exutorios «en puntos bajos»).",
    "Si dudas entre las tres, déjala en blanco; si puedes descartar una, compensa contestar.",
    "Memoriza cada número con su contexto: 25 m pulsador, 15 m extintor, 50 m entre BIE, 5 m BIE-salida."
  ],
  // figuras: archivo, ancho, alto, texto alternativo y pie
  figs: {
    f01: {"src":"fig01.webp","w":1200,"h":476,"alt":"Escala logarítmica de la velocidad de propagación de la llama, dividida en tres zonas: combustión por debajo de 1 m/s, deflagración entre 1 m/s y unos 340 m/s (la velocidad del sonido) y detonación por encima.","cap":"Figura 1. Clasificación de la reacción según la velocidad de propagación (pregunta 1 del examen)."},
    f02: {"src":"fig02.webp","w":1200,"h":568,"alt":"Esquema: un edificio no industrial va al CTE DB SI (RD 732/2019), cuya sección SI 4 fija qué instalaciones; un establecimiento industrial va al RSCIEI (RD 2267/2004), autocontenido por tipo y riesgo intrínseco. Ambos llevan al RIPCI (RD 513/2017), que fija diseño, instalación, mantenimiento e inspección.","cap":"Figura 2. Qué norma fija qué: dotación (CTE o RSCIEI) y diseño y mantenimiento (RIPCI)."},
    f03: {"src":"fig03.webp","w":1200,"h":449,"alt":"Tres recuadros: R, capacidad portante (el elemento sigue soportando su carga); E, integridad (no deja pasar llamas ni gases); I, aislamiento (limita el calentamiento de la cara no expuesta). Debajo: EI 90 es integridad y aislamiento durante 90 minutos (UNE-EN 13501-2).","cap":"Figura 3. Significado de R, E e I en la clasificación de resistencia al fuego."},
    f04: {"src":"fig04.webp","w":1200,"h":381,"alt":"Escala de colores de las clases A1, A2, B, C, D, E y F, con una flecha de más contribución al fuego; F es sin ensayar. Encima, los indicadores de humo (s1 baja, s2 media, s3 alta) y de gotas (d0 ninguna, d1 no inflamadas, d2 inflamadas).","cap":"Figura 4. Escala de reacción al fuego e indicadores de humo y gotas."},
    f05: {"src":"fig05.webp","w":1200,"h":420,"alt":"Cinco dibujos de establecimientos industriales: A, parte de un edificio; B, edificio adosado o a 3 m o menos; C, edificio aislado a más de 3 m; D, espacio abierto que puede ir todo cubierto; E, abierto y cubierto hasta el 50 %.","cap":"Figura 5. Configuración de los establecimientos industriales (tipos A a E)."},
    f06: {"src":"fig06.webp","w":1200,"h":693,"alt":"Barra con los niveles de riesgo intrínseco 1 a 8 sobre la densidad de carga de fuego Qs en MJ/m²: bajo 1 y 2 hasta 425 y 850; medio 3, 4 y 5 hasta 1.275, 1.700 y 3.400; alto 6, 7 y 8 hasta 6.800, 13.600 y por encima. Debajo, la fórmula Qs = Σ(qvi·hi·si·Ci)·Ra / A.","cap":"Figura 6. Niveles de riesgo intrínseco según la densidad de carga de fuego (escala comprimida)."},
    f07: {"src":"fig07.webp","w":1200,"h":472,"alt":"Gráfico de barras de la superficie máxima de sector en m² por tipo A, B y C: medio 4, 400, 3.000 y 4.000; medio 5, 300, 2.500 y 3.500; alto 6, no, 2.000 y 3.000; alto 7, no, 1.500 y 2.500; alto 8, no, no y 2.000.","cap":"Figura 7. Superficie máxima de sector por tipo de establecimiento y nivel de riesgo."},
    f08: {"src":"fig08.webp","w":1200,"h":492,"alt":"Curva de temperatura frente al tiempo en tres fases: humos invisibles, humo visible y llamas y calor. Flechas indican dónde actúa cada detector: iónico y aspiración en los humos invisibles, óptico en el humo visible, y térmico y de llama en la fase de llamas y calor.","cap":"Figura 8. Fases del incendio y en cuál actúa antes cada tipo de detector (esquemático)."},
    f09: {"src":"fig09.webp","w":1200,"h":451,"alt":"A la izquierda, una central con tres líneas de detectores Z1, Z2 y Z3: la alarma dice «zona 2». A la derecha, una central con un lazo cerrado de detectores numerados del 01 al 08: la alarma dice «detector 03».","cap":"Figura 9. Sistema convencional (por zonas) frente a analógico (direccionable)."},
    f10: {"src":"fig10.webp","w":1200,"h":417,"alt":"Dos gráficos de barras según la UNE 23007-14 con techos de pendiente de 20° o menos. Superficie vigilada: humo 80, 60 y 80 m²; calor 30 y 20 m². Distancia máxima: humo 6,3, 5,5 y 6,3 m; calor 3,9 y 3,2 m.","cap":"Figura 10. Cobertura de los detectores puntuales según la UNE 23007-14."},
    f11: {"src":"fig11.webp","w":1200,"h":552,"alt":"Triángulo del fuego con calor, combustible y comburente (O₂); al lado, «+ reacción en cadena = tetraedro» y las formas de extinción: quitar calor (enfriamiento, clase A), quitar oxígeno (sofocación, B y C) y cortar la reacción (inhibición, polvo).","cap":"Figura 11. Triángulo y tetraedro del fuego y formas de extinción."},
    f12: {"src":"fig12.webp","w":1200,"h":405,"alt":"Seis fichas de clases de fuego: A sólidos (agua, espuma, polvo ABC); B líquidos (CO₂, polvo, espuma); C gases (sofocación, polvo); D metales (polvo especial); E eléctricos (CO₂, polvo, no agua); F/K aceites de cocina (agente húmedo).","cap":"Figura 12. Clases de fuego y agentes adecuados."},
    f13: {"src":"fig13.webp","w":1200,"h":474,"alt":"Esquema: depósito (100 % del volumen) que alimenta una bomba eléctrica, una bomba diésel y una jockey; estas van a la red general, que alimenta BIE, rociadores e hidrantes. Pie: UNE 23500, caudal, presión y autonomía, categoría y clase; BIE más rociadores, categoría II.","cap":"Figura 13. Esquema de un abastecimiento de agua contra incendios."},
    f14: {"src":"fig14.webp","w":1200,"h":600,"alt":"Curva de una bomba: presión en % de la nominal frente al caudal en % del nominal. Es máxima a válvula cerrada y baja al subir el caudal. Marca el punto nominal y un punto en el 140 % del caudal con al menos el 70 % de la presión. Límite de 15 bar.","cap":"Figura 14. Condición del grupo de bombeo: 140 % del caudal a al menos el 70 % de la presión."},
    f15: {"src":"fig15.webp","w":1200,"h":618,"alt":"Hidrante con un círculo discontinuo de radio 40 m que abarca parte del edificio protegido, situado a 5 m o más de la fachada. Texto: 500 l/min por boca, salida de 100 mm, 500 kPa (100 kPa si solo llena camiones).","cap":"Figura 15. Criterios de ubicación de un hidrante en ámbito industrial."},
    f16: {"src":"fig16.webp","w":1200,"h":521,"alt":"Planta de un sector de incendio con dos BIE separadas como máximo 50 m, cada una con un radio igual a la manguera más 5 m, y una a 5 m o menos de la salida. Al lado, la comparación: 25 mm, semirrígida de 20 m, 100 l/min, riesgo bajo; 45 mm, plana de 20 m, 200 l/min, riesgo medio y alto; 3,5 bar en punta de lanza; red de 2 BIE durante 1 h a 300–600 kPa.","cap":"Figura 16. Distribución de BIE en un sector y comparación entre 25 y 45 mm."},
    f17: {"src":"fig17.webp","w":1200,"h":709,"alt":"Alzado de un edificio de planta baja a planta 9 con la columna seca: toma IPF-41 de 70 mm en fachada, salidas IPF-39 de 45 mm en las plantas 2, 4, 6, 8 y 9 y dos barras horizontales oscuras en las plantas 4 y 8. Texto: DN 80 de acero galvanizado, prueba a 20 bar 2 h, salidas cada 2 plantas hasta la 8.ª, seccionamiento cada 4 plantas, uso exclusivo de bomberos.","cap":"Figura 17. Esquema de una columna seca (salidas representadas a partir de la planta 2)."},
    f18: {"src":"fig18.webp","w":1200,"h":451,"alt":"Cuatro recuadros: flotabilidad (techos altos, UNE 23585 / 23584); presurización (vías de evacuación, UNE-EN 12101-6); ventilación horizontal (túneles y aparcamientos, sin UNE-EN, CFD); extracción (aparcamientos y tras la supresión, renovaciones por hora).","cap":"Figura 18. Las cuatro estrategias de control de humo y su norma."},
    f19: {"src":"fig19.webp","w":1200,"h":427,"alt":"Tres recuadros: hueco al exterior de al menos 1 m² por planta; conductos exclusivos de 50 cm²/m³ con entrada a menos de 1 m y salida a más de 1,8 m; presión diferencial según UNE-EN 12101-6. Nota: trampas del examen, 0,5 m² (falso) y conductos compartidos con la ventilación general (falso).","cap":"Figura 19. Tres formas de ventilar una escalera protegida (pregunta 18 del examen)."},
    f20: {"src":"fig20.webp","w":1200,"h":584,"alt":"Escalera presurizada junto al área de alojamiento: un ventilador de impulsión mete aire en la escalera, el aire pasa a 0,75 m/s o más hacia la planta del fuego y sale por el escape de esa planta. Texto: puertas abiertas 10 Pa, cerradas 50 Pa, apertura de 100 N o menos; caudal, el mayor entre fugas × 1,5 y puertas abiertas + 15 %; al activarse se paran los climatizadores.","cap":"Figura 20. Criterios de diseño de una escalera presurizada."},
    f21: {"src":"fig21.webp","w":1200,"h":451,"alt":"Cuatro recuadros: trimestral y semestral, titular, mantenedora o fabricante; anual y quinquenal, mantenedora o fabricante. Debajo: actas según UNE 23580 a disposición de la CCAA al menos 5 años; señalización luminiscente anual, también el titular; vida útil de detectores y señales, la del fabricante o 10 años.","cap":"Figura 21. Quién puede hacer cada programa de mantenimiento del RIPCI."},
    f22: {"src":"fig22.webp","w":1200,"h":454,"alt":"Barras horizontales de periodicidad máxima de inspección por organismo de control: RSCIEI riesgo alto 2 años, medio 3 años, bajo 5 años; RIPCI (no industrial) 10 años.","cap":"Figura 22. Periodicidad máxima de inspección según el reglamento y el riesgo."}
  },
  temas: [
    { n: 1, name: "Alcance y normativa de protección contra incendios", lessons: [
      { id: "pci-1.1", apt: ["pci-1.1"], title: "1.1. El fuego y su velocidad",
      cards: [
        {"t":"ex","h":"Qué es el fuego","p":"El fuego es una <b>reacción química de combustión</b> que emite luz, calor y humo. Se clasifica según la velocidad de propagación de la llama.","tab":{"h":["Tipo","Velocidad de propagación"],"r":[["Combustión","Menor de 1 m/s"],["Deflagración","Entre 1 m/s y la velocidad del sonido"],["Detonación","Mayor que la velocidad del sonido"]]},"fig":"f01"},
        {"t":"q","ref":"0e1teyd"},   // pci-temario nº 1: La combustión es cuando la velocidad de propagación es:
        {"t":"order","q":"Ordena de menor a mayor velocidad de propagación de la llama.","items":["Combustión","Deflagración","Detonación"],"e":"Combustión, menos de 1 m/s; deflagración, entre 1 m/s y la velocidad del sonido; detonación, por encima de la velocidad del sonido."},
        {"t":"num","q":"¿A partir de qué velocidad de propagación deja de ser combustión y pasa a ser deflagración?","v":1,"u":"m/s","e":"La combustión es por debajo de 1 m/s. La deflagración va de 1 m/s a la velocidad del sonido."},
        {"t":"notin","q":"¿Cuál NO es uno de los tres tipos de reacción según la velocidad de propagación?","o":["Combustión","Deflagración","Detonación","Explosión"],"c":3,"e":"El temario solo distingue tres tipos: combustión, deflagración y detonación."},
        {"t":"ex","h":"Prevención, protección y quién fija qué","p":"Hay medidas de <b>prevención</b> (evitar que empiece) y de <b>protección</b> (limitar la propagación y las consecuencias); la unidad trata las segundas. En edificio terciario, la <b>dotación</b> la fija el <b>CTE DB SI 4</b>, y el <b>diseño, montaje y mantenimiento</b> los fija el <b>RIPCI</b>."},
        {"t":"img","fig":"f02","q":"En el esquema, ¿qué reglamento recibe tanto los edificios no industriales como los establecimientos industriales para el diseño, la instalación, el mantenimiento y la inspección?","o":["El RIPCI (RD 513/2017)","El CTE DB SI (RD 732/2019)","El RSCIEI (RD 2267/2004)"],"c":0,"e":"El CTE (no industrial) o el RSCIEI (industrial) fijan la dotación; el RIPCI fija cómo se diseña, instala, mantiene e inspecciona en los dos casos."},
        {"t":"match","q":"Empareja cada concepto con lo que hace.","pairs":[["Prevención","Evitar que el incendio empiece"],["Protección","Limitar la propagación y las consecuencias"],["CTE DB SI 4","Dotación en edificio terciario"],["RIPCI","Diseño, montaje y mantenimiento"]],"e":"Prevención evita que empiece; protección limita propagación y consecuencias. En terciario, el CTE DB SI 4 fija la dotación y el RIPCI el diseño, montaje y mantenimiento."},
        {"t":"fill","q":"Completa: en un edificio terciario…","items":["La dotación de instalaciones la fija el CTE DB {}","El diseño, montaje y mantenimiento los fija el {}"],"ans":["SI 4","RIPCI"],"dis":["SI 3","RSCIEI","RD 2267/2004"],"e":"Dotación: CTE DB SI 4. Diseño, montaje y mantenimiento: RIPCI. El RSCIEI (RD 2267/2004) es para establecimientos industriales."},
        {"t":"q","ref":"0ipkoqy"}   // pci-temario nº 29: En un edificio terciario, el diseño, montaje y mantenimiento de las instalaciones activas 
      ],
      sum: ["Combustión, menos de 1 m/s; deflagración, de 1 m/s a la velocidad del sonido; detonación, por encima.","La unidad trata las medidas de protección, no las de prevención.","En terciario: dotación, CTE DB SI 4; diseño, montaje y mantenimiento, RIPCI."] },
      { id: "pci-1.2", apt: ["pci-1.2"], title: "1.2. Sector de incendio y local de riesgo especial",
      cards: [
        {"t":"ex","h":"Sector de incendio","p":"<b>Sector de incendio</b>: espacio separado por elementos resistentes al fuego durante un tiempo, que confina el incendio. Objetivos: minimizar daños y dificultar el paso de fuego y humo. La <b>sectorización</b> es una medida de protección <b>pasiva</b>."},
        {"t":"q","ref":"0wbjcw9"},   // pci-temario nº 2: La sectorización es una medida de protección contra incendios:
        {"t":"notin","q":"¿Cuál NO es un objetivo del sector de incendio según el temario?","o":["Minimizar daños","Dificultar el paso de fuego y humo","Confinar el incendio","Extinguir el incendio automáticamente"],"c":3,"e":"El sector confina el incendio para minimizar daños y dificultar el paso de fuego y humo. Extinguir es cosa de la protección activa."},
        {"t":"ex","h":"Local de riesgo especial","p":"<b>Local de riesgo especial</b>: por su uso tiene riesgo de inicio de incendio o alberga instalaciones reguladas (transformadores, contadores…). <b>No se considera sector de incendio.</b>"},
        {"t":"q","ref":"0im6mmr"}   // pci-temario nº 22: Un local de riesgo especial se considera sector de incendio.
      ],
      sum: ["El sector de incendio confina el incendio con elementos resistentes al fuego durante un tiempo.","La sectorización es protección pasiva.","Un local de riesgo especial no es un sector de incendio."] },
      { id: "pci-1.3-1", apt: ["pci-1.3"], title: "1.3. Resistencia al fuego",
      cards: [
        {"t":"ex","h":"Resistencia al fuego (UNE-EN 13501-2)","p":"Tiempo que un elemento mantiene su función. Símbolos seguidos de minutos: <b>R</b> capacidad portante, <b>E</b> integridad, <b>I</b> aislamiento térmico (limita el calentamiento de la cara no expuesta).","fig":"f03"},
        {"t":"q","ref":"0l0kzid"},   // pci-temario nº 23: En la clasificación de resistencia al fuego, la letra I indica:
        {"t":"match","q":"Empareja cada símbolo con su significado.","pairs":[["R","Capacidad portante"],["E","Integridad"],["I","Aislamiento térmico"],["EI 90","Integridad y aislamiento durante 90 minutos"]],"e":"UNE-EN 13501-2: R capacidad portante, E integridad, I aislamiento. El número son los minutos."},
        {"t":"ex","h":"Tabla 1.2 DB SI 1: paredes y techos entre sectores","p":"Depende del uso y de la altura de evacuación h.","tab":{"h":["Uso","Bajo rasante","h ≤ 15 m","15 < h ≤ 28 m","h > 28 m"],"r":[["Residencial vivienda, residencial público, docente, administrativo","EI 120","EI 60","EI 90","EI 120"],["Comercial, pública concurrencia, hospitalario","EI 120","EI 90","EI 120","EI 180"],["Aparcamiento","EI 120","EI 120","EI 120","EI 120"]]}},
        {"t":"num","q":"Pared entre sectores de un edificio docente con altura de evacuación de 20 m: ¿cuántos minutos EI exige la tabla 1.2?","v":90,"u":"min","e":"Docente con 15 < h ≤ 28 m: EI 90."},
        {"t":"ex","h":"Puertas entre sectores","p":"Las puertas entre sectores son <b>EI₂ t-C5</b>, con <b>t la mitad</b> del tiempo exigido a la pared, o <b>la cuarta parte</b> si hay vestíbulo de independencia."},
        {"t":"num","q":"Pared EI 120 entre sectores, sin vestíbulo de independencia: ¿cuántos minutos t debe tener la puerta EI₂ t-C5?","v":60,"u":"min","e":"Sin vestíbulo, t es la mitad del tiempo de la pared: 120 / 2 = 60 min."},
        {"t":"q","q":"Con vestíbulo de independencia, la puerta entre sectores de una pared EI 120 debe ser:","o":["EI₂ 30-C5","EI₂ 60-C5","EI₂ 120-C5"],"c":0,"e":"Con vestíbulo de independencia, t es la cuarta parte del tiempo de la pared: 120 / 4 = 30 min."}
      ],
      sum: ["Resistencia (UNE-EN 13501-2): R portante, E integridad, I aislamiento, seguidos de minutos.","Tabla 1.2 DB SI 1: depende del uso y de la altura de evacuación; aparcamiento siempre EI 120.","Puertas entre sectores: EI₂ t-C5, t la mitad de la pared (la cuarta parte con vestíbulo de independencia)."] },
      { id: "pci-1.3-2", apt: ["pci-1.3"], title: "1.3. Reacción al fuego",
      cards: [
        {"t":"ex","h":"Reacción al fuego (UNE-EN 13501-1)","p":"Cómo contribuye un producto al fuego con su propia descomposición. <b>No confundir con resistencia.</b>","tab":{"h":["Clase","Contribución","Ejemplo del temario"],"r":[["A1","No contribuye","Cerámica, hormigón, hierro"],["A2","No contribuye de forma importante","Como A1 con algo de materia orgánica"],["B","Muy baja","Placa de yeso, madera tratada"],["C","Limitada","Espumas fenólicas"],["D","Media","Madera sin protección"],["E","Alta","Aislamientos plásticos o de fibras"],["F","Sin clasificar","No ensayado"]]},"fig":"f04"},
        {"t":"q","ref":"093hgk2"},   // pci-temario nº 26: No se debe confundir la reacción al fuego con la resistencia al fuego.
        {"t":"match","q":"Empareja cada material con su clase de reacción al fuego.","pairs":[["Cerámica, hormigón, hierro","A1"],["Placa de yeso, madera tratada","B"],["Espumas fenólicas","C"],["Madera sin protección","D"],["Aislamientos plásticos o de fibras","E"]],"e":"Ejemplos del temario: A1 cerámica, hormigón, hierro; B placa de yeso, madera tratada; C espumas fenólicas; D madera sin protección; E aislamientos plásticos o de fibras."},
        {"t":"order","q":"Ordena las clases de menor a mayor contribución al fuego.","items":["A1","A2","B","C","D","E"],"e":"A1 no contribuye; A2 no de forma importante; B muy baja; C limitada; D media; E alta. F queda sin clasificar."},
        {"t":"ex","h":"Humo y gotas","p":"La clase se completa con dos indicadores. <b>Humo</b>: s1 baja, s2 media, s3 alta. <b>Gotas</b>: d0 ninguna, d1 no inflamadas, d2 inflamadas."},
        {"t":"q","ref":"0diulkk"},   // pci-temario nº 25: En la clasificación de reacción al fuego, «d2» significa:
        {"t":"ex","h":"Tabla 4.1 DB SI 1","p":"Clase mínima de paredes y techos / suelos según la zona.","tab":{"h":["Zona","Paredes y techos","Suelos"],"r":[["Zonas ocupables","C-s2,d0","EFL"],["Pasillos y escaleras protegidos","B-s1,d0","CFL-s1"],["Aparcamientos y riesgo especial","B-s1,d0","BFL-s1"],["Espacios ocultos no estancos","B-s3,d0","BFL-s2"]]}},
        {"t":"match","q":"Empareja cada zona con su exigencia (paredes y techos / suelos).","pairs":[["Zonas ocupables","C-s2,d0 / EFL"],["Pasillos y escaleras protegidos","B-s1,d0 / CFL-s1"],["Aparcamientos y riesgo especial","B-s1,d0 / BFL-s1"],["Espacios ocultos no estancos","B-s3,d0 / BFL-s2"]],"e":"Tabla 4.1 DB SI 1 tal como la recoge el temario."},
        {"t":"q","ref":"0ya2dim"}   // pci-temario nº 24: Un material de clase A1 de reacción al fuego:
      ],
      sum: ["Reacción (UNE-EN 13501-1) es cómo contribuye el producto al fuego; no es lo mismo que resistencia.","Clases de A1 (no contribuye) a E (alta); F sin clasificar.","Humo s1–s3 y gotas d0–d2; d2 son gotas inflamadas.","Tabla 4.1: zonas ocupables C-s2,d0 / EFL; pasillos y escaleras protegidos B-s1,d0 / CFL-s1."] },
      { id: "pci-1.4", apt: ["pci-1.4"], title: "1.4. Carga de fuego",
      cards: [
        {"t":"ex","h":"Carga de fuego","p":"Suma de energías caloríficas de todos los combustibles del espacio. La <b>densidad de carga de fuego</b> se da por m² de superficie construida (qf) o de envolvente (qt). Sirve para <b>categorizar el riesgo</b> de los sectores y para decidir qué reglamento aplica."},
        {"t":"q","ref":"0omy0ji"},   // pci-temario nº 3: El estudio de la carga de fuego:
        {"t":"ex","h":"Umbrales que caen","p":"Almacenamientos en establecimientos no industriales con carga ponderada y corregida <b>&gt; 3·10⁶ MJ</b> → zona de uso industrial. Sector de <b>riesgo mínimo</b>: ≤ 40 MJ/m² en el sector y ≤ 50 MJ/m² en cualquier recinto. <b>Comercial</b>: área de ventas &gt; 1.500 m² con densidad &gt; 500 MJ/m² → extinción automática."},
        {"t":"q","ref":"0u0xm98"},   // pci-temario nº 27: Los almacenamientos en establecimientos no industriales se consideran zona de uso industri
        {"t":"num","q":"Sector de riesgo mínimo: densidad de carga de fuego máxima en el conjunto del sector.","v":40,"u":"MJ/m²","e":"Riesgo mínimo: ≤ 40 MJ/m² en el sector y ≤ 50 MJ/m² en cualquier recinto."},
        {"t":"fill","q":"Completa: un comercial necesita extinción automática si…","items":["El área de ventas supera {} m²","La densidad de carga de fuego supera {} MJ/m²"],"ans":["1.500","500"],"dis":["1.000","850","2.000"],"e":"Comercial: área de ventas > 1.500 m² con densidad > 500 MJ/m² → extinción automática."},
        {"t":"ex","h":"Fórmula de almacenamiento","p":"<b>Qs = Σ(qvi·hi·si·Ci)·Ra / A</b> (MJ/m²). <b>Ci</b> pondera la combustibilidad y <b>Ra</b> la activación propia de la actividad."},
        {"t":"q","ref":"13v6wij"},   // pci-verif nº 64: En la fórmula del riesgo intrínseco, el coeficiente Ra corrige la peligrosidad por:
        {"t":"num","q":"En un sector de riesgo mínimo, ¿cuál es la densidad máxima en cualquier recinto?","v":50,"u":"MJ/m²","e":"Riesgo mínimo: ≤ 50 MJ/m² en cualquier recinto (y ≤ 40 en el sector)."}
      ],
      sum: ["La carga de fuego sirve para categorizar el riesgo y decidir el reglamento.","Más de 3·10⁶ MJ en un almacenamiento no industrial → zona de uso industrial.","Riesgo mínimo: ≤ 40 MJ/m² sector, ≤ 50 MJ/m² recinto.","Comercial > 1.500 m² y > 500 MJ/m² → extinción automática."] },
      { id: "pci-1.5", apt: ["pci-1.5"], title: "1.5. CTE DB SI",
      cards: [
        {"t":"ex","h":"Seis exigencias","p":"RD 314/2006, modificado por RD 732/2019. Aplica a edificios <b>no industriales</b> (los industriales van por el RSCIEI).","tab":{"h":["Sección","Contenido"],"r":[["SI 1","Propagación interior"],["SI 2","Propagación exterior"],["SI 3","Evacuación de ocupantes (ap. 8: control de humo)"],["SI 4","Instalaciones de protección contra incendios (dotación)"],["SI 5","Intervención de los bomberos"],["SI 6","Resistencia al fuego de la estructura"]]}},
        {"t":"match","q":"Empareja cada sección del DB SI con su contenido.","pairs":[["SI 1","Propagación interior"],["SI 2","Propagación exterior"],["SI 3","Evacuación de ocupantes"],["SI 4","Dotación de instalaciones"],["SI 5","Intervención de los bomberos"],["SI 6","Resistencia al fuego de la estructura"]],"e":"SI 4 es la más relevante para instalaciones: fija la dotación."},
        {"t":"q","ref":"0iyge5g"},   // pci-temario nº 28: La sección del DB SI que fija la dotación de instalaciones de protección contra incendios 
        {"t":"q","ref":"16f6rn1"},   // pci-temario nº 20: El CTE DB SI establece las necesidades normativas de:
        {"t":"ex","h":"Control de humo obligatorio (DB SI 3, ap. 8)","p":"Aparcamientos no abiertos; comercial o pública concurrencia con <b>más de 1.000 personas</b>; atrios con <b>más de 500 personas</b> en el sector. Normas: UNE 23585 (diseño SCTEH), UNE 23584 (instalación y mantenimiento), UNE-EN 12101-6 (presión diferencial)."},
        {"t":"fill","q":"Completa los casos de control de humo obligatorio.","items":["Aparcamientos {}","Comercial o pública concurrencia con más de {} personas","Atrios con más de {} personas en el sector"],"ans":["no abiertos","1.000","500"],"dis":["abiertos","2.000","1.500"],"e":"DB SI 3, ap. 8: aparcamientos no abiertos; comercial o pública concurrencia > 1.000 personas; atrios > 500."},
        {"t":"ex","h":"Ejemplo: tabla 1.1 DB SI 4, uso docente","p":"Así se lee la dotación de un uso.","tab":{"h":["Instalación","Se exige si"],"r":[["BIE","S > 2.000 m²"],["Columna seca","Altura de evacuación > 24 m"],["Alarma","S > 1.000 m²"],["Detección","S > 2.000 m² (zonas de riesgo alto); todo el edificio si S > 5.000 m²"],["Hidrante","S entre 5.000 y 10.000 m², más uno por cada 10.000 m² adicionales"]]}},
        {"t":"num","q":"Uso docente: ¿a partir de qué altura de evacuación se exige columna seca?","v":24,"u":"m","e":"Tabla 1.1 DB SI 4, docente: columna seca si la altura de evacuación supera 24 m."},
        {"t":"q","q":"En uso docente, la detección se exige en todo el edificio cuando la superficie construida supera:","o":["2.000 m²","5.000 m²","10.000 m²"],"c":1,"e":"Docente: detección en zonas de riesgo alto si S > 2.000 m², y en todo el edificio si S > 5.000 m²."}
      ],
      sum: ["CTE DB SI: RD 314/2006, modificado por RD 732/2019; edificios no industriales.","SI 4 fija la dotación de instalaciones.","Control de humo: aparcamientos no abiertos, comercial o PC > 1.000 personas, atrios > 500.","Docente: columna seca si h > 24 m; detección en todo el edificio si S > 5.000 m²."] },
      { id: "pci-1.6-1", apt: ["pci-1.6"], title: "1.6. RSCIEI: configuración y riesgo intrínseco",
      cards: [
        {"t":"ex","h":"RSCIEI (RD 2267/2004)","p":"Reglamento <b>autocontenido</b> para establecimientos industriales: fija sectores, construcción, evacuación, dotación, abastecimiento, inspección, alumbrado y señalización. Caracteriza el establecimiento por su <b>configuración</b> y su <b>nivel de riesgo intrínseco</b>."},
        {"t":"q","ref":"01qx2as"},   // pci-temario nº 34: El RSCIEI se considera un reglamento autocontenido.
        {"t":"ex","h":"Configuración: tipos A a E","p":"Según cómo ocupa el edificio o el espacio.","tab":{"h":["Tipo","Configuración"],"r":[["A","Ocupa parte de un edificio con otros establecimientos"],["B","Ocupa todo un edificio adosado o a ≤ 3 m de otro"],["C","Ocupa todo un edificio a > 3 m de otros (distancia libre de combustibles)"],["D","Espacio abierto, puede estar totalmente cubierto, alguna fachada sin cerramiento"],["E","Espacio abierto cubierto hasta el 50 %, alguna fachada sin cerramiento"]]},"fig":"f05"},
        {"t":"q","ref":"0ke7p0x"},   // pci-temario nº 30: Un establecimiento industrial que ocupa totalmente un edificio situado a más de 3 m de otr
        {"t":"q","ref":"1dn8jc3"},   // pci-temario nº 31: Un establecimiento que ocupa un espacio abierto cubierto hasta el 50 % de su superficie es
        {"t":"ex","h":"Nivel de riesgo intrínseco","p":"Se obtiene de la densidad de carga de fuego ponderada y corregida Qs.","tab":{"h":["Riesgo","Nivel","Qs (MJ/m²)"],"r":[["Bajo","1 · 2","≤ 425 · ≤ 850"],["Medio","3 · 4 · 5","≤ 1.275 · ≤ 1.700 · ≤ 3.400"],["Alto","6 · 7 · 8","≤ 6.800 · ≤ 13.600 · > 13.600"]]},"fig":"f06"},
        {"t":"q","ref":"16xw1v0"},   // pci-temario nº 32: Un sector industrial con Qs = 2.000 MJ/m² tiene un riesgo intrínseco:
        {"t":"num","q":"Límite superior del riesgo intrínseco bajo (nivel 2).","v":850,"u":"MJ/m²","e":"Bajo: nivel 1 hasta 425 y nivel 2 hasta 850 MJ/m²."},
        {"t":"match","q":"Empareja cada valor máximo de Qs con su nivel.","pairs":[["≤ 425 MJ/m²","Nivel 1"],["≤ 850 MJ/m²","Nivel 2"],["≤ 1.275 MJ/m²","Nivel 3"],["≤ 1.700 MJ/m²","Nivel 4"],["≤ 3.400 MJ/m²","Nivel 5"],["≤ 6.800 MJ/m²","Nivel 6"]],"e":"Tabla del temario: 425, 850, 1.275, 1.700, 3.400 y 6.800 MJ/m² para los niveles 1 a 6."}
      ],
      sum: ["El RSCIEI es autocontenido y caracteriza por configuración y riesgo intrínseco.","Tipos: A parte de edificio; B adosado o a ≤ 3 m; C a > 3 m; D abierto; E cubierto hasta el 50 %.","Riesgo bajo hasta 850, medio hasta 3.400 y alto por encima (MJ/m²)."] },
      { id: "pci-1.6-2", apt: ["pci-1.6"], title: "1.6. RSCIEI: superficie de sector y guía técnica",
      cards: [
        {"t":"ex","h":"Superficie máxima de sector (m²)","p":"Por tipo de establecimiento y nivel de riesgo.","tab":{"h":["Riesgo","Tipo A","Tipo B","Tipo C"],"r":[["Medio 4","400","3.000","4.000"],["Medio 5","300","2.500","3.500"],["Alto 6","No admitido","2.000","3.000"],["Alto 7","No admitido","1.500","2.500"],["Alto 8","No admitido","No admitido","2.000"]]},"fig":"f07"},
        {"t":"q","ref":"1buf66x"},   // pci-temario nº 33: En un establecimiento de tipo A, los sectores de riesgo intrínseco alto:
        {"t":"num","q":"Tipo C con riesgo alto 8: superficie máxima de sector.","v":2000,"u":"m²","e":"Alto 8: A y B no admitido; C, 2.000 m²."},
        {"t":"num","q":"Tipo B con riesgo medio 4: superficie máxima de sector.","v":3000,"u":"m²","e":"Medio 4: A 400, B 3.000 y C 4.000 m²."},
        {"t":"ex","h":"Guía técnica del Ministerio","p":"Aclara el diseño prestacional, el riesgo grave, los usos CTE dentro de la industria y la obligación de los OCA de inspeccionar con la <b>UNE 192005-1</b>."},
        {"t":"q","ref":"016oqp3"},   // pci-verif nº 60: Según la guía técnica del RSCIEI, los organismos de control deben inspeccionar según la no
        {"t":"ojo","p":"En el examen del 21-02-2026 aparece el RD 164/2025 junto al RD 2267/2004 («aplican a establecimientos industriales, así como cuando lo requiera el CTE DB SI»). No está en las diapositivas: pregunta al profesor si entra la nueva norma."},
        {"t":"q","ref":"17k3a1c"}   // pci-temario nº 19: El RD 2267/2004 y el RD 164/2025 se aplican a:
      ],
      sum: ["Tipo A no admite riesgo alto; tipo B no admite el alto 8.","Medio 4: 400 / 3.000 / 4.000 m² para A / B / C.","Los OCA inspeccionan con la UNE 192005-1 (guía técnica).","El examen citó el RD 164/2025, que no está en las diapositivas."] },
      { id: "pci-1.7", apt: ["pci-1.7"], title: "1.7. RIPCI (RD 513/2017)",
      cards: [
        {"t":"ex","h":"Qué regula","p":"Diseño, instalación, mantenimiento e inspección de la <b>protección activa</b>: medios manuales o automáticos de detección, control y extinción."},
        {"t":"q","ref":"1i3qc2m"},   // pci-verif nº 4: El objeto del RIPCI es regular el diseño, instalación, mantenimiento e inspección de:
        {"t":"q","ref":"03txg1h"},   // pci-verif nº 5: La protección activa contra incendios puede estar formada por medios manuales o automático
        {"t":"ex","h":"Los anexos","p":"<b>Anexo I</b>: sistemas regulados (detección y alarma, abastecimiento, hidrantes, BIE, columna seca, rociadores y agua pulverizada, agua nebulizada, espuma, polvo, gases, aerosoles, control de humos, señalización luminiscente, extintores). <b>Anexo II</b>: mantenimiento mínimo (tablas I, II y III); actas conformes a la serie UNE 23580. <b>Anexo III</b>: medios humanos de instaladoras y mantenedoras. <b>Anexo IV</b>: conocimientos de los operarios."},
        {"t":"match","q":"Empareja cada anexo del RIPCI con su contenido.","pairs":[["Anexo I","Sistemas regulados"],["Anexo II","Mantenimiento mínimo (tablas I, II y III)"],["Anexo III","Medios humanos de instaladoras y mantenedoras"],["Anexo IV","Conocimientos de los operarios"]],"e":"Así los resume el temario en el apartado 1.7."},
        {"t":"notin","q":"¿Cuál NO figura entre los sistemas regulados del anexo I según el temario?","o":["Columna seca","Agua nebulizada","Señalización luminiscente","Ascensor de emergencia"],"c":3,"e":"El ascensor de emergencia es un requisito del DB SI 4, no un sistema del anexo I del RIPCI."},
        {"t":"ex","h":"Inspecciones periódicas (art. 22)","p":"En edificios no industriales, con la <b>UNE 192005-2</b>. Primeras inspecciones de instalaciones existentes:","tab":{"h":["Antigüedad","Plazo"],"r":[["≥ 20 años","1 año"],["15–20 años","2 años"],["10–15 años","3 años"]]}},
        {"t":"num","q":"Instalación existente con 12 años de antigüedad: ¿en qué plazo debe pasar su primera inspección?","v":3,"u":"años","e":"Entre 10 y 15 años de antigüedad: primera inspección en 3 años."},
        {"t":"q","ref":"0mns686"}   // pci-verif nº 47: El procedimiento de inspección reglamentaria de las instalaciones PCI en edificios no indu
      ],
      sum: ["El RIPCI regula diseño, instalación, mantenimiento e inspección de la protección activa.","Anexo I sistemas; II mantenimiento (actas UNE 23580); III medios humanos; IV conocimientos.","Inspección en no industrial con la UNE 192005-2.","Primeras inspecciones: ≥ 20 años en 1; 15–20 en 2; 10–15 en 3."] }
    ]},
    { n: 2, name: "Detección de incendios e interfonía de emergencia", lessons: [
      { id: "pci-2.1", apt: ["pci-2.1"], title: "2.1. Fases del incendio y humo",
      cards: [
        {"t":"ex","h":"Fases del incendio","p":"Humos invisibles (incipiente) → humo visible → llamas y calor. Cuanto antes se detecta, mejor: <b>la mayoría de víctimas mueren por el humo</b>."},
        {"t":"order","q":"Ordena las fases del incendio.","items":["Humos invisibles (incipiente)","Humo visible","Llamas y calor"],"e":"El temario las da en este orden: humos invisibles, humo visible, llamas y calor."},
        {"t":"q","ref":"0etv4pg"},   // pci-temario nº 35: La fase del incendio en la que hay humos todavía invisibles es:
        {"t":"img","fig":"f08","q":"Según la figura, ¿qué detectores actúan en la fase de humos invisibles?","o":["Iónico y de aspiración","Óptico","Térmico y de llama"],"c":0,"e":"En el esquema, iónico y aspiración actúan en los humos invisibles; óptico, en el humo visible; térmico y llama, con llamas y calor."},
        {"t":"ex","h":"El humo y sus gases","p":"El humo reduce la visibilidad, irrita y puede explotar (<b>backdraft</b>). Gases: <b>tóxicos</b> (dificultan el oxígeno en sangre), <b>ácidos</b> (impiden la oxigenación celular) y <b>asfixiantes</b> (desplazan el oxígeno)."},
        {"t":"match","q":"Empareja cada efecto con su causa.","pairs":[["Gases tóxicos","Dificultan el oxígeno en sangre"],["Gases ácidos","Impiden la oxigenación celular"],["Gases asfixiantes","Desplazan el oxígeno"],["Backdraft","El humo explota"]],"e":"Así clasifica el temario los gases del humo."},
        {"t":"ex","h":"Norma de diseño","p":"<b>UNE 23007-14</b>: planificación, diseño, instalación, puesta en servicio, uso y mantenimiento. Es la norma a la que remite el RIPCI."},
        {"t":"q","ref":"10ba981"}   // pci-temario nº 36: La norma de diseño, instalación y puesta en servicio de los sistemas de detección a la que
      ],
      sum: ["Fases: humos invisibles (incipiente), humo visible, llamas y calor.","La mayoría de víctimas mueren por el humo.","Gases tóxicos, ácidos y asfixiantes.","Norma de detección a la que remite el RIPCI: UNE 23007-14."] },
      { id: "pci-2.2-1", apt: ["pci-2.2"], title: "2.2. Componentes y tipos de sistema",
      cards: [
        {"t":"ex","h":"Componentes (UNE-EN 54-13)","p":"<b>Central de incendios</b> (ECI, UNE-EN 54-2): recibe señales, decide si hay alarma, avisa e indica la localización; vigila averías. <b>Detectores</b>: al menos un sensor que vigila un fenómeno del incendio. Pulsadores manuales, avisadores óptico-acústicos y <b>elementos de control auxiliar</b> (retenedores de puertas, compuertas cortafuego, cortinas, megafonía)."},
        {"t":"q","ref":"1ru6bl4"},   // pci-verif nº 69: El ECI (equipo de control e indicación) NO tiene como función:
        {"t":"notin","q":"¿Cuál NO es un elemento de control auxiliar según el temario?","o":["Retenedores de puertas","Compuertas cortafuego","Megafonía","Pulsadores manuales"],"c":3,"e":"Los pulsadores son componentes del sistema, pero el temario los cita aparte. Control auxiliar: retenedores, compuertas cortafuego, cortinas y megafonía."},
        {"t":"ex","h":"Convencional frente a analógico","p":"<b>Convencional</b>: trabaja por zonas; la alarma se identifica por zona. En vías de desaparición. <b>Analógico</b>: cada equipo tiene su propia dirección y algoritmos configurables.","fig":"f09"},
        {"t":"q","ref":"1rrn8ad"},   // pci-temario nº 5: Un sistema de detección de incendios analógico es:
        {"t":"q","ref":"1726k9j"},   // pci-temario nº 37: En un sistema convencional, la alarma de un detector se interpreta como alarma:
        {"t":"ex","h":"Plan de alarmas","p":"Matriz de actuaciones según los equipos activados (1 detector, 1 pulsador, 2 equipos en el sector…). Es <b>objeto de inspección</b> (UNE 192005-2 no industrial; UNE 192005-1 industrial)."},
        {"t":"q","ref":"0nh2g0m"}   // pci-verif nº 83: La matriz de actuaciones (plan de alarmas) de la central es necesaria para programarla y e
      ],
      sum: ["La central (ECI, UNE-EN 54-2) recibe señales, decide, avisa, localiza y vigila averías.","Convencional: por zonas. Analógico: cada equipo con su dirección.","El plan de alarmas es una matriz de actuaciones y se inspecciona."] },
      { id: "pci-2.2-2", apt: ["pci-2.2"], title: "2.2. Normas UNE-EN 54",
      cards: [
        {"t":"ex","h":"Qué norma regula cada elemento","p":"La familia UNE-EN 54 cubre el sistema de detección y alarma.","tab":{"h":["Norma","Elemento"],"r":[["UNE-EN 54-1","Componentes del sistema"],["UNE-EN 54-2 / 54-4","Central (ECI) / fuente de alimentación"],["UNE-EN 54-3 / 54-23","Avisadores acústicos / visuales"],["UNE-EN 54-5","Detectores puntuales de calor"],["UNE-EN 54-7","Detectores puntuales de humo"],["UNE-EN 54-10","Detectores de llama"],["UNE-EN 54-11","Pulsadores"],["UNE-EN 54-12 / 54-20","Humo lineales (barrera) / aspiración"],["UNE-EN 54-13","Compatibilidad de componentes"],["UNE-EN 54-16 / 54-24","Alarma por voz / altavoces"],["UNE-EN 14604","Detectores autónomos"]]}},
        {"t":"match","q":"Empareja cada norma con su elemento.","pairs":[["UNE-EN 54-2","Central (ECI)"],["UNE-EN 54-5","Detectores puntuales de calor"],["UNE-EN 54-7","Detectores puntuales de humo"],["UNE-EN 54-10","Detectores de llama"],["UNE-EN 54-11","Pulsadores"],["UNE-EN 14604","Detectores autónomos"]],"e":"Tabla de normas del apartado 2.2."},
        {"t":"q","ref":"0dnmar9"},   // pci-verif nº 73: La familia de normas que regula los sistemas de detección y alarma es la:
        {"t":"q","q":"La compatibilidad de componentes del sistema de detección se regula en la:","o":["UNE-EN 54-1","UNE-EN 54-13","UNE-EN 54-16"],"c":1,"e":"UNE-EN 54-13: compatibilidad de componentes. La 54-1 son los componentes y la 54-16, la alarma por voz."}
      ],
      sum: ["UNE-EN 54-2 central; 54-5 calor; 54-7 humo; 54-10 llama; 54-11 pulsadores.","UNE-EN 54-13: compatibilidad de componentes.","Detectores autónomos: UNE-EN 14604."] },
      { id: "pci-2.3", apt: ["pci-2.3"], title: "2.3. Cuándo es obligatoria la detección",
      cards: [
        {"t":"ex","h":"Detección obligatoria (DB SI 4, ejemplos)","p":"Por uso y superficie construida S.","tab":{"h":["Uso","Detección"],"r":[["Administrativo","S > 2.000 m²: zonas de riesgo alto; S > 5.000 m²: todo el edificio"],["Aparcamiento","S > 500 m² (robotizados: pulsadores siempre)"],["Comercial","S > 2.000 m² (los térmicos pueden sustituirse por extinción automática no exigida)"],["Docente","S > 2.000 m²: zonas de riesgo alto; S > 5.000 m²: todo el edificio"],["Hospitalario","Siempre, con alarma; > 100 camas: línea directa con bomberos"],["Pública concurrencia","S > 1.000 m²"],["Residencial público","S > 500 m², con alarma"],["Residencial vivienda","Altura de evacuación > 50 m, con alarma"]]}},
        {"t":"match","q":"Empareja cada uso con su umbral de detección.","pairs":[["Pública concurrencia","S > 1.000 m²"],["Residencial público","S > 500 m², con alarma"],["Residencial vivienda","Altura de evacuación > 50 m"],["Hospitalario","Siempre, con alarma"],["Comercial","S > 2.000 m²"]],"e":"Tabla del apartado 2.3."},
        {"t":"num","q":"Hospitalario: ¿a partir de cuántas camas se exige línea directa con bomberos?","v":100,"u":"camas","e":"Hospitalario: detección siempre, con alarma; con más de 100 camas, línea directa con bomberos."},
        {"t":"q","q":"En uso aparcamiento, la detección es obligatoria si la superficie construida excede de:","o":["500 m²","1.000 m²","2.000 m²"],"c":0,"e":"Aparcamiento: S > 500 m². En los robotizados, pulsadores siempre."},
        {"t":"notin","q":"¿En cuál de estos usos NO depende la detección de la superficie construida?","o":["Hospitalario","Docente","Administrativo","Pública concurrencia"],"c":0,"e":"En hospitalario la detección se exige siempre, con alarma."}
      ],
      sum: ["Pública concurrencia: S > 1.000 m². Comercial, administrativo y docente: S > 2.000 m².","Aparcamiento y residencial público: S > 500 m².","Hospitalario siempre; más de 100 camas, línea directa con bomberos.","Residencial vivienda: altura de evacuación > 50 m."] },
      { id: "pci-2.4-1", apt: ["pci-2.4"], title: "2.4. Detectores iónicos y ópticos",
      cards: [
        {"t":"ex","h":"Iónicos (puntuales)","p":"Cámara ionizada por una fuente radiactiva (americio); las partículas (0,01–1 µm) reducen la corriente y saltan. Problemas con humos no de incendio, corrientes de aire, polvo y vapor. <b>Se están retirando</b> y se gestionan como residuo radiactivo."},
        {"t":"q","ref":"1w69o2g"},   // pci-temario nº 6: Los detectores iónicos son detectores puntuales.
        {"t":"ojo","p":"La diapositiva dice «Americio 214»; el isótopo de los detectores iónicos es el americio-241."},
        {"t":"ex","h":"Ópticos","p":"El humo altera un haz de luz sobre una célula (oscurecimiento o efecto Tyndall). Detección temprana, pocas falsas alarmas, poco mantenimiento. <b>Hasta 12 m</b> de altura y <b>60–80 m²</b> de cobertura. Puntual, por barrera o por aspiración. El número de detectores depende del tipo de sistema, área y altura del local, forma del techo y uso."},
        {"t":"q","ref":"1du8ak9"},   // pci-temario nº 7: Los detectores ópticos se determinan en función de:
        {"t":"q","ref":"1nn22wo"},   // pci-temario nº 39: Los detectores ópticos admiten, según la UNE 23007-14, alturas de local de hasta:
        {"t":"fill","q":"Completa: el número de detectores depende de…","items":["El tipo de {}","El área y la {} del local","La forma del {}","El {} del local"],"ans":["sistema","altura","techo","uso"],"dis":["ruido","aforo"],"e":"Nº de detectores según: tipo de sistema, área y altura del local, forma del techo y uso."}
      ],
      sum: ["Iónicos: fuente radiactiva (americio-241); se están retirando como residuo radiactivo.","Ópticos: hasta 12 m de altura y 60–80 m²; pocas falsas alarmas.","Nº de detectores: sistema, área y altura, forma del techo y uso."] },
      { id: "pci-2.4-2", apt: ["pci-2.4"], title: "2.4. Aspiración, barrera, térmicos y llama",
      cards: [
        {"t":"ex","h":"Aspiración y barrera","p":"<b>Aspiración</b>: tuberías que llevan muestras a un detector láser; detección precoz (CPD, falsos suelos, cuadros), acceso difícil o mucho movimiento de aire. <b>Barrera</b>: haz infrarrojo con transmisor, receptor y unidad de control; por proyección (separados) o reflexión (transceptor y prisma). Grandes espacios: atrios, naves altas."},
        {"t":"q","ref":"089sos1"},   // pci-temario nº 44: Los detectores de aspiración están indicados en:
        {"t":"ex","h":"Térmicos y de llama","p":"<b>Térmicos</b>: temperatura fija (dilatación de un metal) o termovelocimétricos (5–10 ºC/min); rango de 70 a 225 ºC. Detección más tardía; en cocinas o atmósferas con humo. <b>Llama</b> (IR, UV o IR/UV): espacios abiertos o muy altos, llamas invisibles (hidrógeno); falsas alarmas por sol o soldadura; mantenimiento caro."},
        {"t":"q","ref":"1hdckrj"},   // pci-temario nº 41: En una cocina, para evitar falsas alarmas, lo adecuado es un detector:
        {"t":"q","ref":"00l8qiv"},   // pci-temario nº 42: Un detector termovelocimétrico actúa por:
        {"t":"match","q":"Empareja cada detector con su uso típico.","pairs":[["Aspiración","CPD y falsos suelos"],["Barrera","Atrios y naves altas"],["Térmico","Cocinas"],["Llama","Llamas invisibles (hidrógeno)"],["Óptico","Detección temprana con pocas falsas alarmas"]],"e":"Apartado 2.4: cada tipo con su aplicación."},
        {"t":"num","q":"Temperatura máxima del rango de actuación de los detectores térmicos.","v":225,"u":"ºC","e":"Térmicos: rango de 70 a 225 ºC."}
      ],
      sum: ["Aspiración: detector láser para CPD, falsos suelos y cuadros.","Barrera: haz infrarrojo para atrios y naves altas.","Térmicos: 70–225 ºC, termovelocimétricos 5–10 ºC/min; cocinas.","Llama: espacios muy altos y llamas invisibles; falsas alarmas por sol o soldadura."] },
      { id: "pci-2.4-3", apt: ["pci-2.4"], title: "2.4. Cobertura de los detectores puntuales",
      cards: [
        {"t":"ex","h":"Cobertura (UNE 23007-14)","p":"Techos con pendiente ≤ 20º.","tab":{"h":["Superficie local","Detector","Altura","Sv","Dmáx (m)"],"r":[["≤ 80 m²","Humo","≤ 12 m","80 m²","6,3"],["> 80 m²","Humo","≤ 6 m","60 m²","5,5"],["> 80 m²","Humo","6–12 m","80 m²","6,3"],["≤ 30 m²","Calor","≤ 7,5 m (A1) / ≤ 6 m","30 m²","3,9"],["> 30 m²","Calor","≤ 7,5 m (A1) / ≤ 6 m","20 m²","3,2"]]}},
        {"t":"q","ref":"1rbz6h3"},   // pci-temario nº 40: En un local de más de 80 m² y altura ≤ 6 m, la superficie vigilada por un detector puntual
        {"t":"num","q":"Detector de calor en un local de más de 30 m²: superficie vigilada.","v":20,"u":"m²","e":"Calor en local > 30 m²: Sv 20 m² y Dmáx 3,2 m."},
        {"t":"img","fig":"f10","q":"Según la figura, ¿qué distancia máxima corresponde a un detector de humo en un local de 80 m² o menos?","o":["6,3 m","5,5 m","3,9 m"],"c":0,"e":"Humo en local ≤ 80 m²: Sv 80 m² y Dmáx 6,3 m. 5,5 m es humo en > 80 m² con h ≤ 6 m; 3,9 m es calor en ≤ 30 m²."},
        {"t":"num","q":"Detector de calor en un local de 30 m² o menos: distancia máxima.","v":3.9,"u":"m","e":"Calor en local ≤ 30 m²: Sv 30 m² y Dmáx 3,9 m."}
      ],
      sum: ["Humo: 80 m² y 6,3 m (local ≤ 80 m², o > 80 m² entre 6 y 12 m de altura).","Humo en local > 80 m² y h ≤ 6 m: 60 m² y 5,5 m.","Calor: 30 m² y 3,9 m (≤ 30 m²); 20 m² y 3,2 m (> 30 m²)."] },
      { id: "pci-2.5", apt: ["pci-2.5"], title: "2.5. Pulsadores, avisadores y otros dispositivos",
      cards: [
        {"t":"ex","h":"Pulsadores y avisadores","p":"<b>Pulsadores</b> (UNE-EN 54-11): recorrido máximo <b>25 m</b> desde cualquier origen de evacuación; parte superior entre <b>80 y 120 cm</b>; señalizados. <b>Avisadores</b>: perceptibles en todo el sector; visuales obligatorios si el ruido supera <b>60 dB(A)</b>, hay personas sordas o con protección auditiva."},
        {"t":"q","ref":"087dii4"},   // pci-temario nº 8: Los pulsadores de alarma se situarán de modo que la distancia máxima a recorrer desde cual
        {"t":"num","q":"¿Por encima de qué nivel de ruido son obligatorios los avisadores visuales?","v":60,"u":"dB(A)","e":"Avisadores visuales obligatorios con ruido > 60 dB(A), personas sordas o con protección auditiva."},
        {"t":"ex","h":"Retenedores y cableado","p":"<b>Retenedores de puerta</b>: electroimán a 24 Vcc que suelta la puerta al cortar tensión (seguridad positiva). <b>Cableado</b> (UNE 23007-14, anexo A): si debe funcionar más de 1 minuto tras la detección, resistir el fuego <b>30 min</b> (UNE 211025). Habitual 2×1,5 o 2×2,5 mm²."},
        {"t":"q","ref":"1rlyyqt"},   // pci-temario nº 47: Los retenedores de puerta liberan la hoja:
        {"t":"num","q":"Resistencia al fuego de los cables que deben funcionar más de 1 minuto tras la detección.","v":30,"u":"min","e":"Cableado: resistente 30 min (UNE 211025) si debe funcionar más de 1 minuto tras detectar."},
        {"t":"ex","h":"Puestos de control de rociadores","p":"Avisan de la descarga (gong hidráulico y presostato). Tipos: <b>húmedo</b> (con cámara de retardo), <b>seco</b> y <b>de acción previa</b> (CPD, archivos)."},
        {"t":"q","ref":"1iny9km"},   // pci-verif nº 85: El puesto de control húmedo incorpora una cámara de retardo para:
        {"t":"q","ref":"12zp5tb"}   // pci-temario nº 48: El puesto de control de rociadores de acción previa se emplea donde:
      ],
      sum: ["Pulsadores: ≤ 25 m de recorrido; parte superior entre 80 y 120 cm.","Avisadores visuales si el ruido supera 60 dB(A).","Retenedores a 24 Vcc: sueltan al cortar tensión.","Cables resistentes 30 min si actúan más de 1 min tras detectar.","Puesto húmedo con cámara de retardo; acción previa en CPD y archivos."] },
      { id: "pci-2.6", apt: ["pci-2.6"], title: "2.6. Interfonía de emergencia",
      cards: [
        {"t":"ex","h":"Zona de refugio","p":"Plazas de <b>1,20 × 0,80 m</b> (silla de ruedas) o <b>0,80 × 0,60 m</b>; en rellanos de escaleras protegidas, vestíbulos o pasillo protegido; círculo libre de <b>Ø 1,50 m</b>. Con puesto de control permanente: intercomunicador visual y auditivo (basta mensaje grabado y luz de confirmación)."},
        {"t":"q","ref":"1ez9r12"},   // pci-temario nº 49: La zona de refugio para usuario de silla de ruedas mide:
        {"t":"num","q":"Diámetro del círculo libre en la zona de refugio.","v":1.5,"u":"m","e":"Zona de refugio: círculo libre de Ø 1,50 m."},
        {"t":"ex","h":"Aseos accesibles (DB SUA 3)","p":"Llamada de asistencia visual y acústica, <b>15 dB</b> sobre el ambiente; luz de <b>0,5 a 4 Hz</b>; cordón rojo con brazaletes a <b>800–1.100 mm</b> y a <b>100 mm</b>."},
        {"t":"match","q":"Empareja cada dato con lo que mide.","pairs":[["15 dB","Llamada acústica sobre el ambiente"],["0,5 a 4 Hz","Frecuencia de la luz de llamada"],["800–1.100 mm","Altura de un brazalete del cordón"],["100 mm","Altura del otro brazalete"],["0,80 × 0,60 m","Plaza de refugio sin silla de ruedas"]],"e":"Apartado 2.6: zona de refugio y aseos accesibles."},
        {"t":"q","q":"Con puesto de control permanente, el intercomunicador de la zona de refugio:","o":["Basta con que sea auditivo","Es visual y auditivo; basta mensaje grabado y luz de confirmación","No es necesario"],"c":1,"e":"Temario: intercomunicador visual y auditivo; basta mensaje grabado y luz de confirmación."}
      ],
      sum: ["Plaza de refugio: 1,20 × 0,80 m con silla de ruedas, o 0,80 × 0,60 m; círculo de Ø 1,50 m.","Intercomunicador visual y auditivo.","Aseos: 15 dB sobre el ambiente, luz de 0,5 a 4 Hz, brazaletes a 800–1.100 mm y a 100 mm."] }
    ]},
    { n: 3, name: "Sistemas de extinción", lessons: [
      { id: "pci-3.1-1", apt: ["pci-3.1"], title: "3.1. Triángulo del fuego y agentes extintores",
      cards: [
        {"t":"ex","h":"Triángulo y tetraedro","p":"Combustible + comburente + calor (triángulo); con la <b>reacción en cadena</b>, tetraedro. Se extingue eliminando el calor (<b>enfriamiento</b>), el combustible o el oxígeno (<b>sofocación</b>), o <b>inhibiendo</b> la reacción.","fig":"f11"},
        {"t":"q","ref":"1suifqa"},   // pci-temario nº 50: El tetraedro del fuego añade al triángulo:
        {"t":"match","q":"Empareja cada elemento del fuego con la forma de eliminarlo.","pairs":[["Calor","Enfriamiento"],["Oxígeno","Sofocación"],["Reacción en cadena","Inhibición"],["Tetraedro","Triángulo más reacción en cadena"]],"e":"Enfriamiento quita calor; sofocación quita oxígeno; inhibición corta la reacción en cadena."},
        {"t":"ex","h":"Agentes extintores","p":"<b>Agua</b>: barata, absorbe mucho calor; conduce la electricidad y no penetra en líquidos más ligeros. <b>Químicos</b> (polvo, espuma): inhiben la reacción. <b>Gaseosos</b> (CO₂, halogenados): desplazan el oxígeno."},
        {"t":"q","q":"Según el temario, el agua como agente extintor:","o":["No conduce la electricidad","Conduce la electricidad y no penetra en líquidos más ligeros","Desplaza el oxígeno como el CO₂"],"c":1,"e":"Agua: barata y absorbe mucho calor, pero conduce la electricidad y no penetra en líquidos más ligeros."},
        {"t":"notin","q":"¿Cuál NO es un agente gaseoso?","o":["CO₂","Halogenados","Espuma"],"c":2,"e":"La espuma es un agente químico, como el polvo. Gaseosos: CO₂ y halogenados."}
      ],
      sum: ["Triángulo: combustible, comburente y calor; tetraedro añade la reacción en cadena.","Enfriamiento, sofocación, eliminar combustible e inhibición.","Agua conduce la electricidad; polvo y espuma inhiben; CO₂ y halogenados desplazan el oxígeno."] },
      { id: "pci-3.1-2", apt: ["pci-3.1"], title: "3.1. Clases de fuego",
      cards: [
        {"t":"ex","h":"Clases de fuego (UNE-EN 2)","p":"Cada clase con su forma de extinción.","tab":{"h":["Clase","Origen","Extinción / agente"],"r":[["A","Sólidos (madera, papel, tela)","Enfriamiento. Agua, espuma, polvo ABC"],["B","Líquidos (gasolina, alcohol, grasas)","Sofocación o inhibición. CO₂, polvo, espuma, agua pulverizada"],["C","Gases (metano, propano, acetileno)","Sofocación"],["D","Metales (magnesio, potasio, aluminio en polvo)","Polvo especial para metales"],["E","Eléctricos","CO₂, polvo (no conductores)"],["F/K","Aceites y grasas de cocina (desde 2005)","Agente húmedo"]]},"fig":"f12"},
        {"t":"q","ref":"0guhexq"},   // pci-temario nº 51: El método de extinción más adecuado para un fuego de clase A es:
        {"t":"match","q":"Empareja cada clase con su origen.","pairs":[["A","Sólidos"],["B","Líquidos"],["C","Gases"],["D","Metales"],["E","Eléctricos"],["F/K","Aceites y grasas de cocina"]],"e":"Clases de fuego según la tabla del apartado 3.1."},
        {"t":"q","ref":"1015lak"},   // pci-temario nº 52: Los fuegos de clase F/K son los originados por:
        {"t":"ojo","p":"La tabla de extintores del temario llama «clase C» a los incendios eléctricos, en contra de su propia clasificación (C = gases, E = eléctricos). En el examen se preguntó: «un extintor de polvo polivalente se puede usar para fuegos tipo E» → Verdadero."},
        {"t":"q","ref":"1rkwymy"}   // pci-temario nº 9: Un extintor de polvo polivalente se puede utilizar para fuegos tipo E.
      ],
      sum: ["A sólidos, B líquidos, C gases, D metales, E eléctricos, F/K aceites de cocina.","Clase A: enfriamiento. Clase D: polvo especial. F/K: agente húmedo.","Eléctricos son clase E (la tabla de extintores dice C por errata); el polvo polivalente sirve para E."] },
      { id: "pci-3.2", apt: ["pci-3.2"], title: "3.2. Extintores",
      cards: [
        {"t":"ex","h":"Extintores","p":"Equipos a presión (RD 709/2015); certificados según UNE-EN 3-7 y 3-10; móviles según UNE-EN 1866-1. Eficacia mínima (p. ej. <b>21A-113B</b>) a <b>15 m</b> de recorrido desde todo origen de evacuación."},
        {"t":"num","q":"Recorrido máximo desde cualquier origen de evacuación hasta un extintor.","v":15,"u":"m","e":"Extintores 21A-113B a 15 m de recorrido desde todo origen de evacuación."},
        {"t":"ex","h":"Riesgo especial y colocación","p":"En riesgo especial: uno fuera, junto a la puerta; dentro, recorrido ≤ <b>15 m</b> (riesgo bajo o medio) o ≤ <b>10 m</b> (alto). Parte superior entre <b>80 y 120 cm</b>; señal <b>junto al armario, no sobre él</b>."},
        {"t":"q","ref":"0di39ti"},   // pci-temario nº 54: En un local de riesgo especial alto, el recorrido máximo hasta un extintor es:
        {"t":"ex","h":"Qué significa 21A-113B","p":"<b>21A</b>: hogar tipo con 21 vigas de madera de 500 mm por capa. <b>113B</b>: 113 litros de líquido (1/3 agua + 2/3 heptano)."},
        {"t":"q","ref":"1rlwoi9"},   // pci-temario nº 53: En la eficacia 21A-113B, «113B» se refiere a:
        {"t":"q","q":"La señal de un extintor en armario se coloca:","o":["Sobre el armario","Junto al armario, no sobre él","Dentro del armario"],"c":1,"e":"Temario 3.2: señal junto al armario, no sobre él."}
      ],
      sum: ["Extintor 21A-113B a ≤ 15 m de recorrido.","Riesgo especial alto: ≤ 10 m dentro; uno fuera junto a la puerta.","Parte superior entre 80 y 120 cm; señal junto al armario.","113B: 113 litros de líquido (1/3 agua, 2/3 heptano)."] },
      { id: "pci-3.3", apt: ["pci-3.3"], title: "3.3. Abastecimiento de agua",
      cards: [
        {"t":"ex","h":"Abastecimiento (UNE 23500; UNE-EN 12845 con rociadores)","p":"Fuente de agua + equipo de impulsión + red general. Datos: <b>caudal nominal, presión nominal y tiempo de autonomía</b>; además, categoría (tabla 2) y clase (tabla 3).","fig":"f13"},
        {"t":"q","ref":"0ijxqqx"},   // pci-temario nº 10: Para seleccionar los sistemas de abastecimiento se necesita determinar para su dimensionam
        {"t":"ex","h":"Abastecimiento combinado","p":"BIE + rociadores combinados → mínimo <b>categoría II</b>. Combinado: suma de caudales a la presión más exigente, duración del sistema más exigente y conexiones independientes."},
        {"t":"q","ref":"0u4uzgu"},   // pci-temario nº 55: En un abastecimiento combinado de BIE y rociadores se requiere como mínimo categoría:
        {"t":"ex","h":"Depósito","p":"100 % del volumen, material rígido anticorrosión (<b>15 años sin vaciar</b>), agua dulce clorada, aportación a <b>≥ 2 m</b> de la aspiración."},
        {"t":"q","ref":"0o2233b"},   // pci-verif nº 86: El depósito de reserva de agua contra incendios debe garantizar un funcionamiento sin vaci
        {"t":"ex","h":"Bombas","p":"Presión de impulsión <b>≤ 15 bar</b>; curva estable; NPSH ≤ 5 m (horizontales); dar el <b>140 % del caudal nominal a ≥ 70 % de la presión nominal</b>; cuarto exclusivo y bancada de hormigón."},
        {"t":"img","fig":"f14","q":"¿Qué condición marca el punto rojo de la curva de la bomba?","o":["140 % del caudal nominal a al menos el 70 % de la presión nominal","70 % del caudal nominal al 140 % de la presión nominal","El caudal nominal a 15 bar"],"c":0,"e":"El grupo debe dar el 140 % del caudal nominal a no menos del 70 % de la presión nominal."},
        {"t":"num","q":"Presión de impulsión máxima de las bombas contra incendios.","v":15,"u":"bar","e":"Bombas: presión de impulsión ≤ 15 bar."}
      ],
      sum: ["Dimensionado: caudal nominal, presión nominal y tiempo de autonomía.","BIE + rociadores: categoría II como mínimo.","Depósito: 15 años sin vaciar; aportación a ≥ 2 m de la aspiración.","Bombas: ≤ 15 bar y 140 % del caudal a ≥ 70 % de la presión."] },
      { id: "pci-3.4", apt: ["pci-3.4"], title: "3.4. Hidrantes",
      cards: [
        {"t":"ex","h":"Tipos y número","p":"De <b>columna</b> (seca o húmeda) o de <b>arqueta</b> (heladas, tráfico). Uno entre 2.000 y 10.000 m², más uno por cada 10.000 m² o fracción; cuentan los de la vía pública a <b>&lt; 100 m</b>."},
        {"t":"num","q":"¿A qué distancia máxima cuentan los hidrantes de la vía pública?","v":100,"u":"m","e":"Cuentan los hidrantes de la vía pública a menos de 100 m."},
        {"t":"ex","h":"Prestaciones y ubicación","p":"Al menos uno con salida de <b>100 mm</b>; caudal mínimo <b>500 l/min</b>; presión <b>100 kPa</b> si solo llenan camiones, <b>500 kPa</b> en el resto. Industrial: radio de protección de <b>40 m</b> y al menos <b>5 m</b> de la fachada. Armario: dos mangueras de 45 y una de 70 mm, lanzas, reducción, llave y bifurcación siamesa."},
        {"t":"q","ref":"1o63bck"},   // pci-temario nº 58: El caudal mínimo de cada boca de hidrante es:
        {"t":"img","fig":"f15","q":"En la figura, ¿qué indican el círculo discontinuo y la flecha de 5 m?","o":["Radio de protección de 40 m y distancia mínima de 5 m a la fachada","Radio de 5 m y distancia máxima de 40 m a la fachada","Alcance de la manguera y distancia a la salida"],"c":0,"e":"Hidrante industrial: radio de protección de 40 m y al menos 5 m de la fachada."},
        {"t":"fill","q":"Completa el contenido del armario del hidrante.","items":["Dos mangueras de {} mm","Una manguera de {} mm","Lanzas, reducción, llave y bifurcación {}"],"ans":["45","70","siamesa"],"dis":["25","100","simple"],"e":"Armario: dos mangueras de 45 y una de 70 mm, lanzas, reducción, llave y bifurcación siamesa."},
        {"t":"q","q":"La presión mínima de un hidrante que solo sirve para llenar camiones es:","o":["100 kPa","500 kPa","980 kPa"],"c":0,"e":"Temario 3.4: 100 kPa si solo llenan camiones, 500 kPa en el resto."}
      ],
      sum: ["Uno entre 2.000 y 10.000 m², más uno por cada 10.000 m²; cuentan los de la vía pública a < 100 m.","Salida de 100 mm, 500 l/min, 500 kPa (100 kPa si solo llenan camiones).","Industrial: radio de 40 m y ≥ 5 m de la fachada."] },
      { id: "pci-3.5-1", apt: ["pci-3.5"], title: "3.5. BIE: ubicación y red",
      cards: [
        {"t":"ex","h":"Ubicación de las BIE","p":"Armario, devanadera, manómetro, válvula, manguera y lanza (UNE-EN 671). Boquilla y válvula a <b>≤ 1,50 m</b>; a <b>≤ 5 m</b> de las salidas del sector; radio de acción = <b>manguera + 5 m</b>; separación máxima <b>50 m</b>.","fig":"f16"},
        {"t":"q","ref":"11dto0t"},   // pci-temario nº 59: Las BIE deben situarse a una distancia máxima de las salidas del sector de:
        {"t":"q","ref":"12g0pa8"},   // pci-temario nº 60: El radio de acción de una BIE es:
        {"t":"num","q":"Separación máxima entre BIE.","v":50,"u":"m","e":"BIE: separación máxima de 50 m."},
        {"t":"ex","h":"Mangueras, red y prueba","p":"Manguera plana máx. <b>20 m</b>; semirrígida máx. <b>30 m</b>. Red: las <b>2 BIE más desfavorables durante 1 hora</b>, presión dinámica <b>300–600 kPa</b>. Prueba: presión máxima de servicio y como mínimo <b>980 kPa</b> (10 kg/cm²) durante <b>2 horas</b> sin fugas."},
        {"t":"q","ref":"0xubxey"},   // pci-verif nº 70: Las BIE pueden llevar manguera plana de hasta 20 m o semirrígida de hasta 30 m.
        {"t":"q","ref":"0xlm1z4"},   // pci-temario nº 61: La red de BIE debe garantizar durante una hora el caudal de las dos más desfavorables a un
        {"t":"num","q":"Presión mínima de la prueba de la red de BIE.","v":980,"u":"kPa","e":"Prueba a la presión máxima de servicio y como mínimo 980 kPa (10 kg/cm²) durante 2 horas."},
        {"t":"q","ref":"0plfsad"}   // pci-temario nº 87: Antes de su puesta en servicio, la red de BIE se prueba a una presión mínima de 980 kPa du
      ],
      sum: ["BIE a ≤ 5 m de las salidas, separación ≤ 50 m, radio = manguera + 5 m, válvula a ≤ 1,50 m.","Manguera plana hasta 20 m; semirrígida hasta 30 m.","Red: 2 BIE durante 1 h a 300–600 kPa.","Prueba: ≥ 980 kPa durante 2 h."] },
      { id: "pci-3.5-2", apt: ["pci-3.5"], title: "3.5. BIE de 25 y 45 mm",
      cards: [
        {"t":"ex","h":"25 frente a 45 mm","p":"Diferencias que caen en el examen.","tab":{"h":["","BIE 25 mm","BIE 45 mm"],"r":[["Manguera","Semirrígida, 20 m","Flexible (plana), 20 m"],["Caudal","100 l/min a 3,5 bar","200 l/min a 3,5 bar"],["Uso","Riesgo bajo; manejable por una persona","Riesgo medio o alto; 2 personas con formación previa"]]}},
        {"t":"q","ref":"1ahatj5"},   // pci-temario nº 11: Las BIE de 45 mm:
        {"t":"ojo","p":"Que la BIE de 45 mm la manejen 2 personas con formación previa sale del examen (pregunta 11), no de las diapositivas, que solo dan diámetro, manguera y caudal."},
        {"t":"num","q":"Caudal de una BIE de 45 mm a 3,5 bar.","v":200,"u":"l/min","e":"BIE 45 mm: 200 l/min a 3,5 bar (la de 25 mm, 100 l/min)."},
        {"t":"ex","h":"BIE en establecimientos industriales (RSCIEI)","p":"Según el riesgo intrínseco.","tab":{"h":["Riesgo intrínseco","BIE","Simultaneidad","Autonomía"],"r":[["Bajo","DN 25","2","60 min"],["Medio","DN 45","2","60 min"],["Alto","DN 45","3","90 min"]]}},
        {"t":"q","ref":"02sk8so"},   // pci-temario nº 62: Un establecimiento industrial de riesgo intrínseco alto requiere BIE de:
        {"t":"match","q":"Empareja cada caso con su dato.","pairs":[["Riesgo bajo (RSCIEI)","DN 25, 2 BIE, 60 min"],["Riesgo medio (RSCIEI)","DN 45, 2 BIE, 60 min"],["Riesgo alto (RSCIEI)","DN 45, 3 BIE, 90 min"],["BIE 25 mm","100 l/min a 3,5 bar"],["BIE 45 mm","200 l/min a 3,5 bar"]],"e":"Tablas del apartado 3.5."}
      ],
      sum: ["BIE 25: 100 l/min, semirrígida, riesgo bajo, una persona.","BIE 45: 200 l/min, plana, riesgo medio o alto, 2 personas con formación (dato del examen).","RSCIEI: alto, DN 45 con 3 BIE durante 90 min."] },
      { id: "pci-3.6", apt: ["pci-3.6"], title: "3.6. Columna seca",
      cards: [
        {"t":"ex","h":"Qué es","p":"Uso <b>exclusivo de bomberos</b>: lleva agua del camión a las plantas sin perder presión. Tubería de <b>acero galvanizado</b> de <b>80 mm</b> de diámetro interior (DN 80)."},
        {"t":"q","ref":"0k3d0zg"},   // pci-temario nº 12: La columna seca está normativamente constituida por:
        {"t":"q","ref":"1jiztgf"},   // pci-temario nº 63: La columna seca es de uso exclusivo de los bomberos.
        {"t":"ex","h":"Toma y salidas","p":"Toma en fachada <b>IPF-41</b> (siamesa 70 mm, centro a 90 cm del suelo, hornacina 55×40×30 cm, a &lt; 18 m del punto de conexión). Salidas <b>IPF-39</b> (siamesa 45 mm) en descansillos; sobre rasante cada dos plantas hasta la 8ª y en todas a partir de ahí; llave de seccionamiento cada cuatro plantas."},
        {"t":"q","ref":"0gv97ib"},   // pci-temario nº 64: La toma de alimentación de la columna seca en fachada es la:
        {"t":"img","fig":"f17","q":"En el esquema, ¿qué representan las barras horizontales oscuras de las plantas 4 y 8?","o":["Llaves de seccionamiento, cada cuatro plantas","Salidas IPF-39","Tomas IPF-41"],"c":0,"e":"Las salidas IPF-39 son los rectángulos; la llave de seccionamiento va cada cuatro plantas."},
        {"t":"ex","h":"Prueba","p":"Prueba a <b>20 bar durante 2 horas</b> sin fugas. Una columna completa por caja de escalera hasta el último forjado pisable."},
        {"t":"num","q":"Presión de prueba de la columna seca.","v":20,"u":"bar","e":"Columna seca: prueba a 20 bar durante 2 horas sin fugas."},
        {"t":"match","q":"Empareja cada dato de la columna seca.","pairs":[["IPF-41","Toma en fachada (siamesa 70 mm)"],["IPF-39","Salida en planta (siamesa 45 mm)"],["90 cm","Altura del centro de la toma"],["18 m","Distancia máxima de la toma al punto de conexión"],["Cada 4 plantas","Llave de seccionamiento"]],"e":"Apartado 3.6."}
      ],
      sum: ["Columna seca: uso exclusivo de bomberos, acero galvanizado DN 80.","Toma IPF-41 en fachada; salidas IPF-39 cada dos plantas hasta la 8ª y en todas después.","Seccionamiento cada cuatro plantas.","Prueba a 20 bar durante 2 h."] },
      { id: "pci-3.7", apt: ["pci-3.7"], title: "3.7. Rociadores automáticos",
      cards: [
        {"t":"ex","h":"Rociadores (UNE-EN 12845)","p":"<b>Detectan</b> el incendio y lo <b>apagan o lo controlan</b> en su fase inicial. Abastecimiento + puestos de control + red de tuberías con cabezas."},
        {"t":"q","ref":"0a22a2q"},   // pci-temario nº 13: Los rociadores automáticos de agua permiten detectar el incendio y apagarlo.
        {"t":"q","ref":"0zcu836"},   // pci-verif nº 76: Un sistema de rociadores consta de abastecimiento de agua y una o varias instalaciones, ca
        {"t":"ex","h":"Ejemplo: administrativo en altura","p":"Diseño del ejemplo del temario.","tab":{"h":["Parámetro","Valor"],"r":[["Riesgo","Ordinario grupo 1 (RO1)"],["Área de operación","216 m²"],["Superficie por rociador","12 m²"],["Separación","2–4 m"],["Densidad","5 l/min·m²"],["Mínimo de rociadores","18"],["Duración","60 minutos"],["Tubería","Húmeda"]]}},
        {"t":"num","q":"Área de operación del ejemplo RO1.","v":216,"u":"m²","e":"Ejemplo RO1: área de operación 216 m², 12 m² por rociador."},
        {"t":"num","q":"Densidad de diseño del ejemplo RO1.","v":5,"u":"l/min·m²","e":"Ejemplo RO1: densidad 5 l/min·m² durante 60 minutos."},
        {"t":"q","q":"En el ejemplo RO1 del temario, el número mínimo de rociadores es:","o":["12","18","216"],"c":1,"e":"Mínimo 18 rociadores (216 m² / 12 m² por rociador)."}
      ],
      sum: ["Los rociadores detectan y apagan o controlan el incendio en su fase inicial.","Constan de abastecimiento, puestos de control y red de tuberías con cabezas.","Ejemplo RO1: 216 m², 12 m²/rociador, 5 l/min·m², mínimo 18, 60 min, tubería húmeda."] },
      { id: "pci-3.8", apt: ["pci-3.8"], title: "3.8. Señalización, agua nebulizada y gases",
      cards: [
        {"t":"ex","h":"Señales","p":"Señales <b>UNE 23033-1</b> para extintores, BIE, pulsadores y disparos de extinción. <b>210 × 210 mm hasta 10 m</b>; el tamaño depende de la distancia de observación."},
        {"t":"q","ref":"1ry3xrw"},   // pci-temario nº 14: El tamaño de la señalética fotoluminiscente depende de la distancia de observación.
        {"t":"num","q":"Distancia de observación máxima de una señal de 210 × 210 mm.","v":10,"u":"m","e":"Señal de 210 × 210 mm hasta 10 m de observación."},
        {"t":"ex","h":"Fotoluminiscentes","p":"Normas UNE 23035-1, -2 y -4 (mantenimiento <b>UNE 23035-3</b>). Parte superior a 30 cm del techo y borde inferior a 2–2,50 m."},
        {"t":"q","ref":"1h750nf"},   // pci-verif nº 40: El mantenimiento de las señales fotoluminiscentes se realiza conforme a la norma:
        {"t":"ex","h":"Agua nebulizada y gases","p":"<b>Agua nebulizada</b>: gotas muy finas que enfrían, desplazan oxígeno al evaporarse y frenan la radiación. Menos daños por agua, menos peso y consumo, sin toxicidad. <b>Gases</b>: dieléctricos y limpios (CPD, baja tensión); asociados a detección y alarma, con <b>retardo para evacuar</b> por riesgo de asfixia."},
        {"t":"q","ref":"126rcyh"},   // pci-temario nº 66: Los sistemas de extinción por gases llevan retardo para:
        {"t":"notin","q":"¿Cuál NO es una ventaja del agua nebulizada según el temario?","o":["Menos daños por agua","Menos peso y consumo","Sin toxicidad","Es dieléctrica y apta para baja tensión"],"c":3,"e":"Dieléctricos y limpios son los gases. Agua nebulizada: menos daños, menos peso y consumo, sin toxicidad."}
      ],
      sum: ["Señal 210 × 210 mm hasta 10 m; el tamaño depende de la distancia.","Fotoluminiscentes: mantenimiento UNE 23035-3.","Agua nebulizada: enfría, desplaza oxígeno y frena la radiación.","Gases: retardo para evacuar por riesgo de asfixia."] }
    ]},
    { n: 4, name: "Control de humos y presurización diferencial", lessons: [
      { id: "pci-4.1", apt: ["pci-4.1"], title: "4.1. Finalidad del control de humos",
      cards: [
        {"t":"ex","h":"Para qué sirve","p":"Proteger la evacuación extrayendo o conteniendo el humo; las muertes se deben sobre todo a la <b>inhalación de humos</b>, no a la temperatura. También ayudan a los bomberos. En diseño se usan estudios prestacionales con CFD."},
        {"t":"q","ref":"0aedihr"},   // pci-temario nº 67: La mayoría de las muertes en incendios de locales de pública concurrencia se deben a:
        {"t":"ex","h":"Medidas y escaleras","p":"<b>Activas</b>: detección y extinción. <b>Pasivas</b>: arquitectura (dimensionado de vías de evacuación, sectorización, puertas RF, sellado de pasos). Escaleras: protegida, especialmente protegida y abierta al exterior. <b>Altura de evacuación</b>: diferencia de cota entre origen de evacuación y salida."},
        {"t":"notin","q":"¿Cuál NO es una medida pasiva según el temario?","o":["Sectorización","Puertas RF","Sellado de pasos","Detección"],"c":3,"e":"La detección (y la extinción) son medidas activas."},
        {"t":"q","q":"La altura de evacuación es:","o":["La altura total del edificio","La diferencia de cota entre el origen de evacuación y la salida","La altura del último forjado pisable"],"c":1,"e":"Temario 4.1: diferencia de cota entre origen de evacuación y salida."},
        {"t":"fill","q":"Completa los tipos de escalera que cita el temario.","items":["Escalera {}","Escalera especialmente {}","Escalera abierta al {}"],"ans":["protegida","protegida","exterior"],"dis":["presurizada","interior"],"e":"Escaleras: protegida, especialmente protegida y abierta al exterior."}
      ],
      sum: ["El control de humo protege la evacuación: se muere sobre todo por inhalar humo.","Activas: detección y extinción. Pasivas: arquitectura.","Altura de evacuación: diferencia de cota entre origen y salida."] },
      { id: "pci-4.2", apt: ["pci-4.2"], title: "4.2. Estrategias del RIPCI",
      cards: [
        {"t":"ex","h":"Cuatro estrategias (anexo I, punto 13)","p":"Cada una para un tipo de edificio.","tab":{"h":["Estrategia","Dónde"],"r":[["Flotabilidad de gases calientes (aireadores naturales o mecánicos)","Edificios de techo alto"],["Presurización diferencial","Vías de evacuación"],["Ventilación horizontal (jet fan)","Edificios poco esbeltos: túneles y aparcamientos"],["Extracción de humos","Aparcamientos o tras la actuación de la supresión"]]},"fig":"f18"},
        {"t":"q","ref":"0r90h9x"},   // pci-temario nº 68: La estrategia de presurización diferencial se aplica en:
        {"t":"match","q":"Empareja cada estrategia con su aplicación.","pairs":[["Flotabilidad","Edificios de techo alto"],["Presurización diferencial","Vías de evacuación"],["Ventilación horizontal (jet fan)","Túneles y aparcamientos"],["Extracción de humos","Tras la actuación de la supresión"]],"e":"Tabla del apartado 4.2."},
        {"t":"ex","h":"Normas","p":"<b>Flotabilidad</b>: diseño UNE 23585; instalación y mantenimiento UNE 23584. <b>Presión diferencial</b>: UNE-EN 12101-6 y UNE 23584. <b>Ventilación horizontal</b>: no hay norma UNE-EN; documentos de reconocida solvencia y análisis prestacional con CFD. <b>Extracción</b>: por renovaciones por hora."},
        {"t":"q","ref":"035qxuq"},   // pci-temario nº 70: Los sistemas de control de humo por flotabilidad se diseñan según la norma:
        {"t":"q","ref":"0ug9rqn"},   // pci-temario nº 69: Para la ventilación horizontal (jet fan) existe una norma UNE-EN de diseño.
        {"t":"ex","h":"Barreras, aireadores y exutorios","p":"Barreras de humo UNE-EN 12101-1; aireadores naturales 12101-2; mecánicos 12101-3. <b>Exutorios: en los puntos altos</b> (el humo sube)."},
        {"t":"q","ref":"09rz21s"},   // pci-temario nº 15: Los exutorios son sistemas de control de humo que se instalan en los puntos más bajos del 
        {"t":"match","q":"Empareja cada norma con su objeto.","pairs":[["UNE-EN 12101-1","Barreras de humo"],["UNE-EN 12101-2","Aireadores naturales"],["UNE-EN 12101-3","Aireadores mecánicos"],["UNE-EN 12101-6","Presión diferencial"],["UNE 23584","Instalación y mantenimiento"]],"e":"Normas del apartado 4.2."}
      ],
      sum: ["Flotabilidad: techos altos (UNE 23585 diseño, 23584 instalación).","Presurización: vías de evacuación (UNE-EN 12101-6).","Jet fan: sin UNE-EN, análisis prestacional con CFD.","Exutorios en los puntos altos."] },
      { id: "pci-4.3", apt: ["pci-4.3"], title: "4.3. Cuándo es obligatorio el control de humo",
      cards: [
        {"t":"ex","h":"CTE DB SI 3, ap. 8","p":"Aparcamientos no abiertos; comercial o pública concurrencia con <b>&gt; 1.000 personas</b>; atrios con <b>&gt; 500 personas</b>."},
        {"t":"q","ref":"0q9k923"},   // pci-temario nº 17: El control de humo se debe instalar en establecimientos de uso comercial o pública concurr
        {"t":"q","ref":"04v9x8y"},   // pci-temario nº 4: El control del humo del incendio se aplica a:
        {"t":"ex","h":"Aparcamientos con ventilación mecánica (DB HS 3)","p":"Extraer <b>150 l/plaza·s</b> y aportar 120 l/plaza·s; activación automática por detección; ventiladores <b>F300 60</b>; conductos E300 60 en un sector y EI 60 si atraviesan sectores; si h &gt; 4 m, compuertas E300 60 en las aberturas bajas."},
        {"t":"q","ref":"101ecmp"},   // pci-temario nº 72: En un aparcamiento con ventilación mecánica, los ventiladores de extracción deben ser:
        {"t":"num","q":"Caudal de extracción en un aparcamiento con ventilación mecánica.","v":150,"u":"l/plaza·s","e":"DB HS 3: extraer 150 l/plaza·s y aportar 120 l/plaza·s."},
        {"t":"ex","h":"RSCIEI (anexo II, punto 7)","p":"Producción: riesgo medio ≥ 2.000 m² o alto ≥ 1.000 m². Almacenamiento: riesgo medio ≥ 1.000 m² o alto ≥ 800 m²."},
        {"t":"q","ref":"1wdnf6u"},   // pci-temario nº 73: Según el RSCIEI, un sector de almacenamiento de riesgo alto necesita evacuación de humos a
        {"t":"fill","q":"Completa los umbrales de evacuación de humos del RSCIEI.","items":["Producción, riesgo medio: ≥ {} m²","Producción, riesgo alto: ≥ {} m²","Almacenamiento, riesgo medio: ≥ {} m²","Almacenamiento, riesgo alto: ≥ {} m²"],"ans":["2.000","1.000","1.000","800"],"dis":["500","1.500"],"e":"RSCIEI anexo II, punto 7: producción 2.000 / 1.000 m²; almacenamiento 1.000 / 800 m²."}
      ],
      sum: ["CTE: aparcamientos no abiertos, comercial o PC > 1.000 personas, atrios > 500.","Aparcamiento (HS 3): 150 l/plaza·s y ventiladores F300 60.","RSCIEI: almacenamiento de riesgo alto desde 800 m²."] },
      { id: "pci-4.4", apt: ["pci-4.4"], title: "4.4. Ventilación de escaleras protegidas",
      cards: [
        {"t":"ex","h":"Tres formas (CTE DB SI)","p":"Ventana o hueco al exterior de <b>al menos 1 m² por planta</b>. O conductos de entrada y salida <b>exclusivos</b>: 50 cm² por m³ de recinto; rejilla de entrada con su parte superior a &lt; 1 m del suelo y de salida enfrentada con la parte inferior a &gt; 1,8 m. O sistema de <b>presión diferencial</b> según EN 12101-6.","fig":"f19"},
        {"t":"q","ref":"0xwop1o"},   // pci-temario nº 18: En las escaleras protegidas la ventilación se puede hacer:
        {"t":"num","q":"Superficie mínima del hueco al exterior por planta.","v":1,"u":"m²","e":"Hueco al exterior de al menos 1 m² por planta. La trampa del examen era 0,5 m²."},
        {"t":"q","ref":"040b80j"},   // pci-temario nº 74: En una escalera protegida ventilada por conductos, estos pueden compartirse con la ventila
        {"t":"num","q":"Sección de los conductos exclusivos por cada m³ de recinto.","v":50,"u":"cm²","e":"Conductos: 50 cm² por m³ de recinto."},
        {"t":"q","q":"En la ventilación por conductos, la rejilla de salida se sitúa:","o":["Enfrentada a la de entrada, con su parte inferior a más de 1,8 m","Con su parte superior a menos de 1 m del suelo","Junto a la rejilla de entrada"],"c":0,"e":"Entrada: parte superior a < 1 m del suelo. Salida: enfrentada, con la parte inferior a > 1,8 m."}
      ],
      sum: ["Hueco al exterior ≥ 1 m² por planta (no 0,5 m²).","Conductos exclusivos (nunca compartidos): 50 cm²/m³; entrada < 1 m, salida > 1,8 m.","O presión diferencial (EN 12101-6)."] },
      { id: "pci-4.5", apt: ["pci-4.5","pci-4.6"], title: "4.5 y 4.6. Diseño de la presurización e influencias externas",
      cards: [
        {"t":"ex","h":"Criterios (UNE-EN 12101-6)","p":"Objetivo: gradiente de presión con la máxima en las vías de escape. Flujo por puerta abierta <b>≥ 0,75 m/s</b>. Diferencia de presión (clase E): <b>10 Pa</b> con puertas abiertas; <b>50 Pa</b> con puertas cerradas; tolerancia ±10 %. Fuerza de apertura de puerta <b>≤ 100 N</b>.","fig":"f20"},
        {"t":"q","ref":"117bzne"},   // pci-temario nº 75: En presurización, la velocidad del aire por la puerta abierta no será inferior a:
        {"t":"q","ref":"18zwynk"},   // pci-temario nº 76: En un sistema de presurización de clase E, con las puertas cerradas la diferencia de presi
        {"t":"num","q":"Fuerza máxima para abrir una puerta en un espacio presurizado.","v":100,"u":"N","e":"Fuerza de apertura de puerta ≤ 100 N."},
        {"t":"ex","h":"Caudal y funcionamiento","p":"Caudal: fugas con puertas cerradas × al menos 1,5; puertas abiertas + 15 % por pérdidas; <b>se toma el mayor</b>. Funcionamiento: arranca con la alarma, abre las salidas de escape en la planta del incendio y <b>para los climatizadores</b>."},
        {"t":"q","ref":"1wocvyc"},   // pci-temario nº 78: Al activarse la presurización de una escalera, los climatizadores del edificio deben:
        {"t":"q","q":"El caudal de diseño de la presurización es:","o":["El mayor entre fugas con puertas cerradas × 1,5 y puertas abiertas + 15 %","Siempre el de puertas cerradas","El menor de los dos"],"c":0,"e":"Temario 4.5: se calculan los dos y se toma el mayor."},
        {"t":"ex","h":"Influencias externas (4.6, UNE 23585)","p":"Viento, temperatura exterior (CTE DB SE-AE tabla E-1) y nieve (tabla E-2)."},
        {"t":"notin","q":"¿Cuál NO es una influencia externa que cite el temario?","o":["Viento","Temperatura exterior","Nieve","Humedad relativa"],"c":3,"e":"Temario 4.6: viento, temperatura exterior (tabla E-1) y nieve (tabla E-2)."}
      ],
      sum: ["≥ 0,75 m/s por la puerta abierta.","Clase E: 10 Pa con puertas abiertas, 50 Pa cerradas; apertura ≤ 100 N.","Caudal: el mayor de los dos cálculos; al arrancar se paran los climatizadores.","Influencias externas (UNE 23585): viento, temperatura y nieve."] }
    ]},
    { n: 5, name: "Verificación, mantenimiento e inspección", lessons: [
      { id: "pci-5.1", apt: ["pci-5.1"], title: "5.1. Qué pretende cada norma",
      cards: [
        {"t":"ex","h":"Tres normas","p":"Objeto y estructura de cada una.","tab":{"h":["Norma","Objeto","Estructura"],"r":[["CTE DB SI (SI 4)","Condiciones de edificios no industriales; dotación","Por usos"],["RSCIEI (RD 2267/2004)","Seguridad suficiente en establecimientos industriales","17 artículos y 4 anexos"],["RIPCI (RD 513/2017)","Equipos, instalación, mantenimiento, instaladores y mantenedores","23 artículos, 9 disposiciones y 3 anexos"]]}},
        {"t":"q","ref":"0bipfu2"},   // pci-temario nº 86: El RIPCI se estructura en:
        {"t":"num","q":"¿Cuántos artículos tiene el RSCIEI?","v":17,"u":"artículos","e":"RSCIEI: 17 artículos y 4 anexos."},
        {"t":"q","ref":"18yosme"},   // pci-verif nº 3: El objeto del CTE DB SI es establecer las condiciones de los edificios:
        {"t":"q","ref":"0thfroe"}   // pci-verif nº 13: El RIPCI también regula las condiciones de control de los productos a emplear.
      ],
      sum: ["CTE DB SI: edificios no industriales, por usos.","RSCIEI: 17 artículos y 4 anexos.","RIPCI: 23 artículos, 9 disposiciones y 3 anexos."] },
      { id: "pci-5.2", apt: ["pci-5.2"], title: "5.2. CTE DB SI 4",
      cards: [
        {"t":"ex","h":"Dotación y requisitos generales","p":"Dotación por usos: residencial vivienda, administrativo, residencial público, hospitalario, docente, comercial, pública concurrencia y aparcamiento. Requisitos generales: extintores, BIE (riesgo especial), ascensor de emergencia (<b>altura</b>), hidrantes (altura y superficie), extinción automática (altura, cocinas y centros de transformación por <b>potencia</b>)."},
        {"t":"q","ref":"1e0aecg"},   // pci-verif nº 10: Entre los requisitos generales del DB SI 4, el ascensor de emergencia depende de:
        {"t":"q","ref":"0aox65g"},   // pci-verif nº 11: En el DB SI 4, la extinción automática en cocinas depende de:
        {"t":"ex","h":"Locales y puesta en funcionamiento","p":"Locales de riesgo especial: <b>alto, medio o bajo</b> (técnicos, cocinas, almacenes, garajes). Puesta en funcionamiento: certificado de la empresa instaladora ante la comunidad autónoma."},
        {"t":"q","ref":"1gc30uj"},   // pci-verif nº 12: Los locales de riesgo especial se clasifican en riesgo:
        {"t":"notin","q":"¿Cuál NO es uno de los usos de la dotación del DB SI 4?","o":["Docente","Hospitalario","Aparcamiento","Industrial"],"c":3,"e":"El DB SI no se aplica a uso industrial: eso va por el RSCIEI."}
      ],
      sum: ["DB SI 4: dotación por usos (no industrial).","Ascensor de emergencia según la altura; extinción automática en cocinas según la potencia.","Locales de riesgo especial: alto, medio o bajo."] },
      { id: "pci-5.3", apt: ["pci-5.3"], title: "5.3. RSCIEI: puesta en marcha e inspección",
      cards: [
        {"t":"ex","h":"Ámbito y puesta en marcha","p":"Ámbito: industrias, almacenamientos industriales, talleres de reparación y estacionamientos de vehículos de transporte, y servicios auxiliares. Puesta en marcha: certificado de <b>técnico titulado competente</b> ante la CCAA con riesgo intrínseco del establecimiento, sectores y su riesgo, características constructivas y certificado de la instaladora."},
        {"t":"q","ref":"02o6ltp"},   // pci-verif nº 61: El RSCIEI se aplica a los talleres de reparación y estacionamientos de vehículos de transp
        {"t":"q","ref":"0lo6xtz"},   // pci-temario nº 85: El certificado para la puesta en marcha de un establecimiento industrial lo emite:
        {"t":"q","ref":"022ut6t"},   // pci-verif nº 62: ¿Cuál de estos datos NO figura en el certificado de puesta en marcha de un establecimiento
        {"t":"ex","h":"Inspección por organismo de control","p":"Comprueba que no haya cambios de actividad ni ampliaciones, que se mantengan tipología, sectores y riesgo, y que los sistemas y su mantenimiento sigan el RIPCI. Acta firmada por el técnico del OCA y el titular. Periodicidad máxima: riesgo bajo <b>5 años</b>, medio <b>3</b>, alto <b>2</b>.","fig":"f22"},
        {"t":"match","q":"Empareja cada caso con su periodicidad máxima de inspección.","pairs":[["RSCIEI, riesgo bajo","5 años"],["RSCIEI, riesgo medio","3 años"],["RSCIEI, riesgo alto","2 años"],["RIPCI (no industrial)","10 años"]],"e":"Apartados 5.3 y 5.6: RSCIEI 5-3-2 años; RIPCI cada 10 años."},
        {"t":"q","ref":"0votxly"},   // pci-verif nº 58: En la inspección de un establecimiento industrial NO se comprueba:
        {"t":"ex","h":"Fórmulas del riesgo","p":"Riesgo de un sector: <b>Qs = Σ(Gi·qi·Ci)·Ra / A</b>. Riesgo del edificio: <b>Qe = Σ(Qsi·Ai) / ΣAi</b>."},
        {"t":"q","ref":"1n5f3tt"},   // pci-verif nº 67: Un edificio industrial con dos sectores de 1.000 m², uno con Qs = 400 y otro con Qs = 1.20
        {"t":"num","q":"Sector de 100 m² con 10.000 kg de un combustible de 17 MJ/kg (Ci = 1, Ra = 1): ¿cuánto vale Qs?","v":1700,"u":"MJ/m²","e":"Qs = 10.000 × 17 × 1 × 1 / 100 = 1.700 MJ/m²: riesgo medio (nivel 4)."}
      ],
      sum: ["Puesta en marcha industrial: certificado de técnico titulado competente ante la CCAA.","Inspección RSCIEI: bajo 5, medio 3, alto 2 años; acta del OCA y el titular.","Qs = Σ(Gi·qi·Ci)·Ra / A; Qe = Σ(Qsi·Ai) / ΣAi."] },
      { id: "pci-5.4", apt: ["pci-5.4"], title: "5.4. RIPCI: puesta en marcha",
      cards: [
        {"t":"ex","h":"Antes de poner en funcionamiento","p":"Certificado de la <b>empresa instaladora</b>, firmado por su técnico titulado, ante la CCAA. Contrato de mantenimiento con mantenedora habilitada, <b>salvo que el titular se habilite como mantenedor</b>."},
        {"t":"q","ref":"1jynvqa"},   // pci-temario nº 79: Para poner en funcionamiento una instalación del RIPCI hay que presentar ante la comunidad
        {"t":"q","ref":"1fmialh"},   // pci-verif nº 7: El certificado de la empresa instaladora del RIPCI lo emite:
        {"t":"q","ref":"0s2g63h"},   // pci-verif nº 2: El titular de una instalación de protección contra incendios puede asumir las funciones de
        {"t":"q","ref":"05eslee"}   // pci-verif nº 8: El certificado de la instaladora acredita que la instalación cumple el RIPCI y se ajusta:
      ],
      sum: ["Certificado de la empresa instaladora, firmado por su técnico titulado, ante la CCAA.","Contrato con mantenedora habilitada, salvo que el titular se habilite.","El certificado acredita que la instalación cumple el RIPCI y se ajusta al proyecto o documentación técnica."] },
      { id: "pci-5.5-1", apt: ["pci-5.5"], title: "5.5. Mantenimiento: quién y cuándo",
      cards: [
        {"t":"ex","h":"Quién puede hacer cada programa","p":"Según el RIPCI.","tab":{"h":["Programa","Quién puede hacerlo"],"r":[["Trimestral y semestral","Fabricante, mantenedora o personal del titular"],["Anual y quinquenal","Solo fabricante o mantenedora"],["Señalización luminiscente (anual)","Fabricante, mantenedora o personal del titular"]]},"fig":"f21"},
        {"t":"q","ref":"0bpuem0"},   // pci-temario nº 80: Las operaciones de mantenimiento anuales y quinquenales pueden realizarlas:
        {"t":"q","ref":"1y1bvn7"},   // pci-verif nº 15: Las operaciones de mantenimiento trimestrales y semestrales pueden realizarlas:
        {"t":"q","ref":"12dpxin"},   // pci-verif nº 24: El mantenimiento anual de la señalización luminiscente lo puede hacer el personal del titu
        {"t":"ex","h":"Actas y vida útil","p":"Actas firmadas, a disposición de la CCAA <b>al menos 5 años</b>. Vida útil de detectores y de señales fotoluminiscentes: la del fabricante o, si no la indica, <b>10 años</b>."},
        {"t":"num","q":"¿Cuántos años, como mínimo, deben estar las actas a disposición de la CCAA?","v":5,"u":"años","e":"Actas a disposición de la CCAA al menos 5 años."},
        {"t":"q","ref":"0dggzsc"}   // pci-temario nº 81: Si el fabricante no indica la vida útil de los detectores, esta se considera de:
      ],
      sum: ["Trimestral y semestral: también el personal del titular.","Anual y quinquenal: solo fabricante o mantenedora.","Actas: al menos 5 años. Vida útil: la del fabricante o 10 años."] },
      { id: "pci-5.5-2", apt: ["pci-5.5"], title: "5.5. Mantenimiento de la detección",
      cards: [
        {"t":"ex","h":"Qué se revisa y cada cuánto","p":"<b>Cada 3 meses</b>: funcionamiento con cada fuente, pilotos y fusibles, indicaciones de la central, acumuladores, prueba de baterías (fallo de red), señalización de pulsadores. <b>Cada 6 meses</b>: ubicación, visibilidad y estado de los pulsadores. <b>Cada año</b>: maniobras programadas, software de la central, espacio libre de 500 mm bajo detectores, prueba individual de todos los detectores y pulsadores."},
        {"t":"fill","q":"Completa la periodicidad.","items":["Prueba de baterías por fallo de red: cada {}","Ubicación, visibilidad y estado de los pulsadores: cada {}","Software de la central: cada {}","Prueba individual de todos los detectores: cada {}"],"ans":["3 meses","6 meses","año","año"],"dis":["mes","5 años"],"e":"Baterías, trimestral; ubicación de pulsadores, semestral; software y prueba de detectores, anual."},
        {"t":"q","ref":"1wyih9r"},   // pci-temario nº 82: La verificación de la ubicación, visibilidad y estado de los pulsadores se hace cada:
        {"t":"q","ref":"1y0anak"},   // pci-verif nº 20: La comprobación del espacio libre de 500 mm bajo los detectores puntuales tiene periodicid
        {"t":"num","q":"Espacio libre que debe quedar bajo los detectores.","v":500,"u":"mm","e":"Revisión anual: espacio libre de 500 mm bajo los detectores."},
        {"t":"q","ref":"14ffob8"}   // pci-verif nº 21: La prueba de conmutación del sistema de detección a baterías por fallo de red se realiza c
      ],
      sum: ["Trimestral: fuentes, pilotos, central, acumuladores, baterías y señalización de pulsadores.","Semestral: ubicación, visibilidad y estado de pulsadores.","Anual: maniobras, software, 500 mm libres y prueba de cada detector y pulsador."] },
      { id: "pci-5.6", apt: ["pci-5.6"], title: "5.6. RIPCI: inspección periódica",
      cards: [
        {"t":"ex","h":"Quién, cada cuánto y exenciones","p":"El titular la pide a un organismo de control <b>al menos cada 10 años</b>. Exentos: residencial vivienda; administrativo y docente &lt; 2.000 m²; comercial, pública concurrencia y aparcamiento &lt; 500 m²."},
        {"t":"q","ref":"1lhco8t"},   // pci-temario nº 83: Según el RIPCI, el titular debe solicitar la inspección de sus instalaciones a un organism
        {"t":"q","ref":"03y0bh5"},   // pci-verif nº 43: Está exento de la inspección periódica del RIPCI un edificio:
        {"t":"q","ref":"062k599"},   // pci-verif nº 51: Está exento de la inspección periódica del RIPCI un local de pública concurrencia de 600 m
        {"t":"fill","q":"Completa los casos exentos de inspección periódica.","items":["Residencial {}","Administrativo y docente < {} m²","Comercial, pública concurrencia y aparcamiento < {} m²"],"ans":["vivienda","2.000","500"],"dis":["público","1.000","5.000"],"e":"Exentos: residencial vivienda; administrativo y docente < 2.000 m²; comercial, PC y aparcamiento < 500 m²."},
        {"t":"ex","h":"Acta y defectos","p":"Acta firmada por el técnico del OCA y el titular. Si hay defectos, el OCA fija plazos; si son muy graves o no se corrigen, <b>avisa a la CCAA</b>."},
        {"t":"q","ref":"1xuj20x"},   // pci-temario nº 84: Si en una inspección se detectan defectos muy graves o no se corrigen en plazo, el organis
        {"t":"q","ref":"1ytjpcj"}   // pci-verif nº 53: El acta de inspección del RIPCI la firman:
      ],
      sum: ["Inspección RIPCI al menos cada 10 años, la pide el titular.","Exentos: vivienda; administrativo y docente < 2.000 m²; comercial, PC y aparcamiento < 500 m².","Defectos muy graves o sin corregir: el OCA avisa a la CCAA."] }
    ]}
  ],
  // Parte 2: chuleta [concepto, dato]
  cheat: [
    ["Combustión / deflagración / detonación","< 1 m/s / hasta la velocidad del sonido / > sonido"],
    ["Sectorización","Medida pasiva"],
    ["Riesgo intrínseco bajo / medio / alto","Qs ≤ 850 / ≤ 3.400 / > 3.400 MJ/m²"],
    ["Control de humo (CTE)","Aparcamiento no abierto · comercial o PC > 1.000 pers. · atrios > 500"],
    ["Pulsadores","≤ 25 m de recorrido · 80–120 cm de altura"],
    ["Detector óptico","Hasta 12 m de altura · 60–80 m²"],
    ["Avisador visual obligatorio","Ruido > 60 dB(A)"],
    ["Cableado de detección","Resistente 30 min si actúa > 1 min tras detectar"],
    ["Extintores","21A-113B a ≤ 15 m (10 m en riesgo especial alto) · 80–120 cm"],
    ["BIE","≤ 5 m de la salida · separación ≤ 50 m · radio manguera + 5 m · válvula ≤ 1,5 m"],
    ["BIE 25 / 45 mm","100 / 200 l/min a 3,5 bar · 300–600 kPa · 2 BIE durante 1 h"],
    ["Prueba red BIE","≥ 980 kPa durante 2 h"],
    ["Columna seca","Acero galvanizado DN 80 · prueba 20 bar 2 h · IPF-41 en fachada"],
    ["Hidrante","500 l/min · salida 100 mm · 500 kPa · radio 40 m · ≥ 5 m de fachada"],
    ["Bombas","140 % del caudal a ≥ 70 % de la presión · ≤ 15 bar"],
    ["Escalera protegida","Hueco ≥ 1 m²/planta · conductos exclusivos · o presurización"],
    ["Presurización","0,75 m/s · 10 Pa abiertas / 50 Pa cerradas · ≤ 100 N"],
    ["Aparcamiento (HS 3)","150 l/plaza·s · ventiladores F300 60"],
    ["Señal 210×210 mm","Hasta 10 m de observación"],
    ["Inspección RIPCI / RSCIEI","10 años / 5-3-2 años (bajo-medio-alto)"],
    ["Actas de mantenimiento","≥ 5 años"],
    ["Vida útil detectores y señales","10 años si el fabricante no indica otra"]
  ]
};
