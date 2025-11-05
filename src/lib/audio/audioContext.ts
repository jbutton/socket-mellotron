/**
 * Audio Context Management
 *
 * Handles browser audio context lifecycle and autoplay policies.
 * Modern browsers require user interaction before playing audio.
 */

let audioContextInitialized = false;

/**
 * Check if audio context is ready to use
 */
export function isAudioContextReady(): boolean {
  return audioContextInitialized;
}

/**
 * Initialize audio context after user interaction
 * This should be called on first user click/touch
 */
export async function initializeAudioContext(): Promise<boolean> {
  if (audioContextInitialized) {
    return true;
  }

  try {
    // The actual initialization happens in toneEngine.ts
    // This just tracks the state
    audioContextInitialized = true;
    console.log("Audio context initialized");
    return true;
  } catch (error) {
    console.error("Failed to initialize audio context:", error);
    return false;
  }
}

/**
 * Reset audio context (useful for cleanup)
 */
export function resetAudioContext(): void {
  audioContextInitialized = false;
}
