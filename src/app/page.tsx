"use client";

import { PianoKeyboard } from "@/components/keyboard/PianoKeyboard";
import { SoundBankSwitcher } from "@/components/sound-banks/SoundBankSwitcher";
import { VolumeControl } from "@/components/controls/VolumeControl";
import { EffectsPanel } from "@/components/controls/EffectsPanel";
import { UserPresence } from "@/components/multiplayer/UserPresence";
import { SocketProvider } from "@/components/providers/SocketProvider";

/**
 * Main page component - Entry point for the Socket Mellotron app
 */
export default function Home() {
  return (
    <SocketProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Socket Mellotron
          </h1>
          <p className="text-slate-300 text-lg">
            Real-time Multiplayer Music Collaboration
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Presence */}
            <UserPresence />

            {/* Volume Control */}
            <VolumeControl />
          </div>

          {/* Center Column - Keyboard */}
          <div className="lg:col-span-9 space-y-6">
            {/* Piano Keyboard */}
            <PianoKeyboard />

            {/* Sound Bank Switcher */}
            <SoundBankSwitcher />

            {/* Effects Panel */}
            <EffectsPanel />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>
            Built with Next.js 15, Tone.js, Socket.io, and TypeScript
          </p>
          <p className="mt-1">
            Press keys or click piano to start playing
          </p>
        </footer>
      </div>
    </main>
    </SocketProvider>
  );
}
