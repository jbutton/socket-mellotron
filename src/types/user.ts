/**
 * User-related Type Definitions
 */

/**
 * User representation
 */
export interface User {
  id: string;
  color: string;
  name?: string;
  avatar?: string;
}

/**
 * Extended user info with connection details
 */
export interface UserWithConnection extends User {
  isConnected: boolean;
  connectedAt: Date;
  lastActivity?: Date;
}

/**
 * User preferences (stored in localStorage)
 */
export interface UserPreferences {
  defaultSoundBank?: string;
  volume: number;
  keyboardLayout: "qwerty" | "azerty" | "dvorak";
  showKeyboardShortcuts: boolean;
  enableAnimations: boolean;
  enableHapticFeedback: boolean;
  audioLatency: number;
}

/**
 * User session data
 */
export interface UserSession {
  user: User;
  sessionId: string;
  startTime: Date;
  preferences: UserPreferences;
}

/**
 * User activity tracking
 */
export interface UserActivity {
  userId: string;
  action: "keyPress" | "keyRelease" | "soundBankChange" | "effectChange";
  timestamp: Date;
  metadata?: Record<string, any>;
}
