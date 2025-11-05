import * as Tone from "tone";
import { getSoundBank, type SoundBankConfig } from "./soundBanks";

/**
 * Tone.js Audio Engine
 *
 * Manages all audio playback, sampling, and effects for the Mellotron.
 * Handles sound bank loading, note playback, and effects chain.
 * Implements authentic Mellotron tape behavior with 8-second playback limit.
 */

// Mellotron tape duration in seconds
const MELLOTRON_TAPE_DURATION = 8;

interface ActiveNote {
  startTime: number;
  timeoutId?: NodeJS.Timeout;
  onTapeEnd?: () => void;
}

class ToneEngine {
  private sampler: Tone.Sampler | null = null;
  private reverb: Tone.Reverb | null = null;
  private delay: Tone.FeedbackDelay | null = null;
  private volume: Tone.Volume | null = null;
  private isInitialized = false;
  private currentBankId: string | null = null;
  private loadingPromise: Promise<void> | null = null;
  private activeNotes: Map<string, ActiveNote> = new Map();

  /**
   * Initialize the audio engine
   * Must be called after a user interaction due to browser autoplay policies
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      await Tone.start();
      console.log("Tone.js audio context started");

      // Initialize effects chain: Volume -> Reverb -> Delay -> Destination
      this.volume = new Tone.Volume(0).toDestination();
      this.reverb = new Tone.Reverb({ decay: 2, wet: 0.3 }).connect(this.volume);
      this.delay = new Tone.FeedbackDelay("8n", 0.3).connect(this.reverb);

      // Load initial sound bank
      await this.loadSoundBank("strings");

      this.isInitialized = true;
      console.log("Audio engine initialized successfully");
    } catch (error) {
      console.error("Failed to initialize audio engine:", error);
      throw error;
    }
  }

  /**
   * Load a sound bank with samples
   * @param bankId - ID of the sound bank to load
   */
  async loadSoundBank(bankId: string) {
    // Prevent duplicate loading
    if (this.currentBankId === bankId && this.sampler) {
      console.log(`Sound bank "${bankId}" already loaded`);
      return;
    }

    // If already loading, wait for it
    if (this.loadingPromise) {
      await this.loadingPromise;
      return;
    }

    this.loadingPromise = this._loadSoundBankInternal(bankId);
    await this.loadingPromise;
    this.loadingPromise = null;
  }

  private async _loadSoundBankInternal(bankId: string) {
    console.log(`Loading sound bank: ${bankId}`);

    const soundBank = getSoundBank(bankId);
    if (!soundBank) {
      console.error(`Sound bank "${bankId}" not found`);
      return;
    }

    // Dispose of existing sampler
    if (this.sampler) {
      this.sampler.dispose();
      this.sampler = null;
    }

    // Create new sampler with sound bank samples
    // Configure for Mellotron behavior: immediate attack/release
    return new Promise<void>((resolve, reject) => {
      try {
        this.sampler = new Tone.Sampler({
          urls: soundBank.samples,
          baseUrl: `/samples/${bankId}/`,
          attack: 0, // Immediate attack (no fade-in)
          release: 0.05, // Very short release (simulates tape stopping)
          curve: "linear", // Linear envelope for natural tape sound
          onload: () => {
            console.log(`Sound bank "${bankId}" loaded successfully`);
            this.currentBankId = bankId;
            resolve();
          },
          onerror: (error) => {
            console.error(`Failed to load sound bank "${bankId}":`, error);
            // Create a simple synth as fallback
            this.createFallbackSynth();
            resolve(); // Resolve anyway so app doesn't hang
          },
        }).connect(this.delay!);
      } catch (error) {
        console.error(`Error creating sampler:`, error);
        this.createFallbackSynth();
        resolve();
      }
    });
  }

  /**
   * Create a simple synth as fallback when samples fail to load
   */
  private createFallbackSynth() {
    console.log("Creating fallback synth (samples not found)");
    // Use a simple PolySynth as fallback
    const polySynth = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.7,
        release: 0.8,
      },
    }).connect(this.delay!);

    // Wrap PolySynth to work like Sampler
    this.sampler = polySynth as any;
  }

  /**
   * Play a note (Mellotron tape behavior)
   * @param note - Note name (e.g., "C4", "A#5")
   * @param velocity - Volume (0-1)
   * @param onTapeEnd - Optional callback when tape reaches end (8 seconds)
   * Tape will play for maximum 8 seconds then auto-stop
   */
  playNote(note: string, velocity: number = 0.8, onTapeEnd?: () => void) {
    if (!this.isInitialized || !this.sampler) {
      console.warn("Audio engine not initialized or sampler not loaded");
      return;
    }

    // If note is already playing, don't restart (prevent duplicate)
    if (this.activeNotes.has(note)) {
      return;
    }

    try {
      // Ensure audio context is running
      if (Tone.context.state !== "running") {
        Tone.context.resume();
      }

      // Play the note
      this.sampler.triggerAttack(note, Tone.now(), velocity);

      // Track note start time
      const startTime = Date.now();

      // Set up auto-stop after tape duration (8 seconds)
      const timeoutId = setTimeout(() => {
        console.log(`Tape ended for ${note} after ${MELLOTRON_TAPE_DURATION}s`);

        // Call the callback before stopping
        if (onTapeEnd) {
          onTapeEnd();
        }

        this.stopNote(note, true); // true = tape ran out (not manual release)
      }, MELLOTRON_TAPE_DURATION * 1000);

      this.activeNotes.set(note, { startTime, timeoutId, onTapeEnd });
    } catch (error) {
      console.error(`Error playing note ${note}:`, error);
    }
  }

  /**
   * Stop a note (simulates tape rewind)
   * @param note - Note name (e.g., "C4", "A#5")
   * @param tapeEnded - True if tape ran out naturally, false if manually released
   */
  stopNote(note: string, tapeEnded: boolean = false) {
    if (!this.isInitialized || !this.sampler) return;

    const activeNote = this.activeNotes.get(note);
    if (!activeNote) return;

    try {
      // Clear timeout if stopping manually (key released before tape ended)
      if (!tapeEnded && activeNote.timeoutId) {
        clearTimeout(activeNote.timeoutId);
      }

      // Stop the note immediately (simulates tape stopping/rewinding)
      this.sampler.triggerRelease(note, Tone.now());

      // Remove from active notes
      this.activeNotes.delete(note);

      if (!tapeEnded) {
        console.log(`Tape rewound for ${note}`);
      }
    } catch (error) {
      console.error(`Error stopping note ${note}:`, error);
    }
  }

  /**
   * Set master volume
   * @param volume - Volume in decibels (-60 to 0)
   */
  setVolume(volume: number) {
    if (this.volume) {
      this.volume.volume.value = volume;
    }
  }

  /**
   * Set reverb amount
   * @param wet - Wet/dry mix (0-1)
   */
  setReverb(wet: number) {
    if (this.reverb) {
      this.reverb.wet.value = wet;
    }
  }

  /**
   * Set delay parameters
   * @param time - Delay time in seconds
   * @param feedback - Feedback amount (0-1)
   */
  setDelay(time: number, feedback: number) {
    if (this.delay) {
      this.delay.delayTime.value = time;
      this.delay.feedback.value = feedback;
    }
  }

  /**
   * Get initialization status
   */
  getIsInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Get current sound bank ID
   */
  getCurrentBankId(): string | null {
    return this.currentBankId;
  }

  /**
   * Get the current playback time for a note in seconds
   * Returns null if note is not playing
   */
  getNotePlaybackTime(note: string): number | null {
    const activeNote = this.activeNotes.get(note);
    if (!activeNote) return null;

    const elapsed = (Date.now() - activeNote.startTime) / 1000;
    return Math.min(elapsed, MELLOTRON_TAPE_DURATION);
  }

  /**
   * Get the remaining tape time for a note in seconds
   * Returns null if note is not playing
   */
  getNoteRemainingTime(note: string): number | null {
    const playbackTime = this.getNotePlaybackTime(note);
    if (playbackTime === null) return null;

    return MELLOTRON_TAPE_DURATION - playbackTime;
  }

  /**
   * Check if a note is currently playing
   */
  isNotePlaying(note: string): boolean {
    return this.activeNotes.has(note);
  }

  /**
   * Get the tape duration constant (8 seconds)
   */
  getTapeDuration(): number {
    return MELLOTRON_TAPE_DURATION;
  }

  /**
   * Clean up resources
   */
  dispose() {
    // Clear all active note timeouts
    this.activeNotes.forEach((activeNote) => {
      if (activeNote.timeoutId) {
        clearTimeout(activeNote.timeoutId);
      }
    });
    this.activeNotes.clear();

    this.sampler?.dispose();
    this.reverb?.dispose();
    this.delay?.dispose();
    this.volume?.dispose();
    this.isInitialized = false;
    this.currentBankId = null;
  }
}

// Export singleton instance
export const toneEngine = new ToneEngine();

// Hook for React components
export function useToneEngine() {
  return toneEngine;
}
