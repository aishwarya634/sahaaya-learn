// Accessible Content & High-Contrast Subject Data for Low Vision & Blurred Vision Students

export const lowVisionSubjects = [
  {
    id: 'lv-sub-english',
    subject: 'English',
    title: 'Descriptive Words & Story Exploration',
    summary: 'Discover how adjectives and sensory language create clear mental pictures without relying solely on sight.',
    readAloudText: `Welcome to English with SAHAAYA LEARN. In this lesson, we explore descriptive words that appeal to touch, sound, smell, and feeling. For example, rather than just seeing a flower, we describe it as having velvety petals, a sweet honey aroma, and gentle green leaves that rustle softly in the morning breeze.`,
    audioDuration: '2 mins',
    diagram: {
      title: 'Sensory Mind Map',
      altText: 'A high contrast diagram showing five sensory bubbles connecting to a central star representing Creative Writing: Hearing, Touch, Smell, Taste, and Sight.',
      audioDescription: 'At the center is a bright yellow circle labelled Creative Storytelling. Surrounding it with thick white connecting lines are four sensory circles with high-contrast icons: a hand for Touch (rough bark, smooth glass), an ear for Sound (loud thunder, gentle flute), a nose for Smell (cinnamon spice, petrichor rain), and a heart for Emotion (joyful, brave).',
      svgType: 'mindmap'
    },
    sections: [
      {
        heading: '1. What are Sensory Adjectives?',
        content: 'Sensory adjectives describe how things feel, sound, taste, or smell. Words like rough, smooth, buzzing, fragrant, warm, and cool make your thoughts vivid and easy to imagine.',
        spoken: 'Sensory adjectives describe how things feel, sound, taste, or smell. Words like rough, smooth, buzzing, fragrant, warm, and cool make your thoughts vivid and easy to imagine.'
      },
      {
        heading: '2. Auditory and Tactile Examples',
        content: 'When writing about rain, notice the rhythmic tapping on the tin roof, the cool dampness on your fingertips, and the earthy aroma of wet soil (petrichor).',
        spoken: 'When writing about rain, notice the rhythmic tapping on the tin roof, the cool dampness on your fingertips, and the earthy aroma of wet soil called petrichor.'
      }
    ],
    quiz: {
      question: 'Which of the following is a tactile descriptive word that you can feel with your fingers?',
      options: ['Rough sandpaper', 'Bright neon yellow', 'Distant mountain', 'Silent whisper'],
      correctIndex: 0,
      explanation: 'Rough sandpaper is a tactile sensation that you feel directly with your sense of touch.'
    }
  },
  {
    id: 'lv-sub-math',
    subject: 'Mathematics',
    title: 'Tactile Geometric Shapes & Spatial Awareness',
    summary: 'Understand two-dimensional and three-dimensional shapes through their edges, vertices, and tactile properties.',
    readAloudText: `Welcome to Tactile Geometry. A shape is defined by how many straight edges and pointed corners or vertices it possesses. A triangle has exactly three sides and three sharp corners. A square has four equal sides and four right-angle corners. A circle is smooth and continuous with zero corners and zero straight sides.`,
    audioDuration: '3 mins',
    diagram: {
      title: 'Geometric Shapes with Bold Boundaries',
      altText: 'Four high-contrast geometric shapes with thick yellow borders against black: Triangle (3 vertices), Square (4 equal sides), Circle (infinite curvature, 0 vertices), and Cylinder (curved body with 2 circular flat faces).',
      audioDescription: 'Shape 1 is an equilateral triangle with 3 thick yellow edges and 3 corners. Shape 2 is a square with 4 equal 90-degree corners. Shape 3 is a circle rendered with a bright yellow perimeter. Shape 4 is a cylinder showing two parallel circular caps and a curved central body.',
      svgType: 'shapes'
    },
    sections: [
      {
        heading: '1. Properties of a Triangle',
        content: 'A triangle has 3 straight sides and 3 angles. The sum of all interior angles is always 180 degrees. If you trace your finger around a triangular block, you will feel three sharp points.',
        spoken: 'A triangle has 3 straight sides and 3 angles. The sum of all interior angles is always 180 degrees. If you trace your finger around a triangular block, you will feel three sharp points.'
      },
      {
        heading: '2. Properties of a Square',
        content: 'A square has 4 sides of exactly equal length. All 4 corners form rigid 90-degree right angles, just like the screen of a tablet or a square floor tile.',
        spoken: 'A square has 4 sides of exactly equal length. All 4 corners form rigid 90-degree right angles, just like a square floor tile.'
      },
      {
        heading: '3. Circles and Spheres',
        content: 'A circle is completely smooth. Every point on its circumference is at an equal distance from the center point, which we call the radius.',
        spoken: 'A circle is completely smooth. Every point on its circumference is at an equal distance from the center point, which we call the radius.'
      }
    ],
    quiz: {
      question: 'How many straight edges and pointed vertices does a circle have?',
      options: ['Zero edges and zero vertices', 'Three edges and three vertices', 'Four equal edges', 'Two curved corners'],
      correctIndex: 0,
      explanation: 'A circle is a continuous curved boundary with no straight edges and no pointed corners (zero vertices).'
    }
  },
  {
    id: 'lv-sub-evs',
    subject: 'Environmental Studies',
    title: 'How Plants Grow: Roots, Stems, and Sunlight',
    summary: 'Explore the life cycle of a flowering plant with accessible step-by-step audio walkthroughs and bold tactile diagrams.',
    readAloudText: `Welcome to Environmental Studies. Plants are the green lungs of our planet Earth. Let us trace how a tiny seed in rich dark soil transforms into a thriving plant that provides us with sweet oxygen, food, and shade.`,
    audioDuration: '3 mins',
    diagram: {
      title: 'High-Contrast Plant Lifecycle Diagram',
      altText: 'A high contrast diagram showing the subterranean root system below the soil line and the shoot system rising into sunlight with leaves and a blossom.',
      audioDescription: 'The diagram is divided horizontally by a thick dashed white soil line. Below the line, fibrous roots branch into the earth drinking water and minerals. Above the line, a sturdy central stem rises up with broad leaves angled toward the golden sun. At the top rests a multi-petaled flower with developing seeds in its center.',
      svgType: 'plant'
    },
    sections: [
      {
        heading: '1. The Root System (Below Ground)',
        content: 'Roots anchor the plant firmly into the soil so strong winds cannot blow it away. Fine root hairs absorb water and essential minerals from the soil like tiny drinking straws.',
        spoken: 'Roots anchor the plant firmly into the soil so strong winds cannot blow it away. Fine root hairs absorb water and essential minerals from the soil like tiny drinking straws.'
      },
      {
        heading: '2. The Stem (The Highway)',
        content: 'The stem acts like an elevator shaft carrying water from the roots up to the leaves, and food from the leaves back down to the roots.',
        spoken: 'The stem acts like an elevator shaft carrying water from the roots up to the leaves, and food from the leaves back down to the roots.'
      },
      {
        heading: '3. Leaves & Photosynthesis',
        content: 'Leaves contain chlorophyll. Using green chlorophyll, warm sunlight, water, and carbon dioxide from the air, the leaf produces glucose (sugar food) and releases fresh oxygen for us to breathe.',
        spoken: 'Leaves contain chlorophyll. Using sunlight, water, and air, the leaf makes food and releases pure oxygen for all of us to breathe.'
      }
    ],
    quiz: {
      question: 'What vital gas do green plant leaves release into the atmosphere during photosynthesis that animals and humans need to breathe?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
      correctIndex: 0,
      explanation: 'Green plant leaves release pure Oxygen into the air, which is essential for human and animal respiration.'
    }
  },
  {
    id: 'lv-sub-gk',
    subject: 'General Knowledge',
    title: 'The Solar System & Planetary Orbits',
    summary: 'Travel through our cosmic neighborhood from the fiery Sun to the rocky inner worlds and vast outer gas giants.',
    readAloudText: `Welcome to General Knowledge. Our solar system consists of our central star, the Sun, and eight planets orbiting around it due to gravitational pull. From closest to farthest: Mercury, Venus, our home Earth with its single Moon, Mars the red planet, Jupiter the giant, Saturn with majestic rings, Uranus, and Neptune.`,
    audioDuration: '3 mins',
    diagram: {
      title: 'Orbital Distance Map of the 8 Planets',
      altText: 'A high-contrast chart showing the Sun on the left and 8 orbital tracks with Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.',
      audioDescription: 'On the far left is the bright golden Sun. Moving right along high-contrast elliptical tracks are the 4 rocky inner planets: Mercury, Venus, Earth with Moon, and Mars. Then after the asteroid belt are the 4 massive outer worlds: giant Jupiter with storm bands, Saturn with broad tactile rings, and icy blue Uranus and Neptune.',
      svgType: 'solar'
    },
    sections: [
      {
        heading: '1. The Sun - Our Central Star',
        content: 'The Sun accounts for 99.8% of all mass in our solar system. Its tremendous gravity holds all the planets in their elliptical orbits, and its radiant light gives life to Earth.',
        spoken: 'The Sun accounts for nearly all the mass in our solar system. Its gravity holds all planets in orbit, and its radiant warmth provides energy for all life on Earth.'
      },
      {
        heading: '2. Inner Rocky Worlds vs Outer Gas Giants',
        content: 'The first four planets (Mercury, Venus, Earth, Mars) have solid rocky surfaces you could theoretically stand on. Jupiter and Saturn are massive balls of hydrogen and helium gas with no solid surface.',
        spoken: 'The first four planets have solid rocky surfaces. Jupiter and Saturn are huge worlds made mostly of gas with no solid ground.'
      }
    ],
    quiz: {
      question: 'Which is the largest planet in our solar system, with a mass more than double all other planets combined?',
      options: ['Jupiter', 'Earth', 'Saturn', 'Mars'],
      correctIndex: 0,
      explanation: 'Jupiter is by far the largest planet in our solar system, famous for its Great Red Spot storm.'
    }
  },
  {
    id: 'lv-sub-lifeskills',
    subject: 'Life Skills',
    title: 'Orientation, Mobility & Safe Home Navigation',
    summary: 'Practical tactile orientation, trailing techniques, auditory landmarks, and independent living skills.',
    readAloudText: `Welcome to Life Skills. Navigating your home and school safely is an empowering skill. By using tactile landmarks—such as changes in floor texture from tile to carpet—and keeping pathways clear of obstacles, you can move with complete confidence and speed.`,
    audioDuration: '2.5 mins',
    diagram: {
      title: 'Safe Room Layout and Tactile Pathways',
      altText: 'Floor plan showing clear unobstructed pathways between bedroom, study table, and door with tactile boundary markers.',
      audioDescription: 'A high-contrast floor plan with dark blue floor and bright yellow perimeter walls. Straight white dotted lines show clear walking paths with no loose cables or low obstacles. Key landmarks such as the desk, light switch, and exit door are highlighted with tactile tactile icons.',
      svgType: 'floorplan'
    },
    sections: [
      {
        heading: '1. The Trailing Technique',
        content: 'Place the back of your hand lightly against a wall at waist height as you walk. Using the back of your hand prevents your fingers from snagging on switchboards or door frames.',
        spoken: 'Place the back of your hand lightly against a wall at waist height as you walk. Using the back of your hand prevents your fingers from catching on switches or door frames.'
      },
      {
        heading: '2. Audio and Tactile Landmarks',
        content: 'Notice auditory cues like the gentle hum of a refrigerator, the echo in a hallway, or the tactile transition from cool smooth floor tiles to a warm carpet.',
        spoken: 'Notice auditory landmarks like the hum of a refrigerator or the feel of stepping from cool tiles onto a soft rug to orient yourself instantly.'
      }
    ],
    quiz: {
      question: 'When using the trailing technique to follow a wall in an unfamiliar hallway, which part of your hand should touch the wall surface?',
      options: ['The back of the hand with curled fingers', 'The tips of extended fingers', 'The palm pressed flat', 'The thumb alone'],
      correctIndex: 0,
      explanation: 'Using the back of the hand with relaxed fingers prevents injury and keeps fingers from getting caught on edges or switch plates.'
    }
  }
];
