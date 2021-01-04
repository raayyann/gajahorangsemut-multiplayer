const socket = io();

const gameLog = document.querySelector('#game-log');
const rondeC = document.querySelector('#ronde');
const rondeT = document.querySelector('.rondet');

let ronde = 1;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let name = urlParams.get('name');

if(!name){
    name = prompt('Masukan Nama');
}

socket.emit('name', name);

socket.on('message', msg => {
    if(msg.includes(', Kamu') || msg.includes('Game Dimulai!')){
        rondeC.textContent = `Ronde ${ronde}`;
        ronde++;
        if(msg.includes(', Kamu')){
            rondeT.style.display = 'block';
            setTimeout(() => {rondeT.style.display = 'none'} , 5000);
        }
    }
    if(msg === 'od'){
        alert('Player lain terputus');
        window.location.href = `?name=${name}`;
    }
    gameLog.textContent = msg;
});

['gajah', 'orang', 'semut'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        socket.emit('turn', id);
    });
});
