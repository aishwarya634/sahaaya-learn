import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, VideoOff, Loader2 } from 'lucide-react';
import { youtubeSearchUrl } from '../../data/videoMap';

// Remember results so switching between signs does not re-check the same video.
const checkCache = new Map();

// Asks YouTube whether the video exists and may be embedded.
// 200 -> ok, 400/401/403/404 -> not playable in an iframe.
// Network/CORS problems are treated as "ok" so a good video is never blocked by mistake.
const checkEmbeddable = async (videoId, signal) => {
  if (checkCache.has(videoId)) return checkCache.get(videoId);
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`
      )}`,
      { signal }
    );
    const ok = !(res.status === 400 || res.status === 401 || res.status === 403 || res.status === 404);
    checkCache.set(videoId, ok);
    return ok;
  } catch (err) {
    if (err && err.name === 'AbortError') throw err;
    return true;
  }
};

export const SafeYouTube = ({
  videoId,
  title = 'Video',
  searchQuery,
  loop = false,
  speed = 1,
  fallback = null,
  onStatus,
  className = '',
}) => {
  const [status, setStatus] = useState(videoId ? 'checking' : 'unavailable');
  const iframeRef = useRef(null);

  // Check the video before showing it.
  useEffect(() => {
    if (!videoId) {
      setStatus('unavailable');
      return undefined;
    }
    setStatus('checking');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    checkEmbeddable(videoId, controller.signal)
      .then((ok) => setStatus(ok ? 'ok' : 'unavailable'))
      .catch(() => setStatus('ok')) // timed out: just try the player
      .finally(() => clearTimeout(timer));
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [videoId]);

  useEffect(() => {
    if (onStatus) onStatus(status);
  }, [status, onStatus]);

  // Playback speed through the YouTube iframe API.
  const sendSpeed = () => {
    const win = iframeRef.current && iframeRef.current.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify({ event: 'command', func: 'setPlaybackRate', args: [speed] }),
      '*'
    );
  };

  useEffect(() => {
    if (status === 'ok') sendSpeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, status]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  if (status === 'checking') {
    return (
      <div
        className={`flex items-center justify-center gap-2 aspect-video w-full bg-slate-950 rounded-2xl text-slate-300 text-sm ${className}`}
        role="status"
        aria-live="polite"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading video…</span>
      </div>
    );
  }

  if (status === 'ok') {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
    });
    if (origin) params.set('origin', origin);
    if (loop) {
      params.set('loop', '1');
      params.set('playlist', videoId);
    }
    return (
      <div className={`aspect-video w-full rounded-2xl overflow-hidden bg-black ${className}`}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
          title={title}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={sendSpeed}
        />
      </div>
    );
  }

  // Not available: show the fallback content plus a link to find a real video.
  const query = searchQuery || title;
  return (
    <div className={`space-y-3 ${className}`}>
      {fallback || (
        <div className="flex flex-col items-center justify-center text-center gap-2 aspect-video w-full bg-slate-950 rounded-2xl text-slate-300 p-6">
          <VideoOff className="w-8 h-8 text-amber-400" />
          <p className="text-sm font-semibold">This video can't be played inside the app.</p>
        </div>
      )}
      <a
        href={youtubeSearchUrl(query)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-sky-200 bg-slate-900 border border-sky-500/60 px-3 py-2 rounded-xl transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Find this on YouTube</span>
      </a>
    </div>
  );
};

export default SafeYouTube;
