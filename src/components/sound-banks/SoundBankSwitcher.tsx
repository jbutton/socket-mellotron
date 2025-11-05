"use client";

import { useState } from "react";
// import { useStore } from "@/lib/store/useStore";
// import { SoundBank } from "@/types/audio";

/**
 * Sound Bank Switcher Component
 *
 * Allows users to switch between different Mellotron sound banks:
 * - Strings (violins, cellos)
 * - Choir/Vocals
 * - Flutes
 * - Brass
 *
 * Features to implement:
 * - Display available sound banks as buttons/cards
 * - Highlight currently selected bank
 * - Load new samples when bank is switched
 * - Show loading state during sample loading
 */

export function SoundBankSwitcher() {
  const [currentBank, setCurrentBank] = useState<string>("strings");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Fetch available sound banks from store
  // TODO: Handle bank switching with Tone.js
  // TODO: Add loading indicator

  const soundBanks = [
    { id: "strings", name: "Strings", icon: "🎻" },
    { id: "choir", name: "Choir", icon: "🎤" },
    { id: "flutes", name: "Flutes", icon: "🎵" },
    { id: "brass", name: "Brass", icon: "🎺" },
  ];

  const handleBankChange = (bankId: string) => {
    // TODO: Implement bank switching logic
    setIsLoading(true);
    setCurrentBank(bankId);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Sound Banks</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soundBanks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => handleBankChange(bank.id)}
            disabled={isLoading}
            className={`
              p-4 rounded-lg transition-all
              ${currentBank === bank.id
                ? "bg-purple-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <div className="text-3xl mb-2">{bank.icon}</div>
            <div className="text-sm font-medium">{bank.name}</div>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-slate-400">
          Loading samples...
        </div>
      )}
    </div>
  );
}
