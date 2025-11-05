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
 * Sound bank definitions
 * Samples should be placed in /public/samples/[bank-id]/
 */
export const soundBanks: SoundBankConfig[] = [
  {
    id: "strings",
    name: "Strings",
    description: "Lush orchestral strings (violins, cellos)",
    icon: "🎻",
    samples: generateSampleMap("strings"),
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
