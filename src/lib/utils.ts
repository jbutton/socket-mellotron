import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 * Used throughout the app for conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert MIDI note number to note name
 * @param midiNote - MIDI note number (0-127)
 * @returns Note name (e.g., "C4", "A#5")
 */
export function midiToNoteName(midiNote: number): string {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(midiNote / 12) - 1;
  const note = notes[midiNote % 12];
  return `${note}${octave}`;
}

/**
 * Convert note name to MIDI note number
 * @param noteName - Note name (e.g., "C4", "A#5")
 * @returns MIDI note number (0-127)
 */
export function noteNameToMidi(noteName: string): number {
  const notes: { [key: string]: number } = {
    C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
    "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
  };

  const match = noteName.match(/([A-G]#?)(\d+)/);
  if (!match) return 60; // Default to middle C

  const [, note, octave] = match;
  return (parseInt(octave) + 1) * 12 + notes[note];
}

/**
 * Generate a random color for user identification
 * @returns Hex color string
 */
export function generateUserColor(): string {
  const colors = [
    "#8B5CF6", // Purple
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#F97316", // Orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Debounce function for optimizing frequent calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
