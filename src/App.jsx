import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DirectorioFincas from './pages/DirectorioFincas';
import AdminDashboard from './pages/AdminDashboard';
import DuenoDashboard from './pages/DuenoDashboard';
import EncuestadorDashboard from './pages/EncuestadorDashboard';
import GestorDashboard from './pages/GestorDashboard';
import ConstructorEncuestas from './pages/ConstructorEncuestas';
import MetodologiaMiesa from './pages/MetodologiaMiesa';
import FincaDetailModal from './components/FincaDetailModal';
import ComparadorModal from './components/ComparadorModal';
import EncuestaMiesaModal from './components/EncuestaMiesaModal';
import AppKeyModal from './components/AppKeyModal';
import { FINCAS_INICIALES, USUARIOS_INICIALES } from './data/fincas';

export default function App() {
  const [fincas, setFincas] = useState(FINCAS_INICIALES);
  const [fincasComparando, setFincasComparando] = useState([]);
  const [fincaDetalle, setFincaDetalle] = useState(null);
  const [fincaParaEvaluar, setFincaParaEvaluar] = useState(null);
  const [isAppKeyModalOpen, setIsAppKeyModalOpen] = useState(false);
  const [isComparadorOpen, setIsComparadorOpen] = useState(false);
  const [vistaActual, setVistaActual] = useState('directorio');
  const [rolActual, setRolActual] = useState('publico');
  const [toast, setToast] = useState(null);

  const showToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 3500);
  };

  // Toggle farm for comparison (max 3)
  const handleToggleComparar = (finca) => {
    if (fincasComparando.some((f) => f.id === finca.id)) {
      setFincasComparando(fincasComparando.filter((f) => f.id !== finca.id));
      showToast(`Finca "${finca.nombre}" retirada del comparador.`);
    } else {
      if (fincasComparando.length >= 3) {
        showToast('Máximo 3 fincas simultáneas en el comparador.');
        return;
      }
      setFincasComparando([...fincasComparando, finca]);
      showToast(`Finca "${finca.nombre}" agregada al comparador (${fincasComparando.length + 1}/3).`);
    }
  };

  const handleRemoverComparando = (id) => {
    setFincasComparando(fincasComparando.filter((f) => f.id !== id));
  };

  // Save new MIESA evaluation
  const handleGuardarEvaluacion = (evaluacion) => {
    setFincas((prevFincas) =>
      prevFincas.map((f) => {
        if (f.id === evaluacion.fincaId) {
          const nuevasEvaluaciones = [
            {
              fecha: evaluacion.fecha,
              isa: evaluacion.isa,
              encuestador: evaluacion.encuestador,
            },
            ...(f.evaluacionesHistoricas || []),
          ];
          return {
            ...f,
            isa: evaluacion.isa,
            dimensiones: evaluacion.dimensiones,
            evaluacionesHistoricas: nuevasEvaluaciones,
          };
        }
        return f;
      })
    );
    showToast(`¡Evaluación guardada con éxito! Nuevo ISA: ${evaluacion.isa} pts.`);
  };

  // Current user based on active role
  const usuarioActual = USUARIOS_INICIALES.find((u) => {
    if (rolActual === 'admin') return u.rol === 'Administrador';
    if (rolActual === 'dueno') return u.rol === 'Dueño de Finca';
    if (rolActual === 'encuestador') return u.rol === 'Encuestador';
    if (rolActual === 'gestor') return u.rol === 'Gestor Territorial';
    return null;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-amber-800 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-stone-800 animate-slide-up flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        rolActual={rolActual}
        setRolActual={setRolActual}
        onOpenAppKeyModal={() => setIsAppKeyModalOpen(true)}
        comparandoCount={fincasComparando.length}
        onOpenComparador={() => setIsComparadorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {vistaActual === 'directorio' && (
          <DirectorioFincas
            fincas={fincas}
            onVerDetalles={(f) => setFincaDetalle(f)}
            onToggleComparar={handleToggleComparar}
            fincasComparando={fincasComparando}
            onEvaluarFinca={(f) => setFincaParaEvaluar(f)}
          />
        )}

        {vistaActual === 'constructor_encuestas' && <ConstructorEncuestas />}

        {vistaActual === 'metodologia' && <MetodologiaMiesa />}

        {vistaActual === 'dashboard' && (
          <>
            {rolActual === 'admin' && (
              <AdminDashboard
                fincas={fincas}
                onVerDetalles={(f) => setFincaDetalle(f)}
                onEvaluarFinca={(f) => setFincaParaEvaluar(f)}
                onOpenAppKeyModal={() => setIsAppKeyModalOpen(true)}
              />
            )}
            {rolActual === 'dueno' && (
              <DuenoDashboard
                finca={fincas[0]}
                onVerDetalles={(f) => setFincaDetalle(f)}
                onEvaluarFinca={(f) => setFincaParaEvaluar(f)}
              />
            )}
            {rolActual === 'encuestador' && (
              <EncuestadorDashboard
                fincas={fincas}
                onEvaluarFinca={(f) => setFincaParaEvaluar(f)}
                onVerDetalles={(f) => setFincaDetalle(f)}
              />
            )}
            {rolActual === 'gestor' && (
              <GestorDashboard
                fincas={fincas}
                onVerDetalles={(f) => setFincaDetalle(f)}
              />
            )}
            {rolActual === 'publico' && (
              <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-4">
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Selecciona un Rol de Gestión para Ver su Panel
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Como visitante, puedes consultar el directorio público y mapa. Para ver paneles administrativos o técnicos, selecciona un rol en la barra superior.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => setRolActual('admin')}
                    className="px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-bold"
                  >
                    Rol Administrador
                  </button>
                  <button
                    onClick={() => setRolActual('dueno')}
                    className="px-4 py-2 bg-amber-900 text-white rounded-xl text-xs font-bold"
                  >
                    Rol Dueño de Finca
                  </button>
                  <button
                    onClick={() => setRolActual('encuestador')}
                    className="px-4 py-2 bg-emerald-900 text-white rounded-xl text-xs font-bold"
                  >
                    Rol Encuestador
                  </button>
                  <button
                    onClick={() => setRolActual('gestor')}
                    className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
                  >
                    Rol Gestor Territorial (Camilo Ángel)
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Farm Detail Modal */}
      <FincaDetailModal
        finca={fincaDetalle}
        onClose={() => setFincaDetalle(null)}
        onStartEncuesta={(f) => {
          setFincaDetalle(null);
          setFincaParaEvaluar(f);
        }}
      />

      {/* Comparison Modal */}
      {isComparadorOpen && (
        <ComparadorModal
          fincasSeleccionadas={fincasComparando}
          onClose={() => setIsComparadorOpen(false)}
          onRemoverFinca={handleRemoverComparando}
        />
      )}

      {/* Survey Modal */}
      <EncuestaMiesaModal
        finca={fincaParaEvaluar}
        isOpen={Boolean(fincaParaEvaluar)}
        onClose={() => setFincaParaEvaluar(null)}
        onGuardarEvaluacion={handleGuardarEvaluacion}
        usuarioActual={usuarioActual}
      />

      {/* Laravel APP_KEY Generator Modal */}
      <AppKeyModal
        isOpen={isAppKeyModalOpen}
        onClose={() => setIsAppKeyModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenAppKeyModal={() => setIsAppKeyModalOpen(true)}
        setVistaActual={setVistaActual}
      />
    </div>
  );
}
