"use client";

import { useState } from "react";
// import { useStore } from "@/lib/store/useStore";

/**
 * Volume Control Component
 *
 * Features to implement:
 * - Master volume slider
 * - Mute button
 * - Volume level indicator
 * - Persist volume settings
 */

export function VolumeControl() {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  // TODO: Connect to Tone.js master volume
  // TODO: Persist volume to localStorage
  // TODO: Add mute functionality

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    // TODO: Update Tone.js volume
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Update Tone.js mute state
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          disabled={isMuted}
          className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />

        <span className="text-slate-300 text-sm w-12 text-right">
          {isMuted ? 0 : volume}%
        </span>
      </div>
    </div>
  );
}
