import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function QuizModal({ scenario, language, onComplete, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = scenario.quizQuestions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playHazardFound();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      const scorePct = Math.round(((correctAnswersCount + (selectedIdx === currentQ.correctIndex ? 0 : 0)) / questions.length) * 100);
      if (scorePct >= 75) {
        sound.playSuccessFanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleFinish = () => {
    const finalScorePct = Math.round((correctAnswersCount / questions.length) * 100);
    onComplete(finalScorePct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentIdx + (isCompleted ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        {!isCompleted ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <HelpCircle className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {language === 'hi' ? 'सुरक्षा मूल्यांकन परीक्षा' : 'SAFETY ASSESSMENT QUIZ'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {language === 'hi' ? scenario.titleHi : scenario.titleEn}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {currentIdx + 1} / {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-sm sm:text-base font-medium text-slate-100 mb-4 leading-relaxed">
              {language === 'hi' ? currentQ.questionHi : currentQ.questionEn}
            </h4>

            {/* Options */}
            <div className="space-y-2.5 mb-4">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-amber-500/40 hover:bg-slate-800/50';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/50 text-emerald-200';
                  } else if (idx === selectedIdx) {
                    btnStyle = 'border-red-500 bg-red-950/50 text-red-200';
                  } else {
                    btnStyle = 'opacity-40 border-slate-800 bg-slate-950/30';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 font-bold border border-slate-700 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && idx === selectedIdx && idx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-4 animate-in fade-in">
                <span className="font-bold text-amber-400 block mb-1">
                  {language === 'hi' ? 'सुरक्षा नियम विवरण:' : 'Safety Regulation Clarification:'}
                </span>
                {currentQ.explanationEn}
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              {isAnswered ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>{currentIdx + 1 === questions.length ? (language === 'hi' ? 'परिणाम देखें' : 'View Results') : (language === 'hi' ? 'अगला प्रश्न' : 'Next Question')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  {language === 'hi' ? 'छोड़ें' : 'Exit'}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Completion Summary */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-tech">
              {language === 'hi' ? 'मूल्यांकन पूर्ण!' : 'Assessment Complete!'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {language === 'hi'
                ? 'आपने इस सुरक्षा मॉड्यूल का ज्ञान परीक्षण सफलतापूर्वक पूरा किया है।'
                : 'You have completed the statutory safety assessment module.'}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block mb-6 min-w-[200px]">
              <div className="text-3xl font-extrabold text-amber-400 font-mono mb-1">
                {Math.round((correctAnswersCount / questions.length) * 100)}%
              </div>
              <div className="text-xs text-slate-400">
                {correctAnswersCount} / {questions.length} {language === 'hi' ? 'सही उत्तर' : 'Correct Answers'}
              </div>
            </div>

            <div>
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                {language === 'hi' ? 'डैशबोर्ड में सेव करें' : 'Save to Trainee Record'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
