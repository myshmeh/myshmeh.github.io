class Queen extends Enemy {
    power;
    speed;
    getPlayerPosition;
    constructor(scene, x, y, addBullet, removeBullet, removeSelf, getPlayerPosition, behaviours)
    {
        super(scene, x, y, 'spaceships', 4, addBullet, removeBullet, removeSelf, behaviours);
        this.getPlayerPosition = getPlayerPosition;
        this.power = 1;
        this.speed = 75;
    }

    launch() {
        const bullet = new BulletTracking(this.scene, this.x + Phaser.Math.Between(-30, 30), this.y, 'bullets', 2,
            this.getPlayerPosition, this.speed, this.removeBullet, this.power);
        this.addBullet(bullet);
    }
}