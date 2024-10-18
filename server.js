const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on("on-chat", (msg) => {
        io.emit("user-chat", msg);
    })
});

server.listen(5000, () => {
    console.log('Server is listening on port', 5000);
});