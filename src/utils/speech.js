// Web Speech API text-to-speech utility for SAHAAYA LEARN

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSupported = !!this.synth;
    this.currentUtterance = null;
  }

  speak(text, options = {}) {
    if (!this.isSupported || !text) {
      if (options.onEnd) options.onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    // Clean text of markdown, punctuation artifacts
    const cleanText = text.replace(/[*_#`~]/g, '').trim();
    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = options.rate || 0.95; // Slightly slower default for accessibility
      utterance.pitch = options.pitch || 1.0;
      utterance.lang = options.lang || 'en-IN';

      // Pick natural or Indian English/English voice if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => 
        (v.lang.includes('en-IN') || v.lang.includes('hi-IN')) && !v.name.includes('Google')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error/cancelled', e);
        this.currentUtterance = null;
        if (options.onError) options.onError(e);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis failed:', err);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speechService = new SpeechService();
