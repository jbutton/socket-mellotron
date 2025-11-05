"use client";

import { useState, useEffect } from "react";
// import { Key } from "./Key";
// import { useToneEngine } from "@/lib/audio/toneEngine";
// import { useStore } from "@/lib/store/useStore";

/**
 * Main Piano Keyboard Component
 *
 * Features to implement:
 * - Render 2-3 octaves of piano keys (white and black)
 * - Handle keyboard input (A-K for notes)
 * - Handle mouse/touch input for clicking keys
 * - Visual feedback for local key presses
 * - Display remote users' key presses with color coding
 * - Integration with Tone.js for audio playback
 */

export function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // TODO: Initialize Tone.js engine
  // TODO: Set up keyboard event listeners
  // TODO: Set up Socket.io listeners for remote key presses
  // TODO: Map keyboard keys to note values (C, C#, D, etc.)

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      <div className="flex justify-center items-end gap-0 relative">
        {/* TODO: Render white keys */}
        {/* TODO: Render black keys (positioned absolutely) */}
        {/* TODO: Add visual feedback for pressed keys */}
        {/* TODO: Add color-coded overlay for remote users */}

        <div className="text-slate-300 text-center py-4">
          Piano Keyboard Component (To be implemented)
        </div>
      </div>

      {/* Keyboard shortcuts legend */}
      <div className="mt-4 text-slate-400 text-sm text-center">
        <p>Keyboard shortcuts: A S D F G H J K L (white keys)</p>
      </div>
    </div>
  );
}
