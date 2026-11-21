import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'sahaaya_learn_platform_v2';
const ACCOUNTS_STORAGE_KEY = 'sahaaya_accounts_v2';

const emptyProgress = {
  completedLessons: [],
  currentLessonId: null,
  quizScores: {},
  practiceScores: {},
  unlockedLevels: {
    deaf: 1,
    speech: 1,
    low_vision: 1
  },
  xp: 0,
  recentLessons: [],
  certificates: []
};

const defaultAccessibility = {
  fontSize: 100, // 100, 125, 150, 175, 200, 225
  contrastMode: 'normal', // 'normal', 'dark', 'yellow-black', 'high-contrast-light', 'blue-filter'
  zoom: 1.0,
  dyslexicFont: false,
  ttsRate: 0.9,
  subtitles: true,
  screenReaderMode: false,
  focusOutline: true
};

export const AppProvider = ({ children }) => {
  // Accounts directory in localStorage
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active current user profile or null (not logged in)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_active_user`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Accessibility state
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_a11y`);
      return saved ? JSON.parse(saved) : defaultAccessibility;
    } catch {
      return defaultAccessibility;
    }
  });

  const [currentPage, setCurrentPage] = useState('home');
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [accessNotice, setAccessNotice] = useState(null);

  // Sync active user to localStorage and update in accounts list
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(`${STORAGE_KEY}_active_user`, JSON.stringify(currentUser));
        // Update account entry
        setAccounts(prev => {
          const exists = prev.some(a => a.id === currentUser.id);
          const updated = exists 
            ? prev.map(a => a.id === currentUser.id ? currentUser : a)
            : [...prev, currentUser];
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      } else {
        localStorage.removeItem(`${STORAGE_KEY}_active_user`);
      }
    } catch (e) {
      console.warn('Failed saving active user', e);
    }
  }, [currentUser]);

  // Sync accessibility settings
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_a11y`, JSON.stringify(accessibility));
    } catch (e) {
      console.warn('Failed saving a11y', e);
    }
  }, [accessibility]);

  // Apply HTML class and style for accessibility
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-normal', 'theme-dark', 'theme-yellow-black', 'theme-high-contrast-light', 'theme-blue-filter');
    root.classList.add(`theme-${accessibility.contrastMode}`);
    root.style.fontSize = `${accessibility.fontSize}%`;

    if (accessibility.dyslexicFont) {
      document.body.classList.add('font-accessible');
    } else {
      document.body.classList.remove('font-accessible');
    }
  }, [accessibility]);

  // Register New User (Starts with 0 fake data)
  const registerUser = (userData) => {
    const newId = 'student_' + Date.now();
    const primary = userData.primaryCategory || (userData.disabilities && userData.disabilities[0]) || 'deaf';

    const newUser = {
      id: newId,
      name: userData.name.trim(),
      age: Number(userData.age) || 12,
      preferredLanguage: userData.preferredLanguage || 'English',
      disabilities: userData.disabilities && userData.disabilities.length > 0 ? userData.disabilities : [primary],
      primaryCategory: primary,
      avatar: userData.avatar || '🌟',
      pin: userData.pin ? String(userData.pin).trim() : '',
      registeredAt: new Date().toISOString(),
      progress: {
        ...emptyProgress,
        currentLessonId: primary === 'deaf' ? 'isl-alpha' : primary === 'speech' ? 'aac-basics' : 'lv-math-shapes'
      }
    };

    setCurrentUser(newUser);
    setCurrentLessonId(newUser.progress.currentLessonId);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newUser;
  };

  // Login Existing User
  const loginUser = (studentIdOrName, pin = '') => {
    const found = accounts.find(a => 
      a.id === studentIdOrName || 
      a.name.toLowerCase() === studentIdOrName.toLowerCase().trim()
    );

    if (!found) {
      return { success: false, error: 'Student profile not found. Please register as a new student.' };
    }

    if (found.pin && pin && found.pin !== pin) {
      return { success: false, error: 'Incorrect PIN. Please try again.' };
    }

    setCurrentUser(found);
    if (found.progress && found.progress.currentLessonId) {
      setCurrentLessonId(found.progress.currentLessonId);
    }
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return { success: true, user: found };
  };

  // Logout
  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentLessonId(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  // Disability Access Guard: Checks if student is allowed to view target category
  const canAccessCategory = (catId) => {
    if (!currentUser) return false;
    return currentUser.disabilities.includes(catId);
  };

  // Navigation with Disability Isolation Enforcement
  const navigateTo = (page, params = {}) => {
    // If not logged in, gate learning pages
    const protectedPages = ['dashboard', 'deaf', 'speech', 'low_vision', 'lesson', 'practice', 'progress'];
    if (!currentUser && protectedPages.includes(page)) {
      setAuthMode('login');
      setCurrentPage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Enforce disability separation: A disability page shouldn't be visible or accessible by students of another disability
    if (currentUser) {
      if (page === 'deaf' && !currentUser.disabilities.includes('deaf')) {
        setAccessNotice('This section is tailored exclusively for Deaf and Hard-of-Hearing students. You have been redirected to your registered learning hub.');
        page = currentUser.primaryCategory;
      } else if (page === 'speech' && !currentUser.disabilities.includes('speech')) {
        setAccessNotice('This section is tailored exclusively for Speech Disability / AAC communication. You have been redirected to your registered learning hub.');
        page = currentUser.primaryCategory;
      } else if (page === 'low_vision' && !currentUser.disabilities.includes('low_vision')) {
        setAccessNotice('This section is tailored exclusively for Low Vision & Tactile learning. You have been redirected to your registered learning hub.');
        page = currentUser.primaryCategory;
      }
    }

    if (params.lessonId) {
      setCurrentLessonId(params.lessonId);
      if (currentUser && params.lessonTitle) {
        setCurrentUser(prev => {
          const currentRecent = prev.progress.recentLessons || [];
          const filtered = currentRecent.filter(l => l.id !== params.lessonId);
          return {
            ...prev,
            progress: {
              ...prev.progress,
              currentLessonId: params.lessonId,
              recentLessons: [
                {
                  id: params.lessonId,
                  title: params.lessonTitle,
                  category: params.category || prev.primaryCategory,
                  date: 'Just now'
                },
                ...filtered.slice(0, 5)
              ]
            }
          };
        });
      }
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete a lesson (Real progression, no fake data)
  const completeLesson = (lessonId, earnedXp = 50) => {
    if (!currentUser) return;

    setCurrentUser(prev => {
      const prog = prev.progress || emptyProgress;
      const alreadyCompleted = prog.completedLessons.includes(lessonId);
      const newCompleted = alreadyCompleted ? prog.completedLessons : [...prog.completedLessons, lessonId];
      const newXp = alreadyCompleted ? prog.xp : prog.xp + earnedXp;

      // Unlock progression based on actual completed count
      const unlockedLevels = { ...prog.unlockedLevels };
      const cat = prev.primaryCategory;
      if (newCompleted.length >= 2 && unlockedLevels[cat] < 2) unlockedLevels[cat] = 2;
      if (newCompleted.length >= 4 && unlockedLevels[cat] < 3) unlockedLevels[cat] = 3;

      // Award certificates strictly upon genuine lesson completions
      const certificates = [...prog.certificates];
      if (newCompleted.length >= 2 && !certificates.includes('cert-level-1')) {
        certificates.push('cert-level-1');
      }
      if (newCompleted.length >= 4 && !certificates.includes('cert-level-2')) {
        certificates.push('cert-level-2');
      }
      if (newCompleted.length >= 6 && !certificates.includes('cert-level-3')) {
        certificates.push('cert-level-3');
      }

      return {
        ...prev,
        progress: {
          ...prog,
          completedLessons: newCompleted,
          xp: newXp,
          unlockedLevels,
          certificates
        }
      };
    });
  };

  // Record quiz score (Real data)
  const recordQuizScore = (quizId, score, total) => {
    if (!currentUser) return;
    const percentage = Math.round((score / total) * 100);
    const date = new Date().toISOString().split('T')[0];

    setCurrentUser(prev => {
      const prog = prev.progress || emptyProgress;
      return {
        ...prev,
        progress: {
          ...prog,
          xp: prog.xp + score * 10,
          quizScores: {
            ...prog.quizScores,
            [quizId]: { score, total, percentage, date }
          }
        }
      };
    });
  };

  const updateAccessibility = (newSettings) => {
    setAccessibility(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        profile: currentUser, // backwards compatibility
        progress: currentUser ? currentUser.progress : emptyProgress,
        accounts,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        canAccessCategory,
        completeLesson,
        recordQuizScore,
        accessibility,
        updateAccessibility,
        currentPage,
        currentLessonId,
        authMode,
        setAuthMode,
        accessNotice,
        setAccessNotice,
        navigateTo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
