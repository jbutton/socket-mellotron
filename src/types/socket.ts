/**
 * Socket.io Event Type Definitions
 */

/**
 * Key press event data
 */
export interface KeyPressEvent {
  userId: string;
  note: string;
  octave: number;
  velocity: number;
  color: string;
  timestamp: number;
}

/**
 * Key release event data
 */
export interface KeyReleaseEvent {
  userId: string;
  note: string;
  octave: number;
  timestamp: number;
}

/**
 * User joined event data
 */
export interface UserJoinEvent {
  userId: string;
  color: string;
  timestamp: number;
}

/**
 * User left event data
 */
export interface UserLeftEvent {
  userId: string;
  timestamp: number;
}

/**
 * User presence data
 */
export interface UserPresenceData {
  userId: string;
  color: string;
  connectedAt: Date;
  isActive: boolean;
}

/**
 * Socket event names (type-safe)
 */
export enum SocketEvent {
  // Connection events
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",

  // User events
  USER_INFO = "userInfo",
  USER_JOINED = "userJoined",
  USER_LEFT = "userLeft",
  USER_PRESENCE = "userPresence",

  // Key events
  KEY_PRESS = "keyPress",
  KEY_RELEASE = "keyRelease",

  // Room events (optional)
  JOIN_ROOM = "joinRoom",
  LEAVE_ROOM = "leaveRoom",
  ROOM_STATE = "roomState",
}

/**
 * Room data (for optional room/session support)
 */
export interface Room {
  id: string;
  name: string;
  users: UserPresenceData[];
  createdAt: Date;
  maxUsers?: number;
}

/**
 * Socket connection state
 */
export type ConnectionState = "disconnected" | "connecting" | "connected" | "error";
