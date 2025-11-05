/**
 * Sound Bank Configuration
 *
 * Defines available sound banks and their sample mappings.
 * Each sound bank should have multiple samples per note for authentic Mellotron sound.
 */

export interface SampleMap {
  [note: string]: string;
}

export interface SoundBankConfig {
  id: string;
  name: string;
  description: string;
  samples: SampleMap;
  icon: string;
}

/**
 * Generate sample mappings for 3 octaves (C3-C6)
 * Maps note names to sample file paths
 */
function generateSampleMap(bankName: string): SampleMap {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octaves = [3, 4, 5];
  const sampleMap: SampleMap = {};

  octaves.forEach((octave) => {
    notes.forEach((note) => {
      const noteName = `${note}${octave}`;
      sampleMap[noteName] = `${noteName}.wav`;
    });
  });

  // Add C6 for the top note
  sampleMap["C6"] = "C6.wav";

  return sampleMap;
}

/**
 * Minimal sample map for testing with just a few samples
 * Tone.js will interpolate missing notes from available samples
 */
function generateMinimalSampleMap(): SampleMap {
  return {
    C4: "C4.wav",
    D4: "D4.wav",
  };
}

/**
 * Generate sample map for professional strings library
 * Maps to actual available samples (G2-F5)
 * Note: # symbols are URL-encoded as %23 for proper HTTP requests
 */
function generateProfessionalStringsSampleMap(): SampleMap {
  return {
    // Octave 2
    "G2": "G2.wav",
    "G#2": "G%232.wav",  // URL-encoded
    "A2": "A2.wav",
    "A#2": "A%232.wav",  // URL-encoded
    "B2": "B2.wav",
    // Octave 3
    "C3": "C3.wav",
    "C#3": "C%233.wav",  // URL-encoded
    "D3": "D3.wav",
    "D#3": "D%233.wav",  // URL-encoded
    "E3": "E3.wav",
    "F3": "F3.wav",
    "F#3": "F%233.wav",  // URL-encoded
    "G3": "G3.wav",
    "G#3": "G%233.wav",  // URL-encoded
    "A3": "A3.wav",
    "A#3": "A%233.wav",  // URL-encoded
    "B3": "B3.wav",
    // Octave 4
    "C4": "C4.wav",
    "C#4": "C%234.wav",  // URL-encoded
    "D4": "D4.wav",
    "D#4": "D%234.wav",  // URL-encoded
    "E4": "E4.wav",
    "F4": "F4.wav",
    "F#4": "F%234.wav",  // URL-encoded
    "G4": "G4.wav",
    "G#4": "G%234.wav",  // URL-encoded
    "A4": "A4.wav",
    "A#4": "A%234.wav",  // URL-encoded
    "B4": "B4.wav",
    // Octave 5
    "C5": "C5.wav",
    "C#5": "C%235.wav",  // URL-encoded
    "D5": "D5.wav",
    "D#5": "D%235.wav",  // URL-encoded
    "E5": "E5.wav",
    "F5": "F5.wav",
  };
}

/**
 * Sound bank definitions
 * Samples should be placed in /public/samples/[bank-id]/
 */
export const soundBanks: SoundBankConfig[] = [
  {
    id: "strings",
    name: "Strings",
    description: "Lush orchestral strings (violins, cellos)",
    icon: "🎻",
    samples: generateProfessionalStringsSampleMap(), // Professional strings library
  },
  {
    id: "choir",
    name: "Choir",
    description: "Mellotron's iconic choir sound",
    icon: "🎤",
    samples: generateSampleMap("choir"),
  },
  {
    id: "flutes",
    name: "Flutes",
    description: "Soft, melodic flute ensemble",
    icon: "🎵",
    samples: generateSampleMap("flutes"),
  },
  {
    id: "brass",
    name: "Brass",
    description: "Bold brass section",
    icon: "🎺",
    samples: generateSampleMap("brass"),
  },
];

/**
 * Get sound bank by ID
 */
export function getSoundBank(id: string): SoundBankConfig | undefined {
  return soundBanks.find((bank) => bank.id === id);
}

/**
 * Get all available sound banks
 */
export function getAllSoundBanks(): SoundBankConfig[] {
  return soundBanks;
}
