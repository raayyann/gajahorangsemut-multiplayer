const http = require('http');
const express = require('express');
const app = express();
const io = require('socket.io')();

const game = require('./game');

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

let waitingPlayer = null;

io.on('connection', socket => {
    if(waitingPlayer){
        new game(waitingPlayer, socket);
        waitingPlayer = null;
    }else{
        waitingPlayer = socket;
        waitingPlayer.emit('message', 'Menunggu lawan');
    }
});

server.listen(8080, () => {
    console.log('Server started');
});