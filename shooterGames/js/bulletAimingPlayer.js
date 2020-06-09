class BulletAimingPlayer extends Phaser.Physics.Arcade.Sprite {
    speedVector;
    removeSelf;
    power;
    getPlayerPosition;
    constructor(scene, x, y, source, frame, getPlayerPosition, speed, removeSelf, power=1) {
        super(scene, x, y, source, frame);
        this.removeSelf = removeSelf;
        this.getPlayerPosition = getPlayerPosition;
        this.power = power;
        this.setScale(0.2, 0.2);
        this.setOrigin(0.3);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.update, this);

        const playerPosition = this.getPlayerPosition();
        const hDistance = playerPosition.x - this.x;
        const vDistance = playerPosition.y - this.y;
        const distance = Math.sqrt(hDistance * hDistance + vDistance * vDistance);
        const xVel = hDistance / distance * speed;
        const yVel = vDistance / distance * speed;
        this.speedVector = {x: xVel, y: yVel};
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