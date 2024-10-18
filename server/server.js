const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + '/index.html');

// });


let messages = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on("on-chat", (msg) => {
        messages.push(msg);
        socket.emit("user-chat", messages); // Gửi tin nhắn mới ngay lập tức
        socket.broadcast.emit("user-chat", messages); // Gửi cho tất cả người dùng khác
    });
    // Xóa setInterval để tránh lag
    // setInterval(() => {
    //     socket.emit("user-chat", messages);
    // }, 3000);
});

server.listen(3000, () => {
    console.log('Server is listening on port', 3000);
});
