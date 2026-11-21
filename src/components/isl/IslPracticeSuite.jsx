import React, { useState } from 'react';
import { islPracticeSuite } from '../../data/islData';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../utils/speech';
import { 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IslPracticeSuite = () => {
  const { recordQuizScore } = useApp();
  const [activeTab, setActiveTab] = useState('sign-to-word'); // 'sign-to-word', 'word-to-sign', 'matching'
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleSelectAnswer = (qId, optionIdx, qObj) => {
    const isCorrect = optionIdx === qObj.correctIndex;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setFeedback(prev => ({
      ...prev,
      [qId]: { isCorrect, explanation: qObj.explanation }
    }));

    if (isCorrect) {
      speechService.speak(`Correct! ${qObj.explanation}`);
      try {
        confetti({ particleCount: 35, spread: 50 });
      } catch (e) {}
    } else {
      speechService.speak(`Not quite. ${qObj.explanation}`);
    }

    recordQuizScore(`isl-${activeTab}`, isCorrect ? 1 : 0, 1);
  };

  const handleReset = () => {
    setAnswers({});
    setFeedback({});
  };

  const speakPrompt = (text) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-8">
      
      {/* Practice Header & Mode Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-700">🎯</span>
              <span>ISL Practice & Interactive Evaluations</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Matching exercises, sign-to-word identification, word-to-sign comprehension, and quizzes.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Evaluation</span>
          </button>
        </div>

        {/* 3 Practice Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'sign-to-word', label: '1. Sign-to-Word Questions', icon: '🤟' },
            { id: 'word-to-sign', label: '2. Word-to-Sign Questions', icon: '📝' },
            { id: 'matching', label: '3. Matching Exercises', icon: '🔄' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                handleReset();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black border-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode 1: Sign to Word */}
      {activeTab === 'sign-to-word' && (
        <div className="space-y-6">
          {islPracticeSuite.signToWord.map((q, idx) => {
            const qFb = feedback[q.id];
            return (
              <div key={q.id} className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-sky-700 bg-sky-50 px-3 py-1 rounded-full">
                    Sign-to-Word Question {idx + 1}
                  </span>
                  <button
                    onClick={() => speakPrompt(`${q.prompt}. Options: ${q.options.join(', ')}`)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Read question aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-base font-black text-slate-900 leading-snug">
                  {q.prompt}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx, q)}
                        className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all ${
                          isSelected
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                              : 'bg-rose-600 text-white border-rose-700'
                            : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className="font-mono">{String.fromCharCode(65 + optIdx)}) </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {qFb && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-start gap-2.5 ${
                    qFb.isCorrect ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-950 border border-rose-300'
                  }`}>
                    <span className="text-lg">{qFb.isCorrect ? '✅' : '❌'}</span>
                    <div>
                      <span className="block font-black uppercase">{qFb.isCorrect ? 'Correct!' : 'Incorrect'}</span>
                      <p>{qFb.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Word to Sign */}
      {activeTab === 'word-to-sign' && (
        <div className="space-y-6">
          {islPracticeSuite.wordToSign.map((q, idx) => {
            const qFb = feedback[q.id];
            return (
              <div key={q.id} className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Word-to-Sign Question {idx + 1}
                  </span>
                  <button
                    onClick={() => speakPrompt(`${q.wordPrompt}. Options: ${q.options.join(', ')}`)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Read question aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-base font-black text-slate-900 leading-snug">
                  {q.wordPrompt}
                </p>

                <div className="space-y-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx, q)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all ${
                          isSelected
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                              : 'bg-rose-600 text-white border-rose-700'
                            : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className="font-mono">{String.fromCharCode(65 + optIdx)}) </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {qFb && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-start gap-2.5 ${
                    qFb.isCorrect ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-950 border border-rose-300'
                  }`}>
                    <span className="text-lg">{qFb.isCorrect ? '✅' : '❌'}</span>
                    <div>
                      <span className="block font-black uppercase">{qFb.isCorrect ? 'Correct!' : 'Incorrect'}</span>
                      <p>{qFb.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 3: Matching Exercises */}
      {activeTab === 'matching' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-lg font-black text-slate-900">
              Match Everyday Situation to Correct ISL Sign Action
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Reinforce rapid sign associations for daily interactions.
            </p>
          </div>

          <div className="space-y-3">
            {islPracticeSuite.matchingExercises.map((pair) => (
              <div
                key={pair.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 flex-shrink-0"></span>
                  <span className="text-sm font-bold text-slate-900">{pair.expression}</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-sky-700 text-white font-bold text-xs shadow-sm sm:max-w-xs text-left">
                  👉 {pair.signAction}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs font-semibold text-emerald-950">
            💡 <strong>ISL Principle:</strong> Consistent daily matching builds visual muscle memory and natural fluency.
          </div>
        </div>
      )}

    </div>
  );
};
