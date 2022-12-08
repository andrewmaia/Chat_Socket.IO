//https://socket.io/get-started/chat
//http://localhost:3000/
//Rodar: node index.js


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let userConnected=`user ${socket.id} connected`;
  console.log(userConnected);  
  socket.broadcast.emit('chat message', userConnected);  

  socket.on('chat message', (msg) => {
    msg=`${socket.id} says: ${msg} connected`;
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    let userDiconnected=`user ${socket.id} disconnected`;
    console.log(userDiconnected);  
    socket.broadcast.emit('chat message', userDiconnected);      
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});