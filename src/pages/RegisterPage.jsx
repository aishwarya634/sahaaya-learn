import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Check, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const RegisterPage = () => {
  const { profile, updateProfile, navigateTo } = useApp();

  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age || 12);
  const [preferredLanguage, setPreferredLanguage] = useState(profile.preferredLanguage || 'English');
  const [disabilities, setDisabilities] = useState(profile.disabilities || ['deaf']);
  const [primaryCategory, setPrimaryCategory] = useState(profile.primaryCategory || 'deaf');
  const [avatar, setAvatar] = useState(profile.avatar || '🌟');
  const [isSaved, setIsSaved] = useState(false);

  const avatars = ['🌟', '🎓', '🚀', '🎨', '🦁', '🦉', '🌈', '💡'];
  const languages = ['English', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Bengali (বাংলা)', 'Marathi (मराठी)'];

  const disabilityOptions = [
    {
      id: 'deaf',
      label: 'Deaf or Hard of Hearing',
      desc: 'Prefers Indian Sign Language (ISL), subtitles, and visual demonstrations.',
      icon: '🤟'
    },
    {
      id: 'speech',
      label: 'Speech Disability (Non-Speaking)',
      desc: 'Prefers Picture Communication Board (AAC), symbol ribbons, and text-to-speech audio without forced verbal speech.',
      icon: '🗣️'
    },
    {
      id: 'low_vision',
      label: 'Low Vision or Blurred Vision',
      desc: 'Prefers large adjustable typography, Yellow-on-Black contrast, screen reader mode, and descriptive audio walkthroughs.',
      icon: '👁️'
    }
  ];

  const handleToggleDisability = (id) => {
    setDisabilities(prev => {
      if (prev.includes(id)) {
        // Keep at least one selected
        if (prev.length === 1) return prev;
        const filtered = prev.filter(item => item !== id);
        // If removed was primary, switch primary
        if (primaryCategory === id && filtered.length > 0) {
          setPrimaryCategory(filtered[0]);
        }
        return filtered;
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile({
      name: name.trim(),
      age: Number(age),
      preferredLanguage,
      disabilities,
      primaryCategory,
      avatar,
      registered: true
    });

    setIsSaved(true);
    setTimeout(() => {
      navigateTo('dashboard');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Student Profile & Accessibility Setup
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Welcome to SAHAAYA LEARN
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Tell us about yourself so we can personalize your learning dashboard. You can update these preferences anytime.
        </p>
      </div>

      {/* Registration Form Card */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 space-y-8"
      >
        
        {/* Avatar Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-900 block">
            Choose Your Profile Avatar:
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

        {/* Basic Info: Name & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="student-name" className="text-sm font-bold text-slate-900 block">
              Student Full Name *
            </label>
            <input
              id="student-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold text-slate-900 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="student-age" className="text-sm font-bold text-slate-900 block">
              Student Age (Years) *
            </label>
            <input
              id="student-age"
              type="number"
              min="4"
              max="25"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold text-slate-900 transition-all"
            />
          </div>
        </div>

        {/* Preferred Language */}
        <div className="space-y-2">
          <label htmlFor="student-lang" className="text-sm font-bold text-slate-900 block">
            Preferred Language
          </label>
          <select
            id="student-lang"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-base font-semibold text-slate-900 bg-white transition-all"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Learning Requirements (Multi-Select Allowed!) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 block">
              Learning Requirement or Disability (Select one or more):
            </label>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Multi-Select Allowed
            </span>
          </div>

          <div className="space-y-3">
            {disabilityOptions.map((opt) => {
              const isChecked = disabilities.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => handleToggleDisability(opt.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-3xl flex-shrink-0">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-slate-900">{opt.label}</span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${
                        isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Learning Stream */}
        <div className="space-y-2 pt-2">
          <label className="text-sm font-bold text-slate-900 block">
            Primary Learning Stream (Your default dashboard focus):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {disabilities.map((dId) => {
              const opt = disabilityOptions.find(o => o.id === dId);
              if (!opt) return null;
              return (
                <button
                  key={dId}
                  type="button"
                  onClick={() => setPrimaryCategory(dId)}
                  className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                    primaryCategory === dId
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>{opt.icon} {opt.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Respectful Inclusivity Note */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 font-medium">
            SAHAAYA LEARN does not make assumptions about your potential based on disability categories. You have full access to all sections and can change these settings at any time.
          </p>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-blue-300"
        >
          <span>{isSaved ? 'Saving Profile...' : 'Save Profile & Go to Dashboard'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </form>

    </div>
  );
};
