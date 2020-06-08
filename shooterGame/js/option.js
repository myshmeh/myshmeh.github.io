class BossOption extends Enemy {
    safetyUnlocked;
    launchInterval;
    radian;
    speed;
    constructor(scene, x, y, addBullet, removeBullet, removeSelf, behaviours){
        super(scene, x, y, 'option', 0, addBullet, removeBullet, removeSelf, behaviours);
        this.safetyUnlocked = false;
        this.launchInterval = 0;
        this.radian = 0;
        this.speed = OPTION_BULLET_SPEED;
        this.health = OPTION_HEALTH_MAX;
    }

    update(_, deltaTime) {
        super.update(_, deltaTime);
        if (this.isCremated()) return;
        if (!this.safetyUnlocked) return;
        this.launchInterval += deltaTime;
        if (this.launchInterval < OPTION_LAUNCH_INTERVAL) return;
        this.launchInterval = 0;
        this.radian += OPTION_RADIAN_STEP;
        const xVel = Math.cos(this.radian) * this.speed;
        const yVel = Math.sin(this.radian) * this.speed;
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullets', 1, 
            {x: xVel, y: yVel}, this.removeBullet, this.power);
        this.addBullet(bullet);
    }

    launch() {
        this.safetyUnlocked = true;
    }
}