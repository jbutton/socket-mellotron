import * as Tone from "tone";
import { getSoundBank, type SoundBankConfig } from "./soundBanks";

/**
 * Tone.js Audio Engine
 *
 * Manages all audio playback, sampling, and effects for the Mellotron.
 * Handles sound bank loading, note playback, and effects chain.
 */

class ToneEngine {
  private sampler: Tone.Sampler | null = null;
  private reverb: Tone.Reverb | null = null;
  private delay: Tone.FeedbackDelay | null = null;
  private volume: Tone.Volume | null = null;
  private isInitialized = false;
  private currentBankId: string | null = null;
  private loadingPromise: Promise<void> | null = null;

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
    return new Promise<void>((resolve, reject) => {
      try {
        this.sampler = new Tone.Sampler({
          urls: soundBank.samples,
          baseUrl: `/samples/${bankId}/`,
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
   * Play a note
   * @param note - Note name (e.g., "C4", "A#5")
   * @param velocity - Volume (0-1)
   */
  playNote(note: string, velocity: number = 0.8) {
    if (!this.isInitialized || !this.sampler) {
      console.warn("Audio engine not initialized or sampler not loaded");
      return;
    }

    try {
      // Ensure audio context is running
      if (Tone.context.state !== "running") {
        Tone.context.resume();
      }

      this.sampler.triggerAttack(note, Tone.now(), velocity);
    } catch (error) {
      console.error(`Error playing note ${note}:`, error);
    }
  }

  /**
   * Stop a note
   * @param note - Note name (e.g., "C4", "A#5")
   */
  stopNote(note: string) {
    if (!this.isInitialized || !this.sampler) return;

    try {
      this.sampler.triggerRelease(note, Tone.now());
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
   * Clean up resources
   */
  dispose() {
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
