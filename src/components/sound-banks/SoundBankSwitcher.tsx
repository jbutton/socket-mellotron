"use client";

import { useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { toneEngine } from "@/lib/audio/toneEngine";
import { getAllSoundBanks } from "@/lib/audio/soundBanks";
import { motion } from "framer-motion";

/**
 * Sound Bank Switcher Component
 *
 * Allows users to switch between different Mellotron sound banks
 */

export function SoundBankSwitcher() {
  const currentSoundBank = useStore((state) => state.currentSoundBank);
  const setCurrentSoundBank = useStore((state) => state.setCurrentSoundBank);
  const [isLoading, setIsLoading] = useState(false);

  const soundBanks = getAllSoundBanks();

  const handleBankChange = async (bankId: string) => {
    if (bankId === currentSoundBank || isLoading) return;

    setIsLoading(true);

    try {
      await toneEngine.loadSoundBank(bankId);
      setCurrentSoundBank(bankId);
    } catch (error) {
      console.error("Failed to load sound bank:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Sound Banks</h2>
        {isLoading && (
          <div className="flex items-center text-slate-400 text-sm">
            <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full mr-2"></div>
            Loading...
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soundBanks.map((bank) => {
          const isActive = currentSoundBank === bank.id;

          return (
            <motion.button
              key={bank.id}
              onClick={() => handleBankChange(bank.id)}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`
                p-6 rounded-lg transition-all relative overflow-hidden
                ${isActive
                  ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <div className="text-4xl mb-2">{bank.icon}</div>
              <div className="text-sm font-semibold">{bank.name}</div>
              <div className="text-xs text-slate-400 mt-1">{bank.description}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
