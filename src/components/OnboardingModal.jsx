import React, { useState } from 'react';
import { User, Shield, HardHat, Building2, Check, ArrowRight } from 'lucide-react';
import { VOCATIONAL_TRADES, TRAINING_CENTERS } from '../data/scenarios';
import { sound } from '../utils/audio';

export default function OnboardingModal({ initialData, language, onSave }) {
  const [name, setName] = useState(initialData.name || '');
  const [selectedTrade, setSelectedTrade] = useState(initialData.trade || VOCATIONAL_TRADES[0]);
  const [selectedCenter, setSelectedCenter] = useState(initialData.institute || TRAINING_CENTERS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    sound.playHazardFound();
    onSave({
      name: name.trim(),
      trade: selectedTrade,
      institute: selectedCenter
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Top Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <HardHat className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            SIH26041 • JHARKHAND VOCATIONAL SAFETY INITIATIVE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-tech mt-1">
            {language === 'hi' ? 'प्रशिक्षु सुरक्षा इंडक्शन' : 'Trainee Safety Induction'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रशिक्षण शुरू करने से पहले अपना प्रोफाइल विवरण भरें'
              : 'Configure your profile before entering the AR Industrial Simulator'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'hi' ? 'प्रशिक्षु का नाम' : 'Trainee Full Name'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Kumar / Ananya Soren"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-sm text-white focus:outline-none transition-all"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'hi' ? 'व्यावसायिक ट्रेड / पद' : 'Vocational Trade / Discipline'}
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
              {VOCATIONAL_TRADES.map((trade) => {
                const isSelected = selectedTrade.id === trade.id;
                return (
                  <button
                    type="button"
                    key={trade.id}
                    onClick={() => setSelectedTrade(trade)}
                    className={`text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{language === 'hi' ? trade.nameHi : trade.nameEn}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'hi' ? 'प्रशिक्षण केंद्र / आईटीआई' : 'Vocational Training Center'}
            </label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs text-slate-200 focus:outline-none"
            >
              {TRAINING_CENTERS.map((center, idx) => (
                <option key={idx} value={center}>
                  {center}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{language === 'hi' ? 'सिम्युलेटर में प्रवेश करें' : 'Enter AR Simulator'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
