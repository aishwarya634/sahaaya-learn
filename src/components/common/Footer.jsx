import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck, Globe, HelpCircle, PhoneCall } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, currentUser } = useApp();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌟</span>
              <span className="text-2xl font-black tracking-tight">
                SAHAAYA <span className="text-amber-400">LEARN</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Dedicated inclusive educational platform designed specifically for Deaf students, non-speaking students with speech disabilities, and students with low or blurred vision.
            </p>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                "Every student deserves an opportunity to learn, communicate, and thrive independently without barriers."
              </p>
            </div>
          </div>

          {/* Quick Learning Categories Strictly Scoped */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              {currentUser ? 'Your Active Curriculum' : 'Curriculum Streams'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {(!currentUser || currentUser.disabilities.includes('deaf')) && (
                <li>
                  <button 
                    onClick={() => navigateTo('deaf')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>🤟</span> Deaf & Hard of Hearing (ISL)
                  </button>
                </li>
              )}

              {(!currentUser || currentUser.disabilities.includes('speech')) && (
                <li>
                  <button 
                    onClick={() => navigateTo('speech')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>🗣️</span> Speech & AAC Communication
                  </button>
                </li>
              )}

              {(!currentUser || currentUser.disabilities.includes('low_vision')) && (
                <li>
                  <button 
                    onClick={() => navigateTo('low_vision')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>👁️</span> Low Vision & Tactile Learning
                  </button>
                </li>
              )}

              {currentUser && (
                <>
                  <li>
                    <button 
                      onClick={() => navigateTo('practice')}
                      className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                    >
                      <span>🎯</span> Practice & Interactive Quizzes
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigateTo('progress')}
                      className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                    >
                      <span>🏆</span> Achievements & Certificates
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Accessibility & Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              Accessibility & Trust
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WCAG 2.1 AAA Compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Indian Sign Language (ISL) Verified</span>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Student Feedback & Support</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 SAHAAYA LEARN. Inclusive Education Platform. Built for all abilities.</p>
          <p className="flex items-center gap-2">
            <span>Powered by Web Speech API & Indian Sign Language Standards</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
