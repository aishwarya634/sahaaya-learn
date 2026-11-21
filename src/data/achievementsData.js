// Achievements, Badges, and Certificates for SAHAAYA LEARN

export const certificatesList = [
  {
    id: 'cert-level-1',
    level: 1,
    title: 'Certificate of Foundation Achievement: Level 1',
    subtitle: 'Beginner Inclusivity & Communication Milestone',
    description: 'Awarded for demonstrating foundational mastery in Indian Sign Language basics, AAC symbol communication, or accessible sensory learning.',
    criteria: 'Complete at least 2 foundational lessons and score 70%+ on a beginner quiz.',
    badgeIcon: '🥉',
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'cert-level-2',
    level: 2,
    title: 'Certificate of Competence: Level 2',
    subtitle: 'Intermediate Everyday Dialogue & Academic Skills',
    description: 'Awarded for constructing complex sentences, mastering everyday scenarios, and exploring accessible science & mathematics.',
    criteria: 'Complete at least 4 lessons across multiple modules and maintain high quiz accuracy.',
    badgeIcon: '🥈',
    color: 'from-blue-600 to-indigo-500'
  },
  {
    id: 'cert-level-3',
    level: 3,
    title: 'Certificate of Independent Mastery: Level 3',
    subtitle: 'Advanced Self-Advocacy & Independent Learning Excellence',
    description: 'Awarded for demonstrating full communicative autonomy, mastering life safety skills, and completing advanced comprehensive evaluations.',
    criteria: 'Complete 6+ lessons and score 85%+ across all practice modules.',
    badgeIcon: '🥇',
    color: 'from-purple-600 to-pink-500'
  }
];

export const badgesList = [
  { id: 'b-first-sign', title: 'First Sign Master', description: 'Learned the ISL Alphabet from A to Z', icon: '🤟', category: 'deaf' },
  { id: 'b-number-star', title: 'Counting Champion', description: 'Counted 0 to 20 in Indian Sign Language', icon: '🔢', category: 'deaf' },
  { id: 'b-voice-builder', title: 'My Voice My Power', description: 'Assembled first 4-card sentence in AAC', icon: '🗣️', category: 'speech' },
  { id: 'b-speedy-speaker', title: 'Text-to-Speech Pioneer', description: 'Utilized synthesized audio for independent self-advocacy', icon: '🔊', category: 'speech' },
  { id: 'b-tactile-detective', title: 'Tactile Detective', description: 'Identified all 4 geometric shapes by edge count', icon: '📐', category: 'low_vision' },
  { id: 'b-green-scholar', title: 'EVS Scholar', description: 'Mastered the audio-guided Plant Lifecycle', icon: '🌱', category: 'low_vision' },
  { id: 'b-perfect-score', title: 'Quiz Whiz', description: 'Achieved 100% on any practice evaluation', icon: '🌟', category: 'all' }
];
