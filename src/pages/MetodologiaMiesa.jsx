import React, { useState } from 'react';
import {
  MIESA_DIMENSIONES,
  calcularISA,
  clasificarIETSS,
} from '../utils/miesaCalculator';
import RadarMiesa from '../components/RadarMiesa';
import { Compass, BookOpen, Check, Calculator, Sparkles } from 'lucide-react';

export default function MetodologiaMiesa() {
  // Interactive test bench state
  const [ps, setPs] = useState(4.2);
  const [ga, setGa] = useState(4.0);
  const [ds, setDs] = useState(3.8);
  const [gc, setGc] = useState(3.5);
  const [at, setAt] = useState(4.5);

  const testISA = calcularISA({ PS: ps, GA: ga, DS: ds, GC: gc, AT: at });
  const testIETSS = clasificarIETSS(testISA);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Fundamento Científico y Matemático</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight mb-2">
          Metodología MIESA
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Metodología de Identificación y Evaluación del Potencial Agroturístico desarrollada para el Paisaje Cultural Cafetero de Fusagasugá. Portada fielmente desde el procedimiento original almacenado de 344 líneas (<code className="text-amber-300 font-mono text-xs">sp_calcular_potencial</code>).
        </p>
      </div>

      {/* Formula & Weights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold font-display text-stone-900">
            Fórmula Matemática del Índice ISA
          </h2>
          <div className="p-4 bg-stone-900 text-amber-400 font-mono text-sm rounded-xl border border-stone-800 overflow-x-auto">
            ISA = 20 × (PS·0.25 + GA·0.30 + DS·0.15 + GC·0.10 + AT·0.20)
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Cada dimensión se evalúa en escala normalizada de 1.0 a 5.0. El factor multiplicador 20 escala el resultado final al rango porcentual de 0 a 100 puntos.
          </p>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950">
            <strong>Derivación especial de GA3:</strong> La subdimensión ambiental GA3 no posee indicadores directos independientes; se calcula automáticamente como el promedio aritmético de GA2, GA4 y GA6.
          </div>
        </div>

        {/* Dimension weights breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
          <h2 className="text-lg font-bold font-display text-stone-900">
            Ponderación de las 5 Dimensiones
          </h2>
          <div className="space-y-2 text-xs">
            {Object.keys(MIESA_DIMENSIONES).map((k) => {
              const dim = MIESA_DIMENSIONES[k];
              return (
                <div
                  key={k}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: dim.color }}
                      className="w-3 h-3 rounded-full shrink-0"
                    />
                    <span className="font-bold text-stone-800">
                      {dim.codigo} - {dim.nombre}
                    </span>
                  </div>
                  <span className="font-black text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {dim.peso * 100}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Thresholds Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold font-display text-stone-900">
          Clasificación IETSS y Madurez Turística (TRL-A)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/60 space-y-1">
            <span className="font-black text-blue-900 text-sm block">Azul (&gt; 80 pts)</span>
            <span className="font-bold text-blue-700 block">Excelente</span>
            <span className="text-[11px] text-stone-600 block">TRL-A 5: Líder territorial y exportador.</span>
          </div>
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 space-y-1">
            <span className="font-black text-emerald-900 text-sm block">Verde (61 - 80 pts)</span>
            <span className="font-bold text-emerald-700 block">Alto</span>
            <span className="text-[11px] text-stone-600 block">TRL-A 4: Oferta consolidada con calidad.</span>
          </div>
          <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/60 space-y-1">
            <span className="font-black text-amber-900 text-sm block">Amarillo (41 - 60 pts)</span>
            <span className="font-bold text-amber-700 block">Medio</span>
            <span className="text-[11px] text-stone-600 block">TRL-A 3: Operación viable en perfeccionamiento.</span>
          </div>
          <div className="p-4 rounded-xl border border-orange-300 bg-orange-50/60 space-y-1">
            <span className="font-black text-orange-900 text-sm block">Naranja (21 - 40 pts)</span>
            <span className="font-bold text-orange-700 block">Bajo</span>
            <span className="text-[11px] text-stone-600 block">TRL-A 2: Potencial identificado sin adecuación.</span>
          </div>
          <div className="p-4 rounded-xl border border-red-300 bg-red-50/60 space-y-1">
            <span className="font-black text-red-900 text-sm block">Rojo (≤ 20 pts)</span>
            <span className="font-bold text-red-700 block">Crítico</span>
            <span className="text-[11px] text-stone-600 block">TRL-A 1: Saneamiento previo indispensable.</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Bench */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold font-display">
            Simulador Interactivo del Algoritmo MIESA
          </h2>
        </div>
        <p className="text-xs text-stone-400 max-w-2xl">
          Modifica los valores de cada dimensión (de 1.0 a 5.0) para comprobar en vivo cómo el algoritmo pondera y clasifica el predio.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-purple-300">PS: Potencial Social/Productivo (25%)</span>
                <span className="font-mono font-bold">{ps} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={ps}
                onChange={(e) => setPs(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-emerald-300">GA: Gestión Ambiental (30%)</span>
                <span className="font-mono font-bold">{ga} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={ga}
                onChange={(e) => setGa(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-amber-300">DS: Desarrollo Socioeconómico (15%)</span>
                <span className="font-mono font-bold">{ds} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={ds}
                onChange={(e) => setDs(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-blue-300">GC: Gestión Comercial (10%)</span>
                <span className="font-mono font-bold">{gc} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={gc}
                onChange={(e) => setGc(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-rose-300">AT: Atractivos Turísticos (20%)</span>
                <span className="font-mono font-bold">{at} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={at}
                onChange={(e) => setAt(parseFloat(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>

          {/* Result Card & Radar */}
          <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 text-center space-y-4">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
              Resultado del Cálculo
            </span>
            <div className="text-5xl font-black text-amber-400 font-mono">
              {testISA}
              <span className="text-base text-stone-400 font-normal"> / 100</span>
            </div>
            <div>
              <span
                style={{
                  backgroundColor: testIETSS.badgeBg,
                  color: testIETSS.badgeText,
                  borderColor: testIETSS.badgeBorder,
                }}
                className="border px-4 py-1.5 rounded-full text-xs font-black tracking-wide inline-block"
              >
                Nivel {testIETSS.nivel} ({testIETSS.codigo}) • {testIETSS.madurez}
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto">
              {testIETSS.recomendacion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
