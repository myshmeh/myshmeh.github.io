class BulletTracking extends Phaser.Physics.Arcade.Sprite {
    speed;
    removeSelf;
    power;
    getPlayerPosition;
    constructor(scene, x, y, source, frame, getPlayerPosition, speed, removeSelf, power=1) {
        super(scene, x, y, source, frame);
        this.speed = speed;
        this.removeSelf = removeSelf;
        this.getPlayerPosition = getPlayerPosition;
        this.power = power;
        this.setScale(0.2, 0.2).refreshBody();
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
        this.move();
    }

    move() {
        const playerPosition = this.getPlayerPosition();
        const hDistance = playerPosition.x - this.x;
        const vDistance = playerPosition.y - this.y;
        const distance = Math.sqrt(hDistance * hDistance + vDistance * vDistance);
        const xVel = hDistance / distance * this.speed;
        this.setVelocity(xVel, this.speed);
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