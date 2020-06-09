class Start extends Phaser.Scene {
    title;
    text;
    phraseIndex;
    player; 
    rect;
    music;
    constructor() {
        super({
            key: 'start',
        });
    }
    
    create() {
        this.phraseIndex = -1;
        this.title = this.add.text(WIDTH * 0.5, HEIGHT * 0.35, TITLE_TEXT, {
            fontFamily: FONTS.HANDLEE,
            fontSize: '48px',
            align: 'center'
        }).setOrigin(0.5);
        console.log(this.title.alpha);
        this.text = this.add.text(WIDTH * 0.5, HEIGHT * 0.75, '', {
            fontFamily: FONTS.HANDLEE,
            fontSize: '28px',
            align: 'center'
        }).setOrigin(0.5);
        const moveToNextAction = () => {
            this.phraseIndex++;
            if (this.title.alpha === 1) {
                this.fadeOut(this.title, HEIGHT * 0.2);
                this.tweens.add({
                    targets: this.player,
                    y: HEIGHT * 0.45,
                    ease: 'Quart.easeOut',
                    repeat: 0,
                    duration: 2000,
                });
            }
            if (this.phraseIndex >= TITLE_PHRASES.length) {
                this.tweens.add({
                    targets: this.player,
                    y: 0 - this.player.height * 0.5,
                    ease: 'Quart.easeOut',
                    repeat: 0,
                    duration: 4000,
                });
                this.startScene('gameplay');
                return;
            }
            this.updatePhrase(TITLE_PHRASES[this.phraseIndex]);
        };
        this.input.keyboard.on('keyup', moveToNextAction.bind(this));
        this.rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        this.rect.setTint(0x222222);
        this.fadeOut(this.rect, 0);

        this.player = this.add.image(WIDTH * 0.5, HEIGHT * 0.65, 'spaceships').setScale(4).setDepth(-1);

        for(let i=0; i<STAR_NUM; i++) {
            const star = new Star(this, Phaser.Math.RND.between(0, WIDTH), Phaser.Math.RND.between(0, HEIGHT), Math.random() * 0.5);
        }

        this.music = this.sound.add('themeSimple', {
            detune: 0,
            volume: 0.25,
            loop: true,
        });
        this.music.play();
    }

    startScene(sceneName) {
        this.fadeIn(this.rect, 0, 2000, () => {
            this.music.stop();
            this.scene.start(sceneName);
        });
    }

    updatePhrase(phrase) {
        this.fadeOut(this.text, HEIGHT * 0.7, 750, (_, targets) => {
            const target = targets[0];
            target.text = phrase;
            target.y = HEIGHT * 0.8;
            this.fadeIn(target, HEIGHT * 0.75, 750);
        });
    }
}