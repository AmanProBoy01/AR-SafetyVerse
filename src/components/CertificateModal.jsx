import React from 'react';
import { Award, Printer, Download, CheckCircle, Shield, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificateModal({ trainee, score, onClose, language }) {
  React.useEffect(() => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const certId = `JH-SAFETYVERSE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto">
        {/* Action Controls at Top */}
        <div className="flex justify-between items-center mb-3 no-print">
          <span className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'सत्यापित डिजिटल प्रमाणपत्र' : 'Statutory Digital Certificate Verified'}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट / सेव PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Certificate Card Printable Container */}
        <div className="certificate-container bg-slate-900 border-4 border-double border-amber-500/70 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
          {/* Subtle Watermark seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Shield className="w-96 h-96 text-amber-400" />
          </div>

          {/* Certificate Corner Ornaments */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500" />

          {/* Certificate Header */}
          <div className="text-center mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono tracking-widest uppercase mb-2">
              GOVERNMENT OF JHARKHAND • VOCATIONAL SKILL COUNCIL
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-amber-400 tracking-wide font-tech uppercase mb-1">
              Certificate of Safety Competency
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 tracking-wider">
              AR SafetyVerse — Industrial Safety & Emergency Protocol Simulator (SIH26041)
            </p>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-6 space-y-4 relative z-10">
            <p className="text-xs text-slate-400 uppercase tracking-widest">
              This is to certify that
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide border-b-2 border-amber-500/30 pb-2 inline-block px-8">
              {trainee.name || 'Rahul Kumar'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully completed AR SafetyVerse simulated practical training in <span className="text-amber-400 font-semibold">{trainee.trade?.nameEn || 'Industrial Safety Technician'}</span> at <span className="text-slate-200 font-semibold">{trainee.institute || 'BCCL Dhanbad Vocational Training Center'}</span>.
            </p>

            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Demonstrated verified proficiency in DGMS Undergound Coal Mine Hazard Detection, Bokaro Steel Machinery Guarding (Factories Act 1948), and Class C Electrical Fire Emergency Protocol.
            </p>
          </div>

          {/* Score & Certificate Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center relative z-10">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Overall Score</span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">{score}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Safety Grade</span>
              <span className="text-base sm:text-lg font-bold font-mono text-amber-400">
                {score >= 85 ? 'Grade A+' : score >= 70 ? 'Grade A' : 'Grade B'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Issue Date</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-slate-300">{issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">DGMS Compliance</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400">PASSED</span>
            </div>
          </div>

          {/* Signatures & QR Code */}
          <div className="flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-slate-800 relative z-10">
            <div className="text-left">
              <div className="h-8 font-serif italic text-amber-400 text-sm font-bold tracking-wider">
                Dr. R. K. Soren
              </div>
              <div className="text-[11px] font-bold text-slate-300">Director of Safety & Vocational Training</div>
              <div className="text-[10px] text-slate-500">Directorate General of Mines Safety (DGMS), Dhanbad</div>
            </div>

            {/* QR Code Simulation */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white text-slate-950">
              <QrCode className="w-10 h-10" />
              <div className="text-[9px] font-mono leading-tight">
                <span className="font-bold block">VERIFY ONLINE</span>
                <span>ID: {certId.substring(0, 16)}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="h-8 font-serif italic text-amber-400 text-sm font-bold tracking-wider">
                Anjali Mahato
              </div>
              <div className="text-[11px] font-bold text-slate-300">Joint Inspector of Factories</div>
              <div className="text-[10px] text-slate-500">Government of Jharkhand, Ranchi</div>
            </div>
          </div>

          {/* Certificate Verification Serial */}
          <div className="text-center mt-6 text-[9px] font-mono text-slate-600">
            CERTIFICATE ID: {certId} • STATUTORY COMPLIANCE: CMR 2017 & THE FACTORIES ACT 1948
          </div>
        </div>
      </div>
    </div>
  );
}
