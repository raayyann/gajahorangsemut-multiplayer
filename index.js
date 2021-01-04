const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');

const game = require('./game');

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', socket => {
    socket.on('name', name => {
        socket.name = name;
        if(waitingPlayer){
            new game(waitingPlayer, socket);
            waitingPlayer = null;
        }else{
            waitingPlayer = socket;
            socket.emit('message', 'Menunggu lawan');
            socket.on('disconnect', () => {
                waitingPlayer = null;
            });
        }
    });
});

server.listen(8080, () => {
    console.log('Server started');
});
