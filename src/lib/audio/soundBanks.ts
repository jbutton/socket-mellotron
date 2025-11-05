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
 * Sound bank definitions
 * TODO: Add actual sample file paths once samples are sourced
 */
export const soundBanks: SoundBankConfig[] = [
  {
    id: "strings",
    name: "Strings",
    description: "Lush orchestral strings (violins, cellos)",
    icon: "🎻",
    samples: {
      // TODO: Add sample paths
      // "C3": "C3.wav",
      // "D3": "D3.wav",
      // ... etc
    },
  },
  {
    id: "choir",
    name: "Choir",
    description: "Mellotron's iconic choir sound",
    icon: "🎤",
    samples: {
      // TODO: Add sample paths
    },
  },
  {
    id: "flutes",
    name: "Flutes",
    description: "Soft, melodic flute ensemble",
    icon: "🎵",
    samples: {
      // TODO: Add sample paths
    },
  },
  {
    id: "brass",
    name: "Brass",
    description: "Bold brass section",
    icon: "🎺",
    samples: {
      // TODO: Add sample paths
    },
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
