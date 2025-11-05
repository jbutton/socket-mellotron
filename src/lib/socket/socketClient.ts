import { io, Socket } from "socket.io-client";
// import type { KeyPressEvent, UserJoinEvent } from "@/types/socket";

/**
 * Socket.io Client
 *
 * Manages WebSocket connection for real-time multiplayer features.
 *
 * Events to handle:
 * - connection / disconnect
 * - keyPress (remote user pressed a key)
 * - keyRelease (remote user released a key)
 * - userJoined (new user connected)
 * - userLeft (user disconnected)
 * - userPresence (list of online users)
 */

class SocketClient {
  private socket: Socket | null = null;
  private isConnected = false;

  /**
   * Connect to Socket.io server
   */
  connect() {
    if (this.socket) {
      console.warn("Socket already connected");
      return;
    }

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

    this.socket = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupEventListeners();
  }

  /**
   * Set up socket event listeners
   */
  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      this.isConnected = true;
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
      this.isConnected = false;
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // TODO: Add custom event listeners
    // this.socket.on("keyPress", this.handleRemoteKeyPress);
    // this.socket.on("keyRelease", this.handleRemoteKeyRelease);
    // this.socket.on("userJoined", this.handleUserJoined);
    // this.socket.on("userLeft", this.handleUserLeft);
  }

  /**
   * Emit a note press event
   */
  emitNotePress(note: string, octave: number, velocity: number = 0.8) {
    if (!this.socket || !this.isConnected) {
      return;
    }

    this.socket.emit("notePress", { note, octave, velocity });
  }

  /**
   * Emit a note release event
   */
  emitNoteRelease(note: string, octave: number) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit("noteRelease", { note, octave });
  }

  /**
   * Subscribe to remote note press events
   */
  onRemoteNotePress(callback: (data: any) => void) {
    this.socket?.on("remoteNotePress", callback);
  }

  /**
   * Subscribe to remote note release events
   */
  onRemoteNoteRelease(callback: (data: any) => void) {
    this.socket?.on("remoteNoteRelease", callback);
  }

  /**
   * Subscribe to user info event (sent when connecting)
   */
  onUserInfo(callback: (data: { id: string; color: string }) => void) {
    this.socket?.on("userInfo", callback);
  }

  /**
   * Subscribe to user presence updates
   */
  onUserPresence(callback: (users: Array<{ id: string; color: string }>) => void) {
    this.socket?.on("userPresence", callback);
  }

  /**
   * Get the socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Disconnect from server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const socketClient = new SocketClient();

// Hook for React components
export function useSocket() {
  return socketClient;
}
