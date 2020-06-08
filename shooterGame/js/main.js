const config = {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#111',
    pixelArt: true,
    scene: [ Preloader, Start, GamePlay, GameOver, GameClear ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
            // , debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

let game = new Phaser.Game(config);