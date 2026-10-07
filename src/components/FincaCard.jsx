import React from 'react';
import { clasificarIETSS } from '../utils/miesaCalculator';
import { MapPin, Mountain, Layers, Eye, Plus, Check, Award } from 'lucide-react';

export default function FincaCard({
  finca,
  onVerDetalles,
  onToggleComparar,
  isComparando,
  onEvaluar,
}) {
  const ietss = clasificarIETSS(finca.isa);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-glass-card hover:shadow-glass-elevated transition-all duration-300 flex flex-col group relative">
      {/* 4px Left Dimension Accent Bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 z-20"
        style={{ backgroundColor: ietss.hex }}
      />

      {/* Cover Image & Badges */}
      <div className="relative h-48 bg-slate-900 overflow-hidden pl-1.5">
        <img
          src={finca.imagen}
          alt={finca.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-4 right-3 flex items-center justify-between gap-2">
          <span
            style={{ backgroundColor: ietss.badgeBg, color: ietss.badgeText, borderColor: ietss.badgeBorder }}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border font-mono-code shadow-xs backdrop-blur-md"
          >
            {ietss.codigo}: {ietss.nivel}
          </span>

          <button
            onClick={() => onToggleComparar(finca)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 backdrop-blur-md transition shadow-xs font-mono-code ${
              isComparando
                ? 'bg-terroir text-white'
                : 'bg-black/60 text-white hover:bg-black/90'
            }`}
          >
            {isComparando ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {isComparando ? 'Comparando' : 'Comparar'}
          </button>
        </div>

        {/* Bottom Overlay with ISA Metric */}
        <div className="absolute bottom-3 left-4 right-3 flex items-end justify-between text-white">
          <div className="max-w-[70%]">
            <span className="text-[11px] text-emerald-300 flex items-center gap-1 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Vereda {finca.vereda}
            </span>
            <h3 className="text-base font-bold text-white leading-tight font-sans drop-shadow-xs truncate">
              {finca.nombre}
            </h3>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-900 text-right shadow-xs border border-white">
            <span className="text-[9px] font-bold text-slate-500 uppercase block font-mono-code tracking-wider">
              ISA
            </span>
            <span className="text-lg font-extrabold text-montane-900 font-mono-code leading-none">
              {finca.isa}
            </span>
          </div>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 pl-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Technical Vector Row */}
        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2.5 font-mono-code">
          <span className="flex items-center gap-1 font-medium">
            <Mountain className="w-3.5 h-3.5 text-slate-400" />
            {finca.altitud} msnm
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            {finca.areaHa} ha
          </span>
          <span className="text-slate-500 text-[11px]">
            {ietss.trl.split(' ')[0]}
          </span>
        </div>

        {/* Terroir & Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {finca.descripcion}
        </p>

        {/* Varieties and services chips */}
        <div className="flex flex-wrap gap-1">
          {finca.variedades.slice(0, 2).map((v, i) => (
            <span
              key={i}
              className="bg-amber-50/80 text-terroir-800 border border-amber-200/60 text-[10px] font-medium px-2 py-0.5 rounded font-mono-code"
            >
              ☕ {v}
            </span>
          ))}
          {finca.servicios.slice(0, 1).map((s, i) => (
            <span
              key={i}
              className="bg-emerald-50 text-montane-700 border border-emerald-200/60 text-[10px] font-medium px-2 py-0.5 rounded truncate max-w-[120px]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onVerDetalles(finca)}
            className="flex-1 bg-montane hover:bg-montane-800 text-white text-xs font-bold py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs border border-montane-700"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-300" />
            Dossier Técnico
          </button>
          {onEvaluar && (
            <button
              onClick={() => onEvaluar(finca)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-3 rounded-lg transition font-mono-code"
              title="Evaluar con encuesta MIESA"
            >
              MIESA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
