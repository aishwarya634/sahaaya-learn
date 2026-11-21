import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ear, 
  MessageSquareHeart, 
  Eye, 
  User, 
  Settings, 
  Award, 
  Home, 
  HelpCircle, 
  CheckCircle2, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';

export const Navbar = ({ onOpenA11y }) => {
  const { currentUser, progress, currentPage, navigateTo, setAuthMode, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Build dynamic navigation links strictly isolated by student disability
  let navLinks = [
    { id: 'home', label: 'Home', icon: Home }
  ];

  if (currentUser) {
    navLinks.push({ id: 'dashboard', label: 'Dashboard', icon: User });

    // STRICT ISOLATION: Only display the section corresponding to the student's disability
    if (currentUser.disabilities.includes('deaf')) {
      navLinks.push({ 
        id: 'deaf', 
        label: 'ISL Learning (Deaf)', 
        icon: Ear, 
        highlight: 'bg-sky-50 text-sky-700' 
      });
    }

    if (currentUser.disabilities.includes('speech')) {
      navLinks.push({ 
        id: 'speech', 
        label: 'AAC Picture Board (Speech)', 
        icon: MessageSquareHeart, 
        highlight: 'bg-emerald-50 text-emerald-700' 
      });
    }

    if (currentUser.disabilities.includes('low_vision')) {
      navLinks.push({ 
        id: 'low_vision', 
        label: 'Audio & Tactile (Low Vision)', 
        icon: Eye, 
        highlight: 'bg-amber-50 text-amber-700' 
      });
    }

    navLinks.push(
      { id: 'practice', label: 'Practice', icon: CheckCircle2 },
      { id: 'progress', label: 'Achievements', icon: Award }
    );
  } else {
    // Guest navigation
    navLinks.push(
      { id: 'auth-login', label: 'Student Login', icon: LogIn, action: () => { setAuthMode('login'); navigateTo('auth'); } },
      { id: 'auth-reg', label: 'Register', icon: UserPlus, action: () => { setAuthMode('register'); navigateTo('auth'); } }
    );
  }

  navLinks.push({ id: 'about', label: 'About & Help', icon: HelpCircle });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left focus:ring-4 focus:ring-blue-400 rounded-lg p-1 group"
            aria-label="SAHAAYA LEARN Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
              🌟
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                SAHAAYA <span className="text-blue-600">LEARN</span>
              </span>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {currentUser 
                  ? currentUser.primaryCategory === 'deaf' 
                    ? '🤟 Deaf & ISL Stream' 
                    : currentUser.primaryCategory === 'speech' 
                      ? '🗣️ Speech & AAC Stream' 
                      : '👁️ Low Vision Stream'
                  : 'Inclusive Learning Platform'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => link.action ? link.action() : navigateTo(link.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accessibility Settings Trigger */}
            <button
              onClick={onOpenA11y}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold shadow-sm transition-all focus:ring-4 focus:ring-blue-300"
              aria-label="Open Accessibility Settings"
              title="Accessibility & High Contrast"
            >
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Accessibility</span>
            </button>

            {/* If Logged In: Student Profile & Logout */}
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white transition-all text-left"
                  title="View Student Dashboard"
                >
                  <span className="text-xl">{currentUser.avatar || '🎓'}</span>
                  <div className="hidden md:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[90px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] font-bold text-blue-600 leading-tight">
                      {progress.xp} XP • Lvl {progress.unlockedLevels[currentUser.primaryCategory] || 1}
                    </p>
                  </div>
                </button>

                <button
                  onClick={logoutUser}
                  className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out / Switch Student"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); navigateTo('auth'); }}
                  className="px-3 py-2 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-100 border border-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setAuthMode('register'); navigateTo('auth'); }}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {currentUser && (
            <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Student: {currentUser.name}</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {progress.xp} XP Earned
              </span>
            </div>
          )}
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  if (link.action) link.action();
                  else navigateTo(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
