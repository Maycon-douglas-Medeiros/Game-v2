class Cave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
      var x = 0;
      var y = 0;
    
      super(scene, x, y, 'caveProps', 4);
      
      scene.add.existing(this);
      scene.physics.add.existing(this); 

      this.body.setCollideWorldBounds(true);
      this.setPushable(false);
    }
}