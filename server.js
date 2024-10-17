import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
