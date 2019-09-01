///////////////////////////////////
// ENTRY
///////////////////////////////////
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
let main;
function setup() {
    main = new Main();
    main.init();
}

function draw() {
    main.update();

    main.render();
}

function keyTyped() {
    main.onPressed(key);
    return false;
}

///////////////////////////////////
// MAIN
///////////////////////////////////
class Main {
    constructor() {
        this.bgColor = color(0, 0, 0);
        this.gameMgr = new GameManager();
        this.actionKeyMap = {
            y: 'yes',
            n: 'no',
            w: 'up',
            s: 'down',
            d: 'right',
            a: 'left'
        };
    }

    init() {
        createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.gameMgr.init();
    }
    
    update() {
        this.gameMgr.update();
    }

    flip() {
        background(this.bgColor);
    }

    render() {
        this.flip();
        this.gameMgr.render();
    }

    onPressed(key) {
        const action = this.actionKeyMap[key];
        if(action === undefined) return;
        this.gameMgr.onAction(action);
    }
}

///////////////////////////////////
// GAME MANAGER
///////////////////////////////////
class GameManager {
    constructor() {
        this.init();
    }

    ///////////////////////////////
    // INIT
    ///////////////////////////////
    init() {
        this.stateMap = {opening: 0, playing: 1, gameOver: 2};
        this.state = this.stateMap.opening;
        this.count = 0;
        this.initByState();
    }

    initByState() {
        switch(this.state) {
            case this.stateMap.opening:
                this.initOpening();
                break;
            case this.stateMap.playing:
                this.initPlaying();
                break;
            case this.stateMap.gameOver:
                this.initGameOver();
                break;
        }
    }

    initOpening() {
        this.msgColorRGB = {r:255, g:255, b:255};
    }

    initPlaying() {
        this.board = new Board();
        this.board.init();
        this.players = [new Player(0, this.board.holeLength, color(255, 20, 120)), new Player(1, this.board.holeLength, color(20, 255, 120))];
        this.playerOnTurn = this.players[0];
    }
    
    initGameOver() {
        this.winner = null;
    }

    ///////////////////////////////
    // UPDATE
    ///////////////////////////////
    update() {
        this.count++;
        switch(this.state) {
            case this.stateMap.opening:
                this.updateOpening();
                break;
            case this.stateMap.playing:
                this.updatePlaying();
                break;
            case this.stateMap.gameOver:
                this.updateGameOver();
                break;
        }
    }

    updateOpening() {
        const rad = radians(this.count*1.5);
        const baseBuffer = 255;
        const waivingScale = 200;
        this.msgColorRGB.r = baseBuffer - sin(rad) * waivingScale;
        this.msgColorRGB.g = baseBuffer - sin(rad) * waivingScale;
        this.msgColorRGB.b = baseBuffer - sin(rad) * waivingScale;
    }

    updatePlaying() {
        this.board.update();
        this.playerOnTurn.update();

        const gameOver = this.isGameOver();
        if(gameOver) {
            // capture the rest stones for the unfinished player
            this.board.captureRest(this.players[gameOver.unfinishedPlayerId]);

            // change state to gameOver
            this.setState(this.stateMap.gameOver);
        }
    }

    updateGameOver() {
        this.winner = this.assessWinner();
    }
    
    ///////////////////////////////
    // RENDER
    ///////////////////////////////
    render() {
        switch(this.state) {
            case this.stateMap.opening:
                this.renderOpening();
                break;
            case this.stateMap.playing:
                this.renderPlaying();
                break;
            case this.stateMap.gameOver:
                this.renderGameOver();
                break;
        }
    }

    renderDebug() {
        fill(255);
        stroke(0);
        textSize(20);
        textAlign(LEFT);

        let stateName = '';
        for(key in this.stateMap) {
            if(this.state == this.stateMap[key]) {
                stateName = key;
                break;
            }
        }
        text(`state: ${stateName}`, width*0.1, height*0.9);
    }

    renderOpening() {
        const title = 'MANCALA';
        const msg = 'PRESS \' Y \' TO START';

        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(40);
        text(title, width*0.5, height*0.5);

        fill(this.msgColorRGB.r, this.msgColorRGB.g, this.msgColorRGB.b);
        textSize(21);
        text(msg, width*0.5, height*0.6);
    }
    
    renderPlaying() {
        this.playerOnTurn.render(this.board.holes);
        this.board.render();

        fill(255);
        textAlign(LEFT);
        textSize(21);
        text('CURRENT TURN', width*0.05, height*0.2);
        fill(this.playerOnTurn.color);
        textSize(36);
        text(`PLAYER${this.playerOnTurn.id+1}`, width*0.05, height*0.27);

        // guide
        fill(255);
        noStroke();
        textSize(15);
        text('[COMMAND] A, D: MOVE / Y: SELECT', width*0.05, height*0.9);
    }

    renderGameOver() {
        this.playerOnTurn.render(this.board.holes);
        this.board.render();
        const txt = this.winner ? `PLAYER${this.winner.id+1}!` : 'DRAW..';
        
        
        fill(255);
        textAlign(LEFT);
        textSize(21);
        text('WINNER', width*0.05, height*0.2);
        const color = this.winner ? this.winner.color : 180;
        fill(color);
        textSize(36);
        text(txt, width*0.05, height*0.27);

        fill(255);
        textSize(15);
        text('PRESS \' W \' TO RESTART', width*0.05, height*0.9);
    }

    ///////////////////////////////
    // ON_ACTION
    ///////////////////////////////
    onAction(action) {
        switch(this.state) {
            case this.stateMap.opening:
                this.onActionOpening(action);
                break;
            case this.stateMap.playing:
                this.onActionUpdate(action);
                break;
            case this.stateMap.gameOver:
                this.onActionGameOver(action);
                break;
        }
    }

    onActionOpening(action) {
        this.setState(this.stateMap.playing);
    }
    
    onActionUpdate(action) {
        if(action == 'up') {
        
        }
        if(action == 'down') {
            
        }
        if(action == 'right') {
            this.playerOnTurn.movePointer(1);
        }
        if(action == 'left') {
            this.playerOnTurn.movePointer(-1);
        }
        if(action == 'yes') {
            const nextPlayerId = this.board.moveStones(this.playerOnTurn.holePointer, this.playerOnTurn);
            if(nextPlayerId !== false) {
                this.playerOnTurn = this.players[nextPlayerId];
            }
            else if(nextPlayerId === false) console.log('could not move stones there');
        }
        if(action == 'no') {
            
        }
    }

    onActionGameOver(action) {
        if(action == 'up')
            this.init();
    }

    ///////////////////////////////
    // HELPERS
    ///////////////////////////////
    isGameOver() {
        const player1HoleIndexStart = 1;
        const player2HoleIndexStart = this.board.holeLength/2+1;
        const playerHoleLength = this.board.holeLength/2-1;
        
        let player1Finished = true;
        for(let i=0; i<playerHoleLength; i++) {
            if(this.board.holes[player1HoleIndexStart+i].countStones() == 0) continue;

            player1Finished = false;
            break;
        }

        let player2Finished = true;
        for(let i=0; i<playerHoleLength; i++) {
            if(this.board.holes[player2HoleIndexStart+i].countStones() == 0) continue;

            player2Finished = false;
            break;
        }

        if(!player1Finished && !player2Finished) return false;

        return {
            gameOver: player1Finished || player2Finished,
            finishedPlayerId: player1Finished ? 0 : 1,
            unfinishedPlayerId: player1Finished? 1 : 0
        };
    }

    setState(state) {
        this.state = state;
        this.initByState();
    }

    assessWinner() {
        const player1Mancala = this.board.holes[this.board.holeLength/2 * 1];
        const player2Mancala = this.board.holes[this.board.holeLength/2 * 0];
        if(player1Mancala.stones.length > player2Mancala.stones.length) return this.players[0];
        else if(player1Mancala.stones.length < player2Mancala.stones.length) return this.players[1];
        
        return false;
    }
}

///////////////////////////////////
// BOARD
///////////////////////////////////
// mancala board, 12 holes, 2 mancalas
// size: 8 ([0] and [4]: mancala, others: hole)
class Board {
    constructor() {
        this.holes = [];
        this.holeLength = 14;
        this.initStoneLength = 4;
        this.sizeMancala = 110;
        this.sizeHole = 58;
        this.sizeStone = 15;
        this.spaceBetHoles = 20;
        this.holeOffset = 40;
        this.holeColor = color(155, 70, 30);
    }

    init() {
        for(let i=0; i<this.holeLength; i++) {
            // holes[i] is mancala
            if(i%(this.holeLength/2) == 0) {
                let x, y;
                y = SCREEN_HEIGHT * 0.5;
                if(i == 0) x = SCREEN_WIDTH*0.1;
                if(i == this.holeLength/2) x = SCREEN_WIDTH*0.9;
                this.holes[i] = new Hole(x, y, this.sizeMancala, this.holeColor);
                continue;
            }

            // this.holes[i] is hole
            let x = i < this.holeLength/2 ? 
                SCREEN_WIDTH * 0.05 + SCREEN_WIDTH * (i+1) * 0.1 :
                SCREEN_WIDTH * 0.95 - SCREEN_WIDTH * (i+1-this.holeLength/2) * 0.1;
            let y = i < this.holeLength/2 ? 
                SCREEN_HEIGHT * 0.6 : 
                SCREEN_HEIGHT * 0.4;
            this.holes[i] = new Hole(x, y, this.sizeHole, this.holeColor);
            // set stones inside the hole
            for(let j=0; j<this.initStoneLength; j++){
                const offset = this.sizeHole*0.5 - this.sizeStone;
                this.holes[i].pushStone(
                    new Stone(
                        x + random(-1*offset, offset),
                        y + random(-1*offset, offset),
                        color(random(255), random(255), random(255)),
                        this.sizeStone
                    )
                );
            }
        }
    }

    update() {

    }

    render() {
        for(let i=0; i<this.holeLength; i++) {
            const hole = this.holes[i];
            hole.render();

            const stones = hole.stones;
            for(let j=0; j<stones.length; j++) {
                stones[j].render();
            }
            
            fill(255);
            noStroke();
            textSize(18);
            textAlign(CENTER);
            text(hole.stones.length, hole.coord.x, hole.coord.y+hole.sizeHole*0.8);
        }
    }

    /**
     * @param {*} index 
     * @param {*} player 
     * @returns {*} id of next turn
     */
    moveStones(index, player) {
        if(index < 0 
            || index > this.holeLength 
            || index%(this.holeLength/2) == 0
            || this.holes[index].countStones() == 0)
            return false;
        
        const hole = this.holes[index];
        let stonePlacingIndex = index+1;
        while(hole.countStones() > 0) {
            const relevantStonePlacingIndex = this.findRelevantHoleIndex(stonePlacingIndex);
            if(relevantStonePlacingIndex % (this.holeLength/2) == 0 &&
                relevantStonePlacingIndex == this.holeLength/2*player.id) { // if at opponent mancala
                    stonePlacingIndex++; // skip the mancala
            }

            const targetHole = this.holes[this.findRelevantHoleIndex(stonePlacingIndex)];
            const stone = hole.popStone();
            const offset = targetHole.sizeHole*0.5 - stone.sizeStone;
            const x = targetHole.coord.x + random(-1*offset, offset);
            const y = targetHole.coord.y + random(-1*offset, offset);
            stone.resetPosition(x, y);

            targetHole.pushStone(stone);

            stonePlacingIndex++;
        }

        // last stone is placed inside your mancala -> one more turn
        const currIndex = this.findRelevantHoleIndex(stonePlacingIndex-1);
        if(currIndex == this.holeLength/2 * ((player.id+1) % 2)) return player.id;
        
        // last stone is placed inside an empty hole on your side -> get all the stones in the opposite hole vertically
        const lastHole = this.holes[currIndex];
        if(currIndex >= player.boundary.min && currIndex <= player.boundary.max &&
            lastHole.stones.length == 1) {
                const oppositeHole = this.holes[abs(14 - currIndex)];
                const mancala = this.holes[this.holeLength/2 * ((player.id+1) % 2)];
                oppositeHole.stones.forEach(item => {
                    const offset = mancala.sizeHole*0.5 - item.sizeStone;
                    item.resetPosition(
                        mancala.coord.x + random(-1*offset, offset),
                        mancala.coord.y + random(-1*offset, offset)
                    );
                });
                mancala.stones.push(...oppositeHole.stones);
                oppositeHole.stones = [];
        }

        return (player.id+1) % 2;
    }

    findRelevantHoleIndex(index) {
        if(index > this.holeLength-1) return index % this.holeLength;
        else if(index < 0) return this.holeLength + index;
        return index;
    }

    captureRest(unfinishedPlayer) {
        for(let i=0; i<unfinishedPlayer.boundary.max-unfinishedPlayer.boundary.min+1; i++){
            const currHole = this.holes[unfinishedPlayer.boundary.min + i];
            const mancala = this.holes[this.holeLength/2 * ((unfinishedPlayer.id+1) % 2)];
            currHole.stones.forEach(item => {
                const offset = mancala.sizeHole*0.5 - item.sizeStone;
                item.resetPosition(
                    mancala.coord.x + random(-1*offset, offset),
                    mancala.coord.y + random(-1*offset, offset)
                );
            });
            mancala.stones.push(...currHole.stones);
            currHole.stones = [];
        }
    }
}

///////////////////////////////////
// GAME ITEMS
///////////////////////////////////
class Stone {
    constructor(x, y, colorStone=null, sizeStone=15) {
        this.color = colorStone || color(random(255), random(255), random(255));
        this.coord = {
            x: x,
            y: y
        };
        this.sizeStone = sizeStone;
    }

    resetPosition(x, y) {
        this.coord.x = x;
        this.coord.y = y;
    }

    render() {
        fill(this.color);
        stroke(this.color);
        ellipse(this.coord.x, this.coord.y, this.sizeStone);
    }
}

class Hole {
    constructor(x, y, sizeHole, color) {
        this.coord = {
            x: x,
            y: y
        };
        this.sizeHole = sizeHole;
        this.color = color;
        this.stones = [];
    }

    countStones() {
        return this.stones.length;
    }

    pushStone(stone) {
        this.stones.push(stone);
    }

    popStone() {
        return this.stones.pop();
    }

    render() {
        fill(this.color);
        stroke(this.color);
        ellipse(this.coord.x, this.coord.y, this.sizeHole);
    }
}

///////////////////////////////////
// PLAYER
///////////////////////////////////
class Player {
    constructor(id, holeLength, color_=null) {
        this.init(id, holeLength, color_);
    }

    init(id, holeLength, color_) {
        this.id = id;
        this.boundary = {min: id*holeLength/2+1, max: id*holeLength/2+6};
        this.holePointer = this.boundary.min;
        this.color = color_ || color(random(255), random(255), random(255));
    }

    update() {

    }

    /**
     * @param {number} val 
     * @returns {boolean} moved or not
     */
    movePointer(val) {
        const tmp = this.holePointer + val;
        if(tmp < this.boundary.min || tmp > this.boundary.max) return false;

        this.holePointer = tmp;
        return true;
    }

    render(holes) {
        // render holePointer
        fill(this.color);
        noStroke();
        textSize(25);
        ellipse(holes[this.holePointer].coord.x, holes[this.holePointer].coord.y, holes[this.holePointer].sizeHole*1.1);
    }
}