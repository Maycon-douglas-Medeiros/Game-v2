class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.body.setCollideWorldBounds(true);
        this.followDistance = 200;
        this.speed = 120;
        this.hp = 2;

        this.setPushable(false);
        this.enemyAnims();
    }

    update(player) {
        this.followPlayer(player);
    }

    followPlayer(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distance < this.followDistance) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
            this.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);

            if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
                if (Math.cos(angle) > 0) {
                    this.anims.play("enemyRight", true);
                } else {
                    this.anims.play("enemyLeft", true);
                }
            } else {
                if (Math.sin(angle) > 0) {
                    this.anims.play("enemyDown", true);
                } else {
                    this.anims.play("enemyUp", true);
                }
            }
        } else {
            this.setVelocity(0, 0);
            this.anims.stop();
        }
    }

    takeDamage() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    collideWithProps(prop) {
        this.scene.physics.add.collider(this, prop, () => { });
    }

    enemyAnims() {
        this.anims.create({
            key: "enemyStop",
            frames: [{ key: "enemy", frame: 21 }],
            frameRate: 20
        });
        this.anims.create({
            key: "enemyLeft",
            frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemyRight",
            frames: this.anims.generateFrameNumbers("enemy", { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemyUp",
            frames: this.anims.generateFrameNumbers("enemy", { start: 14, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemyDown",
            frames: this.anims.generateFrameNumbers("enemy", { start: 21, end: 27 }),
            frameRate: 10,
            repeat: -1
        });
    }
}
