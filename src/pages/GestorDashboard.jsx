import React from 'react';
import {
  GraficaBarrasVeredas,
  GraficaDonaIetss,
  GraficaEvolucionTemporal,
} from '../components/GraficasEstadisticas';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  CheckCircle,
} from 'lucide-react';

export default function GestorDashboard({ fincas, onVerDetalles }) {
  const fincasPrioritarias = fincas.filter((f) => f.isa <= 40);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-stone-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Gestión Territorial del Sumapaz</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Panel del Gestor Territorial: Camilo Ángel
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Usuario ID 33 • Monitoreo espacial, indicadores veredales y priorización de inversión agroturística
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-bold uppercase text-blue-200 block">
              Fincas Vinculadas
            </span>
            <span className="text-3xl font-black text-white">{fincas.length}</span>
          </div>
        </div>
      </div>

      {/* Territorial Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Veredas */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-base text-stone-900 font-display">
              Promedio del Índice ISA por Vereda
            </h3>
            <p className="text-xs text-stone-500">
              Comparativa territorial de sostenibilidad y potencial agroturístico
            </p>
          </div>
          <GraficaBarrasVeredas fincas={fincas} />
        </div>

        {/* Doughnut Chart: IETSS distribution */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-base text-stone-900 font-display">
              Distribución de Predios por Nivel IETSS
            </h3>
            <p className="text-xs text-stone-500">
              Segmentación por niveles de madurez agroturística en Fusagasugá
            </p>
          </div>
          <GraficaDonaIetss fincas={fincas} />
        </div>
      </div>

      {/* Temporal Evolution */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div>
          <h3 className="font-bold text-base text-stone-900 font-display">
            Evolución Temporal del Índice ISA Municipal (2025 - 2026)
          </h3>
          <p className="text-xs text-stone-500">
            Crecimiento sostenido del potencial turístico en las veredas cafeteras
          </p>
        </div>
        <GraficaEvolucionTemporal />
      </div>

      {/* Prioritization Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h3>Alertas Territoriales: Fincas con Nivel ISA Bajo (≤40 pts)</h3>
        </div>
        <p className="text-xs text-stone-700">
          Predios que requieren acompañamiento técnico prioritario de la Alcaldía de Fusagasugá y el Comité de Cafeteros para saneamiento ambiental y adecuación inicial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fincasPrioritarias.map((fp) => (
            <div
              key={fp.id}
              className="bg-white p-3.5 rounded-xl border border-amber-300 text-xs flex items-center justify-between shadow-xs"
            >
              <div>
                <span className="font-bold text-stone-900 block">{fp.nombre}</span>
                <span className="text-stone-500 text-[11px]">
                  Vereda {fp.vereda} • {fp.propietario}
                </span>
              </div>
              <div className="text-right">
                <span className="font-black text-orange-700 text-sm block">ISA {fp.isa}</span>
                <button
                  onClick={() => onVerDetalles(fp)}
                  className="text-[11px] text-amber-800 underline font-bold mt-0.5"
                >
                  Ver Ficha
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
