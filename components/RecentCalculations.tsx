import React from 'react';
import { HistoryItem } from '../types';
import { History, RotateCcw, Calendar, Trash2 } from 'lucide-react';

interface RecentCalculationsProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onClear?: () => void;
}

const RecentCalculations: React.FC<RecentCalculationsProps> = ({ 
  history, 
  onSelect,
  onDelete,
  onClear
}) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-800">
          <History className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Son Hesaplamalar</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {history.length}
          </span>
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
            title="Tüm geçmişi temizle"
          >
            <Trash2 className="w-3.5 h-3.5" /> Temizle
          </button>
        )}
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3 h-3" />
                {new Date(item.timestamp).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="font-medium text-slate-700">
                {item.data.anapara.toLocaleString('tr-TR')} TL 
                <span className="text-slate-400 mx-1">•</span> 
                %{item.data.yillikFaiz} 
                <span className="text-slate-400 mx-1">•</span> 
                {item.data.vadeGun} Gün
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1">
                  +{item.result.netGetiri.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                </div>
                <div className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors flex items-center justify-end gap-1 mt-1">
                  <RotateCcw className="w-3 h-3" /> Geri Yükle
                </div>
              </div>
              {onDelete && (
                <button
                  onClick={(e) => onDelete(item.id, e)}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Kaydı sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCalculations;