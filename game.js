class game{
    constructor(p1, p2){
        this.players = [p1, p2];
        this.turns = [null, null];

        this.sendToPlayers(`Game Dimulai! Kamu adalah player`);
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
            this.sendToPlayers('Game Over')
        }
    }
}

module.exports = game;
