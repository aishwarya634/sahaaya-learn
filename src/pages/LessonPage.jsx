import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData } from '../data/lessonsData';
import { speechService } from '../utils/speech';
import { 
  Play, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  Award, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Video,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonPage = () => {
  const { currentLessonId, navigateTo, completeLesson, progress, currentUser } = useApp();

  // Find appropriate lesson matching student stream
  const streamLessons = currentUser 
    ? lessonsData.filter(l => currentUser.disabilities.includes(l.category))
    : lessonsData;

  const foundLesson = lessonsData.find(l => l.id === currentLessonId);
  const lesson = (foundLesson && (!currentUser || currentUser.disabilities.includes(foundLesson.category)))
    ? foundLesson
    : (streamLessons[0] || lessonsData[0]);

  const isAlreadyCompleted = (progress.completedLessons || []).includes(lesson.id);

  // States
  const [activeStep, setActiveStep] = useState(1);
  const [selectedActivityOption, setSelectedActivityOption] = useState(null);
  const [activitySubmitted, setActivitySubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isCompletedNow, setIsCompletedNow] = useState(isAlreadyCompleted);

  const handleSpeak = (text) => {
    speechService.speak(text);
  };

  const handleActivitySubmit = (opt) => {
    setSelectedActivityOption(opt);
    setActivitySubmitted(true);
    if (opt === lesson.interactiveActivity.correctAnswer) {
      speechService.speak(`Correct! ${lesson.interactiveActivity.feedback}`);
    } else {
      speechService.speak('Not quite. Review the explanation and try once more.');
    }
  };

  const handleSelectQuizAnswer = (qIdx, optIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    lesson.quiz.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    // If passed (more than 50%), mark complete
    if (score >= Math.ceil(lesson.quiz.questions.length / 2)) {
      completeLesson(lesson.id, lesson.xp);
      setIsCompletedNow(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Top Breadcrumb & Return Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase border border-blue-200">
          {lesson.levelName}
        </span>
      </div>

      {/* 1. Lesson Header & Introduction */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              {lesson.category === 'deaf' ? '🤟 Indian Sign Language (ISL)' : lesson.category === 'speech' ? '🗣️ Speech & AAC Picture Board' : '👁️ Low Vision & Tactile'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeak(`${lesson.title}. ${lesson.introduction}`)}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
              title="Read lesson introduction aloud"
              aria-label="Read lesson introduction aloud"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            {isCompletedNow && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            )}
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
          {lesson.introduction}
        </p>
      </div>

      {/* 2. Learning Objectives */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-3xl border border-blue-200 p-6 sm:p-7 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase text-blue-900 tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Learning Objectives</span>
          </h3>
          <button
            onClick={() => handleSpeak(`Learning Objectives: ${lesson.objectives.join('. ')}`)}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {lesson.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Detailed Explanation of the Topic */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xl font-black text-slate-900">
            3. Explanation & Concepts
          </h3>
          <button
            onClick={() => handleSpeak(lesson.explanation)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            title="Read explanation aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-base text-slate-800 leading-relaxed whitespace-pre-line font-medium space-y-3">
          {lesson.explanation}
        </div>
      </div>

      {/* 4 & 5. Educational Video Demonstration & Visual Media with Subtitles */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-black text-white">
              {lesson.videoTitle || 'Educational Demonstration Video'}
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-slate-800 px-3 py-1 rounded-full">
            Front-Facing & Subtitled
          </span>
        </div>

        {/* Video Player Container */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-slate-700 shadow-inner relative">
          <iframe
            src={lesson.videoUrl}
            title={lesson.videoTitle}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Real-time Subtitles / Visual Instructions Box */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider block">
            Accompanying Subtitles & Visual Guide:
          </span>
          <div className="space-y-1">
            {lesson.videoSubtitles.map((sub, sIdx) => (
              <div key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-slate-500 font-mono">[{sub.time}]</span>
                <span>{sub.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Interactive Learning Activity */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" /> 6. Interactive Practice Activity
          </span>
          <button
            onClick={() => handleSpeak(lesson.interactiveActivity.prompt)}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Read Prompt</span>
          </button>
        </div>

        <p className="text-base sm:text-lg font-bold text-slate-900">
          {lesson.interactiveActivity.prompt}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {lesson.interactiveActivity.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleActivitySubmit(opt)}
              className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${
                selectedActivityOption === opt
                  ? opt === lesson.interactiveActivity.correctAnswer
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                    : 'bg-rose-600 text-white border-rose-700'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <span>{String.fromCharCode(65 + i)}) </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {activitySubmitted && (
          <div className={`p-4 rounded-2xl text-sm font-bold ${
            selectedActivityOption === lesson.interactiveActivity.correctAnswer
              ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
              : 'bg-rose-100 text-rose-950 border border-rose-300'
          }`}>
            {selectedActivityOption === lesson.interactiveActivity.correctAnswer ? (
              <span>✅ {lesson.interactiveActivity.feedback}</span>
            ) : (
              <span>❌ Not quite right. Please re-read the options and try again.</span>
            )}
          </div>
        )}
      </div>

      {/* 7 & 8. Practice Questions & Short Quiz */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
              Evaluation
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              8. Short End-of-Lesson Quiz
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {lesson.quiz.questions.length} Questions
          </span>
        </div>

        <div className="space-y-6">
          {lesson.quiz.questions.map((q, qIdx) => (
            <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Question {qIdx + 1}:
                </span>
                <button
                  onClick={() => handleSpeak(`Question ${qIdx + 1}: ${q.question}. Options: ${q.options.join(', ')}`)}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 border"
                  title="Read question aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-base font-bold text-slate-900">{q.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                      quizAnswers[qIdx] === optIdx
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{String.fromCharCode(65 + optIdx)}) </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {quizSubmitted && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  quizAnswers[qIdx] === q.correctIndex
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-rose-100 text-rose-900'
                }`}>
                  {quizAnswers[qIdx] === q.correctIndex ? (
                    <span>✅ Correct! {q.explanation}</span>
                  ) : (
                    <span>❌ {q.explanation}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Quiz CTA */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={handleQuizSubmit}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all active:scale-95"
          >
            Submit Quiz & Complete Lesson
          </button>

          {quizSubmitted && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">
                Score: {quizScore} / {lesson.quiz.questions.length}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                +{lesson.xp} XP Awarded!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 9. Lesson Completion Status & Next Steps */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 ${
        isCompletedNow ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
            isCompletedNow ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {isCompletedNow ? '🏆' : '📖'}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">
              {isCompletedNow ? 'Lesson Completed Successfully!' : 'Lesson In Progress'}
            </h4>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {isCompletedNow
                ? 'Your progress has been permanently saved. You can replay the video, practice activities, or proceed to the next module anytime.'
                : 'Complete the interactive activity and short quiz to earn your badge.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setQuizAnswers({});
              setQuizSubmitted(false);
              setActivitySubmitted(false);
              setSelectedActivityOption(null);
            }}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repeat Activity</span>
          </button>

          <button
            onClick={() => navigateTo('practice')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md flex items-center gap-1.5"
          >
            <span>Practice Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
