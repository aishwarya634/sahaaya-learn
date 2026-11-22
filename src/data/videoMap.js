// Central place for all video handling.
//
// HOW TO ADD A REAL VIDEO FOR A SIGN OR LESSON
// 1. Find a YouTube video that ALLOWS EMBEDDING (open it, click Share -> Embed;
//    if "Embed" is missing, the owner disabled embedding and it will never work in the app).
//    Good sources: the "ISLRTC" official channel, "Indian Sign Language" teaching channels.
// 2. Add a line to VIDEO_OVERRIDES below. The key is the lowercase player title
//    (the text shown at the top of the player) or the lesson title.
//    The value is the 11-character video ID or the full YouTube URL.
//
// Example:
//   'isl letter a demonstration': 'AbCdEfGhIjK',
//   'isl alphabet & finger-spelling (a to z)': 'https://www.youtube.com/watch?v=AbCdEfGhIjK',
//
// Anything without a working video automatically falls back to the step-by-step
// guide plus a "Find this sign on YouTube" search button, so nothing ever shows
// "Video unavailable".

// IDs that were used as placeholders in the original data. They are ignored.
export const PLACEHOLDER_IDS = ['g3Qo9W-xOcg'];

export const VIDEO_OVERRIDES = {
  // 'isl letter a demonstration': 'VIDEO_ID_HERE',
};

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

// Accepts a bare ID, watch URL, youtu.be URL, embed URL or shorts URL.
export const extractVideoId = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (ID_PATTERN.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    let id = null;
    if (url.hostname.includes('youtu.be')) {
      id = url.pathname.slice(1).split('/')[0];
    } else if (url.hostname.includes('youtube')) {
      if (url.searchParams.get('v')) {
        id = url.searchParams.get('v');
      } else {
        const parts = url.pathname.split('/').filter(Boolean);
        const idx = parts.findIndex((p) => ['embed', 'shorts', 'v', 'live'].includes(p));
        if (idx !== -1) id = parts[idx + 1];
      }
    }
    return id && ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
};

// Returns a usable video ID, or null if there is no real video for this item.
export const resolveVideoId = (videoUrl, key) => {
  if (key) {
    const override = VIDEO_OVERRIDES[String(key).trim().toLowerCase()];
    const overrideId = extractVideoId(override);
    if (overrideId) return overrideId;
  }
  const id = extractVideoId(videoUrl);
  if (!id || PLACEHOLDER_IDS.includes(id)) return null;
  return id;
};

export const youtubeSearchUrl = (query) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
