class Pawn extends Enemy {
    power;
    vSpeed;
    constructor(scene, x, y, addBullet, removeBullet, removeSelf, behaviours)
    {
        super(scene, x, y, 'spaceships', 1, addBullet, removeBullet, removeSelf, behaviours);
        this.power = 1;
        this.vSpeed = 75;
    }

    launch() {
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullets', 1, 
            {x: 0, y: this.vSpeed}, this.removeBullet, this.power);
        this.addBullet(bullet);
    }
}