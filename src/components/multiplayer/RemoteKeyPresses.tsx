"use client";

import { useEffect, useState } from "react";
// import { useSocket } from "@/lib/socket/socketClient";
// import { KeyPress } from "@/types/socket";

/**
 * Remote Key Presses Component
 *
 * Manages visualization of other users' key presses.
 * This component tracks remote key events and provides
 * data to the PianoKeyboard component for rendering.
 *
 * Features to implement:
 * - Listen for remote key press/release events via Socket.io
 * - Track which keys are pressed by which users
 * - Map user IDs to colors
 * - Provide state to PianoKeyboard component
 */

interface RemoteKeyPress {
  userId: string;
  note: string;
  octave: number;
  color: string;
}

export function useRemoteKeyPresses() {
  const [remoteKeys, setRemoteKeys] = useState<Map<string, RemoteKeyPress>>(new Map());

  // TODO: Set up Socket.io listeners
  // TODO: Handle remote keyDown events
  // TODO: Handle remote keyUp events
  // TODO: Clean up stale key presses

  useEffect(() => {
    // TODO: Connect to socket
    // socket.on("keyPress", handleRemoteKeyPress);
    // socket.on("keyRelease", handleRemoteKeyRelease);

    return () => {
      // TODO: Clean up socket listeners
    };
  }, []);

  return remoteKeys;
}

// This is a hook that will be used by PianoKeyboard component
// Example usage:
// const remoteKeys = useRemoteKeyPresses();
// Then pass remoteKeys to individual Key components
