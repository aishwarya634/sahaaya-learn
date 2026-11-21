import React, { useState } from 'react';
import { lowVisionSubjects } from '../../data/lowVisionData';
import { speechService } from '../../utils/speech';
import { Volume2, VolumeX, Eye, BookOpen, Sparkles, CheckCircle2, ZoomIn, ZoomOut } from 'lucide-react';

export const TactileDiagramViewer = () => {
  const [selectedSubject, setSelectedSubject] = useState(lowVisionSubjects[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);

  const handleReadAloud = (text) => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speechService.speak(text, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleSelectSubject = (sub) => {
    speechService.stop();
    setIsSpeaking(false);
    setSelectedSubject(sub);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
    setDiagramZoom(1);
  };

  return (
    <div className="space-y-8">
      
      {/* Subject Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {lowVisionSubjects.map((sub) => {
          const isSelected = selectedSubject.id === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSelectSubject(sub)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-105'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200 font-bold'
              }`}
            >
              <span className="text-xs uppercase tracking-wider block opacity-75">{sub.subject}</span>
              <span className="text-sm block leading-tight mt-0.5">{sub.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Focus Subject Panel */}
      <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 sm:p-9 shadow-xl space-y-8">
        
        {/* Header & Read Aloud Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedSubject.subject} • Accessible Audio Curriculum
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {selectedSubject.title}
            </h3>
            <p className="text-base text-slate-700 mt-1 font-medium max-w-2xl">
              {selectedSubject.summary}
            </p>
          </div>

          <button
            onClick={() => handleReadAloud(selectedSubject.readAloudText)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-base shadow-lg transition-all flex-shrink-0 ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 hover:scale-105 active:scale-95'
            }`}
            aria-label="Read lesson overview aloud with audio"
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            <span>{isSpeaking ? 'Pause Audio' : 'Read Lesson Aloud'}</span>
          </button>
        </div>

        {/* High-Contrast Accessible Diagram & Audio Description */}
        <div className="bg-black text-yellow-300 rounded-3xl p-6 sm:p-8 border-4 border-yellow-400 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-yellow-400/30 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
                High-Contrast Tactile Diagram Alternative
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-yellow-200 mt-0.5">
                {selectedSubject.diagram.title}
              </h4>
            </div>

            {/* Magnifier controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDiagramZoom(prev => Math.min(prev + 0.25, 2.0))}
                className="p-2 rounded-xl bg-yellow-400 text-black font-bold text-xs flex items-center gap-1 hover:bg-yellow-300"
                aria-label="Zoom in diagram"
                title="Zoom in diagram"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom In</span>
              </button>
              <button
                onClick={() => setDiagramZoom(prev => Math.max(prev - 0.25, 0.75))}
                className="p-2 rounded-xl bg-yellow-400 text-black font-bold text-xs flex items-center gap-1 hover:bg-yellow-300"
                aria-label="Zoom out diagram"
                title="Zoom out diagram"
              >
                <ZoomOut className="w-4 h-4" />
                <span>Zoom Out</span>
              </button>
            </div>
          </div>

          {/* SVG Diagram Container with Zoom */}
          <div className="overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-2xl border-2 border-yellow-400/50 p-4">
            <div 
              style={{ transform: `scale(${diagramZoom})`, transformOrigin: 'center' }} 
              className="transition-transform duration-200"
            >
              {selectedSubject.diagram.svgType === 'shapes' && (
                <svg width="340" height="180" viewBox="0 0 340 180" className="stroke-yellow-400 fill-none stroke-[4]">
                  {/* Triangle */}
                  <polygon points="50,150 100,40 150,150" />
                  <text x="75" y="170" fill="#ffff00" stroke="none" fontSize="14" fontWeight="bold">Triangle (3 sides)</text>

                  {/* Square */}
                  <rect x="180" y="50" width="100" height="100" />
                  <text x="185" y="170" fill="#ffff00" stroke="none" fontSize="14" fontWeight="bold">Square (4 equal sides)</text>
                </svg>
              )}

              {selectedSubject.diagram.svgType === 'plant' && (
                <svg width="340" height="200" viewBox="0 0 340 200" className="stroke-yellow-400 fill-none stroke-[3]">
                  {/* Soil Line */}
                  <line x1="20" y1="130" x2="320" y2="130" strokeDasharray="6 4" strokeWidth="4" />
                  <text x="30" y="120" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Soil Line (Ground Level)</text>

                  {/* Roots */}
                  <path d="M 170 130 Q 150 160 140 190 M 170 130 Q 180 160 200 190 M 170 150 L 160 175" strokeWidth="4" />
                  <text x="130" y="180" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Roots</text>

                  {/* Stem */}
                  <line x1="170" y1="130" x2="170" y2="40" strokeWidth="6" />
                  <text x="180" y="90" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Stem</text>

                  {/* Leaves */}
                  <path d="M 170 90 Q 120 70 130 90 Q 150 110 170 95" fill="#ffd600" />
                  <path d="M 170 70 Q 220 50 210 70 Q 190 90 170 75" fill="#ffd600" />
                  <text x="80" y="80" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Leaf</text>

                  {/* Flower */}
                  <circle cx="170" cy="35" r="14" fill="#ffff00" />
                  <text x="150" y="18" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Flower</text>
                </svg>
              )}

              {selectedSubject.diagram.svgType === 'solar' && (
                <svg width="340" height="160" viewBox="0 0 340 160" className="stroke-yellow-400 fill-none stroke-[3]">
                  {/* Sun */}
                  <circle cx="30" cy="80" r="30" fill="#ffff00" stroke="#ffd600" strokeWidth="4" />
                  <text x="15" y="85" fill="#000000" stroke="none" fontSize="12" fontWeight="bold">SUN</text>

                  {/* Orbit tracks and planets */}
                  <ellipse cx="30" cy="80" rx="90" ry="50" strokeDasharray="4 4" />
                  <circle cx="120" cy="80" r="6" fill="#ffff00" />
                  <text x="110" y="105" fill="#ffff00" stroke="none" fontSize="10">Earth</text>

                  <ellipse cx="30" cy="80" rx="160" ry="70" strokeDasharray="4 4" />
                  <circle cx="190" cy="80" r="8" fill="#ffff00" />
                  <text x="180" y="105" fill="#ffff00" stroke="none" fontSize="10">Mars</text>

                  <ellipse cx="30" cy="80" rx="260" ry="78" strokeDasharray="4 4" />
                  <circle cx="290" cy="80" r="16" fill="#ffff00" />
                  <text x="270" y="115" fill="#ffff00" stroke="none" fontSize="10">Jupiter</text>
                </svg>
              )}

              {selectedSubject.diagram.svgType === 'mindmap' && (
                <svg width="340" height="160" viewBox="0 0 340 160" className="stroke-yellow-400 fill-none stroke-[3]">
                  <circle cx="170" cy="80" r="35" fill="#ffff00" />
                  <text x="145" y="85" fill="#000000" stroke="none" fontSize="12" fontWeight="bold">STORY</text>

                  <line x1="135" y1="80" x2="60" y2="40" />
                  <rect x="20" y="20" width="80" height="30" rx="8" />
                  <text x="35" y="40" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">TOUCH</text>

                  <line x1="205" y1="80" x2="280" y2="40" />
                  <rect x="240" y="20" width="80" height="30" rx="8" />
                  <text x="255" y="40" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">SOUND</text>

                  <line x1="170" y1="115" x2="170" y2="150" />
                  <text x="150" y="155" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">SMELL</text>
                </svg>
              )}

              {selectedSubject.diagram.svgType === 'floorplan' && (
                <svg width="340" height="160" viewBox="0 0 340 160" className="stroke-yellow-400 fill-none stroke-[3]">
                  <rect x="20" y="20" width="300" height="120" strokeWidth="5" />
                  <text x="35" y="45" fill="#ffff00" stroke="none" fontSize="14" fontWeight="bold">Classroom Corridor</text>

                  <line x1="40" y1="80" x2="280" y2="80" strokeDasharray="8 6" strokeWidth="4" />
                  <text x="90" y="105" fill="#ffff00" stroke="none" fontSize="12" fontWeight="bold">Clear Tactile Walking Path</text>
                </svg>
              )}
            </div>
          </div>

          {/* Detailed Audio Description Box */}
          <div className="bg-yellow-400/10 border-2 border-yellow-400/40 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-yellow-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" /> Full Audio Description:
              </span>
              <button
                onClick={() => speechService.speak(selectedSubject.diagram.audioDescription)}
                className="text-xs font-bold bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-300"
              >
                Listen to Diagram Description
              </button>
            </div>
            <p className="text-sm font-semibold text-yellow-100 leading-relaxed">
              {selectedSubject.diagram.audioDescription}
            </p>
          </div>
        </div>

        {/* Structured Sections with Individual Read Aloud */}
        <div className="space-y-6">
          <h4 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-2">
            Detailed Topic Breakdown
          </h4>

          {selectedSubject.sections.map((sec, i) => (
            <div key={i} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-bold text-slate-900">{sec.heading}</h5>
                <button
                  onClick={() => speechService.speak(sec.spoken || sec.content)}
                  className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-sm"
                  title="Read section aloud"
                  aria-label={`Read ${sec.heading} aloud`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Audio-Supported Practice Question */}
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Audio-Supported Check Question:
            </span>
            <button
              onClick={() => speechService.speak(`Question: ${selectedSubject.quiz.question}. Options are: ${selectedSubject.quiz.options.join(', ')}`)}
              className="text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-lg hover:bg-amber-300 flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Question Aloud</span>
            </button>
          </div>

          <p className="text-lg font-bold text-slate-900">
            {selectedSubject.quiz.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {selectedSubject.quiz.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => {
                  setSelectedQuizIndex(optIdx);
                  setQuizSubmitted(true);
                  if (optIdx === selectedSubject.quiz.correctIndex) {
                    speechService.speak(`Correct! ${selectedSubject.quiz.explanation}`);
                  } else {
                    speechService.speak(`Incorrect. The correct answer is: ${selectedSubject.quiz.options[selectedSubject.quiz.correctIndex]}`);
                  }
                }}
                className={`p-3.5 rounded-xl border-2 font-bold text-left text-sm transition-all ${
                  selectedQuizIndex === optIdx
                    ? optIdx === selectedSubject.quiz.correctIndex
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                      : 'bg-rose-600 text-white border-rose-700'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <span>{String.fromCharCode(65 + optIdx)}) </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {quizSubmitted && (
            <div className={`p-4 rounded-xl text-sm font-bold ${
              selectedQuizIndex === selectedSubject.quiz.correctIndex
                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                : 'bg-rose-100 text-rose-950 border border-rose-300'
            }`}>
              {selectedQuizIndex === selectedSubject.quiz.correctIndex ? (
                <span>✅ Excellent! {selectedSubject.quiz.explanation}</span>
              ) : (
                <span>❌ {selectedSubject.quiz.explanation}</span>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
