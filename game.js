class game{
    constructor(p1, p2){
        this.players = [p1, p2];
        this.turns = [null, null];

        this.sendToPlayer(0, `Game Dimulai! Lawanmu adalah ${p2.name}`);
        this.sendToPlayer(1, `Game Dimulai! Lawanmu adalah ${p1.name}`);

        this.players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this.onTurn(idx, turn);
            });
            player.on('disconnect', () => {
                this.sendToPlayers('od');
            });
        });
    }

    sendToPlayer(p, msg){
        this.players[p].emit('message', msg);
    }

    sendToPlayers(msg){
        this.players.forEach(p => {
            p.emit('message', msg);
        });
    }

    onTurn(p, turn){
        this.turns[p] = turn;
        this.sendToPlayer(p, `Kamu memilih ${turn}`);
        this.checkGameOver();
    }

    checkGameOver(){
        const turns = this.turns;

        if(turns[0] && turns[1]){
            this.getGameResult();
            this.turns = [null, null];
        }
    }

    getGameResult() {
        const p0 = this.decodeTurn(this.turns[0]);
        const p1 = this.decodeTurn(this.turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch (distance) {
            case 0:
                this.sendToPlayers('Seri!');
            break;

            case 1:
                this.sendWinMessage(this.players[0], this.players[1]);
            break;

            case 2:
                this.sendWinMessage(this.players[1], this.players[0]);
            break;
        }
    }

    sendWinMessage(winner, loser) {
        const players = this.players;
        const turns = this.turns;
        winner.emit('message', `${players[0].name} memilih ${turns[0]}, ${players[1].name} memilih ${turns[1]}, Kamu Menang!`);
        loser.emit('message', `${players[0].name} memilih ${turns[0]}, ${players[1].name} memilih ${turns[1]}, Kamu Kalah!`);
    }

    decodeTurn(turn) {
        switch (turn) {
            case 'gajah':
                return 0;
            case 'orang':
                return 1;
            case 'semut':
                return 2;
            default:
                return null;
        }
    }
}

module.exports = game;
