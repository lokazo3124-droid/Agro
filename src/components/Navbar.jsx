import React from 'react';
import { Coffee, Key, UserCheck, Shield, Map, Compass, BarChart2, Layers, Sparkles } from 'lucide-react';

export default function Navbar({
  vistaActual,
  setVistaActual,
  rolActual,
  setRolActual,
  onOpenAppKeyModal,
  comparandoCount = 0,
  onOpenComparador,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-slate-200/80 shadow-glass-subtle">
      {/* Top Micro-Bar: Montane Terroir Context */}
      <div className="bg-montane-950 text-slate-300 px-4 sm:px-6 py-1.5 text-xs flex items-center justify-between border-b border-montane-800/60">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">Provincia del Sumapaz • Fusagasugá</span>
          <span className="text-montane-600 hidden sm:inline">|</span>
          <span className="text-slate-400 font-mono-code text-[11px] hidden md:inline">
            SISTEMA MIESA v2.4 • PCC-CUNDINAMARCA
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Direct APP_KEY Generator Button */}
          <button
            onClick={onOpenAppKeyModal}
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white bg-terroir-800/50 hover:bg-terroir-700/80 px-2.5 py-0.5 rounded-full border border-terroir-600/50 transition text-[11px] font-bold font-mono-code shadow-xs"
            title="Herramienta para generar clave APP_KEY para Laravel"
          >
            <Key className="w-3 h-3 text-amber-400" />
            <span>APP_KEY (.env)</span>
          </button>

          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-montane-200" />
            <select
              value={rolActual}
              onChange={(e) => setRolActual(e.target.value)}
              className="bg-montane-900 text-white text-[11px] font-semibold rounded-md px-2 py-0.5 border border-montane-700 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer font-sans"
            >
              <option value="publico">Rol: Visitante / Consulta</option>
              <option value="admin">Rol: Administrador General</option>
              <option value="dueno">Rol: Dueño (Don Hernando)</option>
              <option value="encuestador">Rol: Encuestador Técnico</option>
              <option value="gestor">Rol: Gestor Territorial (Camilo Ángel)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => setVistaActual('directorio')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-montane to-montane-950 text-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all border border-montane-800">
            <Coffee className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight font-sans">
                Agro Fusagasugá
              </span>
              <span className="bg-emerald-50 text-montane-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 font-mono-code tracking-wider">
                MIESA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight">
              Observatorio de Potencial Agroturístico Cafetero
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => setVistaActual('directorio')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              vistaActual === 'directorio'
                ? 'bg-montane text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            Directorio & Terroir
          </button>

          <button
            onClick={() => setVistaActual('constructor_encuestas')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              vistaActual === 'constructor_encuestas'
                ? 'bg-montane text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Encuestas Personalizadas
          </button>

          <button
            onClick={() => {
              if (rolActual === 'publico') setRolActual('admin');
              setVistaActual('dashboard');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              vistaActual === 'dashboard'
                ? 'bg-montane text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
            Paneles Analíticos
          </button>

          <button
            onClick={() => setVistaActual('metodologia')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              vistaActual === 'metodologia'
                ? 'bg-montane text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Metodología MIESA
          </button>
        </nav>

        {/* Right CTA / Comparison Counter */}
        <div className="flex items-center gap-2.5">
          {comparandoCount > 0 && (
            <button
              onClick={onOpenComparador}
              className="px-3.5 py-1.5 bg-terroir hover:bg-terroir-700 text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-md font-mono-code animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Matriz Comparativa ({comparandoCount}/3)</span>
            </button>
          )}

          <button
            onClick={onOpenAppKeyModal}
            className="md:hidden p-2 bg-slate-100 text-montane rounded-lg border border-slate-200"
            title="Generar APP_KEY"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
