import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AccessibilityBar } from './components/common/AccessibilityBar';

// 10 Pages & Auth
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeafSectionPage } from './pages/DeafSectionPage';
import { SpeechSectionPage } from './pages/SpeechSectionPage';
import { LowVisionSectionPage } from './pages/LowVisionSectionPage';
import { LessonPage } from './pages/LessonPage';
import { PracticePage } from './pages/PracticePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { AboutPage } from './pages/AboutPage';

import { Eye, ShieldAlert } from 'lucide-react';

const StreamAccessDenied = ({ targetCategory, studentCategory, onGoToStudentHub }) => (
  <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
    <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center text-4xl shadow-inner">
      <ShieldAlert className="w-10 h-10" />
    </div>
    <div className="space-y-2">
      <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
        Strict Stream Separation
      </span>
      <h2 className="text-3xl font-black text-slate-900">
        Curriculum Dedicated to Another Disability
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
        This section is specifically tailored for {targetCategory}. Your profile is registered under the <strong>{studentCategory}</strong> stream to provide you with an optimal, focused learning experience.
      </p>
    </div>
    <button
      onClick={onGoToStudentHub}
      className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl transition-all"
    >
      Return to My Learning Hub
    </button>
  </div>
);

const MainLayout = () => {
  const { currentPage, currentUser, navigateTo } = useApp();
  const [a11yOpen, setA11yOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onOpenA11y={() => setA11yOpen(true)} />;

      case 'auth':
      case 'register':
        return <AuthPage />;

      case 'dashboard':
        return <DashboardPage onOpenA11y={() => setA11yOpen(true)} />;

      case 'deaf':
        if (currentUser && !currentUser.disabilities.includes('deaf')) {
          return (
            <StreamAccessDenied
              targetCategory="Deaf & Hard-of-Hearing Students (ISL)"
              studentCategory={currentUser.primaryCategory === 'speech' ? 'Speech Disability (AAC)' : 'Low Vision & Audio'}
              onGoToStudentHub={() => navigateTo(currentUser.primaryCategory)}
            />
          );
        }
        return <DeafSectionPage />;

      case 'speech':
        if (currentUser && !currentUser.disabilities.includes('speech')) {
          return (
            <StreamAccessDenied
              targetCategory="Speech Disabilities (AAC Picture Board)"
              studentCategory={currentUser.primaryCategory === 'deaf' ? 'Deaf & ISL' : 'Low Vision & Audio'}
              onGoToStudentHub={() => navigateTo(currentUser.primaryCategory)}
            />
          );
        }
        return <SpeechSectionPage />;

      case 'low_vision':
        if (currentUser && !currentUser.disabilities.includes('low_vision')) {
          return (
            <StreamAccessDenied
              targetCategory="Low Vision & Tactile Learning"
              studentCategory={currentUser.primaryCategory === 'deaf' ? 'Deaf & ISL' : 'Speech Disability (AAC)'}
              onGoToStudentHub={() => navigateTo(currentUser.primaryCategory)}
            />
          );
        }
        return <LowVisionSectionPage onOpenA11y={() => setA11yOpen(true)} />;

      case 'lesson':
        return <LessonPage />;

      case 'practice':
        return <PracticePage />;

      case 'progress':
        return <AchievementsPage />;

      case 'about':
        return <AboutPage />;

      default:
        return <HomePage onOpenA11y={() => setA11yOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-200 selection:text-blue-900">
      
      {/* Top Navbar */}
      <Navbar onOpenA11y={() => setA11yOpen(true)} />

      {/* Main Page Dynamic View */}
      <main className="flex-1 transition-all duration-150">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Accessibility & Read Aloud Settings Modal/Drawer */}
      <AccessibilityBar
        isOpen={a11yOpen}
        onClose={() => setA11yOpen(false)}
      />

      {/* Floating Accessibility Quick Trigger (Bottom Right) */}
      <aside aria-label="Accessibility quick toggle" className="fixed bottom-6 right-6 z-30 no-print">
        <button
          onClick={() => setA11yOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-2xl hover:shadow-blue-500/50 transition-all border-2 border-white ring-4 ring-blue-300"
          title="Open Accessibility Controls (Text size, contrast, voice)"
          aria-label="Open Accessibility Controls"
        >
          <Eye className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Accessibility Controls</span>
        </button>
      </aside>

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
