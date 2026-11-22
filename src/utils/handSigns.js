// Geometry + scenes for the drawn ISL hand diagrams.
// Pure JavaScript (no React) so the shapes are easy to test and tweak.
//
// A hand is drawn in local coordinates: the knuckle line sits at y = 0,
// fingers point up (negative y) and the palm extends down (positive y).
// A digit is [angle, length, bend]:
//   angle  = degrees clockwise from straight up
//   length = total length of the finger
//   bend   = extra degrees applied to the outer half (makes curved fingers)

const FOLD = [0, 11, 0];          // curled finger (shows as a knuckle bump)
const TFOLD = [62, 24, 0];        // thumb folded across the palm

const BASES = {
  thumb: [-21, 26],
  index: [-15, 0],
  middle: [-5, 0],
  ring: [5, 0],
  pinky: [15, 0],
};

const DIGITS = ['thumb', 'index', 'middle', 'ring', 'pinky'];

const pose = (o = {}) => ({
  thumb: TFOLD,
  index: FOLD,
  middle: FOLD,
  ring: FOLD,
  pinky: FOLD,
  ...o,
});

export const POSES = {
  fist: pose(),
  point: pose({ index: [0, 44, 0] }),
  pointHook: pose({ index: [0, 44, 105] }),
  pointThumbOut: pose({ index: [0, 44, 0], thumb: [-78, 30, 0] }),
  pointThumbIn: pose({ index: [0, 44, 0], thumb: [-82, 27, 0] }),
  flat: pose({
    thumb: [-42, 28, 0],
    index: [0, 44, 0],
    middle: [0, 46, 0],
    ring: [0, 43, 0],
    pinky: [0, 34, 0],
  }),
  two: pose({ index: [0, 44, 0], middle: [0, 46, 0] }),
  crossed: pose({ index: [15, 46, 0], middle: [-13, 48, 0] }),
  v: pose({ index: [-15, 44, 0], middle: [15, 46, 0] }),
  w: pose({ index: [-20, 44, 0], middle: [0, 46, 0], ring: [20, 43, 0] }),
  three: pose({ index: [0, 44, 0], middle: [0, 46, 0], ring: [0, 43, 0] }),
  y: pose({ thumb: [-72, 30, 0], pinky: [24, 34, 0] }),
  pinkyHook: pose({ pinky: [6, 44, -120] }),
  // Curved hands are drawn as explicit arcs so the ring / C shape is clear.
  c: {
    custom: [
      { name: 'fingers', d: 'M0 -2 C-2 -40 24 -58 46 -44', width: 20 },
      { name: 'thumb', d: 'M-21 28 C-30 40 24 50 44 18', width: 11 },
    ],
  },
  o: {
    custom: [
      { name: 'fingers', d: 'M0 -2 C-8 -46 44 -62 42 -14', width: 20 },
      { name: 'thumb', d: 'M-21 28 C-40 -4 -6 4 36 -6', width: 11 },
    ],
  },
};

// Default placements. Signer's RIGHT hand is drawn on the viewer's left (mirror view),
// so thumbs point toward the middle of the picture.
const R = (pose, x, y, rot = 0, extra = {}) => ({ pose, x, y, rot, flip: true, ...extra });
const L = (pose, x, y, rot = 0, extra = {}) => ({ pose, x, y, rot, flip: false, ...extra });

// One scene per letter. `trace` draws a dashed path showing a movement in the air.
export const LETTER_SCENES = {
  A: { hands: [R('pointThumbIn', 156, 176, 13), L('pointThumbIn', 244, 176, -13)] },
  B: { hands: [L('flat', 268, 170, 0), R('o', 178, 170, 0)] },
  C: { hands: [R('c', 190, 165, 0), L('flat', 292, 200, -88, { s: 1.1 })] },
  D: { hands: [L('point', 268, 175, 0), R('c', 186, 165, 90)] },
  E: {
    hands: [L('point', 268, 175, 0), R('point', 180, 150, 90)],
    trace: 'M 300 105 L 300 205',
  },
  F: { hands: [L('point', 268, 175, 0), R('crossed', 182, 150, 90)] },
  G: { hands: [R('fist', 170, 170, 90), L('fist', 230, 170, -90)] },
  H: { hands: [L('flat', 250, 205, -90), R('flat', 150, 140, 90)] },
  I: { hands: [L('point', 268, 175, 0), R('point', 188, 150, 40)] },
  J: {
    hands: [R('pointHook', 200, 160, 0)],
    trace: 'M 262 96 L 262 190 Q 262 232 228 232 Q 206 232 204 210',
  },
  K: { hands: [L('point', 268, 175, 0), R('pointThumbOut', 182, 160, 82)] },
  L: { hands: [R('pointThumbOut', 200, 168, 0)] },
  M: { hands: [L('flat', 262, 215, -90), R('three', 220, 105, 180)] },
  N: { hands: [L('flat', 262, 215, -90), R('two', 220, 105, 180)] },
  O: { hands: [R('o', 200, 170, 0)] },
  P: { hands: [L('point', 268, 180, 0), R('o', 205, 110, 90)] },
  Q: { hands: [L('o', 190, 165, 0), R('point', 268, 235, -60)] },
  R: { hands: [R('crossed', 200, 168, 0)] },
  S: { hands: [R('pinkyHook', 168, 170, 90), L('pinkyHook', 232, 170, -90)] },
  T: { hands: [L('point', 268, 190, 0), R('point', 190, 105, 90)] },
  U: { hands: [R('two', 200, 168, 0)] },
  V: { hands: [R('v', 200, 168, 0)] },
  W: { hands: [R('w', 200, 168, 0)] },
  X: { hands: [R('point', 176, 188, 38), L('point', 224, 188, -38)] },
  Y: { hands: [R('y', 200, 168, 0)] },
  Z: {
    hands: [R('point', 262, 215, 0)],
    trace: 'M 150 80 L 250 80 L 150 190 L 250 190',
  },
};

const rad = (d) => (d * Math.PI) / 180;
const fmt = (n) => Math.round(n * 10) / 10;

const digitPath = ([bx, by], [angle, length, bend]) => {
  // Three segments, turning gradually, so curved fingers look like arcs.
  const seg = length / 3;
  const angles = [angle, angle + bend * 0.5, angle + bend];
  let x = bx;
  let y = by;
  let d = `M${fmt(x)} ${fmt(y)}`;
  angles.forEach((a) => {
    x += seg * Math.sin(rad(a));
    y -= seg * Math.cos(rad(a));
    d += ` L${fmt(x)} ${fmt(y)}`;
  });
  return d;
};

const PALM_PATH = 'M-21 -2 H21 V34 Q21 50 5 50 H-5 Q-21 50 -21 34 Z';

// Turns one hand definition into drawing layers (back -> front).
export const buildHand = (hand) => {
  const shape = POSES[hand.pose] || POSES.fist;
  const scale = hand.s || 1.4;
  const sx = hand.flip ? -scale : scale;
  const transform = `translate(${hand.x} ${hand.y}) rotate(${hand.rot}) scale(${fmt(sx)} ${scale})`;

  if (shape.custom) {
    return { transform, palm: PALM_PATH, extended: shape.custom, folded: [] };
  }

  const extended = [];
  const folded = [];
  DIGITS.forEach((name) => {
    const spec = shape[name];
    const entry = { name, d: digitPath(BASES[name], spec), width: name === 'thumb' ? 10 : 9 };
    (spec[1] <= 26 ? folded : extended).push(entry);
  });

  return { transform, palm: PALM_PATH, extended, folded };
};

export const getLetterScene = (letter) => {
  const key = String(letter || '').toUpperCase();
  const scene = LETTER_SCENES[key];
  if (!scene) return null;
  return {
    hands: scene.hands.map(buildHand),
    trace: scene.trace || null,
  };
};
