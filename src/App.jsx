import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ARViewer from './components/ARViewer';
import HazardPanel from './components/HazardPanel';
import OnboardingModal from './components/OnboardingModal';
import DecisionModal from './components/DecisionModal';
import QuizModal from './components/QuizModal';
import DashboardModal from './components/DashboardModal';
import CertificateModal from './components/CertificateModal';
import { SCENARIOS, VOCATIONAL_TRADES, TRAINING_CENTERS } from './data/scenarios';
import { sound } from './utils/audio';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeScenarioId, setActiveScenarioId] = useState('mining');
  const [discoveredHazards, setDiscoveredHazards] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [decisionScores, setDecisionScores] = useState({});
  const [trainee, setTrainee] = useState({
    name: 'Rahul Kumar',
    trade: VOCATIONAL_TRADES[0],
    institute: TRAINING_CENTERS[0]
  });

  // Modal triggers
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleHazardDiscovered = (hazard) => {
    if (!discoveredHazards.includes(hazard.id)) {
      setDiscoveredHazards((prev) => [...prev, hazard.id]);
    }
  };

  const handleDecisionComplete = (scoreDelta, isCorrect) => {
    setDecisionScores((prev) => ({
      ...prev,
      [activeScenarioId]: { scoreDelta, isCorrect }
    }));
  };

  const handleQuizComplete = (scorePct) => {
    setQuizScores((prev) => ({
      ...prev,
      [activeScenarioId]: scorePct
    }));
  };

  // Calculate total points
  const hazardsPoints = discoveredHazards.reduce((acc, hId) => {
    for (const sc of SCENARIOS) {
      const match = sc.hazards.find((h) => h.id === hId);
      if (match) return acc + match.points;
    }
    return acc;
  }, 0);

  const decisionPoints = Object.values(decisionScores).reduce(
    (acc, d) => acc + (d.scoreDelta || 0),
    0
  );

  const totalPoints = Math.max(0, hazardsPoints + decisionPoints);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Navigation */}
      <Navbar
        scenarios={SCENARIOS}
        activeScenarioId={activeScenarioId}
        onSelectScenario={(id) => setActiveScenarioId(id)}
        trainee={trainee}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenProfile={() => setIsOnboardingOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Simulator Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center Viewport Column (7 Cols on LG) */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3">
          <ARViewer
            key={activeScenario.id}
            scenario={activeScenario}
            discoveredHazards={discoveredHazards}
            onHazardDiscovered={handleHazardDiscovered}
            language={language}
          />

          {/* Quick HUD Strip Below Viewport */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                {language === 'hi' ? 'कुल अर्जित अंक' : 'Score Points'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-amber-400">
                {totalPoints} pts
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                {language === 'hi' ? 'पहचाने गए खतरे' : 'Hazards Found'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                {discoveredHazards.length} / 12
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                {language === 'hi' ? 'सुरक्षा रेटिंग' : 'Safety Rating'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-blue-400">
                {totalPoints >= 150 ? 'L3 EXPERT' : totalPoints >= 75 ? 'L2 INTERMEDIATE' : 'L1 APPRENTICE'}
              </span>
            </div>
          </div>
        </section>

        {/* Right Task / Hazard Panel Column (5 Cols on LG) */}
        <section className="lg:col-span-5 xl:col-span-4">
          <HazardPanel
            scenario={activeScenario}
            discoveredHazards={discoveredHazards}
            language={language}
            onOpenDecision={() => setIsDecisionOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenDashboard={() => setIsDashboardOpen(true)}
            hasCompletedDecision={decisionScores[activeScenarioId] !== undefined}
            hasCompletedQuiz={quizScores[activeScenarioId] !== undefined}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 text-center text-xs text-slate-500 border-t border-slate-900 bg-slate-950">
        <p>
          AR SafetyVerse • SIH26041 Prototype • Developed for Jharkhand Mining & Manufacturing Vocational Safety Training (DGMS & Factories Act)
        </p>
      </footer>

      {/* Modals */}
      {isOnboardingOpen && (
        <OnboardingModal
          initialData={trainee}
          language={language}
          onSave={(data) => {
            setTrainee(data);
            setIsOnboardingOpen(false);
          }}
        />
      )}

      {isDecisionOpen && (
        <DecisionModal
          dilemma={activeScenario.decisionDilemma}
          language={language}
          onComplete={handleDecisionComplete}
          onClose={() => setIsDecisionOpen(false)}
        />
      )}

      {isQuizOpen && (
        <QuizModal
          scenario={activeScenario}
          language={language}
          onComplete={handleQuizComplete}
          onClose={() => setIsQuizOpen(false)}
        />
      )}

      {isDashboardOpen && (
        <DashboardModal
          trainee={trainee}
          discoveredHazards={discoveredHazards}
          quizScores={quizScores}
          decisionScores={decisionScores}
          language={language}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onClose={() => setIsDashboardOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          trainee={trainee}
          score={Math.min(100, Math.max(50, Math.round((totalPoints / 250) * 100)))}
          language={language}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}
    </div>
  );
}
