"use client";

import { useStore } from "@/lib/store/useStore";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * User Presence Component
 *
 * Shows which users are currently online and playing
 */

export function UserPresence() {
  const currentUser = useStore((state) => state.currentUser);
  const onlineUsers = useStore((state) => state.onlineUsers);
  const isConnected = useStore((state) => state.isConnected);

  // Combine current user with online users
  const allUsers = currentUser
    ? [currentUser, ...onlineUsers.filter((u) => u.id !== currentUser.id)]
    : onlineUsers;

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-purple-400" />
          <h3 className="text-white font-semibold">
            Online
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          />
          <span className="text-slate-400 text-xs font-medium">
            {allUsers.length}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        <AnimatePresence>
          {allUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full ring-2 ring-slate-600"
                style={{ backgroundColor: user.color }}
              />
              <span className="text-slate-300 text-sm flex-1">
                {user.name || user.id}
              </span>
              {user.id === currentUser?.id && (
                <span className="text-xs text-purple-400 font-medium">(You)</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {allUsers.length === 0 && (
        <div className="text-center py-4">
          <p className="text-slate-400 text-sm">
            {isConnected ? "Waiting for users..." : "Not connected"}
          </p>
        </div>
      )}
    </div>
  );
}
