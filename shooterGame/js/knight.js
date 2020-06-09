class Knight extends Enemy {
    power;
    speed;
    constructor(scene, x, y, addBullet, removeBullet, removeSelf, behaviours)
    {
        super(scene, x, y, 'spaceships', 2, addBullet, removeBullet, removeSelf, behaviours);
        this.power = 1;
        this.speed = 75;
        this.health = KNIGHT_HEALTH_MAX;
    }

    launch() {
        const velX = Math.cos(Math.PI*0.25) * this.speed;
        const velY = Math.sin(Math.PI*0.25) * this.speed;
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullets', 1, 
            {x: velX, y: velY}, this.removeBullet, this.power);
        const velX2 = Math.cos(Math.PI*0.75) * this.speed;
        const velY2 = Math.sin(Math.PI*0.75) * this.speed;
        const bullet2 = new Bullet(this.scene, this.x, this.y, 'bullets', 1, 
        {x: velX2, y: velY2}, this.removeBullet, this.power);
        this.addBullet(bullet);
        this.addBullet(bullet2);
    }
}