import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IslAlphabetViewer } from '../components/isl/IslAlphabetViewer';
import { IslNumberViewer } from '../components/isl/IslNumberViewer';
import { IslVocabularyViewer } from '../components/isl/IslVocabularyViewer';
import { IslSentencesViewer } from '../components/isl/IslSentencesViewer';
import { IslConversationViewer } from '../components/isl/IslConversationViewer';
import { IslPracticeSuite } from '../components/isl/IslPracticeSuite';
import { islAcademicLessons } from '../data/islData';
import { 
  Ear, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Video,
  Hash,
  BookOpen,
  Target,
  GraduationCap
} from 'lucide-react';

export const DeafSectionPage = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('alphabet'); 
  // 'alphabet' | 'numbers' | 'vocabulary' | 'sentences' | 'conversations' | 'practice' | 'academics'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Section Header */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-sky-100 border border-white/30">
            <span>🤟</span> Complete Practical Indian Sign Language (ISL) Curriculum
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Indian Sign Language Hub
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-2xl font-medium leading-relaxed">
            Master authentic ISL through short animated video demonstrations, daily-use vocabulary, complete sentences, multi-turn conversation practice, and interactive assessments.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-6xl shadow-inner flex-shrink-0">
          🤟
        </div>
      </div>

      {/* Main Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'alphabet', label: '1. Alphabet (A–Z)', icon: '🔤' },
          { id: 'numbers', label: '2. Numbers (1–100)', icon: '🔢' },
          { id: 'vocabulary', label: '3. Daily Vocabulary (9 Categories)', icon: '📖' },
          { id: 'sentences', label: '4. Daily Sentences (Priority)', icon: '💬', badge: 'Priority' },
          { id: 'conversations', label: '5. Conversation Practice (6 Categories)', icon: '🤝' },
          { id: 'practice', label: '6. Practice & Quizzes', icon: '🎯' },
          { id: 'academics', label: '7. Academic Subjects', icon: '🎓' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all border-2 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase ${
                activeTab === tab.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-amber-100 text-amber-800'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Module A1 - Alphabet Viewer (A to Z) */}
      {activeTab === 'alphabet' && (
        <IslAlphabetViewer />
      )}

      {/* Tab 2: Module A2 - Numbers Viewer (1 to 100) */}
      {activeTab === 'numbers' && (
        <IslNumberViewer />
      )}

      {/* Tab 3: Module A3 - Daily Vocabulary (9 Categories) */}
      {activeTab === 'vocabulary' && (
        <IslVocabularyViewer />
      )}

      {/* Tab 4: Priority Feature - Daily Use Sentences */}
      {activeTab === 'sentences' && (
        <IslSentencesViewer />
      )}

      {/* Tab 5: Module B - Conversation Practice (6 Situations) */}
      {activeTab === 'conversations' && (
        <IslConversationViewer />
      )}

      {/* Tab 6: Practice & Evaluations Suite */}
      {activeTab === 'practice' && (
        <IslPracticeSuite />
      )}

      {/* Tab 7: Module C - Basic Educational Subjects in ISL */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-900">
              Academic Subjects with Subtitles & Visual Explanations
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Visual lessons in English, Mathematics, Environmental Studies (EVS), General Knowledge, and Life Skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {islAcademicLessons.map((subj) => (
              <div
                key={subj.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase">
                      {subj.subject}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Visual Subtitles
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-slate-900">{subj.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {subj.description}
                  </p>

                  <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200">
                    <span className="text-[11px] font-bold text-sky-900 uppercase block mb-1">
                      Visual ISL Summary:
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      {subj.visualSummary}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-bold text-slate-600 block">Topics Covered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {subj.topics.map((t, ti) => (
                        <span key={ti} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('lesson', { lessonId: 'isl-alpha', lessonTitle: subj.title, category: 'deaf' })}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Launch Visual Subject Lesson</span>
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
