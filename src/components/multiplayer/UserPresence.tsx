"use client";

import { useState, useEffect } from "react";
// import { useSocket } from "@/lib/socket/socketClient";
// import { User } from "@/types/user";

/**
 * User Presence Component
 *
 * Shows which users are currently online and playing.
 *
 * Features to implement:
 * - Display list of connected users
 * - Show user colors (for key press visualization)
 * - Online/offline status indicators
 * - User count
 * - Optional: User avatars/names
 */

export function UserPresence() {
  const [users, setUsers] = useState<Array<{ id: string; color: string; name: string }>>([]);

  // TODO: Connect to Socket.io for user presence
  // TODO: Listen for user join/leave events
  // TODO: Assign colors to users

  useEffect(() => {
    // Mock data for demonstration
    setUsers([
      { id: "1", color: "#8B5CF6", name: "You" },
      // { id: "2", color: "#10B981", name: "User 2" },
      // { id: "3", color: "#F59E0B", name: "User 3" },
    ]);
  }, []);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-xl">
      <h3 className="text-white font-semibold mb-3">
        Online ({users.length})
      </h3>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <span className="text-slate-300 text-sm">{user.name}</span>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-slate-400 text-sm">No users online</p>
      )}
    </div>
  );
}
