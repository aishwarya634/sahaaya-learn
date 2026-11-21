import React, { useState } from 'react';
import { islScenarios } from '../../data/islData';
import { MessageSquare, Play, Volume2, User, Sparkles } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslScenariosViewer = () => {
  const [selectedScenario, setSelectedScenario] = useState(islScenarios[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleSpeakScenarioLine = (step) => {
    speechService.speak(`${step.speaker} says in sign language: ${step.english}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <span className="p-2 rounded-xl bg-sky-100 text-sky-700">🤝</span>
          <span>Module B: Everyday Real-Life Conversations in ISL</span>
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Two-person dialogues demonstrating authentic communication at school, hospital, canteen, and with friends.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {islScenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => {
              setSelectedScenario(scen);
              setActiveStepIndex(0);
            }}
            className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
              selectedScenario.id === scen.id
                ? 'bg-sky-50 border-sky-600 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
              <span className="text-xs font-bold text-slate-500 uppercase">Dialogue</span>
            </div>
            <span className="text-sm font-bold text-slate-900 leading-snug">
              {scen.title}
            </span>
            <div className="text-[11px] font-semibold text-sky-700 mt-2">
              {scen.participants.join(' ↔ ')}
            </div>
          </button>
        ))}
      </div>

      {/* Active Dialogue Simulation Display */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Interactive Dialogue Demonstration
            </span>
            <h4 className="text-xl font-black text-white mt-0.5">
              {selectedScenario.title}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full">
              {selectedScenario.steps.length} Conversation Turns
            </span>
          </div>
        </div>

        {/* Conversation Steps Stream */}
        <div className="space-y-4">
          {selectedScenario.steps.map((step, idx) => {
            const isStudent = step.speaker.includes('You') || step.speaker.includes('Student');
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isStudent
                    ? 'bg-sky-950/70 border-sky-700/60 ml-0 mr-4 sm:mr-12'
                    : 'bg-slate-800/80 border-slate-700 ml-4 sm:ml-12 mr-0'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isStudent ? 'bg-sky-600 text-white' : 'bg-amber-500 text-slate-950'
                    }`}>
                      {isStudent ? '👤' : '🧑‍🏫'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {step.speaker}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSpeakScenarioLine(step)}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                    title="Read dialogue line aloud"
                    aria-label={`Read ${step.speaker}'s line aloud`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sign Gloss Notation */}
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 mb-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide block mb-0.5">
                    ISL Sign Sequence:
                  </span>
                  <p className="text-sm sm:text-base font-black text-sky-300 tracking-wide">
                    {step.signText}
                  </p>
                </div>

                {/* Spoken English Translation */}
                <p className="text-xs sm:text-sm font-medium text-slate-300 italic">
                  "{step.english}"
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
