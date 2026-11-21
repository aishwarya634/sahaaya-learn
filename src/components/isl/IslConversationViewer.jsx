import React, { useState } from 'react';
import { islConversations } from '../../data/islData';
import { IslMotionPlayer } from './IslMotionPlayer';
import { MessageSquare, Users, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslConversationViewer = () => {
  const [selectedConv, setSelectedConv] = useState(islConversations[0]);
  const [activeTurnIdx, setActiveTurnIdx] = useState(0);

  const activeTurn = selectedConv.dialogue[activeTurnIdx] || selectedConv.dialogue[0];

  const handleSpeakTurn = (turn) => {
    speechService.speak(`${turn.speaker} says in sign language: "${turn.english}". Sign sequence: ${turn.signGloss}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Everyday Conversation Mastery
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Real-Life Dialogues Across 6 Practical Situations
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Turn-by-turn sign sequences between two people with synchronized subtitles and explanations.
          </p>
        </div>

        {/* 6 Conversation Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {islConversations.map((c) => {
            const isSelected = selectedConv.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedConv(c);
                  setActiveTurnIdx(0);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200'
                }`}
              >
                <span className="text-2xl mb-1">{c.icon}</span>
                <span className="text-xs font-bold leading-tight">{c.category}</span>
                <span className={`text-[10px] mt-1 font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                  {c.dialogue.length} Turns
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Motion Demonstrator for Active Turn (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <IslMotionPlayer
            title={`${selectedConv.title} (Turn ${activeTurnIdx + 1}/${selectedConv.dialogue.length})`}
            signText={`${activeTurn.speaker}: ${activeTurn.signGloss}`}
            meaning={activeTurn.english}
            steps={activeTurn.explanation}
            videoUrl="https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0"
            facialExpression="Expressive conversational facial tone"
            handMotionType="two-handed"
          />

          {/* Turn Navigator Controls */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Turn Navigator:</span>
              <span className="text-xs font-black text-sky-400">
                {activeTurn.speaker} ({activeTurnIdx + 1} of {selectedConv.dialogue.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTurnIdx(prev => Math.max(0, prev - 1))}
                disabled={activeTurnIdx === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold disabled:opacity-40"
              >
                ← Prev Turn
              </button>
              <button
                onClick={() => setActiveTurnIdx(prev => Math.min(selectedConv.dialogue.length - 1, prev + 1))}
                disabled={activeTurnIdx === selectedConv.dialogue.length - 1}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold disabled:opacity-40"
              >
                Next Turn →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Dialogue Sequence Stream (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase">Dialogue Flow</span>
              <h4 className="text-base font-black text-slate-900">{selectedConv.title}</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              {selectedConv.participants.join(' ↔ ')}
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {selectedConv.dialogue.map((turn, tIdx) => {
              const isActive = activeTurnIdx === tIdx;
              return (
                <div
                  key={tIdx}
                  onClick={() => setActiveTurnIdx(tIdx)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                    isActive
                      ? 'bg-sky-50 border-sky-500 shadow-sm scale-[1.01]'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{turn.avatar}</span>
                      <span className="text-xs font-black uppercase text-slate-800">
                        {turn.speaker}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakTurn(turn);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-200"
                      title="Speak dialogue turn"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Sign Gloss */}
                  <div className="bg-slate-900 text-sky-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                    {turn.signGloss}
                  </div>

                  {/* Spoken English */}
                  <p className="text-xs text-slate-700 font-medium italic">
                    "{turn.english}"
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-950 font-medium leading-relaxed">
            💬 {selectedConv.summary}
          </div>
        </div>

      </div>

    </div>
  );
};
