class EnemySpawnHandler {
    enemies;
    spawnSchedule;
    spawned;
    scene;
    player;
    bullets;
    elapsedTotal;
    constructor(scene, enemies, player, bullets, spawnSchedule) {
        scene.events.on('update', this.update, this);
        this.enemies = enemies;
        this.scene = scene;
        this.player = player;
        this.bullets = bullets;
        this.spawnSchedule = spawnSchedule;
        this.spawned = {};
        this.elapsedTotal = 0;
    }

    update(_, deltaTime) {
        this.elapsedTotal += deltaTime;
        this.spawnSchedule.forEach((chunk, i) => {
            if (this.elapsedTotal >= chunk.time && !this.spawned[i])
            {
                console.log(`${chunk.type}(t:${chunk.time}) spawned at ${parseInt(this.elapsedTotal)}`)
                this.spawn(chunk);
                this.spawned[i] = true;
            }
        });
    }

    spawn(spawnData) {
        if (!spawnData.type || !spawnData.args) return false;
        const type = spawnData.type;
        const args = spawnData.args;
        switch(type) {
            case 'pawn':
                const pawn = new Pawn(
                    this.scene, 
                    args.x, 
                    args.y, 
                    this.bullets.add.bind(this.bullets),
                    this.bullets.remove.bind(this.bullets),
                    this.enemies.remove.bind(this.enemies),
                    args.behaviours);
                this.enemies.add(pawn);
                break;
            case 'knight':
                const knight = new Knight(
                    this.scene,
                    args.x,
                    args.y, 
                    this.bullets.add.bind(this.bullets), 
                    this.bullets.remove.bind(this.bullets), 
                    this.enemies.remove.bind(this.enemies), 
                    args.behaviours);
                this.enemies.add(knight);
                break;
            case 'bishop':
                const bishop = new Bishop(
                    this.scene,
                    args.x,
                    args.y, 
                    this.bullets.add.bind(this.bullets), 
                    this.bullets.remove.bind(this.bullets), 
                    this.enemies.remove.bind(this.enemies),
                    this.player.getPosition.bind(this.player),
                    args.behaviours);
                this.enemies.add(bishop);
                break;
            case 'queen':
                const queen = new Queen(
                    this.scene,
                    args.x,
                    args.y, 
                    this.bullets.add.bind(this.bullets), 
                    this.bullets.remove.bind(this.bullets), 
                    this.enemies.remove.bind(this.enemies),
                    this.player.getPosition.bind(this.player),
                    args.behaviours);
                this.enemies.add(queen);
                break;
            case 'boss':
                const boss = new Boss(
                    this.scene,
                    args.x,
                    args.y, 
                    this.bullets.add.bind(this.bullets), 
                    this.enemies.add.bind(this.enemies),
                    this.bullets.remove.bind(this.bullets), 
                    this.enemies.remove.bind(this.enemies),
                    this.player.getPosition.bind(this.player),
                    args.behaviours,
                    args.option1Behaviour,
                    args.option2Behaviour,);
                this.enemies.add(boss);
                break;
            default:
                return false;
        }
        return true;
    }

    isSpawnedAll() {
        return this.spawnSchedule.length === Object.keys(this.spawned).length;
    }
}