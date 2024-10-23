const socketIo = require('socket.io');
const express = require('express');
const http = require('http');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=>{
    console.log('New client connected');
    
    socket.on('joinRoom', (roomId) =>{
        socket.join(roomId);
        console.log(`A user joined room: ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) =>{
        socket.leave(roomId);
        console.log(`A user left room: ${roomId}`);
    });

    socket.on('disconnect', () =>{
        console.log('Client disconnected');
    });
});

module.exports = {server, io, app}; 