import React, { useState } from 'react';
import { islVocabularyCategories, islVocabularyList } from '../../data/islData';
import { IslMotionPlayer } from './IslMotionPlayer';
import { Volume2, Search, Sparkles, Filter } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslVocabularyViewer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWord, setSelectedWord] = useState(islVocabularyList[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = islVocabularyList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                          item.meaning.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (item) => {
    speechService.speak(`${item.word}. Meaning: ${item.meaning}. Hand position: ${item.handPosition}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Category Pills & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-700">📖</span>
              <span>Daily-Use Vocabulary (9 Essential Categories)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Over 50 authentic practical signs for greetings, food, family, school, emotions, and safety.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sign vocabulary..."
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-bold w-52 focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* 9 Categories Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap border-2 transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🌟 All Categories ({islVocabularyList.length})
          </button>

          {islVocabularyCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap border-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Motion Player for Active Sign (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <IslMotionPlayer
            title={`ISL Sign: ${selectedWord.word}`}
            signText={selectedWord.word}
            meaning={selectedWord.meaning}
            steps={[selectedWord.handPosition, selectedWord.steps]}
            videoUrl={selectedWord.videoUrl}
            facialExpression="Expressive facial cues matched to meaning"
            handMotionType={selectedWord.category === 'greetings' ? 'namaste' : selectedWord.category === 'food' ? 'water' : 'two-handed'}
          />

          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 flex items-center justify-between">
            <span className="text-xs font-bold text-sky-950">
              Example Context: "{selectedWord.exampleUsage}"
            </span>
            <button
              onClick={() => handleSpeak(selectedWord)}
              className="p-2 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-800 transition-colors"
              title="Speak sign instructions"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Vocabulary Cards Grid (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Available Signs ({filteredWords.length}):
            </span>
            <span className="text-[11px] text-sky-600 font-bold">Tap to Demonstrate</span>
          </div>

          <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1">
            {filteredWords.map((item) => {
              const isSelected = selectedWord.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedWord(item)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-md scale-[1.01]'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-700">
                        {item.word}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                        {item.meaning}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                    isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
