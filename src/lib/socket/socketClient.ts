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

    // TODO: Update URL based on environment
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

    this.socket = io(socketUrl, {
      path: "/api/socket",
      transports: ["websocket", "polling"],
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
   * Emit a key press event
   */
  emitKeyPress(note: string, octave: number, velocity: number) {
    if (!this.socket || !this.isConnected) {
      console.warn("Socket not connected");
      return;
    }

    this.socket.emit("keyPress", { note, octave, velocity });
  }

  /**
   * Emit a key release event
   */
  emitKeyRelease(note: string, octave: number) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit("keyRelease", { note, octave });
  }

  /**
   * Subscribe to key press events
   */
  onKeyPress(callback: (data: any) => void) {
    this.socket?.on("keyPress", callback);
  }

  /**
   * Subscribe to key release events
   */
  onKeyRelease(callback: (data: any) => void) {
    this.socket?.on("keyRelease", callback);
  }

  /**
   * Subscribe to user presence updates
   */
  onUserPresence(callback: (users: any[]) => void) {
    this.socket?.on("userPresence", callback);
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
