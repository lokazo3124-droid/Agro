import React, { useState } from 'react';
import MapaFincas from '../components/MapaFincas';
import FincaCard from '../components/FincaCard';
import { Search, MapPin, Filter, Sparkles, Map, Grid, RefreshCw } from 'lucide-react';

export default function DirectorioFincas({
  fincas,
  onVerDetalles,
  onToggleComparar,
  fincasComparando,
  onEvaluarFinca,
}) {
  const [busqueda, setBusqueda] = useState('');
  const [veredaFiltro, setVeredaFiltro] = useState('todas');
  const [nivelFiltro, setNivelFiltro] = useState('todos');
  const [servicioFiltro, setServicioFiltro] = useState('todos');
  const [vistaModo, setVistaModo] = useState('ambos');
  const [fincaSeleccionadaMapa, setFincaSeleccionadaMapa] = useState(null);

  const veredas = Array.from(new Set(fincas.map((f) => f.vereda))).sort();

  const fincasFiltradas = fincas.filter((finca) => {
    const textoMatch =
      finca.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      finca.propietario.toLowerCase().includes(busqueda.toLowerCase()) ||
      finca.vereda.toLowerCase().includes(busqueda.toLowerCase()) ||
      finca.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const veredaMatch = veredaFiltro === 'todas' || finca.vereda === veredaFiltro;

    let nivelMatch = true;
    if (nivelFiltro === 'sobresaliente') nivelMatch = finca.isa > 80;
    else if (nivelFiltro === 'sostenible') nivelMatch = finca.isa > 60 && finca.isa <= 80;
    else if (nivelFiltro === 'moderado') nivelMatch = finca.isa > 40 && finca.isa <= 60;
    else if (nivelFiltro === 'alerta') nivelMatch = finca.isa <= 40;

    const servicioMatch =
      servicioFiltro === 'todos' ||
      finca.servicios.some((s) => s.toLowerCase().includes(servicioFiltro.toLowerCase()));

    return textoMatch && veredaMatch && nivelMatch && servicioMatch;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner: Deep Montane Emerald & Terroir Precision */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-montane-950 via-montane to-montane-900 text-white p-6 sm:p-10 shadow-glass-elevated border border-montane-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4 font-mono-code">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PCC-CUNDINAMARCA • METODOLOGÍA MIESA 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight leading-tight mb-3">
            Observatorio Agroturístico y Terroir Cafetero
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl">
            Catálogo científico de predios cafeteros evaluados con rigor multi-criterio en Fusagasugá. Consulta indicadores de sostenibilidad (ISA), madurez agroturística (TRL-A / SRL-A) y contacta directamente a las familias campesinas.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl text-slate-800 shadow-inner">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Buscar predio, vereda (San Rafael, Los Robles...), propietario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full text-xs sm:text-sm focus:outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => {
                setBusqueda('');
                setVeredaFiltro('todas');
                setNivelFiltro('todos');
                setServicioFiltro('todos');
              }}
              className="px-4 py-2 bg-montane-800 hover:bg-montane-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 font-mono-code border border-montane-600"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-glass-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Vereda select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono-code">
            <MapPin className="w-4 h-4 text-montane" />
            <select
              value={veredaFiltro}
              onChange={(e) => setVeredaFiltro(e.target.value)}
              className="bg-ground border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
            >
              <option value="todas">Todas las veredas ({fincas.length})</option>
              {veredas.map((v) => (
                <option key={v} value={v}>
                  Vereda {v}
                </option>
              ))}
            </select>
          </div>

          {/* Semaphoric Level select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono-code">
            <Filter className="w-4 h-4 text-montane" />
            <select
              value={nivelFiltro}
              onChange={(e) => setNivelFiltro(e.target.value)}
              className="bg-ground border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
            >
              <option value="todos">Todos los rangos IETSS</option>
              <option value="sobresaliente">Sobresaliente (&gt;80 pts - Cyan)</option>
              <option value="sostenible">Alto / Sostenible (61-80 pts - Emerald)</option>
              <option value="moderado">Moderado (41-60 pts - Ochre)</option>
              <option value="alerta">Alerta / Crítico (≤40 pts - Orange/Red)</option>
            </select>
          </div>

          {/* Service filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono-code">
            <select
              value={servicioFiltro}
              onChange={(e) => setServicioFiltro(e.target.value)}
              className="bg-ground border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
            >
              <option value="todos">Todos los servicios</option>
              <option value="cata">Cata de café especial</option>
              <option value="sendero">Sendero ecológico</option>
              <option value="alojamiento">Alojamiento / Glamping</option>
              <option value="aves">Avistamiento de aves</option>
              <option value="barismo">Taller de barismo</option>
            </select>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono-code">
          <button
            onClick={() => setVistaModo('ambos')}
            className={`px-3 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              vistaModo === 'ambos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Completo
          </button>
          <button
            onClick={() => setVistaModo('mapa')}
            className={`px-3 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              vistaModo === 'mapa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Mapa
          </button>
          <button
            onClick={() => setVistaModo('tarjetas')}
            className={`px-3 py-1 rounded-md font-bold transition flex items-center gap-1 ${
              vistaModo === 'tarjetas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Dossiers
          </button>
        </div>
      </div>

      {/* Map Section */}
      {(vistaModo === 'ambos' || vistaModo === 'mapa') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              <MapPin className="w-4 h-4 text-montane" />
              Cartografía Territorial de Predios • Provincia del Sumapaz
            </h3>
            <span className="text-xs text-slate-500 font-mono-code">
              {fincasFiltradas.length} predios georreferenciados
            </span>
          </div>
          <MapaFincas
            fincas={fincasFiltradas}
            onSelectFinca={(f) => {
              setFincaSeleccionadaMapa(f);
              onVerDetalles(f);
            }}
            fincaSeleccionada={fincaSeleccionadaMapa}
            height={vistaModo === 'mapa' ? '580px' : '420px'}
          />
        </div>
      )}

      {/* Cards Grid */}
      {(vistaModo === 'ambos' || vistaModo === 'tarjetas') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Predios Evaluados ({fincasFiltradas.length})
            </h3>
            <span className="text-xs text-slate-500 font-mono-code">
              METODOLOGÍA MIESA • 5 EJES
            </span>
          </div>

          {fincasFiltradas.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <p className="text-base font-semibold">No se encontraron predios con esos criterios de búsqueda.</p>
              <button
                onClick={() => {
                  setBusqueda('');
                  setVeredaFiltro('todas');
                  setNivelFiltro('todos');
                  setServicioFiltro('todos');
                }}
                className="mt-3 px-4 py-2 bg-montane text-white rounded-lg text-xs font-bold font-mono-code"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {fincasFiltradas.map((finca) => (
                <FincaCard
                  key={finca.id}
                  finca={finca}
                  onVerDetalles={onVerDetalles}
                  onToggleComparar={onToggleComparar}
                  isComparando={fincasComparando.some((f) => f.id === finca.id)}
                  onEvaluar={onEvaluarFinca}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
