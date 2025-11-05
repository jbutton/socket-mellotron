"use client";

import { useStore } from "@/lib/store/useStore";
import { toneEngine } from "@/lib/audio/toneEngine";

/**
 * Effects Panel Component
 *
 * Audio effects controls for Reverb, Delay, and ADSR envelope
 */

export function EffectsPanel() {
  const audioSettings = useStore((state) => state.audioSettings);
  const setReverb = useStore((state) => state.setReverb);
  const setDelay = useStore((state) => state.setDelay);
  const setAttack = useStore((state) => state.setAttack);
  const setRelease = useStore((state) => state.setRelease);

  const handleReverbChange = (value: number) => {
    setReverb(value);
    toneEngine.setReverb(value / 100); // Convert to 0-1
  };

  const handleDelayChange = (value: number) => {
    setDelay(value);
    const delayTime = value / 1000; // Convert ms to seconds
    toneEngine.setDelay(delayTime, 0.3); // Fixed feedback of 0.3
  };

  const handleAttackChange = (value: number) => {
    setAttack(value);
    // ADSR would be applied when creating new sampler
  };

  const handleReleaseChange = (value: number) => {
    setRelease(value);
    // ADSR would be applied when creating new sampler
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Effects</h2>

      <div className="space-y-6">
        {/* Reverb Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-slate-300 text-sm font-medium">
              Reverb
            </label>
            <span className="text-purple-400 text-sm font-semibold">
              {audioSettings.reverb}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={audioSettings.reverb}
            onChange={(e) => handleReverbChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right,
                #9333ea 0%,
                #9333ea ${audioSettings.reverb}%,
                #475569 ${audioSettings.reverb}%,
                #475569 100%)`
            }}
          />
        </div>

        {/* Delay Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-slate-300 text-sm font-medium">
              Delay
            </label>
            <span className="text-purple-400 text-sm font-semibold">
              {audioSettings.delay}ms
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={audioSettings.delay}
            onChange={(e) => handleDelayChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right,
                #9333ea 0%,
                #9333ea ${audioSettings.delay / 10}%,
                #475569 ${audioSettings.delay / 10}%,
                #475569 100%)`
            }}
          />
        </div>

        {/* ADSR Envelope */}
        <div className="border-t border-slate-700 pt-4">
          <h3 className="text-slate-300 text-sm font-medium mb-3">ADSR Envelope</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-slate-400 text-xs">Attack</label>
                <span className="text-purple-400 text-xs font-semibold">
                  {audioSettings.attack.toFixed(2)}s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={audioSettings.attack}
                onChange={(e) => handleAttackChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-slate-400 text-xs">Release</label>
                <span className="text-purple-400 text-xs font-semibold">
                  {audioSettings.release.toFixed(2)}s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={audioSettings.release}
                onChange={(e) => handleReleaseChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
