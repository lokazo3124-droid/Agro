import React from 'react';
import RadarMiesa from '../components/RadarMiesa';
import { clasificarIETSS, MIESA_DIMENSIONES } from '../utils/miesaCalculator';
import {
  Coffee,
  TrendingUp,
  Award,
  Calendar,
  Lightbulb,
  CheckCircle,
  MapPin,
  Mountain,
  Compass,
} from 'lucide-react';

export default function DuenoDashboard({ finca, onVerDetalles, onEvaluarFinca }) {
  // Defaults to Finca El Mirador del Café (Don Hernando)
  const f = finca || {
    id: 1,
    nombre: "Finca El Mirador del Café",
    propietario: "Don Hernando Roa",
    vereda: "San Rafael",
    municipio: "Fusagasugá",
    altitud: 1720,
    areaHa: 4.8,
    isa: 88.6,
    dimensiones: { PS: 4.6, GA: 4.4, DS: 4.1, GC: 3.9, AT: 4.8 },
    evaluacionesHistoricas: [
      { fecha: "2024-03-15", isa: 74.2, encuestador: "María Paula Gómez" },
      { fecha: "2025-02-10", isa: 81.5, encuestador: "Camilo Ángel" },
      { fecha: "2026-08-22", isa: 88.6, encuestador: "María Paula Gómez" }
    ],
    recomendaciones: [
      "Implementar sistema de reservas digital sincronizado con tour-operadores de Bogotá.",
      "Capacitar al personal guía en inglés básico para avistadores de aves extranjeros.",
      "Ampliar la huerta orgánica para autoabastecimiento del restaurante rural."
    ]
  };

  const ietss = clasificarIETSS(f.isa);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Panel del Caficultor Propietario
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Bienvenido, {f.propietario}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Predio: <strong>{f.nombre}</strong> • Vereda {f.vereda}, {f.municipio}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-amber-200 block">
                Tu Puntaje ISA
              </span>
              <span className="text-3xl font-black text-white">{f.isa}</span>
            </div>
            <div
              style={{ backgroundColor: ietss.hex }}
              className="px-3 py-1 rounded-xl text-xs font-black text-white shadow-md"
            >
              Nivel {ietss.nivel}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Radar + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Radar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-stone-900 font-display">
                Radar de tus 5 Dimensiones MIESA
              </h3>
              <p className="text-xs text-stone-500">
                Comparativa de tu predio frente a la meta óptima de excelencia agroturística
              </p>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {ietss.madurez}
            </span>
          </div>

          <div className="h-80 w-full flex items-center justify-center">
            <RadarMiesa dimensiones={f.dimensiones} nombre={f.nombre} />
          </div>

          {/* Dimension Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            {Object.keys(MIESA_DIMENSIONES).map((k) => {
              const dim = MIESA_DIMENSIONES[k];
              const val = f.dimensiones[k] || 1;
              return (
                <div key={k} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <span className="text-[10px] font-bold text-stone-500 block">{dim.codigo}</span>
                  <span className="text-base font-black text-stone-900">{val.toFixed(1)}</span>
                  <span className="text-[10px] text-stone-400 block">/ 5.0</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Evolution and Quick Facts (1 col) */}
        <div className="space-y-6">
          {/* Historical Evolution */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <h3 className="font-bold text-sm text-stone-900 font-display flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Evolución Histórica de tu ISA
            </h3>

            <div className="space-y-3">
              {f.evaluacionesHistoricas.map((evalItem, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <div>
                      <div className="font-bold text-stone-800">{evalItem.fecha}</div>
                      <div className="text-[10px] text-stone-500">{evalItem.encuestador}</div>
                    </div>
                  </div>
                  <span className="font-black text-sm text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                    {evalItem.isa} pts
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Incremento total:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +14.4 puntos desde 2024
              </span>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
            <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              Plan de Mejora Recomendado
            </h3>
            <ul className="space-y-2 text-xs text-stone-700">
              {f.recomendaciones.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
