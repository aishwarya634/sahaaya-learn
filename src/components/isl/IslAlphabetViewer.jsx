import React, { useState } from 'react';
import { islAlphabets } from '../../data/islData';
import { IslMotionPlayer } from './IslMotionPlayer';
import { RotateCw, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslAlphabetViewer = () => {
  const [selectedLetter, setSelectedLetter] = useState(islAlphabets[0]);
  const [practiceCount, setPracticeCount] = useState(0);
  const [isPracticing, setIsPracticing] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (item) => {
    setSelectedLetter(item);
    setQuizAnswer(null);
    setShowExplanation(false);
    setIsPracticing(false);
  };

  const handlePractice = () => {
    setIsPracticing(true);
    setTimeout(() => {
      setPracticeCount(prev => prev + 1);
      setIsPracticing(false);
    }, 1200);
  };

  const speakSignDetails = (item) => {
    speechService.speak(
      `Indian Sign Language Letter ${item.letter}. Hand position: ${item.handPosition}. Example word: ${item.exampleWord}. Sign explanation: ${item.exampleSignDesc}`
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Alphabet Quick Selector Ribbon (A to Z) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>🔤</span> Select Alphabet (A to Z):
          </span>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            26 Two-Handed Authentic ISL Signs
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {islAlphabets.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`w-9 h-10 sm:w-10 sm:h-11 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center ${
                selectedLetter.id === item.id
                  ? 'bg-sky-600 text-white shadow-md scale-105 ring-2 ring-sky-300'
                  : 'bg-slate-100 hover:bg-sky-100 text-slate-800'
              }`}
              aria-label={`Select ISL sign for Letter ${item.letter}`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Motion & Video Demonstrator Player (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <IslMotionPlayer
            title={`ISL Letter ${selectedLetter.letter} Demonstration`}
            signText={`LETTER [${selectedLetter.letter}]`}
            meaning={selectedLetter.meaning}
            steps={selectedLetter.steps}
            videoUrl={selectedLetter.videoDemo}
            facialExpression="Direct front-facing eye contact with steady posture"
            handMotionType="two-handed"
          />

          {/* Repeat and Practice Counter */}
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase block">Practice Repetitions:</span>
              <span className="text-lg font-black text-sky-900">{practiceCount} Times Practiced</span>
            </div>

            <button
              onClick={handlePractice}
              disabled={isPracticing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all ${
                isPracticing ? 'bg-emerald-500 scale-95' : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isPracticing ? 'animate-spin' : ''}`} />
              <span>{isPracticing ? 'Verifying Gesture...' : 'Repeat & Practise Sign'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hand Position Breakdown & Mini-Quiz (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Card Overview */}
          <div className="bg-white rounded-3xl border-2 border-sky-300 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">
                Letter {selectedLetter.letter} Hand Position
              </h3>
              <button
                onClick={() => speakSignDetails(selectedLetter)}
                className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100"
                title="Read instructions aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {selectedLetter.handPosition}
            </div>

            {/* Word in ISL */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-bold">
              <span>Vocabulary Example: </span>
              <span className="text-slate-800">{selectedLetter.exampleWord} — {selectedLetter.exampleSignDesc}</span>
            </div>
          </div>

          {/* Interactive Sign Identification Mini-Quiz */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Quick Sign Verification
              </span>
              <span className="text-[10px] text-slate-400">Instant Check</span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-100">
              Which hand configuration matches the ISL sign for Letter {selectedLetter.letter}?
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setQuizAnswer('correct');
                  setShowExplanation(true);
                }}
                className={`w-full p-3 text-xs font-bold text-left rounded-xl border transition-all ${
                  quizAnswer === 'correct'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                A) {selectedLetter.handPosition.slice(0, 65)}...
              </button>

              <button
                onClick={() => {
                  setQuizAnswer('incorrect');
                  setShowExplanation(true);
                }}
                className={`w-full p-3 text-xs font-bold text-left rounded-xl border transition-all ${
                  quizAnswer === 'incorrect'
                    ? 'bg-rose-600 text-white border-rose-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                B) Waving open palm in a large circle overhead
              </button>
            </div>

            {showExplanation && (
              <div className={`p-3 rounded-xl text-xs font-bold ${
                quizAnswer === 'correct' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-700'
              }`}>
                {quizAnswer === 'correct' ? (
                  <span>✅ Correct! That is the authentic two-handed handshape for Letter {selectedLetter.letter}.</span>
                ) : (
                  <span>❌ Option A accurately describes the specific finger position for Letter {selectedLetter.letter}.</span>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
