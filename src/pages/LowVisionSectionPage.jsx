import React from 'react';
import { useApp } from '../context/AppContext';
import { TactileDiagramViewer } from '../components/lowvision/TactileDiagramViewer';
import { 
  Eye, 
  Volume2, 
  Sliders, 
  Type, 
  Sun, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ZoomIn
} from 'lucide-react';

export const LowVisionSectionPage = ({ onOpenA11y }) => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-100 border border-white/30">
            <span>👁️</span> Low Vision & Tactile Learning Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Accessible & Audio-Supported Learning
          </h1>
          <p className="text-sm sm:text-base text-amber-100 max-w-2xl font-medium leading-relaxed">
            Prioritizing crystal-clear explanations, high-contrast Yellow-on-Black diagrams, and complete audio read-aloud support. No concept relies on eyesight alone.
          </p>
        </div>

        <button
          onClick={onOpenA11y}
          className="px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm shadow-xl transition-all flex items-center gap-2 flex-shrink-0 active:scale-95"
        >
          <Sliders className="w-5 h-5" />
          <span>Quick Contrast & Size Bar</span>
        </button>
      </div>

      {/* Module A Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <Type className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase">Scalable Text</h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Scale text up to 225% without horizontal scrolling or breaking layouts.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <Volume2 className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase">Full Read-Aloud</h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Every heading, paragraph, diagram, and quiz has an instant audio play button.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <Sun className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase">High Contrast</h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Yellow-on-black, Dark mode, and Bold outlines for maximum edge clarity.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <ZoomIn className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase">Tactile Diagrams</h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            High-contrast SVGs paired with deep audio scene walkthroughs.
          </p>
        </div>

      </div>

      {/* Module B: Accessible Subjects & Tactile Diagram Explorer */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700">
            Module B: Core Educational Subjects
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            English, Mathematics, EVS, General Knowledge & Life Skills
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Click any subject below to explore lessons, listen to audio narratives, and interact with high-contrast diagrams.
          </p>
        </div>

        <TactileDiagramViewer />
      </div>

    </div>
  );
};
