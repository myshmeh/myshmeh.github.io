class Star extends Phaser.Physics.Arcade.Sprite {
    size;
    constructor(scene, x, y, size=1) {
        super(scene, x, y, 'star', 0);
        this.setScale(size);
        this.setOrigin(0);
        this.setDepth(-2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.update, this);
        this.size = size;
        this.setTint(0xfcffcf);
    }
    
    update() {
        this.setVelocity(0, this.size * STAR_SPEED);
        if (this.y > HEIGHT) {
            this.x = Phaser.Math.RND.between(0, WIDTH);
            this.y = Phaser.Math.RND.between(-100, -32);
        }
    }
}