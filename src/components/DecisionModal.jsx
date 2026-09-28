import React, { useState, useEffect } from 'react';
import { AlertOctagon, Timer, ShieldCheck, XCircle, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function DecisionModal({ dilemma, language, onComplete, onClose }) {
  const [timeLeft, setTimeLeft] = useState(dilemma.timerSeconds || 25);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Siren effect on mount
  useEffect(() => {
    sound.playAlarm();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (feedback) return; // Stop timer once answered
    if (timeLeft <= 0) {
      handleTimeExpired();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft <= 5) {
        sound.playGasBeep();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, feedback]);

  const handleTimeExpired = () => {
    sound.playError();
    setFeedback({
      isCorrect: false,
      consequence: language === 'hi' ? 'समय समाप्त! आपातकाल में निर्णय लेने में देरी घातक होती है।' : 'Time Expired! Indecision in high-risk industrial emergencies is fatal.',
      scoreDelta: -30
    });
  };

  const handleSelect = (option) => {
    if (feedback) return;
    setSelectedOption(option.id);
    if (option.isCorrect) {
      sound.playHazardFound();
    } else {
      sound.playError();
    }
    setFeedback({
      isCorrect: option.isCorrect,
      consequence: language === 'hi' ? option.consequenceHi : option.consequenceEn,
      scoreDelta: option.scoreDelta
    });
  };

  const handleFinish = () => {
    if (feedback) {
      onComplete(feedback.scoreDelta, feedback.isCorrect);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-red-500/50 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Flashing Top Hazard Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertOctagon className="w-5 h-5 animate-bounce" />
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-red-400 font-bold">
                {language === 'hi' ? 'गंभीर निर्णय सिमुलेशन' : 'CRITICAL DECISION SIMULATION'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-tech">
                {language === 'hi' ? dilemma.titleHi : dilemma.titleEn}
              </h3>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
            timeLeft <= 5
              ? 'bg-red-950 border-red-500 text-red-400 animate-ping'
              : 'bg-slate-800 border-slate-700 text-amber-400'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        {/* Situation Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
          {language === 'hi' ? dilemma.situationHi : dilemma.situationEn}
        </div>

        {/* Decision Options */}
        <div className="space-y-2.5 mb-5">
          {dilemma.options.map((opt, idx) => {
            const isSelected = selectedOption === opt.id;
            let btnStyle = 'border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 bg-slate-950/50';

            if (feedback) {
              if (opt.isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'border-red-500 bg-red-950/40 text-red-200';
              } else {
                btnStyle = 'opacity-40 border-slate-800 bg-slate-950/30';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={Boolean(feedback)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold border border-slate-700 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">
                  {language === 'hi' ? opt.textHi : opt.textEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Explanation Card */}
        {feedback && (
          <div className={`p-4 rounded-xl border mb-4 animate-in slide-in-from-bottom-2 ${
            feedback.isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100'
              : 'bg-red-950/60 border-red-500/50 text-red-100'
          }`}>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wide">
              {feedback.isCorrect ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{language === 'hi' ? 'सटीक सुरक्षा निर्णय (+50 अंक)' : 'Safe Action Verified (+50 Pts)'}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400">{language === 'hi' ? 'खतरनाक निर्णय (-40 अंक)' : 'Dangerous Safety Breach (-40 Pts)'}</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">{feedback.consequence}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 pt-2">
          {feedback ? (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
