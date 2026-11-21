import React from 'react';
import { certificatesList } from '../../data/achievementsData';
import { useApp } from '../../context/AppContext';
import { X, Printer, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal = ({ certificateId, onClose }) => {
  const { profile } = useApp();
  const cert = certificatesList.find(c => c.id === certificateId) || certificatesList[0];

  React.useEffect(() => {
    // Launch celebratory confetti when certificate is opened
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, [certificateId]);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate of Achievement"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-4 sm:p-8 space-y-6 relative border-4 border-amber-400">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span className="text-sm font-black uppercase text-slate-800 tracking-wider">
              Verified Student Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              aria-label="Close certificate modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div 
          id="printable-certificate"
          className="border-8 border-double border-amber-600 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 p-6 sm:p-10 rounded-2xl text-center space-y-6 shadow-inner relative"
        >
          {/* Watermark/Emblem */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-[14rem]">🌟</span>
          </div>

          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 text-white text-3xl shadow-md mb-2">
              🌟
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              SAHAAYA LEARN
            </h1>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              National Inclusive Education & Communication Platform
            </p>
          </div>

          {/* Subtitle */}
          <div className="py-2">
            <p className="text-sm sm:text-base font-serif italic text-slate-600">
              This is to proudly certify that
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-900 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8 mt-2">
              {profile.name || 'Valued Learner'}
            </h2>
            <p className="text-xs font-bold text-slate-500 mt-3">
              Age: {profile.age || 12} • Inclusive Learner Profile
            </p>
          </div>

          {/* Achievement Title */}
          <div className="bg-amber-100/70 border border-amber-300 py-3.5 px-6 rounded-2xl inline-block max-w-xl">
            <h3 className="text-lg sm:text-xl font-black text-amber-950">
              {cert.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-1">
              {cert.description}
            </p>
          </div>

          {/* Criteria & Date */}
          <div className="grid grid-cols-2 gap-4 text-left border-t border-b border-amber-200 py-4 max-w-lg mx-auto text-xs">
            <div>
              <span className="block font-bold text-slate-500 uppercase">Awarded On:</span>
              <span className="text-sm font-black text-slate-800">{currentDate}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-500 uppercase">Verification ID:</span>
              <span className="text-sm font-black text-slate-800 font-mono">SL-{cert.level}-9826A</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-center justify-between pt-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-serif italic text-base text-blue-900 border-b border-slate-400 pb-1 px-4">
                Dr. Anita Ramanathan
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-1">
                Inclusive Curriculum Director
              </span>
            </div>

            <div className="w-16 h-16 rounded-full border-4 border-amber-500 bg-amber-400/20 flex flex-col items-center justify-center text-amber-700 shadow-sm">
              <ShieldCheck className="w-7 h-7 text-amber-600" />
              <span className="text-[8px] font-black uppercase tracking-tighter">VERIFIED</span>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-blue-900 border-b border-slate-400 pb-1 px-4">
                Vikram Singhal
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-1">
                ISL & AAC Accessibility Board
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
