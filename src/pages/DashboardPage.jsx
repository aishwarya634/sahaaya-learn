import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData } from '../data/lessonsData';
import { certificatesList } from '../data/achievementsData';
import { CertificateModal } from '../components/common/CertificateModal';
import { 
  User, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  Clock, 
  ArrowRight, 
  Settings, 
  BookOpen, 
  Ear, 
  MessageSquareHeart, 
  Eye,
  AlertCircle
} from 'lucide-react';

export const DashboardPage = ({ onOpenA11y }) => {
  const { currentUser, progress, navigateTo, accessNotice, setAccessNotice } = useApp();
  const [selectedCertId, setSelectedCertId] = useState(null);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-5xl">🔒</div>
        <h2 className="text-2xl font-black text-slate-900">Sign In Required</h2>
        <p className="text-sm text-slate-600">Please register or log in to view your personalized disability dashboard.</p>
        <button
          onClick={() => navigateTo('auth')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
        >
          Go to Sign In / Register
        </button>
      </div>
    );
  }

  // Filter lessons STRICTLY to the student's registered disabilities
  const studentLessons = lessonsData.filter(l => 
    currentUser.disabilities.includes(l.category)
  );

  // Default continue lesson: if currentLessonId exists in their lessons, use it; else use first lesson of their category
  const continueLesson = studentLessons.find(l => l.id === progress.currentLessonId) || studentLessons[0] || lessonsData[0];

  // Uncompleted lessons in their registered stream
  const uncompleted = studentLessons.filter(l => !progress.completedLessons.includes(l.id));
  const recommendedLessons = uncompleted.length > 0 ? uncompleted.slice(0, 3) : studentLessons.slice(0, 3);

  // Real stats (no fake data)
  const totalStreamLessons = studentLessons.length;
  const completedInStream = studentLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const streamPercentage = totalStreamLessons > 0 ? Math.round((completedInStream / totalStreamLessons) * 100) : 0;

  const quizScoreKeys = Object.keys(progress.quizScores || {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Notice banner if redirected from another disability page */}
      {accessNotice && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center justify-between text-xs sm:text-sm font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>{accessNotice}</span>
          </div>
          <button
            onClick={() => setAccessNotice(null)}
            className="text-amber-800 hover:text-amber-950 font-black text-xs underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Student Profile Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-5xl sm:text-6xl shadow-inner flex-shrink-0">
            {currentUser.avatar || '🌟'}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {currentUser.primaryCategory === 'deaf' ? '🤟 Indian Sign Language Stream' : currentUser.primaryCategory === 'speech' ? '🗣️ Speech & AAC Stream' : '👁️ Low Vision & Audio Stream'}
              </span>
              <span className="text-xs font-bold text-blue-200">
                Age {currentUser.age} • {currentUser.preferredLanguage}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              Namaste, {currentUser.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-medium">
              Your customized learning dashboard. You have earned <strong className="text-amber-300 font-bold">{progress.xp} XP</strong> through genuine lesson completion.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo('auth')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={onOpenA11y}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Accessibility</span>
          </button>
        </div>
      </div>

      {/* 2. Continue Learning Banner */}
      {continueLesson && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                Active Lesson (Ready to Learn)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {continueLesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-2xl">
              {continueLesson.introduction.slice(0, 140)}...
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-1 text-xs font-bold text-slate-600">
              <span>{continueLesson.levelName}</span>
              <span>•</span>
              <span>Est. Duration: {continueLesson.duration}</span>
              <span>•</span>
              <span className="text-amber-700">+{continueLesson.xp} XP</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('lesson', { lessonId: continueLesson.id, lessonTitle: continueLesson.title, category: continueLesson.category })}
            className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 flex-shrink-0 active:scale-95"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Launch Lesson</span>
          </button>
        </div>
      )}

      {/* 3. Progress Summary (Strictly for Student's Disability, Zero Fake Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Stream Completion</span>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {streamPercentage}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${streamPercentage}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">{completedInStream} of {totalStreamLessons} lessons finished</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Real Experience</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500">
            {progress.xp} XP
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">Earned from lessons & quizzes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Unlocked Progression</span>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-600">
            Level {progress.unlockedLevels[currentUser.primaryCategory] || 1}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">Complete 2 lessons to reach Level 2</p>
        </div>

      </div>

      {/* 4. Stream Lessons (Only shows lessons for this disability) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Your Stream Curriculum
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              Available Modules in Your Stream
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentLessons.map((lesson) => {
            const isDone = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                      {lesson.levelName}
                    </span>
                    {isDone ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500">+{lesson.xp} XP</span>
                    )}
                  </div>

                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {lesson.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {lesson.introduction.slice(0, 110)}...
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('lesson', { lessonId: lesson.id, lessonTitle: lesson.title, category: lesson.category })}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{isDone ? 'Review Lesson' : 'Start Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Real Quiz Results & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Lessons */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Recently Visited Lessons</span>
            </h3>
          </div>

          <div className="space-y-3">
            {(progress.recentLessons || []).length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">
                No recent lessons yet. Launch any module above to begin!
              </p>
            ) : (
              (progress.recentLessons || []).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigateTo('lesson', { lessonId: item.id, lessonTitle: item.title, category: item.category })}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-blue-300 bg-slate-50/70 hover:bg-blue-50/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{item.date}</span>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real Quiz Scores */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Verified Evaluation History</span>
            </h3>
            <button
              onClick={() => navigateTo('practice')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Practice Arena
            </button>
          </div>

          <div className="space-y-3">
            {quizScoreKeys.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">
                No quizzes taken yet. Complete any lesson quiz to record your verified score!
              </p>
            ) : (
              quizScoreKeys.map((qId) => {
                const q = progress.quizScores[qId];
                return (
                  <div key={qId} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800 capitalize">
                        {qId.replace(/-/g, ' ')}
                      </p>
                      <span className="text-[10px] text-slate-500">Completed on {q.date}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-black ${q.percentage >= 80 ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {q.score}/{q.total} ({q.percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* 6. Real Certificates Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-9 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            Verifiable Achievements
          </span>
          <h3 className="text-2xl font-black text-white mt-0.5">
            Your Certificates of Achievement
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Certificates unlock automatically as you finish real curriculum lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certificatesList.map((cert) => {
            const isUnlocked = (progress.certificates || []).includes(cert.id) || completedInStream >= cert.level * 2;
            return (
              <div
                key={cert.id}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-800 border-amber-500/80 shadow-lg'
                    : 'bg-slate-800/40 border-slate-700 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-4xl">{cert.badgeIcon}</div>
                  <h4 className="text-sm font-black text-white leading-tight">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700">
                  {isUnlocked ? (
                    <button
                      onClick={() => setSelectedCertId(cert.id)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View & Print Certificate</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 block text-center">
                      🔒 Complete {cert.level * 2} lessons to unlock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
