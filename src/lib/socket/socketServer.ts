/**
 * Socket.io Server Configuration
 *
 * This file contains server-side Socket.io logic.
 * In Next.js 15, this will be used in API routes or custom server setup.
 *
 * Features to implement:
 * - Initialize Socket.io server
 * - Handle client connections/disconnections
 * - Broadcast key press/release events
 * - Manage user presence
 * - Optional: Room/session management
 */

import { Server as SocketIOServer } from "socket.io";
// import type { Server as HTTPServer } from "http";

/**
 * User representation on the server
 */
interface ConnectedUser {
  id: string;
  color: string;
  connectedAt: Date;
}

/**
 * Socket.io server manager
 */
export class SocketServer {
  private io: SocketIOServer | null = null;
  private users: Map<string, ConnectedUser> = new Map();

  /**
   * Initialize Socket.io server
   * @param httpServer - HTTP server instance
   */
  initialize(httpServer: any) {
    this.io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    this.setupEventHandlers();
  }

  /**
   * Set up event handlers
   */
  private setupEventHandlers() {
    if (!this.io) return;

    this.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Generate user color
      const userColor = this.generateUserColor();
      this.users.set(socket.id, {
        id: socket.id,
        color: userColor,
        connectedAt: new Date(),
      });

      // Send user their assigned color
      socket.emit("userInfo", {
        id: socket.id,
        color: userColor,
      });

      // Broadcast updated user list
      this.broadcastUserPresence();

      // Handle key press
      socket.on("keyPress", (data) => {
        // Broadcast to all other clients
        socket.broadcast.emit("keyPress", {
          ...data,
          userId: socket.id,
          color: userColor,
        });
      });

      // Handle key release
      socket.on("keyRelease", (data) => {
        socket.broadcast.emit("keyRelease", {
          ...data,
          userId: socket.id,
        });
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        this.users.delete(socket.id);
        this.broadcastUserPresence();
      });
    });
  }

  /**
   * Broadcast current user presence to all clients
   */
  private broadcastUserPresence() {
    if (!this.io) return;

    const userList = Array.from(this.users.values()).map((user) => ({
      id: user.id,
      color: user.color,
    }));

    this.io.emit("userPresence", userList);
  }

  /**
   * Generate a random color for user identification
   */
  private generateUserColor(): string {
    const colors = [
      "#8B5CF6", // Purple
      "#10B981", // Green
      "#F59E0B", // Amber
      "#EF4444", // Red
      "#3B82F6", // Blue
      "#EC4899", // Pink
      "#14B8A6", // Teal
      "#F97316", // Orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Get Socket.io server instance
   */
  getIO(): SocketIOServer | null {
    return this.io;
  }
}

// Export singleton instance
export const socketServer = new SocketServer();
