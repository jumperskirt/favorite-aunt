const path = require('path');

const http = require('http');
const server = http.createServer();

const express = require('express');
const app = express();

const socketio = require('socket.io');

server.on('request', app);

const io = socketio(server);

io.on('connection', function(socket) {
  console.log('A new client has connected!');
  console.log(socket.id);

  socket.on('disconnect', function(){
    console.log(':,(');
  })

  socket.on('draw', function(drawing){
    // console.log('got it');
    socket.broadcast.emit('drawing', drawing);

  });
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
