// Practice and Assessment Data for SAHAAYA LEARN

export const practiceModules = [
  {
    id: 'prac-sign-id',
    title: 'Indian Sign Language: Sign Identification',
    category: 'deaf',
    type: 'sign-identification',
    description: 'Look at the hand position description or visual diagram and identify the correct ISL letter or word.',
    questions: [
      {
        id: 'psi-1',
        prompt: 'Which letter is formed when tips of both index fingers touch at the top, and thumbs touch at the base, creating a triangle?',
        visualHint: '🔺 Triangle A-frame with both hands at chest level',
        options: ['Letter A', 'Letter C', 'Letter H', 'Letter Z'],
        correctIndex: 0,
        explanation: 'Letter A in ISL is formed by bringing the tips of both index fingers and thumbs together into a triangle.'
      },
      {
        id: 'psi-2',
        prompt: 'You see an upright flat left palm, and the right hand traces two rounded loops against it. What letter is this?',
        visualHint: '📖 Left hand flat like paper, right hand forms two stacked loops',
        options: ['Letter B', 'Letter D', 'Letter P', 'Letter E'],
        correctIndex: 0,
        explanation: 'Letter B uses the left hand as an upright vertical stem while the right hand forms the two loops.'
      },
      {
        id: 'psi-3',
        prompt: 'When someone places both palms together in front of their chest and gives a polite nod, what are they saying?',
        visualHint: '🙏 Traditional Indian greeting at chest level with warm smile',
        options: ['Namaste / Hello', 'Goodbye', 'I am angry', 'Call doctor'],
        correctIndex: 0,
        explanation: 'Both palms joined in front of the chest is the universally understood Namaste/Hello greeting.'
      },
      {
        id: 'psi-4',
        prompt: 'To sign the word "WATER" in ISL, which hand gesture is used?',
        visualHint: '💧 Three fingers up forming W, gently tapping the chin twice',
        options: ['W-shaped hand tapping the chin twice', 'Two fists bumping', 'Pointing at the feet', 'Waving open palm'],
        correctIndex: 0,
        explanation: 'The letter W handshape tapping gently on the chin represents Water in Indian Sign Language.'
      }
    ]
  },

  {
    id: 'prac-num-rec',
    title: 'ISL Number Recognition (0 to 20)',
    category: 'deaf',
    type: 'number-recognition',
    description: 'Recognize the numerical value represented by ISL finger positions.',
    questions: [
      {
        id: 'pnr-1',
        prompt: 'In ISL counting, when the thumb touches the tip of the pinky (little finger), what number does it mean?',
        visualHint: '🤙 Thumb touching the 5th smallest digit',
        options: ['Number 6', 'Number 1', 'Number 9', 'Number 20'],
        correctIndex: 0,
        explanation: 'In the standard ISL numbering system, touching thumb to pinky represents 6, ring finger is 7, middle is 8, and index is 9.'
      },
      {
        id: 'pnr-2',
        prompt: 'Which gesture represents the number 20 in ISL?',
        visualHint: '🤏 Index finger and thumb pinching together twice like a beak',
        options: ['Index and thumb pinch twice', 'Showing two open hands', 'Holding up two fists', 'Waving five fingers'],
        correctIndex: 0,
        explanation: 'The pinch gesture with index and thumb repeated twice clearly denotes 20 in ISL.'
      },
      {
        id: 'pnr-3',
        prompt: 'If a student holds up a full 5-finger open hand and an index finger (1) on the other hand, what is the count?',
        visualHint: '🖐️ (5) + ☝️ (1)',
        options: ['6', '51', '15', '4'],
        correctIndex: 0,
        explanation: '5 plus 1 equals 6.'
      }
    ]
  },

  {
    id: 'prac-aac-sentence',
    title: 'Picture-Based Sentence Construction (AAC)',
    category: 'speech',
    type: 'sentence-construction',
    description: 'Assemble picture cards into meaningful sentences for non-speaking communication.',
    questions: [
      {
        id: 'pas-1',
        scenario: 'You are in the classroom, your water bottle is empty, and you feel very thirsty. What cards should you put together?',
        cardsAvailable: ['I', 'WANT', 'WATER', 'PLEASE', 'SLEEP', 'BOOK', 'RUN'],
        correctTokens: ['I', 'WANT', 'WATER', 'PLEASE'],
        explanation: '"I + WANT + WATER + PLEASE" clearly expresses your thirst and makes a polite request to the teacher or caregiver.'
      },
      {
        id: 'pas-2',
        scenario: 'Your stomach aches during study time and you need to see the school nurse or doctor. What sentence should you build?',
        cardsAvailable: ['I', 'FEEL', 'PAIN', 'STOMACH ACHE', 'HELP ME', 'PLAY', 'JUICE'],
        correctTokens: ['I', 'FEEL', 'PAIN', 'HELP ME'],
        explanation: '"I + FEEL + PAIN + HELP ME" immediately informs adults of your distress so you can get medical attention without delay.'
      },
      {
        id: 'pas-3',
        scenario: 'The teacher asks if you would like to read a storybook in the library. Form your positive answer:',
        cardsAvailable: ['YES', 'I', 'WANT', 'READ STORY', 'BOOK', 'NO', 'STOP'],
        correctTokens: ['YES', 'I', 'WANT', 'READ STORY'],
        explanation: '"YES + I + WANT + READ STORY" conveys enthusiasm and participation in reading activities.'
      }
    ]
  },

  {
    id: 'prac-match-following',
    title: 'Match-the-Following: Communication Symbols',
    category: 'speech',
    type: 'match-following',
    description: 'Match each everyday situation with the most appropriate communication card.',
    pairs: [
      { id: 'm-1', situation: 'Dry throat after running in the sun', answerCard: 'WATER (💧)' },
      { id: 'm-2', situation: 'Difficult math problem on the blackboard', answerCard: 'HELP ME (🆘)' },
      { id: 'm-3', situation: 'Need to use the restroom during class', answerCard: 'WASHROOM (🚻)' },
      { id: 'm-4', situation: 'Receiving a helpful pencil from a classmate', answerCard: 'THANK YOU (🌟)' }
    ],
    explanation: 'Associating your physical or emotional state with the corresponding AAC symbol allows rapid self-expression.'
  },

  {
    id: 'prac-audio-lv',
    title: 'Audio-Supported Sensory & Science Quiz',
    category: 'low_vision',
    type: 'audio-quiz',
    description: 'Listen to the audio questions or read the large high-contrast text to solve science and geometry challenges.',
    questions: [
      {
        id: 'palv-1',
        audioText: 'Question: You run your fingers along the smooth outer perimeter of a wooden plate. There are zero sharp corners and zero straight sides. What shape is this plate?',
        prompt: 'You trace an object with your hands: It has zero sharp corners and zero straight sides. What shape is it?',
        options: ['Circle', 'Triangle', 'Square', 'Cube'],
        correctIndex: 0,
        explanation: 'A circle is completely smooth and continuous with zero vertices (corners) and zero straight edges.'
      },
      {
        id: 'palv-2',
        audioText: 'Question: Green plant leaves take in sunlight, water, and carbon dioxide. What vital gas do they release that humans breathe in to stay alive?',
        prompt: 'What gas do plant leaves release into the air during photosynthesis that humans and animals need to breathe?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Steam'],
        correctIndex: 0,
        explanation: 'Plants release pure Oxygen into our atmosphere, acting as the essential green lungs of planet Earth.'
      },
      {
        id: 'palv-3',
        audioText: 'Question: When moving through a corridor with low vision, why do orientation specialists recommend trailing with the back of your hand against the wall?',
        prompt: 'Why should you trail along a wall using the back of your hand instead of your fingers pointing forward?',
        options: ['It prevents your fingers from snagging on switchboards or door frames', 'It makes you walk twice as fast', 'It generates electricity', 'It looks more formal'],
        correctIndex: 0,
        explanation: 'Using the back of your hand allows your relaxed hand to glide smoothly over obstacles and switchplates without injury.'
      }
    ]
  }
];
