import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Table status updates
  socket.on('table:statusChange', (data) => {
    io.emit('table:statusUpdated', data);
  });

  // Timer updates
  socket.on('timer:update', (data) => {
    io.emit('timer:updated', data);
  });

  // Booking updates
  socket.on('booking:update', (data) => {
    io.emit('booking:updated', data);
  });

  // Create booking
  socket.on('booking:create', (data) => {
    console.log('Booking created:', data);
    // Broadcast to all clients
    io.emit('booking:created', data);
  });

  // Check availability
  socket.on('booking:checkAvailability', (data, callback) => {
    // TODO: Implement actual availability check against database
    // For now, return available
    callback({ available: true });
  });
});

// Make io accessible in routes
app.set('io', io);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Snooker Club Management System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      bookings: '/api/bookings',
      tables: '/api/tables',
      payments: '/api/payments',
      users: '/api/users',
      branches: '/api/branches',
    },
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
    },
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Socket.io is ready for real-time updates`);
});

export { app, io };
