import React, { useState } from 'react';
import { aacCategories, aacCards, quickPhrases, speechCommunicationScenarios } from '../../data/aacData';
import { speechService } from '../../utils/speech';
import { 
  Volume2, 
  Trash2, 
  Delete, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

export const PictureBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sentenceCards, setSentenceCards] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeScenario, setActiveScenario] = useState(speechCommunicationScenarios[0]);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  // Filter cards by category
  const filteredCards = selectedCategory === 'all'
    ? aacCards
    : aacCards.filter(c => c.category === selectedCategory);

  // Add card to sentence ribbon
  const handleCardClick = (card) => {
    setSentenceCards(prev => [...prev, card]);
    // Instant voice feedback for single card
    speechService.speak(card.spoken || card.text);
  };

  // Remove single card by index
  const handleRemoveCard = (index) => {
    setSentenceCards(prev => prev.filter((_, i) => i !== index));
  };

  // Backspace last card
  const handleBackspace = () => {
    setSentenceCards(prev => prev.slice(0, -1));
  };

  // Clear entire ribbon
  const handleClear = () => {
    setSentenceCards([]);
  };

  // Speak full assembled sentence
  const handleSpeakSentence = () => {
    if (sentenceCards.length === 0) {
      speechService.speak('Please select cards to form a sentence.');
      return;
    }
    const fullText = sentenceCards.map(c => c.spoken || c.text).join(' ');
    setIsSpeaking(true);
    speechService.speak(fullText, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  // Quick phrase speak
  const handleQuickPhrase = (phrase) => {
    speechService.speak(phrase.spoken || phrase.text);
  };

  // Copy sentence to clipboard
  const handleCopy = () => {
    if (sentenceCards.length === 0) return;
    const text = sentenceCards.map(c => c.text).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Sentence Builder Ribbon (Top Sticky Ribbon) */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-xl p-4 sm:p-6 sticky top-24 z-30 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
              💬
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Sentence Builder Ribbon
              </h3>
              <p className="text-xs text-slate-500">
                Click picture cards below to assemble your message. Then press Speak!
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakSentence}
              disabled={sentenceCards.length === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white shadow-md transition-all ${
                sentenceCards.length > 0 
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 ring-4 ring-emerald-200' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
              aria-label="Speak assembled sentence using text to speech"
            >
              <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>{isSpeaking ? 'Speaking...' : 'Speak Sentence'}</span>
            </button>

            <button
              onClick={handleBackspace}
              disabled={sentenceCards.length === 0}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 disabled:opacity-40"
              title="Delete last card"
              aria-label="Delete last card"
            >
              <Delete className="w-5 h-5" />
            </button>

            <button
              onClick={handleClear}
              disabled={sentenceCards.length === 0}
              className="p-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 disabled:opacity-40"
              title="Clear entire ribbon"
              aria-label="Clear entire ribbon"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sentence Cards Horizontal Track */}
        <div className="min-h-[80px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-3 flex flex-wrap items-center gap-2.5 overflow-x-auto">
          {sentenceCards.length === 0 ? (
            <p className="text-sm font-semibold text-slate-400 italic mx-auto py-2">
              (Tap cards below like "I", "WANT", "WATER", "HELP ME" to construct a sentence...)
            </p>
          ) : (
            sentenceCards.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                onClick={() => handleRemoveCard(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 shadow-sm cursor-pointer hover:opacity-80 transition-all ${card.color}`}
                title="Click to remove from sentence"
              >
                <span className="text-2xl">{card.icon}</span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight">{card.text}</span>
                <span className="text-xs opacity-50 ml-1">×</span>
              </div>
            ))
          )}
        </div>

        {/* Readout Text Preview */}
        {sentenceCards.length > 0 && (
          <div className="flex items-center justify-between text-xs text-slate-600 bg-emerald-50/60 px-3 py-2 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-950">
              Spoken Sentence: "{sentenceCards.map(c => c.spoken || c.text).join(' ')}"
            </span>
            <button
              onClick={handleCopy}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

      </div>

      {/* 2. Quick Essential Phrases for Instant Everyday Needs */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-3xl border border-amber-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" /> Quick Everyday Phrases:
          </span>
          <span className="text-[11px] text-amber-700 font-semibold">1-Tap Voice Playback</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPhrases.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => handleQuickPhrase(phrase)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/70 border border-amber-300 text-slate-900 text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              <span className="text-base">{phrase.icon}</span>
              <span>{phrase.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category Filter Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap border-2 transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          🌟 All Categories
        </button>

        {aacCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap border-2 transition-all ${
              selectedCategory === cat.id
                ? `${cat.color} ring-2 ring-emerald-400 shadow-sm scale-105`
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 4. AAC Picture Cards Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Available Picture Communication Cards ({filteredCards.length}):
          </h4>
          <span className="text-xs font-semibold text-slate-500">
            Fitzgerald Key Color Coded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`p-4 rounded-2xl border-2 text-center transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow flex flex-col items-center justify-between h-32 sm:h-36 ${card.color}`}
              aria-label={`Select card ${card.text}`}
            >
              <span className="text-4xl sm:text-5xl my-auto select-none filter drop-shadow-sm">
                {card.icon}
              </span>
              <span className="text-xs sm:text-sm font-black tracking-tight leading-tight uppercase mt-2">
                {card.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Module B: Everyday Communication Scenarios & Visual Practice */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Module B: Practical Interactive Communication Scenarios
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Expressing Everyday Needs Without Speaking
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            Practice forming sentences in realistic scenarios like illness, thirst, or asking for academic clarification.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {speechCommunicationScenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => {
                setActiveScenario(scen);
                setScenarioFeedback(null);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeScenario.id === scen.id
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-md'
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span className="text-xs font-bold text-amber-400 uppercase block mb-1">Scenario</span>
              <span className="text-sm font-bold text-white block leading-snug">{scen.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Scenario Board */}
        <div className="bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-700 space-y-4">
          <p className="text-sm sm:text-base font-medium text-slate-200">
            {activeScenario.prompt}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase w-full">Target Expression:</span>
            {activeScenario.targetSentence.map((word, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-200 font-bold text-sm">
                {word}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                speechService.speak(activeScenario.targetSentence.join(' '));
                setScenarioFeedback('success');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black shadow-md transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Simulate Target AAC Speech</span>
            </button>

            {scenarioFeedback && (
              <span className="text-xs font-bold text-emerald-300">
                ✅ Sentence verified! {activeScenario.explanation}
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
