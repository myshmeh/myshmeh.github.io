const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
            , debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    // scene: [ Preloader, Menu, Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, GameOver ]
};

console.log('before new phaser.game');
const game = new Phaser.Game(config);
console.log('after new phaser.game');