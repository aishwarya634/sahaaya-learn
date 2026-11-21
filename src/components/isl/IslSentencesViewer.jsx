import React, { useState } from 'react';
import { islDailySentences } from '../../data/islData';
import { IslMotionPlayer } from './IslMotionPlayer';
import { Volume2, Sparkles, MessageSquare, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslSentencesViewer = () => {
  const [selectedSentence, setSelectedSentence] = useState(islDailySentences[0]);
  const [practiceActive, setPracticeActive] = useState(false);

  const handleSpeak = (sent) => {
    speechService.speak(`Sentence in English: ${sent.english}. Indian sign language sequence: ${sent.signGloss}. Explanation: ${sent.explanation}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Priority Feature Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <span>⭐</span> Priority Feature: Full Daily-Use Sentences
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            Everyday Expressive Sentences in Indian Sign Language
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl font-medium leading-relaxed">
            Move beyond individual words to fluent sentence construction. Learn essential daily communication: asking names, expressing hunger, requesting water, seeking help, and asking directions.
          </p>
        </div>

        <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
          💬
        </div>
      </div>

      {/* Sentence Quick Selector Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
            Select Sentence to Demonstrate ({islDailySentences.length}):
          </span>
          <span className="text-[11px] text-sky-700 font-bold bg-sky-50 px-2.5 py-0.5 rounded-full">
            Full Demonstrations Included
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {islDailySentences.map((item) => {
            const isSelected = selectedSentence.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSentence(item)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-sky-50/70 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                    {item.category}
                  </span>
                  <span className={`text-xs ${isSelected ? 'text-white' : 'text-sky-600'}`}>▶</span>
                </div>
                <h4 className="text-xs sm:text-sm font-black leading-snug">
                  "{item.english}"
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Sentence Demonstration Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Motion Player for Sentence (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <IslMotionPlayer
            title={`ISL Sentence: "${selectedSentence.english}"`}
            signText={selectedSentence.signGloss}
            meaning={selectedSentence.english}
            steps={selectedSentence.steps}
            videoUrl={selectedSentence.videoUrl}
            facialExpression="Facial tone (eyebrow raise for questions, smile for greetings)"
            handMotionType="two-handed"
          />

          {/* ISL Grammar Rule Card */}
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" /> ISL Grammar & Structure Rule:
              </span>
              <button
                onClick={() => handleSpeak(selectedSentence)}
                className="p-1 rounded-lg bg-sky-200 hover:bg-sky-300 text-sky-800"
                title="Speak sentence instructions"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {selectedSentence.explanation}
            </p>
          </div>
        </div>

        {/* Right: Step-by-Step Signing Guide & Practice (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-sky-300 p-6 sm:p-7 shadow-sm space-y-5">
          
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-sky-700 uppercase">
              {selectedSentence.category} • Level {selectedSentence.level}
            </span>
            <h4 className="text-xl font-black text-slate-900 mt-1">
              "{selectedSentence.english}"
            </h4>
          </div>

          {/* Sign Sequence Gloss Ribbon */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              ISL Sign-Gloss Sequence:
            </span>
            <p className="text-sm sm:text-base font-black text-sky-300 tracking-wide font-mono">
              {selectedSentence.signGloss}
            </p>
          </div>

          {/* Sequential Step Execution */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Execution Breakdown:
            </span>
            {selectedSentence.steps.map((st, sIdx) => (
              <div key={sIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium leading-relaxed">
                {st}
              </div>
            ))}
          </div>

          {/* Practice Self-Check */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">Practiced this sentence?</span>
              <span className="text-[11px] text-emerald-700">Test signing in front of a mirror</span>
            </div>
            <button
              onClick={() => setPracticeActive(!practiceActive)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm"
            >
              {practiceActive ? '✓ Completed' : 'Mark Practiced'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
