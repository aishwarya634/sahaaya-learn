import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  LogIn, 
  UserPlus, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  Ear,
  MessageSquareHeart,
  Eye,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export const AuthPage = () => {
  const { authMode, setAuthMode, registerUser, loginUser, accounts } = useApp();

  // Registration state
  const [name, setName] = useState('');
  const [age, setAge] = useState(12);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [disabilities, setDisabilities] = useState(['deaf']);
  const [primaryCategory, setPrimaryCategory] = useState('deaf');
  const [avatar, setAvatar] = useState('🌟');
  const [pin, setPin] = useState('');

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState(null);

  const avatars = ['🌟', '🎓', '🚀', '🎨', '🦁', '🦉', '🌈', '💡'];
  const languages = ['English', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Bengali (বাংলা)', 'Marathi (मराठी)'];

  const disabilityOptions = [
    {
      id: 'deaf',
      label: 'Deaf or Hard of Hearing',
      stream: 'Indian Sign Language (ISL) Stream',
      desc: 'Exclusive access to ISL Alphabets A-Z, 0-20 Numbers, real-life dialogue simulations, and subtitled academic lessons.',
      icon: '🤟',
      color: 'border-sky-500 bg-sky-50 text-sky-950'
    },
    {
      id: 'speech',
      label: 'Speech Disability (Non-Speaking)',
      stream: 'Picture AAC & Text-to-Speech Stream',
      desc: 'Exclusive access to the 57-card Picture Communication Board, Sentence Builder ribbon, and instant speech synthesis.',
      icon: '🗣️',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950'
    },
    {
      id: 'low_vision',
      label: 'Low Vision or Blurred Vision',
      stream: 'Tactile Diagrams & Audio Stream',
      desc: 'Exclusive access to Yellow-on-Black contrast, large scalable typography, audio walkthroughs, and audio-supported lessons.',
      icon: '👁️',
      color: 'border-amber-500 bg-amber-50 text-amber-950'
    }
  ];

  const handleToggleDisability = (id) => {
    setDisabilities(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        const filtered = prev.filter(i => i !== id);
        if (primaryCategory === id && filtered.length > 0) {
          setPrimaryCategory(filtered[0]);
        }
        return filtered;
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    registerUser({
      name: name.trim(),
      age: Number(age),
      preferredLanguage,
      disabilities,
      primaryCategory,
      avatar,
      pin: pin.trim()
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your student name.');
      return;
    }

    const res = loginUser(loginIdentifier.trim(), loginPin.trim());
    if (!res.success) {
      setLoginError(res.error);
    }
  };

  const handleQuickLoginAccount = (account) => {
    setLoginError(null);
    loginUser(account.id, account.pin || '');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Student Authentication & Stream Selection
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {authMode === 'login' ? 'Student Sign In' : 'New Student Registration'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          {authMode === 'login'
            ? 'Access your individual personalized learning hub and resume your progress.'
            : 'Register to access an educational platform strictly customized for your specific disability.'}
        </p>
      </div>

      {/* Auth Mode Toggle Pill */}
      <div className="flex justify-center">
        <div className="bg-slate-200 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setLoginError(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Student Login</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('register'); setLoginError(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
              authMode === 'register'
                ? 'bg-white text-slate-900 shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>New Registration</span>
          </button>
        </div>
      </div>

      {/* 1. LOGIN VIEW */}
      {authMode === 'login' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
          
          {/* Quick Select Saved Accounts on this Device */}
          {accounts.length > 0 && (
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <label className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Saved Student Profiles on This Device:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickLoginAccount(acc)}
                    className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{acc.avatar || '🌟'}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                          {acc.name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {acc.primaryCategory === 'deaf' ? '🤟 Deaf / ISL' : acc.primaryCategory === 'speech' ? '🗣️ Speech AAC' : '👁️ Low Vision'}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {loginError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="login-name" className="text-sm font-bold text-slate-900 block">
                Student Name *
              </label>
              <input
                id="login-name"
                type="text"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="Enter your registered name (e.g. Aarav Sharma)"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="login-pin" className="text-sm font-bold text-slate-900 block flex items-center justify-between">
                <span>PIN / Passcode (Optional)</span>
                <span className="text-xs text-slate-400">Leave blank if no PIN was set</span>
              </label>
              <input
                id="login-pin"
                type="password"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                placeholder="Optional 4-digit PIN"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In to Learning Hub</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              First time on SAHAAYA LEARN?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="font-bold text-blue-600 hover:underline"
              >
                Register as a New Student
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 2. REGISTRATION VIEW */}
      {authMode === 'register' && (
        <form 
          onSubmit={handleRegisterSubmit}
          className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 space-y-8"
        >
          {/* Avatar */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 block">
              Choose Profile Avatar:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {avatars.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                    avatar === emoji
                      ? 'bg-blue-600 text-white shadow-md scale-110 ring-4 ring-blue-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="reg-name" className="text-sm font-bold text-slate-900 block">
                Student Full Name *
              </label>
              <input
                id="reg-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Diya Sen"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-age" className="text-sm font-bold text-slate-900 block">
                Student Age *
              </label>
              <input
                id="reg-age"
                type="number"
                min="4"
                max="25"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold"
              />
            </div>
          </div>

          {/* Language & PIN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="reg-lang" className="text-sm font-bold text-slate-900 block">
                Preferred Language
              </label>
              <select
                id="reg-lang"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold bg-white"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-pin" className="text-sm font-bold text-slate-900 block">
                Security PIN (Optional)
              </label>
              <input
                id="reg-pin"
                type="password"
                maxLength="6"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="4-digit PIN (optional)"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold"
              />
            </div>
          </div>

          {/* Disability Stream Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 block">
                Select Your Disability Stream:
              </label>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Strict Separation
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Only the learning materials and pages tailored for your selected stream will be visible and active for you.
            </p>

            <div className="space-y-3">
              {disabilityOptions.map((opt) => {
                const isSelected = disabilities.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleDisability(opt.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-4xl flex-shrink-0">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-black text-slate-900 block">{opt.label}</span>
                          <span className="text-xs font-bold text-blue-700">{opt.stream}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Clean Data Note */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 font-medium leading-relaxed">
              <strong>Clean Account Guarantee:</strong> Your profile starts with real zero progress. You earn real XP and genuine verifiable certificates by completing lessons and evaluations.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Registration & Enter Hub</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}

    </div>
  );
};
