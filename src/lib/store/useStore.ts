import { create } from "zustand";
// import type { SoundBankConfig } from "@/lib/audio/soundBanks";

/**
 * Global Application State using Zustand
 *
 * Manages:
 * - Current sound bank
 * - Audio settings (volume, effects)
 * - User preferences
 * - Connection state
 * - Recording state
 */

interface AudioSettings {
  volume: number;
  isMuted: boolean;
  reverb: number;
  delay: number;
  attack: number;
  release: number;
}

interface User {
  id: string;
  color: string;
  name?: string;
}

interface AppState {
  // Audio state
  currentSoundBank: string;
  audioSettings: AudioSettings;
  isAudioInitialized: boolean;

  // Multiplayer state
  isConnected: boolean;
  currentUser: User | null;
  onlineUsers: User[];

  // Recording state
  isRecording: boolean;
  recordedNotes: any[];

  // Actions
  setCurrentSoundBank: (bankId: string) => void;
  setVolume: (volume: number) => void;
  setMuted: (isMuted: boolean) => void;
  setReverb: (reverb: number) => void;
  setDelay: (delay: number) => void;
  setAttack: (attack: number) => void;
  setRelease: (release: number) => void;
  setAudioInitialized: (initialized: boolean) => void;
  setConnected: (connected: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  setOnlineUsers: (users: User[]) => void;
  startRecording: () => void;
  stopRecording: () => void;
  addRecordedNote: (note: any) => void;
  clearRecording: () => void;
}

/**
 * Main application store
 */
export const useStore = create<AppState>((set) => ({
  // Initial state
  currentSoundBank: "strings",
  audioSettings: {
    volume: 75,
    isMuted: false,
    reverb: 30,
    delay: 0,
    attack: 0.01,
    release: 0.5,
  },
  isAudioInitialized: false,
  isConnected: false,
  currentUser: null,
  onlineUsers: [],
  isRecording: false,
  recordedNotes: [],

  // Actions
  setCurrentSoundBank: (bankId) => set({ currentSoundBank: bankId }),

  setVolume: (volume) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, volume },
    })),

  setMuted: (isMuted) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, isMuted },
    })),

  setReverb: (reverb) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, reverb },
    })),

  setDelay: (delay) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, delay },
    })),

  setAttack: (attack) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, attack },
    })),

  setRelease: (release) =>
    set((state) => ({
      audioSettings: { ...state.audioSettings, release },
    })),

  setAudioInitialized: (initialized) =>
    set({ isAudioInitialized: initialized }),

  setConnected: (connected) => set({ isConnected: connected }),

  setCurrentUser: (user) => set({ currentUser: user }),

  setOnlineUsers: (users) => set({ onlineUsers: users }),

  startRecording: () => set({ isRecording: true }),

  stopRecording: () => set({ isRecording: false }),

  addRecordedNote: (note) =>
    set((state) => ({
      recordedNotes: [...state.recordedNotes, note],
    })),

  clearRecording: () => set({ recordedNotes: [] }),
}));
