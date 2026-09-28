import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, Activity, User, BookOpen, ExternalLink } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';

export default function DashboardModal({
  trainee,
  discoveredHazards,
  quizScores,
  decisionScores,
  language,
  onOpenCertificate,
  onClose
}) {
  // Aggregate stats
  const totalHazardsCount = SCENARIOS.reduce((sum, s) => sum + s.hazards.length, 0);
  const foundHazardsCount = discoveredHazards.length;
  const hazardPct = Math.round((foundHazardsCount / Math.max(1, totalHazardsCount)) * 100);

  // Average quiz score
  const quizEntries = Object.values(quizScores);
  const avgQuizPct = quizEntries.length > 0
    ? Math.round(quizEntries.reduce((a, b) => a + b, 0) / quizEntries.length)
    : 0;

  // Decision score average
  const decisionEntries = Object.values(decisionScores);
  const correctDecisionsCount = decisionEntries.filter((d) => d.isCorrect).length;
  const decisionPct = decisionEntries.length > 0
    ? Math.round((correctDecisionsCount / decisionEntries.length) * 100)
    : 0;

  // Overall readiness index
  const overallReadiness = Math.round(
    hazardPct * 0.4 + avgQuizPct * 0.35 + (decisionEntries.length > 0 ? decisionPct * 0.25 : 0)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Activity className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                {language === 'hi' ? 'प्रशिक्षु सुरक्षा प्रदर्शन डैशबोर्ड' : 'TRAINEE COMPETENCY DASHBOARD'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white font-tech">
                {language === 'hi' ? 'झारखंड औद्योगिक सुरक्षा तत्परता' : "Jharkhand Industrial Safety Readiness"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Trainee Profile Bar */}
        <div className="my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold font-mono">
              {trainee.name ? trainee.name.charAt(0).toUpperCase() : 'T'}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{trainee.name || 'Rahul Kumar (Trainee)'}</h4>
              <p className="text-xs text-slate-400">
                {trainee.trade?.nameEn} • {trainee.institute || 'BCCL Dhanbad Training Center'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              {language === 'hi' ? 'कुल सुरक्षा तत्परता' : 'Overall Readiness'}
            </span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {overallReadiness}%
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {language === 'hi' ? 'खतरा पहचान (AR)' : 'Hazard Detection'}
            </span>
            <div className="text-xl font-extrabold text-amber-400 font-mono">
              {foundHazardsCount} / {totalHazardsCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{hazardPct}% Found</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {language === 'hi' ? 'आपातकालीन निर्णय' : 'Emergency Decisions'}
            </span>
            <div className="text-xl font-extrabold text-blue-400 font-mono">
              {decisionEntries.length > 0 ? `${decisionPct}%` : 'Pending'}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {correctDecisionsCount} {language === 'hi' ? 'सटीक निर्णय' : 'Safe Actions'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {language === 'hi' ? 'DGMS क्विज़ स्कोर' : 'Statutory Quiz'}
            </span>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              {quizEntries.length > 0 ? `${avgQuizPct}%` : 'Not Started'}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {quizEntries.length} {language === 'hi' ? 'मॉड्यूल पूरे' : 'Modules Tested'}
            </div>
          </div>
        </div>

        {/* Modules Breakdown */}
        <div className="mb-5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            {language === 'hi' ? 'मॉड्यूल प्रगति स्थिति' : 'Scenario Module Progress'}
          </h4>
          <div className="space-y-2">
            {SCENARIOS.map((sc) => {
              const scFoundCount = sc.hazards.filter((h) => discoveredHazards.includes(h.id)).length;
              const hasQuiz = quizScores[sc.id] !== undefined;
              const hasDecision = decisionScores[sc.id] !== undefined;

              return (
                <div
                  key={sc.id}
                  className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.themeColor }} />
                    <span className="font-semibold text-slate-200">
                      {language === 'hi' ? sc.titleHi : sc.titleEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                    <span>
                      {scFoundCount}/{sc.hazards.length} Hazards
                    </span>
                    <span>
                      Quiz: {hasQuiz ? `${quizScores[sc.id]}%` : '-'}
                    </span>
                    <span className={hasDecision && decisionScores[sc.id].isCorrect ? 'text-emerald-400' : 'text-slate-500'}>
                      {hasDecision ? (decisionScores[sc.id].isCorrect ? 'Dec: Pass' : 'Dec: Fail') : 'Dec: -'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Button */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {overallReadiness >= 60
                ? (language === 'hi' ? 'प्रमाणपत्र प्राप्त करने के लिए योग्य' : 'Eligible for Verified Digital Certificate')
                : (language === 'hi' ? 'प्रमाणपत्र के लिए न्यूनतम 60% आवश्यक' : 'Achieve ≥60% for Certificate')}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenCertificate();
            }}
            disabled={overallReadiness < 40}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
              overallReadiness >= 40
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{language === 'hi' ? 'प्रमाणपत्र देखें' : 'View Safety Certificate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
