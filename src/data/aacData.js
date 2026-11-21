// Augmentative & Alternative Communication (AAC) Picture Board Data for Speech Disability

export const aacCategories = [
  { id: 'needs', name: 'Needs & Requests', color: 'border-amber-400 bg-amber-50 text-amber-900', icon: '✋' },
  { id: 'food', name: 'Food & Water', color: 'border-orange-400 bg-orange-50 text-orange-900', icon: '🍲' },
  { id: 'emotions', name: 'Emotions & Feelings', color: 'border-purple-400 bg-purple-50 text-purple-900', icon: '😊' },
  { id: 'health', name: 'Health & Pain', color: 'border-red-400 bg-red-50 text-red-900', icon: '🩺' },
  { id: 'daily', name: 'Daily Activities', color: 'border-emerald-400 bg-emerald-50 text-emerald-900', icon: '🏃' },
  { id: 'school', name: 'School & Study', color: 'border-blue-400 bg-blue-50 text-blue-900', icon: '🎒' },
  { id: 'family', name: 'Family & People', color: 'border-pink-400 bg-pink-50 text-pink-900', icon: '👨‍👩‍👧' },
  { id: 'emergency', name: 'Emergency', color: 'border-rose-600 bg-rose-50 text-rose-900 font-bold', icon: '🚨' }
];

export const aacCards = [
  // Core Grammar / Functional Words (Fitzgerald Key styled)
  { id: 'c-i', text: 'I', category: 'needs', type: 'pronoun', color: 'bg-amber-100 border-amber-400 text-amber-950', icon: '👤', spoken: 'I' },
  { id: 'c-you', text: 'You', category: 'needs', type: 'pronoun', color: 'bg-amber-100 border-amber-400 text-amber-950', icon: '👉', spoken: 'You' },
  { id: 'c-want', text: 'WANT', category: 'needs', type: 'verb', color: 'bg-green-100 border-green-500 text-green-950', icon: '🤲', spoken: 'want' },
  { id: 'c-need', text: 'NEED', category: 'needs', type: 'verb', color: 'bg-green-100 border-green-500 text-green-950', icon: '❗', spoken: 'need' },
  { id: 'c-feel', text: 'FEEL', category: 'needs', type: 'verb', color: 'bg-green-100 border-green-500 text-green-950', icon: '💓', spoken: 'feel' },
  { id: 'c-please', text: 'PLEASE', category: 'needs', type: 'modifier', color: 'bg-yellow-100 border-yellow-400 text-yellow-950', icon: '🙏', spoken: 'please' },
  { id: 'c-help', text: 'HELP ME', category: 'needs', type: 'action', color: 'bg-red-100 border-red-500 text-red-950', icon: '🆘', spoken: 'help me' },
  { id: 'c-stop', text: 'STOP', category: 'needs', type: 'action', color: 'bg-red-100 border-red-500 text-red-950', icon: '🛑', spoken: 'stop' },
  { id: 'c-yes', text: 'YES', category: 'needs', type: 'social', color: 'bg-emerald-100 border-emerald-500 text-emerald-950', icon: '✅', spoken: 'yes' },
  { id: 'c-no', text: 'NO', category: 'needs', type: 'social', color: 'bg-rose-100 border-rose-500 text-rose-950', icon: '❌', spoken: 'no' },
  { id: 'c-wait', text: 'WAIT', category: 'needs', type: 'action', color: 'bg-amber-100 border-amber-500 text-amber-950', icon: '⏳', spoken: 'wait a moment' },
  { id: 'c-more', text: 'MORE', category: 'needs', type: 'modifier', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '➕', spoken: 'more please' },
  { id: 'c-finished', text: 'FINISHED', category: 'needs', type: 'action', color: 'bg-slate-100 border-slate-400 text-slate-900', icon: '🏁', spoken: 'I am all done' },

  // Food & Water
  { id: 'c-water', text: 'WATER', category: 'food', type: 'noun', color: 'bg-sky-100 border-sky-400 text-sky-950', icon: '💧', spoken: 'water' },
  { id: 'c-food', text: 'FOOD', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🍲', spoken: 'food' },
  { id: 'c-rice', text: 'RICE', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🍚', spoken: 'rice' },
  { id: 'c-roti', text: 'ROTI / BREAD', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🫓', spoken: 'roti' },
  { id: 'c-milk', text: 'MILK', category: 'food', type: 'noun', color: 'bg-sky-100 border-sky-400 text-sky-950', icon: '🥛', spoken: 'milk' },
  { id: 'c-fruits', text: 'FRUITS', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🍎', spoken: 'fruits' },
  { id: 'c-juice', text: 'JUICE', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🧃', spoken: 'fruit juice' },
  { id: 'c-snack', text: 'SNACK', category: 'food', type: 'noun', color: 'bg-orange-100 border-orange-400 text-orange-950', icon: '🍪', spoken: 'snack' },
  { id: 'c-hungry', text: 'I AM HUNGRY', category: 'food', type: 'phrase', color: 'bg-orange-200 border-orange-500 text-orange-950 font-semibold', icon: '😋', spoken: 'I am hungry, I want to eat' },
  { id: 'c-thirsty', text: 'I AM THIRSTY', category: 'food', type: 'phrase', color: 'bg-sky-200 border-sky-500 text-sky-950 font-semibold', icon: '🥤', spoken: 'I am thirsty, please give me water' },

  // Emotions
  { id: 'c-happy', text: 'HAPPY', category: 'emotions', type: 'adjective', color: 'bg-purple-100 border-purple-400 text-purple-950', icon: '😄', spoken: 'happy' },
  { id: 'c-sad', text: 'SAD', category: 'emotions', type: 'adjective', color: 'bg-purple-100 border-purple-400 text-purple-950', icon: '😢', spoken: 'sad' },
  { id: 'c-angry', text: 'ANGRY', category: 'emotions', type: 'adjective', color: 'bg-rose-100 border-rose-400 text-rose-950', icon: '😠', spoken: 'angry' },
  { id: 'c-scared', text: 'SCARED', category: 'emotions', type: 'adjective', color: 'bg-purple-100 border-purple-400 text-purple-950', icon: '😨', spoken: 'scared' },
  { id: 'c-tired', text: 'TIRED', category: 'emotions', type: 'adjective', color: 'bg-slate-100 border-slate-400 text-slate-900', icon: '😴', spoken: 'tired' },
  { id: 'c-confused', text: 'CONFUSED', category: 'emotions', type: 'adjective', color: 'bg-amber-100 border-amber-400 text-amber-950', icon: '🤔', spoken: 'confused, I do not understand' },
  { id: 'c-calm', text: 'CALM / PEACEFUL', category: 'emotions', type: 'adjective', color: 'bg-emerald-100 border-emerald-400 text-emerald-950', icon: '😌', spoken: 'calm and peaceful' },

  // Health & Pain
  { id: 'c-pain', text: 'PAIN / HURTS', category: 'health', type: 'noun', color: 'bg-red-100 border-red-500 text-red-950', icon: '⚡', spoken: 'I have pain' },
  { id: 'c-headache', text: 'HEADACHE', category: 'health', type: 'noun', color: 'bg-red-100 border-red-500 text-red-950', icon: '🤕', spoken: 'my head hurts' },
  { id: 'c-stomach', text: 'STOMACH ACHE', category: 'health', type: 'noun', color: 'bg-red-100 border-red-500 text-red-950', icon: '🤢', spoken: 'my stomach hurts' },
  { id: 'c-fever', text: 'FEVER / HOT', category: 'health', type: 'noun', color: 'bg-red-100 border-red-500 text-red-950', icon: '🤒', spoken: 'I have a fever' },
  { id: 'c-medicine', text: 'MEDICINE', category: 'health', type: 'noun', color: 'bg-red-100 border-red-500 text-red-950', icon: '💊', spoken: 'medicine' },
  { id: 'c-rest', text: 'REST / SLEEP', category: 'health', type: 'action', color: 'bg-indigo-100 border-indigo-400 text-indigo-950', icon: '🛌', spoken: 'I need to rest' },
  { id: 'c-doctor', text: 'DOCTOR', category: 'health', type: 'noun', color: 'bg-cyan-100 border-cyan-500 text-cyan-950', icon: '👩‍⚕️', spoken: 'call a doctor' },

  // Daily Activities
  { id: 'c-toilet', text: 'WASHROOM / TOILET', category: 'daily', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '🚻', spoken: 'I need to use the washroom' },
  { id: 'c-outside', text: 'GO OUTSIDE', category: 'daily', type: 'action', color: 'bg-emerald-100 border-emerald-400 text-emerald-950', icon: '🌳', spoken: 'I want to go outside' },
  { id: 'c-play', text: 'PLAY', category: 'daily', type: 'action', color: 'bg-amber-100 border-amber-400 text-amber-950', icon: '⚽', spoken: 'play' },
  { id: 'c-washhands', text: 'WASH HANDS', category: 'daily', type: 'action', color: 'bg-cyan-100 border-cyan-400 text-cyan-950', icon: '🧼', spoken: 'wash my hands' },
  { id: 'c-bath', text: 'TAKE A BATH', category: 'daily', type: 'action', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '🚿', spoken: 'take a bath' },

  // School
  { id: 'c-school', text: 'SCHOOL', category: 'school', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '🏫', spoken: 'school' },
  { id: 'c-teacher', text: 'TEACHER', category: 'school', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '👩‍🏫', spoken: 'teacher' },
  { id: 'c-book', text: 'BOOK', category: 'school', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '📚', spoken: 'book' },
  { id: 'c-pen', text: 'PEN / PENCIL', category: 'school', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '✏️', spoken: 'pen and pencil' },
  { id: 'c-bag', text: 'SCHOOL BAG', category: 'school', type: 'noun', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '🎒', spoken: 'school bag' },
  { id: 'c-read', text: 'READ STORY', category: 'school', type: 'action', color: 'bg-blue-100 border-blue-400 text-blue-950', icon: '📖', spoken: 'read a story' },

  // Family & People
  { id: 'c-mother', text: 'MOTHER / AMMA', category: 'family', type: 'noun', color: 'bg-pink-100 border-pink-400 text-pink-950', icon: '👩', spoken: 'mother' },
  { id: 'c-father', text: 'FATHER / APPA', category: 'family', type: 'noun', color: 'bg-pink-100 border-pink-400 text-pink-950', icon: '👨', spoken: 'father' },
  { id: 'c-brother', text: 'BROTHER', category: 'family', type: 'noun', color: 'bg-pink-100 border-pink-400 text-pink-950', icon: '👦', spoken: 'brother' },
  { id: 'c-sister', text: 'SISTER', category: 'family', type: 'noun', color: 'bg-pink-100 border-pink-400 text-pink-950', icon: '👧', spoken: 'sister' },
  { id: 'c-friend', text: 'FRIEND', category: 'family', type: 'noun', color: 'bg-pink-100 border-pink-400 text-pink-950', icon: '🤝', spoken: 'friend' },

  // Emergency
  { id: 'c-em-help', text: 'EMERGENCY HELP!', category: 'emergency', type: 'phrase', color: 'bg-red-600 text-white border-red-800 font-bold', icon: '🚨', spoken: 'Emergency! I need immediate help!' },
  { id: 'c-em-lost', text: 'I AM LOST', category: 'emergency', type: 'phrase', color: 'bg-red-500 text-white border-red-700 font-bold', icon: '📍', spoken: 'I am lost, please help me find my family' },
  { id: 'c-em-police', text: 'CALL POLICE', category: 'emergency', type: 'phrase', color: 'bg-red-700 text-white border-red-900 font-bold', icon: '👮', spoken: 'Please call the police immediately' },
  { id: 'c-em-ambulance', text: 'CALL AMBULANCE', category: 'emergency', type: 'phrase', color: 'bg-red-700 text-white border-red-900 font-bold', icon: '🚑', spoken: 'Please call an ambulance' }
];

export const quickPhrases = [
  { id: 'qp-1', text: 'I need help.', icon: '🆘', spoken: 'I need help, please.' },
  { id: 'qp-2', text: 'I am hungry.', icon: '🍲', spoken: 'I am hungry, I want to eat.' },
  { id: 'qp-3', text: 'I am thirsty.', icon: '💧', spoken: 'I am thirsty, please give me water.' },
  { id: 'qp-4', text: 'I am not feeling well.', icon: '🤒', spoken: 'I am not feeling well, I need to see a doctor or rest.' },
  { id: 'qp-5', text: 'I want to go outside.', icon: '🌳', spoken: 'I want to go outside to get fresh air.' },
  { id: 'qp-6', text: 'I don\'t understand.', icon: '❓', spoken: 'I don\'t understand this, please explain it simply.' },
  { id: 'qp-7', text: 'Please help me.', icon: '🙏', spoken: 'Please help me with this.' },
  { id: 'qp-8', text: 'Thank you very much!', icon: '🌟', spoken: 'Thank you very much!' }
];

export const speechCommunicationScenarios = [
  {
    id: 'comm-1',
    title: 'Expressing Discomfort or Illness',
    description: 'When you are in class and feel dizzy or have a stomach ache.',
    targetSentence: ['I', 'FEEL', 'NOT WELL', 'STOMACH ACHE'],
    prompt: 'You are sitting in the classroom and your stomach hurts. Construct your message for the teacher:',
    correctSequence: ['c-i', 'c-feel', 'c-stomach', 'c-help'],
    explanation: 'Selecting "I" + "FEEL" + "STOMACH ACHE" + "HELP ME" immediately informs the teacher of your pain without needing to speak.'
  },
  {
    id: 'comm-2',
    title: 'Asking for Water in Canteen',
    description: 'When you finish sports practice and need a drink.',
    targetSentence: ['I', 'WANT', 'WATER', 'PLEASE'],
    prompt: 'You are at the water station and need a refill for your bottle:',
    correctSequence: ['c-i', 'c-want', 'c-water', 'c-please'],
    explanation: '"I WANT WATER PLEASE" is polite, precise, and immediately triggers clear text-to-speech audio.'
  },
  {
    id: 'comm-3',
    title: 'Expressing Confusion in a Lesson',
    description: 'When the teacher explains a math formula too quickly.',
    targetSentence: ['I', 'NOT UNDERSTAND', 'PLEASE', 'HELP ME'],
    prompt: 'The teacher asks if everyone understood. Tell the teacher you need simple clarification:',
    correctSequence: ['c-i', 'c-confused', 'c-please', 'c-help'],
    explanation: 'Using the AAC board allows you to advocate for yourself confidently and independently.'
  }
];

export const speechAcademicSubjects = [
  {
    id: 'speech-acad-vocab',
    title: 'English Visual Vocabulary & Symbol Matching',
    description: 'Learn English vocabulary through symbol association, word cards, and sentence building without speech demands.',
    activities: ['Picture to Word Matching', 'Complete the Sentence with Symbol Cards', 'Categorization by Type']
  },
  {
    id: 'speech-acad-math',
    title: 'Interactive Visual Mathematics',
    description: 'Solve arithmetic equations, identify geometrical shapes, and measure quantities using interactive visual counters.',
    activities: ['Tap and Count Tokens', 'Symbolic Word Problems', 'Shape Sorting']
  },
  {
    id: 'speech-acad-evs',
    title: 'Environmental Studies Through Symbol Exploration',
    description: 'Explore nature, animals, ecosystems, and weather with non-verbal interactive diagrams.',
    activities: ['Habitat Matching (Land, Water, Air)', 'Weather Chart Builder', 'Food Chain Sequences']
  },
  {
    id: 'speech-acad-life',
    title: 'Everyday Self-Advocacy & Life Skills',
    description: 'Master practical daily routines, shopping lists, transportation cards, and personal safety.',
    activities: ['Ordering at a Restaurant with AAC', 'Bus Route Selection', 'Emergency Alert Card Activation']
  }
];
