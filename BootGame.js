class BootGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("CaveFloor", "assets/images/CaveFloor.png");
    this.load.image("LabFloor", "assets/images/LabFloor.png");
    this.load.image('lab', 'assets/images/lab1.png');
    this.load.image('cave', 'assets/images/cave.png');
    this.load.image('menu', 'assets/images/menu.png');
    this.load.spritesheet("player", "assets/spritesheets/player.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("caveProps", "assets/spritesheets/caveProps.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("enemy", "assets/spritesheets/enemy.png", { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.scene.start("Menu");
  }
}
