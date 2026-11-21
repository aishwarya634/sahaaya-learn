import React, { useState } from 'react';
import { islNumbers1to100 } from '../../data/islData';
import { IslMotionPlayer } from './IslMotionPlayer';
import { Volume2, Sparkles, Filter, Hash } from 'lucide-react';
import { speechService } from '../../utils/speech';

export const IslNumberViewer = () => {
  const [selectedNum, setSelectedNum] = useState(islNumbers1to100[0]); // Default 1
  const [rangeFilter, setRangeFilter] = useState('1-20'); // '1-10', '11-20', '21-50', '51-100', 'all'
  const [searchNumber, setSearchNumber] = useState('');

  const filterRanges = [
    { id: '1-10', label: '1 to 10 (Foundational Digits)' },
    { id: '11-20', label: '11 to 20 (Teen Numbers)' },
    { id: '21-50', label: '21 to 50 (Compound Numbers)' },
    { id: '51-100', label: '51 to 100 (Higher Counting)' },
    { id: 'all', label: 'All 1–100' }
  ];

  const filteredNumbers = islNumbers1to100.filter((item) => {
    if (searchNumber.trim()) {
      return String(item.num) === searchNumber.trim() || item.name.toLowerCase().includes(searchNumber.toLowerCase().trim());
    }
    if (rangeFilter === '1-10') return item.num >= 1 && item.num <= 10;
    if (rangeFilter === '11-20') return item.num >= 11 && item.num <= 20;
    if (rangeFilter === '21-50') return item.num >= 21 && item.num <= 50;
    if (rangeFilter === '51-100') return item.num >= 51 && item.num <= 100;
    return true;
  });

  const handleSpeak = (item) => {
    speechService.speak(`Indian Sign Language Number ${item.num}: ${item.name}. ${item.desc}. Movement: ${item.steps}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Range Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-700">🔢</span>
              <span>ISL Numbers 1 to 100 (Full Numerical System)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Dual-handed counting, touch point configurations (6–9), and teen/tens compounds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="100"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              placeholder="Find number (1-100)..."
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold w-40 focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Range Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterRanges.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRangeFilter(r.id);
                setSearchNumber('');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                rangeFilter === r.id && !searchNumber
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Number Buttons Grid */}
        <div className="max-h-48 overflow-y-auto p-2 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-wrap gap-1.5">
          {filteredNumbers.map((item) => (
            <button
              key={item.num}
              onClick={() => setSelectedNum(item)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center border ${
                selectedNum.num === item.num
                  ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-105 ring-2 ring-sky-300'
                  : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-200'
              }`}
              aria-label={`Select ISL number ${item.num}`}
            >
              {item.num}
            </button>
          ))}
        </div>
      </div>

      {/* Main Focus Display with Motion Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Motion Player Demonstrator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <IslMotionPlayer
            title={`ISL Number ${selectedNum.num} (${selectedNum.name})`}
            signText={`NUMBER ${selectedNum.num}`}
            meaning={`Numerical quantity of ${selectedNum.num}`}
            steps={[selectedNum.desc, selectedNum.steps]}
            videoUrl={selectedNum.videoDemo}
            facialExpression="Direct eye contact showing clearly delineated finger counts"
            handMotionType="two-handed"
          />
        </div>

        {/* Right Column: Hand Position & Mathematical Counting Rules (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-sky-300 p-6 sm:p-7 shadow-sm space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-black uppercase text-sky-700">
                {selectedNum.category}
              </span>
              <h4 className="text-2xl font-black text-slate-900 mt-0.5">
                Number {selectedNum.num}: {selectedNum.name}
              </h4>
            </div>

            <button
              onClick={() => handleSpeak(selectedNum)}
              className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100"
              title="Speak number instructions"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-1">
            <span className="text-[11px] font-black uppercase text-sky-900 block">
              Hand Configuration:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {selectedNum.desc}
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-black uppercase text-amber-900 block">
              Execution Movement:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {selectedNum.steps}
            </p>
          </div>

          {/* Special ISL Counting Convention Note */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-medium">
            💡 <strong>ISL Standard Rule:</strong> In Indian Sign Language counting, numbers 6 to 9 use thumb contacts against the pinky (6), ring finger (7), middle finger (8), and index finger (9). Teen numbers (11–19) flash base 10 then the unit digit.
          </div>

        </div>

      </div>

    </div>
  );
};
