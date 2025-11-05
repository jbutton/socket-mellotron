"use client";

// Main page component - Entry point for the Mellotron app
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Socket Mellotron
          </h1>
          <p className="text-slate-300">
            Real-time Multiplayer Music Collaboration
          </p>
        </header>

        {/* TODO: Add PianoKeyboard component */}
        <div className="mb-8">
          {/* <PianoKeyboard /> */}
        </div>

        {/* TODO: Add SoundBankSwitcher component */}
        <div className="mb-8">
          {/* <SoundBankSwitcher /> */}
        </div>

        {/* TODO: Add Controls and Effects Panel */}
        <div className="mb-8">
          {/* <EffectsPanel /> */}
        </div>

        {/* TODO: Add User Presence indicator */}
        <div>
          {/* <UserPresence /> */}
        </div>
      </div>
    </main>
  );
}
