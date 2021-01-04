const socket = io();

const gameLog = document.querySelector('#game-log');

// Button
const gajah = document.querySelector('#gajah');
const orang = document.querySelector('#orang');
const semut = document.querySelector('#semut');

socket.on('message', msg => {
    gameLog.textContent(`${gameLog.textContent}<br>${msg}`);
});