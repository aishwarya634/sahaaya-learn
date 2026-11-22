import React, { useMemo } from 'react';
import { getLetterScene } from '../../utils/handSigns';

const SKIN = '#fcd2a8';
const OUTLINE = '#b9714c';

const Digits = ({ items, layer }) => (
  <>
    {items.map((f) => (
      <path
        key={`${layer}-${f.name}`}
        d={f.d}
        fill="none"
        stroke={layer === 'outline' ? OUTLINE : SKIN}
        strokeWidth={layer === 'outline' ? f.width + 4 : f.width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ))}
  </>
);

// Draws the two-hand ISL finger-spelling picture for one letter.
export const HandSignDiagram = ({ letter, description }) => {
  const scene = useMemo(() => getLetterScene(letter), [letter]);

  if (!scene) {
    return (
      <div className="text-7xl select-none" role="img" aria-label="Hand sign">
        🤟
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full max-w-md h-auto"
      role="img"
      aria-label={description || `ISL hand sign for letter ${letter}`}
    >
      {/* Faint letter behind the hands so the match is obvious */}
      <text
        x="200"
        y="225"
        textAnchor="middle"
        fontSize="190"
        fontWeight="900"
        fill="rgba(56,189,248,0.10)"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {String(letter).toUpperCase()}
      </text>

      {scene.hands.map((hand, i) => (
        <g key={i} transform={hand.transform}>
          {/* Extended fingers: outline first, then palm, then skin fill so joins look seamless */}
          <Digits items={hand.extended} layer="outline" />
          <path d={hand.palm} fill={SKIN} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
          <Digits items={hand.extended} layer="fill" />
          {/* Curled fingers / folded thumb sit on top of the palm */}
          <Digits items={hand.folded} layer="outline" />
          <Digits items={hand.folded} layer="fill" />
        </g>
      ))}

      {/* Movement path for letters that are traced in the air (J, Z) */}
      {scene.trace && (
        <path
          d={scene.trace}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 10"
        >
          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.2s" repeatCount="indefinite" />
        </path>
      )}
    </svg>
  );
};

export default HandSignDiagram;
