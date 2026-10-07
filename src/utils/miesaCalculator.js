/**
 * Motor de Cálculo MIESA (Metodología de Identificación y Evaluación del Potencial Agroturístico)
 * Sistema de diseño oficial Agro Fusagasugá MIESA:
 * - Semafórico de 5 niveles: Sobresaliente (#0EA5E9), Alto (#10B981), Moderado (#F59E0B), Alerta (#F97316), Crítico (#EF4444)
 * - TRL-A (Agritourism Readiness Level), SRL-A (Sustainability Readiness), ORL-A (Operational Readiness)
 */

export const MIESA_DIMENSIONES = {
  PS: {
    codigo: 'PS',
    nombre: 'Potencial Social y Productivo',
    peso: 0.25,
    descripcion: 'Capacidad productiva de café de calidad, tradición cafetera y gobernanza familiar.',
    color: '#0F382C', // Deep Montane Emerald
    bgTag: 'bg-emerald-50 text-emerald-950 border-emerald-200',
  },
  GA: {
    codigo: 'GA',
    nombre: 'Gestión Ambiental y Sostenibilidad',
    peso: 0.30,
    descripcion: 'Manejo de aguas mieles, conservación de flora/fauna nativa y prácticas ecológicas.',
    color: '#10B981', // Vivid Emerald
    bgTag: 'bg-teal-50 text-teal-950 border-teal-200',
  },
  DS: {
    codigo: 'DS',
    nombre: 'Desarrollo Socioeconómico',
    peso: 0.15,
    descripcion: 'Impacto en la comunidad veredal, empleo digno e integración local.',
    color: '#8B5A2B', // Roasted Coffee Terroir
    bgTag: 'bg-amber-50 text-amber-950 border-amber-200',
  },
  GC: {
    codigo: 'GC',
    nombre: 'Gestión Comercial y Servicios',
    peso: 0.10,
    descripcion: 'Comercialización de café de origen, canales de venta y atención al visitante.',
    color: '#0EA5E9', // Sumapaz Hydro Cyan
    bgTag: 'bg-sky-50 text-sky-950 border-sky-200',
  },
  AT: {
    codigo: 'AT',
    nombre: 'Atractivos Turísticos y Experiencia',
    peso: 0.20,
    descripcion: 'Paisaje cultural cafetero, senderos, catas experienciales y gastronomía.',
    color: '#C27D38', // Fertile Loam
    bgTag: 'bg-orange-50 text-orange-950 border-orange-200',
  },
};

/**
 * Calcula el ISA a partir de las 5 dimensiones ponderadas (cada dimensión en escala 1-5).
 * Fórmula original: ISA = 20 * (PS*0.25 + GA*0.30 + DS*0.15 + GC*0.10 + AT*0.20)
 * Resultado: escala de 0 a 100.
 */
export function calcularISA({ PS, GA, DS, GC, AT }) {
  const ps = Math.max(1, Math.min(5, Number(PS) || 1));
  const ga = Math.max(1, Math.min(5, Number(GA) || 1));
  const ds = Math.max(1, Math.min(5, Number(DS) || 1));
  const gc = Math.max(1, Math.min(5, Number(GC) || 1));
  const at = Math.max(1, Math.min(5, Number(AT) || 1));

  const sumaPonderada = (
    ps * MIESA_DIMENSIONES.PS.peso +
    ga * MIESA_DIMENSIONES.GA.peso +
    ds * MIESA_DIMENSIONES.DS.peso +
    gc * MIESA_DIMENSIONES.GC.peso +
    at * MIESA_DIMENSIONES.AT.peso
  );

  const isa = Math.round((20 * sumaPonderada) * 10) / 10;
  return Math.min(100, Math.max(0, isa));
}

/**
 * Calcula la dimensión Ambiental (GA) teniendo en cuenta que GA3 se deriva
 * como promedio aritmético de GA2, GA4 y GA6.
 */
export function calcularGAConSubdimensiones({ ga1, ga2, ga4, ga5, ga6 }) {
  const ga3 = (ga2 + ga4 + ga6) / 3;
  const subdimensiones = [ga1, ga2, ga3, ga4, ga5, ga6];
  const promedioGA = subdimensiones.reduce((a, b) => a + b, 0) / subdimensiones.length;
  return {
    ga3: Math.round(ga3 * 10) / 10,
    gaTotal: Math.round(promedioGA * 10) / 10,
  };
}

/**
 * Determina el nivel IETSS según los umbrales del diseño oficial MIESA:
 * <=20: Crítico (Coral Red #EF4444)
 * <=40: Alerta (Warm Orange #F97316)
 * <=60: Moderado (Amber Ochre #F59E0B)
 * <=80: Alto / Sostenible (Vivid Emerald #10B981)
 * >80:  Sobresaliente (Sumapaz Cyan #0EA5E9)
 */
export function clasificarIETSS(isa) {
  if (isa <= 20) {
    return {
      codigo: 'CRÍTICO',
      nivel: 'Crítico',
      color: 'text-red-700 bg-red-50 border-red-200',
      badgeBg: '#FEE2E2',
      badgeBorder: '#FECACA',
      badgeText: '#991B1B',
      hex: '#EF4444',
      recomendacion: 'Requiere intervención urgente en infraestructura básica y saneamiento ambiental antes de recibir turistas.',
      trl: 'TRL-A 1 (Idea)',
      srl: 'SRL-A 1',
      orl: 'ORL-A 1',
    };
  }
  if (isa <= 40) {
    return {
      codigo: 'ALERTA',
      nivel: 'Alerta',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      badgeBg: '#FFEDD5',
      badgeBorder: '#FED7AA',
      badgeText: '#9A3412',
      hex: '#F97316',
      recomendacion: 'Potencial productivo identificado. Desarrollar protocolos de atención y adecuar senderos del café.',
      trl: 'TRL-A 2 (Prototipo)',
      srl: 'SRL-A 2',
      orl: 'ORL-A 2',
    };
  }
  if (isa <= 60) {
    return {
      codigo: 'MODERADO',
      nivel: 'Moderado',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
      badgeBg: '#FEF3C7',
      badgeBorder: '#FDE68A',
      badgeText: '#92400E',
      hex: '#F59E0B',
      recomendacion: 'Operación agroturística viable. Mejorar señalética, experiencia de cata y gestión comercial digital.',
      trl: 'TRL-A 3 (Validado)',
      srl: 'SRL-A 3',
      orl: 'ORL-A 3',
    };
  }
  if (isa <= 80) {
    return {
      codigo: 'SOSTENIBLE',
      nivel: 'Alto / Sostenible',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      badgeBg: '#D1FAE5',
      badgeBorder: '#A7F3D0',
      badgeText: '#065F46',
      hex: '#10B981',
      recomendacion: 'Finca consolidada con oferta de calidad. Potenciar canales de comercialización directa y alianzas de tour.',
      trl: 'TRL-A 4 (Comercial)',
      srl: 'SRL-A 4',
      orl: 'ORL-A 4',
    };
  }
  return {
    codigo: 'SOBRESALIENTE',
    nivel: 'Sobresaliente',
    color: 'text-sky-900 bg-sky-50 border-sky-200',
    badgeBg: '#E0F2FE',
    badgeBorder: '#BAE6FD',
    badgeText: '#0369A1',
    hex: '#0EA5E9',
    recomendacion: 'Finca referente territorial. Modelo de excelencia con exportación de café y ecoturismo internacional.',
    trl: 'TRL-A 5 (Líder Territorial)',
    srl: 'SRL-A 5',
    orl: 'ORL-A 5',
  };
}
