import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketID = (receiverID) =>{
    return userSocketMap[receiverID];
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("A user connected: ", socket.id);

    const userID = socket.handshake.query.userID; // Accessing userID during handshake
    if (userID !== undefined) userSocketMap[userID] = socket.id; // Storing userID and socket.id in the map

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    // Listen for disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete userSocketMap[userID]; // Removing disconnected user from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users list
    });
});

export { app, io, server };
