class Crystal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, frameIndex) {
    var x = 0;
    var y = 0;
    
    //frameIndex = Math.floor(Math.random() * 4);
    
    super(scene, x, y, 'caveProps', frameIndex);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.setPushable(false);
  }
}