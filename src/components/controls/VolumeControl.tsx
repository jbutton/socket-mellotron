"use client";

import { useStore } from "@/lib/store/useStore";
import { toneEngine } from "@/lib/audio/toneEngine";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Volume Control Component
 *
 * Controls master volume and mute state
 */

export function VolumeControl() {
  const volume = useStore((state) => state.audioSettings.volume);
  const isMuted = useStore((state) => state.audioSettings.isMuted);
  const setVolume = useStore((state) => state.setVolume);
  const setMuted = useStore((state) => state.setMuted);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);

    // Convert 0-100 to decibels (-60 to 0)
    const dbVolume = newVolume === 0 ? -60 : (newVolume / 100) * 60 - 60;
    toneEngine.setVolume(dbVolume);

    // Unmute if adjusting volume
    if (isMuted && newVolume > 0) {
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setMuted(newMuted);

    if (newMuted) {
      toneEngine.setVolume(-60); // Mute
    } else {
      const dbVolume = volume === 0 ? -60 : (volume / 100) * 60 - 60;
      toneEngine.setVolume(dbVolume);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="text-slate-300 hover:text-white hover:scale-110 transition-all p-2 rounded-lg hover:bg-slate-700"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right,
                #9333ea 0%,
                #9333ea ${isMuted ? 0 : volume}%,
                #475569 ${isMuted ? 0 : volume}%,
                #475569 100%)`
            }}
          />
        </div>

        <span className="text-slate-300 text-sm font-medium w-12 text-right">
          {isMuted ? 0 : volume}%
        </span>
      </div>
    </div>
  );
}
