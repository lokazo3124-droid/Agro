import React from 'react';
import { Coffee, Shield, Key, Heart } from 'lucide-react';

export default function Footer({ onOpenAppKeyModal, setVistaActual }) {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-800 flex items-center justify-center text-amber-300">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-lg font-display">Agro Fusagasugá</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Sistema de evaluación y gestión del potencial agroturístico de fincas cafeteras basado en el modelo científico MIESA. Desarrollado para los caficultores de Fusagasugá, Cundinamarca.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-500">
              <span>Fusagasugá • Sumapaz • Colombia</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Navegación</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => setVistaActual('directorio')} className="hover:text-white transition">
                  Directorio & Mapa
                </button>
              </li>
              <li>
                <button onClick={() => setVistaActual('metodologia')} className="hover:text-white transition">
                  Metodología MIESA
                </button>
              </li>
              <li>
                <button onClick={() => setVistaActual('constructor_encuestas')} className="hover:text-white transition">
                  Encuestas Personalizadas
                </button>
              </li>
              <li>
                <button onClick={() => setVistaActual('dashboard')} className="hover:text-white transition">
                  Paneles por Rol
                </button>
              </li>
            </ul>
          </div>

          {/* Configuration & Legal */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Herramientas Técnicas</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={onOpenAppKeyModal}
                  className="hover:text-amber-400 text-amber-300 flex items-center gap-1.5 font-bold transition"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Generador de APP_KEY (.env)</span>
                </button>
              </li>
              <li className="text-stone-500">Laravel 11 • React • Vite</li>
              <li className="text-stone-500">Protección de Datos Habeas Data</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Agro Fusagasugá • Todos los derechos reservados.</span>
          <span className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para las familias cafeteras de Fusagasugá
          </span>
        </div>
      </div>
    </footer>
  );
}
