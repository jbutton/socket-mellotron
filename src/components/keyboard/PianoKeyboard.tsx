"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Key } from "./Key";
import { toneEngine } from "@/lib/audio/toneEngine";
import { useStore } from "@/lib/store/useStore";
import { socketClient } from "@/lib/socket/socketClient";

/**
 * Main Piano Keyboard Component
 *
 * Renders an interactive piano keyboard with 2 octaves (C4-C6)
 * Handles keyboard input, mouse/touch events, and multiplayer synchronization
 */

// Keyboard layout mapping (computer keys to piano notes)
const KEY_MAP: { [key: string]: { note: string; octave: number } } = {
  // Lower octave (C4-B4)
  'a': { note: 'C', octave: 4 },
  'w': { note: 'C#', octave: 4 },
  's': { note: 'D', octave: 4 },
  'e': { note: 'D#', octave: 4 },
  'd': { note: 'E', octave: 4 },
  'f': { note: 'F', octave: 4 },
  't': { note: 'F#', octave: 4 },
  'g': { note: 'G', octave: 4 },
  'y': { note: 'G#', octave: 4 },
  'h': { note: 'A', octave: 4 },
  'u': { note: 'A#', octave: 4 },
  'j': { note: 'B', octave: 4 },

  // Upper octave (C5-C6)
  'k': { note: 'C', octave: 5 },
  'o': { note: 'C#', octave: 5 },
  'l': { note: 'D', octave: 5 },
  'p': { note: 'D#', octave: 5 },
  ';': { note: 'E', octave: 5 },
  "'": { note: 'F', octave: 5 },
};

// Piano keys configuration for 2 octaves
const PIANO_KEYS = [
  // Octave 4
  { note: 'C', octave: 4, isBlack: false },
  { note: 'C#', octave: 4, isBlack: true },
  { note: 'D', octave: 4, isBlack: false },
  { note: 'D#', octave: 4, isBlack: true },
  { note: 'E', octave: 4, isBlack: false },
  { note: 'F', octave: 4, isBlack: false },
  { note: 'F#', octave: 4, isBlack: true },
  { note: 'G', octave: 4, isBlack: false },
  { note: 'G#', octave: 4, isBlack: true },
  { note: 'A', octave: 4, isBlack: false },
  { note: 'A#', octave: 4, isBlack: true },
  { note: 'B', octave: 4, isBlack: false },

  // Octave 5
  { note: 'C', octave: 5, isBlack: false },
  { note: 'C#', octave: 5, isBlack: true },
  { note: 'D', octave: 5, isBlack: false },
  { note: 'D#', octave: 5, isBlack: true },
  { note: 'E', octave: 5, isBlack: false },
  { note: 'F', octave: 5, isBlack: false },
  { note: 'F#', octave: 5, isBlack: true },
  { note: 'G', octave: 5, isBlack: false },
  { note: 'G#', octave: 5, isBlack: true },
  { note: 'A', octave: 5, isBlack: false },
  { note: 'A#', octave: 5, isBlack: true },
  { note: 'B', octave: 5, isBlack: false },

  // Top C
  { note: 'C', octave: 6, isBlack: false },
];

export function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [tapeProgress, setTapeProgress] = useState<Map<string, number>>(new Map());
  const pressedKeysRef = useRef(pressedKeys);
  const animationFrameRef = useRef<number>();

  // Update ref when state changes
  useEffect(() => {
    pressedKeysRef.current = pressedKeys;
  }, [pressedKeys]);

  // Update tape progress for all active keys
  useEffect(() => {
    const updateProgress = () => {
      const newProgress = new Map<string, number>();
      const tapeDuration = toneEngine.getTapeDuration();

      pressedKeys.forEach((noteId) => {
        const playbackTime = toneEngine.getNotePlaybackTime(noteId);
        if (playbackTime !== null) {
          // Calculate progress as 0-1
          const progress = Math.min(playbackTime / tapeDuration, 1);
          newProgress.set(noteId, progress);
        }
      });

      setTapeProgress(newProgress);

      // Continue animation if there are active keys
      if (pressedKeys.size > 0) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    if (pressedKeys.size > 0) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pressedKeys]);

  // Initialize audio engine on first user interaction
  useEffect(() => {
    const initAudio = async () => {
      if (!audioInitialized) {
        try {
          await toneEngine.initialize();
          setAudioInitialized(true);
        } catch (error) {
          console.error("Failed to initialize audio:", error);
        }
      }
    };

    // Initialize on any user interaction
    const handleInteraction = () => {
      initAudio();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [audioInitialized]);

  // Handle note press
  const handleNotePress = useCallback((note: string, octave: number) => {
    const noteId = `${note}${octave}`;

    // Prevent duplicate presses
    if (pressedKeysRef.current.has(noteId)) return;

    setPressedKeys(prev => new Set(prev).add(noteId));

    // Play note with callback for when tape ends
    toneEngine.playNote(noteId, 0.8, () => {
      // Tape ended - remove from pressed keys
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(noteId);
        return newSet;
      });
    });

    // Broadcast to other users via Socket.io
    socketClient.emitNotePress(note, octave, 0.8);
  }, []);

  // Handle note release
  const handleNoteRelease = useCallback((note: string, octave: number) => {
    const noteId = `${note}${octave}`;

    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteId);
      return newSet;
    });

    toneEngine.stopNote(noteId);

    // Broadcast to other users via Socket.io
    socketClient.emitNoteRelease(note, octave);
  }, []);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for mapped keys
      const key = e.key.toLowerCase();
      if (!KEY_MAP[key]) return;

      e.preventDefault();

      const { note, octave } = KEY_MAP[key];
      handleNotePress(note, octave);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!KEY_MAP[key]) return;

      e.preventDefault();

      const { note, octave } = KEY_MAP[key];
      handleNoteRelease(note, octave);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNotePress, handleNoteRelease]);

  // Calculate black key positions
  const getBlackKeyOffset = (index: number): number => {
    const whiteKeysBefore = PIANO_KEYS.slice(0, index).filter(k => !k.isBlack).length;
    return whiteKeysBefore * 64 - 24; // 64px = white key width, offset by 24px
  };

  const whiteKeys = PIANO_KEYS.filter(k => !k.isBlack);
  const blackKeys = PIANO_KEYS.filter(k => k.isBlack);

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-2xl">
      {!audioInitialized && (
        <div className="mb-4 text-center text-yellow-400 text-sm">
          Click anywhere or press any key to start audio
        </div>
      )}

      <div className="relative flex justify-center items-end">
        {/* White keys */}
        <div className="flex gap-0">
          {whiteKeys.map((key, index) => {
            const noteId = `${key.note}${key.octave}`;
            return (
              <Key
                key={noteId}
                note={key.note}
                octave={key.octave}
                isBlack={false}
                isPressed={pressedKeys.has(noteId)}
                tapeProgress={tapeProgress.get(noteId) || 0}
                onPress={() => handleNotePress(key.note, key.octave)}
                onRelease={() => handleNoteRelease(key.note, key.octave)}
              />
            );
          })}
        </div>

        {/* Black keys (absolutely positioned) */}
        {blackKeys.map((key, index) => {
          const noteId = `${key.note}${key.octave}`;
          const originalIndex = PIANO_KEYS.findIndex(
            k => k.note === key.note && k.octave === key.octave
          );

          return (
            <div
              key={noteId}
              className="absolute"
              style={{ left: `${getBlackKeyOffset(originalIndex)}px` }}
            >
              <Key
                note={key.note}
                octave={key.octave}
                isBlack={true}
                isPressed={pressedKeys.has(noteId)}
                tapeProgress={tapeProgress.get(noteId) || 0}
                onPress={() => handleNotePress(key.note, key.octave)}
                onRelease={() => handleNoteRelease(key.note, key.octave)}
              />
            </div>
          );
        })}
      </div>

      {/* Keyboard shortcuts legend */}
      <div className="mt-6 text-slate-400 text-xs text-center space-y-1">
        <p className="font-semibold text-slate-300">Keyboard Controls:</p>
        <p>Lower octave: A W S E D F T G Y H U J</p>
        <p>Upper octave: K O L P ; &apos;</p>
      </div>
    </div>
  );
}
