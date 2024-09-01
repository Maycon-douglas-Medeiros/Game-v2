class Menu extends Phaser.Scene{
  constructor(scene) {
      super("Menu");
  }
  create() {
    this.menu = this.add.tileSprite(0, 0, config.width, config.height, "menu");
    this.menu.setOrigin(0, 0);

    this.add.text(350, 350, "Generic Name", { fontSize: '80px', fill: '#d77bba' });
    
    this.add.text(450, 650, "Press Space to Start", { fontSize: '32px', fill: '#ffffff' });
    
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
      this.startKey();
    }
  }

  startKey() {
    this.scene.start("playGame");
  }
}