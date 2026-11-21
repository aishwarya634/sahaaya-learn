import React from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../utils/speech';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Type, 
  Sun, 
  Moon, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  Sliders
} from 'lucide-react';

export const AccessibilityBar = ({ isOpen, onClose }) => {
  const { accessibility, updateAccessibility } = useApp();

  if (!isOpen) return null;

  const fontSizes = [100, 125, 150, 175, 200, 225];
  const contrastThemes = [
    { id: 'normal', name: 'Default', icon: Sun, color: 'bg-white text-slate-900 border-slate-300' },
    { id: 'dark', name: 'Dark Mode', icon: Moon, color: 'bg-slate-900 text-white border-slate-700' },
    { id: 'yellow-black', name: 'Yellow on Black', icon: Eye, color: 'bg-black text-yellow-300 border-yellow-400 font-bold' },
    { id: 'high-contrast-light', name: 'High Contrast Light', icon: Sliders, color: 'bg-white text-black border-2 border-black font-bold' },
    { id: 'blue-filter', name: 'Warm / Sepia', icon: Sparkles, color: 'bg-amber-50 text-amber-900 border-amber-300' },
  ];

  const handleTestSpeech = () => {
    speechService.speak(
      'Welcome to SAHAAYA LEARN inclusive educational platform. Text to speech is active and configured.',
      { rate: accessibility.ttsRate }
    );
  };

  const handleStopSpeech = () => {
    speechService.stop();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Accessibility & Visual Settings"
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-500 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 space-y-6 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Accessibility Preferences</h2>
              <p className="text-sm text-slate-600">Customize display size, high contrast themes, and text-to-speech audio.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:ring-4 focus:ring-blue-400"
            aria-label="Close accessibility settings"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 1. Font Size / Zoom */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              <span>Text Size ({accessibility.fontSize}%)</span>
            </label>
            <span className="text-xs font-semibold text-slate-500">Increases text across all pages</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {fontSizes.map((size) => (
              <button
                key={size}
                onClick={() => updateAccessibility({ fontSize: size })}
                className={`py-2 px-3 rounded-xl border text-sm font-bold transition-all ${
                  accessibility.fontSize === size
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
                aria-pressed={accessibility.fontSize === size}
              >
                {size}%
              </button>
            ))}
          </div>
        </div>

        {/* 2. High Contrast & Color Modes */}
        <div className="space-y-3">
          <label className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Contrast and Color Modes</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {contrastThemes.map((theme) => {
              const Icon = theme.icon;
              const isSelected = accessibility.contrastMode === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => updateAccessibility({ contrastMode: theme.id })}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${theme.color} ${
                    isSelected ? 'ring-4 ring-blue-400 scale-[1.02]' : 'opacity-85 hover:opacity-100'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-bold">{theme.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Text-to-Speech Settings */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-emerald-600" />
              <span>Text-to-Speech (Read Aloud)</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleTestSpeech}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Test Voice
              </button>
              <button
                onClick={handleStopSpeech}
                className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold"
              >
                Stop
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Voice Speed:</span>
            {[0.8, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => updateAccessibility({ ttsRate: rate })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  accessibility.ttsRate === rate
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rate === 0.8 ? 'Slower (0.8x)' : rate === 1.0 ? 'Normal (1.0x)' : 'Faster (1.2x)'}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Accessible Font & Focus Outlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
            <div>
              <span className="block text-sm font-bold text-slate-900">Dyslexia-Friendly Font</span>
              <span className="text-xs text-slate-500">Enhanced letter spacing and shapes</span>
            </div>
            <input
              type="checkbox"
              checked={accessibility.dyslexicFont}
              onChange={(e) => updateAccessibility({ dyslexicFont: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
            <div>
              <span className="block text-sm font-bold text-slate-900">Always Show Subtitles</span>
              <span className="text-xs text-slate-500">Accurate captions for all video demos</span>
            </div>
            <input
              type="checkbox"
              checked={accessibility.subtitles}
              onChange={(e) => updateAccessibility({ subtitles: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400"
            />
          </label>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => updateAccessibility({
              fontSize: 100,
              contrastMode: 'normal',
              dyslexicFont: false,
              ttsRate: 0.9,
              subtitles: true
            })}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 underline"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Standard Defaults</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all focus:ring-4 focus:ring-blue-300"
          >
            Apply & Done
          </button>
        </div>

      </div>
    </div>
  );
};
