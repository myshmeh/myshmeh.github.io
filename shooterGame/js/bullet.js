class Bullet extends Phaser.Physics.Arcade.Sprite {
    speedVector;
    removeSelf;
    power;
    constructor(scene, x, y, source, frame, speedVector, removeSelf, power=1) {
        super(scene, x, y, source, frame);
        this.speedVector = speedVector;
        this.removeSelf = removeSelf;
        this.power = power;
        this.setScale(0.2, 0.2);
        this.setOrigin(0.3);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.update, this);
    }

    update() {
        if (this.isDestroryed()) return;
        if (this.isOutOfBoundary()) {
            this.removeSelf(this, true, true);
            return;
        }
        this.setVelocity(this.speedVector.x, this.speedVector.y);
    }

    isDestroryed() {
        return this.body === undefined;
    }

    isOutOfBoundary() {
        if (!this.body) return true;
        return this.x < -this.body.halfWidth ||
            this.x > WIDTH + this.body.halfWidth ||
            this.y < -this.body.halfHeight ||
            this.y > HEIGHT + this.body.halfHeight;
    }
}