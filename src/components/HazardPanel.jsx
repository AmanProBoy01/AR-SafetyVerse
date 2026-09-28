import React from 'react';
import { AlertTriangle, CheckCircle, Flame, ShieldAlert, BookOpen, Award, ArrowRight, Zap, Info } from 'lucide-react';

export default function HazardPanel({
  scenario,
  discoveredHazards,
  language,
  onOpenDecision,
  onOpenQuiz,
  onOpenDashboard,
  hasCompletedDecision,
  hasCompletedQuiz
}) {
  const scHazards = scenario.hazards;
  const discoveredCount = scHazards.filter((h) => discoveredHazards.includes(h.id)).length;
  const progressPct = Math.round((discoveredCount / scHazards.length) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl select-none">
      {/* Scenario Header Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {language === 'hi' ? scenario.sectorHi : scenario.sectorEn}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {language === 'hi' ? scenario.regionHi : scenario.regionEn}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white font-tech">
          {language === 'hi' ? scenario.titleHi : scenario.titleEn}
        </h2>

        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {language === 'hi' ? scenario.descriptionHi : scenario.descriptionEn}
        </p>

        <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {language === 'hi' ? 'नियामक प्राधिकरण: ' : 'Statutory Authority: '}
            <strong className="text-slate-300">
              {language === 'hi' ? scenario.regulatoryAuthorityHi : scenario.regulatoryAuthorityEn}
            </strong>
          </span>
        </div>
      </div>

      {/* Discovery Progress Meter */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'खतरे पहचान प्रगति' : 'Hazard Identification Progress'}</span>
          </span>
          <span className="text-amber-400 font-bold">
            {discoveredCount} / {scHazards.length} ({progressPct}%)
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Hazards Checklist */}
      <div className="space-y-2 mb-5">
        <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
          {language === 'hi' ? 'खतरे की सूची (AR में टैप करें)' : 'Hazard Checklist (Tap in AR Viewport)'}
        </div>

        {scHazards.map((hazard) => {
          const isFound = discoveredHazards.includes(hazard.id);
          return (
            <div
              key={hazard.id}
              className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 text-xs ${
                isFound
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
              }`}
            >
              <span className={`p-1 rounded-md shrink-0 mt-0.5 ${
                isFound ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>
                {isFound ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-slate-200">
                    {isFound
                      ? (language === 'hi' ? hazard.nameHi : hazard.nameEn)
                      : (language === 'hi' ? `अज्ञात खतरा: ${hazard.category}` : `Undiscovered: ${hazard.category}`)}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 shrink-0">
                    +{hazard.points} pts
                  </span>
                </div>
                {isFound ? (
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {language === 'hi' ? hazard.regulationHi : hazard.regulationEn}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'hi' ? '3D वातावरण में खोजें और टैप करें' : 'Locate and tap in AR 3D space'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mode Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
        <button
          onClick={onOpenDecision}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
            hasCompletedDecision
              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-red-600 hover:bg-red-700 border-red-500 text-white shadow-lg animate-pulse'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>
            {hasCompletedDecision
              ? (language === 'hi' ? 'निर्णय दोहराएं' : 'Retry Decision')
              : (language === 'hi' ? 'आपातकालीन निर्णय' : 'Emergency Decision')}
          </span>
        </button>

        <button
          onClick={onOpenQuiz}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
            hasCompletedQuiz
              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-amber-500 hover:bg-amber-600 border-amber-400 text-slate-950 shadow-lg'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>
            {hasCompletedQuiz
              ? (language === 'hi' ? 'क्विज़ दोहराएं' : 'Retake Quiz')
              : (language === 'hi' ? 'सुरक्षा क्विज़' : 'Safety Quiz')}
          </span>
        </button>
      </div>
    </div>
  );
}
