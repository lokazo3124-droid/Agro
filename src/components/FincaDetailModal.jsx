import React from 'react';
import { clasificarIETSS, MIESA_DIMENSIONES } from '../utils/miesaCalculator';
import RadarMiesa from './RadarMiesa';
import {
  X,
  MapPin,
  Mountain,
  Compass,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Lightbulb,
  Award,
  Layers,
  TrendingUp,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export default function FincaDetailModal({ finca, onClose, onStartEncuesta }) {
  if (!finca) return null;

  const ietss = clasificarIETSS(finca.isa);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-montane-950/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-glass-modal max-w-4xl w-full border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with Cover Image & Andean Terroir Backdrop */}
        <div className="relative h-56 sm:h-64 shrink-0 bg-montane-950">
          <img
            src={finca.imagen}
            alt={finca.nombre}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-montane-950 via-slate-900/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and score overlay */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  style={{ backgroundColor: ietss.hex }}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-xs font-mono-code"
                >
                  IETSS: {ietss.codigo} ({ietss.nivel})
                </span>
                <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-mono-code">
                  {ietss.trl}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans leading-tight">
                {finca.nombre}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Vereda {finca.vereda}, {finca.municipio} • Propietario: {finca.propietario}
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 text-slate-900 text-right shadow-md border border-white">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block font-mono-code">
                ÍNDICE ISA GLOBAL
              </span>
              <span className="text-2xl sm:text-3xl font-black text-montane-900 font-mono-code leading-none">
                {finca.isa}
                <span className="text-xs text-slate-400 font-normal ml-0.5">/100</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Technical Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Scientific Readiness & Terroir Vector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ground p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Mountain className="w-4 h-4 text-terroir shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono-code">Altitud</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono-code">{finca.altitud} msnm</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-montane shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono-code">Área Predial</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono-code">{finca.areaHa} ha</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-hydro shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono-code">Madurez Agroturística</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono-code">{ietss.trl.split(' ')[0]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono-code">Sostenibilidad</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 font-mono-code">{ietss.srl}</span>
              </div>
            </div>
          </div>

          {/* Terroir & Agronomic Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono-code">
              Vocación y Caracterización Agronómica
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-200/80 p-4 rounded-xl shadow-xs">
              {finca.descripcion}
            </p>
          </div>

          {/* Variedades y Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ground p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 font-mono-code">
                Variedades de Café Bajo Cultivo
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {finca.variedades.map((v, i) => (
                  <span
                    key={i}
                    className="bg-white text-terroir-800 border border-amber-200/80 px-2.5 py-1 rounded-md text-xs font-semibold font-mono-code shadow-2xs"
                  >
                    ☕ {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-ground p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 font-mono-code">
                Oferta de Experiencias Agroturísticas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {finca.servicios.map((srv, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-montane-800 border border-emerald-200/80 px-2.5 py-1 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* MIESA Dimension Breakdown & Radar */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-ground">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Matriz de Evaluación MIESA (5 Dimensiones)
                </h3>
                <p className="text-xs text-slate-500 font-mono-code">
                  Ponderación: PS·0.25 + GA·0.30 + DS·0.15 + GC·0.10 + AT·0.20
                </p>
              </div>
              <span
                style={{ backgroundColor: ietss.badgeBg, color: ietss.badgeText, borderColor: ietss.badgeBorder }}
                className="border px-3 py-1 rounded-full text-xs font-bold font-mono-code hidden sm:inline-block"
              >
                {ietss.codigo}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Radar Chart */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-glass-subtle">
                <RadarMiesa dimensiones={finca.dimensiones} nombre={finca.nombre} />
              </div>

              {/* Dimension Scores Bar list */}
              <div className="space-y-2.5">
                {Object.keys(MIESA_DIMENSIONES).map((dimKey) => {
                  const dim = MIESA_DIMENSIONES[dimKey];
                  const valor = finca.dimensiones[dimKey] || 1;
                  const porcentaje = (valor / 5) * 100;
                  return (
                    <div key={dimKey} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: dim.color }}
                          />
                          {dim.codigo} - {dim.nombre}
                        </span>
                        <span className="font-extrabold text-montane-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono-code">
                          {valor.toFixed(1)} / 5.0
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${porcentaje}%`,
                            backgroundColor: dim.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          {finca.recomendaciones && finca.recomendaciones.length > 0 && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2 text-montane-900 font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-emerald-700" />
                <span>Protocolo de Mejora y Acciones de Intervención</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {finca.recomendaciones.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono-code">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Historical Evaluations */}
          {finca.evaluacionesHistoricas && finca.evaluacionesHistoricas.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono-code">
                <TrendingUp className="w-3.5 h-3.5" />
                Auditorías Técnicas Registradas
              </h4>
              <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                {finca.evaluacionesHistoricas.map((evalItem, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-bold text-slate-800 font-mono-code">{evalItem.fecha}</span>
                        <span className="text-slate-500 text-[11px] block">
                          Técnico Evaluador: {evalItem.encuestador}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-montane-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs font-mono-code">
                        ISA {evalItem.isa} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="bg-montane-950 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs border border-montane-800">
            <div>
              <h5 className="font-bold text-emerald-300 text-sm">Canal Directo con la Familia Caficultora</h5>
              <p className="text-slate-300 text-xs">Reservas de catas guiadas y visitas al cultivo</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono-code">
              {finca.contacto.telefono && (
                <a
                  href={`tel:${finca.contacto.telefono}`}
                  className="inline-flex items-center gap-1.5 bg-montane-900 hover:bg-montane-800 px-3 py-1.5 rounded-lg text-white transition border border-montane-700"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{finca.contacto.telefono}</span>
                </a>
              )}
              {finca.contacto.email && (
                <a
                  href={`mailto:${finca.contacto.email}`}
                  className="inline-flex items-center gap-1.5 bg-montane-900 hover:bg-montane-800 px-3 py-1.5 rounded-lg text-white transition border border-montane-700"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{finca.contacto.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-ground border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              if (onStartEncuesta) onStartEncuesta(finca);
            }}
            className="px-4 py-2 bg-montane hover:bg-montane-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-2 border border-montane-700"
          >
            <Compass className="w-4 h-4 text-emerald-300" />
            Nueva Evaluación MIESA para este Predio
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition font-mono-code"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
