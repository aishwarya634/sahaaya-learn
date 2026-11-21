import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ear, 
  MessageSquareHeart, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  Video, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Zap,
  Users
} from 'lucide-react';

export const HomePage = ({ onOpenA11y }) => {
  const { navigateTo, currentUser, setAuthMode } = useApp();

  const categories = [
    {
      id: 'deaf',
      name: 'Deaf & Hard of Hearing',
      tagline: 'Visual Learning with Authentic Indian Sign Language (ISL)',
      icon: '🤟',
      color: 'border-sky-500 bg-sky-50/50 hover:bg-sky-50 text-sky-950',
      badge: 'Two-Handed ISL Standard',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'Students and teacher actively communicating using Indian Sign Language in an accessible classroom',
      methods: [
        'A–Z Two-handed ISL Alphabet illustrations & video demonstrations',
        '0–20 ISL Numerical counting with touch-point recognition',
        'Everyday dialogues (School, Hospital, Canteen) with bilingual subtitles',
        'Visual academic lessons in English, Mathematics, and EVS'
      ],
      cta: 'Explore ISL Modules'
    },
    {
      id: 'speech',
      name: 'Speech Disabilities (Non-Speaking)',
      tagline: 'Empowering Voice with Picture AAC & Instant Text-to-Speech',
      icon: '🗣️',
      color: 'border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950',
      badge: 'Fitzgerald Key Color-Coded',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'A student communicating enthusiastically using picture communication cards and assistive technology tablet',
      methods: [
        '8-category Picture Communication Board (Food, Health, Needs, Emergency)',
        'Sentence Builder Ribbon (e.g. "I + WANT + WATER + PLEASE")',
        'Natural synthesized voice playback using Web Speech API',
        'Zero forced speech: complete non-verbal assessments & activities'
      ],
      cta: 'Open Picture Board'
    },
    {
      id: 'low_vision',
      name: 'Low Vision & Blurred Vision',
      tagline: 'High-Contrast Diagrams, Audio Guidance & Magnification',
      icon: '👁️',
      color: 'border-amber-500 bg-amber-50/50 hover:bg-amber-50 text-amber-950',
      badge: 'WCAG 2.1 AAA Compliant',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'A student with low vision using high contrast audio-assisted reading materials on an accessible screen',
      methods: [
        'Large, adjustable typography up to 225% and Yellow-on-Black contrast',
        'Full audio read-aloud button for every lesson and diagram section',
        'Descriptive audio walkthroughs of tactile geometry, plants, and solar system',
        'Orientation & mobility life skills with tactile trailing methods'
      ],
      cta: 'Access Tactile Lessons'
    }
  ];

  const featuredModules = [
    {
      title: 'ISL Alphabet & Finger Spelling (A–Z)',
      category: 'Deaf & Hard of Hearing',
      icon: '🔤',
      level: 'Level 1: Beginner',
      desc: 'Master the 26 two-handed ISL alphabets with step-by-step movement guides and front-facing video demos.',
      target: 'isl-alpha'
    },
    {
      title: 'AAC Picture Board: Food, Water & Needs',
      category: 'Speech Disabilities',
      icon: '🍲',
      level: 'Level 1: Beginner',
      desc: 'Express immediate daily needs with 1-tap synthesized audio and picture card combinations.',
      target: 'aac-basics'
    },
    {
      title: 'Tactile Geometric Shapes & Properties',
      category: 'Low Vision',
      icon: '📐',
      level: 'Level 1: Beginner',
      desc: 'Explore circles, triangles, and squares through thick yellow tactile borders and detailed audio explanations.',
      target: 'lv-math-shapes'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold border border-blue-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Empowering Inclusive Education for Every Student</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Education Tailored to <span className="text-blue-600 underline decoration-amber-400 decoration-wavy decoration-2">Every Ability</span>.
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                SAHAAYA LEARN is an educational platform built specifically for Deaf and hard-of-hearing students, non-speaking students with speech disabilities, and students with low vision.
              </p>

              {/* Core Philosophy Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-bold text-sm sm:text-base flex items-start gap-3 text-left">
                <span className="text-2xl flex-shrink-0">🌟</span>
                <span>
                  "Every student deserves an opportunity to learn, express thoughts, and achieve independence without barriers."
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => navigateTo(currentUser ? 'dashboard' : 'auth')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-base sm:text-lg font-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 focus:ring-4 focus:ring-blue-300"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onOpenA11y}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 text-base font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Customize Accessibility</span>
                </button>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-left">
                <div>
                  <span className="block text-2xl font-black text-blue-600">ISL</span>
                  <span className="text-xs font-semibold text-slate-600">Indian Sign Language</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-emerald-600">AAC</span>
                  <span className="text-xs font-semibold text-slate-600">Picture-to-Speech</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-amber-600">Audio+</span>
                  <span className="text-xs font-semibold text-slate-600">High Contrast Modes</span>
                </div>
              </div>

            </div>

            {/* Right Educational Illustration Graphic (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Image with Accessible Frame */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                    alt="Students communicating actively with teacher in inclusive accessible classroom"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      Inclusive Classroom Environment
                    </span>
                    <p className="text-sm font-semibold text-slate-200 mt-1">
                      Students learning through visual demonstrations, sign language, and tactile tools.
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-3 flex items-center gap-3">
                  <span className="text-2xl">🤟</span>
                  <div>
                    <span className="block text-xs font-black text-slate-900">ISL Standards</span>
                    <span className="block text-[10px] text-slate-500">Authentic Signs</span>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-3 flex items-center gap-3">
                  <span className="text-2xl">🔊</span>
                  <div>
                    <span className="block text-xs font-black text-slate-900">Web Speech API</span>
                    <span className="block text-[10px] text-slate-500">Read Aloud Available</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Clearly Visible Learning Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Three Dedicated Learning Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Built for Your Specific Learning Needs
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose your learning stream. Each category provides tailored visual, auditory, and symbolic methods for independent mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-3xl border-2 p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all ${cat.color}`}
            >
              <div className="space-y-4">
                
                {/* Image */}
                <div className="rounded-2xl overflow-hidden h-44 border-2 border-white/80 shadow-sm relative">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-slate-900 flex items-center gap-1.5 shadow-sm">
                    <span>{cat.icon}</span>
                    <span>{cat.badge}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    {cat.tagline}
                  </p>
                </div>

                {/* Methods List */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Learning Methods Provided:
                  </span>
                  <ul className="space-y-2">
                    {cat.methods.map((method, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => navigateTo(cat.id)}
                className="mt-6 w-full py-3.5 px-4 rounded-xl font-black text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>{cat.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How Students Use SAHAAYA LEARN Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Student Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              How Students Learn on SAHAAYA LEARN
            </h2>
            <p className="text-slate-300 text-base">
              A gentle 4-step pathway designed for students to study concepts, repeat activities, and earn verifiable certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-black text-white">Create Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Select your age, preferred language, and learning requirements without any rigid categorization.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-black text-white">Interactive Lessons</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Watch front-facing sign videos, assemble picture sentences, or listen to audio-described diagrams.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-black text-white">Practice & Quizzes</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Test understanding with sign identification, picture matching, and audio quizzes with instant explanations.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white font-black text-xl flex items-center justify-center">
                4
              </div>
              <h3 className="text-lg font-black text-white">Earn Certificates</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Track XP, unlock Level 1, 2, and 3, and print verified personalized certificates of achievement.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Learning Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Curriculum Highlights
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              Featured Learning Modules
            </h2>
          </div>
          <button
            onClick={() => navigateTo('practice')}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
          >
            <span>View All Practice Modules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredModules.map((mod, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{mod.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {mod.level}
                  </span>
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block">
                  {mod.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {mod.desc}
                </p>
              </div>

              <button
                onClick={() => navigateTo('lesson', { lessonId: mod.target })}
                className="mt-6 w-full py-2.5 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Start Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Accessibility Features Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mx-4 sm:mx-6 lg:mx-8 space-y-8 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Built-In Accessibility Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Accessibility Built In, Never An Afterthought
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every feature on SAHAAYA LEARN follows universal design principles. Students never need special plugins or expensive software to learn comfortably.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
            <Volume2 className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-black text-white">Synthesized Text-to-Speech</h4>
            <p className="text-xs text-slate-300 leading-snug">
              Web Speech API provides immediate read-aloud for cards, lessons, and quiz questions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
            <Eye className="w-6 h-6 text-amber-400" />
            <h4 className="text-sm font-black text-white">Yellow-on-Black High Contrast</h4>
            <p className="text-xs text-slate-300 leading-snug">
              Instant contrast modes specifically optimized for low vision and macular degeneration.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
            <Video className="w-6 h-6 text-sky-400" />
            <h4 className="text-sm font-black text-white">Front-Facing ISL Videos</h4>
            <p className="text-xs text-slate-300 leading-snug">
              Clear hand-position demonstrations with speed control, looping, and subtitles.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h4 className="text-sm font-black text-white">WCAG 2.1 AAA Compliant</h4>
            <p className="text-xs text-slate-300 leading-snug">
              Keyboard navigable, focus rings, accessible semantic markup, and descriptive ARIA tags.
            </p>
          </div>

        </div>

        <div className="pt-4 flex items-center justify-between border-t border-white/10">
          <span className="text-xs font-semibold text-slate-300">
            Open the Accessibility Settings anytime using the blue button at the top.
          </span>
          <button
            onClick={onOpenA11y}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all"
          >
            Open Settings
          </button>
        </div>
      </section>

    </div>
  );
};
