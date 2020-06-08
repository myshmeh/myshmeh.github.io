class Enemy extends Phaser.Physics.Arcade.Sprite {
    scene;
    health;
    removeSelf;
    bodyPower;
    behaviours;
    behaved;
    elapsedAll;
    addBullet;
    removeBullet;
    constructor(scene, x, y, source, frame, addBullet, removeBullet, removeSelf, behaviours) {
        super(scene, x, y, source, frame);
        this.scene = scene;
        this.health = ENEMY_HEALTH_MAX;
        this.addBullet = addBullet;
        this.removeBullet = removeBullet;
        this.removeSelf = removeSelf;
        this.bodyPower = ENEMY_BODY_POWER;
        this.behaviours = behaviours;
        this.behaved = {};
        this.elapsedAll = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.update, this);
        this.setDepth(ENEMY_Z_INDEX);
    }

    update(_, deltaTime) {
        this.updateElapsedAll(deltaTime);
        if (this.isCremated()) return;
        if (this.isDead() || this.isOutOfBoundary(50, 50)) {
            this.cremate();
            this.removeSelf(this, true, true);
            return;
        }
        this.behave();
    }

    behave() {
        for(let i=0; i<this.behaviours.length; i++) {
            const behaviour = this.behaviours[i];
            if (this.behaved[i] === true || behaviour.time > this.elapsedAll) continue;
            this.behaved[i] = true;
            if (behaviour.action === 'move') this.move(behaviour.args);
            if (behaviour.action === 'launch') {
                this.launch(behaviour.args);
            }
        }
    }
    
    launch() {
        console.log('please override to launch a bullet here');
    }

    move(coord) {
        this.setVelocity(coord.x, coord.y);
    }

    updateElapsedAll(deltaTime) {
        this.elapsedAll += deltaTime;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    kill() {
        this.health = 0;
    }
    
    cremate() {
        this.health = -1;
    }

    isDead() {
        return this.health === 0;
    }

    isCremated() {
        return this.health < 0;
    }

    isNotAlive() {
        return this.health <= 0;
    }

    isOutOfBoundary(offsetX = 0, offsetY = 0) {
        if (!this.body) return false;
        return this.x < -this.body.halfWidth - offsetX ||
            this.x > WIDTH + this.body.halfWidth + offsetX ||
            this.y < -this.body.halfHeight - offsetY ||
            this.y > HEIGHT + this.body.halfHeight + offsetY;
    }
}