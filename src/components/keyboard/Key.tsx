"use client";

import { motion } from "framer-motion";

interface KeyProps {
  note: string;
  octave: number;
  isBlack?: boolean;
  isPressed?: boolean;
  userColor?: string; // Color for remote user press
  onPress: () => void;
  onRelease: () => void;
}

/**
 * Individual Piano Key Component
 *
 * Features to implement:
 * - Render white or black key with appropriate styling
 * - Handle mouse down/up events
 * - Handle touch events for mobile
 * - Animate key press with Framer Motion
 * - Show glow effect when pressed
 * - Display remote user's color when they press this key
 */

export function Key({
  note,
  octave,
  isBlack = false,
  isPressed = false,
  userColor,
  onPress,
  onRelease,
}: KeyProps) {
  // TODO: Implement mouse/touch handlers
  // TODO: Add animation variants
  // TODO: Apply glow effect based on isPressed
  // TODO: Show user color overlay for remote presses

  const keyClassName = isBlack
    ? "w-12 h-32 bg-black hover:bg-gray-800 absolute z-10"
    : "w-16 h-48 bg-white hover:bg-gray-100 border border-gray-300";

  return (
    <motion.button
      className={`${keyClassName} rounded-b-md transition-all ${
        isPressed ? "key-glow" : ""
      }`}
      style={{
        boxShadow: isPressed && userColor
          ? `0 0 20px ${userColor}`
          : undefined,
      }}
      whileTap={{ scale: 0.95 }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
    >
      {/* Note label for white keys */}
      {!isBlack && (
        <div className="absolute bottom-2 w-full text-center text-xs text-gray-500">
          {note}{octave}
        </div>
      )}
    </motion.button>
  );
}
