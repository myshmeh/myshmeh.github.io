class Boss extends Enemy {
    getPlayerPosition;
    speed;
    option1;
    option1Behaviour;
    option2;
    option2Behaviour;
    addEnemy;
    constructor(scene, x, y, addBullet, addEnemy, removeBullet, removeSelf, getPlayerPosition, behaviours, option1Behaviour, option2Behaviour){
        super(scene, x, y, 'boss', 0, addBullet, removeBullet, removeSelf, behaviours);
        this.getPlayerPosition = getPlayerPosition;
        this.speed = 100;
        this.vSpeed = this.speed;
        this.option1Behaviour = option1Behaviour;
        this.option2Behaviour = option2Behaviour;
        this.addEnemy = addEnemy;
        this.health = BOSS_HEALTH_MAX;
        this.body.setSize(BOSS_COLLISION_W, BOSS_COLLISION_H);
    }

    behave(){
        for(let i=0; i<this.behaviours.length; i++) {
            const behaviour = this.behaviours[i];
            if (this.behaved[i] === true || behaviour.time > this.elapsedAll) continue;
            this.behaved[i] = true;
            if (behaviour.action === 'move') this.move(behaviour.args);
            if (behaviour.action === 'launch') {
                this.launch(behaviour.args);
            }
            if (behaviour.action === 'option') {
                this.spawnOption1();
                this.spawnOption2();
            }
            if (behaviour.action === 'launchAiming') {
                this.launchAiming();
            }
        }
        if (this.behaved[this.behaviours.length-1]) {
            this.behaved = {};
            this.elapsedAll = 0;
        }
    }

    launch() {
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullets', 1, 
            {x: 0, y: this.vSpeed}, this.removeBullet, this.power);
        this.addBullet(bullet);
    }
    
    launchAiming() {
        const bullet = new BulletAimingPlayer(this.scene, this.x, this.y, 'bullets', 2,
            this.getPlayerPosition, this.speed, this.removeBullet, this.power);
        this.addBullet(bullet);
    }

    spawnOption1() {
        this.option1 = new BossOption(this.scene, this.x, this.y, this.addBullet, this.removeBullet, this.removeSelf, this.option1Behaviour);
        this.addEnemy(this.option1);
    }

    spawnOption2() {
        this.option2 = new BossOption(this.scene, this.x, this.y, this.addBullet, this.removeBullet, this.removeSelf, this.option2Behaviour);
        this.addEnemy(this.option2);
    }
}