export const FINCAS_INICIALES = [
  {
    id: 1,
    nombre: "Finca El Mirador del Café",
    propietario: "Don Hernando Roa",
    municipio: "Fusagasugá",
    vereda: "San Rafael",
    coordenadas: [4.3482, -74.3721],
    altitud: 1720,
    areaHa: 4.8,
    variedades: ["Castillo", "Caturra", "Borbón Rosado"],
    servicios: [
      "Cata guiada de café especial",
      "Sendero ecológico del beneficio",
      "Alojamiento rural (3 cabañas)",
      "Taller de tueste y barismo",
      "Gastronomía tradicional cundinamarquesa"
    ],
    certificaciones: ["Rainforest Alliance", "Café de Origen Cundinamarca"],
    descripcion: "Finca con más de 45 años de tradición cafetera en la vereda San Rafael. Cuenta con vista panorámica sobre la meseta de Chinauta y quebrada La Parroquia. Su beneficio ecológico reduce 95% el consumo de agua.",
    imagen: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 312 456 7890",
      email: "elmirador@agrofusagasuga.co",
      instagram: "@fincaelmirador_fusa"
    },
    dimensiones: {
      PS: 4.6, // Potencial Social/Productivo
      GA: 4.4, // Gestión Ambiental
      DS: 4.1, // Desarrollo Socioeconómico
      GC: 3.9, // Gestión Comercial
      AT: 4.8  // Atractivos Turísticos
    },
    isa: 88.6, // Nivel Azul (Excelente)
    evaluacionesHistoricas: [
      { fecha: "2024-03-15", isa: 74.2, encuestador: "María Paula Gómez" },
      { fecha: "2025-02-10", isa: 81.5, encuestador: "Camilo Ángel" },
      { fecha: "2026-08-22", isa: 88.6, encuestador: "María Paula Gómez" }
    ],
    subdimensionesGA: {
      ga1: 4.5, // Manejo de suelos
      ga2: 4.6, // Ahorro de agua
      ga3: 4.3, // Derivado: promedio GA2, GA4, GA6
      ga4: 4.2, // Gestión de residuos y pulpa
      ga5: 4.5, // Bosque nativo
      ga6: 4.2  // Energía solar
    },
    recomendaciones: [
      "Implementar sistema de reservas digital sincronizado con tour-operadores de Bogotá.",
      "Capacitar al personal guía en inglés básico para avistadores de aves extranjeros.",
      "Ampliar la huerta orgánica para autoabastecimiento del restaurante rural."
    ]
  },
  {
    id: 2,
    nombre: "Hacienda La Colina de los Robles",
    propietario: "Familia Morales Cárdenas",
    municipio: "Fusagasugá",
    vereda: "Los Robles",
    coordenadas: [4.3315, -74.3540],
    altitud: 1650,
    areaHa: 8.2,
    variedades: ["Colombia", "Geisha", "Castillo"],
    servicios: [
      "Tour del grano a la taza",
      "Glamping ecológico cafetero",
      "Avistamiento de aves de alta montaña",
      "Tienda de café tostado en origen"
    ],
    certificaciones: ["Sello de Sostenibilidad UTZ"],
    descripcion: "Emplazada entre robledales y cafetales bajo sombra en la cuenca del Río Cuja. Destaca por lotes micro-especiales de café Geisha con notas a jazmín y miel de caña.",
    imagen: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 310 987 6543",
      email: "contacto@lacolinafusa.com",
      instagram: "@lacolinadelosrobles"
    },
    dimensiones: {
      PS: 4.2,
      GA: 4.0,
      DS: 3.8,
      GC: 4.1,
      AT: 4.3
    },
    isa: 81.8, // Nivel Azul
    evaluacionesHistoricas: [
      { fecha: "2024-05-18", isa: 68.0, encuestador: "Camilo Ángel" },
      { fecha: "2025-09-04", isa: 76.4, encuestador: "María Paula Gómez" },
      { fecha: "2026-07-15", isa: 81.8, encuestador: "Camilo Ángel" }
    ],
    recomendaciones: [
      "Instalar paneles de señalización interpretativa en las 4 estaciones del robledal.",
      "Desarrollar maridaje de café con panela artesanal de la región del Sumapaz."
    ]
  },
  {
    id: 3,
    nombre: "Finca El Suspiro de La Aguadita",
    propietario: "Martha Lucía Bejarano",
    municipio: "Fusagasugá",
    vereda: "La Aguadita",
    coordenadas: [4.3640, -74.3412],
    altitud: 1840,
    areaHa: 3.2,
    variedades: ["Borbón Rosado", "Typica", "Castillo"],
    servicios: [
      "Senderismo por bosque de niebla",
      "Demostración de beneficio tradicional y honey",
      "Almuerzo campesino en leña",
      "Taller de siembra de plántulas"
    ],
    certificaciones: ["En proceso de certificación Fair Trade"],
    descripcion: "Ubicada en la vereda La Aguadita, privilegiada por microclima de bosque de niebla del Parque San Rafael. Pionera en procesos de beneficio tipo Honey y Maceración Carbónica.",
    imagen: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 314 231 9900",
      email: "suspiroaguadita@gmail.com",
      instagram: "@elsuspiro_cafe"
    },
    dimensiones: {
      PS: 3.9,
      GA: 4.3,
      DS: 3.4,
      GC: 3.1,
      AT: 3.8
    },
    isa: 74.5, // Nivel Verde (Alto)
    evaluacionesHistoricas: [
      { fecha: "2025-01-20", isa: 64.0, encuestador: "María Paula Gómez" },
      { fecha: "2026-06-11", isa: 74.5, encuestador: "María Paula Gómez" }
    ],
    recomendaciones: [
      "Mejorar zona de estacionamiento y rampa de acceso para personas con movilidad reducida.",
      "Crear empaque trilaminado con válvula desgasificadora para café molido."
    ]
  },
  {
    id: 4,
    nombre: "Villa Paraíso Agroturístico",
    propietario: "Gonzalo Quevedo",
    municipio: "Fusagasugá",
    vereda: "Chinauta",
    coordenadas: [4.3050, -74.4080],
    altitud: 1420,
    areaHa: 6.0,
    variedades: ["Castillo Naranjal", "Catuaí"],
    servicios: [
      "Piscina natural con aguas de manantial",
      "Paseo a caballo por los cafetales",
      "Hospedaje campestre colonial",
      "Eventos familiares y empresariales"
    ],
    certificaciones: ["RNT Registro Nacional de Turismo"],
    descripcion: "Finca en la vertiente cálida de Chinauta, combinando producción cafetera de media montaña con flores exóticas y clima templado ideal para descanso.",
    imagen: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 318 654 3210",
      email: "paraisochinauta@gmail.com",
      instagram: "@villaparaisochinauta"
    },
    dimensiones: {
      PS: 3.4,
      GA: 3.2,
      DS: 3.6,
      GC: 4.2,
      AT: 4.0
    },
    isa: 70.8, // Nivel Verde
    evaluacionesHistoricas: [
      { fecha: "2024-11-10", isa: 65.5, encuestador: "Camilo Ángel" },
      { fecha: "2026-04-02", isa: 70.8, encuestador: "María Paula Gómez" }
    ],
    recomendaciones: [
      "Aumentar porcentaje de sombra nativa en los lotes cafeteros para mejorar taza.",
      "Construir fosa techada para compostaje de pulpa de café y lodos."
    ]
  },
  {
    id: 5,
    nombre: "Finca Cafetera La Esperanza de Bethel",
    propietario: "Alba Nelly Forero",
    municipio: "Fusagasugá",
    vereda: "Bethel",
    coordenadas: [4.3510, -74.3310],
    altitud: 1780,
    areaHa: 2.7,
    variedades: ["Caturra Chiroso", "Castillo"],
    servicios: [
      "Recolección de café manual con canasto",
      "Despulpado y lavado participativo",
      "Degustación de café de filtro con pandeyuca",
      "Venta de miel de abejas polinizadoras"
    ],
    certificaciones: ["Finca Familiar Campesina"],
    descripcion: "Ejemplo de agricultura familiar campesina liderada por mujeres caficultoras. Cultivan bajo árboles de guamo y plátano, con apiario integrado que eleva el rendimiento de polinización.",
    imagen: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 320 876 5432",
      email: "laesperanza_bethel@outlook.com",
      instagram: "@cafe_laesperanza_bethel"
    },
    dimensiones: {
      PS: 3.6,
      GA: 3.8,
      DS: 3.7,
      GC: 2.5,
      AT: 3.0
    },
    isa: 66.9, // Nivel Verde
    evaluacionesHistoricas: [
      { fecha: "2026-01-18", isa: 66.9, encuestador: "María Paula Gómez" }
    ],
    recomendaciones: [
      "Formalizar canal comercial en redes sociales y punto de venta en plaza de Fusagasugá.",
      "Crear baterías de baños higiénicos exclusivos para visitantes turísticos."
    ]
  },
  {
    id: 6,
    nombre: "Reserva Agroturística El Guayabal",
    propietario: "Javier Darío Peñuela",
    municipio: "Fusagasugá",
    vereda: "Guayabal",
    coordenadas: [4.3210, -74.3820],
    altitud: 1560,
    areaHa: 5.5,
    variedades: ["Colombia", "Castillo"],
    servicios: [
      "Recorrido por la historia cafetera de Fusagasugá",
      "Camping campesino",
      "Taller de molienda en molino de mano tradicional"
    ],
    certificaciones: [],
    descripcion: "Finca mixta con café, frutales y ganado lechero. Ofrece una inmersión en la cotidianidad de la vida rural fusagasugueña con fogón de leña y cuentos campesinos.",
    imagen: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 313 543 2198",
      email: "elguayabal_fusa@gmail.com",
      instagram: "@reserva_elguayabal"
    },
    dimensiones: {
      PS: 3.0,
      GA: 2.8,
      DS: 2.9,
      GC: 2.2,
      AT: 3.1
    },
    isa: 56.7, // Nivel Amarillo (Medio)
    evaluacionesHistoricas: [
      { fecha: "2025-08-30", isa: 51.2, encuestador: "Camilo Ángel" },
      { fecha: "2026-05-14", isa: 56.7, encuestador: "María Paula Gómez" }
    ],
    recomendaciones: [
      "Implementar tanque desarenador y trampa de grasas en beneficio húmedo.",
      "Elaborar protocolo básico de bioseguridad y botiquín de primeros auxilios."
    ]
  },
  {
    id: 7,
    nombre: "Finca El Porvenir de Mesitas",
    propietario: "Octavio Garzón",
    municipio: "Fusagasugá",
    vereda: "Mesitas",
    coordenadas: [4.3720, -74.3680],
    altitud: 1690,
    areaHa: 2.1,
    variedades: ["Castillo"],
    servicios: [
      "Venta de café en grano",
      "Visita a vivero de café"
    ],
    certificaciones: [],
    descripcion: "Finca de tradición cafetera en proceso de adecuación de sus senderos para recibir turismo escolar y comunitario.",
    imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 311 234 5678",
      email: "elporvenirmesitas@gmail.com"
    },
    dimensiones: {
      PS: 2.5,
      GA: 2.2,
      DS: 2.1,
      GC: 1.8,
      AT: 2.0
    },
    isa: 42.9, // Nivel Amarillo
    evaluacionesHistoricas: [
      { fecha: "2026-03-10", isa: 42.9, encuestador: "Camilo Ángel" }
    ],
    recomendaciones: [
      "Adecuar pasamanos de guadua en tramos empinados del sendero.",
      "Organizar espacio de atención y recepción techada para visitantes."
    ]
  },
  {
    id: 8,
    nombre: "Finca Los Arrayanes",
    propietario: "Rigoberto Castro",
    municipio: "Fusagasugá",
    vereda: "El Placer",
    coordenadas: [4.3180, -74.3490],
    altitud: 1590,
    areaHa: 1.8,
    variedades: ["Variedad Colombia"],
    servicios: [
      "Venta directa de café pergamino seco"
    ],
    certificaciones: [],
    descripcion: "Predio cafetero tradicional en etapa inicial de diagnóstico. No cuenta actualmente con infraestructura turística habilitada.",
    imagen: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80",
    contacto: {
      telefono: "+57 315 876 1122",
      email: "arrayanes_elplacer@hotmail.com"
    },
    dimensiones: {
      PS: 2.0,
      GA: 1.8,
      DS: 1.6,
      GC: 1.4,
      AT: 1.5
    },
    isa: 34.2, // Nivel Naranja (Bajo)
    evaluacionesHistoricas: [
      { fecha: "2026-02-05", isa: 34.2, encuestador: "Camilo Ángel" }
    ],
    recomendaciones: [
      "Priorizar saneamiento básico y tratamiento de aguas mieles.",
      "Capacitación inicial en turismo rural con el SENA Fusagasugá."
    ]
  }
];

export const PREGUNTAS_ENCUESTA_MIESA = [
  {
    id: "ps1",
    dimension: "PS",
    codigo: "PS-01",
    titulo: "Tradición y relevo generacional en la caficultura",
    pregunta: "¿La familia caficultora cuenta con experiencia y vinculación de jóvenes o relevo generacional en las labores de la finca?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Sin relevo generacional, solo adultos mayores" },
      { valor: 2, etiqueta: "2 - Mínimo relevo ocasional" },
      { valor: 3, etiqueta: "3 - Participación familiar regular" },
      { valor: 4, etiqueta: "4 - Relevo activo con asignación de roles definidos" },
      { valor: 5, etiqueta: "5 - Familias jóvenes liderando procesos de innovación y agroturismo" }
    ]
  },
  {
    id: "ps2",
    dimension: "PS",
    codigo: "PS-02",
    titulo: "Calidad y diferenciación del café",
    pregunta: "¿Qué nivel de control de calidad en taza (puntaje SCA, beneficio controlado) se maneja en el predio?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Café comercial estándar sin análisis de taza" },
      { valor: 2, etiqueta: "2 - Beneficio tradicional sin separación de lotes" },
      { valor: 3, etiqueta: "3 - Café limpio (>80 puntos SCA) con secado solar" },
      { valor: 4, etiqueta: "4 - Café especial (>83 puntos SCA) con curvas de secado" },
      { valor: 5, etiqueta: "5 - Micro-lotes de alta especialidad (>85 SCA), honeys o naturales premiados" }
    ]
  },
  {
    id: "ga1",
    dimension: "GA",
    codigo: "GA-01",
    titulo: "Tratamiento de aguas mieles y beneficio ecológico",
    pregunta: "¿Cómo se gestionan las aguas residuales del lavado del café?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Vertimiento directo a fuentes hídricas o suelo" },
      { valor: 2, etiqueta: "2 - Fosa rudimentaria sin tratamiento bioquímico" },
      { valor: 3, etiqueta: "3 - Beneficio ecológico tipo Becolsub o Ecomill con bajo consumo" },
      { valor: 4, etiqueta: "4 - Sistema modular de tratamiento anaeróbico (SMTA) operativo" },
      { valor: 5, etiqueta: "5 - Circuito cerrado con recirculación y humedales artificiales biofiltrados" }
    ]
  },
  {
    id: "ga2",
    dimension: "GA",
    codigo: "GA-02",
    titulo: "Conservación de suelos y sombra nativa",
    pregunta: "¿Se implementan coberturas nobles, árboles de sombra nativos y barreras vivas?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Monocultivo a plena exposición con alta erosión" },
      { valor: 2, etiqueta: "2 - Sombra escasa sin manejo de pendientes" },
      { valor: 3, etiqueta: "3 - Sombra moderada con guamos y plátano" },
      { valor: 4, etiqueta: "4 - Sistema agroforestal con árboles nativos y terrazas vivas" },
      { valor: 5, etiqueta: "5 - Bosque protector, abono orgánico propio y cero herbicidas sintéticos" }
    ]
  },
  {
    id: "ga4",
    dimension: "GA",
    codigo: "GA-04",
    titulo: "Aprovechamiento integral de subproductos (pulpa y mucílago)",
    pregunta: "¿Qué destino se da a la pulpa del café y otros residuos orgánicos?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Acumulación a la intemperie sin manejo" },
      { valor: 2, etiqueta: "2 - Acumulación en fosa sin volteos regulares" },
      { valor: 3, etiqueta: "3 - Compostaje básico para abono de la misma finca" },
      { valor: 4, etiqueta: "4 - Lombricultivo tecnificado con producción de humus y lixiviados" },
      { valor: 5, etiqueta: "5 - Economía circular: té de cáscara para turistas, biogás o bioinsumos comerciales" }
    ]
  },
  {
    id: "ds1",
    dimension: "DS",
    codigo: "DS-01",
    titulo: "Condiciones laborales y equidad en la comunidad",
    pregunta: "¿Cómo se remunera y formaliza el trabajo de recolectores y guías locales?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Pago informal por kilo inferior al promedio" },
      { valor: 2, etiqueta: "2 - Pago estándar sin cobertura de seguridad social" },
      { valor: 3, etiqueta: "3 - Pago justo con alimentación e hidratación adecuada" },
      { valor: 4, etiqueta: "4 - Contratación formal, dotación y bonificación por recolección selectiva" },
      { valor: 5, etiqueta: "5 - Modelo cooperativo o sociedad que redistribuye beneficios agroturísticos" }
    ]
  },
  {
    id: "gc1",
    dimension: "GC",
    codigo: "GC-01",
    titulo: "Comercialización directa y canales turísticos",
    pregunta: "¿La finca comercializa café tostado con marca propia y recibe reservas?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Vende 100% café en pasilla/pergamino a intermediarios" },
      { valor: 2, etiqueta: "2 - Venta en cooperativa local sin marca registrada" },
      { valor: 3, etiqueta: "3 - Marca propia artesanal para visitantes de la finca" },
      { valor: 4, etiqueta: "4 - Marca registrada con empaque profesional y ventas por WhatsApp/redes" },
      { valor: 5, etiqueta: "5 - Tienda física y virtual, convenios con agencias y exportación directa" }
    ]
  },
  {
    id: "at1",
    dimension: "AT",
    codigo: "AT-01",
    titulo: "Atractivos del paisaje y guianza experiencial",
    pregunta: "¿Qué valor paisajístico, miradores o senderos interpretativos ofrece el predio?",
    tipo: "escala_1_5",
    opciones: [
      { valor: 1, etiqueta: "1 - Sin acondicionamiento para caminantes" },
      { valor: 2, etiqueta: "2 - Caminos de herradura difíciles de transitar" },
      { valor: 3, etiqueta: "3 - Sendero transitable con paradas explicativas guiadas" },
      { valor: 4, etiqueta: "4 - Sendero temático señalizado con mirador, flora identificada y zona de cata" },
      { valor: 5, etiqueta: "5 - Experiencia inmersiva sensorial de clase mundial (barismo, laboratorio, fauna)" }
    ]
  }
];

export const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Camilo Ángel",
    email: "CamiloAngel@gmail.com",
    rol: "Gestor Territorial",
    municipio: "Fusagasugá",
    fincasRegistradas: 5,
    estado: "Activo",
    nota: "Usuario ID 33 ratificado en auditoría de septiembre 2026."
  },
  {
    id: 2,
    nombre: "Administrador General",
    email: "admin@agrofusagasuga.test",
    rol: "Administrador",
    municipio: "Fusagasugá",
    fincasRegistradas: 8,
    estado: "Activo",
    nota: "Superusuario con control global de auditoría y configuración."
  },
  {
    id: 3,
    nombre: "Don Hernando Roa",
    email: "elmirador@agrofusagasuga.co",
    rol: "Dueño de Finca",
    municipio: "Fusagasugá",
    vereda: "San Rafael",
    fincaId: 1,
    estado: "Activo",
    nota: "Propietario de Finca El Mirador del Café."
  },
  {
    id: 4,
    nombre: "María Paula Gómez",
    email: "maria.encuestadora@agrofusagasuga.co",
    rol: "Encuestador",
    municipio: "Fusagasugá",
    fincasRegistradas: 12,
    estado: "Activo",
    nota: "Encuestadora técnica certificada en metodología MIESA."
  }
];
