/**
 * Audio and Sound Bank Type Definitions
 */

/**
 * Musical note representation
 */
export interface Note {
  name: string; // e.g., "C", "C#", "D"
  octave: number; // e.g., 3, 4, 5
  frequency?: number; // Optional frequency in Hz
}

/**
 * Full note identifier
 */
export type NoteIdentifier = `${string}${number}`; // e.g., "C4", "A#5"

/**
 * Sound bank configuration
 */
export interface SoundBank {
  id: string;
  name: string;
  description: string;
  icon: string;
  samples: SampleMap;
}

/**
 * Mapping of note names to sample file paths
 */
export interface SampleMap {
  [noteIdentifier: string]: string;
}

/**
 * Audio effects settings
 */
export interface AudioEffects {
  reverb: {
    enabled: boolean;
    decay: number;
    wet: number;
  };
  delay: {
    enabled: boolean;
    time: number;
    feedback: number;
  };
  filter: {
    enabled: boolean;
    frequency: number;
    resonance: number;
  };
}

/**
 * ADSR Envelope settings
 */
export interface ADSREnvelope {
  attack: number; // seconds
  decay: number; // seconds
  sustain: number; // 0-1
  release: number; // seconds
}

/**
 * Audio engine configuration
 */
export interface AudioEngineConfig {
  sampleRate: number;
  bufferSize: number;
  latency: number;
}

/**
 * Note event (for recording/playback)
 */
export interface NoteEvent {
  note: NoteIdentifier;
  velocity: number; // 0-1
  timestamp: number;
  duration?: number;
  type: "noteOn" | "noteOff";
}

/**
 * Recording data
 */
export interface Recording {
  id: string;
  name: string;
  soundBank: string;
  events: NoteEvent[];
  duration: number;
  createdAt: Date;
}
