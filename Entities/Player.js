class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = 128;
        var y = 128;

        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.setPushable(false);
        this.body.setCollideWorldBounds(true);
        this.playerAnims();

        this.hp = 100;
        this.maxHp = 100;
        this.invulnerable = false;

        this.beamsGroup = this.scene.physics.add.group();

        this.hpText = scene.add.text(420, 270, `HP: ${this.hp}/${this.maxHp}`, { fontSize: '30px', fill: '#fff' }).setScrollFactor(0);

        this.lastFired = 0;
        this.originalTint = 0xffffff; // Default tint color (white)
        this.damageTint = 0xff0000; // Tint color to indicate damage (red)
    }

    update() {
        this.movePlayerManager();
    }

    collideWithProps(prop) {
        this.scene.physics.add.collider(this, prop, () => { });
    }

    playerAnims() {
        this.anims.create({
            key: "stop",
            frames: [{ key: "player", frame: 21 }],
            frameRate: 20
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "up",
            frames: this.anims.generateFrameNumbers("player", { start: 14, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "down",
            frames: this.anims.generateFrameNumbers("player", { start: 21, end: 27 }),
            frameRate: 10,
            repeat: -1
        });
    }

    movePlayerManager() {
        let cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp) {
            this.anims.play("stop", true);
        }

        if (cursors.left.isDown && cursors.up.isUp && cursors.down.isUp) {
            this.setVelocityX(-gameSettings.playerSpeed);
            this.anims.play("left", true);
            this.direction = 'left';
        }
        else if (cursors.right.isDown && cursors.up.isUp && cursors.down.isUp) {
            this.setVelocityX(gameSettings.playerSpeed);
            this.anims.play("right", true);
            this.direction = 'right';
        }
        else {
            this.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.setVelocityY(-gameSettings.playerSpeed);
            this.anims.play("up", true);
            this.direction = 'up';
        }
        else if (cursors.down.isDown) {
            this.setVelocityY(gameSettings.playerSpeed);
            this.anims.play("down", true);
            this.direction = 'down';
        }
        else {
            this.setVelocityY(0);
        }

        if (this.scene.input.keyboard.checkDown(cursors.space, 2000)) {
            this.shootBeam();
        }
    }

    takeDamage(amount) {
        if (!this.invulnerable) {
            this.hp -= amount;
            this.hpText.setText(`HP: ${this.hp}/${this.maxHp}`);
            this.applyDamageTint(); // Apply damage effect
            if (this.hp <= 0) {
                this.scene.scene.restart();
            } else {
                this.invulnerable = true;
                this.scene.time.delayedCall(1000, () => { this.invulnerable = false; });
            }
        }
    }

    applyDamageTint() {
        this.setTint(this.damageTint);
        this.scene.time.delayedCall(200, () => { this.clearTint(); }, [], this); // Remove tint after 200ms
    }

    shootBeam() {
        if (this.scene.time.now > this.lastFired && this.beamsGroup.getLength() < 4) {
            let beam = new Beam(this.scene, this.x, this.y, this.direction);
            this.beamsGroup.add(beam);
            this.lastFired = this.scene.time.now + 100; //Tiros a cada 2s
        }
    }
}
