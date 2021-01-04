const socket = io();

const gameLog = document.querySelector('#game-log');

['gajah', 'orang', 'semut'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        socket.emit('turn', id);
    });
});

socket.on('message', msg => {
    gameLog.textContent = msg;
});

