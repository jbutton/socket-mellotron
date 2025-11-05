"use client";

import { useEffect } from "react";
import { socketClient } from "@/lib/socket/socketClient";
import { useStore } from "@/lib/store/useStore";
import { toneEngine } from "@/lib/audio/toneEngine";

/**
 * Socket Provider Component
 *
 * Initializes Socket.io connection and handles real-time events
 */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const setConnected = useStore((state) => state.setConnected);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setOnlineUsers = useStore((state) => state.setOnlineUsers);

  useEffect(() => {
    // Connect to Socket.io server
    socketClient.connect();

    // Handle connection status
    const socket = socketClient.getSocket();
    if (socket) {
      socket.on("connect", () => {
        console.log("✅ Connected to multiplayer server");
        setConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected from multiplayer server");
        setConnected(false);
      });

      // Handle user info (receives own user data)
      socketClient.onUserInfo((data) => {
        console.log("👤 Received user info:", data);
        setCurrentUser({
          id: data.id,
          color: data.color,
          name: "You",
        });
      });

      // Handle user presence updates
      socketClient.onUserPresence((users) => {
        console.log("👥 User presence update:", users);
        // Filter out current user from online users list
        const socket = socketClient.getSocket();
        const currentUserId = socket?.id;
        const otherUsers = users
          .filter((u) => u.id !== currentUserId)
          .map((u) => ({
            id: u.id,
            color: u.color,
            name: `User ${u.id.slice(0, 4)}`,
          }));
        setOnlineUsers(otherUsers);
      });

      // Handle remote note press
      socketClient.onRemoteNotePress((data) => {
        console.log("🎵 Remote note press:", data);
        const noteId = `${data.note}${data.octave}`;
        // Play the note locally (optional - you might want to disable this)
        // toneEngine.playNote(noteId, data.velocity || 0.8);

        // TODO: Update UI to show remote key press with user color
        // This would require additional state management in the keyboard component
      });

      // Handle remote note release
      socketClient.onRemoteNoteRelease((data) => {
        console.log("🎹 Remote note release:", data);
        const noteId = `${data.note}${data.octave}`;
        // toneEngine.stopNote(noteId);

        // TODO: Update UI to remove remote key press visualization
      });
    }

    // Cleanup on unmount
    return () => {
      socketClient.disconnect();
    };
  }, [setConnected, setCurrentUser, setOnlineUsers]);

  return <>{children}</>;
}
