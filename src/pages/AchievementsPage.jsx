import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { certificatesList, badgesList } from '../data/achievementsData';
import { lessonsData } from '../data/lessonsData';
import { CertificateModal } from '../components/common/CertificateModal';
import { 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Printer, 
  Sparkles, 
  Star, 
  TrendingUp, 
  BookOpen,
  Ear,
  MessageSquareHeart,
  Eye
} from 'lucide-react';

export const AchievementsPage = () => {
  const { currentUser, progress, navigateTo } = useApp();
  const [selectedCertId, setSelectedCertId] = useState(null);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-5xl">🏆</div>
        <h2 className="text-2xl font-black text-slate-900">Sign In to View Achievements</h2>
        <p className="text-sm text-slate-600">Please log in to track your earned XP and printable certificates.</p>
        <button
          onClick={() => navigateTo('auth')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  // Filter lessons strictly to student stream
  const streamLessons = lessonsData.filter(l => currentUser.disabilities.includes(l.category));
  const completedInStream = streamLessons.filter(l => (progress.completedLessons || []).includes(l.id)).length;
  const totalStreamLessons = streamLessons.length;
  const streamPercentage = totalStreamLessons > 0 ? Math.round((completedInStream / totalStreamLessons) * 100) : 0;

  // Filter badges matching student stream or 'all'
  const streamBadges = badgesList.filter(b => b.category === 'all' || currentUser.disabilities.includes(b.category));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-purple-100 border border-white/30">
            <span>🏆</span> Real Milestone Progress
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Achievements & Certificates
          </h1>
          <p className="text-sm sm:text-base text-purple-100 max-w-2xl font-medium leading-relaxed">
            Every step you take on SAHAAYA LEARN is genuine. Track your progress, inspect your real quiz evaluations, and generate verified certificates of achievement.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-6xl shadow-inner flex-shrink-0">
          🏆
        </div>
      </div>

      {/* Real Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Real Experience</span>
          <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
            <span>⚡</span>
            <span>{progress.xp} XP</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Earned by passing lessons & quizzes</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Stream Lessons Completed</span>
          <div className="text-3xl font-black text-blue-600 flex items-center gap-2">
            <BookOpen className="w-7 h-7" />
            <span>{completedInStream} / {totalStreamLessons}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">{streamPercentage}% completed</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Quizzes Evaluated</span>
          <div className="text-3xl font-black text-emerald-600 flex items-center gap-2">
            <CheckCircle2 className="w-7 h-7" />
            <span>{Object.keys(progress.quizScores || {}).length}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Accessible evaluations</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Unlocked Progression</span>
          <div className="text-3xl font-black text-purple-600 flex items-center gap-2">
            <Award className="w-7 h-7" />
            <span>Level {progress.unlockedLevels[currentUser.primaryCategory] || 1}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Progressive independence</p>
        </div>

      </div>

      {/* Stream Progression Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
          Your Stream Progression
        </h3>

        <div className="space-y-5">
          {currentUser.disabilities.includes('deaf') && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="flex items-center gap-2 text-sky-800">
                  <Ear className="w-4 h-4 text-sky-600" />
                  <span>Indian Sign Language Stream (Deaf & Hard-of-Hearing)</span>
                </span>
                <span className="text-slate-700">{completedInStream} of {totalStreamLessons} Finished</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-sky-500 h-3 rounded-full transition-all" style={{ width: `${streamPercentage}%` }}></div>
              </div>
            </div>
          )}

          {currentUser.disabilities.includes('speech') && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="flex items-center gap-2 text-emerald-800">
                  <MessageSquareHeart className="w-4 h-4 text-emerald-600" />
                  <span>Speech Disability Stream (Picture AAC & Sentence Builder)</span>
                </span>
                <span className="text-slate-700">{completedInStream} of {totalStreamLessons} Finished</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${streamPercentage}%` }}></div>
              </div>
            </div>
          )}

          {currentUser.disabilities.includes('low_vision') && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="flex items-center gap-2 text-amber-800">
                  <Eye className="w-4 h-4 text-amber-600" />
                  <span>Low Vision Stream (Audio Guidance & Tactile Diagrams)</span>
                </span>
                <span className="text-slate-700">{completedInStream} of {totalStreamLessons} Finished</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: `${streamPercentage}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Verifiable Certificates */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Printable Documents
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-0.5">
            Level Certificates of Achievement
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Certificates unlock automatically when you genuinely complete the required number of lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificatesList.map((cert) => {
            const isUnlocked = (progress.certificates || []).includes(cert.id) || completedInStream >= cert.level * 2;
            return (
              <div
                key={cert.id}
                className={`bg-white rounded-3xl border-2 p-6 sm:p-7 flex flex-col justify-between shadow-md transition-all ${
                  isUnlocked ? 'border-amber-400' : 'border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{cert.badgeIcon}</span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      Level {cert.level}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {cert.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-semibold">
                    <span className="font-bold text-slate-800">Requirement: </span>
                    {cert.criteria}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  {isUnlocked ? (
                    <button
                      onClick={() => setSelectedCertId(cert.id)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Printer className="w-4 h-4" />
                      <span>View & Print Certificate</span>
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs font-bold text-slate-400">
                      🔒 Complete {cert.level * 2} lessons to unlock
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
          Curriculum Milestone Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {streamBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 flex flex-col items-center text-center space-y-2 transition-all"
            >
              <span className="text-4xl">{badge.icon}</span>
              <h4 className="text-sm font-black text-slate-900">{badge.title}</h4>
              <p className="text-[11px] text-slate-600 leading-snug">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedCertId && (
        <CertificateModal
          certificateId={selectedCertId}
          onClose={() => setSelectedCertId(null)}
        />
      )}

    </div>
  );
};
