import React from 'react';
import { clasificarIETSS, MIESA_DIMENSIONES } from '../utils/miesaCalculator';
import { X, Check, Mountain, Layers, Award, Sparkles, MapPin } from 'lucide-react';

export default function ComparadorModal({ fincasSeleccionadas, onClose, onRemoverFinca }) {
  if (!fincasSeleccionadas || fincasSeleccionadas.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-montane-950/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-glass-modal max-w-5xl w-full border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-montane-950 text-white p-5 flex items-center justify-between shrink-0 border-b border-montane-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold font-sans">
                Matriz Comparativa de Predios Agroturísticos ({fincasSeleccionadas.length}/3)
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-mono-code">
              Análisis multi-criterio bajo metodología científica MIESA • Fusagasugá
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto bg-ground">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fincasSeleccionadas.map((finca) => {
              const ietss = clasificarIETSS(finca.isa);
              return (
                <div
                  key={finca.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-glass-card relative"
                >
                  {/* Top dimension bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: ietss.hex }}
                  />

                  {/* Photo & Name */}
                  <div className="relative h-44 bg-slate-900">
                    <img
                      src={finca.imagen}
                      alt={finca.nombre}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <button
                      onClick={() => onRemoverFinca(finca.id)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/90 transition text-xs"
                      title="Quitar de comparación"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 right-2 bg-montane-950/80 backdrop-blur-md p-2 rounded-xl text-white border border-montane-800">
                      <h4 className="font-bold text-sm truncate">{finca.nombre}</h4>
                      <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-mono-code">
                        <MapPin className="w-3 h-3 text-emerald-400" /> Vereda {finca.vereda}
                      </p>
                    </div>
                  </div>

                  {/* ISA Score Box */}
                  <div className="p-4 bg-ground border-b border-slate-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block font-mono-code tracking-wider">
                      ÍNDICE ISA GLOBAL
                    </span>
                    <span className="text-3xl font-black text-montane-900 font-mono-code leading-none">
                      {finca.isa}
                    </span>
                    <div className="mt-1">
                      <span
                        style={{
                          backgroundColor: ietss.badgeBg,
                          color: ietss.badgeText,
                          borderColor: ietss.badgeBorder,
                        }}
                        className="border px-2.5 py-0.5 rounded-full text-xs font-bold inline-block font-mono-code"
                      >
                        {ietss.codigo} ({ietss.nivel})
                      </span>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="p-4 space-y-3 text-xs flex-1">
                    <div className="flex justify-between py-1 border-b border-slate-100 font-mono-code">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Mountain className="w-3.5 h-3.5 text-slate-400" /> Altitud:
                      </span>
                      <span className="font-bold text-slate-800">{finca.altitud} msnm</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 font-mono-code">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" /> Área:
                      </span>
                      <span className="font-bold text-slate-800">{finca.areaHa} ha</span>
                    </div>

                    <div className="py-1 border-b border-slate-100">
                      <span className="text-slate-500 block mb-1 font-mono-code text-[11px]">Variedades:</span>
                      <div className="flex flex-wrap gap-1">
                        {finca.variedades.map((v, i) => (
                          <span
                            key={i}
                            className="bg-amber-50 text-terroir-800 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-mono-code font-medium"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* MIESA Dimension Bars */}
                    <div className="pt-2">
                      <span className="text-slate-500 font-bold uppercase text-[10px] block mb-2 font-mono-code">
                        DIMENSIONES MIESA (1 a 5)
                      </span>
                      <div className="space-y-1.5">
                        {Object.keys(MIESA_DIMENSIONES).map((k) => {
                          const dim = MIESA_DIMENSIONES[k];
                          const val = finca.dimensiones[k] || 1;
                          return (
                            <div key={k} className="flex items-center justify-between text-[11px] font-mono-code">
                              <span className="text-slate-600 font-medium">{dim.codigo}:</span>
                              <div className="flex items-center gap-2 flex-1 mx-2">
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="h-1.5 rounded-full"
                                    style={{
                                      width: `${(val / 5) * 100}%`,
                                      backgroundColor: dim.color,
                                    }}
                                  />
                                </div>
                              </div>
                              <span className="font-bold text-slate-900">{val.toFixed(1)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="pt-2">
                      <span className="text-slate-500 font-bold uppercase text-[10px] block mb-1.5 font-mono-code">
                        Servicios y Atractivos:
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {finca.servicios.slice(0, 3).map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1 truncate">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-ground border-t border-slate-200 px-6 py-3.5 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-montane hover:bg-montane-800 text-white rounded-lg text-xs font-bold transition font-mono-code"
          >
            Cerrar Comparador
          </button>
        </div>
      </div>
    </div>
  );
}
