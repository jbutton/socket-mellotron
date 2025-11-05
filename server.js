const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// User color palette
const USER_COLORS = [
  '#8B5CF6', // Purple
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];

// Connected users storage
const users = new Map();

function generateUserColor() {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || '*',
      methods: ['GET', 'POST'],
    },
  });

  // Socket.io event handlers
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Assign user color
    const userColor = generateUserColor();
    users.set(socket.id, {
      id: socket.id,
      color: userColor,
      connectedAt: new Date(),
    });

    // Send user their info
    socket.emit('userInfo', {
      id: socket.id,
      color: userColor,
    });

    // Broadcast updated user list to all clients
    const broadcastUserPresence = () => {
      const userList = Array.from(users.values()).map((user) => ({
        id: user.id,
        color: user.color,
      }));
      io.emit('userPresence', userList);
    };

    broadcastUserPresence();

    // Handle note press
    socket.on('notePress', (data) => {
      console.log(`🎵 Note press from ${socket.id}:`, data);
      socket.broadcast.emit('remoteNotePress', {
        ...data,
        userId: socket.id,
        color: userColor,
      });
    });

    // Handle note release
    socket.on('noteRelease', (data) => {
      console.log(`🎹 Note release from ${socket.id}:`, data);
      socket.broadcast.emit('remoteNoteRelease', {
        ...data,
        userId: socket.id,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      users.delete(socket.id);
      broadcastUserPresence();
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`
🎹 Socket Mellotron Server Running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Local:    http://${hostname}:${port}
  Network:  http://localhost:${port}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Socket.io: Ready for connections
  Environment: ${dev ? 'development' : 'production'}
      `);
    });
});
