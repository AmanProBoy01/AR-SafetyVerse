import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Globe, Activity, Award, User, HardHat } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  trainee,
  language,
  onToggleLanguage,
  onOpenDashboard,
  onOpenProfile,
  onOpenCertificate
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/25 px-4 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Jharkhand Seal */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-wider text-white font-tech">
                <span className="text-amber-400">AR</span> SafetyVerse
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SIH26041
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {language === 'hi' ? 'झारखंड खनन एवं विनिर्माण सुरक्षा सिम्युलेटर' : "Jharkhand Industrial Safety Simulator"}
            </p>
          </div>
        </div>

        {/* Scenarios Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {scenarios.map((sc) => {
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{sc.id === 'mining' ? '⛏️' : sc.id === 'manufacturing' ? '⚙️' : '🔥'}</span>
                <span className="hidden md:inline">
                  {language === 'hi' ? sc.titleHi.split(' ')[0] : sc.titleEn.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trainee & Utility Actions */}
        <div className="flex items-center gap-2">
          {/* Audio Mute Button */}
          <button
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all font-mono"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{language === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Trainee Profile / Dashboard Trigger */}
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/20 transition-all font-medium"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{trainee.name ? trainee.name.split(' ')[0] : 'Trainee'}</span>
          </button>

          {/* Certificate Quick Icon */}
          <button
            onClick={onOpenCertificate}
            title="View Certificate"
            className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
          >
            <Award className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
