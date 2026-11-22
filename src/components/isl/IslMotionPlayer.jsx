import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Repeat,
  Volume2,
  ShieldCheck,
  ListChecks
} from 'lucide-react';
import { speechService } from '../../utils/speech';
import { SafeYouTube } from '../common/SafeYouTube';
import { resolveVideoId } from '../../data/videoMap';

export const IslMotionPlayer = ({
  title,
  signText,
  videoUrl,
  meaning,
  steps,
  facialExpression = 'Neutral friendly smile with steady eye contact',
  handMotionType = 'two-handed',
  signVisual = null
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [animationTick, setAnimationTick] = useState(0);
  const [mediaStatus, setMediaStatus] = useState('checking');
  const containerRef = useRef(null);

  // Real video for this sign (null when only the placeholder / nothing is set)
  const videoId = resolveVideoId(videoUrl, title);
  const hasVideo = mediaStatus === 'ok';

  // Restart the step guide whenever a different sign is selected
  useEffect(() => {
    setCurrentStepIdx(0);
    setAnimationTick(0);
  }, [title]);

  // Looping animation ticker for the step-by-step guide
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = Math.round(1800 / playbackSpeed);
    const interval = setInterval(() => {
      setAnimationTick(prev => (prev + 1) % 4);
      if (Array.isArray(steps) && steps.length > 0) {
        setCurrentStepIdx(prev => (prev + 1) % steps.length);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, steps]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleReplay = () => {
    setCurrentStepIdx(0);
    setAnimationTick(0);
    setIsPlaying(true);
  };

  const handleVoiceExplain = () => {
    const textToSpeak = `${title}. Meaning: ${meaning}. Current step: ${Array.isArray(steps) ? steps[currentStepIdx] : steps}`;
    speechService.speak(textToSpeak);
  };

  // Step guide shown when there is no playable video
  const guideArena = (
    <div className="relative min-h-[220px] sm:min-h-[260px] bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute w-full top-1/2 border-t border-dashed border-sky-500/20 pointer-events-none flex justify-end pr-3">
        <span className="text-[9px] font-bold text-sky-400/40 uppercase tracking-wider">Upper Chest Signing Level</span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-3 w-full">
        {signVisual ? (
          // A drawn picture specific to this sign (it changes with every letter)
          <div className="w-full flex justify-center pb-6">{signVisual}</div>
        ) : (
          <>
            <div className="relative">
              <div
                style={{ transform: `scale(${1 + (animationTick * 0.04)}) rotate(${animationTick % 2 === 0 ? '-2deg' : '2deg'})` }}
                className="text-7xl sm:text-8xl select-none filter drop-shadow-[0_10px_20px_rgba(56,189,248,0.3)] transition-transform duration-300"
              >
                {handMotionType === 'pointing' ? '👉' : handMotionType === 'namaste' ? '🙏' : handMotionType === 'water' ? '💧' : '🤟'}
              </div>
              {isPlaying && (
                <span className="absolute -inset-2 rounded-full border border-sky-400/30 animate-ping pointer-events-none"></span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-amber-300 max-w-xs">
              No video for this sign yet. Follow the written steps below or use the YouTube button.
            </p>
          </>
        )}
      </div>

      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 text-[11px] text-amber-300 font-bold">
        <span>😊 Facial Cue:</span>
        <span className="text-slate-300 font-medium">{facialExpression}</span>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative bg-slate-950 text-white rounded-3xl overflow-hidden border-2 border-sky-400/80 shadow-2xl flex flex-col justify-between transition-all ${
        isFullscreen ? 'p-8 justify-around' : 'p-5 sm:p-6'
      }`}
    >
      {/* Top bar: title and source badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 z-10">
        <div className="flex items-center gap-2.5">
          <span className={`w-3 h-3 rounded-full ${hasVideo ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-sky-300 leading-tight">
              {title}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Indian Sign Language (ISL) {hasVideo ? 'Video Demonstration' : 'Step-by-Step Guide'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border ${
            hasVideo
              ? 'text-emerald-300 bg-emerald-950/80 border-emerald-500'
              : 'text-amber-300 bg-amber-950/60 border-amber-500'
          }`}>
            {hasVideo ? <ShieldCheck className="w-3 h-3" /> : <ListChecks className="w-3 h-3" />}
            <span>{hasVideo ? 'ISL Video' : 'Written Guide'}</span>
          </span>

          <button
            onClick={handleVoiceExplain}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 transition-colors"
            title="Read Movement Instructions Aloud"
            aria-label="Read movement instructions aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Media area: real video when available, otherwise the step guide */}
      <div className="my-4 sm:my-6">
        <SafeYouTube
          videoId={videoId}
          title={title}
          searchQuery={`Indian Sign Language ISL ${signText || title}`}
          loop={isLooping}
          speed={playbackSpeed}
          fallback={guideArena}
          onStatus={setMediaStatus}
        />
      </div>

      {/* Sign gloss and meaning */}
      <div className="flex flex-col items-center text-center gap-1.5 mb-4">
        <div className="bg-sky-950/80 border border-sky-400/50 px-4 py-1.5 rounded-xl shadow-lg">
          <span className="text-xs sm:text-sm font-black text-sky-200 tracking-wider uppercase">
            {signText || title}
          </span>
        </div>
        {meaning && (
          <p className="text-xs font-semibold text-slate-300 max-w-md italic">
            "{meaning}"
          </p>
        )}
      </div>

      {/* Step-by-step breakdown */}
      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-center mb-4">
        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mb-0.5">
          Step-by-Step Hand Movement ({Array.isArray(steps) ? `${currentStepIdx + 1}/${steps.length}` : '1/1'}):
        </span>
        <p className="text-xs sm:text-sm font-bold text-slate-100">
          {Array.isArray(steps) ? steps[currentStepIdx] : steps}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">

        <div className="flex items-center gap-2">
          {/* Play/pause drives the step guide (the video has its own controls) */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            aria-label={isPlaying ? 'Pause step guide' : 'Play step guide'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span className="text-xs">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleReplay}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Replay from the first step"
            aria-label="Replay from the first step"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLooping ? 'bg-sky-950 text-sky-300 border border-sky-500' : 'bg-slate-800 text-slate-400'
            }`}
            title="Toggle continuous loop"
            aria-label="Toggle continuous loop"
            aria-pressed={isLooping}
          >
            <Repeat className="w-4 h-4" />
            <span className="hidden sm:inline">Loop</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs">
            <span className="px-1.5 text-slate-400 font-semibold">Speed:</span>
            {[0.5, 0.75, 1.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded-lg font-black transition-all ${
                  playbackSpeed === spd
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {spd === 0.5 ? '0.5x' : spd === 0.75 ? '0.75x' : '1x'}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

    </div>
  );
};
