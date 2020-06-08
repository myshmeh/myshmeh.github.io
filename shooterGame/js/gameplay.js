class GamePlay extends Phaser.Scene {
    player;
    playerBullets;
    enemies;
    enemyBullets;
    enemySpawnHandler;
    gameOver;
    explosionEmitter;
    music;
    constructor() {
        super({
            key: 'gameplay',
        });
    }

    create() {
        this.playerBullets = this.physics.add.group();
        this.player = new Player(this, WIDTH*0.5, HEIGHT*0.8, 'spaceships', 0, this.playerBullets.add.bind(this.playerBullets), this.playerBullets.remove.bind(this.playerBullets));
        this.enemyBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemySpawnHandler = new EnemySpawnHandler(this, this.enemies, this.player, this.enemyBullets, ENEMY_SPAWN_SCHEDULE);
        const explosion = this.add.particles('sprites');
        this.explosionEmitter = explosion.createEmitter({
            frame: [0, 1],
            frequency: 100,
            quantity: 10,
            scale: { start: 0.75, end: 0 },
            speed: { min: -150, max: 150 },
            lifespan: 450,
            rotate: {start: 0, end: 180},
            on: false
        });
        const explode = (obj) => {
            this.explosionEmitter.explode(Phaser.Math.RND.between(10, 20), obj.x, obj.y);
            if (obj.isDead()) this.sound.play('explode', {volume: 1});
            else this.sound.play('explode', {volume: 0.25});
        };

        const overlapEnemyAndBullet = (enemy, bullet) => {
            this.playerBullets.remove(bullet, true, true);
            enemy.takeDamage(bullet.power);
            explode(enemy);
        }
        this.physics.add.overlap(this.enemies, this.playerBullets, overlapEnemyAndBullet);

        const overlapPlayerAndBullet = (player, bullet) => {
            player.takeDamage(bullet.power);
            this.enemyBullets.remove(bullet, true, true);
            explode(player);
        };
        this.physics.add.overlap(this.player, this.enemyBullets, overlapPlayerAndBullet);

        const overlapPlayerAndEnemy = (player, enemy) => {
            player.takeDamage(enemy.bodyPower);
            enemy.kill();
            explode(player);
            explode(enemy);
        }
        this.physics.add.overlap(this.player, this.enemies, overlapPlayerAndEnemy);

        this.gameOver = false;

        const rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        rect.setTint(0x222222);
        this.fadeOut(rect, 0, 1000, () => rect.destroy());

        for(let i=0; i<STAR_NUM; i++) {
            const star = new Star(this, Phaser.Math.RND.between(0, WIDTH), Phaser.Math.RND.between(0, HEIGHT), Math.random() * 0.25);
        }

        this.music = this.sound.add('theme', {
            detune: 0,
            volume: 0.25,
            loop: true,
        });
        this.music.play();
    }
    
    update() {
        if (this.player.isNotAlive() && !this.gameOver) {
            this.doGameOver();
        }
        if (!this.enemies.getLength() && this.enemySpawnHandler.isSpawnedAll()) {
            this.doGameClear();
        }
    }

    doGameOver() {
        this.gameOver = true;
        const rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        rect.setTint(0x222222);
        rect.alpha = 0;
        rect.setDepth(Z_INDEX_DEEP);
        this.fadeIn(rect, 0, 2500, () => {
            this.scene.start('gameOver');
            this.music.stop();
        });
    }

    doGameClear() {
        this.gameOver = true;
        const rect = this.add.image(0, 0, 'sprites', 5).setScale(WIDTH/32, HEIGHT/32).setOrigin(0);
        rect.setTint(0x222222);
        rect.alpha = 0;
        rect.setDepth(Z_INDEX_DEEP);
        this.fadeIn(rect, 0, 4500, () => {
            this.scene.start('gameClear');
            this.music.stop();
        }, 1, 'Quart.easeIn');
    }
}