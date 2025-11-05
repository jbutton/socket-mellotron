"use client";

import { motion } from "framer-motion";

interface KeyProps {
  note: string;
  octave: number;
  isBlack?: boolean;
  isPressed?: boolean;
  userColor?: string; // Color for remote user press
  tapeProgress?: number; // 0-1, how much tape has been used
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
  tapeProgress = 0,
  onPress,
  onRelease,
}: KeyProps) {
  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onPress();
  };

  const handleRelease = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onRelease();
  };

  // Animation variants
  const keyVariants = {
    pressed: {
      scale: 0.95,
      y: 4,
      transition: { duration: 0.05 },
    },
    released: {
      scale: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  const baseWhiteKeyClass = "w-16 h-48 bg-white hover:bg-gray-100 border border-gray-300 relative";
  const baseBlackKeyClass = "w-12 h-32 bg-gradient-to-b from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 absolute z-10";

  const keyClassName = isBlack ? baseBlackKeyClass : baseWhiteKeyClass;

  // Pressed state styling
  const pressedStyle = isPressed
    ? isBlack
      ? "bg-gradient-to-b from-gray-700 to-gray-800"
      : "bg-gray-200"
    : "";

  // Glow effect based on user color or default
  const glowColor = userColor || (isBlack ? "#818cf8" : "#a78bfa");
  const boxShadow = isPressed
    ? `0 0 20px ${glowColor}, inset 0 2px 8px rgba(0,0,0,0.3)`
    : undefined;

  return (
    <motion.button
      className={`${keyClassName} ${pressedStyle} rounded-b-md transition-colors duration-75 focus:outline-none select-none`}
      style={{ boxShadow }}
      variants={keyVariants}
      animate={isPressed ? "pressed" : "released"}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      aria-label={`${note}${octave} key`}
    >
      {/* Note label for white keys */}
      {!isBlack && (
        <div className="absolute bottom-2 w-full text-center text-xs text-gray-500 pointer-events-none">
          {note}{octave}
        </div>
      )}

      {/* Visual indicator for remote user press */}
      {isPressed && userColor && (
        <motion.div
          className="absolute inset-0 rounded-b-md pointer-events-none"
          style={{ backgroundColor: userColor, opacity: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Tape progress indicator - shows when note is playing */}
      {isPressed && tapeProgress > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden rounded-b-md"
          initial={{ height: 0 }}
          animate={{ height: `${tapeProgress * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <div
            className={`absolute inset-0 ${
              isBlack
                ? "bg-gradient-to-t from-purple-500/40 to-purple-400/20"
                : "bg-gradient-to-t from-purple-400/30 to-purple-300/10"
            }`}
          />
          {/* Animated tape reel effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
            style={{
              backgroundColor: tapeProgress > 0.8 ? "#ef4444" : "#a78bfa",
            }}
          />
        </motion.div>
      )}
    </motion.button>
  );
}
