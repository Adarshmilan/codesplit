const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { customAlphabet } = require('nanoid');

const app = express();
const server = http.createServer(app);
const io = new Server(server)

const generateRoomCode = customAlphabet('1234567890abcdef',6 );

const rooms = new Map();

const ROOM_LIFETIME = 2 * 60 * 60 * 1000;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('create-room', (text) => {
    const roomCode = generateRoomCode();
    const expiresAt = Date.now() + ROOM_LIFETIME;

    rooms.set(roomCode, { text, expiresAt });
    console.log(rooms);

    socket.join(roomCode);
    socket.data.roomCode = roomCode;

    const timer = setTimeout(() => {
      rooms.delete(roomCode);
      io.to(roomCode).emit('room-expired'); 
      console.log(`Room ${roomCode} expired and was deleted`);
    }, ROOM_LIFETIME);

    rooms.get(roomCode).timer = timer;

    socket.emit('room-created', { roomCode, expiresAt });
  });

  socket.on('join-room', (roomCode) => {
    console.log(`User ${socket.id} is trying to join room ${roomCode}`);
    const room = rooms.get(roomCode);

    if (!room) {
      socket.emit('error-message', 'Room not found or expired');
      return;
    }

    if (Date.now() > room.expiresAt) {
      rooms.delete(roomCode);
      socket.emit('error-message', 'Room has expired');
      return;
    }

    socket.join(roomCode);
    socket.emit('room-joined', { text: room.text, expiresAt: room.expiresAt });
  });

  socket.on('update-text', ({ roomCode, text }) => {
    const room = rooms.get(roomCode);
    if (room) {
      room.text = text;
      io.to(roomCode).emit('text-updated', { text });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});





server.listen(3000, () => {
    console.log('Server is running on port 3000');
});