// Comprehensive Lessons Database for SAHAAYA LEARN
// Categorized by category (deaf, speech, low_vision) and level (1, 2, 3)

export const lessonsData = [
  // --- DEAF AND HARD-OF-HEARING LESSONS ---
  {
    id: 'isl-alpha',
    category: 'deaf',
    level: 1,
    levelName: 'Level 1: Beginner',
    title: 'ISL Alphabet & Finger-Spelling (A to Z)',
    duration: '15 mins',
    xp: 50,
    introduction: 'Finger-spelling in Indian Sign Language (ISL) uses both hands to spell out proper nouns, English words, and names. Unlike American Sign Language (ASL) which is one-handed, ISL predominantly utilizes two hands for symmetrical, clear communication.',
    objectives: [
      'Learn the standard two-handed ISL hand positions for letters A through Z.',
      'Understand how to hold your hands at chest level with high visual clarity.',
      'Practice finger-spelling your own name in ISL.',
      'Identify signs accurately in visual interactive quizzes.'
    ],
    explanation: `In Indian Sign Language, finger-spelling is an essential bridge between written English and signed dialogue. For example:
- Letter A: Both hands touch index finger tips at the top and thumb tips at the base, creating a crisp triangular A-frame.
- Letter B: Left palm is held upright flat like paper; right hand forms two rounded loops against it.
- Letter C: Right curved hand forms an open C arc facing outward.
- Letter D: Left index stands straight while right hand curves into a semi-circle touching the left index.
All signs should be held steady with steady eye contact and clear lighting.`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Front-Facing Demonstration of ISL Alphabets',
    videoSubtitles: [
      { time: '0:01', text: 'Welcome to Indian Sign Language Alphabet Learning.' },
      { time: '0:05', text: 'Notice: Both hands are held relaxed at upper chest level.' },
      { time: '0:10', text: 'A is a triangle with both index fingers and thumbs.' },
      { time: '0:15', text: 'B forms two loops against the flat left upright palm.' },
      { time: '0:20', text: 'Clear hand shapes allow effortless recognition.' }
    ],
    interactiveActivity: {
      type: 'sign-picker',
      prompt: 'Select the correct letter for this sign description: "Tips of both index fingers touch at the top, and thumbs touch at the base forming a triangle."',
      options: ['Letter A', 'Letter D', 'Letter M', 'Letter Z'],
      correctAnswer: 'Letter A',
      feedback: 'Excellent! Letter A in ISL forms a triangular apex with both hands.'
    },
    practiceQuestions: [
      {
        q: 'How many hands are primarily used in Indian Sign Language (ISL) finger spelling?',
        options: ['Two hands', 'One hand only', 'No hands, only mouth shapes', 'Three fingers only'],
        correct: 0,
        explanation: 'ISL finger-spelling is predominantly two-handed, creating distinct and stable visual shapes.'
      },
      {
        q: 'Which letter is signed by forming two closed loops against a flat upright left palm?',
        options: ['Letter B', 'Letter P', 'Letter C', 'Letter E'],
        correct: 0,
        explanation: 'Letter B uses the left hand as an upright stem while the right hand creates two loops.'
      }
    ],
    quiz: {
      id: 'quiz-isl-alpha',
      title: 'Alphabet Master Quiz',
      questions: [
        {
          question: 'What is the correct hand positioning height for finger spelling in ISL?',
          options: ['Upper chest and chin level with steady posture', 'Above the head', 'Down at the knees', 'Behind the back'],
          correctIndex: 0,
          explanation: 'Chest level ensures the viewer can observe both your hand shapes and facial expressions simultaneously.'
        },
        {
          question: 'In ISL, what letter is represented by crossing your right index and middle fingers together?',
          options: ['Letter R', 'Letter X', 'Letter T', 'Letter V'],
          correctIndex: 0,
          explanation: 'Letter R is represented by crossed index and middle fingers.'
        },
        {
          question: 'Why is finger-spelling important in sign language?',
          options: ['To spell proper nouns, names, and new terminology', 'Because signs do not exist', 'Only to count numbers', 'To whisper silently'],
          correctIndex: 0,
          explanation: 'Finger spelling is used for specific personal names, places, and English vocabulary.'
        }
      ]
    }
  },

  {
    id: 'isl-numbers',
    category: 'deaf',
    level: 1,
    levelName: 'Level 1: Beginner',
    title: 'ISL Numbers 0 to 20 & Higher Counting',
    duration: '12 mins',
    xp: 50,
    introduction: 'Numbers in Indian Sign Language allow students to count, tell time, calculate money, and solve mathematical problems visually with dual-handed precision.',
    objectives: [
      'Master numbers 0 through 10 with clear finger configurations.',
      'Learn compound teenage numbers (11 to 20) with flick and twist motions.',
      'Count up to 100 using tens and units combinations.',
      'Practice mental addition using visual finger positions.'
    ],
    explanation: `ISL numerical counting follows an intuitive progression:
- 0: O shape with curled fingers and thumb.
- 1 to 5: Extended fingers starting with index (1), index + middle (2), thumb + index + middle (3), four fingers (4), and full open palm (5).
- 6 to 9: Unique touch points in ISL where thumb contacts pinky (6), ring finger (7), middle finger (8), and index finger (9).
- 10: Two palms touching or rapid flash of 1 and 0.
- 20: Index and thumb pinched twice like a bird beak.`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'ISL Numerical Counting 0 to 20',
    videoSubtitles: [
      { time: '0:01', text: 'Numbers 0 to 5 are shown with steady fingers facing the viewer.' },
      { time: '0:06', text: 'Notice the contact points for 6, 7, 8, and 9.' },
      { time: '0:12', text: 'For 10, both hands open together.' }
    ],
    interactiveActivity: {
      type: 'number-match',
      prompt: 'If you show an open 5-finger palm on your left hand and 3 fingers on your right hand, what total number do you represent?',
      options: ['8', '15', '53', '2'],
      correctAnswer: '8',
      feedback: 'Correct! 5 + 3 = 8.'
    },
    practiceQuestions: [
      {
        q: 'In ISL counting, which finger does the thumb touch to sign the number 6?',
        options: ['The pinky (little) finger', 'The index finger', 'The middle finger', 'The wrist'],
        correct: 0,
        explanation: 'In standard ISL counting, thumb touching the pinky represents number 6.'
      }
    ],
    quiz: {
      id: 'quiz-isl-num',
      title: 'ISL Number Quiz',
      questions: [
        {
          question: 'How is the number 20 signed in ISL?',
          options: ['Index finger and thumb pinching together twice', 'Showing two open hands ten times', 'Waving five fingers', 'Crossing both arms'],
          correctIndex: 0,
          explanation: 'Pinching the index and thumb together twice denotes 20 in ISL.'
        }
      ]
    }
  },

  {
    id: 'isl-greetings',
    category: 'deaf',
    level: 1,
    levelName: 'Level 1: Beginner',
    title: 'Daily Greetings & Polite Expressions',
    duration: '10 mins',
    xp: 50,
    introduction: 'Greetings are the heart of friendly social interaction. Learn how to say Hello (Namaste), Good Morning, Thank You, and Nice to Meet You in ISL with warmth and respect.',
    objectives: [
      'Greet peers and teachers respectfully with traditional Namaste and Good Morning signs.',
      'Express gratitude with "Thank You" and "You Are Welcome".',
      'Understand how facial expression reinforces the meaning of signs.',
      'Introduce yourself politely in basic social interactions.'
    ],
    explanation: `In Deaf culture, eye contact and positive facial expressions are essential elements of communication.
- Namaste: Both palms joined vertically in front of the chest, accompanied by a polite nod and genuine smile.
- Thank You: Fingertips of the flat right hand touch the chin, then move smoothly forward and outward toward the recipient.
- Good Morning: Combines the sign for "Good" (flat hand from chin downward onto left palm) with "Morning" (right arm rising like the sun over the horizon of the left arm).`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Social Greetings Demonstration in ISL',
    videoSubtitles: [
      { time: '0:01', text: 'Namaste: Bring palms together at chest level.' },
      { time: '0:05', text: 'Thank You: Touch chin and extend hand forward with a smile.' },
      { time: '0:10', text: 'Facial expressions convey sincerity and emotion.' }
    ],
    interactiveActivity: {
      type: 'greeting-match',
      prompt: 'When meeting a teacher at 9:00 AM, which sign combination should you use?',
      options: ['GOOD + MORNING + NAMASTE', 'SLEEP + HOME', 'STOP + WAIT', 'WATER + HUNGRY'],
      correctAnswer: 'GOOD + MORNING + NAMASTE',
      feedback: 'Great job! Starting the morning with a respectful greeting creates positive connection.'
    },
    practiceQuestions: [
      {
        q: 'Where does the hand start when signing "Thank You" in ISL?',
        options: ['Touching the chin with fingertips', 'At the waist', 'Behind the ear', 'Touching the knee'],
        correct: 0,
        explanation: 'Fingertips touch the chin or lips and then extend forward.'
      }
    ],
    quiz: {
      id: 'quiz-isl-greet',
      title: 'Greetings & Manners Quiz',
      questions: [
        {
          question: 'Why are facial expressions so critical in sign language?',
          options: ['They act as grammatical tone and show emotion, just like vocal inflection', 'They are only for decoration', 'They replace the hands entirely', 'They are not important'],
          correctIndex: 0,
          explanation: 'Facial expressions convey tone, questions, emphasis, and sincerity.'
        }
      ]
    }
  },

  // --- SPEECH DISABILITY / AAC LESSONS ---
  {
    id: 'aac-basics',
    category: 'speech',
    level: 1,
    levelName: 'Level 1: Beginner',
    title: 'Picture Board: Core Needs & Requests',
    duration: '10 mins',
    xp: 50,
    introduction: 'Communication is a fundamental right. For non-speaking students or those with speech difficulties, the Picture Communication Board (AAC) provides an empowering voice using visual symbols and instant text-to-speech.',
    objectives: [
      'Learn the 8 primary categories of the AAC communication board.',
      'Select individual cards to express immediate needs (e.g., Water, Food, Washroom, Help).',
      'Activate Text-to-Speech to have the platform voice your requests aloud.',
      'Understand Fitzgerald Key color-coding for effortless card finding.'
    ],
    explanation: `The SAHAAYA LEARN AAC board uses color-coded cards based on the internationally recognized Fitzgerald Key:
- Yellow: People and Pronouns ("I", "You", "Teacher", "Amma").
- Green: Action Verbs ("WANT", "NEED", "FEEL", "PLAY").
- Orange: Food and Everyday Objects ("WATER", "RICE", "BOOK").
- Blue: School and Places ("SCHOOL", "CLASSROOM").
- Red: Urgent Needs and Emergencies ("HELP ME", "PAIN", "EMERGENCY!").
When you click a card, it highlights and speaks the word clearly.`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Using Picture Cards for Independent Communication',
    videoSubtitles: [
      { time: '0:01', text: 'Select any card to hear it spoken instantly.' },
      { time: '0:05', text: 'Yellow cards are for who is speaking.' },
      { time: '0:09', text: 'Green cards are for actions and requests.' },
      { time: '0:13', text: 'Red cards are for urgent help and pain.' }
    ],
    interactiveActivity: {
      type: 'card-builder',
      prompt: 'Click the card that allows you to request drinking water when you are thirsty:',
      options: ['WATER (💧)', 'BOOK (📚)', 'SLEEP (😴)', 'PENCIL (✏️)'],
      correctAnswer: 'WATER (💧)',
      feedback: 'Superb! Selecting WATER immediately tells teachers and family what you need.'
    },
    practiceQuestions: [
      {
        q: 'What color border is used for Action Verbs like WANT, NEED, and FEEL on the AAC board?',
        options: ['Green', 'Red', 'Pink', 'Grey'],
        correct: 0,
        explanation: 'Green borders represent verbs and actions in AAC color categorization.'
      }
    ],
    quiz: {
      id: 'quiz-aac-1',
      title: 'AAC Picture Board Quiz',
      questions: [
        {
          question: 'If a student cannot speak verbally, how does the SAHAAYA LEARN board help them communicate?',
          options: ['By letting them select picture cards and playing clear audio speech', 'By forcing them to write long essays', 'By requiring someone else to guess', 'By ignoring their needs'],
          correctIndex: 0,
          explanation: 'Picture cards with instant text-to-speech give students an independent and clear voice.'
        }
      ]
    }
  },

  {
    id: 'aac-sentences',
    category: 'speech',
    level: 2,
    levelName: 'Level 2: Intermediate',
    title: 'Building Multi-Card Sentences (e.g. I + WANT + WATER)',
    duration: '15 mins',
    xp: 60,
    introduction: 'Beyond single words, you can assemble multiple picture cards into complete, expressive sentences. The Sentence Builder Ribbon strings words together and reads the entire sentence aloud with natural cadence.',
    objectives: [
      'Learn sentence formula: Subject + Verb + Object (e.g., I + WANT + WATER).',
      'Express polite requests by adding "PLEASE" and "THANK YOU".',
      'Use the Sentence Ribbon to clear, edit, and play back multi-card phrases.',
      'Construct complete statements for daily school and home life.'
    ],
    explanation: `Building sentences in AAC is like putting together building blocks:
1. Block 1 (Who?): Choose "I" or "WE" (Yellow card).
2. Block 2 (What action?): Choose "WANT", "NEED", or "FEEL" (Green card).
3. Block 3 (What thing?): Choose "WATER", "FOOD", "REST", or "HELP" (Orange or Red card).
4. Block 4 (Politeness): Add "PLEASE" (Yellow card).
Result: "I + WANT + WATER + PLEASE". Press Speak, and the speaker says: "I want water please."`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Sentence Construction Ribbon in Action',
    videoSubtitles: [
      { time: '0:01', text: 'Tap cards in order to build your thought.' },
      { time: '0:05', text: 'I + WANT + WATER + PLEASE.' },
      { time: '0:10', text: 'Press Speak to read the entire sentence smoothly.' }
    ],
    interactiveActivity: {
      type: 'sentence-construction',
      prompt: 'Arrange these cards in order to express that you are feeling happy today:',
      options: ['I + FEEL + HAPPY', 'HAPPY + I + FEEL', 'WATER + WANT + I', 'FEEL + I + REST'],
      correctAnswer: 'I + FEEL + HAPPY',
      feedback: 'Wonderful! "I FEEL HAPPY" is a complete, grammatically sound sentence.'
    },
    practiceQuestions: [
      {
        q: 'Which button reads the complete assembled sentence aloud using synthesized speech?',
        options: ['Speak Sentence button', 'Delete card', 'Clear board', 'Mute volume'],
        correct: 0,
        explanation: 'The Speak Sentence button reads all assembled cards from left to right.'
      }
    ],
    quiz: {
      id: 'quiz-aac-sentences',
      title: 'Sentence Builder Quiz',
      questions: [
        {
          question: 'Which sequence correctly asks a friend to play outside?',
          options: ['I + WANT + PLAY + OUTSIDE', 'OUTSIDE + WATER + NO', 'STOP + HELP + BOOK', 'MILK + RICE + EAT'],
          correctIndex: 0,
          explanation: '"I + WANT + PLAY + OUTSIDE" clearly communicates your desire to play.'
        }
      ]
    }
  },

  // --- LOW VISION / BLURRED VISION LESSONS ---
  {
    id: 'lv-math-shapes',
    category: 'low_vision',
    level: 1,
    levelName: 'Level 1: Beginner',
    title: 'Tactile Geometric Shapes & Properties',
    duration: '15 mins',
    xp: 50,
    introduction: 'Explore geometry through high-contrast outlines, edge-tracing tactile descriptions, and step-by-step audio narration. Designed specifically so students with low vision or blurred vision can understand shapes without strain.',
    objectives: [
      'Identify Circle, Triangle, Square, and Cylinder by vertex and edge counts.',
      'Listen to detailed audio descriptions of geometric properties.',
      'Use magnification and high-contrast color modes (Yellow on Black / Dark Mode).',
      'Solve geometry questions using auditory and tactile clues.'
    ],
    explanation: `Geometry is the study of shapes, sizes, and patterns.
- Circle: A perfectly round, continuous curve. It has 0 straight edges and 0 vertices (corners). Tracing around a coin gives you the feel of a circle.
- Triangle: A three-sided polygon with 3 straight edges and 3 corners. Triangles are exceptionally rigid structures used in bridges and roofs.
- Square: A four-sided polygon where all 4 sides are identical in length, and all 4 angles are 90 degrees.
- Cylinder: A 3D solid with two circular flat bases connected by a smooth curved surface, like a drinking glass or a drum.`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Audio-Described Geometric Shape Exploration',
    videoSubtitles: [
      { time: '0:01', text: 'Audio Description: A thick yellow equilateral triangle is displayed against dark background.' },
      { time: '0:06', text: 'Three corners are highlighted with bright pulsing touchpoints.' },
      { time: '0:12', text: 'Next, a square with four equal sides is introduced.' }
    ],
    interactiveActivity: {
      type: 'shape-identifier',
      prompt: 'Which shape has exactly 3 straight edges and 3 sharp corners (vertices)?',
      options: ['Triangle', 'Circle', 'Square', 'Cylinder'],
      correctAnswer: 'Triangle',
      feedback: 'Spot on! A triangle is defined by its 3 sides and 3 vertices.'
    },
    practiceQuestions: [
      {
        q: 'How many right angles (90 degrees) does a square have?',
        options: ['4 right angles', '3 right angles', '0 right angles', '1 right angle'],
        correct: 0,
        explanation: 'A square has four equal sides and four 90-degree right angles.'
      }
    ],
    quiz: {
      id: 'quiz-lv-shapes',
      title: 'Tactile Shapes Quiz',
      questions: [
        {
          question: 'If you roll an object smoothly across a flat desk without tipping, which shape is it likely to be?',
          options: ['A cylinder or sphere', 'A cube', 'A flat triangle', 'A square tile'],
          correctIndex: 0,
          explanation: 'Objects with continuous curved surfaces like cylinders and spheres roll smoothly.'
        }
      ]
    }
  },

  {
    id: 'lv-evs-plants',
    category: 'low_vision',
    level: 2,
    levelName: 'Level 2: Intermediate',
    title: 'The Lifecycle of Plants: Seeds to Flowers',
    duration: '18 mins',
    xp: 60,
    introduction: 'Plants are remarkable living organisms that feed and oxygenate our world. Learn the subterranean root system, the transport stem, leaf photosynthesis, and floral seed production with comprehensive audio narration.',
    objectives: [
      'Understand the functions of Roots, Stems, Leaves, Flowers, and Seeds.',
      'Explore the process of photosynthesis explained through audio descriptions.',
      'Understand why plants are vital for human and animal life.',
      'Test understanding with audio-supported interactive quizzes.'
    ],
    explanation: `A flowering plant consists of two major structural zones:
1. The Root System (Below Ground): Roots anchor the plant deep in the soil and act like a network of sponges drinking groundwater and minerals.
2. The Shoot System (Above Ground):
   - Stem: The sturdy central stalk that keeps the plant standing upright and transports water up and nutrients down.
   - Leaves: Nature's solar panels. Green leaves trap sunlight and use chlorophyll to transform carbon dioxide and water into food (glucose), while releasing pure Oxygen for us to breathe.
   - Flower: The reproductive organ that attracts pollinators like bees and butterflies to produce fruits and seeds.`,
    videoUrl: 'https://www.youtube.com/embed/g3Qo9W-xOcg?rel=0',
    videoTitle: 'Audio-Described Plant Growth & Photosynthesis',
    videoSubtitles: [
      { time: '0:01', text: 'Audio Description: A seed sprouts fine roots into the rich dark soil.' },
      { time: '0:07', text: 'A green shoot arches toward the sunlight, unfurling two vibrant leaves.' },
      { time: '0:14', text: 'Raindrops fall, feeding the root network below.' }
    ],
    interactiveActivity: {
      type: 'lifecycle-order',
      prompt: 'What part of the plant absorbs water and minerals from the soil?',
      options: ['Roots', 'Flower petals', 'Fruit peel', 'Tree bark'],
      correctAnswer: 'Roots',
      feedback: 'Correct! Roots anchor the plant and drink water and nutrients.'
    },
    practiceQuestions: [
      {
        q: 'What green pigment in leaves captures sunlight to make food during photosynthesis?',
        options: ['Chlorophyll', 'Melanin', 'Hemoglobin', 'Keratin'],
        correct: 0,
        explanation: 'Chlorophyll gives leaves their green color and traps solar energy.'
      }
    ],
    quiz: {
      id: 'quiz-lv-plants',
      title: 'Plant Lifecycle Quiz',
      questions: [
        {
          question: 'What do green leaves release into the air that all animals and humans need to breathe?',
          options: ['Oxygen', 'Carbon Dioxide', 'Salt', 'Helium'],
          correctIndex: 0,
          explanation: 'Photosynthesis produces vital Oxygen.'
        }
      ]
    }
  }
];
