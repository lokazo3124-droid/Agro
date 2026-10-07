import React, { useState } from 'react';
import { PREGUNTAS_ENCUESTA_MIESA } from '../data/fincas';
import { calcularISA, clasificarIETSS, MIESA_DIMENSIONES } from '../utils/miesaCalculator';
import { X, CheckCircle, Save, Sparkles, Compass, AlertCircle } from 'lucide-react';

export default function EncuestaMiesaModal({
  finca,
  isOpen,
  onClose,
  onGuardarEvaluacion,
  usuarioActual,
}) {
  if (!isOpen || !finca) return null;

  // Initialize form state
  const [respuestas, setRespuestas] = useState({
    ps1: 4,
    ps2: 4,
    ga1: 4,
    ga2: 4,
    ga4: 4,
    ds1: 4,
    gc1: 3,
    at1: 4,
  });

  const [guardadoExito, setGuardadoExito] = useState(false);

  // Compute dimensions from answers
  const psAvg = (respuestas.ps1 + respuestas.ps2) / 2;
  const ga3Derivado = (respuestas.ga2 + respuestas.ga4) / 2;
  const gaAvg = (respuestas.ga1 + respuestas.ga2 + ga3Derivado + respuestas.ga4) / 4;
  const dsAvg = respuestas.ds1;
  const gcAvg = respuestas.gc1;
  const atAvg = respuestas.at1;

  const dimensionesCalculadas = {
    PS: Math.round(psAvg * 10) / 10,
    GA: Math.round(gaAvg * 10) / 10,
    DS: Math.round(dsAvg * 10) / 10,
    GC: Math.round(gcAvg * 10) / 10,
    AT: Math.round(atAvg * 10) / 10,
  };

  const isaCalculado = calcularISA(dimensionesCalculadas);
  const ietss = clasificarIETSS(isaCalculado);

  const handleOpcionChange = (preguntaId, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: Number(valor),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGuardarEvaluacion) {
      onGuardarEvaluacion({
        fincaId: finca.id,
        dimensiones: dimensionesCalculadas,
        isa: isaCalculado,
        encuestador: usuarioActual ? usuarioActual.nombre : "María Paula Gómez (Encuestadora MIESA)",
        fecha: new Date().toISOString().split('T')[0],
      });
    }
    setGuardadoExito(true);
    setTimeout(() => {
      setGuardadoExito(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-montane-950/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-glass-modal max-w-3xl w-full border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-montane-950 text-white p-5 flex items-center justify-between shrink-0 border-b border-montane-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono-code bg-montane-900 px-2 py-0.5 rounded border border-montane-700">
                INSTRUMENTO OFICIAL DE CAMPO • MIESA
              </span>
            </div>
            <h2 className="text-xl font-bold font-sans">
              Evaluación Técnica: {finca.nombre}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 font-mono-code">
              Vereda {finca.vereda} • Inspector: {usuarioActual ? usuarioActual.nombre : 'Técnico Evaluador'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Calculation Bar: Montane Emerald & Semaphoric Badge */}
        <div className="bg-ground border-b border-slate-200 p-4 shrink-0 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-montane text-white rounded-xl shadow-xs border border-montane-700">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                CÁLCULO ISA EN TIEMPO REAL
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-montane-900 font-mono-code">{isaCalculado} pts</span>
                <span
                  style={{
                    backgroundColor: ietss.badgeBg,
                    color: ietss.badgeText,
                    borderColor: ietss.badgeBorder,
                  }}
                  className="border px-2.5 py-0.5 rounded-full text-xs font-bold font-mono-code"
                >
                  {ietss.codigo} ({ietss.nivel})
                </span>
              </div>
            </div>
          </div>

          {/* Mini Dimensions preview */}
          <div className="flex items-center gap-1.5 text-xs font-mono-code">
            <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-montane-900">
              PS: {dimensionesCalculadas.PS}
            </span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-emerald-700">
              GA: {dimensionesCalculadas.GA}
            </span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-terroir-700">
              DS: {dimensionesCalculadas.DS}
            </span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-hydro-700">
              GC: {dimensionesCalculadas.GC}
            </span>
            <span className="bg-white px-2 py-1 rounded border border-slate-200 font-bold text-amber-700">
              AT: {dimensionesCalculadas.AT}
            </span>
          </div>
        </div>

        {/* Form Body with Segmented Scales */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          {PREGUNTAS_ENCUESTA_MIESA.map((preg) => {
            const dimInfo = MIESA_DIMENSIONES[preg.dimension];
            const valorActual = respuestas[preg.id] || 3;
            return (
              <div
                key={preg.id}
                className="bg-ground rounded-2xl p-4 sm:p-5 border border-slate-200/90 relative overflow-hidden transition"
              >
                {/* 4px vertical accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: dimInfo.color }}
                />

                <div className="pl-1.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: `${dimInfo.color}12`, color: dimInfo.color }}
                      className="font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-current font-mono-code"
                    >
                      {preg.codigo} • {dimInfo.nombre} ({dimInfo.peso * 100}%)
                    </span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono-code">
                      Score: {valorActual} / 5.0
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{preg.titulo}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{preg.pregunta}</p>
                  </div>

                  {/* Segmented Likert Rating Scale (0 to 5) per Design System */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = valorActual === val;
                      let activeStyle = '';
                      if (isSelected) {
                        if (val >= 4) activeStyle = 'bg-montane text-white border-montane shadow-xs';
                        else if (val === 3) activeStyle = 'bg-amber-600 text-white border-amber-600 shadow-xs';
                        else activeStyle = 'bg-red-600 text-white border-red-600 shadow-xs';
                      } else {
                        activeStyle = 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50';
                      }

                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleOpcionChange(preg.id, val)}
                          className={`py-2 rounded-lg text-xs font-extrabold font-mono-code border transition-all flex flex-col items-center justify-center ${activeStyle}`}
                        >
                          <span className="text-sm">{val}</span>
                          <span className="text-[9px] font-normal uppercase tracking-tighter opacity-80">
                            {val === 1 ? 'Deficiente' : val === 2 ? 'Bajo' : val === 3 ? 'Medio' : val === 4 ? 'Alto' : 'Óptimo'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active option description */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 italic">
                    {preg.opciones.find((o) => o.valor === valorActual)?.etiqueta}
                  </div>
                </div>
              </div>
            );
          })}

          {guardadoExito && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-montane-900 rounded-xl flex items-center gap-2 text-xs font-bold font-mono-code">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              ¡Evaluación MIESA guardada con éxito y sincronizada en el sistema!
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition font-mono-code"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardadoExito}
              className="px-6 py-2.5 bg-montane hover:bg-montane-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs border border-montane-700 font-mono-code"
            >
              <Save className="w-4 h-4 text-emerald-300" />
              Guardar y Calcular Potencial ISA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
