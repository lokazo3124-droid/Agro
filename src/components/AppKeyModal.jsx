import React, { useState, useEffect } from 'react';
import { generateLaravelAppKey } from '../utils/keyGenerator';
import { Key, Copy, Check, RefreshCw, X, ShieldCheck, Terminal, FileCode } from 'lucide-react';

export default function AppKeyModal({ isOpen, onClose }) {
  const [currentKey, setCurrentKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentKey(generateLaravelAppKey());
      setCopied(false);
      setCopiedEnv(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(currentKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyEnvLine = () => {
    navigator.clipboard.writeText(`APP_KEY=${currentKey}`);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  const handleGenerateNew = () => {
    setCurrentKey(generateLaravelAppKey());
    setCopied(false);
    setCopiedEnv(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-montane-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-glass-modal max-w-xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-montane-950 via-montane to-montane-900 text-white p-5 flex items-center justify-between border-b border-montane-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sans">Generador de APP_KEY para Laravel</h3>
              <p className="text-xs text-emerald-200/80 font-mono-code">Cifrado AES-256-CBC • 32 Bytes Base64</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 bg-white">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 font-mono-code">
              Clave Criptográfica Generada:
            </label>
            <div className="flex items-center gap-2 p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono-code text-sm border border-slate-800 break-all select-all shadow-inner">
              <span className="flex-1 text-xs sm:text-sm font-semibold">{currentKey}</span>
              <button
                onClick={handleCopyKey}
                title="Copiar clave"
                className="shrink-0 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition flex items-center gap-1.5 text-xs font-sans font-bold"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handleGenerateNew}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-montane bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition font-mono-code"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generar otra clave
            </button>
            <button
              onClick={handleCopyEnvLine}
              className="inline-flex items-center gap-2 text-xs font-semibold text-montane hover:bg-emerald-100 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg transition font-mono-code"
            >
              <FileCode className="w-3.5 h-3.5" />
              {copiedEnv ? '¡Línea copiada!' : 'Copiar "APP_KEY=..."'}
            </button>
          </div>

          {/* Guide Steps */}
          <div className="bg-ground border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-montane-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instrucciones para tu archivo .env</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed font-sans">
              <li>
                Abre el archivo <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono-code text-[11px]">.env</code> en la raíz del proyecto.
              </li>
              <li>
                Ubica la directiva <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono-code text-[11px]">APP_KEY=</code> y actualízala:
                <pre className="mt-1.5 p-2 bg-slate-900 text-emerald-300 rounded font-mono-code text-[11px] overflow-x-auto">
APP_KEY={currentKey}
                </pre>
              </li>
              <li>
                Guarda los cambios. Laravel cifrará automáticamente todas las cookies, sesiones y tokens.
              </li>
            </ol>
          </div>

          {/* Artisan alternative */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Terminal className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Comando nativo en terminal Laravel:</span>
              <code className="block mt-1 bg-white p-1.5 rounded border border-slate-200 font-mono-code text-[11px] text-slate-800">
                php artisan key:generate
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-ground border-t border-slate-200 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-montane hover:bg-montane-800 text-white rounded-lg text-xs font-bold transition shadow-xs font-mono-code"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
