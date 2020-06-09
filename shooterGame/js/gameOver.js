class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, GAME_OVER_TITLE_TEXT, {
            fontFamily: FONTS.HANDLEE,
            fontSize: '48px',
        }).setOrigin(0.5);
        this.add.text(WIDTH * 0.5, HEIGHT * 0.55, GAME_OVER_RETRY_TEXT, {
            fontFamily: FONTS.HANDLEE,
            fontSize: '32px',
        }).setOrigin(0.5);
        const rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        rect.setTint(0x222222);
        this.fadeOut(rect, 0);

        this.input.keyboard.on('keyup-' + GAME_OVER_RETRY_KEY, () => this.fadeIn(rect, 0, 2000, () => {window.location.assign(`index.html?${REPLAY_PARAM_NAME}=1`)}));

        this.sound.play('themeSimple', {
            detune: 0,
            volume: 0.25,
            loop: true,
        });

        for(let i=0; i<STAR_NUM; i++) {
            const star = new Star(this, Phaser.Math.RND.between(0, WIDTH), Phaser.Math.RND.between(0, HEIGHT), Math.random() * 0.5);
        }
    }
}