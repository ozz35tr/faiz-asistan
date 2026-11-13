import React from 'react';
import { CalculationData } from '../types';
import { Calculator, CalendarDays, Minus, Percent, Plus, Wallet } from 'lucide-react';

interface CalculatorFormProps {
  data: CalculationData;
  onChange: (key: keyof CalculationData, value: number) => void;
}

const ANAPARA_STEP = 10000;

const CalculatorForm: React.FC<CalculatorFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CalculationData) => {
    const val = parseFloat(e.target.value);
    onChange(field, isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleAnaparaStep = (delta: number) => {
    const nextValue = Math.max(0, (data.anapara || 0) + delta);
    onChange('anapara', nextValue);
  };

  const preventNegativeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
        <Calculator className="w-5 h-5 text-blue-600" />
        Hesaplama Bilgileri
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Anapara (TL)
          </label>
          <div className="flex items-stretch rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
            <button
              type="button"
              onClick={() => handleAnaparaStep(-ANAPARA_STEP)}
              disabled={data.anapara <= 0}
              aria-label="Anaparayı 10.000 TL azalt"
              title="-10.000 TL"
              className="px-4 flex items-center justify-center bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border-r border-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min={0}
              step="any"
              value={data.anapara}
              onChange={(e) => handleChange(e, 'anapara')}
              onKeyDown={preventNegativeKey}
              className="w-full px-4 py-3 bg-transparent outline-none font-medium text-slate-900 text-center"
              placeholder="0"
            />
            <button
              type="button"
              onClick={() => handleAnaparaStep(ANAPARA_STEP)}
              aria-label="Anaparayı 10.000 TL artır"
              title="+10.000 TL"
              className="px-4 flex items-center justify-center bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border-l border-slate-200 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Faiz Oranı (%)
            </label>
            <input
              type="number"
              min={0}
              step="any"
              value={data.yillikFaiz || ''}
              onChange={(e) => handleChange(e, 'yillikFaiz')}
              onKeyDown={preventNegativeKey}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="33.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Vade (Gün)
            </label>
            <input
              type="number"
              min={0}
              value={data.vadeGun || ''}
              onChange={(e) => handleChange(e, 'vadeGun')}
              onKeyDown={preventNegativeKey}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="32"
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Stopaj Oranı (%)
            </label>
            <input
              type="number"
              min={0}
              step="any"
              value={data.stopaj !== undefined ? data.stopaj : ''}
              onChange={(e) => handleChange(e, 'stopaj')}
              onKeyDown={preventNegativeKey}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="17.5"
            />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
