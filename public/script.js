const socket = io();

const gameLog = document.querySelector('#game-log');

['gajah', 'orang', 'semut'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        socket.emit('turn', id);
    });
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let name = urlParams.get('name');

if(!name){
    name = prompt('Masukan Nama');
}


socket.emit('name', name);

socket.on('message', msg => {
    if(msg === 'od'){
        alert('Player lain terputus');
        window.location.href = `?name=${name}`;
    }
    gameLog.textContent = msg;
});

