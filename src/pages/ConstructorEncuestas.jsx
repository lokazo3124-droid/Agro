import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Save, Layers, Sparkles } from 'lucide-react';

export default function ConstructorEncuestas() {
  const [encuestas, setEncuestas] = useState([
    {
      id: 1,
      titulo: "Encuesta de Satisfacción del Turista de Café",
      descripcion: "Medición de experiencia en catas guiadas y senderismo cafetero en Fusagasugá.",
      estado: "Activa",
      preguntas: [
        {
          id: 101,
          texto: "¿Cómo califica la calidad del café servido durante la cata experiencial?",
          tipo: "escala_1_5",
        },
        {
          id: 102,
          texto: "¿El sendero ecológico contó con suficiente señalización y seguridad?",
          tipo: "si_no",
        },
        {
          id: 103,
          texto: "¿Qué servicio adicional le gustaría encontrar en su próxima visita?",
          tipo: "opcion_multiple",
          opciones: ["Glamping / Hospedaje", "Taller de Barismo", "Tienda de souvenirs campesinos", "Comida típica al leña"]
        },
        {
          id: 104,
          texto: "Comentarios o sugerencias para la familia caficultora:",
          tipo: "texto",
        }
      ]
    }
  ]);

  const [nuevaEncuestaModal, setNuevaEncuestaModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntasNuevas, setPreguntasNuevas] = useState([
    { id: 1, texto: '', tipo: 'escala_1_5', opcionesTexto: '' }
  ]);
  const [guardadoExito, setGuardadoExito] = useState(false);

  const handleAgregarPregunta = () => {
    setPreguntasNuevas([
      ...preguntasNuevas,
      { id: Date.now(), texto: '', tipo: 'escala_1_5', opcionesTexto: '' }
    ]);
  };

  const handleRemoverPregunta = (id) => {
    setPreguntasNuevas(preguntasNuevas.filter(p => p.id !== id));
  };

  const handleGuardarNuevaEncuesta = (e) => {
    e.preventDefault();
    if (!titulo) return;

    const preguntasProcesadas = preguntasNuevas.map((p, idx) => ({
      id: 200 + idx,
      texto: p.texto || `Pregunta ${idx + 1}`,
      tipo: p.tipo,
      opciones: p.tipo === 'opcion_multiple' && p.opcionesTexto
        ? p.opcionesTexto.split(',').map(s => s.trim())
        : []
    }));

    const nueva = {
      id: Date.now(),
      titulo,
      descripcion,
      estado: "Activa",
      preguntas: preguntasProcesadas
    };

    setEncuestas([nueva, ...encuestas]);
    setTitulo('');
    setDescripcion('');
    setPreguntasNuevas([{ id: 1, texto: '', tipo: 'escala_1_5', opcionesTexto: '' }]);
    setGuardadoExito(true);
    setTimeout(() => {
      setGuardadoExito(false);
      setNuevaEncuestaModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Fase 4 • Encuestas Personalizadas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Constructor de Encuestas y Formularios
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Diseña cuestionarios complementarios para turistas, recolectores y compradores sin alterar la estructura central del motor MIESA.
          </p>
        </div>

        <button
          onClick={() => setNuevaEncuestaModal(true)}
          className="px-4 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Encuesta</span>
        </button>
      </div>

      {/* Existing Surveys List */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-stone-900 font-display">
          Plantillas Disponibles en Sistema ({encuestas.length})
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {encuestas.map((enc) => (
            <div
              key={enc.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg text-stone-900">{enc.titulo}</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {enc.estado}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{enc.descripcion}</p>
                </div>
                <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-lg">
                  {enc.preguntas.length} preguntas configuradas
                </span>
              </div>

              {/* Questions Preview */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Preguntas del cuestionario:
                </span>
                <div className="space-y-2">
                  {enc.preguntas.map((p, i) => (
                    <div
                      key={p.id}
                      className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-medium text-stone-800">{p.texto}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                        {p.tipo === 'escala_1_5'
                          ? 'Escala 1 a 5'
                          : p.tipo === 'si_no'
                          ? 'Sí / No'
                          : p.tipo === 'opcion_multiple'
                          ? 'Opción Múltiple'
                          : 'Texto Libre'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: New Survey */}
      {nuevaEncuestaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 my-auto">
            <h3 className="font-bold text-base text-stone-900 font-display">
              Diseñar Encuesta Personalizada
            </h3>

            <form onSubmit={handleGuardarNuevaEncuesta} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Título de la encuesta:</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej. Evaluación de Calidad en Cabañas Rurales"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Descripción / Objetivo:</label>
                <textarea
                  rows="2"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Indique el propósito de la recolección de datos..."
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              {/* Dynamic Questions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Preguntas de la encuesta:</span>
                  <button
                    type="button"
                    onClick={handleAgregarPregunta}
                    className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar otra pregunta
                  </button>
                </div>

                {preguntasNuevas.map((preg, idx) => (
                  <div key={preg.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-stone-600">Pregunta #{idx + 1}</span>
                      {preguntasNuevas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoverPregunta(preg.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Texto de la pregunta..."
                          value={preg.texto}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPreguntasNuevas(prev =>
                              prev.map(p => p.id === preg.id ? { ...p, texto: val } : p)
                            );
                          }}
                          className="w-full p-2 bg-white border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <select
                          value={preg.tipo}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPreguntasNuevas(prev =>
                              prev.map(p => p.id === preg.id ? { ...p, tipo: val } : p)
                            );
                          }}
                          className="w-full p-2 bg-white border border-stone-200 rounded-lg text-xs"
                        >
                          <option value="escala_1_5">Escala 1 a 5</option>
                          <option value="si_no">Sí / No</option>
                          <option value="opcion_multiple">Opción Múltiple</option>
                          <option value="texto">Texto Libre</option>
                        </select>
                      </div>
                    </div>

                    {preg.tipo === 'opcion_multiple' && (
                      <div>
                        <input
                          type="text"
                          placeholder="Opciones separadas por coma (ej. Opción A, Opción B, Opción C)"
                          value={preg.opcionesTexto || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPreguntasNuevas(prev =>
                              prev.map(p => p.id === preg.id ? { ...p, opcionesTexto: val } : p)
                            );
                          }}
                          className="w-full p-2 bg-white border border-stone-200 rounded-lg text-[11px]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {guardadoExito && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  ¡Encuesta guardada y activada con éxito!
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNuevaEncuestaModal(false)}
                  className="px-3 py-2 bg-stone-200 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Guardar Encuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
