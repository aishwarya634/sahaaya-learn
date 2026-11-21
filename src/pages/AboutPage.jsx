import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  Heart, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('general');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const faqs = [
    {
      q: 'Why was SAHAAYA LEARN created, and what problems does it address?',
      a: 'Traditional learning platforms rely heavily on oral speech, un-captioned video lectures, and visual-only diagrams without text alternatives. This excludes Deaf students, non-speaking students who use AAC, and students with low vision. SAHAAYA LEARN was created to bridge this accessibility gap, making learning independent, accessible, and dignified for every learner.'
    },
    {
      q: 'Who can use SAHAAYA LEARN?',
      a: 'SAHAAYA LEARN is engineered for three primary groups: (1) Deaf and hard-of-hearing students learning Indian Sign Language and academics with visual support, (2) Students with speech disabilities who communicate via Picture Boards and synthesized speech without verbal pressure, and (3) Students with low vision or blurred vision who need high-contrast, scalable text, and audio-described diagrams. Teachers, parents, and special educators also use it for classroom instruction.'
    },
    {
      q: 'How does the Indian Sign Language (ISL) section work?',
      a: 'The ISL section focuses on standard Indian Sign Language references (two-handed standard alphabets, numbers 0 to 20, greetings, everyday scenarios, and academic subjects). Every sign includes hand position guides, step-by-step finger movements, front-facing demonstration videos with subtitles, repeat practice counters, and immediate sign-identification quizzes.'
    },
    {
      q: 'Is verbal speech compulsory for speech disability assessments?',
      a: 'No. Speech production is never compulsory on SAHAAYA LEARN. Non-speaking students can express needs, build multi-card sentences (e.g., "I + WANT + WATER"), take quizzes, and complete all assessments purely through picture selections and text-to-speech audio.'
    },
    {
      q: 'Can students select more than one learning requirement?',
      a: 'Yes! Students often have overlapping requirements (e.g. low vision and hearing impairment). The registration and profile page allows students to select multiple requirements, customize their contrast and font size, and switch freely between categories at any time.'
    },
    {
      q: 'Does SAHAAYA LEARN work on mobile devices and without internet?',
      a: 'SAHAAYA LEARN is completely responsive across mobile phones, tablets, and desktops. All student progress, quiz scores, and settings are saved locally in the browser so students can resume learning even across sessions.'
    }
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackMsg('');
      setFeedbackName('');
      setFeedbackEmail('');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 border border-white/20">
            <span>🌟</span> Mission & Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About SAHAAYA LEARN
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
            Discover our mission, explore our accessible design standards, review frequently asked questions, and connect with our team.
          </p>
        </div>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 border-2 border-white/30 flex items-center justify-center text-6xl shadow-inner flex-shrink-0">
          🌟
        </div>
      </div>

      {/* Why SAHAAYA LEARN Was Created */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Why SAHAAYA LEARN Was Created
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed font-medium">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              The Critical Challenge in Traditional Education:
            </h3>
            <p>
              Millions of students who are Deaf, non-speaking, or living with low vision face invisible barriers every day in standard classrooms. Spoken lectures leave Deaf students stranded without sign interpretation. Children with speech disabilities are often silenced or forced into stressful speech therapies before they can communicate basic physical needs.
            </p>
            <p>
              Students with blurred or low vision encounter low-contrast textbooks, un-described diagrams, and micro-print that strains eyes and triggers cognitive fatigue.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              The SAHAAYA LEARN Solution:
            </h3>
            <p>
              SAHAAYA LEARN re-engineers the learning experience around three foundational pillars of dignity and independence:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Authentic ISL:</strong> Two-handed Indian Sign Language curriculum with video and visual finger positions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>AAC Picture Boards:</strong> Instant voice generation for non-speaking students without oral pressure.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Audio & High Contrast:</strong> Yellow-on-Black modes, scalable fonts, and descriptive diagram walkthroughs.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-sm flex items-center gap-3">
          <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
          <span>Every student deserves an equal opportunity to learn, communicate, and succeed independently.</span>
        </div>
      </div>

      {/* Frequently Asked Questions (Accordion) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left bg-slate-50 hover:bg-slate-100 font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed font-medium border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact & Student Feedback Form */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Student & Educator Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Contact & Accessibility Feedback
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Did you notice an accessibility issue, or would you like to suggest a new sign or AAC card? We want to hear from you!
          </p>
        </div>

        <form onSubmit={handleFeedbackSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fb-name" className="text-xs font-bold text-slate-800">Your Name *</label>
              <input
                id="fb-name"
                type="text"
                required
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                placeholder="e.g. Priya Nair"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="fb-email" className="text-xs font-bold text-slate-800">Email or Phone Number *</label>
              <input
                id="fb-email"
                type="text"
                required
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="e.g. student@school.org"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fb-cat" className="text-xs font-bold text-slate-800">Feedback Category</label>
            <select
              id="fb-cat"
              value={feedbackCategory}
              onChange={(e) => setFeedbackCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-semibold bg-white"
            >
              <option value="general">General Support</option>
              <option value="isl">Indian Sign Language Content Suggestion</option>
              <option value="aac">AAC Picture Card / Voice Request</option>
              <option value="low_vision">Low Vision Contrast / Font Size Enhancement</option>
              <option value="school">School / Institutional Adoption</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fb-msg" className="text-xs font-bold text-slate-800">Your Message or Suggestion *</label>
            <textarea
              id="fb-msg"
              required
              rows="4"
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              placeholder="Tell us how we can improve your learning experience..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>

            {feedbackSent && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-300">
                ✅ Thank you! Your feedback has been received by our accessibility board.
              </span>
            )}
          </div>
        </form>

        {/* Contact Details Footnote */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>support@sahaayalearn.org</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Toll Free: 1800-SAHAAYA (TDD/TTY)</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>National Inclusive Learning Initiative, India</span>
          </div>
        </div>

      </div>

    </div>
  );
};
