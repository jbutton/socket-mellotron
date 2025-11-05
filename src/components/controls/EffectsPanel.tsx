"use client";

import { useState } from "react";
// import { useStore } from "@/lib/store/useStore";

/**
 * Effects Panel Component
 *
 * Audio effects controls:
 * - Reverb (room size, dampening)
 * - Delay (time, feedback)
 * - ADSR Envelope (Attack, Decay, Sustain, Release)
 * - Filter (cutoff, resonance)
 *
 * Features to implement:
 * - Sliders for each effect parameter
 * - Toggle switches to enable/disable effects
 * - Visual feedback for effect levels
 * - Preset effect combinations
 */

export function EffectsPanel() {
  const [reverb, setReverb] = useState(30);
  const [delay, setDelay] = useState(0);
  const [attack, setAttack] = useState(0.01);
  const [release, setRelease] = useState(0.5);

  // TODO: Connect to Tone.js effects
  // TODO: Implement effect presets
  // TODO: Add bypass/enable toggles

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Effects</h2>

      <div className="space-y-4">
        {/* Reverb Control */}
        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Reverb: {reverb}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={reverb}
            onChange={(e) => setReverb(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Delay Control */}
        <div>
          <label className="text-slate-300 text-sm block mb-2">
            Delay: {delay}ms
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* ADSR Envelope */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 text-sm block mb-2">
              Attack: {attack.toFixed(2)}s
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={attack}
              onChange={(e) => setAttack(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-2">
              Release: {release.toFixed(2)}s
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={release}
              onChange={(e) => setRelease(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* TODO: Add more effects controls */}
      </div>
    </div>
  );
}
