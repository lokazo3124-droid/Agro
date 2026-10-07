import React from 'react';
import { clasificarIETSS } from '../utils/miesaCalculator';
import {
  Compass,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function EncuestadorDashboard({
  fincas,
  onEvaluarFinca,
  onVerDetalles,
}) {
  const encuestasCompletadas = fincas.filter((f) => f.isa > 0).length;
  const fincasPrioritarias = fincas.filter((f) => f.isa <= 60);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Módulo Técnico de Trabajo de Campo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Panel del Encuestador: María Paula Gómez
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Registro y aplicación de encuestas MIESA en las veredas cafeteras de Fusagasugá
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-emerald-200 block">
                Productividad
              </span>
              <span className="text-3xl font-black text-white">{encuestasCompletadas}</span>
            </div>
            <div className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white">
              Encuestas Activas
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Predios Diagnosticados</span>
            <span className="text-2xl font-black text-stone-900">{encuestasCompletadas} fincas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Pendientes de Re-evaluación</span>
            <span className="text-2xl font-black text-amber-900">{fincasPrioritarias.length} predios</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Jornada Activa</span>
            <span className="text-sm font-black text-stone-800">Septiembre - Octubre 2026</span>
          </div>
        </div>
      </div>

      {/* Farm Survey List */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-stone-900 font-display">
              Fincas Habilitadas para Aplicación de Encuesta MIESA
            </h3>
            <p className="text-xs text-stone-500">
              Selecciona cualquier predio para abrir el formulario oficial con cálculo automático de ISA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fincas.map((finca) => {
            const ietss = clasificarIETSS(finca.isa);
            return (
              <div
                key={finca.id}
                className="p-4 rounded-xl border border-stone-200 hover:border-emerald-600 bg-stone-50/60 hover:bg-white transition flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{finca.nombre}</h4>
                    <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      Vereda {finca.vereda} • {finca.propietario}
                    </span>
                  </div>

                  <span
                    style={{
                      backgroundColor: ietss.badgeBg,
                      color: ietss.badgeText,
                      borderColor: ietss.badgeBorder,
                    }}
                    className="border px-2 py-0.5 rounded-full text-xs font-bold shrink-0"
                  >
                    ISA: {finca.isa}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/80">
                  <button
                    onClick={() => onVerDetalles(finca)}
                    className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
                  >
                    Ver antecedentes
                  </button>
                  <button
                    onClick={() => onEvaluarFinca(finca)}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Iniciar Encuesta MIESA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
