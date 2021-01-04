class game{
    constructor(p1, p2){
        this.players = [p1, p2];
        this.turns = [null, null];

        this.player.forEach((player, idx) => {
            this.sendToPlayer(idx, `Game Dimulai! Kamu adalah player ${idx}`)
            player.on('turn', (turn) => {
                this.onTurn(idx, turn);
            });
        });
    }

    sendToPlayer(p, msg){
        this.player[p].emit('message', msg);
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
            this.sendToPlayers(`Game Over! Player 1 memilih ${turns[0]}, Player 2 memilih ${turns[1]}`);
            this.getGameResult();
            this.turns = [null, null];
            this.sendToPlayers('Ronde Selanjutnya');
        }
    }

    getGameResult() {
        const p0 = this.decodeTurn(this.turns[0]);
        const p1 = this.decodeTurn(this.turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch (distance) {
            case 0:
            this._sendToPlayers('Seri!');
            break;

            case 1:
            this._sendWinMessage(this._players[0], this._players[1]);
            break;

            case 2:
            this._sendWinMessage(this._players[1], this._players[0]);
            break;
        }
    }

    sendWinMessage(winner, loser) {
        winner.emit('message', 'Kamu Menang!');
        loser.emit('message', 'Kamu Kalah!');
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
