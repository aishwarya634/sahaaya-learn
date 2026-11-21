import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { practiceModules } from '../data/practiceQuizzes';
import { speechService } from '../utils/speech';
import { 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Check, 
  X,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticePage = () => {
  const { currentUser, recordQuizScore, navigateTo } = useApp();

  // Filter modules STRICTLY to the student's disability
  const streamModules = currentUser
    ? practiceModules.filter(m => currentUser.disabilities.includes(m.category))
    : practiceModules;

  const [activeModule, setActiveModule] = useState(streamModules[0] || practiceModules[0]);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedbackState, setFeedbackState] = useState({}); // { [qId]: { isCorrect, explanation } }
  const [matchedPairs, setMatchedPairs] = useState({});
  const [sentenceTokens, setSentenceTokens] = useState({});

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-5xl">🎯</div>
        <h2 className="text-2xl font-black text-slate-900">Sign In to Practice</h2>
        <p className="text-sm text-slate-600">Please log in to take evaluations tailored specifically to your learning stream.</p>
        <button
          onClick={() => navigateTo('auth')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleSelectAnswer = (qId, optionIdx, qObj) => {
    const isCorrect = optionIdx === qObj.correctIndex;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setFeedbackState(prev => ({
      ...prev,
      [qId]: { isCorrect, explanation: qObj.explanation }
    }));

    if (isCorrect) {
      speechService.speak(`Correct! ${qObj.explanation}`);
      try {
        confetti({ particleCount: 30, spread: 40 });
      } catch (e) {}
    } else {
      speechService.speak(`Not quite. ${qObj.explanation}`);
    }

    recordQuizScore(activeModule.id, isCorrect ? 1 : 0, 1);
  };

  const handleResetModule = () => {
    setUserAnswers({});
    setFeedbackState({});
    setMatchedPairs({});
    setSentenceTokens({});
  };

  const handleReadQuestion = (text) => {
    speechService.speak(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-blue-100 border border-white/30">
            <span>🎯</span> {currentUser.primaryCategory === 'deaf' ? 'ISL Assessment Arena' : currentUser.primaryCategory === 'speech' ? 'AAC Practice Arena' : 'Tactile & Audio Assessment'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Stream Practice & Assessment
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl font-medium leading-relaxed">
            Practice activities customized exclusively for your curriculum. Immediate simple-language explanations with zero penalties.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-6xl shadow-inner flex-shrink-0">
          🎯
        </div>
      </div>

      {/* Stream Specific Practice Modules */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {streamModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => {
              setActiveModule(mod);
              handleResetModule();
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all border-2 ${
              activeModule.id === mod.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span>
              {mod.category === 'deaf' ? '🤟' : mod.category === 'speech' ? '🗣️' : '👁️'}
            </span>
            <span>{mod.title}</span>
          </button>
        ))}
      </div>

      {/* Module Workspace */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-sm space-y-8">
        
        {/* Module Header & Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              {activeModule.type.replace(/-/g, ' ')}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-0.5">
              {activeModule.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {activeModule.description}
            </p>
          </div>

          <button
            onClick={handleResetModule}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Answers</span>
          </button>
        </div>

        {/* 1. Multiple Choice / Sign ID / Number Recognition / Audio Questions */}
        {activeModule.questions && (
          <div className="space-y-6">
            {activeModule.questions.map((q, idx) => {
              const qFeedback = feedbackState[q.id];
              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-7 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                      Activity Item {idx + 1}
                    </span>
                    <button
                      onClick={() => handleReadQuestion(`${q.audioText || q.prompt}. Options are: ${q.options ? q.options.join(', ') : ''}`)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-800 border transition-colors shadow-sm"
                      title="Read item aloud"
                      aria-label="Read item aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Visual Hint Box */}
                  {q.visualHint && (
                    <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl text-xs sm:text-sm font-black text-sky-900 flex items-center gap-2">
                      <span className="text-xl">🔍</span>
                      <span>Visual Demonstration: {q.visualHint}</span>
                    </div>
                  )}

                  {/* Question Prompt */}
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {q.prompt || q.scenario}
                  </p>

                  {/* Options (if multiple choice) */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAnswers[q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx, q)}
                            className={`p-4 rounded-2xl border-2 font-bold text-left text-sm transition-all ${
                              isChosen
                                ? optIdx === q.correctIndex
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                                  : 'bg-rose-600 text-white border-rose-700'
                                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                            }`}
                          >
                            <span className="font-mono">{String.fromCharCode(65 + optIdx)}) </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Picture-based Sentence Construction tokens */}
                  {q.cardsAvailable && (
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase w-full">Available Cards:</span>
                        {q.cardsAvailable.map((token, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => {
                              const currentTokens = sentenceTokens[q.id] || [];
                              setSentenceTokens(prev => ({ ...prev, [q.id]: [...currentTokens, token] }));
                              speechService.speak(token);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                          >
                            + {token}
                          </button>
                        ))}
                      </div>

                      {/* Built sentence ribbon */}
                      <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-emerald-300 min-h-[50px] flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-400">Constructed:</span>
                        {(sentenceTokens[q.id] || []).map((tok, ti) => (
                          <span key={ti} className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
                            {tok}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const assembled = sentenceTokens[q.id] || [];
                            const isCorrect = q.correctTokens.every(t => assembled.includes(t));
                            setFeedbackState(prev => ({
                              ...prev,
                              [q.id]: { isCorrect, explanation: q.explanation }
                            }));
                            if (isCorrect) {
                              speechService.speak(`Correct! ${q.explanation}`);
                            } else {
                              speechService.speak('Not quite. Review the target sentence and try again.');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                        >
                          Check Built Sentence
                        </button>
                        <button
                          onClick={() => setSentenceTokens(prev => ({ ...prev, [q.id]: [] }))}
                          className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Immediate Feedback Box with Simple Language Explanation */}
                  {qFeedback && (
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-3 transition-all ${
                        qFeedback.isCorrect
                          ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-400'
                          : 'bg-rose-100 text-rose-950 border-2 border-rose-400'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">
                        {qFeedback.isCorrect ? '✅' : '❌'}
                      </span>
                      <div>
                        <span className="block font-black uppercase tracking-wide">
                          {qFeedback.isCorrect ? 'Correct Answer!' : 'Not Quite Right'}
                        </span>
                        <p className="mt-0.5 leading-relaxed font-semibold">
                          {qFeedback.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Match the Following Pairs (if applicable) */}
        {activeModule.pairs && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-amber-950">
              Match each everyday situation on the left with the correct communication card on the right:
            </div>

            <div className="space-y-3">
              {activeModule.pairs.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span className="text-sm font-bold text-slate-900">{p.situation}</span>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-sm">
                    {p.answerCard}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-950">
              💡 {activeModule.explanation}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
