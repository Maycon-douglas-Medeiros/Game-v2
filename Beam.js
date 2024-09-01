class Beam extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'caveProps', 2);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.setPushable(false);

        this.direction = direction;
        this.body.setSize(16, 16);
        this.scene.time.addEvent({
            delay: 4000,
            callback: () => {
                this.destroy();
            },
            callbackScope: this
        });
    }

    update() {
        const speed = 300;
        switch (this.direction) {
            case 'left':
                this.setVelocityX(-speed);
                break;
            case 'right':
                this.setVelocityX(speed);
                break;
            case 'up':
                this.setVelocityY(-speed);
                break;
            case 'down':
                this.setVelocityY(speed);
                break;
        }
    }

    destroyBeamOnCollision() {
        this.destroy();
    }
}
