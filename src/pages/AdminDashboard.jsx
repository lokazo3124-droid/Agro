import React, { useState } from 'react';
import { USUARIOS_INICIALES } from '../data/fincas';
import { clasificarIETSS } from '../utils/miesaCalculator';
import {
  Shield,
  Users,
  Compass,
  AlertTriangle,
  Key,
  CheckCircle,
  FileText,
  Activity,
  Plus,
  Trash2,
} from 'lucide-react';

export default function AdminDashboard({
  fincas,
  onVerDetalles,
  onEvaluarFinca,
  onOpenAppKeyModal,
}) {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [nuevoUsuarioModal, setNuevoUsuarioModal] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoRol, setNuevoRol] = useState('Encuestador');

  const promedioISA = Math.round(
    (fincas.reduce((acc, f) => acc + f.isa, 0) / (fincas.length || 1)) * 10
  ) / 10;

  const fincasSobresalientes = fincas.filter((f) => f.isa > 80).length;
  const fincasSostenibles = fincas.filter((f) => f.isa > 60 && f.isa <= 80).length;
  const fincasAlerta = fincas.filter((f) => f.isa <= 40).length;

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoEmail) return;
    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      email: nuevoEmail,
      rol: nuevoRol,
      municipio: "Fusagasugá",
      fincasRegistradas: 0,
      estado: "Activo",
      nota: "Usuario registrado por Administrador",
    };
    setUsuarios([nuevo, ...usuarios]);
    setNuevoNombre('');
    setNuevoEmail('');
    setNuevoUsuarioModal(false);
  };

  const handleEliminarUsuario = (id) => {
    if (id === 1) {
      alert("No se puede eliminar al usuario Camilo Ángel (ID 33). Tiene fincas históricas vinculadas en la auditoría territorial.");
      return;
    }
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Montane Emerald */}
      <div className="bg-gradient-to-r from-montane-950 via-montane to-montane-900 rounded-3xl p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-4 border border-montane-800 shadow-glass-elevated">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 font-mono-code">
            <Shield className="w-3.5 h-3.5" />
            <span>MÓDULO DE CONTROL CENTRAL Y AUDITORÍA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Consola del Administrador General
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Supervisión institucional del registro de predios, auditoría de encuestadores, gestión de usuarios autorizados y configuración de claves criptográficas.
          </p>
        </div>

        {/* Quick APP_KEY action */}
        <button
          onClick={onOpenAppKeyModal}
          className="px-4 py-3 bg-terroir hover:bg-terroir-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md font-mono-code border border-terroir-500"
        >
          <Key className="w-4 h-4 text-amber-200" />
          <span>Gestionar APP_KEY (.env)</span>
        </button>
      </div>

      {/* KPI Cards in High Precision Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-glass-subtle">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono-code">
            Total Predios Monitoreados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-montane-900 font-mono-code">{fincas.length}</span>
            <span className="text-xs text-slate-500 font-semibold font-mono-code">fincas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono-code">100% georreferenciadas</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-glass-subtle">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono-code">
            Índice ISA Promedio Territorial
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600 font-mono-code">{promedioISA}</span>
            <span className="text-xs text-slate-500 font-semibold font-mono-code">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-2 font-bold font-mono-code">Rango: Sostenible / Alto</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-glass-subtle">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono-code">
            Sobresalientes (&gt;80 pts)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-hydro-600 font-mono-code">{fincasSobresalientes}</span>
            <span className="text-xs text-slate-500 font-semibold font-mono-code">líderes</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono-code">Puntajes TRL-A 5</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-glass-subtle">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono-code">
            En Alerta / Déficit (≤40 pts)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-orange-600 font-mono-code">{fincasAlerta}</span>
            <span className="text-xs text-slate-500 font-semibold font-mono-code">asistencia</span>
          </div>
          <p className="text-[11px] text-orange-700 mt-2 font-bold font-mono-code">Prioritarios de apoyo</p>
        </div>
      </div>

      {/* Two Columns: Farms Table + Users Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Registered Farms (2 cols) */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-glass-card">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-sans">
                Inventario Municipal de Fincas Cafeteras
              </h3>
              <p className="text-xs text-slate-500 font-mono-code">Evaluaciones MIESA activas y clasificación ISA</p>
            </div>
            <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700 font-mono-code">
              {fincas.length} registros
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-ground text-slate-600 border-b border-slate-200 font-mono-code">
                <tr>
                  <th className="p-3.5 font-bold">Predio & Vereda</th>
                  <th className="p-3.5 font-bold">Propietario</th>
                  <th className="p-3.5 font-bold">Altitud & Área</th>
                  <th className="p-3.5 font-bold">Puntaje ISA</th>
                  <th className="p-3.5 font-bold">IETSS</th>
                  <th className="p-3.5 font-bold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fincas.map((finca) => {
                  const ietss = clasificarIETSS(finca.isa);
                  return (
                    <tr key={finca.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{finca.nombre}</div>
                        <div className="text-slate-500 text-[11px] font-mono-code">Vereda {finca.vereda}</div>
                      </td>
                      <td className="p-3.5 text-slate-700">{finca.propietario}</td>
                      <td className="p-3.5 text-slate-600 font-mono-code">
                        {finca.altitud} msnm • {finca.areaHa} ha
                      </td>
                      <td className="p-3.5 font-black text-montane-900 font-mono-code text-sm">{finca.isa}</td>
                      <td className="p-3.5">
                        <span
                          style={{
                            backgroundColor: ietss.badgeBg,
                            color: ietss.badgeText,
                            borderColor: ietss.badgeBorder,
                          }}
                          className="border px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-code"
                        >
                          {ietss.codigo}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1 font-mono-code">
                        <button
                          onClick={() => onVerDetalles(finca)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-bold text-[11px] transition"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={() => onEvaluarFinca(finca)}
                          className="px-2.5 py-1 bg-montane hover:bg-montane-800 text-white rounded-md font-bold text-[11px] transition"
                        >
                          Evaluar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: User Management (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-glass-card flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-sans flex items-center gap-2">
                  <Users className="w-4 h-4 text-montane" />
                  Usuarios Autorizados
                </h3>
                <p className="text-xs text-slate-500 font-mono-code">Roles institucionales y acceso</p>
              </div>
              <button
                onClick={() => setNuevoUsuarioModal(true)}
                className="p-1.5 bg-montane hover:bg-montane-800 text-white rounded-lg transition"
                title="Agregar usuario"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 p-2">
              {usuarios.map((u) => (
                <div key={u.id} className="p-3 hover:bg-slate-50 rounded-xl transition space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{u.nombre}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono-code ${
                        u.rol === 'Administrador'
                          ? 'bg-purple-100 text-purple-900'
                          : u.rol === 'Gestor Territorial'
                          ? 'bg-sky-100 text-sky-900'
                          : u.rol === 'Dueño de Finca'
                          ? 'bg-amber-100 text-terroir-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {u.rol}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono-code">{u.email}</div>
                  {u.nota && (
                    <div className="text-[10px] text-montane-800 bg-emerald-50/70 p-1 rounded border border-emerald-200/60 font-medium">
                      ℹ️ {u.nota}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audit Note */}
          <div className="p-4 bg-ground border-t border-slate-100 text-[11px] text-slate-600 font-mono-code">
            <strong>Auditoría 2026:</strong> Usuario ID 33 (Camilo Ángel - Gestor Territorial) certificado con 5 predios vinculados.
          </div>
        </div>
      </div>

      {/* New User Modal */}
      {nuevoUsuarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-montane-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-glass-modal border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 font-sans">Registrar Nuevo Usuario Autorizado</h3>
            <form onSubmit={handleCrearUsuario} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nombre completo:</label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full p-2 bg-ground border border-slate-200 rounded-lg text-xs"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Correo electrónico:</label>
                <input
                  type="email"
                  required
                  value={nuevoEmail}
                  onChange={(e) => setNuevoEmail(e.target.value)}
                  className="w-full p-2 bg-ground border border-slate-200 rounded-lg text-xs font-mono-code"
                  placeholder="ejemplo@agrofusagasuga.co"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Rol en el sistema:</label>
                <select
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  className="w-full p-2 bg-ground border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Encuestador">Encuestador</option>
                  <option value="Dueño de Finca">Dueño de Finca</option>
                  <option value="Gestor Territorial">Gestor Territorial</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNuevoUsuarioModal(false)}
                  className="px-3 py-2 bg-slate-200 rounded-lg font-bold font-mono-code"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-montane text-white rounded-lg font-bold font-mono-code"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
