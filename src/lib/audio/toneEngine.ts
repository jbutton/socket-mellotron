import * as Tone from "tone";
// import { SoundBank } from "@/types/audio";

/**
 * Tone.js Audio Engine
 *
 * Manages all audio playback, sampling, and effects.
 *
 * Features to implement:
 * - Initialize Tone.js context
 * - Load sound bank samples
 * - Play/stop notes with proper ADSR envelope
 * - Apply effects (reverb, delay, filter)
 * - Master volume control
 * - Handle audio context resume (browser autoplay policies)
 */

class ToneEngine {
  private sampler: Tone.Sampler | null = null;
  private reverb: Tone.Reverb | null = null;
  private delay: Tone.FeedbackDelay | null = null;
  private volume: Tone.Volume | null = null;
  private isInitialized = false;

  /**
   * Initialize the audio engine
   * Must be called after a user interaction due to browser autoplay policies
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      await Tone.start();
      console.log("Tone.js audio context started");

      // Initialize effects chain
      this.volume = new Tone.Volume(0).toDestination();
      this.reverb = new Tone.Reverb({ decay: 2, wet: 0.3 });
      this.delay = new Tone.FeedbackDelay("8n", 0.3);

      // TODO: Load initial sound bank
      // this.loadSoundBank("strings");

      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize audio engine:", error);
    }
  }

  /**
   * Load a sound bank with samples
   * @param bankName - Name of the sound bank to load
   */
  async loadSoundBank(bankName: string) {
    // TODO: Load samples from /public/samples/{bankName}/
    // TODO: Create Tone.Sampler with loaded samples
    // TODO: Connect sampler to effects chain

    console.log(`Loading sound bank: ${bankName}`);

    // Example: Create sampler with sample URLs
    // this.sampler = new Tone.Sampler({
    //   urls: {
    //     C4: "C4.wav",
    //     D4: "D4.wav",
    //     E4: "E4.wav",
    //     // ... more samples
    //   },
    //   baseUrl: `/samples/${bankName}/`,
    //   onload: () => {
    //     console.log("Samples loaded");
    //   },
    // }).connect(this.reverb!);
  }

  /**
   * Play a note
   * @param note - Note name (e.g., "C4", "A#5")
   * @param velocity - Volume (0-1)
   */
  playNote(note: string, velocity: number = 0.8) {
    if (!this.isInitialized || !this.sampler) {
      console.warn("Audio engine not initialized");
      return;
    }

    // TODO: Trigger note with sampler
    // this.sampler.triggerAttack(note, Tone.now(), velocity);
    console.log(`Playing note: ${note} at velocity ${velocity}`);
  }

  /**
   * Stop a note
   * @param note - Note name (e.g., "C4", "A#5")
   */
  stopNote(note: string) {
    if (!this.isInitialized || !this.sampler) return;

    // TODO: Release note with sampler
    // this.sampler.triggerRelease(note, Tone.now());
    console.log(`Stopping note: ${note}`);
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
   * Clean up resources
   */
  dispose() {
    this.sampler?.dispose();
    this.reverb?.dispose();
    this.delay?.dispose();
    this.volume?.dispose();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const toneEngine = new ToneEngine();

// Hook for React components
export function useToneEngine() {
  return toneEngine;
}
