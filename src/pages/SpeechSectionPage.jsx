import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PictureBoard } from '../components/aac/PictureBoard';
import { speechAcademicSubjects } from '../data/aacData';
import { 
  MessageSquareHeart, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Layers,
  BookOpen
} from 'lucide-react';

export const SpeechSectionPage = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('aac-board'); // 'aac-board' | 'academics'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 border border-white/30">
            <span>🗣️</span> Non-Speaking & AAC Communication Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Speech Disability & Picture Board
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl font-medium leading-relaxed">
            Communicate clearly and independently using intuitive picture cards, sentence assembly ribbons, and synthesized text-to-speech. Zero compulsory verbal speech required.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-6xl shadow-inner flex-shrink-0">
          🗣️
        </div>
      </div>

      {/* Main Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('aac-board')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all border-2 ${
            activeTab === 'aac-board'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <span>💬</span>
          <span>Module A & B: Interactive Picture Board & Scenarios</span>
        </button>

        <button
          onClick={() => setActiveTab('academics')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all border-2 ${
            activeTab === 'academics'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <span>🎓</span>
          <span>Module C: Non-Verbal Academic Subjects</span>
        </button>
      </div>

      {/* Tab 1: AAC Picture Board & Everyday Communication */}
      {activeTab === 'aac-board' && (
        <div className="space-y-6">
          <PictureBoard />
        </div>
      )}

      {/* Tab 2: Module C - Non-Verbal Academic Subjects */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-900">
              Module C: Basic Educational Subjects Without Speech Demands
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              English vocabulary, sentence construction, mathematics, and environmental studies designed for interactive tapping, symbol sorting, and drag-and-drop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speechAcademicSubjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                      Non-Verbal Curriculum
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Accessible Assessment
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-slate-900">{sub.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 block">Interactive Non-Verbal Activities:</span>
                    <ul className="space-y-1.5">
                      {sub.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('lesson', { lessonId: 'aac-basics', lessonTitle: sub.title, category: 'speech' })}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Launch Subject Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
