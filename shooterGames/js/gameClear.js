class GameClear extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameClear'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, GAME_CLEAR_TITLE_TEXT, {
            fontFamily: FONTS.HANDLEE,
            fontSize: '48px',
        }).setOrigin(0.5);
        this.add.text(WIDTH * 0.5, HEIGHT * 0.55, GAME_CLEAR_SUBTITLE_TEXT, {
            fontFamily: FONTS.HANDLEE,
            fontSize: '28px',
        }).setOrigin(0.5);
        const rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        rect.setTint(0x222222);
        this.fadeOut(rect, 0);

        this.sound.play('themeSimple', {
            detune: 0,
            volume: 0.25,
            loop: true,
        });

        for(let i=0; i<STAR_NUM; i++) {
            const star = new Star(this, Phaser.Math.RND.between(0, WIDTH), Phaser.Math.RND.between(0, HEIGHT), Math.random() * 0.5);
        }

        this.add.image(WIDTH * 0.5, HEIGHT * 0.65, 'spaceships').setScale(4).setDepth(-1);
    }
}