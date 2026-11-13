import React, { useState } from 'react';
import { Download, PlusSquare, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-blue-700 active:scale-95 transition cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Uygulamayı Yükle</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-700 hover:bg-blue-100 active:scale-95 transition cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span>iPhone&apos;a Ekle</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    iPhone Ana Ekranına Ekle
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Kapat"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Bu uygulamayı tam ekran iOS uygulaması olarak kullanmak için Safari üzerinden şu adımları izleyin:
              </p>

              <ol className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    Safari alt menüsündeki <strong className="inline-flex items-center gap-1 text-slate-900"><Share className="w-3.5 h-3.5 text-blue-600" /> Paylaş</strong> simgesine dokunun.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Aşağı kaydırıp <strong className="inline-flex items-center gap-1 text-slate-900"><PlusSquare className="w-3.5 h-3.5 text-blue-600" /> Ana Ekrana Ekle</strong> seçeneğine dokunun.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    3
                  </span>
                  <span>
                    Sağ üst köşedeki <strong className="text-slate-900">Ekle</strong> butonuna dokunun.
                  </span>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
              >
                Anladım
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
